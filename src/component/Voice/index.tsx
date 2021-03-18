import React,{useState} from 'react';
import { connect } from 'react-redux';
import {startVoice} from '../../Action/Voice'
import GridLayout, { Layout } from 'react-grid-layout'

export const Index = ({Voice,Bot,dispatch} : any) => {
  var enumMedia ={1:"mp3",2:"Youtube",3:"spotify"}
  var [sound,setSound] = useState("")
  var [button,setButton] = useState("")
  var [layout, setLayout] = useState([
    {i: "1", x: 0, y: 0, w: 1, h: 2,text:"a",url:"",type:1},
    {i: "2", x: 1, y: 0, w: 3, h: 2,text:"jojo",url:"",type:1},
    {i: "3", x: 4, y: 0, w: 1, h: 2,text:"b",url:"",type:1},
    {i: "4", x: 4, y: 0, w: 1, h: 2,text:1,url:"",type:1}
  ])
  var addButton = ()=>{
    setLayout(layout.concat([ {i:String(layout.length+1), x: 0, y: 0, w: 1, h: 2,text:button,url:"",type:1}]))
  }
  var setHandlerLayout = (layoutSwap : Layout[]) => {
    console.log(layoutSwap)
    var layoutCopy = [...layout]
    layoutSwap.forEach((value,index)=>{
      layoutCopy[index]={...layoutCopy[index],...value}
    })
    setLayout(layoutCopy)
  }
  var lock = () =>{
    setLayout(layout.map(value=>({...value,static:true})))
  }
  var unLock = () =>{
    setLayout(layout.map(value=>({...value,static:false})))
  }
  return(
    <div>
      <div className="bg-gray-500">
        <input type="string" value={sound} onChange={(event)=>setSound(event.currentTarget.value)} />
        <button onClick={()=>dispatch(startVoice(sound))} >Play</button>
        <input type="string" value={button} onChange={(event)=>setButton(event.currentTarget.value)} />
        <button onClick={()=>addButton()} > addButton </button>
        <button className="mx-2" onClick={lock} > Lock </button>
        <button onClick={unLock} > UnLock </button>
      </div>
      <GridLayout onLayoutChange={setHandlerLayout} className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        {layout.map(value=><div key={value.i} className="bg-red-500 border-black border-2">{value.text}</div>)}
      </GridLayout>
    </div>
  )
}


export default connect(state=>state)(Index)