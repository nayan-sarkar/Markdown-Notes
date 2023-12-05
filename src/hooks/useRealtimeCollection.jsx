import React from 'react';
import {db,auth} from './../firebase/config';
import {onSnapshot,collection, query, where, orderBy} from 'firebase/firestore';

export function useRealtimeCollection(collectionDataName, queryItemOne, queryItemTwo){
    const [documents,setDocuments] = React.useState(null);
    const [error,setError] = React.useState(null);

    // get Collections Data Reference
    let collectionsDataRef = collection(db, collectionDataName);

    // filter Collections Data Reference if query exists
    collectionsDataRef = query(collectionsDataRef,where(queryItemOne , "==", queryItemTwo));
    

    // Realtime Listener Attached to Dom, Need Only Once
    React.useEffect(()=>{
        
    const unsub = onSnapshot(collectionsDataRef,(snapshot)=>{
        setDocuments(snapshot.docs.map(doc=>({...doc.data(), id: doc.id})))
    },
    (err)=>{setError(err)})
    
    // cleanup
    return ()=>{
        // console.log("Logic Cleaned")
        unsub()
    }

    },[])  


    return {documents, error}
}