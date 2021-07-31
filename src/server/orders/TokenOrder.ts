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
        await this.loadData();

        await this.refresh();
    }

    public async loadData(): Promise<void> {
        this.token = await this.contracts.getTokenData(this.address);
    }

    public async refresh(): Promise<void> {
        this.refreshBalances();
    }

    public async refreshBalances() {
        this.balance = await this.contracts.getTokenBalanceInWallet(this.address);
        this.balanceInWBNB = await this.contracts.getTokenPriceInWBNB(this.address, "1");
        this.balanceInBUSD = await this.contracts.getWBNBPriceInBUSD("1");

        console.log(formatEther(this.balance), formatEther(this.balanceInWBNB), formatEther(this.balanceInBUSD));
    }
}
