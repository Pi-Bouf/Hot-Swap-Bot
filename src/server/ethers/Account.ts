import { Wallet, providers } from "ethers";
import {Configuration} from "../conf";

export class Account {
    private _provider: providers.JsonRpcProvider;
    private _wallet: Wallet;

    public init() {
        this._provider = new providers.JsonRpcProvider(Configuration.RPC);
        const wallet = new Wallet(Configuration.WALLET_PRIVATE);
        this._wallet = wallet.connect(this._provider);
    }

    get wallet(): Wallet {
        return this._wallet;
    }
}
