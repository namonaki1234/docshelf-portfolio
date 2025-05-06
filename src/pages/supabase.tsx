import { PageLayout } from '@/components/PageLayout';

export const SupabasePage = () => {
  return (
    <PageLayout
      title="Supabase"
      description="認証、リアルタイムDB、SQL、Row Level Security などの使い方を解説。"
    >
      <ul className="list-disc list-inside space-y-1">
        <li>メール認証のセットアップ</li>
        <li>CRUD操作の例（insert/select/update/delete）</li>
        <li>テーブル設計の基本</li>
      </ul>
    </PageLayout>
  );
};
