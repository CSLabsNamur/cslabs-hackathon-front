import { User } from "./user";

export class Team {
  id: string;
  name: string;
  description: string;
  idea: string;
  token?: string;
  valid?: boolean;
  members: User[] = [];
  createdAt?: Date;
}
