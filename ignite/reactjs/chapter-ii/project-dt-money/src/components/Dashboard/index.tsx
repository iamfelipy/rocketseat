import { Summary } from '../Summary';
import { Transactions } from '../TransactionsTable';
import {Container, Content} from './styles';
export function Dashboard(){
    return(
        <Container>
            <Content>
                <Summary />
                <Transactions />
            </Content>
        </Container>
    );
}