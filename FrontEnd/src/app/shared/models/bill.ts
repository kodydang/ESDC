import { Base } from './base';

export class Bill extends Base {
  id: number;
  employeeId: number;
  totalPrice: number;
  storeId: number;
  customerId: number;

  constructor(item) {
    super(item.createdDate || item.createDay);
    this.id = item.id || item.idBill;
    this.employeeId = item.employeeId || item.idEmp;
    this.totalPrice = item.totalPrice;
    this.storeId = item.storeId || item.idStore;
    this.customerId = item.customerId || item.idCustomer;
  }
}
