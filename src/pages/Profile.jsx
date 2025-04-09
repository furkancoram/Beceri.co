// src/pages/Profile.jsx
import React, { useState } from 'react';

export default function Profile() {
  const [ownedSkills, setOwnedSkills] = useState([]);
  const [wantedSkills, setWantedSkills] = useState([]);
  const [input, setInput] = useState('');
  const [type, setType] = useState('owned');

  const handleAddSkill = () => {
    if (input.trim() === '') return;
    if (type === 'owned') setOwnedSkills([...ownedSkills, input]);
    else setWantedSkills([...wantedSkills, input]);
    setInput('');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profil - Becerilerini Belirle</h2>

      <div className="mb-4">
        <select
          className="border p-2 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="owned">Sahip Olduğum Beceriler</option>
          <option value="wanted">Öğrenmek İstediklerim</option>
        </select>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-grow rounded"
          placeholder="Bir beceri yaz..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAddSkill} className="bg-mint text-navy px-4 py-2 rounded">
          Ekle
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Sahip Olduğum</h3>
          <ul className="list-disc ml-5">
            {ownedSkills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Öğrenmek İstediğim</h3>
          <ul className="list-disc ml-5">
            {wantedSkills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
