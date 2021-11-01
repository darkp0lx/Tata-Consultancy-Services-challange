import {ReactComponent as ShieldIcon} from '@icons/shield.svg'
import {ReactComponent as PhoneIcon} from '@icons/phone.svg'
import {ReactComponent as MoneyIcon} from '@icons/money.svg'
import {ReactComponent as HospitalIcon} from '@icons/hospital.svg'

export const ComponentLeft = () => {
  return (
    <div className="p_home__info">
                <div className="p_home__info_wrapper">
                    <h1 className="p_home__info_title e-h2 e-text-light">Seguro de <br/><span className="e-text-regular">Salud</span></h1>
                    <ul className="p_home__info_list">
                        <li className="p_home__info_list_item">
                            <ShieldIcon className="p_home__info_list_item_icon"></ShieldIcon>
                            <span className="p_home__info_list_item_text e-p4 e-text-light">Cómpralo de manera fácil y rápida</span>
                        </li>
                        <li className="p_home__info_list_item">
                            <PhoneIcon className="p_home__info_list_item_icon"></PhoneIcon>
                            <span className="p_home__info_list_item_text e-p4 e-text-light">Cotiza y compra tu seguro 100% digital</span>
                        </li>
                        <li className="p_home__info_list_item">
                            <MoneyIcon className="p_home__info_list_item_icon"></MoneyIcon>
                            <span className="p_home__info_list_item_text e-p4 e-text-light">Hasta S/.12 millones de cobertura anual</span>
                        </li>
                        <li className="p_home__info_list_item">
                            <HospitalIcon className="p_home__info_list_item_icon"></HospitalIcon>
                            <span className="p_home__info_list_item_text e-p4 e-text-light">Más de 300 clínicas en todo el Perú</span>
                        </li>
                    </ul>
                    <small className="p_home__info_footer e-p6 e-text-light"> 2020 RIMAC Seguros y Reaseguros</small>
                </div>
         <img className="home__image" src="https://i.imgur.com/5jFVlAK.png"/>

            </div>
  )
}
