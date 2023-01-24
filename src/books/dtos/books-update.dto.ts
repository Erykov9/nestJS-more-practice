import { IsNotEmpty } from 'class-validator';
import { Length, IsString, IsInt, Min, Max, IsUUID} from 'class-validator';

export class BooksUpdateDTO {
  @Length(3,100)
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  rating: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(1000)
  price: number;

  @IsNotEmpty()
  @IsUUID()
  authorId: string;
}