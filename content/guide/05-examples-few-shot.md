---
title: "Examples (Zero / One / Few-Shot)"
slug: "guide-05"
tier: "basics"
tags: ["few-shot", "one-shot", "zero-shot", "examples", "in-context-learning"]
step: 5
---

# Examples: Zero, One, and Few-Shot Prompting

One of the most powerful ways to get exactly the output you want is to show the AI examples. This is called *in-context learning* — the AI learns from the examples in your prompt.

## Zero-shot

No examples — just an instruction. Works for simple tasks the model knows well.

```
Classify the sentiment of this review: "The battery died after 2 hours."
```

## One-shot

One example before your real input. Great for unusual formats.

```
Classify the sentiment.

Review: "Absolutely loved the packaging!"
Sentiment: Positive

Review: "The battery died after 2 hours."
Sentiment:
```

## Few-shot

Multiple examples. The AI learns your pattern more reliably.

```
Translate English slang to formal English.

Slang: "gonna"     → Formal: "going to"
Slang: "wanna"     → Formal: "want to"
Slang: "kinda"     → Formal: "kind of"
Slang: "lemme"     → Formal:
```

## Why it works

The AI uses the examples to infer the *pattern* you want — input format, output format, style, and logic. The more consistent your examples are, the better the AI mirrors them.

## Tips

- Use 3-5 examples for best results
- Make examples diverse enough to cover edge cases
- Keep the input/output format consistent across all examples

**Source**: [Brown et al., "Language Models are Few-Shot Learners" (GPT-3 paper)](https://arxiv.org/abs/2005.14165)
