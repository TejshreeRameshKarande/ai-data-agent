from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from fastapi.staticfiles import StaticFiles

import os

# =====================================================
# ROUTES
# =====================================================

from app.api.routes import router

from app.api.auth_routes import (
    router as auth_router
)

# =====================================================
# DATABASE IMPORTS
# =====================================================

from app.database import engine

from app.database import Base

from app.models.user import User

# =====================================================
# CREATE DATABASE TABLES
# =====================================================

Base.metadata.create_all(
    bind=engine
)

# =====================================================
# CREATE REQUIRED FOLDERS
# =====================================================

os.makedirs(

    "reports",

    exist_ok=True

)

os.makedirs(

    "uploads",

    exist_ok=True

)

# =====================================================
# FASTAPI APP
# =====================================================

app = FastAPI(

    title="AI Data Agent API",

    description="""
    AI Powered Data Analytics Platform
    """,

    version="1.0.0"

)

# =====================================================
# CORS MIDDLEWARE
# =====================================================

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)

# =====================================================
# STATIC FILES
# =====================================================

# REPORTS

app.mount(

    "/reports",

    StaticFiles(
        directory="reports"
    ),

    name="reports"

)

# UPLOADS

app.mount(

    "/uploads",

    StaticFiles(
        directory="uploads"
    ),

    name="uploads"

)

# =====================================================
# ROOT ROUTE
# =====================================================

@app.get("/")

def home():

    return {

        "status": "success",

        "message":
        "Backend is running 🚀",

        "app":
        "AI Data Agent"

    }

# =====================================================
# HEALTH CHECK
# =====================================================

@app.get("/health")

def health_check():

    return {

        "status": "healthy"

    }

# =====================================================
# TEST REPORT ROUTE
# =====================================================

@app.get("/test-report/{filename}")

def test_report(filename: str):

    file_path = f"reports/{filename}"

    exists = os.path.exists(
        file_path
    )

    return {

        "filename": filename,

        "exists": exists,

        "path": file_path

    }

# =====================================================
# TEST UPLOAD ROUTE
# =====================================================

@app.get("/test-upload/{filename}")

def test_upload(filename: str):

    file_path = f"uploads/{filename}"

    exists = os.path.exists(
        file_path
    )

    return {

        "filename": filename,

        "exists": exists,

        "path": file_path

    }

# =====================================================
# INCLUDE ROUTES
# =====================================================

app.include_router(router)

app.include_router(auth_router)