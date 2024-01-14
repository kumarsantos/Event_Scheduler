import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  AllDayPanel,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";

const currentDate = new Date();

const Calender = ({ alldata }) => {
  const appointments =
    alldata &&
    alldata.map((event) => {

      return {
        title: event.title,
        startDate: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          event.day,
          event.StartHour,
          event.StartMinute
        ),
        endDate: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          event.day,
          event.EndHour,
          event.EndMinute
        ),
      };
    });
  console.log(appointments)
  return (
    <Paper>
      <Scheduler data={appointments} height={660}>
        <ViewState defaultCurrentDate={currentDate} />
        <WeekView startDayHour={5} endDayHour={23} />
        <Appointments />
        <AllDayPanel />
      </Scheduler>
    </Paper>
  );
};

export default Calender;
