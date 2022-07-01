import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { dummyExtGroup } from "../DUMMY_DATA";

import { secondsToHHMMSS } from "../functions/functions";
import CallTypeOptions from "../components/CallTypeOptions";
import CDRDataGrid from "../components/CDRDataGrid";
import DispositionOptions from "../components/DispositionOptions";
import RequestOptions from "../components/cdr/RequestOptions";
import CdrSummary from "../components/cdr/CdrSummary";

const CdrView = (props) => {
  // Destructuring props from App.js where state for connection and cookie are stores
  const { userMethod, userIpAddress, userPort, gsCookie } = props;
  // Loading state for dataGrid and summary
  const [isLoading, setIsLoading] = useState(true);
  // States for initial cdr data and filtered data is user presses filter checkboxes
  const [gsCdrApi, setGsCdrApi] = useState([]);
  const [filteredGsCdrApi, setFilteredGsCdrApi] = useState([]);
  // Initialises with extension groups pulled from phone system
  const [gsExtGroup, setGsExtGroup] = useState([]);
  // Loading state for extension groups
  const [isLoadingExtGroups, setIsLoadingExtGroups] = useState(true);

  // Initialises with the current date minus 30 days
  const [userStartDate, setUserStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  // Initialises with 9am
  const [userStartTime, setUserStartTime] = useState(
    new Date().setHours(9, 0, 0, 0)
  );
  // Initialises with todays date
  const [userEndDate, setUserEndDate] = useState(new Date().toISOString());
  // Initialises with 5pm
  const [userEndTime, setUserEndTime] = useState(
    new Date().setHours(17, 0, 0, 0)
  );
  // Initialises with extension 200
  const [userCaller, setUserCaller] = useState("");
  // State for Callee field of CDR request
  const [userCallee, setUserCallee] = useState("");
  // State for selected user extension group
  const [userExtGroup, setUserExtGroup] = useState("");

  // CDR data filter arrays
  const [callOptionsFilters, setCallOptionsFilters] = useState([]);
  const [dispositionFilters, setDispositionFilters] = useState([]);

  const createPdf = () => {
    const doc = new jsPDF();
    const pdfTableData = filteredGsCdrApi.map((obj) => {
      return {
        Destination: obj.dst,
        Start: obj.start,
        End: obj.end,
        Duration: obj.billsec,
      };
    });
    doc.text(`Summary of ${userCallerCreate()}`, 12.7, 12.7, {
      maxWidth: 159.2,
    });
    doc.text(
      `${userStartDate.toDateString()} ${new Date(
        userStartTime
      ).toLocaleTimeString("en-GB")} - ${new Date(
        userEndDate
      ).toDateString()} ${new Date(userEndTime).toLocaleTimeString("en-GB")}`,
      12.7,
      35.4,
      { maxWidth: 159.2 }
    );
    doc.text(`Total calls: ${filteredGsCdrApi.length}`, 12.7, 45.4, {
      maxWidth: 159.2,
    });
    doc.text(
      `Total Duration: ${secondsToHHMMSS(
        filteredGsCdrApi.reduce(
          (partialSum, a) => partialSum + Number(a.duration),
          0
        )
      )}`,
      12.7,
      55.4,
      { maxWidth: 159.2 }
    );
    doc.text(
      `Total Billable: ${secondsToHHMMSS(
        filteredGsCdrApi.reduce(
          (partialSum, a) => partialSum + Number(a.billsec),
          0
        )
      )}`,
      12.7,
      65.4,
      { maxWidth: 159.2 }
    );
    doc.table(12.7, 75.4, pdfTableData, [
      "Destination",
      "Start",
      "End",
      "Duration",
    ]);
    doc.save(
      `${userCaller} - ${userStartDate.toDateString()} ${new Date(
        userStartTime
      ).toLocaleTimeString("en-GB")} - ${new Date(
        userEndDate
      ).toDateString()} ${new Date(userEndTime).toLocaleTimeString("en-GB")}`
    );
  };

  useEffect(() => {
    axios
      .post(`${userMethod}://${userIpAddress}:${userPort}/api`, {
        request: {
          action: "listExtensionGroup",
          sidx: "group_name",
          sord: "asc",
          cookie: gsCookie,
        },
      })
      .then((res) => {
        toast.success("Retrieved Extension Groups");
        setGsExtGroup(res.data.response.extension_group);
        setIsLoadingExtGroups(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Sorry an error occured. Code: 10");
      });
  }, []);

  const cdrApiRead = () => {
    axios
      .post(`${userMethod}://${userIpAddress}:${userPort}/api`, {
        request: {
          action: "cdrapi",
          cookie: gsCookie,
          format: "json",
          // startTime and endTime break the date and time into a suitable format for the UCM
          // For example:
          // Date: Sun May 29 2022 08:42:32 GMT+0100 (British Summer Time)
          // Time: 1656403200000
          // Becomes: 2022-05-29T09:00
          startTime: `${new Date(userStartDate)
            .toISOString()
            .slice(0, -14)}T${new Date(userStartTime)
            .toTimeString()
            .slice(0, 5)}`,
          endTime: `${new Date(userEndDate)
            .toISOString()
            .slice(0, -14)}T${new Date(userEndTime)
            .toTimeString()
            .slice(0, 5)}`,
          caller: userCallerCreate(),
          callee: userCallee === undefined ? "" : userCallee,
        },
      })
      .then((res) => {
        console.log(res)
        toast.success("CDR API sucessfully read");
        // Filters data to remove empty objects
        let data = fixGsData(res.data.cdr_root.filter((n) => n));
        setGsCdrApi(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Sorry an error occured. Code: 07");
      });
  };

  const userCallerCreate = () => {
    if (userExtGroup.length > 0) {
      let index = userExtGroup.indexOf(userCaller);
      if (index === -1) {
        return userExtGroup.concat(",", userCaller);
      } else {
        return userExtGroup;
      }
    } else {
      return userCaller;
    }
  };

  const fixGsData = (data) => {
    // Break returned CDR array into objects
    data.forEach((row) => {
      // Check the length of objects. Continues if below 44
      if (Object.keys(row).length < 44) {
        // if the length of the object is below 44 then create a new array of the object using the keys of each child object
        let arr = Object.keys(row).map((k) => row[k]);
        // Filter array to remove empty or blank objects
        arr = arr.filter((n) => n);
        // Add each object of the new array created above to the existing CDRData array
        arr.forEach((subRow) => {
          data = [...data, subRow];
        });
        // Get the index of the row being processed
        const index = data.indexOf(row);
        // If the index is greater than -1. e.i. the data is present
        if (index > -1) {
          // Removes 1 element in the array from the position. i.e. deletes the incorrect object
          data.splice(index, 1);
        }
      }
    });
    // Returns fixed data
    return data;
  };

  useEffect(() => {
    // Checks if there are NO filter options selected. Sets filtered data to initial cdr data
    if (dispositionFilters.length === 0 && callOptionsFilters.length === 0) {
      setFilteredGsCdrApi(gsCdrApi);
    }

    // Ternary for choosing which data to filter further
    // If the lengths of the array differ then use the filtered data
    let data =
      filteredGsCdrApi.length !== gsCdrApi.length
        ? [...gsCdrApi]
        : [...filteredGsCdrApi];

    // Filters data chosen above by iterating through the array and only returning matches to the filter array
    // e.g. Filter arry could be [ "ANSWERED", "FAILED" ]
    // Which would then be compared to the disposition of the CDR objects
    if (dispositionFilters.length > 0) {
      data = data.filter((row) => {
        return dispositionFilters.includes(row.disposition);
      });
    }

    if (callOptionsFilters.length > 0) {
      data = data.filter((row) => {
        return callOptionsFilters.includes(row.userfield);
      });
    }

    setFilteredGsCdrApi(data);
  }, [dispositionFilters, callOptionsFilters, gsCdrApi]);

  return (
    <Container component="main" maxWidth="lg">
      <ToastContainer autoClose={2000} />
      <RequestOptions
        setUserStartDate={setUserStartDate}
        userStartDate={userStartDate}
        setUserEndDate={setUserEndDate}
        userEndDate={userEndDate}
        setUserStartTime={setUserStartTime}
        userStartTime={userStartTime}
        setUserEndTime={setUserEndTime}
        userEndTime={userEndTime}
        setUserCaller={setUserCaller}
        userCaller={userCaller}
        setUserCallee={setUserCallee}
        userCallee={userCallee}
        gsExtGroup={gsExtGroup}
        setUserExtGroup={setUserExtGroup}
        userExtGroup={userExtGroup}
        isLoadingExtGroups={isLoadingExtGroups}
        cdrApiRead={cdrApiRead}
      />
      <Grid container spacing={3} justifyContent="space-evenly">
        <Grid item>
          <CallTypeOptions
            setCallOptionsFilters={setCallOptionsFilters}
            callOptionsFilters={callOptionsFilters}
          />
        </Grid>
        <Grid item>
          <DispositionOptions
            setDispositionFilters={setDispositionFilters}
            dispositionFilters={dispositionFilters}
          />
        </Grid>
      </Grid>
      <CDRDataGrid filteredGsCdrApi={filteredGsCdrApi} isLoading={isLoading} />
      <CdrSummary
        userCaller={userCaller}
        filteredGsCdrApi={filteredGsCdrApi}
        createPdf={createPdf}
        userCallerCreate={userCallerCreate}
      />
    </Container>
  );
};

export default CdrView;