const Modal = {
    modalOverlay: document.querySelector(".modal-overlay"),
    open() {
        // Abrir modal
        // Adicionar a class active ao modal
        Modal.modalOverlay.classList.add("active");
    },
    close(){
        // fechar o modal
        // remover a class active do modal
        Modal.modalOverlay.classList.remove("active");
    }
};

// Eu preciso somar as entradas
// depois eu preciso somar as saídas
// remover das entradas o valor das saídas
// assim, eu terei o total

const Storage = {
    //listar dados do localStorage
    //salvar no localStorage
    //preciso adaptar trasaction para o objeto Storage responsavel por manipular LocalStorage
        //adicionar ao localStorage
        //remover do localStorage
    get(){
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || [];
    },
    set(transactions){
        localStorage.setItem("dev.finances:transactions",
        JSON.stringify(transactions));
    }
};

const Transaction = {
    all: Storage.get,
    add(transaction){
        let transactions = [...Storage.get()];
        transactions.push(transaction);
        Storage.set([...transactions]);
        App.reload();
    },
    remove(index){
        let transactions = [...Storage.get()];
        transactions.splice(index,1);
        Storage.set([...transactions]);
        App.reload();
    },
    incomes() {
        let amount = Transaction.all().reduce(function(accumulator,value){
            let amount = value.amount > 0 ? value.amount : 0;
            return accumulator+amount;
        },0);
        return Utils.formatCurrency(amount);
    },
    expenses() {
        let amount = Transaction.all().reduce(function(accumulator,value){
            let amount = value.amount < 0 ? value.amount : 0;
            return accumulator+amount;
        },0);
        return Utils.formatCurrency(amount);
    },
    total() {
        let amount = Transaction.all().reduce(function(accumulator,value){
            return accumulator+value.amount;
        },0);
        return Utils.formatCurrency(amount);
    }
};

// Eu preciso pegar as minhas transações do meu
// ojeto aqui no javascript
//e colocar lá no meu HTML
const DOM = {
    transactionsContainer: document.querySelector("#data-table tbody"),
    addTransaction(transaction, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction,index);
        tr.dataset.index = index;
        DOM.transactionsContainer.appendChild(tr);
    },
    innerHTMLTransaction(transaction,index) {
        const CSSclass = transaction.amount > 0 ? "income": "expense";
        const amount = Utils.formatCurrency(transaction.amount);
        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover Transação"></td>
        `;
        return html;
    },
    updateBalance() {
        document
            .getElementById("incomeDisplay")
            .innerHTML = Transaction.incomes();
        document
            .getElementById("expenseDisplay")
            .innerHTML = Transaction.expenses();
        document
            .getElementById("totalDisplay")
            .innerHTML = Transaction.total();
    },
    clearTransactions(){
        DOM.transactionsContainer.innerHTML = "";
    }
};

const Utils = {
    formatAmount(value){
        value = Number(value) * 100;
        //serve para corrigir um bug quando insiro -1,10 ou -1.1
        value = Number(value.toFixed(2));

        return value;
    },
    formatDate(date){
        const splittedDate = date.split("-");
        return splittedDate[2]+"/"+splittedDate[1]+"/"+splittedDate[0];
    },
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-": "";
        value = String(value).replace(/\D/g,"");
        value = Number(value)/100;
        value = value.toLocaleString("pt-BR",{
            style: "currency",
            currency: "BRL"
        });
        return signal +" "+ value;
    }
};

const Form = {
    description: document.querySelector("input#description"),
    amount: document.querySelector("input#amount"),
    date: document.querySelector("input#date"),
    getValues(){
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },
    validateField(){
        const {description, amount, date} = Form.getValues();
        
        if( 
            description.trim() === "" ||
            amount.trim() === "" ||
            date.trim() === ""
            ) {
                throw new Error("Por favor, preencha todos os campos.");
            }
    },
    formatValues(){
        let {description, amount, date} = Form.getValues();
        amount = Utils.formatAmount(amount);
        date = Utils.formatDate(date);
        return {
            description,
            amount,
            date
        }
    },
    clearField(){
        ["description","amount","date"]
            .forEach((input)=>Form[input].value = "");
    },
    submit(event) {
        // cancela o comportamento padrão do evento no navegador
        event.preventDefault(); 
        
        // verificar se todas as informações foram preenchidas
        // formatar dados para salvar
        // salvar
        // limpar formulario
        // fechar modal
        // atualizar aplicação
        
        try{
            Form.validateField();
            const transaction = Form.formatValues();
            Transaction.add(transaction);
            Form.clearField();
            Modal.close();

        }catch(error){
            alert(error.message);
        }
    }
}

const App = {
    init(){
        Transaction.all().forEach(DOM.addTransaction);
        DOM.updateBalance();
    },
    reload(){
        DOM.clearTransactions();
        App.init();
    }
};

App.init();


