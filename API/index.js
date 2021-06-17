const express = require('express')
const app = express()
const cors = require('cors')
const consign = require('consign')
const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

sequelize.sync({ force: true });

app.use(cors())
app.use(express.json())
app.set('sequelize', sequelize);

consign()
    .include('models')
    .then('controllers')
    .into(app)


app.get('/', function (req, res) {
    res.send('Aqui seria a tela de login/Inicial')
})

app.listen(3000)