const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
    create(req, res) {
        return res.render("job")
    },
    save(req, res) {
        // req.body = { name: 'asad', 'daily-hours': '3.1', 'total-hours': '3' }
        const jobs = Job.get();
        const profile = Profile.get();
        //gera um id unico
        const lastID = jobs[jobs.length-1]?.id || 1;

        jobs.push({
            id: lastID + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            budget: JobUtils.calculateBudget({"total-hours":req.body["total-hours"]}, profile["value-hour"]),
            created_at: Date.now()
        });
    
        return res.redirect('/');
    },
    show(req, res) {
        
        const jobs = Job.get();
        const profile = Profile.get();

        //pegar id
        const jobId = req.params.id;
        //buscar o id da rota
        const job = jobs.find(job=>Number(job.id) === Number(jobId));

        if(!job){
            return res.send("Job not found!");
        }

        job.budget = JobUtils.calculateBudget({...job}, profile["value-hour"]);

        //enviar as informações para o render
        //inserir ejs no edit-job cpara tornar os dados dinamicos
        
        return res.render("job-edit", {job});
    },
    update(req, res){ 
        
        const jobs = Job.get();

        //descobrir qual id está sendo editado
        const jobId = req.params.id;
        
        //achar o job atual pelo id
        const job = jobs.find(job=>job.id == jobId);
        
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
        const newJobs = jobs.map(job=>{
            if(Number(job.id) === Number(jobId)){
                job = updatedJob;
            }

            return job;
        })
        
        Job.update(newJobs);
        //redirecionar para a mesma pagina com os valores atualizados
        return res.redirect("/job/"+jobId);
    },
    delete(req,res){
        const jobId = req.params.id;
        Job.delete(jobId);
        return res.redirect("/");
    }
}