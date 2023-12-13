import React, { useState, useEffect } from 'react';
import ArticleForm from './ArticleForm';
import { useParams } from 'react-router-dom';

function EditArticle() {
    const { articleId } = useParams();
    const [articleToEdit, setArticleToEdit] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3300/posts/${articleId}`)
            .then((response) => response.json())
            .then((data) => setArticleToEdit(data))
            .catch((error) => console.error('Errore durante il recupero dell\'articolo:', error));
    }, [articleId]);

    if (!articleToEdit) {
        return <p>Caricamento in corso...</p>;
    }

    return <ArticleForm articleToEdit={articleToEdit} />;
}

export default EditArticle;
