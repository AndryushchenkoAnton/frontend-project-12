import React from 'react';
import { Field, Form, Formik } from 'formik';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useAuth, useSocket } from '../../hooks';
import { getChannels } from '../../selectors';
import { actions as modalActions } from '../../slices/modalSlice.js';

const ModalAdd = (props) => {
  const { t } = useTranslation();
  const { getUsername } = useAuth();
  const dispatch = useDispatch();
  const {
    socket,
  } = props;
  const { emitNewChannel } = useSocket();
  const firstModalDiv = cn('fade', 'modal-backdrop', 'show');
  const secondModalDiv = cn('fade', 'modal', 'show');
  const channels = getChannels();
  const names = channels.map((channel) => channel.name);
  const handleClose = () => dispatch(modalActions.closeModal());
  const addSchema = yup.object().shape({
    name: yup.string()
      .required('usernameLength')
      .min(3, 'usernameLength')
      .max(20, 'usernameLength')
      .notOneOf(names, 'mustBeUniq'),
  });

  return (
    <>
      <div className={firstModalDiv} />
      <div role="dialog" aria-modal="true" className={secondModalDiv} tabIndex="-1" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{t('addChannel')}</div>
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
                initialValues={{ name: '' }}
                validationSchema={addSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={async ({ name }) => {
                  try {
                    emitNewChannel(name, getUsername())
                    handleClose();
                    toast.success(t('channelAdded'), { autoClose: 5000 });
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
                        autoFocus
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

export default ModalAdd;
