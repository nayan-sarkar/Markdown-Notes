import React from 'react';
import {useLogin} from '../../hooks/useLogin';
import {useAuthContext} from '../../hooks/useAuthContext';
import {Navigate, Link} from 'react-router-dom';
import signInIcon from './login.svg';

export default function Login(){
    const [email, setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const {login, error, isPending} = useLogin();
    const data = useAuthContext();

    function handleSubmit(e){
        e.preventDefault();
        login(email,password);
    }

    return (
        <>
        {data.user && <Navigate to='/'/>}
        <form onSubmit={handleSubmit}>
            <div className="login-signup">
                <Link to="#"><h1 className="blue-white">Login</h1></Link>
                <Link to="/signup"><h1>Sign Up</h1></Link>
            </div>
                <input
                    type="email"
                    onChange={(e)=>setEmail(e.target.value)}
                    value= {email}
                    required
                    placeholder="Email Address"
                />
                <input
                    type="password"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    required
                    placeholder="Password"
                />
            <div className="btns">
                {!isPending && <button>Login</button>}
                {isPending && <button disabled>Loading</button>}
                <img src={signInIcon}/>
            </div>
            {error&&<p>{error}</p>}
        </form>
        </>
    )
}