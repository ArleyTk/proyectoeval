const {Router} = require('express')
//Desestructuración. Extraer un atributo de un objeto

const route = Router() 

//Importar métodos del controlador
const {proyectoGet, proyectoPost, proyectoPut, proyectoDelete} = require('../controllers/proyecto')

route.get('/', proyectoGet) //Listar Datos

route.post('/', proyectoPost) //Insertar Datos

route.put('/', proyectoPut) //Modificar Datos

route.delete('/', proyectoDelete) //Eliminar Datos

module.exports = route