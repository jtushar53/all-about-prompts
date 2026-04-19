---
title: "Prompt Compression"
slug: "prompt-compression"
tier: "advanced"
tags: ["compression", "context-window", "efficiency", "LLMLingua", "tokens"]
---

# Prompt Compression

As context windows fill with retrieved documents, conversation history, and tool outputs, prompts get expensive and slow. Prompt compression techniques reduce token count while preserving the information needed for accurate answers.

**Approaches:**

**Selective compression** (manual): Remove boilerplate, repetitive preambles, and low-information content. Keep concrete facts, numbers, and unique details.

**Summarization**: Replace long document chunks with LLM-generated summaries. Lossy but effective when the full text isn't needed verbatim.

**LLMLingua / LLMLingua-2**: Learned compression — a smaller model scores token importance and drops low-importance tokens. Achieves 3–20x compression with minimal accuracy loss.

**Soft prompts** (research): Replace discrete tokens with continuous embeddings. Only available when you control model weights.

## Manual compression example

```
Before (47 tokens):
"Please carefully read the following document, which was written in 2023 by our
legal team, and summarize the key points about data retention policies..."

After (12 tokens):
"Summarize data retention policies from this 2023 legal doc:"
```

**Source**: [Jiang et al., "LLMLingua" (2023)](https://arxiv.org/abs/2310.05736)
