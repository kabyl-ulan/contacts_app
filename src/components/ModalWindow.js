import React, {useState} from 'react';

const ModalWindow = ({click, clickExit, el, updateContact}) => {

    const [newUser, setNewUser] = useState({
        ...el
    })

    const handleSave = (id, user) => {
        updateContact(id, user)
        clickExit()
    }

    const {name, surname, phone, id} = newUser

    const handleChange = (e) => {
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }

    return (
        <>
            <div className={'modal-window'}
                 style={{
                     display: click === true ? 'flex' : 'none',
                 }}
            >
                <div className={'input'}>
                    <input type="text"
                           onChange={handleChange}
                           defaultValue={name}
                           placeholder={'Имя'}
                           className={'input-text modal-input'}
                           name='name'/>
                </div>
                <div className={'input'}>
                    <input type="text"
                           onChange={handleChange}
                           defaultValue={surname}
                           placeholder={'Фамилия'}
                           className={'input-text modal-input'}
                           name='surname'/>
                </div>
                <div className={'input'}>
                    <input type="number"
                           onChange={handleChange}
                           defaultValue={phone}
                           placeholder={'Телефон'}
                           className={'input-text modal-input'}
                           name='phone'/>
                </div>
                <div className={'btn-item'}>
                    <button className={'btn-update'}
                            onClick={() => handleSave(el.id, newUser)}
                    >
                        Сохранить
                    </button>
                    <button className={'btn-delete'}
                            onClick={clickExit}
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </>
    );
};

export default ModalWindow;