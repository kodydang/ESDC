import { Base } from './base';

export class Category extends Base {
  'id': number;
  'name': string;

  constructor(item) {
    // super(item.createdBy, item.createdDate || item['createDay'],
    //  item.updatedBy, item.updatedDate);
    super(item.createdDate || item.createDay);
    this.id = item.id || item['idCategory'];
    this.name = item.name;
  }
}
