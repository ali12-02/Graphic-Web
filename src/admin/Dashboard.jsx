import DashboardLayout from "./DashboardLayout";
import StatCard from "./StatCard";
import RecentProjects from "./RecentProjects";
import QuickActions from "./QuickActions";

function Dashboard() {
  return (
    <DashboardLayout>
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-1/3 h-96 w-96 rounded-full bg-purple-700/20 blur-[180px]" />
        <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-blue-700/10 blur-[180px]" />
      </div>

      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Welcome back, Mohsin 👋
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        <StatCard
          title="Projects"
          value="12"
          color="purple"
        />

        <StatCard
          title="Gallery"
          value="38"
          color="blue"
        />

        <StatCard
          title="Messages"
          value="8"
          color="green"
        />

        <StatCard
          title="Services"
          value="6"
          color="orange"
        />

      </div>

      {/* Bottom Section */}
      <div className="grid xl:grid-cols-3 gap-8">

        <div className="xl:col-span-2">
          <RecentProjects />
        </div>

        <div>
          <QuickActions />
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;