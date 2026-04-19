---
title: "Structured Output (JSON Schema)"
slug: "guide-07"
tier: "intermediate"
tags: ["structured-output", "json", "schema", "parsing"]
step: 7
---

# Structured Output

Getting the AI to return clean, parseable JSON (or XML, CSV, etc.) is one of the most important practical skills in prompt engineering. It makes AI outputs easy to feed into apps, databases, and APIs.

## Basic JSON request

```
Extract the following information and return ONLY valid JSON, no extra text:

Text: "Sarah Johnson joined Acme Corp as a Senior Engineer in March 2023."

Schema:
{
  "name": string,
  "company": string,
  "role": string,
  "start_date": "YYYY-MM" format
}
```

## Schema-driven prompting

Providing the exact schema as a template dramatically improves reliability:

```
Return a JSON object matching this exact schema:
{
  "product": string,
  "pros": [string, string, string],
  "cons": [string, string],
  "rating": number (1-10),
  "verdict": "buy" | "skip" | "wait"
}

Review: "The headphones sound amazing but the ear cups get warm after an hour..."
```

## Using API structured output modes

OpenAI's `response_format: { type: "json_object" }` and Anthropic's tool-calling mode enforce JSON at the API level — no prompt tricks needed. But even then, a clear schema in the prompt improves field accuracy.

## Handling failures

- Always validate output with a JSON parser before using it
- Add "If you cannot fill a field, use null" to handle missing data
- For complex schemas, break into smaller sub-prompts

**Source**: [OpenAI Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs)
