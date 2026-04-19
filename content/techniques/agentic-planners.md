---
title: "Agentic Planners"
slug: "agentic-planners"
tier: "frontier"
tags: ["planning", "agents", "task-decomposition", "PDDL", "LLM-planner"]
---

# Agentic Planners

Agentic planners use LLMs to generate structured plans — sequences or graphs of actions — before executing any of them. Separating planning from execution catches logical errors early, enables human review, and allows replanning when actions fail.

**Plan-then-execute**: The model first produces a complete plan (steps, dependencies, tools needed), which is validated before any action is taken. Reduces mid-execution failures by 30-50% on complex tasks compared to ReAct-style on-the-fly reasoning.

**Hierarchical planning**: High-level plan → sub-plans for each step → execution. Mirrors how humans tackle complex projects.

**LLM+PDDL**: For formal domains (robotics, scheduling), the LLM translates natural language goals into PDDL (Planning Domain Definition Language), then a classical planner finds the optimal action sequence.

## Example planning prompt

```
You are a planning agent. Given a task, produce a complete plan BEFORE taking any actions.

Task: Set up a new Python project with FastAPI, a PostgreSQL database, and Docker.

Produce a plan in this format:
Step 1: [action] — [why]
Step 2: [action] — [why]
...

After planning, wait for approval before executing.
```

**Source**: [Huang et al., "Language Models as Zero-Shot Planners" (2022)](https://arxiv.org/abs/2201.07207)
