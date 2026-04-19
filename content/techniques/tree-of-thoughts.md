---
title: "Tree of Thoughts (ToT)"
slug: "tree-of-thoughts"
tier: "advanced"
tags: ["tree-of-thoughts", "ToT", "search", "planning", "backtracking", "reasoning"]
---

# Tree of Thoughts

Tree of Thoughts generalizes chain-of-thought from a single linear path to a tree of reasoning steps. The model generates multiple candidate "thoughts" at each step, evaluates them, and uses search (BFS or DFS) to explore the most promising branches — backtracking when a branch fails.

ToT is most valuable for tasks requiring exploration and planning: math puzzle solving, creative writing with constraints, multi-step code generation. It's overkill for tasks where a single CoT pass reliably succeeds.

Implementation requires an outer loop (your code) that orchestrates: generate candidates → evaluate → select → expand. The LLM handles both generation and evaluation.

## Skeleton implementation

```python
def tot_solve(problem, depth=3, breadth=3):
    thoughts = [problem]
    for step in range(depth):
        candidates = []
        for thought in thoughts:
            new_thoughts = llm(f"Generate {breadth} next steps for: {thought}")
            candidates.extend(parse_thoughts(new_thoughts))
        # LLM evaluates each candidate
        scores = llm(f"Rate each of these thoughts (1-10):\n{candidates}")
        thoughts = top_k(candidates, scores, k=breadth)
    return llm(f"Synthesize the best solution from: {thoughts}")
```

**Source**: [Yao et al., "Tree of Thoughts" (2023)](https://arxiv.org/abs/2305.10601)
