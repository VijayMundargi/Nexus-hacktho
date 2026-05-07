const {
    GoogleGenerativeAI
} = require("@google/generative-ai");

require('dotenv').config();

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

async function test() {

    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(
        "Hello"
    );

    const response = result.response.text();

    console.log(response);
}

test();