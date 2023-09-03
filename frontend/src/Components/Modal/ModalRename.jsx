import React, { useState, useEffect, useCallback } from 'react';
import './Modal.scss';
import { Field, Form, Formik } from 'formik';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { getChannels, getChannelById } from '../../selectors';

const ModalRename = (props) => {
  const [valid, setValid] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const {
    show, handleClose, socket, id,
  } = props;
  const firstModalDiv = cn('fade', 'modal-backdrop', { show });
  const secondModalDiv = cn('fade', 'modal', { show });
  const channels = getChannels();
  const currentChannel = getChannelById(id);
  const names = channels.map((channel) => channel.name);
  const toastSuccess = useCallback(() => toast.success(t('channelRenamed'), { autoClose: 5000 }), [t]);
  const handleSubmit = ({ name }) => {
    if (names.includes(name)) {
      setError(t('mustBeUniq'));
      setValid(false);
      return;
    } if (name.length < 3 || name.length > 20) {
      setError(t('usernameLength'));
      setValid(false);
      return;
    }
    setError(null);
    setValid(true);
    socket.emit('renameChannel', { id, name });
    handleClose();
    toastSuccess();
  };
  useEffect(() => {
    document.getElementsByName('name')[0].focus();
  }, []);

  return (
    <>
      <div className={firstModalDiv} />
      <div role="dialog" aria-modal="true" className={secondModalDiv} tabIndex="-1" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{t('renameChannel')}</div>
              <button
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
                className="btn btn-close"
                onClick={handleClose}
              />
            </div>
            <div className="modal-body">
              <Formik
                initialValues={{ name: currentChannel.name }}
                onSubmit={handleSubmit}
              >
                {({ values, handleChange }) => (
                  <Form>
                    <div>
                      <Field
                        name="name"
                        id="name"
                        className={cn('mb-2', 'form-control', { 'is-invalid': !valid })}
                        value={values.name}
                        onChange={handleChange}
                      />
                      <label className="visually-hidden" htmlFor="name">{t('channelName')}</label>
                      <div className="invalid-feedback">{error}</div>
                      <div className="d-flex justify-content-end">
                        <button
                          type="button"
                          className="me-2 btn btn-secondary"
                          onClick={handleClose}
                        >
                          {t('cancel')}
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

export default ModalRename;
