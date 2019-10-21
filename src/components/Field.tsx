import * as React from "react";

const Field: React.FC = ({ children }) => {
  return (
    <svg width="500" height="500">
      {children}
    </svg>
  );
};

export default Field;
