import './Style.css';
import React, { useState, useRef, useEffect } from "react";
import heart from './gameheart.png'
import triangle from './triangle1.png'
import targettriangle from './triangle2.svg.png'
import correcttriangle from './green-triangle-3.png'







const Main = () => {


const startingLocation = (Math.floor(Math.random()*80))
const targetLocation = (Math.floor(Math.random()*80)) 

const [shapeState, setShapeState] = useState([startingLocation, startingLocation+10, startingLocation+20, startingLocation+21])
const [targetShapeState, setTargetShapeState] = useState([targetLocation, targetLocation+10, targetLocation+20,targetLocation+21])
const [correctShapeState, setCorrectShapeState] = useState()
const [userXAnswer, setUserXAnswer] = useState()
const [userYAnswer, setUserYAnswer] = useState()
const [userMirrorAxis, setUserMirrorAxis] = useState()
const [userMirrorValue, setUserMirrorValue] = useState()




const gridSquares = () => {
    let gridArray = []
    for(let i = 0; i < 100; i++){
        if (shapeState.includes(i)){
            gridArray.push(<div key={i} id ="shape" className="grid-item" 
            style={{
                backgroundColor: correctShapeState ?  "green" : "#366ed8"
            }}></div>)
        }
        else if (targetShapeState.includes(i)){
            gridArray.push(<div key={i} id ="shape" className="grid-item" 
            style={{
                backgroundColor: "#041562"
            }}></div>)
        }
        else if (i % 5 === 0 && i % 10 !==0 && i !==55){
            gridArray.push(<div key={i} id ="grid-{i}" className="grid-item y-axis">{(i+5)/(-10)+6}</div>)
        }
        else if (i >49 && i <60 && i !==55){
            gridArray.push(<div key={i} id ="grid-{i}" className="grid-item x-axis">{i-55}</div>)
        }     
        else if (i===55){
            gridArray.push(<div key={i} id ="grid-{i}" className="grid-item x-axis y-axis">{i-55}</div>)
        } else {
            gridArray.push(<div key={i} id ="grid-{i}" className="grid-item">{i}</div>)
        }
        
           
    }
    return gridArray
}

const translate = () => {

    setShapeState(shapeState.map((x) => x + userXAnswer + (userYAnswer*(-10))))

}


const reflectx = () => {
    let mirror = 50-userMirrorValue*10
    setShapeState(shapeState.map((x) => {if (mirror > x){
        if (mirror - x < 10){
            return  x+10
        } else {
            return x + 2*(mirror - Math.floor(x/10)*10) - 10
        }
    }
        else if (mirror <= x){
            if (x- mirror < 10){
                return x - 10
            } else {
            return x + 2*(mirror - Math.floor(x/10)*10) - 10
        } 
    }
    

}))
}

const reflect = () => {
    if (userMirrorAxis==="x"){
    reflectx()
    }
}


const handleXChange = event => {
    setUserXAnswer(parseInt(event.target.value))
}

const handleYChange = event => {
    setUserYAnswer(parseInt(event.target.value))
}

const handleMirrorAxisChange = event => {
    setUserMirrorAxis(event.target.value)
}

const handleMirrorValueChange = event => {
    setUserMirrorValue(parseInt(event.target.value))
}


useEffect(() => {
    console.log(shapeState)
    console.log(targetShapeState)
    console.log(correctShapeState)
    if(arraysEqual(shapeState,targetShapeState)){
    setCorrectShapeState(true)
    }
}, [shapeState])


function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }


const vectorTranslation = () => {
    return(<div className="bracket-div"><p>(</p>
        <div className = "vector-div">
            <input type="text"
             id="userXAnswer" 
             name="userXAnswer"  
             onChange={handleXChange} 
              />
             <input type="text"
             id="userYAnswer" 
             name="userYAnswer"  
             onChange={handleYChange} 
             />
        </div><p>)</p>
        </div>
    )
    
    }

const reflection = () => {
    return(
        <div className = "reflection-div">
            Mirror Line: <div><input type="text"
             id="userMirrorAxisAnswer" 
             name="userMirrorAxisAnswer"  
             onChange={handleMirrorAxisChange} 
             /> = 
            <input type="text"
             id="userMirrorValueAnswer" 
             name="userMirrorValueAnswer"  
             onChange={handleMirrorValueChange} 
             /></div>
             
        </div>
       
    )
    
    }




    return (
        <div className='main'>
        <div className="main-grid">
            {gridSquares()}
            
            </div>     
            <div className = "transformation-button-div">
            {vectorTranslation()}
            
            
            <button onClick={translate}>TRANSLATE</button> 


        </div>
        <div className = "transformation-button-div">
            {reflection()}
            
            
            <button onClick={reflect}>REFLECT</button> 


        </div>



        </div>
    )

}

export default Main