---
title: "ReAct (Reason + Act)"
slug: "react"
tier: "advanced"
tags: ["ReAct", "reasoning", "acting", "agents", "tool-use", "loop"]
---

# ReAct: Reasoning + Acting

ReAct interleaves reasoning traces with actions in a loop: the model thinks, takes an action (tool call), observes the result, thinks again, and repeats until it reaches an answer. This produces more grounded and interpretable agent behavior than either reasoning-only or action-only approaches.

The pattern: `Thought → Action → Observation → Thought → ...`

ReAct outperforms chain-of-thought alone on tasks requiring external knowledge, because tool observations ground subsequent reasoning in real data rather than hallucinated facts.

It also outperforms action-only agents because the explicit reasoning step lets the model plan before acting, reducing wasted tool calls.

## Example prompt

```
Answer the question by reasoning step by step and using the search tool when needed.

Format each step as:
Thought: [your reasoning]
Action: search("[query]")
Observation: [result]
... (repeat as needed)
Answer: [final answer]

Question: What is the GDP of the country that hosted the 2024 Summer Olympics?
```

**Source**: [Yao et al., "ReAct: Synergizing Reasoning and Acting" (2022)](https://arxiv.org/abs/2210.03629)
