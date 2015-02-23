# auto-sanitize
Implementation of google-caja, helps to sanitize objects by a single call of a function

## Instalation
	
	npm install auto-sanitize --save


## Usage

	var sanitizer = require('auto-sanitize'),
    	sanitizeObject = sanitizer.sanitizeObject;

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
    console.log('should not trust in this: ' + dont_trust_object+' should trust in this: ' +  sanitized_object);

 ## Tests

 	npm test


 ## Release History

* 0.1.2 Initial release