import { DeepPartial } from "typeorm";
import { IProject } from "../interface/project.interface";

export interface IProjectsRepository {
    findAllByUserId(userId: number): Promise<IProject[]>;
    findById(id: number): Promise<IProject | null>;
    add(payload: DeepPartial<IProject>): Promise<IProject>;
}