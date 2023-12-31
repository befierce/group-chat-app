const express = require('express');
const cors = require('cors');

const signUpRoutes = require('./routes/signup_routes');
const loginRoutes = require('./routes/login_routes');
const messageRoutes = require('./routes/message_routes');
const groupRoutes = require('./routes/groupRoutes');


require('dotenv').config();
const { sequelize, Sequelize } = require('./database/connection');
const { User } = require('./models/user_list');
const { Message } = require('./models/messages');
const UserGroups = require('./models/user_groups');
const Groups = require('./models/group_model')
const UserGroupMessages = require('./models/group_message_models')

const app = express();
app.use(cors());
app.use(express.json());

User.hasMany(Message, { foreignKey: 'userId' });
Message.belongsTo(User, { foreignKey: 'userId' });

// Assuming you have UserGroups and Groups defined as Sequelize models
UserGroups.belongsTo(User, { foreignKey: 'userListUserId' });
UserGroups.belongsTo(Groups, { foreignKey: 'groupGorupId' });

User.belongsToMany(Groups, {through:UserGroups,as: 'group'} );
Groups.belongsToMany(User, {through:UserGroups});

Groups.hasMany(UserGroupMessages);
User.hasMany(UserGroupMessages);


UserGroupMessages.belongsTo(User);









sequelize.sync({force:false})
    .then(() => {
        sequelize.options.logging = console.log;
        console.log('Database and tables synced.');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });





app.use('/', signUpRoutes);
app.use('/', loginRoutes);
app.use('/', messageRoutes);
app.use('/',groupRoutes);


const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const io = require('socket.io')(server,{
    cors:{
        origin: 'http://127.0.0.1:5500'
    }
});

io.on('connection',(socket)=>{
    console.log('user connected');

    socket.on('send-message',(message)=>{
        console.log("message recieved using socket", message);
        //  io.emit('recieve-message', message);
    })
    socket.on('send-message-to-group',(message)=>{
        console.log("group message recieved using socket", message);
        //  io.emit('recieve-message', message);
    })

})

app.set('io', io);//making io globally accessible
// module.exports = {server,io}