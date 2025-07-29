from motor.motor_asyncio import AsyncIOMotorClient
from pathlib import Path
from dotenv import load_dotenv
import os
import logging

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Collections
profile_collection = db.profile
skills_collection = db.skills
projects_collection = db.projects
education_collection = db.education
experience_collection = db.experience
learning_journey_collection = db.learning_journey
experiments_collection = db.experiments
contact_messages_collection = db.contact_messages
admin_collection = db.admin

logger = logging.getLogger(__name__)

class Database:
    @staticmethod
    async def get_profile():
        """Get profile data"""
        try:
            profile = await profile_collection.find_one()
            if profile:
                profile["id"] = str(profile["_id"])
                del profile["_id"]
            return profile
        except Exception as e:
            logger.error(f"Error getting profile: {e}")
            return None
    
    @staticmethod
    async def update_profile(profile_data: dict):
        """Update profile data"""
        try:
            result = await profile_collection.replace_one(
                {}, profile_data, upsert=True
            )
            return result.acknowledged
        except Exception as e:
            logger.error(f"Error updating profile: {e}")
            return False
    
    @staticmethod
    async def get_skills():
        """Get all skills by category"""
        try:
            cursor = skills_collection.find()
            skills = {}
            async for skill_doc in cursor:
                skills[skill_doc["category"]] = skill_doc["skills"]
            return skills
        except Exception as e:
            logger.error(f"Error getting skills: {e}")
            return {}
    
    @staticmethod
    async def update_skills(category: str, skills: list):
        """Update skills for a category"""
        try:
            result = await skills_collection.replace_one(
                {"category": category}, 
                {"category": category, "skills": skills}, 
                upsert=True
            )
            return result.acknowledged
        except Exception as e:
            logger.error(f"Error updating skills: {e}")
            return False
    
    @staticmethod
    async def get_projects():
        """Get all projects"""
        try:
            cursor = projects_collection.find().sort("createdAt", -1)
            projects = []
            async for project in cursor:
                project["id"] = str(project["_id"])
                del project["_id"]
                projects.append(project)
            return projects
        except Exception as e:
            logger.error(f"Error getting projects: {e}")
            return []
    
    @staticmethod
    async def create_project(project_data: dict):
        """Create new project"""
        try:
            result = await projects_collection.insert_one(project_data)
            return str(result.inserted_id)
        except Exception as e:
            logger.error(f"Error creating project: {e}")
            return None
    
    @staticmethod
    async def update_project(project_id: str, project_data: dict):
        """Update project"""
        try:
            from bson import ObjectId
            result = await projects_collection.update_one(
                {"_id": ObjectId(project_id)}, 
                {"$set": project_data}
            )
            return result.acknowledged
        except Exception as e:
            logger.error(f"Error updating project: {e}")
            return False
    
    @staticmethod
    async def delete_project(project_id: str):
        """Delete project"""
        try:
            from bson import ObjectId
            result = await projects_collection.delete_one({"_id": ObjectId(project_id)})
            return result.deleted_count > 0
        except Exception as e:
            logger.error(f"Error deleting project: {e}")
            return False
    
    @staticmethod
    async def get_education():
        """Get education data"""
        try:
            education = await education_collection.find_one()
            if education:
                education["id"] = str(education["_id"])
                del education["_id"]
            return education
        except Exception as e:
            logger.error(f"Error getting education: {e}")
            return None
    
    @staticmethod
    async def update_education(education_data: dict):
        """Update education data"""
        try:
            result = await education_collection.replace_one(
                {}, education_data, upsert=True
            )
            return result.acknowledged
        except Exception as e:
            logger.error(f"Error updating education: {e}")
            return False
    
    @staticmethod
    async def get_experience():
        """Get experience data"""
        try:
            experience = await experience_collection.find_one()
            if experience:
                experience["id"] = str(experience["_id"])
                del experience["_id"]
            return experience
        except Exception as e:
            logger.error(f"Error getting experience: {e}")
            return None
    
    @staticmethod
    async def update_experience(experience_data: dict):
        """Update experience data"""
        try:
            result = await experience_collection.replace_one(
                {}, experience_data, upsert=True
            )
            return result.acknowledged
        except Exception as e:
            logger.error(f"Error updating experience: {e}")
            return False
    
    @staticmethod
    async def get_learning_journey():
        """Get learning journey timeline"""
        try:
            cursor = learning_journey_collection.find().sort("order", 1)
            journey = []
            async for phase in cursor:
                phase["id"] = str(phase["_id"])
                del phase["_id"]
                journey.append(phase)
            return journey
        except Exception as e:
            logger.error(f"Error getting learning journey: {e}")
            return []
    
    @staticmethod
    async def create_learning_phase(phase_data: dict):
        """Create new learning phase"""
        try:
            result = await learning_journey_collection.insert_one(phase_data)
            return str(result.inserted_id)
        except Exception as e:
            logger.error(f"Error creating learning phase: {e}")
            return None
    
    @staticmethod
    async def update_learning_phase(phase_id: str, phase_data: dict):
        """Update learning phase"""
        try:
            from bson import ObjectId
            result = await learning_journey_collection.update_one(
                {"_id": ObjectId(phase_id)}, 
                {"$set": phase_data}
            )
            return result.acknowledged
        except Exception as e:
            logger.error(f"Error updating learning phase: {e}")
            return False
    
    @staticmethod
    async def delete_learning_phase(phase_id: str):
        """Delete learning phase"""
        try:
            from bson import ObjectId
            result = await learning_journey_collection.delete_one({"_id": ObjectId(phase_id)})
            return result.deleted_count > 0
        except Exception as e:
            logger.error(f"Error deleting learning phase: {e}")
            return False
    
    @staticmethod
    async def get_experiments():
        """Get all experiments"""
        try:
            cursor = experiments_collection.find().sort("createdAt", -1)
            experiments = []
            async for experiment in cursor:
                experiment["id"] = str(experiment["_id"])
                del experiment["_id"]
                experiments.append(experiment)
            return experiments
        except Exception as e:
            logger.error(f"Error getting experiments: {e}")
            return []
    
    @staticmethod
    async def create_experiment(experiment_data: dict):
        """Create new experiment"""
        try:
            result = await experiments_collection.insert_one(experiment_data)
            return str(result.inserted_id)
        except Exception as e:
            logger.error(f"Error creating experiment: {e}")
            return None
    
    @staticmethod
    async def update_experiment(experiment_id: str, experiment_data: dict):
        """Update experiment"""
        try:
            from bson import ObjectId
            result = await experiments_collection.update_one(
                {"_id": ObjectId(experiment_id)}, 
                {"$set": experiment_data}
            )
            return result.acknowledged
        except Exception as e:
            logger.error(f"Error updating experiment: {e}")
            return False
    
    @staticmethod
    async def delete_experiment(experiment_id: str):
        """Delete experiment"""
        try:
            from bson import ObjectId
            result = await experiments_collection.delete_one({"_id": ObjectId(experiment_id)})
            return result.deleted_count > 0
        except Exception as e:
            logger.error(f"Error deleting experiment: {e}")
            return False
    
    @staticmethod
    async def create_contact_message(message_data: dict):
        """Create new contact message"""
        try:
            result = await contact_messages_collection.insert_one(message_data)
            return str(result.inserted_id)
        except Exception as e:
            logger.error(f"Error creating contact message: {e}")
            return None
    
    @staticmethod
    async def get_contact_messages():
        """Get all contact messages"""
        try:
            cursor = contact_messages_collection.find().sort("createdAt", -1)
            messages = []
            async for message in cursor:
                message["id"] = str(message["_id"])
                del message["_id"]
                messages.append(message)
            return messages
        except Exception as e:
            logger.error(f"Error getting contact messages: {e}")
            return []
    
    @staticmethod
    async def mark_message_read(message_id: str):
        """Mark message as read"""
        try:
            from bson import ObjectId
            result = await contact_messages_collection.update_one(
                {"_id": ObjectId(message_id)}, 
                {"$set": {"read": True}}
            )
            return result.acknowledged
        except Exception as e:
            logger.error(f"Error marking message as read: {e}")
            return False
    
    @staticmethod
    async def delete_contact_message(message_id: str):
        """Delete contact message"""
        try:
            from bson import ObjectId
            result = await contact_messages_collection.delete_one({"_id": ObjectId(message_id)})
            return result.deleted_count > 0
        except Exception as e:
            logger.error(f"Error deleting contact message: {e}")
            return False
    
    @staticmethod
    async def get_admin_by_username(username: str):
        """Get admin by username"""
        try:
            admin = await admin_collection.find_one({"username": username})
            if admin:
                admin["id"] = str(admin["_id"])
                del admin["_id"]
            return admin
        except Exception as e:
            logger.error(f"Error getting admin: {e}")
            return None
    
    @staticmethod
    async def create_admin(admin_data: dict):
        """Create new admin"""
        try:
            result = await admin_collection.insert_one(admin_data)
            return str(result.inserted_id)
        except Exception as e:
            logger.error(f"Error creating admin: {e}")
            return None