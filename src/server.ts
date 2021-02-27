import 'reflect-metadata'
import express, { response } from 'express';
import "./database";
import { router } from './routes';

const app = express();

/* 
***GET => BUSCAR
***POST => SALVAR
***PUT => ALTERAR
***DELETE => DELETAR
***PATCH => ALTERAÇÃO ESPECIFICA
 */

 // http://localhost:3333/users

app.use(express.json()) ;
app.use(router)

app.listen(3333, () => console.log("Server is running"));