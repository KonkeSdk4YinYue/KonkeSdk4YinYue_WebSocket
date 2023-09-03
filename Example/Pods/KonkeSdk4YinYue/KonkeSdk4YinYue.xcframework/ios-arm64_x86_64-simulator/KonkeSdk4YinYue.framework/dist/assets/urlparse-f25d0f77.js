function s(r){let t={};if(r.indexOf("?")<0)return t;r=r.split("?")[1];let a=r.split("&");for(let e=0;e<a.length;e++){let l=a[e].split("=");t[l[0]]=l[1]}return t}export{s as g};
