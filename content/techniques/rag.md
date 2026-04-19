---
title: "Retrieval-Augmented Generation (RAG)"
slug: "rag"
tier: "advanced"
tags: ["RAG", "retrieval", "grounding", "vector-search", "knowledge-base"]
---

# Retrieval-Augmented Generation (RAG)

RAG grounds LLM responses in retrieved documents, combating hallucination and knowledge cutoff limitations. At query time, relevant chunks are retrieved from a vector store and injected into the prompt as context.

**Pipeline**: Embed query → vector similarity search → retrieve top-k chunks → inject into prompt → generate grounded answer.

**Why RAG beats fine-tuning for factual tasks**: Fine-tuning bakes knowledge into weights (hard to update, expensive); RAG externalizes knowledge (update the docs, not the model). RAG is also auditable — you can show which source drove the answer.

**Common failure modes**: retrieval misses the relevant chunk (fix: better chunking or hybrid search), retrieved chunks are too long (fix: smaller chunks), model ignores context and hallucinates anyway (fix: explicit "use ONLY the context below" instruction).

## Example prompt

```
Answer the question using ONLY the context provided below.
If the answer is not in the context, respond: "I don't have enough information to answer this."
Cite the source title for each fact you use.

<context>
{{retrieved_chunks}}
</context>

Question: {{user_question}}
```

**Source**: [Lewis et al., "RAG for Knowledge-Intensive NLP Tasks" (2020)](https://arxiv.org/abs/2005.11401)
