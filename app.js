// Imports
const cors = require('cors');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
require('dotenv').config();
require('ejs');

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Instancia de conexion a la base de datos

//Instancia de conexion con el puerto
const port = process.env.PORT || 4000;

//Archivos estáticos usando la librería path de NodeJS
app.use(express.static(path.join(__dirname, 'public')));
//Configurar el motor de plantitllas EJS
app.set('view engine', 'ejs');

// Routes
app.use('/api', require('./routes/reserva.routes'));

// TODO: Si la petición no coincide con ninguna de las rutas declaradas, mostrar error 404

// Starting the server
app.listen(4000, () => console.log(`Server on port ${port}`));