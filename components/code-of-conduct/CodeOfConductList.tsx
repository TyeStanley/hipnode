import { codeOfConduct } from "@/constants";
import React from "react";

const CodeOfConductList = () => (
  <ul className="flex flex-col gap-2">
    {codeOfConduct.map((code) => (
      <li key={code.title} className="flex flex-col gap-1">
        <p className="semibold-18 text-sc-1_light-2">{code.title}</p>
        <p className="text-sc-3">{code.description}</p>
      </li>
    ))}
  </ul>
);

export default CodeOfConductList;
