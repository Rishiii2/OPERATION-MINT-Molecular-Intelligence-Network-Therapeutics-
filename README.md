# OPERATION MINT (Molecular Intelligence & Network Therapeutics)

> *"In this heist, we aren’t stealing money. We are stealing time back from terminal diseases. The vault we are breaking into is the Human Genome. And our crew? A swarm of autonomous AI agents."*

Welcome to **OPERATION MINT**, a revolutionary approach to *de novo* drug design and precision medicine, inspired by the strategy and execution of *Money Heist*. 

This project was built for **Operation Cipher 2026: The Innovation Heist** hackathon.

## 🎯 The Problem Statement
Traditional drug discovery is a fortress. It takes 10 years and $2.6 billion to crack the code and bring a single drug to market. For patients with rare, undiagnosed, or rapidly mutating diseases, they simply don't have the time. The disease is stealing their future. 

**The Challenge:** How do we bypass the 10-year lock and synthesize a targeted, patient-specific cure in minutes?

## 💡 The Solution (The Heist Plan)
Instead of a single AI model struggling to parse biology, we deploy an elite "Crew" of specialized AI agents working alongside a **Custom Deep Neural Network**. They autonomously collaborate, argue, and execute a multi-phase "heist" on biological data. They infiltrate a massive Biological Knowledge Graph to find the disease's weak point, synthesize a *de novo* molecular scaffold, and then run it through our local PyTorch Neural Network to mathematically prove it is non-toxic and FDA-safe.

## 🏗️ Architecture & The Crew
We utilize an enterprise-grade stack: **Microsoft GraphRAG + Neo4j + PyTorch Deep Learning**.

### The Crew:
1. **"Rio" (The Hacker - Data Ingestion):** Parses raw Genomics data to trace the multi-hop path from a raw DNA mutation to a failing cellular pathway.
2. **"Tokyo" (The Frontline - Target ID):** Analyzes the map to find the "Vault Door"—a highly centralized hub protein driving the disease.
3. **"Berlin" (The Tactician - Structural Biology):** Extracts the 3D atomic structure of the target protein to find hidden allosteric pockets.
4. **"Nairobi" (The Forger - Generative Chemistry):** Uses diffusion models to synthesize a *de novo* molecular scaffold—a brand new drug.
5. **"El Profesor" (The Mastermind - Orchestrator):** The Local PyTorch Neural Network. He reviews Nairobi's drug for toxicity and validates the binding affinity. If it fails, he orders her to recalculate.

---

## 🧬 The Local PyTorch Engine
We do not rely on API keys or external black-box models for chemical validation. We have built a custom Deep Neural Network (Multi-Layer Perceptron) using **PyTorch** and **RDKit**. 

1. **The Dataset:** We download the real **MoleculeNet ClinTox dataset** containing FDA-approved drugs and clinical-trial failures.
2. **Feature Extraction:** RDKit converts 1D SMILES strings into 2048-bit Morgan Fingerprints.
3. **The Brain:** The Deep Neural Network trains on this data to learn the mathematical patterns of chemical toxicity.
4. **The API:** A local FastAPI server loads the trained weights and exposes an endpoint for the UI to query in real-time.

## 🚀 How to Run the Project Locally

### 1. Install Requirements
```bash
cd backend
pip install -r requirements.txt
```

### 2. Train the Neural Network (Pre-Training Phase)
Run the training script to download the real dataset, build the neural network, and save the trained weights.
```bash
python train.py
```

### 3. Start the AI Backend Server
Start the FastAPI server that loads your trained model.
```bash
uvicorn api:app --reload
```

### 4. Launch the Dashboard
Open a new terminal window, go back to the root folder, and open `index.html` in your web browser!
```bash
start index.html
```

## 🌍 Expected Impact
* **Time:** Reducing target identification and initial drug design from 4 years to 4 minutes.
* **Cost:** Bypassing millions of dollars in dead-end wet-lab assays using local Machine Learning.
* **Personalization:** True precision medicine where a unique drug is printed for a single patient's unique mutation.
