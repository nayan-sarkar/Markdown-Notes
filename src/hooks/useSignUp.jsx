import React from 'react';
import {auth} from  './../firebase/config';
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {useAuthContext} from './useAuthContext';

export function useSignUp(){
    const [error,setError] = React.useState(null);
    const [isPending,setIsPending] = React.useState(false);
    const {dispatch} = useAuthContext();

    const signup = async function(email,password,displayName){
        setError(null) // when signup called, setError defaults to null
        setIsPending(true)
        
        try{
            //sign up user
            const response = await createUserWithEmailAndPassword(auth,email,password);
            
            // console.log("User Created",response.user)

            if(!response){
                throw Error('Could not complete Sign Up')
            }

            // add display name after profile creation
            updateProfile(auth.currentUser, { displayName: displayName })
                .then(()=>{
                            auth.currentUser.providerData.forEach((profile) => {
                                // console.log("Sign-in provider: " + profile.providerId);
                                // console.log("  Provider-specific UID: " + profile.uid);
                                // console.log("  Name: " + profile.displayName);
                                // console.log("  Email: " + profile.email);
                                // console.log("  Photo URL: " + profile.photoURL);
                              })})
                .catch((e)=>console.log(e))

            // dispatch logic action
            dispatch({type: "LOGIN", payload: auth.currentUser })
        
   
            setIsPending(false);
            setError(null);
            
        }
        catch(err){
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
          
        }

    }



    return {error,isPending, signup}
}

