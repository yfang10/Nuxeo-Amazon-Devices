/*! For license information please see nuxeo-imap-connector.bundle.js.LICENSE.txt */
(self.webpackChunk_nuxeo_nuxeo_web_ui=self.webpackChunk_nuxeo_nuxeo_web_ui||[]).push([[190],{77022:(e,t,n)=>{"use strict";n.r(t);var o=n(21536),i=n(66538),a=n(41608);n(83253);const c=i.d`
  <iron-iconset-svg size="24" name="nuxeo-mail">
    <svg>
      <defs>
        <g id="sync">
          <path
            d="M11.875 11.01l4.293-2.572a1.969 1.969 0 0 0-1.324-.518H8.906c-.511 0-.973.2-1.324.518l4.293 2.572z"
          ></path>
          <path
            d="M12.257 12.512a.744.744 0 0 1-.764 0l-4.554-2.73c-.002.039-.012.076-.012.116v3.954c0 1.092.887 1.978 1.98 1.978h5.937c1.092 0 1.979-.886 1.979-1.978V9.898c0-.04-.01-.077-.012-.117l-4.554 2.73z"
          ></path>
          <path
            d="M20.552 13.977c-.904 3.957-4.448 6.92-8.677 6.92-4.013 0-7.411-2.665-8.521-6.316L5.937 12H0v5.932l1.808-1.806c1.63 3.955 5.527 6.749 10.067 6.749 5.326 0 9.762-3.844 10.696-8.898h-2.02zM22.013 7.75C20.383 3.794 16.487 1 11.946 1 6.62 1 2.184 4.844 1.25 9.898h2.02c.903-3.957 4.447-6.92 8.676-6.92 4.013 0 7.411 2.665 8.522 6.317l-2.584 2.58h5.937V5.943L22.013 7.75z"
          ></path>
        </g>
      </defs>
    </svg>
  </iron-iconset-svg>
`;document.head.appendChild(c.content),(0,o.k)({_template:i.d`
    <nuxeo-operation-button
      operation="Mail.CheckInbox"
      input="[[document.uid]]"
      event="document-updated"
      notification="[[i18n('mailfolder.sync.success')]]"
      icon="nuxeo-mail:sync"
      label="[[i18n('mailfolder.sync')]]"
      on-tap="_showNotification"
    ></nuxeo-operation-button>

    <paper-toast id="toast" text="[[i18n('mailfolder.sync.checking')]]" duration="0"></paper-toast>
  `,is:"nuxeo-mail-sync-button",behaviors:[a.mB],properties:{document:Object},listeners:{"document-updated":"_closeNotification"},_showNotification(){this.$.toast.open()},_closeNotification(){this.$.toast.hide()}});var s=n(78911),l=n.n(s);const u=document.createElement("template");u.innerHTML=l(),document.head.appendChild(u.content),window.nuxeo.importBlacklist.push("MailFolder")},78911:e=>{e.exports=' <nuxeo-slot-content name="syncEmailAction" slot="DOCUMENT_ACTIONS"> <template> <nuxeo-filter document="[[document]]" type="MailFolder" permission="ReadWrite"> <template> <nuxeo-mail-sync-button document="[[document]]"></nuxeo-mail-sync-button> </template> </nuxeo-filter> </template> </nuxeo-slot-content> '}}]);