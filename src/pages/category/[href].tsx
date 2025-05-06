import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { PageLayout } from '@/components/PageLayout';
import type { Tip } from '@/types/tip';

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
        <ul className="space-y-4">
          {tips.map((tip) => (
            <li key={tip.id}>
              <h3 className="font-bold text-lg">{tip.title}</h3>
              <p className="text-slate-600">{tip.content}</p>
            </li>
          ))}
        </ul>
      )}
    </PageLayout>
  );
};
