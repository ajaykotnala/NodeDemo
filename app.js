/**
 * Created by ajay.kotnala on 2/24/2016.
 */

function CallCustomer(orderNumber)
{
    console.log("customer order number:", orderNumber);
    CallDB(function() {
        console.log("db call by customer with order number :", orderNumber);
    });
}

function CallDB(callback)
{
    setTimeout(callback,5000);
}

CallCustomer(1);
CallCustomer(2);
CallCustomer(3);
CallCustomer(4);
CallCustomer(5);
CallCustomer(6);
CallCustomer(7);
CallCustomer(8);