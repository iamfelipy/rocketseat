const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
    create(req, res) {
        return res.render("job")
    }, 
    //ok
    async save(req, res) {

        const newJob = {
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now()
        };

        Job.create(newJob);
    
        return res.redirect('/');
    },
    async show(req, res) {
        
        const jobs = await Job.get();
        const profile = await Profile.get();

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
    async update(req, res){ 
        //descobrir qual id está sendo editado
        const jobId = req.params.id;

        //verifica se o id existe
        const idValid = await (await Job.get()).find(element => element.id == jobId);

        if(!idValid){
            return res.send("Job not found!");
        }
        
        //pegar os valores do novo job
        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        };
        
        await Job.update(updatedJob, jobId);
        //redirecionar para a mesma pagina com os valores atualizados
        return res.redirect("/job/"+jobId);
    },
    //ok
    async delete(req,res){
        const jobId = req.params.id;
        await Job.delete(jobId);
        return res.redirect("/");
    }
}