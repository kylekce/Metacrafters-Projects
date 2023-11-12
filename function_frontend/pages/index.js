import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
    const [ethWallet, setEthWallet] = useState(undefined);
    const [account, setAccount] = useState(undefined);
    const [atm, setATM] = useState(undefined);
    const [balance, setBalance] = useState(undefined);

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const atmABI = atm_abi.abi;

    const getWallet = async () => {
        if (window.ethereum) {
            setEthWallet(window.ethereum);
        }

        if (ethWallet) {
            const account = await ethWallet.request({ method: "eth_accounts" });
            handleAccount(account);
        }
    };

    const handleAccount = (account) => {
        if (account) {
            console.log("Account connected: ", account);
            setAccount(account);
        } else {
            console.log("No account found");
        }
    };

    const connectAccount = async () => {
        if (!ethWallet) {
            alert("MetaMask wallet is required to connect");
            return;
        }

        const accounts = await ethWallet.request({
            method: "eth_requestAccounts",
        });
        handleAccount(accounts);

        // once wallet is set we can get a reference to our deployed contract
        getATMContract();
    };

    const getATMContract = () => {
        const provider = new ethers.providers.Web3Provider(ethWallet);
        const signer = provider.getSigner();
        const atmContract = new ethers.Contract(
            contractAddress,
            atmABI,
            signer
        );

        setATM(atmContract);
    };

    const getBalance = async () => {
        if (atm) {
            setBalance((await atm.getBalance()).toNumber());
        }
    };

    const deposit = async () => {
        if (atm) {
            const amount = document.getElementById("amount").value;
            let tx = await atm.deposit(amount);
            await tx.wait();
            getBalance();
        }
    };

    const withdraw = async () => {
        if (atm) {
            const amount = document.getElementById("amount").value;
            let tx = await atm.withdraw(amount);
            await tx.wait();
            getBalance();
        }
    };

    const withdrawAll = async () => {
        if (atm) {
            let tx = await atm.withdrawAll(1, { gasLimit: 200000 });
            await tx.wait();
            getBalance();
        }
    };

    const initUser = () => {
        // Check to see if user has Metamask
        if (!ethWallet) {
            return <p>Please install Metamask in order to use this ATM.</p>;
        }

        // Check to see if user is connected. If not, connect to their account
        if (!account) {
            return (
                <button className="btn" onClick={connectAccount}>
                    Please connect your Metamask wallet
                </button>
            );
        }

        if (balance == undefined) {
            getBalance();
        }

        return (
            <div className="h-full flex flex-col items-center justify-center">
                <h6 className="flex justify-center font-black text-4xl">
                    {balance}
                    <span className="text-yellow-400 ms-2">COINS</span>
                </h6>
                <h6 className="mt-2 mb-40 border-2 border-neutral-600 border-neutral-500 p-1 rounded text-xs">
                    {account}
                </h6>
                <div className="flex items-center justify-evenly">
                    <button className="btn m-2" onClick={deposit}>
                        Deposit
                    </button>
                    <button className="btn m-2" onClick={withdraw}>
                        Withdraw
                    </button>
                    <button className="btn m-2" onClick={withdrawAll}>
                        Withdraw All
                    </button>
                </div>
                <form className="flex items-center justify-center">
                    <label className="text-xl me-1">Amount:</label>
                    <input
                        id="amount"
                        type="number"
                        className="bg-transparent border-2 border-neutral-600 p-1 rounded text-xl w-14"
                        defaultValue={1}
                        min={1}
                    />
                </form>
            </div>
        );
    };

    useEffect(() => {
        getWallet();
    }, []);

    return (
        <main className="w-screen h-screen flex items-center justify-evenly">
            <script src="https://cdn.tailwindcss.com"></script>
            <link
                href="https://cdn.jsdelivr.net/npm/daisyui@3.9.4/dist/full.css"
                rel="stylesheet"
                type="text/css"
            />
            <link
                href="https://fonts.cdnfonts.com/css/chicago-2"
                rel="stylesheet"
            ></link>
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
                rel="stylesheet"
            ></link>

            <div className="grid grid-cols-2 gap-64">
                <header className="col-span-1 flex items-center">
                    <h1 className="font-normal text-8xl text-cyan-400">
                        holocoin
                    </h1>
                </header>

                <section className="col-span-1 h-screen flex justify-center items-center">
                    {initUser()}
                </section>
            </div>
            <style jsx>
                {`
                    * {
                        font-family: "Roboto", sans-serif;
                    }

                    body {
                        background-color: #1a202c;
                    }

                    h1 {
                        font-family: "Chicago", sans-serif;
                    }

                    .container {
                        text-align: center;
                    }
                `}
            </style>
        </main>
    );
}
