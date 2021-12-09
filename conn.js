let Sequelize = require("sequelize")
let DB = new Sequelize("registers", "root", "root", {
    host: 'localhost',
    dialect: 'mysql',
    pool: { max: 5, min: 0, idle: 1000 }
})
DB.authenticate()
    .then(() => {
        console.log("connected")
    })
    .catch(err => {
        console.log("error" + err)
    })
    
module.exports = DB;