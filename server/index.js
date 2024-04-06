import express from "express";
import authRouter from "./Routes/auth.js";
import postRouter from './Routes/post.js'
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();
dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: process.env.frontendURL,
  method:['PUT', 'POST', 'GET', 'DELETE'],
  credentials:true
}))
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const absoluteUploadPath = path.join(__dirname, '..', 'client', 'public', 'uploads');
console.log(absoluteUploadPath);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, absoluteUploadPath)
  },
  filename: function (req, file, cb) {  
    cb(null, Date.now()+file.originalname)
  }
})


const upload = multer({ storage: storage })
app.post('/upload', upload.single('file'), (req, res)=>{
  console.log('upload')
  const file=req.file;
  console.log(file.filename);
  res.status(200).send(file.filename);
})


app.use("/api/auth", authRouter);
app.use('/api/post', postRouter);
// app.use('/api/user', userRouter);

app.use((err, req, res, next) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
    Status: statusCode,
    Error: err.message,
    success: false, 
  });
});

app.listen(PORT, (req, res) => {
  console.log(`Server is listening on the ${PORT} `);
});
