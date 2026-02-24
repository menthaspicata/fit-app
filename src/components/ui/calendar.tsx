import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

type Props = {
  selectedDate: Date;
  onSelect: (date: Date) => void;
};

export function Calendar({ selectedDate, onSelect }: Props) {
  return (
    <DayPicker
      mode="single"
      selected={selectedDate}
      onSelect={(date) => {
        if (date) onSelect(date);
      }}
    />
  );
}
