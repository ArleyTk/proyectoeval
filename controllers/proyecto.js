const {response} = require('express')
const bcrypt = require('bcrypt') //Encriptar
//Importación de los modelos
const Proyecto = require('../models/proyecto')
const jwt = require("jsonwebtoken")
const { generarJWT } = require('../helpers/generar_jwt')

//Método GET de la API
const proyectoGet = async (req, res = response) => {
    const { integrantes } = req.query;

    try {
        let proyectos;

        if (integrantes) {
            proyectos = await Proyecto.find({ numeroIntegrantes: parseInt(integrantes) });
        } else {
            proyectos = await Proyecto.find();
        }

        res.json({ proyectos });
    } catch (error) {
        console.error('Error al buscar el proyecto:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}



//Método POST de la api
const proyectoPost = async(req, res) => {
    let mensaje = 'Inserción Exitosa :D'
    let token = "";
    const {idproyecto} = req.body;
    const body = req.body //Captura de atributos
    try {
        const proyecto = new Proyecto(body) //Instanciando el objeto
        await proyecto.save() //Inserta en la colección


        if(idproyecto!=""){
            token = await generarJWT(idproyecto);
            res.cookie("token",token);

            mensaje +=(' , su token es:'+token)
        }

    } catch (error) {
        mensaje = error
        console.log(error)
    }
        res.json({
        msg: mensaje
    })
}

//Juan Sebastián Granada

//Modifcación
const proyectoPut = async(req, res = response) => {

    const {_id, idproyecto, descproyecto, precioproyecto, fechaproyecto, productosproyecto, clienteproyecto} = req.body
    let mensaje = 'Modificación exitosa'
    try{
         await Proyecto.findOneAndUpdate({idproyecto: idproyecto}, {$set: {
            descpedido:descpedido, nombreproyecto:nombreproyecto, horasDedicadas:horasDedicadas, valorProyecto: valorProyecto, numeroIntegrantes:numeroIntegrantes
    }}) 
         
           
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la modificación.'
    }

    res.json({
        msg: mensaje
    })
}

//Eliminación
const proyectoDelete = async(req, res) => {

    const {idproyecto} = req.query
    let mensaje = 'La eliminiación se efectuó exitosamente.'

    try{
        const proyecto = await Proyecto.deleteOne({idproyecto: idproyecto})
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la eliminación.'
    }

    res.json({
        msg: mensaje
    })
}


const listarProyectosPorNumeroIntegrantes = async (req, res = response) => {
    const { integrantes } = req.query;

    try {
        if (!integrantes) {
            return res.status(400).json({ mensaje: 'Se requiere el parámetro integrantes en la consulta' });
        }

        const proyectos = await Proyecto.find({ numeroIntegrantes: parseInt(integrantes) });

        res.json({ proyectos });
    } catch (error) {
        console.error('Error al buscar los proyectos por número de integrantes:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}




module.exports = {
    proyectoGet,
    proyectoPost,
    proyectoPut,
    proyectoDelete,
    listarProyectosPorNumeroIntegrantes // Agregar el nuevo método al export
}