import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, Pill, Search } from 'lucide-react';
import './App.css';

const DentalSymptomChecker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [result, setResult] = useState(null);
  const [preventionTips, setPreventionTips] = useState([]);
  const [drugInfo, setDrugInfo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/symptoms')
      .then(response => response.json())
      .then(data => setSymptoms(data))
      .catch(error => console.error('Error fetching symptoms:', error));

    fetch('http://localhost:3000/api/prevention-tips')
      .then(response => response.json())
      .then(data => setPreventionTips(data))
      .catch(error => console.error('Error fetching prevention tips:', error));
  }, []);

  const handleSymptomChange = async (symptomId) => {
    setSelectedSymptom(symptomId);
    if (symptomId) {
      try {
        const symptomResponse = await fetch(`http://localhost:3000/api/symptoms/${symptomId}`);
        const symptomData = await symptomResponse.json();
        setResult(symptomData);
        
        const drugResponse = await fetch(`http://localhost:3000/api/drug-info/${symptomId}`);
        const drugData = await drugResponse.json();
        setDrugInfo(drugData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      setResult(null);
      setDrugInfo(null);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching symptoms:', error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Dental Symptom Checker</h1>
      
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search symptoms..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          <Search size={20} />
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map(result => (
              <li key={result.id} onClick={() => handleSymptomChange(result.id)} className="search-result-item">
                {result.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="symptom-checker">
        <div className="symptom-select">
          <label htmlFor="symptom-select">Or select a symptom:</label>
          <select
            id="symptom-select"
            value={selectedSymptom}
            onChange={(e) => handleSymptomChange(e.target.value)}
          >
            <option value="">Select a symptom</option>
            {symptoms.map(symptom => (
              <option key={symptom.id} value={symptom.id}>{symptom.name}</option>
            ))}
          </select>
        </div>

        {result && (
          <div className="symptom-result">
            <h2>{result.name}</h2>
            
            <InfoSection icon={<AlertCircle className="icon" />} title="Possible Causes" items={result.possibleCauses} />
            <InfoSection icon={<Info className="icon" />} title="Common Symptoms" items={result.symptoms} />
            
            <div className="info-section">
              <CheckCircle className="icon" />
              <div>
                <h3>Advice</h3>
                <p>{result.advice}</p>
              </div>
            </div>
            
            <div className="info-section">
              <AlertTriangle className="icon" />
              <div>
                <h3>Urgency</h3>
                <p className={`urgency-${result.urgency.toLowerCase()}`}>{result.urgency}</p>
              </div>
            </div>
            
            <InfoSection icon={<CheckCircle className="icon" />} title="Preventive Measures" items={result.preventiveMeasures} />
            
            {drugInfo && (
              <div className="drug-info">
                <h3><Pill className="icon" /> Medication Information</h3>
                {drugInfo.commonMedications && drugInfo.commonMedications.length > 0 && (
                  <div>
                    <h4>Common Over-the-Counter Medications</h4>
                    <ul>
                      {drugInfo.commonMedications.map((med, index) => (
                        <li key={index}>{med}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {drugInfo.relatedDrugs && drugInfo.relatedDrugs.length > 0 && (
                  <div>
                    <h4>Related Prescription Medications</h4>
                    <ul>
                      {drugInfo.relatedDrugs.map((drug, index) => (
                        <li key={index}>
                          <strong>{drug.brand_name}</strong> ({drug.generic_name}): {drug.indications_and_usage}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="prevention-tips">
        <h2>General Prevention Tips</h2>
        <ul>
          {preventionTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const InfoSection = ({ icon, title, items }) => (
  <div className="info-section">
    {icon}
    <div>
      <h3>{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default DentalSymptomChecker;