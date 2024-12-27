import express from "express";
import path, {dirname} from 'path'
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
// import authMiddleware from "./middleware/authMiddleware.js";


const app = express();
const PORT = process.env.PORT || 3000;

//Get the file path from url of the current module
const __filename=fileURLToPath(import.meta.url)

//get the directory name from the file path
const __dirname=dirname(__filename)

//middleware
app.use(express.json())

//to looke for all files in public
app.use(express.static(path.join(__dirname,'../public')))

//serving up the html from the public directory
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'../public','index.html'))
})

//Routes
app.use('/auth',authRoutes)
app.use('/todos',todoRoutes)

app.listen(PORT, () => console.log(`Server has Started on port: ${PORT}`));
