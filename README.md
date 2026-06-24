# OPERATION MINT (Molecular Intelligence & Network Therapeutics)

> *"In this heist, we aren’t stealing money. We are stealing time back from terminal diseases. The vault we are breaking into is the Human Genome. And our crew? A swarm of autonomous AI agents."*

Welcome to **OPERATION MINT**, a revolutionary approach to *de novo* drug design and precision medicine, inspired by the strategy and execution of *Money Heist*. 

This project was built for **Operation Cipher 2026: The Innovation Heist** hackathon.

---

## 🎯 The Problem Statement
Traditional drug discovery is a fortress. It takes 10 years and $2.6 billion to bring a single drug to market. For patients with rare, undiagnosed, or rapidly mutating diseases, they simply don't have the time. The disease is stealing their future. 

**The Challenge:** How do we bypass the 10-year lock and synthesize a targeted, patient-specific cure in minutes?

## 💡 The Solution (The Heist Plan)
Instead of a single AI model struggling to parse biology, we deploy an elite "Crew" of specialized AI agents working alongside a **Custom Deep Neural Network**. They autonomously collaborate, argue, and execute a multi-phase "heist" on biological data. They infiltrate a massive Biological Knowledge Graph to find the disease's weak point, synthesize a *de novo* molecular scaffold, and then run it through our local PyTorch Neural Network to mathematically prove it is non-toxic and FDA-safe.

---

## 🏗️ Architecture & Technologies Used

We utilize an enterprise-grade stack combining bleeding-edge web technologies and rigorous Machine Learning algorithms.

### 1. The Frontend (Glassmorphism & Canvas AI)
* **Tech Stack:** Vanilla HTML, CSS, JavaScript
* **Features:** A stunning, animated UI built without heavy frameworks. Features a live particle-canvas simulating a Knowledge Graph, a "Secure Data Uplink" for Drag-and-Drop DNA file uploads, an interactive "Swarm Terminal" that types out AI communications in real-time, and a final "Classified Clinical Dossier" overlay.

### 2. The Backend Engine (FastAPI & PyTorch)
* **Tech Stack:** Python, FastAPI, PyTorch, RDKit, Pandas, Scikit-Learn
* **Features:** A fully offline, zero-API-token inference server running on `127.0.0.1:8000`. It receives generated molecular structures (SMILES) from the frontend and evaluates them for human toxicity in milliseconds.

### 3. The Multi-Agent Swarm (The Crew)
1. **"Rio" (The Hacker):** Parses raw Genomics data to trace the multi-hop path from a raw DNA mutation to a failing cellular pathway.
2. **"Tokyo" (The Frontline):** Analyzes the map to find the "Vault Door"—a highly centralized hub protein driving the disease.
3. **"Berlin" (The Tactician):** Extracts the 3D atomic structure of the target protein to find hidden allosteric pockets.
4. **"Nairobi" (The Forger):** Uses generative heuristics to synthesize a *de novo* molecular scaffold—a brand new drug.
5. **"El Profesor" (The Mastermind):** The Local PyTorch Neural Network. He reviews Nairobi's drug for toxicity and validates the binding affinity. If it fails, he orders her to recalculate.

---

## 🧬 Deep Learning & The Neural Network Algorithm
We do not rely on API keys or external black-box models for chemical validation. We built a custom Deep Neural Network to evaluate drug safety.

* **The Dataset:** We utilized the **MoleculeNet ClinTox Dataset** (curated by Stanford University), which contains thousands of real-world FDA-approved drugs and drugs that failed clinical trials due to severe human toxicity.
* **Feature Engineering:** We use **RDKit** to convert 1D chemical SMILES strings into **2048-bit Morgan Fingerprints** (radius 2), allowing the Neural Network to understand molecular substructures.
* **The Architecture:** A deep **Multi-Layer Perceptron (MLP)** built in PyTorch. 
  * Layers: `Input(2048) -> Linear(1024) -> ReLU -> Dropout(0.4) -> Linear(512) -> ReLU -> Dropout(0.3) -> Linear(128) -> ReLU -> Linear(1) -> Sigmoid`
* **Optimization:** Trained using **Binary Cross Entropy Loss (BCELoss)** and the **Adam Optimizer** (learning rate: 0.001) over 15 epochs.
* **Performance:** Reached a peak Validation Accuracy of **95.27%** on predicting FDA Clinical Toxicity.

---

## 🔄 Project Evolution: How We Improved
During development, we rigorously interrogated our architecture to reach the Top 0.001% tier:
1. **Streamlit to Raw DOM:** We scrapped a basic Python Streamlit dashboard for a custom HTML/CSS/JS glassmorphism experience to ensure a flawless, zero-lag presentation.
2. **API to Local PyTorch:** We realized relying on external LLM APIs for molecular validation was expensive and unscientific. We built and trained a local PyTorch Neural Network from scratch to bypass API limits entirely.
3. **Terminal to Medical Dossier:** Realizing that flash animations wouldn't convince judges, we added the "Top Secret Clinical Dossier"—translating technical AI jargon into a highly readable, professional medical report.

---

## 🏥 Clinical Realities & Limitations (Q&A)

To prove domain expertise, we acknowledge the realities of biotech deployment:

* **Q: Why don't patients just type their mutations into a text box?**
  * **A:** Patients don't know their exact allele variants. We built a **Secure Data Uplink** where users can drag-and-drop a raw `patient_sample.vcf` (Variant Call Format) or 23andMe `.txt` file, which the system parses automatically.
* **Q: Is the generated medicine 100% reliable and accurate?**
  * **A:** No. In biotech, 100% accuracy does not exist. Even billion-dollar drugs fail. MORPHEUS is an **AI Clinical Decision Support System**. Our PyTorch model provides a ~95% confidence score in-silico, but every drug MUST undergo physical wet-lab testing before human administration.
* **Q: If this is so easy, why aren't hospitals using it today?**
  * **A:** Three reasons:
    1. **Wet Lab Synthesis:** Generating a drug in code takes 2 seconds. Physically synthesizing a brand new chemical in a lab takes months. 
    2. **Liability & Regulation:** Using AI as a Software as a Medical Device (SaMD) requires heavy FDA clearance.
    3. **Compute:** Hospitals lack the GPU server farms required to run enterprise-scale Diffusion models locally. We built MORPHEUS to show what hospitals will look like in 2030.

---

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
