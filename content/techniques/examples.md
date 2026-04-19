---
title: "In-Context Examples"
slug: "examples"
tier: "basics"
tags: ["examples", "in-context-learning", "demonstrations", "pattern"]
---

# In-Context Examples

Providing worked examples inside your prompt is one of the most reliable ways to specify an unusual output format or style. The model infers the pattern from your examples and applies it to new inputs.

This technique works because language models are trained to continue patterns. When you show Input → Output pairs, the model treats your actual query as the next item in that pattern and completes accordingly.

The more consistent and representative your examples are, the better the model mirrors them. Include edge cases when they matter (empty inputs, unusual characters, long inputs).

## Example prompt

```
Convert each phrase to title case. Output only the converted phrase.

Input: "the quick brown fox"
Output: "The Quick Brown Fox"

Input: "machine learning is fun"
Output: "Machine Learning Is Fun"

Input: "react hooks in depth"
Output:
```

**Source**: [promptingguide.ai — Few-Shot](https://www.promptingguide.ai/techniques/fewshot)
