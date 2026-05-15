import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, CheckSquare, AlignLeft, ChevronRight, 
  RefreshCcw, Home, Award, ArrowRight, ArrowLeft, CheckCircle2, 
  XCircle, Activity, HeartPulse, Zap, Edit3, PieChart, 
  BarChart3, Target, Star, Layers, SlidersHorizontal
} from 'lucide-react';

const style = document.createElement('style');
style.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Inter:wght@400;600;800&display=swap');
  
  :root {
    --primary-dark: #051824;
    --secondary-dark: #162936;
    --brand-gray: #3b5265;
    --accent-green: #27e9b5;
    --text-main: #ffffff;
    --text-sec: #d9f6ee;
    --text-muted: #b8d7cf;
  }

  body {
    background-color: var(--primary-dark);
    color: var(--text-main);
    font-family: 'Cairo', 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    -webkit-tap-highlight-color: transparent;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--primary-dark); }
  ::-webkit-scrollbar-thumb { background: var(--brand-gray); border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--accent-green); }

  .glass-card {
    background: var(--secondary-dark);
    border: 1px solid rgba(59, 82, 101, 0.4);
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
  }
  
  .glass-card:hover {
    border: 1px solid rgba(39, 233, 181, 0.5);
    box-shadow: 0 0 20px rgba(39, 233, 181, 0.15);
  }

  .neon-text-animated {
    color: #fff;
    text-shadow: 
      0 0 5px #fff,
      0 0 10px #fff,
      0 0 20px var(--accent-green),
      0 0 40px var(--accent-green),
      0 0 80px var(--accent-green);
    animation: neon-glow-move 2s ease-in-out infinite alternate;
  }

  @keyframes neon-glow-move {
    0% {
      text-shadow: 0 0 2px #fff, 0 0 5px #fff, 0 0 10px var(--accent-green), 0 0 20px var(--accent-green);
      transform: scale(1);
    }
    100% {
      text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px var(--accent-green), 0 0 40px var(--accent-green), 0 0 60px var(--accent-green);
      transform: scale(1.05);
    }
  }

  .points-pop {
    animation: popUp 1s ease-out forwards;
  }

  @keyframes popUp {
    0% { opacity: 1; transform: translateY(0) scale(1); }
    50% { transform: translateY(-20px) scale(1.2); }
    100% { opacity: 0; transform: translateY(-40px) scale(1); }
  }

  /* Premium Dashboard Grid Background */
  .dashboard-bg {
    background-image: radial-gradient(rgba(39, 233, 181, 0.05) 1px, transparent 1px);
    background-size: 30px 30px;
  }
