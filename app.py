import streamlit as st
import time

# --- Money Heist Theme CSS ---
st.set_page_config(page_title="OPERATION MINT", page_icon="🏦", layout="wide")

st.markdown("""
    <style>
    .stApp {
        background-color: #0d0d0d;
        color: #ffffff;
    }
    h1, h2, h3 {
        color: #d10000 !important;
        font-family: 'Courier New', Courier, monospace;
    }
    .stButton>button {
        background-color: #d10000;
        color: white;
        font-size: 20px;
        font-weight: bold;
        border: 2px solid white;
        border-radius: 5px;
        width: 100%;
        padding: 10px;
    }
    .stButton>button:hover {
        background-color: #ff0000;
        border: 2px solid #d10000;
    }
    .terminal-box {
        background-color: #000000;
        color: #00ff00;
        font-family: 'Courier New', Courier, monospace;
        padding: 20px;
        border: 1px solid #d10000;
        border-radius: 5px;
        height: 400px;
        overflow-y: auto;
        white-space: pre-wrap;
    }
    .agent-rio { color: #00ccff; }
    .agent-tokyo { color: #ff3333; }
    .agent-berlin { color: #ffcc00; }
    .agent-nairobi { color: #cc33ff; }
    .agent-prof { color: #ffffff; font-weight: bold; }
    </style>
""", unsafe_allow_html=True)

st.title("🏦 OPERATION MINT: THE BIO-HEIST")
st.subheader("Molecular Intelligence & Network Therapeutics")

st.markdown("---")

col1, col2 = st.columns([1, 2])

with col1:
    st.markdown("### The Target (Patient Profile)")
    patient_id = st.text_input("Patient ID:", value="PZ-2026-X")
    mutation_data = st.text_area("Genomic Sequence / Mutation Data:", value=">chr17:41196150-41277500\\nBRCA1 c.5266dupC (p.Gln1756Profs*74)\\nStatus: Pathogenic\\nTarget: Undruggable Vault")
    
    start_heist = st.button("EXECUTE HEIST")

with col2:
    st.markdown("### Swarm Terminal (Live Comms)")
    terminal_placeholder = st.empty()
    
    if not start_heist:
        terminal_placeholder.markdown('<div class="terminal-box">Waiting for Professor\'s orders...</div>', unsafe_allow_html=True)

if start_heist:
    log_content = ""
    def update_terminal(agent, text, css_class):
        global log_content
        log_content += f'<span class="{css_class}">[{agent}]: {text}</span><br>'
        terminal_placeholder.markdown(f'<div class="terminal-box">{log_content}</div>', unsafe_allow_html=True)
        time.sleep(1.5)

    update_terminal("EL PROFESOR", "The plan is simple. We get in, we map the genome, we synthesize the cure, and we get out. Rio, what's the status on the security?", "agent-prof")
    update_terminal("RIO", f"Bypassing the firewall now... Ingesting sequence for patient {patient_id}. GraphRAG is mapping 2.4 million Neo4j nodes.", "agent-rio")
    time.sleep(1)
    update_terminal("RIO", "I'm in. Tracing the mutation: BRCA1 c.5266dupC. It's causing a cascade failure in the DNA repair pathway. Over to you, Tokyo.", "agent-rio")
    
    update_terminal("TOKYO", "I see it. The vault door is heavy. The mutation upregulates PARP1 to compensate. If we inhibit PARP1, we induce synthetic lethality. PARP1 is the target.", "agent-tokyo")
    
    update_terminal("EL PROFESOR", "Good. Berlin, we need the architectural blueprint of PARP1.", "agent-prof")
    update_terminal("BERLIN", "Extracting 3D structural embeddings from AlphaFold database... Done. I've located a hidden allosteric pocket near the NAD+ binding site. It's a tight squeeze, but we can exploit it.", "agent-berlin")
    
    update_terminal("EL PROFESOR", "Nairobi. Print the money.", "agent-prof")
    update_terminal("NAIROBI", "Firing up the Diffusion models. Generating de novo molecular scaffolds... Iteration 1: Failed, toxicity too high.", "agent-nairobi")
    update_terminal("NAIROBI", "Iteration 42... Iteration 89... Got it. Synthesizing stable compound.", "agent-nairobi")
    update_terminal("NAIROBI", "The payload is ready. Predicted pIC50: 8.4. SAscore: 2.1.", "agent-nairobi")
    
    update_terminal("EL PROFESOR", "Verify and execute. The heist is complete.", "agent-prof")

    st.success("Heist Successful. The Cure has been synthesized.")
    st.markdown("### The Payload (De Novo Molecule)")
    st.code("SMILES: O=C(c1ccc(Cc2n[nH]c(=O)c3ccccc23)cc1F)N1CCN(C(=O)C2CC2)CC1", language="text")
    st.info("Molecule verified by El Profesor. Ready for clinical synthesis.")
