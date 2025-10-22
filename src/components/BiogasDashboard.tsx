import { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
// Removed recharts import to avoid TypeScript errors
import { 
  Thermometer, 
  Droplets, 
  Gauge, 
  Trash2, 
  Fuel,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";

// Mock real-time data generation
const generateMockData = () => ({
  temperature: Math.random() * 6 + 37, // 37-43°C (more focused on optimal range)
  ph: Math.random() * 1.2 + 6.8, // 6.8-8.0 pH (tighter optimal range)
  pressure: Math.random() * 3 + 9, // 9-12 kPa (more stable range)
  gasStorage: Math.random() * 20 + 70, // 70-90% (higher baseline)
  wasteInput: Math.random() * 30 + 50, // 50-80% (more realistic range)
  timestamp: new Date().toLocaleTimeString()
});

const getStatusColor = (value: number, min: number, max: number, optimal: [number, number]) => {
  if (value < min || value > max) return "destructive";
  if (value >= optimal[0] && value <= optimal[1]) return "success";
  return "warning";
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "success": return <CheckCircle className="h-4 w-4" />;
    case "warning": return <AlertTriangle className="h-4 w-4" />;
    case "destructive": return <XCircle className="h-4 w-4" />;
    default: return <CheckCircle className="h-4 w-4" />;
  }
};


type BiogasData = {
  temperature: number;
  ph: number;
  pressure: number;
  gasStorage: number;
  wasteInput: number;
  timestamp: string;
};

export function BiogasDashboard() {
  const [currentData, setCurrentData] = useState(generateMockData());
  const [historicalData, setHistoricalData] = useState<BiogasData[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateMockData();
      setCurrentData(newData);
      // Keep last 1440 data points for 24 hours (if 1s interval)
      setHistoricalData(prev => {
        const updated = [...prev, newData].slice(-1440);
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const tempStatus = getStatusColor(currentData.temperature, 30, 50, [35, 45]);
  const phStatus = getStatusColor(currentData.ph, 6, 9, [6.8, 7.5]);
  const pressureStatus = getStatusColor(currentData.pressure, 5, 15, [8, 12]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Biogas Monitoring System</h1>
        </div>
        <Badge variant="outline" className="bg-success/10 text-success border-success">
          System Online
        </Badge>
      </div>


  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-sensor-temperature" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.temperature.toFixed(1)}°C</div>
            <div className="flex items-center space-x-2 mt-2">
              <Badge
                variant={
                  tempStatus === "success"
                    ? "default"
                    : tempStatus === "warning"
                    ? "secondary"
                    : "destructive"
                }
                className={
                  `text-xs ${tempStatus === "warning" ? "bg-yellow-500 text-white border-yellow-500" : ""}`
                }
              >
                {getStatusIcon(tempStatus)}
                {tempStatus === "success" ? "Optimal" : tempStatus === "warning" ? "Warning" : "Critical"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">pH Level</CardTitle>
            <Droplets className="h-4 w-4 text-sensor-ph" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.ph.toFixed(1)}</div>
            <div className="flex items-center space-x-2 mt-2">
              <Badge
                variant={
                  phStatus === "success"
                    ? "default"
                    : phStatus === "warning"
                    ? "destructive"
                    : "destructive"
                }
                className={
                  `text-xs ${phStatus === "warning" ? "bg-red-500 text-white border-red-500" : ""}`
                }
              >
                {getStatusIcon(phStatus)}
                {phStatus === "success" ? "Optimal" : phStatus === "warning" ? "Warning" : "Critical"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gas Pressure</CardTitle>
            <Gauge className="h-4 w-4 text-sensor-pressure" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.pressure.toFixed(1)} kPa</div>
            <div className="flex items-center space-x-2 mt-2">
              <Badge
                variant={
                  pressureStatus === "success"
                    ? "default"
                    : pressureStatus === "warning"
                    ? "destructive"
                    : "destructive"
                }
                className={
                  `text-xs ${pressureStatus === "warning" ? "bg-red-500 text-white border-red-500" : ""}`
                }
              >
                {getStatusIcon(pressureStatus)}
                {pressureStatus === "success" ? "Optimal" : pressureStatus === "warning" ? "Warning" : "Critical"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gas Storage</CardTitle>
            <Fuel className="h-4 w-4 text-sensor-gas" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.gasStorage.toFixed(0)}%</div>
            <Progress value={currentData.gasStorage} className="mt-2" />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-muted-foreground">Storage tank level</p>
              <Badge
                variant={currentData.gasStorage > 85 ? "destructive" : currentData.gasStorage > 75 ? "secondary" : "default"}
                className="text-xs"
              >
                {currentData.gasStorage > 85 ? "High" : currentData.gasStorage > 75 ? "Moderate" : "Normal"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waste Input</CardTitle>
            <Trash2 className="h-4 w-4 text-sensor-waste" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.wasteInput.toFixed(0)}%</div>
            <Progress value={currentData.wasteInput} className="mt-2" />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-muted-foreground">Digester fill level</p>
              <Badge
                variant={currentData.wasteInput > 75 ? "destructive" : currentData.wasteInput > 65 ? "secondary" : "default"}
                className="text-xs"
              >
                {currentData.wasteInput > 75 ? "High" : currentData.wasteInput > 65 ? "Moderate" : "Normal"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>


      {/* 24 HRS TRENDS Line Graph (Full Width) */}
      <div className="w-full">
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center space-x-2 justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>24 HRS TRENDS</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historicalData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" minTickGap={30} />
                  <YAxis yAxisId="left" label={{ value: 'Temp (°C)', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'pH', angle: 90, position: 'insideRight' }} />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#f59e42" name="Temperature (°C)" dot={false} isAnimationActive={false} />
                  <Line yAxisId="right" type="monotone" dataKey="ph" stroke="#3b82f6" name="pH Level" dot={false} isAnimationActive={false} />
                  <Line yAxisId="left" type="monotone" dataKey="pressure" stroke="#10b981" name="Pressure (kPa)" dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* Removed auto-update sentence under the line graph */}
          </CardContent>
        </Card>
      </div>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>Temperature Trend</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Current</span>
                <span className="font-bold text-lg">{currentData.temperature.toFixed(1)}°C</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Min Today</p>
                  <p className="font-medium">34.2°C</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Max Today</p>
                  <p className="font-medium">41.8°C</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Avg Today</p>
                  <p className="font-medium">38.1°C</p>
                </div>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-sensor-temperature h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min(100, (currentData.temperature / 50) * 100)}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>pH Level Trend</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Current</span>
                <span className="font-bold text-lg">{currentData.ph.toFixed(1)}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Min Today</p>
                  <p className="font-medium">6.8</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Max Today</p>
                  <p className="font-medium">7.5</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Avg Today</p>
                  <p className="font-medium">7.2</p>
                </div>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-sensor-ph h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min(100, ((currentData.ph - 6) / 3) * 100)}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status Summary */}
      <Card>
        <CardHeader>
          <CardTitle>System Status Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg">
              <CheckCircle className="h-5 w-5 text-success" />
              <div>
                <p className="font-medium text-success">All Systems Normal</p>
                <p className="text-sm text-muted-foreground">Last checked: {currentData.timestamp}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg">
              <Fuel className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Daily Production</p>
                <p className="text-sm text-muted-foreground">12.5 m³ gas generated</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-accent/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-accent" />
              <div>
                <p className="font-medium">Efficiency</p>
                <p className="text-sm text-muted-foreground">Running at 87% optimal</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
