import { FormControlLabel, FormControlLabelProps, Radio } from '@mui/material'
import React,{ReactElement} from 'react'

interface ButtonProps{
  label:string,
  value:string,
  checked?:boolean,
  onChange?:()=>void,
  control:ReactElement<any, any>
}

export default function RadioButton({label,value,control,checked,onChange}:ButtonProps) {
   
  return (
    <FormControlLabel
    value={value}
    checked={checked}
    control={control}
    onChange={onChange}
    label={label}
  />
  )
}
