import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {IsSameAs} from '../../validators/is-same-as.validator';
import {IsTrue} from '../../validators/is-true.validator';

export class RegistrationValidation {
  @IsString()
  @IsNotEmpty({ message: "Veuillez entrer une adresse email." })
  @IsEmail({}, { message: "L'adresse email est invalide." })
  email: string;

  @IsString()
  @MinLength(7, { message: "Le mot de passe doit contenir minimum 7 caractères." })
  password: string;

  @IsString()
  @MinLength(7, { message: "Le mot de passe doit contenir minimum 7 caractères." })
  @IsSameAs('password', { message: "Les mots de passe ne correspondent pas." })
  passwordConfirm: string;

  @IsString()
  @MinLength(3, { message: "Le prénom doit contenir minimum 3 caractères." })
  @MaxLength(35, { message: "Le prénom doit contenir maximum 35 caractères." })
  @Matches(/^([ \u00c0-\u01ffa-zA-Z'-])+$/, { message: "Le prénom est invalide." })
  firstName: string;

  @IsString()
  @MinLength(3, { message: "Le nom doit contenir minimum 3 caractères." })
  @MaxLength(35, { message: "Le nom doit contenir maximum 35 caractères." })
  @Matches(/^([ \u00c0-\u01ffa-zA-Z'-])+$/, { message: "Le nom est invalide." })
  @Matches(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
  lastName: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, {message: "L'URL est invalide."})
  @MaxLength(1024, {message: "L'URL doit être de maximum 1024 caractères."})
  github?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, {message: "L'URL est invalide."})
  @MaxLength(1024, {message: "L'URL doit être de maximum 1024 caractères."})
  linkedIn: string;

  @IsOptional()
  @IsString()
  @MaxLength(2048, {message: "La remarque doit comporter maximum 2048 caractères."})
  note?: string;
  
  @IsBoolean()
  @IsTrue( {message: "Il est nécessaire d'accepter les modalités pour s'inscrire."})
  rulesAgreement: boolean;
  
  @IsBoolean()
  @IsTrue({message: "Il est nécessaire d'accepter le règlement pour s'inscrire."})
  conditionsAgreement: boolean;
}
