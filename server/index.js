import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import mysql from 'mysql'
import StudentModel from './module/Students.js'
import bcrypt from 'bcrypt';





const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}))

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sms'
});

db.connect((err) => {
  if (err) {
      console.error('Database connection failed:', err);
      return;
  }
  console.log('Connected to MySQL database');
});



//registration moongose
app.post('/register', (req,res)=>{
  const {name, password} = req.body;
  StudentModel.create({name: name, password: password})
  .then(user =>res.json(user))
  .catch(err => res.json(err))
})


// Logout endpoint
app.post('/logout', (req, res) => {
  // Clear cookies
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
});


// Students List
app.get('/students', (req, res) => {
  const query = 'SELECT * FROM basicinfo';

  db.query(query, (error, results) => {
      if (error) {
          console.error('Database query error:', error);
          return res.status(500).json({ error: 'Database query failed' });
      }
      res.json(results);
  });
});





// Registration with hashed password
app.post('/registerdb', async (req, res) => {
  const { name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash password

  const sql = 'INSERT INTO user_detail (username, password) VALUES (?, ?)';
  db.query(sql, [name, hashedPassword], (err, result) => {
      if (err) {
          console.error('Error inserting user: ', err);
          return res.status(500).json({ error: 'Database error' });
      }
      res.json({ id: result.insertId, username: name });
  });
});

// Check password during login
app.post('/logindb', (req, res) => {
  const { name, password } = req.body;

  const sql = 'SELECT * FROM user_detail WHERE username = ?';
  db.query(sql, [name], async (err, results) => {
      if (err) {
          console.error('Database error: ', err);
          return res.status(500).json({ error: 'Database error' });
      }

      if (results.length > 0) {
          const user = results[0];

          // Compare hashed password
          const match = await bcrypt.compare(password, user.password);
          if (match) {
        const accessToken = jwt.sign({ name: name }, 'jwt-access-token-secret-key', { expiresIn: '1m' });
        const refreshToken = jwt.sign({ name: name }, 'jwt-refresh-token-secret-key', { expiresIn: '5m' });

        // Set cookies for tokens
        res.cookie('accessToken', accessToken, { maxAge: 60000 });
        res.cookie('refreshToken', refreshToken, { maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict' });

        return res.json({ Login: true });
      } else {
        return res.json({ Login: false, Message: 'Incorrect password' });
    }
} else {
    return res.json({ Login: false, Message: 'No Record Found' });
}
});
});




//middle ware

const verifyUser = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    const result = await renewToken(req, res);
    if (result.Valid) {
      next();
    } else {
      return res.json(result); // use the object returned from renewToken
    }
  } else {
    // existing verification code
  }
};

//create dashboard
app.get('/dashboard', verifyUser, (req, res) =>{
  return res.json({Valid: true, message: "Authorized"})
})

//renew token
const renewToken = (req, res) => {
  return new Promise((resolve, reject) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return resolve({ Valid: false, message: "No Refresh Token" });
    }
    jwt.verify(refreshToken, 'jwt-refresh-token-secret-key', (err, decoded) => {
      if (err) {
        return resolve({ Valid: false, message: "Invalid Refresh Token" });
      } else {
        const accessToken = jwt.sign({ name: decoded.name }, "jwt-access-token-secret-key", { expiresIn: '1m' });
        res.cookie('accessToken', accessToken, { maxAge: 60000 });
        return resolve({ Valid: true });
      }
    });
  });
};



//listening
app.listen(5127, ()=>{
  console.log("Server is running at PORT 5127");
})