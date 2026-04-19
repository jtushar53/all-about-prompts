---
title: "Chain-of-Thought Basics"
slug: "guide-09"
tier: "intermediate"
tags: ["chain-of-thought", "reasoning", "CoT", "step-by-step"]
step: 9
---

# Chain-of-Thought Prompting

Language models get better at multi-step reasoning when you ask them to *think out loud*. This is called **chain-of-thought (CoT)** prompting — you encourage the model to show its work before giving the final answer.

## The magic phrase

Simply adding "Let's think step by step." to your prompt dramatically improves reasoning on math, logic, and multi-step questions.

```
Q: A train travels 60 km/h for 2 hours, then 80 km/h for 1.5 hours.
   What is the total distance?

Let's think step by step.
```

Without CoT, the model might guess. With CoT it computes:
- Step 1: 60 × 2 = 120 km
- Step 2: 80 × 1.5 = 120 km
- Total: 240 km ✓

## Few-shot CoT

Provide an example that shows the reasoning process:

```
Q: Roger has 5 tennis balls. He buys 2 more cans of 3 balls each. How many does he have?
A: Roger starts with 5. Buys 2 cans × 3 = 6 more. 5 + 6 = 11. Answer: 11.

Q: The cafeteria had 23 apples. They used 20 for lunch and bought 6 more. How many now?
A:
```

## Zero-shot CoT

No examples needed — just add the magic phrase:

```
"Think through this carefully, step by step, before giving your final answer."
```

## When to use CoT

- Math word problems
- Logical deduction
- Code debugging
- Multi-condition decisions
- Any task where the answer requires multiple inference steps

**Source**: [Wei et al., "Chain-of-Thought Prompting Elicits Reasoning" (2022)](https://arxiv.org/abs/2201.11903)
