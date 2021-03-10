import React from 'react';
import { connect } from 'react-redux'

export const index = ({Voice,Bot} : any) => {

  return(
    <div>
      <h1>je suis voice</h1>
    </div>
  )
}


export default connect(state=>state)(index)