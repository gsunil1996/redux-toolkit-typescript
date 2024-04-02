import {
  PetsDataType,
  PetsErrorResponse,
  PetsStateType,
} from "@/types/pets.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Initial state
export const petsInitialState: PetsStateType = {
  petsData: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: "",
};

// Thunk for fetching weather data
export const fetchPetsData = createAsyncThunk(
  "petsApi/fetchPetsData",
  async (limit: number, thunkAPI) => {
    try {
      const DOGS_API_KEY = "cbfb51a2-84b6-4025-a3e2-ed8616edf311";

      const headers = {
        "Content-Type": "application/json",
        "x-api-key": DOGS_API_KEY,
      };

      const { data } = await axios.get<PetsDataType[]>(
        `https://api.thedogapi.com/v1/breeds?limit=${limit}`,
        { headers }
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<PetsErrorResponse>;
      const errorMessage =
        axiosError.response?.data?.message || "An unknown error occurred";
      throw new Error(errorMessage);
    }
  }
);

// Slice
export const petsApiSlice = createSlice({
  name: "pets",
  initialState: petsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPetsData.pending, (state) => {
        state.petsData = null;
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(fetchPetsData.fulfilled, (state, action) => {
        state.petsData = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(fetchPetsData.rejected, (state, action) => {
        state.petsData = null;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.error.message
          ? action.error.message
          : "An unknown error occurred";
      });
  },
});

export default petsApiSlice.reducer;
