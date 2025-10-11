import type { IProject } from "src/domain/interface/project.interface";
import { ITask } from "src/domain/interface/task.interface";
import type { IUser } from "src/domain/interface/user.interface";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";
import { UserEntity } from "./user.entity";

@Entity("tasks")
export class TaskEntity implements ITask {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    title: string;

    @Column({nullable: true})
    description: string;

    @Column({nullable: false})
    status: "pending" | "in-progress" | "completed";

    @ManyToOne(() => ProjectEntity, project => project.tasks, {
        nullable: false,
        cascade: true,
    })
    project: IProject;

    @ManyToOne(() => UserEntity, user => user.tasks)
    @JoinColumn()
    user: IUser;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}