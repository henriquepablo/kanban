//@ts-nocheck
import React, { useEffect, useState } from "react";
import Column from "./Column";
import style from '../styles/containerColumns.module.css';
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { api } from "@/service/api";
import { TailSpin } from "react-loader-spinner";

export default function Board() {

    // armazarna todas as operações (cards)
    const [cards, setCards]: any = useState([]);

    // esse array que vai ser o responsável para que as colunas seja exibidas na tela
    const colunas: object[] = [];

    // essa const armazena todas as colunas do fluxo selecionado
    const [colunasList, setColunasList] = useState([]);

    const [movimentedCard, setMovimentedcard] = useState(false);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const url = new URLSearchParams(window.location.search);
        console.log(url.get("userid"));
        console.log(url.get("montador"));
        console.log(url.get("operacao"));
        console.log(url.get("metaviewId"));
        console.log(url.get("layout"));
        setLoading(true);
        async function load() {
            await api.get("fluxo/1", {
                params: {
                    "userid": url.get("userid"),
                    "montador": url.get("montador"),
                    "operacao": url.get("operacao"),
                    "metaviewid": url.get("metaviewId"),
                    "layout": url.get("layout")
                }
            })
                .then((json) => {
                    // console.log(json.data.operacoes.body.value);
                    setCards(json.data.operacoes);
                    setColunasList(json.data.colunas);
                    setMovimentedcard(false);
                    setLoading(false);
                })
                .catch(err => console.log(err));
        }
        load();

        return (() => { });
    }, [movimentedCard]);

    for (let i = 0; i < colunasList.length; i++) {
        const listCards: object[] = [];
        for (let y = 0; y < cards.length; y++) {
            if (cards[y].statusid == i + 1) {
                listCards.push(cards[y]);
            }
        }
        colunas.push({ id: i + 1, nomeColuna: colunasList[i], cards: listCards })
    }

    async function updateColumn(operacaoId: number, colunaId: string) {
        //console.log(operacaoId, colunaId);
        const response = await api.put("operations/updateColumn", {
            "assetid": operacaoId,
            "statusid": Number.parseInt(colunaId)
        })
            .then(() => {
                console.log('Movimentação concluída');
                setMovimentedcard(true);
            }).catch(err => console.log(err))
    }

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        // console.log(result);

        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.droppableId === source.droppableId) return;

        const sourceColId = source.droppableId
        const destColId = destination.droppableId;

        const sourceColumn = colunas[sourceColId - 1];
        const destColumn = colunas[destColId - 1];

        // Pega o item que está sendo movido
        const item = sourceColumn.cards[source.index];
        //console.log(item.assetid, result.destination?.droppableId);
        updateColumn(item.assetid, result.destination?.droppableId);

    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="board">

                <div className={style.containerColumns}>

                    {colunas.map((item, key) => (
                        item.nomeColuna !== 'NONE' ? <Column key={key} title={item.nomeColuna} cards={item.cards} id={item.id} /> : ''
                    ))}

                </div>

            </div>
        </DragDropContext>
    );
}
