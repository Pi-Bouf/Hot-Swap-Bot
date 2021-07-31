import * as sinon from 'sinon';
import { expect } from "chai";
import {TokenOrder} from '../../src/server/orders/TokenOrder';
import {Contracts} from '../../src/server/ethers/Contracts';
import {IToken} from '../../src/server/ethers/interface/IToken';

describe('TokenOrder tests', function () {
    const contracts = new Contracts(undefined);
    let contractsMock: sinon.SinonMock = undefined;

    const cakeAddress = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82';

    let tokenOrder: TokenOrder = undefined;
    let expectedToken: IToken = {address: cakeAddress, decimals: 18, name: 'Pancake CAKE', symbol: 'CAKE'};

    beforeEach('Init TokenOrder & attach mock', function () {
        tokenOrder = new TokenOrder(cakeAddress);
        contractsMock = sinon.mock(contracts);

        tokenOrder.attachContracts(contracts);
    });

    it('Create TokenOrder, attach contracts, retrieve infor', async function () {
        contractsMock.expects('getTokenData').once().withArgs(cakeAddress).returns(expectedToken);

        await tokenOrder.loadData();

        expect(tokenOrder.token).is.eq(expectedToken);

        contractsMock.verify();
    });

    it('Get token balance', async function() {

    });
});
