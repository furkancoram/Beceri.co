// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc, collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/giris');
    } else {
      fetchProfile();
      fetchPosts();
    }
  }, [user]);

  const fetchProfile = async () => {
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProfile(docSnap.data());
    }
  };

  const fetchPosts = async () => {
    const q = query(collection(db, 'posts'), where('uid', '==', user.uid), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(data);
  };

  const handlePost = async () => {
    if (newPost.trim() === '') return;
    await addDoc(collection(db, 'posts'), {
      uid: user.uid,
      content: newPost,
      createdAt: new Date(),
    });
    setNewPost('');
    fetchPosts();
  };

  if (!profile) return <div className="text-center p-8">Yükleniyor...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* KAPAK FOTO */}
      <div className="h-40 bg-gray-300 rounded-xl mb-4 relative">
        <div className="w-24 h-24 rounded-full border-4 border-white absolute -bottom-12 left-4 bg-gray-500" />
      </div>

      {/* KULLANICI BİLGİLERİ */}
      <div className="mt-16 px-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{profile.name} {profile.surname}</h2>
            <p className="text-gray-500">@{user.email.split('@')[0]}</p>
          </div>
          <button
            onClick={() => navigate('/profil')}
            className="border border-mint text-mint px-4 py-1 rounded-full hover:bg-mint hover:text-navy transition"
          >
            Profili Düzenle
          </button>
        </div>

        <p className="mt-2 text-gray-800 dark:text-gray-200">{profile.bio}</p>
        <p className="text-sm text-gray-400 mt-1">
          📍 {profile.city}, {profile.district} · 📅 Katıldı: {new Date(profile.createdAt.seconds * 1000).toLocaleDateString('tr-TR')}
        </p>
      </div>

      {/* GÖNDERİ OLUŞTUR */}
      <div className="mt-6 px-4">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Ne paylaşmak istersin?"
          className="w-full p-3 border rounded-lg mb-2 dark:bg-gray-800 dark:text-white"
          rows={3}
        />
        <button
          onClick={handlePost}
          className="bg-mint text-navy font-semibold px-6 py-2 rounded-xl hover:opacity-90 transition"
        >
          Gönder
        </button>
      </div>

      {/* GÖNDERİLER */}
      <div className="mt-6 px-4">
        <h3 className="text-lg font-semibold mb-2">Gönderiler</h3>
        {posts.map((post) => (
          <div key={post.id} className="p-4 mb-3 border rounded-lg dark:bg-gray-800 dark:text-white">
            <p>{post.content}</p>
            <p className="text-sm text-gray-400 mt-1">{new Date(post.createdAt.seconds * 1000).toLocaleString('tr-TR')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
