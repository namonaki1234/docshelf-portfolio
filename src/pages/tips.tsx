import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { PageLayout } from '@/components/PageLayout';
import type { Tip } from '@/types/tip';
import { TipCard } from '@/components/TipCard';
import { TipTable } from '@/components/TipTable';
import { TipFilterBar } from '@/components/TipFilterBar';
import type { Category } from '@/types/category';

export const TipsPage = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [keyword, setKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (!error && data) {
        setCategories(data);
      } else {
        console.error('カテゴリ取得に失敗:', error?.message);
      }
    };

    const fetchTips = async () => {
      try {
        const { data: userData, error: userError } =
          await supabase.auth.getUser();
        if (userError) {
          console.error('🔴 認証情報の取得に失敗:', userError.message);
          return;
        }
        if (!userData.user) {
          console.warn('⚠️ ログインユーザーが見つかりません');
          return;
        }
        setUserId(userData.user.id);
        let query = supabase
          .from('tips')
          .select('*')
          .eq('user_id', userData.user.id)
          .order('created_at', { ascending: sortOrder === 'asc' });
        if (keyword.trim() !== '') {
          query = query.ilike('title', `%${keyword}%`);
        }
        const { data, error } = await query;
        if (error) {
          console.error('🔴 tipsデータの取得に失敗:', error.message);
          return;
        }
        if (!data || data.length === 0) {
          console.info('ℹ️ 該当するTipsがありません');
        }
        // ステートに取得したデータをセット
        setTips(data);
      } catch (err) {
        console.error('🔥 予期せぬエラー:', err);
      }
    };

    fetchCategories();
    fetchTips();
  }, [keyword, sortOrder]);

  const handleDelete = async (id: string) => {
    if (!userId) return;
    const confirmed = window.confirm('本当に削除しますか？');
    if (!confirmed) return;

    const { error } = await supabase
      .from('tips')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);
    if (!error) {
      setTips(tips.filter((tip) => tip.id !== id));
    }
  };

  return (
    <PageLayout title="Tips一覧">
      <TipFilterBar
        keyword={keyword}
        setKeyword={setKeyword}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {viewMode === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip) => (
            <TipCard
              key={tip.id}
              tip={tip}
              isEditing={editingId === tip.id}
              onEdit={() => setEditingId(tip.id)}
              categories={categories}
              onCancel={() => setEditingId(null)}
              onDelete={handleDelete}
              onUpdate={async (title, content, categoryId) => {
                const { error } = await supabase
                  .from('tips')
                  .update({ title, content, category_id: categoryId })
                  .eq('id', tip.id)
                  .eq('user_id', userId);
                if (!error) {
                  setTips((prevTips) =>
                    prevTips.map((t) =>
                      t.id === tip.id
                        ? { ...t, title, content, category_id: categoryId }
                        : t
                    )
                  );
                  setEditingId(null);
                }
              }}
            />
          ))}
        </div>
      ) : (
        <TipTable tips={tips} />
      )}
    </PageLayout>
  );
};
