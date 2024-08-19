const express = require('express');
const cors = require('cors');
const axios = require('axios');
const symptoms = require('./symptoms'); // Import symptoms from separate file

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API endpoint to get all symptoms
app.get('/api/symptoms', (req, res) => {
  res.json(symptoms.map(symptom => ({ id: symptom.id, name: symptom.name })));
});

// API endpoint for checking a specific symptom
app.get('/api/symptoms/:id', (req, res) => {
  const symptom = symptoms.find(s => s.id === req.params.id);
  if (symptom) {
    res.json(symptom);
  } else {
    res.status(404).json({ error: "Symptom not found" });
  }
});

// API endpoint for getting prevention tips
app.get('/api/prevention-tips', (req, res) => {
  const tips = symptoms.reduce((acc, symptom) => {
    return [...acc, ...symptom.preventiveMeasures];
  }, []);
  const uniqueTips = [...new Set(tips)];
  res.json(uniqueTips);
});

// Updated endpoint to fetch drug information from OpenFDA
app.get('/api/drug-info/:id', async (req, res) => {
    const symptom = symptoms.find(s => s.id === req.params.id);
    if (!symptom) {
      return res.status(404).json({ error: "Symptom not found" });
    }
  
    const conditions = symptom.relatedConditions.join('+');
    try {
      const response = await axios.get(`https://api.fda.gov/drug/label.json?search=indications_and_usage:(${conditions})&limit=5`);
      const drugs = response.data.results.map(result => ({
        brand_name: result.openfda.brand_name ? result.openfda.brand_name[0] : 'N/A',
        generic_name: result.openfda.generic_name ? result.openfda.generic_name[0] : 'N/A',
        indications_and_usage: result.indications_and_usage ? result.indications_and_usage[0] : 'N/A'
      }));
      res.json({
        commonMedications: symptom.commonMedications,
        relatedDrugs: drugs
      });
    } catch (error) {
      console.error('Error fetching drug information:', error);
      res.status(500).json({ error: 'Failed to fetch drug information' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  app.get('/api/search', (req, res) => {
    const query = req.query.q.toLowerCase();
    const results = symptoms.filter(symptom => 
      symptom.name.toLowerCase().includes(query) ||
      symptom.symptoms.some(s => s.toLowerCase().includes(query)) ||
      symptom.possibleCauses.some(c => c.toLowerCase().includes(query))
    );
    res.json(results.map(({ id, name }) => ({ id, name })));
  });