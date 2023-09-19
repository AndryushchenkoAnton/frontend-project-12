import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { actions as modalActions } from '../../slices/modalSlice';
import { useSocket } from '../../hooks';
import { getModalChId } from '../../selectors';

const ModalDelete = () => {
  const idToDelete = useSelector(getModalChId);
  const dispatch = useDispatch();
  const fadeClass = cn('fade', 'modal-backdrop', 'show');
  const dialogClass = cn('fade', 'modal', 'show');
  const { t } = useTranslation();
  const { emitDeleteChannel } = useSocket();
  const handleClose = () => dispatch(modalActions.closeModal());
  const deleteHandler = (id) => () => {
    emitDeleteChannel(id);
    toast.success(t('channelDeleted'), { autoClose: 5000 });
    handleClose();
  };

  return (
    <>
      <div className={fadeClass} />
      <div
        role="dialog"
        aria-modal="true"
        className={dialogClass}
        tabIndex="-1"
        style={{ 'padding-left': '22px', display: 'block' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{t('deleteChannel')}</div>
              <button
                type="button"
                aria-label="Close"
                onClick={handleClose}
                data-bs-dismiss="modal"
                className="btn btn-close"
              />
            </div>
            <div className="modal-body">
              <p className="lead">{t('deleteConfirmation')}</p>
              <div className="d-flex justify-content-end">
                <button type="button" className="me-2 btn btn-secondary" onClick={handleClose}>{t('cancel')}</button>
                <button type="button" className="btn btn-danger" onClick={deleteHandler(idToDelete)}>{t('deleteAction')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDelete;
