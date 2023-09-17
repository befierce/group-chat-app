const express = require('express');
const cors = require('cors');
const signUpRoutes = require('./routes/signup_routes');
// const { sequelize } = require('./database/connection');
const { User } = require('./models/user_list')

const app = express();

User.sync()



app.use(cors());
app.use(express.json());

app.use('/', signUpRoutes);



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});