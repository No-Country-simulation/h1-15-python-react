import React from "react";
import UserMenu from "../UserMenu";

export default function DoctorHeader() {
  return (
    <div className="flex gap-10 justify-end w-full">
      <div className="">⭕️</div>
      <div className="">🔔</div>
      <div>
        <UserMenu />
      </div>
    </div>
  );
}
