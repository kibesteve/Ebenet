import React from 'react'
import {Button } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import {Alarm} from '@material-ui/icons/' 

const useStyles = makeStyles({
    buttonStyle: props => {
        
        return{
            color:"primary",
            component: "span",
            backgroundColor: "orange",
            disabled: props.checked ? "false": "true"
        }
    }
})


function Submit_button(props) {
    const classes = useStyles(props)
    return (
        <div>
            <Button
                variant="contained"
                //className={classes.button}
                endIcon={<Alarm>send</Alarm>}
            >
                Start
            </Button>

        </div>
    )
}

export default Submit_button
