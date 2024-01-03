const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 3002;

app.use(express.json({ extended: false }));

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
        // console.log(articlesCollection);
        const articlesInfo = await articlesCollection.findOne({ name: articleName });
        console.log(articlesInfo);

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