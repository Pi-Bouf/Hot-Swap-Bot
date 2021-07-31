import * as chalk from "chalk";
import {Account} from "./ethers/Account";
import {Contracts} from "./ethers/Contracts";
import {formatEther, formatUnits} from 'ethers/lib/utils';
import {Configuration} from './conf';
import {BigNumber} from 'ethers';
import {TokenOrder} from './orders/TokenOrder';
import {IOrder} from './orders/interface/IOrder';

const tokens = {
    CAKE: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82"
}

export class Server {
    private _account: Account;
    private _contract: Contracts;

    private _orders: IOrder[];

    constructor() {
        console.log(chalk.greenBright("\n#############################"));
        console.log(chalk.greenBright("  Welcome to Hot Swap Bot !"));
        console.log(chalk.greenBright("#############################\n"));

        this._account = new Account();
        this._contract = new Contracts(this._account);

        this._orders = [];

        // Blue - Information
        // Yellow - Money value
        // Green - Debug
        // Red - Error
    }

    public start() {
        console.log(chalk.cyan("Starting..."));
        this._account.init();
        console.log(chalk.cyan("Wallet connected !"));
        this._contract.init();
        console.log(chalk.cyan("Contract registered !"));

        this.registerOrders();
        console.log(chalk.cyan("Orders registered !"));

        console.log(chalk.cyan("Starting orders..."));
        this._orders.forEach(order => {
            order.attachContracts(this._contract);
            order.start();
        });

        setInterval(() => {
            this._orders.forEach(order => {
               order.refresh();
            });
        }, 5000);
    }

    private registerOrders() {
        this._orders.push(new TokenOrder(Configuration.TOKENS.CAKE));
    }
}
