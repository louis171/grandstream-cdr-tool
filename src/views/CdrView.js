import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import { secondsToHHMMSS } from "../functions/functions";
import CallTypeOptions from "../components/cdr/CallTypeOptions";
import CDRDataGrid from "../components/CDRDataGrid";
import DispositionOptions from "../components/cdr/DispositionOptions";
import RequestOptions from "../components/cdr/RequestOptions";
import CdrSummary from "../components/cdr/CdrSummary";

import { gsReturnCodeHandler } from "../functions/gsReturnCodeHandler";
import requestOptionsUtil from "../util/RequestOptionsUtil";

import { dummyTableData } from "../DUMMY_DATA";
import PaginationCdrTable from "../components/cdr/table/PaginationCdrTable";
import buildPdf from "../functions/buildPdf";

const CdrView = ({
  userMethod,
  userIpAddress,
  userPort,
  gsCookie,
  showMessage,
}) => {
  const navigate = useNavigate();
  // Loading state for dataGrid and summary
  const [isLoading, setIsLoading] = useState(true);
  // States for initial cdr data and filtered data is user presses filter checkboxes
  const [gsCdrApi, setGsCdrApi] = useState([]);
  const [gsCdrTable, setGsCdrTable] = useState([]);
  const [filteredGsCdrApi, setFilteredGsCdrApi] = useState([]);
  const [filteredGsCdrTable, setFilteredGsCdrTable] = useState([]);
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
  // State for answered by field in CDR requeset
  const [userAnsweredBy, setUserAnsweredBy] = useState("");
  const [userMinDuration, setUserMinDuration] = useState("");
  const [userMaxDuration, setUserMaxDuration] = useState("");

  // State for selected user extension group
  const [userExtGroup, setUserExtGroup] = useState("");

  // CDR data filter arrays
  const [callOptionsFilters, setCallOptionsFilters] = useState([]);
  const [dispositionFilters, setDispositionFilters] = useState([]);

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
        if (res.data.status === 0) {
          showMessage("Retrieved Extension Groups");
          setGsExtGroup(res.data.response.extension_group);
          setIsLoadingExtGroups(false);
        } else {
          showMessage(
            `Error getting extension groups: ${gsReturnCodeHandler(
              res.data.status
            )}`,
            "error",
            2000
          );
        }
      })
      .catch((err) => {
        console.log(err);
        showMessage(`Error sending request: ${err.toString()}`, "error", 2000);
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
          caller: requestOptionsUtil.userCallerCreate(userExtGroup, userCaller),
          callee: requestOptionsUtil.userCalleeCreate(userCallee),
          AnsweredBy: requestOptionsUtil.userAnsweredByCreate(userAnsweredBy),
          minDur: userMinDuration,
          maxDur: userMaxDuration,
        },
      })
      .then((res) => {
        //console.log(res.data);
        showMessage("CDR API sucessfully read");
        // let tableData = fixTableData(res.data.cdr_root.filter((n) => n)); // Filters data to remove empty objects
        // setGsCdrTable(tableData);

        let data = fixGsData(res.data.cdr_root.filter((n) => n)); // Filters data to remove empty objects
        setGsCdrApi(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        showMessage(`Error sending request: ${err.toString()}`, "error", 2000);
        navigate("/");
      });

    // axios
    //   .post(`${userMethod}://${userIpAddress}:${userPort}/api`, {
    //     request: {
    //       action: "recapi",
    //       cookie: gsCookie,
    //       filedir: "monitor",
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  // useEffect(() => {
  //   let tableData = fixTableData(dummyTableData);
  //   setGsCdrTable(tableData);
  // }, []);

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
          // Removes 1 element in the array from the index position. i.e. deletes the incorrect object
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

  const fixTableData = (data) => {
    // break data into objects
    data.forEach((row) => {
      // Removes empty cdr object that is often returned from UCM63XX PBXs
      // e.g. cdr: ""
      delete row["cdr"];
      // Creates new empty array
      let arr = [];
      // Iterates through the keys of the object
      for (const key in row) {
        // .hasOwnProperty returns a boolean indicating whether the object has the specified property
        // .call allows another object to be substituted (in this case the row) where we look for the keys
        if (Object.hasOwnProperty.call(row, key)) {
          const element = row[key];
          // checks the type of the returned element looking for objects
          if (typeof element === "object") {
            // if the returned element is an object then add to the array
            arr.push(element);
          }
        }
      }
      // If the array has any content then add back to the original data
      if (arr.length > 0) {
        data = [...data, arr];
      } else {
        data = [...data, [row]];
      }
      // find index of the row being processed
      const index = data.indexOf(row);

      // If the indexed row exists
      if (index > -1) {
        // Removes 1 element in the array from the index position
        // i.e. remove the old object from the data
        data.splice(index, 1);
      }
    });
    return data;
  };

  useEffect(() => {
    // Checks if there are NO filter options selected. Sets filtered data to initial cdr data
    if (dispositionFilters.length === 0 && callOptionsFilters.length === 0) {
      setFilteredGsCdrTable(gsCdrTable);
    }

    // Ternary for choosing which data to filter further
    // If the lengths of the array differ then use the filtered data
    let data =
      filteredGsCdrTable.length !== gsCdrTable.length
        ? [...gsCdrTable]
        : [...filteredGsCdrTable];

    if (dispositionFilters.length > 0) {
      data = data.filter((row) => {
        if (dispositionFilters.includes(row[0].disposition)) {
        } else if (row.length > 1) {
          row.forEach((subRow) => {
            if (dispositionFilters.includes(subRow.disposition)) {
              console.log(subRow.src);
            }
          });
        }
        return dispositionFilters.includes(row[0].disposition);
      });
    }
    setFilteredGsCdrTable(data);
  }, [dispositionFilters, callOptionsFilters, gsCdrTable]);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid item>
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
            setUserAnsweredBy={setUserAnsweredBy}
            userAnsweredBy={userAnsweredBy}
            userMinDuration={userMinDuration}
            setUserMinDuration={setUserMinDuration}
            userMaxDuration={userMaxDuration}
            setUserMaxDuration={setUserMaxDuration}
            gsExtGroup={gsExtGroup}
            setUserExtGroup={setUserExtGroup}
            userExtGroup={userExtGroup}
            isLoadingExtGroups={isLoadingExtGroups}
            cdrApiRead={cdrApiRead}
          />
        </Grid>
      </Grid>

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
        filteredGsCdrApi={filteredGsCdrApi}
        createPdf={() =>
          buildPdf(
            filteredGsCdrApi,
            userStartDate,
            userStartTime,
            userEndDate,
            userEndTime,
            userCallerCreate
          )
        }
        userExtGroup={userExtGroup}
        userCaller={userCaller}
        userCallee={userCallee}
        userAnsweredBy={userAnsweredBy}
      />
      {/* <PaginationCdrTable filteredGsCdrTable={filteredGsCdrTable} /> */}
    </Container>
  );
};

export default CdrView;
