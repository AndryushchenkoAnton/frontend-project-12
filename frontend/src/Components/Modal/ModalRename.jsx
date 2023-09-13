import React, { useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { getChannels, getChannelById, getModalChId } from '../../selectors';
import { actions as modalActions } from '../../slices/modalSlice';
import { useSocket } from '../../hooks';

const ModalRename = () => {
  const { t } = useTranslation();
  const id = getModalChId();
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(modalActions.closeModal());
  };
  const { emitRenameChannel } = useSocket();
  const firstModalDiv = cn('fade', 'modal-backdrop', 'show');
  const secondModalDiv = cn('fade', 'modal', 'show');
  const channels = getChannels();
  const currentChannel = getChannelById(id);
  const names = channels.map((channel) => channel.name);
  const renameSchema = yup.object().shape({
    name: yup.string()
      .required('usernameLength')
      .min(3, 'usernameLength')
      .max(20, 'usernameLength')
      .notOneOf(names, 'mustBeUniq'),
  });

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
                validationSchema={renameSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={async ({ name }) => {
                  try {
                    emitRenameChannel(name, id);
                    handleClose();
                    toast.success(t('channelRenamed'), { autoClose: 5000 });
                  } catch (e) {
                    toast(t('networkError'));
                  }
                }}
              >
                {({ values, handleChange, errors }) => (
                  <Form>
                    <div>
                      <Field
                        name="name"
                        id="name"
                        className={cn('mb-2', 'form-control', { 'is-invalid': errors.name })}
                        value={values.name}
                        onChange={handleChange}
                      />
                      <label className="visually-hidden" htmlFor="name">{t('channelName')}</label>
                      <div className="invalid-feedback">{errors ? t(errors.name) : null}</div>
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
