const Sequelize = require('sequelize');

const sequelize = new Sequelize('chat_app_db','root','10031998mysql@',{
    host:'localhost',
    dialect:'mysql'
});



module.exports = {sequelize,Sequelize};