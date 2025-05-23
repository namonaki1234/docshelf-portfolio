import { Link } from 'react-router-dom';

type NavCardProps = {
  name: string;
  description: string;
  href: string;
};

export const NavCard = ({ name, description, href }: NavCardProps) => {
  return (
    <Link to={`/category/${href}`}>
      <div className="border rounded p-3 hover:shadow transition bg-white max-w-85">
        <h2 className="text-2xl font-semibold text-slate-800">{name}</h2>
        <p className="text-slate-600">{description}</p>
      </div>
    </Link>
  );
};
