import { Employee } from './employee';
import { Customer } from './customer';
import { Base } from './base';

export class Bill extends Base {
  id: number;
  employeeId: number;
  totalPrice: number;
  storeId: number;
  customerId: number;
  customer?: Customer;
  employee?: Employee;

  constructor(item) {
    super(item.createdDate || item.createDay);
    this.id = item.id || item.idBill;
    this.employeeId = item.employeeId || item.idEmp;
    this.totalPrice = item.totalPrice;
    this.storeId = item.storeId || item.idStore;
    this.customerId = item.customerId || item.idCustomer;

    item.employee ? this.employee = new Employee(item.employee) : null;
    item.customer ? this.customer = new Customer(item.customer) : null;
  }
}
