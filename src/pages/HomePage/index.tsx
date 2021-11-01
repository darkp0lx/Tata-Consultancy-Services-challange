import React, {useRef, useState} from 'react';
import './index.scss';

import {ReactComponent as ShieldIcon} from '@icons/shield.svg'
import {ReactComponent as PhoneIcon} from '@icons/phone.svg'
import {ReactComponent as MoneyIcon} from '@icons/money.svg'
import {ReactComponent as HospitalIcon} from '@icons/hospital.svg'

import {ContactModel} from '@models/ContactModel'
import InputComponent from '@components/InputComponent'
import InputDateComponent from '@components/InputDateComponents'
import SelectComponent from '@components/SelectComponent'
import CheckboxComponent from '@components/CheckboxComponent'
import ButtonComponent from '@components/ButtonComponent'

import PersonalInfoSection from '@sections/PersonalInfoSection'
import PlanSelectionSection from '@sections/PlanSelectionSection'

import WizardComponent from '@components/WizardComponent'

import PersonaServices, {iBodyRequest, iBodyResponse} from '@services/PersonaServices'
import { DocumentTypeConstant } from "@helpers/DocumentTypeConstant";
import { iOnChangeSelect } from '@helpers/FormValidatorHelper';
import {OwnerInfoModel} from '@models/OwnerInfoModel';
import {PlanSelectionModel} from '@models/PlanSelectionModel';
import { get } from 'https';

const oDocumentTypeConstant = new DocumentTypeConstant();
const Component:React.FunctionComponent = () => {

    const [form, setForm] = useState<ContactModel>(new ContactModel())
    const [formPersonalInfo, setFormPersonalInfo] = useState<OwnerInfoModel>(new OwnerInfoModel())
    const [formPlanSelection, setFormPlanSelection] = useState<PlanSelectionModel>(new PlanSelectionModel())
    const [userValidated, setUserValidated] = useState<iBodyResponse | undefined>()
    const [isLoadingForm, setIsLoadingForm] = useState<boolean>(false)
    const [isEnable, setIsEnable] = useState<boolean>(false)
    const [isformCompleted, setIsFormCompleted] = useState<boolean>(false)
    const [] = useState<boolean>(false)


    const handleInput = (event: any) => {
        setForm(form.getStateInput(form, event))
    }

    const handleCheckbox = (event: any) => {
        let currentForm = form.getStateCheckbox(form, event);
        
        if(currentForm.chkAllowPolicyDelivery.value && currentForm.chkAllowPolicyProtection.value){
            setIsEnable(true);
        }else{
            setIsEnable(false);
        }

        setForm(currentForm)
      }

    const handleSelect = (select: iOnChangeSelect) => {
        let currentForm = form.getStateSelect(form, select);

        setForm(currentForm)
    }

    async function submitForm(e: any) {
        e.preventDefault();
        setIsLoadingForm(true);
        try {
            const body:iBodyRequest = {
                documentType: form.sltDocumentType.value!,
                documentNumber: form.inpDocumentNumber.value,
                birthDay: form.inpBirthDate.value,
                phoneNumber: form.inpMobilephoneNumber.value
            }
           const result = await PersonaServices.getUserInfo(body)
           const dataResult:iBodyResponse = result.data?.data.tercero;
           let personalInfo = new OwnerInfoModel()
           personalInfo.fillByResponse(dataResult)
           setUserValidated(dataResult);
           setFormPersonalInfo(personalInfo);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoadingForm(false);
        }
    }

    const handleChangeStepWizard = (stepActive: number) => {
        if(stepActive == getWizardItems().length){
            setIsFormCompleted(true);
        }
    };

    const setPersonalInfo = (form:OwnerInfoModel) => {
        setFormPersonalInfo(form);
    }
    const setPlanSelection = (form:PlanSelectionModel) => {
        setFormPlanSelection(form);
    }

    function getWizardItems(): Array<any> {
        let wizardItems: Array<any> = [
          {
            Component: PersonalInfoSection,
            props: {
              formPersonalInfo: formPersonalInfo,
              setPersonalInfo: setPersonalInfo,
              nameClient: userValidated?.nombres
            }
          },
          {
            Component: PlanSelectionSection,
            props: {
              formPlanSelection: formPlanSelection,
              setPlanSelection: setPlanSelection,
            }
          },
        ];
        
        return wizardItems;
      }
    return (
        <div className="p_home">
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
                
            </div>
            <div className="p_home__form">
                <div className="p_home__form_wrapper">

                    {!isformCompleted ?
                        !userValidated ?
                        <>
                            <h3 className="p_home__form_title e-h5 e-text-light">Obtén tu <span className="e-text-blue e-text-regular">seguro ahora</span></h3>
                            <p className="p_home__form_subtitle e-p4 e-text-light">Ingresa los datos para comenzar</p>
                            <div className="p_home__form_wrapper_container">
                                <form onSubmit={submitForm}>
                                    <div className="p_home__form_input_group">    
                                        <SelectComponent
                                            className="p_home__form_input_group_item"
                                            label="Tipo de documento*"
                                            options={oDocumentTypeConstant.listMainDocuments.map((elm)=>{return({...elm, name:elm.codeText})})}
                                            model={form.sltDocumentType}
                                            onChange={handleSelect}
                                        />
                                        <InputComponent
                                            className="p_home__form_input_group_item"
                                            label="Número de Documento*"
                                            model={form.inpDocumentNumber}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <InputDateComponent
                                        className=""
                                        label="Fecha de Nacimiento*"
                                        model={form.inpBirthDate}
                                        onChange={handleInput}
                                    />
                                    <InputComponent
                                        className=""
                                        label="Celular*"
                                        model={form.inpMobilephoneNumber}
                                        onChange={handleInput}
                                    />
        
                                    <CheckboxComponent
                                        className=""
                                        label={<>Acepto la <a className="p_home__form_wrapper_container_check_link e-text-regular" href="#">Politica de Datos Personales y los Términos y Condiciones</a></>}
                                        model={form.chkAllowPolicyProtection}
                                        onChange={handleCheckbox}
                                    />
        
        
                                    <CheckboxComponent
                                        className=""
                                        label={<>Acepto la <a className="p_home__form_wrapper_container_check_link e-text-regular" href="#">Politica de Envío de Comunicaciones Comerciales</a></>}
                                        model={form.chkAllowPolicyDelivery}
                                        onChange={handleCheckbox}
                                    />
                                    <ButtonComponent type={"submit"} loading={isLoadingForm} disabled={!isEnable}>COMENCEMOS</ButtonComponent>
                                </form>
                            </div>
                        </>
                    :
                        <WizardComponent
                            handleChangeStep={handleChangeStepWizard}
                            items={getWizardItems()}
                            hideStepContent
                        >

                        </WizardComponent>
                        :
                        <div className="p_home__form_greetings">
                            <h3 className="e-h4 e-text-light">¡Gracias por <span className="e-text-blue e-text-regular">confiar en <br/> nosotros!</span></h3>
                            <p className="e-p5 e-text-light">Queremos conocer mejor la salud de los asegurados. Un asesor <strong>se pondrá en contacto</strong> contigo en las siguientes <strong>48 horas.</strong></p>
                            <div className="p_home__form_greetings_button">
                            <ButtonComponent type={"button"} loading={isLoadingForm}>IR A SALUD</ButtonComponent>
                            </div>
                        </div>
                    }
                    
                </div>
            </div>
        </div>
    )
}
export default Component;