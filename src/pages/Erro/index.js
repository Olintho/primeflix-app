import { Link } from 'react-router-dom'
import './error.css'

function Erro() {
    return (
        <div className="not-found">
            <h1>404</h1>
            <h2>Ops! Página não encontrada!</h2>
            <Link to="/">Veja todos os filmes</Link>
        </div>
    )
}

export default Erro;
