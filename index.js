"use strict";
var UserAddress = /** @class */ (function () {
    function UserAddress(address, pincode) {
        this.name = address;
        this.pincode = pincode;
    }
    UserAddress.prototype.getAddress = function () {
        return this.name + ' ' + this.pincode;
    };
    return UserAddress;
}());
var Exchange = /** @class */ (function () {
    function Exchange(name) {
        this.exchange_name = name;
    }
    Exchange.prototype.getExchangeName = function () {
        return this.exchange_name;
    };
    return Exchange;
}());
var Share = /** @class */ (function () {
    function Share(name, price, exchange, quantity) {
        this.share_name = name;
        this.share_price = price;
        this.share_exchange = exchange;
        this.share_quantity = quantity;
    }
    Share.prototype.getShare = function () {
        return this.share_name + this.share_exchange + this.share_price + this.share_quantity;
    };
    return Share;
}());
var Order = /** @class */ (function () {
    function Order(type, share, quantity, price) {
        this.ordered_type = type;
        this.ordered_share = share;
        this.ordered_price = price;
        this.ordered_quantity = quantity;
    }
    return Order;
}());
var OrderDetails = /** @class */ (function () {
    function OrderDetails(user, order) {
        this.order = { user: user, order: order };
    }
    OrderDetails.prototype.getOrderDetails = function () {
        return this.order;
    };
    return OrderDetails;
}());
var orderManager = /** @class */ (function () {
    function orderManager(orders) {
        this.orders = orders;
    }
    orderManager.prototype.placeorder = function (order) {
        order.user.user_shares.push(order.order);
        this.orders.push(order);
    };
    orderManager.prototype.getListOfOrders = function () {
        return this.orders;
    };
    return orderManager;
}());
var User = /** @class */ (function () {
    function User(name, address, shares) {
        this.user_name = name;
        this.user_address = address;
        this.user_shares = shares;
    }
    User.prototype.getUserDetails = function () {
        return "Name: " + this.user_name + "\nAddress: " +
            "Address: " + this.user_address.name + ", Pincode: " + this.user_address.pincode +
            "\nPortfolio: " + this.user_shares;
    };
    return User;
}());
var NSE = new Exchange("NSE");
var BSE = new Exchange("BSE");
var address = new UserAddress("A-202, Dalal Street Mumbai, West", 400605);
console.log("Address: ", address.getAddress());
var Jio_Platforms = new Share("Jio Platforms", 200, BSE, 20000);
var Gopal_Snacks = new Share("Golpal Snacks", 350, NSE, 50000);
var IRFC = new Share("IRFC", 34, BSE, 1000000);
var NHPC = new Share("NHPC", 99, NSE, 654900);
var TCS = new Share("TCS", 4000, BSE, 8894350);
var user = new User("Gaurang Keluskar", address, []);
console.log("user details: ", user.getUserDetails());
// user will buy shares
var order1 = new Order("Buy", Jio_Platforms, 4, 200);
var order2 = new Order("Buy", TCS, 1, 4000);
var OrderDetails1 = new OrderDetails(user, order1);
console.log("order Details:", OrderDetails1.getOrderDetails());
var order_manager = new orderManager([]);
order_manager.placeorder(OrderDetails1.getOrderDetails());
console.log("list of orders:", order_manager.getListOfOrders());
console.log("user details after buying share:", user.getUserDetails());
