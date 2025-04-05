import { ReactNode } from "react";
import Checkbox from "./Checkbox";
import StanceFilter from "./StanceFilter";
import { Button } from "antd";
import { useAtom, useSetAtom } from "jotai";
import {
  isRandomStore,
  selectedStanceStore,
  selectedWeaponStore,
} from "../Store";
// import SearchBox from "./SearchBox";

function Filter(): ReactNode {
  const setSelectedWeapon = useSetAtom(selectedWeaponStore);
  const setSelectedStance = useSetAtom(selectedStanceStore);
  const [isRandom, setIsRandom] = useAtom(isRandomStore);
  function onClick() {
    setSelectedWeapon([]);
    setSelectedStance({ strength: [], dexterity: [], defense: [], speed: [] });
  }
  function onClick2() {
    setIsRandom(isRandom+1);
  }
  function onClick3() {
    setIsRandom(0);
  }
  return (
    <div className="pt-2">
      {/* <SearchBox></SearchBox> */}
      <Checkbox></Checkbox>
      <StanceFilter></StanceFilter>
      <div className="w-full flex justify-center gap-2">
        <Button onClick={onClick}>Clear Filter</Button>
        <Button onClick={onClick2}>Get Random From Current Legend</Button>
        {isRandom ? (
          <Button onClick={onClick3} className="bg-red-500 text-white font-semibold border-0" >Clear Random</Button>
        ) : (
          <></>
        )}{" "}
      </div>
    </div>
  );
}

export default Filter;
