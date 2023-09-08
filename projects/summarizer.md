---
title: "Article Summarizer"
summary: "The fastest way to decide if that article is worth reading"
coverImage: "/assets/summarizer.JPG"
order: 5
---

For the HackJPS hackathon, my friends and I decided to create a chrome extension that could summarize articles. However, we didn't want this extension to be like the usual summarizer which just extracts sentences that are already in the article.

In order to achieve this, we decided to use a natural language transformer model to perform the summarization.

First, we needed to extract text from any article, so we used a library called mercury-parser. On the backend side, we used Python with Flask. For the summarization model itself, we used a version of BART finetuned on the CNN/DailyMail dataset.

We also attempted to quantize the model using ONNX in order to run it on users' machines, but that wasn't possible within the scope of the Hackathon. Regardless, we were able to win the hackathon. We completed the entire project, start to finish, in the span of just a few hours, which we thought was fairly impressive.
