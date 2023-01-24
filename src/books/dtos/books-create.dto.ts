import { IsNotEmpty } from 'class-validator';
import { Length, IsString, IsNumber, Min, Max, IsUUID } from 'class-validator';

export class BooksCreateDTO {
  @Length(5,50)
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(1000)
  price: number;

  @IsNotEmpty()
  @IsUUID()
  authorId: string;
}