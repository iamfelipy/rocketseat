const Database = require("./config");

//exec para criar a tabela
//run para comandos de manipulação da tabela

const initDb = {
    async init(){
        const db = await Database();
        
        await db.exec(`
            CREATE TABLE IF NOT EXISTS profile (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT, 
                avatar TEXT,
                monthly_budget INT,
                days_per_week INT,
                hours_per_day INT,
                vacation_per_year INT,
                value_hour INT,
                created_at DATETIME
            )
        `);
        
        await db.exec(`
            CREATE TABLE IF NOT EXISTS jobs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                daily_hours INT,
                total_hours INT,
                created_at DATETIME
            )
        `);
        
        await db.run(`
            INSERT INTO profile (
                name, 
                avatar, 
                monthly_budget, 
                days_per_week, 
                hours_per_day, 
                vacation_per_year,
                created_at
            )
            VALUES (
                "Felipy", 
                "https://avatars.githubusercontent.com/u/50622611?v=4",
                3000,
                5,
                8,
                4,
                1617514376018
            )
        `);
        
        await db.run(`
            INSERT INTO jobs (
                name,
                daily_hours, 
                total_hours,
                created_at
            )
            VALUES (
                "Pizzaria Guloso",
                2,
                2,
                1617514376018
            )
        `);
        
        await db.run(`
            INSERT INTO jobs (
                name, 
                daily_hours, 
                total_hours,
                created_at
            )
            VALUES (
                "OneTwo Project", 
                2, 
                40,
                1617514376018
            )
        `);
        
        await db.close();
    }
}

initDb.init();

