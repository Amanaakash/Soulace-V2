import React, { useState } from 'react';

// --- DATA: The 10x10 Mood Matrix ---
const MOOD_MATRIX = [
  // Rows 0-4 (High Energy)
  ["Enraged", "Panicked", "Stressed", "Jittery", "Shocked", "Surprised", "Upbeat", "Festive", "Exhilarated", "Ecstatic"],
  ["Livid", "Furious", "Frustrated", "Tense", "Stunned", "Hyper", "Cheerful", "Motivated", "Inspired", "Elated"],
  ["Fuming", "Frightened", "Angry", "Nervous", "Restless", "Energized", "Lively", "Enthusiastic", "Optimistic", "Excited"],
  ["Anxious", "Apprehensive", "Worried", "Irritated", "Annoyed", "Pleased", "Happy", "Focused", "Proud", "Thrilled"],
  ["Repulsed", "Troubled", "Concerned", "Uneasy", "Peeved", "Pleasant", "Joyful", "Hopeful", "Playful", "Blissful"],
  // Rows 5-9 (Low Energy)
  ["Disgusted", "Glum", "Disappointed", "Down", "Apathetic", "At Ease", "Easygoing", "Content", "Loving", "Fulfilled"],
  ["Pessimistic", "Morose", "Discouraged", "Sad", "Bored", "Calm", "Secure", "Satisfied", "Grateful", "Touched"],
  ["Alienated", "Miserable", "Lonely", "Disheartened", "Tired", "Relaxed", "Chill", "Restful", "Blessed", "Balanced"],
  ["Despondent", "Depressed", "Sullen", "Exhausted", "Fatigued", "Mellow", "Thoughtful", "Peaceful", "Comfy", "Carefree"],
  ["Despair", "Hopeless", "Desolate", "Spent", "Drained", "Sleepy", "Complacent", "Tranquil", "Cozy", "Serene"]
];

// --- MOCK DATABASE ---
const USER_DB = [
  { id: 1, name: 'Alex', zone: 'Red' }, { id: 2, name: 'Sam', zone: 'Red' },
  { id: 3, name: 'Jordan', zone: 'Blue' }, { id: 4, name: 'Taylor', zone: 'Blue' },
  { id: 5, name: 'Casey', zone: 'Green' }, { id: 6, name: 'Jamie', zone: 'Green' },
  { id: 7, name: 'Morgan', zone: 'Yellow' }, { id: 8, name: 'Riley', zone: 'Yellow' }
];

