const mongoose = require('mongoose');
const {MONGO_DB_URI , MONGO_DB_PASSWORD} = process.env;

mongoose.connect(MONGO_DB_URI.replace("<password>",MONGO_DB_PASSWORD),{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify :false
}).then(()=>{
    console.log("db connected!!");
}).catch((err)=>{
    console.log(err);
});
