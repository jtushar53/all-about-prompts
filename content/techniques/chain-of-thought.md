---
title: "Chain-of-Thought (CoT)"
slug: "chain-of-thought"
tier: "intermediate"
tags: ["chain-of-thought", "CoT", "reasoning", "step-by-step", "scratchpad"]
---

# Chain-of-Thought Prompting

Chain-of-thought prompting elicits step-by-step reasoning before the final answer. On tasks requiring multi-step inference — math, logic, planning — CoT dramatically improves accuracy compared to directly requesting the answer.

**Zero-shot CoT**: Append "Let's think step by step." to any prompt. Surprisingly effective with no examples.

**Few-shot CoT**: Provide 2–4 examples that show the reasoning chain, not just the answer. The model learns the reasoning pattern and applies it.

The key insight: language models generate tokens sequentially, so reasoning in the output can "look up" earlier computed facts. Showing work improves work.

## Example prompt

```
Answer the following word problem. Show all reasoning steps before the final answer.

Problem: A store sells 3 types of widgets. Type A costs $4, Type B costs $7,
and Type C costs $12. If a customer buys 5 of A, 3 of B, and 2 of C,
what is the total cost before tax?

Let's think step by step.
```

**Source**: [Wei et al., "Chain-of-Thought Prompting" (2022)](https://arxiv.org/abs/2201.11903)
