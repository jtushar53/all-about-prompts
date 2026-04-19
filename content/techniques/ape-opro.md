---
title: "APE & OPRO: Automatic Prompt Optimization"
slug: "ape-opro"
tier: "frontier"
tags: ["APE", "OPRO", "automatic-prompt-engineering", "optimization", "gradient-free"]
---

# APE & OPRO: Automatic Prompt Optimization

**APE (Automatic Prompt Engineer)** uses an LLM to generate prompt candidates from input/output demonstrations, evaluates them on a validation set, and returns the best-scoring prompt. It treats prompt engineering as a program synthesis problem.

**OPRO (Optimization by PROmpting)** goes further: it feeds the LLM the history of previous prompts and their scores, and asks the LLM to propose a better prompt in the next step. This is optimization via natural language — no gradients, no weight updates.

Both approaches consistently outperform human-written prompts on benchmarks including GSM8K, Big-Bench Hard, and various classification tasks.

## APE workflow

```python
# 1. Show LLM demonstrations, ask it to generate prompt candidates
candidates = llm(f"""
Here are input/output examples:
{demonstrations}

Generate 5 different instruction prompts that would produce these outputs from these inputs.
""")

# 2. Score each candidate on validation set
scores = {c: evaluate(c, val_set) for c in parse_candidates(candidates)}

# 3. Return best
best_prompt = max(scores, key=scores.get)
```

## OPRO workflow

In each round, the meta-prompt includes: past (prompt, score) pairs + "Generate a new prompt that scores higher."

**Source**: [Zhou et al., "APE" (2022)](https://arxiv.org/abs/2211.01910) · [Yang et al., "OPRO" (2023)](https://arxiv.org/abs/2309.03409)
