import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRespository } from "../repositories/UsersRespository";
import { SurveysRpository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import SendMailService from "../services/SendMailService";




class SendMailController {

    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRespository);
        const surveysRepository = getCustomRepository(SurveysRpository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const user = await usersRepository.findOne({ email });

        if (!user) {
            return response.status(400).json ({ 
                error: "User does not exists",
            });
        }

        const survey = await surveysRepository.findOne({
            id: survey_id
        });

        if(!survey) {
            return response.status(400).json({
                error: "Survey does not exists!"
            })
        }

        // Salvar as informações na tabela surveyUser
        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id,
        });
        
        await surveysUsersRepository.save(surveyUser);

        // Enviar e-mail para o usuário

       


        await SendMailService.execute(email, survey.title, survey.description)

        return response.json(surveyUser);

    }
}

export { SendMailController }