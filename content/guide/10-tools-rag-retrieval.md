---
title: "Tools, RAG & Retrieval"
slug: "guide-10"
tier: "advanced"
tags: ["tools", "RAG", "retrieval", "function-calling", "grounding"]
step: 10
---

# Tools, RAG & Retrieval

LLMs have a knowledge cutoff and can't access real-time data. Two solutions: **tools** (the model calls external functions) and **RAG** (retrieval-augmented generation — inject relevant docs into the prompt).

## Tool use / Function calling

You register functions with the AI. When it decides a function is needed, it returns a structured call instead of a text answer. Your code executes the function and feeds the result back.

```json
// Tool definition
{
  "name": "get_weather",
  "description": "Get current weather for a city",
  "parameters": {
    "type": "object",
    "properties": {
      "city": { "type": "string" }
    },
    "required": ["city"]
  }
}
```

The model sees your query, decides to call `get_weather(city="Tokyo")`, you run that, then return the data as a tool result message.

## Retrieval-Augmented Generation (RAG)

1. User asks a question
2. Embed the question → vector search over your document store
3. Retrieve top-k relevant chunks
4. Inject them into the prompt as context
5. Model answers using the retrieved context

```
Answer the question using ONLY the context below.
If the answer is not in the context, say "I don't know."

Context:
[retrieved document chunks here]

Question: What are the refund terms for annual subscriptions?
```

## Why RAG beats fine-tuning for factual tasks

- Cheaper to update (just update the doc store)
- Fully auditable (you can show which source was used)
- Works with very long, frequently-changing content

**Source**: [Lewis et al., "RAG" (2020)](https://arxiv.org/abs/2005.11401)
