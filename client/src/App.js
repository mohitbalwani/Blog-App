import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import Article from "./Pages/Article";
import About from "./Pages/About";
import ArticlesList from "./Pages/ArticlesList";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";

// Components
import Navbar from "./Components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="max-w-screen-md mx-auto pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles-list" element={<ArticlesList />} />
          <Route path="/article/:name" element={<Article />} />
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
