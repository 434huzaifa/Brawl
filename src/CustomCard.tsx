import { Card, Table, Image } from "antd";
import { Legends, Stats, Weapon } from "./Type.da";
import { ColumnsType } from "antd/es/table";
import { useAtomValue } from "jotai";
import { selectedStanceStore, weaponListStore } from "./Store";

function CustomCard({ data }: { data: Legends[] | undefined }): JSX.Element {
  const weaponList = useAtomValue(weaponListStore);
  const selectedStance = useAtomValue(selectedStanceStore);
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
  function onRow(v: Stats) {
    if (
      exactStanceCheck(
        selectedStance.strength,
        selectedStance.dexterity,
        selectedStance.defense,
        selectedStance.speed,
        v
      )
    ) {
      return {
        className: "bg-green-500",
      };
    } else {
      return {
        className: "",
      };
    }
  }
  const column: ColumnsType = [
    {
      title: "Stance",
      render: (value, record, index) => {
        if (index == 0) {
          return (
            <img
              src="https://brawlhalla.wiki.gg/images/thumb/1/1b/StatIcon_Base_NoBorder.png/20px-StatIcon_Base_NoBorder.png?fd9654"
              alt="Base Stance"
              title="Base Stance"
            ></img>
          );
          return "Base";
        } else if (index == 1) {
          return (
            <img
              src="https://brawlhalla.wiki.gg/images/thumb/f/f6/StatIcon_Str_NoBorder.png/20px-StatIcon_Str_NoBorder.png?ed3f1c"
              alt="Strength"
              title="Strength"
            ></img>
          );
        } else if (index == 2) {
          return (
            <img
              src="https://brawlhalla.wiki.gg/images/thumb/2/2e/StatIcon_Dex_NoBorder.png/20px-StatIcon_Dex_NoBorder.png?8d0a82"
              alt="Dexterity"
              title="Dexterity"
            ></img>
          );
        } else if (index == 3) {
          return (
            <img
              src="https://brawlhalla.wiki.gg/images/thumb/f/f9/StatIcon_Def_NoBorder.png/20px-StatIcon_Def_NoBorder.png?a33483"
              alt="Defense"
              title="Defense"
            ></img>
          );
        } else if (index == 4) {
          return (
            <img
              src="https://brawlhalla.wiki.gg/images/thumb/d/db/StatIcon_Spd_NoBorder.png/20px-StatIcon_Spd_NoBorder.png?4fa711"
              alt="Speed"
              title="Speed"
            ></img>
          );
        }
        return "HEHE";
      },
    },
    {
      title: (
        <img
          src="https://brawlhalla.wiki.gg/images/thumb/a/a7/StatIcon_Str.png/25px-StatIcon_Str.png?3572c9"
          alt="Strength"
          title="Strength"
        ></img>
      ),
      dataIndex: "strength",
      key: "strength",
    },
    {
      title: (
        <img
          src="https://brawlhalla.wiki.gg/images/thumb/e/e1/StatIcon_Dex.png/25px-StatIcon_Dex.png?fd8693"
          alt="Dexterity"
          title="Dexterity"
        ></img>
      ),
      dataIndex: "dexterity",
      key: "dexterity",
    },
    {
      title: (
        <img
          src="https://brawlhalla.wiki.gg/images/thumb/6/6a/StatIcon_Def.png/25px-StatIcon_Def.png?bd962c"
          alt="Defense"
          title="Defense"
        ></img>
      ),
      dataIndex: "defense",
      key: "defense",
    },
    {
      title: (
        <img
          src="https://brawlhalla.wiki.gg/images/thumb/e/e1/StatIcon_Spd.png/25px-StatIcon_Spd.png?cc960f"
          alt="Speed"
          title="Speed"
        ></img>
      ),
      dataIndex: "speed",
      key: "speed",
    },
  ];
  if (data == undefined || data.length == 0) {
    return <></>;
  }
  return (
    <>
      {data.map((x) => {
        let img1: Weapon[] | string = weaponList.filter((y) => y.name == x.w1);
        if (img1) {
          img1 = img1[0]?.img;
        } else {
          img1 = "";
        }
        let img2: Weapon[] | string = weaponList.filter((y) => y.name == x.w2);
        if (img2) {
          img2 = img2[0]?.img;
        } else {
          img2 = "";
        }
        const dataSource = [
          x.stats.base,
          x.stats.strength,
          x.stats.dexterity,
          x.stats.defense,
          x.stats.speed,
        ];
        return (
          <Card
            // bordered={false}
            hoverable
            style={{ paddingLeft: 0 }}
            className="bg-[#3C5B6F]"
          >
            <div>
            <p className="text-center font-bold text-xl text-orange-300">
                {x.name}
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col justify-center gap-2 relative">
                <Image
                  src={x.img}
                  preview={{
                    src: x.b_img,
                    destroyOnClose: true,
                  }}
                  className="rounded"
                  height={70}
                  width={70}
                ></Image>
                  <Image
                    src={img1}
                    className="rounded"
                    height={70}
                    width={70}
                  ></Image>
                  <Image
                    src={img2}
                    className="rounded"
                    height={70}
                    width={70}
                  ></Image>
              </div>
              <div>
                <Table
                  size="small"
                  onRow={onRow}
                  columns={column}
                  dataSource={dataSource}
                  bordered
                  pagination={false}
                  rowHoverable
                ></Table>
              </div>
            </div>
          </Card>
        );
      })}
    </>
  );
}

export default CustomCard;
