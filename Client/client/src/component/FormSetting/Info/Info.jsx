import React, { useContext, useEffect, useState } from 'react'
import { Grid,Box, Typography, Container, Button, TextField } from '@material-ui/core'
import Edit from '@material-ui/icons/Edit' 
import SaveIcon from '@material-ui/icons/Save';
import { updateInformation } from 'api';
import { Data } from "App"; 
function Info({item, list, isSingle}) {
    const [isSave, setIsSave] = useState(false);
    const [text, setText] = useState();
    const _id =  useContext(Data)._id;  
    useEffect(()=>{
        setText(item);
    },[item]);
    const hanldeSave = () => { 
        setIsSave(prev => !prev);
        if(isSave){ 
            if(text !== item){
                updateInformation({_id , type: list.name, content: text});
            }
        }
    }
    return ( 
        <Grid container spacing={2} style={{marginBottom: '4%'}}>
            <Grid item xs={8} style={{display: 'flex', gap: '10px'}}>   
                {list.icon}  
                { isSave 
                    ? <TextField value={text} placeholder={list.placeholder} onChange={(e)=>setText(e.target.value)} autoFocus ></TextField>
                    : <Typography variant='body1' onClick={() => setIsSave(true)}>{text || list.placeholder}</Typography>
                }  
                {
                    isSingle === undefined
                        ? <></>
                        : <Typography variant='body1'> {isSingle ? "Single" : "Date" }</Typography>
                }
            </Grid>
            <Grid item xs={4}>
                {
                    isSingle === undefined 
                    ? <Button onClick={hanldeSave}>{isSave ? <SaveIcon/>: <Edit/>}</Button>
                    : <></>
                }
                
            </Grid>
        </Grid> 
    )
}

export default Info