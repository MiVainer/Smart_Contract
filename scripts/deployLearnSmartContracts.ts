import { toNano } from '@ton/core';
import { LearnSmartContracts } from '../wrappers/LearnSmartContracts';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const learnSmartContracts = provider.open(await LearnSmartContracts.fromInit());

    await learnSmartContracts.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(learnSmartContracts.address);

    // run methods on `learnSmartContracts`
}
