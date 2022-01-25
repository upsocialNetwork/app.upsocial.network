import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { AddWalletObject } from '../views/Registration/action';

function SecondaryHeader() {
    const dispatch = useDispatch();
    let [walletAddress, setWalletAddress] = useState(null);
    let [fullWallet, setFullWallet] = useState(null);
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const wallet = useWallet();

    useEffect(() => {

        (async () => {
            if (wallet?.publicKey) {
                console.log("hit");
                console.log(publicKey.toString());
                setWalletAddress(publicKey.toString());
                setFullWallet(wallet);
                dispatch(AddWalletObject(wallet))

            }
        })();
    }, [wallet.publicKey]);
    return (
        <>
            <WalletMultiButton className="btn design-10" logo="https://scontent.fbom19-1.fna.fbcdn.net/v/t39.30808-6/240833546_146369280983379_5424852521300066332_n.png?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=wJLQUV80qbIAX8iQNmk&_nc_ht=scontent.fbom19-1.fna&oh=00_AT_lJ4wNCAoG-rz4FjBDMknXzTbsJDaaRN2QNNGQozLWLA&oe=61E67C72" />
        </>
    );
}

export default SecondaryHeader;
