const symptoms = [
  {
    id: 'toothache',
    name: 'Toothache',
    possibleCauses: ['Tooth decay', 'Dental abscess', 'Fractured tooth', 'Gum disease', 'Infected dental pulp'],
    symptoms: ['Persistent pain', 'Sharp or throbbing pain', 'Pain when biting', 'Sensitivity to hot or cold', 'Swelling around the tooth'],
    advice: 'Rinse with warm salt water to soothe the area. Use over-the-counter pain relievers. If pain persists for more than 1-2 days or is severe, see a dentist immediately.',
    urgency: 'Moderate',
    preventiveMeasures: ['Regular brushing and flossing', 'Routine dental check-ups', 'Avoiding sugary foods and drinks', 'Using fluoride toothpaste'],
    relatedConditions: ['dental pain', 'oral inflammation'],
    commonMedications: ['ibuprofen', 'acetaminophen']
  },
  {
    id: 'sensitivity',
    name: 'Tooth Sensitivity',
    possibleCauses: ['Worn tooth enamel', 'Exposed tooth root', 'Cavity', 'Cracked or chipped tooth', 'Recent dental procedure'],
    symptoms: ['Sharp pain when consuming hot, cold, or sweet items', 'Pain when brushing or flossing', 'Discomfort when breathing cold air'],
    advice: 'Use toothpaste designed for sensitive teeth. Avoid very hot or cold foods/drinks. If sensitivity persists or worsens, consult a dentist as it may indicate a more serious problem.',
    urgency: 'Low',
    preventiveMeasures: ['Use a soft-bristled toothbrush', 'Avoid acidic foods and drinks', 'Use fluoride toothpaste', 'Do not brush too hard'],
    relatedConditions: ['dentin hypersensitivity', 'enamel erosion'],
    commonMedications: ['potassium nitrate', 'strontium chloride']
  },
  {
    id: 'bleeding_gums',
    name: 'Bleeding Gums',
    possibleCauses: ['Gingivitis', 'Periodontitis', 'Vigorous brushing', 'Blood thinning medications', 'Vitamin K deficiency'],
    symptoms: ['Bleeding while brushing or flossing', 'Red or swollen gums', 'Bad breath', 'Receding gums'],
    advice: 'Improve oral hygiene by brushing twice daily and flossing. Use an antiseptic mouthwash. If bleeding persists for more than a week, consult a dentist.',
    urgency: 'Moderate',
    preventiveMeasures: ['Gentle brushing with a soft-bristled toothbrush', 'Regular flossing', 'Balanced diet rich in vitamins C and K', 'Quit smoking'],
    relatedConditions: ['gingivitis', 'periodontitis'],
    commonMedications: ['chlorhexidine', 'hydrogen peroxide']
  },
  {
    id: 'bad_breath',
    name: 'Bad Breath (Halitosis)',
    possibleCauses: ['Poor oral hygiene', 'Gum disease', 'Dry mouth', 'Tobacco use', 'Certain foods', 'Medical conditions'],
    symptoms: ['Unpleasant mouth odor', 'Bad taste in mouth', 'Dry mouth', 'White coating on tongue'],
    advice: 'Brush teeth and tongue twice daily, floss regularly, and use mouthwash. Stay hydrated and avoid tobacco. If persistent, consult a dentist to rule out underlying issues.',
    urgency: 'Low',
    preventiveMeasures: ['Regular brushing and flossing', 'Tongue cleaning', 'Staying hydrated', 'Avoiding tobacco and strong-smelling foods'],
    relatedConditions: ['xerostomia', 'periodontal disease'],
    commonMedications: ['artificial saliva', 'antibacterial mouthwash']
  },
  {
    id: 'jaw_pain',
    name: 'Jaw Pain',
    possibleCauses: ['TMJ disorders', 'Teeth grinding (Bruxism)', 'Dental abscess', 'Arthritis', 'Injury'],
    symptoms: ['Pain or tenderness in jaw', 'Difficulty chewing', 'Clicking or popping sound when opening mouth', 'Locking of the jaw joint'],
    advice: 'Apply ice or heat to the affected area. Eat soft foods and avoid wide mouth movements. If pain persists or worsens, consult a dentist or doctor.',
    urgency: 'Moderate',
    preventiveMeasures: ['Stress management', 'Wearing a night guard if grinding teeth', 'Avoiding chewing gum', 'Practicing good posture'],
    relatedConditions: ['temporomandibular joint disorder', 'bruxism'],
    commonMedications: ['ibuprofen', 'muscle relaxants']
  },
  {
    id: 'mouth_sores',
    name: 'Mouth Sores',
    possibleCauses: ['Canker sores', 'Cold sores', 'Oral thrush', 'Vitamin deficiencies', 'Oral cancer'],
    symptoms: ['Painful sores in mouth', 'White or red patches', 'Burning sensation', 'Difficulty eating or drinking'],
    advice: 'Rinse with salt water or baking soda solution. Use over-the-counter gel for pain relief. If sores persist for more than two weeks, consult a dentist or doctor.',
    urgency: 'Low to Moderate',
    preventiveMeasures: ['Good oral hygiene', 'Avoiding trigger foods', 'Managing stress', 'Eating a balanced diet'],
    relatedConditions: ['aphthous ulcers', 'oral herpes'],
    commonMedications: ['benzocaine gel', 'fluconazole (for thrush)']
  },
  {
    id: 'dry_mouth',
    name: 'Dry Mouth (Xerostomia)',
    possibleCauses: ['Medication side effects', 'Dehydration', 'Radiation therapy', 'Sjögren syndrome', 'Nerve damage'],
    symptoms: ['Dry or sticky feeling in mouth', 'Difficulty swallowing or speaking', 'Bad breath', 'Increased thirst'],
    advice: 'Stay hydrated, chew sugar-free gum to stimulate saliva production, and use saliva substitutes. Avoid tobacco, caffeine, and alcohol. If persistent, consult a dentist or doctor.',
    urgency: 'Low',
    preventiveMeasures: ['Staying hydrated', 'Using a humidifier', 'Avoiding caffeine and alcohol', 'Regular dental check-ups'],
    relatedConditions: ['Sjögren syndrome', 'radiation-induced xerostomia'],
    commonMedications: ['artificial saliva', 'pilocarpine']
  }
];

module.exports = symptoms;