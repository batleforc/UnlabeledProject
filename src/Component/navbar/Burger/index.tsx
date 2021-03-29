import React from 'react';
import { connect } from 'react-redux'
import { slide as Menu} from 'react-burger-menu'
import {setBurger} from '../../../Action/showModal'

export const index = ({ShowModal,dispatch, ...props} : any) =>{
  return(
    <Menu
      isOpen={ShowModal.Burger}
      onClose={()=>dispatch(setBurger(false))}
      customBurgerIcon={false}
      customCrossIcon={false}
      right
      >
        <h1> test </h1>
    </Menu>
  )
}

export default connect(state=>state)(index)