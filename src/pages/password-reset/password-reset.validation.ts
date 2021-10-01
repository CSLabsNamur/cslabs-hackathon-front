import {IsString, MinLength} from "class-validator";
import {IsSameAs} from "../../validators/is-same-as.validator";

export class PasswordResetValidation {

  @IsString()
  @MinLength(7, { message: "Le mot de passe doit contenir minimum 7 caractères." })
  password: string;

  @IsString()
  @MinLength(7, { message: "Le mot de passe doit contenir minimum 7 caractères." })
  @IsSameAs('password', { message: "Les mots de passe ne correspondent pas." })
  passwordConfirm: string;

}
