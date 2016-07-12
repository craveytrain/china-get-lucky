"use latest";

const cheerio = require( 'cheerio' );
const request = require( 'request-promise' );

module.exports = ( context, req, res ) => {

    request( {
            uri: 'https://www.google.com/doodles',
            transform: body => cheerio.load( body )
        } )
        .then( $ => {
            let img = $( '.latest-doodle img' )
                .eq( 0 );

            return {
                imgUrl: img.attr( 'src' ),
                imgTitle: img.attr( 'alt' )
            };
        } )
        .then( img => {
            return request( {
                    uri: 'https:' + img.imgUrl,
                    resolveWithFullResponse: true,
                    encoding: null
                } )
                .then( response => {

                    img.data = "data:" + response.headers[ "content-type" ] + ";base64," + new Buffer( response.body )
                        .toString( 'base64' );

                    return img;
                } )
        } )
        .then( img => {

            res.writeHead( 200, {
                'Content-Type': 'text/html'
            } );
            res.end( `
            <html>
                <h1>${img.imgTitle}</h1>
                <img src="${img.data}" alt="${img.imgTitle}" />
            </html>
        ` );
    } )
    .catch( ( err ) => {
        console.error( err.stack );
        res.writeHead( 500 );
        res.end( 'Something broke!' );
    } );
}
