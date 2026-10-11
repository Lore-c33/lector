// Sirve los datos de idioma desde un script propio, porque la pagina no puede publicar archivos .gz.
const realFetch=self.fetch.bind(self);
self.fetch=function(url,opts){
  if(/spa\.traineddata(\.gz)?$/.test(String(url))){
    if(!self.__spaData) importScripts('spa-data.js');
    const bin=atob(self.__spaData), data=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++) data[i]=bin.charCodeAt(i);
    self.__spaData=null;
    return Promise.resolve(new Response(data,{status:200}));
  }
  return realFetch(url,opts);
};
importScripts('worker.min.js');
