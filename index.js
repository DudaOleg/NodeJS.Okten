const express = require('express');
const expressHbs = require('express-handlebars');
const fs = require('fs/promises');
const path = require('path');
const { PORT } = require('./config/variables');

const fileDB = path.join(__dirname, 'db', 'db.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'stats'));
app.use(express.static(path.join(__dirname, 'stats')));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/registration', (req, res) => {
  res.render('registration');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/users', async (req, res) => {
  const users = await getUsers();
  res.render('users', { users });
});

app.get('/user/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    const users = await getUsers();
    const userId = users[user_id];

    if ( !userId ) {
      res.status(404)
        .end('User Not Found');
      return;
    }

    res.render('user', { userId });
  } catch (e) {
    console.log(e);
  }
});

app.post('/registration', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const textFromFile = await fs.readFile(fileDB, 'utf8');

    const users = textFromFile ? JSON.parse(textFromFile.toString()) : [];
    const user = users.find(user => user.email === email);

    if ( user ) {
      res.status(401)
        .end('email is already in use');
      return;
    }
    users.push(req.body);
    await fs.writeFile(fileDB, JSON.stringify(users));
    res.redirect('/');
  } catch (e) {
    console.log(e);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { login, password, email } = req.body;
    const users = await getUsers();
    const find = users.findIndex(user => user.email === email && user.password === password);

    if ( find !== -1 ) {
      res.redirect(`/user/${find}`);
      return;
    }
    res.redirect('/registration');
  } catch (e) {
    console.log(e);
  }
});

async function getUsers() {
  return JSON.parse(await fs.readFile(fileDB, 'utf8'));
}

app.listen(PORT, () => {
});
