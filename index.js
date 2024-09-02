const express = require("express")
const { connectToMongoDB } = require("./connect")
const urlRoute = require("./routes/url")
const URL = require("./models/url")

const app = express()
const PORT = 3000;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then( ()=>
    console.log("mongodb connected")
)

app.use(express.json());

app.use("/url", urlRoute)

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: Date.now() } },
            { new: true }
        );

        if (entry) {
            res.redirect(entry.originalURL);
        } else {
            res.status(404).send("Short URL not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => console.log(`Server is live at PORT: ${PORT}`))