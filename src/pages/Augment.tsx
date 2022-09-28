import Weapon from "./Weapon";

export interface Augment {
    name: string
    rank: number
}

export const maxAugmentSlots = 5;

export const augmentOptions = [
    "attackAugment1",
    "attackAugment2",
    "attackAugment3",
    "affinityAugment",
    "elementAugment1",
    "elementAugment2",
    "elementAugment3",
    "statusAugment",
    "sharpnessAugment",
    "rampageSlotAugment"
];

export const getAugmentCost = (augmentName: string, augmentRank: number): number => {
    switch(augmentName) {
        case "Atack Boost 1":
            return 1;
        case "Atack Boost 2":
            return 2;
        case "Atack Boost 3":
            return 3;
        case "Affinity Boost":
            return 3;
        case "Element Boost 1":
            return 1;
        case "Element Boost 2":
            return 2;
        case "Element Boost 3":
            return 3;
        case "Status Effect Boost":
            return 3;
        case "Sharpness Boost":
            return 4;
        case "Rampage Slot Upgrade":
            return 4;
        default:
            return 0;
    }
}

export const getAugmentOptions = (weapon: Weapon): Array<{label: string, value: string}> => {
    let options: Array<{label: string, value: string}> = [];
    
    const elementIdentifiers = ["fire", "water", "thunder", "ice", "dragon"];
    const statusIdentifiers = ["blast", "poison", "paralysis", "sleep"];

    const elementBoostOption1 = {label: "Element Boost 1", value: "Element Boost 1"};
    const elementBoostOption2 = {label: "Element Boost 2", value: "Element Boost 2"};
    const elementBoostOption3 = {label: "Element Boost 3", value: "Element Boost 3"};
    const statusBoostOption = {label: "Status Boost", value: "Status Boost"};

    Object.keys(weapon.elements).forEach((value: string) => {
        if (elementIdentifiers.includes(value)) {
            options.push(elementBoostOption1, elementBoostOption2, elementBoostOption3);
        }
        else if(statusIdentifiers.includes(value)) {
            options.push(statusBoostOption);
        }
    });

    return [
        {label: "No Augment", value: "No Augment"},
        {label: "Attack Boost 1", value: "Attack Boost 1"},
        {label: "Attack Boost 2", value: "Attack Boost 2"},
        {label: "Attack Boost 3", value: "Attack Boost 3"},
        {label: "Affinity Boost", value: "Affinity Boost"},
        ...options,
        {label: "Sharpness Boost", value: "Sharpness Boost"},
        {label: "Rampage Slot Upgrade", value: "Rampage Slot Upgrade"}];
};

export const getAugmentMaxRank = (augmentName: string) => {
    return 3;
}