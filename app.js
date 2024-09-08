require('dotenv').config();
const express = require('express');
const sequelize = require('./app//models').sequelize; // Sequelize instance from models/index.js
const app = express();
const path = require('path');
const rootRoute = require('./routes/root');
const userRoute = require('./routes/user');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', userRoute);
app.use('/', rootRoute);

sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch(err => {
  console.error('Unable to sync database:', err);
});
