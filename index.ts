// Address interface
interface AddressInterface {
    name : string,
    pincode : number,
    getAddress() : string
}

class UserAddress implements AddressInterface {
    name: string;
    pincode: number;
    
    constructor(address: string, pincode: number) {
        this.name = address;
        this.pincode = pincode;
    }

    getAddress() {
        return this.name +' '+ this.pincode
    }
}

interface ExchangeInterface {
    exchange_name : string, // BSE or NSE
    getExchangeName() : string
}

class Exchange implements ExchangeInterface {
    exchange_name: string; 
    constructor(name: string) {
        this.exchange_name = name
    }
    getExchangeName() {
        return this.exchange_name
    } 
}

// stock interface
interface ShareInterface {
    share_name:string,
    share_price:number,
    share_exchange : ExchangeInterface,
    share_quantity : number,
    getShare () : string
}

class Share implements ShareInterface {
    share_name:string;
    share_price:number;
    share_exchange : ExchangeInterface;
    share_quantity : number;
    
    constructor(name : string, price : number, exchange : ExchangeInterface, quantity : number){
        this.share_name = name;
        this.share_price = price;
        this.share_exchange = exchange;
        this.share_quantity = quantity;
    }
    getShare () {
        return this.share_name + this.share_exchange + this.share_price + this.share_quantity
    }
}

interface UserInterface {
    user_name : string,
    user_address : AddressInterface,
    user_shares: OrderInterface[],
    getUserDetails() : string
}


interface OrderInterface {
    ordered_type : string, // Buy or Sell
    ordered_share : ShareInterface,
    ordered_quantity : number,
    ordered_price : number,
}

class Order implements OrderInterface {
    ordered_type : string; // Buy or Sell
    ordered_share : ShareInterface;
    ordered_quantity : number;
    ordered_price : number;
    
    constructor(type : string, share : ShareInterface, quantity : number, price : number){
        this.ordered_type = type;
        this.ordered_share = share;
        this.ordered_price = price;
        this.ordered_quantity = quantity;
    }
}

// orderDetails Interface
interface OrderDetailsInterface {
    user : UserInterface,
    order : OrderInterface
}

class OrderDetails {
    order : OrderDetailsInterface;
    constructor(user : UserInterface, order : OrderInterface){
        this.order = {user, order}
    }
    getOrderDetails () {
        return this.order
    }
}

interface OrderMangerInterface {
    orders : OrderDetailsInterface[];
    placeorder (order : OrderDetailsInterface) : void
    getListOfOrders() : OrderDetailsInterface[]
}

class orderManager implements OrderMangerInterface {
    orders : OrderDetailsInterface[];

    constructor(orders : OrderDetailsInterface[]) {
        this.orders = orders
    }

    placeorder(order : OrderDetailsInterface): void {
        order.user.user_shares.push(order.order)
        this.orders.push(order)

    }
    getListOfOrders(): OrderDetailsInterface[] {
        return this.orders
    }
} 

class User implements UserInterface {
    user_name : string;
    user_address : AddressInterface;
    user_shares: OrderInterface[];

    constructor(name : string, address : AddressInterface, shares : OrderInterface[]){
        this.user_name = name;
        this.user_address = address;
        this.user_shares = shares;
    }

    getUserDetails(): any {
        return "Name: " + this.user_name + "\nAddress: " + 
               "Address: " + this.user_address.name + ", Pincode: " + this.user_address.pincode +
               "\nPortfolio: " + this.user_shares;
    }
}


const NSE = new Exchange("NSE")
const BSE = new Exchange("BSE")

const address = new UserAddress("A-202, Dalal Street Mumbai, West", 400605)
console.log("Address: ",address.getAddress())

const Jio_Platforms = new Share("Jio Platforms", 200, BSE, 20000)
const Gopal_Snacks = new Share("Golpal Snacks", 350, NSE, 50000)
const IRFC = new Share("IRFC", 34, BSE, 1000000)
const NHPC = new Share("NHPC", 99, NSE, 654900)
const TCS = new Share("TCS", 4000, BSE, 8894350)

const user = new User("Gaurang Keluskar", address, [])

console.log("user details: ", user.getUserDetails())

// user will buy shares

const order1 = new Order("Buy", Jio_Platforms, 4, 200)
const order2 = new Order("Buy", TCS, 1, 4000)

const OrderDetails1 = new OrderDetails(user, order1)
console.log("order Details:", OrderDetails1.getOrderDetails())

const order_manager = new orderManager([])
order_manager.placeorder(OrderDetails1.getOrderDetails())

console.log("list of orders:", order_manager.getListOfOrders())

console.log("user details after buying share:", user.getUserDetails())


