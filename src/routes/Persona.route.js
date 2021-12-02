const {Router} = require('express')
const router = Router()
const UsuarioCtrl=require('../controller/Persona.controller')
const Auth = require('../helper/Auth')

//http://localhost:4000/persona/crear

router.post('/crear', UsuarioCtrl.crear)
router.post('/login', UsuarioCtrl.login)
router.get('/listarUsuarios', Auth.verificarToken, UsuarioCtrl.listar)
router.get('/listar/:id', Auth.verificarToken, UsuarioCtrl.listarId)
router.delete('/eliminar/:id', Auth.verificarToken, UsuarioCtrl.eliminar)
router.put('/actualizar/:id', Auth.verificarToken, UsuarioCtrl.actualizar)





module.exports = router