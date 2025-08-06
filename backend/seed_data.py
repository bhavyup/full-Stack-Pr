import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import (
    Database, 
    projects_collection, 
    education_collection, 
    experience_collection, 
    learning_journey_collection, 
    experiments_collection,
    growth_mindset_collection,
    contact_section_collection,
    footer_collection,
    admin_collection
)
from auth import get_password_hash
from datetime import datetime
import asyncio

async def seed_database():
    """Seed database with initial portfolio data, clearing old data first."""
    
    print("🧹 Clearing existing data...")
    # --- THIS IS THE NEW PART ---
    # Clear existing data to prevent duplicates
    await projects_collection.delete_many({})
    await education_collection.delete_many({})
    await experience_collection.delete_many({})
    await learning_journey_collection.delete_many({})
    await experiments_collection.delete_many({})
    await growth_mindset_collection.delete_many({})
    await contact_section_collection.delete_many({})
    await admin_collection.delete_many({})
    # Profile and Skills are updated with replace_one(upsert=True), so they don't need clearing.
    # --- END OF NEW PART ---
    print("🗑️  Old data cleared.")
    
    # Profile data
    profile_data = {
        "name": "Shreeya Swarupa Das",
        "headline": "Crafting Scalable Cloud Solutions with Creativity and Code",
        "bio": "Hi, I'm Shreeya Das—a tech enthusiast passionate about building creative and intelligent solutions using AI-powered tools. My expertise lies in exploring automation, web technologies, and modern cloud platforms. Currently, I'm focused on learning cloud computing and experimenting with AI agents to create futuristic user experiences. My vision? To design systems that blend innovation, usability, and intelligence for the next generation of the web.",
        "highlights": "Cloud Explorer | Automation Architect | Agile Mindset",
        "profileImage": "https://www.piclumen.com/wp-content/uploads/2024/10/piclumen-first-03.webp",
        "email": "missiyaa.111@gmail.com",
        "linkedin": "linkedin.com/in/shreeya-swarupa-das-660689289",
        "location": "Odisha, India",
        "resume_url": "/static/Shreeya_Das_Resume.pdf", # --- ADD THIS LINE ---
        "updatedAt": datetime.utcnow()
    }
    await Database.update_profile(profile_data)
    
    # Skills data
    '''skills_data = {
        "current": ["HTML", "CSS", "Database Basics", "AI Tools"],
        "learning": ["Cloud Computing", "Automation", "AI Integration"],
        "tools": ["v0.dev", "Perplexity AI", "Make", "Claude AI", "Figma", "Leonardo AI"],
        "programming": ["Python", "Java", "C"],
        "database": ["MySQL"],
        "cloud": ["AWS (Beginner)", "Azure (Beginner)"],
        "soft": ["Problem-Solving", "Adaptability", "Resilience", "Quick Learning", "Communication"]
    }
    
    for category, skills in skills_data.items():
        await Database.update_skills(category, skills)'''
    skills_data = {
        "current": [
            {"name": "HTML", "proficiency": 90},
            {"name": "CSS", "proficiency": 85},
            {"name": "Database Basics", "proficiency": 75},
            {"name": "AI Tools", "proficiency": 80}
        ],
        "learning": [
            {"name": "Cloud Computing", "proficiency": 60},
            {"name": "Automation", "proficiency": 65},
            {"name": "AI Integration", "proficiency": 70}
        ],
        "tools": [
            {"name": "v0.dev", "proficiency": 80},
            {"name": "Perplexity AI", "proficiency": 90},
            {"name": "Make", "proficiency": 70},
            {"name": "Claude AI", "proficiency": 85},
            {"name": "Figma", "proficiency": 75}
        ],
        "programming": [
            {"name": "Python", "proficiency": 85},
            {"name": "Java", "proficiency": 70},
            {"name": "C", "proficiency": 65}
        ],
        "database": [
            {"name": "MySQL", "proficiency": 75}
        ],
        "cloud": [
            {"name": "AWS (Beginner)", "proficiency": 50},
            {"name": "Azure (Beginner)", "proficiency": 50}
        ],
        "soft": [
            {"name": "Problem-Solving", "proficiency": 95},
            {"name": "Adaptability", "proficiency": 90},
            {"name": "Quick Learning", "proficiency": 95},
            {"name": "Communication", "proficiency": 85}
        ]
    }

    for category, skills in skills_data.items():
        # This line now passes the list of skill objects
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
        "main_title": "Journey in Progress",
        "main_message": "On a journey—actively seeking hands-on roles and tech collaborations. Watch this space for future experience updates!",
        "goals": [
            {
                "title": "Internships",
                "description": "Seeking hands-on learning opportunities"
            },
            {
                "title": "Projects",
                "description": "Building innovative solutions"
            },
            {
                "title": "Collaborations",
                "description": "Creative tech partnerships"
            }
        ],
        "cta_title": "Let's Build Something Amazing Together!",
        "cta_message": "I'm passionate about learning, growing, and contributing to innovative projects. If you have an opportunity or collaboration in mind, I'd love to hear from you!",
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

    growth_mindset_data = {
        "title": "Growth Mindset",
        "quote": "\"The journey of a thousand miles begins with a single step. Every skill learned, every challenge overcome, brings me closer to my goals.\"",
        "updatedAt": datetime.utcnow()
        }
    await Database.update_growth_mindset(growth_mindset_data)
    
    # Experiments data
    experiments_section_data = {
        "header_title": "Latest Experiments",
        "header_description": "Pushing boundaries with AI, automation, and creative technology solutions",
        "lab_title": "Innovation Lab",
        "lab_description": "This is where ideas transform into reality. Every experiment here represents a step toward the future of technology, combining AI, automation, and human creativity to solve real-world challenges.",
        "lab_features": [
            {"title": "AI Integration", "description": "Exploring intelligent automation"},
            {"title": "Creative Solutions", "description": "Innovative problem-solving approaches"},
            {"title": "Rapid Prototyping", "description": "Fast iteration and testing"}
        ],
        "experiments": [
            {
                "title": "AI-Powered Portfolio Management",
                "description": "Experimenting with dynamic content generation using AI.",
                "status": "active"
            },
            {
                "title": "Cloud Automation Scripts",
                "description": "Building automation tools for cloud resource management.",
                "status": "planning"
            }
        ],
        "updatedAt": datetime.utcnow()
    }
    await Database.update_experiments_section(experiments_section_data)

    contact_section_data = {
        "header_title": "Contact & Social",
        "header_description": "Let's connect and build something amazing together!",
        "connect_title": "Let's Connect!",
        "connect_description": "Open to internships, learning projects, or creative tech collaborations!",
        "get_in_touch_title": "Get In Touch",
        "get_in_touch_description": "I'm always excited to discuss new opportunities... I'd love to hear from you!",
        "contact_links": [
            {
                "name": "Email",
                "value": "missiyaa.111@gmail.com",
                "icon": "Mail",
                "color": "Mail"
            },
            {
                "name": "LinkedIn",
                "value": "linkedin.com/in/shreeya-swarupa-das-660689289",
                "icon": "Linkedin",
                "color": "Linkedin"
            },
            {
                "name": "Location",
                "value": "Odisha, India",
                "icon": "MapPin",
                "color": "MapPin"
            }
        ],
        "updatedAt": datetime.utcnow()
    }
    await Database.update_contact_section(contact_section_data)

    footer_data = {
        "brand_name": "Shreeya Das",
        "brand_description": "Crafting scalable cloud solutions with creativity and code. Always learning, always building.",
        "quick_links": [
            {"name": "About", "href": "#about"},
            {"name": "Skills", "href": "#skills"},
            {"name": "Projects", "href": "#projects"},
            {"name": "Contact", "href": "#contact"}
        ],
        "connect_title": "Let's Connect",
        "connect_description": "Open to internships, learning projects, or creative tech collaborations!",
        "bottom_text": "Building the future, one line at a time",
        "updatedAt": datetime.utcnow()
    }
    await Database.update_footer(footer_data)
    
    # Admin user
    admin_data = {
        "username": "shreeya",
        "password": get_password_hash("shreeya123"),
        "name": "Shreeya Swarupa Das",
        "profileImage": profile_data["profileImage"],
        "role": "superadmin",
        "createdAt": datetime.utcnow()
    }
    await Database.create_admin(admin_data)
    
    print("✅ Database seeded successfully!")

if __name__ == "__main__":
    asyncio.run(seed_database())