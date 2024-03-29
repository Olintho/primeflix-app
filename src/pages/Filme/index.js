import { useState, useEffect } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"

import api from '../../services/api'
import './filme-info.css'

function Filme() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "057bb6ccbcb145d33c949936a2a625c0",
                    language: "pt-BR"
                }
            })
                .then((response) => {
                    setFilme(response.data)
                    setLoading(false)
                })
                .catch(() => {
                    toast.error('Fime não encontrado');
                    navigate("/", { replace: true })
                    return;
                })
        }

        loadFilme();

        return () => {
            console.log("Componente desmontado")
        }

    }, [id, navigate])

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@primeflix")
        let filmesSalvos = JSON.parse(minhaLista) || []
        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)
        console.log(hasFilme)
        if (hasFilme) {
            toast.warn("Filme existente")
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com Sucesso!")

    }

    
    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando detalhes ...</h1>
            </div>
        )
    }


    return (
        <>
            <div className="filme-info">
                <h1>{filme.title}</h1>
                <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

                <h3>Sinopse</h3>
                <span>{filme.overview}</span>
                <strong>Avaliação: {filme.vote_average} / 10</strong>

                <div className="area-buttons">
                    <button onClick={salvarFilme}>Salvar</button>
                    <button>
                        <a target="blank" rel="noreferrer" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                            Trailer
                        </a>
                    </button>

                </div>
            </div>
        </>
    );
};

export default Filme;
