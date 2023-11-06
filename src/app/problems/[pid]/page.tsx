import Topbar from "@/components/topbar/Topbar";
import Workspace from "@/components/workspace/Workspace";
import React from "react";

type Props = {};

const ProblemPage = (props: Props) => {
  return (
    <div>
      <Topbar problemPage={true} />
      <Workspace />
    </div>
  );
};

export default ProblemPage;
