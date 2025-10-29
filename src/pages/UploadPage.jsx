import { useState } from 'react';
import parseCSV from '../utils/parseCSV';

const UploadPage = ({ onResults }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // handle file change
    const handleChange = (e) => {
        const selected = e.target.files?.[0];
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
        setLoading(true);
        const result = await parseCSV(file);
        setLoading(false);

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
        <>
            <h2>Upload you're CSV file.</h2>
            <form onSubmit={handleSubmit}>
                <input key={file? file.name : 'empty'} type="file" accept=".csv" onChange={handleChange}/>
                <button type="submit">submit</button>
            </form>
            {error !== "" && <h3>{error}</h3>}
        </>
    );

}

export default UploadPage;