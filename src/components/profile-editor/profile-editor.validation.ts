import {IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength} from "class-validator";

export class ProfileEditorValidation {

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
  github: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, {message: "L'URL est invalide."})
  @MaxLength(1024, {message: "L'URL doit être de maximum 1024 caractères."})
  linkedIn: string;

  @IsOptional()
  @IsString()
  @MaxLength(2048, {message: "La remarque doit comporter maximum 2048 caractères."})
  note: string;
}
