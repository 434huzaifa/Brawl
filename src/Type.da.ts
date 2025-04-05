export interface Stats {
  strength: number;
  dexterity: number;
  defense: number;
  speed: number;
}

export interface Legends {
  name: string;
  stats: {
    base: Stats;
    strength: Stats;
    dexterity: Stats;
    defense: Stats;
    speed: Stats;
  };
  w1: string;
  w2: string;
  img: string;
  b_img: string;
}
export interface Weapon {
  name: string;
  img: string;
}

export interface StanceStoreType{
  strength:number [],
  dexterity: number[],
  defense: number[],
  speed: number[]
}