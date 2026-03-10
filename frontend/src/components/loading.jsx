import React from 'react'

const Loading = ({loading}) => {
  if(loading==true){
    return(
        <div>
            <img src={"/loader/loader.gif"} alt="" />
        </div>
    )
  }
}

export default Loading