import { Base } from './base';
import { Employee } from './employee';

export class Store extends Base {
  'id': number;
  'name': string;
  'address': string;
  'logo': string;
  'ownerName': string;
  'ownerId': number;
  'employees': Employee[];

  constructor(item) {
    // super(item.createdBy, item.createDay, item.updatedBy, item.updatedDate);
    super(item.createdDate || item.createDay);
    this.id = item.id || item['idCuahang'];
    this.name = item.name;
    this.address = item.address;
    this.logo = item.logo || 'https://www.freeiconspng.com/uploads/no-image-icon-4.png';
    this.ownerName = item.owner;
    this.employees = [];
    if (item['nhanviensByIdCuahang']) {
      this.employees = item['nhanviensByIdCuahang'].map(i => new Employee(i));
    }
  }
}
