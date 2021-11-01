import React, {useState, useEffect} from 'react';
import RadioCardComponent from '@components/RadioCardComponent'
import {PlanSelectionModel} from '@models/PlanSelectionModel'
import ButtonComponent from '@components/ButtonComponent'
import Plan2Image from '@images/plan2.png'
import {ReactComponent as HeartIcon} from '@icons/heart.svg'
import {ReactComponent as ArrowDownIcon} from '@icons/arrow-down.svg'
import './index.scss';
interface iPlan {
    name: string,
    mount: number,
    cover: string,
    benefits: Array<{ name: string,disclaimer?: string, allow: boolean}>
    image?: string,
    services: JSX.Element,
    exclusions: JSX.Element
}

interface iProps {
    currentStep: number;
    totalSteps: number;
    prevCustomStep?: number;
    setPlanSelection: (arg:PlanSelectionModel) => void;
    formPlanSelection: PlanSelectionModel;
    wizardNextstep: Function
    wizardPrevstep: Function
}
const Component:React.FunctionComponent<iProps> = (props:iProps) => {
    const [form, setForm] = useState<PlanSelectionModel>(new PlanSelectionModel())
    const [selectedPlan, setSelectedPlan] = useState<iPlan>()

    const plans:Array<iPlan> = [
        {   name: "BASICO",
            mount: 160,
            cover: "1MM",
            benefits: [
                { name: "Lima",disclaimer: "zona de cobertura", allow: true},
                { name: "+30 clínicas",disclaimer: "en red afiliada", allow: true },
                { name: "Médico a domicilio", allow: false },
                { name: "Chequeos preventivos" , allow: false},
                { name: "Reemboloso" , allow: false},
                { name: "Reemboloso internacional", allow: false },
            ],
            image: Plan2Image,
            services: <p className="e-p6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in quam sapien. Cras luctus mauris ut lacinia facilisis. Sed iaculis nisl non sapien porta rhoncus. Nam sit amet lacinia purus. Donec suscipit quam diam, sit amet tincidunt risus viverra sed. Aenean ac magna id mi lobortis consectetur. Nunc id pulvinar turpis. Aenean nisl ante, egestas sit amet tortor eget, porta ornare lectus. Vestibulum placerat at nisl ut ornare. In ultricies id enim quis rhoncus. Sed odio sem, porttitor sed felis dignissim, porttitor venenatis leo. Pellentesque sed mauris id est molestie gravida ac ut nisl.</p>,
            exclusions: <p className="e-p6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in quam sapien. Cras luctus mauris ut lacinia facilisis. Sed iaculis nisl non sapien porta rhoncus. Nam sit amet lacinia purus. Donec suscipit quam diam, sit amet tincidunt risus viverra sed. Aenean ac magna id mi lobortis consectetur. Nunc id pulvinar turpis. Aenean nisl ante, egestas sit amet tortor eget, porta ornare lectus. Vestibulum placerat at nisl ut ornare. In ultricies id enim quis rhoncus. Sed odio sem, porttitor sed felis dignissim, porttitor venenatis leo. Pellentesque sed mauris id est molestie gravida ac ut nisl.</p>
        },
        {   name: "AVANZADO",
            mount: 200,
            cover: "5MM",
            benefits: [
                { name: "Lima",disclaimer: "zona de cobertura", allow: true},
                { name: "+30 clínicas",disclaimer: "en red afiliada", allow: true },
                { name: "Médico a domicilio", allow: true },
                { name: "Chequeos preventivos" , allow: true},
                { name: "Reemboloso" , allow: false},
                { name: "Reemboloso internacional", allow: false },
            ],
            image: Plan2Image,
            services: <p className="e-p6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in quam sapien. Cras luctus mauris ut lacinia facilisis. Sed iaculis nisl non sapien porta rhoncus. Nam sit amet lacinia purus. Donec suscipit quam diam, sit amet tincidunt risus viverra sed. Aenean ac magna id mi lobortis consectetur. Nunc id pulvinar turpis. Aenean nisl ante, egestas sit amet tortor eget, porta ornare lectus. Vestibulum placerat at nisl ut ornare. In ultricies id enim quis rhoncus. Sed odio sem, porttitor sed felis dignissim, porttitor venenatis leo. Pellentesque sed mauris id est molestie gravida ac ut nisl.</p>,
            exclusions: <p className="e-p6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in quam sapien. Cras luctus mauris ut lacinia facilisis. Sed iaculis nisl non sapien porta rhoncus. Nam sit amet lacinia purus. Donec suscipit quam diam, sit amet tincidunt risus viverra sed. Aenean ac magna id mi lobortis consectetur. Nunc id pulvinar turpis. Aenean nisl ante, egestas sit amet tortor eget, porta ornare lectus. Vestibulum placerat at nisl ut ornare. In ultricies id enim quis rhoncus. Sed odio sem, porttitor sed felis dignissim, porttitor venenatis leo. Pellentesque sed mauris id est molestie gravida ac ut nisl.</p>
        },
        {   name: "PREMIUM",
            mount: 250,
            cover: "15MM",
            benefits: [
                { name: "Lima",disclaimer: "zona de cobertura", allow: true},
                { name: "+30 clínicas",disclaimer: "en red afiliada", allow: true },
                { name: "Médico a domicilio", allow: true },
                { name: "Chequeos preventivos" , allow: true},
                { name: "Reemboloso" , allow: false},
                { name: "Reemboloso internacional", allow: false },
            ],
            image: Plan2Image,
            services: <p className="e-p6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in quam sapien. Cras luctus mauris ut lacinia facilisis. Sed iaculis nisl non sapien porta rhoncus. Nam sit amet lacinia purus. Donec suscipit quam diam, sit amet tincidunt risus viverra sed. Aenean ac magna id mi lobortis consectetur. Nunc id pulvinar turpis. Aenean nisl ante, egestas sit amet tortor eget, porta ornare lectus. Vestibulum placerat at nisl ut ornare. In ultricies id enim quis rhoncus. Sed odio sem, porttitor sed felis dignissim, porttitor venenatis leo. Pellentesque sed mauris id est molestie gravida ac ut nisl.</p>,
            exclusions: <p className="e-p6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in quam sapien. Cras luctus mauris ut lacinia facilisis. Sed iaculis nisl non sapien porta rhoncus. Nam sit amet lacinia purus. Donec suscipit quam diam, sit amet tincidunt risus viverra sed. Aenean ac magna id mi lobortis consectetur. Nunc id pulvinar turpis. Aenean nisl ante, egestas sit amet tortor eget, porta ornare lectus. Vestibulum placerat at nisl ut ornare. In ultricies id enim quis rhoncus. Sed odio sem, porttitor sed felis dignissim, porttitor venenatis leo. Pellentesque sed mauris id est molestie gravida ac ut nisl.</p>
        },
        {   name: "FULL",
            mount: 500,
            cover: "25MM",
            benefits: [
                { name: "Lima",disclaimer: "zona de cobertura", allow: true},
                { name: "+30 clínicas",disclaimer: "en red afiliada", allow: true },
                { name: "Médico a domicilio", allow: true },
                { name: "Chequeos preventivos" , allow: true},
                { name: "Reemboloso" , allow: true},
                { name: "Reemboloso internacional", allow: true },
            ],
            image: Plan2Image,
            services: <p className="e-p6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in quam sapien. Cras luctus mauris ut lacinia facilisis. Sed iaculis nisl non sapien porta rhoncus. Nam sit amet lacinia purus. Donec suscipit quam diam, sit amet tincidunt risus viverra sed. Aenean ac magna id mi lobortis consectetur. Nunc id pulvinar turpis. Aenean nisl ante, egestas sit amet tortor eget, porta ornare lectus. Vestibulum placerat at nisl ut ornare. In ultricies id enim quis rhoncus. Sed odio sem, porttitor sed felis dignissim, porttitor venenatis leo. Pellentesque sed mauris id est molestie gravida ac ut nisl.</p>,
            exclusions: <p className="e-p6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in quam sapien. Cras luctus mauris ut lacinia facilisis. Sed iaculis nisl non sapien porta rhoncus. Nam sit amet lacinia purus. Donec suscipit quam diam, sit amet tincidunt risus viverra sed. Aenean ac magna id mi lobortis consectetur. Nunc id pulvinar turpis. Aenean nisl ante, egestas sit amet tortor eget, porta ornare lectus. Vestibulum placerat at nisl ut ornare. In ultricies id enim quis rhoncus. Sed odio sem, porttitor sed felis dignissim, porttitor venenatis leo. Pellentesque sed mauris id est molestie gravida ac ut nisl.</p>
        }
    ]

    const handleInput = (event: any) => {
        setForm(form.getStateInput(form, event))
        setSelectedPlan(plans[+event.target.value])
    }
    
    async function submitForm(e: any) {
        e.preventDefault();
        props.setPlanSelection && props.setPlanSelection(form);
        props.wizardNextstep();
    }


    useEffect(()=>{
        setSelectedPlan(plans[+form.rdPlanInsurance.value])
    },[])

    useEffect(()=>{
        setForm(props.formPlanSelection)
        setSelectedPlan(plans[+props.formPlanSelection.rdPlanInsurance.value])
    },[props.formPlanSelection])
   
    return (
        <div>
            <h3 className="s_personal_info__title e-h5 e-text-light">Elije <span className="s_personal_info__title__Blue e-text-regular">tu proteción</span></h3>
            <p className="s_personal_info__subtitle e-p4 e-text-light">Selecciona tu plan de salud ideal.</p>
            <form  onSubmit={submitForm}>
                <RadioCardComponent
                    label={""}
                    onChange={handleInput}
                    model={form.rdPlanInsurance}
                    options={
                        plans.map((plan, index) => {return(
                            {
                                code: index, 
                                name: <>{plan.name}</>,
                                content: 
                                    <div className="s_plan_selection__option_plan">
                                    <p className=" s_plan_selection__option_plan_name e-text-regular">{plan.name}</p>
                                    <h4 className="e-h5 s_plan_selection__option_plan_mount"><small>S/</small>{plan.mount}</h4>
                                    <p className="e-text-regular">mensual</p>
                                    </div>
                                }
                        )})
                       }
                />
                {selectedPlan && 
                <>
                    <div className="s_plan_selection__benefits">
                        <div className="s_plan_selection__benefits_header">
                            <p className="e-p5">Cuentas con beneficios:</p>
                        </div>
                        <div className="s_plan_selection__benefits_content">
                            <div className="s_plan_selection__benefits_cover">
                                <div className="s_plan_selection__benefits_cover_mount">
                                    <p className="e-p4">Cobertura Maxima</p>
                                    <p className="e-p1">S/{selectedPlan.cover}</p>
                                    <p className="s_plan_selection__benefits_cover_mount_badge e-text-regular">PLAN {selectedPlan.name.toUpperCase()}</p>
                                </div>
                                <img className="s_plan_selection__benefits_image" src={selectedPlan.image} alt={`plan ${selectedPlan.name}`}></img>
                            </div>
                            <ul className="s_plan_selection__benefits_list">
                                {selectedPlan.benefits.map((benefit, index) => {
                                    return (
                                        <li key={index} className={`s_plan_selection__benefits_list_items ${!benefit.allow && "s_plan_selection__benefits_list_items__Disabled"}`} >
                                            <HeartIcon/> <p className="e-p3">{benefit.name} <span>{benefit.disclaimer && `(${benefit.disclaimer})`}</span></p>
                                        </li>
                                    )
                                })}
                                
                            </ul>
                        </div>
                    </div>
                    <div className="s_plan_selection__services">
                        <h4 className="e-p2 e-text-light">
                            Revisa nuestros <br/><span className="e-text-regular">Servicios y exclusiones</span>
                        </h4>
                        <details className="s_plan_selection__services_detail">  
                            <summary className="s_plan_selection__services_summary"><p className="e-p4">Servicios brindados</p><span className="s_plan_selection__services_summary_icon"><ArrowDownIcon/></span></summary>  
                            {selectedPlan.services}
                        </details>  
                        <details className="s_plan_selection__services_detail">  
                            <summary className="s_plan_selection__services_summary"><p className="e-p4">Exclusiones</p><span className="s_plan_selection__services_summary_icon"><ArrowDownIcon/></span></summary>  
                            {selectedPlan.exclusions}
                        </details>  
                    </div>
                </>
                }

                <div className="s_personal_info__form_buttons">
                    <ButtonComponent className="s_personal_info__form_button" type={"submit"} >COMPRAR PLAN</ButtonComponent>
                </div>
            </form>
        </div>
    )
}

export default Component;