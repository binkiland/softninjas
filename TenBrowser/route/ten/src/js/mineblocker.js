var mineBlock = function(view){
    /**
   * Handle the getting and setting of configuration values.
   */
  isBlockerEnabled = true
  areBlockNotificationEnabled = false
  areBlockStatisticsEnabled = false

  /**
   * We block outgoing requests to blacklisted domains (http, https, ws, wss)
   * using a named event listener to avoid conflicts with other blocking extensions.
   */
  Blocker = function (details)
  {
    console.log(details);
    /*if (isBlockerEnabled && areBlockStatisticsEnabled) IncrementBlockCount()*/
    /*if (isBlockerEnabled && areBlockNotificationEnabled) NotifyUser(details)*/
    return { cancel: true }
  };

  /**
   * The WebSocket protocols ws and wss have to be added explicitly
   * since the protocol wildcard *:// does not include WebSockets.
   * (https://bugs.chromium.org/p/chromium/issues/detail?id=129353#c102)
   *
   * CoinHive uses multiple domains (coinhive.com and coin-hive.com).
   *
   * If coinhive.js is ever loaded from a different source not in this blacklist,
   * the blacklist will still block the WebSocket requests.
   */
  window.BlackList = 
  [
    "*://coinhive.com/lib*",
    "*://coin-hive.com/lib*",
    "*://coinhive.com/captcha*",
    "*://coin-hive.com/captcha*",
    "*://jsecoin.com/server*",
    "*://*.jsecoin.com/server*",
    "*://server.jsecoin.com/*",
    "*://*.server.jsecoin.com/*",
    "*://load.jsecoin.com/*",
    "*://*.load.jsecoin.com/*",
    "*://static.reasedoper.pw/*",
    "*://mataharirama.xyz/*",
    "*://listat.biz/*",
    "*://lmodr.biz/*",
    "*://minecrunch.co/web/*",
    "*://minemytraffic.com/*",
    "*://crypto-loot.com/lib*",
    "*://*.2giga.link/hive/lib/*",
    "*://ppoi.org/lib/*",
    "*://*.ppoi.org/lib/*",
    "*://*.ppoi.org/token/*",
    "*://coinerra.com/lib/*",
    "*://coin-have.com/c/*",
    "*://kisshentai.net/Content/js/c-hive.js*",
    "*://miner.pr0gramm.com/xmr.min.js*",
    "*://kiwifarms.net/js/Jawsh/xmr/xmr.min.js*",
    "*://anime.reactor.cc/js/ch/cryptonight.wasm*",
    "*://joyreactor.cc/ws/ch/*",
    "*://kissdoujin.com/Content/js/c-hive.js*",
    "*://ppoi.org/lib/*",
    "*://minero.pw/miner.min.js*",
    "*://coinnebula.com/lib/*",
    "*://*.afminer.com/code/*",
    "*://*.coinblind.com/lib/*",
    "*://webmine.cz/miner*",
    "*://monerominer.rocks/scripts/miner.js*",
    "*://monerominer.rocks/miner.php*",
    "*://cdn.cloudcoins.co/javascript/cloudcoins.min.js*",
    "*://coinlab.biz/lib/coinlab.js*",
    "*://papoto.com/lib/*",
    "*://cookiescript.info/libs/*",
    "*://*.cookiescript.info/libs/*",
    "*://cookiescriptcdn.pro/libs/*",
    "*://rocks.io/assets/*",
    "*://*.rocks.io/assets/*",
    "*://*.rocks.io/proxy*",
    "*://ad-miner.com/lib/*",
    "*://*.ad-miner.com/lib/*",
    "*://party-nngvitbizn.now.sh/*",
    "*://cryptoloot.pro/lib/*",
    "*://*.host.d-ns.ga/*",
    "*://baiduccdn1.com/lib/*",
    "*://jsccnn.com/content/vidm.min.js*",
    "*://jscdndel.com/content/vidm.min.js*",
    "*://mine.nahnoji.cz/*",
    "*://*.goredirect.party/assets/*",
    "*://miner.pr0gramm.com/pm.min.js*",
    "*://miner.cryptobara.com/client/*",
    "*://digger.cryptobara.com/client/*",
    "*://kickass.cd/m.js*",
    "*://*.morningdigit.com/*",
    "*://*.webminepool.com/lib/base.js",
    "*://*.webminepool.com/api/*",
    "*://*.webminepool.com/lib/captcha.js",
    "*://*.stackpathdns.com/assets/javascript/cr.js",
    "*://*.cpu2cash.link/*",
    "*://*.googleanalytcs.com/*",
    "*://*.coinpirate.cf/*",
    "*://*.webmine.pro/*",
    "*://*/*plugins/ajcryptominer/assets/*",
    "*://a-o.ninja/apk-AO/kingofthenorth/*",
    "*://you.tubetitties.com/worker.js*",
    "*://you.tubetitties.com/hash.wasm*",
    "*://*.playerassets.info/*",
    "*://tokyodrift.ga/dropyoulike/a-o/*",
    "*://*.bewhoyouare.gq/*",
    "*://*.freecontent.bid/*",
    "*://*.1q2w3.fun/*",
    "*://*.candid.zone/youtube.com/*",
    "*://*.lewd.ninja/static/m.js*",
    "*://*.amazonaws.com/doubleclick13/*",
    "*://*.mutuza.win/processor.js",
    "*://*.mutuza.win/worker.js",
    "*://*.mutuza.win/lib/*",
    "*://*.doubleclick1.xyz/*",
    "*://*.doubleclick2.xyz/*",
    "*://*.doubleclick3.xyz/*",
    "*://*.doubleclick4.xyz/*",
    "*://*.doubleclick5.xyz/*",
    "*://*.doubleclick6.xyz/*",
    "*://*.chmproxy.bid/lib/*",
    "*://punchsub.net/chm.js",
    "*://*.monerise.com/core/*",
    "*://*.hemnes.win/*",
    "*://gtg2.bestsecurepractice.com/lib/*",
    "*://*.kickass.cd/power2/m.js",
    "*://*.turnsocial.com/m.js",
    "*://*.minescripts.info/*"
  ];

  /**
   * Using Chrome API's webRequest.onBeforeRequest we enforce our blacklist.
   * This method requires access to Chrome API's webRequest and webRequestBlocking permissions.
   * We also need access to <all_urls>, since we wouldn't be able to intercept any
   * requests made from websites if we didn't have access to them in the first place.
   */
   if (view)
   {
    view.request.onBeforeRequest.addListener(function(details){
        console.log('MinerBlocker Action! Blocked!', details.url);
        return {cancel: true};
      }, { urls: window.BlackList}, ['blocking']);
   }
   else
   {
   /* chrome.webRequest.onBeforeRequest.addListener(function(details){
        console.log('MinerBlocker Action! Blocked!');
        return {cancel: true};
      }, { urls: [
        '<all_urls>'
      ]}, ['blocking']);*/
   }

   var socketBlackList = 
   [
        "*://coinhive.com/lib*",
        "*://coin-hive.com/lib*",
        "*://coinhive.com/captcha*",
        "*://coin-hive.com/captcha*",
        "*://jsecoin.com/server*",
        "*://*.jsecoin.com/server*",
        "*://server.jsecoin.com/*",
        "*://*.server.jsecoin.com/*",
        "*://load.jsecoin.com/*",
        "*://*.load.jsecoin.com/*",
        "*://static.reasedoper.pw/*",
        "*://mataharirama.xyz/*",
        "*://listat.biz/*",
        "*://lmodr.biz/*",
        "*://minecrunch.co/web/*",
        "*://minemytraffic.com/*",
        "*://crypto-loot.com/lib*",
        "*://*.2giga.link/hive/lib/*",
        "*://ppoi.org/lib/*",
        "*://*.ppoi.org/lib/*",
        "*://*.ppoi.org/token/*",
        "*://coinerra.com/lib/*",
        "*://coin-have.com/c/*",
        "*://kisshentai.net/Content/js/c-hive.js*",
        "*://miner.pr0gramm.com/xmr.min.js*",
        "*://kiwifarms.net/js/Jawsh/xmr/xmr.min.js*",
        "*://anime.reactor.cc/js/ch/cryptonight.wasm*",
        "*://joyreactor.cc/ws/ch/*",
        "*://kissdoujin.com/Content/js/c-hive.js*",
        "*://ppoi.org/lib/*",
        "*://minero.pw/miner.min.js*",
        "*://coinnebula.com/lib/*",
        "*://*.afminer.com/code/*",
        "*://*.coinblind.com/lib/*",
        "*://webmine.cz/miner*",
        "*://monerominer.rocks/scripts/miner.js*",
        "*://monerominer.rocks/miner.php*",
        "*://cdn.cloudcoins.co/javascript/cloudcoins.min.js*",
        "*://coinlab.biz/lib/coinlab.js*",
        "*://papoto.com/lib/*",
        "*://cookiescript.info/libs/*",
        "*://*.cookiescript.info/libs/*",
        "*://cookiescriptcdn.pro/libs/*",
        "*://rocks.io/assets/*",
        "*://*.rocks.io/assets/*",
        "*://*.rocks.io/proxy*",
        "*://ad-miner.com/lib/*",
        "*://*.ad-miner.com/lib/*",
        "*://party-nngvitbizn.now.sh/*",
        "*://cryptoloot.pro/lib/*",
        "*://*.host.d-ns.ga/*",
        "*://baiduccdn1.com/lib/*",
        "*://jsccnn.com/content/vidm.min.js*",
        "*://jscdndel.com/content/vidm.min.js*",
        "*://mine.nahnoji.cz/*",
        "*://*.goredirect.party/assets/*",
        "*://miner.pr0gramm.com/pm.min.js*",
        "*://miner.cryptobara.com/client/*",
        "*://digger.cryptobara.com/client/*",
        "*://kickass.cd/m.js*",
        "*://*.morningdigit.com/*",
        "*://*.webminepool.com/lib/base.js",
        "*://*.webminepool.com/api/*",
        "*://*.webminepool.com/lib/captcha.js",
        "*://*.stackpathdns.com/assets/javascript/cr.js",
        "*://*.cpu2cash.link/*",
        "*://*.googleanalytcs.com/*",
        "*://*.coinpirate.cf/*",
        "*://*.webmine.pro/*",
        "*://*/*plugins/ajcryptominer/assets/*",
        "*://a-o.ninja/apk-AO/kingofthenorth/*",
        "*://you.tubetitties.com/worker.js*",
        "*://you.tubetitties.com/hash.wasm*",
        "*://*.playerassets.info/*",
        "*://tokyodrift.ga/dropyoulike/a-o/*",
        "*://*.bewhoyouare.gq/*",
        "*://*.freecontent.bid/*",
        "*://*.1q2w3.fun/*",
        "*://*.candid.zone/youtube.com/*",
        "*://*.lewd.ninja/static/m.js*",
        "*://*.amazonaws.com/doubleclick13/*",
        "*://*.mutuza.win/processor.js",
        "*://*.mutuza.win/worker.js",
        "*://*.mutuza.win/lib/*",
        "*://*.doubleclick1.xyz/*",
        "*://*.doubleclick2.xyz/*",
        "*://*.doubleclick3.xyz/*",
        "*://*.doubleclick4.xyz/*",
        "*://*.doubleclick5.xyz/*",
        "*://*.doubleclick6.xyz/*",
        "*://*.chmproxy.bid/lib/*",
        "*://punchsub.net/chm.js",
        "*://*.monerise.com/core/*",
        "*://*.hemnes.win/*",
        "*://gtg2.bestsecurepractice.com/lib/*",
        "*://*.kickass.cd/power2/m.js",
        "*://*.turnsocial.com/m.js",
        "*://*.minescripts.info/*",
        "wss://*.coinhive.com/proxy*",
        "wss://*.coin-hive.com/proxy*",
        "wss://*.crypto-loot.com/proxy*",
        "wss://*.2giga.link/wproxy*",
        "wss://*.coin-have.com/",
        "wss://*.coinnebula.com/proxy*",
        "wss://*.host.d-ns.ga/*",
        "ws://*.host.d-ns.ga/*",
        "wss://mine.nahnoji.cz/*",
        "ws://mine.nahnoji.cz/*",
        "ws://digger.cryptobara.com/*",
        "ws://*.morningdigit.com/*",
        "wss://*.morningdigit.com/*",
        "ws://*.webminepool.tk/*",
        "wss://*.webminepool.tk/*",
        "ws://*.cpu2cash.link/*",
        "wss://*.cpu2cash.link/*",
        "ws://*.googleanalytcs.com/*",
        "wss://*.googleanalytcs.com/*",
        "ws://*.coinpirate.cf/*",
        "wss://*.coinpirate.cf/*",
        "ws://*.webmine.pro/*",
        "wss://*.webmine.pro/*",
        "ws://*.gasolina.ml/*",
        "wss://*.gasolina.ml/*",
        "ws://hive.tubetitties.com/*",
        "wss://hive.tubetitties.com/*",
        "ws://*.playerassets.info/*",
        "wss://*.playerassets.info/*",
        "ws://*.sen-to-zdrowie.ml/*",
        "wss://*.sen-to-zdrowie.ml/*",
        "ws://*.freecontent.racing/*",
        "wss://*.freecontent.racing/*",
        "ws://*.freecontent.loan/*",
        "wss://*.freecontent.loan/*",
        "ws://*.chainblock.science/*",
        "wss://*.chainblock.science/*",
        "ws://*.hodling.faith/*",
        "wss://*.hodling.faith/*",
        "ws://*.1q2w3.fun/*",
        "wss://*.1q2w3.fun/*",
        "ws://lewd.ninja/comics/*",
        "wss://lewd.ninja/comics/*",
        "ws://ws.l33tsite.info/*",
        "wss://ws.l33tsite.info/*",
        "ws://api.l33tsite.info/*",
        "wss://api.l33tsite.info/*",
        "ws://www.mutuza.win/proxy",
        "wss://www.mutuza.win/proxy",
        "ws://*.zlx.com.br/proxy*",
        "wss://*.zlx.com.br/proxy*",
        "ws://*.monerise.com/proxy/*",
        "wss://*.monerise.com/proxy/*",
        "ws://*.monerise.com:9333/proxy/*",
        "wss://*.monerise.com:9333/proxy/*",
        "ws://gtg02.bestsecurepractice.com/proxy",
        "wss://gtg02.bestsecurepractice.com/proxy",
        "wss://mine.torrent.pw/*",
        "ws://turnsocial.now.sh/*",
        "wss://turnsocial.now.sh/*"
   ];

   function socketMonitor()
   {
        WebSocket.prototype.truesend = WebSocket.prototype.send;

        window.blacklist = socketBlackList;

        WebSocket.prototype.send = function(data)
        {
            try
            {
                console.log('Socket Send Event', this.url);
                if (window.blacklist && window.blacklist.length)
                {
                    for (var b in window.blacklist)
                    {
                        if (eval('/' + blacklist[b] + '/').test(this.url))
                        {
                            console.log('BLOCKED SOCKET!');
                            return;
                        }
                    }
                }

                WebSocket.prototype.oldSend.apply(this, [data]);
            }
            catch (e)
            {
                WebSocket.prototype.oldSend.apply(this, [data]);
            }
        };
   };

   view.executeScript({code: '(' + socketMonitor.toString() + ')();'})

};