---
title: "Schema-Constrained Decoding"
slug: "schema-constrained-decoding"
tier: "frontier"
tags: ["constrained-decoding", "grammar", "schema", "structured-output", "reliability"]
---

# Schema-Constrained Decoding

Schema-constrained decoding enforces output structure at the token sampling level — not via prompt instructions, but by masking out tokens that would violate a grammar or JSON schema. The result is guaranteed-valid structured output with zero parsing failures.

Instead of asking the model nicely to return JSON, you provide a JSON schema and the decoding engine only allows tokens that keep the output valid at every step. This is fundamentally more reliable than prompt-based approaches, especially for complex nested schemas.

**Libraries:**
- **Outlines** (dottxt-ai/outlines): Python library, works with local models via llama.cpp/transformers
- **Guidance** (microsoft/guidance): Interleaves generation with programmatic control
- **llama.cpp grammar**: Built-in GBNF grammar support for local inference
- **OpenAI Structured Outputs**: Server-side enforcement for gpt-4o models

## Example with Outlines

```python
from outlines import models, generate
from pydantic import BaseModel
from typing import List

class ProductReview(BaseModel):
    product: str
    rating: int  # 1-5
    pros: List[str]
    cons: List[str]
    recommend: bool

model = models.transformers("mistralai/Mistral-7B-v0.1")
generator = generate.json(model, ProductReview)
result = generator("Review: The keyboard feels great but shipping was slow. 4/5.")
# result is a typed ProductReview object — guaranteed valid
```

**Source**: [Willard & Louf, "Efficient Guided Generation" (2023)](https://arxiv.org/abs/2307.09702)
