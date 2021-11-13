const Database = require("../db/config");

module.exports = {
    //ok
    async get(){

        const db = await Database();

        const jobs = await db.all("SELECT * FROM jobs");

        await db.close();
        
        return jobs.map(job=>({
                id: job.id,
                name: job.name,
                "daily-hours": job.daily_hours,
                "total-hours": job.total_hours,
                created_at: job.created_at
        }));
    },
    //ok
    async update(newJob, id){
        
        const db = await Database();

        db.run(`
            UPDATE 
                jobs 
            SET
                name = "${newJob.name}",
                daily_hours = ${newJob["daily-hours"]},
                total_hours = ${newJob["total-hours"]}
            WHERE
                id = ${id}
        `);

        await db.close();
    },
    //ok
    async delete(id){
        
        const db = await Database();

        db.run(`
            DELETE FROM jobs WHERE id = ${id}
        `);

        await db.close();
        // data2 = data2.filter(job=> Number(job.id) !== Number(id)); 

    },
    //ok
    async create(newJob){

        const db = await Database();

        db.run(`
            INSERT INTO jobs (
                name,
                daily_hours,
                total_hours,
                created_at
            ) VALUES (
                "${newJob.name}",
                ${newJob["daily-hours"]},
                ${newJob["total-hours"]},
                ${newJob.created_at}
            )
        `);

        await db.close();
    }
}