const express = require("express");
const {v4: uuidv4} = require("uuid");

const app = express();

app.use(express.json());

/*
    * cpf - string
    * name - string
    * id - uuid
    * statement(extrato) []
*/

const customers = [
    {
        name: 'murisoca',
        cpf: '054879354854',
        id: uuidv4(),
        statement: [
            {
                description: "IPHONE XS",
                amount: 51,
                created_at: "2021-11-21T23:29:12.208Z",
                type: "credit"
            },
            {
                description: "Gasolina",
                amount: 50,
                created_at: "2021-11-21T23:29:12.208Z",
                type: "debit"
            }
        ]
    }
];

// Middleware
function verifyIfExistsAccountCPF(req,res, next){

    // const {cpf} = req.params;
    const {cpf} = req.headers;

    const customer = customers.find(customer=>customer.cpf==cpf);

    if(!customer){
        return res.status(400).send({error: "Customer not found"});
    }

    req.customer = customer;

    return next();
}

function getBalance(statement){ 
    const balance = statement.reduce((acc, operation)=>{
        if(operation.type == 'credit') {
            return acc + operation.amount; 
        }else {
            return acc - operation.amount;
        }
    },0);

    return balance;
}

app.post("/account", (req, res) =>{
    
    const {name, cpf} = {...req.body};

    const customerAlreadyExists = customers.some(customer=>customer.cpf == cpf);
    
    if(customerAlreadyExists){
        return res.status(400).json({error: "Customer already exists!"});
    }
    
    customers.push({
        name,
        cpf,
        id: uuidv4(),
        statement: []
    });
    
    return res.status(201).send("Usuário criado com sucesso");
});

app.put("/account",verifyIfExistsAccountCPF, (req,res) =>{

    const {customer} = req;
    const {name} = req.body;

    customer.name = name;

    return res.status(201).send();

});

app.get("/account",verifyIfExistsAccountCPF, (req, res) =>{

    const {customer} = req;
    
    return res.status(201).json(customer);
});

app.delete("/account",verifyIfExistsAccountCPF,(req,res)=>{
    const {customer} = req;
    
    const findIndex = customers.findIndex(customer1=>customer1.id==customer.id);
    customers.splice(findIndex,1);

    return res.status(200).json(customer);
})

app.get("/statement",verifyIfExistsAccountCPF, (req, res) =>{
    const {customer} = req;

    return res.json(customer.statement);
});

app.get("/statement/date",verifyIfExistsAccountCPF, (req, res) =>{
    const {customer} = req;
    const {date} = req.query;

    const dateFormat = new Date(date+" 00:00");

    const statement = customer.statement.filter(
        (statement) =>
        new Date(statement.created_at).toDateString() === 
        new Date(dateFormat).toDateString()
    );

    return res.json(statement);
});

app.post("/deposit",verifyIfExistsAccountCPF, (request, response) => {

    const {description, amount} = request.body;
    const {customer} = request;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }
    
    customer.statement.push(statementOperation);

    return response.status(201).send();
});

app.post("/withdraw", verifyIfExistsAccountCPF, (request, response)=>{
    const {amount} = request.body;
    const {customer} = request;

    const balance = getBalance(customer.statement);
    
    if(balance < amount){
        return response.status(400).json({error: 'Insufficient funds!'});
    }
    
    const statementOperation = {
        amount,
        created_at: new Date(),
        type: "debit"
    }

    customer.statement.push(statementOperation);

    return response.status(201).send();
});

app.get("/balance",verifyIfExistsAccountCPF, (request, response)=>{
    const {customer} = request;
    const balance = getBalance(customer.statement);

    return response.status(200).json(balance);
});

// app.use(verifyIfExistsAccountCPF);


app.listen(3333);