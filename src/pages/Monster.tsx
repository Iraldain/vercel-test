export interface Monster {
    name: string
    kiranicoLink: string
    kiranicoId: string
    monsterId: number
    hitzones: Array<Hitzone>
}

export interface Hitzone {
    name: string
    state: number
    sever: number
    blunt: number
    pierce: number
    fire: number
    water: number
    ice: number
    thunder: number
    dragon: number
    stun: number
    none: number
}