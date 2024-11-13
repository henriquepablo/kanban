import { useState } from 'react';
import style from '../styles/modal.module.css';
import { api } from '@/service/api';

type props = {
    assetid: number
}

export default function Modal({assetid}:props) {
    const url = new URLSearchParams(window.location.search);
    const [motivo, setMotivo] = useState<string>('');
    
    async function submit() {
        if (motivo === '') return alert('Informe o motivo da correção');
        
        console.log(motivo, assetid, url.get('userid'));
    
        try {
            const response = await api.put("operations/updateMotivo", {
                assetid: assetid,
                motivo: motivo,
                userid: url.get('userid')
            });
    
            console.log('Operação concluída', response);
        } catch (e) {
            console.error('Erro na operação', e);
        }
    }

    return(
        <div className={style.container}>
            <div className={style.header}>
                <h3>
                    Edição - Reprovação
                </h3>
                <div className={style.containerButton}>
                    <input type='button' value="Atualizar" className={style.btnUpdate} onClick={submit}/>
                </div>
            </div>
            <div className={style.body}>
                
                <div className={style.containerLabel}>
                    <label className={style.label}>
                        AssetId
                    </label>
                    <p className={style.assetid}>
                        {assetid}
                    </p>
                </div>

                <div className={style.containerTextArea}>
                    <label>
                        Motivo
                    </label>
                    <div>
                        <textarea className={style.textarea} onChange={(value) => setMotivo(value.target.value)}/>
                    </div>
                </div>
            </div>
        </div>
    );  
}