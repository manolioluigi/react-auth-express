import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import Login from './Login';

function Blog() {
    const [posts, setPosts] = useState([]);
    const { user } = useAuth();

    const tagColors = {
        "1": 'green',
        "2": 'blue',
        "3": 'red',
        "4": 'purple',
    };

    useEffect(() => {
        if (!user) {
            return;
        }

        fetch('http://localhost:3300/posts')
            .then((response) => response.json())
            .then((data) => {
                setPosts(data.data);
            })
            .catch((error) => {
                console.error('Errore nel recupero dei post:', error);
            });
    }, [user]);

    if (!user) {
        return <Login />;
    }

    return (
        <div className="heigth-77 pb-5">
            <div className="container">
                <div className="row d-flex justify-content-center gap-5">
                    {posts.map((post) => (
                        <div className={`post ${tagColors[post.tagId]}`} key={post.id}>
                            <div className="post my-2">
                                <div className='upper-card'>
                                    <img src={post.image} alt={post.slug} />
                                </div>
                                <div className='bottom-card'>
                                    <h5>{post.title}</h5>
                                    <p className='margin-0'>{post.content}</p>
                                    <div className="tags">
                                        <span className={`badge bg-${tagColors[post.tagId]}`}>
                                            {tagColors[post.tagId]}
                                        </span>
                                    </div>
                                    <a href={`/post/${post.slug}`}>
                                        <div className="button">LEGGI DI PIU'</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Blog;
