import Topbar from "@/components/topbar/Topbar";
import Workspace from "@/components/workspace/Workspace";
import useHasMounted from "@/hooks/useHasMounted";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";
import { notFound } from "next/navigation";
import { pid } from "process";
import React from "react";

type Props = {
  problem: Problem;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(problems).map((key) => ({
    params: { pid: key },
  }));
}

async function getProblems({ params }: { params: { pid: string } }) {
  const { pid } = params;
  const problem = problems[pid];

  if (!problem) {
    notFound();
  }
  problem.handlerFunction = problem.handlerFunction.toString();

  return problem;
}

const ProblemPage = async (params: any) => {
  const problem = await getProblems(params);

  return (
    <div>
      <Topbar problemPage />
      <Workspace problem={problem} />
    </div>
  );
};

export default ProblemPage;

// Fetch data from the local server
// SSG
// get static paths => creates the dynamic routes

// export async function getStaticPaths() {
//   const paths = Object.keys(problems).map((key) => ({
//     params: { pid: key },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// // getStaticProps => it fetch the data

// export async function getStaticProps({ params }: { params: { pid: string } }) {
//   const { pid } = params;
//   const problem = problems[pid];

//   if (!problem) {
//     return {
//       notFound: true,
//     };
//   }
//   problem.handlerFunction = problem.handlerFunction.toString();
//   return {
//     props: {
//       problem,
//     },
//   };
// }
