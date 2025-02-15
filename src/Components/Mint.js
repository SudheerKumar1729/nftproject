import React from 'react'
import { useState,useEffect } from 'react';
import { ethers } from 'ethers';
import Web3 from 'web3';
import axios from 'axios';
import './Styles.css'
const Mint = (props) => {
    const [filelink,setFileLink] = useState();
    const [file,setFile] = useState(false);
    const [uploadstatus,setUploadS] = useState();
    const [MintStatus,setMintStatus] = useState();
    useEffect(()=>{
        const handler = async(e) =>{
          try{
            setUploadS("Please wait..")
            const formData = new FormData();
            formData.append("file",file);
            const redFile = await axios({
              method:"post",
              url:'https://api.pinata.cloud/pinning/pinFileToIPFS',
              data:formData,
              headers:{
                pinata_api_key :'c1b4fbadfb36560603ae',
                pinata_secret_api_key:'26a7b86e11234f6b0aa3f844fe266a1310a23a9c055f9634d76e11465468579a',
                "Content-Type":"multipart/form-data",
              }
            });
            const ImgHash =`https://ipfs.io/ipfs/${redFile.data.IpfsHash}`;
            setFileLink(ImgHash);
            setUploadS();
          }catch(e){
            alert("Unable to upload try again");
            console.log(e)
          }
        }
        file && handler();
    },[file])
    const onchangeHadler = async(e) =>{
        const data = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () =>{
          setFile(e.target.files[0]);
        };
    }
    const submithandler=async(e)=>{
      e.preventDefault();
      const price = document.querySelector("#price").value;
      const price1 = document.querySelector("#priceERTN").value;
      const nftname = document.querySelector("#nftname").value;
      let checboxStatus =  document.querySelector(".checkbox");
      try{
          const amount ={value : ethers.utils.parseEther("0.00001")}
           const transaction = await props.contract.MintProduct(filelink,price,nftname,price1,props.account,checboxStatus,amount);
          setMintStatus("Please Wait...");
           await transaction.wait();
           setMintStatus("");
           alert("Uploaded Successfull");
           window.location.reload();
        }catch(e){
          setMintStatus("");
          console.log(e);
          alert("Faild to upload try again");
        }
      }
  return (props.trigger)?(
    <div class="upload-body">
    <br/><br/>
    <center>
    <div class="upload-form">
      <center>
        <h5>UPLOAD NFT</h5><br/>
        <form class="form-group" onSubmit={submithandler}>
            <input type="text" value={props.account} class="form-control"/><br/>
            <input type="text" placeholder='NFT Name' class="form-control" id="nftname"/><br/>
            <input type="text" placeholder='Price (in ETH)' class="form-control" id="price"/><br/>
            <input type="text" placeholder='Price (in ERTN Token)' class="form-control" id="priceERTN"/><br/>
            <input type="file" onChange={onchangeHadler} id="fl" class="form-control"/><br/>
            <p>{uploadstatus}</p>
            <input type="checkbox" class="checkbox"/><label class="checkboxlabel">Mark to share on Feed</label>
            <input type="submit" value={"LIST"} class="btn btn-secondary"/>
        </form>
        <span>{MintStatus}</span> <br/>
        <button onClick={()=>props.setTrigger(false)} class="btn btn-danger">CLOSE</button>
        </center>
    </div>
    </center>
  </div>):""
}

export default Mint
