//creamos nuestra bd
const mongoose =require('mongoose')

URI=('mongodb://localhost/bdPersona')

mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
})
.then (db => console.log('Base de datos conectada', db.connection.name))
.catch(error => console.log(error))

module.exports= mongoose