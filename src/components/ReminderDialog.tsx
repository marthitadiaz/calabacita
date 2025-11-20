import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Trash2 } from "lucide-react";

interface ReminderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date | null;
  onSave: (date: Date, reminder: string) => void;
  onDelete: (date: Date) => void;
  existingReminder?: string;
}

const ReminderDialog = ({
  open,
  onOpenChange,
  selectedDate,
  onSave,
  onDelete,
  existingReminder,
}: ReminderDialogProps) => {
  const [reminder, setReminder] = useState("");

  useEffect(() => {
    setReminder(existingReminder || "");
  }, [existingReminder, selectedDate]);

  const handleSave = () => {
    if (selectedDate && reminder.trim()) {
      onSave(selectedDate, reminder);
      onOpenChange(false);
    }
  };

  const handleDelete = () => {
    if (selectedDate) {
      onDelete(selectedDate);
      onOpenChange(false);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-kawaii-cream border-4 border-primary rounded-3xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Heart className="h-6 w-6 text-primary fill-primary" />
            Recordatorio Kawaii
            <Heart className="h-6 w-6 text-primary fill-primary" />
          </DialogTitle>
          <p className="text-sm text-muted-foreground text-center mt-2">
            {formatDate(selectedDate)}
          </p>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Textarea
            placeholder="Escribe tu recordatorio aquí... 🐾"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            className="min-h-[120px] bg-white border-2 border-primary rounded-2xl resize-none text-base"
          />
        </div>

        <DialogFooter className="flex gap-2">
          {existingReminder && (
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="rounded-full"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Borrar
            </Button>
          )}
          <Button
            onClick={handleSave}
            disabled={!reminder.trim()}
            className="rounded-full bg-primary hover:bg-primary/90 flex-1"
          >
            Guardar 💕
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReminderDialog;
