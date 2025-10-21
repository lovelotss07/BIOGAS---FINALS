import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, XCircle, Bell, Settings } from "lucide-react";

const activeAlerts = [
  {
    id: 1,
    type: "warning",
    title: "Temperature Fluctuation",
    description: "Temperature has been varying between 35-42°C in the last hour",
    time: "10 minutes ago",
    severity: "medium"
  },
  {
    id: 2,
    type: "info",
    title: "Scheduled Maintenance Due",
    description: "Monthly system maintenance is scheduled for tomorrow",
    time: "2 hours ago",
    severity: "low"
  }
];

const recentAlerts = [
  {
    id: 3,
    type: "critical",
    title: "pH Level Critical",
    description: "pH dropped below 6.0 - immediate attention required",
    time: "Yesterday, 3:20 PM",
    severity: "high",
    resolved: true
  },
  {
    id: 4,
    type: "warning",
    title: "High Pressure Reading",
    description: "Gas pressure exceeded 14 kPa for 15 minutes",
    time: "2 days ago, 11:45 AM",
    severity: "medium",
    resolved: true
  },
  {
    id: 5,
    type: "info",
    title: "System Restart",
    description: "System automatically restarted after power outage",
    time: "3 days ago, 8:30 AM",
    severity: "low",
    resolved: true
  }
];

const getAlertIcon = (type: string) => {
  switch (type) {
    case "critical": return <XCircle className="h-5 w-5 text-destructive" />;
    case "warning": return <AlertTriangle className="h-5 w-5 text-warning" />;
    case "info": return <Bell className="h-5 w-5 text-primary" />;
    default: return <CheckCircle className="h-5 w-5 text-success" />;
  }
};

const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case "high": return <Badge variant="destructive">High Priority</Badge>;
    case "medium": return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning">Medium</Badge>;
    case "low": return <Badge variant="outline">Low Priority</Badge>;
    default: return <Badge variant="outline">Unknown</Badge>;
  }
};

export default function Alerts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Alerts</h1>
          <p className="text-muted-foreground">Monitor and manage system notifications and alerts</p>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <XCircle className="h-5 w-5 text-destructive" />
              <div>
                <div className="text-2xl font-bold">0</div>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <div>
                <div className="text-2xl font-bold">1</div>
                <p className="text-sm text-muted-foreground">Warning Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">1</div>
                <p className="text-sm text-muted-foreground">Info Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <div>
                <div className="text-2xl font-bold">3</div>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <span>Active Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeAlerts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-success" />
              <p>No active alerts - all systems operating normally</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start justify-between p-4 border border-border rounded-lg bg-card">
                  <div className="flex items-start space-x-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium">{alert.title}</h3>
                        {getSeverityBadge(alert.severity)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                  {/* Action buttons removed as requested */}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Resolved Alerts card removed as requested */}
    </div>
  );
}