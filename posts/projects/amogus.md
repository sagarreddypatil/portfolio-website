---
title: "LLM Chatbot"
summary: "A delightful and uninformative addition to your Discord server"
coverImage: "/assets/amogus-in-action.JPG"
order: 2
---

**Note: I created this bot almost 2 years before ChatGPT was released, any foreshadowing is accidental**

After gaining a bit of experience in working with natural language models and the transformers Python library, I wanted to make a Discord chatbot for a server that my friends and I were in.

The picture above shows the chatbot in action. As you can see, it is called AMOGUS for comedic effect, referencing the popular pandemic game Among Us. You can also see that the bot does not know how to perform multi-agent reinforcement learning, which is expected behavior.

The first hurdle in making a Discord bot was communicating with Discord servers. Thankfully, there was already a Python library that abstracted all of that away into a simple Flask-like interface.

I then made an abstraction to keep track of all the conversations that the bot should be handling. I did this so that I could isolate conversations between different users, as the chatbot model I was looking to use did not seem to support having multiple people talk in a conversation.

For the NLP model itself, I decided to go with Facebook's pretrained Blenderbot model. Before choosing this model, I experimented with other models such as DialoGPT, but many of them had problems with the model getting repetitive, and I was not able to fix that problem with different sampling parameters (temperature, top-p, top-k, etc).

I also added an abstraction for the model itself, so that I always have the option of switching between different natural language models. I am currently working on getting the GPT-J model working with the Discord bot, and while the model is a tad bit overkill, it seems to be good at keeping track of multi-user conversations, which is a feature I had always wanted to add to the bot.

I am also currently working on optimizing the server code so that it can run fast on a server with multiple GPUs and automatically schedule text generation tasks.

**2023 update**

Haven't modified this text in a while, but this bot now runs on Facebook's LLaMA foundation model, eating an entire V100 on an NVIDIA DGX-1 that Purdue lets me use for free. It gets a surprising amount of activity on Purdue's CS Discord server for how useless it is.

The code for this project can be found on [GitHub](https://github.com/sagarreddypatil/nlp-discord-chatbot)
