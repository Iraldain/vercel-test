import Select from 'react-select';
import { Component, FunctionComponent, useEffect, useId } from 'react';
import Image from 'next/image';

import { useStore } from './CalculatorContext';
import { capitalize, fromPythonVarName } from './Utility'

import Weapon from './Weapon';
import { weaponClasses } from "./WeaponClasses";

import { greatswordWeaponList } from "../data/weaponlist1";
import { swordAndShieldWeaponList } from "../data/weaponlist2";
import { dualBladesWeaponList } from "../data/weaponlist3";
import { longSwordWeaponList } from "../data/weaponlist4";
import { hammerWeaponList } from "../data/weaponlist5";
import { huntingHornWeaponList } from "../data/weaponlist6";
import { lanceWeaponList } from "../data/weaponlist7";
import { gunLanceWeaponList } from "../data/weaponlist8";
import { switchAxeWeaponList } from "../data/weaponlist9";
import { chargeBladeWeaponList } from "../data/weaponlist10";
import { insectGlaiveWeaponList } from "../data/weaponlist11";
import { formatSharpness } from './SharpnessDisplay';
import { getAugmentOptions } from './Augment';

const weaponListMap = new Map();
weaponListMap.set("great sword", greatswordWeaponList);
weaponListMap.set("sword and shield", swordAndShieldWeaponList);
weaponListMap.set("dual blades", dualBladesWeaponList);
weaponListMap.set("long sword", longSwordWeaponList);
weaponListMap.set("lance", lanceWeaponList);
weaponListMap.set("gunlance", gunLanceWeaponList);
weaponListMap.set("charge blade", chargeBladeWeaponList);
weaponListMap.set("switch axe", switchAxeWeaponList);
weaponListMap.set("insect glaive", insectGlaiveWeaponList);
weaponListMap.set("hammer", hammerWeaponList);
weaponListMap.set("hunting horn", huntingHornWeaponList);


export const WeaponCard = () => {
    const selectedWeaponClass = useStore((state) => state.selectedWeaponClass);
    const selectedWeapon = useStore(state => state.selectedWeapon);

    return (
        <span className='top-card'>
            <WeaponClassSelector />
            <WeaponSelector />
            <AugmentSelector />
            <WeaponDisplay />
        </span>
        );
};


const WeaponClassSelector = () => {

    const setSelectedWeaponClass = useStore(state => state.setSelectedWeaponClass);
    const setSelectedWeapon = useStore(state => state.setSelectedWeapon);
    const weaponClassList: Array<{value: string, label: string}> = [];

    weaponClasses.map((element) => {weaponClassList[weaponClassList.length] = {value: element.toLowerCase(), label: element}});

    const HandleChange = (option: {label: string, value: string}) => {
        setSelectedWeaponClass(option.value);
        setSelectedWeapon(weaponListMap.get(option.value)[0]);
        
    };

    return (
        <Select id='weaponClassSelector'
        defaultValue={{value: "", label: "Select Weapon Class..."}}
        onChange={(option: {label: string, value: string}) => {HandleChange(option)}}
        isSearchable={true}
        options={weaponClassList}
        className="selector"
        instanceId={useId()} />
    );
};



const WeaponSelector = () => {

    const selectedWeaponClass = useStore(state => state.selectedWeaponClass);
    const selectedWeapon = useStore(state => state.selectedWeapon);
    const setSelectedWeapon = useStore(state => state.setSelectedWeapon);
    let inputString = selectedWeaponClass;

    const options: Array<{value: string, label: string}> = [];


    const weaponlist: Weapon[] = weaponListMap.get(inputString);

    weaponlist?.map((element: Weapon) => {options[options.length] = {value: element.name.toLowerCase(), label: element.name}})
    
    const defaultValue = {value: "", label: "Select Weapon..."};

    const selector = <Select id='weaponClassSelector'
        defaultValue={defaultValue}
        onChange={option => {HandleChange(option)}}
        isSearchable={true}
        options={options}
        className="selector h-10"
        instanceId={useId()} />

    const HandleChange = (option: {label: string, value: string}) => {
        setSelectedWeapon(option.label);
    };



    return selector;
};

