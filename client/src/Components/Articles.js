import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { GoShareAndroid } from "react-icons/go";

const Articles = ({ articles }) => {
  const [like, setlike] = useState(false);
  const [selectedLikeIndex, setSelectedLikeIndex] = useState(-1);

  const handleClick = (index) => {
    setSelectedLikeIndex(index);
    if (like) setlike(false);
    else setlike(true);
  };

  return (
    <>
      {articles.map((article, index) => (
        <div className="p-4 md:w-1/2" key={index}>
          <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <Link to={`/article/${article.name}`}>
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src={article.thumbnail}
                alt="blog"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {article.title}
                </h3>
                <p className="leading-relaxed mb-1">
                  {article.content[0].substring(0, 110)} ...
                </p>
              </div>
            </Link>
            <div className="like-icon mb-2 px-2">
              {like && selectedLikeIndex === index? (
                <button
                  className="p-2 focus:outline-none"
                  onClick={()=>handleClick(index)}
                >
                  <AiFillLike className="w-6 h-6" />
                </button>
              ) : (
                <button
                  className="p-2 focus:outline-none"
                  onClick={()=>handleClick(index)}
                >
                  <AiOutlineLike className="w-6 h-6" />
                </button>
              )}
              <button className="p-2 focus:outline-none">
                <GoShareAndroid className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Articles;
