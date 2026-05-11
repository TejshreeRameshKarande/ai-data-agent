from fastapi import APIRouter

from fastapi import Depends

from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.user import User

from app.schemas.auth_schema import SignupSchema

from app.schemas.auth_schema import LoginSchema

from app.utils.auth import hash_password

from app.utils.auth import verify_password

from app.utils.jwt_handler import create_access_token

# =====================================================
# ROUTER
# =====================================================

router = APIRouter(

    prefix="/auth",

    tags=["Authentication"]

)

# =====================================================
# SIGNUP
# =====================================================

@router.post("/signup")

def signup(

    user: SignupSchema,

    db: Session = Depends(get_db)

):

    # ================================================
    # CHECK EMAIL
    # ================================================

    existing_user = db.query(User).filter(

        User.email == user.email

    ).first()

    if existing_user:

        raise HTTPException(

            status_code=400,

            detail="Email already exists"

        )

    # ================================================
    # CREATE USER
    # ================================================

    new_user = User(

        name=user.name,

        email=user.email,

        password=hash_password(
            user.password
        )

    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {

        "message":
        "Signup successful 🚀"

    }

# =====================================================
# LOGIN
# =====================================================

@router.post("/login")

def login(

    user: LoginSchema,

    db: Session = Depends(get_db)

):

    # ================================================
    # FIND USER
    # ================================================

    db_user = db.query(User).filter(

        User.email == user.email

    ).first()

    if not db_user:

        raise HTTPException(

            status_code=401,

            detail="Invalid email"

        )

    # ================================================
    # VERIFY PASSWORD
    # ================================================

    if not verify_password(

        user.password,

        db_user.password

    ):

        raise HTTPException(

            status_code=401,

            detail="Invalid password"

        )

    # ================================================
    # CREATE TOKEN
    # ================================================

    token = create_access_token({

        "user_id": db_user.id,

        "email": db_user.email

    })

    return {

        "access_token": token,

        "token_type": "bearer",

        "user": {

            "id": db_user.id,

            "name": db_user.name,

            "email": db_user.email

        }

    }