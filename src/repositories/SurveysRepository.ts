import { EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Survey";


@EntityRepository(Survey)
class SurveysRpository extends Repository<Survey> {} 

export { SurveysRpository };



