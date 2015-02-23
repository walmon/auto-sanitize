var should = require('chai').should(),
  expect=require('chai').expect,
    sanitizer = require('../index'),
    sanitizeObject = sanitizer.sanitizeObject;


describe('#sanitizeObject', function() {
  it('sanitize simple entity', 
    function(){
      expect(sanitizeObject({ name:'<script>alert("alert")</script>holi'}))
      .to.eql({name:'holi'});
    });
  it('sanitize 2 properties', 
    function(){
      expect(sanitizeObject({ name:'<script>alert("alert")</script>Costa', lastname:'Rica'}))
      .to.eql({name:'Costa', lastname:'Rica'});
    });

  it('sanitize array of object', 
    function(){
      expect(sanitizeObject([{ name:'<script>alert("alert")</script>Costa', lastname:'Rica'},{ name:'<script>alert("alert")</script>Costa', lastname:'Rica'},{ name:'<script>alert("alert")</script>Costa', lastname:'Rica'}]))
      .to.eql([{name:'Costa', lastname:'Rica'},{name:'Costa', lastname:'Rica'},{name:'Costa', lastname:'Rica'}]);
    });
  it('sanitize array of object - complex 1', 
    function(){
      expect(sanitizeObject({ name:'Walter<script>alert("alert")</script>' },[
        { 
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
        }]))
      .to.eql(
        { name:'Walter' },[
        { 
          name:'Costa', 
          lastname:'Rica',
          provinces:[
            { id: 0, name:'San Jose', population:288054},
            { id: 1, name:'Cartago'},
            { id: 2, name:'Alajuela'},
            { id: 3, name:'Heredia'},
            { id: 4, name:'Limon'},
            { id: 5, name:'Guanacaste'},
            { id: 6, name:'Puntarenas'},
          ]
        },{ 
          name:'Costa', 
          lastname:'Rica'
        },{ 
          name:'Costa', 
          lastname:'Rica'
        }]);
    });
});