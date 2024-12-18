# Chat Lens

Chat Lens is an intuitive and interactive web application designed to analyze WhatsApp chat data. Powered by AI and modern visualization tools, it extracts meaningful insights, detects patterns, and presents them through aesthetically pleasing graphs and charts. The project leverages technologies like React, Tailwind CSS, and Recharts for a seamless user experience.

## Features

- **File Upload**: Upload exported WhatsApp chat files in text format.
- **Data Parsing**: Automatically parses chat files to extract timestamps, users, and messages.
- **Data Analysis**:
  - Content Categorization: Groups similar messages into categories.
  - Theme Detection: Identifies overarching themes and topics.
  - Participant Analysis: Highlights top contributors and their activity levels.
  - Sentiment Analysis: Evaluates the sentiment (positive, neutral, negative) of chats.
  - Keyword Analysis: Extracts frequently used words and clusters related keywords.
  - Media Sharing Insights: Provides detailed counts of shared media types (images, videos, audio) and highlights the most shared links.
  - Patterns and Relationships: Identifies significant recurring patterns and describes relationships between categories and themes.
- **Interactive Visualizations**:
  - Bar charts and pie charts for intuitive data representation.
  - Keyword clusters and top-shared links.

## Tech Stack

- **Frontend**:
  - React (via Vite for faster builds)
  - Tailwind CSS for styling
  - Recharts for dynamic charts and graphs
- **AI Integration**:
  - Gemini API for text analysis and sentiment evaluation

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/chat-lens.git
   cd chat-lens
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   VITE_GEMINI_API=your_gemini_api_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```



## Usage

1. **Upload a Chat File**: Drag and drop or select a WhatsApp chat export file.
2. **Data Parsing**: The application parses the uploaded file and extracts relevant data.
3. **AI Analysis**: The Gemini API processes the parsed data to generate insights.
4. **Visualization**: View interactive graphs and charts showcasing patterns, sentiment, and activity trends.

## Approach

### Problem-Solving Strategy

The project focuses on simplifying the complex task of analyzing unstructured chat data using modern tools and methodologies.

1. **Data Parsing**:

   - Opted for a regular expression-based parser to handle WhatsApp’s structured message format (e.g., timestamps, users, and messages).
   - This ensures consistent parsing even for multi-line messages.

2. **AI-Powered Analysis**:

   - Leveraged Gemini API for its advanced capabilities in sentiment analysis, keyword extraction, and content categorization.
   - Chose an LLM-based approach to handle the variety and subjectivity in chat data.

3. **Visualization**:

   - Used Recharts for dynamic and responsive charts that integrate well with React.
   - Tailwind CSS is chosen for its modern design paradigms and ease of implementation.
   - Focused on user-centric visuals such as activity heatmaps, keyword clusters, media insights, and recurring patterns to make insights more accessible.

4. **UI/UX Design**:

   - Added a welcoming hero section to introduce the application’s purpose.
   - Ensured responsiveness for a seamless experience across devices.

### Why These Choices?

- **React**: Provides a modular and scalable architecture for building interactive UIs.
- **Tailwind CSS**: Enables rapid styling with a utility-first approach.
- **Gemini API**: Leverages the power of LLMs for nuanced analysis, making the application more insightful and intelligent.
- **Recharts**: Simplifies the integration of interactive data visualizations in React apps.

## Screenshots

![Screenshot 1](https://github.com/devampatel03/Pattern-Explorer/blob/main/src/assets/chat-1.png)
![Screenshot 2](https://github.com/devampatel03/Pattern-Explorer/blob/main/src/assets/chat-2.png)
![Screenshot 3](https://github.com/devampatel03/Pattern-Explorer/blob/main/src/assets/chat-3.png)
![Screenshot 4](https://github.com/devampatel03/Pattern-Explorer/blob/main/src/assets/chat-4.png)
![Screenshot 5](https://github.com/devampatel03/Pattern-Explorer/blob/main/src/assets/chat-5.png)



## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Commit your changes and push the branch.
4. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Gemini API](https://developers.generative-language-api.com/)

