const request = require('request');

class ElasticMail {

  constructor( apiKey, apiURI, config ) {
    this.defaultConfig = {
      apiKey : apiKey,
      isTransactional : true,
    };

    this.apiKey = apiKey;
    this.apiURI = apiURI || 'https://api.elasticemail.com/v2';
    this.setConfig( config );
  }

  post( path, options, attachments ) {
    return new Promise( ( resolve, reject ) => {
      const req = request.post( this.apiURI + path, ( err, res, body ) => {
        if ( err ) {
          reject( err );
        } 
        resolve( body );
      } );

      const form = req.form();

      for ( let key in options ) {
        form.append( key, String( options[ key ] ) );
      }

      if ( attachments && attachments.length > 0 ) {
        attachments.forEach( attachment => {
          form.append( 'file', attachment.data, {
            filename : attachment.filename,
            contentType : attachment.contentType || 'text/plain'
          } );
        } );
      }
    } ); 
  }

  setConfig( options ) {
    this.config = Object.assign( this.defaultConfig, options );
  }
  
  send( params, attachments ) {
    return this.post( '/email/send', Object.assign( this.config, params ), attachments );
  }
}

module.exports = ElasticMail;