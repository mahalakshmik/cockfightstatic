# Myapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.

## Development server
<!-- test -->
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
note:added Ngx spinner if we get any version we need to remove , it supports only 12-v.

##spinner code
  1.  public spinnerService: NgxSpinnerService,
   2. this.spinnerService.show();

   #send message to seller without file upload filename default is 'nofile'
  
>>>comments example taken form this link
https://stackblitz.com/edit/ng-comment-tree?file=src%2Fapp%2Fapp.component.ts

##Updated header count using behaviour subject
1.it is autorefresh concept
2.check notficatin service how the header is updating for message and inbox.(VVIMP)

#add to cart logic
cartitem.Quantity = cartitem.Quantity + 1;
                    cartitem.TotalAmount = cartitem.Quantity * cartitem.UnitPrice;
                    //cartitem.DiscountAmount = cartitem.Quantity * cartitem.DiscountAmount;