---
title: "Temperature & Sampling"
slug: "temperature-sampling"
tier: "intermediate"
tags: ["temperature", "top-p", "sampling", "randomness", "creativity", "determinism"]
---

# Temperature & Sampling

Temperature controls how randomly the model samples the next token. Low temperature → deterministic, predictable outputs. High temperature → creative, diverse, sometimes surprising outputs.

**Temperature 0**: Always picks the most likely next token. Use for code generation, data extraction, and factual Q&A where consistency matters.

**Temperature 0.7**: The sweet spot for most tasks — creative enough to be engaging, focused enough to be coherent.

**Temperature 1.0+**: High creativity. Use for brainstorming, fiction, poetry. Risk: occasional incoherence.

**Top-p (nucleus sampling)** limits sampling to the smallest set of tokens covering `p` probability mass. Setting `top_p=0.9` effectively ignores the long tail of unlikely tokens. Adjust temperature *or* top-p, rarely both aggressively.

## Example API call

```python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Write an unusual metaphor for procrastination."}],
    temperature=1.1,   # High creativity for metaphor generation
    top_p=0.95
)
```

**Source**: [Holtzman et al., "The Curious Case of Neural Text Degeneration" (2020)](https://arxiv.org/abs/1904.09751)
