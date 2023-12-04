import styles from './Signup.module.css';
import React from 'react';
import {useSignUp} from './../../hooks/useSignUp';
import {useAuthContext} from '../../hooks/useAuthContext';
import {Navigate} from 'react-router-dom';

export default function Login(){
    const data = useAuthContext();
    const [email, setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [displayName,setDisplayName] = React.useState('');
    const {error,isPending, signup} = useSignUp()

    function handleSubmit(e){
        console.log("logic ran")
        e.preventDefault();
        signup(email,password,displayName);
    }

    return (
        <>{data.user && <Navigate to='/'/>}
        <form className={styles['signup-form']} onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <label>
                <span>Display Name</span>
                <input
                    type='text'
                    value={displayName}
                    onChange={(e)=>{setDisplayName(e.target.value)}}
                    required
                />
            </label>
            <label>
                <span>Email</span>
                <input
                    type="email"
                    onChange={(e)=>setEmail(e.target.value)}
                    value= {email}
                    required
                />
            </label>
            <label>
                <span>Password</span>
                <input
                    type="password"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    required
                />
            </label>
            {!isPending && <button className="btn">Sign Up</button>}
            {isPending && <button className="btn" disabled>Loading</button>}
            {error && <p>{error}</p>}
        </form>
        </>
    )
}