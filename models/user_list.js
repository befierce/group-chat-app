const { sequelize, Sequelize } = require('../database/connection');
// const { Groups } = require('./group_model'); // Use the same name "Groups"
// const UserGroup = require('./user_groups');

const User = sequelize.define('user_list', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    number: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// 

module.exports = { User };
