const { sequelize, Sequelize } = require('../database/connection');

// const { UserGroup } = require('./user_groups');

const Groups = sequelize.define('groups', {
    gorupId: { // Keep the attribute name as "gorupId"
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    group_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    adminId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
});


module.exports = Groups;
