const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes')
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
  }));  // Это позволит доступ со всех доменов
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/users', userRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
