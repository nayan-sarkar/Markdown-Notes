import styles from './AllNotesPage.module.css';
import React from 'react';
import PostsList from './PostsList';
import {useAuthContext} from './../../hooks/useAuthContext';
import {useRealtimeCollection} from './../../hooks/useRealtimeCollection';
import {useNavigate} from 'react-router-dom';

export default function AllNotesPage(){
    const navigate = useNavigate();
    const {user} = useAuthContext();
    const {documents, error} = useRealtimeCollection('notes',"uid",user.uid)

    return (
        <>
            <div className={styles.container}>
                <button className={styles.btn} onClick={()=>navigate("viewpost")}>Make Post</button>
                {/* {console.log("Home Page Docs",documents)} */}
                <>
                {error && <p>{error}</p>}
                {documents && <PostsList posts={documents}/>}
                </>
            </div>
        </>
        
    )
}