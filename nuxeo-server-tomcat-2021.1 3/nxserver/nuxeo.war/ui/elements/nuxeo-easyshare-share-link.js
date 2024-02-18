/*! For license information please see nuxeo-easyshare-share-link.js.LICENSE.txt */
import{Polymer}from"@polymer/polymer/lib/legacy/polymer-fn.js";import{html}from"@polymer/polymer/lib/utils/html-tag.js";import{NotifyBehavior}from"@nuxeo/nuxeo-elements/nuxeo-notify-behavior.js";import{I18nBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-i18n-behavior.js";import{Debouncer}from"@polymer/polymer/lib/utils/debounce.js";import{timeOut}from"@polymer/polymer/lib/utils/async.js";Polymer({_template:html`
    <style>
      :host {
        display: inline-block;
      }

      .horizontal {
        @apply --layout-horizontal;
        @apply --layout-center;
        @apply --layout-justified;
      }

      .selected {
        color: var(--nuxeo-primary-color, #0066ff);
        pointer-events: none;
      }

      iron-icon {
        cursor: pointer;
        margin: 20px 0 0 10px;
      }

      iron-icon:hover {
        color: var(--nuxeo-primary-color, #0066ff);
      }

      nuxeo-input {
        cursor: text;
        overflow: hidden;
        @apply --layout-flex;
      }
    </style>
    <nuxeo-connection id="nxcon"></nuxeo-connection>

    <template is="dom-if" if="[[_isAvailable(document)]]">
      <div class="action" on-tap="_toggleDialog">
        <paper-icon-button id="shareBtn" icon="[[icon]]" noink aria-labelledby="label"></paper-icon-button>
        <span class="label" hidden$="[[!showLabel]]" id="label">[[_label]]</span>
        <nuxeo-tooltip>[[_label]]</nuxeo-tooltip>
      </div>
    </template>

    <nuxeo-dialog id="dialog" with-backdrop>
      <div>
        <h2>[[i18n('shareButton.dialog.heading')]]</h2>
      </div>
      <div id="permanent" class="horizontal">
        <nuxeo-input
          id="permalink"
          label="[[i18n('easyshare.copy.label', document.properties.dc:title)]]"
          value="[[_buildPermalink(document)]]"
          readonly
        >
        </nuxeo-input>
        <iron-icon id="permalinkIcon" name="permalinkIcon" icon="link" on-tap="_copyLink"></iron-icon>
        <nuxeo-tooltip id="tooltip" for="permalinkIcon">[[i18n('shareButton.operation.copy')]]</nuxeo-tooltip>
      </div>

      <template is="dom-if" if="[[_isEasyshare(document)]]">
        <div id="easyShare" class="horizontal">
          <nuxeo-input
            id="easyShareLink"
            label="[[i18n('easysharefolder.share', document.properties.dc:title)]]"
            value="[[_buildEasysharelink(document)]]"
            readonly
          >
          </nuxeo-input>
          <iron-icon id="easyShareIcon" name="easyShareIcon" icon="link" on-tap="_copyLink"></iron-icon>
          <nuxeo-tooltip id="tooltip" for="easyShareIcon">[[i18n('shareButton.operation.copy')]]</nuxeo-tooltip>
        </div>
      </template>
      <div class="buttons">
        <paper-button dialog-dismiss>[[i18n('shareButton.dialog.close')]]</paper-button>
      </div>
    </nuxeo-dialog>
  `,is:"nuxeo-easyshare-share-link",behaviors:[NotifyBehavior,I18nBehavior],properties:{document:{type:Object},icon:{type:String,value:"nuxeo:share"},showLabel:{type:Boolean,value:!1},_label:{type:String,computed:"_computeLabel(i18n)"}},_toggleDialog(){this.$.dialog.toggle()},_isAvailable:e=>e,_isEasyshare:e=>e&&"EasyShareFolder"===e.type,_buildPermalink:e=>e?`${window.location.origin+window.location.pathname}#!/doc/${e.uid}`:"",_buildEasysharelink(e){const o=window.location.origin+this.$.nxcon.url;return e?`${o}/site/easyshare/${this.document.uid}`:""},_computeLabel(){return this.i18n("shareButton.tooltip")},_copyLink(e){const o=e.currentTarget,i=o.previousElementSibling,n="easyShareIcon"===o.id?this.$.permalinkIcon:this.$$("#easyShareIcon");n&&"none"!==n.display&&n._debouncer&&n._debouncer.isActive()&&(n._debouncer=n._debouncer.flush()),i.$.paperInput.$.nativeInput.select(),window.document.execCommand("copy")&&(o._debouncer=Debouncer.debounce(o._debouncer,timeOut.after(2e3),(()=>{i.$.paperInput.$.nativeInput.setSelectionRange(0,0),i.$.paperInput.blur(),o.set("icon","link"),o.classList.remove("selected")})),o.set("icon","check"),o.classList.add("selected"),this.notify({message:this.i18n("shareButton.operation.copied"),duration:2e3}))}});