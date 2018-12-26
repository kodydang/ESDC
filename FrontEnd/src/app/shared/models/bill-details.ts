import { Base } from './base';

export class BillDetails extends Base {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  billId: number;

  constructor(item) {
    super(item.createdDate || item.createDay);
    this.id = item.id || item.idBillinfo;
    this.productId = item.productId || item.idProduct;
    this.billId = item.billId || item.idBill;
    this.quantity = item.quantity || item.quantities;
    this.price = item.price;
  }

}
