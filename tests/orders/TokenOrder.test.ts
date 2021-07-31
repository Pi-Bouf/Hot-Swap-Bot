import {TokenOrder} from '../../src/server/orders/TokenOrder';
import {Contracts} from '../../src/server/ethers/Contracts';

import * as sinon from 'sinon';
import {IToken} from '../../src/server/ethers/interface/IToken';

describe('TokenOrder tests', function () {
    const cakeAddress = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82';
    let tokenOrder: TokenOrder = undefined;
    let contractsMock: sinon.SinonMock = undefined;
    let token: IToken = {address: cakeAddress, decimals: 18, name: 'Pancake CAKE', symbol: 'CAKE'};

    beforeEach('Init TokenOrder & attach mock', function () {
        tokenOrder = new TokenOrder(cakeAddress);
        contractsMock = sinon.mock(new Contracts(undefined));

        tokenOrder.attachContracts(<Contracts><any>contractsMock);
    });

    it('Create TokenOrder, attach contracts, retrieve infor', async function () {
        contractsMock.expects('getTokenData').once().withArgs(cakeAddress).returns(token);

        await tokenOrder.loadData();

        contractsMock.verify();
    });
});
