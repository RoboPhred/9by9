import * as React from "react";

import ThemeProvider from "@/theme/components/ThemeProvider";
import StoreProvider from "@/store/components/StoreProvider";

import App from "@/components/App";

const Root: React.FC = () => (
  <ThemeProvider>
    <StoreProvider>
      <App />
    </StoreProvider>
  </ThemeProvider>
);

export default Root;
