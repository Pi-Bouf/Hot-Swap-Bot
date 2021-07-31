import {BigNumber, Contract} from "ethers";
import {Account} from "./Account";
import {Configuration} from "../conf";
import {formatEther, parseUnits} from "ethers/lib/utils";
import {IContracts} from './interface/IContracts';
import {IToken} from './interface/IToken';

export class Contracts implements IContracts {
    private _account: Account;
    private _factory: Contract;
    private _router: Contract;

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
                'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)'
            ],
            this._account.wallet
        );
    }

    async getBalanceOf(address: string) {
        const tokenContract = new Contract(
            address, [
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

    public async getWBNBPriceInBUSD(amount: string = "1"): Promise<BigNumber> {
        const amountIn = parseUnits(amount, 'ether');
        const amounts = await this._router.getAmountsOut(amountIn, [Configuration.WBNB_CONTRACT, Configuration.TOKENS.BUSD], {
            gasPrice: parseUnits(Configuration.GWEI.toString(), 'gwei'),
            gasLimit: Configuration.GAS_LIMIT
        });

        return amounts[1];
    }

    public async getTokenPriceInWBNB(address: string, amount: string = "1"): Promise<BigNumber> {
        const amountIn = parseUnits(amount, 'ether');
        const amounts = await this._router.getAmountsOut(amountIn, [address, Configuration.WBNB_CONTRACT], {
            gasPrice: parseUnits(Configuration.GWEI.toString(), 'gwei'),
            gasLimit: Configuration.GAS_LIMIT
        });

        return amounts[1];
    }

    public async getTokenBalanceInWallet(address: string): Promise<BigNumber> {
        const tokenContract = new Contract(
          address, [
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

    public async getWBNBBalanceInWallet(): Promise<BigNumber> {
        return this.getTokenBalanceInWallet(Configuration.WBNB_CONTRACT);
    }

    public async getTokenData(address: string): Promise<IToken> {
        const tokenContract = new Contract(
          address, [
              'function name() public view returns (string)',
              'function symbol() public view returns (string)',
              'function decimals() public view returns (uint8)'
          ],
          this._account.wallet
        );

        return {
            address: address,
            symbol: await tokenContract.symbol(),
            name: await tokenContract.name(),
            decimals: await tokenContract.decimals()
        };
    }

    public async approveToken(address: string, amount: BigNumber): Promise<boolean> {
        return Promise.resolve(false); // TODO :3
    }

    public async swapTokenInWBNB(address: string, amount: BigNumber): Promise<boolean> {
        return Promise.resolve(false); // TODO :3
    }
}
