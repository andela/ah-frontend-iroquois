import {Modal} from "react-materialize";
import React from "react";
import styles from "../components/Auth/Login/css/login.scss";

export const emailValidation = (email, err, bol) =>{

    const resp = {};
    resp[bol] = false;
    if (email.length === 0){

        resp[err] = "email is required";
        resp[bol] = true;

    }else if(!email.match(/^[A-Za-z0-9.+_-]+@[A-Za-z0-9._-]+\.[a-zA-Z]{2,}$/)){

        resp[err] = "Invalid email format ";
        resp[bol] = true;
    }

    return resp;
};

export const field = (obj) => ({
    type: obj[0],
    name: obj[1],
    value: obj[2],
    htmlFor: obj[3],
    label: obj[4],
    icon: obj[5],
    error: obj[6],
    id: obj[7],
    divClass: obj[8],
    modalClass: obj[9],
    triggerClass: obj[10],
    triggerText: obj[11],
    props: obj[12],
    component: obj[13]
});

export const generateModal = (attrs) => {
    return <div key={attrs.divClass} className={attrs.divClass}>
        <Modal
            id={attrs.id}
            className={attrs.modalClass}
            actions={''}
            trigger={<a href='#' className={attrs.triggerClass}>{attrs.triggerText}</a>}
        >
            <attrs.component {...attrs.props} />
        </Modal>
    </div>
};


export const generateInput = (field, index, obj) => {

    const fn = `validate_${field.name}`;

    return (
        <div className={`input-field col s12 ${field.error ? styles.fieldError : ''}`} key={field.name + index}>
            <i className={`material-icons prefix ${field.error ? styles.prefix : ''} ${field.error ? styles.active : ''}`}>{field.icon}</i>
            <input
                className="validate"
                type={field.type}
                name={field.name}
                value={obj.state[field.value]}
                onChange={obj[fn]}
                ref={field.htmlFor}
            />
            <label htmlFor={field.htmlFor}>{field.label}</label>
            <div className={styles['errors']}>{field.error}</div>
        </div>
    );
};
