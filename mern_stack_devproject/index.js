const express =require('express');
const mongoose=require('mongoose');
const devuser =require('./models/devusermodel');
const reviewmodel =require('./models/reviewmodel');
const jwt =require('jsonwebtoken');
const auth = require('./middlewares/middleware')
const {urlencoded,json}=require('express');
const cors =require('cors');
const middleware = require('./middlewares/middleware');
const dotenv = require('dotenv');

const app =express();
app.use(json());
app.use(auth); 

app.use(urlencoded({extended:false}));
dotenv.config();

mongoose.connect(process.env.MONGODB_STRING).then(()=>console.log('DB connected'));

 app.use(express.json());
 app.use(cors(origin="*"));

app.get('/',(req,res)=>res.send('Hello World'))

app.post('/register', async (req,res)=>{
    try {
        console.log(req.body);
        const {fullname,email,mobile,skill,password,confirmpassword}=req.body;
        const exist =await devuser.findOne({email});
        if(exist){
            return res.status(400).send('User already registered');
        }
        if(password!=confirmpassword){
            return res.status(403).send('Password Incorrect');
        }
        let newUser = new devuser({
            fullname,email,mobile,skill,password,confirmpassword
        })
        console.log(newUser);
        await newUser.save();
        return res.status(200).send('User registered');
        
    } catch (error) {
        console.log(error);
        return res.status(500).send('server error')
        
    }
})


app.post('/login', async (req,res)=>{
    try {

        const {email,password}=req.body;
        const exist = await devuser.findOne({email});
        if(!exist){
            return res.status(400).send('User not exists');
        }
        if(exist.password!=password){
            return res.status(400).send('password invalid');
        }
        
        let payload={
            user:{
                id:exist.id
            }
        }
        jwt.sign(payload,'jwtpassword',{expiresIn:360000000},
        (err,token)=>{
            if(err) throw err
            return  res.json({token})


        }
        )   
    }  catch (error) {
        console.log(error);
        return res.status(500).send('server error')
        
    }

})


app.get('/allprofiles',middleware, async (req,res)=>{
    try {
        let allprofiles = await devuser.find();
        return res.json(allprofiles);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send('server error')
        
    }
})

app.get('/myprofile',middleware,async(req,res)=>{
    try{

        let user = await devuser.findById(req.user.id);
        return res.json(user);


    }
    catch (error) {
        console.log(error);
        return res.status(500).send('server error')
        
    }
})


app.post('/addreview',middleware,async(req,res)=>{
    try {

        const{taskwoker,rating}=req.body;
        const exist = await devuser.findById(req.user.id);
        const newReview= new reviewmodel({
            taskprovider:exist.fullname,
            taskwoker,rating
        })
        newReview.save();
        return res.status(200).send('Review update succesfully')
        
    }  catch (error) {
        console.log(error);
        return res.status(500).send('server error')
        
    }

})

app.get('/myreview',middleware,async(req,res)=>{
    try {
        let allreviews = await reviewmodel.find();
        let myreviews=allreviews.filter(review=>review.taskworker.toString()===req.user.id.toString());
        return res.status(200).json(myreviews);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send('server error')
        
    }
})

app.listen(4000,()=>console.log('server running'));