export interface IConfiguration {
    WBNB_CONTRACT: string,
    ROUTER: string,
    FACTORY: string,
    WALLET_PUBLIC: string,
    WALLET_PRIVATE: string,
    SLIPPAGE: number,
    GWEI: number,
    GAS_LIMIT: number,
    RPC: string,
    TOKENS: {
        [symbol: string]: string
    }
}