import {IContracts} from '../../ethers/interface/IContracts';
import {IToken} from '../../ethers/interface/IToken';

export interface IOrder {
    active: boolean;

    contracts: IContracts;

    address: string;

    token: IToken;

    attachContracts(contracts: IContracts): void;

    start(): Promise<void>;

    refresh(): Promise<void>;

    loadData(): Promise<void>;
}
