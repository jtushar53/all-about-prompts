---
title: "Prompt Chaining"
slug: "prompt-chaining"
tier: "advanced"
tags: ["chaining", "pipeline", "sequential", "decomposition", "multi-step"]
---

# Prompt Chaining

Prompt chaining decomposes a complex task into a sequence of simpler sub-tasks, where each prompt's output feeds into the next. Instead of one giant prompt trying to do everything, you build a pipeline of focused prompts.

Benefits: easier to debug (isolate which step fails), easier to test (each step has clear I/O), more reliable (shorter prompts reduce hallucination), and modular (swap individual steps without rebuilding everything).

Chains can be linear, branching (if/else on intermediate outputs), or looping (iterate until a condition is met). Code orchestrates the flow; LLMs execute individual steps.

## Example pipeline

```python
# Step 1: Extract key claims from an article
claims = llm(f"List every factual claim in this article as bullet points:\n{article}")

# Step 2: For each claim, assess verifiability
assessments = llm(f"""
For each claim below, classify as: Verifiable / Unverifiable / Opinion.
Claims:
{claims}
Return a JSON list: [{{"claim": "...", "type": "..."}}]
""")

# Step 3: Flag potentially misleading unverified claims
flags = llm(f"From these assessments, identify which Unverifiable claims read as factual assertions:\n{assessments}")
```

**Source**: [Anthropic — Chain Prompts](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-prompts)
