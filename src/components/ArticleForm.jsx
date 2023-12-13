import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ArticleForm({ articleToEdit }) {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const [published, setPublished] = useState(false);
    const [categories, setCategories] = useState([
        { id: 1, name: 'Categoria 1' },
        { id: 2, name: 'Categoria 2' },
        { id: 3, name: 'Categoria 3' },
        { id: 4, name: 'Categoria 4' },
    ]);
    const [tags, setTags] = useState([
        { id: 1, name: 'Tag 1' },
        { id: 2, name: 'Tag 2' },
        { id: 3, name: 'Tag 3' },
        { id: 4, name: 'Tag 4' },
    ]);
    const [categoryId, setCategoryId] = useState(categories.length > 0 ? categories[0].id : null);
    const [tagId, setTagId] = useState([]);
    const navigate = useNavigate();

    const handleEdit = () => {
        if (articleToEdit && articleToEdit.success && articleToEdit.data) {
            const articleData = articleToEdit.data;
            setTitle(articleData.title || '');
            setImage(articleData.image || '');
            setContent(articleData.content || '');
            setPublished(articleData.published || false);
            setCategoryId(articleData.categoryId || null);
            setTagId(Array.isArray(articleData.tagId) ? articleData.tagId : []);
        }
    };

    useEffect(() => {
        handleEdit();
    }, []);

    const isTagSelected = (tagId, selectedTagId) => selectedTagId && selectedTagId.includes(tagId);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const articleData = {
            title,
            image,
            content,
            published,
            categoryId: categoryId !== null ? parseInt(categoryId, 10) : 1,
            tagId: Array.isArray(tagId) && tagId.length > 0 ? parseInt(tagId[0], 10) : 1,
        };

        try {
            const requestMethod = articleToEdit ? 'PUT' : 'POST';
            let requestURL = 'http://localhost:3300/posts';

            if (articleToEdit) {
                console.log(articleToEdit)
                requestURL += `/${articleToEdit.data.slug}`;
                console.log(requestURL)
            }

            console.log('Data sent to server:', articleData);

            const response = await fetch(requestURL, {
                method: requestMethod,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(articleData),
            });

            if (!response.ok) {
                throw new Error(`Errore durante ${articleToEdit ? 'la modifica' : 'la creazione'} dell'articolo`);
            }

            setTitle('');
            setImage('');
            setContent('');
            setPublished(false);
            setCategoryId(null);
            setTagId(null);

            console.log(`${articleToEdit ? 'Articolo modificato' : 'Articolo creato'} con successo`);
            navigate('/dashboard');

        } catch (error) {
            console.error(`Errore durante ${articleToEdit ? 'la modifica' : 'la creazione'} dell'articolo:`, error);
        }
    };

    return (
        <div className='container height-77'>
            <h3>{articleToEdit ? 'Modifica Articolo' : 'Crea nuovo articolo'}</h3>
            <form className=' d-flex flex-column' onSubmit={handleSubmit}>
                <label>Titolo:</label>
                <input type="text" value={title || ''} onChange={(e) => setTitle(e.target.value)} required />

                <label>Immagine URL:</label>
                <input type="text" value={image || ''} onChange={(e) => setImage(e.target.value)} />

                <label>Contenuto:</label>
                <textarea value={content || ''} onChange={(e) => setContent(e.target.value)} required />

                <label>Pubblicato:</label>
                <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />

                <label>Categoria:</label>
                <select value={categoryId === null ? '' : categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <label>Tag:</label>
                {tags.map((tag) => (
                    <div key={tag.id}>
                        <input
                            type="checkbox"
                            id={`tag-${tag.id}`}
                            checked={isTagSelected(tag.id, tagId)}
                            onChange={(e) => {
                                const isChecked = e.target.checked;
                                setTagId((prevTagId) => {
                                    if (isChecked) {
                                        return [tag.id];
                                    } else {
                                        return [];
                                    }
                                });
                            }}
                        />
                        <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
                    </div>
                ))}

                <button type="submit">Salva</button>
            </form>
        </div>
    );
}

export default ArticleForm;
