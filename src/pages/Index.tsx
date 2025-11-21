import { useState, useEffect } from "react";
import Calendar from "@/components/Calendar";
import ChihuahuaCharacter from "@/components/ChihuahuaCharacter";
import ReminderDialog from "@/components/ReminderDialog";
const Index = () => {
  const [reminders, setReminders] = useState<Record<string, string>>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentReminder, setCurrentReminder] = useState<string | null>(null);

  // Load reminders from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("kawaii-reminders");
    if (saved) {
      setReminders(JSON.parse(saved));
    }
  }, []);

  // Check for today's reminder on load
  useEffect(() => {
    const today = new Date();
    const todayKey = formatDateKey(today);
    if (reminders[todayKey]) {
      setCurrentReminder(reminders[todayKey]);
    }
  }, []);

  // Update reminder when date is selected or reminders change
  useEffect(() => {
    if (selectedDate) {
      const dateKey = formatDateKey(selectedDate);
      setCurrentReminder(reminders[dateKey] || null);
    } else {
      const today = new Date();
      const todayKey = formatDateKey(today);
      setCurrentReminder(reminders[todayKey] || null);
    }
  }, [selectedDate, reminders]);
  const formatDateKey = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setDialogOpen(true);
  };
  const handleSaveReminder = (date: Date, reminder: string) => {
    const dateKey = formatDateKey(date);
    const newReminders = {
      ...reminders,
      [dateKey]: reminder
    };
    setReminders(newReminders);
    localStorage.setItem("kawaii-reminders", JSON.stringify(newReminders));
  };
  const handleDeleteReminder = (date: Date) => {
    const dateKey = formatDateKey(date);
    const newReminders = {
      ...reminders
    };
    delete newReminders[dateKey];
    setReminders(newReminders);
    localStorage.setItem("kawaii-reminders", JSON.stringify(newReminders));
  };
  const existingReminder = selectedDate ? reminders[formatDateKey(selectedDate)] : undefined;
  return <div className="min-h-screen bg-background py-4 md:py-8 px-2 md:px-4 overflow-hidden relative">
      {/* Decorative elements - Positioned to not overlap content */}
      <div className="absolute top-2 left-2 md:top-10 md:left-10 text-2xl md:text-4xl animate-bounce z-0">✨</div>
      <div className="absolute top-2 right-2 md:top-20 md:right-20 text-2xl md:text-4xl animate-bounce z-0" style={{
      animationDelay: "0.3s"
    }}>🌟</div>
      <div className="absolute bottom-2 left-2 md:bottom-20 md:left-20 text-2xl md:text-4xl animate-bounce z-0" style={{
      animationDelay: "0.6s"
    }}>💝</div>
      <div className="absolute bottom-2 right-2 md:bottom-32 md:right-16 text-2xl md:text-4xl animate-bounce z-0" style={{
      animationDelay: "0.9s"
    }}>🎀</div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-4 md:mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2 flex items-center justify-center gap-2 md:gap-3">
            <span className="text-2xl md:text-4xl">🐕</span>
            Recordatorios
            <span className="text-2xl md:text-4xl">💕</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Calabacita te recuerda
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-8 items-start">
          {/* Calendar Section */}
          <div className="bounce-in">
            <Calendar onDateSelect={handleDateSelect} reminders={reminders} />
          </div>

          {/* Character Section */}
          <div className="flex items-center justify-center lg:min-h-[600px] py-4 md:py-0">
            <ChihuahuaCharacter currentReminder={currentReminder} />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 md:mt-12 bg-kawaii-lavender rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg max-w-2xl mx-auto bounce-in">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-3 md:mb-4 flex items-center justify-center gap-2">
            <span>📝</span>
            Cómo usar tu planner
            <span>✨</span>
          </h2>
          <ul className="space-y-2 text-sm md:text-base text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-lg md:text-xl flex-shrink-0">🐾</span>
              <span>Haz clic en cualquier día del calendario para agregar un recordatorio</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lg md:text-xl flex-shrink-0">💕</span>
              <span>Los días con recordatorios tendrán un emoji 💕</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lg md:text-xl flex-shrink-0">🗨️</span>
              <span>Los recordatorios del día aparecerán en la burbuja de Calabacita</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lg md:text-xl flex-shrink-0">✏️</span>
              <span>Puedes editar o borrar recordatorios haciendo clic en el día</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Reminder Dialog */}
      <ReminderDialog open={dialogOpen} onOpenChange={setDialogOpen} selectedDate={selectedDate} onSave={handleSaveReminder} onDelete={handleDeleteReminder} existingReminder={existingReminder} />
    </div>;
};
export default Index;