/*
- display & routes ResultsPage & UploadPag
*/

import { useState } from 'react';
import './App.css';
import UploadPage from './pages/UploadPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  const [ view, setView ] = useState("upload");
  // file: a json element with parsed data from csv
  const [data, setData] = useState([])

  // set view to 'upload'
  const onBack = () => {
    setView("upload");
  }

  // set view to 'results'
  const onResults = (parsedData) => {
    setData(parsedData);
    setView("results");
  }
  
  return (
    <>
      {view === "upload" ? (
        <UploadPage onResults={onResults}/>
      ):(
        <ResultsPage data={data} onBack={onBack}/>
      )
      }
    </>
  )
}

export default App
