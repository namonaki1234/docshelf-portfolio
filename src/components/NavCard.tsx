import { Link } from 'react-router-dom';

type NavCardProps = {
  name: string;
  description: string;
  href: string;
};

export const NavCard = ({ name, description, href }: NavCardProps) => {
  return (
    <Link to={`/category/${href}`}>
      <div className="border rounded p-4 hover:shadow transition bg-white">
        <h2 className="text-xl font-semibold text-slate-800">{name}</h2>
        <p className="text-slate-600">{description}</p>
      </div>
    </Link>
  );
};
