"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { ChildrenProps } from "@/types/common.types";

const Providers = ({ children }: ChildrenProps) => {
  return <Provider store={store}>{children}</Provider>;
}

export default Providers