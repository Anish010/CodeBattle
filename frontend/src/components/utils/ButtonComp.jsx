import React from 'react'
import Button from '@mui/material/Button';


const ButtonComp = ({ text, variant, style, ...rest }) => {

    return (
        <Button style={style} variant={variant} {...rest} >
           {text}
        </Button>
    )
}

export default ButtonComp