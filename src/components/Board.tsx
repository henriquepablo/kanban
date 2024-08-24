import React, { useState } from "react";
import Column from "./Column";
import style from '../styles/containerColumns.module.css';

export default function Board() {

  const [columns, setColumns] = useState({
        
    backlog: {title: 'Backlog', cards: []},
    
    sprint: {title: 'Sprint', cards: []},
    
    inProgress: {title: 'Progress', cards: []},
    
    done: {title: 'Done', cards: []},
  });

    return (
      <div className="board">
        
        <div className={style.containerColumns}>
        
            {Object.keys(columns).map((key) => (
                //@ts-ignore
                <Column key={key} title={columns[key].title} cards={columns[key].cards}/>
            ))}
        
        </div>

      </div>
    );
  }
  