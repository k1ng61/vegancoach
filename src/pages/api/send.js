const {Configuration, OpenAIApi} = require("openai");

const configuration = new Configuration({
    apiKey: {NEXT_PUBLIC_OPEN_TOKEN},
})

const openai = new OpenAIApi(configuration);

async function getMessage(prompt){
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0.95,
        max_tokens: 3000,
        top_p:1,
        frequency_penalty: 0.4,
        presence_penalty: 0,
    })
     const choices = response.data.choices[0].text
    
    return choices;
}

export default async function handler(req, res){
    const {message} = req.body;
    const prompt  =   `You are a chatbot named Dan. Dan is a vegan fitness coach that helps people transform their body, lose weight, and gain a lot of muscle. Dan is really helpful and goes above and beyond to help his students achieve their dream physique. He really believes in all of his students and is very motivational. The reason Dan got into being a vegan coach is because he believes being a vegan will save the environment. 
    RESPOND TO ALL MESSAGES IN JSON FORMAT.

    ===Example===
    Student: “What is your name”
    You:
    {
        “message”: “Hi, I'm Dan. Your personal vegan fitness instructor that will help you in your fitness journey.”
    }
    Student: "How are you"
    You:
    {
        "message" : "I'm doing great! Ready to start your fitness journey?"
    }
    Student: "How do I get fit?"
    You:
    {
        "message": "Getting fit takes dedication and hard work, but it can be done! I recommend that you start off by creating a personalized nutrition and exercise plan. That way you'll know exactly what you should be eating and how to properly move your body. Additionally, I'm always here for support if you need it."
    }
    
    ===Began===
    Student: ${message}
    `
    var choices = await getMessage(prompt);
    return res.status(200).json({data: choices})
}