/*! For license information please see easyshare.bundle.js.LICENSE.txt */
(self.webpackChunk_nuxeo_nuxeo_web_ui=self.webpackChunk_nuxeo_nuxeo_web_ui||[]).push([[644],{51704:(e,o,n)=>{"use strict";n.r(o);var i=n(21536),t=n(66538),a=n(34408),l=n(41608),r=n(30032),s=n(16896);(0,i.k)({_template:t.d`
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
  `,is:"nuxeo-easyshare-share-link",behaviors:[a.M,l.mB],properties:{document:{type:Object},icon:{type:String,value:"nuxeo:share"},showLabel:{type:Boolean,value:!1},_label:{type:String,computed:"_computeLabel(i18n)"}},_toggleDialog(){this.$.dialog.toggle()},_isAvailable:e=>e,_isEasyshare:e=>e&&"EasyShareFolder"===e.type,_buildPermalink:e=>e?`${window.location.origin+window.location.pathname}#!/doc/${e.uid}`:"",_buildEasysharelink(e){const o=window.location.origin+this.$.nxcon.url;return e?`${o}/site/easyshare/${this.document.uid}`:""},_computeLabel(){return this.i18n("shareButton.tooltip")},_copyLink(e){const o=e.currentTarget,n=o.previousElementSibling,i="easyShareIcon"===o.id?this.$.permalinkIcon:this.$$("#easyShareIcon");i&&"none"!==i.display&&i._debouncer&&i._debouncer.isActive()&&(i._debouncer=i._debouncer.flush()),n.$.paperInput.$.nativeInput.select(),window.document.execCommand("copy")&&(o._debouncer=r.dx.debounce(o._debouncer,s.timeOut.after(2e3),(()=>{n.$.paperInput.$.nativeInput.setSelectionRange(0,0),n.$.paperInput.blur(),o.set("icon","link"),o.classList.remove("selected")})),o.set("icon","check"),o.classList.add("selected"),this.notify({message:this.i18n("shareButton.operation.copied"),duration:2e3}))}});var c=n(87358),u=n.n(c);const p=document.createElement("template");p.innerHTML=u(),document.head.appendChild(p.content)},87358:e=>{e.exports=' <nuxeo-slot-content name="shareDocumentAction" slot="DOCUMENT_ACTIONS" order="40" priority="10"> <template> <nuxeo-easyshare-share-link document="[[document]]"></nuxeo-easyshare-share-link> </template> </nuxeo-slot-content> '}}]);