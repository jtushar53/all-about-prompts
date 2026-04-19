---
title: "Role Prompting"
slug: "role-prompting"
tier: "intermediate"
tags: ["role", "persona", "expert", "character", "framing"]
---

# Role Prompting

Assigning the AI a specific role or persona activates a cluster of related knowledge, terminology, and reasoning style. "Act as a senior DevOps engineer" produces more technical, operations-focused answers than a generic prompt on the same topic.

Roles work because the model has learned associations between identity labels and patterns of language. A "skeptical venture capitalist" will poke holes in plans; a "supportive therapist" will affirm and explore; a "strict editor" will cut aggressively.

Combine role prompts with explicit behavioral rules for best results. The role provides the default posture; the rules override specific behaviors you want to control precisely.

## Example prompt

```
Act as a senior data scientist with 10 years of industry experience.
You are reviewing a junior analyst's approach to a machine learning problem.
Be honest about weaknesses but constructive — suggest improvements, not just criticisms.

Approach to review:
"I trained a random forest on the raw data and got 94% accuracy, so the model is ready for production."
```

**Source**: [Schulhoff et al., "The Prompt Report" (2024)](https://arxiv.org/abs/2406.06608)
