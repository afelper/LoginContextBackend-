const mongoose = require('mongoose')
const Schema = mongoose.Schema

//ciudad: codigo id

const usuarioSchema = new Schema({
    nombres: {type: String, required: [true, 'Nombre obligatorio']},
    correo: String,
    password: {type: String, required: [true, 'Nombre obligatorio']}, 
 
    date:{type:Date, default:Date.now}

})

module.exports=mongoose.model('usuario', usuarioSchema)