import { useEffect, useState } from "react";
import { Legends, Weapon } from "./Type.da";
import { Card, Checkbox, Divider, Image } from "antd";
import axios from "axios";
import { Analytics } from "@vercel/analytics/react"

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
    <div className="bg-[#153448] min-h-[100vh]">
      <div className="flex justify-center p-5 mb-5  ">
        <Checkbox.Group onChange={checkOnChange} >
          <div className="flex gap-3 justify-center flex-wrap">
          {checkboxOptions.map((x) => {
            return (
              <>
                <Checkbox value={x.value} ><span className="text-[#DFD0B8] text-xl font-semibold">{x.label}</span></Checkbox>
              </>
            );
          })}
          </div>
          
        </Checkbox.Group>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <div className="w-full gap-2 flex flex-wrap justify-center">
          {isChecked && (
            <Divider className="flex-1" orientation="left">
              <p className="font-bold text-xl italic text-[#DBB5B5] ">Exact</p>
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
                    <p className="text-center font-bold text-xl text-[#F3D0D7]">{x.name}</p>
                  }
                  size="small"
                  bordered={false}
                  className="w-40 bg-[#3C5B6F]"
                >
                  <Image
                    src={x.img}
                    preview={{
                      src: x.b_img,
                      destroyOnClose: true,
                    }}
                    className="rounded"
                  ></Image>
                  <div className="grid grid-cols-2">
                    <img alt="example" src={img1} className="rounded" />
                    <img alt="example" src={img2} className="rounded" />
                  </div>
                </Card>
              );
            })}
        </div>
        {isChecked && (
          <Divider className="flex-1" style={{
            color:"Red"
          }} orientation="left">
            <p className="font-bold text-xl italic text-[#DBB5B5]">At least One Weapon</p>
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
              title={<p className="text-center font-bold text-xl text-[#F3D0D7]">{x.name}</p>}
              size="small"
              className="w-40 bg-[#3C5B6F] "
              bordered={false}
            >
              <Image
                src={x.img}
                preview={{
                  src: x.b_img,
                  destroyOnClose: true,
                }}
                className="rounded"
              ></Image>
              <div className="grid grid-cols-2">
                <img alt="example" src={img1} className="rounded" />
                <img alt="example" src={img2} className="rounded" />
              </div>
            </Card>
          );
        })}
      </div>
      <Analytics />
    </div>
  );
}

export default App;
