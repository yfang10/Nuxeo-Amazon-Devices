/*! For license information please see nuxeo-wopi.bundle.js.LICENSE.txt */
(self.webpackChunk_nuxeo_nuxeo_web_ui=self.webpackChunk_nuxeo_nuxeo_web_ui||[]).push([[591],{15713:(e,o,i)=>{"use strict";i.r(o);var t=i(21536),n=i(66538),p=i(30883);(0,t.k)({_template:n.d`
    <template is="dom-if" if="[[_isAvailable(url)]]">
      <nuxeo-link-button
        href="[[url]]"
        icon-src="[[_wopiIcon(appName)]]"
        label="[[_wopiTooltip(appName)]]"
        target="_blank"
      ></nuxeo-link-button>
    </template>
  `,is:"nuxeo-wopi-link",behaviors:[p.q],properties:{document:Object,blob:Object,appName:{type:String,computed:"_appName(blob)"},url:{type:String,computed:"_wopiURL(document, blob)"}},_appName(){return this.blob&&this.blob.wopi&&this.blob.wopi.appName&&this.blob.wopi.appName.toLowerCase()},_isAvailable(){return!!this.url},_wopiIcon(){return`images/${this.appName}.png`},_wopiTooltip(){return`wopiLink.${this.appName}.tooltip`},_wopiURL(){const e=this.blob&&this.blob.wopi;return e?e.edit&&this.hasPermission(this.document,"WriteProperties")?e.edit:e.view:null}});var l=i(19173),r=i.n(l);const a=window.Nuxeo||{};a.UI=a.UI||{},a.UI.config=a.UI.config||{},a.UI.config.enrichers=a.UI.config.enrichers||{},a.UI.config.enrichers.blob=a.UI.config.enrichers.blob||[],a.UI.config.enrichers.blob.push("wopi");const s=document.createElement("template");s.innerHTML=r(),document.head.appendChild(s.content)},19173:e=>{e.exports=' <nuxeo-slot-content name="wopiLink" slot="BLOB_ACTIONS"> <template> <nuxeo-wopi-link document="[[document]]" blob="[[blob]]"></nuxeo-wopi-link> </template> </nuxeo-slot-content> '}}]);