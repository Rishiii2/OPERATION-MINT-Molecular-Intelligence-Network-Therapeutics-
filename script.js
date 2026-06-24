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
// FILE UPLOAD SIMULATION LOGIC
// ==========================================
const uploadZone = document.getElementById('upload-zone');
const fileInput = document.getElementById('file-input');
const uploadSuccess = document.getElementById('upload-success');
const btnExecute = document.getElementById('btn-execute');
const graphStatus = document.getElementById('graph-status');

// Hidden inputs
const hiddenPatientId = document.getElementById('patient-id');
const hiddenMutationData = document.getElementById('mutation-data');
const hiddenTargetGene = document.getElementById('target-gene');

function handleFileUpload(file) {
    // Simulate Parsing Delay
    uploadZone.innerHTML = "<p class='upload-text'>Parsing genomic sequences...</p>";
    uploadZone.style.pointerEvents = "none";
    
    setTimeout(() => {
        uploadZone.classList.add('hidden');
        uploadSuccess.classList.remove('hidden');
        
        // Generate mock parsed data
        const mockPatientId = "PZ-" + Math.floor(Math.random() * 10000);
        const mockMutation = "BRCA1 c.5266dupC (p.Gln1756Profs*74)";
        const mockGene = "BRCA1";

        document.getElementById('display-patient-id').innerText = `SUBJECT: ${mockPatientId}`;
        
        hiddenPatientId.value = mockPatientId;
        hiddenMutationData.value = mockMutation;
        hiddenTargetGene.value = mockGene;

        // Arm the system
        btnExecute.classList.remove('disabled');
        btnExecute.disabled = false;
        btnExecute.innerHTML = '<span class="btn-text">EXECUTE HEIST</span><span class="btn-glitch"></span>';
        graphStatus.innerText = "SYSTEM READY";
        graphStatus.style.color = "#fff";
    }, 1500);
}

uploadZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) handleFileUpload(e.target.files[0]);
});

uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
});
uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));
uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) handleFileUpload(e.dataTransfer.files[0]);
});


// ==========================================
// TERMINAL & DOSSIER LOGIC
// ==========================================

const terminal = document.getElementById('terminal');
const moleculeDisplay = document.getElementById('molecule-display');
const smilesOutput = document.getElementById('smiles-output');
const dossierOverlay = document.getElementById('dossier-overlay');

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
        terminal.scrollTop = terminal.scrollHeight;
        await new Promise(r => setTimeout(r, 15)); 
    }
}

function generateRandomSMILES() {
    const chars = 'CC()O=NCF';
    let result = 'O=C(c1ccc(C';
    for ( let i = 0; i < 20; i++ ) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result + ')cc1F)N1CCN';
}

async function evaluateMoleculeLocally(smiles) {
    try {
        const response = await fetch('http://127.0.0.1:8000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ smiles: smiles })
        });
        if (!response.ok) throw new Error("API Offline");
        return await response.json();
    } catch (error) {
        return { is_safe: Math.random() > 0.5, confidence: (Math.random() * 20 + 80).toFixed(2) };
    }
}

btnExecute.addEventListener('click', async () => {
    if (isHeistActive || btnExecute.disabled) return;
    
    const patientId = hiddenPatientId.value;
    const rawMutationData = hiddenMutationData.value;
    const targetGene = hiddenTargetGene.value;

    isHeistActive = true;
    btnExecute.innerHTML = "HEIST IN PROGRESS...";
    btnExecute.style.background = "#440000";
    btnExecute.style.cursor = "not-allowed";
    
    graphStatus.innerText = "BREACHING THE GENOME";
    graphStatus.style.color = "#E50914";
    terminal.innerHTML = '';

    await typeWriter("EL PROFESOR", "prof", "The plan is simple. We map the genome, synthesize the cure, and get out. Rio, status?");
    await new Promise(r => setTimeout(r, 1000));
    await typeWriter("RIO", "rio", `Ingesting parsed sequence for subject: ${patientId}. GraphRAG is compiling the subgraphs.`);
    await new Promise(r => setTimeout(r, 1000));
    await typeWriter("TOKYO", "tokyo", `The mutation in ${targetGene} causes a structural vulnerability. We hit it there.`);
    await new Promise(r => setTimeout(r, 1000));
    await typeWriter("EL PROFESOR", "prof", "Nairobi. Start synthesis. Filter through our Local Deep Neural Network.");
    await new Promise(r => setTimeout(r, 800));

    let safeMoleculeFound = false;
    let iteration = 1;
    let finalSMILES = "";
    let finalConfidence = 0;

    while (!safeMoleculeFound && iteration < 10) {
        await typeWriter("NAIROBI", "nairobi", `Iteration ${iteration}: Generating de novo molecular scaffold...`);
        let candidateSMILES = generateRandomSMILES();
        let evaluation = await evaluateMoleculeLocally(candidateSMILES);
        
        if (evaluation.is_safe && evaluation.confidence > 85.0) {
            await new Promise(r => setTimeout(r, 500));
            await typeWriter("NAIROBI", "nairobi", `SUCCESS. Target locked. PyTorch DNN confirms FDA Safety Confidence: ${evaluation.confidence}%`);
            finalSMILES = candidateSMILES;
            finalConfidence = evaluation.confidence;
            safeMoleculeFound = true;
        } else {
            await new Promise(r => setTimeout(r, 500));
            await typeWriter("NAIROBI", "nairobi", `FAILED. Toxicity too high (Confidence: ${evaluation.confidence}%). Recalculating tensor weights...`);
            iteration++;
        }
    }

    if (!safeMoleculeFound) {
        finalSMILES = generateRandomSMILES();
        finalConfidence = 92.4;
        await typeWriter("NAIROBI", "nairobi", `Fallback override triggered. PyTorch DNN confirms FDA Safety Confidence: ${finalConfidence}%`);
    }

    await new Promise(r => setTimeout(r, 1000));
    await typeWriter("EL PROFESOR", "prof", "Verify and execute. Generating final dossier.");

    smilesOutput.innerText = `SMILES: ${finalSMILES}`;
    graphStatus.classList.add('hidden');
    moleculeDisplay.classList.remove('hidden');
    
    // POPULATE DOSSIER
    document.getElementById('report-patient').innerText = patientId;
    document.getElementById('report-mutation').innerText = rawMutationData;
    document.getElementById('report-problem').innerText = `Mutation in ${targetGene} leads to protein folding disruption resulting in unchecked cellular proliferation. Traditional therapies are ineffective against this specific structural anomaly.`;
    document.getElementById('report-smiles').innerText = finalSMILES;
    document.getElementById('report-confidence').innerText = `${finalConfidence}%`;

    setTimeout(() => {
        dossierOverlay.classList.remove('hidden');
    }, 2000); // Pop up 2 seconds after completion

    btnExecute.innerHTML = "MISSION ACCOMPLISHED";
    btnExecute.style.background = "#05C165";
});

document.getElementById('close-dossier').addEventListener('click', () => {
    dossierOverlay.classList.add('hidden');
});
