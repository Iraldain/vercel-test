import Select, { SingleValue } from 'react-select';
import { useEffect, useId } from 'react';
import { PassThrough } from "stream";

import { useStore } from "./CalculatorContext"
import Skill from './Skill';
import { icons } from 'react-icons';

export const SkillCard = () => {
    return (
        <span className="top-card">
            <SkillDisplay />
            <SkillSelector />
        </span>
    );
  };

  
const SkillDisplay = () => {
    const skills: Array<Skill> = useStore(state => state.selectedSkills);
    const listItems = skills.map((item) => <SkillListItem key={item.name} skillName={item.name} skillRank={item.rank} maxRank={3}/>);
    
    return (
            <ul id="skillDisplay" className="h-fit">
                {listItems}
            </ul>
    );
  }
  
  
const SkillListItem = (props: {skillName: string, skillRank: number, maxRank: number}) => {
    const skills: Array<Skill> = useStore(state => state.selectedSkills);
    const setSkillRank: Function = useStore(state => state.setSkillRank);
    const removeSkill: Function = useStore(state => state.removeSkill);

    const HandleRangeChange = (obj: {target: {value: number}}) => {
        if(!obj) {
            return;
        }
        setSkillRank(props.skillName, obj.target.value);
    };

    const HandleRemoveButtonClick = () => {
        removeSkill(props.skillName);
        
    }
    return (
        <li>
            <div className="skill-list-entry flex flex-row justify-between">
                <button className="w-1 h-1 p-3" onClick={HandleRemoveButtonClick}/>
                <div className="float-left w-2/3">{props.skillName}</div>
                <input type="range" className="static ml-3 flex" defaultValue={1} min={0} max={props.maxRank} onChange={(obj) => HandleRangeChange(obj)} />
                <div className="basis-1/8">{props.skillRank}</div>
                <br></br>
            </div>
        </li>
        )
}

const SkillSelector = () => {
    const addSkill = useStore(state => state.addSkill);
    const selectedSkills = useStore(state => state.selectedSkills);
    const skills = ["Critical Eye", "Attack Boost", "Weakness Exploit", "Critical Boost", "Handicraft", "Horn Maestro"];
    const skillList: Array<{value: string, label: string}> = []
    skills.map((element) => {skillList[skillList.length] = {value: element.toLocaleLowerCase(), label: element}})
    
    const HandleChange = (obj: SingleValue<{label: string, value: string}>) => {
        if(!obj) {
            return;
        }
        if( selectedSkills.some( e => e.name === obj.label ) ) {
        } else {
            addSkill(obj.label, 1, 3);
        }
    };

    return (
        <div className="h-10">
        <Select id='SkillSelector' defaultValue={{value: "", label: "Add a Skill..."}} onChange={option => {HandleChange(option)}} isSearchable={true} options={skillList} className="selector" instanceId={useId()} />
        </div>
    );
};