const mongoose = require("mongoose")
let Students
let Profesores

const connectDatabase = async () => {
    try{
        if(!Students){
            Students = mongoose.model('Students', require('../models/studentsModel').schema);
        }

        if(!Profesores){
            Profesores = mongoose.model('Profesores', require('../models/profesoresModel').schema);
        }

        await mongoose.connect('mongodb+srv://sebasrojasm1:IjnnasA6Fb27gnqF@cluster0.ziozbk9.mongodb.net/')
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
