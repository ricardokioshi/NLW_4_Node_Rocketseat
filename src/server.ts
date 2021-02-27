import express, { response } from 'express';

const app = express();

/* 
***GET => BUSCAR
***POST => SALVAR
***PUT => ALTERAR
***DELETE => DELETAR
***PATCH => ALTERAÇÃO ESPECIFICA
 */

 // http://localhost:3333/users

 app.get("/",(request,response) => {

    return response.json({message: "Hello word - NLW4" });
 });

 // 1 param => Rota(Recurso API)
 // 2 param => request,response

 app.post("/",(request,response) => {
     //Recebeu os dados para salvar
     return response.json({message:"Os dados foram salvos!"});
 });


app.listen(3333, () => console.log("Server is running"));