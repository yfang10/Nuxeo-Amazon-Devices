import{Polymer}from"@polymer/polymer/lib/legacy/polymer-fn.js";import{html}from"@polymer/polymer/lib/utils/html-tag.js";import{NotifyBehavior}from"@nuxeo/nuxeo-elements/nuxeo-notify-behavior.js";import{I18nBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-i18n-behavior.js";import"./nuxeo-template-param-editor.js";Polymer({_template:html`
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
  `,is:"nuxeo-render-template-button",behaviors:[NotifyBehavior,I18nBehavior],properties:{document:Object,filterOp:String,renderOp:String,showLabel:{type:Boolean,value:!1},label:{type:String,value:"renderTemplateButton.tooltip"},tooltip:{type:String,value:"renderTemplateButton.tooltip"},icon:{type:String,value:"icons:all-out"},iconSrc:String,skipRenderPopup:{type:Boolean,value:!1},_templates:{type:Array,value:[]},_templateData:String},_toggleDialog(){this.set("_templates",[]),this.set("selectedTemplate",""),this.$.getTemplatesOp.input=this.document,this.$.getTemplatesOp.execute().then((e=>{e.entries&&this.set("_templates",e.entries),0===this._templates.length?this._toast(this.i18n("renderTemplateButton.toast.noTemplates")):(this.set("selectedTemplate",this._templates[0]),this.skipRenderPopup&&1===this._templates.length?this._render():this.$.dialog.toggle())}))},_render(){if(this.set("_templateData",this.selectedTemplate.properties["tmpl:templateData"]),this.selectedTemplate.properties["tmpl:allowOverride"]&&this._templateData){if(this.document.properties["nxts:bindings"]){let e;for(let t=0;t<this.document.properties["nxts:bindings"].length;t++){const a=this.document.properties["nxts:bindings"][t];a.templateName===this.selectedTemplate.properties["tmpl:templateName"]&&(e=a)}e&&this.set("_templateData",e.templateData),this.$.paramEditor.reset()}this.$.editParamsDialog.toggle()}else this._renderOpWithParams();this.$.dialog.opened&&this.$.dialog.toggle()},_reset(){this.$.paramEditor.reset()},_override(){this.$.paramEditor.commitChanges(),this.set("_templateData",this.$.paramEditor.generateTemplateData()),this._renderOpWithParams(),this.$.editParamsDialog.toggle()},_renderOpWithParams(){return this.$.renderTemplateOp.input=this.document.uid,this.$.renderTemplateOp.params={templateName:this.selectedTemplate.properties["tmpl:templateName"],attach:!0,templateData:this._templateData},this._toast(this.i18n("renderTemplateButton.toast.rendering"),0),this.$.renderTemplateOp.execute().then((e=>this._download(e).then((()=>{this._toast(this.i18n("renderTemplateButton.toast.rendered",this.selectedTemplate.properties["dc:title"])),this.selectedTemplate.properties["tmpl:allowOverride"]&&this.fire("document-updated")})))).catch((e=>{this._toast(this.i18n("renderTemplateButton.toast.render.error",e.message))}))},_toast(e,t){this.notify({message:e,close:!0,duration:t})},_download(e){const t=e.headers.get("Content-Disposition");if(t){const a=t.match(/filename[^;=\n]*=([^;\n]*''([^;\n]*)|[^;\n]*)/).filter((e=>!!e)),i=decodeURI(a[a.length-1]);return e.blob().then((e=>{if(navigator.msSaveBlob)navigator.msSaveBlob(e,i);else{const t=document.createElement("a");t.style="display: none",t.download=i,t.href=URL.createObjectURL(e),document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(t.href)}}))}return Promise.reject(new Error("missing Content-Disposition header"))}});