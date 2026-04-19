---
title: "Self-Consistency"
slug: "self-consistency"
tier: "intermediate"
tags: ["self-consistency", "majority-vote", "ensemble", "reasoning", "reliability"]
---

# Self-Consistency

Self-consistency generates multiple independent reasoning chains for the same problem (using temperature > 0), then takes the majority vote answer. It significantly improves reasoning accuracy over single-chain CoT.

The intuition: a correct answer can be reached via many valid reasoning paths. An incorrect answer tends to be reached by fewer paths. By sampling many chains and aggregating, errors average out and the correct answer surfaces.

Self-consistency is especially powerful for tasks with a definite correct answer — math, logic, factual lookup — where "most common answer" is a meaningful signal. It's less useful for open-ended creative tasks.

Cost: you pay for N model calls per query (typically N=5–20). Worth it for high-stakes reasoning where accuracy matters more than cost.

## Example approach

```python
answers = []
for _ in range(10):
    response = llm(prompt, temperature=0.7)
    answer = extract_final_answer(response)
    answers.append(answer)

# Majority vote
from collections import Counter
final = Counter(answers).most_common(1)[0][0]
```

**Source**: [Wang et al., "Self-Consistency Improves CoT Reasoning" (2022)](https://arxiv.org/abs/2203.11171)
