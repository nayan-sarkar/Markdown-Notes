import {useAuthContext} from './../hooks/useAuthContext';
import {Outlet, Navigate} from 'react-router-dom';

export default function isAuthenticated(){

    const data = useAuthContext();

    if(data.user){
        return <Outlet/>
    }
    else return <Navigate to = "/home"/>
}