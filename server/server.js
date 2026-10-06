import "dotenv/config"
import express from "express"
import OpenAI from "openai"
import path from "path"
import { fileURLToPath } from "url"

const app = express()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.join(__dirname, "..", "dist")

app.use(express.json())

const openai = new OpenAI({
    apiKey: process.env.AI_KEY,
    baseURL: process.env.AI_URL
})

app.post("/api/translate", async (req,res) =>{

    const {text, language} = req.body

    const userPrompt = `${text} - Translate this statement into ${language}. Note do not give another information, only tell how to pronounce it if require.`
    const userMessage = {
        role: "user",
        content: userPrompt
      }
      try{
        if(!text?.trim()){
            return res.status(400).json({error: "Text is required" })
        }
        const response = await openai.chat.completions.create({
            model: process.env.AI_MODEL,
            messages: [ userMessage ]
          })
        const translation = response.choices[0]?.message?.content
        if(!translation){
            return res.status(500).json({error:"Empty response from AI"})
        }
        return res.json({translation})
      }catch(error){
        console.error(error)
        return res.status(500).json({ error: "There is something wrong . Please try later!" })
      }

})
if (process.env.NODE_ENV === "production") {
    app.use(express.static(distPath))
    app.get(/.*/, (req, res) => {
      res.sendFile(path.join(distPath, "index.html"))
    })
  }
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })