---
title: "Evaluator-Optimizer Loop"
slug: "evaluator-optimizer"
tier: "advanced"
tags: ["evaluator", "optimizer", "self-refinement", "critique", "iteration"]
---

# Evaluator-Optimizer Loop

The evaluator-optimizer pattern uses two LLM calls per iteration: one to generate a response, and one to evaluate and critique it. The critique feeds back into the next generation attempt, progressively improving the output.

This is a practical alternative to human feedback loops — the LLM acts as its own critic. It works well for writing, code, and structured outputs where quality can be assessed by an LLM without ground-truth labels.

The key is making the evaluator prompt explicit about quality criteria. A vague "is this good?" produces useless feedback; "evaluate clarity (1-10), accuracy (1-10), and conciseness (1-10), and list 3 specific improvements" produces actionable critique.

## Example loop

```python
response = llm(f"Write a product description for: {product}")

for _ in range(3):  # max 3 refinement rounds
    critique = llm(f"""
Evaluate this product description on:
1. Clarity (1-10)
2. Persuasiveness (1-10)  
3. Accuracy to product features (1-10)

List 3 specific improvements.

Description: {response}
""")
    response = llm(f"Rewrite this description incorporating this feedback:\n{critique}\n\nOriginal: {response}")
```

**Source**: [Madaan et al., "Self-Refine" (2023)](https://arxiv.org/abs/2303.17651)
