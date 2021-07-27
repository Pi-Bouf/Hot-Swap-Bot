import ethers from 'ethers';
import express from 'express';
import chalk from 'chalk';
import dotenv from 'dotenv';
import inquirer from 'inquirer';

const app = express();
dotenv.config();

const data = {
    WBNB: process.env.WBNB_CONTRACT, //wbnb

    to_PURCHASE: process.env.TO_PURCHASE, // token that you will purchase = BUSD for test '0xe9e7cea3dedca5984780bafc599bd69add087d56'

    AMOUNT_OF_WBNB: process.env.AMOUNT_OF_WBNB, // how much you want to buy in WBNB

    factory: process.env.FACTORY, //PancakeSwap V2 factory

    router: process.env.ROUTER, //PancakeSwap V2 router

    recipient: process.env.YOUR_ADDRESS, //your wallet address,

    Slippage: process.env.SLIPPAGE, //in Percentage

    gasPrice: ethers.utils.parseUnits(`${process.env.GWEI}`, 'gwei'), //in gwei

    gasLimit: process.env.GAS_LIMIT, //at least 21000

    minBnb: process.env.MIN_LIQUIDITY_ADDED //min liquidity added
}

let initialLiquidityDetected = false;
let jmlBnb = 0;

const wss = process.env.WSS_NODE;
const mnemonic = process.env.YOUR_MNEMONIC //your memonic;
const tokenIn = data.WBNB;
const tokenOut = data.to_PURCHASE;
const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/")
    // const provider = new ethers.providers.WebSocketProvider(wss);
const wallet = new ethers.Wallet(mnemonic);
const account = wallet.connect(provider);


const factory = new ethers.Contract(
    data.factory, [
        'event PairCreated(address indexed token0, address indexed token1, address pair, uint)',
        'function getPair(address tokenA, address tokenB) external view returns (address pair)'
    ],
    account
);

const router = new ethers.Contract(
    data.router, [
        'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
        'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
        'function swapExactTokensForTokensSupportingFeeOnTransferTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
    ],
    account
);

const erc = new ethers.Contract(
    data.WBNB, [{ "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "type": "function" }],
    account
);

console.log(ethers.utils.parseUnits('0.0005', 'ether'));


const init = async() => {
    console.log("Test TX");

    let tokenIn = data.WBNB;
    let tokenOut = data.to_PURCHASE;

    const amountIn = ethers.utils.parseUnits('10', 'ether');
    console.log(amountIn);
    const amountOutMin = 0;

    console.log("Starting swap...");

    const tx = await router.swapExactTokensForTokens(
        amountIn,
        amountOutMin, ["0xe9e7cea3dedca5984780bafc599bd69add087d56", "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"],
        data.recipient,
        Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from the current Unix time
        {
            gasPrice: ethers.utils.parseUnits('5', 'gwei'),
            gasLimit: 500000
        }
    );


    console.log(tx);
    console.log("Swap done!");
    try {
        const receipt = await tx.wait();
        tx.tr
    } catch (e) {
        console.log(e);
    }

    console.log("Transaction receipt");
    console.log(receipt);
}

init();