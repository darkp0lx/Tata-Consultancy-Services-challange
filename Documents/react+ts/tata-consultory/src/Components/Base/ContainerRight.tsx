import { Input } from './Input'
import './ContainerRight.scss'
import PersonaServices, {
  iBodyRequest,
  iBodyResponse
} from '../../services/PersonaServices'
import { useState } from 'react'
import { ContactModel } from '../../interfaces/ContactModel'
import { PlanSelectionModel } from '../../interfaces/PlanSelectionModel'
import { OwnerInfoModel } from '../../interfaces/OwnerInfoModel'
import SelectComponent from '../SelectComponent'
import { DocumentTypeConstant } from '../../helpers/DocumentTypeConstant'
import { iOnChangeSelect } from '../../helpers/FormValidatorHelper'

import InputComponent  from '../InputComponent'

const oDocumentTypeConstant = new DocumentTypeConstant()

export const ContainerRight = () => {
  const [form, setForm] = useState<ContactModel>(new ContactModel())
  const [formPersonalInfo, setFormPersonalInfo] = useState<OwnerInfoModel>(
    new OwnerInfoModel()
  )
  const [formPlanSelection, setFormPlanSelection] = useState<
    PlanSelectionModel
  >(new PlanSelectionModel())
  const [userValidated, setUserValidated] = useState<
    iBodyResponse | undefined
  >()
  const [isLoadingForm, setIsLoadingForm] = useState<boolean>(false)
  const [isEnable, setIsEnable] = useState<boolean>(false)
  const [isformCompleted, setIsFormCompleted] = useState<boolean>(false)
  const [] = useState<boolean>(false)

  async function submitForm (e: any) {
    e.preventDefault()
    setIsLoadingForm(true)
    try {
      const body: iBodyRequest = {
        documentType: form.sltDocumentType.value!,
        documentNumber: form.inpDocumentNumber.value,
        birthDay: form.inpBirthDate.value,
        phoneNumber: form.inpMobilephoneNumber.value
      }
      const result = await PersonaServices.getUserInfo(body)
      const dataResult: iBodyResponse = result.data?.data.tercero
      let personalInfo = new OwnerInfoModel()
      personalInfo.fillByResponse(dataResult)
      setUserValidated(dataResult)
      setFormPersonalInfo(personalInfo)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingForm(false)
    }
  }

  const handleSelect = (select: iOnChangeSelect) => {
    let currentForm = form.getStateSelect(form, select)

    setForm(currentForm)
  }
  const handleInput = (event: any) => {
    setForm(form.getStateInput(form, event))
  }

  return (
    <div className='p_home__form'>
      <div className='p_home__form_wrapper'>
        {!isformCompleted ? (
          !userValidated ? (
            <>
              <h3 className='p_home__form_title e-h5 e-text-light'>
                Obtén tu{' '}
                <span className='e-text-blue e-text-regular'>seguro ahora</span>
              </h3>
              <p className='p_home__form_subtitle e-p4 e-text-light'>
                Ingresa los datos para comenzar
              </p>
              <div className='p_home__form_wrapper_container'>
                <form onSubmit={submitForm}>
                  <div className='p_home__form_input_group'>
                    <SelectComponent
                      className='p_home__form_input_group_item'
                      label='Tipo de documento*'
                      options={oDocumentTypeConstant.listMainDocuments.map(
                        elm => {
                          return { ...elm, name: elm.codeText }
                        }
                      )}
                      model={form.sltDocumentType}
                      onChange={handleSelect}
                    />
                    <InputComponent
                      className='p_home__form_input_group_item'
                      label='Número de Documento*'
                      model={form.inpDocumentNumber}
                      onChange={handleInput}
                    />
                  </div>
                  <InputDateComponent
                    className=''
                    label='Fecha de Nacimiento*'
                    model={form.inpBirthDate}
                    onChange={handleInput}
                  />
                  <InputComponent
                    className=''
                    label='Celular*'
                    model={form.inpMobilephoneNumber}
                    onChange={handleInput}
                  />

                  <CheckboxComponent
                    className=''
                    label={
                      <>
                        Acepto la{' '}
                        <a
                          className='p_home__form_wrapper_container_check_link e-text-regular'
                          href='#'
                        >
                          Politica de Datos Personales y los Términos y
                          Condiciones
                        </a>
                      </>
                    }
                    model={form.chkAllowPolicyProtection}
                    onChange={handleCheckbox}
                  />

                  <CheckboxComponent
                    className=''
                    label={
                      <>
                        Acepto la{' '}
                        <a
                          className='p_home__form_wrapper_container_check_link e-text-regular'
                          href='#'
                        >
                          Politica de Envío de Comunicaciones Comerciales
                        </a>
                      </>
                    }
                    model={form.chkAllowPolicyDelivery}
                    onChange={handleCheckbox}
                  />
                  <ButtonComponent
                    type={'submit'}
                    loading={isLoadingForm}
                    disabled={!isEnable}
                  >
                    COMENCEMOS
                  </ButtonComponent>
                </form>
              </div>
            </>
          ) : (
            <WizardComponent
              handleChangeStep={handleChangeStepWizard}
              items={getWizardItems()}
              hideStepContent
            ></WizardComponent>
          )
        ) : (
          <div className='p_home__form_greetings'>
            <h3 className='e-h4 e-text-light'>
              ¡Gracias por{' '}
              <span className='e-text-blue e-text-regular'>
                confiar en <br /> nosotros!
              </span>
            </h3>
            <p className='e-p5 e-text-light'>
              Queremos conocer mejor la salud de los asegurados. Un asesor{' '}
              <strong>se pondrá en contacto</strong> contigo en las siguientes{' '}
              <strong>48 horas.</strong>
            </p>
            <div className='p_home__form_greetings_button'>
              <ButtonComponent type={'button'} loading={isLoadingForm}>
                IR A SALUD
              </ButtonComponent>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
