import React from 'react'
import { connect } from 'react-redux'
import {Route} from 'react-router-dom'
import TopNavBar from './TopNavBar'
import VoiceNav from './VoiceNav'
export const index = ({Bot,...props}: any) => {
  return (
    <div>
      <TopNavBar />
      <Route path="/voice" component={VoiceNav} />
    </div>
  )
}

export default connect(state=>state)(index)
