import { Input } from "antd";
import { useSetAtom } from "jotai";
import { ReactNode } from "react";
import { searchNameStore } from "../Store";


function SearchBox():ReactNode {
    const searchString= useSetAtom(searchNameStore)
    function onSearch(value:string){ 
        searchString(value)
    }
    return (<>
    <Input.Search onSearch={onSearch} placeholder="input name" enterButton allowClear size="large" />
    </>)
}

export default SearchBox