const express = require('express');
const cors = require('cors');
const signUpRoutes = require('./routes/signup_routes');
const loginRoutes = require('./routes/login_routes');
require('dotenv').config;
// const { sequelize } = require('./database/connection');
const { User } = require('./models/user_list')

const app = express();

User.sync()



app.use(cors());
app.use(express.json());

app.use('/', signUpRoutes);
app.use('/', loginRoutes);



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});