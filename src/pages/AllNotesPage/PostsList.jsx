import styles from './AllNotesPage.module.css';
import {Link} from 'react-router-dom';

export default function PostsList({posts}){

    return (
        <div className={styles['posts']}>
        {posts.map((post) => (
            <div key={post.id} className={styles['post']}>
                <Link to={`viewpost/${post.id}`}>
                <p className={styles['post-title']}>{post.title}</p>
                <p className={styles['post-body']}>{`${post.body.slice(0,70)}...`}</p>
                <p className={styles['post-date']}>Created at {post.createdAt.toDate().toString().slice(0,-29)}</p>
                </Link>
            </div>
        ))}
      </div>
    )


}