import Web3 from 'web3';
import { responsePostListData } from '../views/Home/action';

const contract_abi = "contract abi json"

const contract_address = "contract address";
const upsocial_wallet = "receiver wallet address";
const RPCURL = " network name";

let Contact = (function () {

    return {
        contract_address: contract_address,
        contract_abi: contract_abi,
        upsocial_wallet: upsocial_wallet,
        RPCURL: RPCURL
    }
})();

export default Contact;