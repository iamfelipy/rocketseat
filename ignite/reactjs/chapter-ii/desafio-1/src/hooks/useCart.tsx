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
  const [cart, setCart] = useState(() => {
    const storagedCart = localStorage.getItem("@RocketShoes:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      let cartArray: Product[] = [];
      let product: Product | undefined;
      
      let storagedCart = localStorage.getItem("@RocketShoes:cart") || "[]";
      
      cartArray = JSON.parse(storagedCart);
      
      product = cartArray.find(product => product.id == productId);

      //se não existir adiciono um produto
      if (!product) {
        const { data } = await api.get(`/products/${productId}`);
        
        if(!data) {
          throw "Erro na adição do produto";
        }
        
        cartArray.push({
          ...data,
          amount: 1
        });
      }

      if (product) {
        
        //verifica a quantidade em estoque
        let { data: estoqueDoProdutoNoBanco } = await api.get(`stock/${product.id}`);

        const haveTheProductInStock = product.amount < estoqueDoProdutoNoBanco.amount;
        
        if( !haveTheProductInStock ){
          toast.error('Quantidade solicitada fora de estoque.');
          return;
        }
        
        product.amount += 1;
      }
      setCart([...cartArray]);

      localStorage.setItem("@RocketShoes:cart", JSON.stringify(cartArray));

    } catch (e)  {
      console.error(`${"Erro na adição do produto"}: ${e}`);
      toast.error(`${"Erro na adição do produto"}: ${e}`);
    }
  };

  const removeProduct = (productId: number) => {
    //estou trabalhando nisso aqui
    try {
      let cartArray: Product[] = [];
      
      let storagedCart = localStorage.getItem("@RocketShoes:cart") || "[]";
      
      cartArray = JSON.parse(storagedCart);
      
      const indexElement = cartArray.findIndex(product => product.id == productId);

      if (!indexElement) {
        toast.error('Erro na remoção do produto');
        return;
      }

      cartArray.splice(indexElement,1)

      localStorage.setItem("@RocketShoes:cart", JSON.stringify(cartArray));
    } catch(e) {
      console.error(`${"Erro na remoção do produto"}: ${e}`);
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // TODO
    } catch {
      // TODO
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
