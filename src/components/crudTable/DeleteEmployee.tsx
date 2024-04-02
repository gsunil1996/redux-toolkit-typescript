"use client"

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { TransitionProps } from "@mui/material/transitions";
import { DeleteEmployeeComponentProps } from "@/types/crud.types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteEmployeeTableData, getEmployeeTableData, resetDeleteEmployee } from "@/redux/features/mernCrudTable/crudSlice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteEmployee = (props: DeleteEmployeeComponentProps) => {
  const {
    deleteEmployeeOpen,
    setDeleteEmployeeOpen,
    tableRowId,
    page,
    setPage,
  } = props;

  const dispatch = useAppDispatch()

  const { employeeDeleteDataLoading } = useAppSelector((state) => state.crud)

  const handleDeleteEmployeeClose = () => {
    setDeleteEmployeeOpen(false);
  };

  const handleUserDelete = () => {
    const employeeData = {
      search: sessionStorage.getItem("search") || "",
      gender: sessionStorage.getItem("gender") || "all",
      status: sessionStorage.getItem("status") || "all",
      sort: sessionStorage.getItem("sort") || "new",
      page,
    };

    const payload = {
      tableRowId,
    };

    dispatch(deleteEmployeeTableData(payload)).then(() => {
      handleDeleteEmployeeClose();
      sessionStorage.setItem("page", String(page));
      setPage(page);
      toast("User Deleted Successully", {
        autoClose: 2000,
        type: "success",
      });
      dispatch(resetDeleteEmployee())
      dispatch(getEmployeeTableData(employeeData))
    })
      .catch((error) => {
        // console.log("checking now", error.message)
        toast(error.message, { autoClose: 2000, type: "error" });
        dispatch(resetDeleteEmployee())
      });
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={deleteEmployeeOpen}
        onClose={handleDeleteEmployeeClose}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <div style={{ textAlign: "center" }}>
            <h3 style={{ marginTop: "0px" }}>
              Are you sure to delete this user
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteEmployeeClose}
            >
              No
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleUserDelete}
            >
              {employeeDeleteDataLoading ? (
                <CircularProgress style={{ color: "#fff" }} />
              ) : (
                "Yes"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteEmployee;