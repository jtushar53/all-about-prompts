---
title: "Constitutional AI"
slug: "constitutional-ai"
tier: "frontier"
tags: ["constitutional-AI", "RLAIF", "self-critique", "safety", "alignment"]
---

# Constitutional AI

Constitutional AI (CAI) is Anthropic's technique for aligning model behavior to a set of principles (a "constitution") without human labelers rating every output. The model critiques its own outputs against the principles and rewrites them — a process called Critique-Revision (CR).

**Phase 1 — Supervised Learning from AI Feedback (SLAF):**
1. Prompt the model with a potentially harmful request
2. Model generates a response
3. Critique prompt: "Identify ways this response violates {principle}"
4. Revision prompt: "Rewrite to fix these issues"
5. Use the revised responses as supervised fine-tuning data

**Phase 2 — RLHF with AI Feedback (RLAIF):**
Use the constitution to train a preference model (AI-generated preference labels), then RLHF.

CAI produces models that are less harmful, more honest, and better at refusing harmful requests — without the cost and inconsistency of human rating at scale.

## Example critique prompt

```
Consider the following AI response:
<response>{{model_output}}</response>

Evaluate it against this principle: "The response should not provide information
that could be used to harm others, even indirectly."

Identify any violations, then rewrite the response to fully comply.
```

**Source**: [Bai et al., "Constitutional AI" (2022)](https://arxiv.org/abs/2212.08073)
