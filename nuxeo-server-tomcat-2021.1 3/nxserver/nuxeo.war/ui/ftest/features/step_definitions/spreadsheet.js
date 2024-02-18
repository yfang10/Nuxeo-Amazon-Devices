import{Then,When}from"@cucumber/cucumber";import Spreadsheet from"../../pages/spreadsheet";When("I open the spreadsheet",(function(){const e=this.ui.results.actions.element("nuxeo-spreadsheet-button").click();e.waitForVisible("#dialog");const t=e.element("#iframe");driver.frame(t.value),this.spreadsheet=new Spreadsheet})),When("I see the spreadsheet dialog",(function(){this.ui.browser.results.actions.element("nuxeo-spreadsheet-button").waitForVisible("#dialog")})),Then("I can see the spreadsheet results actions button",(function(){const{results:e}=this.ui;"table"!==e.displayMode&&e.toggleTableView.click(),e.actions.waitForVisible("nuxeo-spreadsheet-button")})),Then("I can see the {string} spreadsheet column",(function(e){return assert(this.spreadsheet,"Spreadsheet editor does not exist"),this.spreadsheet.headers.includes(e)})),When("I set the spreadsheet cell {int},{int} to {string}",(function(e,t,s){const{spreadsheet:n}=this;assert(n,"Spreadsheet does not exist"),n.setData(e,t,s)})),When("I save the spreadsheet",(function(){const{spreadsheet:e}=this;assert(e,"Spreadsheet does not exist"),e.save();const{console:t}=e;driver.waitUntil((()=>"1 rows saved"===t.getText()))})),When("I close the spreadsheet",(function(){const{spreadsheet:e}=this;assert(e,"Spreadsheet does not exist"),e.close(),driver.frame()})),Then("I see {string} in the results table cell {int},{int}",(function(e,t,s){const{results:n}=this.ui;n.waitForVisible();const i=n.el.elements("nuxeo-data-table-row:not([header])").value[t].elements("nuxeo-data-table-cell").value[s];expect(i.getText()).to.equal(e)}));