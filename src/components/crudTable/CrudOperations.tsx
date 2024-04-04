"use client"

import { MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import moment from "moment";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import InputLabel from "@mui/material/InputLabel";
import Pagination from "@mui/material/Pagination";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AddEmployee from "./AddEmployee";
import DeleteEmployee from "./DeleteEmployee";
import EditEmployee from "./EditEmployee";
import { Column, GetEmployeeTableDataProps } from "@/types/crud.types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getEmployeeProfileData, getEmployeeTableData } from "@/redux/features/mernCrudTable/crudSlice";

const columns: Column[] = [
  {
    id: "firstName",
    label: "First Name",
    minwidth: 60,
    align: "left",
    background: "#755139FF",
  },
  {
    id: "lastName",
    label: "Last Name",
    minwidth: 60,
    align: "left",
    background: "#755139FF",
  },

  {
    id: "email",
    label: "Email",
    minwidth: 60,
    align: "left",
    background: "#755139FF",
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
    minwidth: 60,
    align: "left",
    background: "#755139FF",
  },
  {
    id: "gender",
    label: "Gender",
    minwidth: 60,
    align: "left",
    background: "#755139FF",
  },
  {
    id: "status",
    label: "Status",
    minwidth: 60,
    align: "left",
    background: "#755139FF",
  },
  {
    id: "location",
    label: "Location",
    minwidth: 60,
    align: "left",
    background: "#755139FF",
  },
  {
    id: "date",
    label: "Date",
    minwidth: 60,
    align: "left",
    background: "#755139FF",
  },

  {
    id: "actions",
    label: "Actions",
    minwidth: 60,
    align: "center",
    background: "#755139FF",
  },
];

const CrudOperations = () => {
  const router = useRouter();
  const dispatch = useAppDispatch()

  const { data, isLoading, isError, error, isSuccess } = useAppSelector((state) => state.crud)

  const [search, setSearch] = useState<string>(sessionStorage.getItem("search") || "");
  const [gender, setGender] = useState<string>(
    sessionStorage.getItem("gender") || "all"
  );
  const [status, setStatus] = useState<string>(
    sessionStorage.getItem("status") || "all"
  );
  const [sort, setSort] = useState<string>(sessionStorage.getItem("sort") || "new");

  const [page, setPage] = useState<number>(
    sessionStorage.getItem("page") ? Number(sessionStorage.getItem("page")) : 1
  );

  const [addEmployeeOpen, setAddEmployeeOpen] = useState<boolean>(false);
  const [editEmployeeopen, setEditEmployeeOpen] = useState<boolean>(false);
  const [deleteEmployeeOpen, setDeleteEmployeeOpen] = useState<boolean>(false);
  const [tableRowId, setTableRowId] = useState<string>("");

  const getData = ({ search, gender, status, sort, page }: GetEmployeeTableDataProps) => {
    dispatch(getEmployeeTableData({ search, gender, status, sort, page }))
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
    sessionStorage.setItem("page", newPage.toString());
    getData({ search, gender, status, sort, page: newPage });
  };

  const handleAddEmployeeClickOpen = () => {
    setAddEmployeeOpen(true);
  };

  const handleEditEmployeeClickOpen = () => {
    setEditEmployeeOpen(true);
  };

  const handleDeleteEmployeeClickOpen = () => {
    setDeleteEmployeeOpen(true);
  };

  const handleViewClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, id: string) => {
    router.push(`/mern-curd-table/${id}`);
  };

  const handleEditClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, id: string) => {
    setTableRowId(id);
    dispatch(getEmployeeProfileData({ id }))
    handleEditEmployeeClickOpen();
  };

  const handleDeleteClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, id: string) => {
    setTableRowId(id);
    handleDeleteEmployeeClickOpen();
  };

  const handleSearch = (searchedVal: string) => {
    setSearch(searchedVal);
    sessionStorage.setItem("search", searchedVal);
    setPage(1);
    sessionStorage.setItem("page", "1");
    if (searchedVal == "") {
      getData({ search: searchedVal, gender, status, sort, page: 1 });
    }
  };

  const requestSearch = () => {
    setPage(1);
    sessionStorage.setItem("page", "1");
    getData({ search, gender, status, sort, page: 1 });
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    sessionStorage.setItem("gender", event.target.value);
    setGender((event.target as HTMLInputElement).value);
    sessionStorage.setItem("page", "1");
    setPage(1);
    getData({ search, gender: event.target.value, status, sort, page: 1 });
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    sessionStorage.setItem("status", event.target.value);
    setStatus(event.target.value as string);
    sessionStorage.setItem("page", "1");
    setPage(1);
    getData({ search, gender, status: event.target.value, sort, page: 1 });
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    sessionStorage.setItem("sort", event.target.value);
    setSort(event.target.value as string);
    sessionStorage.setItem("page", "1");
    setPage(1);
    getData({ search, gender, status, sort: event.target.value, page: 1 });
  };

  useEffect(() => {

    if (!sessionStorage.getItem("page")) {
      sessionStorage.setItem("page", "1");
    }

    if (!sessionStorage.getItem("gender")) {
      sessionStorage.setItem("gender", "all");
    }

    if (!sessionStorage.getItem("status")) {
      sessionStorage.setItem("status", "all");
    }

    if (!sessionStorage.getItem("sort")) {
      sessionStorage.setItem("sort", "new");
    }

    if (!sessionStorage.getItem("search")) {
      sessionStorage.setItem("search", "");
    }

    getData({
      search,
      gender,
      status,
      sort,
      page,
    });
  }, []);

  return (
    <div>
      <h1>Crud Operations using session storage</h1>

      <div
        style={{
          width: "95%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            id="standard-basic"
            label="Search"
            variant="standard"
            type="search"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button variant="contained" onClick={() => requestSearch()}>
            Search
          </Button>
        </div>
        {/* {console.log("gennder", gender)} */}
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={gender}
              onChange={handleGenderChange}
              row
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        </div>

        <div>
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={status}
              onChange={handleStatusChange}
              label="Status"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">active</MenuItem>
              <MenuItem value="inactive">inactive</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div>
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Sort
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={sort}
              onChange={handleSortChange}
              label="Sort"
            >
              <MenuItem value="new">new</MenuItem>
              <MenuItem value="old">old</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => handleAddEmployeeClickOpen()}
          >
            Add User
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <LinearProgress style={{ width: "100%", marginTop: "20px" }} />
        </div>
      ) : isError ? (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <h4>{error}</h4>
        </div>
      ) : isSuccess === true && data?.data?.employeesTableData?.length == 0 ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h1>No Data Found</h1>
        </div>
      ) : isSuccess ? (
        <div style={{ width: "95%", margin: "auto" }}>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{
                width: "100%",
                overflowX: "auto",
                display: "inline-grid",
                marginTop: "10px",
              }}
            >
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minwidth,
                            background: column.background,
                            color: "#fff",
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.data?.employeesTableData?.map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row._id}
                          style={{
                            background: "#F2EDD7FF",
                          }}
                        >
                          <TableCell align="left">{row.fname}</TableCell>
                          <TableCell align="left">{row.lname}</TableCell>

                          <TableCell align="left">{row.email}</TableCell>

                          <TableCell align="left">{row.mobile}</TableCell>

                          <TableCell align="left">{row.gender}</TableCell>

                          <TableCell align="left">{row.status}</TableCell>
                          <TableCell align="left">{row.location}</TableCell>
                          <TableCell align="left">
                            {moment(row.datecreated).format(
                              "DD-MM-YYYY hh:mm a"
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Button
                                variant="contained"
                                color="success"
                                onClick={(event) =>
                                  handleViewClick(event, row._id)
                                }
                              >
                                View
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={(event) =>
                                  handleEditClick(event, row._id)
                                }
                              >
                                Edit
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                onClick={(event) =>
                                  handleDeleteClick(event, row._id)
                                }
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Pagination
                  count={data?.data?.pagination?.pageCount}
                  page={Number(page)}
                  onChange={handlePageChange}
                  variant="outlined"
                  color="primary"
                />
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        ""
      )}

      {/* add employee dialog */}
      <AddEmployee
        addEmployeeOpen={addEmployeeOpen}
        setAddEmployeeOpen={setAddEmployeeOpen}
        setPage={setPage}
      />

      {/* edit employee dialog */}
      {tableRowId && <EditEmployee
        editEmployeeopen={editEmployeeopen}
        setEditEmployeeOpen={setEditEmployeeOpen}
        tableRowId={tableRowId}
      />}



      {/* delete employee dialog */}
      {typeof data?.data?.employeesTableData?.length !== "undefined" && (
        <DeleteEmployee
          deleteEmployeeOpen={deleteEmployeeOpen}
          setDeleteEmployeeOpen={setDeleteEmployeeOpen}
          tableRowId={tableRowId}
          page={
            page == 1
              ? 1
              : data?.data?.employeesTableData?.length > 1
                ? page
                : page - 1
          }
          setPage={setPage}
        />
      )}

    </div>
  );
};

export default CrudOperations;