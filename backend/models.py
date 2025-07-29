from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid

# Profile Models
class ProfileBase(BaseModel):
    name: str
    headline: str
    bio: str
    highlights: str
    profileImage: str
    email: EmailStr
    linkedin: str
    location: str = "Odisha, India"

class Profile(ProfileBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

# Skills Models
class SkillsBase(BaseModel):
    category: str
    skills: List[str]

class Skills(SkillsBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

# Projects Models
class ProjectBase(BaseModel):
    title: str
    description: str
    status: str  # 'completed', 'coming-soon'
    image: str
    liveUrl: Optional[str] = None
    githubUrl: Optional[str] = None
    technologies: List[str] = []

class Project(ProjectBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    image: Optional[str] = None
    liveUrl: Optional[str] = None
    githubUrl: Optional[str] = None
    technologies: Optional[List[str]] = None

# Education Models
class EducationBase(BaseModel):
    degree: str
    institution: str
    year: str
    progress: int = 75  # percentage

class Education(EducationBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

# Experience Models
class ExperienceBase(BaseModel):
    message: str

class Experience(ExperienceBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

# Learning Journey Models
class LearningJourneyBase(BaseModel):
    phase: str
    skills: List[str]
    status: str  # 'completed', 'in-progress', 'planned'
    order: int

class LearningJourney(LearningJourneyBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class LearningJourneyCreate(LearningJourneyBase):
    pass

class LearningJourneyUpdate(BaseModel):
    phase: Optional[str] = None
    skills: Optional[List[str]] = None
    status: Optional[str] = None
    order: Optional[int] = None

# Experiments Models
class ExperimentBase(BaseModel):
    title: str
    description: str
    status: str  # 'active', 'planning'

class Experiment(ExperimentBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class ExperimentCreate(ExperimentBase):
    pass

class ExperimentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None

# Contact Models
class ContactMessageBase(BaseModel):
    name: str
    email: EmailStr
    message: str

class ContactMessage(ContactMessageBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    read: bool = False
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class ContactMessageCreate(ContactMessageBase):
    pass

# Admin Models
class AdminBase(BaseModel):
    username: str

class Admin(AdminBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class AdminCreate(BaseModel):
    username: str
    password: str

class AdminLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# Response Models
class APIResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None

class ListResponse(BaseModel):
    success: bool
    message: str
    data: List[dict]
    total: int