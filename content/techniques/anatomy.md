---
title: "Prompt Anatomy"
slug: "anatomy"
tier: "basics"
tags: ["anatomy", "structure", "instruction", "context", "input", "output"]
---

# Prompt Anatomy

Every effective prompt is composed of four core elements: **instruction**, **context**, **input**, and **output format**. Understanding these parts lets you diagnose and fix weak prompts systematically.

**Instruction** tells the model what task to perform. **Context** provides background that narrows the solution space. **Input** supplies the raw material (a document, question, or data). **Output format** specifies how the answer should be structured.

Not every prompt needs all four — a simple conversational query may only need an instruction. But when outputs are disappointing, the fix is almost always adding or clarifying one of these missing parts.

## Example prompt

```
[Instruction] Classify the sentiment of the review below.
[Context] The review is from an e-commerce site; possible sentiments are Positive, Neutral, or Negative.
[Input] Review: "The packaging was beautiful but the product broke on day two."
[Output] Return a single word: Positive, Neutral, or Negative.
```

**Source**: [Anthropic Prompt Engineering Docs](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)
