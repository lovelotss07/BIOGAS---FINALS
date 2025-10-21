import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar, Download, TrendingUp, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Demo: Generate mock weekly data and logs for any week
function getWeeklyData(weekStart: Date, today: Date) {
  // Only show data for days up to today, future days are empty
  const base = weekStart.getDate();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    // Only show data for days up to and including today
    const isFuture = date.setHours(0,0,0,0) > today.setHours(0,0,0,0);
    if (isFuture) {
      return { day: days[date.getDay()], gasProduced: undefined, temperature: undefined, ph: undefined, hourly: [] };
    }
    return {
      day: days[date.getDay()],
      gasProduced: 12 + ((base + i) % 3),
      temperature: 38.5 + ((base + i) % 2),
      ph: 7.2,
      hourly: [1.2, 1.8, 2.0, 2.1, 2.3, 2.9],
    };
  });
}

function getSystemLogs(weekStart: Date, selectedDate?: Date, today?: Date) {
  // Only show logs if selectedDate is today or before
  const base = weekStart.getDate() + (selectedDate ? selectedDate.getDate() : 0);
  const statusArr = ["success", "warning", "info", "success", "info"];
  const eventsArr = [
    "System startup", "Temperature spike", "pH adjustment", "Gas collection", "Waste input"
  ];
  if (selectedDate && today && selectedDate.setHours(0,0,0,0) > today.setHours(0,0,0,0)) {
    return [];
  }
  return Array.from({ length: 5 }).map((_, i) => ({
    time: `${9 + i}:15 AM`,
    event: eventsArr[i],
    status: statusArr[(base + i) % statusArr.length],
    details: `Log for ${selectedDate ? selectedDate.toLocaleDateString('en-US') : 'week'}: ${eventsArr[i]}`
  }));
}

function History() {
  const [selectedDay, setSelectedDay] = useState<null | typeof weeklyData[0]>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  // Weekly range state
  const [weekStart, setWeekStart] = useState(() => {
    const now = new Date();
    const day = now.getDay();
    // week starts on Sunday (0), so subtract day to get to Sunday
    const start = new Date(now);
    start.setDate(now.getDate() - day);
    start.setHours(0,0,0,0);
    return start;
  });
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  // Limit navigation to current date
  const today = new Date();
  today.setHours(0,0,0,0);
  const isCurrentWeek = weekEnd >= today && weekStart <= today;
  const isFutureWeek = weekStart > today;


  // Get weekly data and logs for current week
  const weeklyData = getWeeklyData(weekStart, today);
  const systemLogs = getSystemLogs(weekStart, selectedDate, today);

  const handlePrevWeek = () => {
    const prev = new Date(weekStart);
    prev.setDate(weekStart.getDate() - 7);
    setWeekStart(prev);
  };
  const handleNextWeek = () => {
    // Allow next week if its start is <= today
    const next = new Date(weekStart);
    next.setDate(weekStart.getDate() + 7);
    if (next > today) return;
    setWeekStart(next);
  };

  // Helper to get the date for a given day index in the week
  const getDateForDay = (dayName: string) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const idx = days.indexOf(dayName);
    if (idx === -1) return null;
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + idx);
    return date;
  };

  const handleBarClick = (day: typeof weeklyData[0]) => {
    setSelectedDay(day);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedDay(null);
  };
  // Format week range string
  const formatWeekRange = (start: Date, end: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    if (start.getFullYear() !== end.getFullYear()) {
      return `${start.toLocaleDateString('en-US', options)} ${start.getFullYear()} - ${end.toLocaleDateString('en-US', options)} ${end.getFullYear()}`;
    }
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)} ${end.getFullYear()}`;
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">History & Logs</h1>
          <p className="text-muted-foreground">Historical data and system event logs</p>
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Data</span>
        </Button>
      </div>

      {/* Weekly Production Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle>Weekly Gas Production</CardTitle>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" aria-label="Previous week" onClick={handlePrevWeek}>
                &#8592;
              </Button>
              <span className="font-medium">
                {formatWeekRange(weekStart, weekEnd)}
              </span>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Next week"
                onClick={handleNextWeek}
                disabled={weekStart.getTime() >= today.setHours(0,0,0,0)}
              >
                &#8594;
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={weeklyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  onClick={(e) => {
                    if (e && e.activeLabel) {
                      const day = weeklyData.find(d => d.day === e.activeLabel);
                      if (day) handleBarClick(day);
                    }
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 15]} unit=" m³" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="gasProduced"
                    name="Gas Produced"
                    stroke="#10b981"
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                    connectNulls={false}
                    isAnimationActive={false}
                    dot={d => d.payload.gasProduced === undefined ? null : undefined}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 m³</span>
                <span>15 m³</span>
              </div>
              <div className="text-xs text-muted-foreground mt-2">Click on a data point to view analytics for that day.</div>
            </div>
        </CardContent>
      </Card>

      {/* Analytics Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md">
          {selectedDay && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <BarChart2 className="h-5 w-5 text-primary" />
                  <span>
                    Analytics for {selectedDay.day}
                    {(() => {
                      const dateObj = getDateForDay(selectedDay.day);
                      if (!dateObj) return null;
                      const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
                      return `, ${dateObj.toLocaleDateString('en-US', options)}`;
                    })()}
                  </span>
                </DialogTitle>
                <DialogDescription>
                  Gas production and process stats for {selectedDay.day}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="flex justify-between">
                  <span className="font-medium">Total Gas Produced:</span>
                  <span>{selectedDay.gasProduced} m³</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Avg Temperature:</span>
                  <span>{selectedDay.temperature}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Avg pH Level:</span>
                  <span>{selectedDay.ph}</span>
                </div>
                <div>
                  <span className="font-medium">Hourly Gas Production:</span>
                  <div className="flex items-end space-x-1 mt-2 h-16">
                    {selectedDay.hourly.map((val, i) => (
                      <div key={i} className="flex flex-col items-center group">
                        <div
                          className="w-4 bg-primary/70 rounded relative cursor-pointer"
                          style={{ height: `${(val / 3) * 100}%` }}
                        >
                          <span className="absolute left-1/2 -translate-x-1/2 -top-6 scale-0 group-hover:scale-100 transition bg-black text-white text-xs rounded px-2 py-1 z-10 whitespace-nowrap pointer-events-none">
                            Hour {i + 1}: {val} m³
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button variant="secondary" onClick={closeModal}>Close</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">87.4 m³</div>
            <p className="text-sm text-muted-foreground">Total weekly production</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-success">12.5 m³</div>
            <p className="text-sm text-muted-foreground">Daily average</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-sensor-temperature">38.6°C</div>
            <p className="text-sm text-muted-foreground">Avg temperature</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-sensor-ph">7.2</div>
            <p className="text-sm text-muted-foreground">Avg pH level</p>
          </CardContent>
        </Card>
      </div>

      {/* System Logs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <CardTitle>
                {selectedDate && `${selectedDate.toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })} System Log`}
              </CardTitle>
            </div>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2" aria-label="Pick date">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-auto p-0">
                <CalendarPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    // Always set the date if a valid date is selected, regardless of click count
                    if (date) setSelectedDate(date);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {systemLogs.map((log, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-sm font-medium text-muted-foreground">{log.time}</div>
                  <div className="text-sm font-medium">{log.event}</div>
                  <Badge 
                    variant={log.status === "success" ? "default" : log.status === "warning" ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {log.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">{log.details}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default History;