/*! For license information please see nuxeo-spreadsheet.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_nuxeo_nuxeo_web_ui=self.webpackChunk_nuxeo_nuxeo_web_ui||[]).push([[436],{56603:(e,o,t)=>{t.r(o);var a=t(21536),i=t(66538),s=t(41608),n=t(5453),l=t(30883);(0,a.k)({_template:i.d`
    <style include="nuxeo-action-button-styles">
      .dialog {
        width: 100%;
        height: 100%;
        padding: 0;
      }

      #iframe {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>

    <nuxeo-connection id="nxconn"></nuxeo-connection>

    <template is="dom-if" if="[[_isAvailable(nxProvider, columns)]]">
      <div class="action" on-click="_show">
        <paper-icon-button id="button" icon="nuxeo:spreadsheet" aria-labelledby="label"></paper-icon-button>
        <span class="label" hidden$="[[!showLabel]]" id="label">[[_label]]</span>
        <nuxeo-tooltip>[[_label]]</nuxeo-tooltip>
      </div>
    </template>

    <paper-dialog id="dialog" class="dialog" with-backdrop>
      <iframe id="iframe" frameborder="0" scrolling="auto" on-load="_onLoad"></iframe>
    </paper-dialog>
  `,is:"nuxeo-spreadsheet-button",behaviors:[n.N,s.mB,l.q],properties:{nxProvider:{type:HTMLElement,value:null},columns:{type:Array,value:[]},showLabel:{type:Boolean,value:!1},_label:{type:String,computed:"_computeLabel(i18n)"}},_isAvailable(){return null!==this.nxProvider&&this.columns&&this.columns.length},_show(){const e=this.nxProvider,o=[];Object.keys(e.sort).forEach((t=>{o.push({sortColumn:t,sortAscending:"asc"===e.sort[t]})}));const t=[];this.columns.forEach((e=>{e.field&&!e.hidden&&t.push({label:e.name?e.name:e.field,field:e.field})}));const a={baseURL:this.$.nxconn.url,pageProviderName:e.provider,pageSize:e.pageSize,currentPage:e.page,sortInfos:o,resultColumns:t,executed:!1};if(Array.isArray(e.params))a.queryParameters=e.params;else{const o={};e.params&&Object.keys(e.params).forEach((t=>{o[t]=e.params[t]})),e.aggregations&&Object.keys(e.aggregations).forEach((t=>{o[t]=e.aggregations[t].selection})),a.searchDocument={properties:o}}this.$.iframe.onload=()=>this.$.iframe.contentWindow.postMessage(a),this.$.iframe.src=`${this.baseUrl}spreadsheet.popup.html`,this.$.dialog.toggle()},_close(){this.$.dialog.toggle(),this.fire("document-updated")},_onLoad(){const e=(this.$.iframe.contentDocument||this.$.iframe.contentWindow.document).querySelector("#close");e&&e.addEventListener("click",this._close.bind(this))},_computeLabel(){return this.i18n("spreadsheetButton.tooltip")}})}}]);