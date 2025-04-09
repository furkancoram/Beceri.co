import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    surname: '',
    gender: '',
    birthDate: '',
    city: '',
    district: '',
    skills: [],
    skillInput: '',
    hobbies: [],
    hobbyInput: '',
    bio: '',
    isPublic: true // 👈 profil herkese açık mı?
  });

  useEffect(() => {
    if (!user) {
      alert('Lütfen giriş yapınız.');
      navigate('/giris');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleAddSkill = () => {
    if (form.skillInput.trim() !== '') {
      setForm({
        ...form,
        skills: [...form.skills, form.skillInput],
        skillInput: '',
      });
    }
  };

  const handleAddHobby = () => {
    if (form.hobbyInput.trim() !== '') {
      setForm({
        ...form,
        hobbies: [...form.hobbies, form.hobbyInput],
        hobbyInput: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: form.name,
        surname: form.surname,
        gender: form.gender,
        birthDate: form.birthDate,
        city: form.city,
        district: form.district,
        skills: form.skills,
        hobbies: form.hobbies,
        bio: form.bio,
        isPublic: form.isPublic,
        createdAt: new Date()
      });

      alert("Profiliniz başarıyla kaydedildi!");
      navigate('/profilim'); // aynı sayfada kalabiliriz
    } catch (err) {
      console.error("Firestore kayıt hatası:", err);
      alert("Profil kaydedilirken bir hata oluştu.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-navy dark:text-mint mb-6">Profil Bilgilerin</h2>

      {user && (
        <p className="text-center text-gray-600 dark:text-gray-300 mb-4">E-posta: {user.email}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Adınız"
            className="w-1/2 p-2 border rounded dark:bg-gray-800 dark:text-white" required />
          <input type="text" name="surname" value={form.surname} onChange={handleChange} placeholder="Soyadınız"
            className="w-1/2 p-2 border rounded dark:bg-gray-800 dark:text-white" required />
        </div>

        <select name="gender" value={form.gender} onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white" required>
          <option value="">Cinsiyet Seçiniz</option>
          <option value="Kadın">Kadın</option>
          <option value="Erkek">Erkek</option>
        </select>

        <input type="date" name="birthDate" value={form.birthDate} onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white" />

        <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="Yaşadığınız İl"
          className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white" />

        <input type="text" name="district" value={form.district} onChange={handleChange} placeholder="İlçe"
          className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white" />

        {/* Beceriler */}
        <div>
          <label className="block mb-1 font-semibold text-navy dark:text-mint">Beceriler</label>
          <div className="flex gap-2 mb-2">
            <input type="text" value={form.skillInput} onChange={(e) => setForm({ ...form, skillInput: e.target.value })}
              placeholder="Bir beceri yaz..." className="flex-grow p-2 border rounded dark:bg-gray-800 dark:text-white" />
            <button type="button" onClick={handleAddSkill}
              className="bg-mint text-navy px-4 py-2 rounded hover:opacity-90">Ekle</button>
          </div>
          <ul className="flex flex-wrap gap-2">
            {form.skills.map((skill, i) => (
              <li key={i} className="px-3 py-1 bg-navy text-white rounded-full text-sm">{skill}</li>
            ))}
          </ul>
        </div>

        {/* Hobiler */}
        <div>
          <label className="block mb-1 font-semibold text-navy dark:text-mint">Hobiler</label>
          <div className="flex gap-2 mb-2">
            <input type="text" value={form.hobbyInput} onChange={(e) => setForm({ ...form, hobbyInput: e.target.value })}
              placeholder="Bir hobi yaz..." className="flex-grow p-2 border rounded dark:bg-gray-800 dark:text-white" />
            <button type="button" onClick={handleAddHobby}
              className="bg-mint text-navy px-4 py-2 rounded hover:opacity-90">Ekle</button>
          </div>
          <ul className="flex flex-wrap gap-2">
            {form.hobbies.map((hobby, i) => (
              <li key={i} className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm">{hobby}</li>
            ))}
          </ul>
        </div>

        {/* Bio */}
        <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Kendinizi kısaca tanıtın..."
          className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white" rows={4} />

        {/* isPublic checkbox */}
        <div className="flex items-center gap-2">
          <input type="checkbox" name="isPublic" checked={form.isPublic} onChange={handleChange} />
          <label className="text-sm text-gray-700 dark:text-white">Profilim herkese açık olsun</label>
        </div>

        <button type="submit" className="w-full bg-mint text-navy font-bold py-3 rounded-xl hover:opacity-90 transition mt-4">
          Profili Kaydet
        </button>
      </form>
    </div>
  );
}
