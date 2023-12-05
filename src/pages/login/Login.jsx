import React from 'react';
import {useLogin} from '../../hooks/useLogin';
import {useAuthContext} from '../../hooks/useAuthContext';
import {Navigate} from 'react-router-dom';

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
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
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
            {!isPending && <button>Login</button>}
            {isPending && <button disabled>Loading</button>}
            {error&&<p>{error}</p>}
        </form>
        </>
    )
}