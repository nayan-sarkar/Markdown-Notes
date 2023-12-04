import React from 'react';
import {auth} from  './../firebase/config';
import {signOut} from 'firebase/auth';
import {useAuthContext} from './useAuthContext';

export function useLogout(){
    const [error,setError] = React.useState(null);
    const [isPending,setIsPending] = React.useState(false);
    const {dispatch} = useAuthContext();

    const logout = async function(){
        setError(null);
        setIsPending(true);

        // sign user out
        try{
            // run fb logout
            await signOut(auth);
            console.log("User Signed Out")

            // dispatch logout
            dispatch({type: 'LOGOUT'})

            // update State
                setIsPending(false);
                setError(null);
            

        }
        catch (error){
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
        }
    }



    return {logout, error, isPending}
}