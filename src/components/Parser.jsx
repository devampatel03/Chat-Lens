import  { useEffect } from "react";
import PropTypes from 'prop-types';

const Parser = ({ rawContent, onParseComplete }) => {
  useEffect(() => {
    if (rawContent) {
      const lines = rawContent.split("\n");
      const parsedData = lines.map((line) => {
        const match = line.match(/^\[(.*?)\] (.*?): (.*)$/);
        if (match) {
          return { timestamp: match[1], user: match[2], message: match[3] };
        }
        return null;
      }).filter(Boolean);
      onParseComplete(parsedData);
    }
  }, [rawContent, onParseComplete]);

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
      <div className="bg-white p-6 rounded-md text-center">
              <h2 className="text-xl font-bold mb-4 mt-3">Parsing Chat ...</h2>
            </div>
    </div>
  );
;
};
Parser.propTypes = {
  rawContent: PropTypes.string.isRequired,
  onParseComplete: PropTypes.func.isRequired,
};

export default Parser;


