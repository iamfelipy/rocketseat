module.exports = {
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