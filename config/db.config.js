const mysql = require('mysql2');
const connection = mysql.createConnection({
    host:'sql12.freesqldatabase.com',
    user: 'sql12716904',
    password: 'lhk4n7sfPI',
    database: 'sql12716904'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

module.exports = connection;
