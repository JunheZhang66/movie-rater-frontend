import React, {useState, useEffect} from "react";
import '../App.css';
import API from '../api-service';
import { useCookies } from 'react-cookie';

function Auth(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoginView, setIsLoginView] = useState(true)

    const [token, setToken] = useCookies(['mr-token'])

    const isDisabled = password.length === 0 || username.length === 0;

    useEffect(() => {
        console.log( token)
        if(token['mr-token'] && 'token' in token['mr-token']){
            if('token' in token['mr-token']){
                window.location.href = '/movies'
            }
            // if('non_field_errors' in token['mr-token']){
            //     window.location.href = '/'
            // }
        }else{
            alert('please type correct username or password')
        }
    }, [token]) 

    const loginClicked = () => {
        API.login({username, password})
        .then( resp => setToken('mr-token', resp))
        .catch( error => console.log(error))
    }

    const registerClicked = () => {
        API.register({username, password})
        .then( resp => loginClicked({username, password}))
        .catch( error => console.log(error))
    }

    return (
        <div className = "App">
            <header className = "App-header" >
                {isLoginView? <h1>Login</h1>:<h1>Register</h1>}
            </header>
            <div className="login-container">
                <label htmlFor="username"> username </label><br />
                <input type="text" placeholder="" id="username" value={username} 
                    onChange={evt =>setUsername(evt.target.value)}
                /> <br/>
                <label htmlFor="password">password</label> <br />
                <input type="password" id="password" value={password}
                    onChange={evt =>setPassword(evt.target.value)}
                ></input> <br />
                {isLoginView? 
                <button onClick={evt=>loginClicked()} disabled={isDisabled}>Login</button>:
                <button onClick={evt=>registerClicked()} disabled={isDisabled}>Register</button>}
                {isLoginView? 
                <p onClick={()=>setIsLoginView(false)}>Dont have acount?</p>:
                <p onClick={()=>setIsLoginView(true)}>Have account already.</p>}
            </div>
        </div>
    )
}

export default Auth;