
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);
const model = genAI.getGenerativeModel({ model: "gemini-exp-1206",temperature:0 });

const cleanLLMOutput = (text) => {
  let cleanText = text.trim();

  cleanText = cleanText.replace(/```json/i, "").replace(/```/g, "").trim();

  return cleanText;
};

// Function to validate the presence of required fields in the JSON
const validateAnalysis = (analysis) => {
  const requiredFields = [
    "content_categorization",
    "theme_detection",
    "patterns_and_relationships",
    "participant_analysis",
    "keyword_analysis",
    "sentiment_analysis",
    "media_sharing_insights",
  ];

  for (const field of requiredFields) {
    if (!Object.prototype.hasOwnProperty.call(analysis.chat_data_analysis, field)) {
      throw new Error(`Missing field: ${field}`);
    }
  }
};

export const analyzeContent = async (content, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const sample_output = `
      {
        "chat_data_analysis": {
          "content_categorization": [
            {
              "category": "Inspirational Quotes",
              "items": [
                "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
                "The best way to predict the future is to create it. - Peter Drucker"
              ]
            },
            {
              "category": "Personal Reflections",
              "items": [
                "Note to self: Keep pushing, even when the excitement fades.",
                "Weekend reflection: Finding clarity and purpose."
              ]
            },
            {
              "category": "Ideas & Brainstorming",
              "items": [
                "Random thought: What if creativity is connecting old ideas uniquely?",
                "Brain dump: List of startup ideas."
              ]
            },
            {
              "category": "External Resources",
              "items": [
                "https://medium.com/article",
                "https://www.youtube.com/watch?v=12345",
                "https://spotify.com/song"
              ]
            }
          ],
          "theme_detection": [
            "Motivation and Self-Improvement",
            "Creative Thinking and Innovation",
            "Proactive Learning and Development"
          ],
          "patterns_and_relationships": [
            {
              "pattern": "Frequent Sharing of Quotes",
              "description": "Users rely on inspirational quotes to stay motivated."
            },
            {
              "pattern": "Alternation Between Reflections and Planning",
              "description": "The chat alternates between reflective thoughts and actionable ideas."
            },
            {
              "pattern": "Strong Focus on Learning",
              "description": "Many external resources are shared for self-education."
            }
          ],
          "participant_analysis": {
            "top_contributors": [
              { "participant": "John", "message_count": 120 },
              { "participant": "Jane", "message_count": 95 },
              { "participant": "Doe", "message_count": 50 }
            ],
            "message_distribution": [
              { "participant": "John", "percentage": 50 },
              { "participant": "Jane", "percentage": 40 },
              { "participant": "Doe", "percentage": 10 }
            ]
          },

          "keyword_analysis": {
            "most_frequent_words": [
              { "word": "motivation", "count": 15 },
              { "word": "creativity", "count": 12 },
              { "word": "ideas", "count": 10 },
              { "word": "learning", "count": 8 }
            ],
            "keyword_clusters": [
              {
                "cluster": "Self-Improvement",
                "keywords": ["motivation", "growth", "success"]
              },
              {
                "cluster": "Creativity",
                "keywords": ["ideas", "innovation", "design"]
              }
            ]
          },
          "sentiment_analysis": {
            "overall_sentiment": {
              "positive": 60,
              "neutral": 30,
              "negative": 10
            },
            "sentiment_per_participant": [
              { "participant": "John", "positive": 50, "neutral": 10, "negative": 5 },
              { "participant": "Jane", "positive": 20, "neutral": 10, "negative": 5 },
              { "participant": "Doe", "positive": 10, "neutral": 5, "negative": 0 }
            ]
          },
          "media_sharing_insights": {
            "media_counts": {
              "images": 10,
              "videos": 5,
              "audio": 2
            },
            "top_shared_links": [
              "https://example.com/article1",
              "https://example.com/article2"
            ]
          }
        }
      }
      `;

      const prompt = `
    Analyze the following WhatsApp chat data and provide the following insights in JSON format only:
    1. Content categorization (group similar messages into categories with representative examples).
    2. Theme detection (identify overarching themes or topics discussed).
    3. Patterns and relationships (describe significant recurring patterns and the relationships between categories or themes).
    4. Participant analysis:
       - Top contributors (sorted by message count).
       - Message distribution among participants.
    5. Keyword analysis:
       - Most frequently used words (excluding common stop words).
       - Group messages by keyword clusters.
    6. Sentiment analysis:
       - Overall chat sentiment (positive, neutral, negative).
       - Sentiment breakdown per participant.
    7. Media sharing insights:
       - Count of media types (images, videos, audio).
       - Top shared links.
    Chat Data:
    ${content}

    Example Output:
    ${sample_output}
    
    `;

      const result = await model.generateContent(prompt);

      const analysisText = result.response.text();

      const cleanText = cleanLLMOutput(analysisText);


      let parsedAnalysis;
      try {
        parsedAnalysis = JSON.parse(cleanText);
      } catch (parseError) {
        console.error("JSON Parsing Error:", parseError.message);
        console.error("LLM Output:", cleanText);
        throw new Error("Invalid JSON format received from Gemini API.");
      }

      try {
        validateAnalysis(parsedAnalysis);
      } catch (validationError) {
        console.error("Validation Error:", validationError.message);
        throw new Error("JSON validation failed.");
      }

      return parsedAnalysis;
    } catch (error) {
      console.error("Error during content analysis:", error);
      throw new Error("Failed to analyze content using Gemini API.");
    }
  }
};




