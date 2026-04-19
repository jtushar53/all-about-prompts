---
title: "Reflexion"
slug: "reflexion"
tier: "advanced"
tags: ["reflexion", "self-reflection", "verbal-reinforcement", "iterative", "agent"]
---

# Reflexion

Reflexion is a technique where the agent reflects on its past failures in natural language and stores these reflections in memory, using them to improve future attempts. It's like verbal reinforcement learning — no gradient updates needed.

After a failed attempt, the agent generates a reflection: "I failed because I assumed X without verifying. Next time, I should first check Y before proceeding." This reflection is prepended to the next attempt, guiding the agent away from the same mistake.

Reflexion significantly improves performance on coding tasks (HumanEval), sequential decision making, and reasoning benchmarks over baseline ReAct agents.

## Example loop

```python
reflections = []
for attempt in range(max_attempts):
    context = "\n".join(reflections)
    prompt = f"""
Previous reflections:
{context}

Task: {task}
Solve this step by step.
"""
    result = llm(prompt)
    success, feedback = evaluate(result)
    if success:
        return result
    reflection = llm(f"You failed with this result: {result}\nFeedback: {feedback}\nWrite a short reflection on what went wrong and how to fix it next time.")
    reflections.append(reflection)
```

**Source**: [Shinn et al., "Reflexion" (2023)](https://arxiv.org/abs/2303.11366)