const MoodMeter = () => {
  const [step, setStep] = useState(1); // 1: Assess, 2: Select Mood, 3: Connect, 4: Result
  const [energy, setEnergy] = useState(null); // 0 or 1
  const [pleasantness, setPleasantness] = useState(null); // 0 or 1
  const [currentZone, setCurrentZone] = useState(null);
  const [displayedMoods, setDisplayedMoods] = useState([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [matchResult, setMatchResult] = useState(null);
  const [showFullMatrix, setShowFullMatrix] = useState(false);

  // --- LOGIC: Calculate Zone ---
  const calculateZone = (e, p) => {
    let zone = "";
    let rStart = 0, rEnd = 5; // Default High Energy
    let cStart = 0, cEnd = 5; // Default Low Pleasantness

    if (e === 1 && p === 0) { zone = "Red"; }
    else if (e === 1 && p === 1) { zone = "Yellow"; cStart = 5; cEnd = 10; }
    else if (e === 0 && p === 0) { zone = "Blue"; rStart = 5; rEnd = 10; }
    else if (e === 0 && p === 1) { zone = "Green"; rStart = 5; rEnd = 10; cStart = 5; cEnd = 10; }

    // Slice the matrix
    const moods = [];
    for (let r = rStart; r < rEnd; r++) {
      for (let c = cStart; c < cEnd; c++) {
        moods.push(MOOD_MATRIX[r][c]);
      }
    }
    return { zone, moods };
  };

  const handleAssessmentSubmit = () => {
    if (energy === null || pleasantness === null) return;
    const { zone, moods } = calculateZone(energy, pleasantness);
    setCurrentZone(zone);
    setDisplayedMoods(moods);
    setStep(2);
  };

  // --- LOGIC: Handle Matching ---
  const findMatch = (type) => {
    let potentialMatches = [];

    if (type === 'similar') {
      // Logic: Same zone OR Vertical Neighbor (Adjacent Up/Down)
      // Red(Top) <-> Blue(Bottom) || Yellow(Top) <-> Green(Bottom)
      const verticalNeighbor = {
        'Red': 'Blue', 'Blue': 'Red',
        'Yellow': 'Green', 'Green': 'Yellow'
      };
      
      const neighbor = verticalNeighbor[currentZone];
      potentialMatches = USER_DB.filter(u => u.zone === currentZone || u.zone === neighbor);
    } 
    else {
      // Logic: Different Headspace (Any zone except current)
      potentialMatches = USER_DB.filter(u => u.zone !== currentZone);
    }

    // Pick random
    if (potentialMatches.length > 0) {
      const randomUser = potentialMatches[Math.floor(Math.random() * potentialMatches.length)];
      setMatchResult(randomUser);
    } else {
      setMatchResult({ name: "Ghost User", zone: "Unknown" }); // Fallback
    }
    setStep(4);
  };

  // --- RENDER HELPERS ---
  const getZoneColor = (zone) => {
    switch(zone) {
      case 'Red': return '#ffcccc'; // Light Red
      case 'Yellow': return '#fff5cc'; // Light Yellow
      case 'Blue': return '#cce5ff'; // Light Blue
      case 'Green': return '#ccffcc'; // Light Green
      default: return '#fff';
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>RULER Mood Meter</h2>

      {/* STEP 1: ASSESSMENT */}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h4>1. How is your Energy?</h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => setEnergy(1)} 
                style={{ flex: 1, padding: '10px', background: energy === 1 ? '#333' : '#eee', color: energy === 1 ? '#fff' : '#000' }}>
                High (1)
              </button>
              <button 
                onClick={() => setEnergy(0)} 
                style={{ flex: 1, padding: '10px', background: energy === 0 ? '#333' : '#eee', color: energy === 0 ? '#fff' : '#000' }}>
                Low (0)
              </button>
            </div>
          </div>

          <div>
            <h4>2. How is your Pleasantness?</h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => setPleasantness(1)} 
                style={{ flex: 1, padding: '10px', background: pleasantness === 1 ? '#333' : '#eee', color: pleasantness === 1 ? '#fff' : '#000' }}>
                High (1)
              </button>
              <button 
                onClick={() => setPleasantness(0)} 
                style={{ flex: 1, padding: '10px', background: pleasantness === 0 ? '#333' : '#eee', color: pleasantness === 0 ? '#fff' : '#000' }}>
                Low (0)
              </button>
            </div>
          </div>

          <button 
            onClick={handleAssessmentSubmit}
            disabled={energy === null || pleasantness === null}
            style={{ padding: '15px', marginTop: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Analyze Mood
          </button>
        </div>
      )}

      {/* STEP 2: MOOD SELECTION */}
      {step === 2 && (
        <div>
          <div style={{ padding: '10px', marginBottom: '15px', backgroundColor: getZoneColor(currentZone), borderRadius: '5px', textAlign: 'center' }}>
             You are in the <strong>{currentZone} Zone</strong>
          </div>
          
          <p>Select the specific emotion you are feeling:</p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(5, 1fr)', 
            gap: '8px', 
            marginBottom: '20px' 
          }}>
            {/* If showFullMatrix is true, we flatten the whole MOOD_MATRIX, otherwise use displayedMoods */}
            {(showFullMatrix ? MOOD_MATRIX.flat() : displayedMoods).map((mood, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedMood(mood)}
                style={{ 
                  padding: '8px', 
                  fontSize: '12px', 
                  background: selectedMood === mood ? '#007bff' : '#f0f0f0', 
                  color: selectedMood === mood ? 'white' : 'black',
                  border: '1px solid #ccc',
                  cursor: 'pointer'
                }}>
                {mood}
              </button>
            ))}
          </div>

          {!showFullMatrix && (
            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
              <small style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }} onClick={() => setShowFullMatrix(true)}>
                I don't see my mood here. Show all options.
              </small>
            </div>
          )}

          <button 
            disabled={!selectedMood}
            onClick={() => setStep(3)}
            style={{ width: '100%', padding: '15px', background: selectedMood ? '#28a745' : '#ccc', color: 'white', border: 'none', borderRadius: '5px' }}>
            Confirm: I am feeling {selectedMood}
          </button>
        </div>
      )}

      {/* STEP 3: CONNECTION */}
      {step === 3 && (
        <div style={{ textAlign: 'center' }}>
          <h3>Mood Recorded: {selectedMood}</h3>
          <p>Whom do you want to connect with?</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            <button 
              onClick={() => findMatch('similar')}
              style={{ padding: '20px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}>
              <strong>Similar Headspace</strong><br/>
              <small>Someone in {currentZone} or adjacent zones</small>
            </button>
            
            <button 
              onClick={() => findMatch('different')}
              style={{ padding: '20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}>
              <strong>Different Headspace</strong><br/>
              <small>Someone feeling something completely different</small>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: RESULT */}
      {step === 4 && matchResult && (
        <div style={{ textAlign: 'center', padding: '20px', background: '#f8f9fa', borderRadius: '10px' }}>
          <h3>It's a Match!</h3>
          <div style={{ fontSize: '18px', margin: '20px 0' }}>
            You are connecting with <strong>{matchResult.name}</strong>
          </div>
          <div style={{ display: 'inline-block', padding: '10px 20px', borderRadius: '20px', background: getZoneColor(matchResult.zone) }}>
            They are currently in the <strong>{matchResult.zone} Zone</strong>
          </div>
          <br/><br/>
          <button 
            onClick={() => { setStep(1); setEnergy(null); setPleasantness(null); setSelectedMood(""); setMatchResult(null); setShowFullMatrix(false); }}
            style={{ marginTop: '20px', padding: '10px 20px', background: 'transparent', border: '1px solid #333', cursor: 'pointer' }}>
            Start Over
          </button>
        </div>
      )}
    </div>
  );
};

export default MoodMeter;