---
title: "Clarity & Specificity"
slug: "guide-03"
tier: "basics"
tags: ["clarity", "specificity", "precision"]
step: 3
---

# Clarity & Specificity

The number one reason AI outputs disappoint is a vague prompt. The fix is almost always: be more specific.

## Vague vs. specific

| Vague | Specific |
|---|---|
| "Write about dogs." | "Write a 200-word fun fact article about why dogs wag their tails, suitable for kids aged 8-12." |
| "Fix my code." | "Fix the Python TypeError on line 14. The function should return a list of integers." |
| "Give me ideas." | "Give me 5 creative marketing slogans for a reusable water bottle targeting college students." |

## Techniques for clarity

**Use numbers** — "3 examples", "200 words", "top 5 reasons"

**Name the audience** — "for a software engineer", "explain to a 10-year-old"

**Specify the format** — "as a numbered list", "in markdown", "as JSON"

**Set the tone** — "professional", "casual and friendly", "technical but approachable"

## Example prompt

```
You are a friendly science teacher.
Explain how photosynthesis works to a curious 8-year-old.
Use a simple analogy. Keep it under 100 words.
End with one fun fact.
```

This prompt has role, audience, method (analogy), length limit, and a required ending. Every word does work.

**Source**: [Google Gemini Prompting Whitepaper](https://ai.google.dev/gemini-api/docs/prompting-strategies)
