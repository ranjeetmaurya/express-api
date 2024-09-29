require('dotenv').config();
const express = require('express');
const sequelize = require('./app//models').sequelize; // Sequelize instance from models/index.js
const app = express();
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const rootRoute = require('./routes/root');
const userRoute = require('./routes/userRoutes');

//app.use(authenticateToken);

app.use(session({
  secret: process.env.ACCESS_TOKEN_SECRET, // Replace with your secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure to true in production with HTTPS  
}));
app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:5173'
// }));
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