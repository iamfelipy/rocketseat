import { GetStaticProps } from 'next';

import ptBR from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

import Link from "next/link";

interface Post {
  id?: never;
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home(props: HomeProps): unknown {
  const { next_page, results: posts } = props.postsPagination;

  const [nextPageLink, setNextPageLink] = useState(next_page);
  const [results, setResults] = useState(posts);

  async function fetchPage(pageWanted): Promise<void> {
    if (!pageWanted) {
      return;
    }

    // busco proximo post
    const page = await fetch(pageWanted)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }

        console.log('Network response was not ok.');

        return null;
      })
      .catch(function (error) {
        console.log(
          `There has been a problem with your fetch operation: ${error.message}`
        );
      });

    // formatação do post
    if (page) {
      setNextPageLink(page.next_page);

      if(page?.results.length) {
        const post = page.results[0];

        const firstPublicationDate = format(
          new Date(post.first_publication_date),
          'dd MMM yyyy',
          {
            locale: ptBR,
          }
        );

        const postFormated = {
          id: post.id,
          uid: post.uid,
          first_publication_date: firstPublicationDate,
          data: {
            title: post.data.teste1,
            subtitle: post.data.subtitle1,
            author: post.data.author1,
          },
        }

        setResults([...results, { ...postFormated }]);
      }
    }
  }

  return (
    <div className={styles.container}>
      <div>
        {results.map(post => {
          return (
            <Link href={`/post/${post.uid}`} key={post.uid}>
              <a>
                <div>
                  <div className={styles.title}>{post.data.title}</div>
                  <div className={styles.subtitle}>{post.data.subtitle}</div>
                  <div className={styles.infoPost}>
                    <div><FiCalendar /></div>
                    <div>{post.first_publication_date}</div>
                    <div><FiUser /></div>
                    <div>{post.data.author}</div>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
      { nextPageLink && (
          <button className={styles.loadMorePost} onClick={() => fetchPage(nextPageLink)}>
            Carregar mais posts
          </button>
        )
      }
    </div>
  );
}

export const getStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query('', { pageSize: 1 });

  // console.log(JSON.stringify(postsResponse, null, 2));

  const formattedPosts = postsResponse.results.map(post => {
    const firstPublicationDate = format(
      new Date(post.first_publication_date),
      'dd MMM yyyy',
      {
        locale: ptBR,
      }
    );

    return {
      id: post.id,
      uid: post.uid,
      first_publication_date: firstPublicationDate,
      data: {
        title: post.data.teste1,
        subtitle: post.data.subtitle1,
        author: post.data.author1,
      },
    };
  });

  return {
    props: {
      postsPagination: {
        next_page: postsResponse?.next_page,
        results: [...formattedPosts],
      },
    },
  };
};
