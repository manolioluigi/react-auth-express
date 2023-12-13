import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Post() {
    const [post, setPost] = useState({});
    const { slug } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3300/posts/${slug}`)
            .then((response) => response.json())
            .then((data) => {
                setPost(data.data);
            })
            .catch((error) => {
                console.error('Errore nel recupero dei dettagli del post:', error);
            });
    }, [slug]);

    const formatDateTime = (dateTimeString) => {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short',
        };
        return new Date(dateTimeString).toLocaleString(undefined, options);
    };

    return (
        <div className="height-77">
            <div className="container">
                < div className="row" >
                    <div className="col">
                        <h2 className='my-5'>{post.title}</h2>
                        <img src={post.image} alt={post.slug} />
                        <h5 className='my-4'>{post.content}</h5>
                        <p>{formatDateTime(post.createdAt)}</p>
                    </div>
                </div >
            </div >
        </div >
    );
}

export default Post;
