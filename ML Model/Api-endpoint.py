from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
from typing import Optional, List, Dict, Any
import os

app = FastAPI(title="Carbon Intensity API with Data Entry")

# --- CONFIGURATION ---
CSV_FILE_PATH = "Co-data.csv"

# Column Mapping: Clean Variable Name -> Actual CSV Header
COL_MAP = {
    "datetime": "Datetime (UTC)",
    "country": "Country",
    "zone_name": "Zone name",
    "zone_id": "Zone id",
    "carbon_direct": "Carbon intensity gCO₂eq/kWh (direct)",
    "carbon_lifecycle": "Carbon intensity gCO₂eq/kWh (Life cycle)",
    "cfe_percent": "Carbon-free energy percentage (CFE%)",
    "re_percent": "Renewable energy percentage (RE%)",
    "data_source": "Data source",
    "is_estimated": "Data estimated",
    "estimation_method": "Data estimation method"
}

# Inverse map for internal use
CSV_HEADER_MAP = {v: k for k, v in COL_MAP.items()}

# --- DATA MODEL ---
# This defines the data structure users must supply to the endpoint
class CarbonRecord(BaseModel):
    datetime: str
    country: str
    zone_name: str
    zone_id: str
    carbon_direct: str
    carbon_lifecycle: str
    cfe_percent: str
    re_percent: str
    data_source: str
    is_estimated: str
    estimation_method: str

# --- LOAD DATA ---
def load_data():
    if os.path.exists(CSV_FILE_PATH):
        # Read CSV as string to avoid type errors
        df = pd.read_csv(CSV_FILE_PATH, dtype=str)
        df = df.fillna("")
        return df
    return pd.DataFrame(columns=list(COL_MAP.values()))

# Load initial data
df = load_data()
print(f"✅ Loaded {len(df)} rows.")

# --- ENDPOINTS ---

@app.get("/")
def home():
    return {"message": "API Running. Use POST /add-record to supply data."}

@app.get("/data", response_model=List[Dict[str, Any]])
def get_data(skip: int = 0, limit: int = 50, country: Optional[str] = None):
    """Read data with filtering."""
    result_df = df
    if country:
        col_name = COL_MAP["country"]
        result_df = result_df[result_df[col_name].str.contains(country, case=False, na=False)]
    
    return result_df.iloc[skip : skip + limit].to_dict(orient="records")

@app.post("/add-record")
def add_new_record(record: CarbonRecord):
    """
    Supply new data to the CSV file.
    """
    global df
    
    # 1. Convert the incoming JSON (record) to a dictionary
    new_data = record.dict()
    
    # 2. Map the clean keys back to the complex CSV headers
    csv_row_data = {COL_MAP[key]: value for key, value in new_data.items()}
    
    # 3. Create a single-row DataFrame
    new_row_df = pd.DataFrame([csv_row_data])
    
    # 4. Append to the CSV file (mode='a' means append)
    # header=False ensures we don't write the headers again in the middle of the file
    try:
        new_row_df.to_csv(CSV_FILE_PATH, mode='a', header=not os.path.exists(CSV_FILE_PATH), index=False)
        
        # 5. Update the in-memory DataFrame so the new data appears immediately in GET requests
        df = pd.concat([df, new_row_df], ignore_index=True)
        
        return {"message": "Data successfully added", "total_rows": len(df)}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to write to file: {str(e)}")