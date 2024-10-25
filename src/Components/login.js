// Login.js
import React from 'react';

const Login = ({ onLogin, account }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const password = document.querySelector("#pw").value;
    onLogin(account, password);
  };

  return (
    <div className="lgbody">
      <center>
        <div className="lgbox">
          <h2>LOGIN</h2>
          <form className="form-group" onSubmit={handleSubmit}>
            <label>Address</label><br />
            <input type="text" className="form-control" id="user" value={account} readOnly /><br />
            <label>Password</label><br />
            <input type="password" className="form-control" id="pw" /><br />
            <input type="Submit" className="btn btn-secondary" value="Login" />
          </form>
          <p>Dont have Account?? <a onClick={() => onLogin(false)} className="btn btn-secondary">click here</a></p>
        </div>
      </center>
    </div>
  );
};

export default Login;