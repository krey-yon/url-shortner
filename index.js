const express = require("express")
const { connectToMongoDB } = require("./connect")
const urlRoute = require("./routes/url")
const URL = require("./models/url")

const app = express()
const PORT = 3000;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then( ()=>
    console.log("mongodb connected")
)

app.set("view engine", "ejs");
app.use(express.json());

app.use("/url", urlRoute)

app.get("/:shortId", async (req, res) => {    
    const shortID = req.params.shortId;
    const urlDoc = await URL.findOne({ shortID });

    if (urlDoc) {
        res.redirect(urlDoc.redirectURL)
    }
});

app.get("/", async (req, res) => {
    const allUrls =  await URL.find({});
     return res.end(`
        <html>
        <head></head>
        <body>
        <ol>
            ${allUrls.map(url => `<li>${url.shortID} Points to ${url.redirectURL}</li>`).join("")}
        </ol>
        </body>
        </html>
        `
     )
})

app.

app.listen(PORT, () => console.log(`Server is live at PORT: ${PORT}`))