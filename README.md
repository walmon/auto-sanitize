# auto-sanitize
Implementation of google-caja, helps to sanitize objects by a single call of a function

## Instalation
	
	npm install auto-sanitize --save


## Usage

	// 'util' is just for you to see the contents of
	// the objects, we don't actually need it to work
	var util = require('util'),
	sanitizer = require('auto-sanitize').sanitizeObject;

	var dont_trust_object = 
		[{ 
          name:'<script>alert("alert")</script>Costa', 
          lastname:'Rica',
          provinces:[
            { id: 0, name:'San Jose', population:288054},
            { id: 1, name:'<script>alert("alert")</script>Cartago'},
            { id: 2, name:'Al<script>alert("alert")</script>ajuela'},
            { id: 3, name:'Heredia'},
            { id: 4, name:'<script>alert("alert")</script>Limon'},
            { id: 5, name:'<script>alert("alert")</script>Guanacaste<script>alert("alert")</script><script>alert("alert")</script>'},
            { id: 6, name:'Puntaren<script>alert("alert")</script>as'},
          ]
        },{ 
          name:'<script>alert("alert")</script>Costa', 
          lastname:'Rica'
        },{ 
          name:'<script>alert("alert")</script>Costa', 
          lastname:'Rica'
        }];
    console.log('--should not trust in this: \n' + util.inspect(dont_trust_object, false, null));

    var sanitized_object = sanitizer(dont_trust_object);

    console.log('--should trust in this: \n' + util.inspect( sanitized_object,false, null));

 ## Tests

 	npm test


 ## Release History

* 0.1.3 Initial release