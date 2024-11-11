import {IsBoolean, IsOptional, IsString, MaxLength, MinLength} from "class-validator";
import {IsTrue} from "@/validators/is-true.validator.ts";

export class TeamEditorValidation {

  @IsString()
  @MinLength(3, {message: "Le nom de l'équipe doit avoir minimum 3 caractères."})
  @MaxLength(35, {message: "Le nom de l'équipe ne peut pas dépasser les 35 caractères."})
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(1024, {message: "La description ne peut pas dépasser les 1024 caractères."})
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(1024, {message: "L'idée ne peut pas dépasser les 1024 caractères."})
  idea: string;

  @IsBoolean()
  @IsTrue( {message: "Il est nécessaire d'accepter les modalités pour créer une équipe."})
  rulesAgreement: boolean;

  @IsBoolean()
  @IsTrue({message: "Il est nécessaire d'accepter le règlement pour créer une équipe."})
  conditionsAgreement: boolean;

}
