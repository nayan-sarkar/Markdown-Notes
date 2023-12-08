import {Link} from 'react-router-dom';
import {useLogout} from '../hooks/useLogout'
import {useAuthContext} from '../hooks/useAuthContext';

export default function Navbar(){
    const {logout} = useLogout();
    const {user} = useAuthContext();
    return (
        <nav className="navbar">
            <ul>
                <li className="title"><Link to="/"><h1>Markdown Notes</h1></Link></li>
                {user &&
                <>
                 <li>
                    <div className="user-info">
                        {user.photoURL && <li><img
                                src={`${user.photoURL}`}
                                alt="photo url"
                                style={{
                                    height: "50px",
                                    borderRadius: "50%"
                                }}
                                />
                        </li>}
                        <li>{user.displayName}</li>
                    </div>
                </li>
                <li><button onClick={logout}>Logout</button></li>
                </>
                }
            </ul>
        </nav>
    )
}