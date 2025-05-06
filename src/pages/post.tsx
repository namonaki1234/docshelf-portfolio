import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { PageLayout } from '@/components/PageLayout';
import type { User } from '@supabase/supabase-js';

type Category = {
  id: string;
  name: string;
};

export const PostTipPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // ログイン中のユーザーを取得
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        console.error('ユーザー取得失敗:', error?.message);
        setStatus('ログイン状態を確認してください');
        setIsError(true);
        return;
      }
      setUser(data.user);
    };
    getUser();
  }, []);

  // カテゴリ一覧を取得
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('categories').select('*');
      if (data) setCategories(data);
    };
    fetchCategories();
  }, []);

  // 投稿処理
  const handleSubmit = async () => {
    if (!user) {
      setStatus('ログインしてください');
      setIsError(true);
      return;
    }
    if (!categoryId || !title || !content) {
      setStatus('全ての項目を入力してください');
      setIsError(true);
      return;
    }

    const { error } = await supabase.from('tips').insert({
      title,
      content,
      category_id: categoryId,
      user_id: user.id,
    });

    if (error) {
      console.error('投稿失敗:', error.message);
      setStatus('投稿に失敗しました');
      setIsError(true);
    } else {
      setStatus('投稿が完了しました！');
      setIsError(false);
      setTitle('');
      setContent('');
      setCategoryId('');
    }
  };

  return (
    <PageLayout title="Tips投稿" description="技術Tipsを追加できます">
      <div className="space-y-4">
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">カテゴリを選択</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          placeholder="内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded px-3 py-2 h-32"
        />

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 transition"
        >
          投稿する
        </button>

        {status && (
          <p className={isError ? 'text-red-500' : 'text-green-600'}>
            {status}
          </p>
        )}
      </div>
    </PageLayout>
  );
};
