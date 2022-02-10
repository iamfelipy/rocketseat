import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import PrismicDOM from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import Comments from '../../components/Comments/index.tsx';

import Link from "next/link";

interface Post {
  first_publication_date: string | null;
  last_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const router = useRouter();
  let readTime;

  const [preventLink, setPreventLink] = useState('');
  const [nextLink, setNextLink] = useState('');

  // const [tempoDeLeituraCalculado, setTempoDeLeituraCalculado] = useState(0);
  post.first_publication_date = format(
    new Date(post.first_publication_date),
    'dd MMM yyyy',
    {
      locale: ptBR,
    }
  );

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }
  console.log(post)
  // gerador do tempo de leitura
  let extractKeywords: any = post?.data?.content?.reduce((acc, value, index) => {
    let text = '';
    text = text.concat(value.heading);
    let textBody = value.body.reduce((acc1, value1, index1) => {
      acc1 = acc1 + PrismicDOM.RichText.asText(post.data.content[0].body);
      return acc1;
    }, '');
    text = text.concat(textBody).trim();
    acc = acc.concat(text);
    if (index === 0) {
      text.trim();
    }
    return acc;
  }, '');

  extractKeywords = extractKeywords.split(/\s+|\b(?=[!\?\.])(?!\.\s+)/);

  if (extractKeywords) {
    readTime = Math.ceil(extractKeywords.length / 200);
  }

  function diminuiTamanhoDaString(text) {
    // text = text.replace(/-/g, ' ').split(' ');
    // let [n1,n2,n3] = text;
    // text = `${n1} ${n2} ${n3}`;
    return text;
  }

  async function fetchData() {
    const prismic = getPrismicClient();
    const documents = await prismic.query('');

    const positionSlug = documents.results.findIndex((document)=>document.uid === post.uid);

    let prevent;
    let next;
    console.log(prevent);
    console.log(next);
    if (positionSlug - 1 < 0) {
      prevent = "";
    }else {
      prevent = documents.results[positionSlug - 1].uid;
    }

    if (positionSlug + 1 >= documents.results.length) {
      next = "";
    }else {
      next = documents.results[positionSlug + 1].uid;
    }

    setPreventLink(prevent);
    setNextLink(next);
  }

  useEffect(() => {
    fetchData();
  },[post.uid]);

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <img src={post.data.banner.url ?? ''} alt="" />
      </div>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.title}>
            {post.data.title}
          </div>
          <div className={styles.infoPost}>
            <FiUser />
            <div>{post.data.author}</div>
            <FiCalendar />
            <div>{post.first_publication_date}</div>
            <FiClock />
            <div>{readTime + ' min'}</div>
          </div>
        </div>
        <div className={styles.content}>
          {
            post.data.content.map(section => {
              return (
                <div key={section.heading} className={styles.bloco}>
                  <div className={styles.title}>{section.heading}</div>
                  {section.body.map((v, index) => (<p key={index}>{v.text}</p>))}
                </div>
              )
            })
          }
        </div>
        <div className={styles.buttonsPreventNext}>
          <div>
            <Link href={`/post/${preventLink}`}>
              <a>
                <button>
                  {
                    preventLink && (
                      <>
                        <div>
                          {diminuiTamanhoDaString(preventLink)}<br />
                        </div>
                        <div>
                          Post Anterior
                        </div>
                      </>
                    )
                  }
                </button>
              </a>
            </Link>
          </div>
          <div>
            <Link href={`/post/${nextLink}`}>
              <a>
                <button>
                  {
                    nextLink && (
                      <>
                        <div>
                          {diminuiTamanhoDaString(nextLink)}<br />
                        </div>
                        <div>
                          Próximo post
                        </div>
                      </>
                    )
                  }
                </button>
              </a>
            </Link>
          </div>
        </div>
        <Comments />
      </div>
    </div>
  );
}

// serve para rotas dinamicas, eu digo quais paginas da rota dinamica
// mais acessadas que vão ser geradas no build e o que vai acontecer
// com as outras
// usado em conjunto com getStaticProps
export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query('');

  let slugPaths: Array<any>;

  if (posts?.results?.length > -1) {
    slugPaths = posts.results.map(post => ({ params: { slug: post.uid } }));
  } else {
    slugPaths = [];
  }

  if (slugPaths.length > 2) {
    slugPaths = [{ ...slugPaths[0] }, { ...slugPaths[1] }];
  }

  return {
    // essa propriedade serve para dizer quais paginas ele tem que fazer backup ssg no build
    paths: [...slugPaths],
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: any): Promise<any> => {
  const prismic = getPrismicClient();
  const response: any = await prismic.getByUID('posts', params.slug, {});

  if (!response) {
    return {
      props: {
        post: {},
      },
    };
  }

  // console.log(JSON.stringify(posts, null, 2));

  const contentFormated = response.data.content.reduce((acc, value) => {

    acc.push({
      heading: value.heading,
      body: value.body,
    });

    return acc;
  }, []);

  // console.log(JSON.stringify(contentFormated, null, 2));

  const post = {
    first_publication_date: response.first_publication_date,
    last_publication_date: response.last_publication_date,
    uid: response.uid,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: [...contentFormated],
    },
  };
  return {
    props: {
      post,
    },
  };
};
