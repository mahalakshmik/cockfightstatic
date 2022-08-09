export class Member {
    userId: number | undefined;
    userName: string | undefined;
    password: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    emailId: string | undefined;
    mobileNo: string | undefined;
    countrycode: any;
    memberType: any | undefined;
    otp: string | undefined;
    isOtpsent: boolean | undefined;
    otpsentDate: string | undefined;
    isResendOtp: boolean | undefined;
    isOtpverified: boolean | undefined;
    isActive: boolean | undefined;
    createdOn: string | undefined;
    aboutUs: string | undefined;
    website: string | undefined;
    profilePhoto: string | undefined;
    isAcceptedTermsConditions: boolean | undefined;
  valid: any;

    
}
export class Address {
    addressId: number | undefined;
    linkId: number |undefined;
    addressType: number | undefined;
    addressName: string | undefined;
    mobileNo: string | undefined;
    zipCode: string | undefined;
    locality: string | undefined;
    memberAddress: string | undefined;
    state: string | undefined;
    country: number | undefined;
    landmark: string | undefined;
    alternateNo: string | undefined;
    isActive: boolean = true;
        // createdOn: string | undefined;
    // modifiedOn: string | undefined;
    
}
