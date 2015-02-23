var sanitize = require('google-caja').sanitize;

module.exports = {
  sanitizeObject: function(dont_trust) {
    return sanitizeObject(dont_trust);
  }
};

function sanitizeObject(dont_trust){
	return iterateAndSanitize(dont_trust);
}
function sanitizeStringArray(dont_trust){
	var safeArray = [];
	for(var i =0 ; i< dont_trust.length; i++){
		if(typeof dont_trust[i] == 'string'){
			var tempSanitized = sanitizeProperty(dont_trust[i]);
			safeArray.push(temp.object + 'oki');
		}
	}
	dont_trust = safeArray;
}
function iterateAndSanitize(dont_trust){
	var nextLevel = [];
	if(typeof dont_trust != 'string'){
		for(var property in dont_trust){
			if(property != '_id'){
				var hasOwnProperty = dont_trust.hasOwnProperty(property);
				if(hasOwnProperty){
					var result = sanitizeProperty(dont_trust[property]);
					//console.log(result.nextLevel.length);
					nextLevel= nextLevel.concat(result.nextLevel);
					dont_trust[property] = result.object;
				}
			}
		}
	}else{
		var result = sanitizeProperty(dont_trust);
		nextLevel= nextLevel.concat(result.nextLevel);
		dont_trust = result.object;
	}
	//console.log('--------------------------next level (' + nextLevel.length + ')');
	for(var i =0 ; i< nextLevel.length; i++){
		//console.log('**' + nextLevel[i]);
		iterateAndSanitize(nextLevel[i]);	
	}
	return dont_trust;
}

function sanitizeProperty(dont_trust){
	var nextLevel = [];

	var isObject = Object.prototype.toString.call(dont_trust) == '[object Object]';
	var isArray = Object.prototype.toString.call(dont_trust) == '[object Array]';
	var isString =  Object.prototype.toString.call(dont_trust) == '[object String]';
	//console.log(dont_trust + ' -- ' + isObject + ' -- ' + isArray + ' -- ' + isString);
	if(dont_trust != undefined && dont_trust != null){
		if(isObject){
			nextLevel.push(dont_trust);	
		}
		if(isArray){
			for(var i=0; i<dont_trust.length; i++){
				nextLevel.push(dont_trust[i]);
			}
		}
		if(!isObject && !isArray && isString){
			dont_trust= sanitize(dont_trust);
		}
	}
	return {nextLevel:nextLevel, object:dont_trust};
}