import { IProject } from "src/domain/interface/project.interface";
import { ITask } from "src/domain/interface/task.interface";
import { IUser } from "src/domain/interface/user.interface";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";
import { TaskEntity } from "./task.entity";

@Entity("users")
export class UserEntity implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    firstName: string;
    
    @Column({nullable: false})
    lastName: string;

    @Column({nullable: false, unique: true})
    email: string;

    @Column({nullable: false})
    password: string;

    @OneToMany(() => ProjectEntity, project => project.user, {
        cascade: true,
        nullable: true
    })
    projects: IProject[];

    @OneToMany(() => TaskEntity, task => task.user, {
        cascade: true,
        nullable: true
    })
    tasks: ITask[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}