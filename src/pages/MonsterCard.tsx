import type { NextPage } from "next";
import Head from "next/head";
import Select from 'react-select';
import { useEffect, useId } from 'react';
import { useStore } from "./CalculatorContext";

import { bestiary } from "../data/bestiary";
import { Hitzone, Monster } from "./Monster";

export const MonsterCard = () => {
    return (
      <span className="top-card">
        <MonsterSelector />
        <MonsterDisplay />
      </span>
    );
  };
  

const MonsterSelector = () => {
    const setSelectedMonster = useStore(state => state.setSelectedMonster);
    const selectedMonster = useStore(state => state.selectedMonster);
    const monsterList: Array<{value: string, label: string}> = []
    bestiary.map((element => {monsterList[monsterList.length] = {value: element.name.toLowerCase(), label: element.name}}));
    
    const HandleChange = (option) => {
      setSelectedMonster(option.label);
      console.log(selectedMonster);
    };

    return (
        <Select id='monsterSelector' options={monsterList} defaultValue={{value: "Training Dummy", label: "Training Dummy"}} onChange={(option) => HandleChange(option)} isSearchable={true} className="selector"  instanceId={useId()}/>
    );
};

const MonsterDisplay = () => {
  const selectedMonster = useStore(state => state.selectedMonster);
  const monster = bestiary.find((m: Monster) => {m.name === selectedMonster});
  console.log(monster);
  const hitzoneDisplay = monster?.hitzones.forEach((hitzone: Hitzone) => {})
  
  return (
  <div className="flex">
    <div className=""></div>
    
  </div>
  );
}