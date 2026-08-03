import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl border border-white/10 bg-[#111] p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Quick Actions
      </h2>

      <div className="space-y-4">
        <button
          onClick={() => navigate("/dashboard/projects")}
          className="w-full rounded-xl bg-purple-600 py-3 text-white transition hover:bg-purple-700"
        >
          Manage Projects
        </button>

        <button
          onClick={() => navigate("/dashboard/categories")}
          className="w-full rounded-xl bg-blue-600 py-3 text-white transition hover:bg-blue-700"
        >
          Manage Categories
        </button>
      </div>
    </div>
  );
}

export default QuickActions;