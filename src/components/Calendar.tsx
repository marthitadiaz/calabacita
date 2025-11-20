import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalendarProps {
  onDateSelect: (date: Date) => void;
  reminders: Record<string, string>;
}

const Calendar = ({ onDateSelect, reminders }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const dayNames = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get day of week (0 = Sunday, 1 = Monday, etc.)
    // En estructura latinoamericana, domingo es el primer día
    const firstDayOfWeek = firstDay.getDay();
    
    const daysInMonth = lastDay.getDate();
    
    return { firstDayOfWeek, daysInMonth };
  };

  const { firstDayOfWeek, daysInMonth } = getDaysInMonth(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(date);
    onDateSelect(date);
  };

  const formatDateKey = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const hasReminder = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return reminders[formatDateKey(date)];
  };

  const dayColors = ["kawaii-mint", "kawaii-coral", "kawaii-peach", "kawaii-lavender", "kawaii-coral", "kawaii-peach", "kawaii-mint"];

  return (
    <div className="w-full max-w-2xl mx-auto px-2 md:px-0">
      {/* Calendar Header */}
      <div className="bg-gradient-to-br from-kawaii-pink via-kawaii-lavender to-kawaii-peach rounded-t-2xl md:rounded-t-3xl p-3 md:p-6 shadow-lg">
        <div className="flex items-center justify-between mb-3 md:mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevMonth}
            className="hover:bg-white/60 hover:scale-110 rounded-full transition-all h-8 w-8 md:h-10 md:w-10"
          >
            <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
          </Button>
          
          <h2 className="text-lg md:text-2xl font-bold text-foreground drop-shadow-sm">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextMonth}
            className="hover:bg-white/60 hover:scale-110 rounded-full transition-all h-8 w-8 md:h-10 md:w-10"
          >
            <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
          </Button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2 md:mb-4">
          {dayNames.map((day, index) => (
            <div
              key={day}
              className={`bg-${dayColors[index]} text-white font-semibold py-2 md:py-3 px-1 md:px-2 rounded-xl md:rounded-2xl text-center text-xs md:text-sm shadow-md`}
              style={{
                backgroundColor: index === 0 ? "hsl(160, 70%, 75%)" :
                               index === 1 ? "hsl(10, 100%, 80%)" :
                               index === 2 ? "hsl(20, 100%, 85%)" :
                               index === 3 ? "hsl(270, 100%, 90%)" :
                               index === 4 ? "hsl(10, 100%, 80%)" :
                               index === 5 ? "hsl(20, 100%, 85%)" :
                               "hsl(160, 70%, 75%)"
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {/* Empty cells for days before month starts */}
          {Array.from({ length: firstDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}
          
          {/* Days of the month */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const isToday = 
              date.getDate() === new Date().getDate() &&
              date.getMonth() === new Date().getMonth() &&
              date.getFullYear() === new Date().getFullYear();
            const reminder = hasReminder(day);
            
            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                className={`
                  aspect-square rounded-xl md:rounded-2xl font-medium text-sm md:text-lg
                  transition-all duration-200
                  hover:scale-110 hover:shadow-xl hover:bg-white hover:ring-2 hover:ring-accent
                  ${isToday ? 'ring-2 md:ring-4 ring-yellow-400 ring-offset-1 md:ring-offset-2' : ''}
                  ${reminder ? 'bg-gradient-to-br from-accent to-primary text-white shadow-md' : 'bg-kawaii-cream text-foreground'}
                  ${selectedDate?.getDate() === day && selectedDate?.getMonth() === currentDate.getMonth() ? 'scale-105 shadow-lg ring-2 ring-secondary' : ''}
                  relative overflow-hidden
                  bounce-in
                  flex items-center justify-center
                `}
                style={{
                  animationDelay: `${index * 0.01}s`
                }}
              >
                {day}
                {reminder && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-[8px] md:text-xs">
                    💕
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
