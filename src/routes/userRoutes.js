const express=require('express');  //: Imports the Express.js framework.
const router=express.Router(); // Creates an instance of an Express router, which is a mini-app that can handle routes
const userController=require('../controllers/userController'); //Imports the userController module that likely contains functions to handle user-related operations.
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - documentType
 *         - document
 *         - email
 *         - password
 *         - role
 *       properties:
 *         _id:
 *           type: string
 *           description: Identificador único del usuario.
 *         firstName:
 *           type: string
 *           description: Nombre del usuario.
 *         lastName:
 *           type: string
 *           description: Apellido del usuario.
 *         documentType:
 *           type: string
 *           description: Tipo de documento del usuario.
 *         document:
 *           type: string
 *           description: Número de documento del usuario.
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario (debe ser único).
 *         password:
 *           type: string
 *           description: Contraseña del usuario.
 *         role:
 *           type: string
 *           description: Rol del usuario (por defecto, 'guest').
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: Crea un nuevo usuario con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Error en la solicitud o datos no válidos.
 */
router.post('/register', userController.createUser); //


/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     description: Obtiene un usuario por su identificador único (ID).
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Token de autenticación JWT.
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a buscar.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Usuario encontrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: Detalles del usuario encontrado.
 *       '401':
 *         description: No autorizado, token no proporcionado o inválido.
 *       '403':
 *         description: Acceso prohibido debido a permisos insuficientes.
 *       '404':
 *         description: Usuario no encontrado.
 *       '500':
 *         description: Error en el servidor al procesar la solicitud.
 */
router.get('/user/:id',verifyToken,userController.getUserByPk); //

module.exports=router; //Exports the configured router for use in other parts of the application.


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Inicia sesión con las credenciales proporcionadas y devuelve un token JWT válido.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *     responses:
 *       '200':
 *         description: Inicio de sesión exitoso. Devuelve un token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT generado para el usuario autenticado.
 *       '401':
 *         description: Credenciales inválidas o no autorizadas.
 *       '500':
 *         description: Error en el servidor al procesar la solicitud.
 */
router.post('/login',userController.login);

function verifyToken(req, res, next) {
    const token = req.headers.authorization.replace('Bearer ', '');
    
    console.log(token);

    if (!token) {
      return res.status(403).json({ message: 'Token no proporcionado' });
    }
  
    jwt.verify(token, 'secreto', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido' });
      }
  
      req.userId = decoded.userId;
      next();
    });
  }