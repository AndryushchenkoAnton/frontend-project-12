import React, {useState} from "react";
import './Modal.scss';
import {Field, Form, Formik} from 'formik';
import cn from "classnames";
import {selectors as channelsSelectors} from '../../slices/channelsSlice.js';
import {useSelector} from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';


const ModalAdd = (props) => {
    const [valid, setValid] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation();

    const {show, handleClose, socket} = props;
    const firstModalDiv = cn('fade', 'modal-backdrop', {show: show});
    const secondModalDiv = cn('fade', 'modal', {show: show});
    const channels = Object.values(useSelector(channelsSelectors.selectEntities));
    const names = channels.map((channel) => channel.name);
    const handleSubmit = ({name}) => {

        if (names.includes(name)) {
            setError(t('mustBeUniq'))
            setValid(false);
            return;
        } else if (name.length < 3 || name.length > 20) {
            setError(t('usernameLength'))
            setValid(false);
            return;
        }
        setError(null)
        setValid(true);
        socket.emit('newChannel', {name: name});
        handleClose();
        toast.success(t('channelAdded'), {autoClose: 5000,});

    };

    return (
        <>
            <div className={firstModalDiv}></div>
            <div role="dialog" aria-modal="true" className={secondModalDiv} tabIndex="-1" style={{display: 'block'}}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title h4">{t('addChannel')}</div>
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
                                            <label className='visually-hidden' htmlFor='name'>{t('channelName')}</label>
                                            <div className='invalid-feedback'>{error}</div>
                                            <div className="d-flex justify-content-end">
                                                <button type="button" className="me-2 btn btn-secondary"
                                                        onClick={handleClose}>{t('cancel')}
                                                </button>
                                                <button type="submit" className="btn btn-primary">{t('post')}</button>
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

export default ModalAdd;

