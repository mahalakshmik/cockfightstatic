// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /* Production/Beta URL End points */
 // api:'https://cockfightkaichon.azurewebsites.net/api/',
  ProductUrl:"https://lgistorage.blob.core.windows.net/fmsimages/",
  azureimgUrl:"https://lgistorage.blob.core.windows.net/fmsimages/",
  videoUrl:"https://lgistorage.blob.core.windows.net/fmsvideos/",
  imgUrl:"https://cockfightkaichon.azurewebsites.net/Images/",
  azureblobImgUrl:'https://lgistorage.blob.core.windows.net/fmsimages/',
  sas :
    'sp=r&st=2022-08-03T19:40:38Z&se=2022-08-04T03:40:38Z&spr=https&sv=2021-06-08&sr=c&sig=0%2FCosr%2BcZKsAqkp7lL3ieunRX8jJVVSMS8Lmb2arHtY%3D',
  videosas :
    'sp=racwdl&st=2022-05-31T16:40:31Z&se=2023-01-03T00:40:31Z&spr=https&sv=2020-08-04&sr=c&sig=GL2giHB4GndIybklT1P6tuIAvI7%2B%2BcUD9799sHnBVHQ%3D',
  /* Local host URL end points  */
  
  api:'http://localhost:13866/api/',
  // ProductUrl:"http://localhost:13866/Uploads/Products",
  // imgUrl:"http://localhost:13866/Images/",
// azureblobUrl:'https://audiencestreetcreatives.blob.core.windows.net/videos/'x`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
