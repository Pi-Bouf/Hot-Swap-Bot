import {BigNumber} from 'ethers';
import {IToken} from './IToken';

export interface IContracts {
    getWBNBPriceInBUSD(): Promise<BigNumber>;

    getTokenPriceInWBNB(address: string): Promise<BigNumber>;

    getTokenBalanceInWallet(address: string): Promise<BigNumber>;

    getWBNBBalanceInWallet(): Promise<BigNumber>;

    getTokenData(address: string): Promise<IToken>;

    approveToken(address: string, amount: BigNumber): Promise<boolean>;

    swapTokenInWBNB(address: string, amount: BigNumber): Promise<boolean>;
}
