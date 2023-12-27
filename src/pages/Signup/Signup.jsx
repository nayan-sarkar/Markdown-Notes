import React from 'react';
import {useSignUp} from './../../hooks/useSignUp';
import {useLogin} from '../../hooks/useLogin';
import {useAuthContext} from '../../hooks/useAuthContext';
import {Navigate, Link} from 'react-router-dom';
import signupWithGoogle from './signup.svg';

export default function Login(){
    const data = useAuthContext();
    const [email, setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [displayName,setDisplayName] = React.useState('');
    const {error,isPending, signup} = useSignUp()
    const {googleLogin} = useLogin();

    function handleSubmit(e){
        // console.log("logic ran")
        e.preventDefault();
        signup(email,password,displayName);
    }

    return (
        <>{data.user && <Navigate to='/'/>}
        <form onSubmit={handleSubmit}>
            <div className="login-signup">
                <Link to="/login"><h1>Login</h1></Link>
                <Link to="#" className="blue-white"><h1>Sign Up</h1></Link>
            </div>
                <input
                    type='text'
                    value={displayName}
                    onChange={(e)=>{setDisplayName(e.target.value)}}
                    required
                    placeholder = "Name"
                />
                <input
                    type="email"
                    onChange={(e)=>setEmail(e.target.value)}
                    value= {email}
                    required
                    placeholder = "Email Address"
                />
                <input
                    type="password"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    required
                    placeholder = "Password"
                />
            <div className="btns">
                {!isPending && <button className="btn">Sign Up</button>}
                {isPending && <button className="btn" disabled>Loading</button>}
                <img src={signupWithGoogle} onClick={()=>googleLogin()}/>
            </div>
            
            {error && <p>{error}</p>}
        </form>
        </>
    )
}