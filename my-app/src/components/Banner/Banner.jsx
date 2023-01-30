/*--- Componant Banner : Bannière commune à la page LOGIN et REGISTER ---*/

import "./Banner.css" // CSS IMPORT

/*--- Import des images composant notre bannière :  ---*/
import earth from "../../assets/icon-earth-monochrome-white.png"
import logo from "../../assets/groupomania-red-monochrome.png"

function Banner() {
    return(<header>
        <img src={earth} alt= "Logo Earth Groupomania" className="groupomania-logo-earth"/>
        <img src={logo} alt="Logo Groupomania" className="groupomania-logo"/>
    </header>)
}

export default Banner