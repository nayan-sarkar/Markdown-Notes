import {Link} from 'react-router-dom';
import {useLogout} from '../hooks/useLogout'
import {useAuthContext} from '../hooks/useAuthContext';

export default function Navbar(){
    const {logout} = useLogout();
    const {user} = useAuthContext();
    return (
        <nav className="navbar">
            <ul>
                <li className="title"><Link to="/">Markdown Notes</Link></li>
                {user &&
                 <>
                 <li>{user.displayName}</li>
                <li><button onClick={logout}>Logout</button></li>
                </>}
            </ul>
        </nav>
    )
}