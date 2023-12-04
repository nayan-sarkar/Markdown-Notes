import React from 'react';
import {db} from './../firebase/config';
import { collection, addDoc, doc, deleteDoc, Timestamp, setDoc, getDoc } from "firebase/firestore";

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

function firestoreReducer (state,action){
    switch(action.type){
        case 'IS_PENDING':
            return {document: null, success: false, error: null, isPending: true};
        case 'ADDED_DOCUMENT':
            return {isPending: false, document: action.payload, success: true, error: null}
        case 'ERROR':
            return {isPending: false, document: null, success: false, error: action.payload}

        default:
            return state
    }
}

export function useAddUpdateDeleteDocument(collectionName){
    const [response,dispatch] = React.useReducer(firestoreReducer, initialState);

    const [isCancelled,setIsCancelled] = React.useState(false);


    // only dispatch if not Cancelled
    const dispatchIfNotCancelled = (action) =>{

        if(isCancelled === true){
            // console.log("logic ran if dispatch not cancelled");
            dispatch(action);
        }
    }

    // Get Collection Reference
    const collectionData = collection(db, collectionName);


    // Add Document to Collection
    const addDocument = async (doc) =>{
        dispatch({type: 'IS_PENDING'})
   
    try {
        const createdAt =  Timestamp.fromDate(new Date())
        const addedDocument = await addDoc(collectionData, {...doc, createdAt});
        console.log("Document written with ID: ", addedDocument.id);
        dispatchIfNotCancelled({type: 'ADDED_DOCUMENT', payload: addedDocument})
        return addedDocument.id
      } 
    catch (e) {
        dispatchIfNotCancelled({type: 'ERROR', payload: e.message})
        console.error("Error adding document: ", e);
      }

    }

    // Update Document in Collection
    const updateDocument = async (docData,id)=>{
        dispatch({type: 'IS_PENDING'})
   
    try {
        const lastModifiedAt =  Timestamp.fromDate(new Date())
        await setDoc(doc(db, collectionName, id),{...docData, lastModifiedAt});

        console.log("Document Modified with ID: ", id);
        
      } 
    catch (e) {
        dispatchIfNotCancelled({type: 'ERROR', payload: e.message})
        console.error("Error adding document: ", e);
      }
    }

    // Get One Document from Collection
    const getOneDoc = async (id)=>{
        dispatch({type: 'IS_PENDING'})
   
    try {
        const result = await getDoc(doc(db, collectionName, id));

        console.log("Document Received with ID: ", result.data());

        return result.data();
        
      } 
    catch (e) {
        dispatchIfNotCancelled({type: 'ERROR', payload: e.message})
        console.error("Error adding document: ", e);
      }
    }
    
    // Delete Document to Collection
    const deleteDocument = async(id)=>{
        dispatch({type: 'IS_PENDING'})
   
    try{
        await deleteDoc(doc(db, collectionName, id));
        console.log("Did it delete?");
    }
    
    catch(e){
        console.error("Error Deleting document: ", e);
        dispatch({type: 'ERROR', payload: e})
    }
    
    }

    React.useEffect(()=>{
        return ()=>{
            console.log("Logic Ran in lower Effect")
            setIsCancelled(true);
        }
    },[])

    return {addDocument,getOneDoc, updateDocument, deleteDocument, response }

    
}