const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 3002;

app.use(express.json({ extended: false }));

// The Same-Origin Policy is a security feature implemented by web browsers.
// It restricts web pages from making requests to a different domain than the one that served the web page.
// In this case, the React application is running on different port, and its attempting to make a request to backend server which is running at different port.
// This cross-origin request gets blocked by the browser due to the Same-Origin Policy.
// CORS = Cross-Origin Resource Sharing
// When frontend application makes a request to the backend running at different port,
// the server needs to include specific headers in its response to indicate that it allows requests from the other domains.
// CORS acts as a middleware. This middleware adds the necessary headers to the server's responses to enable cross-origin requests.
// app.use(cors());

const checkMongoDBConnection = async (req, res, next) => {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017");
    const db = client.db("blog-data");
    req.db = db;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to database", error });
  }
};

app.get('/api/articles/:name', checkMongoDBConnection, async (req, res) => {
  try {
    const articleName = req.params.name;
    const articlesInfo = await req.db.collection('articles').findOne({ name: articleName });
    if (!articlesInfo) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }
    res.status(200).json(articlesInfo);
} catch (error) {
    res.status(500).json({ message: "Error fetching data from database", error });
}
});

app.post('/api/articles/:name/add-comments', checkMongoDBConnection, async (req, res) => {
    const { username, text } = req.body;
    const articleName = req.params.name;
    try {
        const articlesCollection = await req.db.collection('articles');
        const articlesInfo = await articlesCollection.findOne({ name: articleName });
        // console.log(articlesInfo);

        articlesInfo.comments.push({ username, text });
        await articlesCollection.updateOne(
            { name: articleName },
            { $set: { comments: articlesInfo.comments } }
        );
        res.status(200).json(articlesInfo);
    } catch (error) {
        res.status(500).json({message: "Error adding comments to the article", error});
    }
});

app.listen(PORT, () => {
    console.log("Server started at port", PORT)
});

// Add a cleanup process to close the MongoDB connection when the server is shut down
process.on('SIGINT', () => {
  req.mongoClient.close();
  process.exit();
});
