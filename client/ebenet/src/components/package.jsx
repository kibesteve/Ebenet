import React from 'react'

const Packages = (props)=> {
    const {amount,name,duration} = props
    //console.log(props)
    return (
        <div>
            <p>{name +"\t||\t"+ amount +"\t||\t"+ duration}</p>
        </div>
    )
}
export default Packages