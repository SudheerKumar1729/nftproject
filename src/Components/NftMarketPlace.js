import React, { useEffect, useState } from 'react';
import abi from './artifacts/contracts/NFTandDefiMerged.sol/NFTandDefiMerged.json'
import Home from './Components/Home';
import Web3 from 'web3';
import { ethers } from 'ethers';
import "./App.css"
import SignUp from './Components/SignUp';

const NftMarketPlace = () => {
  const [sing,setsign] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [contract, setContract] = useState();
  const [account, setAccount] = useState();
  useEffect(()=>{
    const connectWallet = async(e)=>{
      const contractAddress = "0x3D262c0a1aA1c4628D46d864Be816A158af0E569";
      const contractABI =abi.abi;
    try{
      const {ethereum} = window;
      if(ethereum){
        const account = await ethereum.request({method : "eth_requestAccounts",});
        ethereum.on("accountsChanged", (newAccounts) => {
          setAccount(Web3.utils.toChecksumAddress(newAccounts[0].toLowerCase()));
          window.location.reload();
        });
        window.ethereum.on("chainChanged",()=>{
          window.location.reload();
        })
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress,contractABI,signer);
        setContract(contract);
        setAccount(Web3.utils.toChecksumAddress(account[0].toLowerCase()));
        console.log(account);
      }else{
        alert("Please install metamask");
      }
    }catch(e){
      console.log(e);
    }}
  connectWallet();
  },[account])
  const handler = async (e) => {
    e.preventDefault();
    const pw = document.querySelector("#pw").value;
    try{
      const transaction = await contract.Login(account,pw);
      if(transaction){
        console.log(transaction);
        setIsLoggedIn(transaction)
        localStorage.setItem('isLoggedIn', 'true');
        alert("Login Success")
      }
      else{
        alert("Login Unsuccessfull")
      }
    }catch(e){
      console.log(e)
      alert(e.reason)
    }
  };
  if (isLoggedIn) {
    return (<Home contract={contract} account={account} setIsLoggedIn = {setIsLoggedIn}/>);
  } else {
    return(sing == true?
      <div class="lgbody">
        <center>
        <div class="lgbox">
            <h2>LOGIN</h2>
            <form class="form-group" onSubmit={handler}>
                <label>Address</label><br/>
                <input type="text" class="form-control" id="user"  value={account}/><br/>
                <label>Password</label><br/>
                <input type="password" class="form-control" id="pw"/><br/>
                <input type="Submit" class="btn btn-secondary" value={"Login"}/>
            </form>
            <p>Dont have Account?? <a onClick={()=>setsign(false)} class="btn btn-secondary">click here</a></p>
        </div>
        </center>
    </div>:<SignUp contract={contract} account={account} />
    );
  }
};

export default NftMarketPlace;
