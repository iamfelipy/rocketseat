import express from 'express';
import {createCourse} from './routes';

const app = express();

app.get('/', createCourse);

app.listen(4893,()=>console.log("Server rodando."));