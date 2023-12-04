import React from 'react';
import {auth} from  './../firebase/config';
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext(); 

function authReducer (state,action){
    switch(action.type){
        case "LOGIN":
            return { ...state, user: action.payload }
        case "LOGOUT":
            return { ...state, user: null }
        // this logic checks if user is present or not
        case "AUTH_IS_READY":
            return { ...state, authIsReady: true, user: action.payload}
        default:
            return state
    }
}

export function AuthContextProvider({children}){
    const [state,dispatch] = React.useReducer(authReducer, {
        user: null,
        authIsReady: false
    })

    React.useEffect(()=>{
            onAuthStateChanged(auth, (user) => {
                dispatch({type: "AUTH_IS_READY", payload: user})
            });
    },[])
    
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}