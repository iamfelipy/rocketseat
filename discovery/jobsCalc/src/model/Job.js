let data = [
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
];

module.exports = {
    get(){
        return data;
    },
    update(newData){
        data = newData;
    },
    delete(id){
        data = data.filter(job=> Number(job.id) !== Number(id)); 
    }
}