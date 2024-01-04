// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


function addClassToBody() {
  document.body.classList.add("modal-injected");
}

// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
  if(tab.url.includes(".public.lu") || tab.url.includes(".gouvernement.lu") || tab.url.includes(".etat.lu")) {
	const p1 = chrome.scripting.executeScript({
		//files: ['https://nicolasambroise.github.io/a11y/script.js?t='+Math.floor(Math.random() * (Math.floor(10000) - Math.ceil(1000)) + Math.ceil(1000))],
		files: ['a11y/js-modal.js'],
		target: { tabId: tab.id }
	});
	const p2 = chrome.scripting.insertCSS({
		files: ['a11y/js-modal.css'],
		target: { tabId: tab.id }
	});
	const p3 = chrome.scripting.executeScript({
		target : {tabId : tab.id},
		func : addClassToBody
	});
	const p4 = chrome.action.setBadgeText({
      tabId: tab.id,
      text: 'ON'
    });
	const p5 = chrome.scripting.executeScript({
		files: ['a11y/script.js'],
		target: { tabId: tab.id }
	});
	
	await Promise.all([p1, p2, p3]).then(p4).then(() => console.log("script & style injected"));

   }
});