const mongoose = require("mongoose")
let User
let Empresa

const connectDatabase = async () => {
    try{
        if(!User){
            User = mongoose.model('usuarios', require('../models/userModel').schema);
        }

        if(!Empresa){
            Empresa = mongoose.model('empresas', require('../models/empresaModel').schema);
        }

        await mongoose.connect('mongodb+srv://sebasrojasm1:zdnijfhgzXuIpJAp@cluster0.xhkv5f6.mongodb.net/')
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.log(err));

        await initializeData();

        
    } catch(error){
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}


const initializeData = async () => {
    try {

        console.log('Data successfully initialized');
        
    } catch (error) {
        console.error('Data initialization error:', error);
        process.exit(1);
    }
};

module.exports = connectDatabase;
