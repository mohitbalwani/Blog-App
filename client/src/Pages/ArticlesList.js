import React from "react";
import ArticlesData from "../Assets/Data/articles-data";

// Components
import Articles from "../Components/Articles";

const ArticlesList = () => {
  return (
    <div>
      <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
        Articles
      </h1>
      <div className="container py-4 mx-auto">
        <div className="flex flex-wrap -m-4">
          <Articles articles={ArticlesData}></Articles>
        </div>
      </div>
    </div>
  );
};

export default ArticlesList;
