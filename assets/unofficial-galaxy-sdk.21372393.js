function x({acceptedOrigins:i,supportsSaving:$,supportsSaveManager:y,ignoreApiVersion:b,onLoggedInChanged:k}){return new Promise((j,v)=>{var w;if(i=(w=i==null?void 0:i.map(t=>t.replace(/\/?$/,"/")))!=null?w:["https://galaxy.click/"],i.includes(document.referrer.replace(/\/?$/,"/"))){let t,d;const c={},g={},s={acceptedOrigins:i,supportsSaving:$,supportsSaveManager:y,ignoreApiVersion:b,onLoggedInChanged:k,origin:document.referrer.replace(/\/?$/,"/"),apiVersion:0,loggedIn:!1,postMessage:function(e){var n;(n=window.top)==null||n.postMessage(e,s.origin)},getSaveList:function(){return t!=null||d!=null?Promise.reject("save_list action already in progress."):(s.postMessage({action:"save_list"}),new Promise((e,n)=>{t=e,d=n}))},save:function(e,n,l){return e in c?Promise.reject(`save action for slot ${e} already in progress.`):(s.postMessage({action:"save",slot:e,data:n,label:l}),new Promise((u,p)=>{c[e]={accept:u,reject:p}}))},load:function(e){return e in g?Promise.reject(`load action for slot ${e} already in progress.`):(s.postMessage({action:"load",slot:e}),new Promise((n,l)=>{g[e]={accept:n,reject:l}}))}};window.addEventListener("message",e=>{var n,l,u,p,P;if(e.origin.replace(/\/?$/,"/")===s.origin.replace(/\/?$/,"/")){console.log("Received message from Galaxy",e.data);const f=e.data;switch(f.type){case"info":{const{galaxy:r,api_version:a,logged_in:o}=f;if(a!==1&&s.ignoreApiVersion!==!0)v(`API version not recognized: ${a}`);else{const m=s.apiVersion===0;s.apiVersion=a,s.loggedIn=o,s.origin=e.origin,m?j(s):(n=s.onLoggedInChanged)==null||n.call(s,s)}break}case"save_list":{const{list:r,error:a,message:o}=f;a===!0?d(o):t(r),t=d=null;break}case"save_content":{const{content:r,label:a,slot:o,error:m,message:_}=f;m===!0?(l=g[o])==null||l.reject(_):(u=g[o])==null||u.accept({slot:o,content:r,label:a}),delete g[o];break}case"saved":{const{slot:r,error:a,message:o}=f;a===!0?(p=c[r])==null||p.reject(o):(P=c[r])==null||P.accept(r),delete c[r];break}}}})}else v(`Project is not running on an accepted origin: ${window.origin}`)})}export{x as i};
