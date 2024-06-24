import { useEffect, useState } from "react";
import { Legends, Weapon } from "./Type.da";
import { Card, Checkbox, Divider } from "antd";
import axios from "axios";
function App() {
  const [data, setData] = useState<Legends[]>([]);
  const [newData, setNewData] = useState<Legends[]>([]);
  const [exact, setExact] = useState<Legends[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [weapons, setWeapon] = useState<Weapon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/brawl.json");
        setData(response.data);
        setNewData(response.data);
        const response2 = await axios.get("/weapon.json");
        setWeapon(response2.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);
  const checkboxOptions = weapons.map((x) => {
    return { label: x.name, value: x.name };
  });
  function checkOnChange(value: string[]) {
    if (value.length == 0) {
      setNewData(data);
      setIsChecked(false);
    } else {
      const t_data: Legends[] = [];
      const t_exact: Legends[] = [];
      data.forEach((x) => {
        if (value.includes(x.w1)) {
          if (value.includes(x.w2)) {
            t_exact.push(x);
          } else {
            t_data.push(x);
          }
        } else if (value.includes(x.w2)) {
          t_data.push(x);
        }
      });
      setExact(t_exact);
      setNewData(t_data);
      setIsChecked(true);
    }
  }
  return (
    <>
      <div className="flex justify-center p-5 mb-5">
        <Checkbox.Group
          options={checkboxOptions}
          onChange={checkOnChange}
        ></Checkbox.Group>
      </div>
      <div className="grid grid-cols-11 gap-6 p-4">
        <div className="col-span-11 grid grid-cols-11">
          {isChecked && (
            <Divider className="col-span-11" orientation="left">
              <p className="font-bold text-xl italic">Exact</p>
            </Divider>
          )}

          {exact &&
            exact.map((x) => {
              let img1: Weapon[] | string = weapons.filter(
                (y) => y.name == x.w1
              );
              if (img1) {
                img1 = img1[0]?.img;
              } else {
                img1 = "";
              }
              let img2: Weapon[] | string = weapons.filter(
                (y) => y.name == x.w2
              );
              if (img2) {
                img2 = img2[0]?.img;
              } else {
                img2 = "";
              }
              return (
                <Card
                  title={
                    <p className="text-center font-bold text-xl">{x.name}</p>
                  }
                  size="small"
                >
                  <img alt="example" src={x.img} />
                  <div className="grid grid-cols-2">
                    <img alt="example" src={img1} />
                    <img alt="example" src={img2} />
                  </div>
                </Card>
              );
            })}
        </div>
        {isChecked && (
          <Divider className="col-span-11" orientation="left">
            <p className="font-bold text-xl italic">At least One Weapon</p>
          </Divider>
        )}
        {newData.map((x) => {
          let img1: Weapon[] | string = weapons.filter((y) => y.name == x.w1);
          if (img1) {
            img1 = img1[0]?.img;
          } else {
            img1 = "";
          }
          let img2: Weapon[] | string = weapons.filter((y) => y.name == x.w2);
          if (img2) {
            img2 = img2[0]?.img;
          } else {
            img2 = "";
          }
          return (
            <Card
              title={<p className="text-center font-bold text-xl">{x.name}</p>}
              size="small"
            >
              <img alt="example" src={x.img} />
              <div className="grid grid-cols-2">
                <img alt="example" src={img1} />
                <img alt="example" src={img2} />
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}

export default App;
