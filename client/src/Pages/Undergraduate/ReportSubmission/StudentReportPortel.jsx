import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Stack, Grid, Button, Typography, Divider, Box } from "@mui/material";
import { Tile } from "../../../components/card/Tile";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { StudentInternPeriod } from "../../../components/user/Undergraduate/StudentInternPeriod";
import { StudnetMonthlyReport } from "./StudnetMonthlyReport";
import { Report } from "../../../assets/index";
import { DailyReportForm } from "../../../components/DailyReportForm/DailyReportForm";

export const StudentReportPortal = () => {
  const [userData, setUserData] = useState({
    monthlyReports: [],
    weeklyReports: [],
  });
  const [intern, setIntern] = useState(true);
  const [reportData, setReportData] = useState();

  const [reportType, setReportType] = useState("");
  const [selectReport, setSelectReport] = useState(false);
  //fetch undergraduate data

  const getUserData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/undergraduate/profile"
      );
      if (res.status === 200) {
        console.log("student data : ", res.data);
        setUserData(res.data);
        // If intern not start then show internship forms
        if (res.data.internshipStart === "") {
          setIntern(false);
        } else {
          setIntern(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  //end fetch

  const dailyReportColumns2 = [
    {
      field: "weekNumber",
      headerName: "Week",
      editable: false,
      flex: 1,
    },
    {
      field: "weekStartDate",
      headerName: "Start Date",
      editable: false,
      flex: 2,
    },
    {
      field: "weekEndDate",
      headerName: "End Date",
      editable: false,
      flex: 2,
    },
  ];

  const monthlyReportColumns2 = [
    {
      field: "monthNumber",
      headerName: "Month",
      editable: false,
      flex: 2,
    },
    {
      field: "monthEndDate",
      headerName: "End Date",
      editable: false,
      flex: 3,
    },
  ];

  const handleOnClick = () => {
    setSelectReport(false);
    setReportData();
  };

  const selectDailyReportData = (params) => {
    // try {
    setSelectReport(true);
    console.log("daily report : ", params.row.report_id);
    // setReportData("");
    setReportData(userData.weeklyReports[params.row.report_id - 1]);
    setReportType("Daily Report");

    // console.log({ selectReport });
    // } catch (error) {
    // console.log(error);
    // }
  };

  const selectMonthlyReportData = (params) => {
    // try {
    setSelectReport(true);

    console.log(
      "Monthly report : ",
      userData.monthlyReports[params.row.report_id - 1]
    );
    // setReportData("");
    setReportData(userData.monthlyReports[params.row.report_id - 1]);
    setReportType("Monthly Report");

    // console.log({ selectReport });
    // } catch (error) {
    // console.log(error);
    // }
  };

  return (
    <>
      {selectReport === false && (
        <Grid container spacing={1}>
          <Grid item md={12}>
            <Typography variant="pageTitle">Report Submission</Typography>
          </Grid>
          <Grid item md={6}>
            <Stack direction={"row"} spacing={1}>
              <Stack flex={1}>
                <Tile>
                  <Stack spacing={2}>
                    <Stack alignItems={"center"}>
                      <Typography variant="h6" fontWeight={"bold"}>
                        Daily Report
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack height={"65vh"}>
                      <DataGrid
                        // rows
                        rows={userData.weeklyReports.map((report) => {
                          return {
                            weekNumber: report.weekNumber,
                            weekStartDate: report.weekStartDate.substring(
                              0,
                              10
                            ),
                            weekEndDate: report.weekEndDate.substring(0, 10),
                            report_id: report.weekNumber,
                            status: report.reportStatus,
                          };
                        })}
                        columns={dailyReportColumns2}
                        onRowClick={selectDailyReportData}
                        getRowId={(row) => row.weekNumber}
                        hideFooter={true}
                        style={{ cursor: "pointer" }}
                      />
                    </Stack>
                  </Stack>
                </Tile>
              </Stack>

              <Stack flex={1}>
                <Tile>
                  <Stack spacing={2}>
                    <Stack alignItems={"center"}>
                      <Typography variant="h6" fontWeight={"bold"}>
                        Monthly Report
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack height={"65vh"}>
                      <DataGrid
                        // rows
                        rows={userData.monthlyReports.map((report) => {
                          return {
                            monthNumber: report.monthNumber,
                            report_id: report.monthNumber,
                            monthEndDate: report.monthEndDate.substring(0, 10),
                            id: report._id,
                          };
                        })}
                        columns={monthlyReportColumns2}
                        onRowClick={selectMonthlyReportData}
                        getRowId={(row) => row.id}
                        hideFooter={true}
                        style={{ cursor: "pointer" }}
                      />
                    </Stack>
                  </Stack>
                </Tile>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={6} alignItems="center">
            <Stack alignItems="center">
              <img src={Report} alt="Resume" width={500} />
            </Stack>
          </Grid>
        </Grid>
      )}

      {selectReport === true && (
        <Grid container spacing={1}>
          <Grid item md={12}>
            <Typography variant="pageTitle">{reportType}</Typography>
          </Grid>
          <Grid item md={12}>
            {/* Daily report here */}
            {reportType === "Daily Report" && (
              <Grid container spacing={1}>
                <Grid item md={3}>
                  <Tile>
                    <Stack spacing={4} height={"83vh"} direction={"column"}>
                      <Stack alignItems={"center"}>
                        <Typography variant="h6" fontWeight={"bold"}>
                          Daily Report List
                        </Typography>
                      </Stack>

                      <Divider />

                      <Stack height={"70vh"}>
                        <DataGrid
                          rows={userData.weeklyReports.map((report) => {
                            return {
                              weekNumber: report.weekNumber,
                              weekStartDate: report.weekStartDate.substring(
                                0,
                                10
                              ),
                              weekEndDate: report.weekEndDate.substring(0, 10),
                              report_id: report.weekNumber,
                              status: report.reportStatus,
                            };
                          })}
                          columns={dailyReportColumns2}
                          onRowClick={selectDailyReportData}
                          getRowId={(row) => row.weekNumber}
                          hideFooter={true}
                        />
                      </Stack>
                      <Stack>
                        <Button variant="itms" onClick={handleOnClick}>
                          Report Type
                        </Button>
                      </Stack>
                    </Stack>
                  </Tile>
                </Grid>

                <Grid item md={9}>
                  <Tile>
                    <DailyReportForm reportData={reportData} />
                  </Tile>
                </Grid>
              </Grid>
            )}

            {/* monthly report here */}
            {reportType === "Monthly Report" && (
              <Grid container spacing={1}>
                <Grid item md={3}>
                  <Tile>
                    <Stack spacing={2} height={"75vh"} direction={"column"}>
                      <Stack alignItems={"center"}>
                        <Typography variant="head6">
                          Monthly Report List
                        </Typography>
                      </Stack>

                      <Divider />

                      <Stack height={"55vh"}>
                        <DataGrid
                          // rows
                          rows={userData.monthlyReports.map((report) => {
                            return {
                              monthNumber: report.monthNumber,
                              report_id: report.monthNumber,
                              monthEndDate: report.monthEndDate.substring(
                                0,
                                10
                              ),
                              id: report._id,
                            };
                          })}
                          columns={monthlyReportColumns2}
                          onRowClick={selectMonthlyReportData}
                          getRowId={(row) => row.id}
                          hideFooter={true}
                        />
                      </Stack>
                      <Stack>
                        <Button variant="outlined" onClick={handleOnClick}>
                          Report Type
                        </Button>
                      </Stack>
                    </Stack>
                  </Tile>
                </Grid>

                <Grid item md={9}>
                  <Tile>
                    <StudnetMonthlyReport reportData={reportData} />
                  </Tile>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};
