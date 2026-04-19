---
title: "Meta-Prompting"
slug: "meta-prompting"
tier: "advanced"
tags: ["meta-prompting", "prompt-generation", "orchestration", "self-referential"]
---

# Meta-Prompting

Meta-prompting uses an LLM to generate, refine, or orchestrate other prompts. Instead of hand-crafting prompts for every task, you prompt a "meta-LLM" to produce the specialized prompt, then run that prompt against a task-LLM.

This enables dynamic prompt adaptation: the meta-LLM can tailor prompts to specific inputs, difficulty levels, or domains without human intervention. It's also useful for decomposing complex tasks — the meta-LLM decides which sub-tasks to run and assembles the results.

Meta-prompting is a foundational pattern behind AutoGPT-style agents and prompt optimization pipelines like DSPy and APE.

## Example

```
You are a prompt engineering expert.
Your job is to write the best possible prompt for the following task.
The prompt will be run on a general-purpose LLM.

Task: Extract all financial figures (amounts, percentages, dates) from legal contracts.
Output format for the prompt you write: structured JSON.

Write the optimal prompt now:
```

The output is a ready-to-use extraction prompt, optimized by the LLM itself.

**Source**: [Zhou et al., "Large Language Models Are Human-Level Prompt Engineers" (2022)](https://arxiv.org/abs/2211.01910)
