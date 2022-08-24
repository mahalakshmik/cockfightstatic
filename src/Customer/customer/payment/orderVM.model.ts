export class OrderVM {
  orderID: any=0;
  orderNo: any='0';
  orderDate: any;
  memberID: any;
  orderStatus: any;
  addressID: any;
  orderAmount: any;
  discountAmount: any;
  taxAmount: any;
  totalAmount: any;
  currency: any;
  paidAmount: any;
  isCancel: boolean = false;
  isDelivered: boolean = false;
  remarks: any;
  createdOn: any;
  modifiedOn: any;
  cancelBy: any;
  canceledOn: any;
  deliveredOn: any;
  paymentConfirmedOn: any;
  closedOn: any;
  isCart: boolean = false;
  orderDetail: any=[];
  deliveryAddress: usp_DeliveryAddressList_Result | undefined;
  orderPayment: orderPayment = new orderPayment;

  //orderPayment: orderPayment ;
}
export class orderdetails {
  itemID: any;
  orderID: any;
  productID: any;
  sellerID: any;
  quantity: any;
  unitPrice: any;
  discountType: any;
  discountAmount: any;
  sellingPrice: any;
  isCancel: boolean = false;
  cancelBy: any;
  isDelivered: boolean = false;
  deliveryID: any;
  deliverDate: string = '';
  createdOn: string = '2022-08-24T02:39:36.104Z';
  modifiedOn: string = '2022-08-24T02:39:36.104Z';
  sellerName: string = '';
  productCode: string = '';
  productName: string = '';
  uOM: any;
  standardPrice: any;
  productImage: string = '';
  cancelByName: string = '';
  paymentOption: any;
  stockQty: any;
  paymentOptionDescription: string = '';
}
export class usp_DeliveryAddressList_Result {
  addressID: any;
  orderID: any;
  addressName: string = '';
  mobileNo: string = '';
  zipCode: string = '';
  locality: string = '';
  address: string = '';
  state: string = '';
  country: string = '';
  landmark: string = '';
  alternateNo: string = '';
}
export class orderPayment {
  paymentID: any=0;
  paymentDate: string = '2022-08-24T02:39:36.104Z';
  orderID: any=0;
  paymentAmount: any;
  referenceNo: string = '';
  paymentMode: any;
  createdOn: string = '2022-08-24T02:39:36.104Z';
  paymentModeDesc: string = '';
}
