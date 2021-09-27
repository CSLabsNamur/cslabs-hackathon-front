
export class User {
  id: string;
  email?: string;
  firstName: string;
  lastName: string;
  isTeamOwner = false;
  paidCaution = false;

  constructor(id: string) {
    this.id = id;
  }
}
