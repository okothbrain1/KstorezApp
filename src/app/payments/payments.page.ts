import { Component, OnInit } from '@angular/core';
import { NgForm ,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

//import * from  './assets/js/smtp.js';
declare let Email : any;
declare var makePayment: any;

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})

export class PaymentsPage implements OnInit { 
  
  foo:string;
  //from the form
  amount:number=100;
  name :string; 
  town :string;
  phone :string;
  email:string;
  ship_address:string;
  pay_method :string;
  
  //getting today's date
  pipe = new DatePipe('en-RW');
  today:string = new Date().toDateString();
  //mySimpleFormat = this.pipe.transform(this.now, 'dd/MM/YYYY');
  //today = this.pipe.transform(this.now, 'short');
    //for email
  body_mail_order:string;  
  
  constructor(public alertController: AlertController) { }
    
    ngOnInit() {    
    }
    //function for alert
    async presentAlert(noti_header:string,noti_subheader:string,noti_message:string){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: noti_header,
        subHeader: noti_subheader,
        message: noti_message,
        buttons: ['OK']
      });  
      await alert.present();
    }
    //general function for sending emails
    email_customer(receiver_email:string,subject:string, body:string){
      Email.send({
        Host : "smtp.elasticemail.com",
        Username : "alexnewzniyo@gmail.com",
        Password : "C18C89757270B98191EE45EAB7FB47A7ABE7",
        To : receiver_email,
        From : "alexnewzniyo@gmail.com",
        Subject : subject,
        Body : body
        });
    }
    //function for sending order email
    orderEmail(){                
      this.email_customer(this.email,'Your Order',this.body_mail_order);
    }
    //function that manages payment and orders
  pay() { 
    //the body of order email    
  this.body_mail_order="<table><thead><tr style='background-color: maroon;color: white;'>"+
  "<th colspan='2'><h1><br>Thank you for your order</h1></th></tr></thead><tbody><tr>"+
   "<td colspan='2'><br>Hi <b>"+this.name+",</b> <br><br>Just to let you know — we've received "+
   "your order <b>#9412</b> ,and it is now being processed:<br><br>Payment Method : <b>"+this.pay_method+".</b><br>"+
   "<h2><b>[Order #9412] ("+this.today+")</b></h2></td></tr><tr><td><b>Products</b></td>"+
   "<td>Denim Jeans(3in1) - 32 [x 2] <br><br></td></tr> <b><br><tr><td><b>Amount</b></td>"+
   "<td>30,000 Frw <br><br></td></tr><tr><td><b>Shipping</b></td><td>Free Shipping <br><br></td>"+
   "</tr><tr><td><b>Total</b></td><td>30,000 Frw <br><br></td></tr><tr><td><b>Shipping Address</b></td>"+
   "<td>"+this.ship_address+" <br><br></td></tr></tbody><tfoot><tr><th colspan='2'>Thank you for shopping with"+
   "<a href='https://kstorez.com'>Kstorez</a></th></tr></tfoot></table>";
   //checking the payment method chosen by the customer
    if(this.pay_method == "mobile Money / credit card"){
      makePayment(this.amount,this.email,this.phone,this.name);
    } else{
      this.orderEmail();
      //sending an alert
      this.presentAlert("Order Received","Dear,"+ this.name, "We have received your order. we are now processing it.");
    }    
  }
  check_url(){
    //const url = new URL('https://example.com?foo=1&bar=2');
    const url= new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.append('status','successful')
    this.foo =params.get('status');

    alert(this.foo);
  }
  sendSms(){    
      
    
  }
  
  
}
