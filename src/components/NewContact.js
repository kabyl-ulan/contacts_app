import React, {useState} from 'react';
import ModalWindow from "./ModalWindow";
const NewContact = ({el, deleteContacts, updateContact}) => {
    const {name, surname, phone, id} = el

    const newName = name[0].toUpperCase() + name.slice(1)
    const newSurname = surname[0].toUpperCase() + surname.slice(1)

    const [click, setClick] = useState(false)

    const clickChang = () => {
        setClick(!click)
        // console.log(click)
    }

    const clickExit = () => {
        setClick(false)
    }

    const initial = name[0].toUpperCase() + surname[0].toUpperCase()

    return (

        <li className={'contacts-li'}>
            <div className={'newcontacts'}>
                <div className={"con-item"}>
                    <div className={'circle'}
                         style={{
                             background: `white`,
                         }}
                    >
                        <span className={'initial'}>
                            {initial}
                        </span>
                    </div>
                    <div className={'user'}>
                        <div className={'user-name'}>
                            {newName}
                        </div>
                        <div className={'user-surname'}>
                            {newSurname}
                        </div>
                        <a href={`tel:${phone}`}
                           className={'user-phone'}>
                            <span className={'tel'}>тел: </span>{phone}
                        </a>
                    </div>
                </div>
                <div className={'buttons'}>
                    <button className={'btn-update'}
                            onClick={clickChang}>
                        {
                            !click ? 'Изменить' : 'Закрыть'
                        }
                    </button>
                    <button className={'btn-delete'}
                            onClick={() => deleteContacts(id)}>
                        Удалить
                    </button>
                </div>
            </div>
            <ModalWindow
                click={click}
                clickExit={clickExit}
                updateContact={updateContact}
                el={el}
            />
        </li>
    );
};

export default NewContact;