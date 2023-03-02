import { TextField, Stack, Button, Typography, Input, Paper, InputBase } from "@mui/material"
import React from "react"
import { useState } from "react"
import { Tile } from '../../../card/Tile'

const User = {
    adName: '',
    email: '',
    contactNo: '',
    staffId: '',
    password: '',
    adminRole: ''
}

export const Admin = () => {

    const [values, setValues] = useState(User);
    const [error, setError] = useState();

    //update validation

    // const validateData = () => {
    //     let error = {}
    //     if(!name){error.name="Name is required"}
    // }

    // const handleSave = () => {
    //     const error = validateData();
    //     if(Object.keys(error).length){
    //         setError(error);
    //         return;
    //     }
    //     setError({});
    //     // console.log(values)
    //     onSave(values)

    // }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(values)
    }


    return (
        <Tile width={'400px'}>
            <form onSubmit={onSubmit}>
                <Stack direction={'column'} spacing={1} justifyContent={'center'}>
                    <Stack direction={'row'} spacing={3} justifyContent={'space-between'}>
                        <Stack direction={'column'} spacing={4}>
                            {['Admin Role', 'Name', 'Email', 'Contact Number', 'Staff ID', 'Password'].map((text) => (
                                <Typography key={text}>{text}</Typography>
                            ))}

                        </Stack>
                        <Stack direction={'column'} spacing={2}>
                            {['adminRole', 'name', 'email', 'contactNo', 'staffId', 'password'].map((text) => (
                                <TextField
                                    variant="outlined"
                                    label={text}
                                    size='small'
                                    onChange={(e)=>setValues({...values,[text]:e.target.value})}
                                    key={text}

                                />
                            ))}

                        </Stack>
                    </Stack>
                    <Stack>
                        <Button variant="contained" type="submit"> Add User</Button>
                    </Stack>
                </Stack>
            </form>
        </Tile>

    )
} 