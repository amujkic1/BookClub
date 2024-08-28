const mongoose = require('mongoose');
require('dotenv').config();

const uri = 'mongodb+srv://amujkic1:bookclub123@bookclubcluster.q2wztrm.mongodb.net/?retryWrites=true&w=majority&appName=BookClubCluster';

async function connectToDatabase()
{

    await mongoose.connect(process.env.MONG_URI,{useNewUrlParser:true,useUnifiedTopology:true});
    console.log('Connect to Mongo');
}

connectToDatabase();

module.exports = mongoose;