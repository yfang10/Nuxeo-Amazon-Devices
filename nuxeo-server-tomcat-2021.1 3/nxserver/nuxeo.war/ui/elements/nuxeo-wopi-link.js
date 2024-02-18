import{Polymer}from"@polymer/polymer/lib/legacy/polymer-fn.js";import{html}from"@polymer/polymer/lib/utils/html-tag.js";import{FiltersBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-filters-behavior.js";Polymer({_template:html`
    <template is="dom-if" if="[[_isAvailable(url)]]">
      <nuxeo-link-button
        href="[[url]]"
        icon-src="[[_wopiIcon(appName)]]"
        label="[[_wopiTooltip(appName)]]"
        target="_blank"
      ></nuxeo-link-button>
    </template>
  `,is:"nuxeo-wopi-link",behaviors:[FiltersBehavior],properties:{document:Object,blob:Object,appName:{type:String,computed:"_appName(blob)"},url:{type:String,computed:"_wopiURL(document, blob)"}},_appName(){return this.blob&&this.blob.wopi&&this.blob.wopi.appName&&this.blob.wopi.appName.toLowerCase()},_isAvailable(){return!!this.url},_wopiIcon(){return`images/${this.appName}.png`},_wopiTooltip(){return`wopiLink.${this.appName}.tooltip`},_wopiURL(){const e=this.blob&&this.blob.wopi;return e?e.edit&&this.hasPermission(this.document,"WriteProperties")?e.edit:e.view:null}});