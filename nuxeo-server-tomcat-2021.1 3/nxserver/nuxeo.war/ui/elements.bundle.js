/*! For license information please see elements.bundle.js.LICENSE.txt */
(self.webpackChunk_nuxeo_nuxeo_web_ui=self.webpackChunk_nuxeo_nuxeo_web_ui||[]).push([[531],{40878:(e,t,i)=>{"use strict";i.r(t),i(42061),i(12418),i(2550),i(90664),i(71450),i(91186),i(32653),i(37279),i(67365),i(73356),i(94522),i(75343),i(81547),i(83842),i(43384),i(93366),i(83253),i(79323),i(68582),i(58743),i(78891),i(54187),i(66853),i(90201),i(53659),i(35314),i(65964),i(65369);var a=i(89082),o=(i(63961),i(3062),i(14190)),n=(i(99064),i(49739),i(82545),i(10116),i(6827),i(60925)),s=(i(78502),i(62306),i(80587),i(73873),i(52130),i(53774),i(29712),i(95671),i(98321),i(53043),i(59106),i(35060),i(5265),i(36990),i(53128),i(84513),i(587),i(49348),i(24004),i(34539),i(39660),i(64779),i(84),i(49119),i(72063),i(15855),i(74789),i(78919),i(82374),i(87647),i(21237),i(16408),i(29145),i(80957),i(96689),i(68588),i(91219),i(75022),i(30883)),r=i(69699),l=i(41608),c=(i(9142),i(65059)),p=i(42840),d=(i(74430),i(76907),i(5453)),u=(i(92377),i(57632),i(31464),i(95172),i(16687),i(62692),i(14171),i(6374),i(98957),i(62514),i(75953),i(24400),i(7762),i(87759),i(39343),i(39901),i(77416),i(49818),i(87319),i(59088),i(37519),i(95918),i(39059),i(84969),i(67117),i(64091),i(38677),i(97643),i(49085),i(51917),i(25297),i(42108),i(67627),i(23550),i(80638),i(124),i(57392),i(79305),i(14955),i(99354),i(99173),i(75517),i(9841),i(31171),i(12699),i(34488),i(35266),i(34408)),m=i(21536),h=i(66538);(0,m.k)({_template:h.d`
    <style include="nuxeo-styles">
      #form,
      form {
        @apply --layout-vertical;
        height: 100%;
        max-width: 970px;
      }

      .scrollable {
        margin-top: 24px;
        padding: 0 24px;
        @apply --layout-scroll;
        @apply --layout-flex;
        @apply --layout-vertical;
      }

      .actions {
        @apply --buttons-bar;
        @apply --layout-horizontal;
        @apply --layout-justified;
      }

      .saving-label {
        margin-right: 8px;
      }

      nuxeo-document-layout {
        margin-bottom: 24px;
      }
    </style>

    <nuxeo-document
      id="doc"
      doc-id="[[document.uid]]"
      response="{{document}}"
      headers="[[headers]]"
      sync-indexing
    ></nuxeo-document>

    <iron-form id="form">
      <form>
        <div class="scrollable">
          <nuxeo-document-layout id="layout" document="{{document}}" layout="[[layout]]"></nuxeo-document-layout>
        </div>
        <div class="actions">
          <paper-button on-tap="cancel" noink class="secondary">[[i18n('command.cancel')]]</paper-button>
          <paper-button
            id="save"
            on-tap="_save"
            noink
            class="primary"
            disabled$="[[saving]]"
            aria-label$="[[i18n('command.save')]]"
          >
            <template is="dom-if" if="[[!saving]]">
              [[i18n('command.save')]]
            </template>
            <template is="dom-if" if="[[saving]]">
              <span class="saving-label">[[i18n('command.save')]]</span>
              <paper-spinner-lite active></paper-spinner-lite>
            </template>
          </paper-button>
        </div>
      </form>
    </iron-form>
  `,is:"nuxeo-document-form-layout",behaviors:[u.M,o.z,l.mB],importMeta:{url:`${window.location.protocol}//${window.location.host}${window.location.pathname}/document/nuxeo-document-form-layout.js`},properties:{document:{type:Object,notify:!0},layout:{type:String,value:"edit"},headers:{type:Object},saving:{type:Boolean,value:!1,readOnly:!0}},observers:["_documentChanged(document.*)"],async _save(){const e=this.$.layout.$.layout;if(this._setSaving(!0),!await e.validate()){const t=e._getValidatableElements(e.element.root).find((e=>e.invalid));return t&&(t.scrollIntoView(),t.focus()),void this._setSaving(!1)}let t;this.document.uid?(this.$.doc.data={"entity-type":"document",uid:this.document.uid,properties:this._dirtyProperties},t=this.$.doc.put()):(this.$.doc.data=this.document,t=this.$.doc.post()),t.then((()=>{this._refresh(this)})).catch((e=>{e&&"validation_report"===e["entity-type"]?this.$.layout.reportValidation(e):(this.notify({message:this.i18n("documentEdit.saveError")}),console.error(e))})).finally((()=>this._setSaving(!1)))},cancel(){this._refresh()},_refresh(){this.fire("document-updated")},_documentChanged(e){if("document"===e.path)this._dirtyProperties={};else{const t=e.path.match(/^document\.properties\.([^.]*)/);if(t){const e=t[1];this._dirtyProperties[e]=this.document.properties[e]}}}}),i(71560),(0,m.k)({_template:h.d`
    <style>
      :host {
        display: none;
      }
    </style>

    <nuxeo-connection id="nxcon"></nuxeo-connection>
    <iron-localstorage
      id="storage"
      name="[[name]]"
      value="{{creationStats}}"
      on-iron-localstorage-load-empty="initialize"
      auto-save-disabled
    >
    </iron-localstorage>
  `,is:"nuxeo-document-creation-stats",properties:{name:String,recencySize:{type:Number,value:5},creationStats:{type:Object,notify:!0}},ready(){this.$.nxcon.connect().then((({id:e})=>{const{repositoryName:t}=this.$.nxcon;this.name=[e,...t?[t]:[],"document-creation-stats"].join("-")}))},initialize(){this.creationStats={recency:[],frequency:{},total:0}},storeType(e){this.$.storage.reload(),this.creationStats.recency.length===this.recencySize&&this.splice("creationStats.recency",0,1),e in this.creationStats.frequency||this.set(`creationStats.frequency.${e}`,0),this.push("creationStats.recency",e),this.set(`creationStats.frequency.${e}`,this.creationStats.frequency[e]+1),this.set("creationStats.total",this.creationStats.total+1),this.$.storage.save()},lastType(e){return this.$.storage.reload(),0===this.creationStats.recency.length?[]:this.creationStats.recency.slice(Math.max(this.creationStats.recency.length-(e||1),0))},mostCommonType(e){this.$.storage.reload();const t=Object.keys(this.creationStats.frequency).sort(((e,t)=>this.creationStats.frequency[e]<this.creationStats.frequency[t])).filter(((e,t,i)=>t===i.indexOf(e)));return t.slice(0,Math.min(e||1,t.length))}});var x=i(49173);(0,m.k)({_template:h.d`
    <style include="iron-flex iron-flex-alignment nuxeo-styles">
      :host {
        display: block;
        @apply --layout-flex;
        @apply --layout-horizontal;
        --paper-dialog-scrollable: {
          padding: 0;
          overflow-x: hidden;
        }
      }

      paper-dialog-scrollable {
        display: block;
        @apply --layout-flex;
      }

      .typeSelection {
        margin: 1rem 0;
        @apply --layout-wrap;
        @apply --layout-flex;
        @apply --layout-horizontal;
      }

      .typeSelection paper-button {
        min-width: 128px;
        max-width: 128px;
        height: 128px;
        margin: 4px;
        padding: 4px;
        border: none;
        text-align: center;
        box-shadow: none;
        background-color: var(--input-background, rgba(0, 0, 0, 0.05));
        @apply --layout-vertical;
        @apply --nuxeo-document-create-selection-button;
      }

      .typeSelection paper-button:hover {
        color: var(--nuxeo-link-hover-color);
        filter: brightness(102%);
        -webkit-filter: brightness(102%);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3), 0 -3px 0 var(--nuxeo-link-hover-color) inset;
      }

      .typeIcon {
        /* These variables are deprecated. Instead, use the mixin bellow */
        width: var(--nuxeo-document-creation-form-icon-width, 42px);
        height: var(--nuxeo-document-creation-form-icon-height, 42px);
        @apply --nuxeo-document-create-selection-icon;
      }

      .typeLabel {
        width: 100%;
        margin-top: 1em;
        overflow: hidden;
        line-height: normal;
        text-overflow: ellipsis;
        text-align: center;
        white-space: nowrap;
        word-break: break-word;
        @apply --nuxeo-document-create-selection-label;
      }

      .container {
        margin: 0 2rem;
        padding: 0;
        display: inline-block;
        @apply --layout-flex;
        @apply --layout-vertical;
      }

      #form {
        @apply --layout-flex;
        @apply --layout-horizontal;
      }

      #document-create {
        margin-bottom: 2.5em;
      }

      .heading {
        font-size: 1.1rem;
        padding: 1.7rem 2.5rem;
      }

      .heading iron-icon {
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 8px;
      }

      .buttons {
        @apply --buttons-bar;
      }

      .error {
        border-left: 4px solid var(--nuxeo-warn-text);
        color: var(--nuxeo-text-default);
        padding-left: 8px;
      }

      .suggester {
        background-color: var(--input-background, rgba(0, 0, 0, 0.05));
        padding: 8px 16px;
        margin: 1rem 0;
        z-index: 100;
      }

      .importing-label {
        margin-right: 8px;
      }

      .vertical {
        @apply --layout-flex;
        @apply --layout-vertical;
      }

      iron-pages {
        @apply --layout-flex;
        @apply --layout-horizontal;
      }
    </style>

    <nuxeo-document
      id="docRequest"
      doc-path="[[targetPath]]"
      data="[[document]]"
      sync-indexing
      enrichers="permissions, subtypes"
      response="{{createResponse}}"
    ></nuxeo-document>

    <iron-pages selected="[[stage]]" attr-for-selected="name">
      <!--Stage: allow user to choose a doc type-->
      <div name="choose" class="vertical">
        <div class="container">
          <div class="suggester">
            <nuxeo-path-suggestion
              id="pathSuggesterChoose"
              value="{{targetPath}}"
              label="[[i18n('documentCreationForm.location')]]"
              parent="{{suggesterParent}}"
              children="{{suggesterChildren}}"
              disabled
              always-float-label
            ></nuxeo-path-suggestion>
            <span class$="horizontal layout [[_formatErrorMessage(errorMessage)]]">[[errorMessage]]</span>
          </div>
          <paper-dialog-scrollable>
            <div name="typeSelection" class="typeSelection">
              <template is="dom-repeat" items="[[subtypes]]" as="type">
                <paper-button
                  noink
                  name$="[[type.type]]"
                  class="docTypeButton"
                  on-tap="_selectType"
                  data-args$="[[type]]"
                  disabled$="[[!_canCreate(canCreate, creating)]]"
                  aria-label$="[[_getTypeLabel(type)]]"
                >
                  <iron-icon class="typeIcon" src="[[_getTypeIcon(type)]]"></iron-icon>
                  <div class="typeLabel">[[_getTypeLabel(type)]]</div>
                  <nuxeo-tooltip>[[_getTypeLabel(type)]]</nuxeo-tooltip>
                </paper-button>
              </template>
            </div>
          </paper-dialog-scrollable>
        </div>
        <div class="buttons horizontal end-justified layout">
          <div class="flex start-justified">
            <paper-button noink dialog-dismiss on-tap="_cancel" class="secondary"
              >[[i18n('command.cancel')]]</paper-button
            >
          </div>
        </div>
      </div>

      <!--Stage: allow user to fill in the properties for the selected type and create a new document-->
      <div name="edit" class="vertical layout flex">
        <div class="horizontal layout heading center">
          <iron-icon src="[[_getTypeIcon(selectedDocType)]]"></iron-icon>
          <span>[[_newDocumentLabel(selectedDocType)]]</span>
        </div>
        <div id="editor" class="container">
          <paper-dialog-scrollable id="editScrollable">
            <div class="suggester">
              <nuxeo-path-suggestion
                id="pathSuggesterEdit"
                value="{{targetPath}}"
                label="[[i18n('documentCreationForm.location')]]"
                parent="{{suggesterParent}}"
                children="{{suggesterChildren}}"
                disabled
                always-float-label
              ></nuxeo-path-suggestion>
              <span class$="horizontal layout [[_formatErrorMessage(errorMessage)]]">[[errorMessage]]</span>
            </div>
            <iron-form id="form">
              <form class="form vertical layout flex">
                <iron-a11y-keys keys="enter" on-keys-pressed="_submitKeyHandler"></iron-a11y-keys>
                <nuxeo-document-layout
                  id="document-create"
                  layout="create"
                  document="[[document]]"
                ></nuxeo-document-layout>
              </form>
            </iron-form>
          </paper-dialog-scrollable>
        </div>
        <div class="buttons horizontal end-justified layout">
          <div class="flex start-justified">
            <paper-button class="secondary" noink dialog-dismiss on-tap="_cancel" disabled$="[[creating]]"
              >[[i18n('command.cancel')]]</paper-button
            >
          </div>
          <paper-button class="secondary" noink on-tap="_back" disabled$="[[creating]]"
            >[[i18n('command.back')]]</paper-button
          >
          <paper-button
            id="create"
            noink
            class="primary"
            on-tap="_create"
            disabled$="[[!_canCreate(canCreate,creating)]]"
            aria-label$="[[i18n('command.create')]]"
          >
            <template is="dom-if" if="[[!creating]]">
              [[i18n('command.create')]]
            </template>
            <template is="dom-if" if="[[creating]]">
              <span class="importing-label">[[i18n('documentImport.creating')]]</span>
              <paper-spinner-lite active></paper-spinner-lite>
            </template>
          </paper-button>
        </div>
      </div>
    </iron-pages>

    <nuxeo-document-creation-stats id="creationStats"></nuxeo-document-creation-stats>
  `,is:"nuxeo-document-create",behaviors:[u.M,o.z,x.U],importMeta:{url:`${window.location.protocol}//${window.location.host}${window.location.pathname}/document/nuxeo-document-create.js`},properties:{stage:{type:String,value:"choose"},visible:{type:Boolean},creating:{type:Boolean,value:!1,readOnly:!0}},observers:["_visibleOnStage(visible,stage)"],ready(){this.addEventListener("element-changed",this._layoutUpdated.bind(this),!0)},init(e){if(this._clear(),e){const t=this.subtypes.find((t=>t.id===e));t&&(this.selectedDocType=t)}},_updateDocument(){this._isValidType(this.selectedDocType)&&this.parent?this.newDocument(this.selectedDocType.type,this._getDocumentProperties()).then((e=>{e.parentRef=this.parent.uid,this.document=e,this.stage="edit",this.$.editScrollable.scrollTarget.scrollTop=0})):this.document=null},_selectType(e){this.selectedDocType=e.model.type,this.fire("nx-creation-wizard-hide-tabs")},async _create(){if(!this._isValidType(this.selectedDocType)||!this.canCreate)return;const e=this.$["document-create"].$.layout;if(this._setCreating(!0),!await e.validate()){const t=e._getValidatableElements(e.element.root).find((e=>e.invalid));return t&&(t.scrollIntoView(),t.focus()),void this._setCreating(!1)}this.document.name=this.document.name||this._sanitizeName(this.document.properties["dc:title"]),this.$.docRequest.post().then((e=>{this.$.creationStats.storeType(this.selectedDocType.id),this._clear(),this.navigateTo(e),this._notify(e)})).catch((e=>{e&&"validation_report"===e["entity-type"]?this.$["document-create"].reportValidation(e):(this.notify({message:this.i18n("documentCreationForm.createError")}),console.error(e))})).finally((()=>this._setCreating(!1)))},_back(){this._clear(),this.fire("nx-creation-wizard-show-tabs")},_cancel(){this._clear(),this.document=void 0,this.fire("nx-creation-wizard-show-tabs")},_newDocumentLabel(){return this.i18n("documentCreationForm.newDoc.heading",this._getTypeLabel(this.selectedDocType))},_clear(){this.stage="choose",this.selectedDocType={}},_visibleOnStage(){this.$.pathSuggesterChoose.disabled=!this.visible||"choose"!==this.stage,this.$.pathSuggesterEdit.disabled=!this.visible||"edit"!==this.stage},_layoutUpdated(e){this.async((()=>{const t=e.detail.value.querySelector("[autofocus]");t&&t.focus()}))},_submitKeyHandler(e){"INPUT"===e.detail.keyboardEvent.target.tagName&&this._create()},_canCreate(){return this.canCreate&&!this.creating}}),i(3632),i(54199);var v=i(9986);(0,m.k)({_template:h.d`
    <style include="iron-flex iron-flex-alignment iron-flex-factors nuxeo-styles">
      :host {
        display: block;
        @apply --layout-flex;
        @apply --layout-horizontal;
        --paper-dialog-scrollable: {
          padding: 0;
          overflow-x: hidden;
        }
      }

      paper-spinner-lite {
        --paper-spinner-color: var(--default-primary-color);
      }

      paper-dialog-scrollable {
        display: block;
        @apply --layout-flex;
      }

      paper-dialog-scrollable:after {
        height: 0;
      }

      .suggester {
        background-color: var(--input-background, rgba(0, 0, 0, 0.05));
        padding: 8px 16px;
        margin: 12px 32px;
      }

      .file-to-import {
        height: 58px;
        margin: 0 0.3em 0.8em;
        width: calc(50% - 3em);
        padding: 0.8em 1em;
        background-color: var(--nuxeo-box);
        border: 1px solid var(--divider-color);
        position: relative;
      }

      file-to-import:first-child {
        overflow: hidden;
      }

      paper-progress {
        width: 100%;
      }

      #dropzone {
        padding: 1em;
        position: relative;
        border: 2px dashed var(--divider-color);
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.05);
        min-height: 100px;
        margin: 1em 2em 5em;
      }

      #form {
        padding: 0 32px;
      }

      #document-import {
        margin-bottom: 2.5em;
      }

      #blobEditor {
        @apply --layout-flex-3;
      }

      #blobList {
        @apply --layout-vertical;
        @apply --layout-flex;
        padding-top: 4px;
      }

      #blobList .error {
        margin: 8px;
      }

      #blobList .file-error {
        display: block;
        font-weight: normal;
        font-size: 0.75rem;
        line-height: 10px;
        margin-top: 4px;
      }

      #checkmarkNote {
        color: var(--secondary-text-color, #939caa);
        font-size: 11px;
        margin: 8px 8px 0 8px;
        opacity: 0.75;
        word-break: break-word;
      }

      #dropzone .file-error {
        white-space: nowrap;
      }

      #sidePanel {
        @apply --layout-vertical;
        @apply --layout-flex;
        background: var(--nuxeo-page-background);
        min-width: 200px;
      }

      .blobCheck {
        display: block;
        width: 16px;
        height: 16px;
        margin: 2px 0;
      }

      .blobCheck.checked {
        color: var(--nuxeo-validated);
      }

      .blobCheck.unchecked {
        opacity: 0.3;
      }

      .blobCheck.hidden {
        visibility: hidden;
      }

      .file-overview {
        @apply --layout-vertical;
        border: 1px solid var(--divider-color);
        border-radius: 1px;
        background-color: var(--nuxeo-box);
        padding: 16px 14px 16px 14px;
        margin: 8px;
        font-weight: bold;
        text-transform: none;
        color: var(--secondary-text-color);
        height: 88px;
      }

      .file-overview:hover {
        @apply --nuxeo-block-hover;
      }

      .file-overview.selected {
        @apply --nuxeo-block-selected;
      }

      .file-overview.selected .name {
        color: var(--nuxeo-primary-color, #0066ff);
      }

      .file-overview .name:hover {
        color: var(--nuxeo-primary-color, #0066ff);
      }

      .name {
        display: -webkit-box;
        font-weight: bold;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 40px; /* XXX: 2 * line height, consider extracting variable at the base theme leve */
        word-break: break-all;
        overflow: hidden;
      }

      .size {
        font-size: 0.8rem;
        opacity: 0.7;
        padding: 0.1em 0.5em;
        white-space: nowrap;
      }

      .wrap.baseline {
        align-items: baseline;
      }

      .complete {
        background-color: var(--nuxeo-validated);
        border-radius: 2em;
        width: 1.5em;
        position: absolute;
        right: 1.5em;
        top: 0.8em;
        text-align: center;
      }

      .complete iron-icon {
        width: 1.2em;
        height: 1.3em;
      }

      .provider {
        color: var(--nuxeo-primary-color);
      }

      .dropzone-label {
        cursor: pointer;
        margin: 16px 0 48px 0;
      }

      .dropzone-heading {
        font-weight: bold;
        margin: 4px 8px;
        padding: 4px 8px;
        width: 100%;
      }

      .clear {
        width: 3em;
        text-align: right;
      }

      .clear paper-icon-button {
        padding: 0 0 1em 0.5em;
      }

      .file-to-import:last-of-type {
        margin-bottom: 3em;
      }

      .file-to-import[error] {
        border: 1px solid var(--paper-input-container-invalid-color, #de350b);
      }

      .file-to-import > div:first-child {
        overflow: hidden;
      }

      .add-more {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        background-color: var(--nuxeo-box);
        padding: 0.5em;
      }

      .buttons {
        @apply --buttons-bar;
      }

      .add-more .importActions {
        margin-left: 8px;
      }

      .importActions > * {
        margin-left: 8px;
      }

      @media (max-width: 1024px) {
        .file-to-import {
          width: calc(100% - 2em);
        }
      }

      .error {
        border-left: 4px solid var(--nuxeo-warn-text);
        color: var(--primary-text-color);
        padding-left: 8px;
      }

      .upload-error {
        color: var(--primary-text-color, #243238);
        margin: 1em 2em;
        padding-left: 8px;
      }

      .upload-error:not(:empty) {
        border-left: 4px solid var(--nuxeo-warn-text, #de350b);
      }

      .upload-error:empty::before {
        content: '\\200b';
        display: inline;
      }

      .file-error {
        color: var(--paper-input-container-invalid-color, #de350b);
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .importing-label {
        margin-right: 8px;
      }

      iron-pages,
      div[name='upload'],
      div[name='customize'] {
        /*Firefox fix (NXP-22349)*/
        min-height: 100%;
      }
      div[name='upload'] {
        outline: none;
      }

      paper-progress {
        margin-top: 8px;
      }

      button.link {
        color: var(--nuxeo-link-color, #3a3a54);
        padding: 0;
        background: none;
        border: none;
        cursor: pointer;
        font: inherit;
      }

      button.link:hover {
        color: var(--nuxeo-link-hover-color, #0066ff);
        font: inherit;
      }
    </style>

    <nuxeo-connection id="nx"></nuxeo-connection>
    <nuxeo-resource id="blobRemover"></nuxeo-resource>
    <nuxeo-operation id="fileManagerImport" op="FileManager.Import" sync-indexing></nuxeo-operation>
    <nuxeo-document
      id="docRequest"
      sync-indexing
      headers='{"X-Batch-No-Drop": "true"}'
      response="{{createResponse}}"
    ></nuxeo-document>
    <nuxeo-document id="parentFetcher" doc-path="[[targetPath]]"></nuxeo-document>

    <iron-a11y-keys keys="enter" on-keys-pressed="_submitKeyHandler"></iron-a11y-keys>

    <iron-pages selected="[[stage]]" attr-for-selected="name" class="vertical layout flex">
      <!--Stage: allow the user to upload files-->
      <div name="upload" class="upload vertical layout flex" tabindex="0">
        <div class="suggester">
          <nuxeo-path-suggestion
            id="pathSuggesterUpload"
            label="[[i18n('documentImportForm.location')]]"
            value="{{targetPath}}"
            parent="{{suggesterParent}}"
            children="{{suggesterChildren}}"
            disabled
            always-float-label
          ></nuxeo-path-suggestion>
          <span class$="horizontal layout [[_formatErrorMessage(errorMessage)]]">[[errorMessage]]</span>
        </div>

        <div id="dropzone" class="vertical layout flex">
          <input hidden id="uploadFiles" type="file" on-change="_filesChanged" multiple />
          <template is="dom-if" if="[[!hasFiles]]">
            <div class="vertical layout center center-justified flex">
              <div class="dropzone-label horizontal layout center center-justified">
                <button class="link" on-click="_showUploadDialog">
                  [[i18n('documentImportForm.clickOrDrop')]]
                </button>
              </div>
              <span hidden$="[[!_hasVisibleContributions]]">[[i18n('documentImportForm.linkFilesFrom')]]</span>
              <div class="importActions horizontal layout wrap">
                <nuxeo-slot name="FILE_UPLOAD_ACTIONS" empty="{{!hasContributions}}"></nuxeo-slot>
              </div>
            </div>
          </template>
          <template is="dom-if" if="[[hasFiles]]" restamp>
            <paper-dialog-scrollable>
              <div class="vertical layout flex">
                <div class="horizontal layout wrap baseline">
                  <span class="dropzone-heading" hidden$="[[!_showDropzoneFileHeadings(hasLocalFiles,hasRemoteFiles)]]">
                    [[i18n('documentImportForm.localFiles')]]
                  </span>
                  <template is="dom-repeat" items="[[localFiles]]" as="file">
                    <!-- local file -->
                    <div class="file-to-import horizontal layout" error$="{{file.error}}">
                      <div class="vertical layout flex">
                        <div class="horizontal layout">
                          <div class="name" title="[[file.name]]">
                            [[file.name]]
                          </div>
                          <span class="size">
                            [[formatSize(file.size)]]
                          </span>
                        </div>
                        <template is="dom-if" if="[[file.providerName]]">
                          <div class="provider">
                            [[file.providerName]]
                          </div>
                        </template>
                        <template is="dom-if" if="[[_displayProgressBar(file.*)]]">
                          <paper-progress indeterminate="[[!hasProgress()]]" value="[[file.progress]]"></paper-progress>
                        </template>
                        <div class="horizontal layout flex" hidden$="[[!file.error]]">
                          <span class="file-error">[[file.error]]</span>
                          <nuxeo-tooltip>[[file.error]]</nuxeo-tooltip>
                        </div>
                      </div>
                      <div class="clear" hidden$="[[!_displayRemoveBlobBtn(file.*)]]">
                        <paper-icon-button
                          icon="[[_computeRemoveIcon(file.*)]]"
                          on-tap="_removeBlob"
                          aria-label$="[[_computeRemoveBtnTitle(file.name, i18n)]]"
                        ></paper-icon-button>
                        <nuxeo-tooltip id="removeBlobTooltip">[[_computeRemoveLabel(file.*, i18n)]]</nuxeo-tooltip>
                      </div>
                    </div>
                  </template>
                  <span class="dropzone-heading" hidden$="[[!_showDropzoneFileHeadings(hasLocalFiles,hasRemoteFiles)]]">
                    [[i18n('documentImportForm.remoteFiles')]]
                  </span>
                  <template is="dom-repeat" items="[[remoteFiles]]" as="file">
                    <!-- remote file -->
                    <div class="file-to-import horizontal layout" error$="{{file.error}}">
                      <div class="vertical layout flex">
                        <div class="horizontal layout center">
                          <div class="name" title="[[file.name]]">
                            [[file.name]]
                          </div>
                          <span class="size">
                            [[formatSize(file.size)]]
                          </span>
                        </div>
                        <div class="provider">
                          [[file.providerName]]
                        </div>
                      </div>
                      <div class="horizontal layout center">
                        <paper-icon-button
                          icon="nuxeo:remove"
                          on-tap="_removeBlob"
                          aria-labelledby="removeTooltip"
                        ></paper-icon-button>
                        <nuxeo-tooltip id="removeTooltip">[[i18n('command.remove')]]</nuxeo-tooltip>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </paper-dialog-scrollable>
            <div class="horizontal layout center end-justified" hidden$="!hasFiles">
              <div class="add-more horizontal layout center">
                <button class="link" on-click="_showUploadDialog">[[i18n('documentImportForm.addMoreFiles')]]</button>
                <span hidden$="[[!_hasVisibleContributions]]"
                  >&nbsp;[[i18n('documentImportForm.linkFilesFrom')]]&nbsp;</span
                >
                <div class="importActions horizontal layout wrap">
                  <nuxeo-slot name="FILE_UPLOAD_ACTIONS" empty="{{!hasContributions}}"></nuxeo-slot>
                </div>
              </div>
            </div>
          </template>
        </div>
        <span class="upload-error" aria-live="assertive">[[_importErrorMessage]]</span>
        <div class="buttons horizontal end-justified layout">
          <div class="flex start-justified">
            <paper-button noink dialog-dismiss on-tap="_cancel" hidden$="[[_creating]]" class="secondary"
              >[[i18n('command.cancel')]]</paper-button
            >
          </div>
          <paper-button
            noink
            id="edit"
            class="primary"
            on-tap="_toggleCustomize"
            hidden$="[[!_canAddProperties(_creating,hasFiles,canCreate)]]"
          >
            [[i18n('documentImportForm.addProperties')]]
          </paper-button>
          <paper-button
            noink
            id="create"
            class="primary"
            on-tap="_import"
            disabled$="[[!_canImport(_creating, hasLocalFilesUploaded,hasRemoteFiles,canCreate)]]"
            aria-label$="[[i18n('command.create')]]"
          >
            <template is="dom-if" if="[[!_isUploadingOrImporting(_creating, hasLocalFiles, hasLocalFilesUploaded)]]">
              [[i18n('command.create')]]
            </template>
            <template is="dom-if" if="[[_isUploadingOrImporting(_creating, hasLocalFiles, hasLocalFilesUploaded)]]">
              <span class="importing-label" hidden$="[[_creating]]" aria-live="assertive">
                [[i18n('documentImport.uploading')]]
              </span>
              <span class="importing-label" hidden$="[[!_creating]]">[[i18n('documentImport.importing')]]</span>
              <paper-spinner-lite active></paper-spinner-lite>
            </template>
          </paper-button>
        </div>
      </div>

      <!--Stage: allow the user to fill in properties for the uploaded files and create the respective documents-->
      <div name="customize" class="vertical layout flex">
        <div class="horizontal layout flex">
          <div id="blobEditor" class="vertical layout flex">
            <paper-dialog-scrollable>
              <div class="suggester">
                <nuxeo-path-suggestion
                  id="pathSuggesterCustomize"
                  label="[[i18n('documentImportForm.location')]]"
                  value="{{targetPath}}"
                  parent="{{suggesterParent}}"
                  children="{{suggesterChildren}}"
                  disabled
                  always-float-label
                ></nuxeo-path-suggestion>
                <span class$="horizontal layout [[_formatErrorMessage(errorMessage)]]">[[errorMessage]]</span>
              </div>
              <iron-form id="form">
                <form class="form vertical layout flex">
                  <div class="horizontal layout center">
                    <div class="flex">
                      <nuxeo-select
                        id="docTypeDropdown"
                        selected="{{selectedDocType}}"
                        attr-for-selected="key"
                        label="[[i18n('documentImportForm.type.label')]]"
                        placeholder="[[i18n('documentImportForm.type.placeholder')]]"
                        name="assetType"
                        error-message="[[i18n('documentImportForm.type.error')]]"
                        required
                      >
                        <template is="dom-repeat" items="[[_importDocTypes]]" as="type">
                          <paper-item key="[[type]]">[[_getTypeLabel(type)]]</paper-item>
                        </template>
                      </nuxeo-select>
                    </div>
                  </div>
                  <!--restamp needed to prevent submit with hidden input fields, which will throw an error-->
                  <template is="dom-if" if="[[document]]" restamp>
                    <nuxeo-document-layout
                      id="document-import"
                      layout="import"
                      document="[[document]]"
                      href-base="[[importPath]]"
                    ></nuxeo-document-layout>
                  </template>
                </form>
              </iron-form>
            </paper-dialog-scrollable>
            <span class="upload-error">[[_importErrorMessage]]</span>
          </div>
          <paper-dialog-scrollable id="sidePanel">
            <div id="blobList" class="flex">
              <div id="checkmarkNote">[[i18n('documentImportForm.unchecked.disclaimer')]]</div>
              <template is="dom-repeat" items="[[localFiles]]" as="file">
                <paper-button
                  noink
                  class$="file-overview [[_selectedLocalDocStyle(index,docIdx,_initializingDoc)]]"
                  on-tap="_tapLocalDoc"
                  disabled$="[[!_canTapDoc(canCreate, _initializingDoc)]]"
                  aria-label$="[[file.error]]"
                >
                  <div class="horizontal layout flex self-stretch">
                    <div class="vertical layout flex">
                      <span class="name" hidden$="[[file.title]]" title="[[file.name]]">[[file.name]]</span>
                      <span class="name" hidden$="[[!file.title]]" title="[[file.title]]">[[file.title]]</span>
                      <template is="dom-if" if="[[_displayProgressBar(file.*)]]">
                        <paper-progress indeterminate="[[!hasProgress()]]" value="[[file.progress]]"></paper-progress>
                      </template>
                      <div class="horizontal layout flex" hidden$="[[!file.error]]">
                        <span class="file-error">[[file.error]]</span>
                        <nuxeo-tooltip>[[file.error]]</nuxeo-tooltip>
                      </div>
                    </div>
                    <iron-icon
                      icon="[[_computedCheckItem(file.*)]]"
                      class$="blobCheck [[_styleFileCheck(file.*)]]"
                      on-tap="_checkTappedLocal"
                    ></iron-icon>
                  </div>
                </paper-button>
              </template>
              <template is="dom-repeat" items="[[remoteFiles]]" as="file">
                <paper-button
                  noink
                  class$="file-overview [[_selectedRemoteDocStyle(index,docIdx,_initializingDoc)]]"
                  on-tap="_tapRemoteDoc"
                  disabled$="[[!_canTapDoc(canCreate, _initializingDoc)]]"
                  aria-label$="[[i18n('command.select')]]"
                >
                  <div class="horizontal layout flex self-stretch">
                    <div class="vertical layout flex">
                      <span class="name flex" hidden$="[[file.title]]" title="[[file.name]]">[[file.name]]</span>
                      <span class="name flex" hidden$="[[!file.title]]" title="[[file.title]]">[[file.title]]</span>
                    </div>
                    <iron-icon
                      icon="[[_computedCheckItem(file.*)]]"
                      class$="blobCheck [[_styleFileCheck(file.*)]]"
                      on-tap="_checkTappedRemote"
                    ></iron-icon>
                  </div>
                </paper-button>
              </template>
              <span class="horizontal layout error" hidden$="[[!_importWithPropertiesError]]"
                >[[_importWithPropertiesError]]</span
              >
            </div>
          </paper-dialog-scrollable>
        </div>
        <div class="buttons horizontal justified layout">
          <paper-button noink dialog-dismiss on-tap="_cancel" hidden$="[[_creating]]" class="secondary">
            [[i18n('command.cancel')]]
          </paper-button>

          <div>
            <paper-button
              noink
              class="text"
              on-tap="_previousFile"
              disabled$="[[_disableEditPrevious(_initializingDoc,_creating,canCreate,customizing,docIdx)]]"
            >
              ❮&nbsp;[[i18n('documentImportForm.previousDocument')]]
            </paper-button>
            <paper-button
              noink
              class="text"
              on-tap="_nextFile"
              disabled$="[[_disableEditNext(_initializingDoc,_creating,canCreate,customizing,docIdx)]]"
            >
              [[i18n('documentImportForm.nextDocument')]]&nbsp;❯
            </paper-button>

            <paper-button
              noink
              class="text"
              name="applyAll"
              on-tap="_applyToAll"
              disabled$="[[_disableApplyToAll(_initializingDoc,_creating,canCreate,customizing,docIdx)]]"
            >
              [[i18n('documentImportForm.applyToAll')]]
            </paper-button>
          </div>

          <paper-button
            noink
            class="primary"
            name="createWithProperties"
            on-tap="_importWithProperties"
            disabled$="[[!_canImportWithMetadata(_creating,_initializingDoc,canCreate,hasLocalFilesUploaded,hasRemoteFiles,localFiles.*,remoteFiles.*)]]"
            aria-label$="[[i18n('command.create')]]"
          >
            <template is="dom-if" if="[[!_isUploadingOrImporting(_creating, hasLocalFiles, hasLocalFilesUploaded)]]">
              [[i18n('command.create')]]
            </template>
            <template is="dom-if" if="[[_isUploadingOrImporting(_creating, hasLocalFiles, hasLocalFilesUploaded)]]">
              <span class="importing-label" hidden$="[[_creating]]">[[i18n('documentImport.uploading')]]</span>
              <span class="importing-label" hidden$="[[!_creating]]">[[i18n('documentImport.importing')]]</span>
              <paper-spinner-lite active></paper-spinner-lite>
            </template>
          </paper-button>
        </div>
      </div>
    </iron-pages>

    <nuxeo-document-creation-stats id="creationStats"></nuxeo-document-creation-stats>
  `,is:"nuxeo-document-import",behaviors:[u.M,o.z,v.S,x.U],importMeta:{url:`${window.location.protocol}//${window.location.host}${window.location.pathname}/document/nuxeo-document-import.js`},properties:{batchAppend:{value:!0},stage:{type:String,value:"upload"},docIdx:{type:Number,value:-1},localFiles:{type:Array,value:[]},remoteFiles:{type:Array,value:[]},selectedDocType:{type:String,observer:"_selectedDocTypeChanged"},documentBlobProperties:{type:Object,value:{default:"file:content",note:"note:note"}},hasLocalFiles:{type:Boolean,value:!1,notify:!0},hasRemoteFiles:{type:Boolean,value:!1,notify:!0},hasFiles:{type:Boolean,value:!1,computed:"_computeHasFiles(hasLocalFiles,hasRemoteFiles)"},visible:{type:Boolean},_doNotCreate:{type:Boolean,value:!1},_docProperties:{type:Object,value:{}},_hasVisibleContributions:{type:Boolean},_importDocTypes:{type:Array,computed:"_computeImportDocTypes(subtypes)"},_creating:{type:Boolean,value:!1},_initializingDoc:{type:Boolean,value:!1},_importErrorMessage:{type:String,value:""},_importWithPropertiesError:String},listeners:{batchFinished:"_batchReady","nx-blob-picked":"_blobPicked","nx-document-creation-parent-validated":"_parentValidated",uploadInterrupted:"_handleError",batchFailed:"_handleError"},observers:["_observeFiles(files.*)","_observeRemoteFiles(remoteFiles.splices)","_visibleOnStage(visible,stage)"],ready(){this.connection=this.$.nx,this.$.docRequest.$.nxResource.set("uncancelable",!0),this.setupDropZone(this.$.dropzone),this._clear(),this.addEventListener("element-changed",this._layoutUpdated.bind(this),!0)},init(e){e&&this.uploadFiles(e),this.set("_hasVisibleContributions",this.hasContributions&&!!this.$$(".importActions > *:not([hidden]):not(nuxeo-slot)")),this._importErrorMessage=""},_observeFiles(e){if(e)if("files.splices"===e.path&&e.value&&e.value.indexSplices)e.value.indexSplices.forEach((function(e){for(let t=0;t<e.addedCount;t++){const i=e.index+t;this.push("localFiles",this.files[i])}}),this),this.hasLocalFiles=this.localFiles&&this.localFiles.length>0,this.hasLocalFilesUploaded=!1;else{const t=e.path.match(/(files\.\d+)\.(\w+)/);if(t){const e=this.localFiles.indexOf(this.get(t[1]));this.notifyPath(["localFiles",e,t[2]].join(".")),"complete"!==t[2]&&"error"!==t[2]||(this.hasLocalFilesUploaded=this.hasLocalFiles&&this.localFiles.every((e=>!e||e.complete||e.error)),this.hasLocalFilesUploaded&&this._getAllFiles().forEach(((e,t)=>e.error&&this._setFileProp(t,"checked",!1))))}}},_observeRemoteFiles(){this.hasRemoteFiles=this.remoteFiles&&this.remoteFiles.length>0},_showDropzoneFileHeadings(){return this.hasLocalFiles&&this.hasRemoteFiles},_canImport(){return(this.hasLocalFiles?this.hasLocalFilesUploaded:this.hasRemoteFiles)&&this.canCreate&&!this._creating},_isUploadingOrImporting(){return this._creating||!!this.hasLocalFiles&&!this.hasLocalFilesUploaded},_canImportWithMetadata(){return this._getAllFiles().every((e=>"checked"in e))&&this._canImport()},_canAddProperties(){return this.hasFiles&&this.canCreate&&!this._creating},_showUploadDialog(){this.$.uploadFiles.click()},_filesChanged(e){this.uploadFiles(e.target.files)},_selectedDocTypeChanged(){this._validate()},_toggleCustomize(){if("upload"===this.stage){this.stage="customize",this.customizing=!0,this.set("selectedDocType",""),this.fire("nx-creation-wizard-hide-tabs");const e=this._getAllFiles().findIndex((e=>!e.error));this._selectDoc(e<0?0:e)}else this.stage="upload",this.customizing=!1,this.fire("nx-creation-wizard-show-tabs")},_computeHasFiles(){return this.hasLocalFiles||this.hasRemoteFiles},_getAllFiles(){return this.localFiles&&this.remoteFiles?this.localFiles.concat(this.remoteFiles):this.localFiles?this.localFiles:this.remoteFiles},_getTotalFileCount(){return(this.localFiles?this.localFiles.length:0)+(this.remoteFiles?this.remoteFiles.length:0)},_getCurrentFile(){return this._getAllFiles()[this.docIdx]},_isValidFileIndex(e){const t=this._getTotalFileCount();return t>0&&e>=0&&e<t},_getFile(e){if(this._isValidFileIndex(e))return this._getAllFiles()[e]},_setFileProp(e,t,i){if(this._isValidFileIndex(e)){let a=e,o="localFiles";a>=this.localFiles.length&&(o="remoteFiles",a-=this.localFiles.length),this._setFilePropEx(o,a,t,i)}},_setFilePropEx(e,t,i,a){this.set([e,t,i].join("."),a)},_getCurrentFileTitle(){const e=this._getCurrentFile();return e?e.name:""},_getRemainingDocs(){const e=this._getTotalFileCount();return e>1?this.i18n("documentImportForm.addProperties.otherDocuments",e-1-this.docIdx):""},_copyFileData(e,t){const i=this._getFile(e),a=this._getFile(t),{docData:o}=i;let n={};o&&Object.keys(o).length>0&&(n=JSON.parse(JSON.stringify(o))),n.document.properties["dc:title"]=a.name,this._setFileProp(t,"docData",n),this._setFileProp(t,"checked",!0)},_storeFile(e){if(this._isValidFileIndex(e)){let t=e,i="localFiles";t>=this.localFiles.length&&(i="remoteFiles",t-=this.localFiles.length),this.set([i,t,"docData"].join("."),{parent:this.targetPath,document:JSON.parse(JSON.stringify(this.document)),type:this.selectedDocType}),this.set([i,t,"sanitizedName"].join("."),this._sanitizeName(this.document.properties["dc:title"])),this.set([i,t,"title"].join("."),this.document.properties["dc:title"])}},_loadFile(e,t){let i={};return e&&Object.keys(e).length>0&&(this.targetPath=e.parent,this.selectedDocType=this._importDocTypes.find((t=>t.id===e.type.id)),({properties:i}=JSON.parse(JSON.stringify(e.document)))),t&&(i["dc:title"]=t),this._docProperties=i,this._updateDocument()},_nextFile(){this._hasNextFile()&&this._selectDoc(this.docIdx+1)},_previousFile(){this._hasPreviousFile()&&this._selectDoc(this.docIdx-1)},_hasNextFile(){const e=this._getTotalFileCount();return e>1&&this.docIdx<e-1&&this.canCreate&&!this._creating},_hasPreviousFile(){return this._getTotalFileCount()>1&&this.docIdx>0&&this.canCreate&&!this._creating},async _selectDoc(e){if(!this._isValidFileIndex(e))throw new Error(`invalid file index: ${e}`);if(this.docIdx!==e&&(this.docIdx<0||this._validate())){this.docIdx>-1&&this._storeFile(this.docIdx);const t=this._getCurrentFile();this.docIdx=e;const i=this._getCurrentFile();i.checked?await this._loadFile(i.docData):t?await this._loadFile(t.docData,i.name):await this._loadFile({},i.name),i.error?this._setFileProp(e,"checked",!1):"checked"in i||this._setFileProp(e,"checked",!0)}const t=this._getCurrentFile();t&&t._validationReport&&this.$$("#document-import").reportValidation(t._validationReport)},_validate(){const e=this.$$("#document-import"),t=this._doNativeValidation(this.$.form)&&this.$.form.validate();if(t||!e)return t;const i=e.$.layout,a=i._getValidatableElements(i.element.root).find((e=>e.invalid));a&&(a.scrollIntoView(),a.focus())},_canTapDoc(){return this.canCreate&&!this._initializingDoc},_tapLocalDoc(e){this._selectDoc(e.model.index)},_tapRemoteDoc(e){this._selectDoc(e.model.index+this.localFiles.length)},_selectedLocalDocStyle(e){return e!==this.docIdx||this._initializingDoc?"":"selected"},_selectedRemoteDocStyle(e){return e+this.localFiles.length!==this.docIdx||this._initializingDoc?"":"selected"},_cancel(){this.cancelBatch(),this._clear(),this.fire("nx-creation-wizard-show-tabs")},_clear(){this.stage="upload",this.files=[],this.localFiles=[],this.remoteFiles=[],this.hasLocalFilesUploaded=!1,this.hasLocalFiles=!1,this.hasRemoteFiles=!1,this.properties=[],this.customizing=!1,this.docIdx=-1,this._doNotCreate=!1,this._docProperties={},this._creating=!1,this._initializingDoc=!1,this._importWithPropertiesError="",this._importErrorMessage="",this.$.uploadFiles.value="",this.selectedDocType=""},_importWithProperties(){this._validate()&&(this._creating=!0,this._storeFile(this.docIdx),this._processFilesWithMetadata())},_import(){this._creating=!0;const e={context:{currentDocument:this.targetPath}},t=this.batchId&&this.localFiles&&this.localFiles.length>0,i=this.remoteFiles&&this.remoteFiles.length>0;t&&i?this._smartImportLocalFiles(e).then((t=>{this._smartImportRemoteFiles(e).then((e=>{this._handleSuccess(this._mergeResponses(t,e))}),this._handleError.bind(this))}),this._handleError.bind(this)):t?this._smartImportLocalFiles(e).then(this._handleSuccess.bind(this),this._handleError.bind(this)):this._smartImportRemoteFiles(e).then(this._handleSuccess.bind(this),this._handleError.bind(this))},_handleSuccess(e,t){void 0===t&&(t=!0),this._notify(e,t),e.entries&&Array.isArray(e.entries)?e.entries.forEach((e=>{this.$.creationStats.storeType(e.type.toLowerCase())})):e.type&&this.$.creationStats.storeType(e.type),t&&(this.cancelBatch(),this._clear(),e.entries&&1!==e.entries.length?(this.fire("document-updated"),this.navigateTo(this.parent)):this.navigateTo(e.entries?e.entries[0]:e))},_handleError(e){this.set("_creating",!1),this.set("_importErrorMessage",this.i18n("documentImport.error.importFailed"));const t=e.message||e.detail&&e.detail.error;this.notify({message:`${this.i18n("label.error").toUpperCase()}: ${t}`})},_mergeResponses(...e){const t={"entity-type":"Documents",entries:[]};for(let i=0;i<e.length;i++){const a=e[i];a&&a.entries?t.entries.concat(a.entries):t.entries.push(a)}return t},_smartImportLocalFiles(e){return this.batchExecute("FileManager.Import",e,{"nx-es-sync":"true","X-Batch-No-Drop":"true"})},_smartImportRemoteFiles(e){return this.$.fileManagerImport.input=`blobs:${this.remoteFiles.map((e=>e.key)).join()}`,this.$.fileManagerImport.params=e,this.$.fileManagerImport.params.noMimeTypeCheck=!0,this.$.fileManagerImport.execute()},_processFilesWithMetadata(){this._importWithPropertiesError="";const e=this._getTotalFileCount(),t=this,i=[],a=[],o=[];for(let n=0;n<e;n++){let e=t.localFiles,s=n;n>=t.localFiles.length&&(e=t.remoteFiles,s=n-t.localFiles.length),i.push(function(i,a){return(e[a].docData&&e[a].checked&&!e[a].error?t._processFileWithMetadata(e[a]):Promise.resolve({"entity-type":"Documents",entries:[]})).then((e=>(i.push(a),e))).catch((t=>(t instanceof Error||!t["entity-type"]||"validation_report"!==t["entity-type"]||(e[a]._validationReport=t),t)))}(n>=t.localFiles.length?o:a,s))}Promise.all(i).then((e=>{const t=e.filter((e=>!(e instanceof Error)&&e["entity-type"]&&"exception"!==e["entity-type"]&&"validation_report"!==e["entity-type"]));this._handleSuccess(this._mergeResponses.apply(null,t),!(t.length<e.length)),t.length<e.length&&(this.set("_creating",!1),this.set("_importWithPropertiesError","These documents could not be created."),a.sort().reverse().forEach((e=>{this.splice("localFiles",e,1)})),o.sort().reverse().forEach((e=>{this.splice("remoteFiles",e,1)})),this.docIdx=-1,this._selectDoc(0))}))},_processFileWithMetadata(e){const{document:t,parent:i}=e.docData;t.name=e.sanitizedName||e.name;const a=this.documentBlobProperties[e.docData.type.id]||this.documentBlobProperties.default;return t.properties[a]=e.providerId?{providerId:e.providerId,user:e.user,fileId:e.fileId}:{"upload-batch":this.batchId,"upload-fileId":String(e.index)},this.$.docRequest.data=t,this.$.docRequest.docPath=i,this.$.docRequest.post()},_removeFile(e){this.splice("localFiles",e,1),this.hasLocalFiles=this.localFiles&&this.localFiles.length>0,this.localFiles.some((e=>e.error))||(this._importErrorMessage=""),this.$.uploadFiles.value=""},_removeBlob(e){const{file:t,index:i}=e.model;t.providerId?this.splice("remoteFiles",i,1):e.model.file.error||e.model.file.complete||!this.hasAbort()?(this.$.blobRemover.path=`upload/${this.batchId}/${t.index}`,this.$.blobRemover.remove().then((()=>{this._removeFile(i)}),(e=>{404===e.status?this._removeFile(i):this._handleError(e)}))):(this.abort(e.model.file),this._removeFile(i))},_batchReady(e){e.stopPropagation(),this.properties=[];for(let e=0;e<this.localFiles.length;e++)this.properties.push({});const t=this.$$('div[name="upload"]');t&&t.focus()},_blobPicked(e){this.hasRemoteFiles=!0,this.notifyPath("remoteFiles",this.remoteFiles.concat(e.detail.blobs))},_getDocumentProperties(){return this._docProperties},_computedCheckItem:e=>e.base&&e.base.checked?"icons:check-circle":"icons:radio-button-unchecked",_computeRemoveIcon(e){if(e.base){if(e.base.complete||e.base.error)return"nuxeo:remove";if(this.hasAbort())return"icons:cancel"}return""},_computeRemoveLabel(e){if(e.base){if(e.base.complete||e.base.error)return this.i18n("command.remove");if(this.hasAbort())return this.i18n("command.cancel")}return""},_computeRemoveBtnTitle(e){return`${e}${this.i18n("command.remove")}`},_styleFileCheck:e=>e.base&&"checked"in e.base?e.base.checked?"checked":"unchecked":"hidden",_checkTappedLocal(e){e.stopPropagation(),e.model.file.error||this._setFilePropEx("localFiles",e.model.index,"checked",!e.model.file.checked)},_checkTappedRemote(e){e.stopPropagation(),e.model.file.error||this._setFilePropEx("remoteFiles",e.model.index,"checked",!e.model.file.checked)},_canApplyToAll(){return this.customizing&&0===this.docIdx&&this._getTotalFileCount()>1&&this.canCreate&&!this._creating},_applyToAll(){const e=this._getTotalFileCount()-1;if(this._isValidFileIndex(this.docIdx)&&this._isValidFileIndex(e)&&this._validate()){this._storeFile(0);for(let t=1;t<=e;t++)this._copyFileData(0,t);this._selectDoc(e)}},_filterImportDocTypes:e=>-1===window.nuxeo.importBlacklist.indexOf(e.type),_computeImportDocTypes(){if(this.subtypes)return this.subtypes.filter(this._filterImportDocTypes)},_parentValidated(){this.canCreate&&this._importDocTypes&&0===this._importDocTypes.length&&(this.set("canCreate",!1),this.set("errorMessage",this.i18n("documentImport.error.cannotImport")))},_visibleOnStage(){this.$.pathSuggesterUpload.disabled=!this.visible||"upload"!==this.stage,this.$.pathSuggesterCustomize.disabled=!this.visible||"customize"!==this.stage},_updateDocument(){return this._initializingDoc=!0,this._isValidType(this.selectedDocType)&&this.parent?this.newDocument(this.selectedDocType.type,this._getDocumentProperties()).then((e=>{if(e.parentRef=this.parent.uid,!this.document||this.document.type!==e.type&&!customElements.get(`nuxeo-${e.type.toLowerCase()}-import-layout`)){const t=new Promise((e=>{this._layout_changed=t=>{t.detail.element&&(this.removeEventListener("document-layout-changed",this._layout_changed),e(t))},this.addEventListener("document-layout-changed",this._layout_changed)}));return this.document=e,t.then((e=>{e.detail.element&&(this._initializingDoc=!1)}))}this.document=e,this._initializingDoc=!1})):(this.document=null,this.$.docTypeDropdown.invalid=!1,void(this._initializingDoc=!1))},_displayProgressBar:e=>e.base&&!e.base.providerId&&!e.base.complete&&!e.base.error,_displayRemoveBlobBtn(e){return e.base&&(e.base.complete||e.base.error||this.hasAbort())},_layoutUpdated(e){this.async((()=>{const t=e.detail.value.querySelector("[autofocus]");t&&t.focus()}))},_submitKeyHandler(e){"upload"===this.stage&&this._canImport()&&this._import(),"customize"===this.stage&&"INPUT"===e.detail.keyboardEvent.target.tagName&&(this._hasNextFile()?this._nextFile():this._canImportWithMetadata()&&this._importWithProperties())},_doNativeValidation:()=>!0,_disableEditPrevious(){return this._initializingDoc||!this._hasPreviousFile()},_disableEditNext(){return this._initializingDoc||!this._hasNextFile()},_disableApplyToAll(){return this._initializingDoc||!this._canApplyToAll()}}),i(62568),i(52603),i(85109);var b=i(54398);(0,m.k)({_template:h.d`
    <style include="nuxeo-styles">
      :host {
        display: block;
      }

      .title {
        margin: 16px;
        text-align: center;
      }

      .dialog {
        margin: 0;
        padding: 0;
        border-radius: 4px;
      }

      .actions {
        @apply --layout-horizontal;
        @apply --layout-justified;
        margin: 8px;
        padding: 0;
        text-align: right;
      }
    </style>

    <paper-button noink id="button" class="primary" on-tap="_toggleDialog" aria-label$="[[i18n('command.confirm')]]">
      <slot></slot>
    </paper-button>

    <nuxeo-dialog
      id="dialog"
      class="dialog"
      no-overlap
      horizontal-align="auto"
      vertical-align="auto"
      on-iron-overlay-closed="_dismiss"
    >
      <div class="title">[[dialogTitle]]</div>
      <div class="actions">
        <paper-button noink dialog-dismiss class="secondary">[[dialogDismiss]]</paper-button>
        <paper-button noink dialog-confirm class="primary" on-tap="_confirm">[[dialogConfirm]]</paper-button>
      </div>
    </nuxeo-dialog>
  `,is:"nuxeo-confirm-button",properties:{dialogTitle:{type:String,value:"Are you sure?"},dialogConfirm:{type:String,value:"Yes"},dialogDismiss:{type:String,value:"No"},_model:{type:Object}},ready(){this.$.dialog.positionTarget=this.$.button},_toggleDialog(e){this._model=e.model,this.$.dialog.toggle()},_confirm(){this.fire("confirm",{model:this._model})},_dismiss(){this.fire("dismiss",{model:this._model})}}),(0,m.k)({_template:h.d`
    <style>
      :host {
        display: inline-block;
      }

      nuxeo-confirm-button {
        display: inline-block;
      }

      nuxeo-confirm-button .label {
        font-weight: 500;
      }
    </style>

    <nuxeo-operation id="unpublishOp" op="Document.Delete" input="[[document]]" sync-indexing></nuxeo-operation>

    <template is="dom-if" if="[[_isAvailable(document)]]">
      <nuxeo-confirm-button
        dialog-title="[[i18n('publication.unpublish.confirm')]]"
        dialog-dismiss="[[i18n('label.no')]]"
        dialog-confirm="[[i18n('label.yes')]]"
        on-confirm="_unpublish"
        class="secondary"
        aria-labelledby="label"
      >
        <span class="label" id="label">[[i18n('publication.unpublish')]]</span>
      </nuxeo-confirm-button>
    </template>
  `,is:"nuxeo-unpublish-button",behaviors:[u.M,l.mB,d.N,s.q],properties:{document:Object},_isAvailable(){return this.document&&this.document.isProxy&&this.hasPermission(this.document,"WriteVersion")},_unpublish(){this.$.unpublishOp.execute().then((()=>{this.notify({message:this.i18n("publication.unpublish.success")}),this.fire("nx-unpublish-success")})).catch((()=>{this.notify({message:this.i18n("publication.unpublish.error")})}))}}),(0,m.k)({_template:h.d`
    <style include="nuxeo-styles iron-flex">
      :host {
        @apply --layout-horizontal;
        @apply --layout-center;
        @apply --layout-justified;
        padding: 8px;
        margin-bottom: 16px;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.04);
        background-color: var(--nuxeo-box);
      }

      iron-icon {
        margin: 0 0.5em;
        width: 1.5em;
      }
    </style>

    <nuxeo-document id="srcDoc" loading="{{loadingSrc}}"></nuxeo-document>

    <div class="layout horizontal" hidden$="[[loadingSrc]]">
      <iron-icon icon="icons:info"></iron-icon>
      <div>
        <a href$="[[_srcUrl(_src)]]" disabled$="[[_srcDeleted]]">
          [[_infoLabel(_srcDeleted, document)]]
        </a>
      </div>
    </div>
    <nuxeo-unpublish-button document="[[document]]"></nuxeo-unpublish-button>
  `,is:"nuxeo-publication-info-bar",behaviors:[l.mB,s.q,d.N],properties:{document:{type:Object,observer:"_updateSrc"},_redirectDoc:Object,_src:Object,_srcDeleted:Boolean},listeners:{"nx-unpublish-success":"_redirect"},_updateSrc(){this._src=null,this._srcDeleted=!1,this.document&&this.document.isProxy&&(this.$.srcDoc.docId=this.document.properties["rend:sourceId"]||this.document.versionableId,this.$.srcDoc.get().then((e=>{this._src=e,this._redirectDoc=this.document.contextParameters&&this.document.contextParameters.firstAccessibleAncestor||e})).catch((e=>{if(404!==e.status)throw e;this._srcDeleted=!0})))},_redirect(){this.fire("navigate",{doc:this._redirectDoc})},_infoLabel(){return this._srcDeleted?this.i18n("publication.info.deleted"):this.i18n("publication.info",this.document.title)},_srcUrl(){return this._src?this.urlFor("document","uid"===b.v.get("router.key.document")&&this._src.versionableId||this._src.path):null}}),(0,m.k)({_template:h.d`
    <style>
      :host {
        display: inline-block;
      }

      nuxeo-confirm-button {
        display: inline-block;
      }

      nuxeo-confirm-button .version {
        font-weight: 500;
        padding-left: 8px;
      }
    </style>

    <nuxeo-operation id="opGetLatest" op="Proxy.GetSourceDocument" input="[[document.uid]]" response="{{latest}}">
    </nuxeo-operation>

    <nuxeo-operation id="opRestoreVersion" op="Document.RestoreVersion" input="[[document.uid]]"></nuxeo-operation>

    <template is="dom-if" if="[[_isAvailable(latest)]]">
      <nuxeo-confirm-button
        dialog-title="[[i18n('versions.confirm.title')]]"
        dialog-dismiss="[[i18n('label.no')]]"
        dialog-confirm="[[i18n('label.yes')]]"
        on-confirm="_restore"
        class="secondary"
      >
        [[i18n('versions.restore')]]
        <span class="version"
          >[[document.properties.uid:major_version]].[[document.properties.uid:minor_version]]
        </span>
      </nuxeo-confirm-button>
    </template>
  `,is:"nuxeo-restore-version-button",behaviors:[s.q,l.mB,d.N],properties:{document:Object,latest:Object},observers:["_update(document)"],_update(){this.document.isVersion?this.$.opGetLatest.execute():this.latest=null},_isAvailable(){return!(!this.document||!this.latest||this.isRecord(this.latest))&&(`${this.document.properties["uid:major_version"]}.${this.document.properties["uid:minor_version"]}`!=`${this.latest.properties["uid:major_version"]}.${this.latest.properties["uid:minor_version"]}`||this.latest.isCheckedOut)},_restore(){this.document&&(this.$.opRestoreVersion.input=this.document.uid,this.$.opRestoreVersion.params={checkout:!0},this.$.opRestoreVersion.execute().then((()=>{this.navigateTo("document","uid"===b.v.get("router.key.document")&&this.document.versionableId||this.document.path)})))}});var g=i(74153);i(45154),(()=>{const e=function(e,...t){e=e||{};const i=jsPlumb.Connectors.AbstractConnector.apply(this,t);this.type="nxFlowchart";const{segments:a}=e;this._compute=()=>{for(let e=1;e<a.length;e++)i.addSegment(this,"Straight",{x1:a[e-1].x,y1:a[e-1].y,x2:a[e].x,y2:a[e].y})}};jsPlumbUtil.extend(e,jsPlumb.Connectors.AbstractConnector),jsPlumb.Connectors.nxFlowchart=e})(),(0,m.k)({_template:h.d`
    <style include="nuxeo-styles">
      :host {
        display: block;
      }

      #container {
        position: relative;
        width: 880px;
        height: 720px;
      }

      .workflow_node {
        position: absolute;
        text-align: center;
        font-size: 0.92em;
        z-index: 100;
      }

      .workflow_simple_task,
      .workflow_multiple_task {
        height: 80px;
        width: 80px;
        color: #006da6;
        padding-top: 1.2em;
        background-color: #f7f8f9;
        border-radius: 0.5em;
        box-sizing: border-box;
      }

      .workflow_simple_task {
        border: 1px solid #3c9ae2;
      }

      .workflow_multiple_task {
        border: 3px double #3c9ae2;
      }

      .workflow_fork_node,
      .workflow_merge_node {
        width: 0;
        height: 0;
        border-bottom: 40px solid #a4c9da;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        line-height: 100%;
      }

      .workflow_merge_node {
        border-top: 40px solid #dededd;
        border-bottom: 0;
        line-height: 0;
      }

      .workflow_start_node,
      .workflow_end_node {
        width: 40px;
        height: 40px;
        background: #92c938;
        border-radius: 40px;
        color: #fff;
        line-height: 40px;
      }

      .workflow_end_node {
        background: #f04545;
      }

      .workflow_subworkflow_task {
        border: 2px solid #3c9ae2;
        /*background: url("../icons/subworkflow_bg_node.png") no-repeat scroll right bottom white*/
      }

      .workflow_node_suspended {
        background-color: #3c9ae2;
        font-weight: bold;
        color: #fff;
      }

      .workflow_connection_label {
        background-color: white;
        padding: 0.15em 0.25em;
        font: 12px sans-serif;
        color: #3780b9;
        z-index: 120;
        border: 1px dotted rgba(0, 0, 0, 0.2);
        opacity: 0.85;
        filter: alpha(opacity = 85);
        max-width: 170px;
        word-wrap: break-word;
        transform: none !important;
      }

      .jtk-endpoint {
        z-index: 110;
      }

      .jtk-overlay {
        z-index: 6;
      }
    </style>

    <nuxeo-resource
      id="graphResource"
      path="/workflow/[[workflowId]]/graph"
      response="{{graph}}"
      headers='{"Content-Type":"application/json"}'
    ></nuxeo-resource>

    <nuxeo-dialog id="graphDialog" with-backdrop>
      <paper-dialog-scrollable>
        <div class="graph-container">
          <div id="container"></div>
        </div>
      </paper-dialog-scrollable>
      <div class="buttons">
        <paper-button noink class="primary" dialog-dismiss>[[i18n('command.close')]]</paper-button>
      </div>
    </nuxeo-dialog>
  `,is:"nuxeo-workflow-graph",behaviors:[u.M,l.mB,o.z],properties:{workflowId:{type:String},graph:{type:Object},dynamicAnchors:{type:Array,value:[.5,.25,.75,0,1,.375,.625,.125,.875]},connectionColors:{type:Array,value:["#92e1aa","#F7BE81","#BDBDBD","#5882FA","#E1F5A9","#FA5858","#FFFF00","#FF0000","#D8F781"]},sourceEndpointOptions:{type:Object,value:{connector:["Flowchart",{cornerRadius:5}],paintStyle:{fill:"#92e1aa"},isSource:!0,isTarget:!1,uniqueEndpoint:!0,maxConnections:1}},targetEndpointOptions:{type:Object,value:{paintStyle:{fill:"#003f7d"},isSource:!1,isTarget:!0,reattach:!0,maxConnections:-1}},_jsPlumbInstance:{type:Object}},observers:["_updateGraph(graph)"],listeners:{"iron-resize":"_resize"},ready(){this.scopeSubtree(this.$.container,!0),this._initialize()},show(){this.$.graphResource.execute().then((()=>{this.$.graphDialog.toggle()})).catch((e=>{throw this.notify({message:this.i18n("documentPage.route.view.graph.error")}),e}))},_initialize(){this._jsPlumbInstance=jsPlumb.getInstance({DragOptions:{cursor:"pointer",zIndex:2e3},PaintStyle:{stroke:"#92e1aa",strokeWidth:3,outlineWidth:2,outlineStroke:"white",joinstyle:"round"},Endpoint:["Dot",{radius:6}],ConnectionOverlays:[["Arrow",{location:.8},{foldback:.9,fill:"#92e1aa",width:14}]]}),this._jsPlumbInstance.setContainer(this.$.container)},_transitionOverlay:e=>[["Arrow",{location:.8},{foldback:.9,fill:"#92e1aa",width:14}],["Label",{label:`<span title="${e.label}">${e.label}</span>`,cssClass:"workflow_connection_label",location:.6}]],_nodeClass:e=>e.isStartNode?"workflow_start_node":e.isEndNode?"workflow_end_node":e.isForkNode?"workflow_fork_node":e.isMerge?"workflow_merge_node":e.isMultiTask?"workflow_multiple_task":e.hasSubWorkflow?"workflow_subworkflow_task":"workflow_simple_task",_updateGraph(e){if(!e)return;for(;this.$.container.firstChild;)this.$.container.removeChild(this.$.container.firstChild);this._jsPlumbInstance.reset(),e.nodes.forEach((e=>{const t=this.create("div",{id:e.id,innerHTML:e.title});t.style.left=`${e.x}px`,t.style.top=`${e.y}px`,t.classList.add("workflow_node"),t.classList.add(this._nodeClass(e)),"suspended"===e.state&&t.classList.add("workflow_node_suspended"),this.$.container.appendChild(t)}));const t=[],i={};e.transitions.forEach((e=>{i[e.nodeSourceId]=(i[e.nodeSourceId]||0)+1})),e.transitions.forEach((e=>{const a=e.nodeSourceId;let o=t.filter((e=>e===a)).length;o>9&&(o=0),t.push(a);const n=e.nodeTargetId,s=this.dynamicAnchors.slice(0,i[a]).sort(),r=this._addSourceEndpoint((0,g.vz)(this.$.container).querySelector(`#${a}`),s[o],e.path),l=this._addTargetEndpoint((0,g.vz)(this.$.container).querySelector(`#${n}`));this._jsPlumbInstance.connect({source:r,target:l,overlays:this._transitionOverlay(e),paintStyle:{strokeWidth:3,stroke:this.connectionColors[o],outlineWidth:2,outlineStroke:"white",joinstyle:"round"},detachable:!1})}))},_addTargetEndpoint(e){return this._jsPlumbInstance.addEndpoint(e,{anchor:"TopCenter"},this.targetEndpointOptions)},_addSourceEndpoint(e,t,i){const a=[t,1,0,1],o=i&&i.length>2?["nxFlowchart",{segments:i}]:"Flowchart";return this._jsPlumbInstance.addEndpoint(e,{anchor:a,connector:o},this.sourceEndpointOptions)},_resize(){this._jsPlumbInstance.repaintEverything()}}),(0,m.k)({_template:h.d`
    <style include="nuxeo-styles iron-flex">
      .bar {
        @apply --layout-horizontal;
        @apply --layout-center;
        @apply --layout-justified;
        padding: 8px;
        margin-bottom: 16px;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.04);
        background-color: var(--nuxeo-box);
      }

      .bar.task {
        background: black;
        color: white;
      }

      .bar.record {
        background: black;
        color: white;
      }

      .item {
        @apply --layout-horizontal;
        @apply --layout-center;
        @apply --layout-flex;
      }

      a.viewGraph {
        text-decoration: underline;
        margin-right: 1em;
      }

      iron-icon {
        margin: 0 0.5em;
        width: 1.5em;
      }
    </style>

    <nuxeo-connection id="nxcon" user="{{currentUser}}"></nuxeo-connection>

    <nuxeo-resource id="worfklow" path="/workflow"></nuxeo-resource>
    <nuxeo-resource id="task" path="/task" headers='{"fetch-task": "targetDocumentIds,actors"}'></nuxeo-resource>
    <nuxeo-resource id="user" path="/user"></nuxeo-resource>

    <!-- workflows -->
    <template is="dom-repeat" items="[[workflows]]" as="workflow">
      <nuxeo-workflow-graph id="graph-[[workflow.id]]" workflow-id="[[workflow.id]]"></nuxeo-workflow-graph>
      <div class="bar workflow">
        <div class="item">
          <iron-icon class="icon" icon="icons:perm-data-setting"></iron-icon>
          <template is="dom-if" if="[[!_isCurrentUser(workflow.initiator, currentUser)]]">
            <nuxeo-user-tag user="[[workflow.initiator]]"></nuxeo-user-tag>
          </template>
          <span>[[_labelForInitiatedWf(workflow, currentUser)]]</span>
        </div>
        <a class="viewGraph" on-tap="_toggleGraphDialog">[[i18n('documentPage.route.view.graph')]]</a>
        <template is="dom-if" if="[[_hasPermissionToAbandon(workflow.initiator, currentUser)]]">
          <paper-button class="primary" on-tap="_abandonWorkflow" noink
            >[[i18n('documentPage.abandon.workflow')]]</paper-button
          >
        </template>
      </div>
    </template>

    <!-- tasks -->
    <template is="dom-repeat" items="[[tasks]]" as="task">
      <div class="bar task">
        <div class="item">
          <iron-icon class="icon" icon="icons:assignment-turned-in"></iron-icon>
          <span
            >[[i18n('documentPage.to.process')]]
            <nuxeo-date datetime="[[task.dueDate]]"></nuxeo-date>
          </span>
        </div>
        <paper-button class="primary" on-tap="_processTask" noink>[[i18n('documentPage.process.task')]]</paper-button>
      </div>
    </template>

    <!-- Record -->
    <template is="dom-if" if="[[isUnderRetentionOrLegalHold(document)]]">
      <div id="retentionInfoBar" class="bar record">
        <div class="layout horizontal center flex">
          <template is="dom-if" if="[[document.hasLegalHold]]">
            <iron-icon icon="nuxeo:hold"></iron-icon>
            <span id="legalHold">[[i18n('documentPage.legalHold')]]</span>
          </template>
          <template is="dom-if" if="[[document.retainUntil]]">
            <iron-icon icon="nuxeo:retain"></iron-icon>
            <template is="dom-if" if="[[!isRetentionDateIndeterminate(document)]]">
              <span id="retention" hidden="[[document.hasLegalHold]]">[[_computeRetentionUntiLabel(document)]]</span>
            </template>
            <template is="dom-if" if="[[isRetentionDateIndeterminate(document)]]">
              <span id="indeterminateRetention" hidden="[[document.hasLegalHold]]">
                [[i18n('documentPage.retainIndeterminate')]]
              </span>
            </template>
          </template>
        </div>
      </div>
    </template>

    <!-- trash -->
    <template is="dom-if" if="[[isTrashed(document)]]">
      <div id="trashedInfoBar" class="bar trashed">
        <div class="layout horizontal center flex">
          <iron-icon icon="icons:info"></iron-icon>
          <span>[[i18n('documentPage.trash.info')]]</span>
        </div>
        <template is="dom-if" if="[[!hasPermission(document, 'Write')]]">
          <div>[[i18n('documentPage.trash.noPermissionToRestore')]]</div>
        </template>
        <template is="dom-if" if="[[hasPermission(document, 'Write')]]">
          <nuxeo-untrash-document-button document="[[document]]"></nuxeo-untrash-document-button>
        </template>
        <template is="dom-if" if="[[hasPermission(document, 'Remove')]]">
          <nuxeo-delete-document-button document="[[document]]" hard></nuxeo-delete-document-button>
        </template>
      </div>
    </template>

    <!-- version -->
    <template is="dom-if" if="[[isVersion(document)]]">
      <div id="versionInfoBar" class="bar version">
        <div class="layout horizontal center">
          <iron-icon icon="icons:info"></iron-icon>
          <span
            >[[i18n('versions.info', document.properties.uid:major_version,
            document.properties.uid:minor_version)]]</span
          >
        </div>
        <nuxeo-restore-version-button document="[[document]]"></nuxeo-restore-version-button>
      </div>
    </template>

    <!-- proxy/publication -->
    <template is="dom-if" if="[[isPublication(document)]]">
      <nuxeo-publication-info-bar document="[[document]]"></nuxeo-publication-info-bar>
    </template>

    <nuxeo-slot name="DOCUMENT_INFO_BAR" model="[[_actionContext]]"></nuxeo-slot>
  `,is:"nuxeo-document-info-bar",behaviors:[c.V],properties:{document:{type:Object},tasks:{type:Array,computed:"_tasks(document)"},workflows:{type:Array,computed:"_workflows(document)"},_wfTasks:Array,_actionContext:{type:Object,computed:"_computeActionContext(document)"}},_computeActionContext(){return{document:this.document}},_computeRetentionUntiLabel(e){return this.i18n("documentPage.retainUntil",this.formatDateTime(e.retainUntil))},_tasks:e=>e&&e.contextParameters&&e.contextParameters.pendingTasks?e.contextParameters.pendingTasks:[],_workflows:e=>e&&e.contextParameters&&e.contextParameters.runningWorkflows?e.contextParameters.runningWorkflows:[],_processTask(e){this.fire("workflowTaskProcess",{task:e.model.task})},ready(){this.$.nxcon.connect().then((e=>{this.currentUser=e}))},_isCurrentUser(e){return this.currentUser&&this.currentUser.id===e},_labelForInitiatedWf(e){return this._isCurrentUser(e.initiator)?this.i18n("documentPage.initiated.workflow.currentUser",this.i18n(e.title)):this.i18n("documentPage.initiated.workflow",this.i18n(e.title))},_abandonWorkflow(e){window.confirm(this.i18n("documentPage.abandon.workflow.confirm"))&&(this.$.worfklow.path=`/workflow/${e.model.workflow.id}`,this.$.worfklow.remove().then((()=>{this.fire("workflowAbandoned",{workflow:e.model.workflow})})))},_hasPermissionToAbandon(e){return this._isCurrentUser(e)||this.currentUser&&this.currentUser.isAdministrator},_toggleGraphDialog(e){this.$$(`#graph-${e.model.workflow.id}`).show()}}),i(76518),(0,m.k)({_template:h.d`
    <style include="paper-material-styles">
      :host {
        display: inline-block;
        background: var(--nuxeo-box);
        @apply --paper-material-elevation-1;
      }

      #list-actions {
        @apply --layout-vertical;
        @apply --layout-center;
        @apply --buttons-bar;
        padding: 8px;
      }
    </style>

    <div id="list-items">
      <slot name="items"></slot>
    </div>

    <div id="list-actions">
      <slot name="actions"></slot>
    </div>
  `,is:"nuxeo-document-versions-list",behaviors:[a.$],ready(){this.horizontalAlign="left",this.verticalAlign="auto"}}),i(58683),i(40629);var f=i(84392);(0,m.k)({_template:h.d`
    <style include="nuxeo-styles">
      :host {
        display: block;
        padding-bottom: 8px;
        min-height: 96px;
      }

      :host([dragging-files]) label {
        color: var(--paper-input-container-focus-color);
      }

      :host([dragging-files]) a {
        text-decoration: none;
      }

      :host([dragging-files]) #container {
        border: 1px dashed var(--paper-input-container-focus-color);
        background-color: var(--paper-input-container-focus-background-color, rgba(0, 102, 255, 0.1));
      }

      :host([invalid]) #container {
        border: 2px dashed var(--paper-input-container-invalid-color, #de350b);
      }

      label[required]::after {
        display: inline-block;
        content: '*';
        margin-left: 4px;
        color: var(--paper-input-container-invalid-color, #de350b);
      }

      button.link {
        color: var(--nuxeo-secondary-color, #0066ff);
        text-decoration: underline;
        padding: 0;
        background: none;
        border: none;
        cursor: pointer;
        font: inherit;
      }

      button.link:hover {
        color: var(--nuxeo-link-hover-color, #0066ff);
        font: inherit;
      }

      #dropzone {
        overflow: auto;
      }

      #container {
        @apply --layout-vertical;
        @apply --layout-center;
        @apply --layout-flex;
        @apply --layout-center-justified;
        border-radius: 2px;
        border: 1px dashed var(--paper-input-container-color);
        min-height: 82px;
        height: calc(100% - 2px);
      }

      #container .actions {
        text-align: center;
        @apply --layout-horizontal;
        @apply --layout-wrap;
      }

      #details {
        border: 1px solid var(--nuxeo-border, rgba(0, 0, 0, 0.15));
        padding: 16px;
        margin-bottom: 8px;
      }

      :host([invalid]) #details {
        border: 2px solid var(--paper-input-container-invalid-color, #de350b);
      }

      .file {
        @apply --layout-horizontal;
        @apply --layout-center;
      }

      .file .info {
        @apply --layout-vertical;
        @apply --layout-flex;
        overflow: hidden;
      }

      .file .info .name {
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .file .info .size {
        opacity: 0.5;
        margin: 4px 0;
      }

      .file .info .progress {
        width: 100%;
        padding: 8px 0;
      }

      .file .actions {
        margin-left: 16px;
      }

      .actions > * {
        margin-left: 8px;
      }

      .error {
        color: var(--paper-input-container-invalid-color, #de350b);
        margin-top: 8px;
      }

      .file-error {
        @apply --layout-horizontal;
        @apply --layout-flex;
      }

      .file-error span {
        color: var(--paper-input-container-invalid-color, #de350b);
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    </style>

    <nuxeo-connection id="nx"></nuxeo-connection>
    <nuxeo-document id="doc" doc-id="[[document.uid]]" enrichers="[[enrichers]]"></nuxeo-document>

    <template is="dom-if" if="[[label]]">
      <label id="label" required$="[[required]]">[[label]]</label>
    </template>

    <input hidden id="input" type="file" multiple$="[[multiple]]" on-change="_uploadInputFiles" />

    <div id="details" hidden$="[[!hasFiles]]">
      <template is="dom-repeat" items="[[files]]" as="file">
        <div class="file">
          <div class="info">
            <div class="name">[[file.name]]</div>
            <div class="size">[[formatSize(file.size)]]</div>
            <template is="dom-if" if="[[_displayProgressBar(file.*)]]">
              <paper-progress
                class="progress"
                indeterminate="[[!hasProgress()]]"
                value="[[file.progress]]"
              ></paper-progress>
            </template>
            <div class="file-error" hidden$="[[!file.error]]">
              <span>[[file.error]]</span>
              <nuxeo-tooltip>[[file.error]]</nuxeo-tooltip>
            </div>
          </div>
          <div class="actions">
            <paper-icon-button
              noink
              icon="nuxeo:delete"
              on-tap="_deleteFile"
              hidden$="[[!_areActionsVisible(hasFiles, uploading, updateDocument)]]"
              aria-label$="[[i18n('command.delete')]]"
            ></paper-icon-button>
            <div hidden$="[[!_showAbort(uploading)]]">
              <paper-icon-button
                noink
                icon="icons:cancel"
                on-tap="_abortUpload"
                aria-labelledby="abortTooltip"
              ></paper-icon-button>
              <nuxeo-tooltip id="abortTooltip">[[i18n('dropzone.abort')]]</nuxeo-tooltip>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div id="dropzone" hidden$="[[!_isDropzoneVisible(hasFiles, multiple, updateDocument, blobList)]]">
      <div id="container">
        <button class="link" on-click="open">
          [[_computeMessage(draggingFiles, message, dragContentMessage, i18n)]]
        </button>
        <div class="actions">
          <nuxeo-slot name="FILE_UPLOAD_ACTIONS"></nuxeo-slot>
        </div>
      </div>
    </div>

    <span class="error" hidden$="[[!invalid]]">[[_errorMessage]]</span>
  `,is:"nuxeo-dropzone",behaviors:[u.M,v.S,r.e,n.x],properties:{value:{type:Object,notify:!0},label:{type:String},message:{type:String,value:"dropzone.add"},multiple:{type:Boolean,value:!1},valueKey:{type:String},uploadedMessage:{type:String,value:"dropzone.uploaded"},dragContentMessage:{type:String,value:"dropzone.dropFile"},draggingFiles:{type:Boolean,readOnly:!0,value:!1,reflectToAttribute:!0},hasFiles:{type:Boolean,readOnly:!0,value:!1,notify:!0},_errorMessage:{type:String},required:{type:Boolean,value:!1,reflectToAttribute:!0},document:{type:Object,notify:!0},blobList:{type:Boolean,value:!1},xpath:{type:String,value:"file:content"},updateDocument:{type:Boolean,value:!1,reflectToAttribute:!0},enrichers:{type:Object,value:()=>({document:["preview"],blob:b.v.get("enrichers.blob",["appLinks"])})},_parsedXpath:{type:String,computed:"formatPropertyXpath(xpath)"}},listeners:{batchFinished:"importBatch","nx-blob-picked":"importBatch",batchFailed:"importBatch"},observers:["_reset(value)","_filesChanged(files.splices)","_legacyReset(document)"],attached(){this.connection=this.$.nx,this.setupDropZone(this.$.dropzone)},detached(){this.connection=null,this.teardownDropZone()},open(){this.$$("input").click()},async importBatch(e){"nx-blob-picked"===e.type?this.set("files",e.detail.blobs):e.stopPropagation();const t=this._getFiles(e),i=this.files.filter((e=>e.error));this.multiple?(this.value&&Array.isArray(this.value)||(this.value=[]),this.push("value",...t)):this.set("value",t),this.document&&this.xpath&&this._legacyImportBatch(t),i.length>0?this.notify({message:this.i18n("dropzone.toast.error",i.map((e=>e.name)).join(", ")),duration:0,dismissible:!0}):(this.document&&this.xpath&&await this._legacyUpdateDocument(),this.notify({message:this.i18n(this.uploadedMessage),close:!0}),this.invalid=!1),this.invalid&&this.validate()},_getFiles(e){let t;if(this.multiple||this.blobList){const i=[];return this.files.filter((e=>!e.error)).forEach((a=>{if(t="nx-blob-picked"===e.type?{providerId:a.providerId,user:a.user,fileId:a.fileId}:{"upload-batch":e.detail.batchId,"upload-fileId":a.index.toString()},this.valueKey){const e={};e[this.valueKey]=t,i.push(e)}else i.push(t)})),i}if("nx-blob-picked"===e.type){const i=e.detail.blobs[0];t={providerId:i.providerId,user:i.user,fileId:i.fileId}}else t={"upload-batch":e.detail.batchId,"upload-fileId":"0"};return t},_deleteFile(e){this.multiple&&Array.isArray(this.value)?(this.value.splice(this.value.length-this.files.length+e.model.itemsIndex,1),this.splice("files",e.model.itemsIndex,1)):(this._reset(),this.value=""),this.document&&this.xpath&&this._legacyDeleteFile(e),this.required||this.validate()},_reset(e){(null==e||Array.isArray(e)&&0===e.filter((e=>!Object.prototype.hasOwnProperty.call(this.valueKey?e[this.valueKey]:e,"data"))).length||Object.prototype.hasOwnProperty.call(e,"data"))&&(this.uploading&&this.cancelBatch(),this.$.input.value="",this.files=[])},_uploadInputFiles(e){this._upload(e.target.files)},_filesChanged(){this._setHasFiles(this.files.length>0)},_upload(e){e&&e.length>0&&this.uploadFiles(e)},_dragover(e){e.preventDefault(),e.dataTransfer.dropEffect="copy",this._setDraggingFiles(!0)},_dragleave(){this._setDraggingFiles(!1)},_drop(e){e.preventDefault(),this._setDraggingFiles(!1),this._upload(e.dataTransfer.files)},_computeMessage(){return this.i18n&&this.draggingFiles?this.i18n(this.dragContentMessage):this.i18n(this.message)},_isDropzoneVisible(){return this.multiple&&!this.updateDocument||!this.hasFiles},_areActionsVisible(){return this.hasFiles&&!this.uploading&&!this.updateDocument},_abortUpload(e){this.hasAbort()&&(this.abort(this.files[e.model.itemsIndex]),this.splice("files",e.model.itemsIndex,1))},_showAbort(e){return e&&this.hasAbort()},_getValidity(){return this.uploading?(this._errorMessage=this.i18n("dropzone.invalid.uploading"),!1):this.files.some((e=>e.error))?(this._errorMessage=this.i18n("dropzone.invalid.error"),!1):!this.required||this.files&&this.files.length>0},_displayProgressBar:e=>e.base&&!e.base.providerId&&!e.base.complete&&!e.base.error,_legacyReset(e){e&&this.cancelBatch(),this.$.input.value="",this.files=[]},_legacyDeleteFile(e){!this.updateDocument&&this.blobList&&Array.isArray(this.get(`document.properties.${this._parsedXpath}`))?(this.splice(`document.properties.${this._parsedXpath}`,e.model.itemsIndex,1),this.splice("files",e.model.itemsIndex,1)):(this._legacyReset(),this.set(`document.properties.${this._parsedXpath}`,""))},_legacyImportBatch(e){e&&0!==e.length&&(this.blobList?(this.get(`document.properties.${this._parsedXpath}`)||this.set(`document.properties.${this._parsedXpath}`,[]),e.forEach((e=>this.push(`document.properties.${this._parsedXpath}`,"files:files"===this.xpath?{file:e}:e)))):this.set(`document.properties.${this._parsedXpath}`,e))},async _legacyUpdateDocument(){if(this.updateDocument){const e={};return(0,f.Z)(e,this._parsedXpath.split(".")),this.set(this._parsedXpath,this.get(`document.properties.${this._parsedXpath}`),e),this.$.doc.data={"entity-type":"document",repository:this.document.repository,uid:this.document.uid,properties:e},this.$.doc.put().then((e=>{this.document=e,this.fire("document-updated")}))}return Promise.resolve()}}),(0,m.k)({_template:h.d`
    <style include="nuxeo-styles">
      iron-icon:hover {
        fill: var(--nuxeo-link-hover-color);
      }

      .dialog .content {
        @apply --layout-vertical;
        box-shadow: none;
      }

      nuxeo-tag {
        cursor: pointer;
        @apply --nx-button-primary;
        min-height: auto;
      }

      nuxeo-tag:hover {
        @apply --nx-button-primary-hover;
        min-height: auto;
      }

      nuxeo-tag[disabled] {
        @apply --nuxeo-tag;
        cursor: auto;
        font-weight: normal;
      }

      #createButton {
        border: none;
        padding: 0;
        margin: 0;
        background-color: transparent;
      }

      .buttons {
        @apply --layout-horizontal;
        @apply --layout-justified;
        @apply --buttons-bar;
      }

      paper-radio-group {
        margin: 16px;
      }

      paper-radio-button {
        display: block;
      }

      paper-radio-button .version {
        background-color: var(--nuxeo-primary-color);
        color: var(--nuxeo-button-primary-text);
        padding: 4px 8px;
        margin-right: 8px;
        font-weight: 500;
        border-radius: 2px;
      }

      paper-button {
        margin: 0;
        padding: 8px 16px;
      }
    </style>

    <nuxeo-operation
      id="opCreateVersion"
      op="Document.CreateVersion"
      input="[[document.uid]]"
      headers="[[headers]]"
      response="{{version}}"
      sync-indexing
    ></nuxeo-operation>

    <button id="createButton" on-tap="_toggleDialog" aria-label$="[[label]]">
      <nuxeo-tag class="create" disabled$="[[!_isAvailable(document)]]" uppercase>[[label]]</nuxeo-tag>
    </button>

    <nuxeo-dialog
      id="dialog"
      class="dialog"
      with-backdrop
      on-iron-overlay-opened="_dialogOpened"
      on-iron-overlay-closed="_dialogClosed"
    >
      <h2>
        [[i18n('documentCreateVersion.title', document.properties.dc:title, document.properties.uid:major_version,
        document.properties.uid:minor_version)]]
      </h2>
      <div class="content">
        <paper-radio-group selected="{{versionType}}">
          <paper-radio-button name="minor" aria-labelledby="labelMinor">
            <span id="nextMinor" class="version">[[_nextMinor(document)]]</span>
            <span id="labelMinor">[[i18n('documentCreateVersion.minor')]]</span>
          </paper-radio-button>
          <paper-radio-button name="major" aria-labelledby="labelMajor">
            <span id="nextMajor" class="version">[[_nextMajor(document)]]</span>
            <span id="labelMajor">[[i18n('documentCreateVersion.major')]]</span>
          </paper-radio-button>
        </paper-radio-group>
      </div>
      <div class="buttons">
        <paper-button noink dialog-dismiss class="secondary">[[i18n('documentCreateVersion.dismiss')]]</paper-button>
        <paper-button noink dialog-confirm class="primary" on-tap="_create">
          [[i18n('documentCreateVersion.confirm')]]
        </paper-button>
      </div>
    </nuxeo-dialog>
  `,is:"nuxeo-document-create-version",behaviors:[l.mB,s.q],properties:{label:String,document:Object,version:Object,headers:{type:Object,computed:"_computeHeaders(versionType)"},versionType:{type:String,value:"major"},response:Object},ready(){this.label||(this.label=this.i18n("versions.create"))},_dialogOpened(e){e.target.parentNode.insertBefore(e.target.backdropElement,e.target)},_dialogClosed(){this.fire("dialog-closed")},_computeHeaders:e=>({"X-Versioning-Option":e}),_isAvailable(e){return!this.isVersion(e)&&!this.isRecord(e)&&this.hasFacet(e,"Versionable")&&this.hasPermission(e,"WriteVersion")},_nextMinor:e=>e?`${e.properties["uid:major_version"]}.${e.properties["uid:minor_version"]+1}`:"",_nextMajor:e=>e?`${e.properties["uid:major_version"]+1}.0`:"",_toggleDialog(){this._isAvailable(this.document)&&this.$.dialog.open()},_create(){this._isAvailable(this.document)&&(this.$.opCreateVersion.params={increment:this.versionType,saveDocument:!0},this.$.opCreateVersion.execute().then((()=>{this.fire("document-updated")})))}});var y=i(47329);(0,m.k)({_template:h.d`
    <style>
      :host {
        display: inline-block;
        min-width: 60px;
      }

      .toggle {
        padding: 0;
        cursor: pointer;
      }

      .toggle-text {
        display: inline-block;
        padding: 4px 0 4px 8px;
      }

      .toggle-icon {
        width: 20px;
        height: 20px;
      }

      .version {
        @apply --layout-vertical;
        @apply --layout-start;
        padding: 8px;
        cursor: pointer;
        border-top: 1px solid var(--divider-color);
      }

      .version:hover {
        @apply --nuxeo-block-hover;
      }

      .version .row {
        @apply --layout-horizontal;
        @apply --layout-start;
        margin: 0;
        padding: 0;
      }

      .version .row * {
        display: inline-block;
        text-align: left;
      }

      .version .modified {
        font-size: 0.8rem;
        margin-top: 4px;
        opacity: 0.3;
      }

      .version .latest {
        margin: 8px 0;
      }

      iron-scroll-threshold {
        display: none;
      }

      #list-items {
        max-height: 50vh;
        overflow-y: auto;
      }
    </style>

    <nuxeo-operation id="opGetLatest" op="Proxy.GetSourceDocument" input="[[document.uid]]" response="{{latest}}">
    </nuxeo-operation>

    <nuxeo-page-provider
      id="provider"
      query="[[query]]"
      page-size="[[pageSize]]"
      page="{{page}}"
      sort='{"uid:major_version": "desc", "uid:minor_version": "desc"}'
      schemas="dublincore,common,uid"
    >
    </nuxeo-page-provider>

    <nuxeo-document-create-version
      document="[[document]]"
      hidden$="[[hasVersions(document)]]"
      label="[[_labelCreate(document)]]"
    >
    </nuxeo-document-create-version>

    <div hidden$="[[!hasVersions(document)]]">
      <nuxeo-tag class="toggle" on-tap="_showList">
        <div class="toggle-text">[[_labelTitle(document)]][[_labelCheckedOut(document)]]</div>
        <iron-icon class="toggle-icon" icon="icons:arrow-drop-down"></iron-icon>
      </nuxeo-tag>
      <nuxeo-document-versions-list id="list">
        <div id="list-items" slot="items">
          <template is="dom-if" if="[[document.isVersion]]">
            <div class="version" on-tap="_showLatest">
              <div id="version-latest" class="row title latest">[[_labelLatest(latest)]]</div>
            </div>
          </template>
          <template is="dom-repeat" items="[[versions]]" as="item">
            <div name="version-item" class="version" on-tap="_showVersion">
              <div id="version-id-[[index]]" class="row title">[[_labelTitle(item)]]</div>
              <div class="row modified">[[_labelModified(item)]]</div>
            </div>
          </template>
        </div>
        <nuxeo-document-create-version
          slot="actions"
          document="[[document]]"
          hidden$="[[!_isCheckedOut(document)]]"
          on-dialog-closed="_hideList"
        >
        </nuxeo-document-create-version>
      </nuxeo-document-versions-list>
      <iron-scroll-threshold
        id="scrollThreshold"
        scroll-target="list-items"
        lower-threshold="500"
        on-lower-threshold="_loadMore"
      >
      </iron-scroll-threshold>
    </div>

    <template is="dom-if" if="[[document.isVersion]]">
      <nuxeo-tooltip for="version-latest" position="right">[[latest.title]]</nuxeo-tooltip>
    </template>
    <template is="dom-repeat" items="[[versions]]" as="item">
      <nuxeo-tooltip for="version-id-[[index]]" position="right">[[item.title]]</nuxeo-tooltip>
    </template>
  `,is:"nuxeo-document-versions",behaviors:[d.N,r.e,s.q],properties:{document:Object,latest:Object,versions:{type:Array,value:[],notify:!0},query:String,page:{type:Number,value:0},pageSize:{type:Number,value:100}},observers:["_update(document.*)"],_update(){this.document&&(this.document.isVersion?this.$.opGetLatest.execute().then((()=>{this._query(this.latest.uid)})):this._query(this.document.uid))},_isCheckedOut:e=>e&&e.isCheckedOut,_query(e){this.query=`SELECT * FROM Document WHERE ecm:versionVersionableId = "${e}" AND ecm:isVersion = 1`,this.page=0,this._loadMore()},_loadMore(){this.$.scrollThreshold.clearTriggers(),this.query&&(this.$.provider.isNextPageAvailable||0===this.page)&&(this.page=this.page+1,this.$.provider.fetch().then((e=>{1===this.page&&this.set("versions",[]),e&&e.entries.forEach((e=>{this.push("versions",e)}))})))},_showList(){this.$.list.open()},_hideList(){this.$.list.close()},_showLatest(){this._hideList(),this.navigateTo("document","uid"===b.v.get("router.key.document")&&this.document.versionableId||this.document.path)},_showVersion(e){this._hideList(),this.navigateTo("document",e.model.item.uid)},_labelCreate(e){const t=!this.isVersion(e)&&this.hasFacet(e,"Versionable")&&this.hasPermission(e,"WriteVersion");return this.i18n(t?"versions.create":"versions.unversioned")},_labelLatest(e){return e?this.i18n("versions.version",e.properties["uid:major_version"],e.properties["uid:minor_version"])+(e.isCheckedOut?"+ ":" ")+(e.isCheckedOut?this.i18n("versions.unversionedChanges"):this.i18n("versions.latest")):(this._hideList(),"")},_labelTitle(e){return e?this.i18n("versions.version",e.properties["uid:major_version"],e.properties["uid:minor_version"]):""},_labelCheckedOut:e=>e&&e.isCheckedOut?"+":"",_labelModified(e){return this.i18n("versions.modified",(0,y.Z)().to(e.properties["dc:modified"]),e.properties["dc:lastContributor"])},_date:e=>(0,y.Z)(e).format("DD/MM/YYYY HH:mm")}),(0,m.k)({_template:h.d`
    <style>
      [hidden] {
        display: none !important;
      }

      .item {
        @apply --layout-horizontal;
        line-height: 2.2rem;
      }

      .item label {
        @apply --nuxeo-label;
        line-height: 2.2rem;
        width: 90px;
        min-width: 90px;
        font-size: 12px;
      }
    </style>

    <div class="item" name="process" hidden$="[[!_showProcess]]">
      <label>[[i18n('documentInfo.process')]]</label>
      <div><nuxeo-tag uppercase>[[i18n('documentInfo.process.running')]]</nuxeo-tag></div>
    </div>
    <div class="item">
      <label>[[i18n('documentInfo.state')]]</label>
      <div><nuxeo-tag uppercase>[[formatLifecycleState(document.state)]]</nuxeo-tag></div>
    </div>
    <template is="dom-if" if="[[hasFacet(document, 'Versionable')]]">
      <div class="item">
        <label>[[i18n('documentInfo.version')]]</label>
        <template is="dom-if" if="[[!isProxy(document)]]">
          <nuxeo-document-versions document="[[document]]"></nuxeo-document-versions>
        </template>
        <template is="dom-if" if="[[isProxy(document)]]">
          <div><nuxeo-tag uppercase>[[formatVersion(document)]]</nuxeo-tag></div>
        </template>
      </div>
    </template>
    <template is="dom-if" if="[[_showPub(document)]]">
      <div class="item">
        <label>[[i18n('documentInfo.publications')]]</label>
        <div>
          <a href$="[[_urlForPub(document)]]">
            [[document.contextParameters.publications.resultsCount]]
          </a>
        </div>
      </div>
    </template>
    <div class="item">
      <label>[[i18n('documentInfo.lastModified')]]</label>
      <nuxeo-date datetime="[[document.properties.dc:modified]]"></nuxeo-date>
    </div>
    <div class="item">
      <label>[[i18n('documentInfo.created')]]</label>
      <nuxeo-date datetime="[[document.properties.dc:created]]"></nuxeo-date>
    </div>
    <div class="item">
      <label>[[i18n('documentInfo.by')]]</label>
      <nuxeo-user-tag user="[[document.properties.dc:creator]]"></nuxeo-user-tag>
    </div>
    <div class="item">
      <label>[[i18n('documentInfo.contributors')]]</label>
      <nuxeo-tags type="user" items="[[document.properties.dc:contributors]]"></nuxeo-tags>
    </div>
  `,is:"nuxeo-document-info",behaviors:[c.V],properties:{document:{type:Object,observer:"_documentChanged"},_showProcess:{type:Boolean,value:!1,reflectToAttribute:!0}},_showPub:e=>e&&e.contextParameters&&e.contextParameters.publications&&e.contextParameters.publications.resultsCount>0,_documentChanged(){this._showProcess=this.document&&this.document.contextParameters&&this.document.contextParameters.runningWorkflows&&this.document.contextParameters.runningWorkflows.length>0},_urlForPub(){if(this.document)return this.urlFor(this.document,"publication")}}),(0,m.k)({_template:h.d`
    <style include="nuxeo-styles">
      :host {
        display: block;
      }

      .item {
        @apply --layout-horizontal;
        @apply --layout-center;
      }

      iron-icon {
        /* Similiar look and feel as select2 */
        height: 13px;
        width: 13px;
        opacity: 0.6;
      }

      #removeCollection {
        border: none;
        padding: 0;
        margin: 0;
        background-color: transparent;
      }

      iron-icon:hover {
        cursor: pointer;
        opacity: 1;
      }

      .ellipsis {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: block;
      }
    </style>

    <nuxeo-operation op="Collection.RemoveFromCollection" input="[[document.uid]]" id="op"></nuxeo-operation>

    <template is="dom-repeat" items="[[document.contextParameters.collections]]">
      <nuxeo-tag>
        <div class="item">
          <a class="title ellipsis" href$="[[urlFor(item)]]">[[item.title]]</a>
          <button id="removeCollection" aria-label$="[[i18n('command.remove')]]">
            <iron-icon
              icon="nuxeo:cross"
              name="remove"
              on-tap="remove"
              aria-hidden="true"
              data-uid$="[[item.uid]]"
            ></iron-icon>
          </button>
        </div>
      </nuxeo-tag>
    </template>
  `,is:"nuxeo-document-collections",behaviors:[d.N,l.mB],properties:{document:Object},remove(e){const{op:t}=this.$;t.params={collection:e.currentTarget.dataset.uid},t.execute().then((()=>{this.fire("removed-from-collection",{doc:this.document,collectionId:e.target.dataset.uid})}))}}),(0,m.k)({_template:h.d`
    <style>
      .row {
        @apply --layout-horizontal;
      }

      .value {
        margin: 0 4px 7px;
      }

      .datetime {
        opacity: 0.7;
        margin-left: 3px;
      }
    </style>

    <template is="dom-repeat" items="[[activities]]">
      <div class="row">
        <nuxeo-user-tag user="[[item.principalName]]"></nuxeo-user-tag>
        <div class="value">
          <span>[[_activity(item)]]</span>
          <nuxeo-date class="datetime" datetime="[[item.eventDate]]" format="relative"></nuxeo-date>
        </div>
      </div>
    </template>
  `,is:"nuxeo-document-activity",behaviors:[l.mB,d.N],properties:{document:{type:Object,observer:"_documentChanged"},activities:{type:Array,value:[]}},_activity(e){return this.i18n(`activity.${e.extended&&e.extended.clientReason?e.extended.clientReason:e.eventId}`)},_documentChanged(){this.document&&this.document.contextParameters&&this.document.contextParameters.audit&&(this.activities=this._gatherDuplicatedActivities(this.document.contextParameters.audit))},_gatherDuplicatedActivities(e){const t=e.slice();for(let e=0;e<t.length-1;e++)for(let i=e+1;i<t.length;i++)this._areGatherableActivities(t[e],t[i])&&(t.splice(i,1),i--);return t},_areGatherableActivities(e,t){let i=new Date(e.eventDate)-new Date(t.eventDate);return i=i/1e3/60/60,!!(e.extended&&e.extended.clientReason&&t.extended&&t.extended.clientReason&&("view"===e.extended.clientReason||"download"===e.extended.clientReason)&&e.extended.clientReason===t.extended.clientReason&&e.principalName===t.principalName&&i<24)}}),(0,m.k)({_template:h.d`
    <style include="nuxeo-styles">
      :host {
        display: block;
      }

      .row {
        @apply --layout-horizontal;
        @apply --layout-center;
      }

      .row .info {
        @apply --layout-vertical;
        @apply --layout-flex;
        overflow: hidden;
      }

      .row .actions {
        @apply --layout-horizontal;
        @apply --layout-center;
      }

      .row .info a {
        overflow: hidden;
        display: block;
        text-overflow: ellipsis;
      }

      .detail {
        opacity: 0.7;
      }

      nuxeo-actions-menu {
        height: 100%;
        max-width: var(--nuxeo-document-blob-actions-menu-max-width, 160px);
      }
    </style>

    <nuxeo-connection user="{{user}}"></nuxeo-connection>

    <template is="dom-if" if="[[blob]]">
      <div class="row">
        <div class="info">
          <div><a href="[[blob.downloadUrl]]" title="[[blob.name]]">[[blob.name]]</a></div>
          <div class="detail">[[formatSize(blob.length)]]</div>
        </div>
        <div class="actions">
          <nuxeo-actions-menu>
            <nuxeo-slot name="BLOB_ACTIONS" model="[[actionContext]]"></nuxeo-slot>
          </nuxeo-actions-menu>
        </div>
      </div>
    </template>
  `,is:"nuxeo-document-blob",behaviors:[l.mB,r.e],properties:{user:Object,document:Object,xpath:{type:String,value:"file:content"},blob:Object,actionContext:Object},observers:["_update(user, document, xpath)"],_update(e,t,i){this.blob=t&&this._deepFind(t.properties,i),this.actionContext={user:this.user,document:this.document,blob:this.blob,xpath:this.xpath}},_deepFind(e,t){for(let i=0,a=t.split("/"),o=a.length;i<o&&e&&e!==[];i++)e=e[a[i]];return e}}),(0,m.k)({_template:h.d`
    <nuxeo-document-layout document="[[document]]" layout="view"></nuxeo-document-layout>
  `,is:"nuxeo-document-view",importMeta:{url:`${window.location.protocol}//${window.location.host}${window.location.pathname}/document/nuxeo-document-view.js`},properties:{document:Object}}),(0,m.k)({_template:h.d`
    <style include="nuxeo-styles">
      :host {
        display: block;
      }
    </style>

    <nuxeo-document-layout document="[[document]]" layout="metadata"></nuxeo-document-layout>
  `,is:"nuxeo-document-metadata",importMeta:{url:`${window.location.protocol}//${window.location.host}${window.location.pathname}/document/nuxeo-document-metadata.js`},properties:{document:Object}});var _=i(16896);(0,m.k)({_template:h.d`
    <style include="nuxeo-styles">
      #details {
        width: 28px;
        height: 28px;
        padding: 5px;
        opacity: 0.3;
        margin: 6px 0;
      }

      :host([opened]) #details {
        opacity: 1;
        margin-left: 6px;
      }

      #documentViewsItems {
        @apply --layout-horizontal;
        --paper-listbox-background-color: transparent;
      }

      #documentViewsItems > nuxeo-page-item:first-of-type {
        margin: 0;
      }

      .scrollerHeader {
        @apply --layout-horizontal;
      }

      :host([opened]) .scrollerHeader {
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.04) !important;
        border-radius: 0;
        background-color: var(--nuxeo-box) !important;
      }

      .page {
        @apply --layout-horizontal;
      }

      .main {
        @apply --layout-vertical;
        @apply --layout-flex-2;
        padding-right: 8px;
        overflow: hidden;
      }

      :host([opened]) .main {
        padding-right: 16px;
      }

      .side {
        @apply --layout-vertical;
        position: relative;
        margin-bottom: var(--nuxeo-card-margin-bottom, 16px);
        min-height: 60vh;
      }

      :host([opened]) .side {
        @apply --layout-flex;
      }

      .scroller {
        @apply --nuxeo-card;
        margin-bottom: 0;
        overflow: auto;
        display: none;
        left: 0;
        top: 36px;
        right: 0;
        bottom: 0;
        position: absolute;
      }

      :host([opened]) .scroller {
        display: block;
      }

      .section {
        margin-bottom: 32px;
      }

      .section:last-of-type {
        margin-bottom: 64px;
      }

      nuxeo-document-view {
        --nuxeo-document-content-margin-bottom: var(--nuxeo-card-margin-bottom);
      }

      @media (max-width: 1024px) {
        #details {
          opacity: 1;
          margin-left: 6px;
          cursor: default;
        }

        .scrollerHeader {
          box-shadow: 0 3px 5px rgba(0, 0, 0, 0.04) !important;
          font-family: var(--nuxeo-app-font);
          border-radius: 0;
          background-color: var(--nuxeo-box) !important;
        }

        .page {
          @apply --layout-vertical;
        }

        .main,
        :host([opened]) .main {
          padding: 0;
          max-width: initial;
          margin-right: 0;
        }

        .side {
          padding: 0;
          max-width: initial;
          min-height: initial;
          display: block;
          margin-bottom: 16px;
        }

        .scroller {
          top: 0;
          position: relative;
          display: block;
        }
      }

      paper-tabs {
        height: auto;
        display: flex;
        padding: 8px 0;
        border-bottom: none transparent 0px;
        font-size: inherit;
        font-weight: 400;
        --paper-tabs-selection-bar-color: transparent;
      }
    </style>

    <nuxeo-document-info-bar document="[[document]]"></nuxeo-document-info-bar>

    <div class="page">
      <div class="main">
        <nuxeo-document-view document="[[document]]"></nuxeo-document-view>
      </div>

      <div class="side">
        <div class="scrollerHeader">
          <paper-icon-button
            id="details"
            noink
            icon="nuxeo:details"
            on-tap="_toggleOpened"
            aria-expanded="[[opened]]"
            aria-labelledby="detailsTooltip"
          ></paper-icon-button>
          <nuxeo-tooltip for="details" id="detailsTooltip">[[i18n('documentPage.details.opened')]]</nuxeo-tooltip>
        </div>
        <div class="scroller">
          <!-- info -->
          <div class="section">
            <nuxeo-document-info document="[[document]]"></nuxeo-document-info>
          </div>

          <!-- metadata -->
          <div class="section">
            <nuxeo-document-metadata document="[[document]]"></nuxeo-document-metadata>
          </div>

          <!-- collections -->
          <div class="section" hidden$="[[!_hasCollections(document)]]">
            <h5>[[i18n('documentPage.collections')]]</h5>
            <nuxeo-document-collections document="[[document]]"></nuxeo-document-collections>
          </div>

          <!-- tags -->
          <template is="dom-if" if="[[hasFacet(document, 'NXTag')]]">
            <div class="section">
              <h5>[[i18n('documentPage.tags')]]</h5>
              <nuxeo-tag-suggestion
                document="[[document]]"
                allow-new-tags
                placeholder="[[i18n('documentPage.tags.placeholder')]]"
                readonly="[[!isTaggable(document)]]"
              >
              </nuxeo-tag-suggestion>
            </div>
          </template>

          <!-- activity -->
          <div class="section" role="list">
            <paper-tabs
              autoselect
              attr-for-selected="name"
              id="documentViewsItems"
              noink
              no-slide
              selected="{{selectedTab}}"
              selectable="nuxeo-page-item"
            >
              <template is="dom-if" if="[[hasFacet(document, 'Commentable')]]">
                <nuxeo-page-item name="comments" label="[[i18n('documentPage.comments')]]"></nuxeo-page-item>
              </template>
              <nuxeo-page-item name="activity" label="[[i18n('documentPage.activity')]]"></nuxeo-page-item>
            </paper-tabs>
            <iron-pages selected="[[selectedTab]]" attr-for-selected="name" selected-item="{{page}}">
              <template is="dom-if" if="[[hasFacet(document, 'Commentable')]]">
                <nuxeo-document-comment-thread name="comments" uid="[[document.uid]]"></nuxeo-document-comment-thread>
              </template>
              <nuxeo-document-activity name="activity" document="[[document]]"></nuxeo-document-activity>
            </iron-pages>
          </div>
        </div>
      </div>
    </div>
  `,is:"nuxeo-document-page",behaviors:[c.V],properties:{document:{type:Object,observer:"_documentChanged"},selectedTab:{type:String,value:"comments",notify:!0},opened:{type:Boolean,value:!1,notify:!0,reflectToAttribute:!0,observer:"_openedChanged"}},_documentChanged(e){this.selectedTab=this.hasFacet(e,"Commentable")?"comments":"activity"},_openedChanged(){_.animationFrame.run((()=>{this.dispatchEvent(new CustomEvent("resize",{bubbles:!1,composed:!0}))}))},_toggleOpened(){this.opened=!this.opened},_isMutable(e){return!this.hasFacet(e,"Immutable")&&"Root"!==e.type&&!this.isTrashed(e)},_hasCollections(e){return this.hasCollections(e)}}),(0,m.k)({_template:h.d`
    <style include="nuxeo-styles">
      .page {
        @apply --layout-vertical;
      }

      .details {
        @apply --layout-horizontal;
        @apply --layout-wrap;
        @apply --layout-justified;
      }

      .details .section {
        @apply --layout-flex;
        margin: 16px;
        min-width: 256px;
        max-width: 320px;
      }

      paper-icon-button {
        @apply --nuxeo-action;
      }

      paper-icon-button:hover {
        @apply --nuxeo-action-hover;
      }

      nuxeo-document-view {
        --nuxeo-document-content-height: calc(100vh - 237px - var(--nuxeo-app-top));
      }
    </style>

    <nuxeo-document-info-bar document="[[document]]"></nuxeo-document-info-bar>

    <div class="page">
      <nuxeo-card id="detailsCard" heading="[[i18n('documentPage.details')]]" collapsible>
        <div class="details">
          <div class="section">
            <h5>[[i18n('documentPage.info')]]</h5>
            <nuxeo-document-info document="[[document]]"></nuxeo-document-info>
          </div>

          <!-- metadata -->
          <div class="section">
            <h5>[[i18n('documentPage.metadata')]]</h5>
            <nuxeo-document-metadata document="[[document]]"></nuxeo-document-metadata>
          </div>

          <!-- collections -->
          <div class="section" hidden$="[[!_hasCollections(document)]]">
            <h5>[[i18n('documentPage.collections')]]</h5>
            <nuxeo-document-collections document="[[document]]"></nuxeo-document-collections>
          </div>

          <!-- tags -->
          <template is="dom-if" if="[[hasFacet(document, 'NXTag')]]">
            <div class="section">
              <h5>[[i18n('documentPage.tags')]]</h5>
              <nuxeo-tag-suggestion
                document="[[document]]"
                allow-new-tags
                placeholder="[[i18n('documentPage.tags.placeholder')]]"
                readonly="[[!hasPermission(document, 'WriteProperties')]]"
              >
              </nuxeo-tag-suggestion>
            </div>
          </template>

          <!-- activity -->
          <div class="section">
            <h5>[[i18n('documentPage.activity')]]</h5>
            <nuxeo-document-activity document="[[document]]"></nuxeo-document-activity>
          </div>
        </div>
      </nuxeo-card>

      <div class="main">
        <nuxeo-document-view document="[[document]]"></nuxeo-document-view>
      </div>
    </div>
  `,is:"nuxeo-collapsible-document-page",behaviors:[c.V],properties:{document:{type:Object}},_hasCollections(e){return this.hasCollections(e)}}),(0,m.k)({_template:h.d`
    <nuxeo-document-form-layout
      document="{{document}}"
      layout="edit"
      headers="[[headers]]"
    ></nuxeo-document-form-layout>
  `,is:"nuxeo-document-edit",properties:{document:{type:Object,notify:!0},headers:{type:Object}}}),(0,m.k)({_template:h.d`
    <style>
      .properties label {
        @apply --nuxeo-label;
        min-width: 10rem;
        margin-inline-end: 12px;
      }

      .properties .item {
        @apply --layout-horizontal;
        @apply --layout-flex;
        line-height: 2.2rem;
      }
    </style>

    <div class="properties">
      <div class="item">
        <label>[[i18n('pictureViewLayout.date')]]</label>
        <nuxeo-date
          datetime="[[document.properties.imd:date_time_original]]"
          hidden$="[[!document.properties.imd:date_time_original]]"
        ></nuxeo-date>
      </div>
      <div class="item">
        <label>[[i18n('pictureViewLayout.orientation')]]</label>
        <div>[[document.properties.imd:orientation]]</div>
      </div>
      <div class="item">
        <label>[[i18n('pictureViewLayout.fnumber')]]</label>
        <div>[[document.properties.imd:fnumber]]</div>
      </div>
      <div class="item">
        <label>[[i18n('pictureViewLayout.exposure')]]</label>
        <div>[[document.properties.imd:exposure_time]]</div>
      </div>
      <div class="item">
        <label>[[i18n('pictureViewLayout.iso')]]</label>
        <div>[[document.properties.imd:iso_speed_ratings]]</div>
      </div>
      <div class="item">
        <label>[[i18n('pictureViewLayout.focalLength')]]</label>
        <div>[[document.properties.imd:focalLength]]</div>
      </div>
    </div>
  `,is:"nuxeo-picture-exif",behaviors:[l.mB,r.e],properties:{label:String,document:Object}}),(0,m.k)({_template:h.d`
    <style>
      .properties label {
        min-width: 10rem;
        margin-inline-end: 12px;
      }

      .properties label {
        @apply --nuxeo-label;
        min-width: 10rem;
        margin-inline-end: 12px;
      }

      .properties .item {
        @apply --layout-horizontal;
        @apply --layout-flex;
        line-height: 2.2rem;
      }
    </style>

    <div class="properties">
      <div class="item">
        <label>[[i18n('pictureViewLayout.dimensions')]]</label>
        <div>[[document.properties.picture:info.width]] x [[document.properties.picture:info.height]]</div>
      </div>
      <div class="item">
        <label>[[i18n('pictureViewLayout.format')]]</label>
        <div>[[document.properties.picture:info.format]]</div>
      </div>
      <div class="item">
        <label>[[i18n('pictureViewLayout.colorSpace')]]</label>
        <div>[[document.properties.picture:info.colorSpace]]</div>
      </div>
      <div class="item">
        <label>[[i18n('pictureViewLayout.depth')]]</label>
        <div>[[document.properties.picture:info.depth]]</div>
      </div>
      <div class="item">
        <label>[[i18n('pictureViewLayout.weight')]]</label>
        <div>[[formatSize(document.properties.file:content.length)]]</div>
      </div>
    </div>
  `,is:"nuxeo-picture-info",behaviors:[l.mB,r.e],properties:{label:String,document:Object}}),(0,m.k)({_template:h.d`
    <style>
      :host {
        display: block;
      }
      .properties label {
        @apply --nuxeo-label;
        min-width: 10rem;
        margin-inline-end: 12px;
      }

      .properties .item {
        @apply --layout-horizontal;
        @apply --layout-flex;
        line-height: 2.2rem;
        @apply --layout-justified;
      }

      iron-icon {
        fill: var(--nuxeo-text-default, #3a3a54);
      }
    </style>

    <h5>[[label]]</h5>
    <div class="properties">
      <template is="dom-repeat" items="[[_getAdditionalFormats(document)]]" as="item">
        <div class="item">
          <label>[[item.name]]</label>
          <span>[[item.dimensions]]</span>
          <span>[[item.size]]</span>
          <span>[[item.format]]</span>
          <a id="download-[[index]]" href="[[item.downloadUrl]]">
            <iron-icon
              icon="nuxeo:download"
              aria-label="[[i18n('pictureViewLayout.download.tooltip')]] [[item.name]] [[item.dimensions]]"
            >
            </iron-icon>
          </a>
          <paper-tooltip for="download-[[index]]">[[i18n('pictureViewLayout.download.tooltip')]]</paper-tooltip>
        </div>
      </template>
    </div>
  `,is:"nuxeo-picture-formats",behaviors:[c.V],properties:{label:String,document:Object,additionalFormats:{type:Object,computed:"_getAdditionalFormats(document)"}},_getAdditionalFormats(e){return e&&e.properties["picture:views"]?e.properties["picture:views"].map((e=>({name:e.description,dimensions:`${e.info.width} x ${e.info.height}`,size:this.formatSize(e.content.length),format:e.info.format,downloadUrl:e.content.downloadUrl}))):[]}}),(0,m.k)({_template:h.d`
    <style>
      .properties label {
        min-width: 10rem;
        margin-inline-end: 12px;
      }

      .properties label {
        @apply --nuxeo-label;
        min-width: 10rem;
        margin-inline-end: 12px;
      }

      .properties .item {
        @apply --layout-horizontal;
        @apply --layout-flex;
        line-height: 2.2rem;
      }

      .text-area {
        max-width: 60%;
      }
    </style>

    <div class="properties">
      <div class="item">
        <label>[[i18n('pictureViewLayout.copyright')]]</label>
        <div>[[document.properties.imd:copyright]]</div>
      </div>
      <div class="item">
        <label>[[i18n('pictureViewLayout.rights')]]</label>
        <div>[[document.properties.dc:rights]]</div>
      </div>
      <div class="item">
        <label>[[i18n('pictureViewLayout.source')]]</label>
        <div>[[document.properties.dc:source]]</div>
      </div>
      <div class="item">
        <label>[[i18n('pictureViewLayout.description')]]</label>
        <div class="text-area">[[document.properties.imd:image_description]]</div>
      </div>
    </div>
  `,is:"nuxeo-picture-iptc",behaviors:[l.mB,r.e],properties:{label:String,document:Object}}),(0,m.k)({_template:h.d`
    <style>
      .additional {
        @apply --layout-horizontal;
        @apply --layout-justified;
        @apply --layout-wrap;
        margin: -5px;
      }

      nuxeo-card {
        @apply --layout-flex;
        padding-right: 1.3rem;
        padding-bottom: 1.3rem;
        min-width: 384px;
        margin: 5px;
      }
    </style>

    <nuxeo-document-page document="[[document]]" opened></nuxeo-document-page>

    <div class="additional">
      <nuxeo-card heading="[[i18n('pictureViewLayout.info')]]">
        <nuxeo-picture-info role="widget" document="[[document]]"></nuxeo-picture-info>
      </nuxeo-card>

      <nuxeo-card heading="[[i18n('pictureViewLayout.formats')]]">
        <nuxeo-picture-formats role="widget" document="[[document]]"></nuxeo-picture-formats>
      </nuxeo-card>

      <nuxeo-card heading="[[i18n('pictureViewLayout.exif')]]">
        <nuxeo-picture-exif role="widget" document="[[document]]"></nuxeo-picture-exif>
      </nuxeo-card>

      <nuxeo-card heading="[[i18n('pictureViewLayout.iptc')]]">
        <nuxeo-picture-iptc role="widget" document="[[document]]"></nuxeo-picture-iptc>
      </nuxeo-card>
    </div>
  `,is:"nuxeo-picture-document-page",behaviors:[c.V],properties:{document:{type:Object}}}),i(12952),i(2946);const w={};(0,m.k)({_template:h.d`
    <style include="nuxeo-styles">
      :host {
        display: block;
      }

      nuxeo-data-table {
        min-height: calc(100vh - 280px);
      }

      .top.actions {
        @apply --layout-horizontal;
        @apply --layout-center;
        @apply --layout-end-justified;
        margin: 1em 0 1em 0;
      }

      nuxeo-dialog {
        min-width: 480px;
      }

      @media (max-width: 1024px) {
        nuxeo-dialog {
          min-width: 0;
          width: 90%;
        }
      }

      nuxeo-dialog .buttons {
        @apply --layout-horizontal;
        @apply --layout-justified;
        margin-top: 16px;
      }

      paper-item span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    </style>

    <nuxeo-resource id="directory" path="/directory" params='{"pageSize": 0}'></nuxeo-resource>
    <nuxeo-resource id="schema"></nuxeo-resource>

    <nuxeo-page>
      <div slot="header">
        <span>[[i18n('vocabularyManagement.heading')]]</span>
      </div>

      <div>
        <nuxeo-card>
          <nuxeo-select
            label="[[i18n('vocabularyManagement.vocabulary')]]"
            placeholder="[[i18n('vocabularyManagement.select')]]"
            selected="{{selectedVocabulary}}"
            attr-for-selected="name"
          >
            <template is="dom-repeat" items="[[vocabularies]]" as="vocabulary">
              <paper-item name$="[[vocabulary.name]]"
                ><span title="[[vocabulary.name]]">[[vocabulary.name]]</span></paper-item
              >
            </template>
          </nuxeo-select>
        </nuxeo-card>

        <template is="dom-if" if="[[_isVocabularySelected(selectedVocabulary)]]">
          <div class="top actions">
            <paper-button id="addEntry" class="text" on-tap="_createEntry" aria-labelledby="addEntryLabel">
              <span id="addEntryLabel">+ [[i18n('vocabularyManagement.addEntry')]]</span>
            </paper-button>
          </div>
          <nuxeo-data-table
            id="table"
            empty-label="[[i18n('vocabularyManagement.noEntry')]]"
            empty-label-when-filtered="[[i18n('vocabularyManagement.noEntryWhenFiltered')]]"
            style$="[[_visibleDataTableStyle(entries)]]"
          >
            <template is="dom-repeat" items="[[colDef]]" as="col">
              <nuxeo-data-table-column name="[[i18n(col.name)]]" key="[[col.key]]">
                <template>
                  <template is="dom-if" if="[[!_entryActions(column.key)]]">
                    [[_value(index, column.key)]]
                  </template>
                  <template is="dom-if" if="[[_entryActions(column.key)]]">
                    <paper-icon-button
                      id="edit-button-[[index]]"
                      icon="nuxeo:edit"
                      on-tap="_editEntry"
                      aria-labelledby="editButtonTooltip"
                    ></paper-icon-button>
                    <nuxeo-tooltip for="edit-button-[[index]]" id="editButtonTooltip"
                      >[[i18n('vocabularyManagement.editEntry')]]</nuxeo-tooltip
                    >
                    <paper-icon-button
                      id="delete-button-[[index]]"
                      name="delete"
                      icon="nuxeo:delete"
                      on-tap="_deleteEntry"
                      aria-labelledby="deleteButtonTooltip"
                    ></paper-icon-button>
                    <nuxeo-tooltip for="delete-button-[[index]]" id="deleteButtonTooltip"
                      >[[i18n('vocabularyManagement.deleteEntry')]]</nuxeo-tooltip
                    >
                  </template>
                </template>
              </nuxeo-data-table-column>
            </template>
          </nuxeo-data-table>
        </template>
      </div>
    </nuxeo-page>

    <nuxeo-dialog id="vocabularyEditDialog" with-backdrop>
      <h2>[[_computeDialogHeading(_new)]]</h2>
      <iron-form id="form">
        <form>
          <nuxeo-layout
            id="layout"
            href="[[_layoutHref(_selectedSchema)]]"
            model="[[_layoutModel(_selectedEntry)]]"
            error="[[i18n('documentVocabularyManagement.layoutNotFound', _selectedSchema)]]"
            on-element-changed="_elementChanged"
          >
          </nuxeo-layout>
        </form>
      </iron-form>
      <div class="buttons">
        <paper-button name="cancel" noink class="secondary" dialog-dismiss>[[i18n('command.cancel')]]</paper-button>
        <paper-button name="save" noink class="primary" on-tap="_save">[[i18n('command.save')]]</paper-button>
      </div>
    </nuxeo-dialog>
  `,is:"nuxeo-vocabulary-management",behaviors:[u.M,l.mB],importMeta:{url:`${window.location.protocol}//${window.location.host}${window.location.pathname}/directory/nuxeo-vocabulary-management.js`},properties:{vocabularies:Array,selectedVocabulary:String,entries:{type:Array,value:[]},colDef:{type:Object,notify:!0},visible:{type:Boolean,observer:"_visibleChanged"},_selectedEntry:{type:Object},_selectedSchema:{type:String,computed:"_schemaFor(selectedVocabulary)"}},observers:["_refresh(selectedVocabulary)"],_visibleDataTableStyle:e=>e.length?"display: block;":"display: none;",_visibleChanged(){this.visible&&!this.vocabularies&&this.$.directory.get().then((e=>{this.vocabularies=e.entries.sort(((e,t)=>e.name.localeCompare(t.name)))}))},_layoutHref(e){const t=e.toLowerCase();return this.resolveUrl(`${t}/nuxeo-${t}-edit-layout.html`)},_layoutModel(){return{entry:this._selectedEntry,directory:this.selectedVocabulary,parentDirectory:this._getParentDirectoryFor(this._selectedEntry),entries:this.entries,new:this._new}},_schemaFor(){if(!this._isVocabularySelected())return;let e="";return Object.keys(this.vocabularies).some((t=>this.vocabularies[t].name===this.selectedVocabulary&&(({schema:e}=this.vocabularies[t]),!0))),e&&0!==e.length?e:"vocabulary"},_getParentDirectoryFor(e){let t="";return Object.keys(this.vocabularies).some((i=>this.vocabularies[i].name===e.directoryName&&(({parent:t}=this.vocabularies[i]),!0))),t},_entryActions:e=>"actions"===e,_refresh(){this._isVocabularySelected()&&(this.$.directory.path=`/directory/${this.selectedVocabulary}`,this.entries=[],this.colDef=[],this.$.directory.get().then((e=>{let t=[];e.entries.length>0&&(t=Object.keys(e.entries[0].properties).map((e=>({key:e,name:`vocabularyManagement.edit.${e}`,pos:this._computeColPos(e)})))),t.push({key:"actions",name:"vocabularyManagement.edit.actions",pos:1e3,actions:!0}),t.sort(((e,t)=>e.pos-t.pos)),this.colDef=t,this.entries=e.entries;const i=this.$$("#table");i.items=[],i.items=this.entries})))},_value(e,t){const i=this.entries[e];return i&&i.properties&&t?"obsolete"===t?i.properties[t]>0?this.i18n("label.yes"):this.i18n("label.no"):i.properties[t]:"N/A"},_computeColPos:e=>"parent"===e?1:"id"===e?2:"obsolete"===e?98:"ordering"===e?99:50,_deleteEntry(e){if(window.confirm(this.i18n("vocabularyManagement.confirmDelete"))){const{item:t}=e.target.parentNode;this.$.directory.path=`/directory/${t.directoryName}/${t.properties.id}`,this.$.directory.remove().then((()=>{this._refresh(),this.notify({message:this.i18n("vocabularyManagement.successfullyDeleted")})}),(e=>{409===e.status?this.notify({message:`${this.i18n("label.error").toUpperCase()}: ${this.i18n("vocabularyManagement.cannotDelete.referencedEntry")}`}):this.notify({message:`${this.i18n("label.error").toUpperCase()}: ${this.i18n("vocabularyManagement.cannotDelete.error")}`})}))}},_editEntry(e){this._new=!1,this._selectedEntry=e.target.parentNode.item,this.$.vocabularyEditDialog.toggle()},_elementChanged(){this.$.vocabularyEditDialog.opened&&this.async(this.$.vocabularyEditDialog.notifyResize.bind(this.$.vocabularyEditDialog))},_save(){if(this.$.layout.validate()){if(this._selectedEntry&&this._selectedEntry.properties&&![null,void 0,""].includes(this._selectedEntry.properties.ordering))try{this._selectedEntry.properties.ordering=Number(this._selectedEntry.properties.ordering)}catch(e){console.warn(`unable to convert ${this._selectedEntry.properties.ordering} to a number`)}this.$.directory.data=this._selectedEntry,this._new?(this.$.directory.path=`/directory/${this._selectedEntry.directoryName}`,this.$.directory.post().then((()=>{this.$.vocabularyEditDialog.toggle(),this.notify({message:this.i18n("vocabularyManagement.successfullyCreated")}),this._refresh()}),(e=>{this.notify({message:`${this.i18n("label.error").toUpperCase()}: ${e.message&&e.message.length>0?e.message:this.i18n("vocabularyManagement.cannotCreate")}`})}))):(this.$.directory.path=`/directory/${this._selectedEntry.directoryName}/${this._selectedEntry.properties.id}`,this.$.directory.put().then((()=>{this.$.vocabularyEditDialog.toggle(),this.notify({message:this.i18n("vocabularyManagement.successfullyEdited")}),this._refresh()}),(e=>{this.notify({message:`${this.i18n("label.error").toUpperCase()}: ${e.message&&e.message.length>0?e.message:this.i18n("vocabularyManagement.cannotEdit")}`})})))}},_isVocabularySelected(){return this.selectedVocabulary&&this.selectedVocabulary.length>0},_createEntry(){const e={"entity-type":"directoryEntry",directoryName:this.selectedVocabulary,id:void 0,properties:{}};this._getSchemaFields().then((t=>{t.forEach((t=>{e.properties[t]=void 0})),this._new=!0,this._selectedEntry=e,this.$.vocabularyEditDialog.toggle()}))},_getSchemaFields(){const e=this._selectedSchema;if(w[e])return Promise.resolve(w[e]);if(this.entries.length>0){const t=Object.keys(this.entries[0].properties);return w[e]=t,Promise.resolve(t)}return this.$.schema.path=`/config/schemas/${e}`,this.$.schema.get().then((t=>{const i=Object.keys(t.fields);return w[e]=i,i})).catch((function(e){if(this.notify({message:this.i18n("vocabularyManagement.cannotGetSchema")}),404!==e.status)throw e}))},_computeDialogHeading(e){return this.i18n(e?"vocabularyManagement.popup.addEntry":"vocabularyManagement.popup.editEntry")}}),i(76967),i(22403),(0,m.k)({_template:h.d`
    <style include="iron-flex nuxeo-styles">
      paper-item {
        @apply --layout-horizontal;
        @apply --layout-center;
        cursor: pointer;
      }

      paper-menu-button[hidden] {
        display: none !important;
      }
    </style>

    <nuxeo-document auto doc-id="[[searchId]]" enrichers="permissions" response="{{searchDoc}}"></nuxeo-document>
    <div class="horizontal layout center">
      <paper-button
        on-tap="_saveSearchAs"
        hidden$="[[!_showSaveAs(searchDoc, isSavedSearch, _dirty, _isSearchFormVisible)]]"
        class="primary small"
      >
        <iron-icon icon="nuxeo:filter-edit"></iron-icon>[[i18n('app.saveNewSearch')]]
      </paper-button>
      <paper-button
        on-tap="_saveSearch"
        hidden$="[[!_showSave(searchDoc, isSavedSearch, _dirty, _isSearchFormVisible)]]"
        class="secondary small"
      >
        <iron-icon icon="nuxeo:filter-add"></iron-icon>[[i18n('app.savedSearch')]]
      </paper-button>
      <paper-menu-button
        no-animations
        horizontal-align="right"
        vertical-offset="40"
        hidden$="[[!_showOtherSearchActions(searchDoc, isSavedSearch, _dirty, _isSearchFormVisible)]]"
      >
        <paper-icon-button
          icon="icons:more-vert"
          slot="dropdown-trigger"
          aria-label$="[[i18n('command.menu')]]"
        ></paper-icon-button>
        <paper-listbox slot="dropdown-content">
          <paper-item on-tap="_renameSearch">
            <iron-icon icon="nuxeo:edit"></iron-icon>[[i18n('app.renameSearch')]]
          </paper-item>
          <paper-item on-tap="_shareSearch">
            <iron-icon icon="nuxeo:share"></iron-icon>[[i18n('app.shareSearch')]]
          </paper-item>
          <paper-item on-tap="_deleteSearch">
            <iron-icon icon="nuxeo:delete"></iron-icon>[[i18n('app.deleteSearch')]]
          </paper-item>
        </paper-listbox>
      </paper-menu-button>
    </div>
  `,is:"nuxeo-saved-search-actions",behaviors:[l.mB,s.q],properties:{searchId:String,searchDoc:Object,searchForm:{type:Object,observer:"_searchFormChanged"},_dirty:Boolean,_isSearchFormVisible:Boolean},ready(){this._searchFormVisibilityChanged=e=>{this._isSearchFormVisible=e.target.visible}},_searchFormChanged(e,t){this._dirty=this.searchForm&&this.searchForm.dirty,this.searchForm&&(this.searchForm.addEventListener("dirty-changed",(()=>{this._dirty=this.searchForm.dirty})),this.searchForm.addEventListener("selected-search-changed",(()=>{this.isSavedSearch=this.searchForm.isSavedSearch,this.searchForm.selectedSearch&&(this.searchId=this.searchForm.selectedSearch.id)})),t&&t.removeEventListener("visible-changed",this._searchFormVisibilityChanged),e&&(e.addEventListener("visible-changed",this._searchFormVisibilityChanged),this._isSearchFormVisible=e.visible),this.searchForm.selectedSearch&&(this.searchId=this.searchForm.selectedSearch.id)),this.isSavedSearch=!!this.searchId},_saveSearch(){this.searchForm.save()},_saveSearchAs(){this.searchForm.saveAs()},_renameSearch(){this.searchForm.rename()},_shareSearch(){this.searchForm.share()},_deleteSearch(){this.searchForm.delete()},_showSaveAs(){return this._isSearchFormVisible&&(this.isSavedSearch||!this.isSavedSearch&&this.searchForm&&this._dirty)},_showSave(){return this._isSearchFormVisible&&this.isSavedSearch&&this._dirty&&this._hasPermissions()},_showOtherSearchActions(){return this._isSearchFormVisible&&this.isSavedSearch&&this._hasPermissions()},_hasPermissions(){return!!this.searchDoc&&this.searchDoc.contextParameters.permissions.indexOf("WriteProperties")>-1}}),i(24681),i(38647),(0,m.k)({_template:h.d`
    <style include="nuxeo-styles">
      :host {
        display: block;
      }
    </style>

    <nuxeo-resource id="taskAssignment" path="/task/[[task.id]]/[[action]]" params="[[params]]"></nuxeo-resource>

    <nuxeo-dialog id="assignmentDialog" with-backdrop>
      <h2>[[i18n(task.name)]]</h2>
      <paper-dialog-scrollable>
        <iron-form id="assignmentForm">
          <form>
            <nuxeo-user-suggestion
              name="userGroup"
              label="[[i18n('tasks.assignment.userOrGroup')]]"
              value="{{actors}}"
              multiple="true"
              required="true"
              placeholder="[[i18n('tasks.assignment.placeholder')]]"
            >
            </nuxeo-user-suggestion>
            <nuxeo-textarea
              id="commentText"
              label="[[i18n('tasks.assignment.comment')]]"
              placeholder="[[i18n('tasks.assignment.placeholder')]]"
              value="{{comment}}"
              max-rows="4"
            >
            </nuxeo-textarea>
          </form>
        </iron-form>
      </paper-dialog-scrollable>
      <div class="buttons">
        <paper-button id="cancel" noink dialog-dismiss class="secondary">[[i18n('command.close')]]</paper-button>
        <paper-button id="confirm" noink class="primary" on-click="_processAssignment"
          >[[_getActionLabel(action, i18n)]]</paper-button
        >
      </div>
    </nuxeo-dialog>
  `,is:"nuxeo-document-task-assignment-popup",behaviors:[l.mB],properties:{task:{type:Object},action:{type:String}},openPopup(){this._resetPopup(),this.$.assignmentDialog.open()},_getActionLabel:(e,t)=>t(`tasks.${e}`),_processAssignment(){this.$.assignmentForm.validate()&&(this.params.comment=this.comment,this.params["delegate"===this.action?"delegatedActors":"actors"]=this.actors,this.$.taskAssignment.put().then((e=>{this.$.assignmentDialog.close(),this.fire("workflowTaskAssignment",{task:e})})))},_resetPopup(){this.actors=[],this.comment=null,this.params={},this.$.assignmentForm.reset()}}),(0,m.k)({_template:h.d`
    <style include="nuxeo-styles">
      :host {
        display: block;
      }

      nuxeo-workflow-graph {
        position: relative;
      }

      #task-body {
        @apply --layout-vertical;
      }

      .heading {
        @apply --layout-horizontal;
        @apply --layout-justified;
      }

      .vertical {
        @apply --layout-vertical;
        justify-content: center;
      }

      .horizontal {
        @apply --layout-horizontal;
      }

      h5 {
        margin: 0;
      }

      .options {
        @apply --layout-horizontal;
        @apply --layout-start;
        @apply --layout-end-justified;
        @apply --layout-flex;
      }

      .spaced {
        margin: 16px 0;
      }

      .date {
        color: var(--nuxeo-warn-text, #fb6107);
      }

      .view-graph {
        color: var(--nuxeo-primary-color, #0066ff);
        font-weight: bolder;
      }
      
      .info {
        margin-bottom: 1rem;
      }
      
      .info > iron-icon {
        color: var(--nuxeo-validated, #42BE65);
        margin-inline-end: 0.5rem;
        min-width: 1.5rem;
      }
      
      .info > span {
        font-weight: 600;
      }

      .read-only {
        pointer-events: none;
        opacity: 0.6;
      }
    </style>

    <nuxeo-resource id="taskRequest" path="/task/[[task.id]]/[[action]]" data="{{taskData}}"></nuxeo-resource>

    <div id="task-body">
      <iron-pages selected="[[_selectedTab]]" attr-for-selected="name">
        <div name="resolution">
          <nuxeo-workflow-graph id="graph" workflow-id="[[task.workflowInstanceId]]"></nuxeo-workflow-graph>
          <nuxeo-document-task-assignment-popup
            id="assignmentDialog"
            task="[[task]]"
            action="[[action]]"
          ></nuxeo-document-task-assignment-popup>

          <template is="dom-if" if="[[_isTaskInEndState(task)]]">
            <div class="info horizontal">
                <iron-icon icon="icons:assignment-turned-in"></iron-icon>
                <span>[[i18n('tasks.alreadyProcessed')]]</span>
            </div>
          </template>

          <div class="heading">
            <div class="vertical">
              <h5>[[i18n(task.name)]]</h5>
            </div>

            <template is="dom-if" if="[[!_isTaskInEndState(task)]]">
              <div class="options">
                <paper-button
                  id="reassignBtn"
                  class="text"
                  noink
                  dialog-confirm
                  on-tap="_toggleAssignmentDialog"
                  data-args="reassign"
                  hidden$="[[!task.taskInfo.allowTaskReassignment]]"
                  >[[i18n('tasks.reassign')]]</paper-button
                >
                <paper-button
                  id="delegateBtn"
                  class="text"
                  noink
                  dialog-confirm
                  on-tap="_toggleAssignmentDialog"
                  data-args="delegate"
                  >[[i18n('tasks.delegate')]]</paper-button
                >
              </div>
            </template>
          </div>
          <a href="javascript:undefined" on-tap="_toggleGraphDialog" class="view-graph">[[i18n('tasks.viewGraph')]]</a>
          <div class="horizontal spaced">
            <span>[[i18n(tasks.directive)]]</span>
          </div>
          <div id="assignedActors" class="vertical spaced">
            <span>[[i18n('tasks.actors.assigned')]]</span>
            <template is="dom-if" if="[[_hasActorType(task.actors, 'group')]]">
              <nuxeo-tags type="group" items="[[_getActorsByType(task.actors, 'group')]]"></nuxeo-tags>  
            </template>
            <template is="dom-if" if="[[_hasActorType(task.actors, 'user')]]">
              <nuxeo-tags type="user" items="[[_getActorsByType(task.actors, 'user')]]"></nuxeo-tags>
            </template>
          </div>
          <template is="dom-if" if="[[_delegatedActorsExist(task.delegatedActors)]]">
            <div id="delegatedActors" class="vertical spaced">
              <span>[[i18n('tasks.actors.delegated')]]</span>
              <template is="dom-if" if="[[_hasActorType(task.delegatedActors, 'group')]]">
                <nuxeo-tags type="user" items="[[_getActorsByType(task.delegatedActors, 'group')]]"></nuxeo-tags>
              </template>
              <template is="dom-if" if="[[_hasActorType(task.delegatedActors,'user')]]">
                <nuxeo-tags type="user" items="[[_getActorsByType(task.delegatedActors, 'user')]]"></nuxeo-tags>
              </template>
            </div>
          </template>
          <div class="vertical spaced">
            <label>[[i18n('documentTask.dueDate')]]</label>
            <div class="date">
              <nuxeo-date datetime="[[task.dueDate]]" format="relative"></nuxeo-date>
            </div>
          </div>

          <div class$="[[_computeLayoutVisibility(task)]]">
            <nuxeo-layout
              id="layout"
              href="[[_href]]"
              model="[[_model]]"
              error="[[i18n('documentView.layoutNotFound', task.nodeName)]]"
              on-element-changed="_elementChanged"
            ></nuxeo-layout>
          </div>

          <div class="horizontal">
            <template is="dom-if" if="[[!_isTaskInEndState(task)]]">
              <div class="options">
                <template is="dom-repeat" items="[[task.taskInfo.taskActions]]">
                  <paper-button
                    noink
                    dialog-confirm
                    class="primary"
                    name$="[[item.name]]"
                    on-tap="_processTask"
                    disabled$="[[processing]]"
                  >
                    [[i18n(item.label)]]</paper-button
                  >
                </template>
              </div>
            </template>
        </div>
      </iron-pages>
    </div>
  `,is:"nuxeo-document-task",behaviors:[u.M,d.N,r.e],importMeta:{url:`${window.location.protocol}//${window.location.host}${window.location.pathname}/workflow/nuxeo-document-task.js`},properties:{task:{type:Object},action:{type:String},_href:{type:String},_model:{type:Object},_selectedTab:{type:String,value:"resolution"},processing:{type:Boolean,value:!1,readOnly:!0}},observers:["_updateTaskLayout(task)"],_elementChanged(){this._model={document:this.task.targetDocumentIds[0],task:this.task}},_updateTaskLayout(e){if(e){this._href=null;const t=["nuxeo",e.nodeName.toLowerCase(),"layout"].join("-");this._href=this.resolveUrl(`${e.workflowModelName.toLowerCase()}/${t}.html`)}},validate(){return this.$.layout.validate()},async _processTask(e){const{validate:t}=e.model.item;if(this._setProcessing(!0),t&&!await this.validate()){const e=this.$.layout._getValidatableElements(this.$.layout.element.root).find((e=>e.invalid));return e&&(e.scrollIntoView(),e.focus()),void this._setProcessing(!1)}this.action=e.model.item.name,this.taskData={"entity-type":"task",id:this.$.layout.element.task.id,variables:this.$.layout.element.task.variables},this.$.taskRequest.put().then((e=>{this.fire("workflowTaskProcessed",{task:e})})).catch((e=>{if(409!==e.status&&403!==e.status)throw this.notify({message:this.i18n("tasks.submit.error")}),e;this.notify({message:this.i18n("tasks.submit.error."+(409===e.status?"alreadyFinished":"noPermissions")),dismissible:!0,duration:3e4}),this.fire("workflowTaskProcessed")})).finally((()=>this._setProcessing(!1)))},_toggleGraphDialog(){this.$.graph.show()},_toggleAssignmentDialog(e){this.action=e.target.dataset.args,this.$.assignmentDialog.openPopup()},_delegatedActorsExist:e=>!!e&&e.length>0,_computeLayoutVisibility(e){return this._isTaskInEndState(e)?"read-only":""},_isTaskInEndState:e=>e&&"ended"===e.state,_hasActorType:(e,t)=>e&&Array.isArray(e)&&e.findIndex((e=>e["entity-type"]===t))>=0,_getActorsByType:(e,t)=>e&&Array.isArray(e)&&e.filter((e=>e["entity-type"]===t))}),(0,m.k)({_template:h.d`
    <style>
      :host {
        display: block;
      }
    </style>
  `,is:"nuxeo-document-task-review-result",properties:{result:{type:String,observer:"_observeResult"}},_observeResult(){this.root.innerHTML=this.result}}),(0,m.k)({_template:h.d`
    <style>
      .flex {
        @apply --layout-flex;
      }
      paper-listbox {
        @apply --layout-horizontal;
        --paper-listbox-background-color: transparent;
        padding: 0;
      }
    </style>

    <nuxeo-page>
      <div slot="header">
        <span class="flex">[[i18n('analytics.heading')]]</span>
      </div>
      <div slot="tabs">
        <paper-listbox selected="{{selected}}" attr-for-selected="name">
          <nuxeo-slot name="ANALYTICS_ITEMS"></nuxeo-slot>
        </paper-listbox>
      </div>
      <div>
        <template is="dom-if" if="[[visible]]">
          <iron-pages selected="[[selected]]" attr-for-selected="name" selected-attribute="visible">
            <nuxeo-slot name="ANALYTICS_PAGES"></nuxeo-slot>
          </iron-pages>
        </template>
      </div>
    </nuxeo-page>
  `,is:"nuxeo-analytics",behaviors:[l.mB],properties:{visible:Boolean,selected:String}}),i(14862);const k={"application/1d-interleaved-parityfec":{source:"iana"},"application/3gpdash-qoe-report+xml":{source:"iana"},"application/3gpp-ims+xml":{source:"iana"},"application/a2l":{source:"iana"},"application/activemessage":{source:"iana"},"application/alto-costmap+json":{source:"iana"},"application/alto-costmapfilter+json":{source:"iana",compressible:!0},"application/alto-directory+json":{source:"iana",compressible:!0},"application/alto-endpointcost+json":{source:"iana",compressible:!0},"application/alto-endpointcostparams+json":{source:"iana",compressible:!0},"application/alto-endpointprop+json":{source:"iana",compressible:!0},"application/alto-endpointpropparams+json":{source:"iana",compressible:!0},"application/alto-error+json":{source:"iana",compressible:!0},"application/alto-networkmap+json":{source:"iana",compressible:!0},"application/alto-networkmapfilter+json":{source:"iana",compressible:!0},"application/aml":{source:"iana"},"application/andrew-inset":{source:"iana",extensions:["ez"]},"application/applefile":{source:"iana"},"application/applixware":{source:"apache",extensions:["aw"]},"application/atf":{source:"iana"},"application/atfx":{source:"iana"},"application/atom+xml":{source:"iana",compressible:!0,extensions:["atom"]},"application/atomcat+xml":{source:"iana",extensions:["atomcat"]},"application/atomdeleted+xml":{source:"iana"},"application/atomicmail":{source:"iana"},"application/atomsvc+xml":{source:"iana",extensions:["atomsvc"]},"application/atxml":{source:"iana"},"application/auth-policy+xml":{source:"iana"},"application/bacnet-xdd+zip":{source:"iana"},"application/batch-smtp":{source:"iana"},"application/bdoc":{compressible:!1,extensions:["bdoc"]},"application/beep+xml":{source:"iana"},"application/calendar+json":{source:"iana",compressible:!0},"application/calendar+xml":{source:"iana"},"application/call-completion":{source:"iana"},"application/cals-1840":{source:"iana"},"application/cbor":{source:"iana"},"application/ccmp+xml":{source:"iana"},"application/ccxml+xml":{source:"iana",extensions:["ccxml"]},"application/cdfx+xml":{source:"iana"},"application/cdmi-capability":{source:"iana",extensions:["cdmia"]},"application/cdmi-container":{source:"iana",extensions:["cdmic"]},"application/cdmi-domain":{source:"iana",extensions:["cdmid"]},"application/cdmi-object":{source:"iana",extensions:["cdmio"]},"application/cdmi-queue":{source:"iana",extensions:["cdmiq"]},"application/cdni":{source:"iana"},"application/cea":{source:"iana"},"application/cea-2018+xml":{source:"iana"},"application/cellml+xml":{source:"iana"},"application/cfw":{source:"iana"},"application/cms":{source:"iana"},"application/cnrp+xml":{source:"iana"},"application/coap-group+json":{source:"iana",compressible:!0},"application/commonground":{source:"iana"},"application/conference-info+xml":{source:"iana"},"application/cpl+xml":{source:"iana"},"application/csrattrs":{source:"iana"},"application/csta+xml":{source:"iana"},"application/cstadata+xml":{source:"iana"},"application/csvm+json":{source:"iana",compressible:!0},"application/cu-seeme":{source:"apache",extensions:["cu"]},"application/cybercash":{source:"iana"},"application/dart":{compressible:!0},"application/dash+xml":{source:"iana",extensions:["mpd"]},"application/dashdelta":{source:"iana"},"application/davmount+xml":{source:"iana",extensions:["davmount"]},"application/dca-rft":{source:"iana"},"application/dcd":{source:"iana"},"application/dec-dx":{source:"iana"},"application/dialog-info+xml":{source:"iana"},"application/dicom":{source:"iana"},"application/dii":{source:"iana"},"application/dit":{source:"iana"},"application/dns":{source:"iana"},"application/docbook+xml":{source:"apache",extensions:["dbk"]},"application/dskpp+xml":{source:"iana"},"application/dssc+der":{source:"iana",extensions:["dssc"]},"application/dssc+xml":{source:"iana",extensions:["xdssc"]},"application/dvcs":{source:"iana"},"application/ecmascript":{source:"iana",compressible:!0,extensions:["ecma"]},"application/edi-consent":{source:"iana"},"application/edi-x12":{source:"iana",compressible:!1},"application/edifact":{source:"iana",compressible:!1},"application/efi":{source:"iana"},"application/emergencycalldata.comment+xml":{source:"iana"},"application/emergencycalldata.deviceinfo+xml":{source:"iana"},"application/emergencycalldata.providerinfo+xml":{source:"iana"},"application/emergencycalldata.serviceinfo+xml":{source:"iana"},"application/emergencycalldata.subscriberinfo+xml":{source:"iana"},"application/emma+xml":{source:"iana",extensions:["emma"]},"application/emotionml+xml":{source:"iana"},"application/encaprtp":{source:"iana"},"application/epp+xml":{source:"iana"},"application/epub+zip":{source:"iana",extensions:["epub"]},"application/eshop":{source:"iana"},"application/exi":{source:"iana",extensions:["exi"]},"application/fastinfoset":{source:"iana"},"application/fastsoap":{source:"iana"},"application/fdt+xml":{source:"iana"},"application/fits":{source:"iana"},"application/font-sfnt":{source:"iana"},"application/font-tdpfr":{source:"iana",extensions:["pfr"]},"application/font-woff":{source:"iana",compressible:!1,extensions:["woff"]},"application/font-woff2":{compressible:!1,extensions:["woff2"]},"application/framework-attributes+xml":{source:"iana"},"application/gml+xml":{source:"apache",extensions:["gml"]},"application/gpx+xml":{source:"apache",extensions:["gpx"]},"application/gxf":{source:"apache",extensions:["gxf"]},"application/gzip":{name:"GZIP",source:"iana",compressible:!1},"application/h224":{source:"iana"},"application/held+xml":{source:"iana"},"application/http":{source:"iana"},"application/hyperstudio":{source:"iana",extensions:["stk"]},"application/ibe-key-request+xml":{source:"iana"},"application/ibe-pkg-reply+xml":{source:"iana"},"application/ibe-pp-data":{source:"iana"},"application/iges":{source:"iana"},"application/im-iscomposing+xml":{source:"iana"},"application/index":{source:"iana"},"application/index.cmd":{source:"iana"},"application/index.obj":{source:"iana"},"application/index.response":{source:"iana"},"application/index.vnd":{source:"iana"},"application/inkml+xml":{source:"iana",extensions:["ink","inkml"]},"application/iotp":{source:"iana"},"application/ipfix":{source:"iana",extensions:["ipfix"]},"application/ipp":{source:"iana"},"application/isup":{source:"iana"},"application/its+xml":{source:"iana"},"application/java-archive":{name:"JAR",source:"apache",compressible:!1,extensions:["jar","war","ear"]},"application/java-serialized-object":{source:"apache",compressible:!1,extensions:["ser"]},"application/java-vm":{name:"CLASS",source:"apache",compressible:!1,extensions:["class"]},"application/javascript":{name:"JavaScript",source:"iana",charset:"UTF-8",compressible:!0,extensions:["js"]},"application/jose":{source:"iana"},"application/jose+json":{name:"JSON",source:"iana",compressible:!0},"application/jrd+json":{source:"iana",compressible:!0},"application/json":{source:"iana",charset:"UTF-8",compressible:!0,extensions:["json","map"]},"application/json-patch+json":{source:"iana",compressible:!0},"application/json-seq":{source:"iana"},"application/json5":{extensions:["json5"]},"application/jsonml+json":{source:"apache",compressible:!0,extensions:["jsonml"]},"application/jwk+json":{source:"iana",compressible:!0},"application/jwk-set+json":{source:"iana",compressible:!0},"application/jwt":{source:"iana"},"application/kpml-request+xml":{source:"iana"},"application/kpml-response+xml":{source:"iana"},"application/ld+json":{source:"iana",compressible:!0,extensions:["jsonld"]},"application/link-format":{source:"iana"},"application/load-control+xml":{source:"iana"},"application/lost+xml":{source:"iana",extensions:["lostxml"]},"application/lostsync+xml":{source:"iana"},"application/lxf":{source:"iana"},"application/mac-binhex40":{source:"iana",extensions:["hqx"]},"application/mac-compactpro":{source:"apache",extensions:["cpt"]},"application/macwriteii":{source:"iana"},"application/mads+xml":{source:"iana",extensions:["mads"]},"application/manifest+json":{charset:"UTF-8",compressible:!0,extensions:["webmanifest"]},"application/marc":{source:"iana",extensions:["mrc"]},"application/marcxml+xml":{source:"iana",extensions:["mrcx"]},"application/mathematica":{source:"iana",extensions:["ma","nb","mb"]},"application/mathml+xml":{source:"iana",extensions:["mathml"]},"application/mathml-content+xml":{source:"iana"},"application/mathml-presentation+xml":{source:"iana"},"application/mbms-associated-procedure-description+xml":{source:"iana"},"application/mbms-deregister+xml":{source:"iana"},"application/mbms-envelope+xml":{source:"iana"},"application/mbms-msk+xml":{source:"iana"},"application/mbms-msk-response+xml":{source:"iana"},"application/mbms-protection-description+xml":{source:"iana"},"application/mbms-reception-report+xml":{source:"iana"},"application/mbms-register+xml":{source:"iana"},"application/mbms-register-response+xml":{source:"iana"},"application/mbms-schedule+xml":{source:"iana"},"application/mbms-user-service-description+xml":{source:"iana"},"application/mbox":{source:"iana",extensions:["mbox"]},"application/media-policy-dataset+xml":{source:"iana"},"application/media_control+xml":{source:"iana"},"application/mediaservercontrol+xml":{source:"iana",extensions:["mscml"]},"application/merge-patch+json":{source:"iana",compressible:!0},"application/metalink+xml":{source:"apache",extensions:["metalink"]},"application/metalink4+xml":{source:"iana",extensions:["meta4"]},"application/mets+xml":{source:"iana",extensions:["mets"]},"application/mf4":{source:"iana"},"application/mikey":{source:"iana"},"application/mods+xml":{source:"iana",extensions:["mods"]},"application/moss-keys":{source:"iana"},"application/moss-signature":{source:"iana"},"application/mosskey-data":{source:"iana"},"application/mosskey-request":{source:"iana"},"application/mp21":{source:"iana",extensions:["m21","mp21"]},"application/mp4":{source:"iana",extensions:["mp4s","m4p"]},"application/mpeg4-generic":{source:"iana"},"application/mpeg4-iod":{source:"iana"},"application/mpeg4-iod-xmt":{source:"iana"},"application/mrb-consumer+xml":{source:"iana"},"application/mrb-publish+xml":{source:"iana"},"application/msc-ivr+xml":{source:"iana"},"application/msc-mixer+xml":{source:"iana"},"application/msword":{name:"Word",source:"iana",compressible:!1,extensions:["doc","dot"]},"application/mxf":{source:"iana",extensions:["mxf"]},"application/nasdata":{source:"iana"},"application/news-checkgroups":{source:"iana"},"application/news-groupinfo":{source:"iana"},"application/news-transmission":{source:"iana"},"application/nlsml+xml":{source:"iana"},"application/nss":{source:"iana"},"application/ocsp-request":{source:"iana"},"application/ocsp-response":{source:"iana"},"application/octet-stream":{name:"Binary",source:"iana",compressible:!1,extensions:["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"]},"application/oda":{source:"iana",extensions:["oda"]},"application/odx":{source:"iana"},"application/oebps-package+xml":{source:"iana",extensions:["opf"]},"application/ogg":{source:"iana",compressible:!1,extensions:["ogx"]},"application/omdoc+xml":{source:"apache",extensions:["omdoc"]},"application/onenote":{name:"One Note",source:"apache",extensions:["onetoc","onetoc2","onetmp","onepkg"]},"application/oxps":{source:"iana",extensions:["oxps"]},"application/p2p-overlay+xml":{source:"iana"},"application/parityfec":{source:"iana"},"application/patch-ops-error+xml":{source:"iana",extensions:["xer"]},"application/pdf":{name:"PDF",source:"iana",compressible:!1,extensions:["pdf"]},"application/pdx":{source:"iana"},"application/pgp-encrypted":{source:"iana",compressible:!1,extensions:["pgp"]},"application/pgp-keys":{source:"iana"},"application/pgp-signature":{source:"iana",extensions:["asc","sig"]},"application/pics-rules":{source:"apache",extensions:["prf"]},"application/pidf+xml":{source:"iana"},"application/pidf-diff+xml":{source:"iana"},"application/pkcs10":{source:"iana",extensions:["p10"]},"application/pkcs12":{source:"iana"},"application/pkcs7-mime":{source:"iana",extensions:["p7m","p7c"]},"application/pkcs7-signature":{source:"iana",extensions:["p7s"]},"application/pkcs8":{source:"iana",extensions:["p8"]},"application/pkix-attr-cert":{source:"iana",extensions:["ac"]},"application/pkix-cert":{source:"iana",extensions:["cer"]},"application/pkix-crl":{source:"iana",extensions:["crl"]},"application/pkix-pkipath":{source:"iana",extensions:["pkipath"]},"application/pkixcmp":{source:"iana",extensions:["pki"]},"application/pls+xml":{source:"iana",extensions:["pls"]},"application/poc-settings+xml":{source:"iana"},"application/postscript":{source:"iana",compressible:!0,extensions:["ai","eps","ps"]},"application/ppsp-tracker+json":{source:"iana",compressible:!0},"application/problem+json":{source:"iana",compressible:!0},"application/problem+xml":{source:"iana"},"application/provenance+xml":{source:"iana"},"application/prs.alvestrand.titrax-sheet":{source:"iana"},"application/prs.cww":{source:"iana",extensions:["cww"]},"application/prs.hpub+zip":{source:"iana"},"application/prs.nprend":{source:"iana"},"application/prs.plucker":{source:"iana"},"application/prs.rdf-xml-crypt":{source:"iana"},"application/prs.xsf+xml":{source:"iana"},"application/pskc+xml":{source:"iana",extensions:["pskcxml"]},"application/qsig":{source:"iana"},"application/raptorfec":{source:"iana"},"application/rdap+json":{source:"iana",compressible:!0},"application/rdf+xml":{source:"iana",compressible:!0,extensions:["rdf"]},"application/reginfo+xml":{source:"iana",extensions:["rif"]},"application/relax-ng-compact-syntax":{source:"iana",extensions:["rnc"]},"application/remote-printing":{source:"iana"},"application/reputon+json":{source:"iana",compressible:!0},"application/resource-lists+xml":{source:"iana",extensions:["rl"]},"application/resource-lists-diff+xml":{source:"iana",extensions:["rld"]},"application/rfc+xml":{source:"iana"},"application/riscos":{source:"iana"},"application/rlmi+xml":{source:"iana"},"application/rls-services+xml":{source:"iana",extensions:["rs"]},"application/rpki-ghostbusters":{source:"iana",extensions:["gbr"]},"application/rpki-manifest":{source:"iana",extensions:["mft"]},"application/rpki-roa":{source:"iana",extensions:["roa"]},"application/rpki-updown":{source:"iana"},"application/rsd+xml":{source:"apache",extensions:["rsd"]},"application/rss+xml":{name:"RSS",source:"apache",compressible:!0,extensions:["rss"]},"application/rtf":{name:"RTF",source:"iana",compressible:!0,extensions:["rtf"]},"application/rtploopback":{source:"iana"},"application/rtx":{source:"iana"},"application/samlassertion+xml":{source:"iana"},"application/samlmetadata+xml":{source:"iana"},"application/sbml+xml":{source:"iana",extensions:["sbml"]},"application/scaip+xml":{source:"iana"},"application/scim+json":{source:"iana",compressible:!0},"application/scvp-cv-request":{source:"iana",extensions:["scq"]},"application/scvp-cv-response":{source:"iana",extensions:["scs"]},"application/scvp-vp-request":{source:"iana",extensions:["spq"]},"application/scvp-vp-response":{source:"iana",extensions:["spp"]},"application/sdp":{source:"iana",extensions:["sdp"]},"application/sep+xml":{source:"iana"},"application/sep-exi":{source:"iana"},"application/session-info":{source:"iana"},"application/set-payment":{source:"iana"},"application/set-payment-initiation":{source:"iana",extensions:["setpay"]},"application/set-registration":{source:"iana"},"application/set-registration-initiation":{source:"iana",extensions:["setreg"]},"application/sgml":{source:"iana"},"application/sgml-open-catalog":{source:"iana"},"application/shf+xml":{source:"iana",extensions:["shf"]},"application/sieve":{source:"iana"},"application/simple-filter+xml":{source:"iana"},"application/simple-message-summary":{source:"iana"},"application/simplesymbolcontainer":{source:"iana"},"application/slate":{source:"iana"},"application/smil":{source:"iana"},"application/smil+xml":{source:"iana",extensions:["smi","smil"]},"application/smpte336m":{source:"iana"},"application/soap+fastinfoset":{source:"iana"},"application/soap+xml":{source:"iana",compressible:!0},"application/sparql-query":{source:"iana",extensions:["rq"]},"application/sparql-results+xml":{source:"iana",extensions:["srx"]},"application/spirits-event+xml":{source:"iana"},"application/sql":{source:"iana"},"application/srgs":{source:"iana",extensions:["gram"]},"application/srgs+xml":{source:"iana",extensions:["grxml"]},"application/sru+xml":{source:"iana",extensions:["sru"]},"application/ssdl+xml":{source:"apache",extensions:["ssdl"]},"application/ssml+xml":{source:"iana",extensions:["ssml"]},"application/tamp-apex-update":{source:"iana"},"application/tamp-apex-update-confirm":{source:"iana"},"application/tamp-community-update":{source:"iana"},"application/tamp-community-update-confirm":{source:"iana"},"application/tamp-error":{source:"iana"},"application/tamp-sequence-adjust":{source:"iana"},"application/tamp-sequence-adjust-confirm":{source:"iana"},"application/tamp-status-query":{source:"iana"},"application/tamp-status-response":{source:"iana"},"application/tamp-update":{source:"iana"},"application/tamp-update-confirm":{source:"iana"},"application/tar":{compressible:!0},"application/tei+xml":{source:"iana",extensions:["tei","teicorpus"]},"application/thraud+xml":{source:"iana",extensions:["tfi"]},"application/timestamp-query":{source:"iana"},"application/timestamp-reply":{source:"iana"},"application/timestamped-data":{source:"iana",extensions:["tsd"]},"application/ttml+xml":{source:"iana"},"application/tve-trigger":{source:"iana"},"application/ulpfec":{source:"iana"},"application/urc-grpsheet+xml":{source:"iana"},"application/urc-ressheet+xml":{source:"iana"},"application/urc-targetdesc+xml":{source:"iana"},"application/urc-uisocketdesc+xml":{source:"iana"},"application/vcard+json":{source:"iana",compressible:!0},"application/vcard+xml":{source:"iana"},"application/vemmi":{source:"iana"},"application/vividence.scriptfile":{source:"apache"},"application/vnd.3gpp-prose+xml":{source:"iana"},"application/vnd.3gpp-prose-pc3ch+xml":{source:"iana"},"application/vnd.3gpp.access-transfer-events+xml":{source:"iana"},"application/vnd.3gpp.bsf+xml":{source:"iana"},"application/vnd.3gpp.mid-call+xml":{source:"iana"},"application/vnd.3gpp.pic-bw-large":{source:"iana",extensions:["plb"]},"application/vnd.3gpp.pic-bw-small":{source:"iana",extensions:["psb"]},"application/vnd.3gpp.pic-bw-var":{source:"iana",extensions:["pvb"]},"application/vnd.3gpp.sms":{source:"iana"},"application/vnd.3gpp.sms+xml":{source:"iana"},"application/vnd.3gpp.srvcc-ext+xml":{source:"iana"},"application/vnd.3gpp.srvcc-info+xml":{source:"iana"},"application/vnd.3gpp.state-and-event-info+xml":{source:"iana"},"application/vnd.3gpp.ussd+xml":{source:"iana"},"application/vnd.3gpp2.bcmcsinfo+xml":{source:"iana"},"application/vnd.3gpp2.sms":{source:"iana"},"application/vnd.3gpp2.tcap":{source:"iana",extensions:["tcap"]},"application/vnd.3lightssoftware.imagescal":{source:"iana"},"application/vnd.3m.post-it-notes":{source:"iana",extensions:["pwn"]},"application/vnd.accpac.simply.aso":{source:"iana",extensions:["aso"]},"application/vnd.accpac.simply.imp":{source:"iana",extensions:["imp"]},"application/vnd.acucobol":{source:"iana",extensions:["acu"]},"application/vnd.acucorp":{source:"iana",extensions:["atc","acutc"]},"application/vnd.adobe.air-application-installer-package+zip":{source:"apache",extensions:["air"]},"application/vnd.adobe.flash.movie":{source:"iana"},"application/vnd.adobe.formscentral.fcdt":{source:"iana",extensions:["fcdt"]},"application/vnd.adobe.fxp":{source:"iana",extensions:["fxp","fxpl"]},"application/vnd.adobe.partial-upload":{source:"iana"},"application/vnd.adobe.xdp+xml":{source:"iana",extensions:["xdp"]},"application/vnd.adobe.xfdf":{source:"iana",extensions:["xfdf"]},"application/vnd.aether.imp":{source:"iana"},"application/vnd.ah-barcode":{source:"iana"},"application/vnd.ahead.space":{source:"iana",extensions:["ahead"]},"application/vnd.airzip.filesecure.azf":{source:"iana",extensions:["azf"]},"application/vnd.airzip.filesecure.azs":{source:"iana",extensions:["azs"]},"application/vnd.amazon.ebook":{source:"apache",extensions:["azw"]},"application/vnd.americandynamics.acc":{source:"iana",extensions:["acc"]},"application/vnd.amiga.ami":{source:"iana",extensions:["ami"]},"application/vnd.amundsen.maze+xml":{source:"iana"},"application/vnd.android.package-archive":{name:"APK",source:"apache",compressible:!1,extensions:["apk"]},"application/vnd.anki":{source:"iana"},"application/vnd.anser-web-certificate-issue-initiation":{source:"iana",extensions:["cii"]},"application/vnd.anser-web-funds-transfer-initiation":{source:"apache",extensions:["fti"]},"application/vnd.antix.game-component":{source:"iana",extensions:["atx"]},"application/vnd.apache.thrift.binary":{source:"iana"},"application/vnd.apache.thrift.compact":{source:"iana"},"application/vnd.apache.thrift.json":{source:"iana"},"application/vnd.api+json":{source:"iana",compressible:!0},"application/vnd.apple.installer+xml":{source:"iana",extensions:["mpkg"]},"application/vnd.apple.mpegurl":{source:"iana",extensions:["m3u8"]},"application/vnd.apple.pkpass":{compressible:!1,extensions:["pkpass"]},"application/vnd.arastra.swi":{source:"iana"},"application/vnd.aristanetworks.swi":{source:"iana",extensions:["swi"]},"application/vnd.artsquare":{source:"iana"},"application/vnd.astraea-software.iota":{source:"iana",extensions:["iota"]},"application/vnd.audiograph":{source:"iana",extensions:["aep"]},"application/vnd.autopackage":{source:"iana"},"application/vnd.avistar+xml":{source:"iana"},"application/vnd.balsamiq.bmml+xml":{source:"iana"},"application/vnd.balsamiq.bmpr":{source:"iana"},"application/vnd.bekitzur-stech+json":{source:"iana",compressible:!0},"application/vnd.biopax.rdf+xml":{source:"iana"},"application/vnd.blueice.multipass":{source:"iana",extensions:["mpm"]},"application/vnd.bluetooth.ep.oob":{source:"iana"},"application/vnd.bluetooth.le.oob":{source:"iana"},"application/vnd.bmi":{source:"iana",extensions:["bmi"]},"application/vnd.businessobjects":{source:"iana",extensions:["rep"]},"application/vnd.cab-jscript":{source:"iana"},"application/vnd.canon-cpdl":{source:"iana"},"application/vnd.canon-lips":{source:"iana"},"application/vnd.cendio.thinlinc.clientconf":{source:"iana"},"application/vnd.century-systems.tcp_stream":{source:"iana"},"application/vnd.chemdraw+xml":{source:"iana",extensions:["cdxml"]},"application/vnd.chipnuts.karaoke-mmd":{source:"iana",extensions:["mmd"]},"application/vnd.cinderella":{source:"iana",extensions:["cdy"]},"application/vnd.cirpack.isdn-ext":{source:"iana"},"application/vnd.citationstyles.style+xml":{source:"iana"},"application/vnd.claymore":{source:"iana",extensions:["cla"]},"application/vnd.cloanto.rp9":{source:"iana",extensions:["rp9"]},"application/vnd.clonk.c4group":{source:"iana",extensions:["c4g","c4d","c4f","c4p","c4u"]},"application/vnd.cluetrust.cartomobile-config":{source:"iana",extensions:["c11amc"]},"application/vnd.cluetrust.cartomobile-config-pkg":{source:"iana",extensions:["c11amz"]},"application/vnd.coffeescript":{source:"iana"},"application/vnd.collection+json":{source:"iana",compressible:!0},"application/vnd.collection.doc+json":{source:"iana",compressible:!0},"application/vnd.collection.next+json":{source:"iana",compressible:!0},"application/vnd.commerce-battelle":{source:"iana"},"application/vnd.commonspace":{source:"iana",extensions:["csp"]},"application/vnd.contact.cmsg":{source:"iana",extensions:["cdbcmsg"]},"application/vnd.coreos.ignition+json":{source:"iana",compressible:!0},"application/vnd.cosmocaller":{source:"iana",extensions:["cmc"]},"application/vnd.crick.clicker":{source:"iana",extensions:["clkx"]},"application/vnd.crick.clicker.keyboard":{source:"iana",extensions:["clkk"]},"application/vnd.crick.clicker.palette":{source:"iana",extensions:["clkp"]},"application/vnd.crick.clicker.template":{source:"iana",extensions:["clkt"]},"application/vnd.crick.clicker.wordbank":{source:"iana",extensions:["clkw"]},"application/vnd.criticaltools.wbs+xml":{source:"iana",extensions:["wbs"]},"application/vnd.ctc-posml":{source:"iana",extensions:["pml"]},"application/vnd.ctct.ws+xml":{source:"iana"},"application/vnd.cups-pdf":{source:"iana"},"application/vnd.cups-postscript":{source:"iana"},"application/vnd.cups-ppd":{source:"iana",extensions:["ppd"]},"application/vnd.cups-raster":{source:"iana"},"application/vnd.cups-raw":{source:"iana"},"application/vnd.curl":{source:"iana"},"application/vnd.curl.car":{source:"apache",extensions:["car"]},"application/vnd.curl.pcurl":{source:"apache",extensions:["pcurl"]},"application/vnd.cyan.dean.root+xml":{source:"iana"},"application/vnd.cybank":{source:"iana"},"application/vnd.dart":{source:"iana",compressible:!0,extensions:["dart"]},"application/vnd.data-vision.rdz":{source:"iana",extensions:["rdz"]},"application/vnd.debian.binary-package":{source:"iana"},"application/vnd.dece.data":{source:"iana",extensions:["uvf","uvvf","uvd","uvvd"]},"application/vnd.dece.ttml+xml":{source:"iana",extensions:["uvt","uvvt"]},"application/vnd.dece.unspecified":{source:"iana",extensions:["uvx","uvvx"]},"application/vnd.dece.zip":{source:"iana",extensions:["uvz","uvvz"]},"application/vnd.denovo.fcselayout-link":{source:"iana",extensions:["fe_launch"]},"application/vnd.desmume-movie":{source:"iana"},"application/vnd.desmume.movie":{source:"apache"},"application/vnd.dir-bi.plate-dl-nosuffix":{source:"iana"},"application/vnd.dm.delegation+xml":{source:"iana"},"application/vnd.dna":{source:"iana",extensions:["dna"]},"application/vnd.document+json":{source:"iana",compressible:!0},"application/vnd.dolby.mlp":{source:"apache",extensions:["mlp"]},"application/vnd.dolby.mobile.1":{source:"iana"},"application/vnd.dolby.mobile.2":{source:"iana"},"application/vnd.doremir.scorecloud-binary-document":{source:"iana"},"application/vnd.dpgraph":{source:"iana",extensions:["dpg"]},"application/vnd.dreamfactory":{source:"iana",extensions:["dfac"]},"application/vnd.drive+json":{source:"iana",compressible:!0},"application/vnd.ds-keypoint":{source:"apache",extensions:["kpxx"]},"application/vnd.dtg.local":{source:"iana"},"application/vnd.dtg.local.flash":{source:"iana"},"application/vnd.dtg.local.html":{source:"iana"},"application/vnd.dvb.ait":{source:"iana",extensions:["ait"]},"application/vnd.dvb.dvbj":{source:"iana"},"application/vnd.dvb.esgcontainer":{source:"iana"},"application/vnd.dvb.ipdcdftnotifaccess":{source:"iana"},"application/vnd.dvb.ipdcesgaccess":{source:"iana"},"application/vnd.dvb.ipdcesgaccess2":{source:"iana"},"application/vnd.dvb.ipdcesgpdd":{source:"iana"},"application/vnd.dvb.ipdcroaming":{source:"iana"},"application/vnd.dvb.iptv.alfec-base":{source:"iana"},"application/vnd.dvb.iptv.alfec-enhancement":{source:"iana"},"application/vnd.dvb.notif-aggregate-root+xml":{source:"iana"},"application/vnd.dvb.notif-container+xml":{source:"iana"},"application/vnd.dvb.notif-generic+xml":{source:"iana"},"application/vnd.dvb.notif-ia-msglist+xml":{source:"iana"},"application/vnd.dvb.notif-ia-registration-request+xml":{source:"iana"},"application/vnd.dvb.notif-ia-registration-response+xml":{source:"iana"},"application/vnd.dvb.notif-init+xml":{source:"iana"},"application/vnd.dvb.pfr":{source:"iana"},"application/vnd.dvb.service":{source:"iana",extensions:["svc"]},"application/vnd.dxr":{source:"iana"},"application/vnd.dynageo":{source:"iana",extensions:["geo"]},"application/vnd.dzr":{source:"iana"},"application/vnd.easykaraoke.cdgdownload":{source:"iana"},"application/vnd.ecdis-update":{source:"iana"},"application/vnd.ecowin.chart":{source:"iana",extensions:["mag"]},"application/vnd.ecowin.filerequest":{source:"iana"},"application/vnd.ecowin.fileupdate":{source:"iana"},"application/vnd.ecowin.series":{source:"iana"},"application/vnd.ecowin.seriesrequest":{source:"iana"},"application/vnd.ecowin.seriesupdate":{source:"iana"},"application/vnd.emclient.accessrequest+xml":{source:"iana"},"application/vnd.enliven":{source:"iana",extensions:["nml"]},"application/vnd.enphase.envoy":{source:"iana"},"application/vnd.eprints.data+xml":{source:"iana"},"application/vnd.epson.esf":{source:"iana",extensions:["esf"]},"application/vnd.epson.msf":{source:"iana",extensions:["msf"]},"application/vnd.epson.quickanime":{source:"iana",extensions:["qam"]},"application/vnd.epson.salt":{source:"iana",extensions:["slt"]},"application/vnd.epson.ssf":{source:"iana",extensions:["ssf"]},"application/vnd.ericsson.quickcall":{source:"iana"},"application/vnd.eszigno3+xml":{source:"iana",extensions:["es3","et3"]},"application/vnd.etsi.aoc+xml":{source:"iana"},"application/vnd.etsi.asic-e+zip":{source:"iana"},"application/vnd.etsi.asic-s+zip":{source:"iana"},"application/vnd.etsi.cug+xml":{source:"iana"},"application/vnd.etsi.iptvcommand+xml":{source:"iana"},"application/vnd.etsi.iptvdiscovery+xml":{source:"iana"},"application/vnd.etsi.iptvprofile+xml":{source:"iana"},"application/vnd.etsi.iptvsad-bc+xml":{source:"iana"},"application/vnd.etsi.iptvsad-cod+xml":{source:"iana"},"application/vnd.etsi.iptvsad-npvr+xml":{source:"iana"},"application/vnd.etsi.iptvservice+xml":{source:"iana"},"application/vnd.etsi.iptvsync+xml":{source:"iana"},"application/vnd.etsi.iptvueprofile+xml":{source:"iana"},"application/vnd.etsi.mcid+xml":{source:"iana"},"application/vnd.etsi.mheg5":{source:"iana"},"application/vnd.etsi.overload-control-policy-dataset+xml":{source:"iana"},"application/vnd.etsi.pstn+xml":{source:"iana"},"application/vnd.etsi.sci+xml":{source:"iana"},"application/vnd.etsi.simservs+xml":{source:"iana"},"application/vnd.etsi.timestamp-token":{source:"iana"},"application/vnd.etsi.tsl+xml":{source:"iana"},"application/vnd.etsi.tsl.der":{source:"iana"},"application/vnd.eudora.data":{source:"iana"},"application/vnd.ezpix-album":{source:"iana",extensions:["ez2"]},"application/vnd.ezpix-package":{source:"iana",extensions:["ez3"]},"application/vnd.f-secure.mobile":{source:"iana"},"application/vnd.fastcopy-disk-image":{source:"iana"},"application/vnd.fdf":{source:"iana",extensions:["fdf"]},"application/vnd.fdsn.mseed":{source:"iana",extensions:["mseed"]},"application/vnd.fdsn.seed":{source:"iana",extensions:["seed","dataless"]},"application/vnd.ffsns":{source:"iana"},"application/vnd.filmit.zfc":{source:"iana"},"application/vnd.fints":{source:"iana"},"application/vnd.firemonkeys.cloudcell":{source:"iana"},"application/vnd.flographit":{source:"iana",extensions:["gph"]},"application/vnd.fluxtime.clip":{source:"iana",extensions:["ftc"]},"application/vnd.font-fontforge-sfd":{source:"iana"},"application/vnd.framemaker":{source:"iana",extensions:["fm","frame","maker","book"]},"application/vnd.frogans.fnc":{source:"iana",extensions:["fnc"]},"application/vnd.frogans.ltf":{source:"iana",extensions:["ltf"]},"application/vnd.fsc.weblaunch":{source:"iana",extensions:["fsc"]},"application/vnd.fujitsu.oasys":{source:"iana",extensions:["oas"]},"application/vnd.fujitsu.oasys2":{source:"iana",extensions:["oa2"]},"application/vnd.fujitsu.oasys3":{source:"iana",extensions:["oa3"]},"application/vnd.fujitsu.oasysgp":{source:"iana",extensions:["fg5"]},"application/vnd.fujitsu.oasysprs":{source:"iana",extensions:["bh2"]},"application/vnd.fujixerox.art-ex":{source:"iana"},"application/vnd.fujixerox.art4":{source:"iana"},"application/vnd.fujixerox.ddd":{source:"iana",extensions:["ddd"]},"application/vnd.fujixerox.docuworks":{source:"iana",extensions:["xdw"]},"application/vnd.fujixerox.docuworks.binder":{source:"iana",extensions:["xbd"]},"application/vnd.fujixerox.docuworks.container":{source:"iana"},"application/vnd.fujixerox.hbpl":{source:"iana"},"application/vnd.fut-misnet":{source:"iana"},"application/vnd.fuzzysheet":{source:"iana",extensions:["fzs"]},"application/vnd.genomatix.tuxedo":{source:"iana",extensions:["txd"]},"application/vnd.geo+json":{source:"iana",compressible:!0},"application/vnd.geocube+xml":{source:"iana"},"application/vnd.geogebra.file":{source:"iana",extensions:["ggb"]},"application/vnd.geogebra.tool":{source:"iana",extensions:["ggt"]},"application/vnd.geometry-explorer":{source:"iana",extensions:["gex","gre"]},"application/vnd.geonext":{source:"iana",extensions:["gxt"]},"application/vnd.geoplan":{source:"iana",extensions:["g2w"]},"application/vnd.geospace":{source:"iana",extensions:["g3w"]},"application/vnd.gerber":{source:"iana"},"application/vnd.globalplatform.card-content-mgt":{source:"iana"},"application/vnd.globalplatform.card-content-mgt-response":{source:"iana"},"application/vnd.gmx":{source:"iana",extensions:["gmx"]},"application/vnd.google-apps.document":{name:"Google Docs",compressible:!1,extensions:["gdoc"]},"application/vnd.google-apps.presentation":{name:"Google Presentation",compressible:!1,extensions:["gslides"]},"application/vnd.google-apps.spreadsheet":{name:"Google Spreadsheet",compressible:!1,extensions:["gsheet"]},"application/vnd.google-earth.kml+xml":{name:"Google Earth (kml)",source:"iana",compressible:!0,extensions:["kml"]},"application/vnd.google-earth.kmz":{name:"Google Earth (kmz)",source:"iana",compressible:!1,extensions:["kmz"]},"application/vnd.google-apps.folder":{name:"Google Drive folder",extensions:["g?"]},"application/vnd.google-apps.file":{name:"Google Drive file",extensions:["g?"]},"application/vnd.google-apps.form":{name:"Google Form",extensions:["g?"]},"application/vnd.google-apps.fusiontable":{name:"Google Fusion Tables",extensions:["g?"]},"application/vnd.google-apps.sites":{name:"Google Sites",extensions:["g?"]},"application/vnd.gov.sk.e-form+xml":{source:"iana"},"application/vnd.gov.sk.e-form+zip":{source:"iana"},"application/vnd.gov.sk.xmldatacontainer+xml":{source:"iana"},"application/vnd.grafeq":{source:"iana",extensions:["gqf","gqs"]},"application/vnd.gridmp":{source:"iana"},"application/vnd.groove-account":{source:"iana",extensions:["gac"]},"application/vnd.groove-help":{source:"iana",extensions:["ghf"]},"application/vnd.groove-identity-message":{source:"iana",extensions:["gim"]},"application/vnd.groove-injector":{source:"iana",extensions:["grv"]},"application/vnd.groove-tool-message":{source:"iana",extensions:["gtm"]},"application/vnd.groove-tool-template":{source:"iana",extensions:["tpl"]},"application/vnd.groove-vcard":{source:"iana",extensions:["vcg"]},"application/vnd.hal+json":{source:"iana",compressible:!0},"application/vnd.hal+xml":{source:"iana",extensions:["hal"]},"application/vnd.handheld-entertainment+xml":{source:"iana",extensions:["zmm"]},"application/vnd.hbci":{source:"iana",extensions:["hbci"]},"application/vnd.hcl-bireports":{source:"iana"},"application/vnd.hdt":{source:"iana"},"application/vnd.heroku+json":{source:"iana",compressible:!0},"application/vnd.hhe.lesson-player":{source:"iana",extensions:["les"]},"application/vnd.hp-hpgl":{source:"iana",extensions:["hpgl"]},"application/vnd.hp-hpid":{source:"iana",extensions:["hpid"]},"application/vnd.hp-hps":{source:"iana",extensions:["hps"]},"application/vnd.hp-jlyt":{source:"iana",extensions:["jlt"]},"application/vnd.hp-pcl":{source:"iana",extensions:["pcl"]},"application/vnd.hp-pclxl":{source:"iana",extensions:["pclxl"]},"application/vnd.httphone":{source:"iana"},"application/vnd.hydrostatix.sof-data":{source:"iana",extensions:["sfd-hdstx"]},"application/vnd.hyperdrive+json":{source:"iana",compressible:!0},"application/vnd.hzn-3d-crossword":{source:"iana"},"application/vnd.ibm.afplinedata":{source:"iana"},"application/vnd.ibm.electronic-media":{source:"iana"},"application/vnd.ibm.minipay":{source:"iana",extensions:["mpy"]},"application/vnd.ibm.modcap":{source:"iana",extensions:["afp","listafp","list3820"]},"application/vnd.ibm.rights-management":{source:"iana",extensions:["irm"]},"application/vnd.ibm.secure-container":{source:"iana",extensions:["sc"]},"application/vnd.iccprofile":{source:"iana",extensions:["icc","icm"]},"application/vnd.ieee.1905":{source:"iana"},"application/vnd.igloader":{source:"iana",extensions:["igl"]},"application/vnd.immervision-ivp":{source:"iana",extensions:["ivp"]},"application/vnd.immervision-ivu":{source:"iana",extensions:["ivu"]},"application/vnd.ims.imsccv1p1":{source:"iana"},"application/vnd.ims.imsccv1p2":{source:"iana"},"application/vnd.ims.imsccv1p3":{source:"iana"},"application/vnd.ims.lis.v2.result+json":{source:"iana",compressible:!0},"application/vnd.ims.lti.v2.toolconsumerprofile+json":{source:"iana",compressible:!0},"application/vnd.ims.lti.v2.toolproxy+json":{source:"iana",compressible:!0},"application/vnd.ims.lti.v2.toolproxy.id+json":{source:"iana",compressible:!0},"application/vnd.ims.lti.v2.toolsettings+json":{source:"iana",compressible:!0},"application/vnd.ims.lti.v2.toolsettings.simple+json":{source:"iana",compressible:!0},"application/vnd.informedcontrol.rms+xml":{source:"iana"},"application/vnd.informix-visionary":{source:"iana"},"application/vnd.infotech.project":{source:"iana"},"application/vnd.infotech.project+xml":{source:"iana"},"application/vnd.innopath.wamp.notification":{source:"iana"},"application/vnd.insors.igm":{source:"iana",extensions:["igm"]},"application/vnd.intercon.formnet":{source:"iana",extensions:["xpw","xpx"]},"application/vnd.intergeo":{source:"iana",extensions:["i2g"]},"application/vnd.intertrust.digibox":{source:"iana"},"application/vnd.intertrust.nncp":{source:"iana"},"application/vnd.intu.qbo":{source:"iana",extensions:["qbo"]},"application/vnd.intu.qfx":{source:"iana",extensions:["qfx"]},"application/vnd.iptc.g2.catalogitem+xml":{source:"iana"},"application/vnd.iptc.g2.conceptitem+xml":{source:"iana"},"application/vnd.iptc.g2.knowledgeitem+xml":{source:"iana"},"application/vnd.iptc.g2.newsitem+xml":{source:"iana"},"application/vnd.iptc.g2.newsmessage+xml":{source:"iana"},"application/vnd.iptc.g2.packageitem+xml":{source:"iana"},"application/vnd.iptc.g2.planningitem+xml":{source:"iana"},"application/vnd.ipunplugged.rcprofile":{source:"iana",extensions:["rcprofile"]},"application/vnd.irepository.package+xml":{source:"iana",extensions:["irp"]},"application/vnd.is-xpr":{source:"iana",extensions:["xpr"]},"application/vnd.isac.fcs":{source:"iana",extensions:["fcs"]},"application/vnd.jam":{source:"iana",extensions:["jam"]},"application/vnd.japannet-directory-service":{source:"iana"},"application/vnd.japannet-jpnstore-wakeup":{source:"iana"},"application/vnd.japannet-payment-wakeup":{source:"iana"},"application/vnd.japannet-registration":{source:"iana"},"application/vnd.japannet-registration-wakeup":{source:"iana"},"application/vnd.japannet-setstore-wakeup":{source:"iana"},"application/vnd.japannet-verification":{source:"iana"},"application/vnd.japannet-verification-wakeup":{source:"iana"},"application/vnd.jcp.javame.midlet-rms":{source:"iana",extensions:["rms"]},"application/vnd.jisp":{source:"iana",extensions:["jisp"]},"application/vnd.joost.joda-archive":{source:"iana",extensions:["joda"]},"application/vnd.jsk.isdn-ngn":{source:"iana"},"application/vnd.kahootz":{source:"iana",extensions:["ktz","ktr"]},"application/vnd.kde.karbon":{source:"iana",extensions:["karbon"]},"application/vnd.kde.kchart":{source:"iana",extensions:["chrt"]},"application/vnd.kde.kformula":{source:"iana",extensions:["kfo"]},"application/vnd.kde.kivio":{source:"iana",extensions:["flw"]},"application/vnd.kde.kontour":{source:"iana",extensions:["kon"]},"application/vnd.kde.kpresenter":{source:"iana",extensions:["kpr","kpt"]},"application/vnd.kde.kspread":{source:"iana",extensions:["ksp"]},"application/vnd.kde.kword":{source:"iana",extensions:["kwd","kwt"]},"application/vnd.kenameaapp":{source:"iana",extensions:["htke"]},"application/vnd.kidspiration":{source:"iana",extensions:["kia"]},"application/vnd.kinar":{source:"iana",extensions:["kne","knp"]},"application/vnd.koan":{source:"iana",extensions:["skp","skd","skt","skm"]},"application/vnd.kodak-descriptor":{source:"iana",extensions:["sse"]},"application/vnd.las.las+xml":{source:"iana",extensions:["lasxml"]},"application/vnd.liberty-request+xml":{source:"iana"},"application/vnd.llamagraphics.life-balance.desktop":{source:"iana",extensions:["lbd"]},"application/vnd.llamagraphics.life-balance.exchange+xml":{source:"iana",extensions:["lbe"]},"application/vnd.lotus-1-2-3":{source:"iana",extensions:["123"]},"application/vnd.lotus-approach":{source:"iana",extensions:["apr"]},"application/vnd.lotus-freelance":{source:"iana",extensions:["pre"]},"application/vnd.lotus-notes":{source:"iana",extensions:["nsf"]},"application/vnd.lotus-organizer":{source:"iana",extensions:["org"]},"application/vnd.lotus-screencam":{source:"iana",extensions:["scm"]},"application/vnd.lotus-wordpro":{source:"iana",extensions:["lwp"]},"application/vnd.macports.portpkg":{source:"iana",extensions:["portpkg"]},"application/vnd.mapbox-vector-tile":{source:"iana"},"application/vnd.marlin.drm.actiontoken+xml":{source:"iana"},"application/vnd.marlin.drm.conftoken+xml":{source:"iana"},"application/vnd.marlin.drm.license+xml":{source:"iana"},"application/vnd.marlin.drm.mdcf":{source:"iana"},"application/vnd.mason+json":{source:"iana",compressible:!0},"application/vnd.maxmind.maxmind-db":{source:"iana"},"application/vnd.mcd":{source:"iana",extensions:["mcd"]},"application/vnd.medcalcdata":{source:"iana",extensions:["mc1"]},"application/vnd.mediastation.cdkey":{source:"iana",extensions:["cdkey"]},"application/vnd.meridian-slingshot":{source:"iana"},"application/vnd.mfer":{source:"iana",extensions:["mwf"]},"application/vnd.mfmp":{source:"iana",extensions:["mfm"]},"application/vnd.micro+json":{source:"iana",compressible:!0},"application/vnd.micrografx.flo":{source:"iana",extensions:["flo"]},"application/vnd.micrografx.igx":{source:"iana",extensions:["igx"]},"application/vnd.microsoft.portable-executable":{source:"iana"},"application/vnd.miele+json":{source:"iana",compressible:!0},"application/vnd.mif":{source:"iana",extensions:["mif"]},"application/vnd.minisoft-hp3000-save":{source:"iana"},"application/vnd.mitsubishi.misty-guard.trustweb":{source:"iana"},"application/vnd.mobius.daf":{source:"iana",extensions:["daf"]},"application/vnd.mobius.dis":{source:"iana",extensions:["dis"]},"application/vnd.mobius.mbk":{source:"iana",extensions:["mbk"]},"application/vnd.mobius.mqy":{source:"iana",extensions:["mqy"]},"application/vnd.mobius.msl":{source:"iana",extensions:["msl"]},"application/vnd.mobius.plc":{source:"iana",extensions:["plc"]},"application/vnd.mobius.txf":{source:"iana",extensions:["txf"]},"application/vnd.mophun.application":{source:"iana",extensions:["mpn"]},"application/vnd.mophun.certificate":{source:"iana",extensions:["mpc"]},"application/vnd.motorola.flexsuite":{source:"iana"},"application/vnd.motorola.flexsuite.adsi":{source:"iana"},"application/vnd.motorola.flexsuite.fis":{source:"iana"},"application/vnd.motorola.flexsuite.gotap":{source:"iana"},"application/vnd.motorola.flexsuite.kmr":{source:"iana"},"application/vnd.motorola.flexsuite.ttc":{source:"iana"},"application/vnd.motorola.flexsuite.wem":{source:"iana"},"application/vnd.motorola.iprm":{source:"iana"},"application/vnd.mozilla.xul+xml":{source:"iana",compressible:!0,extensions:["xul"]},"application/vnd.ms-3mfdocument":{source:"iana"},"application/vnd.ms-artgalry":{source:"iana",extensions:["cil"]},"application/vnd.ms-asf":{source:"iana"},"application/vnd.ms-cab-compressed":{source:"iana",extensions:["cab"]},"application/vnd.ms-color.iccprofile":{source:"apache"},"application/vnd.ms-excel":{source:"iana",compressible:!1,extensions:["xls","xlm","xla","xlc","xlt","xlw"]},"application/vnd.ms-excel.addin.macroenabled.12":{source:"iana",extensions:["xlam"]},"application/vnd.ms-excel.sheet.binary.macroenabled.12":{source:"iana",extensions:["xlsb"]},"application/vnd.ms-excel.sheet.macroenabled.12":{source:"iana",extensions:["xlsm"]},"application/vnd.ms-excel.template.macroenabled.12":{source:"iana",extensions:["xltm"]},"application/vnd.ms-fontobject":{source:"iana",compressible:!0,extensions:["eot"]},"application/vnd.ms-htmlhelp":{source:"iana",extensions:["chm"]},"application/vnd.ms-ims":{source:"iana",extensions:["ims"]},"application/vnd.ms-lrm":{source:"iana",extensions:["lrm"]},"application/vnd.ms-office.activex+xml":{source:"iana"},"application/vnd.ms-officetheme":{source:"iana",extensions:["thmx"]},"application/vnd.ms-opentype":{source:"apache",compressible:!0},"application/vnd.ms-package.obfuscated-opentype":{source:"apache"},"application/vnd.ms-pki.seccat":{source:"apache",extensions:["cat"]},"application/vnd.ms-pki.stl":{source:"apache",extensions:["stl"]},"application/vnd.ms-playready.initiator+xml":{source:"iana"},"application/vnd.ms-powerpoint":{source:"iana",compressible:!1,extensions:["ppt","pps","pot"]},"application/vnd.ms-powerpoint.addin.macroenabled.12":{source:"iana",extensions:["ppam"]},"application/vnd.ms-powerpoint.presentation.macroenabled.12":{source:"iana",extensions:["pptm"]},"application/vnd.ms-powerpoint.slide.macroenabled.12":{source:"iana",extensions:["sldm"]},"application/vnd.ms-powerpoint.slideshow.macroenabled.12":{source:"iana",extensions:["ppsm"]},"application/vnd.ms-powerpoint.template.macroenabled.12":{source:"iana",extensions:["potm"]},"application/vnd.ms-printdevicecapabilities+xml":{source:"iana"},"application/vnd.ms-printing.printticket+xml":{source:"apache"},"application/vnd.ms-printschematicket+xml":{source:"iana"},"application/vnd.ms-project":{source:"iana",extensions:["mpp","mpt"]},"application/vnd.ms-tnef":{source:"iana"},"application/vnd.ms-windows.devicepairing":{source:"iana"},"application/vnd.ms-windows.nwprinting.oob":{source:"iana"},"application/vnd.ms-windows.printerpairing":{source:"iana"},"application/vnd.ms-windows.wsd.oob":{source:"iana"},"application/vnd.ms-wmdrm.lic-chlg-req":{source:"iana"},"application/vnd.ms-wmdrm.lic-resp":{source:"iana"},"application/vnd.ms-wmdrm.meter-chlg-req":{source:"iana"},"application/vnd.ms-wmdrm.meter-resp":{source:"iana"},"application/vnd.ms-word.document.macroenabled.12":{source:"iana",extensions:["docm"]},"application/vnd.ms-word.template.macroenabled.12":{source:"iana",extensions:["dotm"]},"application/vnd.ms-works":{source:"iana",extensions:["wps","wks","wcm","wdb"]},"application/vnd.ms-wpl":{source:"iana",extensions:["wpl"]},"application/vnd.ms-xpsdocument":{source:"iana",compressible:!1,extensions:["xps"]},"application/vnd.msa-disk-image":{source:"iana"},"application/vnd.mseq":{source:"iana",extensions:["mseq"]},"application/vnd.msign":{source:"iana"},"application/vnd.multiad.creator":{source:"iana"},"application/vnd.multiad.creator.cif":{source:"iana"},"application/vnd.music-niff":{source:"iana"},"application/vnd.musician":{source:"iana",extensions:["mus"]},"application/vnd.muvee.style":{source:"iana",extensions:["msty"]},"application/vnd.mynfc":{source:"iana",extensions:["taglet"]},"application/vnd.ncd.control":{source:"iana"},"application/vnd.ncd.reference":{source:"iana"},"application/vnd.nervana":{source:"iana"},"application/vnd.netfpx":{source:"iana"},"application/vnd.neurolanguage.nlu":{source:"iana",extensions:["nlu"]},"application/vnd.nintendo.nitro.rom":{source:"iana"},"application/vnd.nintendo.snes.rom":{source:"iana"},"application/vnd.nitf":{source:"iana",extensions:["ntf","nitf"]},"application/vnd.noblenet-directory":{source:"iana",extensions:["nnd"]},"application/vnd.noblenet-sealer":{source:"iana",extensions:["nns"]},"application/vnd.noblenet-web":{source:"iana",extensions:["nnw"]},"application/vnd.nokia.catalogs":{source:"iana"},"application/vnd.nokia.conml+wbxml":{source:"iana"},"application/vnd.nokia.conml+xml":{source:"iana"},"application/vnd.nokia.iptv.config+xml":{source:"iana"},"application/vnd.nokia.isds-radio-presets":{source:"iana"},"application/vnd.nokia.landmark+wbxml":{source:"iana"},"application/vnd.nokia.landmark+xml":{source:"iana"},"application/vnd.nokia.landmarkcollection+xml":{source:"iana"},"application/vnd.nokia.n-gage.ac+xml":{source:"iana"},"application/vnd.nokia.n-gage.data":{source:"iana",extensions:["ngdat"]},"application/vnd.nokia.n-gage.symbian.install":{source:"iana",extensions:["n-gage"]},"application/vnd.nokia.ncd":{source:"iana"},"application/vnd.nokia.pcd+wbxml":{source:"iana"},"application/vnd.nokia.pcd+xml":{source:"iana"},"application/vnd.nokia.radio-preset":{source:"iana",extensions:["rpst"]},"application/vnd.nokia.radio-presets":{source:"iana",extensions:["rpss"]},"application/vnd.novadigm.edm":{source:"iana",extensions:["edm"]},"application/vnd.novadigm.edx":{source:"iana",extensions:["edx"]},"application/vnd.novadigm.ext":{source:"iana",extensions:["ext"]},"application/vnd.ntt-local.content-share":{source:"iana"},"application/vnd.ntt-local.file-transfer":{source:"iana"},"application/vnd.ntt-local.ogw_remote-access":{source:"iana"},"application/vnd.ntt-local.sip-ta_remote":{source:"iana"},"application/vnd.ntt-local.sip-ta_tcp_stream":{source:"iana"},"application/vnd.oasis.opendocument.chart":{name:"OpenDocument Chart",source:"iana",extensions:["odc"]},"application/vnd.oasis.opendocument.chart-template":{name:"OpenDocument Chart Template",source:"iana",extensions:["otc"]},"application/vnd.oasis.opendocument.database":{name:"OpenDocument Database",source:"iana",extensions:["odb"]},"application/vnd.oasis.opendocument.formula":{name:"OpenDocument Formula",source:"iana",extensions:["odf"]},"application/vnd.oasis.opendocument.formula-template":{name:"OpenDocument Formula Template",source:"iana",extensions:["odft"]},"application/vnd.oasis.opendocument.graphics":{name:"OpenDocument Graphics",source:"iana",compressible:!1,extensions:["odg"]},"application/vnd.oasis.opendocument.graphics-template":{name:"OpenDocument Graphics Template",source:"iana",extensions:["otg"]},"application/vnd.oasis.opendocument.image":{name:"OpenDocument Image",source:"iana",extensions:["odi"]},"application/vnd.oasis.opendocument.image-template":{name:"OpenDocument Image Template",source:"iana",extensions:["oti"]},"application/vnd.oasis.opendocument.presentation":{name:"OpenDocument Presentation",source:"iana",compressible:!1,extensions:["odp"]},"application/vnd.oasis.opendocument.presentation-template":{name:"OpenDocument Presentation Template",source:"iana",extensions:["otp"]},"application/vnd.oasis.opendocument.spreadsheet":{name:"OpenDocument Spreadsheet",source:"iana",compressible:!1,extensions:["ods"]},"application/vnd.oasis.opendocument.spreadsheet-template":{name:"OpenDocument Spreadsheet Template",source:"iana",extensions:["ots"]},"application/vnd.oasis.opendocument.text":{name:"OpenDocument Text",source:"iana",compressible:!1,extensions:["odt"]},"application/vnd.oasis.opendocument.text-master":{name:"OpenDocument Text Master",source:"iana",extensions:["odm"]},"application/vnd.oasis.opendocument.text-template":{name:"OpenDocument Text Template",source:"iana",extensions:["ott"]},"application/vnd.oasis.opendocument.text-web":{name:"OpenDocument Text Web",source:"iana",extensions:["oth"]},"application/vnd.obn":{source:"iana"},"application/vnd.oftn.l10n+json":{source:"iana",compressible:!0},"application/vnd.oipf.contentaccessdownload+xml":{source:"iana"},"application/vnd.oipf.contentaccessstreaming+xml":{source:"iana"},"application/vnd.oipf.cspg-hexbinary":{source:"iana"},"application/vnd.oipf.dae.svg+xml":{source:"iana"},"application/vnd.oipf.dae.xhtml+xml":{source:"iana"},"application/vnd.oipf.mippvcontrolmessage+xml":{source:"iana"},"application/vnd.oipf.pae.gem":{source:"iana"},"application/vnd.oipf.spdiscovery+xml":{source:"iana"},"application/vnd.oipf.spdlist+xml":{source:"iana"},"application/vnd.oipf.ueprofile+xml":{source:"iana"},"application/vnd.oipf.userprofile+xml":{source:"iana"},"application/vnd.olpc-sugar":{source:"iana",extensions:["xo"]},"application/vnd.oma-scws-config":{source:"iana"},"application/vnd.oma-scws-http-request":{source:"iana"},"application/vnd.oma-scws-http-response":{source:"iana"},"application/vnd.oma.bcast.associated-procedure-parameter+xml":{source:"iana"},"application/vnd.oma.bcast.drm-trigger+xml":{source:"iana"},"application/vnd.oma.bcast.imd+xml":{source:"iana"},"application/vnd.oma.bcast.ltkm":{source:"iana"},"application/vnd.oma.bcast.notification+xml":{source:"iana"},"application/vnd.oma.bcast.provisioningtrigger":{source:"iana"},"application/vnd.oma.bcast.sgboot":{source:"iana"},"application/vnd.oma.bcast.sgdd+xml":{source:"iana"},"application/vnd.oma.bcast.sgdu":{source:"iana"},"application/vnd.oma.bcast.simple-symbol-container":{source:"iana"},"application/vnd.oma.bcast.smartcard-trigger+xml":{source:"iana"},"application/vnd.oma.bcast.sprov+xml":{source:"iana"},"application/vnd.oma.bcast.stkm":{source:"iana"},"application/vnd.oma.cab-address-book+xml":{source:"iana"},"application/vnd.oma.cab-feature-handler+xml":{source:"iana"},"application/vnd.oma.cab-pcc+xml":{source:"iana"},"application/vnd.oma.cab-subs-invite+xml":{source:"iana"},"application/vnd.oma.cab-user-prefs+xml":{source:"iana"},"application/vnd.oma.dcd":{source:"iana"},"application/vnd.oma.dcdc":{source:"iana"},"application/vnd.oma.dd2+xml":{source:"iana",extensions:["dd2"]},"application/vnd.oma.drm.risd+xml":{source:"iana"},"application/vnd.oma.group-usage-list+xml":{source:"iana"},"application/vnd.oma.pal+xml":{source:"iana"},"application/vnd.oma.poc.detailed-progress-report+xml":{source:"iana"},"application/vnd.oma.poc.final-report+xml":{source:"iana"},"application/vnd.oma.poc.groups+xml":{source:"iana"},"application/vnd.oma.poc.invocation-descriptor+xml":{source:"iana"},"application/vnd.oma.poc.optimized-progress-report+xml":{source:"iana"},"application/vnd.oma.push":{source:"iana"},"application/vnd.oma.scidm.messages+xml":{source:"iana"},"application/vnd.oma.xcap-directory+xml":{source:"iana"},"application/vnd.omads-email+xml":{source:"iana"},"application/vnd.omads-file+xml":{source:"iana"},"application/vnd.omads-folder+xml":{source:"iana"},"application/vnd.omaloc-supl-init":{source:"iana"},"application/vnd.onepager":{source:"iana"},"application/vnd.openblox.game+xml":{source:"iana"},"application/vnd.openblox.game-binary":{source:"iana"},"application/vnd.openeye.oeb":{source:"iana"},"application/vnd.openofficeorg.extension":{source:"apache",extensions:["oxt"]},"application/vnd.openxmlformats-officedocument.custom-properties+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.customxmlproperties+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.drawing+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.drawingml.chart+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.extended-properties+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.presentationml-template":{source:"iana"},"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.presentationml.comments+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.presentationml.presentation":{name:"PowerPoint",source:"iana",compressible:!1,extensions:["pptx"]},"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.presentationml.slide":{source:"iana",extensions:["sldx"]},"application/vnd.openxmlformats-officedocument.presentationml.slide+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.presentationml.slideshow":{source:"iana",extensions:["ppsx"]},"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.presentationml.tags+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.presentationml.template":{source:"apache",extensions:["potx"]},"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml-template":{source:"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":{name:"Excel (xlsx)",source:"iana",compressible:!1,extensions:["xlsx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.template":{source:"apache",extensions:["xltx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.theme+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.themeoverride+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.vmldrawing":{source:"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml-template":{source:"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.document":{name:"Word",source:"iana",compressible:!1,extensions:["docx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.template":{name:"Word Template",source:"apache",extensions:["dotx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml":{source:"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml":{source:"iana"},"application/vnd.openxmlformats-package.core-properties+xml":{source:"iana"},"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml":{source:"iana"},"application/vnd.openxmlformats-package.relationships+xml":{source:"iana"},"application/vnd.oracle.resource+json":{source:"iana",compressible:!0},"application/vnd.orange.indata":{source:"iana"},"application/vnd.osa.netdeploy":{source:"iana"},"application/vnd.osgeo.mapguide.package":{source:"iana",extensions:["mgp"]},"application/vnd.osgi.bundle":{source:"iana"},"application/vnd.osgi.dp":{source:"iana",extensions:["dp"]},"application/vnd.osgi.subsystem":{source:"iana",extensions:["esa"]},"application/vnd.otps.ct-kip+xml":{source:"iana"},"application/vnd.oxli.countgraph":{source:"iana"},"application/vnd.pagerduty+json":{source:"iana",compressible:!0},"application/vnd.palm":{source:"iana",extensions:["pdb","pqa","oprc"]},"application/vnd.panoply":{source:"iana"},"application/vnd.paos+xml":{source:"iana"},"application/vnd.paos.xml":{source:"apache"},"application/vnd.pawaafile":{source:"iana",extensions:["paw"]},"application/vnd.pcos":{source:"iana"},"application/vnd.pg.format":{source:"iana",extensions:["str"]},"application/vnd.pg.osasli":{source:"iana",extensions:["ei6"]},"application/vnd.piaccess.application-licence":{source:"iana"},"application/vnd.picsel":{source:"iana",extensions:["efif"]},"application/vnd.pmi.widget":{source:"iana",extensions:["wg"]},"application/vnd.poc.group-advertisement+xml":{source:"iana"},"application/vnd.pocketlearn":{source:"iana",extensions:["plf"]},"application/vnd.powerbuilder6":{source:"iana",extensions:["pbd"]},"application/vnd.powerbuilder6-s":{source:"iana"},"application/vnd.powerbuilder7":{source:"iana"},"application/vnd.powerbuilder7-s":{source:"iana"},"application/vnd.powerbuilder75":{source:"iana"},"application/vnd.powerbuilder75-s":{source:"iana"},"application/vnd.preminet":{source:"iana"},"application/vnd.previewsystems.box":{source:"iana",extensions:["box"]},"application/vnd.proteus.magazine":{source:"iana",extensions:["mgz"]},"application/vnd.publishare-delta-tree":{source:"iana",extensions:["qps"]},"application/vnd.pvi.ptid1":{source:"iana",extensions:["ptid"]},"application/vnd.pwg-multiplexed":{source:"iana"},"application/vnd.pwg-xhtml-print+xml":{source:"iana"},"application/vnd.qualcomm.brew-app-res":{source:"iana"},"application/vnd.quark.quarkxpress":{source:"iana",extensions:["qxd","qxt","qwd","qwt","qxl","qxb"]},"application/vnd.quobject-quoxdocument":{source:"iana"},"application/vnd.radisys.moml+xml":{source:"iana"},"application/vnd.radisys.msml+xml":{source:"iana"},"application/vnd.radisys.msml-audit+xml":{source:"iana"},"application/vnd.radisys.msml-audit-conf+xml":{source:"iana"},"application/vnd.radisys.msml-audit-conn+xml":{source:"iana"},"application/vnd.radisys.msml-audit-dialog+xml":{source:"iana"},"application/vnd.radisys.msml-audit-stream+xml":{source:"iana"},"application/vnd.radisys.msml-conf+xml":{source:"iana"},"application/vnd.radisys.msml-dialog+xml":{source:"iana"},"application/vnd.radisys.msml-dialog-base+xml":{source:"iana"},"application/vnd.radisys.msml-dialog-fax-detect+xml":{source:"iana"},"application/vnd.radisys.msml-dialog-fax-sendrecv+xml":{source:"iana"},"application/vnd.radisys.msml-dialog-group+xml":{source:"iana"},"application/vnd.radisys.msml-dialog-speech+xml":{source:"iana"},"application/vnd.radisys.msml-dialog-transform+xml":{source:"iana"},"application/vnd.rainstor.data":{source:"iana"},"application/vnd.rapid":{source:"iana"},"application/vnd.realvnc.bed":{source:"iana",extensions:["bed"]},"application/vnd.recordare.musicxml":{source:"iana",extensions:["mxl"]},"application/vnd.recordare.musicxml+xml":{source:"iana",extensions:["musicxml"]},"application/vnd.renlearn.rlprint":{source:"iana"},"application/vnd.rig.cryptonote":{source:"iana",extensions:["cryptonote"]},"application/vnd.rim.cod":{source:"apache",extensions:["cod"]},"application/vnd.rn-realmedia":{source:"apache",extensions:["rm"]},"application/vnd.rn-realmedia-vbr":{source:"apache",extensions:["rmvb"]},"application/vnd.route66.link66+xml":{source:"iana",extensions:["link66"]},"application/vnd.rs-274x":{source:"iana"},"application/vnd.ruckus.download":{source:"iana"},"application/vnd.s3sms":{source:"iana"},"application/vnd.sailingtracker.track":{source:"iana",extensions:["st"]},"application/vnd.sbm.cid":{source:"iana"},"application/vnd.sbm.mid2":{source:"iana"},"application/vnd.scribus":{source:"iana"},"application/vnd.sealed.3df":{source:"iana"},"application/vnd.sealed.csf":{source:"iana"},"application/vnd.sealed.doc":{source:"iana"},"application/vnd.sealed.eml":{source:"iana"},"application/vnd.sealed.mht":{source:"iana"},"application/vnd.sealed.net":{source:"iana"},"application/vnd.sealed.ppt":{source:"iana"},"application/vnd.sealed.tiff":{source:"iana"},"application/vnd.sealed.xls":{source:"iana"},"application/vnd.sealedmedia.softseal.html":{source:"iana"},"application/vnd.sealedmedia.softseal.pdf":{source:"iana"},"application/vnd.seemail":{source:"iana",extensions:["see"]},"application/vnd.sema":{source:"iana",extensions:["sema"]},"application/vnd.semd":{source:"iana",extensions:["semd"]},"application/vnd.semf":{source:"iana",extensions:["semf"]},"application/vnd.shana.informed.formdata":{source:"iana",extensions:["ifm"]},"application/vnd.shana.informed.formtemplate":{source:"iana",extensions:["itp"]},"application/vnd.shana.informed.interchange":{source:"iana",extensions:["iif"]},"application/vnd.shana.informed.package":{source:"iana",extensions:["ipk"]},"application/vnd.simtech-mindmapper":{source:"iana",extensions:["twd","twds"]},"application/vnd.siren+json":{source:"iana",compressible:!0},"application/vnd.smaf":{source:"iana",extensions:["mmf"]},"application/vnd.smart.notebook":{source:"iana"},"application/vnd.smart.teacher":{source:"iana",extensions:["teacher"]},"application/vnd.software602.filler.form+xml":{source:"iana"},"application/vnd.software602.filler.form-xml-zip":{source:"iana"},"application/vnd.solent.sdkm+xml":{source:"iana",extensions:["sdkm","sdkd"]},"application/vnd.spotfire.dxp":{source:"iana",extensions:["dxp"]},"application/vnd.spotfire.sfs":{source:"iana",extensions:["sfs"]},"application/vnd.sss-cod":{source:"iana"},"application/vnd.sss-dtf":{source:"iana"},"application/vnd.sss-ntf":{source:"iana"},"application/vnd.stardivision.calc":{source:"apache",extensions:["sdc"]},"application/vnd.stardivision.draw":{source:"apache",extensions:["sda"]},"application/vnd.stardivision.impress":{source:"apache",extensions:["sdd"]},"application/vnd.stardivision.math":{source:"apache",extensions:["smf"]},"application/vnd.stardivision.writer":{source:"apache",extensions:["sdw","vor"]},"application/vnd.stardivision.writer-global":{source:"apache",extensions:["sgl"]},"application/vnd.stepmania.package":{source:"iana",extensions:["smzip"]},"application/vnd.stepmania.stepchart":{source:"iana",extensions:["sm"]},"application/vnd.street-stream":{source:"iana"},"application/vnd.sun.wadl+xml":{source:"iana"},"application/vnd.sun.xml.calc":{source:"apache",extensions:["sxc"]},"application/vnd.sun.xml.calc.template":{source:"apache",extensions:["stc"]},"application/vnd.sun.xml.draw":{source:"apache",extensions:["sxd"]},"application/vnd.sun.xml.draw.template":{source:"apache",extensions:["std"]},"application/vnd.sun.xml.impress":{source:"apache",extensions:["sxi"]},"application/vnd.sun.xml.impress.template":{source:"apache",extensions:["sti"]},"application/vnd.sun.xml.math":{source:"apache",extensions:["sxm"]},"application/vnd.sun.xml.writer":{source:"apache",extensions:["sxw"]},"application/vnd.sun.xml.writer.global":{source:"apache",extensions:["sxg"]},"application/vnd.sun.xml.writer.template":{source:"apache",extensions:["stw"]},"application/vnd.sus-calendar":{source:"iana",extensions:["sus","susp"]},"application/vnd.svd":{source:"iana",extensions:["svd"]},"application/vnd.swiftview-ics":{source:"iana"},"application/vnd.symbian.install":{source:"apache",extensions:["sis","sisx"]},"application/vnd.syncml+xml":{source:"iana",extensions:["xsm"]},"application/vnd.syncml.dm+wbxml":{source:"iana",extensions:["bdm"]},"application/vnd.syncml.dm+xml":{source:"iana",extensions:["xdm"]},"application/vnd.syncml.dm.notification":{source:"iana"},"application/vnd.syncml.dmddf+wbxml":{source:"iana"},"application/vnd.syncml.dmddf+xml":{source:"iana"},"application/vnd.syncml.dmtnds+wbxml":{source:"iana"},"application/vnd.syncml.dmtnds+xml":{source:"iana"},"application/vnd.syncml.ds.notification":{source:"iana"},"application/vnd.tao.intent-module-archive":{source:"iana",extensions:["tao"]},"application/vnd.tcpdump.pcap":{source:"iana",extensions:["pcap","cap","dmp"]},"application/vnd.tmd.mediaflex.api+xml":{source:"iana"},"application/vnd.tml":{source:"iana"},"application/vnd.tmobile-livetv":{source:"iana",extensions:["tmo"]},"application/vnd.trid.tpt":{source:"iana",extensions:["tpt"]},"application/vnd.triscape.mxs":{source:"iana",extensions:["mxs"]},"application/vnd.trueapp":{source:"iana",extensions:["tra"]},"application/vnd.truedoc":{source:"iana"},"application/vnd.ubisoft.webplayer":{source:"iana"},"application/vnd.ufdl":{source:"iana",extensions:["ufd","ufdl"]},"application/vnd.uiq.theme":{source:"iana",extensions:["utz"]},"application/vnd.umajin":{source:"iana",extensions:["umj"]},"application/vnd.unity":{source:"iana",extensions:["unityweb"]},"application/vnd.uoml+xml":{source:"iana",extensions:["uoml"]},"application/vnd.uplanet.alert":{source:"iana"},"application/vnd.uplanet.alert-wbxml":{source:"iana"},"application/vnd.uplanet.bearer-choice":{source:"iana"},"application/vnd.uplanet.bearer-choice-wbxml":{source:"iana"},"application/vnd.uplanet.cacheop":{source:"iana"},"application/vnd.uplanet.cacheop-wbxml":{source:"iana"},"application/vnd.uplanet.channel":{source:"iana"},"application/vnd.uplanet.channel-wbxml":{source:"iana"},"application/vnd.uplanet.list":{source:"iana"},"application/vnd.uplanet.list-wbxml":{source:"iana"},"application/vnd.uplanet.listcmd":{source:"iana"},"application/vnd.uplanet.listcmd-wbxml":{source:"iana"},"application/vnd.uplanet.signal":{source:"iana"},"application/vnd.uri-map":{source:"iana"},"application/vnd.valve.source.material":{source:"iana"},"application/vnd.vcx":{source:"iana",extensions:["vcx"]},"application/vnd.vd-study":{source:"iana"},"application/vnd.vectorworks":{source:"iana"},"application/vnd.vel+json":{source:"iana",compressible:!0},"application/vnd.verimatrix.vcas":{source:"iana"},"application/vnd.vidsoft.vidconference":{source:"iana"},"application/vnd.visio":{source:"iana",extensions:["vsd","vst","vss","vsw"]},"application/vnd.visionary":{source:"iana",extensions:["vis"]},"application/vnd.vividence.scriptfile":{source:"iana"},"application/vnd.vsf":{source:"iana",extensions:["vsf"]},"application/vnd.wap.sic":{source:"iana"},"application/vnd.wap.slc":{source:"iana"},"application/vnd.wap.wbxml":{source:"iana",extensions:["wbxml"]},"application/vnd.wap.wmlc":{source:"iana",extensions:["wmlc"]},"application/vnd.wap.wmlscriptc":{source:"iana",extensions:["wmlsc"]},"application/vnd.webturbo":{source:"iana",extensions:["wtb"]},"application/vnd.wfa.p2p":{source:"iana"},"application/vnd.wfa.wsc":{source:"iana"},"application/vnd.windows.devicepairing":{source:"iana"},"application/vnd.wmc":{source:"iana"},"application/vnd.wmf.bootstrap":{source:"iana"},"application/vnd.wolfram.mathematica":{source:"iana"},"application/vnd.wolfram.mathematica.package":{source:"iana"},"application/vnd.wolfram.player":{source:"iana",extensions:["nbp"]},"application/vnd.wordperfect":{source:"iana",extensions:["wpd"]},"application/vnd.wqd":{source:"iana",extensions:["wqd"]},"application/vnd.wrq-hp3000-labelled":{source:"iana"},"application/vnd.wt.stf":{source:"iana",extensions:["stf"]},"application/vnd.wv.csp+wbxml":{source:"iana"},"application/vnd.wv.csp+xml":{source:"iana"},"application/vnd.wv.ssp+xml":{source:"iana"},"application/vnd.xacml+json":{source:"iana",compressible:!0},"application/vnd.xara":{source:"iana",extensions:["xar"]},"application/vnd.xfdl":{source:"iana",extensions:["xfdl"]},"application/vnd.xfdl.webform":{source:"iana"},"application/vnd.xmi+xml":{source:"iana"},"application/vnd.xmpie.cpkg":{source:"iana"},"application/vnd.xmpie.dpkg":{source:"iana"},"application/vnd.xmpie.plan":{source:"iana"},"application/vnd.xmpie.ppkg":{source:"iana"},"application/vnd.xmpie.xlim":{source:"iana"},"application/vnd.yamaha.hv-dic":{source:"iana",extensions:["hvd"]},"application/vnd.yamaha.hv-script":{source:"iana",extensions:["hvs"]},"application/vnd.yamaha.hv-voice":{source:"iana",extensions:["hvp"]},"application/vnd.yamaha.openscoreformat":{source:"iana",extensions:["osf"]},"application/vnd.yamaha.openscoreformat.osfpvg+xml":{source:"iana",extensions:["osfpvg"]},"application/vnd.yamaha.remote-setup":{source:"iana"},"application/vnd.yamaha.smaf-audio":{source:"iana",extensions:["saf"]},"application/vnd.yamaha.smaf-phrase":{source:"iana",extensions:["spf"]},"application/vnd.yamaha.through-ngn":{source:"iana"},"application/vnd.yamaha.tunnel-udpencap":{source:"iana"},"application/vnd.yaoweme":{source:"iana"},"application/vnd.yellowriver-custom-menu":{source:"iana",extensions:["cmp"]},"application/vnd.zul":{source:"iana",extensions:["zir","zirz"]},"application/vnd.zzazz.deck+xml":{source:"iana",extensions:["zaz"]},"application/voicexml+xml":{source:"iana",extensions:["vxml"]},"application/vq-rtcpxr":{source:"iana"},"application/watcherinfo+xml":{source:"iana"},"application/whoispp-query":{source:"iana"},"application/whoispp-response":{source:"iana"},"application/widget":{source:"iana",extensions:["wgt"]},"application/winhlp":{source:"apache",extensions:["hlp"]},"application/wita":{source:"iana"},"application/wordperfect5.1":{source:"iana"},"application/wsdl+xml":{source:"iana",extensions:["wsdl"]},"application/wspolicy+xml":{source:"iana",extensions:["wspolicy"]},"application/x-7z-compressed":{source:"apache",compressible:!1,extensions:["7z"]},"application/x-abiword":{source:"apache",extensions:["abw"]},"application/x-ace-compressed":{source:"apache",extensions:["ace"]},"application/x-amf":{source:"apache"},"application/x-apple-diskimage":{source:"apache",extensions:["dmg"]},"application/x-authorware-bin":{source:"apache",extensions:["aab","x32","u32","vox"]},"application/x-authorware-map":{source:"apache",extensions:["aam"]},"application/x-authorware-seg":{source:"apache",extensions:["aas"]},"application/x-bcpio":{source:"apache",extensions:["bcpio"]},"application/x-bdoc":{compressible:!1,extensions:["bdoc"]},"application/x-bittorrent":{source:"apache",extensions:["torrent"]},"application/x-blorb":{source:"apache",extensions:["blb","blorb"]},"application/x-bzip":{source:"apache",compressible:!1,extensions:["bz"]},"application/x-bzip2":{source:"apache",compressible:!1,extensions:["bz2","boz"]},"application/x-cbr":{source:"apache",extensions:["cbr","cba","cbt","cbz","cb7"]},"application/x-cdlink":{source:"apache",extensions:["vcd"]},"application/x-cfs-compressed":{source:"apache",extensions:["cfs"]},"application/x-chat":{source:"apache",extensions:["chat"]},"application/x-chess-pgn":{source:"apache",extensions:["pgn"]},"application/x-chrome-extension":{extensions:["crx"]},"application/x-cocoa":{source:"nginx",extensions:["cco"]},"application/x-compress":{source:"apache"},"application/x-conference":{source:"apache",extensions:["nsc"]},"application/x-cpio":{source:"apache",extensions:["cpio"]},"application/x-csh":{source:"apache",extensions:["csh"]},"application/x-deb":{compressible:!1},"application/x-debian-package":{source:"apache",extensions:["deb","udeb"]},"application/x-dgc-compressed":{source:"apache",extensions:["dgc"]},"application/x-director":{source:"apache",extensions:["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"]},"application/x-doom":{source:"apache",extensions:["wad"]},"application/x-dtbncx+xml":{source:"apache",extensions:["ncx"]},"application/x-dtbook+xml":{source:"apache",extensions:["dtb"]},"application/x-dtbresource+xml":{source:"apache",extensions:["res"]},"application/x-dvi":{source:"apache",compressible:!1,extensions:["dvi"]},"application/x-envoy":{source:"apache",extensions:["evy"]},"application/x-eva":{source:"apache",extensions:["eva"]},"application/x-font-bdf":{source:"apache",extensions:["bdf"]},"application/x-font-dos":{source:"apache"},"application/x-font-framemaker":{source:"apache"},"application/x-font-ghostscript":{source:"apache",extensions:["gsf"]},"application/x-font-libgrx":{source:"apache"},"application/x-font-linux-psf":{source:"apache",extensions:["psf"]},"application/x-font-otf":{source:"apache",compressible:!0,extensions:["otf"]},"application/x-font-pcf":{source:"apache",extensions:["pcf"]},"application/x-font-snf":{source:"apache",extensions:["snf"]},"application/x-font-speedo":{source:"apache"},"application/x-font-sunos-news":{source:"apache"},"application/x-font-ttf":{source:"apache",compressible:!0,extensions:["ttf","ttc"]},"application/x-font-type1":{source:"apache",extensions:["pfa","pfb","pfm","afm"]},"application/x-font-vfont":{source:"apache"},"application/x-freearc":{source:"apache",extensions:["arc"]},"application/x-futuresplash":{source:"apache",extensions:["spl"]},"application/x-gca-compressed":{source:"apache",extensions:["gca"]},"application/x-glulx":{source:"apache",extensions:["ulx"]},"application/x-gnumeric":{source:"apache",extensions:["gnumeric"]},"application/x-gramps-xml":{source:"apache",extensions:["gramps"]},"application/x-gtar":{source:"apache",extensions:["gtar"]},"application/x-gzip":{source:"apache"},"application/x-hdf":{source:"apache",extensions:["hdf"]},"application/x-httpd-php":{compressible:!0,extensions:["php"]},"application/x-install-instructions":{source:"apache",extensions:["install"]},"application/x-iso9660-image":{source:"apache",extensions:["iso"]},"application/x-java-archive-diff":{source:"nginx",extensions:["jardiff"]},"application/x-java-jnlp-file":{source:"apache",compressible:!1,extensions:["jnlp"]},"application/x-javascript":{compressible:!0},"application/x-latex":{source:"apache",compressible:!1,extensions:["latex"]},"application/x-lua-bytecode":{extensions:["luac"]},"application/x-lzh-compressed":{source:"apache",extensions:["lzh","lha"]},"application/x-makeself":{source:"nginx",extensions:["run"]},"application/x-mie":{source:"apache",extensions:["mie"]},"application/x-mobipocket-ebook":{source:"apache",extensions:["prc","mobi"]},"application/x-mpegurl":{compressible:!1},"application/x-ms-application":{source:"apache",extensions:["application"]},"application/x-ms-shortcut":{source:"apache",extensions:["lnk"]},"application/x-ms-wmd":{source:"apache",extensions:["wmd"]},"application/x-ms-wmz":{source:"apache",extensions:["wmz"]},"application/x-ms-xbap":{source:"apache",extensions:["xbap"]},"application/x-msaccess":{source:"apache",extensions:["mdb"]},"application/x-msbinder":{source:"apache",extensions:["obd"]},"application/x-mscardfile":{source:"apache",extensions:["crd"]},"application/x-msclip":{source:"apache",extensions:["clp"]},"application/x-msdos-program":{extensions:["exe"]},"application/x-msdownload":{source:"apache",extensions:["exe","dll","com","bat","msi"]},"application/x-msmediaview":{source:"apache",extensions:["mvb","m13","m14"]},"application/x-msmetafile":{source:"apache",extensions:["wmf","wmz","emf","emz"]},"application/x-msmoney":{source:"apache",extensions:["mny"]},"application/x-mspublisher":{source:"apache",extensions:["pub"]},"application/x-msschedule":{source:"apache",extensions:["scd"]},"application/x-msterminal":{source:"apache",extensions:["trm"]},"application/x-mswrite":{source:"apache",extensions:["wri"]},"application/x-netcdf":{source:"apache",extensions:["nc","cdf"]},"application/x-ns-proxy-autoconfig":{compressible:!0,extensions:["pac"]},"application/x-nzb":{source:"apache",extensions:["nzb"]},"application/x-perl":{source:"nginx",extensions:["pl","pm"]},"application/x-pilot":{source:"nginx",extensions:["prc","pdb"]},"application/x-pkcs12":{source:"apache",compressible:!1,extensions:["p12","pfx"]},"application/x-pkcs7-certificates":{source:"apache",extensions:["p7b","spc"]},"application/x-pkcs7-certreqresp":{source:"apache",extensions:["p7r"]},"application/x-rar-compressed":{source:"apache",compressible:!1,extensions:["rar"]},"application/x-redhat-package-manager":{source:"nginx",extensions:["rpm"]},"application/x-research-info-systems":{source:"apache",extensions:["ris"]},"application/x-sea":{source:"nginx",extensions:["sea"]},"application/x-sh":{source:"apache",compressible:!0,extensions:["sh"]},"application/x-shar":{source:"apache",extensions:["shar"]},"application/x-shockwave-flash":{source:"apache",compressible:!1,extensions:["swf"]},"application/x-silverlight-app":{source:"apache",extensions:["xap"]},"application/x-sql":{source:"apache",extensions:["sql"]},"application/x-stuffit":{source:"apache",compressible:!1,extensions:["sit"]},"application/x-stuffitx":{source:"apache",extensions:["sitx"]},"application/x-subrip":{source:"apache",extensions:["srt"]},"application/x-sv4cpio":{source:"apache",extensions:["sv4cpio"]},"application/x-sv4crc":{source:"apache",extensions:["sv4crc"]},"application/x-t3vm-image":{source:"apache",extensions:["t3"]},"application/x-tads":{source:"apache",extensions:["gam"]},"application/x-tar":{source:"apache",compressible:!0,extensions:["tar"]},"application/x-tcl":{source:"apache",extensions:["tcl","tk"]},"application/x-tex":{source:"apache",extensions:["tex"]},"application/x-tex-tfm":{source:"apache",extensions:["tfm"]},"application/x-texinfo":{source:"apache",extensions:["texinfo","texi"]},"application/x-tgif":{source:"apache",extensions:["obj"]},"application/x-ustar":{source:"apache",extensions:["ustar"]},"application/x-wais-source":{source:"apache",extensions:["src"]},"application/x-web-app-manifest+json":{compressible:!0,extensions:["webapp"]},"application/x-www-form-urlencoded":{source:"iana",compressible:!0},"application/x-x509-ca-cert":{source:"apache",extensions:["der","crt","pem"]},"application/x-xfig":{source:"apache",extensions:["fig"]},"application/x-xliff+xml":{source:"apache",extensions:["xlf"]},"application/x-xpinstall":{source:"apache",compressible:!1,extensions:["xpi"]},"application/x-xz":{source:"apache",extensions:["xz"]},"application/x-zmachine":{source:"apache",extensions:["z1","z2","z3","z4","z5","z6","z7","z8"]},"application/x400-bp":{source:"iana"},"application/xacml+xml":{source:"iana"},"application/xaml+xml":{source:"apache",extensions:["xaml"]},"application/xcap-att+xml":{source:"iana"},"application/xcap-caps+xml":{source:"iana"},"application/xcap-diff+xml":{source:"iana",extensions:["xdf"]},"application/xcap-el+xml":{source:"iana"},"application/xcap-error+xml":{source:"iana"},"application/xcap-ns+xml":{source:"iana"},"application/xcon-conference-info+xml":{source:"iana"},"application/xcon-conference-info-diff+xml":{source:"iana"},"application/xenc+xml":{source:"iana",extensions:["xenc"]},"application/xhtml+xml":{source:"iana",compressible:!0,extensions:["xhtml","xht"]},"application/xhtml-voice+xml":{source:"apache"},"application/xml":{name:"XML",source:"iana",compressible:!0,extensions:["xml","xsl","xsd","rng"]},"application/xml-dtd":{source:"iana",compressible:!0,extensions:["dtd"]},"application/xml-external-parsed-entity":{source:"iana"},"application/xml-patch+xml":{source:"iana"},"application/xmpp+xml":{source:"iana"},"application/xop+xml":{source:"iana",compressible:!0,extensions:["xop"]},"application/xproc+xml":{source:"apache",extensions:["xpl"]},"application/xslt+xml":{source:"iana",extensions:["xslt"]},"application/xspf+xml":{source:"apache",extensions:["xspf"]},"application/xv+xml":{source:"iana",extensions:["mxml","xhvml","xvml","xvm"]},"application/yang":{source:"iana",extensions:["yang"]},"application/yin+xml":{source:"iana",extensions:["yin"]},"application/zip":{source:"iana",compressible:!1,extensions:["zip"]},"application/zlib":{source:"iana"},"audio/1d-interleaved-parityfec":{source:"iana"},"audio/32kadpcm":{source:"iana"},"audio/3gpp":{source:"iana",compressible:!1,extensions:["3gpp"]},"audio/3gpp2":{source:"iana"},"audio/ac3":{source:"iana"},"audio/adpcm":{source:"apache",extensions:["adp"]},"audio/amr":{source:"iana"},"audio/amr-wb":{source:"iana"},"audio/amr-wb+":{source:"iana"},"audio/aptx":{source:"iana"},"audio/asc":{source:"iana"},"audio/atrac-advanced-lossless":{source:"iana"},"audio/atrac-x":{source:"iana"},"audio/atrac3":{source:"iana"},"audio/basic":{source:"iana",compressible:!1,extensions:["au","snd"]},"audio/bv16":{source:"iana"},"audio/bv32":{source:"iana"},"audio/clearmode":{source:"iana"},"audio/cn":{source:"iana"},"audio/dat12":{source:"iana"},"audio/dls":{source:"iana"},"audio/dsr-es201108":{source:"iana"},"audio/dsr-es202050":{source:"iana"},"audio/dsr-es202211":{source:"iana"},"audio/dsr-es202212":{source:"iana"},"audio/dv":{source:"iana"},"audio/dvi4":{source:"iana"},"audio/eac3":{source:"iana"},"audio/encaprtp":{source:"iana"},"audio/evrc":{source:"iana"},"audio/evrc-qcp":{source:"iana"},"audio/evrc0":{source:"iana"},"audio/evrc1":{source:"iana"},"audio/evrcb":{source:"iana"},"audio/evrcb0":{source:"iana"},"audio/evrcb1":{source:"iana"},"audio/evrcnw":{source:"iana"},"audio/evrcnw0":{source:"iana"},"audio/evrcnw1":{source:"iana"},"audio/evrcwb":{source:"iana"},"audio/evrcwb0":{source:"iana"},"audio/evrcwb1":{source:"iana"},"audio/evs":{source:"iana"},"audio/fwdred":{source:"iana"},"audio/g711-0":{source:"iana"},"audio/g719":{source:"iana"},"audio/g722":{source:"iana"},"audio/g7221":{source:"iana"},"audio/g723":{source:"iana"},"audio/g726-16":{source:"iana"},"audio/g726-24":{source:"iana"},"audio/g726-32":{source:"iana"},"audio/g726-40":{source:"iana"},"audio/g728":{source:"iana"},"audio/g729":{source:"iana"},"audio/g7291":{source:"iana"},"audio/g729d":{source:"iana"},"audio/g729e":{source:"iana"},"audio/gsm":{source:"iana"},"audio/gsm-efr":{source:"iana"},"audio/gsm-hr-08":{source:"iana"},"audio/ilbc":{source:"iana"},"audio/ip-mr_v2.5":{source:"iana"},"audio/isac":{source:"apache"},"audio/l16":{source:"iana"},"audio/l20":{source:"iana"},"audio/l24":{source:"iana",compressible:!1},"audio/l8":{source:"iana"},"audio/lpc":{source:"iana"},"audio/midi":{source:"apache",extensions:["mid","midi","kar","rmi"]},"audio/mobile-xmf":{source:"iana"},"audio/mp4":{source:"iana",compressible:!1,extensions:["m4a","mp4a"]},"audio/mp4a-latm":{source:"iana"},"audio/mpa":{source:"iana"},"audio/mpa-robust":{source:"iana"},"audio/mpeg":{source:"iana",compressible:!1,extensions:["mpga","mp2","mp2a","mp3","m2a","m3a"]},"audio/mpeg4-generic":{source:"iana"},"audio/musepack":{source:"apache"},"audio/ogg":{source:"iana",compressible:!1,extensions:["oga","ogg","spx"]},"audio/opus":{source:"iana"},"audio/parityfec":{source:"iana"},"audio/pcma":{source:"iana"},"audio/pcma-wb":{source:"iana"},"audio/pcmu":{source:"iana"},"audio/pcmu-wb":{source:"iana"},"audio/prs.sid":{source:"iana"},"audio/qcelp":{source:"iana"},"audio/raptorfec":{source:"iana"},"audio/red":{source:"iana"},"audio/rtp-enc-aescm128":{source:"iana"},"audio/rtp-midi":{source:"iana"},"audio/rtploopback":{source:"iana"},"audio/rtx":{source:"iana"},"audio/s3m":{source:"apache",extensions:["s3m"]},"audio/silk":{source:"apache",extensions:["sil"]},"audio/smv":{source:"iana"},"audio/smv-qcp":{source:"iana"},"audio/smv0":{source:"iana"},"audio/sp-midi":{source:"iana"},"audio/speex":{source:"iana"},"audio/t140c":{source:"iana"},"audio/t38":{source:"iana"},"audio/telephone-event":{source:"iana"},"audio/tone":{source:"iana"},"audio/uemclip":{source:"iana"},"audio/ulpfec":{source:"iana"},"audio/vdvi":{source:"iana"},"audio/vmr-wb":{source:"iana"},"audio/vnd.3gpp.iufp":{source:"iana"},"audio/vnd.4sb":{source:"iana"},"audio/vnd.audiokoz":{source:"iana"},"audio/vnd.celp":{source:"iana"},"audio/vnd.cisco.nse":{source:"iana"},"audio/vnd.cmles.radio-events":{source:"iana"},"audio/vnd.cns.anp1":{source:"iana"},"audio/vnd.cns.inf1":{source:"iana"},"audio/vnd.dece.audio":{source:"iana",extensions:["uva","uvva"]},"audio/vnd.digital-winds":{source:"iana",extensions:["eol"]},"audio/vnd.dlna.adts":{source:"iana"},"audio/vnd.dolby.heaac.1":{source:"iana"},"audio/vnd.dolby.heaac.2":{source:"iana"},"audio/vnd.dolby.mlp":{source:"iana"},"audio/vnd.dolby.mps":{source:"iana"},"audio/vnd.dolby.pl2":{source:"iana"},"audio/vnd.dolby.pl2x":{source:"iana"},"audio/vnd.dolby.pl2z":{source:"iana"},"audio/vnd.dolby.pulse.1":{source:"iana"},"audio/vnd.dra":{source:"iana",extensions:["dra"]},"audio/vnd.dts":{source:"iana",extensions:["dts"]},"audio/vnd.dts.hd":{source:"iana",extensions:["dtshd"]},"audio/vnd.dvb.file":{source:"iana"},"audio/vnd.everad.plj":{source:"iana"},"audio/vnd.hns.audio":{source:"iana"},"audio/vnd.lucent.voice":{source:"iana",extensions:["lvp"]},"audio/vnd.ms-playready.media.pya":{source:"iana",extensions:["pya"]},"audio/vnd.nokia.mobile-xmf":{source:"iana"},"audio/vnd.nortel.vbk":{source:"iana"},"audio/vnd.nuera.ecelp4800":{source:"iana",extensions:["ecelp4800"]},"audio/vnd.nuera.ecelp7470":{source:"iana",extensions:["ecelp7470"]},"audio/vnd.nuera.ecelp9600":{source:"iana",extensions:["ecelp9600"]},"audio/vnd.octel.sbc":{source:"iana"},"audio/vnd.qcelp":{source:"iana"},"audio/vnd.rhetorex.32kadpcm":{source:"iana"},"audio/vnd.rip":{source:"iana",extensions:["rip"]},"audio/vnd.rn-realaudio":{compressible:!1},"audio/vnd.sealedmedia.softseal.mpeg":{source:"iana"},"audio/vnd.vmx.cvsd":{source:"iana"},"audio/vnd.wave":{compressible:!1},"audio/vorbis":{source:"iana",compressible:!1},"audio/vorbis-config":{source:"iana"},"audio/wav":{compressible:!1,extensions:["wav"]},"audio/wave":{compressible:!1,extensions:["wav"]},"audio/webm":{source:"apache",compressible:!1,extensions:["weba"]},"audio/x-aac":{source:"apache",compressible:!1,extensions:["aac"]},"audio/x-aiff":{source:"apache",extensions:["aif","aiff","aifc"]},"audio/x-caf":{source:"apache",compressible:!1,extensions:["caf"]},"audio/x-flac":{source:"apache",extensions:["flac"]},"audio/x-m4a":{source:"nginx",extensions:["m4a"]},"audio/x-matroska":{source:"apache",extensions:["mka"]},"audio/x-mpegurl":{source:"apache",extensions:["m3u"]},"audio/x-ms-wax":{source:"apache",extensions:["wax"]},"audio/x-ms-wma":{source:"apache",extensions:["wma"]},"audio/x-pn-realaudio":{source:"apache",extensions:["ram","ra"]},"audio/x-pn-realaudio-plugin":{source:"apache",extensions:["rmp"]},"audio/x-realaudio":{source:"nginx",extensions:["ra"]},"audio/x-tta":{source:"apache"},"audio/x-wav":{source:"apache",extensions:["wav"]},"audio/xm":{source:"apache",extensions:["xm"]},"chemical/x-cdx":{source:"apache",extensions:["cdx"]},"chemical/x-cif":{source:"apache",extensions:["cif"]},"chemical/x-cmdf":{source:"apache",extensions:["cmdf"]},"chemical/x-cml":{source:"apache",extensions:["cml"]},"chemical/x-csml":{source:"apache",extensions:["csml"]},"chemical/x-pdb":{source:"apache"},"chemical/x-xyz":{source:"apache",extensions:["xyz"]},"font/opentype":{compressible:!0,extensions:["otf"]},"image/bmp":{name:"BMP",source:"apache",compressible:!0,extensions:["bmp"]},"image/cgm":{source:"iana",extensions:["cgm"]},"image/fits":{source:"iana"},"image/g3fax":{source:"iana",extensions:["g3"]},"image/gif":{name:"GIF",source:"iana",compressible:!1,extensions:["gif"]},"image/ief":{source:"iana",extensions:["ief"]},"image/jp2":{source:"iana"},"image/jpeg":{name:"JPG",source:"iana",compressible:!1,extensions:["jpeg","jpg","jpe"]},"image/jpm":{source:"iana"},"image/jpx":{source:"iana"},"image/ktx":{source:"iana",extensions:["ktx"]},"image/naplps":{source:"iana"},"image/pjpeg":{compressible:!1},"image/png":{name:"PNG",source:"iana",compressible:!1,extensions:["png"]},"image/prs.btif":{source:"iana",extensions:["btif"]},"image/prs.pti":{source:"iana"},"image/pwg-raster":{source:"iana"},"image/sgi":{source:"apache",extensions:["sgi"]},"image/svg+xml":{source:"iana",compressible:!0,extensions:["svg","svgz"]},"image/t38":{source:"iana"},"image/tiff":{name:"TIFF",source:"iana",compressible:!1,extensions:["tiff","tif"]},"image/tiff-fx":{source:"iana"},"image/vnd.adobe.photoshop":{source:"iana",compressible:!0,extensions:["psd"]},"image/vnd.airzip.accelerator.azv":{source:"iana"},"image/vnd.cns.inf2":{source:"iana"},"image/vnd.dece.graphic":{source:"iana",extensions:["uvi","uvvi","uvg","uvvg"]},"image/vnd.djvu":{source:"iana",extensions:["djvu","djv"]},"image/vnd.dvb.subtitle":{source:"iana",extensions:["sub"]},"image/vnd.dwg":{source:"iana",extensions:["dwg"]},"image/vnd.dxf":{source:"iana",extensions:["dxf"]},"image/vnd.fastbidsheet":{source:"iana",extensions:["fbs"]},"image/vnd.fpx":{source:"iana",extensions:["fpx"]},"image/vnd.fst":{source:"iana",extensions:["fst"]},"image/vnd.fujixerox.edmics-mmr":{source:"iana",extensions:["mmr"]},"image/vnd.fujixerox.edmics-rlc":{source:"iana",extensions:["rlc"]},"image/vnd.globalgraphics.pgb":{source:"iana"},"image/vnd.microsoft.icon":{source:"iana"},"image/vnd.mix":{source:"iana"},"image/vnd.mozilla.apng":{source:"iana"},"image/vnd.ms-modi":{source:"iana",extensions:["mdi"]},"image/vnd.ms-photo":{source:"apache",extensions:["wdp"]},"image/vnd.net-fpx":{source:"iana",extensions:["npx"]},"image/vnd.radiance":{source:"iana"},"image/vnd.sealed.png":{source:"iana"},"image/vnd.sealedmedia.softseal.gif":{source:"iana"},"image/vnd.sealedmedia.softseal.jpg":{source:"iana"},"image/vnd.svf":{source:"iana"},"image/vnd.tencent.tap":{source:"iana"},"image/vnd.valve.source.texture":{source:"iana"},"image/vnd.wap.wbmp":{source:"iana",extensions:["wbmp"]},"image/vnd.xiff":{source:"iana",extensions:["xif"]},"image/vnd.zbrush.pcx":{source:"iana"},"image/webp":{source:"apache",extensions:["webp"]},"image/x-3ds":{source:"apache",extensions:["3ds"]},"image/x-cmu-raster":{source:"apache",extensions:["ras"]},"image/x-cmx":{source:"apache",extensions:["cmx"]},"image/x-freehand":{source:"apache",extensions:["fh","fhc","fh4","fh5","fh7"]},"image/x-icon":{source:"apache",compressible:!0,extensions:["ico"]},"image/x-jng":{source:"nginx",extensions:["jng"]},"image/x-mrsid-image":{source:"apache",extensions:["sid"]},"image/x-ms-bmp":{source:"nginx",compressible:!0,extensions:["bmp"]},"image/x-pcx":{source:"apache",extensions:["pcx"]},"image/x-pict":{source:"apache",extensions:["pic","pct"]},"image/x-portable-anymap":{source:"apache",extensions:["pnm"]},"image/x-portable-bitmap":{source:"apache",extensions:["pbm"]},"image/x-portable-graymap":{source:"apache",extensions:["pgm"]},"image/x-portable-pixmap":{source:"apache",extensions:["ppm"]},"image/x-rgb":{source:"apache",extensions:["rgb"]},"image/x-tga":{source:"apache",extensions:["tga"]},"image/x-xbitmap":{source:"apache",extensions:["xbm"]},"image/x-xcf":{compressible:!1},"image/x-xpixmap":{source:"apache",extensions:["xpm"]},"image/x-xwindowdump":{source:"apache",extensions:["xwd"]},"message/cpim":{source:"iana"},"message/delivery-status":{source:"iana"},"message/disposition-notification":{source:"iana"},"message/external-body":{source:"iana"},"message/feedback-report":{source:"iana"},"message/global":{source:"iana"},"message/global-delivery-status":{source:"iana"},"message/global-disposition-notification":{source:"iana"},"message/global-headers":{source:"iana"},"message/http":{source:"iana",compressible:!1},"message/imdn+xml":{source:"iana",compressible:!0},"message/news":{source:"iana"},"message/partial":{source:"iana",compressible:!1},"message/rfc822":{source:"iana",compressible:!0,extensions:["eml","mime"]},"message/s-http":{source:"iana"},"message/sip":{source:"iana"},"message/sipfrag":{source:"iana"},"message/tracking-status":{source:"iana"},"message/vnd.si.simp":{source:"iana"},"message/vnd.wfa.wsc":{source:"iana"},"model/iges":{source:"iana",compressible:!1,extensions:["igs","iges"]},"model/mesh":{source:"iana",compressible:!1,extensions:["msh","mesh","silo"]},"model/vnd.collada+xml":{source:"iana",extensions:["dae"]},"model/vnd.dwf":{source:"iana",extensions:["dwf"]},"model/vnd.flatland.3dml":{source:"iana"},"model/vnd.gdl":{source:"iana",extensions:["gdl"]},"model/vnd.gs-gdl":{source:"apache"},"model/vnd.gs.gdl":{source:"iana"},"model/vnd.gtw":{source:"iana",extensions:["gtw"]},"model/vnd.moml+xml":{source:"iana"},"model/vnd.mts":{source:"iana",extensions:["mts"]},"model/vnd.opengex":{source:"iana"},"model/vnd.parasolid.transmit.binary":{source:"iana"},"model/vnd.parasolid.transmit.text":{source:"iana"},"model/vnd.rosette.annotated-data-model":{source:"iana"},"model/vnd.valve.source.compiled-map":{source:"iana"},"model/vnd.vtu":{source:"iana",extensions:["vtu"]},"model/vrml":{source:"iana",compressible:!1,extensions:["wrl","vrml"]},"model/x3d+binary":{source:"apache",compressible:!1,extensions:["x3db","x3dbz"]},"model/x3d+fastinfoset":{source:"iana"},"model/x3d+vrml":{source:"apache",compressible:!1,extensions:["x3dv","x3dvz"]},"model/x3d+xml":{source:"iana",compressible:!0,extensions:["x3d","x3dz"]},"model/x3d-vrml":{source:"iana"},"multipart/alternative":{source:"iana",compressible:!1},"multipart/appledouble":{source:"iana"},"multipart/byteranges":{source:"iana"},"multipart/digest":{source:"iana"},"multipart/encrypted":{source:"iana",compressible:!1},"multipart/form-data":{source:"iana",compressible:!1},"multipart/header-set":{source:"iana"},"multipart/mixed":{source:"iana",compressible:!1},"multipart/parallel":{source:"iana"},"multipart/related":{source:"iana",compressible:!1},"multipart/report":{source:"iana"},"multipart/signed":{source:"iana",compressible:!1},"multipart/voice-message":{source:"iana"},"multipart/x-mixed-replace":{source:"iana"},"text/1d-interleaved-parityfec":{source:"iana"},"text/cache-manifest":{source:"iana",compressible:!0,extensions:["appcache","manifest"]},"text/calendar":{source:"iana",extensions:["ics","ifb"]},"text/calender":{compressible:!0},"text/cmd":{compressible:!0},"text/coffeescript":{extensions:["coffee","litcoffee"]},"text/css":{name:"CSS",source:"iana",compressible:!0,extensions:["css"]},"text/csv":{name:"CSV",source:"iana",compressible:!0,extensions:["csv"]},"text/csv-schema":{source:"iana"},"text/directory":{source:"iana"},"text/dns":{source:"iana"},"text/ecmascript":{source:"iana"},"text/encaprtp":{source:"iana"},"text/enriched":{source:"iana"},"text/fwdred":{source:"iana"},"text/grammar-ref-list":{source:"iana"},"text/hjson":{extensions:["hjson"]},"text/html":{name:"HTML",source:"iana",compressible:!0,extensions:["html","htm","shtml"]},"text/jade":{extensions:["jade"]},"text/javascript":{source:"iana",compressible:!0},"text/jcr-cnd":{source:"iana"},"text/jsx":{compressible:!0,extensions:["jsx"]},"text/less":{extensions:["less"]},"text/markdown":{source:"iana"},"text/mathml":{source:"nginx",extensions:["mml"]},"text/mizar":{source:"iana"},"text/n3":{source:"iana",compressible:!0,extensions:["n3"]},"text/parameters":{source:"iana"},"text/parityfec":{source:"iana"},"text/plain":{name:"Plain Text",source:"iana",compressible:!0,extensions:["txt","text","conf","def","list","log","in","ini"]},"text/provenance-notation":{source:"iana"},"text/prs.fallenstein.rst":{source:"iana"},"text/prs.lines.tag":{source:"iana",extensions:["dsc"]},"text/prs.prop.logic":{source:"iana"},"text/raptorfec":{source:"iana"},"text/red":{source:"iana"},"text/rfc822-headers":{source:"iana"},"text/richtext":{source:"iana",compressible:!0,extensions:["rtx"]},"text/rtf":{source:"iana",compressible:!0,extensions:["rtf"]},"text/rtp-enc-aescm128":{source:"iana"},"text/rtploopback":{source:"iana"},"text/rtx":{source:"iana"},"text/sgml":{source:"iana",extensions:["sgml","sgm"]},"text/slim":{extensions:["slim","slm"]},"text/stylus":{extensions:["stylus","styl"]},"text/t140":{source:"iana"},"text/tab-separated-values":{source:"iana",compressible:!0,extensions:["tsv"]},"text/troff":{source:"iana",extensions:["t","tr","roff","man","me","ms"]},"text/turtle":{source:"iana",extensions:["ttl"]},"text/ulpfec":{source:"iana"},"text/uri-list":{source:"iana",compressible:!0,extensions:["uri","uris","urls"]},"text/vcard":{source:"iana",compressible:!0,extensions:["vcard"]},"text/vnd.a":{source:"iana"},"text/vnd.abc":{source:"iana"},"text/vnd.curl":{source:"iana",extensions:["curl"]},"text/vnd.curl.dcurl":{source:"apache",extensions:["dcurl"]},"text/vnd.curl.mcurl":{source:"apache",extensions:["mcurl"]},"text/vnd.curl.scurl":{source:"apache",extensions:["scurl"]},"text/vnd.debian.copyright":{source:"iana"},"text/vnd.dmclientscript":{source:"iana"},"text/vnd.dvb.subtitle":{source:"iana",extensions:["sub"]},"text/vnd.esmertec.theme-descriptor":{source:"iana"},"text/vnd.fly":{source:"iana",extensions:["fly"]},"text/vnd.fmi.flexstor":{source:"iana",extensions:["flx"]},"text/vnd.graphviz":{source:"iana",extensions:["gv"]},"text/vnd.in3d.3dml":{source:"iana",extensions:["3dml"]},"text/vnd.in3d.spot":{source:"iana",extensions:["spot"]},"text/vnd.iptc.newsml":{source:"iana"},"text/vnd.iptc.nitf":{source:"iana"},"text/vnd.latex-z":{source:"iana"},"text/vnd.motorola.reflex":{source:"iana"},"text/vnd.ms-mediapackage":{source:"iana"},"text/vnd.net2phone.commcenter.command":{source:"iana"},"text/vnd.radisys.msml-basic-layout":{source:"iana"},"text/vnd.si.uricatalogue":{source:"iana"},"text/vnd.sun.j2me.app-descriptor":{source:"iana",extensions:["jad"]},"text/vnd.trolltech.linguist":{source:"iana"},"text/vnd.wap.si":{source:"iana"},"text/vnd.wap.sl":{source:"iana"},"text/vnd.wap.wml":{source:"iana",extensions:["wml"]},"text/vnd.wap.wmlscript":{source:"iana",extensions:["wmls"]},"text/vtt":{charset:"UTF-8",compressible:!0,extensions:["vtt"]},"text/x-asm":{source:"apache",extensions:["s","asm"]},"text/x-c":{source:"apache",extensions:["c","cc","cxx","cpp","h","hh","dic"]},"text/x-component":{source:"nginx",extensions:["htc"]},"text/x-fortran":{source:"apache",extensions:["f","for","f77","f90"]},"text/x-gwt-rpc":{compressible:!0},"text/x-handlebars-template":{extensions:["hbs"]},"text/x-java-source":{source:"apache",extensions:["java"]},"text/x-jquery-tmpl":{compressible:!0},"text/x-lua":{extensions:["lua"]},"text/x-markdown":{compressible:!0,extensions:["markdown","md","mkd"]},"text/x-nfo":{source:"apache",extensions:["nfo"]},"text/x-opml":{source:"apache",extensions:["opml"]},"text/x-pascal":{source:"apache",extensions:["p","pas"]},"text/x-processing":{compressible:!0,extensions:["pde"]},"text/x-sass":{extensions:["sass"]},"text/x-scss":{extensions:["scss"]},"text/x-setext":{source:"apache",extensions:["etx"]},"text/x-sfv":{source:"apache",extensions:["sfv"]},"text/x-suse-ymp":{compressible:!0,extensions:["ymp"]},"text/x-uuencode":{source:"apache",extensions:["uu"]},"text/x-vcalendar":{source:"apache",extensions:["vcs"]},"text/x-vcard":{source:"apache",extensions:["vcf"]},"text/xml":{source:"iana",compressible:!0,extensions:["xml"]},"text/xml-external-parsed-entity":{source:"iana"},"text/yaml":{extensions:["yaml","yml"]},"video/1d-interleaved-parityfec":{source:"apache"},"video/3gpp":{source:"apache",extensions:["3gp","3gpp"]},"video/3gpp-tt":{source:"apache"},"video/3gpp2":{source:"apache",extensions:["3g2"]},"video/bmpeg":{source:"apache"},"video/bt656":{source:"apache"},"video/celb":{source:"apache"},"video/dv":{source:"apache"},"video/encaprtp":{source:"apache"},"video/h261":{source:"apache",extensions:["h261"]},"video/h263":{source:"apache",extensions:["h263"]},"video/h263-1998":{source:"apache"},"video/h263-2000":{source:"apache"},"video/h264":{source:"apache",extensions:["h264"]},"video/h264-rcdo":{source:"apache"},"video/h264-svc":{source:"apache"},"video/h265":{source:"apache"},"video/iso.segment":{source:"apache"},"video/jpeg":{source:"apache",extensions:["jpgv"]},"video/jpeg2000":{source:"apache"},"video/jpm":{source:"apache",extensions:["jpm","jpgm"]},"video/mj2":{source:"apache",extensions:["mj2","mjp2"]},"video/mp1s":{source:"apache"},"video/mp2p":{source:"apache"},"video/mp2t":{source:"apache",extensions:["ts"]},"video/mp4":{name:"MP4",source:"apache",compressible:!1,extensions:["mp4","mp4v","mpg4"]},"video/mp4v-es":{source:"apache"},"video/mpeg":{name:"MPG",source:"apache",compressible:!1,extensions:["mpeg","mpg","mpe","m1v","m2v"]},"video/mpeg4-generic":{source:"apache"},"video/mpv":{source:"apache"},"video/nv":{source:"apache"},"video/ogg":{source:"apache",compressible:!1,extensions:["ogv"]},"video/parityfec":{source:"apache"},"video/pointer":{source:"apache"},"video/quicktime":{name:"Apple Quicktime",source:"apache",compressible:!1,extensions:["qt","mov"]},"video/raptorfec":{source:"apache"},"video/raw":{source:"apache"},"video/rtp-enc-aescm128":{source:"apache"},"video/rtploopback":{source:"apache"},"video/rtx":{source:"apache"},"video/smpte292m":{source:"apache"},"video/ulpfec":{source:"apache"},"video/vc1":{source:"apache"},"video/vnd.cctv":{source:"apache"},"video/vnd.dece.hd":{source:"apache",extensions:["uvh","uvvh"]},"video/vnd.dece.mobile":{source:"apache",extensions:["uvm","uvvm"]},"video/vnd.dece.mp4":{source:"apache"},"video/vnd.dece.pd":{source:"apache",extensions:["uvp","uvvp"]},"video/vnd.dece.sd":{source:"apache",extensions:["uvs","uvvs"]},"video/vnd.dece.video":{source:"apache",extensions:["uvv","uvvv"]},"video/vnd.directv.mpeg":{source:"apache"},"video/vnd.directv.mpeg-tts":{source:"apache"},"video/vnd.dlna.mpeg-tts":{source:"apache"},"video/vnd.dvb.file":{source:"apache",extensions:["dvb"]},"video/vnd.fvt":{source:"apache",extensions:["fvt"]},"video/vnd.hns.video":{source:"apache"},"video/vnd.iptvforum.1dparityfec-1010":{source:"apache"},"video/vnd.iptvforum.1dparityfec-2005":{source:"apache"},"video/vnd.iptvforum.2dparityfec-1010":{source:"apache"},"video/vnd.iptvforum.2dparityfec-2005":{source:"apache"},"video/vnd.iptvforum.ttsavc":{source:"apache"},"video/vnd.iptvforum.ttsmpeg2":{source:"apache"},"video/vnd.motorola.video":{source:"apache"},"video/vnd.motorola.videop":{source:"apache"},"video/vnd.mpegurl":{source:"apache",extensions:["mxu","m4u"]},"video/vnd.ms-playready.media.pyv":{source:"apache",extensions:["pyv"]},"video/vnd.nokia.interleaved-multimedia":{source:"apache"},"video/vnd.nokia.videovoip":{source:"apache"},"video/vnd.objectvideo":{source:"apache"},"video/vnd.radgamettools.bink":{source:"apache"},"video/vnd.radgamettools.smacker":{source:"apache"},"video/vnd.sealed.mpeg1":{source:"apache"},"video/vnd.sealed.mpeg4":{source:"apache"},"video/vnd.sealed.swf":{source:"apache"},"video/vnd.sealedmedia.softseal.mov":{source:"apache"},"video/vnd.uvvu.mp4":{source:"apache",extensions:["uvu","uvvu"]},"video/vnd.vivo":{source:"apache",extensions:["viv"]},"video/vp8":{source:"apache"},"video/webm":{name:"WEBM",source:"apache",compressible:!1,extensions:["webm"]},"video/x-f4v":{source:"apache",extensions:["f4v"]},"video/x-fli":{source:"apache",extensions:["fli"]},"video/x-flv":{source:"apache",compressible:!1,extensions:["flv"]},"video/x-m4v":{source:"apache",extensions:["m4v"]},"video/x-matroska":{source:"apache",compressible:!1,extensions:["mkv","mk3d","mks"]},"video/x-mng":{source:"apache",extensions:["mng"]},"video/x-ms-asf":{source:"apache",extensions:["asf","asx"]},"video/x-ms-vob":{source:"apache",extensions:["vob"]},"video/x-ms-wm":{source:"apache",extensions:["wm"]},"video/x-ms-wmv":{source:"apache",compressible:!1,extensions:["wmv"]},"video/x-ms-wmx":{source:"apache",extensions:["wmx"]},"video/x-ms-wvx":{source:"apache",extensions:["wvx"]},"video/x-msvideo":{name:"AVI",source:"apache",extensions:["avi"]},"video/x-sgi-movie":{source:"apache",extensions:["movie"]},"video/x-smv":{source:"apache",extensions:["smv"]},"x-conference/x-cooltalk":{source:"apache",extensions:["ice"]},"x-shader/x-fragment":{compressible:!0},"x-shader/x-vertex":{compressible:!0}};(0,m.k)({_template:h.d`
    <style include="iron-flex">
      :host {
        display: block;
      }

      .suggestion-wrapper {
        border-radius: 2px;
        border: 1px solid var(--nuxeo-border);
        padding: 0 8px;
      }

      .suggestion-wrapper iron-icon {
        color: var(--dark-primary-color);
        margin-right: 8px;
      }

      paper-slider {
        width: 100%;
      }

      nuxeo-path-suggestion {
        --nuxeo-path-suggestion-results: {
          z-index: 2;
        }
        --paper-input-container-underline: {
          display: none;
        }
        --paper-input-container-underline-focus: {
          display: none;
        }
      }

      .error {
        border-left: 4px solid var(--nuxeo-warn-text);
        color: var(--nuxeo-text-default);
        padding-left: 8px;
      }
    </style>

    <!-- use nxql page provider to limit the use of the distribution analytics chart -->
    <nuxeo-page-provider
      id="provider"
      provider="nxql_search"
      page-size="1"
      schemas="dublincore,uid"
      headers="[[_headers()]]"
      skip-aggregates
      on-error="_onError"
    >
    </nuxeo-page-provider>

    <template is="dom-if" if="[[visible]]">
      <div class="flex-layout">
        <nuxeo-card>
          <div class="suggestion-wrapper horizontal layout center">
            <iron-icon icon="icons:folder"></iron-icon>
            <div class="flex">
              <nuxeo-path-suggestion id="pathSuggester" value="{{path}}"></nuxeo-path-suggestion>
            </div>
          </div>

          <template is="dom-if" if="[[_enabled]]">
            <nuxeo-document-distribution-chart
              id="chart"
              index="[[index]]"
              path="[[path]]"
              max-depth="[[depth]]"
              mode="count"
            >
            </nuxeo-document-distribution-chart>

            <div class="horizontal layout center">
              <div>
                <iron-icon icon="icons:track-changes"></iron-icon>
              </div>
              <div class="flex">
                <paper-slider
                  id="ratings"
                  pin
                  snaps
                  max="20"
                  max-markers="20"
                  step="1"
                  value="{{depth}}"
                ></paper-slider>
              </div>
            </div>
          </template>

          <p class="error" hidden$="[[_enabled]]">[[i18n('distributionAnalytics.disabled.message')]]</p>
        </nuxeo-card>
      </div>
    </template>
  `,is:"nuxeo-distribution-analytics",behaviors:[l.mB],properties:{visible:{type:Boolean,value:!1},index:{type:String,value:"_all"},path:{type:String},depth:{type:Number,value:1},disableThreshold:{type:Number,value:b.v.get("analytics.documentDistribution.disableThreshold")},_enabled:{type:Boolean},_loading:{type:Boolean}},observers:["_observeDocPath(path, depth, visible)"],_params(){return{queryParams:`SELECT * FROM Document WHERE ecm:mixinType != 'HiddenInNavigation' AND ecm:isProxy = 0 AND ecm:isVersion = 0 AND ecm:isTrashed = 0 AND ecm:path STARTSWITH '${this.path}'`}},_headers:()=>({"Content-Type":"application/json",accept:"text/plain,application/json","fetch-document":"properties"}),_observeDocPath(){this.visible&&this.path&&this.path.length&&this.path.endsWith("/")&&(this.disableThreshold?(this.$.provider.params=this._params(),this.$.provider.fetch().then((e=>{this._enabled=e&&e.resultsCount<this.disableThreshold,this._enabled&&_.animationFrame.run((()=>this.$$("#chart").execute()))}))):(this._enabled=!0,_.animationFrame.run((()=>this.$$("#chart").execute()))))}});var $=i(28694);(0,m.k)({_template:h.d`
    <style include="iron-flex iron-flex-alignment">
      :host {
        display: block;
      }

      nuxeo-date-picker {
        padding: 0 8px;
      }

      .flex-layout {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -1em;
        padding: 0 8px;
      }

      .flex-layout nuxeo-card {
        flex: 1 0 calc(33% - 2em);
        margin: 0 8px 16px;
        text-align: center;
      }

      .message {
        color: #c6c6c6;
      }

      nuxeo-data-table {
        height: 550px;
      }

      iron-icon {
        color: #0f9d58;
        --iron-icon-width: 144px;
        --iron-icon-height: 144px;
        margin-top: 50px;
      }

      chart-line,
      chart-pie {
        margin: 25px auto 0 auto;
        width: 100% !important;
        min-width: 30em;
        display: block;
        font-size: 0.8rem;
      }

      @media (max-width: 1024px) {
        .flex-layout nuxeo-card {
          flex: 1 0 calc(100% - 2em);
        }
      }
    </style>

    <nuxeo-card class="dates">
      <div class="horizontal flex end-justified layout">
        <nuxeo-date-picker value="{{startDate}}" label="[[i18n('analytics.after')]]"></nuxeo-date-picker>
        <nuxeo-date-picker value="{{endDate}}" label="[[i18n('analytics.before')]]"></nuxeo-date-picker>
      </div>
    </nuxeo-card>

    <template is="dom-if" if="[[visible]]">
      <div class="flex-layout">
        <!-- Top Downloads -->
        <nuxeo-audit-data
          event-id="download"
          where='{"extended.downloadReason": "download"}'
          grouped-by="docUUID"
          group-limit="10"
          start-date="[[startDate]]"
          end-date="[[_extendEndDate(endDate)]]"
          data="{{downloads}}"
        >
        </nuxeo-audit-data>

        <nuxeo-page-provider
          auto
          page-size="10"
          query="[[_downloadsQuery(downloads)]]"
          schemas="dublincore, common"
          current-page="{{downloadedDocs}}"
        >
        </nuxeo-page-provider>

        <nuxeo-card heading="[[i18n('repositoryAnalytics.topDownloads.heading')]]">
          <template is="dom-if" if="[[!_isEmpty(downloads)]]">
            <nuxeo-data-table items="[[downloadedDocs]]">
              <nuxeo-data-table-column name="[[i18n('repositoryAnalytics.topDownloads.file')]]">
                <template>[[item.title]]</template>
              </nuxeo-data-table-column>
              <nuxeo-data-table-column name="[[i18n('repositoryAnalytics.topDownloads.downloads')]]">
                <template>[[_numberOfDownloads(item)]]</template>
              </nuxeo-data-table-column>
            </nuxeo-data-table>
          </template>
          <template is="dom-if" if="[[_isEmpty(downloads)]]">
            <div class="message">[[i18n('repositoryAnalytics.noResults')]]</div>
          </template>
        </nuxeo-card>

        <!-- Number of documents -->
        <nuxeo-repository-data
          start-date="[[startDate]]"
          end-date="[[_extendEndDate(endDate)]]"
          metrics="cardinality(ecm:uuid)"
          data="{{totalCount}}"
          index="[[index]]"
        >
        </nuxeo-repository-data>

        <nuxeo-card heading="[[i18n('repositoryAnalytics.documents.heading')]]">
          <iron-icon icon="icons:description"></iron-icon>
          <h1>[[totalCount]]</h1>
        </nuxeo-card>

        <!-- Document count per type -->
        <nuxeo-repository-data
          start-date="[[startDate]]"
          end-date="[[_extendEndDate(endDate)]]"
          grouped-by="ecm:primaryType"
          group-limit="10"
          data="{{typeCount}}"
          index="[[index]]"
        >
        </nuxeo-repository-data>

        <nuxeo-card heading="[[i18n('repositoryAnalytics.documentTypes.heading')]]">
          <chart-pie values="[[_values(typeCount)]]" labels="[[_labels(typeCount)]]"> </chart-pie>
        </nuxeo-card>

        <!-- Top 10 creators -->
        <nuxeo-repository-data
          start-date="[[startDate]]"
          end-date="[[_extendEndDate(endDate)]]"
          grouped-by="dc:creator"
          group-limit="10"
          data="{{topCreators}}"
          index="[[index]]"
        >
        </nuxeo-repository-data>

        <nuxeo-card heading="[[i18n('repositoryAnalytics.topNCreators.heading', '10')]]">
          <chart-pie values="[[_values(topCreators)]]" labels="[[_labels(topCreators)]]"> </chart-pie>
        </nuxeo-card>

        <!-- Documents created per week -->
        <nuxeo-repository-data
          start-date="[[_formatDate(startDate)]]"
          end-date="[[_extendEndDate(endDate)]]"
          with-date-intervals="week"
          date-field="dc:created"
          data="{{docsCreatedPerWeek}}"
          index="[[index]]"
        >
        </nuxeo-repository-data>

        <nuxeo-card heading="[[i18n('repositoryAnalytics.documentsCreatedPerWeek.heading')]]">
          <chart-line
            labels="[[_labels(docsCreatedPerWeek)]]"
            values="[[_values(docsCreatedPerWeek)]]"
            options='{ "legend": { "display": false }, "animation": false }'
          >
          </chart-line>
        </nuxeo-card>

        <!-- Documents modified per week -->
        <nuxeo-repository-data
          start-date="[[_formatDate(startDate)]]"
          end-date="[[_extendEndDate(endDate)]]"
          with-date-intervals="week"
          date-field="dc:modified"
          data="{{docsModifiedPerWeek}}"
          index="[[index]]"
        >
        </nuxeo-repository-data>

        <nuxeo-card heading="[[i18n('repositoryAnalytics.documentsModifiedPerWeek.heading')]]">
          <chart-line
            labels="[[_labels(docsModifiedPerWeek)]]"
            values="[[_values(docsModifiedPerWeek)]]"
            options='{ "legend": { "display": false }, "animation": false }'
          >
          </chart-line>
        </nuxeo-card>

        <!-- Files by mime-type -->
        <nuxeo-repository-data
          start-date="[[startDate]]"
          end-date="[[_extendEndDate(endDate)]]"
          grouped-by="file:content.mime-type"
          data="{{filesByMimeType}}"
          index="[[index]]"
        >
        </nuxeo-repository-data>

        <nuxeo-card heading="[[i18n('repositoryAnalytics.filesByMimeType.heading')]]">
          <chart-pie values="[[_values(filesByMimeType)]]" labels="[[_types(filesByMimeType)]]"> </chart-pie>
        </nuxeo-card>
      </div>
    </template>
  `,is:"nuxeo-repository-analytics",behaviors:[$.q,l.mB],properties:{visible:{type:Boolean,value:!1},index:{type:String,value:"_all"},startDate:String,endDate:String},ready(){this.startDate=(0,y.Z)().subtract(1,"month").format("YYYY-MM-DD"),this.endDate=(0,y.Z)().format("YYYY-MM-DD")},_types:e=>e.map((e=>{const t=k[e.key];return t?t.name?t.name:t.extensions&&t.extensions.length>0?t.extensions[0].toUpperCase():e.key:e.key})),_downloadsQuery(e){if(e.length>0)return`SELECT * FROM Document WHERE ecm:uuid IN (${e.map((e=>`'${e.key}'`)).join(",")})`},_numberOfDownloads(e){return this.downloads.find((t=>t.key===e.uid)).value},_isEmpty:e=>!e||0===e.length}),(0,m.k)({_template:h.d`
    <style include="iron-flex iron-flex-alignment">
      :host {
        display: block;
      }

      .dates input {
        border: 1px solid #c6c6c6;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0);
        border-radius: 3px;
        margin-left: 0.5em;
        width: 125px;
      }

      nuxeo-date-picker {
        padding: 0 16px;
      }

      .flex-layout {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -1em;
        padding: 0 8px;
      }

      .flex-layout nuxeo-card {
        flex: 1 0 calc(33% - 2em);
        margin: 0 8px 16px;
        text-align: center;
      }

      nuxeo-data-table {
        height: 450px;
      }

      chart-bar,
      chart-pie {
        margin: 25px auto 0 auto;
        width: 100% !important;
        display: block;
        font-size: 0.8rem;
      }

      @media (max-width: 1024px) {
        .flex-layout nuxeo-card {
          flex: 1 0 calc(100% - 2em);
        }
      }
    </style>

    <nuxeo-card class="dates">
      <div class="horizontal flex end-justified layout">
        <nuxeo-date-picker value="{{startDate}}" label="[[i18n('analytics.after')]]"></nuxeo-date-picker>
        <nuxeo-date-picker value="{{endDate}}" label="[[i18n('analytics.before')]]"></nuxeo-date-picker>
      </div>
    </nuxeo-card>

    <template is="dom-if" if="[[visible]]">
      <div class="flex-layout">
        <!-- Number of calls per PageProvider -->
        <nuxeo-search-data
          start-date="[[startDate]]"
          end-date="[[_extendEndDate(endDate)]]"
          grouped-by="pageProviderName"
          data="{{callsPerProvider}}"
          index="[[index]]"
        >
        </nuxeo-search-data>

        <nuxeo-card heading="[[i18n('searchAnalytics.callsPerPageProvider.heading')]]">
          <chart-pie values="[[_values(callsPerProvider)]]" labels="[[_labels(callsPerProvider)]]"> </chart-pie>
        </nuxeo-card>

        <!-- Number of calls per hour -->
        <nuxeo-search-data
          start-date="[[startDate]]"
          end-date="[[_extendEndDate(endDate)]]"
          with-date-intervals="hour"
          without-extended-bounds
          date-format="HH"
          data="{{callsPerHour}}"
          index="[[index]]"
        >
        </nuxeo-search-data>

        <nuxeo-card heading="[[i18n('searchAnalytics.callsPerHour.heading')]]">
          <chart-bar
            labels="[[_range(0,23)]]"
            values="[[_aggregatePerHourOfDay(callsPerHour)]]"
            series="[[_range(0,23)]]"
            options='{ "legend": { "display": false }, "animation": false }'
          >
          </chart-bar>
        </nuxeo-card>

        <!-- Result ranges -->
        <nuxeo-search-data
          start-date="[[startDate]]"
          end-date="[[_extendEndDate(endDate)]]"
          with-ranges='{"resultsCount":[
                         {"key": "no result", "to": 1 },
                         {"key": "less than 50", "from" : 1, "to": 50},
                         {"key": "between 51 and 200", "from" : 51, "to": 200 },
                         {"key": "between 200 and 1000", "from" : 201, "to": 1000},
                         {"key": "more than 1000", "from" : 1001 }]}'
          data="{{callPerNumberOfResults}}"
          index="[[index]]"
        >
        </nuxeo-search-data>

        <nuxeo-card heading="[[i18n('searchAnalytics.numberOfResults.heading')]]">
          <nuxeo-data-table items="[[callPerNumberOfResults]]">
            <nuxeo-data-table-column name="[[i18n('searchAnalytics.numberOfResults.range')]]">
              <template>[[item.key]]</template>
            </nuxeo-data-table-column>
            <nuxeo-data-table-column name="[[i18n('searchAnalytics.numberOfResults.calls')]]">
              <template>[[item.value]]</template>
            </nuxeo-data-table-column>
          </nuxeo-data-table>
        </nuxeo-card>

        <!-- Most used expressions for full text search  -->
        <nuxeo-search-data
          start-date="[[startDate]]"
          end-date="[[_extendEndDate(endDate)]]"
          grouped-by="searchDocumentModel.properties.defaults:ecm_fulltext"
          group-limit="5"
          data="{{callsPerFT}}"
          index="[[index]]"
        >
        </nuxeo-search-data>

        <nuxeo-card heading="[[i18n('searchAnalytics.mostPopularSearches.heading')]]">
          <nuxeo-data-table items="[[callsPerFT]]">
            <nuxeo-data-table-column name="[[i18n('searchAnalytics.mostPopularSearches.searchTerm')]]">
              <template>[[item.key]]</template>
            </nuxeo-data-table-column>
            <nuxeo-data-table-column name="[[i18n('searchAnalytics.mostPopularSearches.numberOfCalls')]]">
              <template>[[item.value]]</template>
            </nuxeo-data-table-column>
          </nuxeo-data-table>
        </nuxeo-card>

        <!-- Searches by number of pages displayed -->
        <nuxeo-search-data
          start-date="[[startDate]]"
          end-date="[[_extendEndDate(endDate)]]"
          with-ranges='{"pageIndex":[
                             {"key": "First page", "from" : 0, "to": 1 },
                             {"key": "Page 2", "from" : 1, "to": 2},
                             {"key": "Pages 3 to 5", "from" : 2, "to": 5 },
                             {"key": "Pages 6 to 10", "from" : 6, "to": 10},
                             {"key": "After 10 pages", "from" : 10 }]}'
          data="{{callPerNumberOfPages}}"
          index="[[index]]"
        >
        </nuxeo-search-data>

        <nuxeo-card heading="[[i18n('searchAnalytics.mostPopularSearches.numberOfPagesDisplayed.heading')]]">
          <nuxeo-data-table items="[[callPerNumberOfPages]]">
            <nuxeo-data-table-column
              name="[[i18n('searchAnalytics.mostPopularSearches.numberOfPagesDisplayed.range')]]"
            >
              <template>[[item.key]]</template>
            </nuxeo-data-table-column>
            <nuxeo-data-table-column
              name="[[i18n('searchAnalytics.mostPopularSearches.numberOfPagesDisplayed.numberOfCalls')]]"
            >
              <template>[[item.value]]</template>
            </nuxeo-data-table-column>
          </nuxeo-data-table>
        </nuxeo-card>

        <!-- Searches by filters used -->
        <nuxeo-search-data
          start-date="[[startDate]]"
          end-date="[[_extendEndDate(endDate)]]"
          grouped-by="searchFields"
          group-limit="5"
          data="{{callByFilters}}"
        >
        </nuxeo-search-data>

        <nuxeo-card heading="[[i18n('searchAnalytics.filtersUsed.heading')]]">
          <nuxeo-data-table items="[[callByFilters]]">
            <nuxeo-data-table-column name="[[i18n('searchAnalytics.filtersUsed.numberOfFilters')]]">
              <template>[[item.key]]</template>
            </nuxeo-data-table-column>
            <nuxeo-data-table-column name="[[i18n('searchAnalytics.filtersUsed.numberOfCalls')]]">
              <template>[[item.value]]</template>
            </nuxeo-data-table-column>
          </nuxeo-data-table>
        </nuxeo-card>
      </div>
    </template>
  `,is:"nuxeo-search-analytics",behaviors:[$.q,l.mB],properties:{visible:{type:Boolean,value:!1},index:{type:String,value:"audit"},startDate:String,endDate:String,hoursBounds:{value:{min:0,max:23}}},ready(){this.startDate=(0,y.Z)().subtract(1,"month").format("YYYY-MM-DD"),this.endDate=(0,y.Z)().format("YYYY-MM-DD")},_range(e,t){const i=[];for(let a=e;a<=t;a++)i.push(a);return i},_aggregatePerHourOfDay(e){const t={};return e.forEach((e=>{t[e.key]=t[e.key]||[],t[e.key].push(e.value)})),[this._range(this.hoursBounds.min,this.hoursBounds.max).map((e=>{if(!t[e]||!t[e].length)return 0;let i=0;return t[e].forEach((e=>{i+=e})),i}))]}}),(0,m.k)({_template:h.d`
    <style include="iron-flex iron-flex-alignment">
      :host {
        display: block;
      }

      nuxeo-select {
        min-width: 250px;
      }

      .dates input {
        border: 1px solid #c6c6c6;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0);
        border-radius: 3px;
        margin-left: 0.5em;
        width: 125px;
      }

      nuxeo-date-picker {
        padding: 0 16px;
      }

      nuxeo-data-table {
        height: 450px;
      }

      .flex-layout {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -1em;
        padding: 0 8px;
      }

      .flex-layout nuxeo-card {
        flex: 1 0 calc(33% - 2em);
        margin: 0 8px 16px;
        text-align: center;
      }

      iron-icon {
        color: #0f9d58;
        --iron-icon-width: 144px;
        --iron-icon-height: 144px;
        margin-top: 50px;
      }

      chart-bar,
      chart-pie {
        margin: 25px auto 0 auto;
        width: 100% !important;
        display: block;
        font-size: 0.8rem;
      }

      @media (max-width: 1024px) {
        .flex-layout nuxeo-card {
          flex: 1 0 calc(100% - 2em);
        }
      }
    </style>

    <template is="dom-if" if="[[visible]]">
      <nuxeo-resource auto path="workflowModel" on-response="_handleWorkflowModelResponse"></nuxeo-resource>

      <nuxeo-card class="dates">
        <div class="horizontal flex end-justified layout center wrap">
          <nuxeo-select
            label="[[i18n('analytics.workflow')]]"
            placeholder="[[i18n('analytics.workflow')]]"
            selected="{{workflow}}"
            options="[[workflows]]"
          ></nuxeo-select>
          <nuxeo-date-picker value="{{startDate::change}}" label="[[i18n('analytics.after')]]"></nuxeo-date-picker>
          <nuxeo-date-picker value="{{endDate::change}}" label="[[i18n('analytics.before')]]"></nuxeo-date-picker>
        </div>
      </nuxeo-card>

      <div class="flex-layout">
        <!-- Average wf duration -->
        <nuxeo-workflow-data
          workflow="[[workflow]]"
          event="afterWorkflowFinish"
          metrics="avg(timeSinceWfStarted)"
          start-date="[[startDate]]"
          end-date="[[_extendEndDate(endDate)]]"
          data="{{avgWorkflowLength}}"
        >
        </nuxeo-workflow-data>

        <nuxeo-card heading="[[i18n('workflowAnalytics.averageWorkflowDuration.heading')]]">
          <iron-icon icon="image:timer"></iron-icon>
          <h1>[[_asDuration(avgWorkflowLength)]]</h1>
        </nuxeo-card>

        <!-- Wf initiators -->
        <nuxeo-workflow-data
          workflow="[[workflow]]"
          event="afterWorkflowStarted"
          grouped-by="workflowInitiator"
          start-date="[[startDate]]"
          end-date="[[_extendEndDate(endDate)]]"
          data="{{initiators}}"
        >
        </nuxeo-workflow-data>

        <nuxeo-card heading="[[i18n('workflowAnalytics.workflowInitiators.heading')]]">
          <chart-pie values="[[_values(initiators)]]" labels="[[_series(initiators)]]"> </chart-pie>
        </nuxeo-card>

        <!-- Actions per user -->
        <nuxeo-workflow-data
          workflow="[[workflow]]"
          event="afterWorkflowTaskEnded"
          grouped-by="taskActor, taskName"
          start-date="[[startDate]]"
          end-date="[[_extendEndDate(endDate)]]"
          data="{{numberOfActionsPerUser}}"
        >
        </nuxeo-workflow-data>

        <nuxeo-card heading="[[i18n('workflowAnalytics.actionsPerUser.heading')]]">
          <chart-bar
            labels="[[_labels(numberOfActionsPerUser)]]"
            series="[[_series(numberOfActionsPerUser)]]"
            values="[[_values(numberOfActionsPerUser)]]"
          >
          </chart-bar>
        </nuxeo-card>

        <!-- Average task duration per user -->
        <nuxeo-workflow-data
          workflow="[[workflow]]"
          event="afterWorkflowTaskEnded"
          grouped-by="taskActor"
          metrics="avg(timeSinceTaskStarted)"
          start-date="[[startDate]]"
          end-date="[[_extendEndDate(endDate)]]"
          data="{{avgTaskDurationPerUser}}"
        >
        </nuxeo-workflow-data>

        <nuxeo-card heading="[[i18n('workflowAnalytics.averageTaskDurationPerUser.heading')]]">
          <nuxeo-data-table items="[[_table(avgTaskDurationPerUser)]]">
            <nuxeo-data-table-column name="[[i18n('workflowAnalytics.averageTaskDurationPerUser.user')]]">
              <template>[[item.key]]</template>
            </nuxeo-data-table-column>
            <nuxeo-data-table-column name="[[i18n('workflowAnalytics.averageTaskDurationPerUser.duration')]]">
              <template>[[item.value]]</template>
            </nuxeo-data-table-column>
          </nuxeo-data-table>
        </nuxeo-card>
      </div>
    </template>
  `,is:"nuxeo-workflow-analytics",behaviors:[$.q,l.mB],properties:{visible:{type:Boolean,value:!1},workflow:{type:String,value:"ParallelDocumentReview"},index:{type:String,value:"nuxeo"},startDate:String,endDate:String,workflows:Array},ready(){this.startDate=(0,y.Z)().subtract(1,"month").format("YYYY-MM-DD"),this.endDate=(0,y.Z)().format("YYYY-MM-DD")},_labels(e){return e?e.value?e.value.map((e=>this.i18n(e.key))):this._labels(e[0]):[]},_values(e){const t=[];return e.forEach((e=>{Array.isArray(e.value)?t.push(e.value.map((e=>e.value))):t.push(e.value)})),t},_asDuration(e){let t=Math.floor(e/1e3),i=Math.floor(t/60),a=Math.floor(i/60);const o=Math.floor(a/24);let n="";return a-=24*o,i=i-24*o*60-60*a,t=t-24*o*60*60-60*a*60-60*i,o>0&&(n+=`${o} Days `),a>0&&(n+=`${a}h `),i>0&&(n+=`${i}m `),t>0&&(n+=`${t}s `),n},_table(e){return e.map((e=>({key:e.key,value:this._asDuration(e.value)})))},_handleWorkflowModelResponse(e){const t=e.detail.response.entries;this.workflows=t.map((e=>({id:e.name,label:this.i18n(e.title)}))),this.workflow=this.workflows[0].id}}),(0,m.k)({_template:h.d`
    <nuxeo-page>
      <div slot="header">
        <span class="flex">[[i18n('admin.usersAndGroups.heading')]]</span>
      </div>
      <div>
        <template is="dom-if" if="[[visible]]">
          <nuxeo-user-group-management id="management" page="{{page}}"></nuxeo-user-group-management>
          <template is="dom-if" if="[[_displayLatest]]">
            <nuxeo-user-group-latest></nuxeo-user-group-latest>
          </template>
        </template>
      </div>
    </nuxeo-page>
  `,is:"nuxeo-user-group-management-page",behaviors:[l.mB,d.N],properties:{visible:{type:Boolean,observer:"_visibleChanged"},page:{type:String,value:"search",observer:"_observePage"},entity:{type:Object,value:{},observer:"_entityChanged"},route:{type:String,value:"page"},routeParams:{type:Array,observer:"_routeParamsChanged"}},listeners:{goHome:"_handleUGMgoHome",manageUser:"_handleUGMmanageUser",manageGroup:"_handleUGMmanageGroup"},_routeParamsChanged(e){e&&2===e.length?this.entity={type:e[0],id:e[1]}:this.entity={}},_entityChanged(){if(!this.visible)return;const e=this.$$("nuxeo-user-group-management");e&&(this.entity&&this.entity.id&&this.entity.type?"group"===this.entity.type?(e.selectedGroup=this.entity.id,e.page="manage-group"):"user"===this.entity.type&&(e.selectedUser=this.entity.id,e.page="manage-user"):(e.$$("nuxeo-user-group-search")._searchTermChanged(),this.page="search"))},_visibleChanged(){this.visible&&this.async((()=>{this._entityChanged()}))},_displayLatest(){return"search"===this.page},_handleUGMgoHome(){this.entity={},this.navigateTo(this.route,"user-group-management")},_handleUGMmanageUser(e){this.entity={type:"user",id:e.detail.user};const t=`user-group-management/${this.entity.type}/${encodeURIComponent(this.entity.id)}`;this.navigateTo(this.route,t)},_handleUGMmanageGroup(e){this.entity={type:"group",id:e.detail.group};const t=`user-group-management/${this.entity.type}/${encodeURIComponent(this.entity.id)}`;this.navigateTo(this.route,t)},_observePage(){this._displayLatest="search"===this.page}});var D=i(93426);i(36037),i(43822);class C extends((0,D.P)([r.e,d.N],Nuxeo.Element)){static get template(){return h.d`
      <style>
        .row-container {
          @apply --layout-horizontal;
          @apply --layout-wrap;
        }

        .row-container * {
          flex: 1;
        }

        .row-container :first-child {
          margin-inline-end: 8px;
        }

        #table {
          height: calc(100vh - 370px);
        }
      </style>

      <nuxeo-audit-page-provider id="provider" doc-id="[[document.uid]]" page-size="40"></nuxeo-audit-page-provider>

      <nuxeo-card>
        <nuxeo-user-suggestion
          role="widget"
          value="{{principalName}}"
          label="[[i18n('audit.username')]]"
          placeholder="[[i18n('audit.usernamePlaceholder')]]"
          aria-label$="[[i18n('audit.username')]]"
        ></nuxeo-user-suggestion>
        <div class="row-container">
          <nuxeo-date-picker
            role="widget"
            label="[[i18n('audit.from')]]"
            value="{{startDate}}"
            aria-label$="[[i18n('documentPage.process.start')]]"
          >
          </nuxeo-date-picker>
          <nuxeo-date-picker
            role="widget"
            label="[[i18n('audit.to')]]"
            value="{{endDate}}"
            aria-label$="[[i18n('wf.parallelDocumentReview.endDate')]]"
          >
          </nuxeo-date-picker>
        </div>
        <div class="row-container">
          <nuxeo-directory-suggestion
            role="widget"
            label="[[i18n('audit.eventTypes')]]"
            directory-name="eventTypes"
            value="{{events}}"
            multiple="true"
            placeholder="[[i18n('audit.selectEventTypes')]]"
            min-chars="0"
            aria-label$="[[i18n('audit.eventTypes')]]"
          >
          </nuxeo-directory-suggestion>
          <nuxeo-directory-suggestion
            role="widget"
            label="[[i18n('audit.eventCategory')]]"
            directory-name="eventCategories"
            value="{{category}}"
            placeholder="[[i18n('audit.selectEventCategory')]]"
            min-chars="0"
            aria-label$="[[i18n('audit.eventCategory')]]"
          >
          </nuxeo-directory-suggestion>
        </div>
      </nuxeo-card>
      <nuxeo-card>
        <nuxeo-data-table id="table" paginable nx-provider="provider" empty-label="[[i18n('audit.empty')]]">
          <nuxeo-data-table-column name="[[i18n('audit.performedAction')]]" sort-by="eventId">
            <template>[[_formati18n('eventType.', item.eventId)]]</template>
          </nuxeo-data-table-column>
          <nuxeo-data-table-column name="[[i18n('audit.date')]]" sort-by="eventDate">
            <template><nuxeo-date datetime="[[item.eventDate]]"></nuxeo-date></template>
          </nuxeo-data-table-column>
          <nuxeo-data-table-column name="[[i18n('audit.username')]]" sort-by="principalName">
            <template><nuxeo-user-tag user="[[item.principalName]]"></nuxeo-user-tag></template>
          </nuxeo-data-table-column>
          <nuxeo-data-table-column name="[[i18n('audit.category')]]" sort-by="category">
            <template>[[_formati18n('eventCategory.', item.category)]]</template>
          </nuxeo-data-table-column>
          <template is="dom-if" if="[[!_isAvailable(document)]]">
            <nuxeo-data-table-column name="[[i18n('audit.document')]]">
              <template>
                <a href$="[[_getDocumentURL(item)]]">[[_formatDocument(item)]]</a>
              </template>
            </nuxeo-data-table-column>
          </template>
          <nuxeo-data-table-column name="[[i18n('audit.comment')]]">
            <template>
              <a href$="[[_parseComment(item.comment)]]"
                >[[_formatComment(item.comment, item.extended.clientReason)]]</a
              >
            </template>
          </nuxeo-data-table-column>
          <template is="dom-if" if="[[_isAvailable(document)]]">
            <nuxeo-data-table-column name="[[i18n('audit.state')]]">
              <template><nuxeo-tag uppercase>[[formatLifecycleState(item.docLifeCycle)]]</nuxeo-tag></template>
            </nuxeo-data-table-column>
          </template>
        </nuxeo-data-table>
      </nuxeo-card>
    `}static get is(){return"nuxeo-audit-search"}static get properties(){return{visible:{type:Boolean,value:!1,observer:"_refresh"},document:{type:Object,value:{}},principalName:{type:String,value:""},startDate:{type:String,notify:!0,observer:"_observeDates"},endDate:{type:String,notify:!0,observer:"_observeDates"},events:{type:Array,value:[]},category:{type:String,value:""}}}static get observers(){return["_refresh(events.*, category, principalName, document)"]}get documentId(){return this.document?this.document.uid:""}get table(){return this.$.table}_isAvailable(e){return e&&e.uid}_formati18n(e,t){return t?this.i18n(e+t):""}_buildParams(){const e={principalName:this.principalName};return this.events&&this.events.length>0&&(e.eventIds=this.documentId?this.events:this.events.join()),this.category&&(e.eventCategory=this.category),this._hasValidDate(this.startDate)&&(e.startDate=this.startDate),this._hasValidDate(this.endDate)&&(e.endDate=this.endDate),e}_refresh(){this.visible&&(this.$.provider.params=this._buildParams(),this.table.fetch())}_hasValidDate(e){return e&&e.length>0}_observeDates(){const e=this._hasValidDate(this.startDate)&&Date.parse(this.startDate),t=this._hasValidDate(this.endDate)&&Date.parse(this.endDate),i=!e||!t||e<t;e&&t&&e>t&&(this.startDate=(0,y.Z)(t).subtract(7,"day").format("YYYY-MM-DD")),i&&this._refresh()}_formatDocument(e){if(e)return`${e.docType||""}${e.docPath||""}`}_getDocumentURL(e){if(e&&e.docUUID)return this.urlFor("document",e.docUUID)}_parseComment(e){return e&&/^\w+:(?:\w+-){2,}(?:\w+)$/.test(e)?this.urlFor("document",e.split(":")[1]):null}_formatComment(e,t){return(0,y.Z)(e,y.Z.ISO_8601).isValid()?this.formatDateTime(e):t&&t.toLowerCase().indexOf("view")>-1?`${this.i18n("command.view")}: [${e}]`:e}}customElements.define(C.is,C),(0,m.k)({_template:h.d`
    <nuxeo-page>
      <div slot="header">
        <span class="flex">[[i18n('audit.heading')]]</span>
      </div>
      <nuxeo-audit-search name="audit" id="audit" visible="[[visible]]"> </nuxeo-audit-search>
    </nuxeo-page>
  `,is:"nuxeo-audit",behaviors:[l.mB],properties:{visible:{type:Boolean,value:!1}}}),i(12052);const P="/oauth2/client/";class j extends((0,D.P)([u.M,r.e],Nuxeo.Element)){static get template(){return h.d`
      <style include="nuxeo-styles iron-flex iron-flex-alignment">
        nuxeo-data-table {
          height: calc(100vh - 210px);
        }
      </style>

      <nuxeo-card heading="[[i18n('cloudConsumers.OAuth2Consumers')]]">
        <nuxeo-resource id="oauth" response="{{consumers}}"></nuxeo-resource>
        <div class="layout horizontal center end-justified">
          <paper-button id="addClient" class="text" on-tap="_addEntry" aria-labelledby="addClientLabel">
            <span id="addClientLabel">[[i18n('cloudConsumers.add')]]</span>
          </paper-button>
        </div>

        <nuxeo-data-table
          id="table"
          name="table"
          icon="nuxeo:view-list"
          empty-label="[[i18n('cloudConsumers.emptyResult')]]"
          items="[[oauth2Consumers]]"
        >
          <nuxeo-data-table-column name="[[i18n('cloudConsumers.name')]]" field="name">
            <template>
              <span name="name">[[item.name]]</span>
            </template>
          </nuxeo-data-table-column>

          <nuxeo-data-table-column name="[[i18n('cloudConsumers.consumerId')]]" field="id">
            <template>
              <span name="id">[[item.id]]</span>
            </template>
          </nuxeo-data-table-column>

          <nuxeo-data-table-column name="[[i18n('cloudConsumers.secret')]]" field="secret">
            <template>
              <span name="secret">[[item.secret]]</span>
            </template>
          </nuxeo-data-table-column>

          <nuxeo-data-table-column name="[[i18n('cloudConsumers.redirect')]]" field="redirectURIs">
            <template>
              <span name="redirectURIs">[[item.redirectURIs]]</span>
            </template>
          </nuxeo-data-table-column>

          <nuxeo-data-table-column name="[[i18n('cloudConsumers.autoGrant')]]" field="isAutoGrant">
            <template>
              <paper-checkbox noink checked="[[item.isAutoGrant]]" disabled></paper-checkbox>
            </template>
          </nuxeo-data-table-column>

          <nuxeo-data-table-column name="[[i18n('cloudConsumers.isEnabled')]]" field="isEnabled">
            <template>
              <paper-checkbox noink checked="[[item.isEnabled]]" disabled></paper-checkbox>
            </template>
          </nuxeo-data-table-column>

          <nuxeo-data-table-column name="[[i18n(col.name)]]" key="[[col.key]]">
            <template>
              <paper-icon-button
                name="edit"
                icon="nuxeo:edit"
                on-tap="_editEntry"
                title="[[i18n('cloudConsumers.edit.tooltip')]]"
              ></paper-icon-button>
              <paper-icon-button
                name="delete"
                icon="nuxeo:delete"
                on-tap="_deleteEntry"
                title="[[i18n('cloudConsumers.delete.tooltip')]]"
              ></paper-icon-button>
            </template>
          </nuxeo-data-table-column>
        </nuxeo-data-table>
      </nuxeo-card>

      <nuxeo-dialog id="dialog" with-backdrop>
        <h2>[[i18n('cloudConsumersEdit.popup.editEntry')]]</h2>
        <iron-form id="form">
          <form>
            <nuxeo-input
              required
              label="[[i18n('cloudConsumersEdit.name')]]"
              name="name"
              value="{{_selectedEntry.name}}"
            >
            </nuxeo-input>

            <nuxeo-input
              required
              label="[[i18n('cloudConsumersEdit.consumerId')]]"
              name="id"
              value="{{_selectedEntry.id}}"
            >
            </nuxeo-input>

            <nuxeo-input label="[[i18n('cloudConsumersEdit.secret')]]" name="secret" value="{{_selectedEntry.secret}}">
            </nuxeo-input>

            <nuxeo-input
              required
              label="[[i18n('cloudConsumersEdit.redirect')]]"
              name="redirectURIs"
              value="{{_selectedEntry.redirectURIs}}"
            >
            </nuxeo-input>

            <paper-checkbox noink id="isAutoGrant" name="isAutoGrant" checked="{{_selectedEntry.isAutoGrant}}">
              [[i18n('cloudConsumersEdit.autoGrant')]]
            </paper-checkbox>

            <paper-checkbox noink id="isEnabled" name="isEnabled" checked="{{_selectedEntry.isEnabled}}">
              [[i18n('cloudConsumersEdit.isEnabled')]]
            </paper-checkbox>
          </form>
        </iron-form>
        <div class="buttons">
          <paper-button id="cancel" noink dialog-dismiss class="secondary">[[i18n('command.cancel')]]</paper-button>
          <paper-button id="save" noink class="primary" on-tap="_save">[[i18n('command.save')]]</paper-button>
        </div>
      </nuxeo-dialog>
    `}static get is(){return"nuxeo-cloud-consumers"}static get properties(){return{_selectedEntry:{type:Object,readOnly:!0},_selectedClientId:{type:String,readOnly:!0},oauth2Consumers:{type:Array,value:[]}}}refresh(){this.$.oauth.path=P,this.$.oauth.get().then((e=>{this.oauth2Consumers=e.entries,this.async(this.$.table.$.list.notifyResize.bind(this.$.table.$.list),1e3)}))}_editEntry(e){const t=JSON.parse(JSON.stringify(e.target.parentNode.item));Array.isArray(t.redirectURIs)&&(t.redirectURIs=t.redirectURIs.join()),this._set_selectedEntry(t),this._set_selectedClientId(t.id),this.$.dialog.toggle()}_addEntry(){this._set_selectedEntry({"entity-type":"oauth2Client",redirectURIs:""}),this._set_selectedClientId(null),this.$.dialog.toggle()}_save(){this.$.form.validate()&&(this._selectedEntry.redirectURIs=this._selectedEntry.redirectURIs?this._selectedEntry.redirectURIs.split(","):[],this.$.oauth.data=this._selectedEntry,this._selectedClientId?this._update(this._selectedClientId,this._selectedEntry):this._create(this._selectedEntry))}_create(e){this.$.oauth.path=P,this.$.oauth.data=e,this.$.oauth.post().then((()=>{this.refresh(),this.$.dialog.toggle(),this.notify({message:this.i18n("cloudConsumers.successfullyCreated")})}),(e=>{this.notify({message:`${this.i18n("label.error").toUpperCase()}: ${e.message&&e.message.length>0?e.message:this.i18n("cloudConsumers.errorCreating")}`})}))}_update(e,t){this.$.oauth.path=P+e,this.$.oauth.data=t,this.$.oauth.put().then((()=>{this.$.dialog.toggle(),this.notify({message:this.i18n("cloudConsumers.successfullyEdited")}),this.refresh()}),(e=>{this.notify({message:`${this.i18n("label.error").toUpperCase()}: ${e.message&&e.message.length>0?e.message:this.i18n("cloudConsumers.errorEditing")}`})}))}_deleteEntry(e){if(window.confirm(this.i18n("cloudConsumers.confirmDelete"))){const{item:t}=e.target.parentNode;this.$.oauth.path=P+t.id,this.$.oauth.remove().then((()=>{this.refresh(),this.notify({message:this.i18n("cloudConsumers.successfullyDeleted")})}),(()=>{this.notify({message:`${this.i18n("label.error").toUpperCase()}: ${this.i18n("cloudConsumers.errorDeleting")}`})}))}}}customElements.define(j.is,j),Nuxeo.CloudConsumers=j;const S="oauth2/provider/";(0,m.k)({_template:h.d`
    <style include="nuxeo-styles iron-flex iron-flex-alignment">
      nuxeo-data-table {
        height: calc(100vh - 210px);
      }
    </style>

    <nuxeo-resource id="oauth"></nuxeo-resource>

    <nuxeo-card heading="[[i18n('cloudProviders.OAuth2ServiceProviders')]]">
      <div class="layout horizontal center end-justified">
        <paper-button id="addEntry" class="text" on-tap="_addEntry" aria-labelledby="addEntryLabel">
          <span id="addEntryLabel">[[i18n('cloudProviders.add')]]</span>
        </paper-button>
      </div>

      <nuxeo-data-table
        id="table"
        name="table"
        icon="nuxeo:view-list"
        empty-label="[[i18n('cloudProviders.emptyResult')]]"
        items="[[oauth2Providers]]"
      >
        <nuxeo-data-table-column name="[[i18n('cloudProviders.serviceName')]]" field="serviceName">
          <template>
            <span name="serviceName">[[item.serviceName]]</span>
          </template>
        </nuxeo-data-table-column>

        <nuxeo-data-table-column name="[[i18n('cloudProviders.description')]]" field="description">
          <template>
            <span>[[item.description]]</span>
          </template>
        </nuxeo-data-table-column>

        <nuxeo-data-table-column name="[[i18n('cloudProviders.enabled')]]" field="isEnabled">
          <template>
            <paper-checkbox noink checked="[[item.isEnabled]]" disabled></paper-checkbox>
          </template>
        </nuxeo-data-table-column>

        <nuxeo-data-table-column name="[[i18n(col.name)]]" key="[[col.key]]">
          <template>
            <paper-icon-button
              name="edit"
              icon="nuxeo:edit"
              on-tap="_editEntry"
              title="[[i18n('cloudProviders.edit')]]"
            ></paper-icon-button>
            <paper-icon-button
              name="delete"
              icon="nuxeo:delete"
              on-tap="_deleteEntry"
              title="[[i18n('cloudProviders.delete')]]"
            ></paper-icon-button>
          </template>
        </nuxeo-data-table-column>
      </nuxeo-data-table>
    </nuxeo-card>

    <nuxeo-dialog id="dialog" with-backdrop>
      <h2>[[_computeDialogHeading(_isNew)]]</h2>
      <iron-form id="form">
        <form>
          <nuxeo-input
            required
            label="[[i18n('cloudProviderEdit.serviceName')]]"
            name="serviceName"
            value="{{_selectedEntry.serviceName}}"
          >
          </nuxeo-input>

          <nuxeo-input
            label="[[i18n('cloudProviderEdit.description')]]"
            name="description"
            value="{{_selectedEntry.description}}"
          >
          </nuxeo-input>

          <nuxeo-input
            label="[[i18n('cloudProviderEdit.clientId')]]"
            name="clientId"
            value="{{_selectedEntry.clientId}}"
          >
          </nuxeo-input>

          <nuxeo-input
            label="[[i18n('cloudProviderEdit.clientSecret')]]"
            name="clientSecret"
            value="{{_selectedEntry.clientSecret}}"
          >
          </nuxeo-input>

          <nuxeo-input
            label="[[i18n('cloudProviderEdit.authorizationServerURL')]]"
            name="authorizationServerURL"
            pattern="(http[s]?:\\/\\/).*"
            value="{{_selectedEntry.authorizationServerURL}}"
          >
          </nuxeo-input>

          <nuxeo-input
            label="[[i18n('cloudProviderEdit.tokenServerURL')]]"
            name="tokenServerURL"
            pattern="(http[s]?:\\/\\/).*"
            value="{{_selectedEntry.tokenServerURL}}"
          >
          </nuxeo-input>

          <nuxeo-input
            label="[[i18n('cloudProviderEdit.userAuthorizationURL')]]"
            name="userAuthorizationURL"
            pattern="(http[s]?:\\/\\/).*"
            value="{{_selectedEntry.userAuthorizationURL}}"
          >
          </nuxeo-input>

          <nuxeo-input label="[[i18n('cloudProviderEdit.scopes')]]" name="scopes" value="{{_selectedEntry.scopes}}">
          </nuxeo-input>

          <paper-checkbox noink id="isEnabled" checked="{{_selectedEntry.isEnabled}}">
            [[i18n('cloudProviderEdit.isEnabled')]]
          </paper-checkbox>
        </form>
      </iron-form>
      <div class="buttons">
        <paper-button id="cancel" name="cancel" noink class="secondary" dialog-dismiss
          >[[i18n('command.cancel')]]</paper-button
        >
        <paper-button id="save" name="save" noink class="primary" on-tap="_save">[[i18n('command.save')]]</paper-button>
      </div>
    </nuxeo-dialog>
  `,is:"nuxeo-cloud-providers",behaviors:[u.M,r.e],properties:{_selectedEntry:{type:Object},oauth2Providers:{type:Array,value:[]},_isNew:{type:Boolean},_selectedServiceName:{type:String}},refresh(){this.$.oauth.path=S,this.$.oauth.get().then((e=>{this.oauth2Providers=e.entries,this.async(this.$.table.$.list.notifyResize.bind(this.$.table.$.list),1e3)}))},_editEntry(e){this._isNew=!1,this._selectedEntry=JSON.parse(JSON.stringify(e.target.parentNode.item)),this._selectedServiceName=this._selectedEntry.serviceName,Array.isArray(this._selectedEntry.scopes)&&(this._selectedEntry.scopes=this._selectedEntry.scopes.join()),this.$.dialog.toggle()},_addEntry(){this._isNew=!0,this._selectedEntry={"entity-type":"nuxeoOAuth2ServiceProvider",scopes:"",isEnabled:!1},this.$.dialog.toggle()},_save(){this.$.form.validate()&&(this._selectedEntry.scopes=this._selectedEntry.scopes?this._selectedEntry.scopes.split(","):[],this.$.oauth.data=this._selectedEntry,this._isNew?this._create(this._selectedEntry):this._update(this._selectedServiceName,this._selectedEntry))},_create(e){this.$.oauth.path=S,this.$.oauth.data=e,this.$.oauth.post().then((()=>{this.refresh(),this.$.dialog.toggle(),this.notify({message:this.i18n("cloudProviders.successfullyCreated")})}),(e=>{this.notify({message:`${this.i18n("label.error").toUpperCase()}: ${e.message&&e.message.length>0?e.message:this.i18n("cloudProviders.errorCreating")}`})}))},_update(e,t){this.$.oauth.path=S+e,this.$.oauth.data=t,this.$.oauth.put().then((()=>{this.$.dialog.toggle(),this.notify({message:this.i18n("cloudProviders.successfullyEdited")}),this.refresh()}),(e=>{this.notify({message:`${this.i18n("label.error").toUpperCase()}: ${e.message&&e.message.length>0?e.message:this.i18n("cloudProviders.errorEditing")}`})}))},_deleteEntry(e){if(window.confirm(this.i18n("cloudProviders.confirmDelete"))){const{item:t}=e.target.parentNode;this.$.oauth.path=S+t.serviceName,this.$.oauth.remove().then((()=>{this.refresh(),this.notify({message:this.i18n("cloudProviders.successfullyDeleted")})}),(()=>{this.notify({message:`${this.i18n("label.error").toUpperCase()}: ${this.i18n("cloudProviders.errorDeleting")}`})}))}},_computeDialogHeading(){return this.i18n(this._isNew?"cloudProviders.popup.addEntry":"cloudProviders.popup.editEntry")}});var T=i(10009);const A="oauth2/token/client/";class F extends((0,D.P)([T.H,r.e],Nuxeo.Element)){static get template(){return h.d`
    <style include="nuxeo-styles">
      nuxeo-data-table {
        height: calc(20vh - 172px);
      }
    </style>
    
    <nuxeo-data-table
      name="table"
      icon="nuxeo:view-list"
      empty-label="[[i18n('cloudTokens.emptyResult')]]"
      items="[[tokens]]"
    >
      <nuxeo-data-table-column name="[[i18n('cloudTokens.nuxeoLogin')]]" field="nuxeoLogin">
        <template>
          <span>[[item.nuxeoLogin]]</span>
        </template>
      </nuxeo-data-table-column>

      <nuxeo-data-table-column name="[[i18n('cloudTokens.serviceLogin')]]" field="serviceLogin">
        <template>
          <span>[[item.serviceLogin]]</span>
        </template>
      </nuxeo-data-table-column>

      <nuxeo-data-table-column name="[[i18n('cloudTokens.creationDate')]]" field="creationDate">
        <template>
          <nuxeo-date datetime="[[item.creationDate]]"></nuxeo-date>
        </template>
      </nuxeo-data-table-column>

      <nuxeo-data-table-column name="[[i18n(col.name)]]" key="[[col.key]]">
        <template>
          <paper-icon-button
            name="edit"
            icon="nuxeo:edit"
            on-tap="_editEntry"
            title="[[i18n('cloudTokens.edit')]]"
          ></paper-icon-button>
          <paper-icon-button
            name="delete"
            icon="nuxeo:delete"
            on-tap="_deleteEntry"
            title="[[i18n('cloudTokens.delete')]]"
          ></paper-icon-button>
        </template>
      </nuxeo-data-table-column>
    </nuxeo-data-table>

    <nuxeo-dialog id="dialog" with-backdrop>
      <h2>[[i18n('cloudTokens.popup.editEntry')]]</h2>
        <iron-form id="form">
          <form>

            <nuxeo-input
              disabled
              label="[[i18n('cloudTokenEdit.nuxeoLogin')]]"
              name="description"
              value="{{_selectedEntry.nuxeoLogin}}"
            >
            </nuxeo-input>

            <nuxeo-input
              required
              label="[[i18n('cloudTokenEdit.serviceLogin')]]"
              name="clientId"
              value="{{_selectedEntry.serviceLogin}}"
            >
            </nuxeo-input>

            <nuxeo-date-picker
              name="creationDate"
              required
              label="[[i18n('cloudTokenEdit.creationDate')]]"
              value="{{_selectedEntry.creationDate}}"
            >
            </nuxeo-date-picker>

            </nuxeo-user-suggestion>
          </form>
        </iron-form>
      <div class="buttons">
        <paper-button id="cancel" name="cancel" noink class="secondary" dialog-dismiss>
          [[i18n('command.cancel')]]
        </paper-button>
        <paper-button id="save" name="save" noink class="primary" on-tap="_save">
          [[i18n('command.save')]]
        </paper-button>
      </div>
    </nuxeo-dialog>
  `}static get is(){return"nuxeo-oauth2-provided-tokens"}getDefaultPath(){return"oauth2/token/AS_PROVIDER"}getUpdatePath(){return A+this._selectedEntry.clientId}getDeletePath(e){return A+e.clientId}}customElements.define(F.is,F),Nuxeo.OAuth2ProvidedTokens=F,i(93629);class z extends((0,D.P)([l.mB],Nuxeo.Element)){static get template(){return h.d`
      <nuxeo-card heading="[[i18n('cloudTokens.OAuth2Tokens.provided')]]">
        <nuxeo-oauth2-provided-tokens id="providedTokens" />
      </nuxeo-card>

      <nuxeo-card heading="[[i18n('cloudTokens.OAuth2Tokens.consumed')]]">
        <nuxeo-oauth2-consumed-tokens id="consumedTokens" />
      </nuxeo-card>
    `}static get is(){return"nuxeo-cloud-tokens"}refresh(){this.$.providedTokens.refresh(),this.$.consumedTokens.refresh()}}customElements.define(z.is,z),Nuxeo.CloudTokens=z,(0,m.k)({_template:h.d`
    <style include="nuxeo-styles iron-flex">
      /* document views items (pills) */
      #documentViewsItems {
        @apply --layout-horizontal;
        --paper-listbox-background-color: transparent;
      }

      paper-tabs {
        height: auto;
        display: flex;
        padding: 0;
        border-bottom: none transparent 0px;
        font-size: inherit;
        font-weight: 400;
        --paper-tabs-selection-bar-color: transparent;
      }

      @media (max-width: 1024px) {
        paper-listbox {
          padding-right: 7rem;
        }
      }
    </style>
    <nuxeo-page>
      <div slot="header">
        <span class="flex">[[i18n('cloudServices.heading')]]</span>
      </div>
      <div slot="tabs">
        <paper-tabs
          autoselect
          attr-for-selected="name"
          id="documentViewsItems"
          noink
          no-slide
          selected="{{selectedTab}}"
          selectable="nuxeo-page-item"
        >
          <nuxeo-page-item name="providers" label="cloudServices.providers"></nuxeo-page-item>
          <nuxeo-page-item name="tokens" label="cloudServices.tokens"></nuxeo-page-item>
          <nuxeo-page-item name="consumers" label="cloudServices.consumers"></nuxeo-page-item>
        </paper-tabs>
      </div>
      <div>
        <iron-pages selected="[[selectedTab]]" attr-for-selected="name" selected-item="{{page}}">
          <nuxeo-cloud-providers id="providers" name="providers"></nuxeo-cloud-providers>
          <nuxeo-cloud-tokens id="tokens" name="tokens"></nuxeo-cloud-tokens>
          <nuxeo-cloud-consumers id="consumers" name="consumers"></nuxeo-cloud-consumers>
        </iron-pages>
      </div>
    </nuxeo-page>
  `,is:"nuxeo-cloud-services",behaviors:[l.mB],properties:{visible:{type:Boolean},selectedTab:{type:String,value:"providers"},page:{type:Object}},observers:["refresh(visible, page)"],refresh(){this.page&&this.visible&&this.page.refresh()}}),i(77605),i(62978),i(874),i(22464),i(67745),(0,m.k)({_template:h.d`
    <style>
      :host {
        outline: none;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
      }

      a {
        @apply --nuxeo-link;
      }

      .bubbleBox {
        display: block;
        margin: 0 0.4em 0.8em;
        position: relative;
        width: 220px;
        height: 260px;
        background-color: var(--nuxeo-box);
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.04);
        padding: 0;
        filter: 0.1s ease-out, filter 0.1s ease-out;
        -webkit-filter: 0.1s ease-out, filter 0.1s ease-out;
        border: 2px solid transparent;
      }

      .bubbleBox:hover,
      .bubbleBox:focus {
        z-index: 500;
        border: 2px solid var(--nuxeo-link-hover-color);
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.04);
      }

      .bubbleBox .title {
        margin-bottom: 0.4em;
      }

      .bubbleBox:hover .title {
        color: var(--nuxeo-link-hover-color);
      }

      .thumbnailContainer {
        background-color: rgba(0, 0, 0, 0.1);
        width: 100%;
        height: 190px;
        position: relative;
      }

      .thumbnailContainer img {
        height: auto;
        width: auto;
        max-height: 100%;
        max-width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }

      .dataContainer {
        padding: 0.3em 0.8em;
      }

      .dataContainer p {
        margin: 0 0 0.4em;
        font-size: 0.75rem;
      }

      .bubbleBox .select {
        display: none;
        position: absolute;
        top: 1rem;
        left: 1rem;
        border: 2px solid #ddd;
        background-color: var(--nuxeo-box);
        z-index: 2;
        border-radius: 3em;
      }

      .select paper-icon-button {
        margin: 0;
        padding: 0.3em;
        box-sizing: border-box;
      }

      .bubbleBox .select,
      .select paper-icon-button {
        width: 2.5em;
        height: 2.5em;
      }

      .select:hover paper-icon-button {
        color: #fff;
      }

      .title {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: block;
      }

      .bubbleBox .actions {
        display: none;
        background-color: var(--nuxeo-box);
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        min-height: 2.5em;
      }

      .actions paper-icon-button iron-icon {
        @apply --nuxeo-action;
      }

      .actions paper-icon-button:hover iron-icon {
        @apply --nuxeo-action-hover;
      }

      .bubbleBox:hover .actions,
      .bubbleBox:hover .select,
      .bubbleBox[selection-mode] .select {
        display: block;
      }

      .bubbleBox:hover .select:hover {
        border: 2px solid var(--nuxeo-button-primary);
        background-color: var(--nuxeo-button-primary);
      }

      :host([selected]) .bubbleBox .select,
      :host([selected]) .bubbleBox:hover .select:hover {
        border: 2px solid var(--nuxeo-grid-selected);
        background-color: var(--nuxeo-grid-selected);
        display: block;
      }

      :host([selected]) .select paper-icon-button {
        color: #fff;
      }

      :host([selected]) .bubbleBox {
        border: 2px solid var(--nuxeo-grid-selected);
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.04);
      }

      :host(.droptarget-hover) .bubbleBox {
        border: 2px dashed var(--nuxeo-grid-selected);
      }
    </style>

    <div class="bubbleBox grid-box" selection-mode$="[[selectionMode]]">
      <div class="thumbnailContainer" on-tap="handleClick">
        <img src="[[_thumbnail(doc)]]" alt$="[[doc.title]]" />
      </div>
      <template is="dom-if" if="[[_hasDocument(doc)]]">
        <a class="title" href$="[[urlFor(doc)]]" on-tap="handleClick">
          <div class="dataContainer">
            <div class="title" id="title">[[doc.title]]</div>
            <nuxeo-tag>[[formatDocType(doc.type)]]</nuxeo-tag>
            <nuxeo-tooltip for="title">[[doc.title]]</nuxeo-tooltip>
          </div>
        </a>
        <div class="actions">
          <nuxeo-favorites-toggle-button document="[[doc]]"></nuxeo-favorites-toggle-button>
          <nuxeo-download-button document="[[doc]]"></nuxeo-download-button>
        </div>
        <div class="select">
          <paper-icon-button
            noink
            icon="icons:check"
            title="[[_computeTitle(doc)]]"
            on-tap="_onCheckBoxTap"
            role="checkbox"
            aria-checked="[[selected]]"
          ></paper-icon-button>
        </div>
      </template>
    </div>
  `,is:"nuxeo-document-grid-thumbnail",behaviors:[r.e,d.N],properties:{doc:{type:Object,notify:!0},offset:{type:Number,value:-1},selected:{type:Boolean,value:!1,reflectToAttribute:!0},selectedItems:{type:Array,value:[]},index:{type:Number}},observers:["_selectedItemsChanged(selectedItems.splices)"],_thumbnail:e=>e&&e.uid&&e.contextParameters&&e.contextParameters.thumbnail&&e.contextParameters.thumbnail.url?e.contextParameters.thumbnail.url:"",handleClick(e){this.selectionMode?this._toogleSelect(e):e.ctrlKey||e.shiftKey||e.metaKey||1===e.button||this.fire("navigate",{item:this.doc,index:this.index})},_onCheckBoxTap(e){this._toogleSelect(e)},_toogleSelect(e){this.selected=!this.selected,this.fire("selected",{index:this.index,shiftKey:e.detail.sourceEvent.shiftKey})},_selectedItemsChanged(){this.selectionMode=this.selectedItems&&this.selectedItems.length>0},_hasDocument(){return this.doc&&this.doc.uid},_computeTitle(e){return`${e&&e.title}${this.i18n&&this.i18n("command.select")}`}}),(0,m.k)({_template:h.d`
    <style include="nuxeo-styles">
      nuxeo-data-table {
        min-height: calc(100vh - 9.3em);
      }

      nuxeo-data-grid,
      nuxeo-data-list {
        display: block;
        position: relative;
      }

      nuxeo-data-grid,
      nuxeo-data-list {
        min-height: calc(100vh - 8em);
      }

      .ellipsis {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: block;
      }

      .capitalize {
        text-transform: capitalize;
      }
    </style>

    <nuxeo-results
      id="results"
      display-mode="table"
      name="[[name]]"
      nx-provider="[[nxProvider]]"
      selected-items="{{selectedItems}}"
      view="{{view}}"
      display-quick-filters
    >
      <slot name="selectionActions" slot="selectionActions"></slot>

      <nuxeo-data-grid
        name="grid"
        icon="nuxeo:view-thumbnails"
        empty-label="[[emptyLabel]]"
        empty-label-when-filtered="[[emptyLabelWhenFiltered]]"
        selection-enabled
      >
        <template>
          <nuxeo-document-grid-thumbnail
            class="grid-box"
            tabindex$="{{tabIndex}}"
            selected$="{{selected}}"
            selected-items="[[selectedItems]]"
            index="[[index]]"
            doc="[[item]]"
            on-navigate="_navigate"
          >
          </nuxeo-document-grid-thumbnail>
        </template>
      </nuxeo-data-grid>

      <nuxeo-data-table
        name="table"
        icon="nuxeo:view-list"
        settings-enabled
        empty-label="[[emptyLabel]]"
        empty-label-when-filtered="[[emptyLabelWhenFiltered]]"
        selection-enabled
        on-row-clicked="_navigate"
      >
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.title')]]"
          field="dc:title"
          sort-by="dc:title"
          flex="100"
        >
          <template>
            <nuxeo-document-thumbnail document="[[item]]"></nuxeo-document-thumbnail>
            <a class="title ellipsis" href$="[[urlFor(item)]]" on-tap="_navigateLink" data-index="[[index]]">
              [[item.title]]
            </a>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column name="[[i18n('documentContentView.datatable.header.type')]]" field="type" hidden>
          <template>
            <nuxeo-tag>[[formatDocType(item.type)]]</nuxeo-tag>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.modified')]]"
          field="dc:modified"
          sort-by="dc:modified"
          flex="50"
        >
          <template>
            <nuxeo-date datetime="[[item.properties.dc:modified]]"></nuxeo-date>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.lastContributor')]]"
          field="dc:lastContributor"
          sort-by="dc:lastContributor"
          flex="50"
        >
          <template>
            <nuxeo-user-tag user="[[item.properties.dc:lastContributor]]"></nuxeo-user-tag>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.state')]]"
          field="currentLifeCycleState"
          hidden
        >
          <template><span class="capitalize">[[formatLifecycleState(item.state)]]</span></template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.version')]]"
          field="versionLabel"
          hidden
        >
          <template>
            [[formatVersion(item)]]
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.created')]]"
          field="dc:created"
          sort-by="dc:created"
          flex="50"
          hidden
        >
          <template>
            <nuxeo-date datetime="[[item.properties.dc:created]]"></nuxeo-date>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.author')]]"
          field="dc:creator"
          sort-by="dc:creator"
          hidden
        >
          <template>
            <nuxeo-user-tag user="[[item.properties.dc:creator]]"></nuxeo-user-tag>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.nature')]]"
          field="dc:nature"
          hidden
        >
          <template>
            <nuxeo-tag hidden$="[[!item.properties.dc:nature]]">
              [[formatDirectory(item.properties.dc:nature)]]
            </nuxeo-tag>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.coverage')]]"
          field="dc:coverage"
          hidden
        >
          <template>
            <nuxeo-tag hidden$="[[!item.properties.dc:coverage]]">
              [[formatDirectory(item.properties.dc:coverage)]]
            </nuxeo-tag>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.subjects')]]"
          field="dc:subjects"
          hidden
          flex="60"
        >
          <template>
            <template is="dom-repeat" items="[[item.properties.dc:subjects]]" as="subject">
              <nuxeo-tag>[[formatDirectory(subject)]]</nuxeo-tag>
            </template>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column name="[[i18n('documentContentView.datatable.header.flags')]]" flex="50" hidden>
          <template>
            <template is="dom-if" if="[[item.isRecord]]">
              <iron-icon id="retainIcon" icon="nuxeo:retain"></iron-icon>
              <nuxeo-tooltip for="retainIcon">[[i18n('documentContentView.datatable.flags.retention')]]</nuxeo-tooltip>
            </template>
            <template is="dom-if" if="[[item.hasLegalHold]]">
              <iron-icon id="legalHoldIcon" icon="nuxeo:hold"></iron-icon>
              <nuxeo-tooltip for="legalHoldIcon">
                [[i18n('documentContentView.datatable.flags.legalHold')]]
              </nuxeo-tooltip>
            </template>
            <template is="dom-if" if="[[isFavorite(item)]]">
              <iron-icon id="favorite" icon="nuxeo:favorites"></iron-icon>
              <nuxeo-tooltip for="favorite">
                [[i18n('documentContentView.datatable.flags.favorite')]]
              </nuxeo-tooltip>
            </template>
            <template is="dom-if" if="[[_contentStoredInColdStorage(item)]]">
              <iron-icon id="coldStorage" icon="nuxeo:coldstorage"></iron-icon>
              <nuxeo-tooltip for="coldStorage">
                [[i18n('documentContentView.datatable.flags.coldStorage')]]
              </nuxeo-tooltip>
            </template>
          </template>
        </nuxeo-data-table-column>
      </nuxeo-data-table>
    </nuxeo-results>
  `,is:"nuxeo-default-results",behaviors:[d.N,r.e,s.q],properties:{nxProvider:Object,name:String,selectedItems:{type:Array,notify:!0},view:{type:Object,notify:!0},emptyLabel:String,emptyLabelWhenFiltered:String},_refreshAndFetch(){this.$.results._refreshAndFetch()},get items(){return this.shadowRoot?this.shadowRoot.querySelector("#results").items:null},_navigate(e){this.fire("navigate",{doc:(e.model||e.detail).item,index:(e.model||e.detail).index}),e.stopPropagation()},_navigateLink(e){e.detail={item:this.items[e.target.dataIndex],index:e.target.dataIndex},this._navigate(e)},_contentStoredInColdStorage(e){return this.hasFacet(e,"ColdStorage")&&e.properties&&e.properties["coldstorage:coldContent"]}});var E=i(9325);(0,m.k)({_template:h.d`
    <style include="nuxeo-styles">
      :host {
        display: block;
      }

      .results {
        @apply --layout-vertical;
        @apply --layout-flex;
        /* keep compat with deprecated --nuxeo-document-content-min-height css variable */
        --nuxeo-results-view-height: var(
          --nuxeo-document-content-height,
          var(--nuxeo-document-content-min-height, calc(100vh - 216px - var(--nuxeo-app-top)))
        );
        margin-bottom: var(--nuxeo-document-content-margin-bottom, 0);
      }

      .results.dragging {
        border: 2px dashed var(--nuxeo-primary-color);
      }

      .ellipsis {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: block;
        width: calc(100% - 38px);
      }

      .capitalize {
        text-transform: capitalize;
      }

      nuxeo-tag {
        margin-right: 2px;
      }

      iron-icon {
        color: var(--nuxeo-primary-color);
        cursor: default;
      }
    </style>

    <nuxeo-connection id="nxcon"></nuxeo-connection>

    <nuxeo-page-provider
      id="nxProvider"
      provider="[[provider]]"
      page-size="[[pageSize]]"
      aggregations="{{aggregations}}"
      enrichers="[[enrichers]]"
      params="[[params]]"
      schemas="[[schemas]]"
      headers="[[headers]]"
      fetch-aggregates
    >
    </nuxeo-page-provider>

    <nuxeo-results
      id="results"
      display-mode="table"
      name="[[document.uid]]"
      nx-provider="[[nxProvider]]"
      selected-items="{{selectedItems}}"
      document="[[document]]"
      display-quick-filters
      display-sort="[[_canSort(document, sortOptions)]]"
      sort-options="[[sortOptions]]"
    >
      <!-- Grid view -->
      <nuxeo-data-grid
        name="grid"
        icon="nuxeo:view-thumbnails"
        class="results"
        empty-label="[[emptyLabel]]"
        empty-label-when-filtered="[[emptyLabelWhenFiltered]]"
        selection-enabled
        draggable$="[[_hasWritePermission(document)]]"
        drop-target-filter="[[_dropTargetFilter]]"
      >
        <template>
          <nuxeo-document-grid-thumbnail
            class="grid-box"
            tabindex$="{{tabIndex}}"
            selected$="{{selected}}"
            index="[[index]]"
            doc="[[item]]"
            on-navigate="_navigate"
            selected-items="[[selectedItems]]"
          >
          </nuxeo-document-grid-thumbnail>
        </template>
      </nuxeo-data-grid>

      <!-- Table view -->
      <nuxeo-data-table
        name="table"
        icon="nuxeo:view-list"
        class="results"
        settings-enabled
        empty-label="[[emptyLabel]]"
        empty-label-when-filtered="[[emptyLabelWhenFiltered]]"
        selection-enabled
        on-row-clicked="_navigate"
        draggable$="[[_hasWritePermission(document)]]"
        drop-target-filter="[[_dropTargetFilter]]"
      >
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.title')]]"
          field="dc:title"
          sort-by="[[_displaySort(document, 'dc:title')]]"
          filter-by="title"
          flex="100"
          filter-expression="$term*"
        >
          <template>
            <nuxeo-document-thumbnail document="[[item]]"></nuxeo-document-thumbnail>
            <a class="title ellipsis" href$="[[urlFor(item)]]" on-tap="_navigate">[[item.title]]</a>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column name="[[i18n('documentContentView.datatable.header.type')]]" field="type" hidden>
          <template>
            <nuxeo-tag>[[formatDocType(item.type)]]</nuxeo-tag>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.modified')]]"
          field="dc:modified"
          sort-by="[[_displaySort(document, 'dc:modified')]]"
          filter-by="dc_modified_agg"
          flex="50"
        >
          <template is="header">
            <nuxeo-dropdown-aggregation
              placeholder="[[i18n('documentContentView.datatable.header.modified')]]"
              data="[[aggregations.dc_modified_agg]]"
              value="{{column.filterValue}}"
              multiple
            >
            </nuxeo-dropdown-aggregation>
          </template>
          <template>
            <nuxeo-date datetime="[[item.properties.dc:modified]]"></nuxeo-date>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.lastContributor')]]"
          filter-by="dc_last_contributor_agg"
          field="dc:lastContributor"
          sort-by="[[_displaySort(document, 'dc:lastContributor')]]"
          flex="50"
        >
          <template is="header">
            <nuxeo-dropdown-aggregation
              placeholder="[[i18n('documentContentView.datatable.header.lastContributor')]]"
              data="[[aggregations.dc_last_contributor_agg]]"
              value="{{column.filterValue}}"
              multiple
            >
            </nuxeo-dropdown-aggregation>
          </template>
          <template>
            <nuxeo-user-tag user="[[item.properties.dc:lastContributor]]"></nuxeo-user-tag>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.state')]]"
          field="currentLifeCycleState"
          hidden
        >
          <template><span class="capitalize">[[formatLifecycleState(item.state)]]</span></template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.version')]]"
          field="versionLabel"
          hidden
        >
          <template>
            [[formatVersion(item)]]
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.created')]]"
          field="dc:created"
          sort-by="[[_displaySort(document, 'dc:created')]]"
          flex="50"
          hidden
        >
          <template>
            <nuxeo-date datetime="[[item.properties.dc:created]]"></nuxeo-date>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.author')]]"
          field="dc:creator"
          sort-by="[[_displaySort(document, 'dc:creator')]]"
          hidden
        >
          <template>
            <nuxeo-user-tag user="[[item.properties.dc:creator]]"></nuxeo-user-tag>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.nature')]]"
          field="dc:nature"
          hidden
        >
          <template>
            <nuxeo-tag hidden$="[[!item.properties.dc:nature]]">
              [[formatDirectory(item.properties.dc:nature)]]
            </nuxeo-tag>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.coverage')]]"
          field="dc:coverage"
          hidden
        >
          <template>
            <nuxeo-tag hidden$="[[!item.properties.dc:coverage]]">
              [[formatDirectory(item.properties.dc:coverage)]]
            </nuxeo-tag>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.subjects')]]"
          field="dc:subjects"
          hidden
          flex="60"
          overflow="auto"
        >
          <template>
            <template is="dom-repeat" items="[[item.properties.dc:subjects]]" as="subject">
              <nuxeo-tag>[[formatDirectory(subject)]]</nuxeo-tag>
            </template>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column name="[[i18n('documentContentView.datatable.header.flags')]]" flex="50" hidden>
          <template>
            <template is="dom-if" if="[[item.isRecord]]">
              <iron-icon id="retainIcon" icon="nuxeo:retain"></iron-icon>
              <nuxeo-tooltip for="retainIcon">[[i18n('documentContentView.datatable.flags.retention')]]</nuxeo-tooltip>
            </template>
            <template is="dom-if" if="[[item.hasLegalHold]]">
              <iron-icon id="legalHoldIcon" icon="nuxeo:hold"></iron-icon>
              <nuxeo-tooltip for="legalHoldIcon">
                [[i18n('documentContentView.datatable.flags.legalHold')]]
              </nuxeo-tooltip>
            </template>
            <template is="dom-if" if="[[isFavorite(item)]]">
              <iron-icon id="favorite" icon="nuxeo:favorites"></iron-icon>
              <nuxeo-tooltip for="favorite">
                [[i18n('documentContentView.datatable.flags.favorite')]]
              </nuxeo-tooltip>
            </template>
            <template is="dom-if" if="[[_contentStoredInColdStorage(item)]]">
              <iron-icon id="coldStorage" icon="nuxeo:coldstorage"></iron-icon>
              <nuxeo-tooltip for="coldStorage">
                [[i18n('documentContentView.datatable.flags.coldStorage')]]
              </nuxeo-tooltip>
            </template>
          </template>
        </nuxeo-data-table-column>
      </nuxeo-data-table>
    </nuxeo-results>
  `,is:"nuxeo-document-content",behaviors:[E.k,s.q],properties:{params:{type:Object},provider:{type:String,value:"advanced_document_content"},pageSize:{type:Number,value:40},schemas:{type:String,value:"dublincore,common,uid,file"},enrichers:{type:String,value:"thumbnail, permissions, favorites"},headers:{type:String,value:{"fetch-document":"properties","translate-directoryEntry":"label"}},emptyLabel:String,emptyLabelWhenFiltered:String},_contentStoredInColdStorage(e){return this.hasFacet(e,"ColdStorage")&&e.properties&&e.properties["coldstorage:coldContent"]}}),(0,m.k)({_template:h.d`
    <style include="nuxeo-styles">
      :host {
        display: block;
      }

      nuxeo-tag {
        margin-right: 2px;
      }

      .results {
        @apply --layout-vertical;
        @apply --layout-flex;
        /* keep compat with deprecated --nuxeo-document-trash-content-min-height css variable */
        --nuxeo-results-view-height: var(
          --nuxeo-document-trash-content-height,
          var(--nuxeo-document-trash-content-min-height, calc(100vh - 168px - var(--nuxeo-app-top, 0)))
        );
        margin-bottom: var(--nuxeo-document-trash-content-margin-bottom, 0);
      }

      .ellipsis {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: block;
        width: calc(100% - 38px);
      }

      .capitalize {
        text-transform: capitalize;
      }
    </style>

    <nuxeo-connection id="nxcon"></nuxeo-connection>

    <nuxeo-operation
      id="opEmptyTrash"
      op="Document.EmptyTrash"
      params='{"parent": "[[document.uid]]"}'
      sync-indexing
    ></nuxeo-operation>

    <nuxeo-page-provider
      id="nxProvider"
      provider="[[provider]]"
      page-size="[[pageSize]]"
      aggregations="{{aggregations}}"
      enrichers="[[enrichers]]"
      params="[[params]]"
      schemas="[[schemas]]"
      headers="[[headers]]"
      fetch-aggregates
    >
    </nuxeo-page-provider>

    <nuxeo-results
      id="results"
      display-mode="table"
      name="[[document.uid]]-trashed"
      nx-provider="[[nxProvider]]"
      selected-items="{{selectedItems}}"
      document="[[document]]"
      display-quick-filters
      display-sort
      action-context="{{actionContext}}"
      sort-options="[[sortOptions]]"
    >
      <div slot="actions">
        <template is="dom-if" if="[[hasPermission(document, 'RemoveChildren')]]">
          <paper-button noink on-tap="_emptyTrash" class="text small"
            >[[i18n('documentTrashContent.emptyTrash')]]</paper-button
          >
        </template>
      </div>

      <nuxeo-actions-menu slot="selectionActions">
        <nuxeo-slot name="TRASH_RESULTS_SELECTION_ACTIONS" model="[[actionContext]]"></nuxeo-slot>
      </nuxeo-actions-menu>

      <!-- Grid view -->
      <nuxeo-data-grid
        name="grid"
        icon="nuxeo:view-thumbnails"
        class="results"
        empty-label="[[emptyLabel]]"
        empty-label-when-filtered="[[emptyLabelWhenFiltered]]"
        selection-enabled
      >
        <template>
          <nuxeo-document-grid-thumbnail
            class="grid-box"
            tabindex$="{{tabIndex}}"
            selected$="{{selected}}"
            index="[[index]]"
            doc="[[item]]"
            on-navigate="_navigate"
            selected-items="[[selectedItems]]"
          >
          </nuxeo-document-grid-thumbnail>
        </template>
      </nuxeo-data-grid>

      <!-- Table view -->
      <nuxeo-data-table
        name="table"
        icon="nuxeo:view-list"
        class="results"
        settings-enabled
        empty-label="[[emptyLabel]]"
        empty-label-when-filtered="[[emptyLabelWhenFiltered]]"
        selection-enabled
        on-row-clicked="_navigate"
      >
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.title')]]"
          field="dc:title"
          sort-by="dc:title"
          filter-by="title"
          flex="100"
          filter-expression="$term*"
        >
          <template>
            <nuxeo-document-thumbnail document="[[item]]"></nuxeo-document-thumbnail>
            <a class="title ellipsis" href$="[[urlFor(item)]]" on-tap="_navigate">[[item.title]]</a>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column name="[[i18n('documentContentView.datatable.header.type')]]" field="type" hidden>
          <template>
            <nuxeo-tag>[[item.type]]</nuxeo-tag>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.modified')]]"
          field="dc:modified"
          sort-by="dc:modified"
          filter-by="dc_modified_agg"
          flex="50"
        >
          <template is="header">
            <nuxeo-dropdown-aggregation
              placeholder="[[i18n('documentContentView.datatable.header.modified')]]"
              data="[[aggregations.dc_modified_agg]]"
              value="{{column.filterValue}}"
              multiple
            >
            </nuxeo-dropdown-aggregation>
          </template>
          <template>
            <nuxeo-date datetime="[[item.properties.dc:modified]]"></nuxeo-date>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.lastContributor')]]"
          filter-by="dc_last_contributor_agg"
          field="dc:lastContributor"
          sort-by="dc:lastContributor"
          flex="50"
        >
          <template is="header">
            <nuxeo-dropdown-aggregation
              placeholder="[[i18n('documentContentView.datatable.header.lastContributor')]]"
              data="[[aggregations.dc_last_contributor_agg]]"
              value="{{column.filterValue}}"
              multiple
            >
            </nuxeo-dropdown-aggregation>
          </template>
          <template>
            <nuxeo-user-tag user="[[item.properties.dc:lastContributor]]"></nuxeo-user-tag>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.state')]]"
          field="currentLifeCycleState"
          hidden
        >
          <template><span class="capitalize">[[formatLifecycleState(item.state)]]</span></template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.version')]]"
          field="versionLabel"
          hidden
        >
          <template>
            [[formatVersion(item)]]
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.created')]]"
          field="dc:created"
          sort-by="dc:created"
          flex="50"
          hidden
        >
          <template>
            <nuxeo-date datetime="[[item.properties.dc:created]]"></nuxeo-date>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.author')]]"
          field="dc:creator"
          sort-by="dc:creator"
          hidden
        >
          <template>
            <nuxeo-user-tag user="[[item.properties.dc:creator]]"></nuxeo-user-tag>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.nature')]]"
          field="dc:nature"
          hidden
        >
          <template>
            <nuxeo-tag hidden$="[[!item.properties.dc:nature]]">
              [[formatDirectory(item.properties.dc:nature)]]
            </nuxeo-tag>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.coverage')]]"
          field="dc:coverage"
          hidden
        >
          <template>
            <nuxeo-tag hidden$="[[!item.properties.dc:coverage]]">
              [[formatDirectory(item.properties.dc:coverage)]]
            </nuxeo-tag>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column
          name="[[i18n('documentContentView.datatable.header.subjects')]]"
          field="dc:subjects"
          hidden
          flex="60"
          overflow="auto"
        >
          <template>
            <template is="dom-repeat" items="[[item.properties.dc:subjects]]" as="subject">
              <nuxeo-tag>[[formatDirectory(subject)]]</nuxeo-tag>
            </template>
          </template>
        </nuxeo-data-table-column>
      </nuxeo-data-table>
    </nuxeo-results>
  `,is:"nuxeo-document-trash-content",behaviors:[u.M,E.k],properties:{provider:{type:String,value:"advanced_document_content"},pageSize:{type:Number,value:40},schemas:{type:String,value:"dublincore,common,uid,file"},enrichers:{type:String,value:"thumbnail, permissions"},headers:{type:String,value:{"fetch-document":"properties","translate-directoryEntry":"label"}},emptyLabel:String,emptyLabelWhenFiltered:String},_emptyTrash(){this.$.opEmptyTrash.execute().then((()=>{this.notify({message:this.i18n("documentTrashContent.emptyTrash.success")}),this._refresh()})).catch((e=>{if(this.notify({message:this.i18n("documentTrashContent.emptyTrash.error")}),404!==e.status)throw e}))},_computeParams:e=>e?{ecm_parentId:e.uid,ecm_trashed:!0}:{},_computeSortOptions(){return[{field:"dc:title",label:this.i18n("searchResults.sort.field.title"),order:"asc"},{field:"dc:created",label:this.i18n("searchResults.sort.field.created"),order:"asc",selected:!0},{field:"dc:modified",label:this.i18n("searchResults.sort.field.modified"),order:"desc"},{field:"dc:lastContributor",label:this.i18n("searchResults.sort.field.lastContributor"),order:"asc"}]}}),i(74542),(0,m.k)({_template:h.d`
    <style>
      .category {
        opacity: 0.7;
        font-size: 0.75rem;
        padding-right: 0.5rem;
      }

      .segment em {
        color: var(--nuxeo-result-highlight, #0066cc);
        font-weight: bold;
        font-style: normal;
        border-bottom: 1px solid var(--nuxeo-result-highlight, #0066cc);
      }

      .segment + .segment::before {
        display: inline-block;
        content: '...';
      }
    </style>

    <div class="highlights" id="highlights">
      <template is="dom-repeat" items="[[highlights]]" as="highlight">
        <div class="highlight">
          <span class="category">[[_highlightFieldLabel(highlight)]]</span>
          <span class="segments">
            <template is="dom-repeat" items="[[highlight.segments]]" as="segment">
              <span class="segment">
                <template is="dom-repeat" items="[[_segmentOc(segment)]]" as="segmentOc">
                  [[_preSegment(segmentOc)]]
                  <em>
                    [[_segment(segmentOc)]]
                  </em>
                  [[_postSegment(segmentOc)]]
                </template>
              </span>
            </template>
          </span>
          <div></div></div
      ></template>
    </div>
  `,is:"nuxeo-document-highlights",behaviors:[l.mB],properties:{highlights:{type:Array}},_highlightFieldLabel(e){return this.i18n(`searchResults.highlight.field.${e.field}`)},_preSegment(e){const t=e.indexOf("<em>");return t>-1?e.substring(0,t):e},_segment(e){const t=e.indexOf("<em>"),i=e.indexOf("</em>");return t>-1&&i>-1?e.substring(t+4,i):""},_segmentOc(e){const t=[];return e.split("<em>").forEach(((e,i)=>{t.push(i>0?`<em>${e}`:e)})),t},_postSegment(e){const t=e.indexOf("</em>");return t>-1?e.substring(t+5,e.length):""}}),(0,m.k)({_template:h.d`
    <style include="iron-flex iron-flex-alignment">
      :host {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
      }

      .listBox {
        display: block;
        margin: 0 0.4em 0.8em;
        position: relative;
        background-color: var(--nuxeo-box);
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.04);
        padding: 0;
        filter: 0.1s ease-out, filter 0.1s ease-out;
        -webkit-filter: 0.1s ease-out, filter 0.1s ease-out;
        border: 2px solid transparent;
      }

      .listBox:hover,
      .listBox:focus {
        border: 2px solid var(--nuxeo-link-hover-color);
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.04);
      }

      .listBox .title {
        margin-bottom: 0.4em;
      }

      .listBox:hover .title {
        color: var(--nuxeo-link-hover-color);
      }

      .thumbnailContainer {
        background-color: rgba(0, 0, 0, 0.1);
        width: 10rem;
        height: 10rem;
        position: relative;
      }

      .thumbnailContainer img {
        height: auto;
        width: auto;
        max-height: 100%;
        max-width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }

      .dataContainer {
        padding: 0.5rem 1rem;
      }

      .dataContainer p {
        margin: 0 0 0.4em;
        font-size: 0.75rem;
      }

      .listBox .select {
        display: none;
        position: absolute;
        top: 1rem;
        left: 1rem;
        border: 2px solid #ddd;
        background-color: var(--nuxeo-box);
        z-index: 2;
        border-radius: 3em;
      }

      .select paper-icon-button {
        margin: 0;
        padding: 0.3em;
        box-sizing: border-box;
      }

      .listBox .select,
      .select paper-icon-button {
        width: 2.5em;
        height: 2.5em;
      }

      .select:hover paper-icon-button {
        color: #fff;
      }

      .title {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: block;
      }

      .listBox .actions {
        display: none;
        background-color: var(--nuxeo-box);
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        min-height: 2.5em;
        width: 10rem;
      }

      .listBox:hover .actions,
      .listBox:hover .select,
      .listBox[selection-mode] .select {
        display: block;
      }

      .listBox:hover .select:hover {
        border: 2px solid var(--nuxeo-button-primary);
        background-color: var(--nuxeo-button-primary);
      }

      :host([selected]) .listBox .select,
      :host([selected]) .listBox:hover .select:hover {
        border: 2px solid var(--nuxeo-grid-selected);
        background-color: var(--nuxeo-grid-selected);
        display: block;
      }

      :host([selected]) .select paper-icon-button {
        color: #fff;
      }

      :host([selected]) .listBox {
        border: 2px solid var(--nuxeo-grid-selected);
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.04);
      }

      :host(.droptarget-hover) .listBox {
        border: 2px dashed var(--nuxeo-grid-selected);
      }

      .typeSelection paper-button {
        width: var(--nuxeo-document-creation-form-button-width, 128px);
        height: var(--nuxeo-document-creation-form-button-height, 128px);
        box-shadow: none;
        background-color: var(--input-background, rgba(0, 0, 0, 0.05));
      }

      nuxeo-document-highlights {
        font-size: 0.85rem;
      }

      .vignette {
        display: flex;
      }
    </style>

    <div class="listBox grid-box" selection-mode$="[[selectionMode]]">
      <div class="horizontal layout">
        <div class="vignette thumbnailContainer" on-tap="handleClick">
          <img src="[[_thumbnail(doc)]]" alt$="[[doc.title]]" />
        </div>
        <div class="dataContainer flex" on-tap="handleClick">
          <div class="horizontal layout center">
            <a class="title flex">
              <div class="title">[[doc.title]]</div>
            </a>
            <nuxeo-tag>[[formatDocType(doc.type)]]</nuxeo-tag>
          </div>
          <nuxeo-document-highlights highlights="[[doc.contextParameters.highlight]]"></nuxeo-document-highlights>
        </div>
        <div class="actions">
          <nuxeo-favorites-toggle-button document="[[doc]]"></nuxeo-favorites-toggle-button>
          <nuxeo-download-button document="[[doc]]"></nuxeo-download-button>
        </div>
        <div class="select">
          <paper-icon-button
            noink
            icon="icons:check"
            title="[[_computeTitle(doc)]]"
            on-tap="_onCheckBoxTap"
          ></paper-icon-button>
        </div>
      </div>
    </div>
  `,is:"nuxeo-document-list-item",behaviors:[r.e,d.N],properties:{doc:{type:Object,notify:!0},offset:{type:Number,value:-1},selected:{type:Boolean,value:!1,reflectToAttribute:!0},selectedItems:{type:Array,value:[]},index:{type:Number}},observers:["_selectedItemsChanged(selectedItems.splices)"],_thumbnail:e=>e&&e.uid&&e.contextParameters&&e.contextParameters.thumbnail&&e.contextParameters.thumbnail.url?e.contextParameters.thumbnail.url:"",handleClick(e){this.selectionMode?this._toogleSelect(e):e.ctrlKey||e.shiftKey||e.metaKey||1===e.button||this.fire("navigate",{item:this.doc,index:this.index})},_onCheckBoxTap(e){this._toogleSelect(e)},_toogleSelect(e){this.selected=!this.selected,this.fire("selected",{index:this.index,shiftKey:e.detail.sourceEvent.shiftKey})},_selectedItemsChanged(){this.selectionMode=this.selectedItems&&this.selectedItems.length>0},_computeTitle(e){return`${e&&e.title}${this.i18n&&this.i18n("command.select")}`}}),i(1679),i(41722),(0,m.k)({_template:h.d`
    <iron-a11y-keys id="a11y" keys="[[keys]]" target="[[target]]" on-keys-pressed="_keysPressed"></iron-a11y-keys>
  `,is:"nuxeo-keys",properties:{keys:{type:String},target:{type:Object,value:()=>document.body},invasive:{type:Boolean,value:!1}},_keysPressed(e){const{keyboardEvent:t}=e.detail;if(0!==this._getMatchingKeyBindings(t).length){if(this.target===document.body){const i=t.composedPath()[0];switch(i.tagName){case"INPUT":case"TEXTAREA":if(!this.invasive)return;break;case"DIV":if(!this.invasive&&i.isContentEditable)return;if("input"===i.id)return void e.preventDefault();break;case"NUXEO-DIALOG":case"PAPER-DIALOG":case"PAPER-BUTTON":case"PAPER-CHECKBOX":case"PAPER-RADIO-BUTTON":return void e.preventDefault()}}this.fire("pressed",e.detail,{})}},_getMatchingKeyBindings(e){return this.$.a11y._keyBindings[e.type].filter((t=>{const i=t[0];return i.key.toLowerCase()===this._transformKey(e.key)&&e.altKey===!!i.altKey&&e.ctrlKey===!!i.ctrlKey&&e.metaKey===!!i.metaKey&&e.shiftKey===!!i.shiftKey}))},_transformKey(e){let t="";if(e){const i=e.toLowerCase();t=" "===i||/^space(bar)?/.test(i)?"space":/^escape$/.test(i)?"esc":/^arrow/.test(i)?i.replace("arrow",""):"multiply"===i?"*":i}return t}}),(0,m.k)({_template:h.d`
    <style>
      paper-fab {
        width: var(--nuxeo-document-create-button-width, 56px);
        height: var(--nuxeo-document-create-button-height, 56px);
        color: var(--nuxeo-button-primary-text);
        --paper-fab-background: var(--nuxeo-button-primary);
        --paper-fab-keyboard-focus-background: var(--nuxeo-button-primary-focus);
        @apply --nuxeo-document-create-button;
        transition: color 0.25s ease-in-out;
      }

      paper-fab:hover,
      paper-fab:focus {
        background-color: var(--nuxeo-button-primary-focus);
      }

      #tray {
        position: absolute;
        bottom: calc(32px + var(--nuxeo-app-bottom, 0));
        right: 32px;
        z-index: 10;
      }

      #shortcuts {
        opacity: 0;
        transition: opacity 0.25s ease-in-out;
      }

      #shortcuts.open {
        opacity: 1;
      }

      nuxeo-document-create-shortcuts {
        --nuxeo-document-create-shortcut-margin: 0 0 16px 0;
      }
    </style>

    <nuxeo-document id="defaultDoc" doc-path="[[parent.path]]" enrichers="permissions, subtypes" response="{{parent}}">
    </nuxeo-document>

    <div id="tray" on-mouseenter="_onMouseEnter" on-mouseleave="_onMouseLeave">
      <div id="shortcuts" class$="[[_animateOpen(shortcutsVisible)]]">
        <div hidden$="[[!shortcutsVisible]]">
          <nuxeo-slot name="DOCUMENT_CREATE_ACTIONS" model="[[actionContext]]"></nuxeo-slot>
        </div>
      </div>

      <paper-fab
        id="createBtn"
        noink
        icon="nuxeo:add"
        on-tap="_displayWizard"
        aria-labelledby="createBtnTooltip"
      ></paper-fab>
      <!-- nuxeo-tooltip does not play nice (in shadycss) when attached to elements that are position: absolute -->
      <paper-tooltip for="createBtn" position="left" id="createBtnTooltip"
        >[[i18n('documentCreateButton.tooltip')]]</paper-tooltip
      >
    </div>

    <nuxeo-document-creation-stats id="creationStats"></nuxeo-document-creation-stats>

    <nuxeo-keys keys="c" on-pressed="_displayWizard"></nuxeo-keys>
  `,is:"nuxeo-document-create-button",behaviors:[l.mB],properties:{parent:{type:Object,observer:"_parentChanged"},subtypes:{type:Array},shortcutsVisible:{type:Boolean,value:!1},actionContext:{type:Object,value:()=>({}),computed:"_actionContext(shortcutsVisible,subtypes)"}},listeners:{"create-document":"_hideShortcuts"},_parentChanged(){if(this.parent)if(this.parent.contextParameters&&this.parent.contextParameters.subtypes&&this.parent.contextParameters.permissions){const e=this.parent.contextParameters&&this.parent.contextParameters.subtypes?this.parent.contextParameters.subtypes.map((e=>(e.id=e.type.toLowerCase(),e))):[],t=[];this._canCreateIn(this.parent)&&e.forEach((e=>{-1===e.facets.indexOf("HiddenInCreation")&&t.push(e.id)})),this.set("subtypes",t)}else this.$.defaultDoc.get()},_canCreateIn:e=>!!(e&&e.contextParameters&&e.contextParameters.permissions)&&e.contextParameters.permissions.indexOf("AddChildren")>-1,_actionContext(){return{hostVisible:this.shortcutsVisible,subtypes:this.subtypes}},_showShortcuts(){this.shortcutsVisible=!0},_hideShortcuts(){this.shortcutsVisible=!1},_onMouseEnter(){this._showShortcuts()},_onMouseLeave(){this._hideShortcuts()},_displayWizard(e){this.hidden||this.fire("create-document",e.detail)},_animateOpen(){return this.shortcutsVisible?"open":""}}),i(7533),i(8321),(0,m.k)({_template:h.d`
    <style include="iron-flex">
      :host {
        --paper-tabs-selection-bar-color: var(--nuxeo-primary-color);
        display: block;
      }

      nuxeo-dialog {
        display: flex;
        flex-direction: column;
        height: var(--nuxeo-document-create-popup-height, 80vh);
        width: var(--nuxeo-document-create-popup-width, 65vw);
        margin: 0;
        z-index: 200;
      }

      paper-tabs {
        border-bottom: 1px solid var(--divider-color);
      }

      paper-tabs,
      #holder {
        margin: 0;
        padding: 0;
      }

      iron-pages,
      nuxeo-document-import {
        /*Firefox fix (NXP-22349)*/
        min-height: 100%;
      }

      #holder {
        height: 100%;
        width: 100%;
      }

      iron-pages {
        @apply --layout-flex;
        @apply --layout-horizontal;
      }
    </style>

    <nuxeo-document id="defaultDoc" doc-path="[[parentPath]]" enrichers="permissions, subtypes" response="{{parent}}">
    </nuxeo-document>

    <nuxeo-dialog id="createDocDialog" opened="{{opened}}" modal>
      <paper-tabs hidden$="[[!_showTabs]]" selected="{{selectedTab}}" attr-for-selected="name" noink>
        <nuxeo-slot name="CREATE_POPUP_ITEMS" model="[[importContext]]"></nuxeo-slot>
      </paper-tabs>
      <div id="holder" class="vertical layout flex">
        <iron-pages selected="[[selectedTab]]" attr-for-selected="name" selected-attribute="visible">
          <nuxeo-slot name="CREATE_POPUP_PAGES" model="[[importContext]]"></nuxeo-slot>
          <nuxeo-document-create
            id="simpleCreation"
            name="create"
            parent="[[parent]]"
            target-path="{{parentPath}}"
            suggester-children="{{suggesterChildren}}"
          ></nuxeo-document-create>
          <nuxeo-document-import
            id="bulkCreation"
            name="import"
            parent="[[parent]]"
            target-path="{{parentPath}}"
            suggester-children="{{suggesterChildren}}"
          ></nuxeo-document-import>
        </iron-pages>
      </div>
    </nuxeo-dialog>
  `,is:"nuxeo-document-create-popup",behaviors:[u.M,l.mB],properties:{parent:{type:Object},_showTabs:{type:Boolean,value:!0},selectedTab:{type:String,value:""},parentPath:{type:String},defaultPath:{type:String},opened:{type:Boolean,value:!1,observer:"_openedChanged"},importContext:{type:Object,computed:"_importContext(parent, i18n)"}},listeners:{"nx-creation-wizard-hide-tabs":"_hideTabs","nx-creation-wizard-show-tabs":"_displayTabs","nx-document-creation-finished":"_close","nx-document-creation-suggester-parent-changed":"_parentPathChanged"},_hideTabs(){this._showTabs=!1},_displayTabs(){this._showTabs=!0},_close(){this.$.createDocDialog.opened&&(this.$.createDocDialog.toggle(),this._showTabs=!0)},toggleDialogCreate(e){this.selectedTab="create",this._showTabs=!1,this._fetchParent().then((()=>{this._noPermission?this.notify({message:this.i18n("documentCreationBehavior.error.noPermission")}):(this.$$("#simpleCreation").init(e),this.$$("#bulkCreation").init(),this.$.createDocDialog.toggle())}))},toggleDialogImport(e){this.selectedTab="import",this._fetchParent().then((()=>{this._noPermission?this.notify({message:this.i18n("documentCreationBehavior.error.noPermission")}):(this.$$("#simpleCreation").init(),this.$$("#bulkCreation").init(e),this.$.createDocDialog.toggle())}))},toggleDialog(){this._fetchParent().then((()=>{this._noPermission?this.notify({message:this.i18n("documentCreationBehavior.error.noPermission")}):(this.$$("#simpleCreation").init(),this.$$("#bulkCreation").init(),this.$.createDocDialog.toggle())}))},_fetchParent(){return this._noPermission=!1,this.parentPath||this.set("parentPath",this.defaultPath),this.parent&&this.parent.contextParameters?Promise.resolve():this.$.defaultDoc.get().catch((e=>{if(!e||403!==e.status)throw e;this._noPermission=!0}))},_parentPathChanged(e){e.detail.isValidTargetPath&&(!this.parent||e.detail.parentPath&&this.parent.path!==e.detail.parentPath.replace(/(.+)\/$/,"$1"))&&(this.parentPath=e.detail.parentPath,this.suggesterChildren=e.detail.suggesterChildren,this.$.defaultDoc.get())},_openedChanged(){this.opened?""===this.selectedTab&&(this.selectedTab="create"):this.selectedTab=""},_importContext(){return{parent:this.parent,i18n:this.i18n}}}),(0,m.k)({_template:h.d`
    <style is="custom-style">
      :host {
        display: inline-block;
      }

      #createBtn {
        color: var(--nuxeo-button-primary-text);
        --paper-fab-background: var(--nuxeo-button-primary);
        --paper-fab-keyboard-focus-background: var(--nuxeo-button-primary-focus);
      }

      paper-fab:hover,
      paper-fab:focus {
        background-color: var(--nuxeo-button-primary-focus);
      }

      paper-fab {
        --paper-fab-iron-icon: {
          filter: brightness(100);
        }
      }
    </style>

    <paper-fab mini noink id="createBtn" src="[[icon]]" on-tap="_tap"></paper-fab>
    <nuxeo-tooltip for="createBtn" position="left">[[i18n(label)]]</nuxeo-tooltip>
  `,is:"nuxeo-document-create-shortcut",behaviors:[l.mB],properties:{type:String,icon:String,label:String},_tap(){this.fire("create-document",{type:this.type})}}),(0,m.k)({_template:h.d`
    <style>
      #shortcuts {
        @apply --layout-vertical;
        @apply --layout-center;
        @apply --layout-end-justified;
      }

      nuxeo-document-create-shortcut {
        margin: var(--nuxeo-document-create-shortcut-margin);
      }
    </style>

    <div id="shortcuts"></div>

    <nuxeo-document-creation-stats id="creationStats"></nuxeo-document-creation-stats>
  `,is:"nuxeo-document-create-shortcuts",behaviors:[r.e],properties:{hostVisible:{type:Boolean,observer:"_observeVisibility"},subtypes:{type:Array}},_observeVisibility(){this.hostVisible&&this._updateShortcuts()},_updateShortcuts(){const e=this.$.creationStats.lastType(1);this.$.creationStats.mostCommonType(2).forEach((t=>{e.indexOf(t)<0&&e.push(t)}));const t=[];e.forEach((e=>{if(this.subtypes&&this.subtypes.indexOf(e)>-1){const i=document.createElement("nuxeo-document-create-shortcut");i.type=e,i.icon=`images/doctypes/${e}.svg`,i.label=this.formatDocType(e),t.push(i)}})),this._putNodes((0,g.vz)(this.$.shortcuts),t.reverse())},_putNodes(e,...t){for(;e.firstChild;)e.removeChild(e.firstChild);if(t&&t.length>0)for(let i=0;i<t.length;i++)if(Array.isArray(t[i]))for(let a=0;a<t[i].length;a++)e.appendChild(t[i][a]);else e.appendChild(t[i])}}),(0,m.k)({_template:h.d`
    <style>
      iron-icon {
        width: 1em;
        height: 1em;
        margin-right: 16px;
        @apply --icon-theme;
      }

      .rendition-container {
        padding: 6px;
        @apply --rendition-container-theme;
        @apply --layout-horizontal;
        @apply --layout-center;
      }

      .rendition-container + .rendition-container {
        border-top: 1px solid #ddd;
        @apply --rendition-container-in-between-theme;
      }

      a {
        color: #00adff;
        font-weight: 700;
        text-decoration: none;
        @apply --rendition-name-theme;
      }
    </style>

    <template is="dom-repeat" items="[[_filterRenditions(document)]]">
      <div class="rendition-container">
        <iron-icon src="[[item.icon]]"></iron-icon>
        <a href="[[item.url]]">[[i18n(item.name)]]</a>
      </div>
    </template>
  `,is:"nuxeo-document-export",behaviors:[l.mB],properties:{document:Object},_filterRenditions:e=>e&&e.contextParameters?e.contextParameters.renditions.filter((e=>"nuxeo:video:conversion"!==e.kind&&"nuxeo:picture:conversion"!==e.kind)).map((e=>(e.name=`documentExport.${e.name}`,e))):[]}),(0,m.k)({_template:h.d`
    <style include="nuxeo-styles">
      :host {
        display: block;
      }

      iron-image,
      nuxeo-document-preview {
        width: 100%;
        height: calc(80vh - 100px);
      }

      nuxeo-document-blob,
      nuxeo-dropzone {
        margin-top: 8px;
      }
    </style>

    <nuxeo-document id="doc" doc-id="[[document.uid]]"></nuxeo-document>

    <template is="dom-if" if="[[!document.properties.file:content.data]]">
      <iron-image position="center" sizing="contain" src="[[_thumbnail(document)]]"></iron-image>
      <template is="dom-if" if="[[_isDropzoneAvailable(document)]]">
        <nuxeo-dropzone value="{{document.properties.file:content}}"></nuxeo-dropzone>
      </template>
    </template>
    <template is="dom-if" if="[[document.properties.file:content.data]]">
      <nuxeo-document-preview document="[[document]]"></nuxeo-document-preview>
      <nuxeo-document-blob document="[[document]]"></nuxeo-document-blob>
    </template>
  `,is:"nuxeo-document-viewer",behaviors:[u.M,l.mB,s.q],properties:{document:Object},created(){this._createMethodObserver("_valueChanged(document.properties.file:content)",!0)},_valueChanged(e){if(!e||e.data)return;const t={};t["file:content"]=this.document.properties["file:content"],this.$.doc.data={"entity-type":"document",repository:this.document.repository,uid:this.document.uid,properties:t},this.$.doc.put().then((e=>{this.document=e,this.notify({message:this.i18n(this.uploadedMessage)}),this.fire("document-updated")}))},_thumbnail:e=>e&&e.uid&&e.contextParameters&&e.contextParameters.thumbnail&&e.contextParameters.thumbnail.url?e.contextParameters.thumbnail.url:"",_isDropzoneAvailable(e){return!this.isUnderRetentionOrLegalHold(e)&&this.hasPermission(e,"WriteProperties")&&!this.isImmutable(e)&&!this.hasType(e,"Root")&&!this.isTrashed(e)&&this.hasSchema(e,"file")}}),(0,m.k)({_template:h.d`
    <style include="nuxeo-styles iron-flex">
      :host {
        display: block;
      }

      nuxeo-dropzone {
        margin-top: 8px;
      }

      nuxeo-document-blob {
        border-top: 1px solid var(--nuxeo-border);
        padding: 8px 0;
      }

      .empty {
        opacity: 0.5;
        padding-bottom: 8px;
        font-size: 1.1em;
      }
    </style>

    <nuxeo-document id="doc" doc-id="[[document.uid]]"></nuxeo-document>

    <template is="dom-if" if="[[_isAvailable(document, xpath)]]">
      <h5>[[i18n('documentAttachments.heading')]]</h5>

      <div class="vertical layout">
        <template is="dom-repeat" items="[[_computeFiles(_attachments)]]">
          <nuxeo-document-blob document="[[document]]" xpath="[[_computeBlobXpath(xpath, index)]]">
          </nuxeo-document-blob>
        </template>

        <template is="dom-if" if="[[!_hasFiles(_attachments)]]">
          <div class="empty">[[i18n('documentAttachments.empty')]]</div>
        </template>
      </div>

      <template is="dom-if" if="[[_isDropzoneAvailable(document)]]">
        <nuxeo-dropzone
          value="{{_attachments}}"
          multiple
          value-key="file"
          uploaded-message="[[i18n('documentAttachments.upload.uploaded')]]"
          message="[[i18n('documentAttachments.upload.add')]]"
          drag-content-message="[[i18n('documentAttachments.upload.drop')]]"
        >
        </nuxeo-dropzone>
      </template>
    </template>
  `,is:"nuxeo-document-attachments",behaviors:[u.M,r.e,s.q],properties:{document:Object,xpath:{type:String,value:"files:files"},_attachments:{type:Object,computed:"_computeValue(document, xpath)"}},observers:["_valueChanged(_attachments.splices)"],_computeValue(e,t){if(e)return this.get(this.formatPropertyXpath(t),this.document.properties)},_valueChanged(e){if(!e)return;const t={},i=this.formatPropertyXpath(this.xpath);(0,f.Z)(t,i.split(".")),this.set(i,this._attachments,t),this.$.doc.data={"entity-type":"document",repository:this.document.repository,uid:this.document.uid,properties:t},this.$.doc.put().then((e=>{this.document=e,this.notify({message:this.i18n(this.uploadedMessage)}),this.fire("document-updated")}))},_hasFiles:e=>e&&e.length>0,_isDropzoneAvailable(e){return e&&!e.isRecord&&this.hasPermission(e,"WriteProperties")&&!this.isImmutable(e)&&!this.hasType(e,"Root")&&!this.isTrashed(e)},_computeFiles(){return this._hasFiles(this._attachments)?this._attachments:[]},_computeBlobXpath:(e,t)=>"files:files"===e?`files:files/${t}/file`:`${e}/${t}`,_isAvailable(e,t){return e&&t&&this.hasSchema(e,t.split(":")[0])}}),i(70562),i(97977);var I=i(30032);(0,m.k)({_template:h.d`
    <style include="iron-flex iron-positioning nuxeo-styles">
      :host {
        display: block;
        --nuxeo-tree-theme: {
          padding: 1em;
          color: var(--nuxeo-drawer-text);
        }
        --nuxeo-tree-node-theme: {
          min-height: 24px;
        }
        --nuxeo-tree-children-theme: {
          padding-left: 1em;
        }
        --nuxeo-tree-node-more-theme: {
          line-height: 1.3em;
          display: inline-block;
          vertical-align: text-top;
          margin-left: 1.3em;
          word-break: break-word;
        }
      }

      .content {
        padding: 5px 0;
        overflow: auto;
        height: calc(100vh - 72px - (var(--nuxeo-app-top, 0) + var(--nuxeo-app-bottom, 0)));
      }

      .node-name {
        line-height: 1.3em;
        display: inline-block;
        vertical-align: text-top;
        margin-left: 1.3em;
        word-break: break-word;
      }

      a {
        @apply --nuxeo-link;
      }

      a:hover {
        @apply --nuxeo-link-hover-color;
      }

      #root a,
      a:active,
      a:visited,
      a:focus {
        color: var(--nuxeo-drawer-text);
      }

      iron-icon {
        opacity: 0.7;
        width: 1.3rem;
        margin-right: -1.6em;
        margin-top: -0.07rem;
      }

      [toggle] {
        cursor: pointer;
      }

      .parents {
        line-height: 1.5em;
      }

      .parents + nuxeo-tree {
        padding: 6px 5px;
      }

      .parents > nuxeo-tree {
        padding: 4px 5px;
      }

      .parents a {
        @apply --layout-horizontal;
        padding: 0.35em;
        color: var(--nuxeo-drawer-text);
        border-bottom: 1px solid var(--nuxeo-border);
      }

      .parents span {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: block;
        min-width: 1.3em;
      }

      .parent {
        padding: 0.12em 0 0;
      }

      paper-spinner {
        height: 1.1rem;
        width: 1.1rem;
        margin-right: -1.4em;
      }

      .noPermission {
        opacity: 0.5;
        font-weight: 300;
        padding: 1.5em 0.7em;
        text-align: center;
        font-size: 1.1rem;
      }

      .header h5 {
        margin: 0;
      }

      .loaddata {
        display: none;
      }
    </style>

    <nuxeo-document
      id="doc"
      doc-path="[[docPath]]"
      response="{{document}}"
      enrichers="hasFolderishChild"
    ></nuxeo-document>

    <nuxeo-page-provider
      id="children"
      provider="tree_children"
      enrichers="hasFolderishChild"
      schemas="dublincore,common"
    >
    </nuxeo-page-provider>

    <div class="header" hidden$="[[!label]]">
      <h5>[[i18n(label)]]</h5>
    </div>

    <div class="content" role="tree">
      <div class="parents" hidden$="[[_noPermission]]">
        <a href$="[[urlFor('document', '/')]]" class="layout horizontal" hidden$="[[_hideRoot(document)]]">
          <span aria-hidden="true"><iron-icon icon="icons:chevron-left"></iron-icon></span>
          <span class="parent">[[i18n('browse.root')]]</span>
        </a>
        <template is="dom-repeat" items="[[parents]]" as="item">
          <a href$="[[urlFor(item)]]">
            <span><iron-icon icon="icons:chevron-left"></iron-icon></span>
            <span class="parent">[[item.title]]</span>
          </a>
        </template>
      </div>
      <nuxeo-tree id="tree" data="[[document]]" controller="[[controller]]" node-key="uid">
        <template class="horizontal layout">
          <div role="treeitem" aria-expanded="[[opened]]">
            <template class="flex" is="dom-if" if="[[!isLeaf]]">
              <paper-spinner active$="[[loading]]" aria-hidden="true"></paper-spinner>
              <iron-icon icon="[[_expandIcon(opened)]]" toggle hidden$="[[loading]]" aria-hidden="true"></iron-icon>
              <template is="dom-if" if="[[loading]]">
                <span class="loaddata" aria-live="polite">[[_loading(loading)]]</span>
              </template>
            </template>
            <span class="node-name flex">
              <a href$="[[urlFor(item)]]">[[_title(item)]]</a>
            </span>
          </div>
        </template>
      </nuxeo-tree>
      <div class="noPermission" hidden$="[[!_noPermission]]">[[i18n('browse.tree.noDocument')]]</div>
    </div>
  `,is:"nuxeo-document-tree",behaviors:[d.N,l.mB,s.q],properties:{controller:Object,auto:{type:Boolean,value:!1},rootDocPath:{type:String,value:"/",observer:"_rootDocPathChanged"},docPath:{type:String,value:"/"},document:{type:Object,observer:"_documentChanged"},currentDocument:{type:Object,observer:"_currentDocumentChanged"},parents:{type:Array,value:[]},label:String,visible:{type:Boolean},cannotSee:{type:Boolean,value:!1},_noPermission:{type:Boolean,value:!1}},observers:["_fetchDocument(docPath, visible)"],ready(){window.addEventListener("nuxeo-documents-deleted",(e=>{e.detail.documents?this.removeDocuments(e.detail.documents):this._fetchDocument()})),window.addEventListener("refresh-display",(()=>{this._fetchDocument()})),window.addEventListener("document-created",this._fetchDocument.bind(this)),this.controller={getChildren:function(e,t){return this.$.children.params=[e.uid],this.$.children.page=t,this.$.children.fetch().then((e=>({items:e.entries,isNextAvailable:this.$.children.isNextPageAvailable})))}.bind(this),isLeaf:e=>!(e.contextParameters&&e.contextParameters.hasFolderishChild)}},_hideRoot(e){return"/"!==this.rootDocPath||e&&e.type&&"Root"===e.type},_fetchDocument(){this.visible&&this.docPath&&(this.__fetchDebouncer=I.dx.debounce(this.__fetchDebouncer,_.timeOut.after(150),(()=>{this._noPermission=!1,this.$.doc.execute().catch((e=>{if(!e||403!==e.status)throw e;this._noPermission=!0}))})))},_currentDocumentChanged(){const e=this.currentDocument;if(e&&e.path&&e.path.startsWith(this.rootDocPath)&&(this.docPath===e.path&&this.document&&this.document.title!==e.title&&this.$.doc.get(),this.docPath!==e.path&&!this.hasFacet(e,"HiddenInNavigation"))){if(this.$.tree.style.display="none",this.parents=[],"Root"===e.type)return void(this.docPath=e.path);const{entries:t}=e.contextParameters.breadcrumb;this.docPath=t[t.length-1].path;for(let e=0;e<t.length-1;e++){const i=t[e];!this.hasFacet(i,"HiddenInNavigation")&&i.path.startsWith(this.rootDocPath)&&this.push("parents",i)}}},_documentChanged(){this.document&&this.hasFacet(this.document,"Folderish")&&(this.$.tree.style.display="block")},_rootDocPathChanged(){this.docPath=this.rootDocPath},_expandIcon:e=>"hardware:keyboard-arrow-"+(e?"down":"right"),_icon:e=>e?"icons:folder-open":"icons:folder",_title(e){return"Root"===e.type?this.i18n("browse.root"):e.title},_loading(e){return e?this.i18n("label.loading"):""},removeDocuments(e){const t=e.map((e=>e.uid));this.$.tree.removeNodes(t)}}),(0,m.k)({_template:h.d`
    <nuxeo-audit-search name="document-history" id="document-history" document="[[document]]"></nuxeo-audit-search>
  `,ready(){console.warn(`${this.is} is deprecated. Please use nuxeo-audit-search instead!`)},is:"nuxeo-document-history",properties:{document:Object}}),(0,m.k)({_template:h.d`
    <style include="nuxeo-action-button-styles"></style>

    <nuxeo-operation op="Document.MoveCollectionMember" id="moveUpOp"></nuxeo-operation>

    <template id="availability" is="dom-if" if="[[_isAvailable(members)]]">
      <div class="action" on-tap="moveUp">
        <paper-icon-button noink id="upButton" icon="icons:arrow-upward" aria-labelledby="label"></paper-icon-button>
        <span class="label" hidden$="[[!showLabel]]" id="label">[[_label]]</span>
        <nuxeo-tooltip position="[[tooltipPosition]]">[[_label]]</nuxeo-tooltip>
      </div>
    </template>
  `,is:"nuxeo-collection-move-up-action",behaviors:[l.mB],properties:{members:{type:Object},allMembers:{type:Object},collection:{type:Object},tooltipPosition:{type:String,value:"bottom"},showLabel:{type:Boolean,value:!1},_label:{type:String,computed:"_computeLabel(i18n)"},_member1Idx:{type:Number},_member2Idx:{type:Number}},moveUp(){if(this.members&&1===this.members.length&&this.allMembers){const e=this.members[0].uid;let t=0;for(;t<this.allMembers.length;t++)if(this.allMembers[t].uid===e){if(t>0){this._member2Idx=t,this._member1Idx=t-1;const i=this.allMembers[this._member1Idx].uid;this.$.moveUpOp.input=this.collection.uid,this.$.moveUpOp.params={member1:i,member2:e},this.$.moveUpOp.execute().then((()=>{[this.allMembers[this._member2Idx]]=this.allMembers.splice(this._member1Idx,1,this.allMembers[this._member2Idx]),this.fire("refresh-display",{focusIndex:this._member1Idx})}))}break}}},_isAvailable(){return!(!this.members||1!==this.members.length||this.allMembers&&this.allMembers.length<=1||this.allMembers[0].uid===this.members[0].uid)},_computeLabel(){return this.i18n("collections.moveUp")}}),(0,m.k)({_template:h.d`
    <style include="nuxeo-action-button-styles"></style>

    <nuxeo-operation op="Document.MoveCollectionMember" id="moveDownOp"></nuxeo-operation>

    <template id="availability" is="dom-if" if="[[_isAvailable(members)]]">
      <div class="action" on-tap="moveDown">
        <paper-icon-button
          noink
          id="downButton"
          icon="icons:arrow-downward"
          aria-labelledby="label"
        ></paper-icon-button>
        <span class="label" hidden$="[[!showLabel]]" id="label">[[_label]]</span>
        <nuxeo-tooltip position="[[tooltipPosition]]">[[_label]]</nuxeo-tooltip>
      </div>
    </template>
  `,is:"nuxeo-collection-move-down-action",behaviors:[l.mB],properties:{members:{type:Object},allMembers:{type:Object},collection:{type:Object},tooltipPosition:{type:String,value:"bottom"},showLabel:{type:Boolean,value:!1},_label:{type:String,computed:"_computeLabel(i18n)"},_member1Idx:{type:Number},_member2Idx:{type:Number}},moveDown(){if(this.members&&1===this.members.length&&this.allMembers){const e=this.members[0].uid;let t=0;for(;t<this.allMembers.length;t++)if(this.allMembers[t].uid===e){if(t<this.allMembers.length-1){this._member2Idx=t,this._member1Idx=t+1;const i=this.allMembers[this._member1Idx].uid;this.$.moveDownOp.input=this.collection.uid,this.$.moveDownOp.params={member1:i,member2:e},this.$.moveDownOp.execute().then((()=>{[this.allMembers[this._member2Idx]]=this.allMembers.splice(this._member1Idx,1,this.allMembers[this._member2Idx]),this.fire("refresh-display",{focusIndex:this._member1Idx})}))}break}}},_isAvailable(){return!(!this.members||1!==this.members.length||this.allMembers&&this.allMembers.length<=1||this.allMembers[this.allMembers.length-1].uid===this.members[0].uid)},_computeLabel(){return this.i18n("collections.moveDown")}}),(0,m.k)({_template:h.d`
    <style include="nuxeo-action-button-styles"></style>

    <nuxeo-operation op="Document.MoveCollectionMember" id="moveTopOp"></nuxeo-operation>

    <template id="availability" is="dom-if" if="[[_isAvailable(members)]]">
      <div class="action" on-tap="moveUp">
        <paper-icon-button
          noink
          id="topButton"
          icon="editor:vertical-align-top"
          aria-labelledby="label"
        ></paper-icon-button>
        <span class="label" hidden$="[[!showLabel]]" id="label">[[_label]]</span>
        <nuxeo-tooltip position="[[tooltipPosition]]">[[_label]]</nuxeo-tooltip>
      </div>
    </template>
  `,is:"nuxeo-collection-move-top-action",behaviors:[l.mB],properties:{members:{type:Object},allMembers:{type:Object},collection:{type:Object},tooltipPosition:{type:String,value:"bottom"},showLabel:{type:Boolean,value:!1},_label:{type:String,computed:"_computeLabel(i18n)"},_member1Idx:{type:Number},_member2Idx:{type:Number}},moveUp(){if(this.members&&1===this.members.length&&this.allMembers){const e=this.members[0].uid;let t=0;for(;t<this.allMembers.length;t++)if(this.allMembers[t].uid===e){if(t>0){this._member2Idx=t,this._member1Idx=0;const i=this.allMembers[this._member1Idx].uid;this.$.moveTopOp.input=this.collection.uid,this.$.moveTopOp.params={member1:i,member2:e},this.$.moveTopOp.execute().then((()=>{[this.allMembers[this._member2Idx]]=this.allMembers.splice(this._member1Idx,1,this.allMembers[this._member2Idx]),this.fire("refresh-display",{focusIndex:this._member1Idx})}))}break}}},_isAvailable(){return!(!this.members||1!==this.members.length||this.allMembers&&this.allMembers.length<=1||this.allMembers[0].uid===this.members[0].uid)},_computeLabel(){return this.i18n("collections.moveTop")}}),(0,m.k)({_template:h.d`
    <style include="nuxeo-action-button-styles"></style>

    <nuxeo-operation op="Document.MoveCollectionMember" id="moveBottomOp"></nuxeo-operation>

    <template id="availability" is="dom-if" if="[[_isAvailable(members)]]">
      <div class="action" on-tap="moveBottom">
        <paper-icon-button
          noink
          id="bottomButton"
          icon="editor:vertical-align-bottom"
          aria-labelledby="label"
        ></paper-icon-button>
        <span class="label" hidden$="[[!showLabel]]" id="label">[[_label]]</span>
        <nuxeo-tooltip position="[[tooltipPosition]]">[[_label]]</nuxeo-tooltip>
      </div>
    </template>
  `,is:"nuxeo-collection-move-bottom-action",behaviors:[l.mB],properties:{members:{type:Object},allMembers:{type:Object},collection:{type:Object},tooltipPosition:{type:String,value:"bottom"},showLabel:{type:Boolean,value:!1},_label:{type:String,computed:"_computeLabel(i18n)"},_member1Idx:{type:Number},_member2Idx:{type:Number}},moveBottom(){if(this.members&&1===this.members.length&&this.allMembers){const e=this.members[0].uid;let t=0;for(;t<this.allMembers.length;t++)if(this.allMembers[t].uid===e){if(t<this.allMembers.length-1){this._member2Idx=t,this._member1Idx=this.allMembers.length-1;const i=this.allMembers[this._member1Idx].uid;this.$.moveBottomOp.input=this.collection.uid,this.$.moveBottomOp.params={member1:i,member2:e},this.$.moveBottomOp.execute().then((()=>{[this.allMembers[this._member2Idx]]=this.allMembers.splice(this._member1Idx,1,this.allMembers[this._member2Idx]),this.fire("refresh-display",{focusIndex:this._member1Idx})}))}break}}},_isAvailable(){return!(!this.members||1!==this.members.length||this.allMembers&&this.allMembers.length<=1||this.allMembers[this.allMembers.length-1].uid===this.members[0].uid)},_computeLabel(){return this.i18n("collections.moveBottom")}});class O extends((0,D.P)([u.M,l.mB],Nuxeo.OperationButton)){static get is(){return"nuxeo-collection-remove-action"}static get properties(){return{members:{type:Object},collection:{type:Object},hidden:{type:Boolean,value:!1,reflectToAttribute:!0,computed:"_isHidden(members, collection)"}}}constructor(){super(),this.icon="nuxeo:remove",this.label="collections.remove",this.event="refresh",this.operation="Collection.RemoveFromCollection",this.syncIndexing=!0}_execute(){this.remove()}_params(){return{collection:this.collection.uid}}remove(){this.input=this.members,this.params=this._params(),super._execute().then((()=>{this.members=[]}))}_isHidden(e,t){return!(t&&t.contextParameters&&t.contextParameters.permissions)||t.contextParameters.permissions.indexOf("WriteProperties")<0}}window.customElements.define(O.is,O),(0,m.k)({_template:h.d`
    <style include="nuxeo-styles">
      :host {
        display: block;
      }

      .results {
        @apply --layout-vertical;
        @apply --layout-flex;
        display: block;
        position: relative;
        min-height: calc(100vh - 17em - (var(--nuxeo-app-top, 0) + var(--nuxeo-app-bottom, 0)));
        margin-top: 8px;
      }

      .left-ellipsis {
        direction: rtl;
        text-align: left;
      }

      .right-ellipsis {
        direction: ltr;
        text-align: right;
      }

      .ellipsis {
        width: calc(100% - 38px);
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .capitalize {
        text-transform: capitalize;
      }

      .resultActions {
        display: block;
        @apply --layout-horizontal;
        @apply --layout-center;
        @apply --layout-end-justified;
      }

      .resultActions paper-icon-button {
        padding: 0.3em;
        margin-left: 4px;
      }
    </style>

    <nuxeo-operation id="unpublishOp" op="Document.Delete" sync-indexing></nuxeo-operation>
    <nuxeo-operation id="unpublishAllOp" op="Document.UnpublishAll" sync-indexing input="[[_src]]"></nuxeo-operation>
    <nuxeo-operation id="srcDocOp" op="Proxy.GetSourceDocument" input="[[document.uid]]"></nuxeo-operation>
    <nuxeo-operation id="publishOp" op="Document.PublishToSection"></nuxeo-operation>

    <nuxeo-page-provider
      id="provider"
      page-size="40"
      provider="nxql_search"
      params="[[_computeParams(_src)]]"
      sort='{"dc:modified": "desc", "uid:major_version": "desc", "uid:minor_version": "desc"}'
      enrichers="thumbnail, permissions"
      headers='{"fetch-document": "properties", "translate-directoryEntry": "label"}'
      schemas="dublincore,common,uid,rendition"
    >
    </nuxeo-page-provider>

    <nuxeo-card heading="[[i18n('publication.details')]]">
      <div class="resultActions">
        <paper-button class="uppercase" on-tap="_unpublishAll" disabled$="[[!hasPublications]]"
          >[[i18n('publication.unpublishAll')]]</paper-button
        >
      </div>
      <nuxeo-data-table
        id="table"
        nx-provider="provider"
        class="results"
        items="{{publishedDocs}}"
        empty-label="[[i18n('publication.noPublications')]]"
      >
        <nuxeo-data-table-column name="[[i18n('documentContentView.datatable.header.path')]]" flex="200">
          <template>
            <nuxeo-document-thumbnail document="[[item]]"></nuxeo-document-thumbnail>
            <a class$="path ellipsis [[_ellipsisDirection()]]" href$="[[urlFor(item)]]">[[item.path]]&lrm;</a>
            <nuxeo-tooltip>[[item.path]]</nuxeo-tooltip>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column name="[[i18n('documentContentView.datatable.header.version')]]" flex="10">
          <template>
            <span class="version">[[formatVersion(item)]]</span>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column name="[[i18n('publication.rendition')]]" flex="10">
          <template>
            <span class="uppercase ellipsis rendition">
              [[formatRendition(item.properties.rend:renditionName)]]
            </span>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column name="[[i18n('publication.publisher')]]" flex="40">
          <template>
            <!-- TODO check it is indeed the publisher, might be the dc:publisher field -->
            <nuxeo-user-tag user="[[item.properties.dc:lastContributor]]"></nuxeo-user-tag>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column name="[[i18n('publication.publishDate')]]" flex="30">
          <template>
            <!-- TODO check it is indeed the publish date -->
            <nuxeo-date datetime="[[item.properties.dc:modified]]"></nuxeo-date>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column flex="10">
          <template>
            <template is="dom-if" if="[[_canUnpublish(item)]]">
              <paper-button class="uppercase unpublish" on-tap="_unpublish"
                >[[i18n('publication.unpublish')]]</paper-button
              >
            </template>
          </template>
        </nuxeo-data-table-column>
        <nuxeo-data-table-column flex="10">
          <template>
            <template is="dom-if" if="[[_canRepublish(item)]]">
              <paper-button class="uppercase primary republish" on-tap="_republish"
                >[[i18n('publication.republish')]]</paper-button
              >
            </template>
          </template>
        </nuxeo-data-table-column>
      </nuxeo-data-table>
    </nuxeo-card>
  `,is:"nuxeo-document-publications",behaviors:[u.M,c.V],properties:{document:Object,_src:Object,visible:Boolean,hasPublications:{type:Boolean,computed:"_hasPublications(publishedDocs)"}},observers:["_fetchPublications(_src, visible)","_observeDocument(document, visible)"],listeners:{"nx-publish-success":"_fetchPublications","nx-unpublish-success":"_fetchPublications"},_observeDocument(){this.document&&this.visible?this.document.isVersion?this.$.srcDocOp.execute().then((e=>{this._src=e})):this._src=this.document:this._src=null},_computeParams(){if(this._src){const{uid:e}=this._src;return{queryParams:`SELECT * FROM Document WHERE ecm:isProxy = 1 AND ecm:isTrashed = 0AND (rend:sourceVersionableId = "${e}" OR ecm:proxyVersionableId = "${e}")`}}},_fetchPublications(){this.visible&&this._src&&this.$.table.fetch()},_unpublish(e){if(e&&e.target){if(!window.confirm(this.i18n("publication.unpublish.confirm")))return;const t=e.target.parentNode.item;this.$.unpublishOp.input=t,this.$.unpublishOp.execute().then((()=>{this.notify({message:this.i18n("publication.unpublish.success")}),this._fetchPublications()})).catch((()=>{this.notify({message:this.i18n("publication.unpublish.error")})}))}},_republish(e){if(e&&e.target){if(!window.confirm(this.i18n("publication.republish.confirm")))return;const t=e.target.parentNode.item;this.$.publishOp.params={target:t.parentRef,override:!0,renditionName:t.properties["rend:renditionName"]},this.$.publishOp.input=this._src.uid,this.$.publishOp.execute().then((()=>{this.notify({message:this.i18n("publication.internal.publish.success")}),this.fire("document-updated"),this.fire("nx-publish-success")})).catch((e=>{throw this.notify({message:this.i18n("publication.internal.publish.error")}),e}))}},_canUnpublish(e){return e&&this.hasPermission(e,"WriteVersion")},_canRepublish(e){if(this._src&&this._canUnpublish(e)){const t=e.properties["uid:major_version"],i=this._src.properties["uid:major_version"];if(t<i)return!0;if(t===i){const t=e.properties["uid:minor_version"],i=this._src.properties["uid:minor_version"];return t<i||t===i&&this._src.isCheckedOut}}return!1},_hasPublications:e=>e&&e.length>0,_unpublishAll(){window.confirm(this.i18n("publication.unpublish.all.confirm"))&&this.$.unpublishAllOp.execute().then((()=>{this.notify({message:this.i18n("publication.unpublish.all.success")}),this._fetchPublications()})).catch((function(){this.notify({message:this.i18n("publication.unpublish.all.error")})}))},_ellipsisDirection:()=>"rtl"!==document.dir?"left-ellipsis":"right-ellipsis"}),i(94131),i(85621);var L=i(79223);const B=e=>e&&e.behaviors&&e.selectAllActive&&p.L.every((t=>e.behaviors.includes(t)));(0,m.k)({_template:h.d`
    <style include="iron-flex iron-flex-alignment iron-flex-factors nuxeo-action-button-styles nuxeo-styles">
      :host {
        display: block;
        @apply --layout-flex;
        @apply --layout-horizontal;
      }

      .container {
        margin: 2rem;
        padding: 0 1rem 0 0;
        display: inline-block;
        @apply --layout-flex;
        @apply --layout-vertical;
      }

      .versions,
      .options {
        margin-left: 3em;
      }

      label {
        @apply --nuxeo-label;
      }

      .error {
        border-left: 4px solid var(--nuxeo-warn-text);
        color: var(--nuxeo-text-default);
        padding-left: 8px;
        margin-bottom: 8px;
      }
    </style>

    <nuxeo-operation-button
      id="bulkOpBtn"
      input="[[_input(document, documents.splices)]]"
      label="[[i18n('publication.internal.title')]]"
      operation="Document.PublishToSection"
      on-poll-start="_onPollStart"
      params="[[_params(publishSpace.uid, override, selectedRendition)]]"
      sync-indexing
      hidden
    >
    </nuxeo-operation-button>

    <nuxeo-document id="srcDoc"></nuxeo-document>

    <div class="container">
      <nuxeo-document-suggestion
        id="target"
        required
        label="[[i18n('publication.internal.location')]]"
        placeholder="[[i18n('publication.internal.location.placeholder')]]"
        selected-item="{{publishSpace}}"
        min-chars="0"
        selection-formatter="[[targetFormatter]]"
        enrichers="permissions"
        page-provider="publish_space_suggestion"
        repository="[[document.repository]]"
      >
      </nuxeo-document-suggestion>
      <template is="dom-if" if="[[errorMessage]]">
        <span class="horizontal layout error">[[errorMessage]]</span>
      </template>

      <div class="horizontal layout flex">
        <nuxeo-select
          id="rendition"
          label="[[i18n('publication.internal.renditons.label')]]"
          placeholder="[[i18n('publication.internal.renditons.placeholder')]]"
          selected="{{selectedRendition}}"
          attr-for-selected="name"
        >
          <template is="dom-repeat" items="[[_computeRenditionOptions(document, i18n)]]" as="rendition">
            <paper-item name$="[[rendition.id]]">[[rendition.label]]</paper-item>
          </template>
        </nuxeo-select>
        <template is="dom-if" if="[[!_isMultiple]]">
          <div class="versions">
            <label>[[i18n('documentInfo.version')]]</label>
            <nuxeo-document-versions id="version" document="[[document]]"></nuxeo-document-versions>
          </div>
        </template>
        <div class="options">
          <label>[[i18n('publication.internal.options')]]</label>
          <paper-checkbox id="override" checked="{{override}}">
            [[i18n('publication.internal.override')]]
          </paper-checkbox>
        </div>
      </div>
      <div class="buttons horizontal end-justified layout">
        <div class="flex start-justified">
          <paper-button noink dialog-dismiss on-tap="_cancel" class="secondary"
            >[[i18n('command.cancel')]]</paper-button
          >
        </div>
        <paper-button
          id="publish"
          noink
          class="primary"
          on-tap="_publish"
          disabled$="[[!_canPublish(_isDisable,document,publishSpace)]]"
        >
          [[i18n('publication.publish')]]
        </paper-button>
      </div>
    </div>
  `,is:"nuxeo-internal-publish",behaviors:[u.M,l.mB,c.V],properties:{document:Object,documents:Array,publishSpace:Object,selectedRendition:{type:String,value:"none"},_isDisable:{type:Boolean,value:!1},_isMultiple:{type:Boolean,computed:"_computeMultiple(document, documents.length)"},targetFormatter:{type:Function,value(){return this._targetFormatter.bind(this)}}},_computeMultiple(){return!!(this.documents&&this.documents.length>0)},_computeRenditionOptions(){const e=[{id:"none",label:this.i18n("publication.internal.renditon.none")},{id:"default",label:this.i18n("publication.internal.renditon.default")}];return this.document&&this.document.contextParameters&&this.document.contextParameters.renditions&&this.document.contextParameters.renditions.forEach((t=>{e.push({id:t.name,label:this.formatRendition(t.name),icon:t.icon})})),e},_onPollStart(){this.fire("nuxeo-action-started",{dismissible:!0})},_input(){return B(this.documents)?this.documents:this._isMultiple?`docs:${this.documents.map((e=>e.uid)).join(",")}`:this.document.uid},_params(){const e={target:this.publishSpace?this.publishSpace.uid:null,override:this.override};return"default"===this.selectedRendition?e.defaultRendition=!0:"none"!==this.selectedRendition&&(e.renditionName=this.selectedRendition),e},_publish(){const e=B(this.documents),t=this._isMultiple,{publishSpace:i}=this;this.$.bulkOpBtn._execute().then((()=>{t?this.fire("navigate",{doc:i}):this.fire("document-updated"),this.fire("nx-publish-success")})).catch((i=>{if(!e)throw this.notify({message:this.i18n("publication.internal.publish.error"+(t?".multiple":""))}),i}))},_canPublish(){if(this.errorMessage=null,!this.publishSpace)return!1;const e=this.hasPermission(this.publishSpace,"AddChildren");return e||(this.errorMessage=this.i18n("publication.internal.location.error.noPermission")),e},_cancel(){this.fire("cancel")},_targetFormatter:e=>(0,L.r)(e.title)}),(0,m.k)({_template:h.d`
    <style include="nuxeo-action-button-styles">
      :host {
        --paper-tabs-selection-bar-color: var(--nuxeo-primary-color);
        display: block;
      }

      paper-tabs {
        border-bottom: 1px solid var(--divider-color);
      }

      paper-tabs,
      #container {
        margin: 0;
        padding: 0;
      }

      iron-pages,
      nuxeo-document-import {
        /*Firefox fix (NXP-22349)*/
        min-height: 100%;
      }

      #container {
        height: 250px;
        min-width: 50vw;
      }

      iron-pages {
        @apply --layout-flex;
        @apply --layout-horizontal;
      }
    </style>

    <template is="dom-if" if="[[_isAvailable(document, documents.splices)]]">
      <div class="action" on-tap="_toggleDialog">
        <paper-icon-button id="publishButton" icon="[[icon]]" noink aria-labelledby="label"></paper-icon-button>
        <span class="label" hidden$="[[!showLabel]]" id="label">[[_label]]</span>
        <nuxeo-tooltip>[[_label]]</nuxeo-tooltip>
      </div>
    </template>

    <nuxeo-dialog id="publishDialog" modal opened="{{opened}}">
      <paper-tabs selected="{{selectedTab}}" attr-for-selected="name" noink>
        <nuxeo-slot name="PUBLISH_ITEMS" model="[[publishContext]]"></nuxeo-slot>
      </paper-tabs>
      <div id="container" class="vertical layout flex">
        <iron-pages selected="[[selectedTab]]" attr-for-selected="name" selected-attribute="visible">
          <nuxeo-slot name="PUBLISH_PAGES" model="[[publishContext]]"></nuxeo-slot>
        </iron-pages>
      </div>
    </nuxeo-dialog>
  `,is:"nuxeo-publish-button",behaviors:[l.mB,s.q],properties:{document:Object,documents:Object,icon:{type:String,value:"editor:publish"},selectedTab:{type:String,value:"internal"},publishContext:{type:Object,computed:"_publishContext(document, documents.splices, i18n, opened)"},showLabel:{type:Boolean,value:!1},_label:{type:String,computed:"_computeLabel(i18n)"}},listeners:{"nuxeo-action-started":"_close","nx-publish-success":"_close",cancel:"_close"},_toggleDialog(){this.$.publishDialog.toggle()},_close(){this.$.publishDialog.close()},_publishContext(){return this.opened?{document:this.document,documents:this.documents,i18n:this.i18n,selection:this.documents}:{}},_computeLabel(){return this.i18n("publication.button.tooltip")},_isAvailable(){return B(this.documents)||this.document&&this.isPublishable(this.document)||this.documents&&this.documents.every((e=>this.isPublishable(e)))},_checkDocsPermissions(){return this.docsHavePermissions=this.documents&&!this.documents.some((e=>!this._docHasPermissions(e))),this.docsHavePermissions}});const M=[],V=function(e){if(!e)return;const t=M.indexOf((t=>t.id===e.id));t>-1?M.splice(t,1,e):M.push(e),e.suggestion.command=e};(0,m.k)({_template:h.d`
    <style include="nuxeo-styles">
      :host {
        @apply --layout-horizontal;
        @apply --layout-flex;
        @apply --layout-center;
      }

      paper-input {
        width: var(--nuxeo-suggester-width, 60%);

        --paper-input-container-input: {
          color: var(--nuxeo-quicksearch-text);
          font-size: 1rem;
          font-family: var(--nuxeo-app-font);
        }

        --paper-input-container-underline: {
          background-color: transparent;
        }

        --paper-input-container-underline-focus: {
          background-color: transparent;
        }

        --paper-input-container-label: {
          color: var(--nuxeo-text-default);
          font-size: 1rem;
          font-family: var(--nuxeo-app-font);
          line-height: unset;
          padding-left: 5px;
        }

        --paper-input-container-label-focus: {
          color: #e8e8e8;
          font-size: 1rem;
          line-height: unset;
          padding-left: 5px;
        }
      }

      .input-content.paper-input-container label {
        left: 7px;
      }

      #searchButton {
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        position: fixed;
        z-index: 100;
        top: 0;
        color: var(--nuxeo-app-header);
        @apply --nuxeo-suggester-button;
      }

      #searchButton:hover {
        background-color: var(--nuxeo-button-primary);
        color: var(--nuxeo-button-primary-text);
      }

      #searchButton.toggled {
        color: var(--nuxeo-button-primary-text);
        background-color: var(--nuxeo-button-primary);
        z-index: 1001;
      }

      #suggester {
        top: var(--nuxeo-app-top, 0);
        left: 0;
        position: fixed;
        z-index: 1001;
        width: 100%;
        height: 100%;
        @apply --layout-vertical;
        @apply --layout-center;
      }

      #searchBar {
        height: 53px;
        background-color: var(--nuxeo-quicksearch-background);
        color: var(--nuxeo-quicksearch-text);
        @apply --layout-horizontal;
        @apply --layout-center;
        @apply --layout-center-justified;
        @apply --layout-self-stretch;
      }

      #suggester .unfocused-line.paper-input-container,
      #suggester .focused-line.paper-input-container {
        background-color: transparent;
      }

      #results {
        width: var(--nuxeo-suggester-width, 65%);
        margin: 0.5em 0 3em;
        height: calc(100% - 130px - (var(--nuxeo-app-top, 0) + var(--nuxeo-app-bottom, 0)));
        padding: 0 2em;
        box-sizing: border-box;
        overflow-y: auto;
        @apply --layout-vertical;
      }

      .item {
        display: block;
        padding: 1em;
        background-color: var(--nuxeo-quicksearch-background);
        @apply --layout-horizontal;
        @apply --layout-center;
      }

      .item.details {
        @apply --layout-vertical;
      }

      .item .details {
        min-width: 1px;
      }

      .item + .item {
        border-top: 1px solid var(--nuxeo-border);
      }

      .item iron-icon {
        margin: 0 16px 0 4px;
      }

      a.item:hover,
      a.iron-selected {
        color: var(--nuxeo-text-default);
        @apply --nuxeo-block-selected;
      }

      a .itemName {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      a .itemPath {
        opacity: 0.7;
        font-size: 0.8em;
      }

      a:hover .itemName {
        color: var(--nuxeo-primary-color);
      }

      .fade {
        top: var(--nuxeo-app-top, 0);
        bottom: var(--nuxeo-app-bottom, 0);
        left: 0;
        width: 100%;
        position: fixed;
        opacity: 0.8;
        z-index: -1;
        background: var(--primary-text-color);
      }

      .thumbnailContainer {
        width: 60px;
        height: 60px;
        margin-right: 10px;
      }

      nuxeo-document-highlights {
        font-size: 0.85rem;
      }

      @media (max-width: 1024px) {
        #searchButton {
          background-color: var(--nuxeo-app-header-background);
          z-index: 100;
        }

        #searchBar {
          justify-content: flex-start;
        }

        paper-input {
          width: var(--nuxeo-suggester-media-width, calc(100% - 90px));
          margin-left: var(--nuxeo-suggester-media-margin-left, 1.2rem);
        }

        #results {
          width: 100%;
          padding: 1em;
        }
      }
    </style>

    <nuxeo-connection id="nxcon"></nuxeo-connection>
    <nuxeo-operation
      id="op"
      op="Search.SuggestersLauncher"
      response="{{items}}"
      params='{"searchTerm":"[[searchTerm]]"}'
    ></nuxeo-operation>

    <div hidden$="[[!toggled]]">
      <div id="suggester">
        <div class="fade" on-tap="toggle"></div>
        <div id="searchBar">
          <paper-input
            noink
            id="searchInput"
            value="{{searchTerm}}"
            type="search"
            auto-focus
            label="[[i18n('suggester.label')]]"
            no-label-float
          ></paper-input>
        </div>
        <div id="results" hidden$="[[!_canShowResults(searchTerm, items, items.splices)]]">
          <iron-selector id="selector">
            <template is="dom-repeat" items="{{items}}">
              <a class="item" href$="[[_getUrl(item, false, urlFor)]]" on-click="_itemClicked">
                <div class="thumbnailContainer">
                  <iron-icon
                    src="[[_getThumbnail(item)]]"
                    icon="[[_getIcon(item)]]"
                    sizing="cover"
                    position="center"
                    class="thumbnailContainer"
                  >
                  </iron-icon>
                </div>
                <div class="details">
                  <div class="itemName">[[item.label]]</div>
                  <div class="itemPath">[[_getUrl(item, true, urlFor)]]</div>
                  <nuxeo-document-highlights highlights="[[item.highlights]]"></nuxeo-document-highlights>
                </div>
              </a>
            </template>
          </iron-selector>
        </div>
      </div>
    </div>
    <paper-icon-button
      noink
      id="searchButton"
      icon="nuxeo:search"
      name="browser"
      on-tap="toggle"
      aria-label$="[[i18n('pickerSearch.title')]]"
      aria-expanded="[[toggled]]"
    ></paper-icon-button>

    <nuxeo-keys target="[[target]]" keys="up" on-pressed="_upPressed"></nuxeo-keys>
    <nuxeo-keys target="[[target]]" keys="down" on-pressed="_downPressed"></nuxeo-keys>
    <nuxeo-keys target="[[target]]" keys="enter" on-pressed="_enterPressed"></nuxeo-keys>
    <nuxeo-keys target="[[target]]" keys="esc" on-pressed="closeResults"></nuxeo-keys>
  `,is:"nuxeo-suggester",behaviors:[d.N,l.mB],properties:{toggled:{type:Boolean,notify:!0,value:!1},searchTerm:{type:String,value:"",notify:!0,observer:"_searchTermChanged"},searchDelay:{type:Number,value:200},target:{type:Object,value(){return this}},items:{type:Array}},toggle(){this.toggled=!this.toggled,this.searchTerm="",this.toggleClass("toggled",this.toggled,this.$.searchButton),this.toggled&&this.$.searchInput.focus()},closeResults(e){e.detail.keyboardEvent.preventDefault(),this.toggle()},_searchTermChanged(){this.$.selector.selected=0,""===this.searchTerm?this.items=[]:this.debounce("suggester-search",(()=>{this.$.op.execute().then((()=>{M.forEach((e=>{let t=!1;if(e.trigger.regex)t=this.searchTerm.match(e.trigger.regex);else if(e.trigger.searchTerm){const i=e.trigger.searchTerm.trim().toLowerCase(),a=this.searchTerm.trim().toLowerCase();t=e.trigger.startsWith?i.startsWith(a):i===a}t&&this.push("items",e.suggestion)}))}))}),this.searchDelay)},_canShowResults(){return""!==this.searchTerm&&this.items&&(!Array.isArray(this.items)||this.items.length>0)},_getIcon(e){return!this._getThumbnail(e)&&`nuxeo:${e.type}`},_getThumbnail(e){return e.command?e.icon:e.thumbnailUrl&&e.thumbnailUrl.length>0?`${this.$.nxcon.url}/${e.thumbnailUrl}`:void 0},_getUrl(e,t){let i;return e.command||(i=e.type&&this.urlFor(e.type,e.id)),i&&t&&(i=i.replace("/#!","")),i},_upPressed(e){e.detail.keyboardEvent.preventDefault(),this.$.selector.selectPrevious()},_downPressed(e){e.detail.keyboardEvent.preventDefault(),this.$.selector.selectNext()},_enterPressed(e){this.$.selector.items.length>0&&(e.detail.keyboardEvent.preventDefault(),this.$.selector.items[this.$.selector.selected].click())},_itemClicked(e){e.model.item.command&&e.model.item.command.run&&e.model.item.command.run(this.searchTerm),this.toggle()}}),(0,m.k)({_template:h.d`
    <style include="iron-flex">
      :host {
        display: block;
        position: relative;
        height: calc(100vh - 7.7em - (var(--nuxeo-app-top, 0) + var(--nuxeo-app-bottom, 0)));
      }

      .task-box {
        line-height: 155%;
      }

      .task-box + .task-box {
        border-top: 1px solid var(--divider-color);
      }

      .task-due-date {
        opacity: 0.5;
        margin-right: 0.5rem;
      }

      .taskDoc .doc-title,
      .date {
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 85%;
        overflow: hidden;
      }

      .date {
        color: var(--nuxeo-warn-text);
      }

      .list-item {
        cursor: pointer;
        padding: 1em;
        border-bottom: 1px solid var(--nuxeo-border);
      }

      .list-item:hover {
        @apply --nuxeo-block-hover;
      }

      .list-item.selected,
      .list-item:focus,
      .list-item.selected:focus {
        @apply --nuxeo-block-selected;
      }

      nuxeo-data-list {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        min-height: auto;
      }

      .task-name {
        font-weight: bold;
      }

      .horizontal {
        @apply --layout-horizontal;
        @apply --layout-center;
      }
    </style>

    <nuxeo-connection id="nx"></nuxeo-connection>

    <nuxeo-task-page-provider id="tasksProvider"></nuxeo-task-page-provider>
    <nuxeo-data-list
      nx-provider="tasksProvider"
      id="list"
      as="task"
      selected-item="{{_selection}}"
      empty-label="[[i18n('tasksList.noTasks')]]"
      selection-enabled
      select-on-tap
    >
      <template>
        <div tabindex$="{{tabIndex}}" class$="[[_computedClass(selected)]]">
          <div class="task-box">
            <div class="horizontal layout center">
              <span class="task-name">[[i18n(task.name)]]</span>
            </div>
            <div>
              <div class="taskDoc horizontal">
                <span class="doc-title">[[task.targetDocumentIds.0.title]]</span>
              </div>
              <div class="horizontal">
                <span class="task-due-date">[[i18n('tasksList.dueDate')]]</span>
                <span class="date">
                  <nuxeo-date datetime="[[task.dueDate]]" format="relative"></nuxeo-date>
                </span>
              </div>
            </div>
            <div class="horizontal">
              <span>[[i18n(task.workflowModelName)]]</span>
            </div>
          </div>
        </div>
      </template>
    </nuxeo-data-list>
  `,is:"nuxeo-tasks-list",behaviors:[d.N,l.mB],properties:{current:{type:Object,observer:"_currentChanged"},_selection:{type:Object,observer:"_selectionChanged"},noNavigation:Boolean},ready(){this.$.nx.connect().then((e=>{this.$.tasksProvider.params={userId:e.id}}))},_selectionChanged(){this._selection&&!this.noNavigation&&this.navigateTo("tasks",this._selection.id)},selectTask(e,t,{offset:i,pageSize:a}){let o;const n=this.$.list.items;o=n.find((e=>e.id===t.id))?Promise.resolve():this.fetch(i,a),o.then((()=>{n[e]&&n[e].id!==t.id&&(e=n.findIndex((e=>e.id===t.id))),this.$.list.scrollToIndex(e),this.$.list.selectIndex(e)}))},_currentChanged(e,t){if(e&&t&&e.id===t.id||this._selection&&e&&this._selection.id===e.id)return;const i=this.$.list.items;if(e&&i){for(let t=0;t<i.length;t++)if(i[t].id===e.id){this.$.list.selectItem(i[t]);break}}else if(t){const e=i.find((e=>e.id===t.id));e&&this.$.list.deselectItem(e)}},_computedClass(e){let t="list-item";return e&&(t+=" selected"),t},fetch(e,t=this.$.tasksProvider.pageSize){return e?this.$.list._fetchRange(e,e+t,!1):this.$.list.fetch()}}),(0,m.k)({_template:h.d`
    <style include="nuxeo-styles">
      .tasks-dashboard {
        padding: 0.7em 1em;
        display: block;
        border-top: 1px solid var(--nuxeo-border);
      }
    </style>

    <div class="header">
      <h5>[[i18n('app.tasks')]]</h5>
    </div>
    <nuxeo-tasks-list id="tasks" current="[[currentTask]]"></nuxeo-tasks-list>
    <div class="tasks-dashboard">
      <paper-button id="link" class="text small" on-click="_navigateToDashboard"
        >[[i18n('app.viewTasksDashboard')]]</paper-button
      >
    </div>
  `,is:"nuxeo-tasks-drawer",behaviors:[d.N,l.mB],properties:{tasks:Array,currentTask:Object,visible:Boolean},observers:["_observeVisible(visible)"],_observeVisible(e){e&&this.$.tasks.fetch()},_navigateToDashboard(){this.navigateTo("tasks")}}),(0,m.k)({_template:h.d`
    <style>
      :host {
        display: block;
      }

      nuxeo-card[selected] {
        border: 2px solid var(--default-primary-color);
        border-radius: 3px;
      }

      iron-image {
        width: 100%;
        height: 250px;
        margin-bottom: 8px;
        background-color: rgba(0, 0, 0, 0.05);
      }

      .details {
        @apply --layout-horizontal;
        @apply --layout-justified;
        @apply --layout-center;
      }

      .label {
        margin-left: 8px;
      }

      paper-button {
        @apply --nx-button-primary;
      }

      paper-button[disabled] {
        @apply --nx-button-disabled;
      }
    </style>

    <nuxeo-card selected$="[[_selected(name)]]">
      <iron-image src="[[_image(name)]]" sizing="contain"></iron-image>
      <div class="details">
        <div class="label">[[_label(name)]]</div>
        <paper-button on-tap="_apply" noink disabled$="[[_selected(name)]]">
          [[_button(name)]]
        </paper-button>
      </div>
    </nuxeo-card>
  `,is:"nuxeo-theme",behaviors:[l.mB],properties:{name:String,title:String,preview:String},_image(e){return this.preview?this.preview:`themes/${e}/preview.jpg`},_label(e){return this.title?this.title:this.i18n(`themes.${e}`)},_button(e){return this.i18n("themes."+(this._selected(e)?"current":"apply"))},_selected(e){const t=localStorage.getItem("theme");return t?t===e:"default"===e},_apply(){localStorage.setItem("theme",this.name),this.fire("theme-changed",{theme:this.name})}}),i(96430),(0,m.k)({_template:h.d`
    <style include="nuxeo-styles iron-flex iron-flex-alignment">
      :host {
        display: block;
      }

      .main {
        position: relative;
      }

      .edit {
        position: absolute;
      }

      #editNote.edit {
        right: 10px;
        top: 10px;
      }

      #editHtml.edit {
        left: 0;
        bottom: 0;
        padding: 0;
        width: 24px;
        height: 24px;
        z-index: 1;
      }

      .html-editor-container paper-textarea {
        padding: 0;
      }

      paper-textarea,
      nuxeo-document-preview {
        display: block;
        min-height: calc(80vh - 90px);
      }

      nuxeo-html-editor {
        min-height: calc(80vh - 90px);
        height: var(--nuxeo-note-editor-html-height);
      }

      paper-textarea {
        --paper-input-container-underline: {
          border-bottom: none 0;
        }
        --paper-input-container-underline-focus: {
          border-bottom: none 0;
        }
      }
    </style>

    <nuxeo-document id="note" doc-id="[[document.uid]]"></nuxeo-document>

    <div class="main">
      <template is="dom-if" if="[[_isHTML(document)]]">
        <div class="html-editor-container">
          <paper-icon-button
            id="editHtml"
            class="edit"
            icon="[[_computeHtmlEditIcon(_viewMode)]]"
            on-tap="_toggleHtmlSource"
            hidden$="[[!_canEdit(document)]]"
            aria-labelledby="editHtmlTooltip"
          ></paper-icon-button>
          <paper-tooltip for="editHtml" position="right" id="editHtmlTooltip"
            >[[_computeHtmlEditLabel(_viewMode, i18n)]]</paper-tooltip
          >
          <template is="dom-if" if="[[_viewMode]]">
            <nuxeo-html-editor value="{{_value}}" read-only="[[!_canEdit(document)]]"></nuxeo-html-editor>
          </template>
          <template is="dom-if" if="[[!_viewMode]]">
            <paper-textarea
              value="{{_value}}"
              no-label-float
              placeholder="[[i18n('noteViewLayout.placeholder')]]"
            ></paper-textarea>
          </template>
          <div class="layout horizontal end-justified">
            <paper-button name="editorSave" noink class="primary" on-tap="_editorSave" hidden$="[[!_canEdit(document)]]"
              >[[i18n('command.save')]]</paper-button
            >
          </div>
        </div>
      </template>

      <template is="dom-if" if="[[!_isHTML(document)]]">
        <template is="dom-if" if="[[_viewMode]]">
          <paper-icon-button
            id="editNote"
            class="edit"
            icon="nuxeo:edit"
            on-tap="_edit"
            hidden$="[[!_canEdit(document)]]"
            aria-labelledby="editNoteTooltip"
          ></paper-icon-button>
          <paper-tooltip for="editNote" position="bottom" id="editNoteTooltip">[[i18n('command.edit')]]</paper-tooltip>
          <nuxeo-document-preview document="[[document]]"></nuxeo-document-preview>
        </template>
        <template is="dom-if" if="[[!_viewMode]]">
          <paper-textarea
            value="{{_value}}"
            no-label-float
            placeholder="[[i18n('noteViewLayout.placeholder')]]"
          ></paper-textarea>
          <div class="layout horizontal end-justified">
            <paper-button noink on-tap="_cancel">[[i18n('command.cancel')]]</paper-button>
            <paper-button name="editorSave" noink class="primary" on-tap="_editorSave"
              >[[i18n('command.save')]]</paper-button
            >
          </div>
        </template>
      </template>
    </div>
  `,is:"nuxeo-note-editor",behaviors:[u.M,c.V],properties:{document:{type:Object,observer:"_documentChanged"},_viewMode:{type:Boolean,value:!0},_value:{type:String,value:""}},_documentChanged(){this._value=this.document.properties["note:note"]},_isHTML(){return this.document&&"text/html"===this.document.properties["note:mime_type"]},_computeHtmlEditIcon(){return this._viewMode?"icons:code":"nuxeo:edit"},_computeHtmlEditLabel(){return this._viewMode?this.i18n("noteEditor.editSource"):this.i18n("noteEditor.editRich")},_editorSave(){this.$.note.data={"entity-type":"document",uid:this.document.uid,properties:{"note:note":this._value}},this.$.note.put().then((()=>{this.notify({message:this.i18n("noteViewLayout.note.saved")}),this._viewMode=!0,this.fire("document-updated")}))},_isMutable(e){return!this.hasFacet(e,"Immutable")&&"Root"!==e.type&&!this.isTrashed(e)},_canEdit(e){return"Root"!==e.type&&this.hasPermission(e,"WriteProperties")&&this._isMutable(e)},_edit(){this._value=this.document.properties["note:note"],this._viewMode=!1},_cancel(){this._value="",this._viewMode=!0},_toggleHtmlSource(){this._viewMode=!this._viewMode}}),(0,m.k)({_template:h.d`
    <style include="nuxeo-styles">
      :host {
        overflow: hidden;
      }

      .content {
        @apply --layout-vertical;
        height: calc(100vh - 61px - (var(--nuxeo-app-top, 0) + var(--nuxeo-app-bottom, 0)));
      }

      nuxeo-data-list {
        display: block;
        position: relative;
        height: 100%;
        min-height: auto;
      }

      .list-item {
        cursor: pointer;
        padding: 1em;
        border-bottom: 1px solid var(--nuxeo-border);
      }

      .list-item:hover {
        @apply --nuxeo-block-hover;
      }

      .list-item.selected,
      .list-item:focus,
      .list-item.selected:focus {
        @apply --nuxeo-block-selected;
      }

      .list-item-box {
        @apply --layout-vertical;
      }

      .list-item-info {
        @apply --layout-horizontal;
        @apply --layout-center;
      }

      .list-item-thumbnail {
        @apply --layout-vertical;
        @apply --layout-center;
      }

      .list-item-title {
        @apply --layout-flex;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .list-item iron-icon {
        display: block;
        @apply --nuxeo-action;
        color: var(--nuxeo-drawer-text);
      }

      .list-item iron-icon:hover {
        @apply --nuxeo-action-hover;
        color: var(--nuxeo-drawer-text);
      }

      .remove {
        padding: 0;
        width: 1.5em;
        height: 1.5em;
      }

      .toolbar {
        @apply --layout-horizontal;
        @apply --layout-center-justified;
        @apply --nx-actions;
        padding-bottom: 8px;
      }

      .tip {
        opacity: 0.5;
        display: block;
        font-weight: 300;
        padding: 8px;
        text-align: center;
        font-size: 1rem;
      }
    </style>

    <nuxeo-document-storage id="storage" name="nuxeo-clipboard" documents="{{documents}}"></nuxeo-document-storage>
    <nuxeo-operation
      id="op"
      input="docs:[[_uids(documents.*)]]"
      params="[[_opParams(targetDocument)]]"
      sync-indexing
    ></nuxeo-operation>

    <div class="header">
      <h5>[[i18n('app.clipboard')]]</h5>
    </div>

    <div class="content">
      <nuxeo-data-list
        items="[[documents]]"
        id="list"
        selected-item="{{selectedDocument}}"
        selection-enabled
        select-on-tap
        as="document"
        empty-label="[[i18n('clipboard.empty')]]"
        empty-label-when-filtered="[[i18n('clipboard.empty')]]"
      >
        <template>
          <div tabindex$="{{tabIndex}}" class$="[[_computedClass(selected)]]">
            <div class="list-item-box">
              <div class="list-item-info">
                <div class="list-item-thumbnail">
                  <nuxeo-document-thumbnail document="[[document]]"></nuxeo-document-thumbnail>
                </div>
                <div class="list-item-title">
                  [[_title(document)]]
                </div>
                <iron-icon class="remove" icon="nuxeo:remove" alt="Remove" on-tap="_remove"></iron-icon>
              </div>
            </div>
          </div>
        </template>
      </nuxeo-data-list>

      <div class="tip">
        [[i18n('clipboard.tip')]]
      </div>

      <div class="toolbar">
        <div class="actions">
          <paper-button
            id="paste"
            on-tap="execute"
            data-op="Document.Copy"
            disabled="[[!canPaste(documents, targetDocument, documents.splices)]]"
            noink
            class="primary clear"
          >
            <iron-icon icon="nuxeo:copy"></iron-icon>
            [[i18n('clipboard.copy')]]
          </paper-button>
          <nuxeo-tooltip for="paste">[[i18n('clipboard.copy')]]</nuxeo-tooltip>
          <paper-button
            id="move"
            on-tap="execute"
            data-op="Document.Move"
            disabled="[[!canPaste(documents, targetDocument, documents.splices)]]"
            noink
            class="primary clear"
          >
            <iron-icon icon="nuxeo:move"></iron-icon>
            [[i18n('clipboard.move')]]
          </paper-button>
          <nuxeo-tooltip for="move">[[i18n('clipboard.move')]]</nuxeo-tooltip>
        </div>
      </div>
    </div>
  `,is:"nuxeo-clipboard",behaviors:[d.N,l.mB,s.q],properties:{documents:{type:Array,notify:!0},targetDocument:{type:Object,observer:"_documentChanged"},selectedDocument:{type:Object,observer:"_observeSelectedDocument"}},observers:["_observeDocuments(documents.splices)"],_observeDocuments(){this.documents&&this.fire("nx-clipboard-updated",{docCount:this.documents.length})},_documentChanged(e){if(e&&this.contains(e)){const t=this.$.storage.get(e);t&&t.title!==e.title&&this.$.storage.update(t,{title:e.title})}},add(e){let t=[];e instanceof Array?(e.forEach((e=>{this.$.storage.add(e)})),t=e.map((e=>e.uid))):(this.$.storage.add(e),t.push(e.uid)),this.fire("added-to-clipboard",{docIds:t})},contains(e){return this.$.storage.contains(e)},remove(e){this.$.storage.remove(e)},canPaste(e,t){return!(!e||0===e.length||!this.hasFacet(t,"Folderish"))&&(!t.contextParameters||!t.contextParameters.subtypes||e.every((e=>t.contextParameters.subtypes.map((e=>e.type)).indexOf(e.type)>-1)))},execute(e){const t=e.currentTarget.dataset.op;this.$.op.op=t,this.$.op.execute().then((e=>{this.documents=[],this.fire("clipboard-action-performed",{operation:t,documents:e&&e.entries})}))},_remove(e){e.stopImmediatePropagation(),this.remove(e.model.document),this.fire("removed-from-clipboard",{docId:e.model.document.uid})},_uids(){return this.documents&&null!==this.documents?this.documents.map((e=>e.uid)).join(","):""},_opParams(){if(this.targetDocument)return{target:this.targetDocument.uid}},_observeSelectedDocument(e){e&&this.navigateTo(e)},_title(e){if(e)return"Root"===e.type?this.i18n("browse.root"):e.title},_computedClass(e){let t="list-item";return e&&(t+=" selected"),t}}),(0,m.k)({_template:h.d`
    <style include="nuxeo-styles iron-flex">
      :host {
        @apply --layout-vertical;
        @apply --layout-flex;
        display: block;
      }

      .header {
        align-items: var(--layout-center_-_align-items);
        font-size: 1rem;
        height: 53px;
        padding: 0 16px;
        text-overflow: ellipsis;
        color: var(--nuxeo-drawer-header);
      }

      nuxeo-data-list {
        height: calc(100vh - 61px - (var(--nuxeo-app-top, 0) + var(--nuxeo-app-bottom, 0)));
      }

      nuxeo-data-list {
        display: block;
        position: relative;
      }

      .collections {
        height: calc(100vh - 61px - (var(--nuxeo-app-top, 0) + var(--nuxeo-app-bottom, 0)));
        overflow: auto;
      }

      neon-animatable.nuxeo-collections {
        box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.1);
      }

      .switch {
        position: absolute;
        top: 0;
        right: 0;
        width: 60px;
        height: 53px;
        padding: 16px;
        z-index: 101;
        border-left: 1px solid var(--divider-color);
      }

      .switch:hover {
        background-color: var(--nuxeo-button-primary);
        color: var(--nuxeo-button-primary-text);
      }

      .content {
        @apply --layout-flex;
        @apply --layout-vertical;
        height: calc(100vh - 61px - (var(--nuxeo-app-top, 0) + var(--nuxeo-app-bottom, 0)));
        width: 293px;
      }

      .collection-box {
        line-height: 155%;
      }

      .collection-box + .collection-box {
        border-top: 1px solid var(--divider-color);
      }

      iron-icon.collection-name-icon {
        height: 0.9em;
        width: 0.9em;
        border-radius: 50px;
        background-color: var(--dark-primary-color);
        color: white;
        padding: 0.4em;
      }

      .collection-name {
        font-weight: 700;
        margin-left: 0.5em;
      }

      .collection-detail {
        margin-left: 2.2em;
      }

      .collection-property {
        opacity: 0.7;
        margin-right: 0.2em;
      }

      .list-item {
        cursor: pointer;
        padding: 1em;
        border-bottom: 1px solid var(--nuxeo-border);
      }

      .list-item:hover {
        @apply --nuxeo-block-hover;
      }

      .list-item.selected,
      .list-item:focus,
      .list-item.selected:focus {
        @apply --nuxeo-block-selected;
      }

      .list-item iron-icon {
        @apply --nuxeo-action;
      }

      .list-item iron-icon:hover {
        @apply --nuxeo-action-hover;
      }

      .remove {
        width: 1.7em;
        height: 1.7em;
        margin-left: 1em;
      }

      .list-item-property {
        opacity: 0.5;
        display: block;
        margin: 0.2em 0;
        font-size: 0.8rem;
      }

      .horizontal {
        @apply --layout-flex;
        @apply --layout-horizontal;
      }
    </style>

    <nuxeo-operation op="Collection.RemoveFromCollection" id="removeFromCollectionOp"></nuxeo-operation>

    <div class="header ellipsis search-header">
      <template is="dom-if" if="[[_isDisplayMembers]]">
        <h5>[[selectedCollection.title]]</h5>
        <paper-icon-button
          class="switch"
          icon="icons:arrow-back"
          id="backToCollections"
          on-tap="displayCollections"
          aria-labelledby="backToCollectionsTooltip"
        >
        </paper-icon-button>
        <nuxeo-tooltip for="backToCollections" id="backToCollectionsTooltip"
          >[[i18n('collections.backToCollections')]]</nuxeo-tooltip
        >
      </template>
      <template is="dom-if" if="[[!_isDisplayMembers]]">
        <h5>[[i18n('collections.heading')]]</h5>
      </template>
    </div>

    <neon-animated-pages
      class="content"
      id="queues"
      selected="[[_selectedPage]]"
      entry-animation="[[_entryAnimation]]"
      exit-animation="[[_exitAnimation]]"
    >
      <neon-animatable>
        <div id="collections" class="collections" hidden$="{{_isDisplayMembers}}">
          <nuxeo-page-provider
            id="collectionsProvider"
            provider="user_collections"
            page-size="40"
            params='{"searchTerm":"%","user": "$currentUser"}'
            sort='{"dc:modified": "desc"}'
            schemas="dublincore,common"
            enrichers="permissions"
            headers='{"fetch-document": "properties"}'
          >
          </nuxeo-page-provider>

          <nuxeo-page-provider
            id="membersProvider"
            provider="default_content_collection"
            schemas="dublincore,common"
            page-size="40"
            enrichers="thumbnail, permissions"
          >
          </nuxeo-page-provider>

          <nuxeo-data-list
            nx-provider="collectionsProvider"
            id="collectionsList"
            selected-item="{{selectedCollection}}"
            selection-enabled
            select-on-tap
            as="collection"
            empty-label="[[i18n('collections.empty')]]"
            empty-label-when-filtered="[[i18n('collections.empty')]]"
          >
            <template>
              <div tabindex$="{{tabIndex}}" class$="[[_computedClass(selected)]]">
                <div class="collection-box">
                  <div class="collection-info horizontal layout center">
                    <iron-icon class="collection-name-icon" icon="nuxeo:collections"></iron-icon>
                    <span class="collection-name title">[[collection.title]]</span>
                  </div>
                  <div class="collection-detail">
                    <div class="date horizontal layout center">
                      <span class="collection-property">[[i18n('collections.lastModified')]] </span>
                      <nuxeo-date datetime="[[collection.properties.dc:modified]]"></nuxeo-date>
                    </div>
                    <div class="layout center horizontal">
                      <span class="collection-property">[[i18n('collections.ownedBy')]]</span>
                      <nuxeo-user-tag user="[[collection.properties.dc:creator]]"></nuxeo-user-tag>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </nuxeo-data-list>
        </div>
      </neon-animatable>

      <neon-animatable>
        <div id="queue" hidden$="{{!_isDisplayMembers}}">
          <nuxeo-data-list
            id="membersList"
            selected-item="{{selectedMember}}"
            selection-enabled
            select-on-tap
            as="member"
            nx-provider="membersProvider"
            empty-label="[[i18n('collections.members.empty')]]"
            empty-label-when-filtered="[[i18n('collections.members.empty')]]"
          >
            <template>
              <div tabindex$="{{tabIndex}}" class$="[[_computedClass(selected)]]">
                <div class="list-item-box">
                  <div class="list-item-info horizontal layout center">
                    <div class="vertical layout center">
                      <nuxeo-document-thumbnail document="[[member]]"></nuxeo-document-thumbnail>
                    </div>
                    <div class="flex">
                      <span class="list-item-title ellipsis">[[member.title]]</span>
                      <span class="list-item-property ellipsis">[[formatDocType(member.type)]]</span>
                    </div>
                    <iron-icon
                      id="removeFromCollection"
                      class="remove"
                      hidden$="[[!_canRemove(selectedCollection)]]"
                      icon="nuxeo:remove"
                      data-uid$="[[member.uid]]"
                      on-tap="_removeFromCollection"
                    >
                    </iron-icon>
                  </div>
                </div>
              </div>
            </template>
          </nuxeo-data-list>
        </div>
      </neon-animatable>
    </neon-animated-pages>

    <nuxeo-keys keys="right l" on-pressed="_navigateOnRight"></nuxeo-keys>
    <nuxeo-keys keys="left h" on-pressed="_navigateOnLeft"></nuxeo-keys>
    <nuxeo-keys keys="down j" on-pressed="_navigateOnDown"></nuxeo-keys>
    <nuxeo-keys keys="up k" on-pressed="_navigateOnUp"></nuxeo-keys>
  `,is:"nuxeo-collections",behaviors:[d.N,r.e,s.q],properties:{selectedSearch:{type:String,value:"faceted"},_isDisplayMembers:{type:Boolean,value:!1,observer:"_observeIsDisplayMembers"},selectedCollection:{type:Object,observer:"_selectedCollectionChanged",notify:!0},selectedMember:{type:Object,observer:"_selectedMemberChanged",notify:!0},_entryAnimation:{type:String,value:"slide-from-right-animation"},_exitAnimation:{type:String,value:"slide-left-animation"},visible:{type:Boolean,observer:"_visibleChanged"}},_navigateOnRight(e){this._isDisplayMembers||(e.detail.keyboardEvent.preventDefault(),this.selectedCollection&&(this.displayMembers(),this.$.membersList.fire("iron-resize"),this.$.membersList.items.length>0&&this.$.membersList.selectIndex(0)),this._tmpJustRight=!0)},_navigateOnLeft(e){this._isDisplayMembers&&(e.detail.keyboardEvent.preventDefault(),this.displayCollections(),this.$.collectionsList.fire("iron-resize")),this._tmpJustLeft=!0},_navigateOnDown(e){this._isDisplayMembers?(e.detail.keyboardEvent.preventDefault(),this._tmpJustRight&&(this.$.membersList.selectNext(),this._tmpJustRight=!1)):this._tmpJustLeft&&(e.detail.keyboardEvent.preventDefault(),this.$.collectionsList.selectNext(),this._tmpJustLeft=!1)},_navigateOnUp(e){this._isDisplayMembers?this._tmpJustRight&&(e.detail.keyboardEvent.preventDefault(),this.$.membersList.selectPrevious(),this._tmpJustRight=!1):this._tmpJustLeft&&(e.detail.keyboardEvent.preventDefault(),this.$.collectionsList.selectPrevious(),this._tmpJustLeft=!1)},_observeIsDisplayMembers(){this._isDisplayMembers?(this._entryAnimation="slide-from-right-animation",this._exitAnimation="slide-left-animation",this._selectedPage=1):(this._entryAnimation="slide-from-left-animation",this._exitAnimation="slide-right-animation",this._selectedPage=0,this.selectedCollection&&this.fire("navigate",{doc:this.selectedCollection}))},displayMembers(e,t){this._isDisplayMembers=!0,"number"==typeof t&&this.selectedCollection&&e&&this.selectedCollection.uid===e.uid&&(this.$.membersList.selectIndex(t),this.$.membersList.scrollToIndex(t))},displayCollections(){this._isDisplayMembers=!1},_removeFromCollection(e){const t=this.$.removeFromCollectionOp,i=e.currentTarget.dataset.uid;t.input=i,t.params={collection:this.selectedCollection.uid},t.execute().then((()=>{this._removeFromMembers(i),this.fire("removed-from-collection",{innerRemove:!0,doc:i,collectionId:e.target.dataset.uid})}))},_removeFromMembers(e){const t=this.$.membersList.items.findIndex((t=>t.uid===e));t>-1&&(this.$.membersList.splice("items",t,1),this.$.membersList.items.length>t?this.$.membersList.selectIndex(t):this.$.membersList.selectIndex(this.$.membersList.items.length-1))},_computedClass(e){let t="list-item";return e&&(t+=" selected"),t},_selectedMemberChanged(e){e&&this.navigateTo(e)},_selectedCollectionChanged(e){e&&this.fire("navigate",{doc:e})},_isEmpty:e=>e&&0===e.length,ready(){window.addEventListener("added-to-collection",(()=>{this.visible&&(this._refreshCollections(),this._isDisplayMembers&&(this.$.membersList.reset(),this.$.membersList.fetch()))})),window.addEventListener("removed-from-collection",(e=>{if(this.visible){if(e.detail.innerRemove)return;this.selectedCollection&&this.selectedCollection.uid===e.detail.collectionId?this._removeFromMembers(e.detail.doc.uid):this._isDisplayMembers||this._refreshCollections()}}))},_visibleChanged(){this.visible&&(this.selectedCollection=null,this._refreshCollections(),this.displayCollections())},_canRemove:e=>!!(e&&e.contextParameters&&e.contextParameters.permissions)&&e.contextParameters.permissions.indexOf("ReadCanCollect")>-1,_refreshCollections(){this.$.collectionsList.reset(),this.$.collectionsList.fetch()},loadCollection(e){e&&this.selectedCollection&&this.selectedCollection.uid===e.uid&&(this.$.membersProvider.params=[e.uid],this.$.membersList.reset(),this.$.membersList.fetch(),this.displayCollections())}}),(0,m.k)({_template:h.d`
    <style include="nuxeo-styles">
      .content {
        @apply --layout-vertical;
      }

      nuxeo-data-list {
        display: block;
        position: relative;
        min-height: calc(100vh - 61px - (var(--nuxeo-app-top, 0) + var(--nuxeo-app-bottom, 0)));
      }

      .list-item {
        cursor: pointer;
        padding: 1em;
        border-bottom: 1px solid var(--nuxeo-border);
      }

      .list-item-box {
        @apply --layout-vertical;
      }

      .list-item-info {
        @apply --layout-horizontal;
        @apply --layout-center;
      }

      .list-item-thumbnail {
        @apply --layout-vertical;
        @apply --layout-center;
      }

      .list-item-title {
        @apply --layout-flex;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .list-item:hover {
        @apply --nuxeo-block-hover;
      }

      .list-item.selected,
      .list-item:focus,
      .list-item.selected:focus {
        @apply --nuxeo-block-selected;
      }

      .list-item-property {
        opacity: 0.5;
        margin-right: 0.2em;
      }

      .list-item iron-icon {
        display: block;
        @apply --nuxeo-action;
        color: var(--nuxeo-drawer-text);
      }

      .list-item iron-icon:hover {
        @apply --nuxeo-action-hover;
        color: var(--nuxeo-drawer-text);
      }

      .remove {
        width: 1.5em;
        height: 1.5em;
      }

      #removeButton {
        border: none;
        padding: 0;
        margin: 0;
        background-color: transparent;
      }
    </style>

    <nuxeo-operation id="removeFromFavOp" op="Document.RemoveFromFavorites"></nuxeo-operation>

    <nuxeo-operation id="fetchFavOp" op="Favorite.Fetch" response="favorite"></nuxeo-operation>

    <nuxeo-page-provider
      id="favoritesProvider"
      provider="default_content_collection"
      page-size="30"
      schemas="dublincore,common"
      enrichers="thumbnail"
    >
    </nuxeo-page-provider>

    <div class="header">
      <h5>[[i18n('app.favorites')]]</h5>
    </div>
    <div class="content">
      <nuxeo-data-list
        nx-provider="favoritesProvider"
        id="favoritesList"
        selected-item="{{selectedFavorite}}"
        items="{{favorites}}"
        selection-enabled
        select-on-tap
        as="favorite"
        empty-label="[[i18n('favorites.empty')]]"
        empty-label-when-filtered="[[i18n('favorites.empty')]]"
      >
        <template>
          <div tabindex$="{{tabIndex}}" class$="[[_computedClass(selected)]]">
            <div class="list-item-box">
              <div class="list-item-info">
                <div class="list-item-thumbnail">
                  <nuxeo-document-thumbnail document="[[favorite]]"></nuxeo-document-thumbnail>
                </div>
                <div class="list-item-title">[[favorite.title]]</div>
                <button id="removeButton" on-tap="_removeFromFavorites" aria-label$="[[i18n('command.remove')]]">
                  <iron-icon
                    aria-hidden="true"
                    id="removeFromFavorites"
                    class="remove"
                    icon="nuxeo:remove"
                    data-uid$="[[favorite.uid]]"
                  >
                  </iron-icon>
                </button>
              </div>
            </div>
          </div>
        </template>
      </nuxeo-data-list>
    </div>
  `,is:"nuxeo-favorites",behaviors:[d.N,l.mB,s.q],properties:{favorites:{type:Object,notify:!0},selectedFavorite:{type:Object,observer:"_selectedFavoriteChanged",notify:!0},visible:{type:Boolean,observer:"_visibleChanged"}},_visibleChanged(){this.visible&&!this.favorite&&this._refresh()},ready(){window.addEventListener("added-to-favorites",this._refresh.bind(this)),window.addEventListener("removed-from-favorites",this._refresh.bind(this))},_refresh(){this._fetchFavorite().then((e=>{e&&(this.$.favoritesProvider.params=[e.uid],this.$.favoritesProvider.page=1,this.$.favoritesList.fetch())}))},_fetchFavorite(){return this.favorite?Promise.resolve(this.favorite):this.$.fetchFavOp.execute().then((e=>(204===e.status?this.favorite=null:this.favorite=e,this.favorite)))},_computedClass(e){let t="list-item";return e&&(t+=" selected"),t},_selectedFavoriteChanged(e){e&&this.navigateTo(e)},_removeFromFavorites(e){e.stopImmediatePropagation();const t=e.model.favorite.uid;this.$.removeFromFavOp.input=t,this.$.removeFromFavOp.execute().then((()=>{this.fire("removed-from-favorites",{docUid:t})}))}}),(0,m.k)({_template:h.d`
    <style include="nuxeo-styles">
      .content {
        @apply --layout-vertical;
      }

      nuxeo-data-list {
        display: block;
        position: relative;
        min-height: calc(100vh - 61px - (var(--nuxeo-app-top, 0) + var(--nuxeo-app-bottom, 0)));
      }

      .list-item {
        cursor: pointer;
        padding: 1em;
        border-bottom: 1px solid var(--nuxeo-border);
      }

      .list-item-title {
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .list-item-info {
        @apply --layout-horizontal;
        @apply --layout-center;
      }

      .list-item:hover {
        @apply --nuxeo-block-hover;
      }

      .list-item.selected,
      .selected:focus,
      .list-item.selected:focus {
        @apply --nuxeo-block-selected;
      }
    </style>

    <nuxeo-document-storage
      id="storage"
      name="nuxeo-recent-documents"
      documents="{{documents}}"
    ></nuxeo-document-storage>

    <div class="header">
      <h5>[[i18n('app.recentlyViewed')]]</h5>
    </div>
    <div class="content">
      <nuxeo-data-list
        items="[[documents]]"
        id="recentDocumentsList"
        as="document"
        selected-item="{{selectedRecent}}"
        selection-enabled
        select-on-tap
        empty-label="[[i18n('recentDocuments.empty')]]"
        empty-label-when-filtered="[[i18n('recentDocuments.empty')]]"
      >
        <template>
          <div tabindex$="{{tabIndex}}" class$="[[_computedClass(selected)]]">
            <div class="list-item-info">
              <nuxeo-document-thumbnail document="[[document]]"></nuxeo-document-thumbnail>
              <div class="list-item-title">
                [[_title(document)]]
              </div>
            </div>
          </div>
        </template>
      </nuxeo-data-list>
    </div>
  `,is:"nuxeo-recent-documents",behaviors:[d.N,l.mB,s.q],properties:{documents:{type:Array,notify:!0},maxSize:{type:Number,value:10},selectedRecent:{type:Object,observer:"_selectedRecentChanged",notify:!0},currentDocument:{type:Object,observer:"_currentDocumentChanged"}},add(e){this.$.storage.add(e),this.documents.length>this.maxSize&&this.splice("documents",-1,1)},contains(e){return this.$.storage.contains(e)},remove(e){this.$.storage.remove(e)},update(e){this.$.storage.remove(e),this.$.storage.add(e)},_computedClass(e){let t="list-item";return e&&(t+=" selected"),t},_selectedRecentChanged(e){e&&this.navigateTo(e)},_currentDocumentChanged(e){e&&!this.isTrashed(e)&&(this.documents?this._addOrUpdateStorage(e):(this._localStorageLoaded||(this._localStorageLoaded=new Promise((e=>{this.addEventListener("iron-localstorage-load",(t=>e(t)))}))),this._localStorageLoaded.then((()=>this._addOrUpdateStorage(e)))))},_title(e){if(e)return"Root"===e.type?this.i18n("browse.root"):e.title},_addOrUpdateStorage(e){this.contains(e)?this.update(e):this.add(e)}}),i(50681),i(94616),i(28117),i(37371),i(73938),i(66542),i(41180),i(37638),i(84806),(0,m.k)({_template:h.d`
    <style include="nuxeo-action-button-styles">
      :host([in-clipboard]) {
        color: var(--icon-toggle-pressed-color, var(--nuxeo-action-color-activated));
      }
    </style>

    <template is="dom-if" if="[[_isAvailable(document)]]">
      <div class="action" on-tap="toggle">
        <paper-icon-button icon="[[icon]]" active="[[inClipboard]]" noink aria-labelledby="label"></paper-icon-button>
        <span class="label" hidden$="[[!showLabel]]" id="label">[[_label]]</span>
        <nuxeo-tooltip>[[_label]]</nuxeo-tooltip>
      </div>
    </template>
  `,is:"nuxeo-clipboard-toggle-button",behaviors:[l.mB,s.q],properties:{document:{type:Object,observer:"_update"},clipboard:{type:Object,observer:"_clipboardChanged"},icon:{type:String,value:"icons:content-paste"},inClipboard:{type:Boolean,notify:!0,reflectToAttribute:!0},showLabel:{type:Boolean,value:!1},_label:{type:String,computed:"_computeLabel(inClipboard, i18n)"}},_isAvailable(e){return!(this.isTrashed(e)||this.hasType(e,"Favorites")||this.isVersion(e)||this.isProxy(e))},toggle(){this.clipboard.contains(this.document)?(this.clipboard.remove(this.document),this.fire("removed-from-clipboard",{docId:this.document.uid})):this.clipboard.add(this.document)},_computeLabel(e){return this.i18n("clipboardToggleButton.tooltip."+(e?"remove":"add"))},_update(){this.inClipboard=this.clipboard&&this.document&&this.clipboard.contains(this.document)},_clipboardChanged(e,t){this._listener=this._listener||this._update.bind(this),t&&t.removeEventListener("documents-changed",this._listener),e&&e.addEventListener("documents-changed",this._listener),this._update()}}),(0,m.k)({_template:h.d`
    <style include="nuxeo-action-button-styles">
      nuxeo-dialog {
        height: 100%;
        max-height: var(--nuxeo-document-form-popup-max-height, 60vh);
        min-width: var(--nuxeo-document-form-popup-min-width, 915px);
        margin: 0;
      }

      .container {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
      }
    </style>

    <template is="dom-if" if="[[_isAvailable(document)]]">
      <div class="action" on-tap="_openDialog">
        <paper-icon-button noink id="[[layout]]-button" icon="[[icon]]" aria-labelledby="label"></paper-icon-button>
        <span class="label" hidden$="[[!showLabel]]" id="label">[[i18n(label)]]</span>
        <nuxeo-tooltip>[[i18n(label)]]</nuxeo-tooltip>
      </div>
    </template>

    <nuxeo-dialog id="[[layout]]-dialog" with-backdrop modal>
      <div class="container">
        <nuxeo-document-form-layout
          id="layout"
          document="[[document]]"
          layout="[[layout]]"
          on-document-updated="_closeDialog"
        ></nuxeo-document-form-layout>
      </div>
    </nuxeo-dialog>
  `,is:"nuxeo-document-form-button",behaviors:[l.mB,s.q],properties:{document:{type:Object},layout:{type:String,value:"edit"},showLabel:{type:Boolean,value:!1},label:{type:String},icon:{type:String,value:"nuxeo:edit"}},observers:["_cancelEdit(document)"],get dialog(){return this.root.getElementById(`${this.layout}-dialog`)},get button(){return this.root.getElementById(`${this.layout}-button`)},connectedCallback(){this.addEventListener("iron-overlay-opened",this._formLayoutOpened)},disconnectedCallback(){this.removeEventListener("iron-overlay-opened",this._formLayoutOpened)},_isAvailable(e){return e&&"Root"!==e.type&&this.hasPermission(e,"WriteProperties")&&this._isMutable(e)},_isMutable(e){return e&&!this.hasFacet(e,"Immutable")&&"Root"!==e.type&&!this.isTrashed(e)},_cancelEdit(e){this._isAvailable(e)||this._closeDialog()},_openDialog(){this.dialog.open()},_closeDialog(){this.dialog.close(),this.document=void 0},_formLayoutOpened(e){if(!(e.composedPath().filter((e=>"NUXEO-DIALOG"===e.tagName||"PAPER-DIALOG"===e.tagName)).length>1)){const{layout:e}=this.$.layout.$;e.applyAutoFocus()}}}),(0,m.k)({_template:h.d`
    <nuxeo-document-form-button
      document="[[document]]"
      layout="edit"
      label="documentEditAction.tooltip"
      show-label$="[[showLabel]]"
    ></nuxeo-document-form-button>
  `,is:"nuxeo-document-edit-button",properties:{document:{type:Object},showLabel:{type:Boolean,value:!1}}}),(0,m.k)({_template:h.d`
    <style include="nuxeo-action-button-styles nuxeo-styles">
      #dropzone {
        display: block;
      }
    </style>

    <nuxeo-document id="doc" doc-id="[[document.uid]]" response="{{document}}" sync-indexing></nuxeo-document>

    <dom-if if="[[_isAvailable(document)]]">
      <template>
        <div class="action" on-tap="_toggleDialog">
          <paper-icon-button id="replaceBtn" icon="[[icon]]" noink aria-labelledby="label"></paper-icon-button>
          <span class="label" hidden$="[[!showLabel]]" id="label">[[_label]]</span>
          <nuxeo-tooltip>[[_label]]</nuxeo-tooltip>
        </div>
      </template>
    </dom-if>

    <nuxeo-dialog id="dialog" with-backdrop>
      <h2>[[i18n('replaceBlobButton.dialog.heading')]]</h2>
      <nuxeo-dropzone id="dropzone" value="{{value}}" has-files="{{_canSubmit}}"></nuxeo-dropzone>
      <div class="buttons">
        <paper-button dialog-dismiss on-tap="_cancel" class="secondary"
          >[[i18n('replaceBlobButton.dialog.cancel')]]</paper-button
        >
        <paper-button noink class="primary" dialog-confirm on-tap="_replaceBlob" disabled="[[!_canSubmit]]"
          >[[i18n('replaceBlobButton.dialog.replace')]]</paper-button
        >
      </div>
    </nuxeo-dialog>
  `,is:"nuxeo-replace-blob-button",behaviors:[r.e,s.q],properties:{document:Object,xpath:{type:String,value:"file:content"},icon:{type:String,value:"nuxeo:replace"},showLabel:{type:Boolean,value:!1},_canSubmit:{type:Boolean,value:!1},_label:{type:String,computed:"_computeLabel(i18n)"}},_cancel(){this.$.dropzone._reset()},_getRootProperty(e,t){let i="";for(;e.length>0;)if(i+=(""===i?"":".")+e.shift(),Array.isArray(this.get(i,t)))return i;return i},_replaceBlob(){const e=this.xpath.includes("/")?this._getRootProperty(this.xpath.split("/"),this.document.properties):this.xpath,t={};(0,f.Z)(t,e.split(".")),this.set(e,this.get(e,this.document.properties),t),this.set(this.formatPropertyXpath(this.xpath),this.value,t),this.$.doc.data={"entity-type":"document",uid:this.document.uid,properties:t},this.$.doc.put().then((()=>{this.value=null,this.fire("document-updated")}))},_toggleDialog(){this.$.dialog.toggle()},_computeLabel(){return this.i18n("replaceBlobButton.tooltip")},_isAvailable(e){return e&&this.hasPermission(e,"WriteProperties")&&!this.isImmutable(e)&&!this.hasType(e,"Root")&&!this.isTrashed(e)&&!(e.isRecord&&"file:content"!==this.xpath)&&!(this.isUnderRetentionOrLegalHold(e)&&"file:content"===this.xpath)&&!(this.hasFacet(e,"ColdStorage")&&this.hasContent(e,"coldstorage:coldContent"))}}),i(99250),i(33078);class R extends((0,D.P)([l.mB,s.q],Nuxeo.OperationButton)){static get template(){return h.d`
      <style include="nuxeo-action-button-styles nuxeo-styles">
        :host([hidden]) {
          display: none;
        }

        /* Fix known stacking issue in iOS (NXP-24600)
           https://github.com/PolymerElements/paper-dialog-scrollable/issues/72 */
        paper-dialog-scrollable {
          --paper-dialog-scrollable: {
            -webkit-overflow-scrolling: auto;
            max-width: 500px;
            max-height: 150px;
          }
        }
      </style>

      <!-- inherit nuxeo-operation-button template -->
      ${super.template}

      <nuxeo-operation op="Collection.Create" id="createCollectionOp"></nuxeo-operation>

      <nuxeo-dialog id="dialog" with-backdrop>
        <h2>[[i18n('addToCollectionDocumentsButton.dialog.heading')]]</h2>
        <paper-dialog-scrollable>
          <nuxeo-selectivity
            id="nxSelect"
            label="[[i18n('addToCollectionDocumentsButton.dialog.collections')]]"
            operation="Collection.Suggestion"
            min-chars="0"
            placeholder="[[i18n('addToCollectionDocumentsButton.dialog.select')]]"
            value="{{collection}}"
            tagging="true"
            query-results-filter="[[resultsFilter]]"
            result-formatter="[[resultAndSelectionFormatter]]"
            selection-formatter="[[resultAndSelectionFormatter]]"
            new-entry-formatter="[[newEntryFormatter]]"
            required
          >
          </nuxeo-selectivity>
          <nuxeo-textarea
            label="[[i18n('addToCollectionDocumentsButton.dialog.description')]]"
            value="{{description::input}}"
            hidden$="[[!_isNew(collection)]]"
            always-float-label
          >
          </nuxeo-textarea>
        </paper-dialog-scrollable>

        <div class="buttons">
          <paper-button noink dialog-dismiss on-click="_resetPopup" class="secondary"
            >[[i18n('addToCollectionDocumentsButton.dialog.cancel')]]</paper-button
          >
          <paper-button name="add" noink class="primary" on-tap="add" disabled$="[[!_isValid(collection)]]">
            [[i18n('addToCollectionDocumentsButton.dialog.add')]]
          </paper-button>
        </div>
      </nuxeo-dialog>
    `}static get is(){return"nuxeo-add-to-collection-documents-button"}static get properties(){return{documents:{type:Array,notify:!0,value:[]},collection:{type:String,value:""},resultsFilter:{type:Function,value(){return this._resultsFilter.bind(this)}},resultAndSelectionFormatter:{type:Function,value(){return this._resultAndSelectionFormatter.bind(this)}},newEntryFormatter:{type:Function,value(){return this._newEntryFormatter.bind(this)}},hidden:{type:Boolean,value:!1,reflectToAttribute:!0,computed:"_isHidden(documents.splices)"}}}constructor(){super(),this.icon="nuxeo:collections",this.label="addToCollectionDocumentsButton.tooltip",this.operation="Document.AddToCollection"}_execute(){this.$.dialog.toggle()}_params(){return{collection:this.collection}}_isHidden(){return!(B(this.documents)||this.documents&&this.documents.length>0&&this.documents.every((e=>!this.hasFacet(e,"NotCollectionMember"))))}_toggleDialog(){this.$.dialog.toggle()}add(){if(this._isNew()){const e=this.$$("#createCollectionOp"),t=this.$.nxSelect.selectedItem.displayLabel;return e.input=void 0,e.params={name:t,description:this.description},e.execute().then((e=>{this.collection=e.uid,this._addToCollection()}))}this._addToCollection()}_addToCollection(){const e=B(this.documents);let t={};if(!e){const e=this.documents.map((e=>e.uid));t={docIds:e,collectionId:this.collection}}this.input=this.documents,this.params=this._params(),super._execute().then((()=>{this.fire("added-to-collection",t),e||(this._resetPopup(),this._toggleDialog())})),e&&(this._resetPopup(),this._toggleDialog())}_resultsFilter(e){return e.id&&-1===e.id.indexOf("-999999")}_resultAndSelectionFormatter(e){const t=e.displayLabel||e.title;return-1===e.id?t:(0,L.r)(t)}_newEntryFormatter(e){return{id:-1,displayLabel:e}}_isValid(){return this.collection}_isNew(){return-1===this.collection}_resetPopup(){this.set("collection",null),this.description=""}}window.customElements.define(R.is,R),(0,m.k)({_template:h.d`
    <style include="nuxeo-action-button-styles nuxeo-styles"></style>

    <template is="dom-if" if="[[_isAvailable(documents.splices)]]">
      <div class="action" on-tap="addToClipBoard">
        <paper-icon-button
          noink
          id="clipboardButton"
          icon="icons:content-paste"
          aria-labelledby="label"
        ></paper-icon-button>
        <span class="label" hidden$="[[!showLabel]]" id="label">[[_label]]</span>
        <nuxeo-tooltip position="[[tooltipPosition]]">[[_label]]</nuxeo-tooltip>
      </div>
    </template>
  `,is:"nuxeo-clipboard-documents-button",behaviors:[l.mB,s.q],properties:{documents:{type:Array,notify:!0,value:[]},tooltipPosition:{type:String,value:"bottom"},showLabel:{type:Boolean,value:!1},_label:{type:String,computed:"_computeLabel(i18n)"}},addToClipBoard(){this.fire("add-to-clipboard",{documents:this.documents}),this.fire("clear-selected-items")},_isAvailable(){return!B(this.documents)&&this.documents.every((e=>(this.isCollectionMember(e)||e.facets.includes("Collection"))&&!this.isTrashed(e)&&!this.hasType(e,"Favorites")&&!this.isVersion(e)&&!this.isProxy(e)))},_computeLabel(){return this.i18n("clipboardDocumentsButton.addToClipboard")}});class N extends((0,D.P)([l.mB,s.q],Nuxeo.OperationButton)){static get is(){return"nuxeo-delete-documents-button"}static get properties(){return{documents:{type:Object,notify:!0,value:{}},hard:{type:Boolean,value:!1},hidden:{type:Boolean,value:!1,reflectToAttribute:!0,computed:"_isHidden(documents.splices, hard)"}}}static get observers(){return["_updateIcon(hard)","_updateLabel(hard)"]}constructor(){super(),this.syncIndexing=!0}_execute(){this.deleteDocuments()}deleteDocuments(){if((B(this.documents)||this.docsHavePermissions)&&window.confirm(this.i18n("deleteDocumentsButton.confirm.deleteDocuments"))){this.input=this.documents,this.operation=this._operation(),this.params={};const{documents:e}=this,t=B(this.documents),i=t?{}:{documents:e};super._execute().then((()=>{this.fire("nuxeo-documents-deleted",i),this.documents=[],this._fetchDebouncer=I.dx.debounce(this._fetchDebouncer,_.timeOut.after(100),(()=>{this.fire("refresh")}))})).catch((i=>{t||this.fire("nuxeo-documents-deleted",{error:i,documents:e})}))}}_operation(){return this.hard?"Document.Delete":"Document.Trash"}_isHidden(){return!(B(this.documents)||this.documents&&this.documents.length>0&&this._checkDocsPermissions()&&(this.hard||!this._checkDocsAreTrashed()))}_checkDocsAreTrashed(){return this.documents.every((e=>this.isTrashed(e)))}_checkDocsPermissions(){return this.docsHavePermissions=this.documents&&!this.documents.some((e=>!this._docHasPermissions(e))),this.docsHavePermissions}_docHasPermissions(e){return this.hasPermission(e,"Remove")}_updateIcon(e){this.icon=e?"nuxeo:delete-permanently":"nuxeo:delete"}_updateLabel(e){this.label=e?"deleteDocumentsButton.tooltip.permanently":"deleteDocumentsButton.tooltip"}}window.customElements.define(N.is,N),(0,m.k)({_template:h.d`
    <style include="nuxeo-action-button-styles nuxeo-styles"></style>
    <nuxeo-operation-button
      id="btn"
      operation="Blob.BulkDownload"
      input="[[_input(document, documents)]]"
      params="[[_params(document, documents)]]"
      icon="nuxeo:download"
      label="bulkDownload.tooltip"
      show-label$="[[showLabel]]"
      error-label="bulkDownload.error"
      async
      download
      hidden$="[[!_isAvailable(documents.splices, view)]]"
    ></nuxeo-operation-button>
  `,is:"nuxeo-download-documents-button",behaviors:[u.M,l.mB,s.q],properties:{documents:{type:Array,notify:!0,value:[]},document:{type:Object},showLabel:{type:Boolean,value:!1}},ready(){this.$.btn.addEventListener("poll-start",this._onPollStart.bind(this)),this.$.btn.addEventListener("response",this._onResponse.bind(this))},_isAvailable(){return!B(this.documents)},_params(){const e={};return this.document&&(this.hasFacet(this.document,"Collection")||this.hasFacet(this.document,"Folderish"))?e.filename=`${this.document.title}_${(new Date).getTime()}.zip`:e.filename=`${this.i18n("bulkDownload.filename.selection")}-${(new Date).getTime()}.zip`,e},_input(){if(this._isAvailable())return`docs:${(this.document?[this.document]:this.documents).map((e=>e.uid)).join(",")}`},_onPollStart(){this.notify({message:this.i18n("bulkDownload.preparing"),duration:0,dismissible:!0})},_onResponse(){this.notify({message:this.i18n("bulkDownload.completed"),close:!0})}});class U extends((0,D.P)([l.mB,s.q],Nuxeo.OperationButton)){static get is(){return"nuxeo-untrash-documents-button"}static get properties(){return{documents:{type:Object,notify:!0,value:{}},hidden:{type:Boolean,value:!1,reflectToAttribute:!0,computed:"_isHidden(documents.splices)"}}}constructor(){super(),this.icon="nuxeo:restore-deleted",this.label="untrashDocumentsButton.tooltip",this.operation="Document.Untrash",this.syncIndexing=!0}_execute(){this.untrashDocuments()}untrashDocuments(){if((B(this.documents)||this.docsHavePermissions)&&window.confirm(this.i18n("untrashDocumentsButton.confirm.untrashDocuments"))){const{documents:e}=this,t=B(this.documents),i=t?{}:{documents:e};this.input=this.documents,this.params={},super._execute().then((()=>{this.fire("nuxeo-documents-untrashed",i),this.documents=[],this._fetchDebouncer=I.dx.debounce(this._fetchDebouncer,_.timeOut.after(100),(()=>{this.fire("refresh")}))})).catch((i=>{t||this.fire("nuxeo-documents-untrashed",{error:i,documents:e})}))}}_isHidden(){return!(B(this.documents)||this.documents&&this.documents.length>0&&this._checkDocsPermissions()&&this._checkDocsAreTrashed())}_checkDocsAreTrashed(){return this.documents.every((e=>this.isTrashed(e)))}_checkDocsPermissions(){return this.docsHavePermissions=!this.documents.some((e=>!this._docHasPermissions(e))),this.docsHavePermissions}_docHasPermissions(e){return this.hasPermission(e,"Write")}}window.customElements.define(U.is,U);class q extends((0,D.P)([l.mB],Nuxeo.Element)){static get is(){return"nuxeo-bulk-widget"}static get template(){return h.d`
      <style>
        :host {
          display: flex;
          flex-direction: column;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .warning,
        .error {
          /* ensures that the bulk widget takes the same vertical space regardless of having a message or not */
          min-height: 20px;
        }
        .warning {
          color: var(--nuxeo-text-default, #3a3a54);
        }
        .error {
          color: var(--nuxeo-warn-text, #de350b);
        }
        label,
        span {
          @apply --nuxeo-label;
        }
        nuxeo-select {
          /* disable underline */
          --paper-input-container-underline: {
            display: none;
          }
          /* disable underline (focused) */
          --paper-input-container-underline-focus: {
            display: none;
          }
          /* remove padding on the paper-dropdown-menu */
          --nuxeo-select-dropdown-menu-padding: 0;
          /* remove padding on the paper-input */
          --nuxeo-select-input-container-padding: 0;
          /* tweak text inside the paper-input element */
          --paper-input-container-input: {
            font-size: 12px;
            text-align: end;
          }
          /* tweak text inside paper-items */
          --paper-item: {
            font-size: 12px;
          }
        }
        paper-item[disabled] {
          @apply --nx-button-text-disabled;
        }
      </style>
      <div class="header">
        <label for="options">[[label]]</label>
        <nuxeo-select selected="{{updateMode}}" attr-for-selected="id" id="options">
          <paper-item id="keep" label="[[i18n('bulkWidget.mode.keep')]]">
            [[i18n('bulkWidget.mode.keep')]]
          </paper-item>
          <paper-item id="replace" label="[[i18n('bulkWidget.mode.replace')]]">
            [[i18n('bulkWidget.mode.replace')]]
          </paper-item>
          <paper-item id="addValues" label="[[i18n('bulkWidget.mode.addValues')]]" disabled$="[[!_isMultivalued]]">
            [[i18n('bulkWidget.mode.addValues')]]
          </paper-item>
          <paper-item id="remove" label="[[i18n('bulkWidget.mode.remove')]]" disabled$="[[_required]]">
            [[i18n('bulkWidget.mode.remove')]]
          </paper-item>
        </nuxeo-select>
      </div>
      <slot></slot>
      <span class$="[[_messageClass]]">[[_message]]</span>
    `}static get properties(){return{label:String,updateMode:{type:String,value:"keep",observer:"_updateModeChanged"},_message:String,_messageClass:{type:String,value:"warning"},_required:Boolean,_isMultivalued:{type:Boolean,value:!1}}}static get observers(){return["_updateMessage(_required, updateMode)"]}validate(){return!0}_setWarning(e){this._message=e,this._messageClass="warning"}_setError(e){this._message=e,this._messageClass="error"}_updateModeChanged(){this.dispatchEvent(new CustomEvent("update-mode-changed",{bubbles:!0,composed:!0,detail:{bulkWidget:this}}))}_updateMessage(){this._required?this._setWarning(this.i18n("bulkWidget.warning.required")):"remove"===this.updateMode?this._setWarning(this.i18n("bulkWidget.warning.remove")):this._setWarning()}}window.customElements.define(q.is,q);var W=i(79761);let H;const G=async e=>(H||(e.path="config/schemas",H=await e.get()),H);let Y;class K extends((0,D.P)([l.mB,s.q],Nuxeo.OperationButton)){static get is(){return"nuxeo-edit-documents-button"}static get importMeta(){return{url:`${window.location.protocol}//${window.location.host}${window.location.pathname}/bulk/nuxeo-edit-documents-button.js`}}static get template(){return h.d`
      <style include="nuxeo-action-button-styles nuxeo-styles">
        nuxeo-dialog {
          height: 100%;
          max-height: var(--nuxeo-document-form-popup-max-height, 60vh);
          min-width: var(--nuxeo-document-form-popup-min-width, 915px);
          margin: 0;
        }

        #form {
          margin: 0;
          padding: 0;
        }

        #form,
        form {
          @apply --layout-vertical;
          height: 100%;
        }

        .scrollable {
          margin-top: 24px;
          padding: 0 24px;
          @apply --layout-scroll;
          @apply --layout-flex;
          @apply --layout-vertical;
        }

        .actions {
          @apply --buttons-bar;
          @apply --layout-horizontal;
          @apply --layout-justified;
        }

        .saving-label {
          margin-right: 8px;
        }

        nuxeo-layout {
          margin-bottom: 24px;
        }
      </style>

      <!-- inherit nuxeo-operation-button template -->
      ${super.template}

      <nuxeo-resource id="schema"></nuxeo-resource>
      <nuxeo-dialog id="dialog" with-backdrop modal>
        <iron-form id="form">
          <form>
            <div class="scrollable">
              <nuxeo-layout href="[[_href]]" on-element-changed="_elementChanged"></nuxeo-layout>
            </div>
            <div class="actions">
              <paper-button noink class="secondary" dialog-dismiss>[[i18n('command.cancel')]]</paper-button>
              <paper-button
                id="save"
                on-tap="_save"
                noink
                class="primary"
                disabled$="[[saving]]"
                aria-label$="[[i18n('command.save')]]"
              >
                <template is="dom-if" if="[[!saving]]">
                  [[i18n('command.save')]]
                </template>
                <template is="dom-if" if="[[saving]]">
                  <span class="saving-label">[[i18n('command.save')]]</span>
                  <paper-spinner-lite active></paper-spinner-lite>
                </template>
              </paper-button>
            </div>
          </form>
        </iron-form>
      </nuxeo-dialog>
    `}static get properties(){return{documents:{type:Array,notify:!0,value:[]},hidden:{type:Boolean,value:!1,reflectToAttribute:!0,computed:"_isHidden(documents.splices)"},hrefBase:{type:String,value:""},hrefFunction:{type:Function,computed:"_buildHrefFn(hrefTemplate)"},hrefTemplate:{type:String,value:()=>"nuxeo-bulk-${layout}-layout.html"},layout:{type:String,value:"default",reflectToAttribute:!0},saving:{type:Boolean,value:!1,readOnly:!0},_href:{type:String,readOnly:!0},_fetchSchemas:{type:Function,value(){return()=>G(this.$.schema)}}}}static get observers(){return["_loadLayout(layout, hrefFunction, hrefBase)"]}constructor(){super(),this.icon="nuxeo:edit",this.label=this.i18n("documentEditBulkAction.tooltip"),this.operation="Document.Update",this.addEventListener("update-mode-changed",(e=>this._updateBulkWidget(e.detail.bulkWidget)))}ready(){super.ready(),this._fetchSchemas().then((e=>{Y=e}))}_isHidden(){return!(B(this.documents)||this.documents&&this.documents.length)}_validate(){let e=!0;const t=this.$$("nuxeo-layout"),i=t.element;if(i){const a=t._getValidatableElements(i.root);for(let t,o=0;o<a.length;o++)if(t=a[o],"nuxeo-bulk-widget"===t.tagName.toLowerCase()){const a=t.boundPath?i.get(t.boundPath):null,o=("replace"===t.updateMode||"addValues"===t.updateMode)&&this._isValueEmpty(a);o&&t._setError(this.i18n("bulkWidget.error."+("replace"===t.updateMode?"replaceWithEmpty":"addValuesWithEmpty"))),e=e&&!o}else e=e&&(t.validate?t.validate():t.checkValidity())}return!!e&&(!i||"function"!=typeof i.validate||i.validate())}_flattenProperties(e,t,i={}){const a=t.split(".").pop(),[o,n]=a.split(":"),s=this._findSchema(o);return s&&s.fields&&"blob"===s.fields[n]?(i[t]=e,i):(Object.keys(e).forEach((a=>{const o=e[a],n=t?`${t}.${a}`:a;o instanceof Object&&!Array.isArray(o)?this._flattenProperties(o,n,i):i[n]=o})),i)}_save(){if(this._setSaving(!0),!this._validate())return void this._setSaving(!1);const e=this.$$("nuxeo-layout").element,t=this._flattenProperties(e.document.properties,"document.properties");let i,a="";Object.keys(t).forEach((t=>{const o=this._getBoundElementFromPath(t),n=this._getBulkWidget(o),s=t.replace(/^(document\.properties\.)/,"").split(".").join("/");if("replace"===n.updateMode){let i=e.get(t);this._shouldStringifyValue(i)&&(i=JSON.stringify(i)),a=`${a}${s}=${i}\n`}else if("addValues"===n.updateMode){let o=e.get(t);this._shouldStringifyValue(o)&&(o=JSON.stringify(o)),a=`${a}${s}=${o}\n`,i=`${a}${s}=append_excluding_duplicates`}else"remove"===n.updateMode&&(a=`${a}${s}=\n`)})),this.input=this.documents,this.params={properties:a,propertiesBehaviors:i},super._execute().finally((()=>this.fire("refresh"))),this.$.dialog.toggle(),this._setSaving(!1)}_shouldStringifyValue(e){return Array.isArray(e)?e.some((e=>e instanceof Object)):e instanceof Object}_isValueEmpty(e){return!![void 0,null,""].includes(e)||Array.isArray(e)&&0===e.length}_resetProperties(){const e=this.$$("nuxeo-layout").element;e.document={properties:{}},e.__templateInfo.nodeInfoList.filter((e=>e.bindings)).forEach((t=>{t.bindings.filter((e=>"property"===e.kind)).forEach((t=>{t.parts.filter((e=>"{"===e.mode&&e.source.startsWith("document.properties."))).forEach((t=>{const i=t.source.split(".");i.pop(),(0,f.Z)(e,i),e.set(t.source,null)}))}))}))}_execute(){this._resetProperties();const e=this.$$("nuxeo-layout").element;Array.from(e.shadowRoot.querySelectorAll("nuxeo-bulk-widget")).forEach((e=>{e.updateMode="keep"})),this.$.dialog.toggle()}_buildHrefFn(e){return()=>{const t=e.matchAll(/\${([^}]+)}/g);let i=e;for(const[e,a]of t){const t=a.match(/^(layout)(\.(.+))?$/)?this.get(a).toLowerCase():"";i=i.replace(e,t)}return i}}_loadLayout(e,t,i){const{href:a}=this.$$("nuxeo-layout"),o=i||(0,W.iY)(this.__dataHost.importPath||this.importPath),n=[o,t(e)].join("/"!==o.slice(-1)?"/":"");a!==n&&(this._set_href(null),this._set_href(n))}_propertiesObserver(e){const t=this.$$("nuxeo-layout").element;if("document.properties"===e.path);else if(e.path.endsWith(".length")&&Array.isArray(t.get(e.path.replace(/\.length$/,""))));else if(e.path.match(/\.\d+$/)&&Array.isArray(t.get(e.path.replace(/\.\d+$/,""))));else if(e.path.startsWith("document.properties")){let i=e.path;i.endsWith(".splices")&&"indexSplices"in e.value&&(i=i.replace(/\.splices$/,""));const a=t.get(i),o=this._getBoundElementFromPath(i),n=this._getBulkWidget(o);n.boundPath=i,this._isArrayProperty(i)&&(n._isMultivalued=!0),["keep","remove"].includes(n.updateMode)&&!this._isValueEmpty(a)?n.updateMode="replace":"replace"===n.updateMode&&this._isValueEmpty(a)&&(n.updateMode="keep"),this._updateBulkWidget(n)}}_elementChanged(){const e=this.$$("nuxeo-layout");e&&e.element&&customElements.whenDefined(e.element.is).then((async()=>{const t=e.element;let i=0;for(;!t.shadowRoot&&50*i<=3e3;)i++,await new Promise((e=>setTimeout(e,50)));50*i>3e3&&console.warn(`bulk edit layout "${this.layout}" shadow root not found`),t.document||(t.document={properties:{}}),t._propertiesObserver=this._propertiesObserver.bind(this),t._createMethodObserver("_propertiesObserver(document.properties.*)",!0),Array.from(t.shadowRoot.querySelectorAll('[role="widget"], nuxeo-data-table[role="table"]')).forEach((e=>{const{parentNode:i}=e,a=document.createElement("nuxeo-bulk-widget");i.replaceChild(a,e),a.appendChild(e);const o=this._getBoundElement(e,t.__templateInfo);a.element=o,e.removeAttribute("role"),a.setAttribute("role","widget"),o.label&&(a.label=o.label,o.label=null),o.required&&(a._required=!0,o.required=null)}))}))}_getBulkWidget(e){let t=e;for(;t&&"nuxeo-bulk-widget"!==t.tagName.toLowerCase();)t=t.parentNode;return t}_getBoundElement(e,t){if(!t.boundNodes){t.boundNodes=[];for(let e=0;e<t.nodeList.length;e++)t.nodeInfoList[e].bindings&&t.boundNodes.push(t.nodeList[e])}return t.boundNodes.includes(e)?e:Array.from(e.children).find((e=>this._getBoundElement(e,t)))}_getBoundElementFromPath(e){return this.$$("nuxeo-layout")._getBoundElements(e)[e]}_clearValue(e){if(!e)return;const t=this.$$("nuxeo-layout").element,i=t.get(e);Array.isArray(i)?0!==i.length&&this._isArrayProperty(e)&&t.set(e,[]):t.set(e,null)}_setWidgetDisabled(e,t){e&&("disabled"in e?e.disabled=!!t:"readonly"in e?e.readonly=!!t:"editable"in e&&(e.editable=!t))}_updateBulkWidget(e){"keep"===e.updateMode?(this._clearValue(e.boundPath),this._setWidgetDisabled(e.element,!1)):"remove"===e.updateMode?(this._clearValue(e.boundPath),this._setWidgetDisabled(e.element,!0)):"replace"!==e.updateMode&&"addValues"!==e.updateMode||this._setWidgetDisabled(e.element,!1);const t=this.$$("nuxeo-layout").element;"replace"===e.updateMode&&e.boundPath&&!1===t.get(e.boundPath)?e._setWarning(this.i18n("bulkWidget.warning.bool")):e._updateMessage(),this._updateSaveButton()}_updateSaveButton(){const e=Array.from(this.$$("nuxeo-layout").element.shadowRoot.querySelectorAll("nuxeo-bulk-widget"));this.$.save.disabled=e.every((e=>"keep"===e.updateMode))}_isArrayProperty(e){if(!e)return;e.startsWith("document.properties.")&&(e=e.replace(/^(document\.properties\.)/,""));const[t,i]=e.split(":");return this._isArrayPropertyPath(this._findSchema(t),i)}_isArrayPropertyPath(e,t){if(t.includes(".")){const[i,...a]=t.split(".");return this._isArrayPropertyPath(e.fields[i],a.join("."))}const i=e.fields[t];return(i.type||i).endsWith("[]")}_findSchema(e){return Y.find((t=>t["@prefix"]===e))}}window.customElements.define(K.is,K),(0,m.k)({_template:h.d`
    <style include="nuxeo-action-button-styles"></style>

    <template is="dom-if" if="[[_isAvailable(selectedDocuments)]]">
      <div class="action" on-tap="_doDiff">
        <paper-icon-button noink id="diff" icon="nuxeo:compare" aria-labelledby="label"></paper-icon-button>
        <span class="label" hidden$="[[!showLabel]]" id="label">[[_label]]</span>
        <nuxeo-tooltip position="[[tooltipPosition]]">[[_label]]</nuxeo-tooltip>
      </div>
    </template>
  `,is:"nuxeo-document-diff-button",behaviors:[l.mB,s.q],properties:{selectedDocuments:{type:Array,value:[]},tooltipPosition:{type:String,value:"bottom"},showLabel:{type:Boolean,value:!1},_label:{type:String,computed:"_computeLabel(i18n)"}},_isAvailable(){return!B(this.selectedDocuments)&&this.selectedDocuments&&this.selectedDocuments.length>1},_doDiff(){this.fire("nuxeo-diff-documents",{documents:this.selectedDocuments})},_computeLabel(){return this.i18n("documentDiffButton.tooltip")}}),(0,m.k)({_template:h.d`
    <style include="nuxeo-action-button-styles"></style>

    <template is="dom-if" if="[[hasVersions(document)]]">
      <nuxeo-operation id="opGetVersions" op="Document.GetVersions" input="[[document.uid]]"></nuxeo-operation>
      <div class="action" on-tap="_doDiff">
        <paper-icon-button noink id="diff" icon="nuxeo:compare" aria-labelledby="label"></paper-icon-button>
        <span class="label" hidden$="[[!showLabel]]" id="label">[[_label]]</span>
        <nuxeo-tooltip position="[[tooltipPosition]]">[[_label]]</nuxeo-tooltip>
      </div>
    </template>
  `,is:"nuxeo-versions-diff-button",behaviors:[u.M,l.mB,s.q],properties:{document:{type:Object},tooltipPosition:{type:String,value:"bottom"},showLabel:{type:Boolean,value:!1},_label:{type:String,computed:"_computeLabel(i18n)"}},_doDiff(){this.$$("#opGetVersions").execute().then((e=>{const t=e.entries.reverse(),i=t.findIndex((e=>this._getMajor(e)===this._getMajor(this.document)&&this._getMinor(e)===this._getMinor(this.document)));if(i>0){const e=t[i];t.splice(i,1),t.unshift(e)}this.document.isCheckedOut&&t.unshift(this.document),t.length<2?this.notify({message:this.i18n("versionsDiffButton.nothingToCompare")}):this.fire("nuxeo-diff-documents",{documents:t})}))},_getMajor:e=>e.properties["uid:major_version"],_getMinor:e=>e.properties["uid:minor_version"],_computeLabel(){return this.i18n("versionsDiffButton.tooltip")}}),i(18626);const X=h.d`
  <dom-module id="nuxeo-diff-styles">
    <template>
      <style include="iron-flex iron-flex-alignment nuxeo-styles">
        :host {
          display: block;
        }

        :host([is-array-item]) .label {
          margin-right: 8px;
          @apply --layout-flex-none;
        }

        span {
          word-break: break-all;
        }

        span.added {
          display: inline;
          word-break: break-all;
          background-color: var(--nuxeo-diff-added-color, #b4efcb);
          @apply --nuxeo-string-diff-added;
        }

        span.deleted {
          display: inline;
          word-break: break-all;
          background-color: var(--nuxeo-diff-deleted-color, #e6b1b1);
          @apply --nuxeo-string-diff-deleted;
        }

        .addition,
        .deletion {
          display: inherit;
        }

        .deletion ~ .addition {
          margin-left: 8px;
        }

        .addition > :not(span):not(div):not(a) {
          border-left: 4px solid var(--nuxeo-diff-added-color, #b4efcb);
          padding-left: 2px;
          @apply --nuxeo-complex-diff-added;
        }

        .deletion > :not(span):not(div):not(a) {
          border-left: 4px solid var(--nuxeo-diff-deleted-color, #e6b1b1);
          padding-left: 2px;
          @apply --nuxeo-complex-diff-deleted;
        }

        .label {
          @apply --layout-flex;
          max-width: 150px;
          color: var(--nuxeo-diff-label-color, #d4d4d9);
          @apply --nuxeo-diff-label;
        }

        .simple .label {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .value.simple {
          display: inherit;
        }

        :host(:not([is-array-item])) .value.simple {
          @apply --layout-flex-2;
        }

        .text.diff {
          word-break: break-all;
        }

        .array.complex {
          @apply --layout-vertical;
          display: block;
        }

        .array.simple {
          @apply --layout-horizontal;
          @apply --layout-flex;
          @apply --layout-wrap;
        }

        .array.diff.simple .sep {
          margin: 0 8px 0 4px;
        }

        .array.simple .item:not(:last-of-type)::after {
          content: ',';
          margin-left: 4px;
        }

        .array.simple .item:not(:last-child) {
          margin-right: 8px;
        }

        .item {
          @apply --layout-horizontal;
        }

        .array.complex .item ~ .item {
          margin-top: 12px;
        }

        .array .item nuxeo-object-diff {
          @apply --layout-flex;
        }
      </style>
    </template>
  </dom-module>
`;document.head.appendChild(X.content);const J={properties:{property:{type:String,reflectToAttribute:!0},type:{type:String,value:"string",reflectToAttribute:!0},unified:{type:Boolean,value:!1,reflectToAttribute:!0},hideDeletions:{type:Boolean,value:!1},hideAdditions:{type:Boolean,value:!1},label:{type:String},schema:Object,leftUid:String,rightUid:String,delta:Object,originalValue:Object,newValue:Object,showAll:{type:Boolean,value:!1},displayLabel:{type:Boolean,value:!1},isArrayItem:{type:Boolean,value:!1,reflectToAttribute:!0},level:{type:Number,value:0}},observers:["_computeType(property, schema, delta, originalValue)"],_computeType(e,t,i,a){let{type:o}=this;if(e&&t&&t.fields&&t.fields[e]&&(o=t.fields[e],o=o.type||o),"string"===o||"string[]"===o){let e;if(this._isObject(a)||Array.isArray(a)&&a.length>0)e=Array.isArray(a)?a[0]:a;else if(i)if("string[]"===o){const t=Object.keys(i)[0];e=Array.isArray(i[t])?i[t][0]:i[t]}else e=Array.isArray(i)?i[0]||i[1]:i;e&&e["entity-type"]&&(o=e["entity-type"]+(o.endsWith("[]")?"[]":""))}this.set("type",o)},_computeLabel:(e,t)=>t||e,_computeDefaultClass(e,t){return this._isSimple(e,t)?"simple":"complex"},_computeArrayClass(e,t,i,a,o){if(e){const n=this._getArrayDelta(e,t,i,a,o);return n&&n.length>0?this._computeDefaultClass(n[0].value,n[0].originalValue):"simple"}return this._computeDefaultClass(void 0,t)},_showArrayItem:(e,t)=>t||e.modified,_incLevel:e=>e+1,_computeIndentStyle:(e,t)=>`margin-left: ${t?0:12*e}px;`,_isArray:e=>Array.isArray(e),_isObject:e=>e&&"object"==typeof e&&e.constructor===Object,_isNotObjectNorArray(e){return!this._isArray(e)&&!this._isObject(e)},_getKeys:e=>Object.keys(e),_getValue:(e,t)=>e&&e[t],_getPropertySchema:(e,t)=>t?e&&e.fields&&e.fields[t]:e,_unwrapDelta(e){let t=e;if(this._hasAddition(e))t=this._getAddition(e);else if(this._hasDeletion(e))t=this._getDeletion(e);else if(this._hasModification(e))t=this._getModificationOldValue(e)||this._getModificationNewValue(e);else if(this._hasTextDiff(e))[t]=e;else if(this._hasArrayInnerChanges(e)){const i=Object.keys(e).filter((e=>"_t"!==e))[0];t=Array.isArray(e[i])?e[i][0]:e[i]}return t},_isSimpleDelta(e){return this._isNotObjectNorArray(this._unwrapDelta(e))},_isSimple(e,t){return e?this._isSimpleDelta(e):!this._isObject(Array.isArray(t)&&t.length>0?t[0]:t)},_getAllKeys(e,t,i){return i?this._getKeys(t):this._getKeys(e)},_arrayItemType:e=>e?e.replace(/\[\]$/,""):"string",_hasNoChanges:e=>!e,_hasAddition:(e,t)=>!t&&Array.isArray(e)&&1===e.length,_getAddition:e=>e[0],_hasModification:e=>Array.isArray(e)&&2===e.length,_getModificationOldValue:e=>e[0],_getModificationNewValue:e=>e[1],_hasDeletion:(e,t)=>!t&&Array.isArray(e)&&3===e.length&&0===e[2],_getDeletion:e=>e[0],_hasArrayMove:e=>Array.isArray(e)&&3===e.length&&3===e[2],_hasTextDiff:e=>Array.isArray(e)&&3===e.length&&2===e[2],_hasArrayInnerChanges(e){return this._isObject(e)&&"a"===e._t},_hasObjectInnerChanges(e){return this._isObject(e)&&!e._t},_getTextDiff(e,t,i,a){if(!e||!t)return;const o=function(e){return e[0].split(/(@@[\s-+,\d]+@@)/).filter(Boolean).reduce(((e,t,i,a)=>{if(i%2==0){const t=a.slice(i,i+2);let o=t[0].match(/\d+,\d+/g);o={original:o[0].split(",").map(Number),new:o[1].split(",").map(Number)},e.push({range:o,context:t[1],hasAdditions:!!t[1].match(/^\+(.*)$/gm),hasDeletions:!!t[1].match(/^-(.*)$/gm)})}return e}),[])}(e);let n="",s=0,r=0;return o.forEach((e=>{const o=e.range.original[0]-1+s;n+=t.substring(r,o)+e.context.replace(/^-(.*)$/gm,a?"":'<span class="deleted">$1</span>').replace(/^\+(.*)$/gm,i?"":'<span class="added">$1</span>').replace(/^\s/gm,"").replace(/(\r\n|\r|\n)/gm,""),s+=e.range.original[1]-e.range.new[1],r+=e.range.original[1]+(o-r)})),n},_getArrayDelta(e,t,i,a,o){if(!e||!t||!Array.isArray(t))return;const n=t.map(((e,t)=>({originalValue:e,modified:!1,index:String(t),change:"unchanged",newValue:null})));return Object.keys(e).filter((e=>"_t"!==e)).sort().reverse().forEach((s=>{let r;s.startsWith("_")?(r=Number(s.replace("_","")),o?n.splice(r,1):n.splice(r,1,{value:e[s],modified:!0,change:"deleted",originalValue:t[r],newValue:i?i[r]:null,index:String(r)})):(r=Number(s),this._isObject(e[s])?n.splice(r,1,{value:e[s],modified:!0,change:"modified",originalValue:t[r],newValue:i?i[r]:null,index:String(r)}):a||n.splice(r,0,{value:e[s],modified:!0,change:"added",originalValue:t[r],newValue:i?i[r]:null,index:String(r)}))})),n.sort(((e,t)=>e.index===t.index?e.change===t.change?0:"added"===e.change?1:-1:e.index>t.index)),n}};Nuxeo.DiffBehavior=J;const Z={registry:{default:"nuxeo-default-diff"},registerElement:function(e,t){t.type&&(Z.registry.types||(Z.registry.types={}),Z.registry.types[t.type]=e),t.property&&(Z.registry.properties||(Z.registry.properties={}),Z.registry.properties[t.property]=e)},getElement:function(e){let t=null;return Z.registry.properties&&e.property&&(t=Z.registry.properties[e.property]),!t&&Z.registry.types&&e.type&&(t=Z.registry.types[e.type]),t||Z.registry.default}};(0,m.k)({_template:h.d`
    <style include="nuxeo-diff-styles"></style>

    <div id="container"></div>
  `,is:"nuxeo-object-diff",behaviors:[J],observers:["_updateContainer(type, property)"],created(){Object.keys(J.properties).forEach((e=>{this._createMethodObserver(`_forwardProp("${e}", ${e})`)}))},_forwardProp(e,t){this._instance&&(this._instance[e]=t)},_updateContainer(e,t){this._instance=document.createElement(Z.getElement({type:e,property:[this.schema&&(this.schema.prefix||this.schema.name),t].filter(Boolean).join(":")})),Object.keys(J.properties).forEach((e=>{this._instance[e]=this[e]})),this.$.container.hasChildNodes()?this.$.container.replaceChild(this._instance,this.$.container.firstChild):this.$.container.appendChild(this._instance)}}),Nuxeo.Diff=Z;var Q=i(70590),ee=i(98149);let te;(0,m.k)({_template:h.d`
    <style include="iron-flex iron-flex-alignment nuxeo-styles">
      :host {
        display: block;
        --paper-input-container-underline: {
          display: none;
        }
      }

      nuxeo-object-diff[unified] ~ nuxeo-object-diff[unified],
      .side-by-side ~ .side-by-side {
        margin-top: 12px;
      }

      nuxeo-object-diff:not([unified]) {
        @apply --layout-vertical;
        @apply --layout-flex;
      }

      #controls {
        @apply --layout-horizontal;
        @apply --layout-end-justified;
        margin-bottom: 12px;
      }

      #diffContainer,
      #diffPane {
        @apply --layout-vertical;
      }

      #diffPickerPane {
        @apply --layout-horizontal;
      }

      .control ~ .control {
        margin-left: 8px;
      }

      .switchSides {
        @apply --layout-horizontal;
        @apply --layout-center;
      }

      .switchSides paper-icon-button {
        margin: 0 4px 16px 4px;
      }

      .deltaPane {
        @apply --layout-vertical;
      }

      .side-by-side {
        @apply --layout-horizontal;
      }

      .side-by-side nuxeo-object-diff:not([unified]):not(:first-child) {
        margin-left: 16px;
      }

      .diffPickers {
        @apply --layout-horizontal;
        @apply --layout-flex;
        overflow: hidden;
      }

      .diffPicker {
        @apply --paper-card;
        @apply --layout-flex;
        overflow: hidden;
        padding: 4px 4px 4px 8px;
      }

      .diffPickers > .switchSides {
        display: flex;
      }

      #diffPickerPane > .switchSides {
        display: none;
      }

      @media (max-width: 720px) {
        .diffPickers {
          @apply --layout-vertical;
          @apply --layout-flex;
        }

        .diffPicker {
          @apply --layout-flex-none;
        }

        .diffPickers > .switchSides {
          display: none;
        }

        #diffPickerPane > .switchSides {
          display: flex;
        }

        .switchSides paper-icon-button {
          transform: rotate(90deg);
        }
      }
    </style>

    <nuxeo-resource id="schema"></nuxeo-resource>
    <nuxeo-document id="doc" headers="[[headers]]" enrichers="[[enrichers]]" schemas="[[schemas]]"></nuxeo-document>

    <div id="diffContainer">
      <div id="controls">
        <paper-checkbox class="control" checked="{{showAll}}">[[i18n('diff.controls.showAll')]]</paper-checkbox>
        <template is="dom-if" if="[[_showUnifiedViewControl]]">
          <paper-toggle-button class="control" checked="{{_unifiedView}}"
            >[[i18n('diff.controls.unifiedView')]]</paper-toggle-button
          >
        </template>
      </div>
      <div id="diffPickerPane">
        <div class="diffPickers">
          <div class="diffPicker">
            <nuxeo-select selected="{{leftUid}}" attr-for-selected="uid">
              <template is="dom-repeat" items="[[documents]]">
                <paper-item uid="[[item.uid]]">[[_title(item, _hasVersions)]]</paper-item>
              </template>
            </nuxeo-select>
          </div>
          <div class="switchSides">
            <paper-icon-button
              id="switchSidesButtonH"
              icon="nuxeo:switch-sides"
              on-tap="_switchSides"
              aria-labelledby="switchSidesButtonHTooltip"
            ></paper-icon-button>
            <nuxeo-tooltip for="switchSidesButtonH" id="switchSidesButtonHTooltip"
              >[[i18n('diff.controls.switchSides.tooltip')]]</nuxeo-tooltip
            >
          </div>
          <div class="diffPicker">
            <nuxeo-select selected="{{rightUid}}" attr-for-selected="uid">
              <template is="dom-repeat" items="[[documents]]">
                <paper-item uid="[[item.uid]]">[[_title(item, _hasVersions)]]</paper-item>
              </template>
            </nuxeo-select>
          </div>
        </div>
        <div class="switchSides">
          <paper-icon-button
            id="switchSidesButtonV"
            icon="nuxeo:switch-sides"
            on-tap="_switchSides"
            aria-labelledby="switchSidesButtonVTooltip"
          ></paper-icon-button>
          <nuxeo-tooltip for="switchSidesButtonV" id="switchSidesButtonVTooltip"
            >[[i18n('diff.controls.switchSides.tooltip')]]</nuxeo-tooltip
          >
        </div>
      </div>
      <div id="diffPane">
        <template
          is="dom-repeat"
          items="[[_getCommonSchemas(_schemas, showAll, _delta)]]"
          as="schema"
          sort="_sortSchemas"
        >
          <nuxeo-card heading="[[schema.name]]" collapsible opened>
            <div class="deltaPane">
              <template is="dom-repeat" items="[[_getCommonSchemaProperties(schema, showAll, _delta)]]" as="property">
                <!-- unified view -->
                <template is="dom-if" if="[[unifiedView]]">
                  <nuxeo-object-diff
                    property="[[_getPropertyName(schema, property)]]"
                    label="[[_computeLabel(schema, property)]]"
                    schema="[[schema]]"
                    left-uid="[[leftUid]]"
                    right-uid="[[rightUid]]"
                    delta="[[_getPropertyDiff(_delta, property)]]"
                    original-value="[[_getDocumentProperty(property, left)]]"
                    new-value="[[_getDocumentProperty(property, right)]]"
                    show-all="[[showAll]]"
                    unified
                    display-label
                  ></nuxeo-object-diff>
                </template>
                <!-- side-by-side view -->
                <template is="dom-if" if="[[!unifiedView]]">
                  <div class="side-by-side">
                    <nuxeo-object-diff
                      property="[[_getPropertyName(schema, property)]]"
                      label="[[_computeLabel(schema, property)]]"
                      schema="[[schema]]"
                      left-uid="[[leftUid]]"
                      right-uid="[[rightUid]]"
                      delta="[[_getPropertyDiff(_delta, property)]]"
                      original-value="[[_getDocumentProperty(property, left)]]"
                      new-value="[[_getDocumentProperty(property, right)]]"
                      show-all="[[showAll]]"
                      hide-additions
                      display-label
                    ></nuxeo-object-diff>
                    <nuxeo-object-diff
                      property="[[_getPropertyName(schema, property)]]"
                      label="[[_computeLabel(schema, property)]]"
                      schema="[[schema]]"
                      left-uid="[[leftUid]]"
                      right-uid="[[rightUid]]"
                      delta="[[_getPropertyDiff(_delta, property)]]"
                      original-value="[[_getDocumentProperty(property, left)]]"
                      new-value="[[_getDocumentProperty(property, right)]]"
                      show-all="[[showAll]]"
                      hide-deletions
                      display-label
                    ></nuxeo-object-diff>
                  </div>
                </template>
              </template>
            </div>
          </nuxeo-card>
        </template>
      </div>
    </div>
  `,is:"nuxeo-diff",behaviors:[l.mB,s.q,o.z],properties:{docIds:{type:Array,value:[]},documents:{type:Array,value:[],readOnly:!0},showAll:{type:Boolean,value:!1},unifiedView:{type:Boolean,value:!1,reflectToAttribute:!0,readOnly:!0},enrichers:{type:String},headers:{type:String,value:{"fetch-document":"properties","translate-directoryEntry":"label"}},schemas:{type:String},leftUid:{type:String,observer:"leftUidChanged",notify:!0},rightUid:{type:String,observer:"rightUidChanged",notify:!0},_unifiedView:{type:Boolean,value:!1,observer:"_resize"},_showUnifiedViewControl:Boolean,_schemas:Array,left:{type:Object,notify:!0},right:{type:Object,notify:!0},_delta:Object,_hasVersions:{type:Boolean,value:!1}},importMeta:{url:`${window.location.protocol}//${window.location.host}${window.location.pathname}/diff/nuxeo-diff.js`},observers:["_docIdsChanged(docIds.*)"],listeners:{"iron-resize":"_resize"},created(){te||(te=new Promise(((e,t)=>{(0,Q.T)(this.resolveUrl("imports.html"),e,t)})))},_resize(){window.matchMedia("(max-width: 720px)").matches?(this._setUnifiedView(!0),this._showUnifiedViewControl=!1):(this._setUnifiedView(this._unifiedView),this._showUnifiedViewControl=!0)},_switchSides(){const e=this.rightUid;this.rightUid=this.leftUid,this.leftUid=e},leftUidChanged(e,t){e===this.rightUid?this.rightUid=t:this.diff()},rightUidChanged(e,t){e===this.leftUid?this.leftUid=t:this.diff()},_computeLabel(e,t){const i=`diffObject.property.label.${t}`,a=this.i18n(i);return i!==a?a:this._getPropertyName(e,t)},_title(e){return e&&e.title+(this._hasVersions&&!e.isCheckedOut?` (v${e.properties["uid:major_version"]}.${e.properties["uid:minor_version"]})`:"")},_filterUid:e=>function(t){return t.uid!==e},_sortSchemas(e,t){const i=this._getCommonProperties(this.left,this.right,e,this._delta),a=this._getCommonProperties(this.left,this.right,t,this._delta);return 0===i.length&&i.length===a.length||i.length>0&&a.length>0?e.name>t.name:i.length<a.length},_sequencer:e=>e.reduce(((e,t)=>e.then(t)),Promise.resolve([])),_docIdsChanged(){if(this.docIds&&this.docIds.length>1){const e=[];this._setDocuments([]),this.docIds.forEach((t=>{e.push((()=>(this.$.doc.docId=t,this.$.doc.get().then((e=>{this.push("documents",e)})))))})),this._sequencer(e).then((()=>{this._hasVersions=this.documents.some((e=>e.isVersion)),this.leftUid=null,this.leftUid=this.documents[1].uid,this.rightUid=this.documents[0].uid}))}},_fetchCommonSchemas(e,t){const i=e.schemas.filter((e=>!!t.schemas.find((t=>e.name===t.name))));return G(this.$.schema).then((e=>(i.forEach((t=>{t.fields=e.find((e=>e.name===t.name)).fields})),i)))},_getCommonProperties:(e,t,i,a)=>Object.keys(e.properties).filter((e=>!!Object.keys(t.properties).find((t=>e===t&&(!i||e.startsWith(`${i.prefix?i.prefix:i.name}:`))&&(!a||a[e]))))),_getCommonSchemaProperties(e,t,i){return this._getCommonProperties(this.left,this.right,e,t?null:i)},_getCommonSchemas(e,t){if(e)return t?e:e.filter((e=>this._getCommonProperties(this.left,this.right,e,t?null:this._delta).length>0))},_getPropertyDiff:(e,t)=>e&&e[t],_getDocumentProperty:(e,t)=>t.properties[e],_getPropertyName(e,t){if(t&&e)return t.replace(new RegExp(`^${e.prefix?e.prefix:e.name}:`),"")},_diff(){if(!this.leftUid||!this.rightUid||this.leftUid===this.rightUid)return;const e=this.documents.find((e=>e.uid===this.leftUid)),t=this.documents.find((e=>e.uid===this.rightUid));this.left=e,this.right=t,this._fetchCommonSchemas(e,t).then((i=>{this._schemas=i;const a=ee.Hg(e.properties,t.properties);this._schemas.forEach((e=>{this._filterDelta(a,e)})),this._delta=a}))},diff(){te.then(this._diff.bind(this))},_filterDelta(e,t,i){const a=i||"";if(e._t&&"a"===e._t)Object.keys(e).filter((e=>"_t"!==e)).forEach((i=>{const o=a?[a,i].join("."):i,n=Array.isArray(e[i])&&e[i].length>0?e[i][0]:e[i];this._filterDelta(n,t,o),0===Object.keys(e[i]).length&&delete e[i]}));else{const o=Array.isArray(e)&&e.length>0?e[0]:e,n=i?Object.keys(o):this._getCommonSchemaProperties(t,!1,o);for(let e=0;e<n.length;e++){const i=n[e],s=a?[a,i].join("."):n[e];let r,l;switch("string"==typeof t?r=t.replace(/\[\]$/,""):(l=t.fields[this._getPropertyName(t,i)],r=l.type||l),r){case"string":case"date":case"long":case"integer":case"boolean":case"double":break;case"blob":o[i]&&!o[i].digest&&delete o[i];break;default:o&&this._filterDelta(o[i],l,s,t)}}}}}),(0,m.k)({_template:h.d`
    <nuxeo-operation-button
      id="btn"
      operation="Bulk.RunAction"
      input="[[provider]]"
      params="[[_params(provider, schemas, fields)]]"
      icon="nuxeo:csv-export"
      label="csvExportButton.label"
      show-label$="[[showLabel]]"
      poll-interval="[[pollInterval]]"
      error-label="csvExportButton.action.error"
      async
      download
    >
    </nuxeo-operation-button>
  `,is:"nuxeo-csv-export-button",behaviors:[u.M,l.mB,s.q],properties:{provider:{type:Object},pollInterval:{type:Number,value:1e3},schemas:{type:String},fields:{type:String},showLabel:{type:Boolean,value:!1},status:{type:Object,notify:!0}},ready(){this.$.btn.addEventListener("poll-start",this._onPollStart.bind(this)),this.$.btn.addEventListener("response",this._onResponse.bind(this))},_params(){const e={},t=null!=this.schemas?this.schemas:this.provider&&this.provider.schemas;return t&&(e.schemas=t.split(",").map((e=>e.trim()))),this.fields&&(e.xpaths=this.fields.split(",").map((e=>e.trim()))),{action:"csvExport",parameters:JSON.stringify(e)}},_onPollStart(){this.notify({message:this.i18n("csvExportButton.action.poll")})},_onResponse(){this.notify({message:this.i18n("csvExportButton.action.completed")})}});class ie{static get ATTRS(){return{COLUMN:"data-column",COLUMNSPAN:"data-column-span",ROW:"data-row",ROWSPAN:"data-row-span",CHILDID:"data-child-id",ALIGN:"data-align",JUSTIFY:"data-justify"}}constructor(e){this.el=e}_getAttribute(e){return this.el.getAttribute(e)}_setAttribute(e,t){this.el.setAttribute(e,t)}get id(){return this._getAttribute(ie.ATTRS.CHILDID)}set id(e){this._setAttribute(ie.ATTRS.CHILDID,e)}get column(){return this._getAttribute(ie.ATTRS.COLUMN)||""}set column(e){return this._setAttribute(ie.ATTRS.COLUMN,e)}get columnspan(){return this._getAttribute(ie.ATTRS.COLUMNSPAN)||""}set columnspan(e){return this._setAttribute(ie.ATTRS.COLUMNSPAN,e)}get row(){return this._getAttribute(ie.ATTRS.ROW)||""}set row(e){return this._setAttribute(ie.ATTRS.ROW,e)}get rowspan(){return this._getAttribute(ie.ATTRS.ROWSPAN)||""}set rowspan(e){return this._setAttribute(ie.ATTRS.ROWSPAN,e)}get align(){return this._getAttribute(ie.ATTRS.ALIGN)||""}set align(e){return this._setAttribute(ie.ATTRS.ALIGN,e)}get justify(){return this._getAttribute(ie.ATTRS.JUSTIFY)}set justify(e){return this._setAttribute(ie.ATTRS.JUSTIFY,e)}}function ae(e,t,i,a){if(e)return("string"==typeof e?e.split(" ").filter(Boolean):[e]).forEach((e=>{i&&a&&!t.test(e)&&console.warn(`"${e}" is an invalid value for ${a}`)})),e}function oe(e){return e.replace(/^\s*;?$(?:\r\n?|\n)/gm,"")}function ne(e,t=!0){const i={};return i.templateColumns=ae(e.templateColumns,/^(\d+fr|\d+px|auto)$/,t,"template-columns"),i.templateRows=ae(e.templateRows,/^(\d+fr|\d+px|auto)$/,t,"template-rows"),i.columns=ae(e.columns,/^\d+$/,t,"columns"),i.rows=ae(e.rows,/^\d+$/,t,"rows"),i.gap=ae(e.gap,/^\d+px$/,t,"gap"),i.columnGap=ae(e.columnGap,/^\d+px$/,t,"column-gap"),i.rowGap=ae(e.rowGap,/^\d+px$/,t,"row-gap"),i.alignItems=ae(e.alignItems,/^(stretch|center|start|end)$/,t,"align-items"),i.justifyItems=ae(e.justifyItems,/^(stretch|center|start|end)$/,t,"justify-items"),oe(`\n:host {\n  display: grid;\n  grid-template-columns: ${i.templateColumns||(i.columns&&i.columns>1?Array(i.columns).fill("1fr").join(" "):"auto")};\n  grid-template-rows: ${i.templateRows||(i.rows&&i.rows>1?Array(i.rows).fill("auto").join(" "):"auto")};\n  ${i.gap?`grid-gap: ${i.gap}`:""};\n  ${i.columnGap?`grid-column-gap: ${i.columnGap};`:""}\n  ${i.rowGap?`grid-row-gap: ${i.rowGap};`:""}\n  ${i.alignItems?`align-items: ${i.alignItems};`:""}\n  ${i.justifyItems?`justify-items: ${i.justifyItems};`:""}\n}\n`)}function se(e,t=!0){const i={id:e.id};return i.column=ae(e.column,/^\d+$/,t,ie.ATTRS.COLUMN),i.row=ae(e.row,/^\d+$/,t,ie.ATTRS.ROW),i.columnspan=ae(e.columnspan,/^\d+$/,t,ie.ATTRS.COLUMNSPAN),i.rowspan=ae(e.rowspan,/^\d+$/,t,"rowspan"),i.align=ae(e.align,/^(stretch|center|start|end)$/,t,ie.ATTRS.ALIGN),i.justify=ae(e.justify,/^(stretch|center|start|end)$/,t,ie.ATTRS.JUSTIFY),i.column||i.columnspan||i.row||i.rowspan||i.align||i.justify?oe(`\n::slotted([${ie.ATTRS.CHILDID}="${i.id}"]) {\n  ${i.column||i.columnspan?`grid-column: ${i.column}${i.columnspan?`${i.column?" / ":""}span ${i.columnspan}`:""};`:""}\n  ${i.row||i.rowspan?`grid-row: ${i.row}${i.rowspan?`${i.row?" / ":""}span ${i.rowspan}`:""};`:""}\n  ${i.align?`align-self: ${i.align};`:""}\n  ${i.justify?`justify-self: ${i.justify};`:""}\n}\n`):""}class re extends Nuxeo.Element{static get is(){return"nuxeo-grid"}static get template(){return h.d`
      <style>
        :host {
          display: grid;
        }
      </style>
      <slot id="slot"></slot>
    `}static get properties(){return{columns:{type:Number,reflectToAttribute:!0},rows:{type:Number,reflectToAttribute:!0},gap:{type:String},rowGap:{type:String},columnGap:{type:String},alignItems:{type:String,value:"stretch"},justifyItems:{type:String,value:"stretch"},templateColumns:{type:String,reflectToAttribute:!0},templateRows:{type:String,reflectToAttribute:!0}}}_updateGrid(){let e="";const t=Array.from(this.$.slot.assignedElements()).map((e=>new ie(e)));t.forEach((e=>{null==e.id&&(this.__count=this.__count||0,e.id=++this.__count)}));const i={columns:this.columns,rows:this.rows,templateColumns:this.templateColumns,templateRows:this.templateRows,gap:this.gap,columnGap:this.columnGap,rowGap:this.rowGap,alignItems:this.alignItems,justifyItems:this.justifyItems};e+=ne(i),t.forEach((t=>{e+=se(t)})),i.templateColumns="1fr",i.templateRows="auto";let a=`${ne(i,!1)}`;var o;t.forEach(((e,t)=>{const{align:i,id:o,justify:n}=e;a+=`${se({column:1,row:t+1,align:i,id:o,justify:n},!1)}`})),e+=(o=a,"(max-width: 1024px)"?oe(`@media (max-width: 1024px) {\n${o.replace(/^(.+)$/gm,"  $1")}\n}\n`):o),this.shadowRoot.querySelector("style").textContent=e}connectedCallback(){super.connectedCallback(),this._updateGrid(),this.__observer=new MutationObserver((e=>{e.some((e=>!!(e.target===this||"attributes"===e.type&&Object.values(ie.ATTRS).includes(e.attributeName))))&&this._updateGrid()})),this.__observer.observe(this,{attributes:!0,childList:!0,subtree:!0})}disconnectedCallback(){this.__observer.disconnect(),super.disconnectedCallback()}}customElements.define(re.is,re),(0,m.k)({_template:h.d`
    <style>
      :host([hidden]) {
        display: none;
      }
      #sardine {
        position: fixed;
        width: 128px;
        z-index: 9999;
      }

      #sardine img {
        position: relative;
        top: 16px;
        width: 100%;
        height: 100%;
        animation: upDown 5s linear infinite;
      }

      #wrapper {
        animation: rotate 5s linear infinite;
      }

      #feeling {
        position: absolute;
        top: -8px;
        left: 16px;
        font-size: 14px;
      }

      .left {
        transform: scaleX(-1);
      }

      .right {
        transform: scaleX(1);
      }

      @keyframes upDown {
        0% {
          transform: translateY(0);
        }
        25% {
          transform: translateY(-8px);
        }
        50% {
          transform: translateY(0);
        }
        75% {
          transform: translateY(8px);
        }
        100% {
          transform: translateY(0);
        }
      }

      @keyframes rotate {
        0% {
          transform: rotate(4deg);
        }
        12.5% {
          transform: rotate(2deg);
        }
        25% {
          transform: rotate(0deg);
        }
        37.5% {
          transform: rotate(-2deg);
        }
        50% {
          transform: rotate(-4deg);
        }
        62.5% {
          transform: rotate(-2deg);
        }
        75% {
          transform: rotate(0deg);
        }
        87.5% {
          transform: rotate(2deg);
        }
        100% {
          transform: rotate(4deg);
        }
      }
    </style>

    <div id="sardine">
      <div id="wrapper">
        <span id="feeling">[[feeling]]</span>
        <template is="dom-if" if="[[!hidden]]">
          <img src="images/sardine.png" alt="nuxeo sardine" />
        </template>
      </div>
    </div>
  `,is:"nuxeo-sardine",properties:{hidden:{type:Boolean,value:!1,notify:!0,reflectToAttribute:!0},state:String,feeling:String},ready(){this._onkeypress=function(e){"Escape"===e.key&&this._off()}.bind(this),this._onpointerout=function(){this._unknownLocation=!0}.bind(this),this._ondblclick=function(){this._off()}.bind(this),this._onpointermove=function(e){this._idleTimeout&&clearTimeout(this._idleTimeout),this._idleTimeout=setTimeout((()=>{this.feeling="💤"}),15e3),this._unknownLocation=!1,this._lastPointerEvent=e,this._req&&cancelAnimationFrame(this._req),this._req=requestAnimationFrame(this._animate.bind(this))}.bind(this),customElements.whenDefined("nuxeo-suggester").then((()=>{this.$.sardine.style.left=Math.random()*window.innerWidth+"px",this.$.sardine.style.top=Math.random()*window.innerHeight+"px",V({id:"sardine",trigger:{searchTerm:"i love sardines!!!",startsWith:!1},suggestion:{id:"sardine",icon:"images/gift.png",label:"I love sardines!!! 🐟🐟🐟💝💝💝"},run:this._on.bind(this)})}))},_on(){this.hidden=!1,this.$.sardine.addEventListener("dblclick",this._ondblclick),window.PointerEvent?(window.addEventListener("pointermove",this._onpointermove,!1),window.addEventListener("pointerout",this._onpointerout,!1)):(window.addEventListener("mousemove",this._onpointermove,!1),window.addEventListener("mouseout",this._onpointerout,!1)),window.addEventListener("keyup",this._onkeypress,!1)},_animate(){const e=this.$.sardine.getBoundingClientRect();let t=e.left;const i=e.top,a=e.width,o=e.height;let n=this._lastPointerEvent.x,s=this._lastPointerEvent.y;n=n+a>window.innerWidth?window.innerWidth-a:n,s=s+o>window.innerHeight?window.innerHeight-o:s;const r=Math.sqrt((t-n)**2+(i-s)**2);if(r<32?this._unknownLocation?this.feeling=this._lastPointerEvent.pointerType&&"mouse"!==this._lastPointerEvent.pointerType?"😍":"❗":this._lastPointerEvent.pointerType&&"touch"===this._lastPointerEvent.pointerType||(this.feeling="❤️"):this.feeling="",r>1){const e=this._lerp(t,n,.05),a=this._lerp(i,s,.05);if(this.$.sardine.style.left=`${e}px`,this.$.sardine.style.top=`${a}px`,t=this.$.sardine.getBoundingClientRect().left,!this._unknownLocation){const e=t<this._lastPointerEvent.x-32?"left":"right";e!==this.$.sardine._dir&&(this.$.sardine.classList.remove(this.$.sardine._dir),this.$.sardine.classList.add(e)),this.$.sardine._dir=e}this._req=requestAnimationFrame(this._animate.bind(this))}},_off(){this.hidden=!0,this._req&&cancelAnimationFrame(this._req),this._idleTimeout&&clearTimeout(this._idleTimeout),window.removeEventListener("pointermove",this._onpointermove,!1),window.removeEventListener("keyup",this._onkeypress,!1),window.removeEventListener("pointerleave",this._onpointerout),this.$.sardine.removeEventListener("dblclick",this._ondblclick)},_lerp:(e,t,i)=>e+(t-e)*((i=i<0?0:i)>1?1:i)})},46700:(e,t,i)=>{var a={"./af":41247,"./af.js":41247,"./ar":27334,"./ar-dz":21113,"./ar-dz.js":21113,"./ar-kw":71220,"./ar-kw.js":71220,"./ar-ly":14018,"./ar-ly.js":14018,"./ar-ma":86040,"./ar-ma.js":86040,"./ar-sa":79929,"./ar-sa.js":79929,"./ar-tn":99381,"./ar-tn.js":99381,"./ar.js":27334,"./az":14261,"./az.js":14261,"./be":38847,"./be.js":38847,"./bg":50249,"./bg.js":50249,"./bm":26753,"./bm.js":26753,"./bn":67064,"./bn-bd":44766,"./bn-bd.js":44766,"./bn.js":67064,"./bo":64399,"./bo.js":64399,"./br":49433,"./br.js":49433,"./bs":33984,"./bs.js":33984,"./ca":87442,"./ca.js":87442,"./cs":10404,"./cs.js":10404,"./cv":132,"./cv.js":132,"./cy":52581,"./cy.js":52581,"./da":27642,"./da.js":27642,"./de":58198,"./de-at":52950,"./de-at.js":52950,"./de-ch":661,"./de-ch.js":661,"./de.js":58198,"./dv":35191,"./dv.js":35191,"./el":90459,"./el.js":90459,"./en-au":30764,"./en-au.js":30764,"./en-ca":22357,"./en-ca.js":22357,"./en-gb":82058,"./en-gb.js":82058,"./en-ie":91194,"./en-ie.js":91194,"./en-il":96971,"./en-il.js":96971,"./en-in":13481,"./en-in.js":13481,"./en-nz":55141,"./en-nz.js":55141,"./en-sg":82105,"./en-sg.js":82105,"./eo":20865,"./eo.js":20865,"./es":82100,"./es-do":60910,"./es-do.js":60910,"./es-mx":91014,"./es-mx.js":91014,"./es-us":35585,"./es-us.js":35585,"./es.js":82100,"./et":83610,"./et.js":83610,"./eu":22653,"./eu.js":22653,"./fa":46906,"./fa.js":46906,"./fi":84468,"./fi.js":84468,"./fil":77990,"./fil.js":77990,"./fo":92387,"./fo.js":92387,"./fr":15854,"./fr-ca":52219,"./fr-ca.js":52219,"./fr-ch":83673,"./fr-ch.js":83673,"./fr.js":15854,"./fy":22362,"./fy.js":22362,"./ga":91987,"./ga.js":91987,"./gd":87657,"./gd.js":87657,"./gl":8527,"./gl.js":8527,"./gom-deva":36002,"./gom-deva.js":36002,"./gom-latn":12053,"./gom-latn.js":12053,"./gu":26097,"./gu.js":26097,"./he":88370,"./he.js":88370,"./hi":26693,"./hi.js":26693,"./hr":57358,"./hr.js":57358,"./hu":50606,"./hu.js":50606,"./hy-am":97377,"./hy-am.js":97377,"./id":28512,"./id.js":28512,"./is":40072,"./is.js":40072,"./it":23838,"./it-ch":54882,"./it-ch.js":54882,"./it.js":23838,"./ja":52599,"./ja.js":52599,"./jv":16317,"./jv.js":16317,"./ka":65615,"./ka.js":65615,"./kk":44906,"./kk.js":44906,"./km":82204,"./km.js":82204,"./kn":78557,"./kn.js":78557,"./ko":86430,"./ko.js":86430,"./ku":27135,"./ku.js":27135,"./ky":32866,"./ky.js":32866,"./lb":22288,"./lb.js":22288,"./lo":46038,"./lo.js":46038,"./lt":59074,"./lt.js":59074,"./lv":90613,"./lv.js":90613,"./me":55733,"./me.js":55733,"./mi":53609,"./mi.js":53609,"./mk":59830,"./mk.js":59830,"./ml":19921,"./ml.js":19921,"./mn":77933,"./mn.js":77933,"./mr":48725,"./mr.js":48725,"./ms":55842,"./ms-my":20661,"./ms-my.js":20661,"./ms.js":55842,"./mt":16228,"./mt.js":16228,"./my":45093,"./my.js":45093,"./nb":3335,"./nb.js":3335,"./ne":28331,"./ne.js":28331,"./nl":84385,"./nl-be":89145,"./nl-be.js":89145,"./nl.js":84385,"./nn":41659,"./nn.js":41659,"./oc-lnc":56114,"./oc-lnc.js":56114,"./pa-in":5859,"./pa-in.js":5859,"./pl":16198,"./pl.js":16198,"./pt":65064,"./pt-br":89410,"./pt-br.js":89410,"./pt.js":65064,"./ro":94405,"./ro.js":94405,"./ru":72489,"./ru.js":72489,"./sd":84211,"./sd.js":84211,"./se":26715,"./se.js":26715,"./si":40012,"./si.js":40012,"./sk":25382,"./sk.js":25382,"./sl":29481,"./sl.js":29481,"./sq":19805,"./sq.js":19805,"./sr":60301,"./sr-cyrl":68542,"./sr-cyrl.js":68542,"./sr.js":60301,"./ss":45446,"./ss.js":45446,"./sv":52418,"./sv.js":52418,"./sw":83565,"./sw.js":83565,"./ta":10486,"./ta.js":10486,"./te":18759,"./te.js":18759,"./tet":53610,"./tet.js":53610,"./tg":15382,"./tg.js":15382,"./th":80229,"./th.js":80229,"./tk":37258,"./tk.js":37258,"./tl-ph":66859,"./tl-ph.js":66859,"./tlh":85068,"./tlh.js":85068,"./tr":24839,"./tr.js":24839,"./tzl":21034,"./tzl.js":21034,"./tzm":25004,"./tzm-latn":64604,"./tzm-latn.js":64604,"./tzm.js":25004,"./ug-cn":31727,"./ug-cn.js":31727,"./uk":70730,"./uk.js":70730,"./ur":99246,"./ur.js":99246,"./uz":97362,"./uz-latn":39150,"./uz-latn.js":39150,"./uz.js":97362,"./vi":44150,"./vi.js":44150,"./x-pseudo":96441,"./x-pseudo.js":96441,"./yo":24769,"./yo.js":24769,"./zh-cn":9015,"./zh-cn.js":9015,"./zh-hk":64232,"./zh-hk.js":64232,"./zh-mo":10492,"./zh-mo.js":10492,"./zh-tw":72656,"./zh-tw.js":72656};function o(e){var t=n(e);return i(t)}function n(e){if(!i.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}o.keys=function(){return Object.keys(a)},o.resolve=n,e.exports=o,o.id=46700}}]);