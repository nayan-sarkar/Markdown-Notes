import React from 'react';
import {auth} from  './../firebase/config';
import {signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {useAuthContext} from './useAuthContext';

export function useLogin(){
    const [error,setError] = React.useState(null);
    const [isPending,setIsPending] = React.useState(false);
    const {dispatch} = useAuthContext();

    const googleLogin = async function (){
        setError(null);
        setIsPending(true);

        const provider = new GoogleAuthProvider();

        try{
            const result = await signInWithPopup(auth, provider);
            console.log("this is output ",result);
            dispatch({type: 'LOGIN', payload: result.user});

            setIsPending(false);
            setError(null);


        }catch(error){
            console.log(error.message);
            setError(error.message);
            setIsPending(false);

        }

    }

    const login = async function(email, password){
        setError(null);
        setIsPending(true);

        // sign user out
        try{
            // run fb logout
            const response = await  signInWithEmailAndPassword(auth,email,password);
            // console.log("User Signed In")

            // dispatch logout
            dispatch({type: 'LOGIN', payload: response.user})

            // update State
            setIsPending(false);
            setError(null);
        }

        catch (error){
            // console.log(error.message);
            setError(error.message);
            setIsPending(false);
        }
    }

    return {login, googleLogin, error, isPending}
}