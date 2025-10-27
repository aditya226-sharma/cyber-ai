
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const API_KEY = "AIzaSyDyTqeHpFzelFUqOShncqrIAVUowccQiaw";

async function generateContent(prompt) {
    const response = await fetch(GEMINI_API_URL, {
        headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': API_KEY
        },
        method: 'POST',
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        { text: prompt }
                    ]
                }
            ]
        })
    })

    const data = await response.json();
    return data;
}

const result = generateContent("How does AI work?");
const { candidates } = await result;