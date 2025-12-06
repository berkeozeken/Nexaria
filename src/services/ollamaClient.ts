import axios from "axios";

export async function runLocalLLM(systemPrompt: string, userPrompt: string) {
  const prompt = `${systemPrompt}\n\nUSER:\n${userPrompt}\n\nASSISTANT:`;

  try {
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3.1",
        prompt,
        stream: false,
      },
      { timeout: 60_000 }
    );

    return response.data.response.trim();
  } catch (error) {
    // burada loglamak istersen logger kullanabilirsin
    throw new Error("AI_SERVICE_ERROR");
  }
}
