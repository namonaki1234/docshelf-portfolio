import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { PageLayout } from '@/components/PageLayout';
import type { Tip } from '@/types/tip';
import { TipCard } from '@/components/TipCard';
import { TipTable } from '@/components/TipTable';
import { TipFilterBar } from '@/components/TipFilterBar';

export const TipsPage = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [keyword, setKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [editingTip, setEditingTip] = useState<Tip | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
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
        setTips(data);
      } catch (err) {
        console.error('🔥 予期せぬエラー:', err);
      }
    };

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
              onEdit={setEditingTip}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <TipTable tips={tips} />
      )}

      {/* 編集モードならフォームを表示 */}
      {editingTip && (
        <div className="border p-4 mb-4 bg-white rounded shadow">
          <h2 className="text-lg font-bold mb-2">編集中: {editingTip.title}</h2>
          <input
            type="text"
            value={editingTip.title}
            onChange={(e) =>
              setEditingTip({ ...editingTip, title: e.target.value })
            }
            className="w-full border px-3 py-1 mb-2"
          />
          <textarea
            value={editingTip.content}
            onChange={(e) =>
              setEditingTip({ ...editingTip, content: e.target.value })
            }
            className="w-full border px-3 py-2 mb-2"
          />
          <button
            onClick={async () => {
              const { error } = await supabase
                .from('tips')
                .update({
                  title: editingTip.title,
                  content: editingTip.content,
                })
                .eq('id', editingTip.id)
                .eq('user_id', userId);
              if (!error) {
                // ステートのtipsを更新
                setTips((prevTips) =>
                  prevTips.map((tip) =>
                    tip.id === editingTip.id
                      ? {
                          ...tip,
                          title: editingTip.title,
                          content: editingTip.content,
                        }
                      : tip
                  )
                );
                setEditingTip(null); // フォームを閉じる
              }
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            更新
          </button>
          <button
            onClick={() => setEditingTip(null)}
            className="ml-2 text-gray-500"
          >
            キャンセル
          </button>
        </div>
      )}
    </PageLayout>
  );
};
