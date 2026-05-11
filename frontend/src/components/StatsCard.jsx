function StatsCard({ title, value, color }) {
  return (
    <div className="bg-[var(--card-bg)] border border-slate-800 rounded-3xl p-8 shadow-xl">
      <p className="text-slate-400 text-lg">{title}</p>

      <h1 className={`text-5xl font-bold mt-4 ${color}`}>
        {value}
      </h1>
    </div>
  );
}

export default StatsCard;