import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("@RocketShoes:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      
      let cartNewArray  = [...cart];

      let product = cartNewArray.find( product => product.id == productId);

      let { data: productAmountInStock } = await api.get(`/stock/${productId}`);

      //produto não adicionado ao carrinho
      if(!product){
        let {data} = await api.get(`/products/${productId}`);
        cartNewArray.push({
          ...data,
          amount: 1
        });
      }

      //já tem o produto no carrinho
      if(product){
        if( product.amount < productAmountInStock.amount ){
          product.amount += 1
        }else {
          toast.error('Quantidade solicitada fora de estoque');
          return;
        }
      }

      setCart([...cartNewArray]);
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(cartNewArray));

    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      let cartNewArray = [...cart];
      let indexProduct = cartNewArray.findIndex(product=>product.id == productId);

      if(indexProduct < 0){
        toast.error('Erro na remoção do produto');
        return;
      }

      cartNewArray.splice(indexProduct,1);

      setCart([...cartNewArray]);
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(cartNewArray));
    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      
      let cartNewArray = [...cart];
      let product = cartNewArray.find(product=>product.id==productId);
      let { data } = await api.get(`/stock/${productId}`);

      console.log("------------------")
      console.log(product)
      console.log(productId)
      console.log(data)
      console.log(amount)
      console.log(product && data.amount > -1 && amount <= data.amount)
      console.log("------------------")

      if (product && data.amount > 1 && amount <= data.amount) {
        product.amount = amount;
      }else {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      console.log("------------------")
      console.log(product)
      console.log("------------------")

      setCart([...cartNewArray]);
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(cartNewArray));
    } catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
