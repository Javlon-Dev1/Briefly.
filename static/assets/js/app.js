// Til tarjimasi endi Django tomonida ({% trans %} + set_language) amalga oshadi,
// shu sababli bu yerda avval bo'lgan `translations` obyekti va `applyLanguage()` kerak emas.
// `.language-menu` ochilishi/yopilishi endi <details>/<summary> orqali brauzerning
// o'zi tomonidan boshqariladi — shuning uchun bu yerda alohida toggle logikasi ham kerak emas.

const setTheme = theme => {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark', isDark);
  document.body.classList.toggle('light', !isDark);
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  localStorage.setItem('briefly-theme', isDark ? 'dark' : 'light');
};

const savedTheme = localStorage.getItem('briefly-theme');
const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (document.body) {
  setTheme(initialTheme);
  document.querySelectorAll('.theme-toggle').forEach(button => {
    button.addEventListener('click', () => {
      setTheme(document.body.classList.contains('dark') ? 'light' : 'dark');
    });
  });
}

document.querySelectorAll('[data-google]').forEach(button=>button.addEventListener('click',()=>{const message=document.querySelector('.form-message');if(message)message.textContent=button.dataset.message||'';}));

// Parolni ko'rsatish/yashirish tugmasi
document.querySelectorAll('.password-toggle').forEach(button=>{
  button.addEventListener('click',()=>{
    const input=document.getElementById(button.dataset.target);
    if(!input)return;
    const show=input.type==='password';
    input.type=show?'text':'password';
    button.setAttribute('aria-pressed',show?'true':'false');
    button.setAttribute('aria-label',show?(button.dataset.hideLabel||'Hide password'):(button.dataset.showLabel||'Show password'));
  });
});

// Profil menyusi (avatar) ochish/yopish
document.querySelectorAll('.profile-menu').forEach(menu=>{
  const trigger=menu.querySelector('.profile-avatar');
  if(!trigger)return;
  trigger.addEventListener('click',event=>{
    event.stopPropagation();
    const isOpen=menu.getAttribute('data-open')==='true';
    document.querySelectorAll('.profile-menu[data-open="true"]').forEach(m=>m.setAttribute('data-open','false'));
    menu.setAttribute('data-open',isOpen?'false':'true');
  });
});
document.addEventListener('click',()=>{
  document.querySelectorAll('.profile-menu[data-open="true"]').forEach(m=>m.setAttribute('data-open','false'));
});

// Gravatar: email orqali profil rasmini yuklash (MD5 hash — faqat frontendda hisoblanadi)
function md5(str){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]|(G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/\r\n/g,"\n");var d="";for(var F=0;F<k.length;F++){var e=k.charCodeAt(F);if(e<128){d+=String.fromCharCode(e)}else if(e>127&&e<2048){d+=String.fromCharCode((e>>6)|192);d+=String.fromCharCode((e&63)|128)}else{d+=String.fromCharCode((e>>12)|224);d+=String.fromCharCode(((e>>6)&63)|128);d+=String.fromCharCode((e&63)|128)}}return d}var C=[];var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,k=23;var j=6,i=10,U=15,T=21;str=J(str);C=e(str);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],k,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],k,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],k,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],k,3299628645);Y=t(Y,X,W,V,C[P+0],j,4096336452);V=t(V,Y,X,W,C[P+7],i,1126891415);W=t(W,V,Y,X,C[P+14],U,2878612391);X=t(X,W,V,Y,C[P+5],T,4237533241);Y=t(Y,X,W,V,C[P+12],j,1700485571);V=t(V,Y,X,W,C[P+3],i,2399980690);W=t(W,V,Y,X,C[P+10],U,4293915773);X=t(X,W,V,Y,C[P+1],T,2240044497);Y=t(Y,X,W,V,C[P+8],j,1873313359);V=t(V,Y,X,W,C[P+15],i,4264355552);W=t(W,V,Y,X,C[P+6],U,2734768916);X=t(X,W,V,Y,C[P+13],T,1309151649);Y=t(Y,X,W,V,C[P+4],j,4149444226);V=t(V,Y,X,W,C[P+11],i,3174756917);W=t(W,V,Y,X,C[P+2],U,718787259);X=t(X,W,V,Y,C[P+9],T,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}return(B(Y)+B(X)+B(W)+B(V)).toLowerCase()}
document.querySelectorAll('.avatar-img').forEach(img=>{
  if (img.dataset.provider === 'google') return;

  const email=(img.dataset.email||'').trim().toLowerCase();
  const hash=email?md5(email):'00000000000000000000000000000000';
  img.src='https://www.gravatar.com/avatar/'+hash+'?d=mp&s=80';
});
