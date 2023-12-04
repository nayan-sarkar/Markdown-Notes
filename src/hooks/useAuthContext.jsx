import React from 'react';
import {AuthContext} from './../context/AuthContext';

export const useAuthContext = () =>{
    const context = React.useContext(AuthContext);

    if(!context){
        throw Error("Error in Context")
    }

    return context;
} 


