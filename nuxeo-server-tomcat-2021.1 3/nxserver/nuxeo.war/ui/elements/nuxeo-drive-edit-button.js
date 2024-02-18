import{Polymer}from"@polymer/polymer/lib/legacy/polymer-fn.js";import{html}from"@polymer/polymer/lib/utils/html-tag.js";import{I18nBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-i18n-behavior.js";import{FiltersBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-filters-behavior.js";Polymer({_template:html`
    <style include="nuxeo-action-button-styles"></style>

    <nuxeo-resource id="token" path="/token" params='{"application": "Nuxeo Drive"}'></nuxeo-resource>

    <template is="dom-if" if="[[_isAvailable(document,blob)]]">
      <div class="action" on-tap="_go">
        <paper-icon-button noink icon="icons:open-in-new" id="driveBtn" aria-labelledby="label"></paper-icon-button>
        <span class="label" hidden$="[[!showLabel]]" id="label">[[i18n('driveEditButton.tooltip')]]</span>
        <nuxeo-tooltip>[[i18n('driveEditButton.tooltip')]]</nuxeo-tooltip>
      </div>
    </template>

    <nuxeo-dialog id="dialog" with-backdrop>
      <div class="vertical layout">
        <h1>[[i18n('driveEditButton.dialog.heading')]]</h1>
        <nuxeo-drive-desktop-packages></nuxeo-drive-desktop-packages>
      </div>
      <div class="buttons">
        <paper-button dialog-dismiss class="secondary">[[i18n('command.close')]]</paper-button>
      </div>
    </nuxeo-dialog>
  `,is:"nuxeo-drive-edit-button",behaviors:[I18nBehavior,FiltersBehavior],properties:{user:Object,document:Object,blob:Object,showLabel:{type:Boolean,reflectToAttribute:!0,value:!1}},_isAvailable(e,o){return this.hasPermission(e,"Write")&&!this.isProxy(e)&&o&&(!o.appLinks||0===o.appLinks.length)},_go(){this.$.token.get().then((e=>{const o=e.entries.map((e=>e.id));o&&o.length?window.open(this.driveEditURL,"_top"):this.$.dialog.toggle()}))},get driveEditURL(){if(!this.blob)return"";const e=this.blob.data.split("/nxfile/"),o=e[0],i=`nxfile/${e[1]}`;return["nxdrive://edit",o.replace("://","/"),"user",this.user.id,"repo",this.document.repository,"nxdocid",this.document.uid,"filename",encodeURIComponent(this.blob.name),"downloadUrl",i].join("/")}});