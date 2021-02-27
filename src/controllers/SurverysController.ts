import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRpository } from "../repositories/SurveysRepository";

class SurveysController {
    async create(request: Request, response: Response) {
        const {title,description} = request.body;

        const surveysRpository = getCustomRepository(SurveysRpository);

        const survey = surveysRpository.create({
            title,
            description
        })

        await surveysRpository.save(survey);

        return response.status(201).json(survey);
    }
    async show(request: Request, response: Response) {
        const surveysRpository = getCustomRepository(SurveysRpository);

        const all = await surveysRpository.find();

        return response.json(all);
    }

}

export { SurveysController };
