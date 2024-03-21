const express = require('express');
const bodyParser = require('body-parser')
const connectDB = require('./config/database');
const routes = require('./routes/indexRoute');

const app = express();
const port = 4000;

// Conecta a la base de datos MongoDB
connectDB();


//llamamos la forma de autenticar
const auth = require("./middleware/auth")


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


//Llamamos al metodo de INICIALIZAR
app.use(auth.initialize());


// Configura las rutas
app.use('/', routes);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));