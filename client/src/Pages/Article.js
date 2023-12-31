import React from 'react'
import { useParams } from 'react-router-dom'
import ArticlesData from '../Assets/Data/articles-data';
import NotFound from './NotFound';

const Article = () => {
  const { name } = useParams();
  const article = ArticlesData.find((article) => article.name === name)
  if (!article) {
    return <NotFound />
  }
  console.log(name);
  return (
    <div>
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
    </div>
  )
}

export default Article