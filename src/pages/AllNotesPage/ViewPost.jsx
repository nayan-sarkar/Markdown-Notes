import styles from './ViewPost.module.css';
import Markdown from 'react-markdown';
import React from 'react';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {useAddUpdateDeleteDocument} from './../../hooks/useAddUpdateDeleteDocument';
import {useAuthContext} from './../../hooks/useAuthContext';
import {useParams} from 'react-router-dom';

export default function ViewPost(){
    const {postId} = useParams();
    const [body, setBody] = React.useState('');
    const [title, setTitle] = React.useState('');
    const {addDocument,deleteDocument, getOneDoc, updateDocument, response} = useAddUpdateDeleteDocument('notes');
    const [currentDocId, setCurrentDocId] = React.useState(postId);
    const {user} = useAuthContext();
    const [showModal, setShowModal] = React.useState(false);
    
    
    React.useState(()=>{
        async function test(){
            // console.log("effect logic ran here");
            const {title, body} = await getOneDoc(postId);
            // console.log("Getting",title, body);
            setBody(body);
            setTitle(title);
        }
        if(postId){
            test();
        }
    },[])

    const uid = user.uid;

    async function handleSubmit(){
        if(!body || !title){
            setShowModal(true);
        }
        else{
            // console.log("Post Saved",{uid,body,title});
            setCurrentDocId(await addDocument({uid,body,title}));
        }
        }

    function handleDelete(){
        // console.log("Deleted Doc with Id",(currentDocId));
        deleteDocument((currentDocId));
        setCurrentDocId(null);
        handleClear();
      
    }
    function handleClear(){
        setBody('');
        setTitle('');
    }

    function handleUpdate(){
        if(!body || !title){
            setShowModal(p=>!p);
        }else{
            // console.log("Update Started");
            updateDocument({body,title},currentDocId);
        }
        
    }
   
    return (
        <div className={styles.container}>
            {showModal && <div className={styles.modalbackdrop} onClick={()=>setShowModal(false)}>
                <div className={styles.modal}>
                    <p>Title or Post Cannot be Empty</p>
                </div>
            </div>}
            <div className={styles['post-container']}>
                <div className={styles["heading-container"]}>
                    <label>
                        <p>Post Title:</p>
                        <input
                            type = "text"
                            placeholder = "Enter Post Title"
                            onChange = {(e)=>setTitle(e.target.value)}
                            className={styles['post-heading']}
                            value={title}
                        />
                    </label>
                    <div className={styles['all-btns']}>
                        {currentDocId && <button onClick={()=>handleUpdate()}>Update</button>}
                        {!currentDocId && <button onClick={()=>handleSubmit()}>Save</button>}
                        {currentDocId && <button onClick={()=>handleDelete()}>Delete</button>}
                        <button onClick={()=>handleClear()}>Clear</button>
                        
                    </div>
                </div>
                <div className={styles['markdown-container']}>
                    <div>
                        <p className={styles['box-title']}>Write Post</p>
                        <div className={styles['input-output-container']}>
                        <textarea onChange={(e)=>setBody(e.target.value)} value={body}></textarea>
                        </div>
                    </div>
                    <div>
                        <p className={styles['box-title']}>Markdown Preview</p>
                        <div className={styles['input-output-container']}>
                        {/* Code From github.com/remarkjs/react-markdown*/}
                        <Markdown
                            remarkPlugins={[remarkGfm]}
                            children={body}
                            components={{
                            code(props) {
                            const {children, className, node, ...rest} = props
                            const match = /language-(\w+)/.exec(className || '')
                            return match ? (
                            <SyntaxHighlighter
                                {...rest}
                                PreTag="div"
                                children={String(children).replace(/\n$/, '')}
                                language={match[1]}
                            />
                            ) : (
                            <code {...rest} className={className}>
                                {children}
                            </code>
                            )
                        }
                        }}
                        />
                        </div> 
                    </div>
                    
                    
                       
                </div>
            </div>
        </div>
        
    )
}