const express = require('express')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const app = express()
const port = 5000
const productRouter=require('./routes/products')


dotenv.config()
mongoose.connect(process.env.MONGO_URL).then(()=>{console.log('DB connection successful')}).catch((err)=>{console.log(err)})
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({limit:"10mb",extended:true}));

try{
app.use('/api/products',productRouter);
console.log('hello world')
}
catch(err){
    console.log(err);
}


app.listen(process.env.PORT || port, () => console.log(`Server is running  on port ${process.env.PORT}!`))


