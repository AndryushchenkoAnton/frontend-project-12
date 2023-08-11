import React from 'react';
import './Modal.scss';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const ModalDelete = (props) => {
  const {
    show, closeHandler, idToDelete, socket, setDefaultChannel, currentChannel,
  } = props;
  const fadeClass = cn('fade', 'modal-backdrop', { show });
  const dialogClass = cn('fade', 'modal', { show });
  const { t } = useTranslation();
  const deleteHandler = (id) => () => {
    socket.emit('removeChannel', { id });
    if (currentChannel === id) {
      setDefaultChannel();
    }
    toast.success(t('channelDeleted'), { autoClose: 5000 });
    closeHandler();
  };

  return (
    <>
      <div className={fadeClass} />
      <div
        role="dialog"
        aria-modal={show}
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
                onClick={closeHandler}
                data-bs-dismiss="modal"
                className="btn btn-close"
              />
            </div>
            <div className="modal-body">
              <p className="lead">{t('deleteConfirmation')}</p>
              <div className="d-flex justify-content-end">
                <button type="button" className="me-2 btn btn-secondary" onClick={closeHandler}>{t('cancel')}</button>
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
