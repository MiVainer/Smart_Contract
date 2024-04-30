import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { LearnSmartContracts } from '../wrappers/LearnSmartContracts';
import '@ton/test-utils';

describe('LearnSmartContracts', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let learnSmartContracts: SandboxContract<LearnSmartContracts>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        learnSmartContracts = blockchain.openContract(await LearnSmartContracts.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await learnSmartContracts.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: learnSmartContracts.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and learnSmartContracts are ready to use
    });
});
