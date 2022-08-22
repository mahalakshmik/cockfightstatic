
export class OrderPayment {
    paymentId: number=0;
    paymentDate: string ='';
    orderId: number=0;
    paymentAmount: number | null=0;
    referenceNo: string='';
    paymentMode: number | null=0;
    createdOn: string ='';
    file: any;
}