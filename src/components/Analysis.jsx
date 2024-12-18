import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { analyzeContent } from "../utils/geminiAPI";

const Analysis = ({ parsedData, onAnalysisComplete }) => {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      const rawText = parsedData.map((item) => item.message).join("\n");
      const result = await analyzeContent(rawText);
      setAnalysis(result);
      onAnalysisComplete(result);
    };
    fetchAnalysis();
  }, [parsedData, onAnalysisComplete]);

  return (analysis ? <pre>{JSON.stringify(analysis, null, 2)}</pre>
   :
   <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
      <div className="bg-white p-6 rounded-md text-center">
              <h2 className="text-xl font-bold mb-4 mt-3">Analyzing Chat ...</h2>
              <p>Will take a few seconds to complete</p>
            </div>
    </div>
  )
   
};
Analysis.propTypes = {
  parsedData: PropTypes.array.isRequired,
  onAnalysisComplete: PropTypes.func.isRequired,
};

export default Analysis;

