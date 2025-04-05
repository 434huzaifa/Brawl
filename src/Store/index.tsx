import { atom } from "jotai";
import { Legends, StanceStoreType, Weapon } from "../Type.da";

export const weaponListStore = atom<Weapon[]>([]);
export const legendsListStore = atom<Legends[]>([]);
export const selectedWeaponStore = atom<string[]>([]);
export const searchNameStore = atom<string>("");
export const selectedStanceStore = atom<StanceStoreType>({
  strength: [],
  dexterity: [],
  defense: [],
  speed: [],
});
export const isRandomStore= atom<number>(0)