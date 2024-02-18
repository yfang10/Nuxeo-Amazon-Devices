import{Polymer}from"@polymer/polymer/lib/legacy/polymer-fn.js";import{html}from"@polymer/polymer/lib/utils/html-tag.js";import{I18nBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-i18n-behavior.js";import{FormatBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-format-behavior.js";import"./nuxeo-template-param-editor.js";Polymer({_template:html`
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
  `,is:"nuxeo-template-rendering-page",behaviors:[I18nBehavior,FormatBehavior],properties:{document:{type:Object,observer:"_documentChanged"},docTypes:Array,processors:{type:Array,value:["auto","Freemarker","XSLTProcessor","Identity","JXLSProcessor","XDocReportProcessor"]},outputFormats:{type:Array,value:["none","pdf","odt","doc","docx"]},editedDocument:Object,configMode:{type:String,value:"view"},paramsMode:{type:String,value:"view"}},_getProcessorLabel(e){return this.i18n(`templateRenderingPage.processor.${e}`)},_getOutputFormatLabel(e){return"none"===e?this.i18n(`templateRenderingPage.outputFormat.${e}`):e?e.toUpperCase():null},_documentChanged(){this.document&&(this.set("document.properties.tmpl:templateType",this.document.properties["tmpl:templateType"]||"auto"),this.set("editedDocument",JSON.parse(JSON.stringify(this.document))))},_handleDocTypes(e){const t=[{id:"all",text:this.i18n("templateRenderingPage.label.document.type.all"),displayLabel:this.i18n("templateRenderingPage.label.document.type.all")}];Object.keys(e.detail.response.doctypes).sort().forEach((e=>{t.push({id:e,text:e,displayLabel:e})})),this.set("docTypes",t)},_resetConfig(){this.set("editedDocument",JSON.parse(JSON.stringify(this.document)))},_save(){return delete this.editedDocument.properties["dc:contributors"],this.$.doc.put()},_editConfig(){this.configMode="edit"},_cancelEditConfig(){this.configMode="view",this._resetConfig()},_saveEditConfig(){return this._save().then((()=>{this.configMode="view"}))},_editParams(){this.paramsMode="edit"},_cancelEditParams(){this.paramsMode="view",this._resetConfig(),this.$.paramEditor.reset()},_saveEditParams(){return this.$.paramEditor.commitChanges(),this.set("editedDocument.properties.tmpl:templateData",this.$.paramEditor.generateTemplateData()),this._save().then((()=>{this.paramsMode="view"}))},_getTemplateData(){return this.editedDocument.properties["tmpl:templateData"]}});