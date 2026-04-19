---
title: "Agents & Prompt Chaining"
slug: "guide-11"
tier: "advanced"
tags: ["agents", "chaining", "orchestration", "multi-step", "ReAct"]
step: 11
---

# Agents & Prompt Chaining

Sometimes one prompt isn't enough. **Prompt chaining** connects multiple prompts in sequence — the output of one becomes the input of the next. **Agents** go further: the model autonomously decides what to do next, calling tools and looping until the task is done.

## Prompt chaining

```
Step 1 prompt: "Extract all action items from this meeting transcript."
→ Output: ["Schedule follow-up", "Send budget proposal", ...]

Step 2 prompt: "For each action item, write a 1-sentence Slack message:
Action items: {step1_output}"
→ Output: Formatted Slack messages
```

This is cleaner and more reliable than one mega-prompt that tries to do everything.

## The ReAct pattern

ReAct (Reasoning + Acting) is the dominant agent loop:

```
Thought: I need to find the population of Tokyo.
Action: search("Tokyo population 2024")
Observation: Tokyo has ~13.9 million people.
Thought: I have the data. Now I can answer.
Answer: Tokyo's population is approximately 13.9 million.
```

The model alternates between thinking and acting until it reaches an answer.

## When to use agents

- Tasks that require >3 sequential decisions
- Tasks where the right path depends on intermediate results
- Tasks that need external tools (search, code execution, APIs)

## Risks

Agents can get stuck in loops, take irreversible actions, or be manipulated via **prompt injection** (malicious content in retrieved data). Always set maximum iteration limits and review actions before execution in production.

**Source**: [Yao et al., "ReAct" (2022)](https://arxiv.org/abs/2210.03629)
