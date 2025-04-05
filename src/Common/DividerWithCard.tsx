import { Divider } from "antd";
import CustomCard from "../CustomCard";
import { Legends } from "../Type.da";

interface PropsType {
  data: Legends[] | undefined;
  dividerTitle: string;
}

export default function DividerWithCard({
  data,
  dividerTitle,
}: PropsType): JSX.Element {
  if (!data || data.length === 0) {
    return <></>;
  }

  return (
    <div className="">
      <Divider orientation="left" >
        <p className="font-bold text-xl italic text-yellow-500 ">
          {dividerTitle}
        </p>
      </Divider>
      <div className="flex flex-wrap gap-2 justify-center">
        <CustomCard data={data}></CustomCard>
      </div>
    </div>
  );
}
