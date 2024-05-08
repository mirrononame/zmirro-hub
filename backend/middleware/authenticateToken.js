const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRETKEY;

function authenticateToken(req, res, next) {
    const token = req.cookies['token'];
    console.log(token)
    try {
        
        if (!token) return res.sendStatus(401); // Нет токена, не аутентифицирован

        jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403); // Неверный токен
        req.user = user;
        next(); // Передаем управление следующему middleware
    });
    } catch (error) {
        console.log(error);
        return res.sendStatus(401, error);
    }
    
}

module.exports = authenticateToken;
