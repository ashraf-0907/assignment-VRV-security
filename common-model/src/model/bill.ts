export enum PaymentStatus {
  FULLYPAID = "FULLYPAID",
  PARTIALLYPAID = "PARTIALLYPAID",
  NOPAID = "NOPAID",
}

export class Bill {
  billName: string;
  businessId: string;
  purchasedProducts: [];
  totalAmount: number;
  totalAmountPaid: number;
  billDate: Date;
  dueDateForPayment: Date;
  paymentStatus: PaymentStatus;

  constructor(
    billName: string,
    businessId: string,
    purchasedProducts: [],
    totalAmount: number,
    totalAmountPaid: number,
    billDate: Date,
    dueDateForPayment: Date,
    paymentStatus: PaymentStatus
  ) {
    this.businessId = businessId;
    this.purchasedProducts = purchasedProducts;
    this.billDate = billDate;
    this.billName = billName;
    this.totalAmount = totalAmount;
    this.totalAmountPaid = totalAmountPaid;
    this.dueDateForPayment = dueDateForPayment;
    this.paymentStatus = paymentStatus;
  }

  static getDefaultBill(): Bill {
    return new Bill(
      "",
      "",
      [],
      0,
      0,
      new Date(Date.now()),
      new Date(Date.now()),
      PaymentStatus.NOPAID
    );
  }

  static fromJson(billObject : Bill){

    let bill:Bill = null
    
    if(billObject){

        bill = this.getDefaultBill();

        bill.billDate = billObject.billDate ?? new Date(Date.now());
        bill.billName = billObject.billName ?? "";
        bill.businessId = billObject.businessId;
        bill.dueDateForPayment = billObject.dueDateForPayment ?? new Date(Date.now());
        bill.paymentStatus = billObject.paymentStatus ?? PaymentStatus.NOPAID;
        bill.purchasedProducts = billObject.purchasedProducts ?? [];
        bill.totalAmount = billObject.totalAmount ?? 0;
        bill.totalAmountPaid = billObject.totalAmountPaid ?? 0;
        
    }
  }
}
