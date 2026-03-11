import { DayPicker, getDefaultClassNames  } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

type Props = {
  selectedDate: Date;
  onSelect: (date: Date) => void;
};

export function Calendar({ selectedDate, onSelect }: Props) {
  const defaultClassNames = getDefaultClassNames();
  return (
    <DayPicker
      mode="single"
      selected={selectedDate}
      onSelect={(date) => {
        if (date) onSelect(date);
      }}
      classNames={{
        today: `border-violet-600`, // Add a border to today's date
        selected: `bg-violet-600 border-violet-600 text-white`, // Highlight the selected day
        root: `${defaultClassNames.root} p-3`, // Add a shadow to the root element
        chevron: `${defaultClassNames.chevron} fill-violet-600`, // Change the color of the chevron
      }}
    />
  );
}
