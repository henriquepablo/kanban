import React, { useEffect, useState } from "react";
import Column from "./Column";
import style from '../styles/containerColumns.module.css';
import styleForm from '../styles/form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { tasks, removeTask } from "@/redux/reducers/task";
import { DragDropContext, DropResult } from "react-beautiful-dnd";


export default function Board() {

  const [tarefa, setTarefa] = useState('');

  // aciona as actions
  const dispacth = useDispatch();

  // recupera todas as tarefas do estado global
  // const list: any[] = useSelector((state:any) => state.tasks);
   const [list, setList]:any = useState([]);

  const [columns, setColumns] = useState({
        
    Backlog: {title: 'Backlog', cards: list},
    
    Sprint: {title: 'Sprint', cards: []},
    
    Progress: {title: 'Progress', cards: []},
    
    Done: {title: 'Done', cards: []},
  });

  // atualiza a página quando uma tarefa é adicionada
  useEffect(() => {
    setColumns(prevColumns => ({
        ...prevColumns,
        Backlog: { ...prevColumns.Backlog, cards: list },
    }));
  }, [list]);
  
  // adiciona a tarefa no estado global
  function addTask() {
    if (tarefa == '') return alert('Informe o nome da tarefa');
    setList((prev:any) => [...prev, tarefa]);
    // dispacth(tasks(tarefa));
    setTarefa('');
  }

  const onDragEnd = (result:DropResult) => {
    const {source, destination} = result;
 
    // console.log(result);

    if(!destination) return;
    
    if(destination.droppableId === source.droppableId && destination.droppableId === source.droppableId) return;
    
    const sourceColId = source.droppableId;
    const destColId = destination.droppableId;
    
    const sourceColumn = columns[sourceColId];
    const destColumn = columns[destColId];

    // Pega o item que está sendo movido
    const item = sourceColumn.cards[source.index];

    // Atualiza as colunas com o item movido
    const updatedSourceCol = [...sourceColumn.cards];
    const updatedDestCol = [...destColumn.cards];

    // Remove o item da coluna de origem
    updatedSourceCol.splice(source.index, 1);

    // Adiciona o item na coluna de destino
    updatedDestCol.splice(destination.index, 0, item);

    // Atualiza o estado local das colunas
    setColumns(prev => ({
      ...prev,
      [sourceColId]: { ...sourceColumn, cards: updatedSourceCol },
      [destColId]: { ...destColumn, cards: updatedDestCol },
    }));

    dispacth(removeTask(item));
  }

    return (
      <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        
        <div className={styleForm.form}>
        
          <input placeholder="Adicionar nova tarefa" className={styleForm.input} onChange={(text) => setTarefa(text.target.value)} value={tarefa}/>
        
          <button className={styleForm.btnAdd} onClick={addTask} type="button">
            adicionar +
          </button>
        
        </div>

        <div className={style.containerColumns}>
        
            {Object.keys(columns).map((key, id) => (
                //@ts-ignore
                <Column key={key} title={columns[key].title} cards={columns[key].cards} id={id}/>
            ))}
        
        </div>
            
      </div>
      </DragDropContext>
    );
  }
  