---
title: "Tool Use / Function Calling"
slug: "tool-use"
tier: "advanced"
tags: ["tool-use", "function-calling", "API", "actions", "grounding"]
---

# Tool Use / Function Calling

Tool use allows LLMs to call external functions — web search, code execution, database queries, API calls — and incorporate the results into their response. Instead of hallucinating answers, the model requests real data.

You define tools as JSON schemas describing available functions. The model decides when a tool is needed, returns a structured call, you execute it, and feed the result back as a tool message. Modern APIs (OpenAI, Anthropic, Gemini) support this natively.

Good tool design: each tool does one thing well (single responsibility), has a clear description the model can use to decide when to call it, and returns clean structured data.

## Tool definition example

```json
{
  "name": "search_products",
  "description": "Search the product catalog by keyword. Returns matching products with price and availability.",
  "parameters": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Search keyword or phrase"
      },
      "max_results": {
        "type": "integer",
        "description": "Maximum number of results to return (default: 5)"
      }
    },
    "required": ["query"]
  }
}
```

**Source**: [OpenAI Function Calling Guide](https://platform.openai.com/docs/guides/function-calling)
