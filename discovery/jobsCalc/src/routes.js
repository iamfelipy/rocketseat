const express = require("express");
const routes = express.Router();

//antes do ejs, por padrão ejs já usa a pasta src/view
const views = __dirname + "/views/";

const profile = {
    name: "Felipy",
    avatar: "https://github.com/iamfelipy.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 8,
    "vacation-per-year": 4,
    "value-hour": 75
}

const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            "daily-hours": 2,
            "total-hours": 2,
            created_at: Date.now(),
        },
        {
            id: 2,
            name: "OneTwo Project",
            "daily-hours": 2,
            "total-hours": 40,
            created_at: Date.now(),
        }
    ],
    controllers: {
        index(req, res) {
            const updatedJobs = Job.data.map((job)=>{
                
                const remaining = Job.services.remainingDays(job);
                const status = remaining <= 0 ? "done" : "progress";

                let budget = job["total-hours"]*profile["value-hour"];
                budget = budget.toLocaleString("pt-br", {minimumFractionDigits: 2 ,style: "currency", currency: "BRL"})

                return {
                    ...job,
                    remaining,
                    status,
                    budget
                };
            });
        
            return res.render(views+"index", {jobs: [...updatedJobs]})
        }
    },
    services: {
        remainingDays(job){
            /*
                está função é responsável por calcular o prazo de entrega do projeto
                o projeto tem tantas horas
                vou trabalhar no projeto tantas horas por dia
                total-horas/horas-trabalhar-por-dia=quantatidade de dias a trabalhar

                eu tenho o created_at a data que decidi começar o projeto
                created_at + quantidade_de_dias_trabalhados=o prazo

                dias restantes para entregar
                o prazo - a data atual
            */
            let remainingDaysInitial = (job["total-hours"]/job["daily-hours"]).toFixed();
                
            const createdDate = new Date(job.created_at);
            //data de inicio do projeto + quantidade de dias a serem trabalhados
            const dueDay = createdDate.getDate() + Number(remainingDaysInitial);
            const dueDateInMs = createdDate.setDate(dueDay);
        
            const timeDiffInMs = dueDateInMs - Date.now();
        
            // trnasformar milli em dias
            const dayInMs = 1000 * 60 * 60 * 24;
            const dayDiff = Math.floor(timeDiffInMs / dayInMs);
        
            return dayDiff;
        }
    }
};

//request, response
//tambem não preciso dizer o tipo de extensao para o ejs ele já sabe que a saida é html
// routes.get('/', (req, res) => res.sendFile(basePath+"/index.html")); o antigo,antes do ejs
routes.get('/', Job.controllers.index);
routes.get('/job', (req, res) => res.render(views+"job"));
routes.post('/job',(req, res) => {
    // req.body = { name: 'asad', 'daily-hours': '3.1', 'total-hours': '3' }
    //gera um id unico
    const lastID = Job.data[Job.data.length-1]?.id || 1;

    Job.data.push({
        id: lastID + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now()
    });

    return res.redirect('/');
});
routes.get('/job/edit', (req, res) => res.render(views+"job-edit"));
routes.get('/profile', (req, res) => res.render(views+"profile", {profile}));


module.exports = routes;