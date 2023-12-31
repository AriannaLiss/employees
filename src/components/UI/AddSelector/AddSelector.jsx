import { Autocomplete, createFilterOptions, TextField } from '@mui/material';
import React from 'react';
import { getErrorMsg, hasError } from '../../../utils/validation';

const filter = createFilterOptions();

const AddSelector = ({id,label,value,setter,options,errors}) => {

    function handleChange(newValue){
        if (newValue && newValue.inputValue){
            setter(newValue.inputValue)
        } else if (typeof newValue === 'string'){
            setter(newValue)
        }
    }

    function filterOptions(options, params){
        const filtered = filter(options, params);
        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option);
        if (inputValue !== '' && !isExisting) {
          filtered.push({inputValue, label:`Add "${inputValue}"`});
        }

        return filtered;
      }

    return (
        <Autocomplete
            id={id}
            data-test={id}
            freeSolo
            value={value}
            onChange={(event, newValue) => handleChange(newValue)}
            options={options}
            filterOptions={(options, params) => filterOptions(options, params)}
            clearOnBlur
            renderInput={(params) => 
                <TextField 
                    {...params} 
                    label={label} 
                    error={hasError(errors,id)}
                    helperText={getErrorMsg(errors,id)}
                />}
        />
    );
};

export default AddSelector;