import React, { useState } from "react";
import axios from "axios";
// import { baseUrl, url } from "./Constants";
import { useNavigate } from "react-router-dom";
import styles from './Login.module.css'
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components'
import { Spinner } from "react-bootstrap";

const SlideInLeft = styled.div`animation: 2s ${keyframes `${fadeIn}`} `;

const Login = ({setIsLoggedIn}) => {
  
  let navigate = useNavigate();

  const [datum, setData] = useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isShort:false
  });
  const [loading, setLoading] = useState(false)
    
  const textInputChange = (e) => {
    if( e.target.value.length >= 4 ) {
        setData({
            ...datum,
            username: e.target.value,
            check_textInputChange: true,
            isValidUser: true
        });
    } else {
        setData({
            ...datum,
            username: e.target.value,
            check_textInputChange: false,
            isValidUser: false
        });
    }
  }

  const handlePasswordChange = (pass) => {
    setData({
        ...datum,
        password: pass,
        isValidPassword: false
    });
  }

  const submitForm = async (e) => {  
    e.preventDefault();
    if(datum.username.length <3 || datum.password.length < 4){
      setData({
        ...datum,
        isShort:true
      })
    }else {
      setLoading(true)
      var datas = {
        "username" : datum.username,
        "password" : datum.password
      }
      axios
      .post(`https://pms-apis.herokuapp.com/core/auth/new/login/`, datas)
      .then((response) => {
          if (response.status == 200) {
            setLoading(false)
            setIsLoggedIn(true)
            navigate(`/landing`);
            
          }
      })
      .catch((error) => {
        setLoading(false)
        alert(error.response.data["Error"])
        });
    }
      
  }
  
  const OtherMethods = () => (
    <div id={styles.alternativeLogin}>
      <div id={styles.iconGroup}>
      </div>
    </div>
  );
 
  return (
    <main>
      <div className={styles.bigwrapper}>
        <div id={styles.loginform}>
          <h2 id={styles.headerTitle}>Login</h2>
          { 
            datum.isShort ? 
              <div>
                <SlideInLeft>
                  <h6 style={{color: 'orange', marginLeft: '2%'}}>
                    <ul>
                      <li>Username must be greater than 3</li>
                      <li>Password must be greater than 3</li>
                    </ul>
                  </h6>
                </SlideInLeft>
              </div>
            :
              null
          }
          <div className={styles.body}>
            <div className={styles.row}>
              <label>Username</label>
              <input 
                type="text" 
                placeholder="Enter your username" 
                onChange = {(e) => textInputChange(e)} 
              />
            </div>
            <div className={styles.row}>
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                onChange={(e)=> handlePasswordChange(e.target.value)}
              />
            </div>    
            <div id={styles.button} className={styles.row}>
              {loading ? 
                (
                  <Spinner
                    style={{ marginBottom: 27 }}
                    animation="border"
                    variant="danger"
                  /> 
                )
                :
                <button onClick={submitForm} disabled={loading ? true : false}>Log in</button>
              } 
            </div>
          </div>
          <OtherMethods />
        </div>
      </div>
    </main>
  )
}
export default Login;