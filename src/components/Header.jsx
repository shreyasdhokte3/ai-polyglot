import worldMap from '../assets/worldmap.png'
import parrot from '../assets/parrot.png'
import './Header.css'

export default function Header() {
    return (
        <header
            className="header"
            style={{ backgroundImage: `url(${worldMap})` }}
        >
            <img className="header-parrot" src={parrot} alt="" />
            <div className="header-copy">
                <h1>PollyGlot</h1>
                <p>Perfect Translation Every Time</p>
            </div>
        </header>
    )
}
