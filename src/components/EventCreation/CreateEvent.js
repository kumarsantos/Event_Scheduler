import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./CreateEvent.css";
import MultipleSelect from "./Multi_Selection";

const CreateEvent = () => {
  const history = useHistory();

  const [warning, SetError] = React.useState(null);
  const [success, SetSuccess] = React.useState(null);

  const [eventdata, SetEvent] = React.useState({
    eventName: "",
    eventDesc: "",
    startTime: "",
    endTime: "",
  });
  const [days, SetDays] = React.useState([]);

  const SetEventScheduler = (e) => {
    SetEvent({ ...eventdata, [e.target.name]: e.target.value });
  };

  const CreateEventScheduler = (e) => {
    e.preventDefault();

    const events = { ...eventdata, days };

    fetch("http://localhost:8000/createevent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(events),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          SetError(data.error);
        } else {
          SetSuccess(data.event);
          history.push("/home");
        }
      });
  };

  return (
    <div className="event_container">
      <div className="event_wrapper">
        <div className="register_form_section">
          <form
            onSubmit={(e) => CreateEventScheduler}
            className="register_form"
          >
            <div className="register_heading">
              <h2>Create Event</h2>
            </div>
            <div className="toast">
              <p
                className={
                  warning !== null
                    ? "warning"
                    : success !== null
                    ? "success"
                    : null
                }
              >
                {warning !== null ? warning : success !== null ? success : null}
              </p>
            </div>
            <div>
              <input
                type="text"
                placeholder="First Name"
                name="eventName"
                value={eventdata.eventName}
                onChange={(e) => SetEventScheduler(e)}
              />
            </div>
            <div>
              <textarea
                name="desc"
                name="eventDesc"
                placeholder="Event Description Here!..."
                onChange={(e) => SetEventScheduler(e)}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span>Start Time </span>{" "}
              <span style={{ marginLeft: "10px" }}>
                {" "}
                <input
                  type="time"
                  value={eventdata.startTime}
                  name="startTime"
                  style={{ width: "150px" }}
                  onChange={(e) => SetEventScheduler(e)}
                />
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span>End Time </span>{" "}
              <span style={{ marginLeft: "15px" }}>
                {" "}
                <input
                  type="time"
                  value={eventdata.endTime}
                  name="endTime"
                  style={{ width: "150px" }}
                  onChange={(e) => SetEventScheduler(e)}
                />
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span>Days </span>
              <span>
                <MultipleSelect SetDays={SetDays} days={days} />
              </span>
            </div>
            <div>
              <input
                type="submit"
                value="Submit"
                onClick={(e) => CreateEventScheduler(e)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
