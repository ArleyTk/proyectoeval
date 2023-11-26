require('dotenv').config() //Importar paquete dotenv. Variables de entorno
const  Server   = require('./models/server')

const server = new Server() //Instancinpmar el objeto Server

server.listen()//Iniciar Servidor Local

