import { ITask } from "../interface/task.interface";
import { Project } from "./project";
import { User } from "./user";

export class Task implements ITask {
    id: number;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
    project: Project;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}