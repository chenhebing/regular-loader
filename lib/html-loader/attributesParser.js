/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
const Parser = require( 'fastparse' )

const processMatch = function ( match, strUntilValue, name, value, index ) {
  if ( !this.isRelevantTagAttr( this.currentTag, name ) ) {
    return
  }
  this.results.push( {
    start: index + strUntilValue.length,
    length: value.length,
    value: value
  } )
}

const parser = new Parser( {
  outside: {
    '<!--.*?-->': true,
    '<![CDATA[.*?]]>': true,
    '<[!\\?].*?>': true,
    '</[^>]+>': true, // eslint-disable-line
    '<([a-zA-Z\\-:]+)\\s*': function ( match, tagName ) {
      this.currentTag = tagName
      return 'inside'
    }
  },
  /* eslint-disable */
  inside: {
    '\\s+': true, // eat up whitespace
    '>': 'outside', // end of attributes
    '(([0-9a-zA-Z\\-:.]+)\\s*=\\s*")([^"]*)"': processMatch,
    "(([0-9a-zA-Z\\-:.]+)\\s*=\\s*')([^']*)'": processMatch,
    '(([0-9a-zA-Z\\-:.]+)\\s*=\\s*)([^\\s>]+)': processMatch
  }
  /* eslint-enable */
} )

module.exports = function parse( html, isRelevantTagAttr ) {
  return parser.parse( 'outside', html, {
    currentTag: null,
    results: [],
    isRelevantTagAttr: isRelevantTagAttr
  } ).results
}
