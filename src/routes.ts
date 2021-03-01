import {Router} from "express";
import { AnswerController } from "./controllers/AnswerController";
import { SendMailController } from "./controllers/SendMailController";
import {SurveysController} from "./controllers/SurverysController";
import {UserController} from "./controllers/UserController";
import { NpsController } from './controllers/NpsController';

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

// Para o create de users do controller
router.post("/users", userController.create);

// Para o create de surveys do controller
router.post("/surveys", surveysController.create);
// Para ver todas as pesquisas (surveys)
router.get("/surveys", surveysController.show);

// Rota cadastro da pesquisa de um usuario
router.post("/sendMail", sendMailController.execute);

// Rota para resposta de pesquisa de satisfação
router.get("/answers/:value", answerController.execute);

// Rota para mostrar o NPS de uma pesquisa
router.get("/nps/:survey_id", npsController.execute);


export {router};