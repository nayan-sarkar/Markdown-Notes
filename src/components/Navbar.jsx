import styles from './Navbar.module.css';
import {Link} from 'react-router-dom';
import {useLogout} from '../hooks/useLogout'
import {useAuthContext} from '../hooks/useAuthContext';

export default function Navbar(){
    const {logout} = useLogout();
    const {user} = useAuthContext();
    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}><Link to="/">MyMarkdown Notes</Link></li>
                
                {!user && <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                </>}
                
                {user &&
                 <>
                 <li>{user.displayName}</li>
                <li><button className="btn" onClick={logout}>Logout</button></li>
                </>}
            </ul>
        </nav>
    )
}