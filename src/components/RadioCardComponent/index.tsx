import React, {useState} from 'react';
import { iRadioModel } from '@helpers/FormValidatorHelper.ts';
import './index.scss';

interface iProps {
    classItem?: string;
    className?: string;
    label?: string;
    model: iRadioModel;
    options: Array<{
      code: any;
      name: any;
      content?: JSX.Element;
    }>;
    onChange?: (event: any) => void;
  }

const Component:React.FunctionComponent<iProps> = (props:iProps) => {
    
    function selectOption(event: any) {
        props.onChange && props.onChange(event);
    };


    return (
        <div className="c_radio_card">
            <p className="e-p5">{props.label}</p>
         {props.options.map((elm, index)=>{
             let classSelected = props.model.value === elm.code ? "c_radio_card__item__Selected" : "";
             return (
                 <div key={index} className={`c_radio_card__item ${classSelected}`}>
                    <input
                        data-input-type="radio"
                        type="radio"
                        className="c_radio_card__item_radio_input"
                        name={props.model.name || ""}
                        value={elm.code}
                        required={props.model.isRequired || false}
                        onChange={selectOption}
                        checked={props.model.value == elm.code}
                   />
                   <span></span>
                   {elm.content}
                 </div>
             )
         })}
        </div>
    )
}

export default Component;