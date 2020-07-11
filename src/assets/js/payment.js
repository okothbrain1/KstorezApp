function myTest() {
    alert('Welcome to custom js');
}

function makePayment(amt,cust_email,cust_phone,cust_name) {
    FlutterwaveCheckout({
      public_key: "FLWPUBK-e5f72bf99d21fbc69dbae898be07be54-X",
      tx_ref: "hooli-tx-1920bbtyt",
      amount: amt,
      currency: "RWF",
      payment_options: "mobile_money_rwanda",
      redirect_url:"http://127.0.0.1:8100/payments",
      customer: {
        email: cust_email,
        phonenumber: cust_phone,
        name: cust_name,
      },
      callback: function (data) { // specified callback function
        console.log(data);
      },
      customizations: {
        title: "KSTOREZ",
        description: "Payment for items in cart",
        logo: "https://assets.piedpiper.com/logo.pnghttps://cdn.shortpixel.ai/client/q_lossy,ret_img/https://www.kstorez.com/wp-content/uploads/2020/06/cropped-BLUE-2-e1593414093176.png",
      },
    });
  }