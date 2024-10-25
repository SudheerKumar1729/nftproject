// hooks/useWallet.js
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { ethers } from 'ethers';
import abi from '../artifacts/contracts/NFTandDefiMerged.sol/NFTandDefiMerged.json';

const useWallet = () => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x1b76799Ce1D494f0634CD527068E3Ce46Ad8d75";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;
        if (ethereum) {
          const accounts = await ethereum.request({ method: "eth_requestAccounts" });
          setAccount(Web3.utils.toChecksumAddress(accounts[0].toLowerCase()));
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const newContract = new ethers.Contract(contractAddress, contractABI, signer);
          setContract(newContract);
          console.log(accounts);
        } else {
          alert("Please install MetaMask");
        }
      } catch (e) {
        console.error(e);
      }
    };
    connectWallet();
  }, []);

  const handleLogin = async (password) => {
    try {
      const transaction = await contract.Login(account, password);
      if (transaction) {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        console.log(transaction);
      } else {
        alert("Login Unsuccessful");
      }
    } catch (e) {
      console.error(e);
      alert(e.message || "Login failed");
    }
  };

  return { contract, account, isLoggedIn, handleLogin };
};

export default useWallet;