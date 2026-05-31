import DashboardLayout from "../components/DashboardLayout";
import StatsGrid from "../components/StatsGrid";
import ViolationsTable from "../components/ViolationsTable";
import VirtualZoneMap from "../components/VirtualZoneMap";
import ViolationChart from "../components/ViolationChart";
import ActivityFeed from "../components/ActivityFeed";

export default function DashboardPage() {
  return (
    <DashboardLayout pageTitle="Ringkasan Dashboard">
      <StatsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        <div className="lg:col-span-8"><ViolationChart /></div>
        <div className="lg:col-span-4"><ActivityFeed /></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        <div className="lg:col-span-8"><ViolationsTable /></div>
        <div className="lg:col-span-4"><VirtualZoneMap /></div>
      </div>
    </DashboardLayout>
  );
}
