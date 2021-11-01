import React, {useState,useRef} from 'react';
import {ReactComponent as BackIcon} from '@icons/left-arrow.svg'
import './index.scss';

interface iProps {
    handleChangeStep?: Function;
    enableClickStep?: boolean;
    hideStepContent?: boolean;
    classStepContent?: string;
    items: Array<{
      Component: any
      props: any
    }>;
    ref?: any;
    hideSteps?: boolean;
  }
  

const Component:React.FunctionComponent<iProps> = (props:iProps) => {
    const [active, setActive] = useState(0)

    const changeStep = (index: number) => {
        setActive(index)
    }

    const nextStep = () => {
      if (props.handleChangeStep) props.handleChangeStep(active + 1)
      if((active+1) < props.items.length){
          changeStep(active + 1)
        }
      }
    
    const  prevStep = () => {
        changeStep(active - 1)
    }
    

    const Component = active <= props.items.length-1 &&  props.items[active].Component
    
    return (
        <div className="c_wizard">
            <div className="c_wizard__step">
                <button className="c_wizard__step_back_button" onClick={prevStep} disabled={active === 0}><BackIcon/></button>
                <p className="c_wizard__step_title e-p3"><span className="c_wizard__step_title__Blue e-p3">Paso {active+1}</span> de {props.items.length}</p>
            </div>
            <div className="c_wizard__content">
                <div
                className={`c_wizard__content_item`}
                >
                <Component
                    {...props.items[active].props}
                    wizardPrevstep={prevStep}
                    wizardNextstep={nextStep}
                    wizardGoStep={changeStep}
                />
                </div>
            </div>
        </div>
    )
}

export default Component;