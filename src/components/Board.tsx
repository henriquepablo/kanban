//@ts-nocheck
import React, { useEffect, useState } from "react";
import Column from "./Column";
import style from '../styles/containerColumns.module.css';
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { api } from "@/service/api";

export default function Board() {

  // armazarna todas as operações (cards)
  const [cards, setCards]:any = useState([]);
  
  // esse array que vai ser o responsável para que as colunas seja exibidas na tela
  const colunas:object[] = [];

  // essa const armazena todas as colunas do fluxo selecionado
  const [colunasList, setColunasList] = useState([]);

  const list = [{
    "value": [
      {
        "assetid": 558889,
        "codigoepisodio": "24-001",
        "dataexib": "2024-01-08",
        "title": "BAGUNÇA ORGANIZADA",
        "statusid": 12,
        "codigo": "PSLP",
        "bulkloadid": 10,
        "epcode": "000024-001",
        "tempo_total": "00:23:00:09"
      },
      {
        "assetid": 561513,
        "codigoepisodio": "23-0001",
        "dataexib": "2023-12-11",
        "title": "Teste Código",
        "statusid": 21,
        "codigo": "PPTI",
        "bulkloadid": 9,
        "epcode": "00023-0001",
        "tempo_total": "00:00:00:00"
      },
      {
        "assetid": 561513,
        "codigoepisodio": "23-0001",
        "dataexib": "2023-12-11",
        "title": "Teste Código",
        "statusid": 21,
        "codigo": "PPTI",
        "bulkloadid": 9,
        "epcode": "00023-0001",
        "tempo_total": "00:00:00:00"
      },
      {
        "assetid": 561513,
        "codigoepisodio": "23-0001",
        "dataexib": "2023-12-11",
        "title": "Teste Código",
        "statusid": 21,
        "codigo": "PPTI",
        "bulkloadid": 9,
        "epcode": "00023-0001",
        "tempo_total": "00:00:00:00"
      }
    ]
    }]

  // useEffect(() => {
  //   async function load() {
  //       await api.get("fluxo/2")
  //       .then((json) => {
  //         setCards(json.data.operacoes);
  //         setColunasList(json.data.colunas);
  //       })
  //       .catch(err => console.log(err));
  //   } 
  //   load();
    
  //   return(() => {});
  // }, [colunas]);

  // for(let i = 0; i < colunasList.length; i++) {
  //   const listCards:object [] = [];
  //   for (let y = 0; y < cards.length; y++) {
  //       if (cards[y].colunaId == i+1) {
  //         listCards.push(cards[y]);
  //       }
  //   }
  //   colunas.push({id: i+1, nomeColuna: colunasList[i], cards: listCards})
  // }

  for(let i = 0; i < list[0].value.length; i++) {
    const listCards:object [] = [];
    for (let y = 0; y < list[0].value.length; y++) {
        if (list[0].value[y].statusid == list[0].value[i].statusid) {
          listCards.push(list[0].value[y]);
        }
    }
    colunas.push({id: i+1, nomeColuna: list[0].value[i].statusid, cards: listCards})
  }

  async function updateColumn(operacaoId:number, colunaId:string) {
    const response = await api.put("operations/updateColumn", {
      "operacaoId": operacaoId,
      "colunaId": colunaId
    })
    .then(() => {
      console.log('Movimentação concluída');
    }).catch(err => console.log(err))
  }

  const onDragEnd = (result:DropResult) => {
    const {source, destination} = result;
 
    // console.log(result);
    
    if(!destination) return;
    
    if(destination.droppableId === source.droppableId && destination.droppableId === source.droppableId) return;
    
    const sourceColId = source.droppableId
    const destColId = destination.droppableId;
    
    const sourceColumn = colunas[sourceColId - 1];
    const destColumn = colunas[destColId - 1];

    // Pega o item que está sendo movido
    const item = sourceColumn.cards[source.index];

    updateColumn(item.id, result.destination?.droppableId);
    
  }
  
    return (
      <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">

        <div className={style.containerColumns}>
      
            {colunas.map((item, key) => (
                item.nomeColuna !== null ? <Column key={key} title={item.nomeColuna} cards={item.cards} id={item.id}/> : ''
            ))}

        </div>
            
      </div>
      </DragDropContext>
    );
  }
  