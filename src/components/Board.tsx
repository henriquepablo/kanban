import React, { useState } from "react";
import Column from "./Column";
import style from '../styles/containerColumns.module.css';
import styleForm from '../styles/form.module.css';

export default function Board() {

  const [columns, setColumns] = useState({
        
    backlog: {title: 'Backlog', cards: []},
    
    sprint: {title: 'Sprint', cards: []},
    
    inProgress: {title: 'Progress', cards: []},
    
    done: {title: 'Done', cards: []},
  });

    return (
      <div className="board">
        
        <form className={styleForm.form}>
        
          <input placeholder="Adicionar nova tarefa" className={styleForm.input}/>
        
          <button className={styleForm.btnAdd}>
            adicionar +
          </button>
        
        </form>

        <div className={style.containerColumns}>
        
            {Object.keys(columns).map((key) => (
                //@ts-ignore
                <Column key={key} title={columns[key].title} cards={columns[key].cards}/>
            ))}
        
        </div>

      </div>
    );
  }
  