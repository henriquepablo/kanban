//@ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import Column from "./Column";
import style from '../styles/containerColumns.module.css';
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { api } from "@/service/api";
import { TailSpin } from "react-loader-spinner";
import Modal from "./Modal";

export default function Board() {

    // armazarna todas as operações (cards)
    const [cards, setCards]: any = useState([]);

    // esse useState que vai ser o responsável para que as colunas seja exibidas na tela
    const [colunas, setColunas] = useState<any[]>([]);

    // essa const armazena todas as colunas do fluxo selecionado
    const [colunasList, setColunasList] = useState([]);

    const [operacaoQueryList, setOperacaoQueryList] = useState([]);

    const [movimentedCard, setMovimentedcard] = useState(false);

    const [loading, setLoading] = useState<boolean>(false);

    const [displayModal, setDisplayModal] = useState<boolean>(false);

    const [assetIdModal, setAssetIdModal] = useState<number>();

    const modalRef = useRef(null);

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
                    // console.log(json.data);
                    // setCards(json.data.operacoes);
                    setOperacaoQueryList(json.data.operacaoQuery);
                    setColunasList(json.data.colunas);
                    setMovimentedcard(false);
                    setLoading(false);
                })
                .catch(err => console.log(err));
        }
        load();
        
        return (() => { });
    }, [movimentedCard]);

    useEffect(() => {
        const loadQuerys = async () => {
            const newColunas: any[] = [];
            for (let i = 0; i < colunasList.length; i++) {
                // Espera a resposta da requisição para pegar os dados de cada coluna
                const operacoes = await request(operacaoQueryList[i]);

                // verifico se é a última coluna, se for, troco os assetids dos cards para um número negativo, para não haver duplicidade com a segunda coluna
                const cards = (i === colunasList.length - 1) 
                ? operacoes.map((card: any) => ({ ...card, assetid: -Math.abs(card.assetid) })) 
                : operacoes;

                // Adiciona os dados de cada coluna
                newColunas.push({
                    id: i + 1,
                    nomeColuna: colunasList[i],
                    cards: cards
                });
            }
            
            setColunas(newColunas); // Atualiza o estado de colunas
        };

        if (colunasList.length > 0) {
            loadQuerys();
        }
    }, [colunasList, operacaoQueryList]);
    
    async function request(i: number) {
        // console.log(operacaoQueryList[i]);
        const url = new URLSearchParams(window.location.search);
        const response = await api.get("fluxo/1", {
            params: {
                "userid": url.get("userid"),
                "montador": url.get("montador"),
                "operacao": i,
                "metaviewid": url.get("metaviewId"),
                "layout": url.get("layout")
            }
        });

        return response.data.operacoes;
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
    
    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setDisplayModal(false);
        }
    };

    useEffect(() => {
        // Adiciona o event listener para detectar clique fora do modal
        document.addEventListener("mousedown", handleClickOutside);

        // Limpeza do event listener ao desmontar o componente
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        // console.log(result); 

        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.droppableId === source.droppableId) return;
        // if (destination.droppableId < source.droppableId) return;

        const sourceColId = source.droppableId
        const destColId = destination.droppableId;

        const sourceColumn = colunas[sourceColId - 1];
        const destColumn = colunas[destColId - 1];

        // Pega o item que está sendo movido
        const item = sourceColumn.cards[source.index];

        let message;
        //console.log(item.assetid, result.destination?.droppableId);
        
        
        if (result.destination?.droppableId == 2) console.log("[DEMANDA] Por Produzir");
        else if (result.destination?.droppableId == 3) {
            console.log("[DEMANDA] Produção Iniciada");
            message = `saveHistory:queima_iniciar_demanda:[${item.assetid}]`;
            window.parent.postMessage(message, '*');
        }
        else if (result.destination?.droppableId == 4) { 
            message = `saveHistory:queima_solicitar_aprovacao_demanda:[${item.assetid}]`;
            window.parent.postMessage(message, '*');   
            console.log("[DEMANDA] Aguardando Aprovação");
            updateColumn(item.assetid, 5);
            return;
        }
        else if (result.destination?.droppableId == 5) {
            message = `saveHistory:estatico_demanda_aprovar_gerente:[${item.assetid}]`;
            window.parent.postMessage(message, '*');
            console.log("[Demanda] Aprovada pelo Gerente");
            updateColumn(item.assetid, 11);
            return;
        }
        else if (result.destination?.droppableId == 6) {
            message = `saveHistory:estatico_demanda_aprovar_gestor:[${item.assetid}]`;
            window.parent.postMessage(message, '*');
            console.log("[DEMANDA] Solicitação Aprovada Gestor");
            updateColumn(item.assetid, 8);
            return;
        }
        else if (result.destination?.droppableId == 7) {
            message = `saveHistory:estatico_demanda_aprovar_solicitante:[${item.assetid}]`;
            window.parent.postMessage(message, '*');
            console.log("[DEMANDA] Solicitação concluída");
            updateColumn(item.assetid, 9);
            return;
        }
        else if (result.destination?.droppableId == 8) {
            setDisplayModal(true);
            console.log("[DEMANDA] corrigir");
            setAssetIdModal(item.assetid);
            updateColumn(item.assetid, 2);
            return;
        }
        updateColumn(item.assetid, result.destination?.droppableId);

    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="board">

                <div className={style.containerColumns}>

                    {displayModal && (
                        <div ref={modalRef}>
                            <Modal assetid={assetIdModal} />
                        </div>
                    )}

                    {colunas.map((item, key) => (
                        item.nomeColuna !== 'NONE' ? <Column key={key} title={item.nomeColuna} cards={item.cards} id={item.id} /> : ''
                    ))}

                </div>

            </div>
        </DragDropContext>
    );
}
