import{Polymer}from"@polymer/polymer/lib/legacy/polymer-fn.js";import{html}from"@polymer/polymer/lib/utils/html-tag.js";import{I18nBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-i18n-behavior.js";import{RoutingBehavior}from"@nuxeo/nuxeo-ui-elements/nuxeo-routing-behavior.js";import"./nuxeo-template-param-editor.js";Polymer({_template:html`
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
  `,is:"nuxeo-delete-template-button",behaviors:[I18nBehavior,RoutingBehavior],properties:{document:Object,showLabel:{type:Boolean,value:!1}},_toggleDialog(){this.$.dialog.toggle()},_delete(){this.$.deleteTemplatesOp.input=this.document.uid,this.$.deleteTemplatesOp.execute().then(this.$.template.remove.bind(this.$.template)).then((()=>{window.location=this.urlFor("document",this.document.parentRef)}))}});