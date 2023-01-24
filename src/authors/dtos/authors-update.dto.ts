import { IsNotEmpty } from "class-validator";
import { IsString, Length } from "class-validator";

export class UpdateAuthorsDTO {
  @IsNotEmpty()
  @Length(3,100)
  @IsString()
  name: string;

  @IsNotEmpty()
  @Length(1,3)
  @IsString()
  country: string;
}