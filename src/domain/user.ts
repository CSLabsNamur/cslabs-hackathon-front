import { Team } from "./team";

export class User {
  id: string;
  email?: string;
  firstName: string;
  lastName: string;
  github?: string;
  note?: string;
  linkedIn?: string;
  isTeamOwner? = false;
  paidCaution? = false;
  isAdmin? = false;
  voteId?: string;
  team?: Team;
  createdAt?: Date;
  imageAgreement? = false;

  subscribeFormation = false;

  [key: string]: any; // Allows to get any property of the object as a dictionary
}
