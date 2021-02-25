import React from 'react'
import { connect } from 'react-redux'
import TokenItem from './TokenItem'
import TokenForm from './TokenForm'

export const index = ({Token,dispatch,...props} : any) => {
  return (
    <div className="px-2">
      {Token.Pending&&<div></div>}
      <p>Liste des token:</p>
      <div>
        {(!Token.Pending&&Token.AllToken.length===0)&&
        <div>
          <p>Aucun Token disponible</p>
          <p>Veuillez en créer un</p>
        </div>}
      </div>
      {Token.AllToken.map((value:any)=><TokenItem key={value.token} value={value} />)}
      <TokenForm />
    </div>
  )
}

export default connect(state=>state)(index)
