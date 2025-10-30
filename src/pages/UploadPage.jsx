/*
- file upload
- file validation
- triggers CSV parsing
- switch to ResultsPage if parsing success
*/

import { useState } from 'react';
import parseCSV from '../utils/parseCSV';
import './UploadPage.css'

const UploadPage = ({ onResults }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");

    // handle file change
    const handleChange = (e) => {
        const selected = e.target.files?.[0];
        if (!selected) return;
        setFile(selected);
        setError("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // check if user has uploaded a file
        if (!file) {
            setError("Please select a file.");
            return;
        }

        //file type check
        if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
            setError("Invalid file type. Only .csv is allowed.");
            return;
        }
        
        // parse file
        const result = await parseCSV(file);

        // parsing failure: catch error
        if (!result.ok) {
            setError(result.error);
            setFile(null);
            return;
        }

        // parsing success
        onResults(result.data);
    }

    return (
        <div className="page-wrapper">
            <h2>Upload your CSV file.</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".csv" onChange={handleChange}/>
                <button type="submit">submit</button>
            </form>
            {error !== "" && <h3>{error}</h3>}
        </div>
    );

}

export default UploadPage;