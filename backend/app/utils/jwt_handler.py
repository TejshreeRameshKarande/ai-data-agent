from jose import jwt

from jose import JWTError

from datetime import datetime

from datetime import timedelta

# =====================================================
# SECRET KEY
# =====================================================

SECRET_KEY = "AI_DATA_AGENT_SECRET"

# =====================================================
# ALGORITHM
# =====================================================

ALGORITHM = "HS256"

# =====================================================
# TOKEN EXPIRE TIME
# =====================================================

ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

# =====================================================
# CREATE ACCESS TOKEN
# =====================================================

def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(

        minutes=ACCESS_TOKEN_EXPIRE_MINUTES

    )

    to_encode.update({

        "exp": expire

    })

    encoded_jwt = jwt.encode(

        to_encode,

        SECRET_KEY,

        algorithm=ALGORITHM

    )

    return encoded_jwt

# =====================================================
# VERIFY TOKEN
# =====================================================

def verify_token(token: str):

    try:

        payload = jwt.decode(

            token,

            SECRET_KEY,

            algorithms=[ALGORITHM]

        )

        return payload

    except JWTError:

        return None