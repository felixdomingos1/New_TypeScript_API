import express from "express";
import UserController from "./controllers/UserController/UserController";
import PostController from "./controllers/PostController/PostController";

const app = express()

const PORT = 3001;

app.use(express.json());
app.get('/', (req, res)=>{
    return res.status(200).send({message:'Eu vou'}) 
});
app.post('/creatingUser', UserController.createUser)
app.post('/creatingPost', PostController.createPost)

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
