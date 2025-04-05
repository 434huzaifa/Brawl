import { useAtom, useAtomValue } from "jotai";
import { ReactNode } from "react";
import { selectedWeaponStore, weaponListStore } from "../Store";

function Checkbox(): ReactNode {
  const weaponList = useAtomValue(weaponListStore);
  const [selectedWeapon,setSelectedWeapon]=useAtom(selectedWeaponStore)
  function onClickImage(name:string){
    if (selectedWeapon.length>0) {
        if (selectedWeapon.includes(name)) {
            setSelectedWeapon(selectedWeapon.filter(x=>x!==name))
        }else{
            setSelectedWeapon([...selectedWeapon,name])
        }
    }else{
        setSelectedWeapon([name])
    }
  }
  return (
    <div className="flex flex-wrap gap-1 justify-center">
      {weaponList.map((x) => (
        <img onClick={() => onClickImage(x.name)} src={x.img} alt={x.name} title={x.name} className={`size-20 rounded-md hover:border-4 cursor-pointer ${selectedWeapon.includes(x.name) ? "border-2 border-amber-400":" hover:border-blue-500"}`} />
      ))}
    </div>
  );
}

export default Checkbox;
