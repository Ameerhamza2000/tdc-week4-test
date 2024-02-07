const mongoose =require('mongoose');

const connectDB=async ()=>{
    try{
        const db_url= process.env.NODE_ENV==='test'? process.env.TEST_MONGO_URL : process.env.MONGO_URL;

        await mongoose.connect(db_url);
        console.log(`Connected to the mongodb at ${db_url}...`);
    }
    catch(error){
        console.log(`Error while connecting to Mongodb ${error}`);
    }
}

module.exports= connectDB;