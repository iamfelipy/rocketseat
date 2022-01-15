// toda pagina tem que ser exportada como default

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { client } from "../../services/prismic";
import * as prismicH from '@prismicio/helpers'
import Head from "next/head";

import styles from "./post.module.scss";

export default function Post({ post }) {
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
                        className={styles.postContent}
                        dangerouslySetInnerHTML={{ __html: post.content }} 
                    ></div>
                </article>
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    
    const session = await getSession({ req });

    if(!session?.activeSubscription) {
        // ao retornar isso inves de props
        // posso fazer um redirecionamento
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }

    const { slug } = params;

    const response: any = await client.getByUID("publication", String(slug), {});

    // console.log(response);
    // console.log(JSON.stringify(response, null, 2));

    const post = {
        slug,
        title: prismicH.asText(response.data.title),
        content: prismicH.asHTML(response.data.content),
        updateAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    return {
        props: {
            post,
        }
    };
}