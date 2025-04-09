require("dotenv").configDotenv();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors())
app.post("/generate-flowchart", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(`${process.env.LOCAL_MISTRAL_URL}/api/chat`, {
      model: "mistral", 
      messages: [
        { role: "system", content: "You are a flowchart generator that returns diagrams using Mermaid.js format only, that means only start with 'flowchart TB'. and don't summarize the process " },
        { role: "user", content: `Create a flowchart in Mermaid.js format for this process: ${prompt}` }
      ],
      stream: false
    });

    const mermaidText = response.data.message.content;
    res.json({ mermaid: mermaidText });
  } catch (err) {
    console.error("Error from Ollama:", err.message);
    res.status(500).send("Ollama error");

  }
});

app.listen(3000, () => console.log(`🧠 AI Flowchart backend running on http://localhost:3000`));
