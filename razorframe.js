const socket = io();

const rz = {
  publish: (contents, action, eventOut) => {
    let MSG;

    // 'contents' can either be the payload OR an object containing the necessary elements
    // i.e. contents = { content: 'abc', action: 'write', eventOut: 'chatBack' }
    if (typeof contents === 'object' && contents.contents) MSG = contents;
    else MSG = { contents, action, eventOut }

    socket.emit('msgSent', MSG);
  },

  subscribe: (event, callback) => {
    socket.on(event, callback);
  }
}