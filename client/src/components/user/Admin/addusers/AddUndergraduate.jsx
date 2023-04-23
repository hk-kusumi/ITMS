import React from "react";
import { UndergraduateCreateForm } from '../../../shared/CreateUser/forms/UndergraduateCreateForm';
import { Typography } from "@mui/material";

export const AddUndergraduate = () => {
    return (
        <>
            <Typography variant='subtitle1'> Add Undergraduate Details</Typography>
            <UndergraduateCreateForm>

            </UndergraduateCreateForm>
        </>
    )
}