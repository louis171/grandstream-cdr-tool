import jsPDF from "jspdf";
import "jspdf-autotable";
import { secondsToHHMMSS } from "../functions/functions";
import requestOptionsUtil from "../util/RequestOptionsUtil";

const buildPdf = (
  filteredGsCdrApi,
  userStartDate,
  userStartTime,
  userEndDate,
  userEndTime,
  userExtGroup,
  userCaller,
  userCallee,
  userAnsweredBy
) => {
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
  doc.text(
    `Caller: ${
      requestOptionsUtil.userCallerCreate(userExtGroup, userCaller)
        ? requestOptionsUtil.userCallerCreate(userExtGroup, userCaller)
        : "All"
    }. Callee: ${
      requestOptionsUtil.userCalleeCreate(userCallee)
        ? requestOptionsUtil.userCalleeCreate(userCallee)
        : "All"
    }. Answered by: ${
      requestOptionsUtil.userAnsweredByCreate(userAnsweredBy)
        ? requestOptionsUtil.userAnsweredByCreate(userAnsweredBy)
        : "All"
    }`,
    12.7,
    12.7,
    {
      maxWidth: 159.2,
    }
  );
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
      let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
      doc.text(str, data.settings.margin.left, pageHeight - 10);
    },
  });
  // Build pdf file name e.g.
  // 200,201,202,205,203,204 - Sat Jun 04 2022 09_00_00 - Mon Jul 04 2022 17_00_00.pdf
  doc.save(
    `Caller ${
      requestOptionsUtil.userCallerCreate(userExtGroup, userCaller)
        ? requestOptionsUtil.userCallerCreate(userExtGroup, userCaller)
        : "All"
    } Callee ${
      requestOptionsUtil.userCalleeCreate(userCallee)
        ? requestOptionsUtil.userCalleeCreate(userCallee)
        : "All"
    } Answered by ${
      requestOptionsUtil.userAnsweredByCreate(userAnsweredBy)
        ? requestOptionsUtil.userAnsweredByCreate(userAnsweredBy)
        : "All"
    } - ${userStartDate.toDateString()} ${new Date(
      userStartTime
    ).toLocaleTimeString("en-GB")} - ${new Date(
      userEndDate
    ).toDateString()} ${new Date(userEndTime).toLocaleTimeString("en-GB")}`
  );
};

export default buildPdf;
