#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Portfolio Application
Tests all public and admin endpoints with proper authentication
"""

import requests
import json
import sys
import os
from datetime import datetime

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading backend URL: {e}")
        return None

BACKEND_URL = get_backend_url()
if not BACKEND_URL:
    print("❌ Could not get backend URL from frontend/.env")
    sys.exit(1)

API_BASE = f"{BACKEND_URL}/api"
print(f"🔗 Testing backend at: {API_BASE}")

# Test results tracking
test_results = {
    "passed": 0,
    "failed": 0,
    "errors": []
}

def log_test(test_name, success, details=""):
    """Log test results"""
    if success:
        print(f"✅ {test_name}")
        test_results["passed"] += 1
    else:
        print(f"❌ {test_name} - {details}")
        test_results["failed"] += 1
        test_results["errors"].append(f"{test_name}: {details}")

def make_request(method, endpoint, data=None, headers=None, expected_status=200):
    """Make HTTP request with error handling"""
    try:
        url = f"{API_BASE}{endpoint}"
        
        if method.upper() == "GET":
            response = requests.get(url, headers=headers, timeout=10)
        elif method.upper() == "POST":
            response = requests.post(url, json=data, headers=headers, timeout=10)
        elif method.upper() == "PUT":
            response = requests.put(url, json=data, headers=headers, timeout=10)
        elif method.upper() == "DELETE":
            response = requests.delete(url, headers=headers, timeout=10)
        else:
            return None, f"Unsupported method: {method}"
        
        return response, None
    except requests.exceptions.RequestException as e:
        return None, str(e)

def test_public_apis():
    """Test all public APIs that don't require authentication"""
    print("\n🔓 Testing Public APIs...")
    
    # Test 1: Root endpoint
    response, error = make_request("GET", "/")
    if error:
        log_test("GET /api/", False, error)
    else:
        if response.status_code == 200:
            try:
                data = response.json()
                if data.get("message") and data.get("status") == "success":
                    log_test("GET /api/", True)
                else:
                    log_test("GET /api/", False, f"Unexpected response format: {data}")
            except json.JSONDecodeError:
                log_test("GET /api/", False, "Invalid JSON response")
        else:
            log_test("GET /api/", False, f"Status {response.status_code}: {response.text}")
    
    # Test 2: Profile endpoint
    response, error = make_request("GET", "/profile")
    if error:
        log_test("GET /api/profile", False, error)
    else:
        if response.status_code == 200:
            try:
                data = response.json()
                if data.get("success") and "data" in data:
                    profile = data["data"]
                    required_fields = ["name", "headline", "bio", "email"]
                    missing_fields = [field for field in required_fields if field not in profile]
                    if missing_fields:
                        log_test("GET /api/profile", False, f"Missing fields: {missing_fields}")
                    else:
                        log_test("GET /api/profile", True)
                else:
                    log_test("GET /api/profile", False, f"Unexpected response format: {data}")
            except json.JSONDecodeError:
                log_test("GET /api/profile", False, "Invalid JSON response")
        else:
            log_test("GET /api/profile", False, f"Status {response.status_code}: {response.text}")
    
    # Test 3: Skills endpoint
    response, error = make_request("GET", "/skills")
    if error:
        log_test("GET /api/skills", False, error)
    else:
        if response.status_code == 200:
            try:
                data = response.json()
                if data.get("success") and "data" in data:
                    skills = data["data"]
                    if isinstance(skills, dict):
                        log_test("GET /api/skills", True)
                    else:
                        log_test("GET /api/skills", False, f"Skills data should be dict, got: {type(skills)}")
                else:
                    log_test("GET /api/skills", False, f"Unexpected response format: {data}")
            except json.JSONDecodeError:
                log_test("GET /api/skills", False, "Invalid JSON response")
        else:
            log_test("GET /api/skills", False, f"Status {response.status_code}: {response.text}")
    
    # Test 4: Projects endpoint
    response, error = make_request("GET", "/projects")
    if error:
        log_test("GET /api/projects", False, error)
    else:
        if response.status_code == 200:
            try:
                data = response.json()
                if data.get("success") and "data" in data and "total" in data:
                    projects = data["data"]
                    if isinstance(projects, list):
                        log_test("GET /api/projects", True)
                    else:
                        log_test("GET /api/projects", False, f"Projects data should be list, got: {type(projects)}")
                else:
                    log_test("GET /api/projects", False, f"Unexpected response format: {data}")
            except json.JSONDecodeError:
                log_test("GET /api/projects", False, "Invalid JSON response")
        else:
            log_test("GET /api/projects", False, f"Status {response.status_code}: {response.text}")
    
    # Test 5: Education endpoint
    response, error = make_request("GET", "/education")
    if error:
        log_test("GET /api/education", False, error)
    else:
        if response.status_code == 200:
            try:
                data = response.json()
                if data.get("success") and "data" in data:
                    education = data["data"]
                    required_fields = ["degree", "institution", "year"]
                    missing_fields = [field for field in required_fields if field not in education]
                    if missing_fields:
                        log_test("GET /api/education", False, f"Missing fields: {missing_fields}")
                    else:
                        log_test("GET /api/education", True)
                else:
                    log_test("GET /api/education", False, f"Unexpected response format: {data}")
            except json.JSONDecodeError:
                log_test("GET /api/education", False, "Invalid JSON response")
        else:
            log_test("GET /api/education", False, f"Status {response.status_code}: {response.text}")
    
    # Test 6: Experience endpoint
    response, error = make_request("GET", "/experience")
    if error:
        log_test("GET /api/experience", False, error)
    else:
        if response.status_code == 200:
            try:
                data = response.json()
                if data.get("success") and "data" in data:
                    experience = data["data"]
                    if "message" in experience:
                        log_test("GET /api/experience", True)
                    else:
                        log_test("GET /api/experience", False, "Missing 'message' field in experience")
                else:
                    log_test("GET /api/experience", False, f"Unexpected response format: {data}")
            except json.JSONDecodeError:
                log_test("GET /api/experience", False, "Invalid JSON response")
        else:
            log_test("GET /api/experience", False, f"Status {response.status_code}: {response.text}")
    
    # Test 7: Learning Journey endpoint
    response, error = make_request("GET", "/learning-journey")
    if error:
        log_test("GET /api/learning-journey", False, error)
    else:
        if response.status_code == 200:
            try:
                data = response.json()
                if data.get("success") and "data" in data and "total" in data:
                    journey = data["data"]
                    if isinstance(journey, list):
                        log_test("GET /api/learning-journey", True)
                    else:
                        log_test("GET /api/learning-journey", False, f"Journey data should be list, got: {type(journey)}")
                else:
                    log_test("GET /api/learning-journey", False, f"Unexpected response format: {data}")
            except json.JSONDecodeError:
                log_test("GET /api/learning-journey", False, "Invalid JSON response")
        else:
            log_test("GET /api/learning-journey", False, f"Status {response.status_code}: {response.text}")
    
    # Test 8: Experiments endpoint
    response, error = make_request("GET", "/experiments")
    if error:
        log_test("GET /api/experiments", False, error)
    else:
        if response.status_code == 200:
            try:
                data = response.json()
                if data.get("success") and "data" in data and "total" in data:
                    experiments = data["data"]
                    if isinstance(experiments, list):
                        log_test("GET /api/experiments", True)
                    else:
                        log_test("GET /api/experiments", False, f"Experiments data should be list, got: {type(experiments)}")
                else:
                    log_test("GET /api/experiments", False, f"Unexpected response format: {data}")
            except json.JSONDecodeError:
                log_test("GET /api/experiments", False, "Invalid JSON response")
        else:
            log_test("GET /api/experiments", False, f"Status {response.status_code}: {response.text}")
    
    # Test 9: Contact form submission
    contact_data = {
        "name": "Shreeya Patel",
        "email": "shreeya.test@example.com",
        "message": "This is a test message from the automated testing suite. Testing the contact form functionality."
    }
    
    response, error = make_request("POST", "/contact", data=contact_data)
    if error:
        log_test("POST /api/contact", False, error)
    else:
        if response.status_code == 200:
            try:
                data = response.json()
                if data.get("success") and data.get("message") and "id" in data:
                    log_test("POST /api/contact", True)
                    return data["id"]  # Return message ID for admin tests
                else:
                    log_test("POST /api/contact", False, f"Unexpected response format: {data}")
            except json.JSONDecodeError:
                log_test("POST /api/contact", False, "Invalid JSON response")
        else:
            log_test("POST /api/contact", False, f"Status {response.status_code}: {response.text}")
    
    return None

