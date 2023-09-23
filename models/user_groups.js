const { sequelize, Sequelize } = require('../database/connection');


const UserGroups = sequelize.define('user_group', {
    userListUserId:{
        type:Sequelize.INTEGER
    },
    groupGorupId:{
        type:Sequelize.INTEGER
    }
});


module.exports = UserGroups;
