import React, { useState,useEffect } from 'react'

function MemoryGame() {
    const[gridSize , setGridSize]=useState(4);
    const[card , setCards]=useState([]);
    const[flipped , setFlipped]=useState([]);
    const[solved , setSolved]=useState([]);
    const[disabled , setDisabled]=useState(false);
    const[won , setWon]=useState(false);
    const handleGridSizeChange=(e)=>{
        const size=parseInt(e.target.value)
        if(size>=2 && size<=6) setGridSize(size);

    };
    const initializeGame=()=>{
        const totalCards=gridSize*gridSize;
        const pairCount=Math.floor(totalCards/2);
        const numbers = [];
        for (let i = 1; i <= pairCount; i++) {
              numbers.push(i);
        }

        const shuffleCards=[...numbers, ...numbers]
        .sort(()=>Math.random()-0.5)
        .slice(0,totalCards)
        .map((number,index)=>({id:index,number}));
    setCards(shuffleCards);
    setFlipped([]);
    setSolved([]);
    setWon(false);    
    };
    useEffect(()=>{
        initializeGame();
    },[gridSize]);
    const handleClick = (id) => {
      if (disabled || won || flipped.includes(id) || solved.includes(id)) return;
    
      const newFlipped = [...flipped, id];
      setFlipped(newFlipped);
    
      if (newFlipped.length === 2) {
        setDisabled(true);
    
        setTimeout(() => {
          const [first, second] = newFlipped;
    
          if(card[first].number === card[second].number) {
            setSolved([...solved, first, second]);
          }
    
          setFlipped([]);
          setDisabled(false);
    
          if(solved.length + 2 === card.length) {
            setWon(true);
          }
        }, 700);
      }
    
    };
    
    
  
    
    const isFlipped = (id) => {
      return flipped.includes(id) || solved.includes(id);
    };
    
  return (
    <div className="display">
      <h1 className="heading">Memory Game</h1> 
      <div className="label">
        <label className="select">Grid Size:(max 6)</label>
        <input className="selectBox" type="number" 
        id="gridSize" 
        min="2" 
        max="10" 
        value={gridSize} 
        onChange={handleGridSizeChange}
        />
      </div>
      <div
  className="gameBoard"
  style={{
    display: "grid",
    gridTemplateColumns: `repeat(${gridSize}, 80px)`,
    gap: "10px"
    
    
  }}
>
      {card.map((card) => (
  <div key={card.id} 
  onClick={()=>handleClick(card.id)}
  className="card"
  style={{
    backgroundColor: isFlipped(card.id) ? 'blue' : '#ddd',
    color: isFlipped(card.id) ? 'white' : 'transparent',
  }}
  >
{isFlipped(card.id) ? card.number : "?"}

  </div>
))}  
    </div>
    </div> 
  )
}

export default MemoryGame
