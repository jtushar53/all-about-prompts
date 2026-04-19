---
title: "Structured Output"
slug: "structured-output"
tier: "intermediate"
tags: ["structured-output", "json", "schema", "parsing", "reliability"]
---

# Structured Output

Structured output prompting instructs the model to return data in a machine-parseable format — typically JSON, but also XML, CSV, or YAML. This is essential for integrating AI into software pipelines.

The most reliable technique is to include the exact schema as a template in your prompt. Modern APIs also offer native structured output modes (OpenAI's `response_format`, Anthropic tool calling) that enforce JSON at the API level.

Even with API-level enforcement, including a clear schema description in the prompt improves field accuracy and reduces hallucinated or missing fields.

Always validate the returned JSON programmatically — never trust raw LLM output for data that drives consequential decisions.

## Example prompt

```
Extract product information from the review and return ONLY valid JSON.
No explanations, no markdown code fences — raw JSON only.

Schema:
{
  "product_name": string,
  "rating": number (1-5),
  "pros": [string],
  "cons": [string],
  "recommend": boolean
}

Review: "The AirPods Pro 2 sound incredible and the ANC is best-in-class.
Battery life could be better and they're expensive, but I'd still recommend them."
```

**Source**: [OpenAI Structured Outputs Guide](https://platform.openai.com/docs/guides/structured-outputs)
