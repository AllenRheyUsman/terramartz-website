'use client';

import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { buttonVariants } from './button';
import { cn } from './utils';

type CalendarProps = {
  className?: string;
  selected?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  showTimeSelect?: boolean;
};

function Calendar({
  className,
  selected,
  onChange,
  minDate,
  maxDate,
  showTimeSelect = false,
}: CalendarProps) {
  return (
    <div className={cn('p-3', className)}>
      <DatePicker
        selected={selected}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        showTimeSelect={showTimeSelect}
        dateFormat={showTimeSelect ? 'Pp' : 'P'}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex items-center justify-between p-2">
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'size-7 bg-transparent p-0 opacity-50 hover:opacity-100',
              )}
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="text-sm font-medium">
              {format(date, 'MMMM yyyy')}
            </span>
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'size-7 bg-transparent p-0 opacity-50 hover:opacity-100',
              )}
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
        calendarClassName="rounded-md border bg-white shadow-md"
        dayClassName={(date) =>
          cn(
            buttonVariants({ variant: 'ghost' }),
            'size-8 p-0 font-normal',
            date.toDateString() === new Date().toDateString()
              ? 'bg-accent text-accent-foreground rounded-md'
              : '',
          )
        }
      />
    </div>
  );
}

export { Calendar };
