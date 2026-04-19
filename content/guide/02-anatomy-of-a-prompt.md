---
title: "Anatomy of a Prompt"
slug: "guide-02"
tier: "basics"
tags: ["anatomy", "structure", "instruction", "context", "input", "output"]
step: 2
---

# Anatomy of a Prompt

Every great prompt has four parts. You don't always need all four, but knowing them helps you build better prompts every time.

## The four parts

### 1. Instruction
What do you want the AI to *do*?

> "Summarize the following article in three bullet points."

### 2. Context
Background information the AI needs to answer well.

> "The article is from a science magazine aimed at 10-year-olds."

### 3. Input
The actual content to work with — a document, a question, a piece of code, etc.

> "Article: [paste article here]"

### 4. Output format
How should the answer look?

> "Return the bullets in markdown, each starting with an emoji."

## Putting it together

```
Summarize the following article in three bullet points.
The article is from a science magazine aimed at 10-year-olds.
Use simple language. Each bullet should start with a relevant emoji.

Article:
[paste article here]
```

## Why this structure works

The AI processes your text from top to bottom. Putting the instruction first tells the AI what mode to go into before it reads the rest. Context narrows the space of possible answers. The input gives it raw material. The format hint shapes the output.

**Tip**: If your answer is off, check which part is missing or fuzzy.

**Source**: [Anthropic Prompt Engineering Docs](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)
