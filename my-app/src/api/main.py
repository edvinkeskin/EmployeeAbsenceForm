from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

form_db: dict[int, Form] = {}
form_id_counter = 0

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

    global form_id_counter
    form_db[form_id_counter] = form_data
    current_id = form_id_counter
    form_id_counter += 1
    return {"id": current_id, "form": form_data}

# Get a form by ID (GET)
@app.get("/forms/{form_id}")
def get_form(form_id: int):
    form = form_db.get(form_id)
    if not form:
        raise HTTPException(status_code=404, detail="Form not found")
    return {"id": form_id, "form": form}

# Get all forms (GET)
@app.get("/forms/")
def list_forms():
    return [{"id": id_, "form": form} for id_, form in form_db.items()]
