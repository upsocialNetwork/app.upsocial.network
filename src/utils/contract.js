import Web3 from 'web3';
import { responsePostListData } from '../views/Home/action';

const contract_abi = /* add smart contract abi*/

const contract_address = /* add smart contract address*/;
const upsocial_wallet = /* add reciept address*/;
const RPCURL = "https://data-seed-prebsc-1-s1.binance.org:8545";

let Contact = (function () {

    return {
        contract_address: contract_address,
        contract_abi: contract_abi,
        upsocial_wallet: upsocial_wallet,
        RPCURL: RPCURL
    }
})();

export default Contact;