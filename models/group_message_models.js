const { sequelize, Sequelize } = require('../database/connection');


const UserGroupMessages = sequelize.define('user_group_messages',{
    id: { // Keep the attribute name as "gorupId"
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
    }
})

module.exports = UserGroupMessages;