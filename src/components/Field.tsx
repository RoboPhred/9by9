import * as React from "react";

import theme from "@/theme/theme";

const Field: React.FC = ({ children }) => {
  return (
    <svg width={theme.gridSizePx * 3 + 50} height={theme.gridSizePx * 3 + 50}>
      {children}
    </svg>
  );
};

export default Field;
