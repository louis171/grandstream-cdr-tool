import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { secondsToHHMMSS } from "../functions/functions";
import CallTypeOptions from "../components/cdr/CallTypeOptions";
import CDRDataGrid from "../components/CDRDataGrid";
import DispositionOptions from "../components/cdr/DispositionOptions";
import RequestOptions from "../components/cdr/RequestOptions";
import CdrSummary from "../components/cdr/CdrSummary";

import { gsReturnCodeHandler } from "../functions/gsReturnCodeHandler";

const CdrView = ({ userMethod, userIpAddress, userPort, gsCookie }) => {
  const navigate = useNavigate();
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

  const buildPdf = () => {
    // Takes filtered cdr data and maps it to a new array. Removing not required data
    const rows = filteredGsCdrApi.map((obj) => {
      return {
        src: obj.src,
        destination: obj.dst,
        start: obj.start,
        end: obj.end,
        duration: obj.billsec,
      };
    });

    // Columns used by AutoTable
    const columns = [
      { title: "Source", dataKey: "src" },
      { title: "Destination", dataKey: "destination" },
      { title: "Start", dataKey: "start" },
      { title: "End", dataKey: "end" },
      { title: "Duration", dataKey: "duration" },
    ];

    var doc = new jsPDF("p", "mm");
    doc.setFontSize(12);
    doc.setTextColor("#161C22");
    // Summary of 200,201
    doc.text(`Summary of ${userCallerCreate()}`, 12.7, 12.7, {
      maxWidth: 159.2,
    });
    // Sat Jun 04 2022 09:00:00 - Mon Jul 04 2022 17:00:00
    doc.text(
      `${userStartDate.toDateString()} ${new Date(
        userStartTime
      ).toLocaleTimeString("en-GB")} - ${new Date(
        userEndDate
      ).toDateString()} ${new Date(userEndTime).toLocaleTimeString("en-GB")}`,
      12.7,
      22.7,
      { maxWidth: 159.2 }
    );
    // Total calls: 28
    doc.text(`Total calls: ${filteredGsCdrApi.length}`, 12.7, 32.7, {
      maxWidth: 159.2,
    });
    // Total Billable: 3:27:43
    doc.text(
      `Total Billable: ${secondsToHHMMSS(
        filteredGsCdrApi.reduce(
          (partialSum, a) => partialSum + Number(a.billsec),
          0
        )
      )}`,
      12.7,
      42.7,
      { maxWidth: 159.2 }
    );
    doc.autoTable(columns, rows, {
      // First page margin top in mm
      startY: 50,
      margin: { horizontal: 10 },
      styles: { overflow: "linebreak" },
      bodyStyles: { valign: "top" },
      columnStyles: { email: { cellWidth: "wrap" } },
      theme: "striped",
      showHead: "everyPage",
      didDrawPage: function (data) {
        // Any additional pages will use this margin top
        data.settings.margin.top = 25;

        // Footer page numbering
        let str = "Page " + doc.internal.getNumberOfPages();
        doc.setFontSize(10);

        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        let pageSize = doc.internal.pageSize;
        let pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);
      },
    });
    // Build pdf file name e.g.
    // 200,201,202,205,203,204 - Sat Jun 04 2022 09_00_00 - Mon Jul 04 2022 17_00_00.pdf
    doc.save(
      `${userCallerCreate()} - ${userStartDate.toDateString()} ${new Date(
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
        if (res.data.status === 0) {
          toast.success("Retrieved Extension Groups");
          setGsExtGroup(res.data.response.extension_group);
          setIsLoadingExtGroups(false);
        } else {
          toast.error(
            `${gsReturnCodeHandler(res.data.status)}. Code GS${res.data.status}`
          );
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.toString());
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
        toast.success("CDR API sucessfully read");
        // Filters data to remove empty objects
        let data = fixGsData(res.data.cdr_root.filter((n) => n));
        setGsCdrApi(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Sorry an error occured. Code: 07");
        navigate("/");
      });
  };

  // Creates string used in CdrSummary and PDF
  const userCallerCreate = () => {
    // If there is a extension group selected
    if (userExtGroup.length > 0) {
      // Find index of any extension that have been typed into the Caller textfield
      let index = userExtGroup.indexOf(userCaller);
      // If the extension isn't present in the extension group then add it
      if (index === -1) {
        return userExtGroup.concat(",", userCaller.trim().replace(" ", ""));
      } else {
        // else just use the extension group
        return userExtGroup;
      }
      // If an extension group hasnt been selected then just use the Caller textfield
    } else {
      return userCaller.trim();
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
      <CssBaseline />
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
        filteredGsCdrApi={filteredGsCdrApi}
        createPdf={buildPdf}
        userCallerCreate={userCallerCreate}
      />
    </Container>
  );
};

export default CdrView;
