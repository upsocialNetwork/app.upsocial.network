import React, { FC, useMemo, useCallback, useEffect, useState } from 'react';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork, WalletNotConnectedError } from '@solana/wallet-adapter-base';
import {
    getCoin98Wallet,
    //getLedgerWallet,
    getPhantomWallet,
    //getSlopeWallet,
    getSolflareWallet,
    getSolletExtensionWallet,
    getSolletWallet,
    // getTorusWallet,
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import Login from './Login'

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

function MainLogin() {
    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
    // Only the wallets you configure here will be compiled into your application
    const wallets = useMemo(() => [
        getPhantomWallet(),
        // getSlopeWallet(),
        getSolflareWallet(),
        // getTorusWallet({
        //     options: { clientId: 'Get a client ID @ https://developer.tor.us' }
        // }),
        // getLedgerWallet(),
        //getMathWallet({ network }),
        getCoin98Wallet(),
        getSolletWallet({ network }),
        getSolletExtensionWallet({ network }),
    ], [network]);



    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const wallet = useWallet();
    const [value, setValue] = useState({});
    const [check, setCheck] = useState(false);


    if (!wallet.connect) {
        //console.log("check False");
    } else {
        //console.log("check true");
        this.setCheck(true);
    }

    useEffect(() => {

        (async () => {
            if (wallet?.publicKey) {
                console.log("hit");
                console.log(publicKey);

            }
        })();
    }, [wallet.publicKey]);
    return (
        <>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                    <WalletModalProvider >

                        <>
                            <Login />
                        </>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </>
    )
}

export default MainLogin