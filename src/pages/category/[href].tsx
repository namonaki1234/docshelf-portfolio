import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { PageLayout } from '@/components/PageLayout';
import type { Tip } from '@/types/tip';
import Markdown from 'react-markdown';

export const CategoryPage = () => {
  const { href } = useParams();
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [tips, setTips] = useState<Tip[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategoryAndTips = async () => {
      // カテゴリを取得
      const { data: category } = await supabase
        .from('categories')
        .select('*')
        .eq('href', href)
        .single();

      if (!category) {
        setError('カテゴリが見つかりません');
        return;
      }

      setCategoryName(category.name);
      setDescription(category.description);

      // Tipsを取得
      const { data: tipsData } = await supabase
        .from('tips')
        .select('*')
        .eq('category_id', category.id)
        .order('created_at', { ascending: false });

      setTips(tipsData || []);
    };

    if (href) fetchCategoryAndTips();
  }, [href]);

  if (error) {
    return (
      <PageLayout title="カテゴリエラー">
        <p className="text-red-500">{error}</p>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={`📚 ${categoryName}`} description={description}>
      {tips.length === 0 ? (
        <p>このカテゴリにはまだTipsがありません。</p>
      ) : (
        <ul className="space-y-6">
          {tips.map((tip) => (
            <li
              key={tip.id}
              className="border border-slate-200 rounded-lg p-4 shadow-sm bg-white"
            >
              <h3 className="font-bold text-xl text-slate-800 mb-2 pl-3 border-l-4 border-blue-500">
                {tip.title}
              </h3>

              <hr className="mb-3 border-slate-300" />
              <div className="markdown max-w-none text-slate-700">
                <Markdown>{tip.content}</Markdown>
              </div>
              <hr className="mt-4 border-slate-200" />
            </li>
          ))}
        </ul>
      )}
    </PageLayout>
  );
};
