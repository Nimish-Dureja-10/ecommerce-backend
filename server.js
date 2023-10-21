import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import morgan from "morgan"; //morgan module tell us that which api has been hit while requesting.
import cors from "cors"
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import path from "path"

//configure env
dotenv.config();

//database config
connectDB();

const app = express();

const allowedUrls = [
    'https://ecommerce-frontend-ybfn3bt4s-nimish-dureja-10.vercel.app',
    'ecommerce-frontend-ashen-sigma.vercel.app'
]

//middleware
app.use(cors({
    origin : allowedUrls,
    credentials : true,
    methods : ["POST",'GET','PUT','PATCH','DELETE']
}));
app.use(express.json());
app.use(morgan('dev'));

app.get("/",(req,res)=>{
    res.send("Backend Hosted Successfully");
});

//routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoutes);
app.use('/api/v1/products',productRoutes);

//rest api
app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});