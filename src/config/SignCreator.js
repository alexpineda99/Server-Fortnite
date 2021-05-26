var anysize = 32;//the size of string 
var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; //from where to create
var i=0, ret='';
while(i++<anysize)
  ret += charset.charAt(Math.random() * charset.length)
  
console.log(ret);