import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function Searchbar({ LabelName }) {
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={Array}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={LabelName} />}
        />
    );
}

const Array = [
    { label: 'Nuwan' },
    { label: 'Gavesh' },
    { label: 'Sanjana' },
    { label: 'Sadeepal' },
    { label: 'Upeksha' },
];