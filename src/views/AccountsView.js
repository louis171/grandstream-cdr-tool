import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stack from "@mui/material/Stack";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";

import { ToastContainer, toast } from "react-toastify";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";

const AccountsView = ({ userMethod, userIpAddress, userPort, gsCookie }) => {
  const navigate = useNavigate();

  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);

  const [listAccounts, setListAccounts] = useState([]);

  useEffect(() => {
    setIsLoadingAccounts(true);
    axios
      .post(`${userMethod}://${userIpAddress}:${userPort}/api`, {
        request: {
          action: "listAccount",
          cookie: gsCookie,
          sidx: "extension",
          sord: "asc",
        },
      })
      .then((res) => {
        console.log(res);
        setListAccounts(res.data.response.account);
        setIsLoadingAccounts(false);
      })
      .catch((err) => {
        navigate("/");
        console.log(err);
        toast.error("Sorry an error occured. Code: 05");
      });
  }, []);

  const editExtension = (account) => {};

  return (
    <Container component="main" maxWidth="xl">
      <ToastContainer autoClose={2000} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="Accounts Table">
                <TableHead>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell>Presence</TableCell>
                    <TableCell>Extension</TableCell>
                    <TableCell>Fullname</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>IP</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>Options</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoadingAccounts ? (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                    </TableRow>
                  ) : (
                    listAccounts.map((account) => (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        {/* Handles status of extension (Idle, InUse, Busy, Unavailable, Ringing) 
                        and choses colors of CircleRoundedIcon based on the string */}
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <CircleRoundedIcon
                              color={
                                account.status === "Idle"
                                  ? "success"
                                  : account.status === "InUse"
                                  ? "primary"
                                  : account.status === "Busy"
                                  ? "warning"
                                  : account.status === "Unavailable"
                                  ? "error"
                                  : account.status === "Ringing"
                                  ? "secondary"
                                  : "info"
                              }
                              sx={{ mr: ".5em" }}
                            />
                            <Typography fontSize="0.875rem">
                              {account.status === "" ? "-" : account.status}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {account.presence_status === ""
                            ? "-"
                            : account.presence_status}
                        </TableCell>
                        <TableCell>
                          {account.extension === "" ? "-" : account.extension}
                        </TableCell>
                        {/* Handles fullname of extension. Can include the Extension number which is removed */}
                        <TableCell>
                          {account.fullname === ""
                            ? "-"
                            : account.fullname
                                .replace(account.user_name, "")
                                .trim()}
                        </TableCell>
                        <TableCell>
                          {account.account_type === ""
                            ? "-"
                            : account.account_type}
                        </TableCell>
                        <TableCell>{`${account.urgemsg}/${account.newmsg}/${account.oldmsg}`}</TableCell>
                        {/* Creates a clickable URL from the IP returned */}
                        <TableCell>
                          {account.addr === "-" ? (
                            "N/A"
                          ) : (
                            <a
                              href={`https://${
                                account.addr.split(" ")[0].split(":")[0]
                              }`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {account.addr.split(" ")[0].split(":")[0]}
                            </a>
                          )}
                        </TableCell>
                        {/* Using the IP address which includes the phone model. Splits string at the space then filters to remove brackets */}
                        <TableCell>
                          {account.addr === "-"
                            ? "N/A"
                            : account.addr.replace(/[()]/g, "").split(" ")[1]}
                        </TableCell>
                        <TableCell
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <Button
                            onClick={() =>
                              navigate(`/extension/${account.extension}`)
                            }
                          >
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                bgcolor: "primary.main",
                              }}
                              variant="rounded"
                            >
                              <EditRoundedIcon />
                            </Avatar>
                          </Button>
                          <Button>
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                bgcolor: "error.main",
                              }}
                              variant="rounded"
                            >
                              <DeleteRoundedIcon />
                            </Avatar>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AccountsView;
