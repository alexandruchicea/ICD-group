// Simple test script to verify the API endpoints
// Run this after starting the server: node test-api.js

const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

async function testHealthEndpoint() {
  try {
    console.log('🔍 Testing health endpoint...');
    const response = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health endpoint:', response.data);
  } catch (error) {
    console.log('❌ Health endpoint failed:', error.message);
  }
}

async function testContactEndpoint() {
  try {
    console.log('\n🔍 Testing contact endpoint...');
    const response = await axios.post(`${BASE_URL}/api/contact`, {
      recaptchaToken: 'test_token',
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message'
    });
    console.log('✅ Contact endpoint response:', response.data);
  } catch (error) {
    if (error.response) {
      console.log('❌ Contact endpoint failed (expected):', error.response.data);
    } else {
      console.log('❌ Contact endpoint failed:', error.message);
    }
  }
}

async function runTests() {
  console.log('🧪 Running API tests...\n');
  
  await testHealthEndpoint();
  await testContactEndpoint();
  
  console.log('\n✨ Tests completed!');
  console.log('Note: Contact endpoint will fail without valid reCAPTCHA token (this is expected)');
}

runTests();
