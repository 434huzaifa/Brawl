import { useEffect, useMemo, useState } from "react";
import { Legends, Stats } from "./Type.da";
import axios from "axios";
import { Analytics } from "@vercel/analytics/react";
import Filter from "./Filter/Index";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  isRandomStore,
  selectedStanceStore,
  selectedWeaponStore,
  weaponListStore,
} from "./Store";
import DividerWithCard from "./Common/DividerWithCard";

function App() {
  const [data, setData] = useState<Legends[]>([]);
  const setWeaponList = useSetAtom(weaponListStore);
  const selectedWeapon = useAtomValue(selectedWeaponStore);
  const selectedStance = useAtomValue(selectedStanceStore);
  const [isRandom, setIsRandom] = useAtom(isRandomStore);
  const [newData, setNewData] = useState<Legends[]>([]);
  const [exactWeapon, setExactWeapon] = useState<Legends[]>([]);
  const [exactStance, setExactStance] = useState<Legends[]>([]);
  const [exactStanceAndWeapon, setExactStanceAndWeapon] = useState<Legends[]>(
    []
  );
  const [randomData, setRandom] = useState<Legends[]>([]);
  const [atLeastOneWeapon, setAtLeastOneWeapon] = useState<Legends[]>([]);
  const [atLeastOneWeaponAndStance, setAtLeastOneWeaponAndStance] = useState<
    Legends[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/brawl.json");
        setData(response.data);
        setNewData(response.data);
        const response2 = await axios.get("/weapon.json");
        setWeaponList(response2.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  function exactStanceCheck(
    strength: undefined | number[],
    dexterity: undefined | number[],
    defense: undefined | number[],
    speed: undefined | number[],
    stat: Stats
  ) {
    if (strength && strength.includes(stat.strength)) {
      if (dexterity && dexterity.includes(stat.dexterity)) {
        if (defense && defense.includes(stat.defense)) {
          if (speed && speed.includes(stat.speed)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  function exactWeaponStanceDetector(object: Legends[], name: string): number {
    let idx = -1;
    object.forEach((x, i) => {
      if (x.name == name) {
        idx = i;
        return;
      }
    });

    return idx;
  }
  function weaponAndStance(
    t_at_least_one_weapon: Legends[],
    x: Legends,
    t_exactStanceAndWeapon: Legends[],
    t_exactWeapon: Legends[],
    t_exactStance: Legends[],
    t_exactStanceAndAtLeastOneWeapon: Legends[]
  ) {
    const idx = exactWeaponStanceDetector(
      // one weapon matched -1 means no match but stance matched
      t_at_least_one_weapon,
      x.name
    );
    const idx2 = exactWeaponStanceDetector(t_exactWeapon, x.name);
    if (idx2 !== -1) {
      t_exactStanceAndWeapon.push(x);
      t_exactWeapon.splice(idx2, 1);
    } else if (idx !== -1) {
      t_exactStanceAndAtLeastOneWeapon.push(x);
      t_at_least_one_weapon.splice(idx, 1);
    } else {
      t_exactStance.push(x);
    }
  }
  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  useMemo(() => {
    if (isRandom>=1) {
      const t_data = [
        ...newData,
        ...exactWeapon,
        ...exactStance,
        ...exactStanceAndWeapon,
        ...atLeastOneWeapon,
        ...atLeastOneWeaponAndStance,
      ];
      const randomData = t_data[getRandomNumber(0, t_data.length - 1)];
      setRandom([randomData]);
    }else{
      setIsRandom(0)
      setRandom([])
    }
  }, [isRandom]);
  useMemo(() => {
    if (
      selectedWeapon.length == 0 &&
      !selectedStance.defense.length &&
      !selectedStance.dexterity.length &&
      !selectedStance.speed.length &&
      !selectedStance.strength.length
    ) {
      setNewData(data);
      setRandom([]);
      setAtLeastOneWeaponAndStance([]);
      setExactStanceAndWeapon([]);
      setExactStance([]);
      setExactWeapon([]);
      setAtLeastOneWeapon([]);
    } else {
      const t_at_least_one_weapon: Legends[] = [];
      const t_exactWeapon: Legends[] = [];
      const t_exactStanceAndWeapon: Legends[] = [];
      const t_exactStance: Legends[] = [];
      const t_exactStanceAndAtLeastOneWeapon: Legends[] = [];

      data.forEach((x) => {
        if (selectedWeapon.length) {
          if (selectedWeapon.includes(x.w1)) {
            if (selectedWeapon.includes(x.w2)) {
              t_exactWeapon.push(x);
            } else {
              t_at_least_one_weapon.push(x);
            }
          } else if (selectedWeapon.includes(x.w2)) {
            if (selectedWeapon.includes(x.w1)) {
              t_exactWeapon.push(x);
            } else {
              t_at_least_one_weapon.push(x);
            }
          }
        }

        if (
          exactStanceCheck(
            selectedStance.strength,
            selectedStance.dexterity,
            selectedStance.defense,
            selectedStance.speed,
            x.stats.base
          )
        ) {
          weaponAndStance(
            t_at_least_one_weapon,
            x,
            t_exactStanceAndWeapon,
            t_exactWeapon,
            t_exactStance,
            t_exactStanceAndAtLeastOneWeapon
          );
        } else if (
          exactStanceCheck(
            selectedStance.strength,
            selectedStance.dexterity,
            selectedStance.defense,
            selectedStance.speed,
            x.stats.strength
          )
        ) {
          weaponAndStance(
            t_at_least_one_weapon,
            x,
            t_exactStanceAndWeapon,
            t_exactWeapon,
            t_exactStance,
            t_exactStanceAndAtLeastOneWeapon
          );
        } else if (
          exactStanceCheck(
            selectedStance.strength,
            selectedStance.dexterity,
            selectedStance.defense,
            selectedStance.speed,
            x.stats.dexterity
          )
        ) {
          weaponAndStance(
            t_at_least_one_weapon,
            x,
            t_exactStanceAndWeapon,
            t_exactWeapon,
            t_exactStance,
            t_exactStanceAndAtLeastOneWeapon
          );
        } else if (
          exactStanceCheck(
            selectedStance.strength,
            selectedStance.dexterity,
            selectedStance.defense,
            selectedStance.speed,
            x.stats.defense
          )
        ) {
          weaponAndStance(
            t_at_least_one_weapon,
            x,
            t_exactStanceAndWeapon,
            t_exactWeapon,
            t_exactStance,
            t_exactStanceAndAtLeastOneWeapon
          );
        } else if (
          exactStanceCheck(
            selectedStance.strength,
            selectedStance.dexterity,
            selectedStance.defense,
            selectedStance.speed,
            x.stats.speed
          )
        ) {
          weaponAndStance(
            t_at_least_one_weapon,
            x,
            t_exactStanceAndWeapon,
            t_exactWeapon,
            t_exactStance,
            t_exactStanceAndAtLeastOneWeapon
          );
        }
      });

      setAtLeastOneWeaponAndStance(t_exactStanceAndAtLeastOneWeapon);
      setExactStanceAndWeapon(t_exactStanceAndWeapon);
      setExactStance(t_exactStance);
      setExactWeapon(t_exactWeapon);
      setAtLeastOneWeapon(t_at_least_one_weapon);
      setNewData([]);
    }
  }, [selectedWeapon, selectedStance]);

  return (
    <div className="bg-[#153448] relative min-h-screen">
      <Filter></Filter>
      <div className="flex flex-col">
        {/* <div className="grid grid-cols-5"> */}
        <DividerWithCard
          data={randomData}
          dividerTitle="Random"
        ></DividerWithCard>
        <DividerWithCard
          data={exactStanceAndWeapon}
          dividerTitle="Exact Stance and Weapon"
        ></DividerWithCard>
        <DividerWithCard
          data={exactWeapon}
          dividerTitle="Exact Weapon"
        ></DividerWithCard>
        <DividerWithCard
          data={exactStance}
          dividerTitle="At Least One Stance"
        ></DividerWithCard>
        <DividerWithCard
          data={atLeastOneWeaponAndStance}
          dividerTitle="At Least One Stance and one Weapon"
        ></DividerWithCard>
        <DividerWithCard
          data={atLeastOneWeapon}
          dividerTitle="At least One Weapon"
        ></DividerWithCard>
        <DividerWithCard data={newData} dividerTitle=""></DividerWithCard>
      </div>
      <div
        className="bg-slate-400 cursor-pointer size-16 rounded-full border-2 flex justify-center items-center fixed bottom-4 right-4 z-10"
        onClick={() => window.open("https://forms.gle/2hM47qwwsoNhuJH46")}
        title="Feedback Form"
      >
        <img
          src="/feedback.png"
          alt="Feedback Form"
          title="Feedback Form"
          className="size-12"
        />
      </div>
      {randomData.length == 0 &&
      exactStanceAndWeapon.length == 0 &&
      exactWeapon.length == 0 &&
      exactStance.length == 0 &&
      atLeastOneWeaponAndStance.length == 0 &&
      atLeastOneWeapon.length == 0 &&
      newData.length == 0 ? (
        <div className="text-center text-red-300 text-2xl font-bold mt-5">
          No Data
        </div>
      ) : (
        <></>
      )}
      <Analytics />
    </div>
  );
}

export default App;