def test_admin_apis():
    """Test all admin APIs that require authentication"""
    print("\n🔐 Testing Admin APIs...")
    
    # Test 1: Admin login
    login_data = {
        "username": "admin",
        "password": "admin123"
    }
    
    response, error = make_request("POST", "/admin/login", data=login_data)
    if error:
        log_test("POST /api/admin/login", False, error)
        return None
    
    if response.status_code == 200:
        try:
            data = response.json()
            if "access_token" in data and data.get("token_type") == "bearer":
                log_test("POST /api/admin/login", True)
                token = data["access_token"]
            else:
                log_test("POST /api/admin/login", False, f"Unexpected response format: {data}")
                return None
        except json.JSONDecodeError:
            log_test("POST /api/admin/login", False, "Invalid JSON response")
            return None
    else:
        log_test("POST /api/admin/login", False, f"Status {response.status_code}: {response.text}")
        return None
    
    # Create authorization header
    auth_headers = {"Authorization": f"Bearer {token}"}
    
    # Test 2: Verify admin token
    response, error = make_request("GET", "/admin/verify", headers=auth_headers)
    if error:
        log_test("GET /api/admin/verify", False, error)
    else:
        if response.status_code == 200:
            try:
                data = response.json()
                if data.get("success") and "admin" in data:
                    log_test("GET /api/admin/verify", True)
                else:
                    log_test("GET /api/admin/verify", False, f"Unexpected response format: {data}")
            except json.JSONDecodeError:
                log_test("GET /api/admin/verify", False, "Invalid JSON response")
        else:
            log_test("GET /api/admin/verify", False, f"Status {response.status_code}: {response.text}")
    
    # Test 3: Update profile (admin)
    profile_update = {
        "name": "Shreeya Patel",
        "headline": "Full Stack Developer & AI Enthusiast",
        "bio": "Updated bio from automated testing suite",
        "highlights": "Updated highlights from testing",
        "profileImage": "https://example.com/profile.jpg",
        "email": "shreeya@example.com",
        "linkedin": "https://linkedin.com/in/shreeya",
        "location": "Odisha, India"
    }
    
    response, error = make_request("PUT", "/admin/profile", data=profile_update, headers=auth_headers)
    if error:
        log_test("PUT /api/admin/profile", False, error)
    else:
        if response.status_code == 200:
            try:
                data = response.json()
                if data.get("success") and data.get("message"):
                    log_test("PUT /api/admin/profile", True)
                else:
                    log_test("PUT /api/admin/profile", False, f"Unexpected response format: {data}")
            except json.JSONDecodeError:
                log_test("PUT /api/admin/profile", False, "Invalid JSON response")
        else:
            log_test("PUT /api/admin/profile", False, f"Status {response.status_code}: {response.text}")
    
    # Test 4: Get contact messages (admin)
    response, error = make_request("GET", "/admin/messages", headers=auth_headers)
    if error:
        log_test("GET /api/admin/messages", False, error)
    else:
        if response.status_code == 200:
            try:
                data = response.json()
                if data.get("success") and "data" in data and "total" in data:
                    messages = data["data"]
                    if isinstance(messages, list):
                        log_test("GET /api/admin/messages", True)
                    else:
                        log_test("GET /api/admin/messages", False, f"Messages data should be list, got: {type(messages)}")
                else:
                    log_test("GET /api/admin/messages", False, f"Unexpected response format: {data}")
            except json.JSONDecodeError:
                log_test("GET /api/admin/messages", False, "Invalid JSON response")
        else:
            log_test("GET /api/admin/messages", False, f"Status {response.status_code}: {response.text}")
    
    # Test 5: Test authentication failure (invalid token)
    invalid_headers = {"Authorization": "Bearer invalid_token"}
    response, error = make_request("GET", "/admin/verify", headers=invalid_headers)
    if error:
        log_test("Authentication failure test", False, error)
    else:
        if response.status_code == 401:
            log_test("Authentication failure test", True)
        else:
            log_test("Authentication failure test", False, f"Expected 401, got {response.status_code}")
    
    return token

