from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # your frontend dev URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

form_db: dict[str, Form] = {}

# Post a form (POST)
@app.post("/forms/")
async def create_form(
        employee_name: str = Form(...),
        start_date_iso: str = Form(...),
        end_date_iso: str = Form(...),
        files: List[UploadFile] = File(None)
):
    form_data = {
        "form": {
            "employee_name": employee_name,
            "start_date_iso": start_date_iso,
            "end_date_iso": end_date_iso
        },
        "files": []
    }

    if files:
        for file in files:
            content = await file.read()
            form_data["files"].append({
                "filename": file.filename,
                "content_type": file.content_type,
                "content": content.decode(errors="ignore")
            })

    # Save to mock "DB"
    form_db[employee_name] = form_data
    return {"id": employee_name, "form": form_data}

# Get a form by ID (GET)
@app.get("/forms/{form_id}")
def get_form(form_id: str):
    form = form_db.get(form_id)
    if not form:
        raise HTTPException(status_code=404, detail="Form not found")
    return {"id": form_id, "form": form}

# Get all forms (GET)
@app.get("/forms/")
def list_forms():
    return [{"id": id_, "form": form} for id_, form in form_db.items()]
