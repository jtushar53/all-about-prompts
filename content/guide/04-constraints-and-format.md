---
title: "Constraints & Format Hints"
slug: "guide-04"
tier: "basics"
tags: ["constraints", "format", "output-format", "length"]
step: 4
---

# Constraints & Format Hints

Constraints are rules that shape the AI's output. Format hints tell it *how* to present the answer. Together they turn a rough answer into exactly what you need.

## Types of constraints

**Length** — "in under 50 words", "at least 3 paragraphs", "exactly 280 characters"

**Exclusions** — "do not use jargon", "no bullet points", "avoid the word 'very'"

**Inclusions** — "must include a real-world example", "always end with a call to action"

**Style** — "write like Hemingway", "use active voice throughout"

## Format hints

```
Return your answer as valid JSON:
{
  "summary": "...",
  "keywords": ["...", "..."],
  "difficulty": "beginner | intermediate | advanced"
}
```

Giving the AI the exact shape of JSON you expect dramatically reduces parsing errors.

## Delimiters

Use XML-like tags or triple backticks to mark sections clearly:

```
<document>
[your long text here]
</document>

Summarize the <document> above in one sentence.
```

This prevents the AI from confusing your content with your instructions.

## Example: constrained rewrite

```
Rewrite the following sentence to be:
- Under 15 words
- Active voice
- No passive constructions
- Friendly tone

Sentence: "The report was submitted by the team on Friday."
```

**Source**: [learnprompting.org](https://learnprompting.org)
