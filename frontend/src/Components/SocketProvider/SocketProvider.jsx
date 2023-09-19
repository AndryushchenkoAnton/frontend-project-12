import React from 'react';
import SocketContext from '../../contexts/socketContext.js';

const SocketProvider = ({ socket, children }) => {
  const emitMessage = async (value, currentChannel, name) => {
    await socket.emit('newMessage', { body: value, channelId: currentChannel, username: name }, (response) => {
      console.log(response.status);
    });
  };
  const emitNewChannel = async (value, username) => {
    await socket.emit('newChannel', { name: value, userName: username }, (response) => {
      console.log(response.status);
    });
  };
  const emitRenameChannel = async (value, id) => {
    await socket.emit('renameChannel', { id, name: value }, (response) => {
      console.log(response.status);
    });
  };

  const emitDeleteChannel = async (id) => {
    await socket.emit('removeChannel', { id }, (response) => {
      console.log(response.status);
    });
  };

  return (
    <SocketContext.Provider value={{
      emitMessage, emitNewChannel, emitDeleteChannel, emitRenameChannel,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
