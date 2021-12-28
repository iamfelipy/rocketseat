import { GetServerSideProps, GetStaticProps } from "next";
import Head from 'next/head';
import { stripe } from "../services/stripe";

import { SubscribeButton } from '../components/SubscribeButton';

import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({product}: HomeProps) {
  
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          👏<span> Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

// Client-side
  //não preciso de indexação
  //acontece atraes da ação do usuário
  //não tem necessidade de estar ali quando a pagina carrega
// Server-side (exige mais processamento)
  //precisa de indexação tambem
  //precisa de dados dinamicos
  //sessão do usuário
  //contexto da requisição
// Static Site Generation
  //home de um blog
  //post do blog
  //pagina de um produto ecommerce
  //cateoria ecommerce
  //precisam de indexação

// Post do blog

// Conteudo artigo (SSG)
// Comentários (Client-side)
// 

//eu ainda posso fazer uma chamada api pelo proprio componente, no lado cliente
//quando a indexação não vai ter impacto significativo
// se a chamada for custosa e vai demorar muito, melhor fazer server side render

//Utilizado para fazer server-side-render
//permiti ser dinamico
// export const getServerSideProps: GetServerSideProps = async () => {
  
//utilizado para static site generation
//usar em paginas que sejam staticas
//pagina que é igual para todos os usuários
export const getStaticProps: GetStaticProps = async () => {
  
  //atributo expand retorna mais informações, como o produto em si com titulo, descrição...
  const price = await stripe.prices.retrieve('price_1K9pHGLM0dFJLfZLjTOdO1l2', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US",{
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100)
  }
  
  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}