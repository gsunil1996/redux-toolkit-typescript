import {
  AddSuccessPayloadType,
  CrudInitialState,
  DeleteEmployeeProfileApiResponse,
  DeleteEmployeeProps,
  EditEmployeeProfileApiResponse,
  EditEmployeeTableProps,
  ErrorResponseType,
  GetEmployeeProfileApiResponse,
  GetEmployeeProfileProps,
  GetEmployeeTableAPIResponse,
  GetEmployeeTableDataProps,
  InputDataType,
} from "@/types/crud.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { baseURL } from "../baseURL/baseUrl";

// Initial state
export const crudInitialState: CrudInitialState = {
  // get employee table data
  data: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: "",

  // get employee profile
  employeeProfileData: null,
  employeeProfileIsLoading: false,
  employeeProfileIsSuccess: false,
  employeeProfileIsError: false,
  employeeProfileError: "",

  // add employee table data
  employeeAddedData: null,
  employeeAddedDataIsSuccess: false,
  employeeAddDataLoading: false,
  employeeAddedDataIsError: false,
  employeeAddedDataError: "",

  // edit employee table data
  employeeEditedData: null,
  employeeEditDataLoading: false,
  employeeEditDataIsSuccess: false,
  employeeEditDataIsError: false,
  employeeEditDataError: "",

  // delete employee table data
  employeeDeletedData: null,
  employeeDeleteDataLoading: false,
  employeeDeleteDataIsSuccess: false,
  employeeDeleteDataIsError: false,
  employeeDeleteDataError: "",
};

// Thunk for fetching weather data
export const getEmployeeTableData = createAsyncThunk(
  "employeeTable/getEmployeeTableData",
  async (payload: GetEmployeeTableDataProps, thunkAPI) => {
    try {
      const { search, gender, status, sort, page } = payload;

      const { data } = await axios.get<GetEmployeeTableAPIResponse>(
        `${baseURL}/employeesTable?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`
      );

      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponseType>;
      const errorMessage =
        axiosError.response?.data?.error || "An unknown error occurred";
      throw new Error(errorMessage);
    }
  }
);

