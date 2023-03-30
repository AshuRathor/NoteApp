const mongoose = require('mongoose')
const mongoURI = "mongodb://127.0.0.1:27017/inotebook?directConnection=true"

const connectToMongoose =()=>{
    // mongoose.set('strictQuery', true);
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongoose")
    })
    // .catch(err => console.log(err))

}


module.exports = connectToMongoose