import React from 'react'
import { connect } from 'react-redux'
import TokenItem from './TokenItem'
import {showTokenForm} from '../../Action/showModal'

export const index = ({Token,dispatch,...props} : any) => {
  return (
    <div className="px-2">
      {Token.Pending&&<div></div>}
      <p>Liste des token:</p>
      <div className="flex my-2">
        {(!Token.Pending&&Token.AllToken.length===0)&&
        <div>
          <p>Aucun Token disponible</p>
          <p>Veuillez en créer un</p>
          <TokenItem load={true} />
        </div>}
        {Token.AllToken.map((value:any)=><TokenItem key={value.token} value={value} />)}
      </div>
      <input className="bg-grey text-white rounded-md px-1" type="button" value="Add Token" onClick={()=>dispatch(showTokenForm())} />
    </div>
  )
}

export default connect(state=>state)(index)
