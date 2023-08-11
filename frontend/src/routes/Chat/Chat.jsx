import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import axios from 'axios';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { Field, Form, Formik } from 'formik';
import { actions as channelsActions, selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import { actions as messagesActions, selectors as messagesSelectors } from '../../slices/messagesSlice.js';
import './Chat.scss';
import ModalAdd from '../../Components/Modal/ModalAdd.jsx';
import ModalDelete from '../../Components/Modal/ModalDelete.jsx';
import DropDownChannel from '../../Components/Dropdown/DropDown.jsx';
import ModalRename from '../../Components/Modal/ModalRename';
import useAuth from '../../Hooks/index.js';
import 'react-toastify/dist/ReactToastify.css';

const Chat = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const { socket } = store.getState().socket;
  const { logStatus, logOut } = useAuth();
  const { t } = useTranslation();
  const messagesStorage = useSelector(messagesSelectors.selectAll);
  const [currentChannelId, setNewChannelId] = useState(1);
  // Modal
  const [showed, setShow] = useState(false);
  const show = () => setShow(true);
  const close = () => setShow(false);
  const [modalAdd, setModalAdd] = useState(false);

  const showAdd = () => {
    show();
    setModalAdd(true);
  };
  const closeAdd = () => {
    close();
    setModalAdd(false);
  };
  const [modalChId, setChId] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const showDelete = () => {
    show();
    setModalDelete(true);
  };
  const closeDelete = () => {
    close();
    setChId(null);
    setModalDelete(false);
  };
  const [modalRename, setModalRename] = useState(false);
  const closeRename = () => {
    close();
    setChId(null);
    setModalRename(false);
  };
  const showRename = () => {
    show();
    setModalRename(true);
  };
  // Modal

  // socket.on
  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    dispatch(channelsActions.addChannel(payload));
    setNewChannelId(payload.id);
  });
  socket.on('removeChannel', ({ id }) => {
    dispatch(channelsActions.removeChannel(id));
  });
  socket.on('renameChannel', (payload) => {
    dispatch(channelsActions.renameChannel({ id: payload.id, changes: payload }));
  });
  // socket.on

  const Token = localStorage.getItem('Token');

  const channelsStorage = Object.values(useSelector(channelsSelectors.selectEntities));

  const changeChannelHandler = (id) => () => {
    const newCurrentChannel = channelsStorage.find((channel) => channel.id === id);
    setNewChannelId(newCurrentChannel.id);
  };

  const getChatData = async (token) => {
    const response = await axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { messages, channels } = response.data;
    dispatch(channelsActions.addChannels(channels));
    dispatch(messagesActions.addMessages(messages));
  };

  useEffect(() => {
    getChatData(Token);
  }, []);

  const renderedChannels = channelsStorage.map((channel) => {
    const classNameLi = cn('w-100', 'rounded-0', 'text-start', 'btn', { 'btn-secondary': currentChannelId === channel.id });
    if (!channel.removable) {
      return (
        <li className="nav-item w-100">
          <button onClick={changeChannelHandler(channel.id)} type="button" className={classNameLi}>
            <span className="me-1">#</span>
            {channel.name}
          </button>
        </li>
      );
    }
    return (
      <DropDownChannel
        name={channel.name}
        id={channel.id}
        key={channel.id}
        currentChannelId={currentChannelId}
        handleClick={changeChannelHandler(channel.id)}
        handleDeleteClick={showDelete}
        handleChIdToAction={setChId}
        handleRenameClick={showRename}
      />
    );
  });

  const renderedMessages = Object.values(useSelector(messagesSelectors.selectEntities))
    .filter((message) => message.channelId === currentChannelId)
    .map((message) => {
      const { body, username } = message;
      return (
        <div key={message.id} className="text-break mb-2">
          <b>{username}</b>
          :
          {leoProfanity.clean(body)}
        </div>
      );
    });

  useEffect(() => {
    if (showed) {
      document.body.classList.add('modal-open');
      document.body.setAttribute('data-rr-ui-modal-open', true);
      return;
    }
    document.body.removeAttribute('data-rr-ui-modal-open');
    document.body.classList.remove('modal-open');
    console.log(messagesStorage);
  }, [currentChannelId, showed]);

  return (
    <>
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
              <div className="container">
                <a className="navbar-brand" href="/">Hexlet Chat</a>
                {logStatus ? <button type="button" className="btn btn-primary" onClick={() => logOut()}>{t('logOut')}</button> : null}
              </div>
            </nav>
            <div className="container h-100 my-4 overflow-hidden rounded shadow">
              <div className="row h-100 bg-white flex-md-row">
                <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                  <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                    <b>Каналы</b>
                    <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={showAdd}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                      </svg>
                      <span className="visually-hidden">+</span>
                    </button>
                  </div>
                  <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                    {renderedChannels}
                  </ul>
                </div>
                <div className="col p-0 h-100">
                  <div className="d-flex flex-column h-100">
                    <div className="bg-light mb-4 p-3 shadow-sm small">
                      <p className="m-0">
                        <b># general</b>
                      </p>
                      <span className="text-muted">{t('count_message', { count: messagesStorage.filter((m) => m.channelId === currentChannelId).length })}</span>
                    </div>
                    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                      {renderedMessages}
                    </div>
                    <div className="mt-auto px-5 py-3">
                      <Formik
                        initialValues={{ body: '' }}
                        onSubmit={(values, { resetForm }) => {
                          const name = localStorage.getItem('userName');
                          socket.emit('newMessage', { body: values.body, channelId: currentChannelId, username: name }, (response) => console.log(response));
                          resetForm({ values: '' });
                        }}
                      >
                        {({ values, handleChange }) => (
                          <Form className="py-1 border rounded-2">
                            <div className="input-group has-validation">
                              <Field
                                name="body"
                                aria-label="Новое сообщение"
                                placeholder="Ввведите сообщение..."
                                className="border-0 p-0 ps-2 form-control"
                                value={values.body}
                                onChange={handleChange}
                              />
                              <button
                                type="submit"
                                className="btn btn-gtoup-vertical"
                                disabled={values.body.length === 0}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                                  <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                </svg>
                                <span className="visually-hidden">{t('post')}</span>
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
      {modalDelete
        ? (<ModalDelete
            show={modalDelete}
            closeHandler={closeDelete}
            idToDelete={modalChId}
            currentChannel={currentChannelId}
            socket={socket}
            setDefaultChannel={() => setNewChannelId(1)} />)
        : null}
      {modalAdd ? (<ModalAdd show={showed} handleClose={closeAdd} socket={socket} />) : null}
      {modalRename
        ? (<ModalRename
            show={showed}
            id={modalChId}
            handleClose={closeRename}
            socket={socket}
          />)
        : null}
    </>
  );
};

export default Chat;
