const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const tasksRoutes = require('./routes/tasks')

const PORT = process.env.PORT || 3000

const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || 'redhood595'
const DB_NAME = process.env.DB_NAME || 'crud_bd'
const DB_PORT = process.env.DB_PORT || 3306

const app = express();
app.set('port',PORT);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
    extname:'.hbs' 
}));
app.set('view engine', 'hbs');

app.use(myconnection(mysql,{
    host:DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD,
    database:DB_NAME,
    port:DB_PORT

},'single'));

app.listen(app.get('port'),()=>{
    console.log('Escuchando al puerto', app.get('port'));
});

app.use('/', tasksRoutes);

app.get('/',(req,res) => {
    res.render('home');
});
