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
            // Speed up during heist, move towards center
            const dx = (width/2) - this.x;
            const dy = (height/2) - this.y;
            this.vx += dx * 0.00005;
            this.vy += dy * 0.00005;
            
            // Speed limit
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

const heistScript = [
    { agent: "EL PROFESOR", class: "prof", text: "The plan is simple. We get in, we map the genome, we synthesize the cure, and we get out. Rio, status?", delay: 1000 },
    { agent: "RIO", class: "rio", text: "Bypassing the firewall... Ingesting sequence for PZ-2026-X. GraphRAG is mapping 2.4 million Neo4j nodes.", delay: 2000 },
    { agent: "RIO", class: "rio", text: "I'm in. Tracing the mutation: BRCA1 c.5266dupC. It's causing a cascade failure. Over to you, Tokyo.", delay: 2500 },
    { agent: "TOKYO", class: "tokyo", text: "I see it. The vault door is heavy. The mutation upregulates PARP1 to compensate. PARP1 is the target.", delay: 2000 },
    { agent: "EL PROFESOR", class: "prof", text: "Good. Berlin, we need the architectural blueprint of PARP1.", delay: 1500 },
    { agent: "BERLIN", class: "berlin", text: "Extracting 3D structural embeddings... I've located a hidden allosteric pocket near the NAD+ binding site.", delay: 3000 },
    { agent: "EL PROFESOR", class: "prof", text: "Nairobi. Print the money.", delay: 1000 },
    { agent: "NAIROBI", class: "nairobi", text: "Firing up the Diffusion models. Generating de novo molecular scaffolds...", delay: 2000 },
    { agent: "NAIROBI", class: "nairobi", text: "Iteration 1: Failed, toxicity too high. Recalculating...", delay: 1500 },
    { agent: "NAIROBI", class: "nairobi", text: "Iteration 89: Synthesizing stable compound. Predicted pIC50: 8.4. SAscore: 2.1.", delay: 2500 },
    { agent: "EL PROFESOR", class: "prof", text: "Verify and execute. The heist is complete.", delay: 1500 }
];

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

    // Typewriter effect
    for (let i = 0; i < text.length; i++) {
        textSpan.innerHTML += text.charAt(i);
        await new Promise(r => setTimeout(r, 20)); // typing speed
    }
}

btnExecute.addEventListener('click', async () => {
    if (isHeistActive) return;
    
    // UI Updates
    isHeistActive = true;
    btnExecute.innerHTML = "HEIST IN PROGRESS...";
    btnExecute.style.background = "#440000";
    btnExecute.style.cursor = "not-allowed";
    
    graphStatus.innerText = "BREACHING THE GENOME";
    graphStatus.style.color = "#E50914";

    // Clear terminal
    terminal.innerHTML = '';

    // Run Script
    for (const line of heistScript) {
        await typeWriter(line.agent, line.class, line.text);
        await new Promise(r => setTimeout(r, line.delay));
    }

    // Final Reveal
    graphStatus.classList.add('hidden');
    moleculeDisplay.classList.remove('hidden');
    btnExecute.innerHTML = "MISSION ACCOMPLISHED";
});
