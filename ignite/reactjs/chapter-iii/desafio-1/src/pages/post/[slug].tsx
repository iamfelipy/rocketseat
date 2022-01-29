import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
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

  const [tempoDeLeituraCalculado, setTempoDeLeituraCalculado] = useState(0);

  // console.log(JSON.stringify(post, null, 2));

  // gerador do tempo de leitura
  useEffect(() => {
    const extractKeywords = post?.data?.content?.reduce((acc, value, index) => {

      let text = '';

      text = text.concat(value.heading);

      let textBody = value.body.reduce((acc1, value1, index1) => {
        acc1 = acc1 + ' ' + value1.text;
        return acc1;
      }, '');

      text = text.concat(textBody).trim();

      acc = acc.concat(text);

      if (index === 0) {
        text.trim();
      }

      return acc;
    }, '');

    if (extractKeywords) {
      const readTime = Math.ceil(extractKeywords.length / 200);
      setTempoDeLeituraCalculado(readTime);
    }
  }, [router.isFallback]);

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

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
            <div>{tempoDeLeituraCalculado + ' min'}</div>
          </div>
        </div>
        <div className={styles.content}>
          {
            post.data.content.map(section => {
              return (
                <div key={section.heading} className={styles.bloco}>
                  <div className={styles.title}>{section.heading}</div>
                  {section.body.map((v,index) => (<p key={index}>{v.text}</p>))}
                </div>
              )
            })
          }
        </div>
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

  // console.log(JSON.stringify(response, null, 2));

  const contentFormated = response.data.content.reduce((acc, value) => {
    const bodyFormated = value.body.reduce((acc1, value1) => {
      acc1.push({ text: value1.text });
      return acc1;
    }, []);

    acc.push({
      heading: value.heading,
      body: [...bodyFormated],
    });

    return acc;
  }, []);

  // console.log(JSON.stringify(contentFormated, null, 2));

  const post = {
    first_publication_date: format(
      new Date(response.first_publication_date),
      'dd MMM yyyy',
      {
        locale: ptBR,
      }
    ),
    data: {
      title: response.data.teste1,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author1,
      content: [...contentFormated],
    },
  };

  // interface Post {
  //   first_publication_date: string | null;
  //   data: {
  //     title: string;
  //     banner: {
  //       url: string;
  //     };
  //     author: string;
  //     content: {
  //       heading: string;
  //       body: {
  //         text: string;
  //       }[];
  //     }[];
  //   };
  // }

  return {
    props: {
      post,
    },
  };
};
