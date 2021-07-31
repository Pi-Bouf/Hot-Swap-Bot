import {IContracts} from '../ethers/interface/IContracts';
import {IOrder} from './interface/IOrder';
import {IToken} from '../ethers/interface/IToken';

export class TokenOrder implements IOrder {
    public readonly address: string;

    public contracts: IContracts;
    public active: boolean;

    public token: IToken;

    public constructor(address: string) {
        this.active = false;
        this.address = address;
    }

    public attachContracts(contracts: IContracts): void {
        this.contracts = contracts;
    }

    public async refresh(): Promise<void> {

    }

    public async start(): Promise<void> {
        await this.loadData();
    }

    public async loadData(): Promise<void> {
        this.token = await this.contracts.getTokenData(this.address);
    }
}
