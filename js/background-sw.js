// Service worker for MV3: migrate background.js logic here
const RULE_ID = 1;
const UA_PC = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 YaBrowser/18.4.1.488.00 Safari/537.36';

const defaultOptions = {
  enablePc: true,
  optimize: true,
  noVideo: true,
  noAdv: true
};

async function addModifyUaRule(){
  const rule = {
    id: RULE_ID,
    priority: 1,
    action: {
      type: 'modifyHeaders',
      requestHeaders: [
        {operation: 'set', header: 'User-Agent', value: UA_PC}
      ]
    },
    condition: {
      // match requests to zhihu domains
      requestDomains: ['www.zhihu.com', 'zhuanlan.zhihu.com'],
      resourceTypes: ['main_frame','sub_frame','xmlhttprequest','other']
    }
  };

  try{
    // remove existing rule with same id first (no-op if not present), then add
    await chrome.declarativeNetRequest.updateDynamicRules({addRules: [rule], removeRuleIds: [RULE_ID]});
    console.log('declarative rule added/updated');
  }catch(e){
    console.error('failed to add declarative rule', e);
  }
}

async function removeModifyUaRule(){
  try{
    await chrome.declarativeNetRequest.updateDynamicRules({addRules: [], removeRuleIds: [RULE_ID]});
    console.log('declarative rule removed');
  }catch(e){
    console.error('failed to remove declarative rule', e);
  }
}

function applyEnablePc(enable){
  if(enable){
    addModifyUaRule();
  }else{
    removeModifyUaRule();
  }
}

// ensure defaults exist in storage on install
chrome.runtime.onInstalled.addListener(async () => {
  try{
    const keys = Object.keys(defaultOptions);
    chrome.storage.local.get(keys, function(data){
      const toSet = {};
      for(const k of keys){
        if(data[k] === undefined) toSet[k] = defaultOptions[k];
      }
      if(Object.keys(toSet).length>0) chrome.storage.local.set(toSet);
    });

    // apply default behavior
    chrome.storage.local.get('enablePc', function(data){
      const en = (data.enablePc !== undefined) ? data.enablePc : defaultOptions.enablePc;
      applyEnablePc(en);
    });
  }catch(e){
    console.error(e);
  }
});

// react to storage changes
chrome.storage.onChanged.addListener(function(changes){
  if(changes.enablePc !== undefined){
    applyEnablePc(changes.enablePc.newValue);
  }
});

// initialize at startup (service worker may be restarted)
chrome.storage.local.get('enablePc', function(data){
  const en = (data.enablePc !== undefined) ? data.enablePc : defaultOptions.enablePc;
  applyEnablePc(en);
});

// receive messages from content scripts
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  if(message && message.zhihuInjected === true && sender && sender.tab){
    // show the extension action icon for this tab
    try{
      chrome.action.show(sender.tab.id);
    }catch(e){
      console.warn('chrome.action.show failed', e);
    }
  }
  // keep message channel open if async (none here)
  return false;
});
