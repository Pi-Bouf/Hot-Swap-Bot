import {BigNumber, Contract} from "ethers";
import {Account} from "./Account";
import {Configuration} from "../conf";
import {formatEther, parseUnits} from "ethers/lib/utils";

export class Contracts {
    private _account: Account;
    private _factory: Contract;
    private _router: Contract;
    private _erc: Contract;

    public constructor(account: Account) {
        this._account = account;
    }

    public init() {
        this._factory = new Contract(
            Configuration.FACTORY, [
                'event PairCreated(address indexed token0, address indexed token1, address pair, uint)',
                'function getPair(address tokenA, address tokenB) external view returns (address pair)'
            ],
            this._account.wallet
        );

        this._router = new Contract(
            Configuration.ROUTER, [
                'function getAmountsOut(uint amountIn, address[] memory path) view returns (uint[] memory amounts)',
                'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)',
                'function swapExactTokensForTokensSupportingFeeOnTransferTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)'
            ],
            this._account.wallet
        );

        this._erc = new Contract(
            "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82", [
                {
                    "constant": true,
                    "inputs": [{"name": "_owner", "type": "address"}],
                    "name": "balanceOf",
                    "outputs": [{"name": "balance", "type": "uint256"}],
                    "payable": false,
                    "type": "function"
                }
            ],
            this._account.wallet
        );
    }

    async getBalanceOf(address: string) {
        const tokenContract = new Contract(
            "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82", [
                {
                    "constant": true,
                    "inputs": [{"name": "_owner", "type": "address"}],
                    "name": "balanceOf",
                    "outputs": [{"name": "balance", "type": "uint256"}],
                    "payable": false,
                    "type": "function"
                }
            ],
            this._account.wallet
        );

        return await tokenContract.balanceOf(Configuration.WALLET_PUBLIC);
    }

    async getCurrentWBNBToken() {
        const bn = await this.getBalanceOf(Configuration.WBNB_CONTRACT);
        return formatEther(bn);
    }

    async getWBNBValueForToken(value: string, address: string): Promise<BigNumber> {
        const amountIn = parseUnits(value, 'ether');
        const amounts = await this._router.getAmountsOut(amountIn, [address, Configuration.WBNB_CONTRACT], {
            gasPrice: parseUnits(Configuration.GWEI.toString(), 'gwei'),
            gasLimit: Configuration.GAS_LIMIT
        });

        return amounts[1];
    }

    async getBalanceOfInWBNB(address: string): Promise<BigNumber> {
        const balanceOf = await this.getBalanceOf(Configuration.TOKENS.CAKE);
        const amount = await this.getWBNBValueForToken(formatEther(balanceOf), Configuration.TOKENS.CAKE);

        return amount;
    }

    get factory(): Contract {
        return this._factory;
    }

    get router(): Contract {
        return this._router;
    }

    get erc(): Contract {
        return this._erc;
    }
}