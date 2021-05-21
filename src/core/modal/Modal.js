import React from 'react';
import ReactDOM from 'react-dom';
import IconButton from '../button/IconButton';
import c from './Modal.module.css'

const Modal = ({ isShowing, hide, children, clearModal }) => {


    const closeModal = () => { clearModal(); hide() }
    return (isShowing ? ReactDOM.createPortal(
        <>
            <div className={c.modal}>
                <div className={c.modal_content} >
                    <div className={c.buttonBlock}>
                        <IconButton title="close" onClick={closeModal} icon="close" />
                    </div>

                    {children}
                </div>
            </div>
        </>, document.body
    ) : null
    )
}

export default Modal;