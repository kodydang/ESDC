export class Base {
  'createdDate': Date;

  constructor(createdDate: string) {
    this.createdDate = createdDate ? new Date(createdDate) : new Date();
  }
}
