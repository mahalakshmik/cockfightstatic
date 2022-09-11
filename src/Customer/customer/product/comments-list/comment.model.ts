

export interface Comment {
    senderName: string;
    createdOn: string;
    messageID: any;
    productID: any;
    senderID: any;
    comment?: Array<Comment>;
  }
  