const AugmentSelector = () => {
    const selectedAugments = useStore(state => state.selectedAugments);
    const addAugment = useStore(state => state.addAugment);
    const selectedWeapon = useStore(state => state.selectedWeapon);
    const selectedWeaponClass = useStore(state => state.selectedWeaponClass);

    const weaponList = weaponListMap.get(selectedWeaponClass)
    const weapon = weaponList?.find((weapon: Weapon) => weapon.name === selectedWeapon);
    if (weapon === undefined) {return <></>;}

    const augmentOptions = getAugmentOptions(weapon);

    const HandleChange = (option: {label: string, value: string}) => {
        addAugment(option.value, 1);
        return;
    };

    return <Select id="augmentSelector" defaultValue={{value: "No Augment", label: "No Augment"}} onChange={option => {HandleChange(option)}} options={augmentOptions} />
};



const getSlotIconSrc = (slot: number): string => {
    const decoImgMap = new Map();
    decoImgMap.set('1', '/deco1.png');
    decoImgMap.set('2', '/deco2.png');
    decoImgMap.set('3', '/deco3.png');
    decoImgMap.set('4', '/deco4.png');

    return decoImgMap.get(slot);
};


const WeaponDisplay = () => {
    const selectedWeapon = useStore(state => state.selectedWeapon);
    const selectedWeaponClass = useStore(state => state.selectedWeaponClass);
    

    const weaponList = weaponListMap.get(selectedWeaponClass)
    const weapon = weaponList?.find((weapon: Weapon) => weapon.name === selectedWeapon);
    if (weapon === undefined) {return <></>;}

    const name: string = weapon.name;
    const rawData: number = weapon.baseRaw;
    const affData: number = weapon.baseAffinity;

    let rampageData = weapon.rampageSlot ?
        <div>Rampage: 
            <Image
                src={getSlotIconSrc(weapon.rampageSlot)}
                alt={'failed to load Lv' + weapon.rampageSlot + ' deco image'}
                height='24' width='24'/>
        </div> :
        <></>;

    const slotData = weapon.slots.map((item: number, index: number) =>
        <Image className="weapon-property"
        key={index}
        src={getSlotIconSrc(item)}
        alt={'failed to load Lv' + item + ' deco image'}
        height='24'
        width='24'/>
        );
    const fullSharpnessData = formatSharpness(weapon.sharpness);

    const elements = (Object.entries(weapon.elements));
    let element1Data = "";
    if(elements[0]) { element1Data = capitalize(elements[0][0]) + ": " + elements[0][1]; }
    let element2Data = "";
    if(elements[1]) { element2Data = capitalize(elements[1][0]) + ": " + elements[1][1]; }
    const defenseData = weapon.defenseBonus;
    const uniqueData = weapon.unique.map((item: string) => <div key={item}>{fromPythonVarName(item)}</div>);

    return (
        <div className="text-blue-400 border border-double rounded-lg p-2">
            <div className="weapon-property">{name}</div>
            <div className="weapon-property flex">
                <div className="weapon-property flex-1">Raw: {rawData}</div>
                <div className="weapon-property flex-1">Aff: {affData}</div>
            </div>
            <div className="weapon-property flex">
                <div className="flex-1">Slots: {slotData ? slotData : "None"}</div>
                <div className="flex-1">{rampageData}</div>
            </div>
            <div className="flex">
                <div className={"weapon-property flex-1"}>{element1Data}</div>
                <div className={"weapon-property flex-1"}>{element2Data}</div>
            </div>
            <div className="weapon-property">Defense Bonus: {defenseData}</div>
            {uniqueData}
            <div className="">{fullSharpnessData}</div>
            
        </div>
    );
}

