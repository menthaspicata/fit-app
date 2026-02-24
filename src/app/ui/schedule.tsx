'use client';

import { fetchTrainingsByDate } from "@/app/lib/actions/workouts.actions";
import { useState, useEffect } from "react";
import  Button  from "@/app/ui/button";
import { Calendar } from "@/app/ui/calendar";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from 'next/link';

export default function Schedule() {
  const today = new Date();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(
      new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
      )
  );

  const getLocalDayKey = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  useEffect(() => {
    fetchTrainingsByDate(getLocalDayKey(selectedDate)).then((result) => {
        setWorkouts(result);
    })
  }, [selectedDate]);

  const changeDay = (delta: number) => {
    setSelectedDate(prev => {
      return new Date(
        prev.getFullYear(),
        prev.getMonth(),
        prev.getDate() + delta
      );
    });
  };


  const formatDate = (date: Date) =>
    date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return (
        <div>
        <h2 className="mt-4 mb-4 text-xl md:text-2xl">Today's Schedule</h2>
 
      {isCalendarOpen && (
        <div className="calendar-popup card">
          <Calendar
            selectedDate={selectedDate}
            // onSelect={(date) => {
            //   setSelectedDate(date);
            //   setIsCalendarOpen(false);
            // }}

            onSelect={(date) => {
                setIsCalendarOpen(false);
                if (!date) return;

                setSelectedDate(
                    new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate()
                    )
                );
              }}

          />
        </div>
      )}
      <div className='flex justify-between mb-10 items-center'>
        <Button onClick={() => changeDay(-1)} className='cursor-pointer'><ChevronLeftIcon className="h-5 w-5" /></Button>
        <div className="cursor-pointer "
          onClick={() => setIsCalendarOpen(true)}
        >{formatDate(selectedDate)}</div>
        <Button onClick={() => changeDay(1)} className='cursor-pointer'><ChevronRightIcon className="h-5 w-5" /></Button>
      </div>

      <div>
      {workouts && workouts.map((workout) => (
        <div key={workout.id} className="card flex pb-4 justify-between items-center" >
            <Link href={`/dashboard/workouts/${workout.id}`} className="flex justify-between w-full">
            <p>{workout.name}</p>
            <p>{workout.date.toLocaleTimeString()}</p>   
            </Link>
        </div>
      ))}
      </div>
        </div>
    )
}