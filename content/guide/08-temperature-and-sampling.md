---
title: "Temperature & Sampling"
slug: "guide-08"
tier: "intermediate"
tags: ["temperature", "sampling", "top-p", "randomness", "creativity"]
step: 8
---

# Temperature & Sampling

Language models don't just pick the single "best" word — they sample from a probability distribution over all possible next tokens. **Temperature** and **sampling parameters** control how creative or predictable that sampling is.

## Temperature

- **Temperature = 0**: Always picks the most likely token. Deterministic, consistent, good for factual tasks.
- **Temperature = 0.7**: Balanced creativity and coherence. Good for most writing tasks.
- **Temperature = 1.0+**: Highly creative, sometimes random. Good for brainstorming, poetry, fiction.

```python
# Low temperature — factual, consistent
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "What is the capital of France?"}],
    temperature=0.0
)

# High temperature — creative, varied
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Write a one-line poem about rain."}],
    temperature=1.2
)
```

## Top-p (nucleus sampling)

Top-p limits sampling to the smallest set of tokens whose cumulative probability exceeds p. `top_p=0.9` means only consider the top 90% probability mass.

- Use **temperature** OR **top-p** adjustment, not both aggressively at once.
- OpenAI recommends setting one and leaving the other at default.

## Practical guide

| Task | Temperature |
|---|---|
| Code generation | 0.0 – 0.2 |
| Data extraction | 0.0 |
| Summarization | 0.3 – 0.5 |
| Copywriting | 0.6 – 0.8 |
| Creative fiction | 0.9 – 1.3 |
| Brainstorming | 1.0+ |

**Source**: [Hugging Face — Generation Strategies](https://huggingface.co/docs/transformers/generation_strategies)
