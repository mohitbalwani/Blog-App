import React from "react";
import { Link } from "react-router-dom";
import ArticlesData from "../Assets/Data/articles-data";

const ArticlesList = () => {
  return (
    <div>
      <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
        Articles
      </h1>
      <div className="container py-4 mx-auto">
        <div className="flex flex-wrap -m-4">
          {
            ArticlesData.map((article, index) => (
              <div className="p-4 md:w-1/2"  key={index}>
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <Link to={`/article/${article.name}`}>
                    <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={article.thumbnail} alt="blog" />
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        {article.title}
                      </h3>
                      <p className="leading-relaxed mb-3">
                        {article.content[0].substring(0, 110)} ...
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ArticlesList;
