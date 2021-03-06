import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

//acontece quando a pagina está sendo renderizada para o usuário
// getServerSideProps (SSR)
// getStaticProps (SSG)
//usar quando a pagina já carregou foi acionado um evento
// API Routes

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({priceId}: SubscribeButtonProps) {

    const {data: session, status} = useSession();
    const router = useRouter();

    async function handleSubscribe(){
        if (!session) {
            signIn('github');
            return;
        }

        if(session.activeSubscription){
            router.push("/posts");
            return;
        }

        try {
            const response = await api.post('/subscribe');

            const { sessionId: {id} } = response.data;
            const stripe = await getStripeJs();

            await stripe.redirectToCheckout({sessionId: id});
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe now
        </button>
    );
}