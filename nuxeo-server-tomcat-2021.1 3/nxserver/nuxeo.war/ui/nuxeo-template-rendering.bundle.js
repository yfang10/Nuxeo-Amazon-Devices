/*! For license information please see nuxeo-template-rendering.bundle.js.LICENSE.txt */
(self.webpackChunk_nuxeo_nuxeo_web_ui=self.webpackChunk_nuxeo_nuxeo_web_ui||[]).push([[464],{6011:(e,t,a)=>{"use strict";a.r(t);var i=a(21536),r=a(66538),o=a(34408),l=a(41608),s=a(74153),n=a(69699);const p=new XMLSerializer,d=new DOMParser;(0,i.k)({_template:r.d`
    <style include="nuxeo-styles">
      :host {
        display: inline-block;
      }

      .container {
        padding: 1em 1.5em 2em 1.5em;
      }

      .buttons {
        @apply --buttons-bar;
        @apply --layout-horizontal;
        @apply --layout-end-justified;
      }

      #form {
        margin: 0;
        padding: 0;
      }

      #submitButton {
        display: none;
      }

      #editParamDialog paper-checkbox {
        margin-left: 8px;
      }

      /*
       * Not using mixin --paper-icon-button-disabled because: https://github.com/Polymer/polymer/issues/3205
       */
      paper-icon-button[disabled] {
        visibility: hidden;
      }

      .signature + .signature {
        margin-top: 6px;
        padding-top: 6px;
      }

      div[name='edit'] .signature + .signature,
      .signatureFooter {
        border-top: 1px solid var(--nuxeo-border);
      }

      .signature label {
        font-weight: bold;
      }

      .heading {
        font-size: 16px;
        color: var(--nuxeo-text-default);
        margin-top: 16px;
      }

      .deleted {
        color: var(--disabled-text-color);
      }

      .edited {
        font-weight: 900;
      }

      .horizontal-layout {
        @apply --layout-center;
        @apply --layout-horizontal;
        @apply --layout-flex;
      }

      .start-justified {
        @apply --layout-start-justified;
      }

      .justified {
        @apply --layout-justified;
      }

      .end-justified {
        @apply --layout-end-justified;
      }

      .vertical {
        @apply --layout-vertical;
      }

      .flex {
        @apply --layout-flex;
      }
    </style>

    <iron-pages selected="[[mode]]" attr-for-selected="name" class="vertical flex">
      <div name="view">
        <div class="horizontal-layout signature justified" hidden$="[[!_hasParams(params)]]">
          <div class="horizontal-layout start-justified">
            <label>[[i18n('templateRenderingPage.parameters.name')]]</label>
          </div>
          <div class="horizontal-layout start-justified">
            <label>[[i18n('templateRenderingPage.parameters.type')]]</label>
          </div>
          <div class="horizontal-layout start-justified">
            <label>[[i18n('templateRenderingPage.parameters.value')]]</label>
          </div>
        </div>
        <template is="dom-repeat" items="[[_getParams(params)]]" as="param">
          <div class="horizontal-layout signature justified">
            <div class="horizontal-layout start-justified">
              <span>[[_getParamAttribute(param, 'name', params)]]</span>
            </div>
            <div class="horizontal-layout start-justified">
              <span>[[_getParamTypeTranslated(param, params)]]</span>
            </div>
            <div class="horizontal-layout start-justified">
              <span>[[_getParamValueWithLoop(param, params)]]</span>
            </div>
          </div>
        </template>
      </div>
      <div name="edit">
        <div class="horizontal-layout signature start-justified">
          <div class="horizontal-layout start-justified">
            <label>[[i18n('templateRenderingPage.parameters.name')]]</label>
          </div>
          <div class="horizontal-layout start-justified">
            <label>[[i18n('templateRenderingPage.parameters.type')]]</label>
          </div>
          <div class="horizontal-layout start-justified">
            <label>[[i18n('templateRenderingPage.parameters.value')]]</label>
          </div>
          <div class="horizontal-layout start-justified"></div>
        </div>
        <template is="dom-repeat" items="[[_getParams(params)]]" as="param">
          <div class$="horizontal-layout signature justified [[_formatSignature(param, params)]]">
            <div class="horizontal-layout start-justified">
              <span>[[_getParamAttribute(param, 'name', params)]]</span>
            </div>
            <div class="horizontal-layout start-justified">
              <span>[[_getParamTypeTranslated(param, params)]]</span>
            </div>
            <div class="horizontal-layout start-justified">
              <span>[[_getParamValueWithLoop(param, params)]]</span>
            </div>
            <div class="horizontal-layout end-justified">
              <paper-icon-button
                id="[[_computeBtnId(param, 'edit')]]"
                icon="icons:create"
                on-tap="_editParam"
                disabled="[[!_canEdit(param, params)]]"
                aria-labelledby="editTooltip"
              ></paper-icon-button>
              <paper-tooltip for="[[_computeBtnId(param, 'edit')]]" id="editTooltip"
                >[[i18n('templateRenderingPage.parameters.edit.tooltip')]]</paper-tooltip
              >
              <div hidden$="[[!allowDelete]]">
                <paper-icon-button
                  id="[[_computeBtnId(param, 'remove')]]"
                  icon="icons:delete"
                  on-tap="_deleteParam"
                  disabled="[[!_canEdit(param, params)]]"
                  aria-labelledby="removeTooltip"
                ></paper-icon-button>
                <paper-tooltip for="[[_computeBtnId(param, 'remove')]]" id="removeTooltip"
                  >[[i18n('templateRenderingPage.parameters.remove.tooltip')]]</paper-tooltip
                >
              </div>
            </div>
          </div>
        </template>
        <div class="horizontal-layout end-justified signatureFooter" hidden$="[[!allowCreate]]">
          <paper-icon-button
            id="addParamBtn"
            icon="icons:add-circle"
            on-tap="_addParam"
            aria-labelledby="addParametersTooltip"
          ></paper-icon-button>
          <paper-tooltip for="addParamBtn" id="addParametersTooltip"
            >[[i18n('templateRenderingPage.parameters.add.tooltip')]]</paper-tooltip
          >
        </div>
      </div>
    </iron-pages>

    <nuxeo-dialog id="editParamDialog" modal>
      <iron-form id="form" on-iron-form-submit="_submitSaveParam">
        <form class="vertical flex">
          <div class="container vertical">
            <span class="heading">[[i18n('templateRenderingPage.editParamDialog.heading')]]</span>
            <paper-input
              label="[[i18n('templateRenderingPage.editParamDialog.paramName.label')]]"
              pattern="[[_computeParamNamePattern(param, params)]]"
              error-message="[[i18n('templateRenderingPage.editParamDialog.paramName.error')]]"
              value="{{selectedParamProperties.name}}"
              auto-validate
              always-float-label
              required
            ></paper-input>

            <paper-dropdown-menu label="[[i18n('templateRenderingPage.parameters.type')]]" always-float-label>
              <paper-listbox
                slot="dropdown-content"
                selected="{{selectedParamProperties.type}}"
                attr-for-selected="name"
              >
                <template is="dom-repeat" items="[[paramTypes]]">
                  <paper-item name="[[item]]">[[_getParamTypeLabel(item)]]</paper-item>
                </template>
              </paper-listbox>
            </paper-dropdown-menu>

            <template is="dom-if" if="[[_isSelectedParamType('String', selectedParamProperties.type)]]">
              <paper-textarea
                label="[[i18n('templateRenderingPage.parameters.value')]]"
                value="{{selectedParamProperties.value}}"
                always-float-label
              ></paper-textarea>
            </template>
            <template is="dom-if" if="[[_isSelectedParamType('Boolean', selectedParamProperties.type)]]">
              <div class="horizontal-layout">
                <label>[[i18n('templateRenderingPage.parameters.value')]]</label>
                <paper-checkbox checked="{{selectedParamProperties.value}}"></paper-checkbox>
              </div>
            </template>
            <template is="dom-if" if="[[_isSelectedParamType('Date', selectedParamProperties.type)]]">
              <div class="horizontal-layout">
                <nuxeo-date-picker
                  label="[[i18n('templateRenderingPage.parameters.value')]]"
                  value="{{selectedParamProperties.value}}"
                >
                </nuxeo-date-picker>
              </div>
            </template>
            <template is="dom-if" if="[[_isSelectedParamType('source', selectedParamProperties.type)]]">
              <div class="vertical">
                <paper-input
                  label="[[i18n('templateRenderingPage.parameters.xpath')]]"
                  value="{{selectedParamProperties.value}}"
                  always-float-label
                ></paper-input>
                <div class="horizontal-layout">
                  <label>[[i18n('templateRenderingPage.parameters.autoloop')]]</label>
                  <paper-checkbox checked="{{selectedParamProperties.loop}}"></paper-checkbox>
                </div>
              </div>
            </template>
            <template is="dom-if" if="[[_isSelectedParamType('picture', selectedParamProperties.type)]]">
              <div class="vertical">
                <paper-input
                  label="[[i18n('templateRenderingPage.parameters.xpath')]]"
                  value="{{selectedParamProperties.value}}"
                  always-float-label
                ></paper-input>
                <div class="horizontal-layout">
                  <label>[[i18n('templateRenderingPage.parameters.autoloop')]]</label>
                  <paper-checkbox checked="{{selectedParamProperties.loop}}"></paper-checkbox>
                </div>
              </div>
            </template>
            <template is="dom-if" if="[[_isSelectedParamType('content', selectedParamProperties.type)]]">
              <paper-dropdown-menu label="[[i18n('templateRenderingPage.parameters.source')]]" always-float-label>
                <paper-listbox
                  slot="dropdown-content"
                  selected="{{selectedParamProperties.contentType}}"
                  attr-for-selected="name"
                >
                  <template is="dom-repeat" items="[[contentTypes]]">
                    <paper-item name="[[item]]">[[_getContentTypeLabel(item)]]</paper-item>
                  </template>
                </paper-listbox>
              </paper-dropdown-menu>
              <template is="dom-if" if="[[_isSelectedContentTypeXPath(selectedParamProperties.contentType)]]">
                <paper-input
                  label="[[i18n('templateRenderingPage.paramType.content.xpath')]]"
                  value="{{selectedParamProperties.value}}"
                  always-float-label
                ></paper-input>
              </template>
            </template>
          </div>
          <div class="buttons">
            <div class="flex start-justified">
              <paper-button noink dialog-dismiss on-tap="_cancel" class="secondary"
                >[[i18n('command.cancel')]]</paper-button
              >
            </div>
            <paper-button noink class="primary" on-tap="_save" disabled$="[[!_isValid(collection)]]">
              [[i18n('command.save')]]
            </paper-button>
          </div>
        </form>
      </iron-form>
    </nuxeo-dialog>
  `,is:"nuxeo-template-param-editor",behaviors:[l.mB,n.e],properties:{templateData:{type:String,observer:"_readTemplateParams"},mode:{type:String,value:"view"},params:Object,param:Object,paramTypes:{type:Array,value:["String","Boolean","Date","source","picture","content"]},contentTypes:{type:Array,value:["htmlPreview","blobContent","xpath"]},selectedParamProperties:{type:Object,value:{name:"",type:"",loop:"",value:"",contentType:""}},allowDelete:{type:Boolean,value:!1},allowCreate:{type:Boolean,value:!1}},generateTemplateData(){return p.serializeToString(this.params.node)},reset(){this._readTemplateParams()},commitChanges(){this._getParams().forEach((e=>{const t=this._getParamAttribute(e,"change");t&&("deleted"===t&&this.params.querySelector("templateParams").removeChild(e),this._removeParamAttribute(e,"change"))}))},_templateDataChanged(){this._readTemplateParams()},_getParamTypeLabel(e){return this.i18n(`templateRenderingPage.paramType.${e}`)},_getContentTypeLabel(e){return this.i18n(`templateRenderingPage.paramType.content.${e}`)},_readTemplateParams(){this.set("params",(0,s.vz)(d.parseFromString(this.templateData?this.templateData:'<nxdt:templateParams xmlns:nxdt="http://www.nuxeo.org/DocumentTemplate"/>',"text/xml")))},_getParams(){return this.params?this.params.querySelectorAll("templateParams field"):[]},_hasParams(){return this._getParams().length>0},_getParamAttribute:(e,t)=>e?e.getAttribute(t):"",_setParamAttribute(e,t,a){e.setAttribute(t,a)},_removeParamAttribute(e,t){e.removeAttribute(t)},_checkParamAttribute(e,t,a){return this._getParamAttribute(e,t)===a},_getParamValue(e){switch(this._getParamAttribute(e,"type")){case"source":case"picture":case"content":return this._getParamAttribute(e,"source");default:return this._getParamAttribute(e,"value")}},_setParamValue(e,t){switch(this._getParamAttribute(e,"type")){case"source":case"picture":case"content":this._setParamAttribute(e,"source",t);break;default:this._setParamAttribute(e,"value",t)}},_getParamTypeTranslated(e){return this._getParamTypeLabel(this._getParamAttribute(e,"type"))},_getParamValueWithLoop(e){const t=this._getParamAttribute(e,"autoloop");return this._getParamValue(e)+(t?` (${this.i18n("templateRenderingPage.parameters.autoloop")})`:"")},_refreshParams(){const{params:e}=this;this.set("params",null),this.set("params",e)},_deleteParam(e){this._setParamAttribute(e.model.param,"change","deleted"),this._refreshParams()},_loadEditParamDialog(e){this.set("param",e),this.set("selectedParamProperties.name",this._getParamAttribute(this.param,"name")),this.set("selectedParamProperties.type",this._getParamAttribute(this.param,"type"));const t=this._getParamAttribute(this.param,"autoloop");this.set("selectedParamProperties.loop",!(!t||"false"===t));let a=this._getParamValue(this.param);"Date"===this.selectedParamProperties.type?a=this.formatDate(a,"yyyy-MM-ddTHH:mm:ss"):"Boolean"===this.selectedParamProperties.type&&(a=!(!a||"false"===a)),"content"===this.selectedParamProperties.type?"htmlPreview"!==a&&"blobContent"!==a?this.set("selectedParamProperties.contentType","xpath"):(this.set("selectedParamProperties.contentType",a),a=""):this.set("selectedParamProperties.contentType","htmlPreview"),this.set("selectedParamProperties.value",a)},_editParam(e){this._loadEditParamDialog(e.model.param),this.$.editParamDialog.toggle()},_addParam(){this.new=!0,this.param=document.createElementNS("http://www.nuxeo.org/DocumentTemplate","nxdt:field"),this._setParamAttribute(this.param,"name",""),this._setParamAttribute(this.param,"type","String"),this._setParamAttribute(this.param,"value",""),this._loadEditParamDialog(this.param),this.$.editParamDialog.toggle()},_save(){this.$.form.submit()},_cancel(){this.new=!1},_submitSaveParam(){this._setParamAttribute(this.param,"name",this.selectedParamProperties.name),this._setParamAttribute(this.param,"type",this.selectedParamProperties.type),"source"!==this.selectedParamProperties.type&&"picture"!==this.selectedParamProperties.type||!0!==this.selectedParamProperties.loop?this._removeParamAttribute(this.param,"autoloop"):this._setParamAttribute(this.param,"autoloop",this.selectedParamProperties.loop),"Date"===this.selectedParamProperties.type?this._setParamValue(this.param,this.formatDate(this.selectedParamProperties.value,"yyyy-MM-dd HH:mm:ss.SSS")):"content"===this.selectedParamProperties.type&&"xpath"!==this.selectedParamProperties.contentType?this._setParamValue(this.param,this.selectedParamProperties.contentType):this._setParamValue(this.param,this.selectedParamProperties.value),this.new&&(this.params.querySelector("templateParams").appendChild(this.param),this.new=!1),this._setParamAttribute(this.param,"change","edited"),this._refreshParams(),this.$.editParamDialog.toggle()},_computeBtnId:(e,t)=>`${t}_btn_${e.attributes.item("name").value}`,_computeParamNamePattern(){const e=this._getParams();return e&&e.length>0&&Array.from(this._getParams()).filter((e=>this._getParamAttribute(e,"name")!==this._getParamAttribute(this.param,"name"))).length>0?`^((?!(${Array.from(this._getParams()).filter((e=>this._getParamAttribute(e,"name")!==this._getParamAttribute(this.param,"name"))).map((e=>`^${this._getParamAttribute(e,"name")}$`)).join("|")})).)*$`:".*"},_isSelectedParamType(e){return this.selectedParamProperties.type===e},_isSelectedContentTypeXPath:e=>"htmlPreview"!==e&&"blobContent"!==e,_formatSignature(e){return this._getParamAttribute(e,"change")||""},_canEdit(e){return"deleted"!==this._getParamAttribute(e,"change")}}),(0,i.k)({_template:r.d`
    <style include="iron-flex iron-flex-alignment nuxeo-action-button-styles">
      .container {
        padding: 1em 0 2em;
      }

      .buttons {
        @apply --buttons-bar;
      }

      label {
        @apply --nuxeo-label;
      }
    </style>

    <nuxeo-operation id="getTemplatesOp" op="[[filterOp]]"></nuxeo-operation>
    <nuxeo-operation id="renderTemplateOp" op="[[renderOp]]"></nuxeo-operation>
    <div id="render" class="action" on-tap="_toggleDialog">
      <paper-icon-button noink icon="[[icon]]" src="[[iconSrc]]" aria-labelledby="label"></paper-icon-button>
      <span class="label" hidden$="[[!showLabel]]" id="label">[[i18n(label)]]</span>
      <paper-tooltip>[[i18n(tooltip)]]</paper-tooltip>
    </div>

    <nuxeo-dialog id="dialog" modal>
      <h2>[[i18n('renderTemplateButton.dialog.heading')]]</h2>
      <paper-dialog-scrollable>
        <div class="container layout vertical">
          <paper-dropdown-menu
            label="[[i18n('renderTemplateButton.dialog.instruction')]]"
            class="typeDropdown"
            noink
            always-float-label
            horizontal-align="left"
          >
            <paper-listbox slot="dropdown-content" selected="{{selectedTemplate}}" attr-for-selected="key">
              <template is="dom-repeat" items="[[_templates]]">
                <paper-item key="[[item]]">[[item.properties.dc:title]]</paper-item>
              </template>
            </paper-listbox>
          </paper-dropdown-menu>
          <div hidden$="[[!selectedTemplate.properties.dc:description]]">
            <label>[[i18n('renderTemplateButton.dialog.template.description')]]</label>
            <div class="multiline">[[selectedTemplate.properties.dc:description]]</div>
          </div>
        </div>
      </paper-dialog-scrollable>
      <div class="buttons horizontal end-justified layout">
        <div class="flex start-justified">
          <paper-button noink dialog-dismiss class="secondary">[[i18n('command.cancel')]]</paper-button>
        </div>
        <paper-button noink class="primary" on-tap="_render">
          [[i18n('renderTemplateButton.dialog.render')]]
        </paper-button>
      </div>
    </nuxeo-dialog>

    <nuxeo-dialog id="editParamsDialog" modal>
      <h2>[[i18n('renderTemplateButton.editParamsDialog.heading', selectedTemplate.properties.dc:title)]]</h2>
      <paper-dialog-scrollable>
        <div class="container layout vertical">
          <nuxeo-template-param-editor
            id="paramEditor"
            template-data="[[_templateData]]"
            mode="edit"
          ></nuxeo-template-param-editor>
        </div>
      </paper-dialog-scrollable>
      <div class="buttons horizontal end-justified layout">
        <div class="flex start-justified">
          <paper-button noink dialog-dismiss class="secondary">[[i18n('command.cancel')]]</paper-button>
        </div>
        <paper-button noink on-tap="_reset">[[i18n('renderTemplateButton.editParamsDialog.reset')]]</paper-button>
        <paper-button noink class="primary" on-tap="_override">
          [[i18n('renderTemplateButton.editParamsDialog.render')]]
        </paper-button>
      </div>
    </nuxeo-dialog>
  `,is:"nuxeo-render-template-button",behaviors:[o.M,l.mB],properties:{document:Object,filterOp:String,renderOp:String,showLabel:{type:Boolean,value:!1},label:{type:String,value:"renderTemplateButton.tooltip"},tooltip:{type:String,value:"renderTemplateButton.tooltip"},icon:{type:String,value:"icons:all-out"},iconSrc:String,skipRenderPopup:{type:Boolean,value:!1},_templates:{type:Array,value:[]},_templateData:String},_toggleDialog(){this.set("_templates",[]),this.set("selectedTemplate",""),this.$.getTemplatesOp.input=this.document,this.$.getTemplatesOp.execute().then((e=>{e.entries&&this.set("_templates",e.entries),0===this._templates.length?this._toast(this.i18n("renderTemplateButton.toast.noTemplates")):(this.set("selectedTemplate",this._templates[0]),this.skipRenderPopup&&1===this._templates.length?this._render():this.$.dialog.toggle())}))},_render(){if(this.set("_templateData",this.selectedTemplate.properties["tmpl:templateData"]),this.selectedTemplate.properties["tmpl:allowOverride"]&&this._templateData){if(this.document.properties["nxts:bindings"]){let e;for(let t=0;t<this.document.properties["nxts:bindings"].length;t++){const a=this.document.properties["nxts:bindings"][t];a.templateName===this.selectedTemplate.properties["tmpl:templateName"]&&(e=a)}e&&this.set("_templateData",e.templateData),this.$.paramEditor.reset()}this.$.editParamsDialog.toggle()}else this._renderOpWithParams();this.$.dialog.opened&&this.$.dialog.toggle()},_reset(){this.$.paramEditor.reset()},_override(){this.$.paramEditor.commitChanges(),this.set("_templateData",this.$.paramEditor.generateTemplateData()),this._renderOpWithParams(),this.$.editParamsDialog.toggle()},_renderOpWithParams(){return this.$.renderTemplateOp.input=this.document.uid,this.$.renderTemplateOp.params={templateName:this.selectedTemplate.properties["tmpl:templateName"],attach:!0,templateData:this._templateData},this._toast(this.i18n("renderTemplateButton.toast.rendering"),0),this.$.renderTemplateOp.execute().then((e=>this._download(e).then((()=>{this._toast(this.i18n("renderTemplateButton.toast.rendered",this.selectedTemplate.properties["dc:title"])),this.selectedTemplate.properties["tmpl:allowOverride"]&&this.fire("document-updated")})))).catch((e=>{this._toast(this.i18n("renderTemplateButton.toast.render.error",e.message))}))},_toast(e,t){this.notify({message:e,close:!0,duration:t})},_download(e){const t=e.headers.get("Content-Disposition");if(t){const a=t.match(/filename[^;=\n]*=([^;\n]*''([^;\n]*)|[^;\n]*)/).filter((e=>!!e)),i=decodeURI(a[a.length-1]);return e.blob().then((e=>{if(navigator.msSaveBlob)navigator.msSaveBlob(e,i);else{const t=document.createElement("a");t.style="display: none",t.download=i,t.href=URL.createObjectURL(e),document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(t.href)}}))}return Promise.reject(new Error("missing Content-Disposition header"))}});var m=a(5453);(0,i.k)({_template:r.d`
    <style include="nuxeo-styles nuxeo-action-button-styles">
      .container {
        padding: 1em 0 2em;
      }

      .buttons {
        @apply --buttons-bar;
      }
    </style>

    <nuxeo-operation id="deleteTemplatesOp" op="TemplateProcessor.Detach"></nuxeo-operation>
    <nuxeo-document id="template" doc-path="[[document.path]]"></nuxeo-document>
    <div id="delete" class="action" on-tap="_toggleDialog">
      <paper-icon-button icon="icons:delete-sweep" noink aria-labelledby="label"></paper-icon-button>
      <span class="label" hidden$="[[!showLabel]]" id="label">[[i18n('deleteTemplateButton.tooltip')]]</span>
      <paper-tooltip>[[i18n('deleteTemplateButton.tooltip')]]</paper-tooltip>
    </div>

    <nuxeo-dialog id="dialog" modal>
      <h2>[[i18n('deleteTemplateButton.dialog.heading')]]</h2>
      <paper-dialog-scrollable>
        <div class="container horizontal layout">
          <span>[[i18n('deleteTemplateButton.dialog.message')]]</span>
        </div>
      </paper-dialog-scrollable>
      <div class="buttons horizontal end-justified layout">
        <div class="flex start-justified">
          <paper-button noink dialog-dismiss class="secondary">[[i18n('command.cancel')]]</paper-button>
        </div>
        <paper-button noink class="primary" on-tap="_delete">
          [[i18n('deleteTemplateButton.dialog.confirm')]]
        </paper-button>
      </div>
    </nuxeo-dialog>
  `,is:"nuxeo-delete-template-button",behaviors:[l.mB,m.N],properties:{document:Object,showLabel:{type:Boolean,value:!1}},_toggleDialog(){this.$.dialog.toggle()},_delete(){this.$.deleteTemplatesOp.input=this.document.uid,this.$.deleteTemplatesOp.execute().then(this.$.template.remove.bind(this.$.template)).then((()=>{window.location=this.urlFor("document",this.document.parentRef)}))}}),(0,i.k)({_template:r.d`
    <style include="iron-flex iron-flex-alignment nuxeo-styles">
      :host {
        @apply --layout-flex;
        display: block;
      }

      .buttons {
        @apply --buttons-bar;
        margin: 16px -16px -16px -16px;
      }
    </style>

    <nuxeo-document id="doc" doc-id="[[editedDocument.uid]]" data="{{editedDocument}}" response="{{document}}">
    </nuxeo-document>

    <nuxeo-card heading="[[i18n('templateRenderingPage.config.heading')]]">
      <iron-pages selected="[[configMode]]" attr-for-selected="name" class="vertical layout flex">
        <div name="view">
          <div hidden$="[[!document.properties.tmpl:applicableTypes]]">
            <label>[[i18n('templateRenderingPage.validDocTypes')]]</label>
            <nuxeo-selectivity
              data="[[docTypes]]"
              placeholder="[[i18n('templateRenderingPage.validDocTypes.placeholder')]]"
              value="{{document.properties.tmpl:applicableTypes}}"
              min-chars="0"
              multiple
              readonly
            ></nuxeo-selectivity>
          </div>

          <div>
            <label>[[i18n('templateRenderingPage.parametersOverride')]]</label>
            <template is="dom-if" if="[[document.properties.tmpl:allowOverride]]">
              <span>[[i18n('label.yes')]]</span>
            </template>
            <template is="dom-if" if="[[!document.properties.tmpl:allowOverride]]">
              <span>[[i18n('label.no')]]</span>
            </template>
          </div>

          <div hidden$="[[!document.properties.tmpl:templateType]]">
            <label>[[i18n('templateRenderingPage.processor.label')]]</label>
            <div>[[_getProcessorLabel(document.properties.tmpl:templateType)]]</div>
          </div>

          <div class="buttons">
            <div class="horizontal layout start-justified">
              <paper-button noink class="primary" on-tap="_editConfig">[[i18n('command.edit')]]</paper-button>
            </div>
          </div>
        </div>
        <div name="edit">
          <div class="vertical layout">
            <nuxeo-resource path="config/types/" on-response="_handleDocTypes" auto></nuxeo-resource>

            <label>[[i18n('templateRenderingPage.validDocTypes')]]</label>
            <nuxeo-selectivity
              data="[[docTypes]]"
              placeholder="[[i18n('templateRenderingPage.validDocTypes.placeholder')]]"
              value="{{editedDocument.properties.tmpl:applicableTypes}}"
              min-chars="0"
              multiple
            ></nuxeo-selectivity>
            <label>[[i18n('templateRenderingPage.parametersOverride')]]</label>
            <paper-checkbox checked="{{editedDocument.properties.tmpl:allowOverride}}"></paper-checkbox>

            <paper-dropdown-menu
              label="[[i18n('templateRenderingPage.processor.label')]]"
              horizontal-align="left"
              always-float-label
            >
              <paper-listbox
                slot="dropdown-content"
                selected="{{editedDocument.properties.tmpl:templateType}}"
                attr-for-selected="name"
              >
                <template is="dom-repeat" items="[[processors]]">
                  <paper-item name="[[item]]">[[_getProcessorLabel(item)]]</paper-item>
                </template>
              </paper-listbox>
            </paper-dropdown-menu>
          </div>
          <div class="buttons">
            <div class="horizontal layout start-justified">
              <paper-button noink dialog-dismiss on-tap="_cancelEditConfig" class="secondary"
                >[[i18n('command.cancel')]]</paper-button
              >
              <paper-button noink class="primary" on-tap="_saveEditConfig">[[i18n('command.save')]]</paper-button>
            </div>
          </div>
        </div>
      </iron-pages>
    </nuxeo-card>

    <nuxeo-card heading="[[i18n('templateRenderingPage.parameters.heading')]]">
      <div class="vertical layout">
        <nuxeo-template-param-editor
          id="paramEditor"
          template-data="[[_getTemplateData(editedDocument)]]"
          mode="[[paramsMode]]"
          allow-create
          allow-delete
        ></nuxeo-template-param-editor>
      </div>
      <div class="buttons">
        <div class="horizontal layout start-justified">
          <iron-pages selected="[[paramsMode]]" attr-for-selected="name" class="vertical layout flex">
            <div name="view">
              <paper-button noink class="primary" on-tap="_editParams">[[i18n('command.edit')]]</paper-button>
            </div>
            <div name="edit">
              <paper-button noink dialog-dismiss on-tap="_cancelEditParams" class="secondary"
                >[[i18n('command.cancel')]]</paper-button
              >
              <paper-button noink class="primary" on-tap="_saveEditParams">[[i18n('command.save')]]</paper-button>
            </div>
          </iron-pages>
        </div>
      </div>
    </nuxeo-card>
  `,is:"nuxeo-template-rendering-page",behaviors:[l.mB,n.e],properties:{document:{type:Object,observer:"_documentChanged"},docTypes:Array,processors:{type:Array,value:["auto","Freemarker","XSLTProcessor","Identity","JXLSProcessor","XDocReportProcessor"]},outputFormats:{type:Array,value:["none","pdf","odt","doc","docx"]},editedDocument:Object,configMode:{type:String,value:"view"},paramsMode:{type:String,value:"view"}},_getProcessorLabel(e){return this.i18n(`templateRenderingPage.processor.${e}`)},_getOutputFormatLabel(e){return"none"===e?this.i18n(`templateRenderingPage.outputFormat.${e}`):e?e.toUpperCase():null},_documentChanged(){this.document&&(this.set("document.properties.tmpl:templateType",this.document.properties["tmpl:templateType"]||"auto"),this.set("editedDocument",JSON.parse(JSON.stringify(this.document))))},_handleDocTypes(e){const t=[{id:"all",text:this.i18n("templateRenderingPage.label.document.type.all"),displayLabel:this.i18n("templateRenderingPage.label.document.type.all")}];Object.keys(e.detail.response.doctypes).sort().forEach((e=>{t.push({id:e,text:e,displayLabel:e})})),this.set("docTypes",t)},_resetConfig(){this.set("editedDocument",JSON.parse(JSON.stringify(this.document)))},_save(){return delete this.editedDocument.properties["dc:contributors"],this.$.doc.put()},_editConfig(){this.configMode="edit"},_cancelEditConfig(){this.configMode="view",this._resetConfig()},_saveEditConfig(){return this._save().then((()=>{this.configMode="view"}))},_editParams(){this.paramsMode="edit"},_cancelEditParams(){this.paramsMode="view",this._resetConfig(),this.$.paramEditor.reset()},_saveEditParams(){return this.$.paramEditor.commitChanges(),this.set("editedDocument.properties.tmpl:templateData",this.$.paramEditor.generateTemplateData()),this._save().then((()=>{this.paramsMode="view"}))},_getTemplateData(){return this.editedDocument.properties["tmpl:templateData"]}});var c=a(45765),u=a.n(c);const h=document.createElement("template");h.innerHTML=u(),document.head.appendChild(h.content)},45765:e=>{e.exports=' <nuxeo-slot-content name="templateDeleteAction" slot="DOCUMENT_ACTIONS"> <template> <nuxeo-filter document="[[document]]" facet="Template"> <template> <nuxeo-delete-template-button document="[[document]]"></nuxeo-delete-template-button> </template> </nuxeo-filter> </template> </nuxeo-slot-content> <nuxeo-slot-content name="templateRenderAction" slot="DOCUMENT_ACTIONS"> <template> <nuxeo-render-template-button document="[[document]]" filter-op="javascript.FilterTemplatesByType" render-op="javascript.RenderPdf"></nuxeo-render-template-button> </template> </nuxeo-slot-content> <nuxeo-slot-content name="templateRenderingDocumentViewItems" slot="DOCUMENT_VIEWS_ITEMS" order="40"> <template> <nuxeo-filter document="[[document]]" facet="Template"> <template> <nuxeo-page-item name="configTemplate" label="templateRendering.documentView.item"></nuxeo-page-item> </template> </nuxeo-filter> </template> </nuxeo-slot-content> <nuxeo-slot-content name="templateRenderingDocumentViewPages" slot="DOCUMENT_VIEWS_PAGES"> <template> <nuxeo-filter document="[[document]]" facet="Template"> <template> <nuxeo-template-rendering-page name="configTemplate" document="[[document]]"></nuxeo-template-rendering-page> </template> </nuxeo-filter> </template> </nuxeo-slot-content> '}}]);