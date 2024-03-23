const mongoose = require("mongoose")
let User

const connectDatabase = async () => {
    try{
        if(!User){
            User = mongoose.model('User', require('../models/userModel').schema);
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
