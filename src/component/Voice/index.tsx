import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import {startVoice} from '../../Action/Voice'
import GridLayout, { Layout } from 'react-grid-layout'

export const Index = ({Voice,Bot,dispatch} : any) => {
  var enumMedia ={1:"mp3",2:"Youtube",3:"spotify"}
  var [sound,setSound] = useState("")
  var [button,setButton] = useState("")
  var [url,setUrl] = useState("")
  var [layout, setLayout] = useState([
    {i: "1", x: 0, y: 0, w: 1, h: 2,text:"nout nout",url:"https://www.myinstants.com/media/sounds/noot-noot.mp3",type:1,static:true},
    {i: "2", x: 1, y: 0, w: 3, h: 2,text:"ara ara",url:"https://www.myinstants.com/media/sounds/ara-ara.MP3",type:1,static:true},
    {i: "3", x: 4, y: 0, w: 1, h: 2,text:"baby shark",url:"https://www.myinstants.com/media/sounds/baby-shark-dance-sing-and-dance-animal-songs-pinkfong-songs-for-children-audiotrimmer.mp3",type:1,static:true},
    {i: "4", x: 4, y: 0, w: 1, h: 2,text:"moan",url:"https://www.myinstants.com/media/sounds/moaning-sex.mp3",type:1,static:true}
  ])
  useEffect(()=>console.log(layout),[layout])
  var addButton = ()=>{
    setLayout(layout.concat([ {i:String(layout.length+1), x: 0, y: 0, w: 1, h: 2,text:button,url:url,type:1,static:layout[0].static}]))
    setButton("")
    setUrl("")
  }
  var setHandlerLayout = (layoutSwap : Layout[]) => {
    setLayout(layoutSwap.map((value,index)=>({...layout[index],...value})))
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
        <input className="border-2 border-gray-800 mx-2" placeholder="Label" type="string" value={button} onChange={(event)=>setButton(event.currentTarget.value)} />
        <input className="border-2 border-gray-800 mx-2" placeholder="Url" type="string" value={url} onChange={(event)=>setUrl(event.currentTarget.value)} />
        <button onClick={()=>addButton()} > addButton </button>
        <button className="mx-2" onClick={lock} > Lock </button>
        <button onClick={unLock} > UnLock </button>
      </div>
      <GridLayout onLayoutChange={setHandlerLayout} className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        {layout.map(value=><div key={value.i} className="bg-red-500 border-black border-2" onClick={()=>{if(value.static)dispatch(startVoice(value.url))}} >{value.text}</div>)}
      </GridLayout>
    </div>
  )
}


export default connect(state=>state)(Index)