import React, {useState} from "react";
import './Modal.scss';
import {Field, Form, Formik} from "formik";
import cn from "classnames";
import {useSelector} from "react-redux";
import {selectors as channelsSelectors} from "../../slices/channelsSlice";

const ModalRename = (props) => {

    const [valid, setValid] = useState(true);
    const [error, setError] = useState(null);

    const {show, handleClose, socket, id} = props;
    const firstModalDiv = cn('fade', 'modal-backdrop', {show: show});
    const secondModalDiv = cn('fade', 'modal', {show: show});
    const channels = Object.values(useSelector(channelsSelectors.selectEntities));
    const names = channels.map((channel) => channel.name);
    const handleSubmit = ({name}) => {

        if (names.includes(name)) {
            setError('Должен быть уникальным')
            setValid(false);
            return;
        } else if (name.length < 3 || name.length > 20) {
            setError('От 3 до 20 символов')
            setValid(false);
            return;
        }
        setError(null)
        setValid(true);
        socket.emit('renameChannel', {id, name: name});
        handleClose();
    };

    return(
        <>
        <div className={firstModalDiv}></div>
    <div role="dialog" aria-modal="true" className={secondModalDiv} tabIndex="-1" style={{display: 'block'}}>
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-title h4">Переименовать канал</div>
                    <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close"
                            onClick={handleClose}></button>
                </div>
                <div className="modal-body">
                    <Formik
                        initialValues={{name: ''}}
                        onSubmit={handleSubmit}
                    >
                        {({values, handleChange}) => (
                            <Form>
                                <div>
                                    <Field
                                        name='name'
                                        id='name'
                                        className={cn('mb-2', 'form-control', {'is-invalid': !valid})}
                                        value={values.name}
                                        onChange={handleChange}
                                    />
                                    <label className='visually-hidden' htmlFor='name'>Имя канала</label>
                                    <div className='invalid-feedback'>{error}</div>
                                    <div className="d-flex justify-content-end">
                                        <button type="button" className="me-2 btn btn-secondary"
                                                onClick={handleClose}>Отменить
                                        </button>
                                        <button type="submit" className="btn btn-primary">Отправить</button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    </div>
</>
    );

};

export default ModalRename;