`;
document.head.appendChild(style);

const QUESTION_BANK = [
  // ================= CHAPTER 1 =================
  { type: "essay", chapter: 1, chapterTitle: "Respiratory System", question: "Signs and symptoms of airway obstruction.", answer: "Cough, wheezing, exertional dyspnea." },
  { type: "essay", chapter: 1, chapterTitle: "Respiratory System", question: "Signs and symptoms of Bronchitis.", answer: "Cough, production of mucus (sputum) which can be clear, white, yellowish-gray or green, fatigue, shortness of breath, slight fever and chills, chest discomfort." },
  { type: "essay", chapter: 1, chapterTitle: "Respiratory System", question: "Triggers of Bronchial Asthma (Mention at least 5).", answer: "Smoking, infections (colds, flu), allergens (pollen, dust mites, pet dander), exercise, air pollution, weather changes, drugs (aspirin), emotional stress, perfumes, acid reflux." },
  { type: "essay", chapter: 1, chapterTitle: "Respiratory System", question: "Symptoms of Bronchial Asthma.", answer: "Shortness of breath (especially at night/early morning), cough (especially at night, laughing, or during exercise), wheezing, tightness in the chest." },
  { type: "essay", chapter: 1, chapterTitle: "Respiratory System", question: "Causes of Pneumonia.", answer: "Bacterial, Viral, Mycoplasma, Fungal." },
  { type: "essay", chapter: 1, chapterTitle: "Respiratory System", question: "Diagnostic tests for Pneumonia.", answer: "Blood tests, sputum test, pulse oximetry, CT scan, fluid sample, bronchoscopy." },
  { type: "essay", chapter: 1, chapterTitle: "Respiratory System", question: "Signs and symptoms of COPD.", answer: "Shortness of breath, wheezing, chest tightness, having to clear throat in the morning, chronic cough, cyanosis, frequent respiratory infections, lack of energy, weight loss (later stages), swelling in ankles/feet." },
  { type: "essay", chapter: 1, chapterTitle: "Respiratory System", question: "Indications for Tracheostomy.", answer: "Congenital anomaly, upper airway foreign body, subcutaneous emphysema, facial fractures, upper airway edema from trauma, burns, infection, or anaphylaxis." },

  { type: "mcq", chapter: 1, chapterTitle: "Respiratory System", question: "Tracheal obstruction is considered a:", options: ["Mild respiratory infection", "Life-threatening emergency", "Chronic inflammatory disease", "Viral infection"], answer: "Life-threatening emergency" },
  { type: "mcq", chapter: 1, chapterTitle: "Respiratory System", question: "Production of mucus (sputum) which can be clear, white, yellowish-gray, or green is a classic symptom of:", options: ["Bronchitis", "Tracheostomy", "Airway obstruction", "Appendicitis"], answer: "Bronchitis" },
  { type: "mcq", chapter: 1, chapterTitle: "Respiratory System", question: "The cardinal manifestation of bronchial asthma consists of shortness of breath that typically occurs:", options: ["After eating fatty foods", "At noon", "At night or in the early morning hours", "Only during winter"], answer: "At night or in the early morning hours" },
  { type: "mcq", chapter: 1, chapterTitle: "Respiratory System", question: "Which type of pneumonia is acquired during a hospital stay and may be more resistant to antibiotics?", options: ["Community-acquired pneumonia (CAP)", "Fungal pneumonia", "Hospital-acquired pneumonia (HAP)", "Viral pneumonia"], answer: "Hospital-acquired pneumonia (HAP)" },
  { type: "mcq", chapter: 1, chapterTitle: "Respiratory System", question: "A bacterial pneumonia may cause a fever as high as:", options: ["37°C", "38°C", "39°C", "40°C"], answer: "40°C" },
  { type: "mcq", chapter: 1, chapterTitle: "Respiratory System", question: "Blueness of the lips or fingernail beds in COPD patients is called:", options: ["Cyanosis", "Sputum", "Erythema", "Edema"], answer: "Cyanosis" },
  { type: "mcq", chapter: 1, chapterTitle: "Respiratory System", question: "Which of the following is an indication for tracheostomy?", options: ["Subcutaneous emphysema", "Upper airway foreign body", "Facial fractures", "All of the above"], answer: "All of the above" },

  { type: "true-false", chapter: 1, chapterTitle: "Respiratory System", question: "Community-acquired pneumonia (CAP) is acquired inside a medical or institutional setting.", answer: "False", explanation: "Community-acquired pneumonia is acquired outside of a medical or institutional setting." },
  { type: "true-false", chapter: 1, chapterTitle: "Respiratory System", question: "Hospital-acquired pneumonia is more severe than community-acquired pneumonia.", answer: "True" },
  { type: "true-false", chapter: 1, chapterTitle: "Respiratory System", question: "In COPD, patients usually experience unintended weight loss in the early stages.", answer: "False", explanation: "Unintended weight loss in COPD occurs in the later stages, not the early stages." },
  { type: "true-false", chapter: 1, chapterTitle: "Respiratory System", question: "Children under 5 years of age with pneumonia may have a lower-than-normal body temperature.", answer: "False", explanation: "Children under 5 years of age may have fast breathing. It is Older people who may have a lower-than-normal body temperature." },
  { type: "true-false", chapter: 1, chapterTitle: "Respiratory System", question: "Bronchial asthma is characterized by bronchial hyperactivity and a variable degree of airway obstruction.", answer: "True" },
  { type: "true-false", chapter: 1, chapterTitle: "Respiratory System", question: "Viral pneumonia may start with flu-like symptoms such as wheezing, and high fever may occur after 12-36 hours.", answer: "True" },
  { type: "true-false", chapter: 1, chapterTitle: "Respiratory System", question: "Frequent respiratory infections and swelling in ankles, feet, or legs are signs of COPD.", answer: "True" },

  { type: "fill", chapter: 1, chapterTitle: "Respiratory System", question: "Coughing in pneumonia may produce mucus, which is also known as ________.", options: ["Alveoli", "Sputum", "Wheezing", "Cyanosis", "Digital Clubbing", "Phlegm", "Tracheostomy", "Dyspnea"], answer: "Phlegm" },
  { type: "fill", chapter: 1, chapterTitle: "Respiratory System", question: "A squealing or whistling sound made when breathing is called ________.", options: ["Alveoli", "Sputum", "Wheezing", "Cyanosis", "Digital Clubbing", "Phlegm", "Tracheostomy", "Dyspnea"], answer: "Wheezing" },
  { type: "fill", chapter: 1, chapterTitle: "Respiratory System", question: "Blueness of the lips or fingernail beds due to lack of oxygen is known as ________.", options: ["Alveoli", "Sputum", "Wheezing", "Cyanosis", "Digital Clubbing", "Phlegm", "Tracheostomy", "Dyspnea"], answer: "Cyanosis" },
  { type: "fill", chapter: 1, chapterTitle: "Respiratory System", question: "Pneumonia is an inflammatory condition of the lung affecting primarily the small air sacs known as ________.", options: ["Alveoli", "Sputum", "Wheezing", "Cyanosis", "Digital Clubbing", "Phlegm", "Tracheostomy", "Dyspnea"], answer: "Alveoli" },
  { type: "fill", chapter: 1, chapterTitle: "Respiratory System", question: "The medical term for shortness of breath, which is a symptom of airway obstruction, is exertional ________.", options: ["Alveoli", "Sputum", "Wheezing", "Cyanosis", "Digital Clubbing", "Phlegm", "Tracheostomy", "Dyspnea"], answer: "Dyspnea" },
  { type: "fill", chapter: 1, chapterTitle: "Respiratory System", question: "Upper airway edema from trauma, burns, infection, or anaphylaxis is an indication for ________.", options: ["Alveoli", "Sputum", "Wheezing", "Cyanosis", "Digital Clubbing", "Phlegm", "Tracheostomy", "Dyspnea"], answer: "Tracheostomy" },
  { type: "fill", chapter: 1, chapterTitle: "Respiratory System", question: "A chronic cough in COPD may produce ________ that can be clear, white, yellow or greenish.", options: ["Alveoli", "Sputum", "Wheezing", "Cyanosis", "Digital Clubbing", "Phlegm", "Tracheostomy", "Dyspnea"], answer: "Sputum" },
  { type: "fill", chapter: 1, chapterTitle: "Respiratory System", question: "A physical sign in late COPD involving the fingers is called ________.", options: ["Alveoli", "Sputum", "Wheezing", "Cyanosis", "Digital Clubbing", "Phlegm", "Tracheostomy", "Dyspnea"], answer: "Digital Clubbing" },

  // ================= CHAPTER 2 =================
  { type: "essay", chapter: 2, chapterTitle: "Digestive System", question: "Symptoms and signs of viral hepatitis. 🔥", answer: "Fatigue, flu-like symptoms, dark urine, pale stool, abdominal pain, loss of appetite, unexplained weight loss, yellow skin and eyes (jaundice)." },
  { type: "essay", chapter: 2, chapterTitle: "Digestive System", question: "Symptoms and signs of Dehydration. 🔥", answer: "Increased thirst, dry mouth, tired or sleepy, decreased urine output, urine is low volume and yellowish, headache, dry skin, dizziness, few or no tears." },
  { type: "essay", chapter: 2, chapterTitle: "Digestive System", question: "Signs and symptoms of cholecystitis. 🔥", answer: "Severe pain in upper right/center abdomen, pain that spreads to right shoulder or back, tenderness over abdomen, nausea, vomiting, fever." },
  { type: "essay", chapter: 2, chapterTitle: "Digestive System", question: "Symptoms and signs of Gastritis. 🔥", answer: "Nausea or vomiting, loss of appetite, abdominal bloating, abdominal pain (epigastric), indigestion, burning." },
  { type: "essay", chapter: 2, chapterTitle: "Digestive System", question: "Symptoms and signs of liver cirrhosis. 🔥", answer: "Yellowing of skin (jaundice), fatigue, weakness, loss of appetite, itching, easy bruising. (Later signs: Ascites, edema, spider angiomas, etc.)" },
  { type: "essay", chapter: 2, chapterTitle: "Digestive System", question: "Signs and symptoms of Acute Appendicitis. 🔥", answer: "Dull pain near navel that moves to the lower right abdomen, loss of appetite, nausea/vomiting, abdominal swelling, fever (99-102 F), inability to pass gas." },
  { type: "essay", chapter: 2, chapterTitle: "Digestive System", question: "Sites of Abdominal hernia.", answer: "Epigastric, Incisional, Umbilical, Direct inguinal, Indirect inguinal, Femoral." },
  { type: "essay", chapter: 2, chapterTitle: "Digestive System", question: "Tips to prevent hepatitis.", answer: "Clean water, vaccines, safe sex, personal hygiene, sanitation, single-use syringes." },
  { type: "essay", chapter: 2, chapterTitle: "Digestive System", question: "Symptoms of Intestinal obstruction.", answer: "Severe bloating, abdominal pain, decreased appetite, nausea, vomiting, inability to pass gas or stool, constipation, diarrhea, severe abdominal cramps." },

  { type: "mcq", chapter: 2, chapterTitle: "Digestive System", question: "Esophageal varices are dilated veins in esophagus due to: 🔥", options: ["Heart failure", "Esophageal cancer", "Liver cirrhosis", "Hepatitis C virus"], answer: "Liver cirrhosis" },
  { type: "mcq", chapter: 2, chapterTitle: "Digestive System", question: "The most common peptic ulcer symptom is:", options: ["Fatty food intolerance", "Burning stomach pain", "Heartburn", "Unexplained weight loss"], answer: "Burning stomach pain" },
  { type: "mcq", chapter: 2, chapterTitle: "Digestive System", question: "Autoimmune hepatitis is a disease that occurs when:", options: ["You drink excessive alcohol", "Your body makes antibodies against your liver tissue", "You eat spicy food", "You are infected with a virus"], answer: "Your body makes antibodies against your liver tissue" },
  { type: "mcq", chapter: 2, chapterTitle: "Digestive System", question: "Pain that radiates to your right shoulder or back is a classic symptom of:", options: ["Appendicitis", "Peptic ulcer", "Cholecystitis", "Gastroenteritis"], answer: "Cholecystitis" },
  { type: "mcq", chapter: 2, chapterTitle: "Digestive System", question: "Which of the following is used to diagnose Hepatitis?", options: ["Blood tests", "Ultrasound", "Liver biopsy", "All of the above"], answer: "All of the above" },
  { type: "mcq", chapter: 2, chapterTitle: "Digestive System", question: "Gingivitis is an inflammation of gingiva, and its most common cause is:", options: ["Stress", "Poor oral hygiene", "Viral infection", "Aspirin use"], answer: "Poor oral hygiene" },
  { type: "mcq", chapter: 2, chapterTitle: "Digestive System", question: "Severe vomiting of blood or coffee ground-like material and black tarry stool are severe symptoms of:", options: ["Dehydration", "Peptic ulcer", "Hemorrhoids", "Intestinal obstruction"], answer: "Peptic ulcer" },

  { type: "true-false", chapter: 2, chapterTitle: "Digestive System", question: "Jaundice is blue coloration of skin and cyanosis is yellow coloration of skin. 🔥", answer: "False", explanation: "Cyanosis is blue coloration of skin and Jaundice is yellow coloration of skin." },
  { type: "true-false", chapter: 2, chapterTitle: "Digestive System", question: "Hepatitis C virus is transmitted by blood but hepatitis A virus is transmitted by food. 🔥", answer: "True" },
  { type: "true-false", chapter: 2, chapterTitle: "Digestive System", question: "Abdominal hernia occurs in the chest wall. 🔥", answer: "False", explanation: "Abdominal hernia occurs in the abdominal wall." },
  { type: "true-false", chapter: 2, chapterTitle: "Digestive System", question: "Abdominal hernia occurs in the abdominal wall. 🔥", answer: "True" },
  { type: "true-false", chapter: 2, chapterTitle: "Digestive System", question: "Nearly three-quarters of people with peptic ulcers don't have symptoms.", answer: "True" },
  { type: "true-false", chapter: 2, chapterTitle: "Digestive System", question: "Appendicitis pain usually begins as a dull pain near the navel and then moves to the lower right abdomen.", answer: "True" },
  { type: "true-false", chapter: 2, chapterTitle: "Digestive System", question: "Secondary wound healing heals rapidly with complete closure.", answer: "False", explanation: "Primary healing heals rapidly with complete closure. Secondary heals slowly." },

  { type: "fill", chapter: 2, chapterTitle: "Digestive System", question: "Difficulty swallowing, which is a symptom of esophageal cancer, is medically known as ________.", options: ["Dysphagia", "Jaundice", "H. pylori", "Hemorrhoids", "Peritonitis", "Dark", "Cirrhosis"], answer: "Dysphagia" },
  { type: "fill", chapter: 2, chapterTitle: "Digestive System", question: "Yellowing of the skin and eyes due to the accumulation of bilirubin in the blood is called ________.", options: ["Dysphagia", "Jaundice", "H. pylori", "Hemorrhoids", "Peritonitis", "Dark", "Cirrhosis"], answer: "Jaundice" },
  { type: "fill", chapter: 2, chapterTitle: "Digestive System", question: "A common bacterial cause of gastritis and peptic ulcers is ________ bacteria.", options: ["Dysphagia", "Jaundice", "H. pylori", "Hemorrhoids", "Peritonitis", "Dark", "Cirrhosis"], answer: "H. pylori" },
  { type: "fill", chapter: 2, chapterTitle: "Digestive System", question: "________ is a complication of many liver diseases characterized by abnormal structure and function of the liver.", options: ["Dysphagia", "Jaundice", "H. pylori", "Hemorrhoids", "Peritonitis", "Dark", "Cirrhosis"], answer: "Cirrhosis" },
  { type: "fill", chapter: 2, chapterTitle: "Digestive System", question: "Sudden pain relief in appendicitis may indicate rupture of the appendix, which leads to ________.", options: ["Dysphagia", "Jaundice", "H. pylori", "Hemorrhoids", "Peritonitis", "Dark", "Cirrhosis"], answer: "Peritonitis" },
  { type: "fill", chapter: 2, chapterTitle: "Digestive System", question: "Rectal bleeding, perianal irritation, and itching are symptoms of ________.", options: ["Dysphagia", "Jaundice", "H. pylori", "Hemorrhoids", "Peritonitis", "Dark", "Cirrhosis"], answer: "Hemorrhoids" },
  { type: "fill", chapter: 2, chapterTitle: "Digestive System", question: "Hepatitis can cause the urine to become ________ in color.", options: ["Dysphagia", "Jaundice", "H. pylori", "Hemorrhoids", "Peritonitis", "Dark", "Cirrhosis"], answer: "Dark" },

  // ================= CHAPTER 3 =================
  { type: "essay", chapter: 3, chapterTitle: "Cardiovascular System", question: "Symptoms, complications, and diet in Hypertension.", answer: "Symptoms: Often asymptomatic (Silent killer). Complications: Heart failure/attacks, aneurysm, kidney failure, stroke, hypertensive retinopathies. Diet: Reduce salt, moderate alcohol, eat more fruit/veg/less fat, manage body weight." },
  { type: "essay", chapter: 3, chapterTitle: "Cardiovascular System", question: "Symptoms and signs of Angina Pectoris. 🔥", answer: "Chest pain or discomfort (pressure, squeezing, burning), pain in arms, neck, jaw, shoulder or back, nausea, fatigue, shortness of breath, sweating, dizziness." },
  { type: "essay", chapter: 3, chapterTitle: "Cardiovascular System", question: "Symptoms and signs of Myocardial Infarction. 🔥", answer: "Severe pressure or tightness in chest, pain in chest/back/jaw lasting more than a few minutes, shortness of breath, sweating, nausea, vomiting, anxiety, cough, fast heart rate." },
  { type: "essay", chapter: 3, chapterTitle: "Cardiovascular System", question: "Symptoms and signs of Heart Failure.", answer: "Shortness of breath (dyspnea), fatigue, swelling (edema) in legs/ankles, rapid heartbeat, pink foamy mucus, increased urination at night, ascites." },
  { type: "essay", chapter: 3, chapterTitle: "Cardiovascular System", question: "Symptoms and signs of Rheumatic Fever.", answer: "Fever, painful/tender joints (migrating pain), red/hot joints, small painless nodules beneath skin, chest pain, heart murmur, fatigue, erythema marginatum (rash), Sydenham chorea." },
  { type: "essay", chapter: 3, chapterTitle: "Cardiovascular System", question: "Major Jones criteria for Rheumatic Fever (List 5).", answer: "Carditis, Polyarthritis, Chorea, Erythema marginatum, Subcutaneous nodules." },
  { type: "essay", chapter: 3, chapterTitle: "Cardiovascular System", question: "Risk factors for Deep Venous Thrombosis (DVT). 🔥", answer: "Recent surgery, hospitalization, advanced age, obesity, immobilization, thrombophilia, pregnancy, Estrogen-containing OCP, tobacco use, prolonged air travel, cancer, infection." },

  { type: "mcq", chapter: 3, chapterTitle: "Cardiovascular System", question: "Symptoms and signs of heart failure include: 🔥", options: ["Vomiting", "Diarrhea", "Fever", "Dyspnea"], answer: "Dyspnea" },
  { type: "mcq", chapter: 3, chapterTitle: "Cardiovascular System", question: "Heart failure presented by edema in: 🔥", options: ["Right arm", "Abdomen", "Lower limbs", "Chest"], answer: "Lower limbs" },
  { type: "mcq", chapter: 3, chapterTitle: "Cardiovascular System", question: "Rheumatic fever diagnosis includes major criteria which: 🔥", options: ["Polyarthritis", "Ascites", "Chest pain", "Dyspnea"], answer: "Polyarthritis" },
  { type: "mcq", chapter: 3, chapterTitle: "Cardiovascular System", question: "According to AHA 2017 guidelines, Stage 1 hypertension is defined as a blood pressure of:", options: ["Less than 120/80", "Between 120-129 / Less than 80", "Between 130-139 / 80-89", "Over 180 / 120"], answer: "Between 130-139 / 80-89" },
  { type: "mcq", chapter: 3, chapterTitle: "Cardiovascular System", question: "A classic symptom of a heart attack is chest pain radiating to:", options: ["Right shoulder", "Neck, jaws, back of shoulder, or left arm", "Lower abdomen", "Right leg"], answer: "Neck, jaws, back of shoulder, or left arm" },
  { type: "mcq", chapter: 3, chapterTitle: "Cardiovascular System", question: "Coughing up pink, blood-tinged or foamy mucus is a sign of:", options: ["Angina pectoris", "Hypertension", "Heart failure", "Varicose veins"], answer: "Heart failure" },
  { type: "mcq", chapter: 3, chapterTitle: "Cardiovascular System", question: "Jerky, uncontrollable body movements accompanying Rheumatic fever are known as:", options: ["Polyarthritis", "Erythema marginatum", "Sydenham chorea", "Carditis"], answer: "Sydenham chorea" },

  { type: "true-false", chapter: 3, chapterTitle: "Cardiovascular System", question: "Rheumatic Fever affects the small joints. 🔥", answer: "False", explanation: "Rheumatic Fever affects the large joints (like knees, ankles, elbows, and wrists)." },
  { type: "true-false", chapter: 3, chapterTitle: "Cardiovascular System", question: "Myocardial infarction occurs more in men than women. 🔥", answer: "True" },
  { type: "true-false", chapter: 3, chapterTitle: "Cardiovascular System", question: "Hypertension can be asymptomatic. 🔥", answer: "True" },
  { type: "true-false", chapter: 3, chapterTitle: "Cardiovascular System", question: "Hypertension cannot be asymptomatic. 🔥", answer: "False", explanation: "Hypertension can be asymptomatic (often called the silent killer)." },
  { type: "true-false", chapter: 3, chapterTitle: "Cardiovascular System", question: "Angina pectoris is presented by right-sided chest pain radiating to the right shoulder. 🔥", answer: "False", explanation: "Angina pectoris is presented by chest pain radiating to the left arm, neck, jaws, or back of shoulder." },
  { type: "true-false", chapter: 3, chapterTitle: "Cardiovascular System", question: "Varicose veins are veins that are dark purple or blue in color and often appear twisted and bulging.", answer: "True" },
  { type: "true-false", chapter: 3, chapterTitle: "Cardiovascular System", question: "Prolonged air travel and Estrogen-containing OCP are risk factors for DVT.", answer: "True" },

  { type: "fill", chapter: 3, chapterTitle: "Cardiovascular System", question: "A person with hypertension may not notice any symptoms, which is why it is often called the \"________\".", options: ["Silent killer", "Ascites", "Thrombus", "Erythema marginatum", "Aneurysm", "Tachycardia", "Nodules"], answer: "Silent killer" },
  { type: "fill", chapter: 3, chapterTitle: "Cardiovascular System", question: "An ________ is an abnormal bulge in the wall of an artery that can burst, causing severe bleeding.", options: ["Silent killer", "Ascites", "Thrombus", "Erythema marginatum", "Aneurysm", "Tachycardia", "Nodules"], answer: "Aneurysm" },
  { type: "fill", chapter: 3, chapterTitle: "Cardiovascular System", question: "A rapid heartbeat, commonly more than 100 beats a minute, is known as ________.", options: ["Silent killer", "Ascites", "Thrombus", "Erythema marginatum", "Aneurysm", "Tachycardia", "Nodules"], answer: "Tachycardia" },
  { type: "fill", chapter: 3, chapterTitle: "Cardiovascular System", question: "Swelling of your abdomen due to heart failure is medically called ________.", options: ["Silent killer", "Ascites", "Thrombus", "Erythema marginatum", "Aneurysm", "Tachycardia", "Nodules"], answer: "Ascites" },
  { type: "fill", chapter: 3, chapterTitle: "Cardiovascular System", question: "Rheumatic fever may cause a flat or slightly raised, painless rash with a ragged edge called ________.", options: ["Silent killer", "Ascites", "Thrombus", "Erythema marginatum", "Aneurysm", "Tachycardia", "Nodules"], answer: "Erythema marginatum" },
  { type: "fill", chapter: 3, chapterTitle: "Cardiovascular System", question: "Deep vein thrombosis (DVT) occurs when a blood clot, also known as a ________, forms in one or more deep veins.", options: ["Silent killer", "Ascites", "Thrombus", "Erythema marginatum", "Aneurysm", "Tachycardia", "Nodules"], answer: "Thrombus" },
  { type: "fill", chapter: 3, chapterTitle: "Cardiovascular System", question: "Small, painless bumps beneath the skin in Rheumatic fever are called ________.", options: ["Silent killer", "Ascites", "Thrombus", "Erythema marginatum", "Aneurysm", "Tachycardia", "Nodules"], answer: "Nodules" },

  // ================= CHAPTER 4 =================
  { type: "essay", chapter: 4, chapterTitle: "Urinary System", question: "Symptoms and signs of urinary tract infection (UTI). 🔥", answer: "A strong, persistent urge to urinate, burning sensation, passing frequent small amounts of urine, cloudy urine, red/pink/cola-colored urine, strong-smelling urine." },
  { type: "essay", chapter: 4, chapterTitle: "Urinary System", question: "Tips for the prevention of UTI.", answer: "Drink eight to ten glasses of water a day, don't control urinate as soon as you feel the need, take showers instead of baths, females should wipe from front to back after urinating, avoid the use of douches." },
  { type: "essay", chapter: 4, chapterTitle: "Urinary System", question: "Symptoms and signs of Chronic Renal Failure. 🔥", answer: "Nausea, vomiting, loss of appetite, fatigue and weakness, sleep problems, changes in urination (polyuria to oliguria), muscle twitches and cramps, swelling of feet/ankles, persistent itching, high blood pressure, headaches, mild anemia." },
  { type: "essay", chapter: 4, chapterTitle: "Urinary System", question: "Symptoms and signs of Renal Stones. 🔥", answer: "Severe pain in the side and back below the ribs, pain that radiates to the lower abdomen and groin, pain that comes in waves and fluctuates in intensity, pain on urination, pink/red/brown urine, cloudy or foul-smelling urine, nausea and vomiting." },

  { type: "mcq", chapter: 4, chapterTitle: "Urinary System", question: "Symptoms and signs of chronic renal failure include all of the following EXCEPT: 🔥", options: ["Edema", "Anemia", "Fatigue", "Cough"], answer: "Cough" },
  { type: "mcq", chapter: 4, chapterTitle: "Urinary System", question: "In Chronic Renal Failure, Glomerular Filtration Rate (GFR) progressively decreases from:", options: ["120 to 80 ml/min", "90 to 30 ml/min", "50 to 10 ml/min", "200 to 150 ml/min"], answer: "90 to 30 ml/min" },
  { type: "mcq", chapter: 4, chapterTitle: "Urinary System", question: "Which of the following is a classic symptom of Renal Stones?", options: ["Pain that radiates to the right shoulder", "Pain that comes in waves and fluctuates in intensity", "Painless hematuria", "Polyuria"], answer: "Pain that comes in waves and fluctuates in intensity" },
  { type: "mcq", chapter: 4, chapterTitle: "Urinary System", question: "Prevention of urinary tract infections (UTI) includes:", options: ["Taking baths instead of showers", "Wiping from back to front", "Drinking 8 to 10 glasses of water a day", "Holding urine as long as possible"], answer: "Drinking 8 to 10 glasses of water a day" },
  { type: "mcq", chapter: 4, chapterTitle: "Urinary System", question: "In Chronic Renal Failure, changes in urine concentration and output usually follow which pattern?", options: ["Oliguria progressing to Polyuria", "Polyuria progressing to Oliguria", "Constant Anuria", "Normal urination"], answer: "Polyuria progressing to Oliguria" },

  { type: "true-false", chapter: 4, chapterTitle: "Urinary System", question: "Renal stones pain often radiates to the lower abdomen and groin.", answer: "True" },
  { type: "true-false", chapter: 4, chapterTitle: "Urinary System", question: "Cola-colored urine is a sign of blood in the urine, which can happen in UTI.", answer: "True" },
  { type: "true-false", chapter: 4, chapterTitle: "Urinary System", question: "To prevent UTI, females should wipe from back to front after urinating.", answer: "False", explanation: "Females should wipe from front to back after urinating to avoid spreading bacteria." },
  { type: "true-false", chapter: 4, chapterTitle: "Urinary System", question: "Mild anemia, headaches, and edema are among the signs of Chronic Renal Failure.", answer: "True" },
  { type: "true-false", chapter: 4, chapterTitle: "Urinary System", question: "Acute renal failure occurs slowly within weeks to months.", answer: "False", explanation: "Acute renal failure occurs within hours to days, while Chronic occurs within weeks to months." },

  { type: "fill", chapter: 4, chapterTitle: "Urinary System", question: "In UTI, urine may appear red, bright pink, or ________.", options: ["Front to back", "Oliguria", "Fluctuate", "Cola-colored", "GFR"], answer: "Cola-colored" },
  { type: "fill", chapter: 4, chapterTitle: "Urinary System", question: "In Chronic Renal Failure, Polyuria may eventually progress to ________.", options: ["Front to back", "Oliguria", "Fluctuate", "Cola-colored", "GFR"], answer: "Oliguria" },
  { type: "fill", chapter: 4, chapterTitle: "Urinary System", question: "The pain of renal stones can come in waves and ________ in intensity.", options: ["Front to back", "Oliguria", "Fluctuate", "Cola-colored", "GFR"], answer: "Fluctuate" },
  { type: "fill", chapter: 4, chapterTitle: "Urinary System", question: "To prevent UTI, females should wipe from ________ after urinating.", options: ["Front to back", "Oliguria", "Fluctuate", "Cola-colored", "GFR"], answer: "Front to back" },
  { type: "fill", chapter: 4, chapterTitle: "Urinary System", question: "In chronic renal failure, ________ progressively decreases from 90 to 30 ml/min.", options: ["Front to back", "Oliguria", "Fluctuate", "Cola-colored", "GFR"], answer: "GFR" },

  // ================= CHAPTER 5 =================
  { type: "essay", chapter: 5, chapterTitle: "Central Nervous System", question: "Symptoms and signs of Peripheral Neuropathy. 🔥", answer: "Tingling, Numbness, loss of sensation in the arms and legs, a burning sensation in the feet or hands." },
  { type: "essay", chapter: 5, chapterTitle: "Central Nervous System", question: "Types of Peripheral Neuropathy with an example for each.", answer: "Mononeuropathy: Damage to a single nerve (e.g., Carpal tunnel syndrome). Polyneuropathy: Multiple nerves malfunction at the same time (e.g., Diabetic neuropathy)." },
  { type: "essay", chapter: 5, chapterTitle: "Central Nervous System", question: "Symptoms and signs of Epilepsy.", answer: "Loss of attention, vacant stare where eyes may blink or roll up, loss of consciousness, uncontrolled jerky movements." },
  { type: "essay", chapter: 5, chapterTitle: "Central Nervous System", question: "Symptoms and signs of Meningitis.", answer: "Severe headache, neck muscle tone and stiffness, photophobia and phonophobia, red or purple rash, gastric nausea and vomiting, cold hands and feet." },
  { type: "essay", chapter: 5, chapterTitle: "Central Nervous System", question: "Symptoms and signs of Brain Tumors.", answer: "Dizziness, Headache, Vomiting, Visual impairment, Speech disorders, Hearing loss, Paralysis." },
  { type: "essay", chapter: 5, chapterTitle: "Central Nervous System", question: "Indications (signs) of a head injury.", answer: "Scalp wound, fracture, swelling/bruising, loss of consciousness, nasal discharge, stiff neck." },

  { type: "mcq", chapter: 5, chapterTitle: "Central Nervous System", question: "Symptoms and signs of meningitis include all of the following EXCEPT: 🔥", options: ["Photophobia", "Phonophobia", "Headache", "Colic"], answer: "Colic" },
  { type: "mcq", chapter: 5, chapterTitle: "Central Nervous System", question: "Which of the following is an example of mononeuropathy?", options: ["Diabetic neuropathy", "Carpal tunnel syndrome", "Meningitis", "Epilepsy"], answer: "Carpal tunnel syndrome" },
  { type: "mcq", chapter: 5, chapterTitle: "Central Nervous System", question: "A sudden rush of electrical activity in the brain is called a:", options: ["Stroke", "Seizure", "Tumor", "Neuropathy"], answer: "Seizure" },
  { type: "mcq", chapter: 5, chapterTitle: "Central Nervous System", question: "Symptoms of brain tumors include all of the following EXCEPT:", options: ["Visual impairment", "Paralysis", "Speech disorders", "Gastric ulcers"], answer: "Gastric ulcers" },
  { type: "mcq", chapter: 5, chapterTitle: "Central Nervous System", question: "A red or purple rash, stiff neck, and photophobia are classic signs of:", options: ["Epilepsy", "Meningitis", "Brain tumor", "Peripheral Neuropathy"], answer: "Meningitis" },

  { type: "true-false", chapter: 5, chapterTitle: "Central Nervous System", question: "Epilepsy is an acute disorder that causes provoked, single seizures.", answer: "False", explanation: "Epilepsy is a chronic disorder that causes unprovoked, recurrent seizures." },
  { type: "true-false", chapter: 5, chapterTitle: "Central Nervous System", question: "Meningitis is an inflammation of the membranes surrounding your lungs and heart.", answer: "False", explanation: "Meningitis is an inflammation of the membranes surrounding your brain and spinal cord." },
  { type: "true-false", chapter: 5, chapterTitle: "Central Nervous System", question: "Diabetic neuropathy is an example of polyneuropathy where multiple peripheral nerves malfunction at the same time.", answer: "True" },
  { type: "true-false", chapter: 5, chapterTitle: "Central Nervous System", question: "Loss of attention and vacant stare are among the symptoms of epilepsy.", answer: "True" },
  { type: "true-false", chapter: 5, chapterTitle: "Central Nervous System", question: "Photophobia and phonophobia are symptoms of brain tumors.", answer: "False", explanation: "Photophobia and phonophobia are symptoms of meningitis." },

  { type: "fill", chapter: 5, chapterTitle: "Central Nervous System", question: "Epilepsy is a chronic disorder that causes unprovoked, recurrent ________.", options: ["Numbness", "Meninges", "Seizures", "Polyneuropathy", "Paralysis"], answer: "Seizures" },
  { type: "fill", chapter: 5, chapterTitle: "Central Nervous System", question: "Tingling, ________, and loss of sensation are symptoms of Peripheral Neuropathy.", options: ["Numbness", "Meninges", "Seizures", "Polyneuropathy", "Paralysis"], answer: "Numbness" },
  { type: "fill", chapter: 5, chapterTitle: "Central Nervous System", question: "When multiple peripheral nerves throughout the body malfunction at the same time, it is called ________.", options: ["Numbness", "Meninges", "Seizures", "Polyneuropathy", "Paralysis"], answer: "Polyneuropathy" },
  { type: "fill", chapter: 5, chapterTitle: "Central Nervous System", question: "Meningitis is an inflammation of the membranes known as ________ surrounding your brain and spinal cord.", options: ["Numbness", "Meninges", "Seizures", "Polyneuropathy", "Paralysis"], answer: "Meninges" },
  { type: "fill", chapter: 5, chapterTitle: "Central Nervous System", question: "________ is a severe symptom that can occur due to brain tumors, indicating a loss of muscle function.", options: ["Numbness", "Meninges", "Seizures", "Polyneuropathy", "Paralysis"], answer: "Paralysis" },

  // ================= CHAPTER 6 =================
  { type: "essay", chapter: 6, chapterTitle: "Hematology", question: "Symptoms and signs of Anemia. 🔥", answer: "Fatigue, Weakness, Pale or yellowish skin, Irregular heartbeats, Shortness of breath, Dizziness, Chest pain, Cold hands and feet, Headache." },
  { type: "essay", chapter: 6, chapterTitle: "Hematology", question: "Severe symptoms of Anemia related to the heart and blood vessels.", answer: "Low blood pressure, Palpitations, Rapid heart rate, Angina, Heart attack." },
  { type: "essay", chapter: 6, chapterTitle: "Hematology", question: "Symptoms and signs of Leukemia.", answer: "Fever or chills, Persistent fatigue and weakness, Frequent or severe infections, Losing weight without trying, Swollen lymph nodes, enlarged liver or spleen, Easy bleeding or bruising, Recurrent nosebleeds, Petechiae, Excessive sweating at night, Bone pain." },

  { type: "mcq", chapter: 6, chapterTitle: "Hematology", question: "Anemia symptoms include: 🔥", options: ["Pallor (Pale skin)", "Headache", "Cold hands and feet", "All of the above"], answer: "All of the above" },
  { type: "mcq", chapter: 6, chapterTitle: "Hematology", question: "Leukemia is cancer of the body's blood-forming tissues, which include:", options: ["Bone marrow only", "Lymphatic system only", "Both bone marrow and lymphatic system", "The heart and blood vessels"], answer: "Both bone marrow and lymphatic system" },
  { type: "mcq", chapter: 6, chapterTitle: "Hematology", question: "Tiny red spots in the skin, which are a symptom of leukemia, are called:", options: ["Cyanosis", "Petechiae", "Erythema", "Jaundice"], answer: "Petechiae" },
  { type: "mcq", chapter: 6, chapterTitle: "Hematology", question: "Which of the following is NOT a symptom of leukemia?", options: ["Unexplained weight gain", "Frequent or severe infections", "Easy bleeding or bruising", "Bone pain or tenderness"], answer: "Unexplained weight gain" },

  { type: "true-false", chapter: 6, chapterTitle: "Hematology", question: "Anemia is a condition in which you don't have enough healthy white blood cells to carry adequate oxygen to the body's tissues.", answer: "False", explanation: "Anemia is a condition in which you don't have enough healthy Red blood cells." },
  { type: "true-false", chapter: 6, chapterTitle: "Hematology", question: "Leukemia can cause swollen lymph nodes, and an enlarged liver or spleen.", answer: "True" },
  { type: "true-false", chapter: 6, chapterTitle: "Hematology", question: "Excessive sweating, especially at night, is a symptom of Anemia.", answer: "False", explanation: "Excessive sweating, especially at night, is a symptom of Leukemia." },
  { type: "true-false", chapter: 6, chapterTitle: "Hematology", question: "Dizziness, lightheadedness, and irregular heartbeats are among the symptoms of anemia.", answer: "True" },

  { type: "fill", chapter: 6, chapterTitle: "Hematology", question: "Anemia is a condition in which you don't have enough healthy ________ to carry adequate oxygen to the body's tissues.", options: ["Petechiae", "Red blood cells", "Spleen", "Sweating", "Oxygen"], answer: "Red blood cells" },
  { type: "fill", chapter: 6, chapterTitle: "Hematology", question: "Anemia is a condition in which you don't have enough healthy red blood cells to carry adequate ________ to the body's tissues.", options: ["Petechiae", "Red blood cells", "Spleen", "Sweating", "Oxygen"], answer: "Oxygen" },
  { type: "fill", chapter: 6, chapterTitle: "Hematology", question: "In severe anemia, a patient may suffer from enlargement in the ________.", options: ["Petechiae", "Red blood cells", "Spleen", "Sweating", "Oxygen"], answer: "Spleen" },
  { type: "fill", chapter: 6, chapterTitle: "Hematology", question: "Tiny red spots in the skin caused by leukemia are known medically as ________.", options: ["Petechiae", "Red blood cells", "Spleen", "Sweating", "Oxygen"], answer: "Petechiae" },
  { type: "fill", chapter: 6, chapterTitle: "Hematology", question: "Excessive ________, especially at night, is a common symptom of Leukemia.", options: ["Petechiae", "Red blood cells", "Spleen", "Sweating", "Oxygen"], answer: "Sweating" },

  // ================= CHAPTER 7 =================
  { type: "essay", chapter: 7, chapterTitle: "Endocrine System", question: "Symptoms and signs of Hyperthyroidism. 🔥", answer: "Sudden weight loss, Tachycardia/rapid heartbeat, Increased appetite, Nervousness, anxiety, Tremor, Sweating, Increased sensitivity to heat, Goiter, Fatigue and muscle weakness." },
  { type: "essay", chapter: 7, chapterTitle: "Endocrine System", question: "Symptoms and signs of Hypothyroidism.", answer: "Fatigue, Increased sensitivity to cold, Constipation, Dry skin, Weight gain, Puffy face, Muscle weakness and aches, Slowed heart rate, Depression and impaired memory." },
  { type: "essay", chapter: 7, chapterTitle: "Endocrine System", question: "Symptoms and signs of Diabetes Mellitus.", answer: "Increased thirst (Polydipsia), Frequent urination (Polyuria), Extreme hunger (Polyphagia), Unexplained weight loss, Presence of ketones in urine, Fatigue, Blurred vision, Slow-healing sores, Frequent infections." },
  { type: "essay", chapter: 7, chapterTitle: "Endocrine System", question: "Symptoms and signs of Hypoglycemia. 🔥", answer: "Hunger, Weakness, Pallor, Sweating, Sleepiness, Irritability, Blurred vision, Headache." },

  { type: "mcq", chapter: 7, chapterTitle: "Endocrine System", question: "Symptoms and signs of hyperthyroidism include: 🔥", options: ["Weight gain", "Hair loss", "Tachycardia", "Pleural effusion"], answer: "Tachycardia" },
  { type: "mcq", chapter: 7, chapterTitle: "Endocrine System", question: "Diabetes Mellitus presented by: 🔥", options: ["Polyuria", "Polydipsia", "Polyphagia", "All of the above"], answer: "All of the above" },
  { type: "mcq", chapter: 7, chapterTitle: "Endocrine System", question: "Which of the following is a classic symptom of Hypothyroidism?", options: ["Sudden weight loss", "Increased sensitivity to cold", "Tachycardia (rapid heartbeat)", "Increased appetite"], answer: "Increased sensitivity to cold" },
  { type: "mcq", chapter: 7, chapterTitle: "Endocrine System", question: "Symptoms and signs of hypoglycemia include: 🔥", options: ["Hunger", "Weakness", "Pallor (pale skin)", "All of the above"], answer: "All of the above" },
  { type: "mcq", chapter: 7, chapterTitle: "Endocrine System", question: "The presence of ketones in the urine is a symptom associated with:", options: ["Hyperthyroidism", "Hypothyroidism", "Diabetes Mellitus", "Peripheral Neuropathy"], answer: "Diabetes Mellitus" },

  { type: "true-false", chapter: 7, chapterTitle: "Endocrine System", question: "Diabetes Mellitus complications include hypoglycemia, which is a decrease in blood sugar level. 🔥", answer: "True" },
  { type: "true-false", chapter: 7, chapterTitle: "Endocrine System", question: "Hyperthyroidism can accelerate your body's metabolism significantly, causing sudden weight gain.", answer: "False", explanation: "Hyperthyroidism causes sudden weight loss." },
  { type: "true-false", chapter: 7, chapterTitle: "Endocrine System", question: "Hypothyroidism is also known as an underactive thyroid.", answer: "True" },
  { type: "true-false", chapter: 7, chapterTitle: "Endocrine System", question: "In Type 1 diabetes, symptoms may not be experienced initially, while in Type 2, symptoms tend to come on quickly and be more severe.", answer: "False", explanation: "In Type 2 diabetes, symptoms may not be experienced initially, while in Type 1, symptoms tend to come on quickly and be more severe." },
  { type: "true-false", chapter: 7, chapterTitle: "Endocrine System", question: "An enlarged thyroid gland is called a goiter, which may appear as a swelling at the base of the neck.", answer: "True" },

  { type: "fill", chapter: 7, chapterTitle: "Endocrine System", question: "Hyperthyroidism is a condition in which the thyroid gland produces too much of the hormone ________.", options: ["Glucose", "Thyroxine", "Ketones", "Hypoglycemia", "Goiter"], answer: "Thyroxine" },
  { type: "fill", chapter: 7, chapterTitle: "Endocrine System", question: "An enlarged thyroid gland, which may appear as a swelling at the base of your neck, is known as a ________.", options: ["Glucose", "Thyroxine", "Ketones", "Hypoglycemia", "Goiter"], answer: "Goiter" },
  { type: "fill", chapter: 7, chapterTitle: "Endocrine System", question: "Diabetes mellitus refers to a group of diseases that affect how your body uses blood sugar, also known as ________.", options: ["Glucose", "Thyroxine", "Ketones", "Hypoglycemia", "Goiter"], answer: "Glucose" },
  { type: "fill", chapter: 7, chapterTitle: "Endocrine System", question: "The presence of ________ in the urine is a byproduct of the breakdown of muscle and fat when there's not enough available insulin.", options: ["Glucose", "Thyroxine", "Ketones", "Hypoglycemia", "Goiter"], answer: "Ketones" },
  { type: "fill", chapter: 7, chapterTitle: "Endocrine System", question: "A dangerous complication of Diabetes Mellitus characterized by a decrease in blood sugar level is called ________.", options: ["Glucose", "Thyroxine", "Ketones", "Hypoglycemia", "Goiter"], answer: "Hypoglycemia" },

  // ================= CHAPTER 8 =================
  { type: "essay", chapter: 8, chapterTitle: "Locomotor System", question: "Symptoms and signs of Osteoporosis. 🔥", answer: "Back pain caused by a fractured or collapsed vertebra, Loss of height over time, A stooped posture, A bone fracture that occurs much more easily than expected." },
  { type: "essay", chapter: 8, chapterTitle: "Locomotor System", question: "Symptoms and signs of Osteoarthritis. 🔥", answer: "Pain during or after movement, Tenderness when applying light pressure, Stiffness (most noticeable in morning), Loss of flexibility, Grating sensation when using the joint." },
  { type: "essay", chapter: 8, chapterTitle: "Locomotor System", question: "Risk factors for Osteoporosis (Mention the 6 factors \"ACCESS\").", answer: "Alcohol Use, Corticosteroid Use, Calcium Low, Estrogen Low, Smoking, Sedentary Lifestyle." },

  { type: "mcq", chapter: 8, chapterTitle: "Locomotor System", question: "Osteoarthritis occurs when the protective _______ on the ends of your bones wears down over time.", options: ["Muscle", "Cartilage", "Ligament", "Tendon"], answer: "Cartilage" },
  { type: "mcq", chapter: 8, chapterTitle: "Locomotor System", question: "Which of the following is a classic symptom of osteoarthritis?", options: ["Fever and chills", "Weight loss", "Grating sensation", "Chest pain"], answer: "Grating sensation" },
  { type: "mcq", chapter: 8, chapterTitle: "Locomotor System", question: "Back pain in osteoporosis is usually caused by:", options: ["Muscle spasm", "A fractured or collapsed vertebra", "Herniated disc", "Nerve compression"], answer: "A fractured or collapsed vertebra" },
  { type: "mcq", chapter: 8, chapterTitle: "Locomotor System", question: "All of the following are risk factors for osteoporosis EXCEPT:", options: ["High Estrogen", "Smoking", "Sedentary lifestyle", "Low Calcium"], answer: "High Estrogen" },

  { type: "true-false", chapter: 8, chapterTitle: "Locomotor System", question: "Osteoarthritis is the most common form of arthritis.", answer: "True" },
  { type: "true-false", chapter: 8, chapterTitle: "Locomotor System", question: "A stooped posture and loss of height over time are symptoms of Osteoarthritis.", answer: "False", explanation: "A stooped posture and loss of height over time are symptoms of Osteoporosis." },
  { type: "true-false", chapter: 8, chapterTitle: "Locomotor System", question: "Joint stiffness in osteoarthritis is most noticeable when you wake up in the morning or after a period of inactivity.", answer: "True" },
  { type: "true-false", chapter: 8, chapterTitle: "Locomotor System", question: "Corticosteroid use and excessive alcohol use are risk factors for osteoporosis.", answer: "True" },
  { type: "true-false", chapter: 8, chapterTitle: "Locomotor System", question: "In osteoporosis, a bone fracture occurs much more easily than expected.", answer: "True" },

  { type: "fill", chapter: 8, chapterTitle: "Locomotor System", question: "Osteoporosis causes bones to become weak and ________.", options: ["Cartilage", "Vertebra", "Brittle", "Grating", "Morning"], answer: "Brittle" },
  { type: "fill", chapter: 8, chapterTitle: "Locomotor System", question: "Severe back pain in osteoporosis is often caused by a fractured or collapsed ________.", options: ["Cartilage", "Vertebra", "Brittle", "Grating", "Morning"], answer: "Vertebra" },
  { type: "fill", chapter: 8, chapterTitle: "Locomotor System", question: "Osteoarthritis occurs when the protective ________ on the ends of your bones wears down.", options: ["Cartilage", "Vertebra", "Brittle", "Grating", "Morning"], answer: "Cartilage" },
  { type: "fill", chapter: 8, chapterTitle: "Locomotor System", question: "You may hear or feel a ________ sensation when you use the joint affected by osteoarthritis.", options: ["Cartilage", "Vertebra", "Brittle", "Grating", "Morning"], answer: "Grating" },
  { type: "fill", chapter: 8, chapterTitle: "Locomotor System", question: "Joint stiffness in osteoarthritis may be most noticeable when you wake up in the ________.", options: ["Cartilage", "Vertebra", "Brittle", "Grating", "Morning"], answer: "Morning" },

  // ================= CHAPTER 9 =================
  { type: "essay", chapter: 9, chapterTitle: "General Surgery", question: "Symptoms and signs of Shock.", answer: "Cool, clammy skin, Pale or ashen skin, Rapid pulse, Rapid breathing, Nausea or vomiting, Enlarged pupils, Weakness, Dizziness or fainting, Changes in mental status." },
  { type: "essay", chapter: 9, chapterTitle: "General Surgery", question: "Indications for a blood transfusion. 🔥", answer: "Blood loss due to trauma, Heart or major surgery, Organ transplants, Bleeding disorders (hemophilia), Anemia (sickle cell), Leukemia, RH incompatibility in newborns." },
  { type: "essay", chapter: 9, chapterTitle: "General Surgery", question: "Complications (Reactions) of blood transfusion. 🔥", answer: "Allergic reaction (anxiety, wheezing), Febrile reaction (headache, tachycardia, chills, fever), Hemolytic reaction (Hemoglobinuria, chest pain, apprehension, low back pain)." },
  { type: "essay", chapter: 9, chapterTitle: "General Surgery", question: "Types of wounds. 🔥", answer: "Abrasion, Laceration, Avulsion, Incision, Puncture, Amputation." },
  { type: "essay", chapter: 9, chapterTitle: "General Surgery", question: "Compare between Primary healing (first intention) and Secondary healing (second intention). 🔥", answer: "Primary: Clean incised wound or surgical wound, heals rapidly with complete closure. Secondary: Occurs in wound with extensive soft tissue loss, heals slowly with fibrosis, leads into a wide scar." },

  { type: "mcq", chapter: 9, chapterTitle: "General Surgery", question: "Shock may result from which of the following?", options: ["Blood loss", "Severe infection", "Severe burns", "All of the above"], answer: "All of the above" },
  { type: "mcq", chapter: 9, chapterTitle: "General Surgery", question: "Which of the following is a classic sign of shock?", options: ["Warm, dry skin", "Slow pulse", "Cool, clammy skin", "Constricted (small) pupils"], answer: "Cool, clammy skin" },
  { type: "mcq", chapter: 9, chapterTitle: "General Surgery", question: "Primary wound healing (first intention) typically occurs in:", options: ["Wounds with extensive soft tissue loss", "Clean incised wound or surgical wound", "Infected wounds", "Severe burns"], answer: "Clean incised wound or surgical wound" },
  { type: "mcq", chapter: 9, chapterTitle: "General Surgery", question: "Secondary wound healing (second intention) is characterized by:", options: ["Healing rapidly with complete closure", "Healing slowly with fibrosis and a wide scar", "More epithelial regeneration than fibrosis", "No scar formation"], answer: "Healing slowly with fibrosis and a wide scar" },
  { type: "mcq", chapter: 9, chapterTitle: "General Surgery", question: "Which of the following is an indication for a blood transfusion?", options: ["Leukemia", "Hemophilia (Bleeding disorders)", "Organ transplants", "All of the above"], answer: "All of the above" },

  { type: "true-false", chapter: 9, chapterTitle: "General Surgery", question: "In shock, the organs aren't getting enough blood or oxygen, which can lead to permanent organ damage or even death if untreated.", answer: "True" },
  { type: "true-false", chapter: 9, chapterTitle: "General Surgery", question: "Primary wound healing heals slowly and leads into a wide, often hypertrophied scar.", answer: "False", explanation: "Secondary wound healing heals slowly and leads into a wide scar." },
  { type: "true-false", chapter: 9, chapterTitle: "General Surgery", question: "Sickle cell anemia and RH incompatibility in newborn babies are indications for a blood transfusion.", answer: "True" },
  { type: "true-false", chapter: 9, chapterTitle: "General Surgery", question: "A slow pulse and slow breathing are common symptoms of shock.", answer: "False", explanation: "A rapid pulse and rapid breathing are common symptoms of shock." },
  { type: "true-false", chapter: 9, chapterTitle: "General Surgery", question: "Hemolytic, Allergic, and Febrile reactions are considered complications of blood transfusion.", answer: "True" },

  { type: "fill", chapter: 9, chapterTitle: "General Surgery", question: "Shock can result from ________, heatstroke, or blood loss.", options: ["Clammy", "Incised", "Fibrosis", "Hemolytic", "Trauma"], answer: "Trauma" },
  { type: "fill", chapter: 9, chapterTitle: "General Surgery", question: "Cool, ________ skin and pale or ashen skin are among the signs of shock.", options: ["Clammy", "Incised", "Fibrosis", "Hemolytic", "Trauma"], answer: "Clammy" },
  { type: "fill", chapter: 9, chapterTitle: "General Surgery", question: "Primary healing occurs in a clean ________ wound or surgical wound.", options: ["Clammy", "Incised", "Fibrosis", "Hemolytic", "Trauma"], answer: "Incised" },
  { type: "fill", chapter: 9, chapterTitle: "General Surgery", question: "Secondary wound healing heals slowly with ________ and leads to a wide scar.", options: ["Clammy", "Incised", "Fibrosis", "Hemolytic", "Trauma"], answer: "Fibrosis" },
  { type: "fill", chapter: 9, chapterTitle: "General Surgery", question: "Chest pain and hemoglobinuria are signs of a ________ transfusion reaction.", options: ["Clammy", "Incised", "Fibrosis", "Hemolytic", "Trauma"], answer: "Hemolytic" }
];

const CHAPTERS = [
  { id: 1, title: "Respiratory System" },
  { id: 2, title: "Digestive System" },
  { id: 3, title: "Cardiovascular System" },
  { id: 4, title: "Urinary System" },
  { id: 5, title: "Central Nervous System" },
  { id: 6, title: "Hematology" },
  { id: 7, title: "Endocrine System" },
  { id: 8, title: "Locomotor System" },
  { id: 9, title: "General Surgery" }
];

const StorageHelper = {
  getKey: () => 'medSurgPremiumQuizData_v6', // Updated key for clean state
  getData: () => {
    const data = localStorage.getItem(StorageHelper.getKey());
    return data ? JSON.parse(data) : { 
      bestScores: {}, 
      attempts: {}, 
      totalPoints: 0,
      history: []
    };
  },
  saveData: (data) => {
    localStorage.setItem(StorageHelper.getKey(), JSON.stringify(data));
  },
  addPoints: (pointsEarned) => {
    const data = StorageHelper.getData();
    data.totalPoints += pointsEarned;
    StorageHelper.saveData(data);
    return data.totalPoints;
  },
  saveSession: (chapterId, type, score, total) => {
    const data = StorageHelper.getData();
    const key = `${chapterId}_${type}`;
    const percentage = Math.round((score / total) * 100);
    
    if (!data.bestScores[key] || percentage > data.bestScores[key].percentage) {
      data.bestScores[key] = { score, total, percentage };
    }
    
    data.attempts[key] = (data.attempts[key] || 0) + 1;
    
    data.history.push({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      chapterId,
      type,
      score,
      total,
      percentage
    });

    StorageHelper.saveData(data);
  },
  getBestScore: (chapterId, type) => {
    const data = StorageHelper.getData();
    const key = `${chapterId}_${type}`;
    return data.bestScores[key] ? data.bestScores[key].percentage : null;
  },
  getTotalPoints: () => {
    return StorageHelper.getData().totalPoints;
  },
  getStats: () => {
    const data = StorageHelper.getData();
    const history = data.history || [];
    
    let totalQuestionsAnswered = 0;
    let totalCorrectAnswers = 0;
    let uniqueChaptersAttempted = new Set();
    
    history.forEach(session => {
      totalQuestionsAnswered += session.total;
      totalCorrectAnswers += session.score;
      if(session.chapterId !== 'COMP') uniqueChaptersAttempted.add(session.chapterId);
    });

    const overallAccuracy = totalQuestionsAnswered > 0 
      ? Math.round((totalCorrectAnswers / totalQuestionsAnswered) * 100) 
      : 0;

    const completionRate = Math.round((uniqueChaptersAttempted.size / 9) * 100);

    return {
      totalPoints: data.totalPoints,
      quizzesTaken: history.length,
      overallAccuracy,
      completionRate,
      totalCorrectAnswers,
      uniqueChaptersAttempted: uniqueChaptersAttempted.size
    };
  }
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [selectedType, setSelectedType] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [totalUserPoints, setTotalUserPoints] = useState(0);
  
  // Comprehensive Setup State
  const [compStartChap, setCompStartChap] = useState(1);
  const [compEndChap, setCompEndChap] = useState(9);
  const [compQuestionCount, setCompQuestionCount] = useState(20);

  // Quiz State
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showPointsAnim, setShowPointsAnim] = useState(false);
  const [sessionPoints, setSessionPoints] = useState(0);

  useEffect(() => {
    setTotalUserPoints(StorageHelper.getTotalPoints());
    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setCurrentView('chapters');
    window.scrollTo(0, 0);
  };

  const handleChapterSelect = (chapterId) => {
    const q = QUESTION_BANK.filter(q => q.type === selectedType && q.chapter === chapterId);
    if (q.length === 0) {
      alert("عذراً، لا توجد أسئلة متاحة من هذا النوع في هذا الباب حالياً.");
      return;
    }
    const shuffled = [...q].sort(() => Math.random() - 0.5);
    setFilteredQuestions(shuffled);
    setSelectedChapter(chapterId);
    setCurrentQIndex(0);
    setScore(0);
    setSessionPoints(0);
    setIsAnswered(false);
    setSelectedOption(null);
    setShowExplanation(false);
    setCurrentView('quiz');
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    setCurrentView('home');
    setSelectedType(null);
    setSelectedChapter(null);
    setTotalUserPoints(StorageHelper.getTotalPoints());
  };

  const triggerPointsAnimation = () => {
    setShowPointsAnim(true);
    setTimeout(() => setShowPointsAnim(false), 1000);
  };

  if (loading) {
    return (
      <div className="bg-[#051824] min-h-screen flex flex-col items-center justify-center font-cairo overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="text-center relative w-full px-4"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#27e9b5] blur-[150px] opacity-20 rounded-full animate-pulse"></div>
          
          <Activity className="text-[#27e9b5] w-24 h-24 md:w-32 md:h-32 mx-auto mb-8 animate-bounce relative z-10" />
          <h1 className="text-4xl md:text-6xl font-black text-[#ffffff] mb-6 tracking-tight relative z-10">جاهز للاختبار؟</h1>
          <div className="inline-block glass-card px-8 py-4 rounded-full border border-[#27e9b5] relative z-10 shadow-[0_0_20px_rgba(39,233,181,0.2)]">
            <p className="text-2xl md:text-3xl text-[#27e9b5] font-black neon-text-animated">متنساش تدعيلي 🤍</p>
          </div>
          
          <div className="mt-16 flex justify-center gap-4 relative z-10">
             <div className="w-4 h-4 bg-[#27e9b5] rounded-full animate-bounce shadow-[0_0_15px_#27e9b5]" style={{ animationDelay: '0s' }}></div>
             <div className="w-4 h-4 bg-[#27e9b5] rounded-full animate-bounce shadow-[0_0_15px_#27e9b5]" style={{ animationDelay: '0.2s' }}></div>
             <div className="w-4 h-4 bg-[#27e9b5] rounded-full animate-bounce shadow-[0_0_15px_#27e9b5]" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </motion.div>
      </div>
    );
  }

  const NeonHeader = () => (
    <div className="w-full text-center pt-6 md:pt-10 pb-6 z-50 relative pointer-events-none flex justify-center items-center flex-col gap-2">
      <h2 className="text-4xl md:text-6xl font-black neon-text-animated font-cairo tracking-wide">
        صلِ على النبي
      </h2>
    </div>
  );

  const PointsBadge = () => (
    <div className="absolute top-4 left-4 md:top-8 md:left-8 z-50 glass-card px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center gap-2 border border-[#27e9b5]">
      <Zap className="text-yellow-400 fill-yellow-400" size={24} />
      <span className="text-[#ffffff] font-black text-xl md:text-2xl" dir="ltr">{totalUserPoints} XP</span>
    </div>
  );

  const HomeView = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="relative z-10 container mx-auto px-4 py-6 md:py-8 min-h-screen flex flex-col items-center"
      dir="rtl"
    >
      <PointsBadge />
      <NeonHeader />
      
      <div className="text-center mb-8 md:mb-10 mt-2">
        <h1 className="text-3xl md:text-7xl font-black mb-3 md:mb-4 text-[#ffffff] tracking-tight flex items-center justify-center gap-2 md:gap-4 flex-wrap">
          <HeartPulse className="text-[#27e9b5]" size={36} /> Medical-Surgical
        </h1>
        <p className="text-base md:text-2xl font-bold text-[#b8d7cf] bg-[#162936] inline-block px-4 py-2 md:px-6 md:py-2 rounded-full border border-[#3b5265]">
          طب الباطنة والجراحة - منصة الاختبارات الذكية
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full max-w-5xl px-2">
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleTypeSelect('mcq')} className="glass-card rounded-[24px] p-5 md:p-10 text-center flex flex-col items-center transition-all duration-300 group cursor-pointer w-full">
          <div className="bg-[#051824] p-5 md:p-6 rounded-2xl mb-4 md:mb-6 group-hover:bg-[#27e9b5] group-hover:text-[#051824] text-[#27e9b5] transition-colors shadow-lg border border-[#3b5265]">
            <BookOpen size={40} className="md:w-[48px] md:h-[48px]" />
          </div>
          <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-3 text-[#ffffff]">اختر من متعدد</h2>
          <p className="text-[#b8d7cf] text-sm md:text-lg font-bold uppercase tracking-widest">CHOOSE / MCQ</p>
        </motion.button>

        <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleTypeSelect('true-false')} className="glass-card rounded-[24px] p-5 md:p-10 text-center flex flex-col items-center transition-all duration-300 group cursor-pointer w-full">
          <div className="bg-[#051824] p-5 md:p-6 rounded-2xl mb-4 md:mb-6 group-hover:bg-[#27e9b5] group-hover:text-[#051824] text-[#27e9b5] transition-colors shadow-lg border border-[#3b5265]">
            <CheckSquare size={40} className="md:w-[48px] md:h-[48px]" />
          </div>
          <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-3 text-[#ffffff]">صح أو خطأ</h2>
          <p className="text-[#b8d7cf] text-sm md:text-lg font-bold uppercase tracking-widest">TRUE OR FALSE</p>
        </motion.button>

        <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleTypeSelect('essay')} className="glass-card rounded-[24px] p-5 md:p-10 text-center flex flex-col items-center transition-all duration-300 group cursor-pointer w-full">
          <div className="bg-[#051824] p-5 md:p-6 rounded-2xl mb-4 md:mb-6 group-hover:bg-[#27e9b5] group-hover:text-[#051824] text-[#27e9b5] transition-colors shadow-lg border border-[#3b5265]">
            <AlignLeft size={40} className="md:w-[48px] md:h-[48px]" />
          </div>
          <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-3 text-[#ffffff]">اذكر / مقالي</h2>
          <p className="text-[#b8d7cf] text-sm md:text-lg font-bold uppercase tracking-widest">GIVE AN ACCOUNT</p>
        </motion.button>

        <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleTypeSelect('fill')} className="glass-card rounded-[24px] p-5 md:p-10 text-center flex flex-col items-center transition-all duration-300 group cursor-pointer w-full border-t-4 border-t-[#27e9b5]">
          <div className="bg-[#051824] p-5 md:p-6 rounded-2xl mb-4 md:mb-6 group-hover:bg-[#27e9b5] group-hover:text-[#051824] text-[#27e9b5] transition-colors shadow-[0_0_15px_rgba(39,233,181,0.4)] border border-[#27e9b5]">
            <Edit3 size={40} className="md:w-[48px] md:h-[48px]" />
          </div>
          <h2 className="text-2xl md:text-4xl font-black mb-2 md:mb-3 text-[#ffffff]">أكمل من الكلمات</h2>
          <p className="text-[#27e9b5] text-sm md:text-lg font-bold uppercase tracking-widest">FILL IN THE BLANKS</p>
        </motion.button>
      </div>

      {/* Comprehensive Exam Card */}
      <motion.button 
        whileTap={{ scale: 0.95 }}
        onClick={() => setCurrentView('comprehensiveSetup')}
        className="mt-6 glass-card border-2 border-purple-500 bg-[#051824] p-5 md:p-8 rounded-[24px] flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full max-w-5xl hover:bg-purple-900/20 transition-all group shadow-[0_0_30px_rgba(168,85,247,0.2)]"
      >
        <Layers className="text-purple-400 group-hover:scale-110 transition-transform" size={48} />
        <div className="text-center md:text-right">
          <h2 className="text-2xl md:text-4xl font-black text-[#ffffff] mb-2">امتحان شامل (Comprehensive)</h2>
          <p className="text-purple-300 text-sm md:text-lg font-bold">اختبار عشوائي يجمع أسئلة المنهج من الأبواب التي تحددها</p>
        </div>
      </motion.button>

      <motion.button 
        whileTap={{ scale: 0.95 }}
        onClick={() => setCurrentView('statistics')}
        className="mt-8 md:mt-12 glass-card border-2 border-[#27e9b5] bg-[#051824] px-8 md:px-10 py-4 md:py-5 rounded-full flex items-center justify-center gap-3 md:gap-4 w-full max-w-md hover:bg-[#27e9b5] hover:text-[#051824] text-[#ffffff] transition-all group shadow-[0_0_30px_rgba(39,233,181,0.2)]"
      >
        <PieChart className="text-[#27e9b5] group-hover:text-[#051824]" size={32} />
        <span className="font-black text-xl md:text-3xl">الإحصائيات والتقدم</span>
      </motion.button>
    </motion.div>
  );

  const ComprehensiveSetupView = () => {
    const handleStartComprehensive = () => {
      let pool = QUESTION_BANK.filter(q => q.chapter >= compStartChap && q.chapter <= compEndChap);
      
      if (pool.length === 0) {
        alert("عذراً، لا توجد أسئلة في هذا النطاق.");
        return;
      }

      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      const selectedQs = compQuestionCount === 'all' ? shuffled : shuffled.slice(0, compQuestionCount);

      setFilteredQuestions(selectedQs);
      setSelectedChapter('COMP');
      setSelectedType('mixed');
      setCurrentQIndex(0);
      setScore(0);
      setSessionPoints(0);
      setIsAnswered(false);
      setSelectedOption(null);
      setShowExplanation(false);
      setCurrentView('quiz');
      window.scrollTo(0, 0);
    };

    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center"
        dir="rtl"
      >
        <PointsBadge />
        <NeonHeader />

        <div className="flex flex-col md:flex-row items-center justify-between mb-8 mt-6 gap-4 bg-[#162936] p-4 md:p-6 rounded-3xl border border-[#3b5265] shadow-lg w-full max-w-4xl">
          <div className="text-center md:text-right w-full">
            <h2 className="text-2xl md:text-4xl font-black text-[#ffffff] mb-2 flex items-center justify-center md:justify-start gap-3">
              <span className="text-[#051824] bg-purple-400 px-4 py-2 md:px-6 md:py-3 rounded-2xl border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)] inline-flex items-center gap-2 md:gap-3">
                <SlidersHorizontal size={28} /> إعدادات الشامل
              </span>
            </h2>
          </div>
          <button onClick={handleGoHome} className="bg-[#051824] p-3 md:p-4 rounded-full hover:bg-purple-400 hover:text-[#051824] text-[#ffffff] transition border border-[#3b5265] flex-shrink-0">
            <Home size={28} />
          </button>
        </div>

        <div className="glass-card rounded-[32px] p-5 md:p-10 w-full max-w-4xl border-t-4 border-purple-500 shadow-2xl">
          {/* Chapter Range */}
          <div className="mb-6 md:mb-8 bg-[#051824] p-5 md:p-6 rounded-2xl border border-[#3b5265]">
            <h3 className="text-lg md:text-2xl font-black text-purple-400 mb-4 md:mb-6 flex items-center gap-2">
              <BookOpen size={24} /> تحديد نطاق الأبواب
            </h3>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-center">
              <div className="w-full md:w-1/2 flex items-center gap-3 md:gap-4">
                <label className="text-base md:text-lg font-bold text-[#b8d7cf] whitespace-nowrap">من باب:</label>
                <select 
                  value={compStartChap} 
                  onChange={(e) => {
                    setCompStartChap(Number(e.target.value));
                    if (compEndChap < Number(e.target.value)) setCompEndChap(Number(e.target.value));
                  }}
                  className="w-full bg-[#162936] text-[#ffffff] border-2 border-[#3b5265] rounded-xl px-3 py-2 md:px-4 md:py-3 text-lg md:text-xl font-black focus:outline-none focus:border-purple-400"
                >
                  {CHAPTERS.map(c => <option key={`start-${c.id}`} value={c.id}>{c.id} - {c.title}</option>)}
                </select>
              </div>
              <span className="text-[#3b5265] hidden md:block"><ArrowLeft size={32} /></span>
              <div className="w-full md:w-1/2 flex items-center gap-3 md:gap-4">
                <label className="text-base md:text-lg font-bold text-[#b8d7cf] whitespace-nowrap">إلى باب:</label>
                <select 
                  value={compEndChap} 
                  onChange={(e) => setCompEndChap(Number(e.target.value))}
                  className="w-full bg-[#162936] text-[#ffffff] border-2 border-[#3b5265] rounded-xl px-3 py-2 md:px-4 md:py-3 text-lg md:text-xl font-black focus:outline-none focus:border-purple-400"
                >
                  {CHAPTERS.map(c => <option key={`end-${c.id}`} value={c.id} disabled={c.id < compStartChap}>{c.id} - {c.title}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Question Count */}
          <div className="mb-8 md:mb-10 bg-[#051824] p-5 md:p-6 rounded-2xl border border-[#3b5265]">
            <h3 className="text-lg md:text-2xl font-black text-purple-400 mb-4 md:mb-6 flex items-center gap-2">
              <Activity size={24} /> عدد الأسئلة
            </h3>
            <div className="flex flex-wrap gap-3 md:gap-4 justify-center" dir="ltr">
              {[10, 20, 50, 'all'].map((count) => (
                <button
                  key={count}
                  onClick={() => setCompQuestionCount(count)}
                  className={`px-4 py-2 md:px-6 md:py-3 rounded-xl text-lg md:text-xl font-black border-2 transition-all flex-1 min-w-[100px] max-w-[150px] ${
                    compQuestionCount === count 
                    ? 'bg-purple-500/20 text-purple-400 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]' 
                    : 'bg-[#162936] text-[#b8d7cf] border-[#3b5265] hover:border-purple-400/50'
                  }`}
                >
                  {count === 'all' ? 'الكل' : `${count} سؤال`}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleStartComprehensive}
            className="w-full py-4 md:py-5 rounded-2xl text-xl md:text-2xl font-black flex items-center justify-center gap-3 bg-purple-500 text-[#ffffff] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-[1.02] transition-all"
          >
            بدء الامتحان <ArrowLeft size={28} />
          </button>
        </div>
      </motion.div>
    );
  };

  const StatisticsView = () => {
    const stats = StorageHelper.getStats();
    
    // Adjust radius for mobile
    const isMobile = window.innerWidth < 768;
    const radius = isMobile ? 70 : 90;
    const circumference = 2 * Math.PI * radius;
    
    const accuracyOffset = circumference - (stats.overallAccuracy / 100) * circumference;
    const completionOffset = circumference - (stats.completionRate / 100) * circumference;

    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center dashboard-bg"
        dir="rtl"
      >
        <NeonHeader />
        
        <div className="w-full max-w-5xl flex justify-between items-center mb-10 mt-4 glass-card p-5 md:p-6 rounded-3xl border-t-4 border-t-[#27e9b5]">
          <h2 className="text-2xl md:text-4xl font-black text-[#ffffff] flex items-center gap-3">
            <BarChart3 className="text-[#27e9b5]" size={36} /> الإحصائيات الشاملة
          </h2>
          <button onClick={handleGoHome} className="bg-[#051824] p-3 md:p-4 rounded-full hover:bg-[#27e9b5] hover:text-[#051824] text-[#ffffff] transition border border-[#3b5265] shadow-lg">
            <Home size={28} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-10">
          <div className="glass-card p-8 rounded-3xl text-center border-b-4 border-b-yellow-400 relative overflow-hidden group">
            <div className="absolute top-[-50%] right-[-50%] w-[200%] h-[200%] bg-yellow-400/5 blur-[80px] rounded-full group-hover:bg-yellow-400/10 transition"></div>
            <Zap className="mx-auto text-yellow-400 fill-yellow-400 mb-4 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" size={48} />
            <p className="text-[#b8d7cf] text-xl font-bold uppercase tracking-wide">إجمالي النقاط (XP)</p>
            <p className="text-5xl md:text-6xl font-black text-[#ffffff] mt-3" dir="ltr">{stats.totalPoints}</p>
          </div>
          
          <div className="glass-card p-8 rounded-3xl text-center border-b-4 border-b-[#27e9b5] relative overflow-hidden group">
            <div className="absolute top-[-50%] right-[-50%] w-[200%] h-[200%] bg-[#27e9b5]/5 blur-[80px] rounded-full group-hover:bg-[#27e9b5]/10 transition"></div>
            <Target className="mx-auto text-[#27e9b5] mb-4 drop-shadow-[0_0_10px_rgba(39,233,181,0.5)]" size={48} />
            <p className="text-[#b8d7cf] text-xl font-bold uppercase tracking-wide">الاختبارات المنجزة</p>
            <p className="text-5xl md:text-6xl font-black text-[#ffffff] mt-3" dir="ltr">{stats.quizzesTaken}</p>
          </div>

          <div className="glass-card p-8 rounded-3xl text-center border-b-4 border-b-blue-400 relative overflow-hidden group">
            <div className="absolute top-[-50%] right-[-50%] w-[200%] h-[200%] bg-blue-400/5 blur-[80px] rounded-full group-hover:bg-blue-400/10 transition"></div>
            <CheckCircle2 className="mx-auto text-blue-400 mb-4 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" size={48} />
            <p className="text-[#b8d7cf] text-xl font-bold uppercase tracking-wide">إجابات صحيحة</p>
            <p className="text-5xl md:text-6xl font-black text-[#ffffff] mt-3" dir="ltr">{stats.totalCorrectAnswers}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          {/* Animated Accuracy Ring */}
          <div className="glass-card p-10 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#27e9b5]/5 pointer-events-none"></div>
            <h3 className="text-2xl md:text-3xl font-black text-[#ffffff] mb-8 drop-shadow-md">معدل الإجابات الصحيحة</h3>
            <div className={`relative flex items-center justify-center ${isMobile ? 'w-[180px] h-[180px]' : 'w-[240px] h-[240px]'}`}>
              <svg className="transform -rotate-90 w-full h-full drop-shadow-[0_0_15px_rgba(39,233,181,0.3)]">
                <circle cx="50%" cy="50%" r={radius} stroke="#051824" strokeWidth="20" fill="transparent" />
                <motion.circle 
                  cx="50%" cy="50%" r={radius} 
                  stroke="#27e9b5" 
                  strokeWidth="20" fill="transparent"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: accuracyOffset }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl md:text-5xl font-black text-[#ffffff]">{stats.overallAccuracy}%</span>
              </div>
            </div>
          </div>

          {/* Animated Completion Ring */}
          <div className="glass-card p-10 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-400/5 pointer-events-none"></div>
            <h3 className="text-2xl md:text-3xl font-black text-[#ffffff] mb-8 drop-shadow-md">إنجاز الأبواب (المنهج)</h3>
            <div className={`relative flex items-center justify-center ${isMobile ? 'w-[180px] h-[180px]' : 'w-[240px] h-[240px]'}`}>
              <svg className="transform -rotate-90 w-full h-full drop-shadow-[0_0_15px_rgba(96,165,250,0.3)]">
                <circle cx="50%" cy="50%" r={radius} stroke="#051824" strokeWidth="20" fill="transparent" />
                <motion.circle 
                  cx="50%" cy="50%" r={radius} 
                  stroke="#60a5fa" 
                  strokeWidth="20" fill="transparent"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: completionOffset }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl md:text-5xl font-black text-[#ffffff]">{stats.completionRate}%</span>
                <span className="text-lg text-[#b8d7cf] mt-2 font-bold">{stats.uniqueChaptersAttempted} من 9 أبواب</span>
              </div>
            </div>
          </div>
        </div>

      </motion.div>
    );
  };

  const ChaptersView = () => {
    let typeTitle = "";
    if(selectedType === 'mcq') typeTitle = "اختر من متعدد";
    if(selectedType === 'true-false') typeTitle = "صح أو خطأ";
    if(selectedType === 'essay') typeTitle = "اذكر / مقالي";
    if(selectedType === 'fill') typeTitle = "أكمل من الكلمات";

    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="relative z-10 container mx-auto px-4 py-8 min-h-screen"
        dir="rtl"
      >
        <PointsBadge />
        <NeonHeader />

        <div className="flex flex-col md:flex-row items-center justify-between mb-10 mt-10 gap-4 bg-[#162936] p-6 rounded-3xl border border-[#3b5265] shadow-lg max-w-6xl mx-auto">
          <div className="text-center md:text-right">
            <h2 className="text-3xl md:text-4xl font-black text-[#ffffff] mb-3 flex flex-col md:flex-row items-center gap-4">
              <span className="text-[#051824] bg-[#27e9b5] px-6 py-3 rounded-2xl border border-[#27e9b5] shadow-[0_0_15px_rgba(39,233,181,0.5)] inline-flex items-center gap-3">
                {selectedType === 'fill' ? <Edit3 size={36} /> : <BookOpen size={36} />} {typeTitle}
              </span>
            </h2>
            <p className="text-[#b8d7cf] text-lg md:text-xl font-bold mt-3">الرجاء اختيار الباب للبدء في الاختبار</p>
          </div>
          <button onClick={handleGoHome} className="bg-[#051824] p-4 rounded-full hover:bg-[#27e9b5] hover:text-[#051824] text-[#ffffff] transition border border-[#3b5265] flex-shrink-0">
            <Home size={32} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {CHAPTERS.map((chap) => {
            const bestScore = StorageHelper.getBestScore(chap.id, selectedType);
            const questionCount = QUESTION_BANK.filter(q => q.type === selectedType && q.chapter === chap.id).length;
            
            return (
              <motion.div 
                key={chap.id}
                whileTap={{ scale: 0.98 }}
                className="glass-card rounded-[32px] p-6 md:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-[#051824] text-[#27e9b5] text-xl md:text-2xl font-black px-5 py-2 rounded-xl border border-[#3b5265]" dir="ltr">
                      Ch {chap.id}
                    </span>
                    {bestScore !== null && (
                      <span className="flex items-center gap-2 text-[#051824] font-black bg-[#27e9b5] px-4 py-2 rounded-xl text-lg shadow-[0_0_15px_rgba(39,233,181,0.5)]">
                        <Star size={20} className="fill-[#051824]" /> {bestScore}%
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#ffffff] mb-4 leading-snug" dir="ltr">{chap.title}</h3>
                  <p className="text-[#b8d7cf] font-bold flex items-center gap-2 mb-8 text-lg md:text-xl bg-[#051824] w-fit px-4 py-2 rounded-lg">
                    <Activity size={24} /> {questionCount} أسئلة
                  </p>
                </div>
                
                <button 
                  onClick={() => handleChapterSelect(chap.id)}
                  disabled={questionCount === 0}
                  className={`w-full py-5 rounded-2xl text-xl md:text-2xl font-black flex items-center justify-center gap-3 transition-all ${
                    questionCount > 0 
                    ? 'bg-[#27e9b5] text-[#051824] hover:shadow-[0_0_25px_rgba(39,233,181,0.6)]' 
                    : 'bg-[#3b5265] text-[#b8d7cf] opacity-50 cursor-not-allowed'
                  }`}
                >
                  {questionCount > 0 ? 'ابدأ الاختبار' : 'قريباً'} <ChevronRight size={28} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  const QuizView = () => {
    const question = filteredQuestions[currentQIndex];
    const isLast = currentQIndex === filteredQuestions.length - 1;

    const handleAnswerSubmit = (isCorrect, optionSelected = null) => {
      if (isAnswered) return;
      
      setIsAnswered(true);
      if (optionSelected) setSelectedOption(optionSelected);
      
      if (isCorrect) {
        setScore(prev => prev + 1);
        setSessionPoints(prev => prev + 10);
        StorageHelper.addPoints(10);
        setTotalUserPoints(StorageHelper.getTotalPoints());
        triggerPointsAnimation();
      } else {
        setShowExplanation(true);
      }
    };

    const handleNext = () => {
      if (isLast) {
        StorageHelper.saveSession(selectedChapter, selectedType, score, filteredQuestions.length);
        setCurrentView('results');
      } else {
        setCurrentQIndex(prev => prev + 1);
        setIsAnswered(false);
        setSelectedOption(null);
        setShowExplanation(false);
      }
    };

    const progressPercentage = ((currentQIndex) / filteredQuestions.length) * 100;

    const renderFillQuestionText = () => {
      if (!question.question.includes('________')) return question.question;
      
      const parts = question.question.split('________');
      let blankContent = <span className="inline-block w-24 md:w-32 border-b-4 border-[#b8d7cf] mx-3"></span>;
      
      if (isAnswered) {
        if (selectedOption === question.answer) {
          blankContent = <span className="text-[#27e9b5] border-b-4 border-[#27e9b5] px-4 font-black mx-2 text-3xl md:text-4xl leading-tight">{selectedOption}</span>;
        } else {
          blankContent = (
            <span className="inline-flex items-center mx-2 flex-wrap justify-center gap-3">
              <span className="text-red-400 border-b-4 border-red-400 px-3 line-through font-black text-2xl md:text-3xl">{selectedOption}</span>
              <span className="text-[#27e9b5] border-b-4 border-[#27e9b5] px-3 font-black text-3xl md:text-4xl">{question.answer}</span>
            </span>
          );
        }
      }

      return (
        <span className="leading-[2]">
          {parts[0]} {blankContent} {parts[1]}
        </span>
      );
    };

    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
        className="relative z-10 container mx-auto px-2 md:px-4 py-6 min-h-screen flex flex-col"
        dir="rtl"
      >
        <PointsBadge />
        <NeonHeader />

        {showPointsAnim && (
          <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 z-[100] pointer-events-none points-pop">
            <span className="text-5xl md:text-6xl font-black text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]">+10 XP</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 mb-4 sm:mb-6 bg-[#162936] p-3 sm:p-4 rounded-2xl sm:rounded-3xl mt-4 sm:mt-6 border border-[#3b5265] max-w-5xl mx-auto w-full">
          <button onClick={() => setCurrentView(selectedChapter === 'COMP' ? 'comprehensiveSetup' : 'chapters')} className="flex items-center justify-center gap-2 text-[#ffffff] w-full sm:w-auto hover:text-[#27e9b5] transition bg-[#051824] px-4 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl border border-[#3b5265]">
            <ArrowRight size={24} className="sm:w-[28px] sm:h-[28px]" /> <span className="text-base sm:text-xl font-bold">رجوع</span>
          </button>
          <div className="flex gap-2 sm:gap-3 text-lg sm:text-xl font-black">
            <span className={`bg-[#051824] px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl border shadow-[0_0_10px_rgba(39,233,181,0.2)] ${selectedChapter === 'COMP' ? 'text-purple-400 border-purple-400' : 'text-[#27e9b5] border-[#27e9b5]'}`} dir="ltr">
              {selectedChapter === 'COMP' ? 'Comprehensive' : `Ch ${selectedChapter}`}
            </span>
          </div>
        </div>

        <div className="mb-6 sm:mb-8 w-full max-w-5xl mx-auto bg-[#051824] rounded-full h-4 sm:h-6 overflow-hidden border-2 border-[#3b5265]">
          <motion.div 
            className={`h-full rounded-full ${selectedChapter === 'COMP' ? 'bg-gradient-to-r from-purple-600 to-purple-400 shadow-[0_0_15px_#a855f7]' : 'bg-gradient-to-r from-[#1cb088] to-[#27e9b5] shadow-[0_0_15px_#27e9b5]'}`}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="flex-1 max-w-5xl w-full mx-auto pb-8">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentQIndex}
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
              className="glass-card rounded-[24px] sm:rounded-[40px] p-4 sm:p-8 md:p-14 relative overflow-hidden shadow-2xl"
            >
              <div className={`absolute top-0 right-0 px-4 py-1.5 sm:px-8 sm:py-3 rounded-bl-2xl sm:rounded-bl-3xl font-black text-lg sm:text-2xl border-l-2 border-b-2 sm:border-l-4 sm:border-b-4 border-[#162936] shadow-md ${selectedChapter === 'COMP' ? 'bg-purple-400 text-[#051824]' : 'bg-[#27e9b5] text-[#051824]'}`}>
                {currentQIndex + 1} / {filteredQuestions.length}
              </div>

              {question.type === 'fill' && (
                <div className="mt-10 sm:mt-12 mb-6 sm:mb-10 bg-[#051824] p-4 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-[#3b5265] shadow-inner">
                  <p className="text-[#27e9b5] text-base sm:text-2xl font-black mb-4 sm:mb-6 text-center flex items-center justify-center gap-2 sm:gap-3">
                    <Edit3 size={24} className="sm:w-[28px] sm:h-[28px]" /> اختر الكلمة المناسبة:
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-4 justify-center" dir="ltr">
                    {question.options.map((opt, idx) => {
                      let isSelected = selectedOption === opt;
                      let btnStyle = "bg-[#162936] text-[#ffffff] border-[#3b5265] hover:border-[#27e9b5] hover:shadow-[0_0_15px_rgba(39,233,181,0.3)]";
                      
                      if (isAnswered) {
                        if (opt === question.answer) btnStyle = "bg-[#27e9b5]/20 text-[#27e9b5] border-[#27e9b5] shadow-[0_0_15px_rgba(39,233,181,0.4)]";
                        else if (isSelected) btnStyle = "bg-red-500/20 text-red-400 border-red-500";
                        else btnStyle = "bg-[#051824] text-[#3b5265] border-[#051824] opacity-30";
                      }

                      return (
                        <button 
                          key={idx}
                          disabled={isAnswered}
                          onClick={() => handleAnswerSubmit(opt === question.answer, opt)}
                          className={`px-3 py-2 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-2xl font-black border-2 transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <h2 className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#ffffff] leading-[1.5] sm:leading-[1.6] mb-8 sm:mb-12 mt-12 sm:mt-16 text-center md:text-left drop-shadow-lg ${question.type === 'fill' ? 'pt-0' : 'pt-2 sm:pt-4'}`} dir="ltr">
                {question.type === 'fill' ? renderFillQuestionText() : question.question}
              </h2>

              <div className="space-y-3 sm:space-y-6" dir="ltr">
                
                {question.type === 'mcq' && question.options.map((option, idx) => {
                  let btnClass = "w-full text-left p-4 sm:p-8 rounded-2xl sm:rounded-3xl text-lg sm:text-2xl md:text-3xl font-black border-2 transition-all duration-300 flex items-center justify-between gap-3 ";
                  
                  if (!isAnswered) {
                    btnClass += "bg-[#051824] border-[#3b5265] hover:border-[#27e9b5] text-[#d9f6ee] hover:shadow-[0_0_20px_rgba(39,233,181,0.2)] hover:-translate-y-1";
                  } else {
                    if (option === question.answer) {
                      btnClass += "bg-[#27e9b5]/20 border-[#27e9b5] text-[#27e9b5] shadow-[0_0_20px_rgba(39,233,181,0.4)] scale-[1.02]"; 
                    } else if (option === selectedOption) {
                      btnClass += "bg-red-900/30 border-red-500 text-red-400";
                    } else {
                      btnClass += "bg-[#051824] border-transparent opacity-30 text-[#b8d7cf]"; 
                    }
                  }

                  return (
                    <button 
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleAnswerSubmit(option === question.answer, option)}
                      className={btnClass}
                    >
                      <span className="leading-snug pr-2 sm:pr-6">{option}</span>
                      {isAnswered && option === question.answer && <CheckCircle2 size={28} className="sm:w-[36px] sm:h-[36px] text-[#27e9b5] flex-shrink-0" />}
                      {isAnswered && option === selectedOption && option !== question.answer && <XCircle size={28} className="sm:w-[36px] sm:h-[36px] text-red-400 flex-shrink-0" />}
                    </button>
                  );
                })}

                {question.type === 'true-false' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                    {["True", "False"].map((option) => {
                      let btnClass = "py-5 sm:py-10 rounded-2xl sm:rounded-3xl text-2xl sm:text-5xl font-black border-2 transition-all duration-300 flex flex-row md:flex-col items-center justify-center gap-3 sm:gap-6 ";
                      
                      if (!isAnswered) {
                        btnClass += "bg-[#051824] border-[#3b5265] hover:border-[#27e9b5] text-[#ffffff] hover:shadow-[0_0_30px_rgba(39,233,181,0.2)] hover:-translate-y-1";
                      } else {
                        if (option === question.answer) {
                          btnClass += "bg-[#27e9b5]/20 border-[#27e9b5] text-[#27e9b5] shadow-[0_0_30px_rgba(39,233,181,0.4)] scale-[1.02]";
                        } else if (option === selectedOption) {
                          btnClass += "bg-red-900/30 border-red-500 text-red-400";
                        } else {
                          btnClass += "bg-[#051824] border-transparent opacity-30 text-[#b8d7cf]";
                        }
                      }

                      return (
                        <button
                          key={option}
                          disabled={isAnswered}
                          onClick={() => handleAnswerSubmit(option === question.answer, option)}
                          className={btnClass}
                        >
                          {option === "True" ? <CheckCircle2 size={36} className="md:w-[56px] md:h-[56px]" /> : <XCircle size={36} className="md:w-[56px] md:h-[56px]" />}
                          {option}
                        </button>
                      );
                    })}
                  </div>
                )}

                {question.type === 'essay' && (
                  <div className="text-center mt-8 sm:mt-12">
                    {!isAnswered ? (
                      <button 
                        onClick={() => setIsAnswered(true)}
                        className="w-full bg-gradient-to-r from-[#27e9b5] to-[#1cb088] text-[#051824] px-6 py-4 sm:px-12 sm:py-8 rounded-2xl sm:rounded-3xl text-xl sm:text-4xl font-black hover:shadow-[0_0_40px_rgba(39,233,181,0.5)] transition-all flex items-center justify-center gap-3 sm:gap-4"
                      >
                        إظهار الإجابة النموذجية <BookOpen size={28} className="sm:w-[36px] sm:h-[36px]" />
                      </button>
                    ) : (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                        <div className="bg-[#051824] border-2 border-[#27e9b5] p-5 sm:p-12 rounded-2xl sm:rounded-3xl mb-6 sm:mb-10 text-left overflow-y-auto shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] relative">
                          <h4 className="text-[#27e9b5] text-base sm:text-2xl font-black mb-4 sm:mb-6 uppercase tracking-widest flex items-center gap-2 sm:gap-3 bg-[#162936] w-fit px-4 py-1.5 sm:px-6 sm:py-2 rounded-xl">
                            <Star size={20} className="sm:w-[24px] sm:h-[24px] fill-[#27e9b5]" /> Model Answer
                          </h4>
                          <p className="text-[#ffffff] text-xl sm:text-4xl leading-relaxed font-bold">{question.answer}</p>
                        </div>
                        
                        <div className="bg-[#162936] p-5 sm:p-12 rounded-2xl sm:rounded-3xl border border-[#3b5265]" dir="rtl">
                          <p className="text-xl sm:text-4xl font-black text-[#ffffff] mb-6 sm:mb-10">هل أجبت بشكل صحيح ومطابق للنموذج؟</p>
                          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center">
                            <button 
                              onClick={() => { handleAnswerSubmit(true); handleNext(); }}
                              className="flex-1 bg-[#051824] border-2 border-[#27e9b5] text-[#27e9b5] py-4 sm:py-6 rounded-xl sm:rounded-2xl text-lg sm:text-3xl font-black hover:bg-[#27e9b5] hover:text-[#051824] flex items-center justify-center gap-3 sm:gap-4 transition-all shadow-[0_0_20px_rgba(39,233,181,0.2)] hover:scale-[1.03]"
                            >
                              <CheckCircle2 size={28} className="sm:w-[36px] sm:h-[36px]" /> نعم، إجابتي صحيحة
                            </button>
                            <button 
                              onClick={() => { handleAnswerSubmit(false); handleNext(); }}
                              className="flex-1 bg-[#051824] border-2 border-red-500 text-red-400 py-4 sm:py-6 rounded-xl sm:rounded-2xl text-lg sm:text-3xl font-black hover:bg-red-500 hover:text-[#ffffff] flex items-center justify-center gap-3 sm:gap-4 transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:scale-[1.03]"
                            >
                              <XCircle size={28} className="sm:w-[36px] sm:h-[36px]" /> لا، يوجد خطأ
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              <AnimatePresence>
                {showExplanation && question.type !== 'essay' && question.type !== 'fill' && question.explanation && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 sm:mt-10 p-4 sm:p-8 bg-red-900/20 border-l-4 sm:border-l-8 border-red-500 rounded-xl sm:rounded-2xl text-left" dir="ltr"
                  >
                    <p className="text-red-400 font-black mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3 text-lg sm:text-2xl">
                      <XCircle size={24} className="sm:w-[28px] sm:h-[28px]" /> Explanation
                    </p>
                    <p className="text-[#ffffff] text-lg sm:text-3xl font-bold leading-relaxed">
                      {question.explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </AnimatePresence>
        </div>

        {isAnswered && question.type !== 'essay' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="mt-4 sm:mt-6 flex justify-center pb-8 sm:pb-12"
          >
            <button 
              onClick={handleNext}
              className={`w-full max-w-2xl text-[#051824] px-6 py-4 sm:px-14 sm:py-6 rounded-full text-xl sm:text-3xl font-black flex items-center justify-center gap-3 sm:gap-4 hover:scale-[1.02] transition-all ${selectedChapter === 'COMP' ? 'bg-purple-400 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]' : 'bg-[#27e9b5] hover:shadow-[0_0_40px_rgba(39,233,181,0.6)]'}`}
            >
              {isLast ? 'إنهاء وعرض النتيجة' : 'السؤال التالي'}
              {isLast ? <Award size={28} className="sm:w-[36px] sm:h-[36px]" /> : <ArrowLeft size={28} className="sm:w-[36px] sm:h-[36px]" />}
            </button>
          </motion.div>
        )}
      </motion.div>
    );
  };

  const ResultsView = () => {
    const totalQuestions = filteredQuestions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    let message = "";
    let subMessage = "";
    let color = "text-[#27e9b5]";

    if (percentage === 100) {
      message = "أحسنت! دحيح الدفعة 🏆⭐";
      subMessage = "أداء أسطوري! لقد أجبت على جميع الأسئلة بشكل صحيح.";
    } else if (percentage >= 95) {
      message = "مذهل! أنت من أوائل الدفعة 🔥👏";
      subMessage = "مجهود رائع ومستوى متقدم جداً.";
    } else if (percentage >= 90) {
      message = "ممتاز جدًا، مذاكر كويس جدًا 👏🌟";
      subMessage = "أنت على الطريق الصحيح للتفوق.";
    } else if (percentage >= 80) {
      message = "رائع جدًا، أنت قريب من القمة 🚀";
      subMessage = "راجع بعض النقاط البسيطة وستصل للعلامة الكاملة.";
      color = "text-[#d9f6ee]";
    } else if (percentage >= 70) {
      message = "جيد جدًا، استمر وستصل للأفضل 💪";
      subMessage = "تحتاج لتركيز أكثر في بعض الأبواب.";
      color = "text-[#b8d7cf]";
    } else if (percentage >= 60) {
      message = "جيد، لكن تحتاج إلى مراجعة إضافية 📘";
      subMessage = "يُفضل مراجعة الباب مرة أخرى لضمان الفهم.";
      color = "text-yellow-400";
    } else {
      message = "ضعيف، لازم تذاكر أكثر 📚";
      subMessage = "لا تيأس! راجع المادة العلمية وحاول مرة أخرى.";
      color = "text-red-400";
    }

    const isMobile = window.innerWidth < 768;
    const radius = isMobile ? 120 : 160;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center dashboard-bg"
        dir="rtl"
      >
        <PointsBadge />
        <NeonHeader />

        <div className="glass-card rounded-[40px] p-6 md:p-16 max-w-5xl w-full text-center mt-6 border-t-4 border-t-[#27e9b5] shadow-2xl">
          <h2 className={`text-3xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 ${color}`}>{message}</h2>
          <p className="text-[#b8d7cf] text-xl md:text-3xl font-bold mb-10 md:mb-14 px-2">{subMessage}</p>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-16 mb-12 md:mb-16">
            <div className={`relative flex items-center justify-center ${isMobile ? 'w-[280px] h-[280px]' : 'w-[380px] h-[380px]'}`}>
              <svg className="transform -rotate-90 w-full h-full">
                <circle cx="50%" cy="50%" r={radius} stroke="#051824" strokeWidth="25" fill="transparent" />
                <motion.circle 
                  cx="50%" cy="50%" r={radius} 
                  stroke={percentage >= 60 ? (selectedChapter === 'COMP' ? '#a855f7' : '#27e9b5') : "#ef4444"} 
                  strokeWidth="25" fill="transparent"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                  style={{ filter: `drop-shadow(0 0 15px ${selectedChapter === 'COMP' ? 'rgba(168,85,247,0.5)' : 'rgba(39,233,181,0.5)'})` }}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-6xl md:text-8xl font-black text-[#ffffff]">{percentage}%</span>
                <span className="text-[#b8d7cf] text-lg md:text-2xl font-bold mt-2">النتيجة</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-8 w-full lg:w-auto px-2">
               <div className={`bg-[#051824] p-4 md:p-10 rounded-2xl md:rounded-3xl border-2 shadow-[0_0_20px_rgba(39,233,181,0.2)] col-span-2 ${selectedChapter === 'COMP' ? 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'border-[#27e9b5]'}`}>
                <p className={`${selectedChapter === 'COMP' ? 'text-purple-400' : 'text-[#27e9b5]'} text-base md:text-2xl font-black mb-2 md:mb-3 flex items-center justify-center gap-2 md:gap-3`}>
                  <Zap size={24} className={`md:w-[28px] md:h-[28px] ${selectedChapter === 'COMP' ? 'fill-purple-400' : 'fill-[#27e9b5]'}`} /> نقاط الجلسة
                </p>
                <p className="text-3xl md:text-7xl font-black text-[#ffffff]">{sessionPoints} <span className="text-xl md:text-3xl text-[#b8d7cf]">XP</span></p>
              </div>
              <div className="bg-[#051824] p-4 md:p-8 rounded-2xl md:rounded-3xl border border-[#3b5265]">
                <p className="text-[#b8d7cf] text-sm md:text-xl font-bold mb-1 md:mb-2">الأسئلة</p>
                <p className="text-2xl md:text-5xl font-black text-[#ffffff]">{totalQuestions}</p>
              </div>
              <div className={`bg-[#051824] p-4 md:p-8 rounded-2xl md:rounded-3xl border ${selectedChapter === 'COMP' ? 'border-purple-500/50' : 'border-[#27e9b5]'}`}>
                <p className={`${selectedChapter === 'COMP' ? 'text-purple-400' : 'text-[#27e9b5]'} text-sm md:text-xl font-bold mb-1 md:mb-2`}>صحيحة</p>
                <p className="text-2xl md:text-5xl font-black text-[#ffffff]">{score}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 px-2 w-full">
            <button 
              onClick={() => {
                if (selectedChapter === 'COMP') {
                   setCurrentView('comprehensiveSetup');
                } else {
                   setCurrentQIndex(0);
                   setScore(0);
                   setSessionPoints(0);
                   setIsAnswered(false);
                   setSelectedOption(null);
                   setShowExplanation(false);
                   setCurrentView('quiz');
                }
              }}
              className="w-full sm:w-auto px-6 py-4 md:px-10 md:py-6 rounded-xl sm:rounded-2xl text-lg md:text-3xl font-black bg-[#051824] hover:bg-[#3b5265] text-[#ffffff] border-2 border-[#3b5265] flex items-center justify-center gap-3 sm:gap-4 transition-all"
            >
              <RefreshCcw size={24} className="md:w-[28px] md:h-[28px]" /> {selectedChapter === 'COMP' ? 'إعداد اختبار جديد' : 'إعادة الاختبار'}
            </button>
            <button 
              onClick={() => setCurrentView(selectedChapter === 'COMP' ? 'comprehensiveSetup' : 'chapters')}
              className="w-full sm:w-auto px-6 py-4 md:px-10 md:py-6 rounded-xl sm:rounded-2xl text-lg md:text-3xl font-black bg-[#051824] hover:bg-[#3b5265] text-[#ffffff] border-2 border-[#3b5265] flex items-center justify-center gap-3 sm:gap-4 transition-all"
            >
              <BookOpen size={24} className="md:w-[28px] md:h-[28px]" /> {selectedChapter === 'COMP' ? 'رجوع للإعدادات' : 'باب آخر'}
            </button>
            <button 
              onClick={handleGoHome}
              className={`w-full sm:w-auto px-6 py-4 md:px-10 md:py-6 rounded-xl sm:rounded-2xl text-lg md:text-3xl font-black text-[#051824] flex items-center justify-center gap-3 sm:gap-4 transition-all ${selectedChapter === 'COMP' ? 'bg-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]' : 'bg-[#27e9b5] hover:shadow-[0_0_30px_rgba(39,233,181,0.5)]'}`}
            >
              <Home size={24} className="md:w-[28px] md:h-[28px]" /> الرئيسية
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen relative font-cairo bg-[#051824]">
      {/* Premium Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#27e9b5] opacity-[0.03] blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#27e9b5] opacity-[0.02] blur-[150px] rounded-full"></div>
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-blue-500 opacity-[0.01] blur-[120px] rounded-full"></div>
      </div>

      <AnimatePresence mode="wait">
        {currentView === 'home' && <HomeView key="home" />}
        {currentView === 'comprehensiveSetup' && <ComprehensiveSetupView key="comprehensiveSetup" />}
        {currentView === 'statistics' && <StatisticsView key="statistics" />}
        {currentView === 'chapters' && <ChaptersView key="chapters" />}
        {currentView === 'quiz' && <QuizView key="quiz" />}
        {currentView === 'results' && <ResultsView key="results" />}
      </AnimatePresence>
    </div>
  );
}
