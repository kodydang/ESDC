import { Base } from './base';
import { Employee } from './employee';

export class Store extends Base {
  'id': number;
  'name': string;
  'address': string;
  'logo': string;
  'ownerUsername': string;
  'ownerName': string;
  'ownerId': number;
  'employees': Employee[];

  constructor(item) {
    super(item.createdDate || item.createDay);
    this.id = item.id || item['idCuahang'];
    this.name = item.name;
    this.address = item.address;
    this.logo = item.logo || 'https://www.freeiconspng.com/uploads/no-image-icon-4.png';
    this.ownerName = item.owner || item.ownerName;
    this.ownerId = item.ownerId;
    this.ownerUsername = item.ownerUsername;
    this.employees = [];
    if (item['nhanviensByIdCuahang']) {
      this.employees = item['nhanviensByIdCuahang'].map(i => new Employee(i));
    }
  }
}
