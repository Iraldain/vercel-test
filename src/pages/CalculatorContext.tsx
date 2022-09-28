import create from "zustand";
import { devtools, persist } from "zustand/middleware";

import { getAugmentCost, getAugmentMaxRank } from "./Augment"
import Skill from "./Skill"
import { SkillCard } from "./SkillCard";

interface CalcState {
    selectedWeaponClass: string
    selectedWeapon: string
    selectedAugments: Map<string, number>
    selectedSkills: Skill[]
    selectedMonster: string
    
    setSelectedWeaponClass: (newWeaponClass: string) => void
    setSelectedWeapon: (newWeapon: string) => void
    addAugment: (augmentName: string, rank: number) => void
    addSkill: (skillName: string, rank: number, maxRank: number) => void
    setSkillRank: (skillName: string, rank: number) => void
    removeSkill: (skillName: string) => void
    resetSkills: () => void
    setSelectedMonster: (newMonster: string) => void
    
}

const editSkill = (skillArray: Skill[], skillName: string, newRank: number): Skill[] => {
    return skillArray.map(skill => (skill.name === skillName) ? {name: skillName, rank: newRank, maxRank: skill.maxRank}: skill);
}


export const useStore = create<CalcState>() (
    /*devtools(
        persist(*/
            (set) => ({
                selectedWeaponClass: "",
                selectedWeapon: "",
                selectedAugments: new Map<string, number>(),
                selectedSkills: [],
                selectedMonster: "",
                
                setSelectedWeaponClass: (newWeaponClass: string) => set(() => ({ selectedWeaponClass: newWeaponClass })),
                setSelectedWeapon: (newWeapon: string) => set(() => ({ selectedWeapon: newWeapon })),

                addAugment: (augmentName: string, rank: number) => set(state => ({
                    selectedAugments:
                    state.selectedAugments.set(augmentName, rank)
                })),

                addSkill: (skillName: string, rank: number, maxRank: number) => set(state => ({selectedSkills: [...state.selectedSkills, {name: skillName, rank: rank, maxRank: maxRank}]})),
                setSkillRank: (skillName: string, rank: number) => set(state => ({selectedSkills: editSkill(state.selectedSkills, skillName, rank)})),
                removeSkill: (skillName: string) => set(state => ({ selectedSkills: state.selectedSkills.filter( skill => skill.name != skillName) })),
                resetSkills: () => set(state => ({ selectedSkills: [] })),
                
                setSelectedMonster: (newMonster: string) => set(() => ({ selectedMonster: newMonster }))
            })
        /*)
    )*/
);

const addAugmentFiltered = (currentAugments: Map<string, number>, augmentName: string, rank: number): Map<string, number> => {
    let totalCost = 0;
    currentAugments.forEach((value, key, map) => {
        totalCost += getAugmentCost(key, value);
        console.log("Total augment cost:",totalCost)
    });

    return currentAugments;
}