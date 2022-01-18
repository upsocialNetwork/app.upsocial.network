import { createReducer } from 'redux-act';
import { WalletData } from './action';

const defaultState = {
    walletObj: null
};

const reducer = createReducer({

    [WalletData]: (state, params) => {
        return {
            walletObj: params
        };
    }


}, defaultState);

export default reducer;