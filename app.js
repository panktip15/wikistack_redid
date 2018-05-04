const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const html = require('html-template-tag');

const path = require('path');
const { db } = require('./models');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/wiki', require('./routes/wiki'));
app.use('/users', require('./routes/user'));

app.get('/', (req, res) => {
  res.status(301).redirect('/wiki');
});

app.use((req, res) => {
  res.status(404).send(`the page you are looking for does not exist!`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err(err));
});

const syncDB = async () => {
  await db.sync({ force: true });
  const PORT = 3000;

  app.listen(PORT, () => {
    console.log('Server Started whooohooo!');
  });
};

syncDB();
