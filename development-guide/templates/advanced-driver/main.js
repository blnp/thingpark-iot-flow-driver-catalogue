var driver;(()=>{var e={980:(e,r)=>{r.readShort=function(e){var r=65535&e;return 32768&r&&(r=-(65536-r)),r}}},r={};var o,n,t={};o=t,n=function i(o){var n=r[o];if(void 0!==n)return n.exports;var t=r[o]={exports:{}};return e[o](t,t.exports,i),t.exports}(980),o.decodeUplink=function(e){var r={},o=e.bytes;if(o.length>8)throw new Error("Invalid uplink payload: length exceeds 8 bytes");for(i=0;i<o.length;i++)switch(o[i]){case 0:if(o.length<i+3)throw new Error("Invalid uplink payload: index out of bounds when reading temperature");var t=o[i+1]<<8|o[i+2];t=n.readShort(t),r.temp=t/100,i+=2;break;case 1:if(o.length<i+3)throw new Error("Invalid uplink payload: index out of bounds when reading humidity");t=o[i+1]<<8|o[i+2],t=n.readShort(t),r.humidity=t/100,i+=2;break;case 2:r.pulseCounter=o[i+1],i+=1;break;case 3:r.volumes=[];var a=n.readShort(o[i+1]);r.volumes.push({time:new Date("2020-08-02T20:00:00.000+05:00").toISOString(),volume:a});var u=n.readShort(o[i+2]);r.volumes.push({time:new Date("2020-08-02T21:00:00.000+05:00").toISOString(),volume:u}),i+=2;break;case 4:r.longitude=3.56*readShort(o[i+1]),r.latitude=12.56*readShort(o[i+2]),i+=2;break;default:throw new Error("Invalid uplink payload: unknown id '"+o[i]+"'")}return r},o.decodeDownlink=function(e){var r={},o=e.bytes;for(i=0;i<o.length;i+=2)switch(o[i]){case 0:if(o.length<i+2)throw new Error("Invalid downlink payload: index out of bounds when reading pulseCounterThreshold");r.pulseCounterThreshold=o[i+1];break;case 1:if(o.length<i+2)throw new Error("Invalid downlink payload: index out of bounds when reading alarm");r.alarm=1===o[i+1];break;default:throw new Error("Invalid downlink payload: unknown id '"+o[i]+"'")}return r},o.encodeDownlink=function(e){var r={},i=[];if(void 0!==e.pulseCounterThreshold){if(e.pulseCounterThreshold>255)throw new Error("Invalid downlink: pulseCounterThreshold cannot exceed 255");i.push(0),i.push(e.pulseCounterThreshold)}return void 0!==e.alarm&&(i.push(1),e.alarm?i.push(1):i.push(0)),r.bytes=i,r.fPort=16,r},o.extractPoints=function(e){var r={};void 0!==e.message.temp&&(r.temperature=e.message.temp),void 0!==e.message.humidity&&(r.humidity=e.message.humidity),void 0!==e.message.pulseCounter&&(r.pulseCounter=e.message.pulseCounter),void 0!==e.message.humidity&&(r.airHumidity=e.message.humidity);let i=e.message.volumes;return void 0!==i&&(r.volume=[],i.forEach((e=>{r.volume.push({eventTime:e.time,value:e.volume})}))),void 0!==e.message.longitude&&void 0!==e.message.latitude&&(r.location=[e.message.longitude,e.message.latitude]),r},driver=t})();