import { GetServerSideProps, GetStaticProps } from "next";
import Head from "next/head";
import * as prismic from '@prismicio/client'
import * as prismicH from '@prismicio/helpers'
import Link from "next/link";

import { client } from "../../services/prismic";

import styles from "./styles.module.scss";

// type Post = {
//     slug: string;
//     title: string;
//     excerpt: string;
//     updateAt: string;
// }

// interface PostsProps {
//     posts: Post[]
// }

export default function Posts({ posts }) {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    {
                        posts.map(post => (
                            <Link key={post.slug} href={`/posts/${post.slug}`}>
                                <a>
                                    <time>{post.updateAt}</time>
                                    <strong>{post.title}</strong>
                                    <p>{post.excerpt}</p>
                                </a>
                            </Link>
                        ))
                    }
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {


    const response: any = await client.get({
        predicates: [
            prismic.predicate.at("document.type", "publication")
        ],
        pageSize: 100
    })

    // muito util para ver valores aninhados
    // console.log(JSON.stringify(response, null, 2));
    // console.log(response.results[0])

    const posts = response.results.map(post => {

        return {
            slug: post.uid,
            title: prismicH.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === "paragraph")?.text ?? '',
            updateAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    });

    // sugestão
    // fazer a formatação dos dados após consumir a api e antes de enviar para o fronted
    // como data e valores monetarios

    return {
        props: {
            posts
        },
        revalidate: 60 * 60 * 24,
    }
}
