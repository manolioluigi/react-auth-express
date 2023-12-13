import React, { useState, useEffect } from 'react';
import ArticleForm from './ArticleForm';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [articles, setArticles] = useState([]);
    const [articleToEdit, setArticleToEdit] = useState(null);
    const navigate = useNavigate();

    const handleEdit = (article) => {
        setArticleToEdit(article);
        navigate(`/edit-article/${article.slug}`);
    };

    const handleCreate = () => {
        navigate('/create-article');
    };

    const handleDelete = async (articleSlug) => {
        try {
            const response = await fetch(`http://localhost:3300/posts/${articleSlug}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setArticles((prevArticles) => prevArticles.filter((article) => article.slug !== articleSlug));
            } else {
                console.error('Errore durante l\'eliminazione dell\'articolo');
            }
        } catch (error) {
            console.error('Errore durante l\'eliminazione dell\'articolo:', error);
        }
    };

    useEffect(() => {
        fetch('http://localhost:3300/posts')
            .then((response) => response.json())
            .then((result) => {
                const data = result.data || [];
                //console.log(data);
                setArticles(data);
            })
            .catch((error) => console.error('Errore durante il recupero degli articoli:', error));
    }, [articleToEdit]);

    return (
        <div className="height-77 my-5">
            <div className="container">
                <div className="row my-5">
                    <div className="col">
                        <h2>Elenco Articoli</h2>
                    </div>
                    <div className="col d-flex align-items-center justify-content-end">
                        <button className="btn btn-primary" onClick={() => handleCreate()}>Nuovo Articolo</button>
                    </div>
                </div>
                {Array.isArray(articles) &&
                    articles.map((article) => (
                        <div key={article.id}>
                            <div className="row">
                                <div className="col">
                                    <h4>{article.title}</h4>
                                    <p>{article.content}</p>
                                </div>
                                <div className="col d-flex justify-content-end align-items-center">
                                    <button className='btn btn-sm btn-warning' onClick={() => handleEdit(article)}>Modifica</button>
                                    <button className='btn btn-sm btn-danger mx-1' onClick={() => handleDelete(article.slug)}>Elimina</button>
                                </div>
                            </div>
                            <hr />

                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Dashboard;
