---
title: "System Prompts & Roles"
slug: "guide-06"
tier: "intermediate"
tags: ["system-prompt", "role-prompting", "persona"]
step: 6
---

# System Prompts & Roles

Most modern AI APIs have a *system prompt* — a special instruction that sets the AI's persona and behavior before the conversation starts. Think of it as the backstage briefing before a performance.

## What a system prompt does

- Sets the AI's role and expertise
- Defines tone and style
- Enforces rules (what to do, what not to do)
- Provides persistent context for the whole conversation

## Example system prompt

```
You are an expert Python tutor for beginners.
Your explanations are always simple, friendly, and use real-world analogies.
You never write code without explaining each line.
If a user is frustrated, acknowledge their feelings before diving into the solution.
```

## Role prompting (user turn)

Even without a system prompt, you can assign a role in your message:

```
Act as a skeptical venture capitalist with 20 years of experience.
Critique the following startup pitch and identify the three biggest risks:

[pitch text here]
```

## Why roles improve output quality

Roles activate a cluster of related knowledge and behavior in the model. "Act as a doctor" makes the AI draw on medical terminology, caution, and diagnostic thinking — producing more relevant, accurate responses than a generic prompt.

## Caution

Role prompts aren't a security boundary. For safety-critical applications, always combine roles with explicit constraints and output validation.

**Source**: [Anthropic — System Prompts](https://docs.anthropic.com/en/docs/build-with-claude/system-prompts)
