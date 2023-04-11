import { ListBasicInfo } from "constants"
import { ListInfo, ListNameInfo, basicInfo } from "constants"
import Info from "./Info/Info"


function FormSetting({...props}) {
    const {basic, isSingle, ...other} = props 
    
    console.log("Render...")
    const list = basic ? ListNameInfo : ListBasicInfo;
    return ( 
        <>
            { list.map((item, index) => (
                    <Info 
                        item={other[item]} 
                        list={basic ? ListInfo[index] : basicInfo[index]} 
                        key={index} 
                    />
                ))
            }
            <Info 
                isSingle={isSingle}
                list={basic ? ListInfo[3] : basicInfo[3]} 
            />
        </>
    )
}

export default FormSetting