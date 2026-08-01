function RecentProjects() {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111] p-6">
      <h2 className="text-white text-2xl font-bold mb-6">
        Recent Projects
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between text-gray-300">
          <span>Brand Identity</span>
          <span className="text-green-400">Published</span>
        </div>

        <div className="flex justify-between text-gray-300">
          <span>Portfolio Website</span>
          <span className="text-yellow-400">Draft</span>
        </div>

        <div className="flex justify-between text-gray-300">
          <span>Social Media Kit</span>
          <span className="text-green-400">Published</span>
        </div>

      </div>
    </div>
  );
}

export default RecentProjects;