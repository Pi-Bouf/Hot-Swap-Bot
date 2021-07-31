import * as chalk from 'chalk';
import {IContracts} from '../ethers/interface/IContracts';
import {IOrder} from './interface/IOrder';
import {IToken} from '../ethers/interface/IToken';
import {formatEther, formatUnits} from 'ethers/lib/utils';
import {BigNumber} from 'ethers';

export class TokenOrder implements IOrder {
    public readonly address: string;

    public contracts: IContracts;
    public active: boolean;

    public token: IToken;
    public balance: BigNumber;
    public balanceInWBNB: BigNumber;
    public balanceInBUSD: BigNumber;

    public constructor(address: string) {
        this.active = false;
        this.address = address;

        this.balance = BigNumber.from(0);
        this.balanceInWBNB = BigNumber.from(0);
        this.balanceInBUSD = BigNumber.from(0);
    }

    public attachContracts(contracts: IContracts): void {
        this.contracts = contracts;
    }

    public async start(): Promise<void> {
        if (this.contracts === undefined) {
            this.logError('can\'t be started ! Please attach contracts interface...');
            return;
        }

        try {
            await this.loadData();
        } catch (e) {
            this.logError('Can\'t load data... Error in configuration ? ' + e);
            return;
        }

        console.log(chalk.yellow(`[TokenOrder => ${this.token.name}] started ! Refreshing...`));

        this.active = true;
        await this.refresh();
    }

    public async loadData(): Promise<void> {
        this.token = await this.contracts.getTokenData(this.address);
    }

    public async refresh(): Promise<void> {
        if(!this.active) return;

        try {
            this.refreshBalances();
        } catch (e) {
            this.logError("Error during refresh ! " + e);
        }
    }

    public async refreshBalances() {
        try {
            this.balance = await this.contracts.getTokenBalanceInWallet(this.address);

            if (this.balance.toString() !== "0") {
                this.balanceInWBNB = await this.contracts.getTokenPriceInWBNB(this.address, formatUnits(this.balance, this.token.decimals));
                this.balanceInBUSD = await this.contracts.getWBNBPriceInBUSD(formatEther(this.balanceInWBNB));

                this.logInfo(`No balance for this token... [ ${formatEther(this.balance)} ${this.token.symbol} ] = [${formatEther(this.balanceInWBNB)} WBNB] = [${formatEther(this.balanceInBUSD)} BUSD]`);
            } else {
                const balanceInWBNB = await this.contracts.getTokenPriceInWBNB(this.address, "1");
                const balanceInBUSD = await this.contracts.getWBNBPriceInBUSD(formatEther(balanceInWBNB));

                this.logInfo(`No balance for this token... [ 1 ${this.token.symbol} ] = [${formatEther(balanceInWBNB)} WBNB] = [${formatEther(balanceInBUSD)} BUSD]`);
            }
        } catch (e) {
            this.logError("Can't refresh all balances ! " + e);
        }
    }

    private logInfo(info: any) {
        console.log(chalk.green(`[TokenOrder => ${this.address}] ${info}`));
    }

    private logError(error: any) {
        console.log(chalk.red(`[TokenOrder => ${this.address}] ${error}`));
    }
}
