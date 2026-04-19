---
title: "Speculative & Parallel Prompting"
slug: "speculative-parallel-prompting"
tier: "frontier"
tags: ["speculative", "parallel", "latency", "efficiency", "batching"]
---

# Speculative & Parallel Prompting

Speculative and parallel prompting techniques reduce latency by running multiple LLM calls simultaneously rather than sequentially.

**Speculative execution**: Start the most likely next prompt before the current one finishes. If the speculation is right, you've saved a full round trip. If wrong, discard and use the actual result. Works when you can predict the likely path (e.g., "if classification is positive, run sentiment analysis").

**Parallel fan-out**: When a task has independent sub-tasks, fire all LLM calls in parallel and join results. A 5-step sequential pipeline taking 5s each becomes a parallel pipeline taking ~5s total.

**Speculative decoding** (inference optimization): A small draft model generates token candidates; the large model verifies them in parallel. 2-4x throughput improvement for the same output quality.

## Parallel prompting example

```python
import asyncio

async def analyze_document(doc):
    # All three run simultaneously
    summary, sentiment, keywords = await asyncio.gather(
        llm_async("Summarize in 50 words: " + doc),
        llm_async("Classify sentiment (Positive/Negative/Neutral): " + doc),
        llm_async("Extract 5 keywords as JSON array: " + doc),
    )
    return {"summary": summary, "sentiment": sentiment, "keywords": keywords}
```

**Source**: [Chen et al., "Speculative Decoding" (2023)](https://arxiv.org/abs/2302.01318)
