from .database import Database
from .auth import get_password_hash
from datetime import datetime
import asyncio

async def seed_database():
    """Seed database with initial portfolio data"""
    
    # Profile data
    profile_data = {
        "name": "Shreeya Swarupa Das",
        "headline": "Crafting Scalable Cloud Solutions with Creativity and Code",
        "bio": "Hi, I'm Shreeya Das—a tech enthusiast passionate about building creative and intelligent solutions using AI-powered tools. My expertise lies in exploring automation, web technologies, and modern cloud platforms. Currently, I'm focused on learning cloud computing and experimenting with AI agents to create futuristic user experiences. My vision? To design systems that blend innovation, usability, and intelligence for the next generation of the web.",
        "highlights": "Cloud Explorer | Automation Architect | Agile Mindset",
        "profileImage": "https://images.unsplash.com/photo-1494790108755-2616c2ecbd5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "email": "missiyaa.111@gmail.com",
        "linkedin": "linkedin.com/in/shreeya-swarupa-das-660689289",
        "location": "Odisha, India",
        "updatedAt": datetime.utcnow()
    }
    await Database.update_profile(profile_data)
    
    # Skills data
    skills_data = {
        "current": ["HTML", "CSS", "Database Basics", "AI Tools"],
        "learning": ["Cloud Computing", "Automation", "AI Integration"],
        "tools": ["v0.dev", "Perplexity AI", "Make", "Claude AI", "Figma", "Leonardo AI"],
        "programming": ["Python", "Java", "C"],
        "database": ["MySQL"],
        "cloud": ["AWS (Beginner)", "Azure (Beginner)"],
        "soft": ["Problem-Solving", "Adaptability", "Resilience", "Quick Learning", "Communication"]
    }
    
    for category, skills in skills_data.items():
        await Database.update_skills(category, skills)
    
    # Projects data
    projects_data = [
        {
            "title": "Coming Soon: AI Agents",
            "description": "Exploring autonomous AI agents for task automation",
            "status": "coming-soon",
            "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            "liveUrl": None,
            "githubUrl": None,
            "technologies": ["Python", "AI", "Automation"],
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "title": "Academic Model Analyzer",
            "description": "Combined coding with design to create faster analysis models for academic research",
            "status": "completed",
            "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            "liveUrl": "#",
            "githubUrl": "#",
            "technologies": ["Python", "Data Analysis", "Research"],
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
    ]
    
    for project in projects_data:
        await Database.create_project(project)
    
    # Education data
    education_data = {
        "degree": "B.Tech in Computer Science",
        "institution": "Biju Patnaik University of Technology (BPUT), Odisha",
        "year": "2026 (Expected)",
        "progress": 75,
        "updatedAt": datetime.utcnow()
    }
    await Database.update_education(education_data)
    
    # Experience data
    experience_data = {
        "message": "On a journey—actively seeking hands-on roles and tech collaborations. Watch this space for future experience updates!",
        "updatedAt": datetime.utcnow()
    }
    await Database.update_experience(experience_data)
    
    # Learning Journey data
    learning_journey_data = [
        {
            "phase": "Foundation",
            "skills": ["HTML", "CSS", "Python", "Java"],
            "status": "completed",
            "order": 1,
            "updatedAt": datetime.utcnow()
        },
        {
            "phase": "Current Focus",
            "skills": ["Cloud Computing", "AI Tools", "Automation"],
            "status": "in-progress",
            "order": 2,
            "updatedAt": datetime.utcnow()
        },
        {
            "phase": "Next Goals",
            "skills": ["Advanced Cloud Architecture", "ML Integration", "DevOps"],
            "status": "planned",
            "order": 3,
            "updatedAt": datetime.utcnow()
        }
    ]
    
    for phase in learning_journey_data:
        await Database.create_learning_phase(phase)
    
    # Experiments data
    experiments_data = [
        {
            "title": "AI-Powered Portfolio Management",
            "description": "Experimenting with dynamic content generation using AI",
            "status": "active",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        },
        {
            "title": "Cloud Automation Scripts",
            "description": "Building automation tools for cloud resource management",
            "status": "planning",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
    ]
    
    for experiment in experiments_data:
        await Database.create_experiment(experiment)
    
    # Admin user
    admin_data = {
        "username": "admin",
        "password": get_password_hash("admin123"),  # Change this in production
        "createdAt": datetime.utcnow()
    }
    await Database.create_admin(admin_data)
    
    print("✅ Database seeded successfully!")

if __name__ == "__main__":
    asyncio.run(seed_database())