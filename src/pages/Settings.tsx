import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon, 
  Wifi, 
  Bell, 
  Thermometer, 
  Droplets, 
  Gauge,
  Save,
  RefreshCw,
  BookOpen
} from "lucide-react";

import { useState } from "react";


export default function Settings() {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
          <p className="text-muted-foreground">Configure monitoring parameters and system preferences</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-success/10 text-success border-success">
            Configuration Saved
          </Badge>
          <button
            type="button"
            className="ml-2 p-2 rounded-full hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
            title="User Guide: How to use this website"
            onClick={() => setShowGuide(true)}
          >
            <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
          </button>
        </div>
      </div>

      {/* User Guide Modal - does NOT remove or change any settings */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" /> User Guide
            </h2>
            <p className="mb-4 text-muted-foreground">Welcome to the Biogas Monitoring System! Please read the guide below to understand how to use the app:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <strong>Sensor Thresholds:</strong> Set minimum and maximum warning values for temperature, pH, and gas pressure. These help the system alert you when readings are outside safe ranges.
              </li>
              <li>
                <strong>Alert Preferences:</strong> Enable or disable email and sound notifications. You can choose to receive only critical alerts and set your preferred alert email address.
              </li>
              <li>
                <strong>Network Configuration:</strong> Check your network status, server URL, and update frequency. Use "Test Connection" to verify connectivity.
              </li>
              <li>
                <strong>System Information:</strong> View system version, uptime, and connected sensors. You can check for updates, download logs, or reset the system if needed.
              </li>
              <li>
                <strong>Saving Changes:</strong> After adjusting settings, click the "Save" button to apply your changes. A "Configuration Saved" badge will confirm successful saving.
              </li>
              <li>
                <strong>Support:</strong> For help or troubleshooting, contact your system administrator or refer to the official documentation.
              </li>
            </ul>
            <Button className="mt-6 w-full" onClick={() => setShowGuide(false)}>
              Close Guide
            </Button>
            <button
              className="absolute top-2 right-2 text-muted-foreground hover:text-primary"
              onClick={() => setShowGuide(false)}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* All original settings sections below remain unchanged! */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sensor Thresholds */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Thermometer className="h-5 w-5 text-primary" />
              <span>Sensor Thresholds</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Temperature (°C)</Label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Min Warning</Label>
                  <Input type="number" defaultValue="32" className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Max Warning</Label>
                  <Input type="number" defaultValue="45" className="mt-1" />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center space-x-2">
                <Droplets className="h-4 w-4" />
                <span>pH Level</span>
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Min Warning</Label>
                  <Input type="number" step="0.1" defaultValue="6.5" className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Max Warning</Label>
                  <Input type="number" step="0.1" defaultValue="8.0" className="mt-1" />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center space-x-2">
                <Gauge className="h-4 w-4" />
                <span>Gas Pressure (kPa)</span>
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Min Warning</Label>
                  <Input type="number" defaultValue="7" className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Max Warning</Label>
                  <Input type="number" defaultValue="15" className="mt-1" />
                </div>
              </div>
            </div>

            <Button className="w-full mt-4">
              <Save className="h-4 w-4 mr-2" />
              Save Thresholds
            </Button>
          </CardContent>
        </Card>

        {/* Alert Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-primary" />
              <span>Alert Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Email Notifications</Label>
                <p className="text-xs text-muted-foreground">Receive alerts via email</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Critical Alerts Only</Label>
                <p className="text-xs text-muted-foreground">Only show high priority alerts</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Sound Notifications</Label>
                <p className="text-xs text-muted-foreground">Audio alerts for critical issues</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="space-y-3">
              <Label className="text-sm font-medium">Alert Email Address</Label>
              <Input type="email" defaultValue="school@example.com" />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Check Interval (minutes)</Label>
              <Input type="number" defaultValue="5" min="1" max="60" />
            </div>
          </CardContent>
        </Card>

        {/* Centered Network Configuration */}
        <div className="col-span-1 lg:col-span-2 flex justify-center">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wifi className="h-5 w-5 text-primary" />
                <span>Network Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm font-medium">Connected to Network</span>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success border-success">
                  Strong Signal
                </Badge>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label className="text-sm font-medium">Data Server URL</Label>
                <Input defaultValue="https://biogas.edu/api" />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Update Frequency (seconds)</Label>
                <Input type="number" defaultValue="30" min="10" max="300" />
              </div>

              <Button variant="outline" className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Test Connection
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* System Information card removed as requested */}
      </div>
    </div>
  );
}