import Server from 'socket.io';

export default function startServer(store) {

  const io = new Server().attach(8090);

  console.log('Listening on port 8090...');

  store.dispatch({
    type: 'SET_ENTRIES',
    entries: require('../entries.json')
  });
  store.dispatch({
    type: 'NEXT'
  });
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', (socket) => {
    socket.emit('state',store.getState().toJS());
    socker.on('action',store.dispatch.bind(store));
  });
}
