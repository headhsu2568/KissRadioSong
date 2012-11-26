req = null;
function getCurrentSong() {
    req = new XMLHttpRequest();
    req.onreadystatechange = afterStateChange;
    req.open('GET', 'http://www.kiss.com.tw/service/songlist/', true);
    req.setRequestHeader('Cache-Control', 'no-cache');
    req.setRequestHeader('Pragma', 'no-cache');
    req.send();
}

function afterStateChange() {
    if(req.readyState == 4 && req.status == 200) {
        var match = /<span\s+class="playing_info"\s*>(.*?)<\s*\/\s*span>/.exec(req.responseText);
        var str = match[1].replace(/<.*?>/g, '');
        if(str.replace(/\s/g, '') === '') {
            str = '目前暫無播放資訊';
        }
        else {
            str = str.replace(/：/, '：<br/><b>');
            str = str+'</b>';
        }
        var iconStr = '<a href="http://www.kiss.com.tw/service/songlist/?tp=KISS" target="_blank"><img title="Kiss Radio" alt="Kiss Radio" src="icons/KissRadio19.jpg" /></a>';
        var loadBar = document.getElementById('loadbar');
        loadBar.style.display = 'none';
        var song = document.getElementById('song');
        song.innerHTML = iconStr+str;
    }
}

window.addEventListener('load', getCurrentSong);
