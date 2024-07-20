import { IsNumber, IsString } from 'class-validator';

export class GetPizzaDTO {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  rating: number;

  @IsString()
  imageUrl: string;

  @IsString({ each: true })
  ingredients: string[];

  @IsString({ each: true })
  instructions: string[];
}