def test_error_handling():
    """Test error handling for invalid requests"""
    print("\n⚠️  Testing Error Handling...")
    
    # Test invalid contact form data
    invalid_contact = {
        "name": "",  # Empty name
        "email": "invalid-email",  # Invalid email
        "message": ""  # Empty message
    }
    
    response, error = make_request("POST", "/contact", data=invalid_contact)
    if error:
        log_test("Invalid contact form handling", False, error)
    else:
        if response.status_code in [400, 422]:  # Bad request or validation error
            log_test("Invalid contact form handling", True)
        else:
            log_test("Invalid contact form handling", False, f"Expected 400/422, got {response.status_code}")
    
    # Test non-existent endpoint
    response, error = make_request("GET", "/non-existent-endpoint")
    if error:
        log_test("Non-existent endpoint handling", False, error)
    else:
        if response.status_code == 404:
            log_test("Non-existent endpoint handling", True)
        else:
            log_test("Non-existent endpoint handling", False, f"Expected 404, got {response.status_code}")

def print_summary():
    """Print test summary"""
    print("\n" + "="*60)
    print("📊 TEST SUMMARY")
    print("="*60)
    print(f"✅ Passed: {test_results['passed']}")
    print(f"❌ Failed: {test_results['failed']}")
    print(f"📈 Success Rate: {(test_results['passed'] / (test_results['passed'] + test_results['failed']) * 100):.1f}%")
    
    if test_results['errors']:
        print("\n🔍 FAILED TESTS:")
        for error in test_results['errors']:
            print(f"   • {error}")
    
    print("\n" + "="*60)

def main():
    """Main test execution"""
    print("🚀 Starting Portfolio Backend API Tests")
    print(f"📅 Test Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Test public APIs
    message_id = test_public_apis()
    
    # Test admin APIs
    admin_token = test_admin_apis()
    
    # Test error handling
    test_error_handling()
    
    # Print summary
    print_summary()
    
    # Return exit code based on results
    if test_results['failed'] > 0:
        sys.exit(1)
    else:
        print("🎉 All tests passed!")
        sys.exit(0)

if __name__ == "__main__":
    main()