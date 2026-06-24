import os
import requests
import gzip
import pandas as pd
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset
from rdkit import Chem
from rdkit.Chem import AllChem
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

print("🏦 OPERATION MINT: Initiating Deep Learning Training Protocol")

# 1. Download Dataset (MoleculeNet ClinTox - FDA Approval Data)
DATA_URL = "https://deepchemdata.s3-us-west-1.amazonaws.com/datasets/clintox.csv.gz"
DATA_FILE = "clintox.csv.gz"

if not os.path.exists(DATA_FILE):
    print("Downloading ClinTox dataset (Real clinical trial toxicity data)...")
    response = requests.get(DATA_URL)
    with open(DATA_FILE, 'wb') as f:
        f.write(response.content)

print("Loading data...")
df = pd.read_csv(DATA_FILE)
# ClinTox has 'smiles', 'FDA_APPROVED', 'FDA_Tox'
# We will predict FDA_APPROVED (1 = Safe, 0 = Failed due to toxicity)
df = df.dropna(subset=['smiles', 'FDA_APPROVED'])

# 2. Extract Features (Morgan Fingerprints)
print("Translating SMILES strings to 2048-bit Morgan Fingerprints...")
X_features = []
y_labels = []

for idx, row in df.iterrows():
    smiles = row['smiles']
    label = row['FDA_APPROVED']
    mol = Chem.MolFromSmiles(smiles)
    if mol:
        # Generate 2048 bit fingerprint (radius 2)
        fp = AllChem.GetMorganFingerprintAsBitVect(mol, 2, nBits=2048)
        arr = np.zeros((0,), dtype=np.int8)
        Chem.DataStructs.ConvertToNumpyArray(fp, arr)
        X_features.append(arr)
        y_labels.append(label)

X = np.array(X_features, dtype=np.float32)
y = np.array(y_labels, dtype=np.float32).reshape(-1, 1)

print(f"Successfully encoded {len(X)} molecules.")

# Split Data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Convert to PyTorch Tensors
train_dataset = TensorDataset(torch.tensor(X_train), torch.tensor(y_train))
test_dataset = TensorDataset(torch.tensor(X_test), torch.tensor(y_test))

train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=64, shuffle=False)

# 3. Define the Deep Neural Network (MLP)
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
            nn.Sigmoid()  # Outputs probability between 0 and 1
        )

    def forward(self, x):
        return self.network(x)

model = MintNet()
criterion = nn.BCELoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 4. Train the Model
EPOCHS = 15
print("Commencing Neural Network Training (Target: >95% Accuracy)...")

for epoch in range(EPOCHS):
    model.train()
    running_loss = 0.0
    for inputs, labels in train_loader:
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        running_loss += loss.item()
    
    # Validation phase
    model.eval()
    all_preds = []
    all_targets = []
    with torch.no_grad():
        for inputs, labels in test_loader:
            outputs = model(inputs)
            preds = (outputs >= 0.5).float()
            all_preds.extend(preds.numpy())
            all_targets.extend(labels.numpy())
            
    val_acc = accuracy_score(all_targets, all_preds)
    print(f"Epoch [{epoch+1}/{EPOCHS}] - Loss: {running_loss/len(train_loader):.4f} - Validation Accuracy: {val_acc*100:.2f}%")

# 5. Save the weights
torch.save(model.state_dict(), "mint_model.pth")
print("🔥 TRAINING COMPLETE. Weights saved to mint_model.pth.")
