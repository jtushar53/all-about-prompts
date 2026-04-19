---
title: "Zero-Shot Prompting"
slug: "zero-shot"
tier: "intermediate"
tags: ["zero-shot", "no-examples", "direct-instruction"]
---

# Zero-Shot Prompting

Zero-shot prompting means giving the model a task with no examples — just a clear instruction. It relies entirely on the model's pre-trained knowledge to generalize to your task.

Modern large language models are surprisingly capable zero-shot learners. For standard tasks — translation, classification, summarization, Q&A — a well-written instruction without any examples often produces excellent results.

Zero-shot is the right starting point before adding examples. If the model gets it right with zero examples, you save context window space and keep the prompt simple. Only escalate to one-shot or few-shot when zero-shot fails.

## Example prompt

```
Classify the following customer review as one of: Positive, Negative, or Neutral.
Return only the classification label, nothing else.

Review: "Shipping was slow but the product quality exceeded my expectations."
```

**Source**: [Wei et al., "Finetuned Language Models Are Zero-Shot Learners" (2022)](https://arxiv.org/abs/2109.01652)
