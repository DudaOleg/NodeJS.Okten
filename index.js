const express = require('express');
const expresHbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');

const { PORT } = require('./config/variables');
const fileDB = path.join(__dirname, 'db', 'users.txt');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', '.hbs');
app.engine('.hbs', expresHbs({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'stats'));
app.use(express.static(path.join(__dirname, 'stats')));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/registration', (req, res) => {
    res.render('registration');
});

app.get('/user', (req, res) => {
    res.render('user');
});
app.get('/users', (req, res) => {
    fs.readFile(fileDB, (err, data) => {
        if (err) {
            console.log(err)
            return ;
        }
            const users = JSON.parse(data);
            res.render('users', {
                users
            });
    });
});

app.post('/login', (req, res) => {
    fs.readFile(fileDB, (errReadFile, textFormFile) => {
        if (errReadFile) {
            console.log(errReadFile);
            return;
        }
            const { login, password, email } = req.body
            const arr = JSON.parse(textFormFile);
            const find = arr.find((value) => value.password === password && value.login === login && value.email === email );

            find ? res.render('user', { userFind: { find } }) : res.redirect('/registration');
    });
});


app.post('/registration', (req, res) => {
    fs.readFile(fileDB, (errFileReg, data) => {

        if (errFileReg){
            console.log(errFileReg)
            return ;
        }

        const { login } = req.body
        const arr = (data.toString()) ? JSON.parse(data.toString()) : [];
        const find = arr.find((value) => value.login === login);

        if (!find) {
            arr.push(req.body);
        } else {
            return res.redirect('/login');
        }

        fs.writeFile(fileDB, `${JSON.stringify(arr)}`, (errWriteFile) => {

            if (errWriteFile) {
                console.log(errWriteFile)
                return ;
            }

                const regFind = arr.find((value) => value.login === login);
                res.render('user', { userFind: { regFind } });
        });
    });
});

app.listen( PORT, () => {
    console.log('ON -', PORT)
});