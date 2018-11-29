export class Base {
  // 'createdBy': string = '';
  'createdDate': Date;
  // 'updatedBy': string = '';
  // 'updatedDate': Date;

  constructor(
    // createdBy: string,
    createdDate: string,
    // updatedBy: string,
    // updatedDate: string,
  ) {
    // this.createdBy = createdBy;
    this.createdDate = createdDate ? new Date(createdDate) : new Date();
    // this.updatedBy = updatedBy;
    // this.updatedDate = new Date(updatedDate);
  }
}
