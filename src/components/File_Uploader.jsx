import  { useState } from "react";
import PropTypes from 'prop-types';

const FileUploader = ({ onFileUpload }) => {
  const [error, setError] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = () => onFileUpload(reader.result);
      reader.readAsText(file);
    } else {
      setError("Please upload a valid .txt file.");
    }
  };

  return (
    <>
    

    <div className="flex justify-center items-center -mt-16 bg-slate-200 rounded-xl p-4 w-full max-w-lg mx-auto">
          <div className="text-center">
            <label className="block text-xl font-semibold mb-3 animate__animated animate__fadeInUp">Upload Chat File Here :</label>
            <div className="flex justify-center items-center">
              <input
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                className=" border-2 border-black p-2 rounded-md shadow-sm transition-all duration-300 ease-in-out hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 animate__animated animate__fadeInLeft"
              />
              {error && <div className="text-red-500">{error}</div>}
            </div>
          </div>
        </div>

    </>

    
  );
};
FileUploader.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
};

export default FileUploader;

