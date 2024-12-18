


import { useState } from "react";
import FileUploader from "./components/File_Uploader";
import Parser from "./components/Parser";
import Analysis from "./components/Analysis";
import Visualization from "./components/Visualization";

const App = () => {
  const [rawContent, setRawContent] = useState("");
  const [parsedData, setParsedData] = useState([]);
  const [analysis, setAnalysis] = useState(null);

  return (
    <div className="min-h-screen">


      {/* Welcome Section */}

      {!rawContent && (
        <div className=" text-white py-20">
          <div className="container mx-auto px-6 text-center space-y-10">
            <h1 className="text-6xl font-extrabold text-blue-400">Welcome to Chat Lens !</h1>
            <p className="text-lg">
              Your AI-powered solution to uncover insights from WhatsApp chat data. Analyze patterns, detect sentiments, and visualize trends effortlessly.
            </p>
            <div className="flex flex-wrap justify-center mt-10 gap-6 bg-gray-900 p-20 rounded-full">
              {/* Feature Cards */}
              <div className=" bg-amber-500 text-black rounded-lg shadow-lg p-6 max-w-sm">
                <h3 className="text-2xl font-bold mb-4">Upload Chat Files</h3>
                <p>Simply upload your exported chat files to get started. Our parser will handle everything for you!</p>
              </div>
              <div className="  bg-amber-500  text-black rounded-lg shadow-lg p-6 max-w-sm">
                <h3 className="text-2xl font-bold mb-4">Analyze Chat Data</h3>
                <p>Our AI engine dives deep into your chat history to extract meaningful insights and trends.</p>
              </div>
              <div className="bg-amber-500 text-black rounded-lg shadow-lg p-6 max-w-sm">
                <h3 className="text-2xl font-bold mb-4">Visualize Results</h3>
                <p>View engaging, interactive charts and graphs that make your chat data come alive.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Workflow */}
      <div className="container mx-auto py-10 px-6">
        {!rawContent && <FileUploader onFileUpload={setRawContent} />}
        {rawContent && !parsedData.length && (
          <Parser rawContent={rawContent} onParseComplete={setParsedData} />
        )}
        {parsedData.length > 0 && !analysis && (
          <Analysis parsedData={parsedData} onAnalysisComplete={setAnalysis} />
        )}
        {analysis && <Visualization analysis={analysis} />}
      </div>
    </div>
  );
};

export default App;
