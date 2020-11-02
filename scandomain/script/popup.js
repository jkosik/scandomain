//popup.js

var options = {
    type: "basic",
    title: "ScanDomain",
    message: "New browser tabs are opened based on selected options.",
    iconUrl: "img/icon.png"
  
};

function creationCallback() {
  console.log("Notification triggered");
}

document.addEventListener('DOMContentLoaded', function() {
  //load checkbox states as stored in local storage
  chrome.storage.sync.get('check1', function (data){
    document.getElementById('check1').checked = data.check1;
  });
  chrome.storage.sync.get('check2', function (data){
    document.getElementById('check2').checked = data.check2;
  });
  chrome.storage.sync.get('check3', function (data){
    document.getElementById('check3').checked = data.check3;
  });

  //on button click store checkbox states to local storage
  document.getElementById("launch").onclick = function () {
    var value1 = document.getElementById('check1').checked;
    var value2 = document.getElementById('check2').checked;
    var value3 = document.getElementById('check3').checked;
    chrome.storage.sync.set({'check1': value1});
    chrome.storage.sync.set({'check2': value2});
    chrome.storage.sync.set({'check3': value3});

    //trigger Chrome notification
    chrome.notifications.create(options, creationCallback);

    //detect domain and open new tabs
    chrome.tabs.query({active: true, lastFocusedWindow: true, currentWindow: true}, function (tabs) {
      var tab = tabs[0];
      var url = new URL(tab.url);
      var domain = url.hostname;
      target1 = "https://www.ssllabs.com/ssltest/analyze.html?viaform=on&d=" + domain
      target2 = "https://mxtoolbox.com/SuperTool.aspx?action=mx%3a" + domain + "&run=toolpage"
      target3 = "https://www.shodan.io/search?query=" + domain
      if (document.getElementById('check1').checked) {
        chrome.tabs.create({"url": target1}); 
      }
      if (document.getElementById('check2').checked) {
        chrome.tabs.create({"url": target2}); 
      }
      if (document.getElementById('check3').checked) {
        chrome.tabs.create({"url": target3}); 
      }
    });

  };
});

