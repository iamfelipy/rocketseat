// toda pagina tem que ser exportada como default

import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "../../../services/prismic";
import * as prismicH from '@prismicio/helpers'
import Head from "next/head";

import styles from "../post.module.scss";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function PostPreview({ post }) {

    const {data: session, status} = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.activeSubscription) {
            router.push(`/posts/${post.slug}`)
        }
    }, [session])

    return (
        <>
            <Head>
                <title>{post.title} | Ignews</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updateAt}</time>
                    <div 
                        className={`${styles.postContent} ${styles.previewContent}`}
                        dangerouslySetInnerHTML={{ __html: post.content }} 
                    ></div>
                    <div className={styles.continueReading}>
                        Wanna continue reading?
                        <Link href="/">
                            <a href="">Subscribe now 😁</a>
                        </Link>
                    </div>
                </article>
            </main>
        </>
    );
}

//
export const getStaticPaths: GetStaticPaths = async () => {

    /*
        configuração para gerar pagna estaticas

        Categorias 30
        Produto 1000

        /camisetas
        /calcas
        /meias

        // Gerar as páginas estáticas durante a build
        // Gerar a página estática no primeiro acesso
        // Metade

        // 30 produtos mais vendidos

        a propriedade paths serve para dizer quais paginas quero gerar copia no build
        paths vazia gera copia no primeiro acesso

        bolinha branca ssg
        gera paginas estaticas com configuração paginas com rotas dinamicas
        rotas estaticas gera paginas staticas automaticamente
    */

    return{
        // diz quais paginas ira gerar copia no build
        paths: [
            {params: {
                slug: "quais-celulares-receberao-o-android-12-em-2022-veja-a-lista"
            }}
        ],
        //true
        //  gera pagina no lado browser
        //false
        //  se não estiver no paths retorna 404 page
        //blocking
        //  vai tentar carregar com serversiderender
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params;

    const response: any = await client.getByUID("publication", String(slug), {});

    // console.log(response);
    // console.log(JSON.stringify(response, null, 2));

    const post = {
        slug,
        title: prismicH.asText(response.data.title),
        content: prismicH.asHTML(response.data.content.splice(0,1)),
        updateAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    return {
        props: {
            post,
        },
        redirect: 60 * 30
    };
}