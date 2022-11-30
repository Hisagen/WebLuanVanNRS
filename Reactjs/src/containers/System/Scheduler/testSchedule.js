import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect, useCallback } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "test",
    start: new Date(2022, 10, 14, 7, 30),
    end: new Date(2022, 10, 14, 11),
  },
];

function TestSchedule(props) {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);
  const [myEvents, setEvents] = useState(events);
  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);

      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert("CLASH");
        break;
      }
    }

    setAllEvents([...allEvents, newEvent]);
  }

  useEffect(() => {
    setAllEvents(props.data);
  }, [props.data]);

  //   const handleSelectSlot = useCallback(
  //     ({ start, end, id }) => {
  //       const title = window.prompt("New Event name");
  //       if (title) {
  //         setEvents((prev) => [...prev, { start, end, title }]);
  //       }
  //     },

  //     [setEvents]
  //   );

  const handleSelectEvent = useCallback((event) => {
    props.handleOnclickSchedule({ open: true, id: event.id });
  }, []);
  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  return (
    <div className="TestSchedule">
      <Calendar
        localizer={localizer}
        events={allEvents}
        onSelectEvent={handleSelectEvent}
        // onSelectSlot={handleSelectSlot}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
}

export default TestSchedule;
