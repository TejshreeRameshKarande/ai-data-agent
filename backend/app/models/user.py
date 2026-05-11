from sqlalchemy import Column

from sqlalchemy import Integer

from sqlalchemy import String

from app.database import Base

# =====================================================
# USER TABLE
# =====================================================

class User(Base):

    __tablename__ = "users"

    # =================================================
    # ID
    # =================================================

    id = Column(

        Integer,

        primary_key=True,

        index=True

    )

    # =================================================
    # NAME
    # =================================================

    name = Column(

        String,

        nullable=False

    )

    # =================================================
    # EMAIL
    # =================================================

    email = Column(

        String,

        unique=True,

        nullable=False

    )

    # =================================================
    # PASSWORD
    # =================================================

    password = Column(

        String,

        nullable=False

    )