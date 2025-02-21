import { ReactNode } from "react";
import CoreContextProvider from "../context/Core.context";

const Providers = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <>
      <CoreContextProvider>
        {children}
      </CoreContextProvider>
    </>
  )
};

export default Providers;
