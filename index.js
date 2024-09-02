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
    const shortID = req.params.shortId;
    const urlDoc = await URL.findOne({ shortID });

    if (urlDoc) {
        res.redirect(urlDoc.redirectURL)
    }
});

app.listen(PORT, () => console.log(`Server is live at PORT: ${PORT}`))