import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRespository } from "../repositories/UsersRespository";
import * as yup from 'yup';
import { AppError } from "../errors/AppError";
//import { AppError } from '../errors/AppError';

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        // Obrigatório apra cadastrar usuário
        const scheme = yup.object().shape({
            name: yup.string().required("Nome é obrigatório!"),
            email: yup.string().email("Email inválido!").required("Email é obrigatório")
        })  
        
 // Primeira forma de validar:
        // Valindo o objeto, se não for válido:
        //    if( !(await scheme.isValid(request.body)) ) {
        //        return response.status(400).json (
        //            {error: "Validation Failed!"}
        //        );
        //    }

        // Segunda forma de validar
        // Com try catch tratando:
        try {
            await scheme.validate(request.body,{abortEarly: false}); // AbortEarly para fazer todas as validações
        } catch (err) {
            throw new AppError(err);
        }

        const usersRepository = getCustomRepository(UsersRespository);

        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if(userAlreadyExists){
            throw new AppError("User Already exists");
        }

        const user = usersRepository.create(
            {
                name: name,
                email: email
            }
        );


        await usersRepository.save(user);
        return response.status(201).json(user);
    }


}

export { UserController };
