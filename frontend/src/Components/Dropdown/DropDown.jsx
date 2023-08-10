import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import DropdownToggle from "react-bootstrap/DropdownToggle";

const DropDownChannel = ({ name, id, handleClick, currentChannelId, handleDeleteClick, handleChIdToAction, handleRenameClick }) => {

    const variant = id === currentChannelId ? 'secondary' : 'light';
    const { t } = useTranslation();
    return (
        <Dropdown className="d-flex btn-group" as={ButtonGroup} onClick={() => handleChIdToAction(id)}>
            <Button
                variant={variant}
                className="w-100 rounded-0 text-start text-truncate btn"
                onClick={() => handleClick(id)}
            >
                <span className="me-1">#</span>
                {name}
            </Button>
            <DropdownToggle variant={variant}>
              <span className="visually-hidden">Управление каналом</span>
            </DropdownToggle  >

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
