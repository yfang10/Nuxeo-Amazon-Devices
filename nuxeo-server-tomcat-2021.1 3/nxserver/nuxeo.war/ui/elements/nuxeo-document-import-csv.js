import{Polymer}from"@polymer/polymer/lib/legacy/polymer-fn.js";import{html}from"@polymer/polymer/lib/utils/html-tag.js";import{IronResizableBehavior}from"@polymer/iron-resizable-behavior";import{I18nBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-i18n-behavior.js";import{FiltersBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-filters-behavior.js";import{UploaderBehavior}from"@nuxeo/nuxeo-ui-elements/widgets/nuxeo-uploader-behavior.js";import{RoutingBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-routing-behavior.js";import{DocumentCreationBehavior}from"../../../elements/nuxeo-document-creation/nuxeo-document-creation-behavior.js";Polymer({_template:html`
    <style include="iron-flex iron-flex-alignment nuxeo-styles">
      :host {
        display: block;
        @apply --layout-flex;
        @apply --layout-vertical;
      }

      paper-dialog {
        height: 80vh;
      }

      paper-spinner-lite {
        --paper-spinner-color: var(--default-primary-color);
      }

      .suggester {
        background-color: var(--input-background, rgba(0, 0, 0, 0.05));
        padding: 8px 16px;
        margin: 1rem 32px;
        z-index: 100;
      }

      .options,
      .summary {
        margin: 1rem 32px;
      }

      .file-to-import {
        min-height: 3em;
        margin: 0 0.3em 0.8em;
        width: calc(50% - 3em);
        padding: 0.8em 1em;
        background-color: white;
        border: 1px solid var(--divider-color);
        position: relative;
      }

      paper-progress {
        width: 100%;
      }

      ::content label {
        @apply --nuxeo-label;
        padding-top: 8px;
      }

      paper-dropdown-menu {
        width: 100%;
      }

      div[name='customize'] #blobEditor span {
        width: 200px;
      }

      .step {
        padding: 1em;
        position: relative;
        min-height: 100px;
        margin: 1em 2em 1em;
      }

      #dropzone {
        background-color: #f7f6f6;
        border: 2px dashed var(--divider-color);
        border-radius: 4px;
      }

      .drop-scrollable {
        overflow: auto;
      }

      .name {
        font-weight: bold;
        word-break: break-word;
        font-size: 1.1em;
      }

      .size {
        font-size: 0.75em;
        color: var(--nuxeo-text-light, #aaa);
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
        color: #fff;
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
        color: blue;
      }

      .dropzone-label {
        cursor: pointer;
        margin: 16px 0 48px 0;
      }

      .clear {
        width: 3em;
        visibility: hidden;
        background-color: #fff;
        text-align: right;
      }

      .clear paper-icon-button {
        padding: 0 0 1em 0.5em;
      }

      .file-to-import:hover .clear {
        visibility: visible;
        z-index: 1;
      }

      .file-to-import:last-of-type {
        margin-bottom: 3em;
      }

      .buttons {
        @apply --buttons-bar;
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

      .importing-label {
        margin-right: 8px;
      }

      .status {
        margin: 1em;
      }

      .success {
        background-color: #d1f5c7;
        color: #569150;
        border-radius: 3px;
        display: inline-block;
        font-size: 1.1em;
        font-weight: bold;
        margin: 0.3em 0.5em 0.3em 0;
        padding: 0.8em 1em 1em 2.2em;
      }

      .report {
        margin: 2em 0;
      }

      .line {
        @apply --layout-horizontal;
      }

      .line label {
        min-width: 200px;
      }

      .successful {
        color: #569150;
      }

      .failed {
        color: orange;
      }

      div[failed] {
        color: orange;
      }

      .item {
        cursor: pointer;
        padding: 16px 22px;
        border-bottom: 1px solid #ddd;
      }

      .vertical {
        @apply --layout-flex;
        @apply --layout-vertical;
      }

      iron-pages {
        @apply --layout-flex;
        @apply --layout-vertical;
      }

      .list-item-info div {
        margin-right: 1em;
      }

      .list-item-info div:last-child {
        margin-right: 0;
      }
    </style>

    <nuxeo-connection id="nx" user="{{currentUser}}"></nuxeo-connection>
    <nuxeo-resource id="csvImportRes"></nuxeo-resource>
    <nuxeo-operation id="cvsImportStatus" op="CSV.ImportStatus"></nuxeo-operation>
    <nuxeo-operation id="cvsImportResultOp" op="CSV.ImportResult"></nuxeo-operation>
    <nuxeo-operation id="cvsImportLogOp" op="CSV.ImportLog"></nuxeo-operation>

    <iron-pages selected="[[stage]]" attr-for-selected="name">
      <!--Stage: allow the user to upload files-->
      <div name="upload" class="upload vertical">
        <div class="suggester">
          <nuxeo-path-suggestion
            id="pathSuggesterUpload"
            label="[[i18n('documentImportForm.location')]]"
            value="{{targetPath}}"
            parent="{{suggesterParent}}"
            enrichers="permissions, subtypes"
            children="{{suggesterChildren}}"
            disabled
            always-float-label
          ></nuxeo-path-suggestion>
          <span class$="horizontal layout [[_formatErrorMessage(errorMessage)]]">[[errorMessage]]</span>
        </div>

        <div id="dropzone" class="vertical layout flex step" hidden="[[!canCreate]]">
          <input hidden id="uploadFiles" type="file" on-change="_fileChanged" accept="[[accept]]" />
          <template is="dom-if" if="[[!hasFile]]">
            <div class="vertical layout center center-justified flex">
              <div class="dropzone-label horizontal layout center center-justified">
                <a href="javascript:undefined" on-tap="_showUploadDialog"> [[i18n('csv.import.clickOrDrop')]]</a>
              </div>
            </div>
          </template>
          <template is="dom-if" if="[[hasFile]]">
            <div class="drop-scrollable">
              <div class="vertical layout flex">
                <div class="horizontal layout wrap baseline">
                  <div class="file-to-import horizontal layout">
                    <div class="vertical layout flex">
                      <div class="horizontal layout">
                        <div class="name">
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
                      <template is="dom-if" if="[[complete]]">
                        <div class="complete">
                          <iron-icon icon="icons:check"></iron-icon>
                        </div>
                      </template>
                      <template is="dom-if" if="[[!complete]]">
                        <paper-progress indeterminate></paper-progress>
                      </template>
                    </div>
                    <div class="clear">
                      <paper-icon-button
                        icon="icons:clear"
                        on-tap="_removeBlob"
                        aria-labelledby="removeTooltip"
                      ></paper-icon-button>
                      <paper-tooltip id="removeTooltip">[[i18n('command.remove')]]</paper-tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <div class="options" hidden="[[!canCreate]]">
          <div class="layout vertical">
            <paper-toggle-button checked="{{receiveEmailReport}}"
              >[[i18n('csv.import.option.emailReport')]]</paper-toggle-button
            >
            <paper-toggle-button
              checked="{{enableImportMode}}"
              disabled$="[[!hasAdministrationPermissions(currentUser)]]"
              >[[i18n('csv.import.option.useImportMode')]]
            </paper-toggle-button>
          </div>
        </div>

        <div class="buttons horizontal end-justified layout">
          <div class="flex start-justified">
            <paper-button dialog-dismiss on-tap="_cancel" disabled$="[[_creating]]" class="secondary"
              >[[i18n('command.cancel')]]</paper-button
            >
          </div>
          <paper-button noink class="primary" on-tap="_import" disabled$="[[!_canImport(_creating,hasFile)]]">
            [[i18n('command.create')]]
          </paper-button>
          <div class="layout" hidden$="[[!_creating]]">
            <span class="importing-label">[[i18n('documentImport.importing')]]</span>
            <paper-spinner-lite active></paper-spinner-lite>
          </div>
        </div>
      </div>

      <div name="progress" class="vertical layout flex">
        <div id="progress" class="summary">
          <div hidden$="[[_hasResult]]">
            <div hidden$="[[_error]]">
              <div class="name status">[[progressLabel]]</div>
              <div class="status">
                <paper-progress
                  id="importProgress"
                  value="[[_count]]"
                  min="0"
                  max="[[_total]]"
                  class="blue"
                  indeterminate
                >
                </paper-progress>
              </div>
            </div>
          </div>
          <span class="error" hidden$="[[!_error]]">[[i18n('csv.import.error')]]</span>
          <div hidden$="[[!_hasResult]]">
            <div class="success"><iron-icon icon="icons:check"></iron-icon>[[i18n('csv.import.success')]]</div>
            <div class="report">
              <div class="line successful layout flex">
                <label>[[i18n('csv.import.report.successLine')]]</label>
                <div class="count">[[_importResult.successLineCount]] / [[_importResult.totalLineCount]]</div>
              </div>
              <div class="line skipped layout flex">
                <label>[[i18n('csv.import.report.skippedLine')]]</label>
                <div class="count">[[_importResult.skippedLineCount]] / [[_importResult.totalLineCount]]</div>
              </div>
              <div class="line failed layout flex">
                <label>[[i18n('csv.import.report.errorLine')]]</label>
                <div class="count">[[_importResult.errorLineCount]] / [[_importResult.totalLineCount]]</div>
              </div>
            </div>
            <div class="brief" hidden$="[[!receiveEmailReport]]">[[i18n('csv.import.report.notify')]]</div>
          </div>
        </div>

        <div class="vertical layout flex step">
          <div class="drop-scrollable">
            <iron-list id="list" items="[[_importLogs]]">
              <template>
                <div class="item">
                  <div class="list-item-info horizontal layout">
                    <div class="flex-1" failed$="[[_isError(item)]]" skipped$="[[_isSkipped(item)]]">
                      [[i18n('csv.import.report.line')]] [[item.line]]
                    </div>
                    <div class="flex-1" failed$="[[_isError(item)]]" skipped$="[[_isSkipped(item)]]">
                      [[item.status]]
                    </div>
                    <div class="flex-3 list-item-detail">
                      [[_i18n(item.localizedMessage, item.localizedMessageParams)]]
                    </div>
                  </div>
                </div>
              </template>
            </iron-list>
          </div>
        </div>

        <div class="buttons horizontal end-justified layout">
          <paper-button noink on-tap="_clear" disabled$="[[!_hasResult]]">
            [[i18n('csv.import.new')]]
          </paper-button>
          <paper-button dialog-dismiss on-tap="_close" class="primary">[[i18n('command.close')]]</paper-button>
        </div>
      </div>
    </iron-pages>

    <paper-toast id="toast"></paper-toast>
  `,is:"nuxeo-document-import-csv",behaviors:[I18nBehavior,IronResizableBehavior,UploaderBehavior,DocumentCreationBehavior,RoutingBehavior,FiltersBehavior],properties:{accept:{type:String,value:".csv"},hasFile:{type:Boolean,value:!1},file:{type:Object},complete:{type:Boolean,value:!1},_importDocTypes:{type:Array,computed:"_computeImportDocTypes(subtypes)"},visible:{type:Boolean},_creating:{type:Boolean,value:!1},_importResult:{type:Object},_importLogs:{type:Array,value:[]},_hasResult:{type:Boolean,value:!1},stage:{type:String,value:"upload"},_count:{type:Number,value:0},_total:{type:Number,value:0},_error:{type:Boolean,value:!1},receiveEmailReport:{type:Boolean,value:!1},enableImportMode:{type:Boolean,value:!1},progressLabel:{type:String,value:""}},_canImport(){return this.hasFile&&!this._creating},ready(){this.connection=this.$.nx,this.setupDropZone(this.$.dropzone),this._clear()},observers:["_observeFiles(files.*)","_visibleOnStage(visible,stage)","_observeVisible(visible)"],_i18n(e,i){return i&&0!==i.length?1===i.length?this.i18n(e,i[0]):this.i18n(e,i[0],i[1]):this.i18n(e)},_filterLogs(e){return e.filter((e=>this._isError(e)||this._isSkipped(e)))},_isError:e=>"ERROR"===e.status,_isSkipped:e=>"SKIPPED"===e.status,_observeVisible(){this.visible?this._clear():this._waitProgressId&&clearTimeout(this._waitProgressId)},_removeBlob(){this.$.csvImportRes.path=`upload/${this.batchId}/0`,this.$.csvImportRes.remove().then((()=>{this.file={},this.hasFile=!1,this.$.uploadFiles.value=""}),this._handleError.bind(this))},_computeImportDocTypes(){if(this.subtypes)return this.subtypes.filter(this._filterImportDocTypes)},_filterImportDocTypes:e=>-1===window.nuxeo.importBlacklist.indexOf(e.type),_observeFiles(e){e&&("files.splices"===e.path&&e.value&&e.value.indexSplices?this.files&&this.files.length>0&&([this.file]=this.files,this.hasFile=!0,this._creating=!0):e.path.match(/files\.\d+\.complete/gi)&&(this.complete=!0,this._creating=!1))},_showUploadDialog(){this.$.uploadFiles.click()},_fileChanged(e){this.uploadFiles(e.target.files),this.hasFile=!0},_visibleOnStage(){this.$.pathSuggesterUpload.disabled=!this.visible||"upload"!==this.stage},_clear(){this.stage="upload",this.files=[],this.file={},this.hasFile=!1,this._creating=!1,this._importResult={},this._total=0,this._count=0,this.$.importProgress.indeterminate=!0,this._error=!1,this.$.uploadFiles.value="",this._hasResult=!1,this.progressLabel="",this._importLogs=[]},_handleError(e){this._toast(`ERROR: ${e.message}`)},_toast(e){this.$.toast.text=e,this.$.toast.open()},_cancel(){this.batchId&&this.cancelBatch(),this._clear(),this.stage="upload",this.fire("nx-creation-wizard-show-tabs")},_import(){this.$.csvImportRes.path=`upload/${this.batchId}/0/execute/CSV.Import`,this.$.csvImportRes.data={params:{path:this.targetPath,sendReport:this.receiveEmailReport,documentMode:this.enableImportMode}},this.$.csvImportRes.post().then((e=>{this.stage="progress",this._waitProgressId=window.setTimeout(this._waitForProgress.bind(this),500,e)}),this._handleError.bind(this))},_waitForProgress(e){this.$.cvsImportStatus.input=e,this.$.cvsImportStatus.execute().then((i=>{const t=i.value;this._total=t.totalNumberOfDocument,this._total>=0&&(this.$.importProgress.indeterminate=!1),"ERROR"===t.state?this._error=!0:"RUNNING"===t.state||"SCHEDULED"===t.state?(this._count=t.numberOfProcessedDocument,this._total>=0?this.progressLabel=this.i18n("csv.import.progress.statusWithTotal",this._count,this._total):this.progressLabel=this.i18n("csv.import.progress.statusWithoutTotal",this._count),this._waitProgressId=window.setTimeout(this._waitForProgress.bind(this),800,e)):"COMPLETED"===t.state?(this._count=t.numberOfProcessedDocument,this._waitProgressId=null,this._count<0?this._error=!0:(this.$.cvsImportLogOp.input=e,this.$.cvsImportLogOp.execute().then((e=>{this._importLogs=this._filterLogs(e.value),this.$.list.notifyResize()})),this.$.cvsImportResultOp.input=e,this.$.cvsImportResultOp.execute().then((e=>{this._importResult=e.value,this._hasResult=!0})))):this._handleError({message:"Error while processing: unknown status."})}),this._handleError.bind(this))},_close(){"progress"===this.stage&&this._count>0&&(this.fire("document-updated"),this.navigateTo(this.parent)),this._waitProgressId&&clearTimeout(this._waitProgressId)}});