# OPERATION MINT (Molecular Intelligence & Network Therapeutics)

> *"In this heist, we aren’t stealing money. We are stealing time back from terminal diseases. The vault we are breaking into is the Human Genome. And our crew? A swarm of autonomous AI agents."*

Welcome to **OPERATION MINT**, a revolutionary approach to *de novo* drug design and precision medicine, inspired by the strategy and execution of *Money Heist*. 

This project was built for **Operation Cipher 2026: The Innovation Heist** hackathon.

## 🎯 The Problem Statement
Traditional drug discovery is a fortress. It takes 10 years and $2.6 billion to crack the code and bring a single drug to market. For patients with rare, undiagnosed, or rapidly mutating diseases, they simply don't have the time. The disease is stealing their future. 

**The Challenge:** How do we bypass the 10-year lock and synthesize a targeted, patient-specific cure in minutes?

## 💡 The Solution (The Heist Plan)
Instead of a single AI model struggling to parse biology, we deploy an elite "Crew" of specialized AI agents. Powered by **CrewAI** (and simulated in this prototype), these agents autonomously collaborate, argue, and execute a multi-phase "heist" on biological data. They infiltrate a massive Biological Knowledge Graph to find the disease's weak point, and then synthesize a *de novo* (brand new) drug on the fly to neutralize it.

## 🏗️ Architecture & The Crew
We utilize an enterprise-grade stack: **Microsoft GraphRAG + Neo4j + CrewAI**.

### The Crew:
1. **"Rio" (The Hacker - Data Ingestion):** Parses raw Genomics data to trace the multi-hop path from a raw DNA mutation to a failing cellular pathway.
2. **"Tokyo" (The Frontline - Target ID):** Analyzes the map to find the "Vault Door"—a highly centralized hub protein driving the disease.
3. **"Berlin" (The Tactician - Structural Biology):** Extracts the 3D atomic structure of the target protein to find hidden allosteric pockets.
4. **"Nairobi" (The Forger - Generative Chemistry):** Uses diffusion models to synthesize a *de novo* molecular scaffold—a brand new drug.
5. **"El Profesor" (The Mastermind - Orchestrator):** The Metacognitive Agent that oversees the entire operation and reviews Nairobi's drug for toxicity.

---

## ⚠️ Hackathon Prototype Disclaimer
*Why is this prototype mocked?*
For this specific hackathon 2-minute demo, we have chosen to **mock the Neo4j database queries, the CrewAI LLM outputs, and the Diffusion model generations** in our Streamlit dashboard. 

**The Reason:** 
1. **Reliability:** Live hackathon demos are notorious for failing due to rate-limiting on free LLM API keys (OpenAI/Anthropic) or internet connectivity issues on stage.
2. **Time Constraints:** A true GraphRAG + Neo4j pipeline requires hours to ingest the massive biomedical datasets (GWAS, STRING, ChEMBL) needed for accurate multi-hop traversal. Generating a 3D molecule via RFdiffusion takes significant GPU compute time. 
3. **Focus:** By simulating the backend, we can perfectly demonstrate the *architectural flow* and the *Money Heist UI experience* without risking a crash during the crucial 2-minute pitch. The architecture laid out in this README represents the true production pipeline.

## 🚀 How to Run the Prototype

1. Install requirements:
```bash
pip install -r requirements.txt
```

2. Run the Streamlit Dashboard:
```bash
streamlit run app.py
```

## 🌍 Expected Impact
* **Time:** Reducing target identification and initial drug design from 4 years to 4 minutes.
* **Cost:** Bypassing millions of dollars in dead-end wet-lab assays.
* **Personalization:** True precision medicine where a unique drug is printed for a single patient's unique mutation.
