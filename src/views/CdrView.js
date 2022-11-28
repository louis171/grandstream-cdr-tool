import React, { useEffect, useState } from "react";
import axios from "axios";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import CallTypeOptions from "../components/cdr/CallTypeOptions";
import CDRDataGrid from "../components/CDRDataGrid";
import DispositionOptions from "../components/cdr/DispositionOptions";
import RequestOptions from "../components/cdr/RequestOptions";
import CdrSummary from "../components/cdr/CdrSummary";

import { gsReturnCodeHandler } from "../functions/gsReturnCodeHandler";
import requestOptionsUtil from "../util/RequestOptionsUtil";
import buildPdf from "../functions/buildPdf";
import cdrUtil from "../util/cdrUtil";

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

        let data = cdrUtil.fixGsData(res.data.cdr_root.filter((n) => n)); // Filters data to remove empty objects
        console.log(data);
        setGsCdrApi(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        showMessage(`Error sending request: ${err.toString()}`, "error", 2000);
        navigate("/");
      });
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
    <Container component="main" maxWidth="false">
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item sm={12} md={12} lg={3}>
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
        <Grid item sm={12} md={12} lg={9}>
          <Grid container spacing={2}>
            <Grid item sm={12} md={12} lg={12} sx={{ display: "flex" }}>
              <CallTypeOptions
                setCallOptionsFilters={setCallOptionsFilters}
                callOptionsFilters={callOptionsFilters}
              />
              <DispositionOptions
                setDispositionFilters={setDispositionFilters}
                dispositionFilters={dispositionFilters}
              />
            </Grid>
            <Grid item sm={12} md={12} lg={12}>
              <CDRDataGrid
                filteredGsCdrApi={filteredGsCdrApi}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item sm={12} md={12} lg={12}>
              <CdrSummary
                filteredGsCdrApi={filteredGsCdrApi}
                createPdf={() =>
                  buildPdf(
                    filteredGsCdrApi,
                    userStartDate,
                    userStartTime,
                    userEndDate,
                    userEndTime,
                    userExtGroup, 
                    userCaller,
                    userCallee,
                    userAnsweredBy
                  )
                }
                userExtGroup={userExtGroup}
                userCaller={userCaller}
                userCallee={userCallee}
                userAnsweredBy={userAnsweredBy}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* <PaginationCdrTable filteredGsCdrTable={filteredGsCdrTable} /> */}
    </Container>
  );
};

export default CdrView;
