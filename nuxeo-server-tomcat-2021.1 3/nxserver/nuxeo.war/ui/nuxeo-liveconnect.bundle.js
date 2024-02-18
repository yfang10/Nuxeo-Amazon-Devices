/*! For license information please see nuxeo-liveconnect.bundle.js.LICENSE.txt */
(self.webpackChunk_nuxeo_nuxeo_web_ui=self.webpackChunk_nuxeo_nuxeo_web_ui||[]).push([[345],{55200:(e,o,i)=>{"use strict";i.r(o);var t=i(21536),n=i(66538),s=i(41608);const r={properties:{clientId:{type:String},authorizationURL:{type:String},providerId:{type:String},userId:{type:String},isUserAuthorized:{type:Boolean,value:!1,notify:!0},isAvailable:{type:Boolean,value:!1,notify:!0}},generateBlobKey(e){if(!this.providerId)throw new Error("failed to generate key: providerId not defined");if(!this.userId)throw new Error("failed to generate key: userId not defined");if(!e)throw new Error("failed to generate key: fileId not defined");return`${this.providerId}:${this.userId}:${e}`},notifyBlobPick(e){this.fire("nx-blob-picked",{blobs:Array.isArray(e)?e:[e]})},openPopup(e,o){const i={width:"1000",height:"650",onClose(){},onMessageReceive(){}};o&&Object.assign(i,o);const t=window.screenX+window.outerWidth/2-i.width/2,n=window.screenY+window.outerHeight/2-i.height/2;let s;"function"==typeof i.onMessageReceive&&(s=function(e){i.onMessageReceive(e)},window.addEventListener("message",s));const r=window.open(e,"popup",`height=${i.height},width=${i.width},top=${n},left=${t}`),a=setInterval((()=>{r&&r.closed&&(clearInterval(a),"function"==typeof i.onClose&&i.onClose(),window.removeEventListener("message",s))}),100)},updateProviderInfo(){if(!this.$.oauth2)throw new Error("Missing OAuth2 resource");return this.$.oauth2.path=`oauth2/provider/${this.providerId}`,this.$.oauth2.get().then((e=>{this.clientId=e.clientId,this.authorizationURL=e.authorizationURL,this.isUserAuthorized=e.isAuthorized,this.userId=e.userId,this.isAvailable=e.isAvailable}))},getToken(){if(!this.$.oauth2)throw new Error("Missing OAuth2 resource");return this.$.oauth2.path=`oauth2/provider/${this.providerId}/token`,this.$.oauth2.get()},openPicker(){throw new Error("not implemented")}},a=document.createElement("script");a.src="https://app.box.com/js/static/select.js",document.head.appendChild(a),(0,t.k)({_template:n.d`
    <style>
      :host {
        display: none;
      }
    </style>
    <nuxeo-resource id="oauth2"></nuxeo-resource>
  `,is:"nuxeo-liveconnect-box-provider",behaviors:[r],properties:{providerId:{value:"box"}},openPicker(){this.updateProviderInfo().then(this._init.bind(this))},_init(){this.isUserAuthorized?this._showPicker():this.openPopup(this.authorizationURL,{onMessageReceive:this._parseMessage.bind(this),onClose:this._onOAuthPopupClose.bind(this)})},_parseMessage(e){const o=JSON.parse(e.data);this.accessToken=o.token},_onOAuthPopupClose(){this.accessToken&&(this.userId?this._showPicker():this.updateProviderInfo().then((()=>{if(!this.userId)throw new Error("No username available.");this._showPicker()})))},_showPicker(){const e={clientId:this.clientId,linkType:"direct",multiselect:!0},o=new BoxSelect(e);o.success((e=>{const o=[];e.forEach((e=>{o.push({providerId:this.providerId,providerName:"Box",user:this.userId,fileId:e.id.toString(),name:e.name,size:e.size,key:this.generateBlobKey(e.id)})})),this.notifyBlobPick(o)})),o.launchPopup()}}),(0,t.k)({_template:n.d`
    <style include="nuxeo-styles">
      :host {
        display: inline-block;
        @apply --layout-horizontal;
        @apply --nuxeo-liveconnect-link-layout;
      }

      iron-icon {
        --iron-icon-height: 16px;
        --iron-icon-width: 32px;
        margin-right: 4px;
        @apply --nuxeo-liveconnect-icon-layout;
      }

      a {
        @apply --layout-horizontal;
        @apply --layout-center;
        @apply --layout-center-justified;
        @apply --nuxeo-liveconnect-anchor-layout;
      }

      a,
      a:active,
      a:visited,
      a:focus {
        color: var(--nuxeo-secondary-color, #0066ff);
        text-decoration: underline;
      }
    </style>

    <nuxeo-liveconnect-box-provider
      id="provider"
      is-available="{{isProviderAvailable}}"
    ></nuxeo-liveconnect-box-provider>
    <template is="dom-if" if="[[isProviderAvailable]]">
      <a href="javascript:undefined" on-tap="_openPicker">
        <iron-icon src="[[importPath]]images/box.png"></iron-icon>
        [[i18n('liveconnectImportActions.box', 'Box')]]
      </a>
    </template>
  `,is:"nuxeo-liveconnect-box-link",behaviors:[s.mB],ready(){this.$.provider.updateProviderInfo()},_openPicker(){this.$.provider.openPicker()}});const l=document.createElement("script");l.src="https://apis.google.com/js/client.js",document.head.appendChild(l),(0,t.k)({_template:n.d`
    <style>
      :host {
        display: none;
      }
    </style>

    <nuxeo-resource id="oauth2"></nuxeo-resource>
  `,is:"nuxeo-liveconnect-google-drive-provider",behaviors:[r],properties:{providerId:{value:"googledrive"}},openPicker(){gapi.load("picker",{callback:this._init.bind(this)})},_init(){this.updateProviderInfo().then((()=>{this.isUserAuthorized?this._doAuth(!0,this._checkAuth.bind(this)):this.openPopup(this.authorizationURL,{onMessageReceive:this._parseMessage.bind(this),onClose:this._onOAuthPopupClose.bind(this)})}))},_doAuth(e,o){const i={client_id:this.clientId,scope:"email https://www.googleapis.com/auth/drive"};this.userId?(i.user_id=this.userId,i.immediate=e):i.authuser=-1,this.domain&&(i.hd=this.domain),gapi.auth.authorize(i,o)},_checkAuth(){const e=gapi.auth.getToken();e?this._handleAuthResult(e.access_token):this._doAuth(!1,this._checkAuth.bind(this))},_parseMessage(e){const o=JSON.parse(e.data);this.accessToken=o.token},_onOAuthPopupClose(){this.accessToken&&this._handleAuthResult(this.accessToken)},_handleAuthResult(e){if(e){const o=document.createElement("iron-request");o.send({url:`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token= ${e}`,handleAs:"json"}).then((()=>{this.userId=o.response.email,this._showPicker(e)}))}else this._checkAuth(!1)},_showPicker(e){const o=new google.picker.DocsView;o.setIncludeFolders(!0),o.setOwnedByMe(!0),(new google.picker.PickerBuilder).setOAuthToken(e).setAppId(this.clientId).addView(o).setCallback(this._pickerCallback.bind(this)).enableFeature(google.picker.Feature.MULTISELECT_ENABLED).build().setVisible(!0)},_pickerCallback(e){if(e[google.picker.Response.ACTION]===google.picker.Action.PICKED){const o=[];e[google.picker.Response.DOCUMENTS].forEach((e=>{o.push({providerId:this.providerId,providerName:"Google Drive",user:this.userId,fileId:e.id,name:e.name,size:e.sizeBytes,key:this.generateBlobKey(e.id)})})),this.notifyBlobPick(o)}}}),(0,t.k)({_template:n.d`
    <style include="nuxeo-styles">
      :host {
        display: inline-block;
        @apply --layout-horizontal;
        @apply --nuxeo-liveconnect-link-layout;
      }

      iron-icon {
        --iron-icon-height: 16px;
        --iron-icon-width: 16px;
        margin-right: 4px;
        @apply --nuxeo-liveconnect-icon-layout;
      }

      a {
        @apply --layout-horizontal;
        @apply --layout-center;
        @apply --layout-center-justified;
        @apply --nuxeo-liveconnect-anchor-layout;
      }

      a,
      a:active,
      a:visited,
      a:focus {
        color: var(--nuxeo-secondary-color, #0066ff);
        text-decoration: underline;
      }
    </style>

    <nuxeo-liveconnect-google-drive-provider
      id="provider"
      is-available="{{isProviderAvailable}}"
    ></nuxeo-liveconnect-google-drive-provider>
    <template is="dom-if" if="[[isProviderAvailable]]">
      <a href="javascript:undefined" on-tap="_openPicker">
        <iron-icon src="[[importPath]]images/google_drive.png"></iron-icon>
        [[i18n('liveconnectImportActions.googledrive', 'Google Drive')]]
      </a>
    </template>
  `,is:"nuxeo-liveconnect-google-drive-link",behaviors:[s.mB],ready(){this.$.provider.updateProviderInfo()},_openPicker(){this.$.provider.openPicker()}});var c=i(43828),h=i.n(c),d=i(2419),p=i.n(d);const u=document.createElement("template");u.innerHTML=[h(),p()].join(""),document.head.appendChild(u.content),Nuxeo.LiveConnectBehavior=r},43828:e=>{e.exports=' <nuxeo-slot-content name="liveConnectBoxImportActions" slot="FILE_UPLOAD_ACTIONS"> <template> <nuxeo-liveconnect-box-link></nuxeo-liveconnect-box-link> </template> </nuxeo-slot-content> '},2419:e=>{e.exports=' <nuxeo-slot-content name="liveConnectGoogleDriveImportActions" slot="FILE_UPLOAD_ACTIONS"> <template> <nuxeo-liveconnect-google-drive-link></nuxeo-liveconnect-google-drive-link> </template> </nuxeo-slot-content> '}}]);