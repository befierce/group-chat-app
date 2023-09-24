const { sequelize, Sequelize } = require('../database/connection');


const UserGroupMessages = sequelize.define('user_group_messages',{
    id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    message:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = UserGroupMessages;