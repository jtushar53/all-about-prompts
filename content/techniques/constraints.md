---
title: "Constraints & Format Hints"
slug: "constraints"
tier: "basics"
tags: ["constraints", "format", "length", "rules", "output-format"]
---

# Constraints & Format Hints

Constraints are explicit rules the model must follow when generating output. Format hints specify *how* the output should be presented. Together they transform raw AI capability into predictably useful output.

**Length constraints**: "in exactly 280 characters", "no more than 3 sentences", "at least 5 bullet points"  
**Exclusion constraints**: "do not use passive voice", "avoid buzzwords like 'synergy'", "no markdown headers"  
**Inclusion constraints**: "must include a worked example", "always cite a source"  
**Format hints**: "return as a JSON array", "use a two-column markdown table"

Constraints work best when placed at the end of the prompt (after context and input), giving the model the full picture before applying restrictions.

## Example prompt

```
Rewrite the following paragraph so that:
- It uses active voice throughout
- It is under 60 words
- It starts with a verb

Paragraph: "The decision was made by the committee to postpone the launch..."
```

**Source**: [learnprompting.org — Basics](https://learnprompting.org/docs/basics/instructions)
