---
title: "One-Shot Prompting"
slug: "one-shot"
tier: "intermediate"
tags: ["one-shot", "single-example", "demonstration"]
---

# One-Shot Prompting

One-shot prompting provides exactly one example before the real task. It bridges the gap between zero-shot (no guidance on format) and few-shot (multiple examples, more context window used).

One example is often enough to communicate an unusual output format, a specific style, or an edge case the model wouldn't handle correctly by default. It's the sweet spot for many practical tasks: more reliable than zero-shot, cheaper than few-shot.

Choose your single example carefully. It should represent the typical case, match the difficulty of real inputs, and exhibit every formatting rule you want the model to follow.

## Example prompt

```
Convert each sentence to pirate speak.

Normal: "Good morning! Have you seen my keys?"
Pirate: "Ahoy! Have ye laid eyes on me keys, matey?"

Normal: "We need to submit the report by Friday."
Pirate:
```

**Source**: [Brown et al., "Language Models are Few-Shot Learners" (2020)](https://arxiv.org/abs/2005.14165)
