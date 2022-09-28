import type { NextPage } from "next";
import Head from "next/head";
import { useStore } from "zustand";

import { Result } from "./Result";
import { Hitzone } from "./Monster";
import { useState } from "react";

export const ResultsCard = () => {
  return (
  <>
    <span className="results-card" />
    <ResultCell />
  </>
    )
};



const ResultCell = (move, hitzone: Hitzone) => {

  return (
    <div>Test</div>
    )
}
