import { Link } from 'react-router-dom';

type PageLayoutProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export const PageLayout = ({
  title,
  description,
  children,
}: PageLayoutProps) => {
  return (
    <main className="p-6 space-y-6 max-w-3xl mx-auto">
      <div className="mb-4 flex flex-col gap-4">  
        <Link to="/">
          <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400 transition">
            ← ホームに戻る
          </button>
        </Link>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          {title}
        </h1>
      </div>
      {description && (
        <p className="text-slate-600 dark:text-slate-300">{description}</p>
      )}
      <div>{children}</div>
    </main>
  );
};
