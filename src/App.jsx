import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AllNotesPage from './pages/AllNotesPage/AllNotesPage';
import Login from './pages/Login/Login';
import ViewPost from './pages/AllNotesPage/ViewPost';
import Signup from './pages/Signup/Signup';
import Layout from './components/Layout';
import IsAuthenticated from './components/IsAuthenticated';
import {useAuthContext} from './hooks/useAuthContext';
import './App.css';

export default function App(){
  const {authIsReady} = useAuthContext();
  return (
    <>
    { authIsReady && <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout/>}>
            <Route element ={<IsAuthenticated/>}>
                  <Route index element={<AllNotesPage/>}/>
                  <Route path="/viewpost" element={<ViewPost/>}>
                    <Route path=":postId" element={<ViewPost/>}/>
                  </Route>
            </Route>
            <Route path="signup" element={<Signup/>}/>
            <Route path="login" element={<Login/>}/>
         </Route>
      </Routes>
    </BrowserRouter>
 }
  </>
  )
}