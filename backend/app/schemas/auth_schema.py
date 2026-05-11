from pydantic import BaseModel

# =====================================================
# SIGNUP SCHEMA
# =====================================================

class SignupSchema(BaseModel):

    name: str

    email: str

    password: str

# =====================================================
# LOGIN SCHEMA
# =====================================================

class LoginSchema(BaseModel):

    email: str

    password: str

# =====================================================
# TOKEN RESPONSE
# =====================================================

class TokenResponse(BaseModel):

    access_token: str

    token_type: str = "bearer"