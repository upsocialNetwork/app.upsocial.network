import { createAction } from 'redux-act';


export const WalletData = createAction();

export function AddWalletObject(wallet) {
    return (dispatch) => {
        console.log(wallet)
        dispatch(WalletData(wallet));
    }
}