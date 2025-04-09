// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import {
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [activeTab, setActiveTab] = useState('gonderiler');

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
  const q = query(
    collection(db, 'posts'),
    where('uid', '==', user.uid),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs
    .filter(doc => doc.data().createdAt) // ✅ Yalnızca timestamp oluşmuş olanları al
    .map(doc => ({ id: doc.id, ...doc.data() }));
  setPosts(data);
};


  const handlePost = async () => {
    if (newPost.trim() === '' || newPost.length > 250) return;
    await addDoc(collection(db, 'posts'), {
      uid: user.uid,
      content: newPost,
      createdAt: serverTimestamp(),
    });
    setNewPost('');
    fetchPosts();
  };

  const formatTimeAgo = (timestamp) => {
    if (!timestamp || !timestamp.toDate) return 'yükleniyor...';
    const now = new Date();
    const postDate = timestamp.toDate();
    const diff = Math.floor((now - postDate) / 1000);

    if (diff < 60) return `${diff} sn`;
    if (diff < 3600) return `${Math.floor(diff / 60)} dk`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} sa`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} gün`;
    if (diff < 2592000) return `${Math.floor(diff / 604800)} hafta`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)} ay`;
    return `${Math.floor(diff / 31536000)} yıl`;
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
          placeholder="Ne paylaşmak istersin? (En fazla 250 karakter)"
          className="w-full p-3 border rounded-lg mb-2 dark:bg-gray-800 dark:text-white"
          rows={3}
          maxLength={250}
        />
        <div className="text-right text-sm text-gray-400 mb-2">{newPost.length}/250</div>
        <button
          onClick={handlePost}
          className="bg-mint text-navy font-semibold px-6 py-2 rounded-xl hover:opacity-90 transition"
        >
          Gönder
        </button>
      </div>

      {/* SEKME MENÜSÜ */}
      <div className="mt-8 px-4 border-b flex gap-6 text-sm font-semibold text-gray-500 dark:text-gray-300">
        <button onClick={() => setActiveTab('gonderiler')} className={activeTab === 'gonderiler' ? 'text-navy dark:text-mint border-b-2 border-mint pb-2' : 'pb-2'}>
          Gönderiler
        </button>
        <button onClick={() => setActiveTab('yanitlar')} className={activeTab === 'yanitlar' ? 'text-navy dark:text-mint border-b-2 border-mint pb-2' : 'pb-2'}>
          Yanıtlar
        </button>
        <button onClick={() => setActiveTab('begeniler')} className={activeTab === 'begeniler' ? 'text-navy dark:text-mint border-b-2 border-mint pb-2' : 'pb-2'}>
          Beğeniler
        </button>
      </div>

      {/* GÖNDERİLER */}
      <div className="mt-4 px-4">
        {activeTab === 'gonderiler' && posts.map((post) => (
          <div key={post.id} className="p-4 mb-3 border rounded-lg dark:bg-gray-800 dark:text-white">
            <p>{post.content}</p>
            <p className="text-sm text-gray-400 mt-1">{formatTimeAgo(post.createdAt)}</p>
          </div>
        ))}
        {activeTab !== 'gonderiler' && (
          <p className="text-gray-400 text-sm mt-4">Bu sekme şu anda yapım aşamasında.</p>
        )}
      </div>
    </div>
  );
}
