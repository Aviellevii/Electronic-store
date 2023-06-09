const { default: mongoose } = require("mongoose")

const DbConnect = () => {
    try{
        const conn = mongoose.connect(process.env.MONGO_URL);
        console.log("Connect succesffuly");
    }catch(error){
        console.log("connection error");
    }
}

module.exports = DbConnect;