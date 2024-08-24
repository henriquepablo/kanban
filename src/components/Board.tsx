import React, { useEffect, useState } from "react";
import Column from "./Column";
import style from '../styles/containerColumns.module.css';
import styleForm from '../styles/form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { tasks } from "@/redux/reducers/task";


export default function Board() {

  const [tarefa, setTarefa] = useState('');

  // aciona as actions
  const dispacth = useDispatch();

  // recupera todas as tarefas do estado global
  const list: any[] = useSelector((state:any) => state.tasks); 

  const [columns, setColumns] = useState({
        
    backlog: {title: 'Backlog', cards: list},
    
    sprint: {title: 'Sprint', cards: []},
    
    inProgress: {title: 'Progress', cards: []},
    
    done: {title: 'Done', cards: []},
  });

  // atualiza a página quando uma tarefa é adicionada
  useEffect(() => {
    setColumns(prevColumns => ({
        ...prevColumns,
        backlog: { ...prevColumns.backlog, cards: list }
    }));
  }, [list]);
  
  // adiciona a tarefa no estado global
  function addTask() {
    if (tarefa == '') return alert('Informe o nome da tarefa');
    dispacth(tasks(tarefa));
    setTarefa('');
  }

    return (
      <div className="board">
        
        <div className={styleForm.form}>
        
          <input placeholder="Adicionar nova tarefa" className={styleForm.input} onChange={(text) => setTarefa(text.target.value)} value={tarefa}/>
        
          <button className={styleForm.btnAdd} onClick={addTask} type="button">
            adicionar +
          </button>
        
        </div>

        <div className={style.containerColumns}>
        
            {Object.keys(columns).map((key) => (
                //@ts-ignore
                <Column key={key} title={columns[key].title} cards={columns[key].cards}/>
            ))}
        
        </div>

      </div>
    );
  }
  