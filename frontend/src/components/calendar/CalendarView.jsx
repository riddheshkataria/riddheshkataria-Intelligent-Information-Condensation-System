import React, { useState, useMemo, useCallback, memo } from 'react';

const CalendarView = memo(({ tasks }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const taskDeadlines = useMemo(() => {
        const deadlines = new Set();
        tasks.forEach((task) => {
            if (task.deadline) deadlines.add(task.deadline);
        });
        return deadlines;
    }, [tasks]);

    const changeMonth = useCallback((offset) => {
        setCurrentDate((prev) => {
            const d = new Date(prev);
            d.setMonth(d.getMonth() + offset);
            return d;
        });
    }, []);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth });

    const today = new Date();
    const isToday = (day) =>
        day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

    const hasTask = (day) => {
        const formatted = `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;
        return taskDeadlines.has(formatted);
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={() => changeMonth(-1)}>‹</button>
                <h3>{monthName} {year}</h3>
                <button onClick={() => changeMonth(1)}>›</button>
            </div>
            <div className="calendar-grid">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d} className="day-name">{d}</div>
                ))}
                {blanks.map((_, i) => <div key={`b-${i}`} />)}
                {days.map((day) => (
                    <div key={day} className={`day-cell ${isToday(day) ? 'today' : ''}`}>
                        <span>{day}</span>
                        {hasTask(day) && <div className="task-dot" />}
                    </div>
                ))}
            </div>
        </div>
    );
});

CalendarView.displayName = 'CalendarView';
export default CalendarView;
