import { Abi, Hex } from "viem";
import { ContractDeployerClient } from "./types";


export async function deployContract<TClient extends ContractDeployerClient> (
    abi: Abi, 
    bytecode: Hex, 
    client: TClient,
    ...args: any[]
): Promise<Hex> {

    const receipt = await client.deployContract({
        account: client.account,
        chain: client.chain,
        abi: abi,
        bytecode: bytecode,
        args: args,
    }).then (
        (hash) => client.waitForTransactionReceipt( {hash} ),
    );

    if (!receipt || !receipt.contractAddress) {
        throw new Error("failed to deploy smart contract! either transaction receipt or contractAddress is undefined!");
    }

    return receipt.contractAddress;
}