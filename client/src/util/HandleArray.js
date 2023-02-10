export const removeItem = (arr, itemDelete ) => {
    let newArray = new Array();
    arr.map(item => newArray.push(item));
    if(Array.isArray(itemDelete)){
        for(let i=0; i <= itemDelete.length; i++){
            let index = newArray.indexOf(itemDelete[i]); 
            if(index > -1)
                newArray.splice(index,1); 
        }
        return newArray;
    }else{
        let index = newArray.indexOf(itemDelete); 
        if(index > -1)
            newArray.splice(index,1);
    }
    return newArray;
}

export const elementNotInAnotherArray = (originArr,checkArr) => { 
    // return new array contain element of originArr is not exist in checkArr
    return checkArr.filter(item => { 
        return !originArr.includes(item);
    });
}

export const convertObjectToArray = (array, name) => {
    let result = [];
    for(const item of array) {
        const data =  String(item[`${name}`]); 
        result.push(data); 
    }
    return result;
}