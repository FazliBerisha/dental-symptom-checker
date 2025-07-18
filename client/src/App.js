import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, Pill, Search } from 'lucide-react';
import './App.css';

const DentalSymptomChecker = () => {
  const [symptoms, setSymptoms] = useState([
    { id: 'toothache', name: 'Toothache / Tooth Pain' },
    { id: 'sensitivity', name: 'Tooth Sensitivity' },
    { id: 'bleeding-gums', name: 'Bleeding Gums' },
    { id: 'swollen-gums', name: 'Swollen Gums' },
    { id: 'bad-breath', name: 'Bad Breath (Halitosis)' },
    { id: 'jaw-pain', name: 'Jaw Pain / TMJ' },
    { id: 'loose-tooth', name: 'Loose Tooth' },
    { id: 'cracked-tooth', name: 'Cracked or Chipped Tooth' },
    { id: 'dry-mouth', name: 'Dry Mouth' },
    { id: 'mouth-sores', name: 'Mouth Sores / Ulcers' }
  ]);
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [result, setResult] = useState(null);
  const [preventionTips, setPreventionTips] = useState([
    'Brush your teeth twice daily with fluoride toothpaste',
    'Floss daily to remove plaque between teeth',
    'Use an antibacterial mouthwash to reduce bacteria',
    'Limit sugary and acidic foods and drinks',
    'Visit your dentist regularly for checkups and cleanings',
    'Replace your toothbrush every 3-4 months',
    'Avoid tobacco products and excessive alcohol consumption',
    'Drink plenty of water throughout the day',
    'Consider a mouth guard if you grind your teeth at night',
    'Eat a balanced diet rich in calcium and vitamins'
  ]);
  const [drugInfo, setDrugInfo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    
    // Try to fetch from backend, but fall back to hardcoded data
    fetch(`${API_BASE}/api/symptoms`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          setSymptoms(data);
        }
      })
      .catch(error => {
        console.log('Using default symptoms (backend not available)');
        // Keep hardcoded symptoms if backend fails
      });

    fetch(`${API_BASE}/api/prevention-tips`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          setPreventionTips(data);
        }
      })
      .catch(error => {
        console.log('Using default prevention tips (backend not available)');
        // Keep hardcoded tips if backend fails
      });
  }, []);

  const handleSymptomChange = async (symptomId) => {
    const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    setSelectedSymptom(symptomId);
    if (symptomId) {
      try {
        const symptomResponse = await fetch(`${API_BASE}/api/symptoms/${symptomId}`);
        const symptomData = await symptomResponse.json();
        setResult(symptomData);
        
        const drugResponse = await fetch(`${API_BASE}/api/drug-info/${symptomId}`);
        const drugData = await drugResponse.json();
        setDrugInfo(drugData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Provide sample data if backend is not available
        const sampleData = getSampleSymptomData(symptomId);
        setResult(sampleData);
        setDrugInfo({
          commonMedications: ['Ibuprofen', 'Acetaminophen', 'Aspirin'],
          relatedDrugs: []
        });
      }
    } else {
      setResult(null);
      setDrugInfo(null);
    }
  };

  const getSampleSymptomData = (symptomId) => {
    const symptomName = symptoms.find(s => s.id === symptomId)?.name || 'Unknown Symptom';
    
    const sampleData = {
      'toothache': {
        name: 'Toothache / Tooth Pain',
        possibleCauses: ['Tooth decay', 'Dental abscess', 'Cracked tooth', 'Exposed tooth root'],
        symptoms: ['Sharp or throbbing pain', 'Pain when biting', 'Sensitivity to hot/cold', 'Swelling around tooth'],
        advice: 'Rinse with warm salt water and take over-the-counter pain relievers. Avoid very hot or cold foods.',
        urgency: 'Moderate',
        preventiveMeasures: ['Regular dental checkups', 'Proper oral hygiene', 'Limit sugary foods', 'Use fluoride toothpaste']
      },
      'sensitivity': {
        name: 'Tooth Sensitivity',
        possibleCauses: ['Worn enamel', 'Exposed tooth roots', 'Cavities', 'Cracked teeth'],
        symptoms: ['Sharp pain with hot/cold foods', 'Discomfort with sweet foods', 'Pain when brushing'],
        advice: 'Use desensitizing toothpaste and avoid acidic foods. Consider a soft-bristled toothbrush.',
        urgency: 'Low',
        preventiveMeasures: ['Use fluoride mouthwash', 'Gentle brushing technique', 'Avoid acidic foods', 'Regular dental visits']
      }
    };

    return sampleData[symptomId] || {
      name: symptomName,
      possibleCauses: ['Various dental conditions', 'Poor oral hygiene', 'Underlying health issues'],
      symptoms: ['Discomfort or pain', 'Changes in mouth appearance', 'Difficulty eating or speaking'],
      advice: 'Consult with a dental professional for proper diagnosis and treatment.',
      urgency: 'Moderate',
      preventiveMeasures: ['Maintain good oral hygiene', 'Regular dental checkups', 'Healthy diet', 'Avoid tobacco']
    };
  };

  const handleSearch = async () => {
    const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    try {
      const response = await fetch(`${API_BASE}/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching symptoms:', error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">DentaCheck</h1>
      
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
          <label htmlFor="symptom-select">Common Symptoms - Select one:</label>
          <select
            id="symptom-select"
            value={selectedSymptom}
            onChange={(e) => handleSymptomChange(e.target.value)}
          >
            <option value="">Choose a common dental symptom...</option>
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
                <p className={`urgency-${result.urgency ? result.urgency.toLowerCase() : 'low'}`}>{result.urgency || 'Low'}</p>
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
        {items && items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default DentalSymptomChecker;