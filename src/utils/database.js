//vamos a gestionar la conexion con una base de datos
// * lo primero sequelize

const {Sequelize} = require('sequelize');
require('dotev').config(); 

// * crear una instancia de sequelize con la configuracion de conexion

const db = new Sequelize({
    host: process.env.DB_HOST ,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD ,
    dialect: "postgres",
    dialectOptions: {ssl: { require: true, rejectUnauthorized: false}},
});

module.exports= db;

// postgres://users_crud_hujm_user:NbAExmXgP0rAE4EaX2VkTYhvnTq1FG2k@dpg-che1q6bhp8ubgo1ruma0-a.oregon-postgres.render.com/users_crud_hujm

