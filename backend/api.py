from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
import torch.nn as nn
import numpy as np
from rdkit import Chem
from rdkit.Chem import AllChem

app = FastAPI(title="OPERATION MINT Backend API")

# Allow CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the exact same architecture as train.py
class MintNet(nn.Module):
    def __init__(self):
        super(MintNet, self).__init__()
        self.network = nn.Sequential(
            nn.Linear(2048, 1024),
            nn.ReLU(),
            nn.Dropout(0.4),
            nn.Linear(1024, 512),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(512, 128),
            nn.ReLU(),
            nn.Linear(128, 1),
            nn.Sigmoid()
        )

    def forward(self, x):
        return self.network(x)

# Load the trained model globally
model = MintNet()
try:
    model.load_state_dict(torch.load("mint_model.pth", weights_only=True))
    model.eval()
    print("✅ Model weights loaded successfully.")
except FileNotFoundError:
    print("⚠️ WARNING: mint_model.pth not found. Please run train.py first! Using untrained weights for now.")

class PredictionRequest(BaseModel):
    smiles: str

class PredictionResponse(BaseModel):
    smiles: str
    is_safe: bool
    confidence: float

@app.post("/predict", response_model=PredictionResponse)
def predict_toxicity(req: PredictionRequest):
    mol = Chem.MolFromSmiles(req.smiles)
    if not mol:
        raise HTTPException(status_code=400, detail="Invalid SMILES string")
    
    # Convert to Fingerprint
    fp = AllChem.GetMorganFingerprintAsBitVect(mol, 2, nBits=2048)
    arr = np.zeros((0,), dtype=np.float32)
    Chem.DataStructs.ConvertToNumpyArray(fp, arr)
    tensor_input = torch.tensor(arr, dtype=torch.float32).unsqueeze(0)
    
    # Predict
    with torch.no_grad():
        output = model(tensor_input)
        prob = output.item()
    
    # FDA_APPROVED prediction (1 = safe, 0 = toxic)
    is_safe = prob >= 0.5
    confidence = prob if is_safe else 1.0 - prob
    
    return {
        "smiles": req.smiles,
        "is_safe": is_safe,
        "confidence": round(confidence * 100, 2)
    }

@app.get("/")
def read_root():
    return {"message": "OPERATION MINT Neural Network Backend is online."}
