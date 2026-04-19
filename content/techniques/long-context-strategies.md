---
title: "Long-Context Strategies"
slug: "long-context-strategies"
tier: "frontier"
tags: ["long-context", "context-window", "lost-in-the-middle", "chunking", "attention"]
---

# Long-Context Strategies

Models with 128k–1M token context windows are available, but bigger context isn't always better. The "lost in the middle" phenomenon shows model accuracy degrades for information placed in the middle of long contexts — models attend more reliably to content near the beginning and end.

**Strategies for reliable long-context use:**

**Relevant-first ordering**: Place the most critical context at the start of the prompt, not buried in the middle.

**Explicit pointers**: Add "The key information is in the section labeled [CRITICAL]" to help the model attend to the right part.

**Chunked processing**: For very long docs, process chunk by chunk and aggregate (map-reduce style) rather than stuffing everything in one prompt.

**Hierarchical summarization**: Summarize each chapter → then summarize the summaries. Preserves signal while reducing tokens.

**Sliding window with overlap**: When context doesn't fit, slide a window with 10-20% overlap to prevent losing information at chunk boundaries.

## Map-reduce pattern

```python
# Map: process each chunk independently
chunk_summaries = [llm(f"Summarize key facts from:\n{chunk}") for chunk in chunks]

# Reduce: synthesize all summaries
final = llm(f"Synthesize these summaries into a comprehensive answer to: {question}\n\n" + "\n---\n".join(chunk_summaries))
```

**Source**: [Liu et al., "Lost in the Middle" (2023)](https://arxiv.org/abs/2307.03172)
