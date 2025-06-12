import { Card } from "@/components/molecules/Card";

export default function ReportLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-base-300 rounded"></div>

      {/* Monthly Stats Loading */}
      <Card>
        <div className="p-6">
          <div className="h-6 w-40 bg-base-300 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-base-200 rounded-lg p-4">
                <div className="h-4 w-24 bg-base-300 rounded mb-2"></div>
                <div className="h-8 w-32 bg-base-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Chart Loading */}
      <Card>
        <div className="p-6">
          <div className="h-6 w-48 bg-base-300 rounded mb-4"></div>
          <div className="h-[300px] bg-base-200 rounded"></div>
        </div>
      </Card>

      {/* Table Loading */}
      <Card>
        <div className="p-6">
          <div className="h-6 w-40 bg-base-300 rounded mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-base-200 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
