import React, { FunctionComponent, useState } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import moment from "moment";
import "./DateSelected.css";
import { IconButton } from "@mui/material";

interface Prop {
    isPublish: boolean;
    start: (start: string, end: string) => void;
}

const DateSelected: FunctionComponent<Prop> = (Prop) => {
  const [startDate, setStartDate] = useState<string>("2022-08-01");
  const [endDate, setEndDate] = useState<string>("2022-08-07");

  const handleDateValue = (start: string, end: string) => {
    Prop.start(start, end);
  }

  const handleLeftArrowCLick = async () => {
    const fromDate = new Date(startDate);
    const toDate = new Date(endDate);

    // start date
    const newStartDate = moment(
      fromDate.setDate(fromDate.getDate() - 7)
    ).format("YYYY-MM-DD");
    // end date
    const newEndDate = moment(toDate.setDate(toDate.getDate() - 7)).format(
      "YYYY-MM-DD"
    );
    
    if (new Date(endDate).getDay() !== 0) {
        // end date
        const end = moment(new Date(startDate).setDate(new Date(startDate).getDate() - 1)).format("YYYY-MM-DD");

        setStartDate(newStartDate.toString());
        setEndDate(end.toString());

        handleDateValue(newStartDate.toString(), end.toString());
    } else if (new Date(newStartDate).getDay() !== 1) {
        // start date
        const start = moment(new Date(endDate).setDate(new Date(endDate).getDate() - 6)).format("YYYY-MM-DD");
        // end date
        const end = moment(new Date(startDate).setDate(new Date(startDate).getDate() -1)).format("YYYY-MM-DD");

        setStartDate(start.toString());
        setEndDate(end.toString());

        handleDateValue(start.toString(), end.toString());
    } else if (new Date(newEndDate).getMonth() !== new Date(newStartDate).getMonth()) {
        const date = new Date(new Date(startDate).getFullYear(), new Date(startDate).getMonth(), 1);

        setStartDate(date.toString());
        setEndDate(newEndDate.toString());

        handleDateValue(date.toString(), newEndDate.toString());
    } else if (new Date(newEndDate).getMonth() !== new Date(newStartDate).getMonth()) {
      const handleNewDate = new Date(
        toDate.getFullYear(),
        toDate.getMonth() + 1,
        0
      );

      setStartDate(newStartDate.toString());
      setEndDate(handleNewDate.toString());

      handleDateValue(newStartDate.toString(), handleNewDate.toString());
    } else {
      setStartDate(newStartDate.toString());
      setEndDate(newEndDate.toString());

      handleDateValue(newStartDate.toString(), newEndDate.toString());
    }
  };

  const handleRightArrowCLick = async () => {
    const fromDate = new Date(startDate);
    const toDate = new Date(endDate);

    const newStartDate = moment(fromDate.setDate(fromDate.getDate() + 7)).format("YYYY-MM-DD");
    const newEndDate = moment(toDate.setDate(toDate.getDate() + 7)).format("YYYY-MM-DD");

    const checkLastMonth = moment(new Date(endDate).setDate(new Date(endDate).getDate() + 1)).format("YYYY-MM-DD");

    if (new Date(checkLastMonth).getDay() !== 1) { 
        // end date
        const handleStartDate = moment(new Date(startDate).setDate(new Date(startDate).getDate() - 1)).format("YYYY-MM-DD");
        const newEndDate = moment(new Date(handleStartDate).setDate(new Date(handleStartDate).getDate() + 7)).format("YYYY-MM-DD");

        setEndDate(newEndDate.toString());
        setStartDate(checkLastMonth.toString());

        handleDateValue(checkLastMonth.toString(), newEndDate.toString());
    } else if (new Date(startDate).getDay() !== 1) {
        // start date
        setStartDate(checkLastMonth.toString());
        setEndDate(newEndDate.toString());

        handleDateValue(checkLastMonth.toString(), newEndDate.toString());
    } else if (
      new Date(newEndDate).getMonth() !== new Date(newStartDate).getMonth()
    ) {
      const handleNewDate = moment(new Date(
        toDate.getFullYear(),
        toDate.getMonth(),
        0
      )).format("YYYY-MM-DD");

      setStartDate(newStartDate.toString());
      setEndDate(handleNewDate.toString());

      handleDateValue(newStartDate.toString(), handleNewDate.toString());
    } else {
      setStartDate(newStartDate.toString());
      setEndDate(newEndDate.toString());

      handleDateValue(newStartDate.toString(), newEndDate.toString());
    }
  };

  return (
    <div>
      <div className="date-selected">
        <IconButton
          sx={{ border: 0.1, borderRadius: 1, marginLeft: 2, padding: 0.2 }}
          onClick={handleLeftArrowCLick}
        >
          <KeyboardArrowLeft />
        </IconButton>
        <div className={Prop.isPublish ? "date-disabled" : "date-active"}>
          {moment(new Date(startDate).toString()).format("MMM DD")} -
          {moment(new Date(endDate).toString()).format("MMM DD")}
        </div>
        <IconButton
          sx={{ border: 0.1, borderRadius: 1, padding: 0.2 }}
          onClick={handleRightArrowCLick}
        >
          <KeyboardArrowRight />
        </IconButton>
      </div>
    </div>
  );
};

export default DateSelected;
