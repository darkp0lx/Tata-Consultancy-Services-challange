import React from 'react';
import './index.scss';

interface iProps{
    loadingText?: string;
    className?: string;
    type?: 'submit' | 'reset' | 'button';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    theme?: 'fill' | 'ghost' | 'outline' | 'tonality' | 'outlinewhite';
    loading?: boolean;
    disabled?: boolean;
    id?: string;
    children?: React.ReactNode
    onClick?: () => void;
}

const Component:React.FunctionComponent<iProps> = (props:iProps) => {
    let classSize = "";
    switch (props.size) {
        case "xs":
          classSize = "c_button__SizeXsmall"
          break;
    
        case "md":
          classSize = "c_button__SizeMedium"
          break;
    
        case "lg":
          classSize = "c_button__SizeLarge"
          break;
    
        case "xl":
          classSize = "c_button__SizeXlarge"
          break;
    }

    let classTheme = "";
    switch (props.theme) {
        case "ghost":
        classTheme = "c_button__ThemeGhost"
        break;

        case "outline":
        classTheme = "c_button__ThemeOutline"
        break;

        case "tonality":
        classTheme = "c_button__ThemeTonality"
        break;

        case "outlinewhite":
        classTheme = "c_button__ThemeOutlineWhite"
        break;
    }

    const onClickButton = (event: any) => {
        props.onClick && props.onClick()
    }

    let loadingText = props.loadingText || "Un momento...";
    let className = `c_button ${props.className || ""} ${classSize} ${classTheme}`;

    return (
        <button
        type={props.type || "button"}
            disabled={props.disabled || props.loading}
            className={className}
            onClick={onClickButton}
            id={props.id}
            >
            {props.loading && <div className="c_button__spin" />}
            <div className="c_button__text">
                {props.loading ? loadingText : props.children}
            </div>
        </button>
    )
}
export default Component;