"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { GetSingleEmployeeParmsType } from "@/types/crud.types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getEmployeeProfileData } from "@/redux/features/mernCrudTable/crudSlice";

const EmployeesProfile = ({ params }: GetSingleEmployeeParmsType) => {
  const router = useRouter();
  const dispatch = useAppDispatch()


  const id = params?.employee


  const { employeeProfileData, employeeProfileIsLoading, employeeProfileIsError, employeeProfileError, employeeProfileIsSuccess } = useAppSelector((state) => state.crud)


  useEffect(() => {
    if (id) {
      dispatch(getEmployeeProfileData({ id }))
    }
  }, [id]);

  return (
    <div>
      {employeeProfileIsLoading ? (
        <div style={{ width: "100%", marginTop: "20px" }}>
          <CircularProgress />
        </div>
      ) : employeeProfileIsError ? (
        <div style={{ width: "100%", marginTop: "20px", textAlign: "center" }}>
          <h1>{employeeProfileError}</h1>
        </div>
      ) : employeeProfileIsSuccess ? (
        <div>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div style={{ maxWidth: "max-content", margin: "auto" }}>
              <Card variant="outlined" style={{ marginTop: "20px" }}>
                <CardContent>
                  <div>
                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      onClick={() => router.push("/mern-curd-table")}
                    >
                      Back
                    </Button>
                  </div>
                  <div className="text-center">
                    <h3>{employeeProfileData?.data?.fname + " " + employeeProfileData?.data?.lname}</h3>
                    <h4>Email: {employeeProfileData?.data?.email}</h4>
                    <h5>Phone Number: {employeeProfileData?.data?.mobile}</h5>
                    <h4>Gender: {employeeProfileData?.data?.gender}</h4>
                    <h4>Location: {employeeProfileData?.data?.location}</h4>
                    <h4>Status: {employeeProfileData?.data?.status}</h4>
                    <h5>
                      Date Created:-
                      {moment(employeeProfileData?.data?.datecreated).format("DD-MM-YYYY")}
                    </h5>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default EmployeesProfile;