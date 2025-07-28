const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use(express.static("public"));

app.get("/recommend", async (req, res) => {
    try {
        const userInput = req.query.input;
        const prompt = `You are helpful in recommending Movies.\n${userInput}\nList out all Movies.`;

        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
            {
                contents: [{ parts: [{ text: prompt }] }]
            },
            {
                params: { key: GEMINI_API_KEY },
                headers: { "Content-Type": "application/json" }
            }
        );

        const recommendedMovie = response.data.candidates[0].content.parts[0].text;
        res.send(recommendedMovie);
    } catch (error) {
        console.error("Gemini error:", error.response ? error.response.data : error.message);
        res.status(500).send("An error occurred while processing your request.");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});