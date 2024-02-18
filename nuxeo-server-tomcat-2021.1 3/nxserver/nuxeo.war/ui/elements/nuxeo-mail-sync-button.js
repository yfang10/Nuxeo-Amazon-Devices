import{Polymer}from"@polymer/polymer/lib/legacy/polymer-fn.js";import{html}from"@polymer/polymer/lib/utils/html-tag.js";import{I18nBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-i18n-behavior.js";import"./nuxeo-mail-icons.js";Polymer({_template:html`
    <nuxeo-operation-button
      operation="Mail.CheckInbox"
      input="[[document.uid]]"
      event="document-updated"
      notification="[[i18n('mailfolder.sync.success')]]"
      icon="nuxeo-mail:sync"
      label="[[i18n('mailfolder.sync')]]"
      on-tap="_showNotification"
    ></nuxeo-operation-button>

    <paper-toast id="toast" text="[[i18n('mailfolder.sync.checking')]]" duration="0"></paper-toast>
  `,is:"nuxeo-mail-sync-button",behaviors:[I18nBehavior],properties:{document:Object},listeners:{"document-updated":"_closeNotification"},_showNotification(){this.$.toast.open()},_closeNotification(){this.$.toast.hide()}});