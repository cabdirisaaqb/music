import React from "react";

function AdminLayaout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      {children}
    </div>
  );
}

export default AdminLayaout;
