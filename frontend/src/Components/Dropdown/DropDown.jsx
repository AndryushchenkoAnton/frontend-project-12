import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import { useDispatch } from 'react-redux';
import { actions as channelsActions } from '../../slices/channelsSlice';

const DropDownChannel = ({
  name, id, handleClick, currentChannelId, handleDeleteClick, handleRenameClick,
}) => {
  const variant = id === currentChannelId ? 'secondary' : 'light';
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <Dropdown className="d-flex btn-group" as={ButtonGroup} onClick={() => dispatch(channelsActions.changeActionChannelId(id))}>
      <Button
        variant={variant}
        className="w-100 rounded-0 text-start text-truncate btn"
        onClick={() => handleClick(id)}
      >
        <span className="me-1">#</span>
        {name}
      </Button>
      <DropdownToggle variant={variant}>
        <span className="visually-hidden">{t('channelManagingTools')}</span>
      </DropdownToggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleDeleteClick}>
          {t('deleteAction')}
        </Dropdown.Item>
        <Dropdown.Item onClick={handleRenameClick}>
          {t('renameAction')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownChannel;
