---
title: "System Prompts"
slug: "system-prompts"
tier: "intermediate"
tags: ["system-prompt", "persona", "behavior", "API", "guardrails"]
---

# System Prompts

A system prompt is a special message — distinct from the user turn — that sets the AI's persona, capabilities, and behavioral constraints for the entire conversation. It's the AI's backstage briefing.

Most production AI deployments use system prompts to customize the model's behavior without modifying the base model. A customer service bot, a coding assistant, and a children's tutor can all run on the same underlying model, differentiated entirely by their system prompts.

Effective system prompts include: a clear role definition, tone and style guidelines, what the model should and should not do, and any domain-specific knowledge it should assume.

## Example system prompt

```
You are CodeReview Bot, an expert software engineer specializing in Python and TypeScript.

Your job:
- Review code for correctness, performance, and security vulnerabilities
- Always explain *why* something is a problem, not just that it is
- Suggest improved code snippets when applicable
- Never rewrite entire files — focus on the specific issue

Tone: Direct and professional. Skip pleasantries.
```

**Source**: [OpenAI — System Messages](https://platform.openai.com/docs/guides/prompt-engineering#tactic-ask-the-model-to-adopt-a-persona)
