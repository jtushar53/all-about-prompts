---
title: "DSPy: Programming LM Pipelines"
slug: "dspy"
tier: "frontier"
tags: ["DSPy", "optimization", "programming", "signatures", "teleprompters"]
---

# DSPy

DSPy (Declarative Self-improving Python) replaces hand-crafted prompts with a programming model. You define *signatures* (input/output specs) and *modules* (composable LM operations), then a *teleprompter* (optimizer) automatically generates the best prompts and few-shot examples via a compile step.

The key insight: prompts are a form of program state that should be optimized, not hand-tuned. DSPy separates the *what* (your pipeline logic) from the *how* (the specific prompts and demonstrations that make it work).

DSPy supports multiple optimizers: `BootstrapFewShot` (auto-generates examples), `MIPRO` (instruction optimization), and `BootstrapFinetune` (generates training data for fine-tuning).

## Example

```python
import dspy

class RAGSignature(dspy.Signature):
    """Answer questions using retrieved context."""
    context = dspy.InputField(desc="Retrieved passages")
    question = dspy.InputField()
    answer = dspy.OutputField(desc="Concise factual answer")

class RAGModule(dspy.Module):
    def __init__(self):
        self.retrieve = dspy.Retrieve(k=3)
        self.generate = dspy.ChainOfThought(RAGSignature)

    def forward(self, question):
        context = self.retrieve(question).passages
        return self.generate(context=context, question=question)

# Compile — optimizer writes the prompts for you
teleprompter = dspy.BootstrapFewShot(metric=my_metric)
optimized_rag = teleprompter.compile(RAGModule(), trainset=train_data)
```

**Source**: [Khattab et al., "DSPy" (2023)](https://arxiv.org/abs/2310.03714)
