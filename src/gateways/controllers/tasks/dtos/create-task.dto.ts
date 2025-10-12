import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty({ message: 'Title is required' })
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNotEmpty({ message: 'Status is required' })
    @IsIn(['pending', 'in_progress', 'completed'], {
        message:
            "Status must be one of the following values: 'pending', 'in-progress', 'completed'",
    })
    @IsString()
    status: 'pending' | 'in-progress' | 'completed';

    @IsNotEmpty({ message: 'Project ID is required' })
    @IsNumber()
    projectId: number;
}
