
module.exports = { 
    //return new array not contain element
    removeUserFromArray : function (array,elementRemove){
        return array.filter(item => {
            return item.id !== elementRemove
        })
    },
    convertObjectToArray : function(array, name){
        let result = [];
        for(const item of array) {
            const data =  String(item[`${name}`]); 
            result.push(data); 
        }
        return result;
    },
    convertArraytoObject : (arr) => {
        return arr.reduce((a, b) => Object.assign(a, b), {})._doc;
    } 
} 