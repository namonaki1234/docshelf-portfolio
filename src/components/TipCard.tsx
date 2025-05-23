import type { Tip } from '@/types/tip';
import type { Category } from '@/types/category';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export const TipCard = ({
  tip,
  isEditing,
  onEdit,
  onDelete,
  onUpdate,
  onCancel,
  categories,
}: {
  tip: Tip;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: (id: string) => void;
  onUpdate: (title: string, content: string, categoryId: string) => void;
  onCancel: () => void;
  categories: Category[];
}) => {
  const [title, setTitle] = useState(tip.title);
  const [content, setContent] = useState(tip.content);
  const [categoryId, setCategoryId] = useState(tip.category_id);

  return (
    <div className="border rounded p-4 bg-white shadow relative">
      {isEditing ? (
        <>
          <select
            className="w-full border px-2 py-1 mb-2 text-slate-800"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">カテゴリを選択</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            className="w-full border px-2 py-1 mb-2 text-slate-800"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full border px-2 py-1 mb-2 text-slate-700"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button
              onClick={() => onUpdate(title, content, categoryId)}
              className="bg-blue-600 hover:bg-blue-500"
              variant="default"
            >
              保存
            </Button>
            <Button onClick={onCancel} className="text-gray-500" variant="outline">
              キャンセル
            </Button>
          </div>
        </>
      ) : (
        <>
          <h3 className="font-semibold text-lg text-slate-800">{tip.title}</h3>
          <p className="text-slate-600 whitespace-pre-wrap">{tip.content}</p>
          <p className="text-sm text-slate-400 mt-2">
            {new Date(tip.created_at).toLocaleDateString()}
          </p>
          <div className="absolute top-2 right-2">
            <Button
              onClick={onEdit}
              className="text-blue-500 hover:underline text-sm"
              variant="outline"
            >
              編集
            </Button>
            <Button
              onClick={() => onDelete(tip.id)}
              className="text-red-500 hover:underline text-sm"
              variant="outline"
            >
              削除
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
