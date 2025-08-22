"use client";

import React, { useState } from "react";
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { recentQueries } from "@/lib/data/dataServicesData";
import { 
  Search, 
  Play, 
  Save, 
  Download, 
  Code,
  Table,
  BarChart3,
  Clock,
  Database,
  ArrowLeft,
  Sparkles,
  Copy,
  Share2
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function QueryDataPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [queryName, setQueryName] = useState("");
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("editor");

  const sampleQueries = [
    {
      name: "Top Customers by Revenue",
      query: "SELECT customer_id, customer_name, SUM(order_value) as total_revenue\nFROM orders\nGROUP BY customer_id, customer_name\nORDER BY total_revenue DESC\nLIMIT 10"
    },
    {
      name: "Daily Active Users",
      query: "SELECT DATE(activity_time) as date, COUNT(DISTINCT user_id) as active_users\nFROM user_activity\nWHERE activity_time >= CURRENT_DATE - INTERVAL 30 DAY\nGROUP BY DATE(activity_time)\nORDER BY date"
    },
    {
      name: "Product Performance",
      query: "SELECT p.product_name, p.category, COUNT(o.order_id) as orders, SUM(o.quantity) as units_sold\nFROM products p\nJOIN order_items o ON p.product_id = o.product_id\nGROUP BY p.product_id, p.product_name, p.category\nORDER BY units_sold DESC"
    }
  ];

  const handleRunQuery = async () => {
    setRunning(true);
    // Simulate query execution
    setTimeout(() => {
      setRunning(false);
      setResults([
        { id: 1, customer_name: "Acme Corp", revenue: 125000, orders: 45 },
        { id: 2, customer_name: "TechStart Inc", revenue: 98000, orders: 32 },
        { id: 3, customer_name: "Global Solutions", revenue: 87500, orders: 28 },
        { id: 4, customer_name: "DataDrive Ltd", revenue: 76000, orders: 24 },
        { id: 5, customer_name: "CloudFirst", revenue: 65000, orders: 21 },
      ]);
    }, 2000);
  };

  const formatQuery = () => {
    // Simple SQL formatter
    const formatted = query
      .replace(/\s+/g, ' ')
      .replace(/,/g, ',\n  ')
      .replace(/FROM/gi, '\nFROM')
      .replace(/WHERE/gi, '\nWHERE')
      .replace(/GROUP BY/gi, '\nGROUP BY')
      .replace(/ORDER BY/gi, '\nORDER BY')
      .replace(/JOIN/gi, '\nJOIN')
      .replace(/LIMIT/gi, '\nLIMIT');
    setQuery(formatted);
  };

  return (
    <>
      <StaticExportLayout>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push('/data-services')}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Query Data</h1>
              <p className="text-muted-foreground">
                Run SQL queries on your data and create custom reports
              </p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="editor">Query Editor</TabsTrigger>
              <TabsTrigger value="saved">Saved Queries</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-purple-500" />
                      SQL Query Editor
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={formatQuery}>
                        <Sparkles className="h-4 w-4 mr-1" />
                        Format
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Input
                        placeholder="Query name (optional)"
                        value={queryName}
                        onChange={(e) => setQueryName(e.target.value)}
                        className="mb-2"
                      />
                      <textarea
                        className="w-full h-64 p-3 font-mono text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="SELECT * FROM customers WHERE ..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </div>

                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <Button 
                          onClick={handleRunQuery}
                          disabled={!query || running}
                        >
                          {running ? (
                            <>
                              <Clock className="h-4 w-4 mr-2 animate-spin" />
                              Running...
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Run Query
                            </>
                          )}
                        </Button>
                        <Button variant="outline">
                          <Save className="h-4 w-4 mr-2" />
                          Save Query
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                        <Button variant="outline">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {results.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Table className="h-5 w-5 text-blue-500" />
                      Query Results
                      <Badge variant="secondary">{results.length} rows</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2 text-sm font-medium">ID</th>
                            <th className="text-left p-2 text-sm font-medium">Customer Name</th>
                            <th className="text-left p-2 text-sm font-medium">Revenue</th>
                            <th className="text-left p-2 text-sm font-medium">Orders</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((row) => (
                            <tr key={row.id} className="border-b">
                              <td className="p-2 text-sm">{row.id}</td>
                              <td className="p-2 text-sm">{row.customer_name}</td>
                              <td className="p-2 text-sm">${row.revenue.toLocaleString()}</td>
                              <td className="p-2 text-sm">{row.orders}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="saved" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Queries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentQueries.map((savedQuery) => (
                      <div key={savedQuery.queryId} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{savedQuery.queryName}</h4>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Database className="h-3 w-3" />
                                {savedQuery.rowsReturned.toLocaleString()} rows
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {savedQuery.executionTime}
                              </span>
                              <span>{savedQuery.executedAt}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              className={
                                savedQuery.status === 'completed' ? 'bg-green-100 text-green-800' :
                                savedQuery.status === 'running' ? 'bg-blue-100 text-blue-800' :
                                'bg-red-100 text-red-800'
                              }
                            >
                              {savedQuery.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              Load
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Query Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {sampleQueries.map((template, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">{template.name}</h4>
                        <pre className="text-xs text-muted-foreground bg-gray-50 p-2 rounded overflow-x-auto">
                          {template.query}
                        </pre>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-3 w-full"
                          onClick={() => {
                            setQuery(template.query);
                            setQueryName(template.name);
                            setActiveTab("editor");
                          }}
                        >
                          Use Template
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-orange-500" />
                    Popular Analytics Queries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <h5 className="font-medium text-sm">Customer Lifetime Value</h5>
                      <p className="text-xs text-muted-foreground">Calculate CLV for all customers</p>
                    </div>
                    <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <h5 className="font-medium text-sm">Churn Analysis</h5>
                      <p className="text-xs text-muted-foreground">Identify customers at risk of churning</p>
                    </div>
                    <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <h5 className="font-medium text-sm">Revenue Forecast</h5>
                      <p className="text-xs text-muted-foreground">Project revenue for next quarter</p>
                    </div>
                    <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <h5 className="font-medium text-sm">Cohort Analysis</h5>
                      <p className="text-xs text-muted-foreground">Analyze user behavior by cohort</p>
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