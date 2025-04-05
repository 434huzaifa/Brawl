import { Checkbox, Form } from "antd";
import { selectedStanceStore } from "../Store";
import { useAtom } from "jotai";
import { useMemo } from "react";

function StanceFilter(): JSX.Element {
  const [form] = Form.useForm();
  const [stance,setStance]=useAtom(selectedStanceStore)

  const stanceList = [
    {
      label: "Strength",
      value: "strength",
    },
    {
      label: "Dexterity",
      value: "dexterity",
    },
    {
      label: "Defense",
      value: "defense",
    },
    {
      label: "Speed",
      value: "speed",
    },
  ];
  const oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  function onChange() {
    setStance({
      strength: form.getFieldValue("strength")|| [],
      dexterity: form.getFieldValue("dexterity") || [],
      defense: form.getFieldValue("defense") || [],
      speed: form.getFieldValue("speed") || [],
    })
  }
  useMemo(()=>{
    if (!stance.defense.length && !stance.dexterity.length && !stance.speed.length && !stance.strength.length) {
        form.resetFields();
    }
  },[stance])
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        className="grid grid-cols-2 justify-items-center pt-1"
        onChange={onChange}
      >
        {stanceList.map((x) => {
          return (
            <Form.Item label={<><span className="text-white font-semibold text-md">{x.label}</span></>} name={x.value} >
              {/* <Checkbox.Group options={oneToTen} defaultValue={[]} /> */}
              <Checkbox.Group>
                {
                    oneToTen.map((x)=>(
                        <Checkbox value={x} className="text-white">{x}</Checkbox>
                    ))
                }
              </Checkbox.Group>
            </Form.Item>
          );
        })}
      </Form>
    </>
  );
}

export default StanceFilter;
