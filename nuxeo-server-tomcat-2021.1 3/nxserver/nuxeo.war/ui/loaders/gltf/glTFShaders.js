let glTFShaders=function(){var e=[];return{add:function(r){e.push(r)},remove:function(r){var t=e.indexOf(r);-1!==t&&e.splice(t,1)},removeAll:function(r){e=[]},bindShaderParameters:function(r){for(var t=0;t<e.length;t++)e[t].bindParameters(r)},update:function(r,t){for(var i=0;i<e.length;i++)e[i].update(r,t)}}}(),glTFShader=function(e,r,t,i){this.material=e,this.parameters=r.technique.parameters,this.uniforms=r.technique.uniforms,this.joints=r.joints,this.object=t,this.semantics={},this.m4=new THREE.Matrix4};glTFShader.prototype.bindParameters=function(e){function r(e,r){e.glTFID==a.node&&(r.sourceObject=e)}for(var t in this.uniforms){var i=this.uniforms[t],a=this.parameters[i];if(a.semantic){var n={semantic:a.semantic,uniform:this.material.uniforms[t]};a.node?e.traverse((function(e){r(e,n)})):n.sourceObject=this.object,this.semantics[i]=n}}},glTFShader.prototype.update=function(e,r){for(var t in e.updateMatrixWorld(),r.updateMatrixWorld(),r.matrixWorldInverse.copy(r.matrixWorld).invert(),this.semantics){var i=this.semantics[t];if(i)switch(i.semantic){case"MODELVIEW":i.uniform.value.multiplyMatrices(r.matrixWorldInverse,i.sourceObject.matrixWorld);break;case"MODELVIEWINVERSETRANSPOSE":var a=i.uniform.value;this.m4.multiplyMatrices(r.matrixWorldInverse,i.sourceObject.matrixWorld),a.getNormalMatrix(this.m4);break;case"PROJECTION":i.uniform.value.copy(r.projectionMatrix);break;case"JOINTMATRIX":for(var n=i.uniform.value,s=0;s<n.length;s++)n[s].getInverse(i.sourceObject.matrixWorld).multiply(this.joints[s].matrixWorld).multiply(this.object.skeleton.boneInverses[s]);break;default:throw new Error("Unhandled shader semantic"+i)}}};export{glTFShader,glTFShaders};