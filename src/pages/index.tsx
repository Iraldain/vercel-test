import type { NextPage } from "next";
import Head from "next/head";

import { useStore } from "./CalculatorContext";
import { WeaponCard } from "./WeaponCard";
import { SkillCard } from "./SkillCard"
import { MonsterCard } from "./MonsterCard"
import { ResultsCard } from "./ResultsCard"

type Weapon = {
  name: string;
  id: number;
  imgSrc: string;
  weaponClass: string;
  baseRaw: number;
  baseAffinity: number;
  elements: Map<string, number>
  slots: Array<number>;
  rampageSlot: number;
  defenseBonus: number;
  unique: Array<string>;
  sharpness: {
    startsMaxed: boolean,
    red: number,
    orange: number,
    yellow: number,
    green: number,
    blue: number,
    white: number,
    purple: number
  };
};


const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Sunbreak Matchup Calculator</title>
        <meta name="description" content="A tool for nerds and hunters." />
        <link rel="icon" href="" />
      </Head>

      <div id="topCards" className="h-1/2 p-3 grid gap-2 grid-cols-3 grid-rows-1">
        <WeaponCard />
        <SkillCard />
        <MonsterCard />
      </div>
      <div id="midPageSpacing" className="h-5 w-screen"></div>
      <div id="bottomCards" className="flex w-[calc(100%-6rem)] border border-fuchsia-900 origin-center">
        <ResultsCard />
      </div>
    </>
  );
};


export default Home;
