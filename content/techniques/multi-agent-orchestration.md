---
title: "Multi-Agent Orchestration"
slug: "multi-agent-orchestration"
tier: "frontier"
tags: ["multi-agent", "orchestration", "swarm", "parallelism", "coordination"]
---

# Multi-Agent Orchestration

Multi-agent systems run multiple specialized LLM agents in parallel or in coordinated pipelines, each with a focused role. An orchestrator agent decomposes tasks, delegates to specialist agents, and synthesizes results.

Patterns:

**Parallel fan-out**: The orchestrator sends the same task to N agents with different personas or tools, then merges results. Great for research, brainstorming, and cross-validation.

**Sequential pipeline**: Output of Agent A → input of Agent B → ... Used for multi-stage transformation tasks.

**Debate/consensus**: Multiple agents argue different positions; a judge agent synthesizes or picks the best argument.

**Swarm**: No central orchestrator; agents communicate peer-to-peer based on context, handing off when they reach the limit of their expertise.

## Example orchestration prompt

```
You are an orchestrator. You have three specialist agents available:
- Researcher: can search the web
- Analyst: can run Python code and analyze data
- Writer: produces polished prose

Given the task below, decompose it into subtasks and assign each to the correct agent.
Return your plan as JSON: [{"agent": "...", "task": "...", "depends_on": []}]

Task: Write a data-backed blog post on EV adoption trends in Europe in 2024.
```

**Source**: [Wu et al., "AutoGen" (2023)](https://arxiv.org/abs/2308.08155)
