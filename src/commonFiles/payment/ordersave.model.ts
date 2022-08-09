export class OrderSave {
    orderID: number = 0;
    orderNo: any = "0";
    orderDate: any;
    memberID: any;
    orderStatus: number = 2181;
    addressID: any;
    orderAmount: any;
    discountAmount: any;
    taxAmount: number = 0;
    totalAmount: any;
    currency: any = 'th';
    paidAmount: any = '0';
    isCancel: boolean = true;
    isDelivered: boolean = true;
    remarks: any = "test";
    cancelBy: any;
}
export class Notificationvm {
    notificationId: number = 0;
    memberId: number | undefined;
    senderId: number | undefined;
    message: any;
    isRead: boolean = false;
    createdOn: any;
}