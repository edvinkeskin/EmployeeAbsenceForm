from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # your frontend dev URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Form(BaseModel):
    selectedOption: str
    startDateIso: str
    endDateIso: str

@app.post("/forms/")
async def create_form(form: Form):
    return {"message": "Form created", "input": form}
