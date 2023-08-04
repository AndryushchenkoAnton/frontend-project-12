import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';


const DropDownChannel = ({ name, id, handleClick, currentChannelId, handleDeleteClick, handleChIdToAction, handleRenameClick }) => {

    const variant = id === currentChannelId ? 'secondary' : 'light';
    handleChIdToAction(id);
    return (
        <Dropdown className="d-flex btn-group" as={ButtonGroup}>
            <Button
                variant={variant}
                className="w-100 rounded-0 text-start text-truncate btn"
                onClick={() => handleClick(id)}
            >
                <span className="me-1">#</span>
                {name}
            </Button>
            <Dropdown.Toggle variant={variant} />

            <Dropdown.Menu>
                <Dropdown.Item onClick={handleDeleteClick}>
                   Удалить
                </Dropdown.Item>
                <Dropdown.Item onClick={handleRenameClick}>
                    Переименовать
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropDownChannel;