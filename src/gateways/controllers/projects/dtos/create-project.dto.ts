import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @IsString({ message: 'Description must be a string' })
  description: string;
}
