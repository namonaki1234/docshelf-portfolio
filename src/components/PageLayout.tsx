import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
          <Button variant="grayBack" className="mt-4">
            ← ホームに戻る
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-slate-800 ">{title}</h1>
      </div>
      {description && <p className="text-slate-600">{description}</p>}
      <div>{children}</div>
    </main>
  );
};
