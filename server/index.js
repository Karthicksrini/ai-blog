const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { v4: uuidv4 } = require('uuid');

let blogs = [];

async function initializeFetch() {
    try {
        const { default: fetch, Headers } = await import('node-fetch');
        global.fetch = fetch; // Make fetch globally available
        global.Headers = Headers; // Make Headers globally available
    } catch (error) {
        console.error("Error initializing fetch:", error);
    }
}

const app = express();

app.use(cors());
app.use(express.json())

app.get("/blog/", (req, res) => {
    return res.status(200).send(blogs);
});

app.get("/blog/:id", (req, res) => {
    const id = req.params.id;
    const result = blogs.find((blog) => blog.id == id);
    return res.status(200).send(result);
});

app.post("/blog/", async (req, res) => {
    const topic = req.body?.topic
    if (!topic) {
        return res.status(400).json({ "msg": "topic is required" })
    }

    try {
        await initializeFetch(); // Initialize fetch before starting the server
        const genAI = new GoogleGenerativeAI("AIzaSyCuN6eGWbIPO23hOki6mINwCocZmtfaN6Y"); // Replace with your API key
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `Create a breif blog post about: ${topic}
        return the following format (title | author name | summary 2 lines | content 20 lines)
        fetch all the four items as mandatary separated by pipe symbol
        dont return the key names(title, author etc...) nor subject or any extra words`;

        const result = await model.generateContent(prompt);
        const response = result.response;

        if (!response || !response.candidates || response.candidates.length === 0) {
            throw new Error("Invalid response from AI model.");
        }

        let text = response.candidates[0].content.parts[0].text; // Correct way to get the response text
        const data = text.split("|")
        const blogPost = {
            id: uuidv4(),
            title: data[0]?.trim(),
            author: data[1]?.trim() || "author not found",
            summary: data[2]?.trim() || "summary Not found",
            content: data[3]?.trim() || "content Not found",
            created_at: new Date(),
        };

        blogs.unshift(blogPost); //store the blog post.
        return res.status(201).json(blogPost);
    } catch (error) {
        console.error("Error generating blog:", error);
        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
});

app.delete("/blog/:id", async (req, res) => {
    const id = req.params.id;
    blogs = blogs.filter((blog) => blog.id != id);
    return res.status(200).send(blogs)
});

app.listen(8080, () => {
    console.log("App is running...")
})