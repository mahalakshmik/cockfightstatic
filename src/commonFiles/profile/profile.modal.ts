export class ProductMaster {
    productID: any=0;
    productCode: any='0';
    productName: any;
    productType: any ='2165';
    gender: any | null;
    breedType: any | null;
    sellerId: any;
    talents: any | null;
    fightingRecord: any| null;
    productBrand:any | null;
    dateOfBirth:  any='1944-05-31T06:21:21.373Z';
    uom: any;
    weight: any;
    standardPrice: any;
    discount: any;
    currency: any;
    paymentOption: any | null;
    productImage: any;
    remarks: any='test';
    isActive: boolean=true;
    isAvailable: boolean=true;
    stockQty: any;
    createdOn: any='1944-05-31T06:21:21.373Z';
    modifiedOn: any ='1944-05-31T06:21:21.373Z';
    age: any | null;
    breed: number=0;
    province: any;
    ageType: any | null;
}
export class MessageHeader {
    messageId: number =0;
    senderId: any | null;
    receiverId: any | null;
    productId: any | null;
    createdOn: any ;
    messageSubject: any;
    isPrivate: boolean = false ;
    fileName: any='';
    comment: any;
}