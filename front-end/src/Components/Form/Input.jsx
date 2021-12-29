import React, { useEffect, useRef, Component } from 'react'
import { useField } from "@unform/core"

export default function Input(props){
    /* Referencia para acessar o elemento no HTML*/
    const inputRef = useRef(null);

    /* Field é a API que realiza a conecção do input com o unform */
    const {  fieldName, registerField, defaultValeu, error }  = useField(props.name); /* Retorno desestruturado */

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField]);


    return(
        <input  
            ref={inputRef} 
            id={props.id} 
            type={props.type} 
            autoComplete={props.autoComplete} 
            required={props.required}
            onChange={props.onChange}
            placeholder={props.placeholder}
            className={props.className}
            value={props.value}
            disabled={props.disabled}
        />
    )
}