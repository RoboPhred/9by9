import * as React from "react";

import theme from "@/theme/theme";

interface FieldProps {
  className?: string;
  children: React.ReactNode;
}
const Field = ({ className, children }: FieldProps) => {
  return (
    <svg width={theme.gridSizePx * 3 + 50} height={theme.gridSizePx * 3 + 50}>
      {children}
    </svg>
  );
};

export default Field;
