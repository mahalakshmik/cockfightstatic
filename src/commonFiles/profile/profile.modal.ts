export class ProductMaster {
    productID: any=0;
    productCode: any=0;
    productName: any;
    productType: any | null;
    gender: any | null;
    breedType: any | null;
    sellerId: any;
    talents: any;
    fightingRecord: any;
    productBrand: any;
    dateOfBirth: any | null;
    uom: any;
    weight: any;
    standardPrice: any;
    discount: any;
    currency: any;
    paymentOption: any | null;
    productImage: any;
    remarks: any;
    isActive: any;
    isAvailable: any | null;
    stockQty: any;
    createdOn: any;
    modifiedOn: any | null;
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