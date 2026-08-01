function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111] p-6">
      <h3 className="text-gray-400 text-sm">{title}</h3>

      <p className="text-4xl font-bold text-white mt-3">
        {value}
      </p>
    </div>
  );
}

export default StatCard;