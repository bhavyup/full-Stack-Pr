from fastapi import FastAPI, APIRouter, HTTPException, status, Depends
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from datetime import timedelta

# Import our models and database
from models import *
from database import Database
from auth import authenticate_admin, create_access_token, get_current_admin

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI(title="Shreeya Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============================================================================
# PUBLIC API ROUTES (No Authentication Required)
# ============================================================================

@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running", "status": "success"}

# Profile Routes
@api_router.get("/profile")
async def get_profile():
    """Get profile data"""
    try:
        profile = await Database.get_profile()
        if not profile:
            raise HTTPException(status_code=404, detail="Profile not found")
        return {"success": True, "data": profile}
    except Exception as e:
        logger.error(f"Error getting profile: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Skills Routes
@api_router.get("/skills")
async def get_skills():
    """Get all skills by category"""
    try:
        skills = await Database.get_skills()
        return {"success": True, "data": skills}
    except Exception as e:
        logger.error(f"Error getting skills: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Projects Routes
@api_router.get("/projects")
async def get_projects():
    """Get all projects"""
    try:
        projects = await Database.get_projects()
        return {"success": True, "data": projects, "total": len(projects)}
    except Exception as e:
        logger.error(f"Error getting projects: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Education Routes
@api_router.get("/education")
async def get_education():
    """Get education data"""
    try:
        education = await Database.get_education()
        if not education:
            raise HTTPException(status_code=404, detail="Education data not found")
        return {"success": True, "data": education}
    except Exception as e:
        logger.error(f"Error getting education: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Experience Routes
@api_router.get("/experience")
async def get_experience():
    """Get experience data"""
    try:
        experience = await Database.get_experience()
        if not experience:
            raise HTTPException(status_code=404, detail="Experience data not found")
        return {"success": True, "data": experience}
    except Exception as e:
        logger.error(f"Error getting experience: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Learning Journey Routes
@api_router.get("/learning-journey")
async def get_learning_journey():
    """Get learning journey timeline"""
    try:
        journey = await Database.get_learning_journey()
        return {"success": True, "data": journey, "total": len(journey)}
    except Exception as e:
        logger.error(f"Error getting learning journey: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Experiments Routes
@api_router.get("/experiments")
async def get_experiments():
    """Get all experiments"""
    try:
        experiments = await Database.get_experiments()
        return {"success": True, "data": experiments, "total": len(experiments)}
    except Exception as e:
        logger.error(f"Error getting experiments: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Contact Routes
@api_router.post("/contact")
async def submit_contact_form(contact_data: ContactMessageCreate):
    """Submit contact form"""
    try:
        message_dict = contact_data.dict()
        message_obj = ContactMessage(**message_dict)
        message_id = await Database.create_contact_message(message_obj.dict())
        
        if message_id:
            return {"success": True, "message": "Message sent successfully!", "id": message_id}
        else:
            raise HTTPException(status_code=500, detail="Failed to send message")
    except Exception as e:
        logger.error(f"Error submitting contact form: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# ============================================================================
# ADMIN API ROUTES (Authentication Required)
# ============================================================================

# Admin Authentication
@api_router.post("/admin/login", response_model=Token)
async def admin_login(login_data: AdminLogin):
    """Admin login"""
    try:
        admin = await authenticate_admin(login_data.username, login_data.password)
        if not admin:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        access_token_expires = timedelta(minutes=1440)  # 24 hours
        access_token = create_access_token(
            data={"sub": admin["username"]}, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error during admin login: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/admin/verify")
async def verify_admin_token(current_admin: dict = Depends(get_current_admin)):
    """Verify admin token"""
    return {"success": True, "admin": {"username": current_admin["username"]}}

# Admin Profile Management
@api_router.put("/admin/profile")
async def update_profile(profile_data: ProfileBase, current_admin: dict = Depends(get_current_admin)):
    """Update profile data"""
    try:
        profile_dict = profile_data.dict()
        profile_obj = Profile(**profile_dict)
        success = await Database.update_profile(profile_obj.dict())
        
        if success:
            return {"success": True, "message": "Profile updated successfully"}
        else:
            raise HTTPException(status_code=500, detail="Failed to update profile")
    except Exception as e:
        logger.error(f"Error updating profile: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Admin Skills Management
@api_router.put("/admin/skills/{category}")
async def update_skills(category: str, skills_data: SkillsBase, current_admin: dict = Depends(get_current_admin)):
    """Update skills by category"""
    try:
        success = await Database.update_skills(category, skills_data.skills)
        
        if success:
            return {"success": True, "message": f"Skills for {category} updated successfully"}
        else:
            raise HTTPException(status_code=500, detail="Failed to update skills")
    except Exception as e:
        logger.error(f"Error updating skills: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Admin Projects Management
@api_router.post("/admin/projects")
async def create_project(project_data: ProjectCreate, current_admin: dict = Depends(get_current_admin)):
    """Create new project"""
    try:
        project_dict = project_data.dict()
        project_obj = Project(**project_dict)
        project_id = await Database.create_project(project_obj.dict())
        
        if project_id:
            return {"success": True, "message": "Project created successfully", "id": project_id}
        else:
            raise HTTPException(status_code=500, detail="Failed to create project")
    except Exception as e:
        logger.error(f"Error creating project: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.put("/admin/projects/{project_id}")
async def update_project(project_id: str, project_data: ProjectUpdate, current_admin: dict = Depends(get_current_admin)):
    """Update project"""
    try:
        update_dict = {k: v for k, v in project_data.dict().items() if v is not None}
        if update_dict:
            update_dict["updatedAt"] = datetime.utcnow()
            success = await Database.update_project(project_id, update_dict)
            
            if success:
                return {"success": True, "message": "Project updated successfully"}
            else:
                raise HTTPException(status_code=404, detail="Project not found")
        else:
            raise HTTPException(status_code=400, detail="No data to update")
    except Exception as e:
        logger.error(f"Error updating project: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.delete("/admin/projects/{project_id}")
async def delete_project(project_id: str, current_admin: dict = Depends(get_current_admin)):
    """Delete project"""
    try:
        success = await Database.delete_project(project_id)
        
        if success:
            return {"success": True, "message": "Project deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Project not found")
    except Exception as e:
        logger.error(f"Error deleting project: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Admin Education Management
@api_router.put("/admin/education")
async def update_education(education_data: EducationBase, current_admin: dict = Depends(get_current_admin)):
    """Update education data"""
    try:
        education_dict = education_data.dict()
        education_obj = Education(**education_dict)
        success = await Database.update_education(education_obj.dict())
        
        if success:
            return {"success": True, "message": "Education updated successfully"}
        else:
            raise HTTPException(status_code=500, detail="Failed to update education")
    except Exception as e:
        logger.error(f"Error updating education: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Admin Experience Management
@api_router.put("/admin/experience")
async def update_experience(experience_data: ExperienceBase, current_admin: dict = Depends(get_current_admin)):
    """Update experience data"""
    try:
        experience_dict = experience_data.dict()
        experience_obj = Experience(**experience_dict)
        success = await Database.update_experience(experience_obj.dict())
        
        if success:
            return {"success": True, "message": "Experience updated successfully"}
        else:
            raise HTTPException(status_code=500, detail="Failed to update experience")
    except Exception as e:
        logger.error(f"Error updating experience: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Admin Messages Management
@api_router.get("/admin/messages")
async def get_contact_messages(current_admin: dict = Depends(get_current_admin)):
    """Get all contact messages"""
    try:
        messages = await Database.get_contact_messages()
        return {"success": True, "data": messages, "total": len(messages)}
    except Exception as e:
        logger.error(f"Error getting contact messages: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.put("/admin/messages/{message_id}/read")
async def mark_message_read(message_id: str, current_admin: dict = Depends(get_current_admin)):
    """Mark message as read"""
    try:
        success = await Database.mark_message_read(message_id)
        
        if success:
            return {"success": True, "message": "Message marked as read"}
        else:
            raise HTTPException(status_code=404, detail="Message not found")
    except Exception as e:
        logger.error(f"Error marking message as read: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.delete("/admin/messages/{message_id}")
async def delete_contact_message(message_id: str, current_admin: dict = Depends(get_current_admin)):
    """Delete contact message"""
    try:
        success = await Database.delete_contact_message(message_id)
        
        if success:
            return {"success": True, "message": "Message deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Message not found")
    except Exception as e:
        logger.error(f"Error deleting message: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exception handler
@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    logger.error(f"Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"success": False, "message": "Internal server error"}
    )
