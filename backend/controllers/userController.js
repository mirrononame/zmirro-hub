const User = require('../models/user');
const bcrypt = require('bcrypt');
const db = require('../config/database');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const secretKey = process.env.SECRETKEY



const registerUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(secretKey)
  try {
    const newUser = new User(username, password);
    const [user] = await db.query('SELECT id FROM users WHERE username = ?', [newUser.username]);
        if (user.length > 0) {
            return res.status(409).json({ message: "User already exists" });
        }
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const result = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [newUser.username, hashedPassword]);
    console.log(result[0]);
    const token = jwt.sign({ id: result[0].insertId }, secretKey, { expiresIn: '1h' });
    
    res.cookie('token', token, { 
      httpOnly: true,
      secure: true,
      maxAge: 3600000
     });
    res.status(201).json({ message: "User registered", token });
    
  } catch (error) {
    console.error('Registration error: ', error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        // Получение пользователя по username
        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        const user = users[0];

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Сравнение предоставленного пароля с хешированным паролем в базе данных
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
        // Пользователь аутентифицирован
        res.cookie('token', token, { 
          httpOnly: true,
          secure: true,
          maxAge: 3600000
         });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error('Login error: ', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getUserData = async (req, res) => {
  try {
    const token = req.cookies['token'];
    console.log(token);
    const decoded = jwt.verify(token, secretKey);
    const [users] = await db.query('SELECT username FROM users WHERE id =?', [decoded.id]);
    const user = users[0];
    res.status(200).json({ user });
  } catch (error) {
    // console.error('Get user data error: ', error);
    res.status(500).json({ message: "Internal server error" });
  }
}
const logOutUser = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error('Logout error: ', error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserData,
  logOutUser
};
