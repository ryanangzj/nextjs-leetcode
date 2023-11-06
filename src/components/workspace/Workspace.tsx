"use client";
import React from "react";
import Split from "react-split";
import ProblemDescription from "./problemDescription/ProblemDescription";
import Playground from "./playground/Playground";

type Props = {
  // problem: Problem
};

const Workspace = (props: Props) => {
  return (
    <Split className="split" minSize={0}>
      <ProblemDescription />
      <div className="bg-dark-fill-2">
        <Playground />
      </div>
    </Split>
  );
};

export default Workspace;
