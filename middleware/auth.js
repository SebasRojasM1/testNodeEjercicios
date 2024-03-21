const passport = require("passport")
const { Strategy, ExtractJwt } = require("passport-jwt")
const Clientes = require("../models/clientesModel")


const jwt_secret = "##%asasasasa"

const strategy = new Strategy(

    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwt_secret
    },


    //Payload (contrato) es el JSON en un formato especifico
    async (jwtPayload, done) => {
        try {
            const clientes = await Clientes.findById({idUser: jwtPayload.findById})

            //Por si no hay info/error
            if (!clientes){
                const error = new Error("User not found")
                console.log(error)
            }


            //done() es para cuando la accion sea exitosa
            done(null, clientes)

        } catch (error) {
            done(error)
        }
    }
);

//Llamamos la libreria y la usamos
passport.use(strategy) 


//Dos constantes. 1. Inicializar el archivo raiz de nuestro programa, 2. De nuestra ruta

//Inicializar
const initialize = () => {
    return passport.initialize()
}


//Autentificar el acceso a las APIs
const authenticate = () => {
    return passport.authenticate("jwt", {
        session: false
    })
}

module.exports = {
    initialize,
    authenticate
}