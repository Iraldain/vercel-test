export default interface Weapon {
    name: string
    weaponType: string
    id: number
    baseRaw: number
    baseAffinity: number
    elements: {
        fire?: number | undefined
        water?: number | undefined
        ice?: number | undefined
        thunder?: number | undefined
        dragon?: number | undefined
        blast?: number | undefined
        paralysis?: number | undefined
        poison?: number | undefined
        sleep?: number | undefined
    }
    sharpness: {
        startsMaxed: boolean
        red: number
        orange: number
        yellow: number
        green: number
        blue: number
        white: number
        purple: number
    }
    slots: Array<number>
    rampageSlot: number
    defenseBonus: number
    unique: Array<string>
    imgSrc: string
}