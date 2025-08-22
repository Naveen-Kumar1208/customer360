import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { AreaChart } from "@/components/dashboard/AreaChart";
import { BarChart } from "@/components/dashboard/BarChart";
import {
  salesData,
  salesCategories,
  performanceData,
  performanceCategories,
  visitorData,
  visitorCategories,
} from "@/lib/data/dashboardData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default function AnalyticsPage() {
  return (
    <>
      <StaticExportLayout>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              Detailed analytics and sales performance metrics
            </p>
          </div>

          <Tabs defaultValue="sales">
            <TabsList className="mb-4">
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="visitors">Visitors</TabsTrigger>
            </TabsList>

            <TabsContent value="sales" className="space-y-6">
              <AreaChart
                title="Sales Revenue & Profit"
                data={salesData}
                categories={salesCategories}
              />

              <Card>
                <CardHeader>
                  <CardTitle>Sales Growth</CardTitle>
                  <CardDescription>Year over year sales growth analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <div className="flex flex-col p-4 border rounded-lg">
                      <span className="text-muted-foreground text-sm">This Year</span>
                      <span className="text-3xl font-bold mt-1">$98,351</span>
                      <span className="text-green-500 text-sm mt-2">+12.5% from last year</span>
                    </div>
                    <div className="flex flex-col p-4 border rounded-lg">
                      <span className="text-muted-foreground text-sm">Last Year</span>
                      <span className="text-3xl font-bold mt-1">$87,432</span>
                      <span className="text-green-500 text-sm mt-2">+8.3% from 2022</span>
                    </div>
                    <div className="flex flex-col p-4 border rounded-lg">
                      <span className="text-muted-foreground text-sm">Projection</span>
                      <span className="text-3xl font-bold mt-1">$112,500</span>
                      <span className="text-blue-500 text-sm mt-2">Expected by end of year</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <BarChart
                title="Team Performance"
                data={performanceData}
                categories={performanceCategories}
              />

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
                    <div className="flex flex-col p-4 border rounded-lg">
                      <span className="text-muted-foreground text-sm">Conversion Rate</span>
                      <span className="text-3xl font-bold mt-1">3.2%</span>
                      <span className="text-green-500 text-sm mt-2">+0.4% from last month</span>
                    </div>
                    <div className="flex flex-col p-4 border rounded-lg">
                      <span className="text-muted-foreground text-sm">Avg. Order Value</span>
                      <span className="text-3xl font-bold mt-1">$78.50</span>
                      <span className="text-green-500 text-sm mt-2">+$3.20 from last month</span>
                    </div>
                    <div className="flex flex-col p-4 border rounded-lg">
                      <span className="text-muted-foreground text-sm">Cart Abandonment</span>
                      <span className="text-3xl font-bold mt-1">24.8%</span>
                      <span className="text-red-500 text-sm mt-2">+2.3% from last month</span>
                    </div>
                    <div className="flex flex-col p-4 border rounded-lg">
                      <span className="text-muted-foreground text-sm">Customer Retention</span>
                      <span className="text-3xl font-bold mt-1">68.7%</span>
                      <span className="text-green-500 text-sm mt-2">+5.4% from last month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="visitors" className="space-y-6">
              <AreaChart
                title="Website Visitors"
                data={visitorData}
                categories={visitorCategories}
              />

              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Where your visitors are coming from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
                    <div className="flex flex-col p-4 border rounded-lg">
                      <span className="text-muted-foreground text-sm">Direct</span>
                      <span className="text-3xl font-bold mt-1">42%</span>
                      <span className="text-green-500 text-sm mt-2">+5% from last month</span>
                    </div>
                    <div className="flex flex-col p-4 border rounded-lg">
                      <span className="text-muted-foreground text-sm">Organic Search</span>
                      <span className="text-3xl font-bold mt-1">28%</span>
                      <span className="text-green-500 text-sm mt-2">+3% from last month</span>
                    </div>
                    <div className="flex flex-col p-4 border rounded-lg">
                      <span className="text-muted-foreground text-sm">Social Media</span>
                      <span className="text-3xl font-bold mt-1">16%</span>
                      <span className="text-red-500 text-sm mt-2">-2% from last month</span>
                    </div>
                    <div className="flex flex-col p-4 border rounded-lg">
                      <span className="text-muted-foreground text-sm">Referral</span>
                      <span className="text-3xl font-bold mt-1">14%</span>
                      <span className="text-blue-500 text-sm mt-2">No change</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </StaticExportLayout>
    </>
  );
}
