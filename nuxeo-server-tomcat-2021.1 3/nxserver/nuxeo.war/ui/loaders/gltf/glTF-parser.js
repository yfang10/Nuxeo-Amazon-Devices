var global=window;!function(e,t){"object"==typeof exports?t(module.exports):"function"==typeof define&&define.amd?define([],(function(){return t(e)})):t(e)}(this,(function(e){"use strict";var t=["extensions","buffers","bufferViews","images","videos","samplers","textures","shaders","programs","techniques","materials","accessors","meshes","cameras","lights","skins","nodes","animations","scenes"],s=Object.create(Object.prototype,{_rootDescription:{value:null,writable:!0},rootDescription:{set:function(e){this._rootDescription=e},get:function(){return this._rootDescription}},baseURL:{value:null,writable:!0},_isAbsolutePath:{value:function(e){var t=new RegExp("^"+window.location.protocol,"i");return!!e.match(t)}},resolvePathIfNeeded:{value:function(e){return this._isAbsolutePath(e)||/^data:/.test(e)?e:this.baseURL+e}},_resolvePathsForCategories:{value:function(e){e.forEach((function(e){var t=this.json[e];t&&Object.keys(t).forEach((function(e){var s=t[e];s.uri=this.resolvePathIfNeeded(s.uri)}),this)}),this)}},_json:{value:null,writable:!0},json:{enumerable:!0,get:function(){return this._json},set:function(e){this._json!==e&&(this._json=e,this._resolvePathsForCategories(["buffers","shaders","images","videos"]))}},_path:{value:null,writable:!0},getEntryDescription:{value:function(e,t){var s,n=t;return(s=this.rootDescription[n])?s?s[e]:null:(console.log("ERROR:CANNOT find expected category named:"+n),null)}},_stepToNextCategory:{value:function(){return this._state.categoryIndex=this.getNextCategoryIndex(this._state.categoryIndex+1),-1!==this._state.categoryIndex&&(this._state.categoryState.index=0,!0)}},_stepToNextDescription:{enumerable:!1,value:function(){var e=this._state.categoryState,t=e.keys;return t?(e.index++,e.keys=null,e.index>=t.length&&this._stepToNextCategory()):(console.log("INCONSISTENCY ERROR"),!1)}},hasCategory:{value:function(e){return!!this.rootDescription[e]}},_handleState:{value:function(){for(var e={buffers:this.handleBuffer,bufferViews:this.handleBufferView,shaders:this.handleShader,programs:this.handleProgram,techniques:this.handleTechnique,materials:this.handleMaterial,meshes:this.handleMesh,cameras:this.handleCamera,lights:this.handleLight,nodes:this.handleNode,scenes:this.handleScene,images:this.handleImage,animations:this.handleAnimation,accessors:this.handleAccessor,skins:this.handleSkin,samplers:this.handleSampler,textures:this.handleTexture,videos:this.handleVideo,extensions:this.handleExtension},s=!0;-1!==this._state.categoryIndex;){var n=t[this._state.categoryIndex],i=this._state.categoryState,a=i.keys;if(a||(i.keys=a=Object.keys(this.rootDescription[n]),!a||0!=a.length)){var o=n,r=a[i.index],h=this.getEntryDescription(r,o);if(h){if(e[o]&&!1===e[o].call(this,r,h,this._state.userInfo)){s=!1;break}this._stepToNextDescription()}else if(this.handleError){this.handleError("INCONSISTENCY ERROR: no description found for entry "+r),s=!1;break}}else this._stepToNextDescription()}this.handleLoadCompleted&&this.handleLoadCompleted(s)}},_loadJSONIfNeeded:{enumerable:!0,value:function(e){var t=this;if(this._json)e&&e(this.json);else{var s=this._path,n=s.lastIndexOf("/");this.baseURL=0!==n?s.substring(0,n+1):"";var i=new XMLHttpRequest;i.open("GET",s,!0),i.onreadystatechange=function(){4==i.readyState&&200==i.status&&(t.json=JSON.parse(i.responseText),e&&e(t.json))},i.send(null)}}},_buildLoader:{value:function(e){var t=this;this._loadJSONIfNeeded((function(s){t.rootDescription=s,e&&e(this)}))}},_state:{value:null,writable:!0},_getEntryType:{value:function(e){for(var s=t,n=0;n<s.length;n++)if(this.rootDescription[s[n]])return s[n];return null}},getNextCategoryIndex:{value:function(e){for(var s=e;s<t.length;s++)if(this.hasCategory(t[s]))return s;return-1}},load:{enumerable:!0,value:function(e,t){var s=this;this._buildLoader((function(n){var i=s.getNextCategoryIndex.call(s,0);-1!==i&&(s._state={userInfo:e,options:t,categoryIndex:i,categoryState:{index:"0"}},s._handleState())}))}},initWithPath:{value:function(e){return this._path=e,this._json=null,this}},_knownURLs:{writable:!0,value:{}},loaderContext:{value:function(){return void 0===this._knownURLs[this._path]&&(this._knownURLs[this._path]=Object.keys(this._knownURLs).length),"__"+this._knownURLs[this._path]}},initWithJSON:{value:function(e,t){return this.json=e,this.baseURL=t,t||console.log("WARNING: no base URL passed to Reader:initWithJSON"),this}}});return e&&(e.glTFParser=s),s}));