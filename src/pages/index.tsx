import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { NavCard } from '@/components/NavCard';
import { LogoutButton } from '@/components/LogoutButton';
import type { User } from '@supabase/supabase-js';

type Category = {
  id: string;
  name: string;
  description: string;
  href: string;
};

export const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();

    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) {
        console.error('カテゴリ取得エラー:', error);
        return;
      }
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <main className="p-6 space-y-6 max-w-3xl mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            📚 DocShelf
          </h1>
          {user && (
            <p className="text-sm text-slate-500 mt-1">
              ログイン中: {user.email}
            </p>
          )}
        </div>
        <LogoutButton />
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        <Link to="/tips">
          <button className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 transition">
            📝 自分のTips一覧を見る
          </button>
        </Link>
        <Link to="/post">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition">
            ➕ 新しいTipsを投稿
          </button>
        </Link>
      </div>

      <p className="text-slate-600">
        Web開発の知識をまとめて確認できるリファレンスアプリ
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <NavCard key={cat.id} {...cat} />
        ))}
      </div>
    </main>
  );
};
