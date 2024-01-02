import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ArticlesData from '../Assets/Data/articles-data';

// Pages
import NotFound from './NotFound';

// Components
import Articles from '../Components/Articles';
import CommentsList from '../Components/CommentsList';
import AddCommentForm from '../Components/AddCommentForm';

const Article = () => {
  const { name } = useParams();
  const article = ArticlesData.find((article) => article.name === name)
  const [articleInfo, setArticleInfo] = useState({comments: []})

  useEffect( () => {
    const fetchData = async () => {
      // const result = await fetch(`http://localhost:3002/api/articles/${name}`);
      const result = await fetch(`/api/articles/${name}`);
      if (!result.ok) {
        console.error('Error fetching data:', result.statusText);
        return;
      }
      const body = await result.json();
      setArticleInfo(body);
    };
    fetchData();
  }, [name]);

  if (!article) {
    return <NotFound />
  }
  
  const otherArticles = ArticlesData.filter(article => article.name!== name)
  return (
    <>
      <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
        {article.title}
      </h1>
      {
        article.content.map((paragraph, index) => (
          <p className='x-auto leading-relaxed text-base mb-4' key={index}>
            {paragraph}
          </p>
        ))
      }

      <AddCommentForm articleName={name} setArticleInfo={setArticleInfo}></AddCommentForm>

      <CommentsList comments={articleInfo.comments} />

      <h1 className='sm:text-2xl text-xl font-bold my-4 text-gray-900'>
        Other Articles
      </h1>
      <div className='flex flex-wrap -m-4'>
        <Articles articles={otherArticles}/>
      </div>
    </>
  )
}

export default Article