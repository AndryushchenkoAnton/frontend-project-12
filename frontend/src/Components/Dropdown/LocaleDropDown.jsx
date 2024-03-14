import React from 'react';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getCurrentLang } from '../../selectors';
import { actions as modalActions } from '../../slices/modalSlice.js';

const LocaleDropDown = () => {
  const language = useSelector(getCurrentLang);
  const { i18n } = useTranslation();
  const langList = {
    ru: 'Russian',
    en: 'English',
  };
  const dispatch = useDispatch();
  return (
    <div>
      <Form>
        <Dropdown
          onSelect={(eventKey) => {
            console.log(eventKey);
            i18n.changeLanguage(eventKey).then(() => dispatch(modalActions.changeLang(eventKey)))
              .catch((e) => console.log(e));
          }}
        >
          <Dropdown.Toggle
            variant="rimary"
            id="dropdown-flags"
            className="text-left"
            style={{ width: 150 }}
          >
            {langList[language]}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="ru">{langList.ru}</Dropdown.Item>
            <Dropdown.Item eventKey="en">{langList.en}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Form>
    </div>
  );
};

export default LocaleDropDown;
