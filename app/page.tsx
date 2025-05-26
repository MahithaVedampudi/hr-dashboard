import { StatsCards } from "@/components/dashboard/StatsCards";
import { DepartmentChart } from "@/components/dashboard/DepartmentChart";
import { PerformanceDistribution } from "@/components/dashboard/PerformanceDistribution";
import { BookmarkStats } from "@/components/dashboard/BookmarkStats";
import { EmployeeList } from "@/components/employee/EmployeeList";
import { 
  StatsClientWrapper,
  DepartmentChartClientWrapper,
  PerformanceDistributionClientWrapper,
  BookmarkStatsClientWrapper
} from "@/components/dashboard/ClientWrappers";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Updated as of {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid gap-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Employee Overview</h2>
          <StatsClientWrapper />
        </div>
      
        <div className="grid gap-6 md:grid-cols-2">
          <DepartmentChartClientWrapper />
          <PerformanceDistributionClientWrapper />
        </div>
      
        <div className="grid gap-6 md:grid-cols-2">
          <BookmarkStatsClientWrapper />
        </div>
      
        <div>
          <h2 className="text-2xl font-semibold tracking-tight mb-6">All Employees</h2>
          <EmployeeList />
        </div>
      </div>
    </div>
  );
}