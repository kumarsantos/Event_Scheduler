import React, { useContext } from "react";
import { userContext } from "../../App";
import Calender from "../CalenderPlugin/Calender";
import { useHistory } from "react-router-dom";

export const Home = () => {
  const { state, dispatch } = useContext(userContext);

  const history = useHistory();
  const [alldata, SetallData] = React.useState([]);

  React.useEffect(() => {
    fetch("https://event-scheduler-be.onrender.com/allevent", {
      method: "GET",

      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        SetallData(data.Finaldata);
      });
  }, []);
  return (
    <div style={{ marginTop: "100px" }}>
      <Calender alldata={alldata} />
      <p>dshfsdhfjdshkjf</p>
    </div>
  );
};
export default Home;
