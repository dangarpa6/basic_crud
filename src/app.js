const express = require ('express');
const db = require("./utils/database");
const Users = require('./models/users.model');

//creamos una instancia de express llamada app

db.authenticate() // es una funcion asincrona
.then(()=>console.log('base de datos conectada'))
    .catch((err)=>console.log(err));

db.sync()
.then(() => console.log('BAse de datos sincronizada'))
.catch(error=> console.log(error))

const app = express();

app.use(express.json())

app.get('/', (req,res)=>{
    res.send('servidor funcionando');
});

app.post('/users', async (req,res)=>{
    try{
        // extraemos el cuerpo de peticiion
        // {firstname, lastname, email, paossword}
        const newUser = req.body;
        await Users.create(newUser);
        res.status(201).send();

    } catch (error){
        res.status(400).json(error);
    }
})

// obtener a todos los usuarios de la base de datos
// SELECT * FROM users;
// con siquelize es Users.findAll()

app.get('/users', async(req, res) =>{
try{
    const users = await Users.findAll({
        attributes: ["firstname", "lastname", "email"], // esta es la forma de especificar la informacion que queires obtener
    });
    res.json(users)
}catch (error){
res.status(400).json(error);
}

});

// get user by id

app.get("/users/", async (req,res)=>{
    try{
        // para recuperar el parametro de ruta
        //? es un objeto {aidi: 5,id: 3}
        const {id} = req.params;
        console.log(req.params);
        
        const user = await Users.findByPk( id, {
            atttributes: {
                exclude: ["password"],
            }
        });

    }catch (error){
        res.status(400).json(error);
    }
});



app.listen(8000, ()=>{
    console.log("servidor escuchando en el pto 8000")
});

app.get("users/email/:email" , async (req,res) =>{
    try{
        const {email} = req.params;
        const user = await Users.findOne({
            where: {email}, // {email: email}
        });
        console.log(user);
        res.json(user);
    } catch (error) {
        res.status(400).json(error);
    }
});

app.delete("/users/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        await Users.destroy({
            where: {id}
        });
        res.status(204).send();
    } catch (error){
        res.status(400).json(error);
    }
});

app.put("/users/:id", async (req,res) =>{
    try{
        const {id} = req.params;
        const {firstname, lastname} = req.body;
        await Users.update (
            {firstname, lastname, id},
            {
                where: {id},
            }
        );
        res.status(204).send();
    }catch (error){
        res.status(400).json(error);
    }
});

app.listen(8000, () =>{
    console.log("Servidor escuchando en el pto 8000")
}

)