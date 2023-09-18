const express = require('express');
const cors = require('cors');
const signUpRoutes = require('./routes/signup_routes');
const loginRoutes = require('./routes/login_routes');
const messageRoutes = require('./routes/message_routes');
require('dotenv').config();
const { sequelize, Sequelize } = require('./database/connection');
const { User } = require('./models/user_list')
const { Message } = require('./models/messages')

const app = express();

User.hasMany(Message, { foreignKey: 'userId' });
Message.belongsTo(User, { foreignKey: 'userId' });


sequelize.sync()
    .then(() => {
        console.log('Database and tables synced.');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });



app.use(cors());
app.use(express.json());

app.use('/', signUpRoutes);
app.use('/', loginRoutes);
app.use('/', messageRoutes);



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});