from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid
from enum import Enum

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
    resume_url: Optional[str] = None

class Profile(ProfileBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class Skill(BaseModel):
    name: str
    proficiency: int = Field(..., ge=0, le=100)

# Skills Models
class SkillsBase(BaseModel):
    category: str
    skills: List[Skill]

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
class Goal(BaseModel):
    title: str
    description: str

class ExperienceBase(BaseModel):
    main_title: str
    main_message: str
    goals: List[Goal]
    cta_title: str
    cta_message: str

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

class GrowthMindsetBase(BaseModel):
    title: str
    quote: str

class GrowthMindset(GrowthMindsetBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

# Experiments Models
class ExperimentItem(BaseModel):
    title: str
    description: str
    status: str

class InnovationLabFeature(BaseModel):
    title: str
    description: str

class ExperimentsSectionData(BaseModel):
    header_title: str
    header_description: str
    lab_title: str
    lab_description: str
    lab_features: List[InnovationLabFeature]
    experiments: List[ExperimentItem]

class ExperimentsSectionDB(ExperimentsSectionData):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

# Contact Models
class ContactLink(BaseModel):
    name: str  # e.g., "Email", "LinkedIn"
    value: str # e.g., "test@test.com", "linkedin.com/in/..."
    icon: str  # e.g., "Mail", "Linkedin" - we'll use this on the frontend
    color: str

class ContactSectionData(BaseModel):
    header_title: str
    header_description: str
    connect_title: str
    connect_description: str
    get_in_touch_title: str
    get_in_touch_description: str
    contact_links: List[ContactLink]

class ContactSectionDB(ContactSectionData):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

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

class FooterLink(BaseModel):
    name: str
    href: str

class FooterData(BaseModel):
    brand_name: str
    brand_description: str
    quick_links: List[FooterLink]
    connect_title: str
    connect_description: str
    bottom_text: str

class FooterDB(FooterData):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    updatedAt: datetime = Field(default_factory=datetime.utcnow)
    
class NotificationType(str, Enum):
    INFO = "info"
    SUCCESS = "success"
    WARNING = "warning"
    ERROR = "error"
    MESSAGE = "message"
    USER = "user"
    UPDATE = "update"
    SECURITY = "security"

class NotificationBase(BaseModel):
    message: str
    read: bool = False
    type: NotificationType = NotificationType.INFO

class Notification(NotificationBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    createdAt: datetime = Field(default_factory=datetime.utcnow)

# Admin Models
class AdminBase(BaseModel):
    username: str
    name: Optional[str] = None
    profileImage: Optional[str] = None

class Admin(AdminBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class AdminCreate(BaseModel):
    username: str
    password: str
    name: str
    profileImage: str

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
    
class AdminProfileResponse(BaseModel):
    username: str
    name: str
    profileImage: str
    role: str