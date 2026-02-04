import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({
      reply: "API is alive. Use POST method."
    });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message missing" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a health AI doctor. Speak simply." },
        { role: "user", content: message }
      ]
    });

    return res.status(200).json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "OpenAI failed" });
  }
}
