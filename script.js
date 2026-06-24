// ==========================================
// KNOWLEDGE GRAPH ANIMATION (CANVAS)
// ==========================================
const canvas = document.getElementById('networkGraph');
const ctx = canvas.getContext('2d');

let width, height;
let nodes = [];
let isHeistActive = false;

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resize);
resize();

class Node {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
    }

    update() {
        if (isHeistActive) {
            const dx = (width/2) - this.x;
            const dy = (height/2) - this.y;
            this.vx += dx * 0.00005;
            this.vy += dy * 0.00005;
            
            const speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
            if (speed > 3) {
                this.vx = (this.vx / speed) * 3;
                this.vy = (this.vy / speed) * 3;
            }
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = isHeistActive ? '#E50914' : 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
    }
}

for (let i = 0; i < 150; i++) {
    nodes.push(new Node());
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
        nodes[i].update();
        nodes[i].draw();

        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const connectDist = isHeistActive ? 150 : 100;

            if (dist < connectDist) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                
                if (isHeistActive) {
                    ctx.strokeStyle = `rgba(229, 9, 20, ${1 - dist / connectDist})`;
                    ctx.lineWidth = 1.5;
                } else {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist / connectDist) * 0.2})`;
                    ctx.lineWidth = 0.5;
                }
                
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}

animate();

// ==========================================
// TERMINAL SIMULATION LOGIC
// ==========================================

const terminal = document.getElementById('terminal');
const btnExecute = document.getElementById('btn-execute');
const graphStatus = document.getElementById('graph-status');
const moleculeDisplay = document.getElementById('molecule-display');
const smilesOutput = document.getElementById('smiles-output');

async function typeWriter(agent, cssClass, text) {
    const line = document.createElement('div');
    line.className = 'log-line';
    
    const agentSpan = document.createElement('span');
    agentSpan.className = cssClass;
    agentSpan.innerText = `[${agent}] `;
    
    const textSpan = document.createElement('span');
    
    line.appendChild(agentSpan);
    line.appendChild(textSpan);
    terminal.appendChild(line);

    terminal.scrollTop = terminal.scrollHeight;

    for (let i = 0; i < text.length; i++) {
        textSpan.innerHTML += text.charAt(i);
        // Scroll to bottom as it types
        terminal.scrollTop = terminal.scrollHeight;
        await new Promise(r => setTimeout(r, 15)); 
    }
}

// Generates a random SMILES-like string
function generateRandomSMILES() {
    const chars = 'CC()O=NCF';
    let result = 'O=C(c1ccc(C';
    for ( let i = 0; i < 20; i++ ) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result + ')cc1F)N1CCN';
}

btnExecute.addEventListener('click', async () => {
    if (isHeistActive) return;
    
    // Grab Dynamic Inputs
    const patientId = document.getElementById('patient-id').value || "UNKNOWN_SUBJECT";
    const rawMutationData = document.getElementById('mutation-data').value;
    
    // Extract a realistic snippet from the user's textarea
    const lines = rawMutationData.split('\n');
    let targetGene = "UNKNOWN_GENE";
    if (lines.length > 1) {
        // e.g. "BRCA1 c.5266dupC" -> "BRCA1"
        targetGene = lines[1].split(' ')[0] || "TARGET";
    }

    const predictedScore = (Math.random() * 2 + 7.5).toFixed(2); // Random score between 7.5 and 9.5
    const dynamicSMILES = generateRandomSMILES();

    // Construct the dynamic script
    const dynamicHeistScript = [
        { agent: "EL PROFESOR", class: "prof", text: "The plan is simple. We get in, we map the genome, we synthesize the cure, and we get out. Rio, status?", delay: 1000 },
        { agent: "RIO", class: "rio", text: `Bypassing the firewall... Ingesting sequence for subject: ${patientId}. GraphRAG is compiling the subgraphs.`, delay: 1500 },
        { agent: "RIO", class: "rio", text: `I'm in. Scanning string: [${rawMutationData.substring(0, 30).replace(/\n/g, ' ')}...]`, delay: 1000 },
        { agent: "RIO", class: "rio", text: `Anomaly detected. Cascade failure imminent. Passing the isolated target to Tokyo.`, delay: 1000 },
        { agent: "TOKYO", class: "tokyo", text: `I see it. The vault door is heavy. The mutation in ${targetGene} causes a structural vulnerability. We hit it there.`, delay: 1500 },
        { agent: "EL PROFESOR", class: "prof", text: `Good. Berlin, we need the architectural blueprint of ${targetGene}.`, delay: 1000 },
        { agent: "BERLIN", class: "berlin", text: `Extracting 3D structural embeddings from AlphaFold database... Done.`, delay: 1500 },
        { agent: "BERLIN", class: "berlin", text: `I've located a hidden allosteric pocket. It's a tight squeeze, but we can exploit it.`, delay: 1000 },
        { agent: "EL PROFESOR", class: "prof", text: "Nairobi. Print the money.", delay: 800 },
        { agent: "NAIROBI", class: "nairobi", text: "Firing up the Generative Diffusion models. Generating de novo molecular scaffolds...", delay: 1500 },
        { agent: "NAIROBI", class: "nairobi", text: "Iteration 1: Failed, high hepatotoxicity. Recalculating tensor weights...", delay: 1000 },
        { agent: "NAIROBI", class: "nairobi", text: `Iteration 89: Synthesizing stable compound. Predicted binding affinity pIC50: ${predictedScore}.`, delay: 1500 },
        { agent: "EL PROFESOR", class: "prof", text: "Verify and execute. The heist is complete.", delay: 1000 }
    ];

    // UI Updates
    isHeistActive = true;
    btnExecute.innerHTML = "HEIST IN PROGRESS...";
    btnExecute.style.background = "#440000";
    btnExecute.style.cursor = "not-allowed";
    
    graphStatus.innerText = "BREACHING THE GENOME";
    graphStatus.style.color = "#E50914";

    // Clear terminal
    terminal.innerHTML = '';

    // Run Dynamic Script
    for (const line of dynamicHeistScript) {
        await typeWriter(line.agent, line.class, line.text);
        await new Promise(r => setTimeout(r, line.delay));
    }

    // Update SMILES to the dynamically generated one
    smilesOutput.innerText = `SMILES: ${dynamicSMILES}`;

    // Final Reveal
    graphStatus.classList.add('hidden');
    moleculeDisplay.classList.remove('hidden');
    btnExecute.innerHTML = "MISSION ACCOMPLISHED";
    btnExecute.style.background = "#05C165"; // Success Green
});
