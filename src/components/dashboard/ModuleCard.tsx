interface Props {
  title: string;
  description: string;
  icon: string;
}

function ModuleCard({ title, description, icon }: Props) {
  return (
    <div className="app-card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="text-5xl">{icon}</div>

      <h3 className="app-heading mt-4 text-xl">
        {title}
      </h3>

      <p className="app-muted mt-3 leading-7">
        {description}
      </p>
    </div>
  );
}

export default ModuleCard;