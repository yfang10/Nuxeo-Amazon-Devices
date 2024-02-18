/*! For license information please see nuxeo-drive.bundle.js.LICENSE.txt */
(self.webpackChunk_nuxeo_nuxeo_web_ui=self.webpackChunk_nuxeo_nuxeo_web_ui||[]).push([[548],{85332:(e,t,o)=>{"use strict";o.r(t);var n=o(21536),i=o(66538),a=o(41608),s=o(30883);let l;(0,n.k)({_template:i.d`
    <style include="nuxeo-action-button-styles">
      ::slotted(iron-icon:hover) {
        fill: var(--nuxeo-link-hover-color);
      }

      :host([synchronized]) ::slotted(iron-icon) {
        fill: var(--icon-toggle-pressed-color, --nuxeo-action-color-activated);
      }
    </style>

    <nuxeo-operation auto op="NuxeoDrive.GetRoots" on-response="_handleRoots"></nuxeo-operation>
    <nuxeo-operation id="op" op="NuxeoDrive.SetSynchronization" input="[[document.uid]]"></nuxeo-operation>

    <template is="dom-if" if="[[_isAvailable(document, synchronizationRoot)]]">
      <div class="action" on-tap="toggle">
        <paper-icon-button id="syncBut" icon="[[_icon(synchronized)]]" aria-labelledby="label"></paper-icon-button>
        <span class="label" hidden$="[[!showLabel]]" id="label">[[_label]]</span>
        <nuxeo-tooltip>[[_label]]</nuxeo-tooltip>
      </div>
    </template>
  `,is:"nuxeo-drive-sync-toggle-button",behaviors:[a.mB,s.q],properties:{document:{type:Object,observer:"_update"},synchronized:{type:Boolean,notify:!0,reflectToAttribute:!0},synchronizationRoot:String,showLabel:{type:Boolean,reflectToAttribute:!0,value:!1},_label:{type:String,computed:"_computeLabel(synchronized, i18n)"}},toggle(){const e=!this.synchronized;return this.$.op.params={enable:!this.synchronized},this.$.op.execute().then((()=>{const t=l.indexOf(this.document.uid);e&&-1===t?l.push(this.document.uid):e||-1===t||l.splice(t,1),this.synchronized=e}))},_isAvailable(){if(!this.document)return!1;if(this.isVersion(this.document))return!1;const e=-1!==["Domain","SectionRoot","TemplateRoot","WorkspaceRoot","Forum","Collections"].indexOf(this.document.type),t=(this.hasFacet(this.document,"Collection")||this.hasFacet(this.document,"Folderish"))&&!this.isTrashed(this.document);return!e&&t&&!this.synchronizationRoot},_computeLabel(e){return e?this.i18n("driveSyncToggleButton.unsync","Unsynchronize"):this.i18n("driveSyncToggleButton.sync","Synchronize")},_icon:e=>e?"notification:sync-disabled":"notification:sync",_update(){if(!this.document||!l)return;this.synchronized=-1!==l.indexOf(this.document.uid);const e=this.document.contextParameters.breadcrumb.entries;for(let t=e.length-1;t>=0;t--)if(-1!==l.indexOf(e[t].parentRef))return void(this.synchronizationRoot=e[t].parentRef);this.synchronizationRoot=null},_handleRoots(e){l=e.detail.response.entries.map((e=>e.uid)),this._update()}}),(0,n.k)({_template:i.d`
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
  `,is:"nuxeo-drive-edit-button",behaviors:[a.mB,s.q],properties:{user:Object,document:Object,blob:Object,showLabel:{type:Boolean,reflectToAttribute:!0,value:!1}},_isAvailable(e,t){return this.hasPermission(e,"Write")&&!this.isProxy(e)&&t&&(!t.appLinks||0===t.appLinks.length)},_go(){this.$.token.get().then((e=>{const t=e.entries.map((e=>e.id));t&&t.length?window.open(this.driveEditURL,"_top"):this.$.dialog.toggle()}))},get driveEditURL(){if(!this.blob)return"";const e=this.blob.data.split("/nxfile/"),t=e[0],o=`nxfile/${e[1]}`;return["nxdrive://edit",t.replace("://","/"),"user",this.user.id,"repo",this.document.repository,"nxdocid",this.document.uid,"filename",encodeURIComponent(this.blob.name),"downloadUrl",o].join("/")}});var r=o(47329);(0,n.k)({_template:i.d`
    <style include="iron-flex iron-flex-alignment iron-flex-factors">
      :host {
        display: block;
      }

      .table {
        font-family: var(--nuxeo-app-font);
        line-height: 3.5;
      }

      .row {
        border-bottom: 1px solid var(--nuxeo-border);
        @apply --layout-horizontal;
      }

      .row:hover {
        background-color: var(--nuxeo-container-hover);
      }

      .header {
        background-color: var(--nuxeo-table-header-background);
        color: var(--nuxeo-table-header-titles);
        font-weight: 400;
        height: 56px;
        display: flex;
        flex-direction: row;
      }

      .cell {
        padding: 0 24px 0 24px;
        min-height: 46px;
        overflow: hidden;
      }

      paper-icon-button:hover ::slotted(iron-icon) {
        color: var(--nuxeo-action-hover, #00adff);
      }

      .actions {
        width: 50px;
      }

      .emptyResult {
        color: var(--nuxeo-text-light, #939caa);
        display: block;
        font-weight: 300;
        padding: 1.5em 0.7em;
        text-align: center;
        font-size: 1.1em;
      }
    </style>

    <nuxeo-resource
      auto
      id="tokens"
      path="/token"
      params="[[_params(application)]]"
      on-response="_handleTokens"
    ></nuxeo-resource>

    <nuxeo-resource id="token" path="/token"></nuxeo-resource>

    <template is="dom-if" if="[[_empty(tokens)]]">
      <div class="table-row">
        <div class="emptyResult">
          [[i18n('authenticationTokensManagement.empty')]]
        </div>
      </div>
    </template>

    <template is="dom-if" if="[[!_empty(tokens)]]">
      <div class="table">
        <div class="header">
          <div class="flex-2">[[i18n('authenticationTokensManagement.token')]]</div>
          <div class="flex-1">[[i18n('authenticationTokensManagement.application')]]</div>
          <div class="flex">[[i18n('authenticationTokensManagement.deviceId')]]</div>
          <div class="flex">[[i18n('authenticationTokensManagement.deviceDescription')]]</div>
          <div class="flex">[[i18n('authenticationTokensManagement.permission')]]</div>
          <div class="flex">[[i18n('authenticationTokensManagement.creationDate')]]</div>
          <div class="actions"></div>
        </div>
        <template is="dom-repeat" items="[[tokens]]" as="token">
          <div class="row">
            <div class="flex-2">[[token.id]]</div>
            <div class="flex-1">[[token.application]]</div>
            <div class="flex">[[token.deviceId]]</div>
            <div class="flex">[[token.deviceDescription]]</div>
            <div class="flex">[[token.permission]]</div>
            <div class="flex"><nuxeo-date datetime="[[token.creationDate]]"></nuxeo-date></div>
            <div class="actions">
              <paper-icon-button
                icon="icons:clear"
                title="[[i18n('authenticationTokensManagement.revoke')]]"
                on-tap="_revoke"
              >
              </paper-icon-button>
            </div>
          </div>
        </template>
      </div>
    </template>

    <paper-toast id="toast">[[i18n('authenticationTokensManagement.revoked')]]</paper-toast>
  `,is:"nuxeo-authentication-tokens-management",properties:{application:String,tokens:{type:Array,value:[]}},behaviors:[a.mB],_params:e=>({application:e}),_handleTokens(e){this.tokens=e.detail.response.entries},_revoke(e){this.$.token.path=`/token/${e.model.token.id}`,this.$.token.remove().then(this.refresh.bind(this)).then((()=>{this.$.toast.open()}))},refresh(){return this.$.tokens.execute(this)},_empty:e=>!e.length,_formatDate:e=>(0,r.Z)(e).format("MMMM D, YYYY")}),(0,n.k)({_template:i.d`
    <style include="iron-flex iron-flex-alignment iron-flex-factors">
      :host {
        display: block;
      }

      .table {
        font-family: var(--nuxeo-app-font);
        line-height: 3.5;
      }

      .row {
        border-bottom: 1px solid var(--nuxeo-border);
        @apply --layout-horizontal;
      }

      .row:hover {
        background-color: var(--nuxeo-container-hover);
      }

      .header {
        background-color: var(--nuxeo-table-header-background);
        color: var(--nuxeo-table-header-titles);
        font-weight: 400;
        height: 56px;
        display: flex;
        flex-direction: row;
      }

      .cell {
        padding: 0 24px 0 24px;
        min-height: 46px;
        overflow: hidden;
      }

      paper-icon-button:hover ::content iron-icon {
        color: var(--nuxeo-action-hover, #00adff);
      }

      .emptyResult {
        color: var(--nuxeo-text-light, #939caa);
        display: block;
        font-weight: 300;
        padding: 1.5em 0.7em;
        text-align: center;
        font-size: 1.1em;
      }
    </style>

    <nuxeo-operation auto id="roots" op="NuxeoDrive.GetRoots" on-response="_handleRoots"></nuxeo-operation>
    <nuxeo-operation id="disable" op="NuxeoDrive.SetSynchronization" params='{"enable": false}'></nuxeo-operation>

    <template is="dom-if" if="[[_empty(roots)]]">
      <div class="emptyResult">
        [[i18n('driveSyncRootsManagement.roots.empty')]]
      </div>
    </template>

    <template is="dom-if" if="[[!_empty(roots)]]">
      <div class="table">
        <div class="header">
          <div class="cell flex-1">[[i18n('driveSyncRootsManagement.root.name')]]</div>
          <div class="cell flex-3">[[i18n('driveSyncRootsManagement.root.path')]]</div>
          <div class="cell"></div>
        </div>
        <template is="dom-repeat" items="[[roots]]" as="doc">
          <div class="row">
            <div class="cell flex-1">[[doc.title]]</div>
            <div class="cell flex-3">[[doc.path]]</div>
            <div class="cell actions">
              <paper-icon-button
                icon="icons:clear"
                title="[[i18n('driveSyncRootsManagement.root.disable')]]"
                on-tap="_disable"
              >
              </paper-icon-button>
            </div>
          </div>
        </template>
      </div>
    </template>

    <paper-toast id="toast">[[i18n('driveSyncRootsManagement.roots.disabled')]]</paper-toast>
  `,is:"nuxeo-drive-sync-roots-management",properties:{roots:{type:Array,value:[]}},behaviors:[a.mB],_handleRoots(e){this.roots=e.detail.response.entries},_empty:e=>!e.length,_disable(e){return this.$.disable.input=e.model.doc.uid,this.$.disable.execute().then(this.refresh.bind(this)).then((()=>{this.$.toast.toggle()}))},refresh(){return this.$.roots.execute(this)}}),(0,n.k)({_template:i.d`
    <style include="iron-flex iron-flex-alignment iron-flex-factors nuxeo-styles">
      :host {
        display: block;
      }

      .table {
        font-family: var(--nuxeo-app-font);
        line-height: 3.5;
      }

      .row {
        border-bottom: 1px solid var(--nuxeo-border);
        @apply --layout-horizontal;
      }

      .row:hover {
        background-color: var(--nuxeo-container-hover);
      }

      .header {
        background-color: var(--nuxeo-table-header-background);
        color: var(--nuxeo-table-header-titles);
        font-weight: 400;
        height: 56px;
        display: flex;
        flex-direction: row;
      }

      .cell {
        padding: 0 24px 0 24px;
        min-height: 46px;
        overflow: hidden;
      }

      paper-button {
        line-height: normal;
      }

      .platform {
        background-color: #50c3f0;
        border-radius: 3px;
        color: #fff;
        font-size: 0.9em;
        letter-spacing: 0.04em;
        line-height: 130%;
        margin: 0 0.2em 0.2em 0;
        padding: 0.06em 0.3em;
        vertical-align: baseline;
        white-space: nowrap;
      }
    </style>

    <nuxeo-connection platform-version="{{_tp}}"></nuxeo-connection>

    <div class="table">
      <div class="header">
        <div class="cell flex">[[i18n('driveDesktopPackages.platform')]]</div>
        <div class="cell flex-3">[[i18n('driveDesktopPackages.install')]]</div>
      </div>
      <template is="dom-repeat" items="[[packages]]" as="pkg">
        <div class="row">
          <div class="cell flex"><span class="platform">[[pkg.platform]]</span></div>
          <div class="cell flex-3">
            <a href$="[[pkg.url]]" tabindex="-1" target="_blank">
              <paper-button noink>
                [[pkg.name]]
              </paper-button>
            </a>
          </div>
        </div>
      </template>
    </div>
  `,is:"nuxeo-drive-desktop-packages",properties:{packages:{type:Array,computed:"_computeUrls(_tp)"},_tp:String},behaviors:[a.mB],_computeUrls(e){if(!e)return;const t=[],o="nuxeo-drive",n="https://community.nuxeo.com/static/drive-updates";let i=`${o}-x86_64.AppImage`;return t.push({name:i,platform:"Linux",url:`${n}/${i}`}),i=`${o}.dmg`,t.push({name:i,platform:"macOS",url:`${n}/${i}`}),i=`${o}.exe`,t.push({name:i,platform:"Windows",url:`${n}/${i}`}),t}}),(0,n.k)({_template:i.d`
    <style include="nuxeo-styles"></style>
    <nuxeo-page>
      <div class="header">[[i18n('drivePage.heading')]]</div>
      <div class="content">
        <nuxeo-card heading="[[i18n('drivePage.packages')]]">
          <nuxeo-drive-desktop-packages></nuxeo-drive-desktop-packages>
        </nuxeo-card>
        <nuxeo-card heading="[[i18n('drivePage.roots')]]">
          <nuxeo-drive-sync-roots-management></nuxeo-drive-sync-roots-management>
        </nuxeo-card>
        <nuxeo-card heading="[[i18n('drivePage.tokens')]]">
          <nuxeo-authentication-tokens-management application="Nuxeo Drive"></nuxeo-authentication-tokens-management>
        </nuxeo-card>
      </div>
    </nuxeo-page>
  `,is:"nuxeo-drive-page",behaviors:[a.mB]});var d=o(65958),c=o.n(d);const p=document.createElement("template");p.innerHTML=c(),document.head.appendChild(p.content)},65958:e=>{e.exports=' <nuxeo-slot-content name="driveSyncToggleButton" slot="DOCUMENT_ACTIONS"> <template> <nuxeo-drive-sync-toggle-button document="[[document]]"></nuxeo-drive-sync-toggle-button> </template> </nuxeo-slot-content> <nuxeo-slot-content name="driveEditButton" slot="BLOB_ACTIONS"> <template> <nuxeo-drive-edit-button user="[[user]]" document="[[document]]" blob="[[blob]]"></nuxeo-drive-edit-button> </template> </nuxeo-slot-content> <nuxeo-slot-content name="drivePageLink" slot="USER_MENU"> <template> <nuxeo-menu-item route="page:drive" label="app.user.drive"></nuxeo-menu-item> </template> </nuxeo-slot-content> <nuxeo-slot-content name="drivePage" slot="PAGES"> <template> <nuxeo-drive-page class="flex" name="drive"></nuxeo-drive-page> </template> </nuxeo-slot-content> '}}]);