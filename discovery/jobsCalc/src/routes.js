const express = require("express");
const routes = express.Router();

//antes do ejs, por padrão ejs já usa a pasta src/view
const views = __dirname + "/views/";

const Profile = {
    data: {
        name: "Felipy",
        avatar: "https://github.com/iamfelipy.png",
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 8,
        "vacation-per-year": 4,
        "value-hour": 75
    },
    controllers: {
        index(req, res) { 
            return res.render(views+"profile", {profile: Profile.data});
        }, 
        update(req, res){

            //req.body para pegar os dados
            const data = req.body;

            // definir quantas semanas tem num ano: 52
            const weeksPerYear = 52;

            //remover as semanas de férias do ano, para pegar quantas semanas tem em 1 mês
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

            //total de horas trabalhadas na semana
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

            //horas trabalhar no mês
            const monthlyTotalHours = weekTotalHours * weeksPerMonth;

            // qual será o valor da minha hora?
            const valueHour = data["monthly-budget"] / monthlyTotalHours;

            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hour": valueHour
            }
            
            return res.redirect("/profile");
        }
    }
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

                return {
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget({...job}, Profile.data["value-hour"])
                };
            });
        
            return res.render(views+"index", {jobs: [...updatedJobs], profile: Profile.data["value-hour"]});
        },
        create(req, res) {
            return res.render(views+"job")
        },
        save(req, res) {
            // req.body = { name: 'asad', 'daily-hours': '3.1', 'total-hours': '3' }
            //gera um id unico
            const lastID = Job.data[Job.data.length-1]?.id || 1;
        
            Job.data.push({
                id: lastID + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                budget: Job.services.calculateBudget({"total-hours":req.body["total-hours"]}),
                created_at: Date.now()
            });
        
            return res.redirect('/');
        },
        show(req, res) {
            
            //pegar id
            const jobId = req.params.id;
            //buscar o id da rota
            const job = Job.data.find(job=>Number(job.id) === Number(jobId));

            if(!job){
                return res.send("Job not found!");
            }

            job.budget = Job.services.calculateBudget({...job}, Profile.data["value-hour"]);

            //enviar as informações para o render
            //inserir ejs no edit-job cpara tornar os dados dinamicos
            
            return res.render(views+"job-edit", {job});
        },
        update(req, res){ 
            
            //descobrir qual id está sendo editado
            const jobId = req.params.id;
            
            //achar o job atual pelo id
            const job = Job.data.find(job=>job.id == jobId);
            if(!job){
                return res.send("Job not found!");
            }
            
            //pegar os valores do novo job
            const updatedJob = {
                ...job,
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"]
            };
            
            //alterar os valores do id
            Job.data = Job.data.map(job=>{
                if(Number(job.id) === Number(jobId)){
                    job = updatedJob;
                }

                return {...job};
            });
            //redirecionar para a mesma pagina com os valores atualizados
            return res.redirect("/job/"+jobId);
        },
        delete(req,res){
            const jobId = req.params.id;

            Job.data = Job.data.filter(job=> Number(job.id) !== Number(jobId));
            
            return res.redirect("/");
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
        },
        calculateBudget: (job, valueHour) => job["total-hours"]*valueHour
    }
};

//request, response
//tambem não preciso dizer o tipo de extensao para o ejs ele já sabe que a saida é html
// routes.get('/', (req, res) => res.sendFile(basePath+"/index.html")); o antigo,antes do ejs
routes.get('/', Job.controllers.index);
routes.get('/job', Job.controllers.create);
routes.post('/job', Job.controllers.save);
routes.get('/job/:id', Job.controllers.show);
routes.post('/job/:id', Job.controllers.update);
routes.post('/job/delete/:id', Job.controllers.delete);

routes.get('/profile', Profile.controllers.index);
routes.post('/profile', Profile.controllers.update);


module.exports = routes;