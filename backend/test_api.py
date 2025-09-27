#!/usr/bin/env python3
"""
Simple test script to verify the refactored backend API
"""

import requests
import json
import time

API_BASE_URL = "http://localhost:8000"

def test_endpoints():
    """Test all API endpoints"""
    
    print("🧪 Testing Refactored Backend API")
    print("=" * 50)
    
    # Test 1: Root endpoint
    print("\n1. Testing root endpoint...")
    try:
        response = requests.get(f"{API_BASE_URL}/")
        if response.status_code == 200:
            print("✅ Root endpoint working")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Root endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Root endpoint error: {e}")
    
    # Test 2: Health check
    print("\n2. Testing health endpoint...")
    try:
        response = requests.get(f"{API_BASE_URL}/api/v1/health/")
        if response.status_code == 200:
            print("✅ Health endpoint working")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Health endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Health endpoint error: {e}")
    
    # Test 3: Models endpoint
    print("\n3. Testing models endpoint...")
    try:
        response = requests.get(f"{API_BASE_URL}/api/v1/models/")
        if response.status_code == 200:
            print("✅ Models endpoint working")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Models endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Models endpoint error: {e}")
    
    # Test 4: Chat endpoint (if Ollama is running)
    print("\n4. Testing chat endpoint...")
    try:
        chat_data = {
            "message": "Hello, how are you?",
            "model": "llama2"
        }
        response = requests.post(
            f"{API_BASE_URL}/api/v1/chat/", 
            json=chat_data,
            timeout=30
        )
        if response.status_code == 200:
            print("✅ Chat endpoint working")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Chat endpoint failed: {response.status_code}")
            print(f"   Error: {response.text}")
    except Exception as e:
        print(f"❌ Chat endpoint error: {e}")
    
    print("\n" + "=" * 50)
    print("🏁 API Testing Complete!")

if __name__ == "__main__":
    test_endpoints()
