---
title: "Few-Shot Prompting"
slug: "few-shot"
tier: "intermediate"
tags: ["few-shot", "examples", "in-context-learning", "demonstrations"]
---

# Few-Shot Prompting

Few-shot prompting provides 2–8 input/output examples before the real task. It is the most reliable form of in-context learning for tasks where the pattern is subtle, the format is unusual, or zero/one-shot fails.

The model treats your examples as a pattern to continue — it infers the mapping from inputs to outputs and applies it to the final input. This works remarkably well even for tasks never seen during training.

**Keys to good few-shot examples:**
- Consistent format across all examples
- Representative of the real distribution of inputs
- Diverse enough to cover edge cases
- Ordered randomly (ordering effects can introduce bias)

## Example prompt

```
Extract the main emotion from each sentence. Return one word.

Sentence: "I can't believe they cancelled my favorite show!"
Emotion: Anger

Sentence: "She got the job she'd been dreaming about for years."
Emotion: Joy

Sentence: "Nobody showed up to my birthday party."
Emotion: Sadness

Sentence: "The results came back and everything is fine."
Emotion:
```

**Source**: [promptingguide.ai — Few-Shot](https://www.promptingguide.ai/techniques/fewshot)