export const getEmployeeProfileData = createAsyncThunk(
  "employeeTable/getEmployeeProfileData",
  async ({ id }: GetEmployeeProfileProps, thunkAPI) => {
    try {
      const { data } = await axios.get<GetEmployeeProfileApiResponse>(
        `${baseURL}/employeesTable/${id}`
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponseType>;
      const errorMessage =
        axiosError.response?.data?.error || "An unknown error occurred";
      throw new Error(errorMessage);
    }
  }
);

export const addEmployeeTableData = createAsyncThunk(
  "employeeTable/addEmployeeTableData",
  async (payload: InputDataType, thunkAPI) => {
    try {
      const { data } = await axios.post<AddSuccessPayloadType>(
        `${baseURL}/addEmployee`,
        payload
      );

      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponseType>;
      const errorMessage =
        axiosError.response?.data?.error || "An unknown error occurred";
      throw new Error(errorMessage);
    }
  }
);

export const editEmployeeTableData = createAsyncThunk(
  "employeeTable/editEmployeeTableData",
  async (payload: EditEmployeeTableProps, thunkAPI) => {
    try {
      const { tableRowId, data } = payload;

      const response = await axios.patch<EditEmployeeProfileApiResponse>(
        `${baseURL}/updateEmployeeDetails/${tableRowId}`,
        data
      );

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponseType>;
      const errorMessage =
        axiosError.response?.data?.error || "An unknown error occurred";
      throw new Error(errorMessage);
    }
  }
);

export const deleteEmployeeTableData = createAsyncThunk(
  "employeeTable/deleteEmployeeTableData",
  async ({ tableRowId }: DeleteEmployeeProps, thunkAPI) => {
    try {
      const { data } = await axios.delete<DeleteEmployeeProfileApiResponse>(
        `${baseURL}/deleteEmployee/${tableRowId}`
      );

      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponseType>;
      const errorMessage =
        axiosError.response?.data?.error || "An unknown error occurred";
      throw new Error(errorMessage);
    }
  }
);

// Slice
export const crudSlice = createSlice({
  name: "crud",
  initialState: crudInitialState,
  reducers: {
    resetAddEmployee(state) {
      state.employeeAddDataLoading = false;
      state.employeeAddedDataIsError = false;
      state.employeeAddedDataError = "";
      state.employeeAddedDataIsSuccess = false;
    },
    resetEditEmployee(state) {
      state.employeeEditDataLoading = false;
      state.employeeEditDataIsError = false;
      state.employeeEditDataError = "";
      state.employeeEditDataIsSuccess = false;
    },
    resetDeleteEmployee(state) {
      state.employeeDeleteDataLoading = false;
      state.employeeDeleteDataIsError = false;
      state.employeeDeleteDataError = "";
      state.employeeDeleteDataIsSuccess = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getEmployeeTableData.pending, (state) => {
        state.data = null;
        state.isLoading = true;
        state.isError = false;
        state.error = "";
        state.isSuccess = false;
      })
      .addCase(getEmployeeTableData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.isSuccess = true;
      })
      .addCase(getEmployeeTableData.rejected, (state, action) => {
        state.data = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message
          ? action.error.message
          : "An unknown error occurred";
        state.isSuccess = false;
      })
      .addCase(getEmployeeProfileData.pending, (state) => {
        state.employeeProfileData = null;
        state.employeeProfileIsLoading = true;
        state.employeeProfileIsError = false;
        state.employeeProfileError = "";
        state.employeeProfileIsSuccess = false;
      })
      .addCase(getEmployeeProfileData.fulfilled, (state, action) => {
        state.employeeProfileData = action.payload;
        state.employeeProfileIsLoading = false;
        state.employeeProfileIsError = false;
        state.employeeProfileError = "";
        state.employeeProfileIsSuccess = true;
      })
      .addCase(getEmployeeProfileData.rejected, (state, action) => {
        state.employeeProfileData = null;
        state.employeeProfileIsLoading = false;
        state.employeeProfileIsError = true;
        state.employeeProfileError = action.error.message
          ? action.error.message
          : "An unknown error occurred";
        state.employeeProfileIsSuccess = false;
      })
      .addCase(addEmployeeTableData.pending, (state) => {
        state.employeeAddedData = null;
        state.employeeAddDataLoading = true;
        state.employeeAddedDataIsError = false;
        state.employeeAddedDataError = "";
        state.employeeAddedDataIsSuccess = false;
      })
      .addCase(addEmployeeTableData.fulfilled, (state, action) => {
        state.employeeAddedData = action.payload;
        state.employeeAddDataLoading = false;
        state.employeeAddedDataIsError = false;
        state.employeeAddedDataError = "";
        state.employeeAddedDataIsSuccess = true;
      })
      .addCase(addEmployeeTableData.rejected, (state, action) => {
        state.employeeAddedData = null;
        state.employeeAddDataLoading = false;
        state.employeeAddedDataIsError = true;
        state.employeeAddedDataError = action.error.message
          ? action.error.message
          : "An unknown error occurred";
        state.employeeAddedDataIsSuccess = false;
      })
      .addCase(editEmployeeTableData.pending, (state) => {
        state.employeeEditedData = null;
        state.employeeEditDataLoading = true;
        state.employeeEditDataIsError = false;
        state.employeeEditDataError = "";
        state.employeeEditDataIsSuccess = false;
      })
      .addCase(editEmployeeTableData.fulfilled, (state, action) => {
        state.employeeEditedData = action.payload;
        state.employeeEditDataLoading = false;
        state.employeeEditDataIsError = false;
        state.employeeEditDataError = "";
        state.employeeEditDataIsSuccess = true;
      })
      .addCase(editEmployeeTableData.rejected, (state, action) => {
        state.employeeEditedData = null;
        state.employeeEditDataLoading = false;
        state.employeeEditDataIsError = true;
        state.employeeEditDataError = action.error.message
          ? action.error.message
          : "An unknown error occurred";
        state.employeeEditDataIsSuccess = false;
      })
      .addCase(deleteEmployeeTableData.pending, (state) => {
        state.employeeDeletedData = null;
        state.employeeDeleteDataLoading = true;
        state.employeeDeleteDataIsError = false;
        state.employeeDeleteDataError = "";
        state.employeeDeleteDataIsSuccess = false;
      })
      .addCase(deleteEmployeeTableData.fulfilled, (state, action) => {
        state.employeeDeletedData = action.payload;
        state.employeeDeleteDataLoading = false;
        state.employeeDeleteDataIsError = false;
        state.employeeDeleteDataError = "";
        state.employeeDeleteDataIsSuccess = true;
      })
      .addCase(deleteEmployeeTableData.rejected, (state, action) => {
        state.employeeDeletedData = null;
        state.employeeDeleteDataLoading = false;
        state.employeeDeleteDataIsError = true;
        state.employeeDeleteDataError = action.error.message
          ? action.error.message
          : "An unknown error occurred";
        state.employeeDeleteDataIsSuccess = true;
      });
  },
});

export const { resetAddEmployee, resetDeleteEmployee, resetEditEmployee } =
  crudSlice.actions;

export default crudSlice.reducer;
