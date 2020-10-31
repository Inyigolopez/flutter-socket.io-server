const { io } = require('../index');

const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand( new Band( 'Queen') );
bands.addBand( new Band( 'The Killers') );
bands.addBand( new Band( 'King of Leon') );
bands.addBand( new Band( 'Maroon 5') );


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente Conectado');

    client.emit('active-bands', bands.getBands() );

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje!!!', payload);
        io.emit('mensaje', { admin: 'Nuevo mensaje'});
    });

    client.on('vote-band', ( payload ) => {
        bands.voteBand( payload.id );
        io.emit('active-bands', bands.getBands() );
    });

    client.on('add-band', ( payload ) => {        
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands() );
    });

    client.on('delete-band', ( payload ) => { 
        bands.deleteBand( payload.id );
        io.emit('active-bands', bands.getBands() );
    }); 
    

    // client.on('emitir-mensaje', ( payload ) => {
    //     // io.emit('nuevo-mensaje', 'HEY ', payload,'!!!'); //emite a todos 
    //     client.broadcast.emit('nuevo-mensaje',  payload ); //emite a todos menos al emisor
    // });


});