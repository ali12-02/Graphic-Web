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
          Add Project
        </button>

        <button
          className="w-full rounded-xl bg-blue-600 py-3 text-white transition hover:bg-blue-700"
        >
          Upload Image
        </button>

        <button
          className="w-full rounded-xl bg-green-600 py-3 text-white transition hover:bg-green-700"
        >
          Add Service
        </button>
      </div>
    </div>
  );
}

export default QuickActions;