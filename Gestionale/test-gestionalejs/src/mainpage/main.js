import { useEffect, useState } from 'react';
import '../css/mainpage/mainpage.css';
import LogicManager from '../businesslogic/LogicManager';


const MainPage = () => {
    const [prtList, setPrtList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPratiche = async () => {
            const ret = await LogicManager.getInstance().getPraticheManager().loadPratiche('');
            console.log(ret);
            
            if (ret){
                setPrtList(ret);
                setLoading(false);
            }
        }

        fetchPratiche();
    }, []);

    return <div className="mainpage-container">
        <h1>
            Benvenuto sulla nostra pagina!
        </h1>
        <div className='text-container'>
        Domande frequenti:
            Come funziona il nostro servizio?
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vivamus convallis purus eu risus condimentum, eget fermentum arcu euismod.
        </div>
        <div className='pratiche-container'>
            <div className='pratica-container'>
                <div className='prt-info minimo'>PrgPratica</div>
                <div className='prt-info'>Titolo</div>
                <div className='prt-info'>Titolare</div>
                <div className='prt-info minimo'>Incaricato</div>
                <div className='prt-info'>Cliente</div>
            </div>
        {loading ? (<p>Caricamento...</p>) : 
            ( prtList.length>0 && prtList.map(iter => <div className='pratica-container' key={iter.getId()}>
                <div className='prt-info minimo'>
                    {iter.getPrgPratica()}
                </div>
                <div className='prt-info'>
                    {iter.getTitolo()}
                </div>
                <div className='prt-info'>
                    {iter.getTitolare()}
                </div>
                <div className='prt-info minimo'>
                    {iter.getIncaricato()}
                </div>
                <div className='prt-info'>
                    {iter.getNomeCliente()}
                </div>
             </div>))}
             </div>
    </div>
}

export default MainPage;