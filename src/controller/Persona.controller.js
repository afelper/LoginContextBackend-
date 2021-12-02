const UsuarioCtrl={}
const Usuario = require('.././models/Persona.models')
const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')

UsuarioCtrl.crear=async(req,res)=>{
    const {nombres, correo, password} = req.body

    const NuevoUsuario = new Usuario({
        nombres,
        correo,
        password,
        
    })


    const correoUsuario = await Usuario.findOne({correo:correo})
    if(correoUsuario)
    {
        res.json({
            mensaje: 'El correo ya existe'
        })
    }

    else {

        NuevoUsuario.password = await bcrypt.hash(password,10)
        const token = jwt.sign({_id:NuevoUsuario._id},'Secreto')
        await NuevoUsuario.save()

        res.json({
            mensaje: 'Bienvenido',
            id: NuevoUsuario._id,
            nombre: NuevoUsuario.nombres,
            token
        })

    }
}



UsuarioCtrl.listar=async(req, res)=>{
    const respuesta = await Usuario.find()
    res.json(respuesta)
}

UsuarioCtrl.listarId = async(req, res)=>{
    const id = req.params.id
    const respuesta = await Usuario.findById({_id: id})
    res.json(respuesta)
}


UsuarioCtrl.eliminar= async(req, res) => {
    const id = req.params.id
    await Usuario.findByIdAndRemove({_id:id})
    res.json({
        mensaje: 'Usuario eliminada'
    })
}

UsuarioCtrl.actualizar= async(req, res) => {
    const id = req.params.id
    await Usuario.findByIdAndUpdate({_id:id}, req.body)
    res.json({
        mensaje: 'Usuario actualizada'
    })
}


//método login
UsuarioCtrl.login = async(req, res) =>{
    const {correo, password} = req.body
    const checkUser = await Usuario.findOne({correo: correo})
    if(!checkUser){
        //no esta registrado
        return res.json({
            mensaje: 'Correo incorrecto'
        })
    }

    //comparar password capturada con la base de datos
    const match = await bcrypt.compare(password, checkUser.password)
    if(match){
        const token = jwt.sign({_id: checkUser._id}, 'Secreta')
        res.json({
            mensaje: 'Bienvenido',
            id: checkUser._id,
            nombre: checkUser.nombres,
            token
        })
    }
    else{
        res.json({
            mensaje: 'Contraseña incorrecta'
        })
    }

}

module.exports = UsuarioCtrl