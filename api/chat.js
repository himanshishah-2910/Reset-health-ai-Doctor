import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `You are Reset Health AI Doctor. Speak simple Hinglish. No diagnosis, no medicines.\nUser: ${message}`
    });

    res.status(200).json({
      reply: response.output_text
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
