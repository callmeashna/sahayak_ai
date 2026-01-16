import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * Verify and categorize a task using Gemini AI
 */
export const verifyTaskWithGemini = async (taskData) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
You are a task verification assistant for a hyper-local task marketplace in Kerala, India.
Analyze the following task and provide:
1. Is this a valid, reasonable task? (true/false)
2. Suggested category (home_maintenance, healthcare, delivery, caregiving, tech_support, other)
3. Any safety concerns or red flags
4. Suggestions to improve the task description

Task Details:
Title: ${taskData.title}
Description: ${taskData.description}
Category: ${taskData.category}

Respond in JSON format:
{
  "isValid": boolean,
  "suggestedCategory": string,
  "safetyConcerns": [string],
  "suggestions": [string]
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // Fallback if AI doesn't respond properly
    return {
      isValid: true,
      suggestedCategory: taskData.category,
      safetyConcerns: [],
      suggestions: []
    };
  } catch (error) {
    console.error('Gemini AI verification error:', error);
    // Graceful fallback
    return {
      isValid: true,
      suggestedCategory: taskData.category,
      safetyConcerns: [],
      suggestions: []
    };
  }
};

/**
 * Match a task to a potential helper using Gemini AI
 */
export const matchTaskToHelper = async (task, user) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
You are a matching assistant for a hyper-local task marketplace.
Evaluate how well this helper matches the task requirements.

Task:
Title: ${task.title}
Description: ${task.description}
Category: ${task.category}
Urgency: ${task.urgency}

Helper Profile:
Name: ${user.name}
Skills: ${user.skills?.join(', ') || 'None listed'}
Trust Score: ${user.trustScore}
Completed Tasks: ${user.completedTasks || 0}

Provide a match score (0-100) and reasoning.
Respond in JSON format:
{
  "matchScore": number,
  "reasoning": string,
  "recommendations": [string]
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return parsed.matchScore || 50;
    }
    
    return 50; // Default match score
  } catch (error) {
    console.error('Gemini AI matching error:', error);
    return 50; // Default match score
  }
};

/**
 * Verify user information using Gemini AI
 */
export const verifyUserWithGemini = async (userData) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
You are a user verification assistant for a trust-based marketplace.
Analyze the user registration information for any red flags.

User Data:
Name: ${userData.name}
Email: ${userData.email}
Phone: ${userData.phone}
Location: ${userData.location?.city || 'Not provided'}

Check for:
1. Obvious fake/spam patterns
2. Suspicious information
3. Professional appearance

Respond in JSON format:
{
  "isValid": boolean,
  "notes": string
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return { isValid: true, notes: 'Verification pending' };
  } catch (error) {
    console.error('Gemini AI user verification error:', error);
    return { isValid: true, notes: 'Verification pending' };
  }
};

/**
 * Generate trust score insights using Gemini AI
 */
export const generateTrustInsights = async (userHistory) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
Analyze this user's activity history and provide trust insights.

Completed Tasks: ${userHistory.completedTasks}
Average Rating: ${userHistory.avgRating}
Total Reviews: ${userHistory.totalReviews}
Response Time: ${userHistory.avgResponseTime} hours
Cancellation Rate: ${userHistory.cancellationRate}%

Provide recommendations to improve trust score.
Respond with 3-5 specific, actionable recommendations.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini AI insights error:', error);
    return 'Complete more tasks and maintain good ratings to improve your trust score.';
  }
};
