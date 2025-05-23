!(function (e) {
  var t = {};
  function r(n) {
    if (t[n]) return t[n].exports;
    var o = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
  }
  (r.m = e),
    (r.c = t),
    (r.d = function (e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (r.r = function (e) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (r.t = function (e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && "object" === typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (r.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var o in e)
          r.d(
            n,
            o,
            function (t) {
              return e[t];
            }.bind(null, o)
          );
      return n;
    }),
    (r.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return r.d(t, "a", t), t;
    }),
    (r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = ""),
    r((r.s = 2));
})([
  function (e, t) {
    (e.exports = function (e) {
      return e && e.__esModule ? e : { default: e };
    }),
      (e.exports.__esModule = !0),
      (e.exports.default = e.exports);
  },
  function (e, t) {
    function r(t) {
      return (
        (e.exports = r =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        (e.exports.__esModule = !0),
        (e.exports.default = e.exports),
        r(t)
      );
    }
    (e.exports = r),
      (e.exports.__esModule = !0),
      (e.exports.default = e.exports);
  },
  function (e, t, r) {
    "use strict";
    var n = r(0)(r(3)),
      o = null;
    addEventListener(
      "message",
      function (e) {
        var t,
          r = e.data;
        switch (r.type) {
          case "sdpInfo":
            !(function (e) {
              for (var t = 0; t < e.length; t++)
                "sendonly" === e[t].TalkTransType &&
                  (o = new n.default(e[t].RtpInterlevedID));
            })(r.data.sdpInfo);
            break;
          case "getRtpData":
            var i = o.getRTPPacket(r.data);
            (t = i), postMessage({ type: "rtpData", data: t }, [t.buffer]);
            break;
          case "sampleRate":
            null !== o && o.setSampleRate(r.data);
        }
      },
      !1
    );
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
    var o = n(r(4));
    t.default = function (e) {
      var t = null,
        r = null,
        n = [36, e, 0, 0, 0, 0],
        i = [68, 72, 65, 86],
        a = [100, 104, 97, 118],
        u = 245,
        s = 0,
        f = null;
      function l(e, t, r) {
        var n = [],
          o = t || 4;
        if (!0 === r)
          for (var i = 0; i < o; i++) n[i] = (e >>> (8 * (o - 1 - i))) & 255;
        else for (var a = 0; a < o; a++) n[a] = (e >>> (8 * a)) & 255;
        return n;
      }
      function p() {
        r = new o.default();
      }
      return (
        (p.prototype = {
          setSampleRate: function (e) {
            r.setSampleRate(e);
          },
          getRTPPacket: function (o) {
            var p = r.encode(o),
              c = 0;
            (t = new Uint8Array(n.length + 40 + p.length + 8)).set([36, e], c),
              (c += 2),
              t.set(l(40 + p.length + 8, 4, !0), c),
              (c += 4),
              t.set(i, c),
              (c += 4),
              t.set([240], c),
              (c += 1),
              t.set([0], c),
              (c += 1),
              t.set([1], c),
              (c += 1),
              t.set([0], c),
              (c += 1),
              u > 65535 && (u = 240),
              t.set(l(u), c),
              (c += 4),
              u++;
            var h = l(40 + p.length + 8);
            t.set(h, c), (c += 4);
            var d = new Date(),
              g =
                ((d.getFullYear() - 2e3) << 26) +
                ((d.getMonth() + 1) << 22) +
                (d.getDate() << 17) +
                (d.getHours() << 12) +
                (d.getMinutes() << 6) +
                d.getSeconds(),
              v = d.getTime(),
              m = null === f ? 0 : v - f;
            (f = v),
              (s += m) > 65535 && (s = 65535 - s),
              t.set(l(g), c),
              (c += 4),
              t.set(l(s, 2), c),
              (c += 2),
              t.set([16], c),
              (c += 1);
            var E = (function (e, t) {
              for (var r = 0, n = t; n < e.length; n++) r += e[n];
              return r;
            })(t, 6);
            t.set([E], c),
              (c += 1),
              t.set([131, 1, 14, 2], c),
              (c += 4),
              t.set([150, 1, 0, 0], c),
              (c += 4);
            var y = (function (e, t) {
              for (var r = 0, n = 0; n < t; n++) r += e[n] << ((n % 4) * 8);
              return r;
            })(p, p.length);
            return (
              t.set([136], c),
              (c += 1),
              t.set(l(y), c),
              (c += 4),
              t.set([0, 0, 0], c),
              (c += 3),
              t.set(p, c),
              (c += p.length),
              t.set(a, c),
              (c += 4),
              t.set(h, c),
              t
            );
          },
        }),
        new p(e)
      );
    };
  },
  function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
    var n = r(5);
    t.default = function () {
      var e = 48e3,
        t = 4,
        r = 15,
        o = [255, 511, 1023, 2047, 4095, 8191, 16383, 32767],
        i = 8e3,
        a = null;
      function u(e) {
        var n, i, a;
        return (
          e >= 0 ? (n = 213) : ((n = 85), (e = -e - 8)),
          (i = (function (e, t) {
            for (var r = 0, n = t.length; r < n; r++) if (e <= t[r]) return r;
            return t.length;
          })(e, o)) >= 8
            ? 127 ^ n
            : ((a = i << t),
              (a |= i < 2 ? (e >> 4) & r : (e >> (i + 3)) & r) ^ n)
        );
      }
      function s() {}
      return (
        (s.prototype = {
          setSampleRate: function (t) {
            e = t;
          },
          encode: function (t) {
            var r = null;
            null !== a
              ? ((r = new Float32Array(t.length + a.length)).set(a, 0),
                r.set(t, a.length))
              : (r = t),
              (r = (function (t, r) {
                if (r === e) return t;
                r > e &&
                  n.debug.log(
                    "The rate of device show be smaller than local sample rate"
                  );
                for (
                  var o = e / r,
                    i = Math.floor(t.length / o),
                    u = new Float32Array(i),
                    s = 0,
                    f = 0;
                  s < u.length;

                ) {
                  for (
                    var l = Math.round((s + 1) * o),
                      p = 0,
                      c = 0,
                      h = f,
                      d = t.length;
                    h < l && h < d;
                    h++
                  )
                    (p += t[h]), c++;
                  (u[s] = p / c), s++, (f = l);
                }
                if (((a = null), Math.round(s * o) !== t.length)) {
                  var g = Math.round(s * o);
                  a = new Float32Array(t.subarray(g, t.length));
                }
                return u;
              })(r, i));
            for (
              var o = new Int16Array(r.length),
                s = new Uint8Array(o.length),
                f = 0,
                l = r.length;
              f < l;
              f++
            )
              (o[f] = r[f] * Math.pow(2, 15)), (s[f] = u(o[f]));
            return s;
          },
        }),
        new s()
      );
    };
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.BrowserDetect = function () {
        var e = navigator.userAgent.toLowerCase(),
          t = navigator.appName,
          r = null;
        "Microsoft Internet Explorer" === t ||
        e.indexOf("trident") > -1 ||
        e.indexOf("edge/") > -1
          ? ((r = "ie"),
            "Microsoft Internet Explorer" === t
              ? ((e = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(e)),
                (r += parseInt(e[1])))
              : e.indexOf("trident") > -1
                ? (r += 11)
                : e.indexOf("edge/") > -1 && (r = "edge"))
          : e.indexOf("safari") > -1
            ? (r = e.indexOf("chrome") > -1 ? "chrome" : "safari")
            : e.indexOf("firefox") > -1 && (r = "firefox");
        return r;
      }),
      (t.BrowserDetectDetail = function () {
        var e = navigator.userAgent.toLowerCase(),
          t = navigator.platform.toLowerCase(),
          r = e.match(
            /(opera|ie|trident|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|rv:(\d.?)|$)/
          ) || [null, "unknown", 0],
          n = ("ie" == r[1] || "trident" == r[1]) && document.documentMode,
          o = {
            name: "version" == r[1] ? r[3] : "trident" == r[1] ? "ie" : r[1],
            version:
              n ||
              parseFloat(
                "opera" == r[1] && r[4]
                  ? r[4]
                  : "trident" == r[1] && r[5]
                    ? r[5]
                    : r[2]
              ),
            Platform: {
              name: e.match(/ip(?:ad|od|hone)/)
                ? "ios"
                : (e.match(/(?:webos|android)/) ||
                    t.match(/mac|win|linux/) || ["other"])[0],
            },
          };
        (o[o.name] = !0),
          (o[o.name + parseInt(o.version, 10)] = !0),
          (o.Platform[o.Platform.name] = !0),
          o.Platform.ios && (o.Platform.ipod = !0);
        o.Engine = {};
        var i = function (e, t) {
          (o.Engine.name = e), (o.Engine[e + t] = !0), (o.Engine.version = t);
        };
        if (o.ie)
          switch (((o.Engine.trident = !0), o.version)) {
            case 6:
              i("trident", 4);
              break;
            case 7:
              i("trident", 5);
              break;
            case 8:
              i("trident", 6);
          }
        o.firefox &&
          ((o.Engine.gecko = !0),
          o.version >= 3 ? i("gecko", 19) : i("gecko", 18));
        if (o.safari || o.chrome)
          switch (((o.Engine.webkit = !0), o.version)) {
            case 2:
              i("webkit", 419);
              break;
            case 3:
              i("webkit", 420);
              break;
            case 4:
              i("webkit", 525);
          }
        o.opera &&
          ((o.Engine.presto = !0),
          o.version >= 9.6
            ? i("presto", 960)
            : o.version >= 9.5
              ? i("presto", 950)
              : i("presto", 925));
        if ("unknown" == o.name)
          switch ((e.match(/(?:webkit|khtml|gecko)/) || [])[0]) {
            case "webkit":
            case "khtml":
              o.Engine.webkit = !0;
              break;
            case "gecko":
              o.Engine.gecko = !0;
          }
        return o;
      }),
      (t.CommonAudioUtil = function () {
        var e = [
            1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192,
            16384,
          ],
          t = function (e, t, r) {
            var n = 0,
              o = 0;
            for (n = 0; n < r && !(e < t[o]); n++) o++;
            return n;
          },
          r = function (r, n) {
            var o = 0,
              i = 0,
              a = 0,
              u = 0,
              s = 0;
            return (
              (i = t((o = r > 0 ? r : 8191 & -r), e, 15) - 6),
              (a = i + ((n >> 6) & 15) - 13),
              (u =
                ((0 === o ? 32 : i >= 0 ? o >> i : o << -i) *
                  (n & parseInt("077", 8)) +
                  48) >>
                4),
              (s = a >= 0 ? (u << a) & 32767 : u >> -a),
              (r ^ n) < 0 ? -s : s
            );
          };
        (this.g726InitState = function () {
          var e = {},
            t = 0;
          for (
            e.pp = new Array(2),
              e.zp = new Array(6),
              e.pk = new Array(2),
              e.dq = new Array(6),
              e.sr = new Array(2),
              e.yl = 34816,
              e.yu = 544,
              e.dms = 0,
              e.dml = 0,
              e.ppp = 0,
              t = 0;
            t < 2;
            t++
          )
            (e.pp[t] = 0), (e.pk[t] = 0), (e.sr[t] = 32);
          for (t = 0; t < 6; t++) (e.zp[t] = 0), (e.dq[t] = 32);
          return (e.td = 0), e;
        }),
          (this.predictorZero = function (e) {
            var t = 0,
              n = 0;
            for (n = r(e.zp[0] >> 2, e.dq[0]), t = 1; t < 6; t++)
              n += r(e.zp[t] >> 2, e.dq[t]);
            return n;
          }),
          (this.predictorPole = function (e) {
            return r(e.pp[1] >> 2, e.sr[1]) + r(e.pp[0] >> 2, e.sr[0]);
          }),
          (this.stepSize = function (e) {
            var t = 0,
              r = 0,
              n = 0;
            return e.ppp >= 256
              ? e.yu
              : ((t = e.yl >> 6),
                (r = e.yu - t),
                (n = e.ppp >> 2),
                r > 0 ? (t += (r * n) >> 6) : r < 0 && (t += (r * n + 63) >> 6),
                t);
          }),
          (this.quantize = function (r, n, o, i) {
            var a = 0,
              u = 0,
              s = 0;
            return (
              (a = Math.abs(r)),
              (u = t(a >> 1, e, 15)),
              (s = t((u << 7) + (((a << 7) >> u) & 127) - (n >> 2), o, i)),
              r < 0 ? 1 + (i << 1) - s : 0 === s ? 1 + (i << 1) : s
            );
          }),
          (this.reconstruct = function (e, t, r) {
            var n = 0,
              o = 0;
            return (n = t + (r >> 2)) < 0
              ? e
                ? -32768
                : 0
              : ((o = ((128 + (127 & n)) << 7) >> (14 - ((n >> 7) & 15))),
                e ? o - 32768 : o);
          }),
          (this.update = function (r, n, o, i, a, u, s, f) {
            var l = 0,
              p = 0,
              c = 0,
              h = 0,
              d = 0,
              g = 0,
              v = 0,
              m = 0,
              E = 0,
              y = 0,
              _ = 0,
              T = 0,
              x = 0,
              b = 0;
            if (
              ((b = s < 0 ? 1 : 0),
              (p = 32767 & a),
              (E = f.yl >> 15),
              (T = (f.yl >> 10) & 31),
              (x = (32 + T) << E),
              (_ = ((y = E > 9 ? 31744 : x) + (y >> 1)) >> 1),
              (m = 0 === f.td ? 0 : p <= _ ? 0 : 1),
              (f.yu = n + ((o - n) >> 5)),
              f.yu < 544 ? (f.yu = 544) : f.yu > 5120 && (f.yu = 5120),
              (f.yl += f.yu + (-f.yl >> 6)),
              1 === m)
            )
              (f.pp[0] = 0),
                (f.pp[1] = 0),
                (f.zp[0] = 0),
                (f.zp[1] = 0),
                (f.zp[2] = 0),
                (f.zp[3] = 0),
                (f.zp[4] = 0),
                (f.zp[5] = 0),
                (h = 0);
            else
              for (
                g = b ^ f.pk[0],
                  h = f.pp[1] - (f.pp[1] >> 7),
                  0 !== s &&
                    ((v = g ? f.pp[0] : -f.pp[0]) < -8191
                      ? (h -= 256)
                      : (h += v > 8191 ? 255 : v >> 5),
                    b ^ f.pk[1]
                      ? h <= -12160
                        ? (h = -12288)
                        : h >= 12416
                          ? (h = 12288)
                          : (h -= 128)
                      : h <= -12416
                        ? (h = -12288)
                        : h >= 12160
                          ? (h = 12288)
                          : (h += 128)),
                  f.pp[1] = h,
                  f.pp[0] -= f.pp[0] >> 8,
                  0 !== s && (0 === g ? (f.pp[0] += 192) : (f.pp[0] -= 192)),
                  d = 15360 - h,
                  f.pp[0] < -d ? (f.pp[0] = -d) : f.pp[0] > d && (f.pp[0] = d),
                  l = 0;
                l < 6;
                l++
              )
                (f.zp[l] -= 5 === r ? f.zp[l] >> 9 : f.zp[l] >> 8),
                  32767 & a &&
                    ((a ^ f.dq[l]) >= 0 ? (f.zp[l] += 128) : (f.zp[l] -= 128));
            for (l = 5; l > 0; l--) f.dq[l] = f.dq[l - 1];
            return (
              0 === p
                ? (f.dq[0] = a >= 0 ? 32 : 64544)
                : ((c = t(p, e, 15)),
                  (f.dq[0] =
                    a >= 0
                      ? (c << 6) + ((p << 6) >> c)
                      : (c << 6) + ((p << 6) >> c) - 1024)),
              (f.sr[1] = f.sr[0]),
              0 === u
                ? (f.sr[0] = 32)
                : u > 0
                  ? ((c = t(u, e, 15)), (f.sr[0] = (c << 6) + ((u << 6) >> c)))
                  : u > -32768
                    ? ((c = t((p = -u), e, 15)),
                      (f.sr[0] = (c << 6) + ((p << 6) >> c) - 1024))
                    : (f.sr[0] = 64544),
              (f.pk[1] = f.pk[0]),
              (f.pk[0] = b),
              (f.td = 1 === m ? 0 : h < -11776 ? 1 : 0),
              (f.dms += (i - f.dms) >> 5),
              (f.dml += ((i << 2) - f.dml) >> 7),
              1 === m
                ? (f.ppp = 256)
                : n < 1536
                  ? (f.ppp += (512 - f.ppp) >> 4)
                  : 1 === f.td
                    ? (f.ppp += (512 - f.ppp) >> 4)
                    : Math.abs((f.dms << 2) - f.dml) >= f.dml >> 3
                      ? (f.ppp += (512 - f.ppp) >> 4)
                      : (f.ppp += -f.ppp >> 4),
              f
            );
          });
      }),
      (t.Texture =
        t.Shader =
        t.Script =
        t.Queue =
        t.Program =
        t.PLAYER_STATE_CODE =
          void 0),
      (t.VideoBufferList = function () {
        var e = 0,
          t = 0,
          r = null;
        function n() {
          (e = 360),
            (t = 240),
            (r = null),
            (this._length = 0),
            (this.head = null),
            (this.tail = null),
            (this.curIdx = 0);
        }
        return (
          (n.prototype = {
            push: function (e, n, o, i, a, u) {
              var s = new VideoBufferNode(e, n, o, i, a, u);
              return (
                this._length > 0
                  ? ((this.tail.next = s),
                    (s.previous = this.tail),
                    (this.tail = s))
                  : ((this.head = s), (this.tail = s)),
                (this._length += 1),
                null !== r && this._length >= t && r(),
                s
              );
            },
            pop: function () {
              var e = null;
              return (
                this._length > 1 &&
                  ((e = this.head),
                  (this.head = this.head.next),
                  null !== this.head
                    ? (this.head.previous = null)
                    : (this.tail = null),
                  (this._length -= 1)),
                e
              );
            },
            setMaxLength: function (t) {
              (e = t) > 360 ? (e = 360) : e < 30 && (e = 30);
            },
            setBUFFERING: function (e) {
              (t = e) > 240 ? (t = 240) : t < 6 && (t = 6);
            },
            setBufferFullCallback: function (e) {
              r = e;
            },
            searchTimestamp: function (e) {
              var t = this.head,
                r = this._length,
                n = 1;
              if (0 === r || e <= 0 || null === t)
                throw new Error("Failure: non-existent node in this list.");
              for (
                ;
                null !== t &&
                (t.timeStamp.timestamp !== e.timestamp ||
                  t.timeStamp.timestamp_usec !== e.timestamp_usec);

              )
                (t = t.next), n++;
              return r < n ? (t = null) : (this.curIdx = n), t;
            },
            findIFrame: function (e) {
              var t = this.head,
                r = this._length,
                n = 1;
              if (0 === r)
                throw new Error("Failure: non-existent node in this list.");
              for (; n < this.curIdx; ) (t = t.next), n++;
              if (!0 === e) for (; "I" !== t.frameType; ) (t = t.next), n++;
              else for (; "I" !== t.frameType; ) (t = t.previous), n--;
              return r < n ? (t = null) : (this.curIdx = n), t;
            },
          }),
          new n()
        );
      }),
      (t.debug = t.commonOption = void 0),
      (t.formAuthorizationResponse = function (e, t, r, n, o, i) {
        var u = null,
          s = null;
        return (
          (u = (0, a.default)(e + ":" + n + ":" + t).toLowerCase()),
          (s = (0, a.default)(i + ":" + r).toLowerCase()),
          (0, a.default)(u + ":" + o + ":" + s).toLowerCase()
        );
      }),
      (t.pubsub = void 0),
      (t.stringToUint8Array = function (e) {
        for (
          var t = e.length, r = new Uint8Array(new ArrayBuffer(t)), n = 0;
          n < t;
          n++
        )
          r[n] = e.charCodeAt(n);
        return r;
      });
    var o = n(r(6)),
      i = n(r(7)),
      a = n(r(10));
    t.debug = {
      log: function () {},
      error: function () {},
      count: function () {},
      info: function () {},
    };
    (t.commonOption = {}).VIDEOENCODETYPE = { H264: 1, H265: 2 };
    t.PLAYER_STATE_CODE = {
      TIMEOUT: 101,
      NOT_SUPPORT_MIME: 102,
      LIMIT_SPEED: 103,
      ADDBUFFER_ERROR: 104,
      MSE_ERROR: 105,
      UNSUPPORTED_AUDIO_FORMAT: 201,
      OPEN_WS_ERROR: 202,
      KMS_NOT_CONNECTED: 203,
      CHANNEL_AUTH_FAILED: 204,
      PASSWORD_NOT_INITIALIZE: 205,
      MAX_NUMBER_CONNECTION: 206,
      WS_CLOSED: 207,
      RTSP_NOT_FOUND: 404,
      INVALID_RANGE: 457,
      INTERNAL_SERVER_ERROR: 500,
      SERVICE_UNAVILABLE: 503,
      TALK_SERVICE_UNAVILABLE: 504,
    };
    (t.Script = (function () {
      function e() {}
      return (
        (e.createFromElementId = function (t) {
          for (
            var r = document.getElementById(t), n = "", o = r.firstChild;
            o;

          )
            3 === o.nodeType && (n += o.textContent), (o = o.nextSibling);
          var i = new e();
          return (i.type = r.type), (i.source = n), i;
        }),
        (e.createFromSource = function (t, r) {
          var n = new e();
          return (n.type = t), (n.source = r), n;
        }),
        e
      );
    })()),
      (t.Shader = (function () {
        return function (e, t) {
          if ("x-shader/x-fragment" === t.type)
            this.shader = e.createShader(e.FRAGMENT_SHADER);
          else {
            if ("x-shader/x-vertex" !== t.type)
              return void error("Unknown shader type: " + t.type);
            this.shader = e.createShader(e.VERTEX_SHADER);
          }
          e.shaderSource(this.shader, t.source),
            e.compileShader(this.shader),
            e.getShaderParameter(this.shader, e.COMPILE_STATUS) ||
              error(
                "An error occurred compiling the shaders: " +
                  e.getShaderInfoLog(this.shader)
              );
        };
      })()),
      (t.Program = (function () {
        function e(e) {
          (this.gl = e), (this.program = this.gl.createProgram());
        }
        return (
          (e.prototype = {
            attach: function (e) {
              this.gl.attachShader(this.program, e.shader);
            },
            link: function () {
              this.gl.linkProgram(this.program);
            },
            use: function () {
              this.gl.useProgram(this.program);
            },
            getAttributeLocation: function (e) {
              return this.gl.getAttribLocation(this.program, e);
            },
            setMatrixUniform: function (e, t) {
              var r = this.gl.getUniformLocation(this.program, e);
              this.gl.uniformMatrix4fv(r, !1, t);
            },
          }),
          e
        );
      })()),
      (t.Texture = (function () {
        var e = null;
        function t(e, t, r) {
          (this.gl = e),
            (this.size = t),
            (this.texture = e.createTexture()),
            e.bindTexture(e.TEXTURE_2D, this.texture),
            (this.format = r || e.LUMINANCE),
            e.texImage2D(
              e.TEXTURE_2D,
              0,
              this.format,
              t.w,
              t.h,
              0,
              this.format,
              e.UNSIGNED_BYTE,
              null
            ),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
            e.pixelStorei(e.UNPACK_ALIGNMENT, 1);
        }
        return (
          (t.prototype = {
            fill: function (e, t) {
              var r = this.gl;
              r.bindTexture(r.TEXTURE_2D, this.texture),
                t
                  ? r.texSubImage2D(
                      r.TEXTURE_2D,
                      0,
                      0,
                      0,
                      this.size.w,
                      this.size.h,
                      this.format,
                      r.UNSIGNED_BYTE,
                      e
                    )
                  : r.texImage2D(
                      r.TEXTURE_2D,
                      0,
                      this.format,
                      this.size.w,
                      this.size.h,
                      0,
                      this.format,
                      r.UNSIGNED_BYTE,
                      e
                    );
            },
            bind: function (t, r, n) {
              var o = this.gl;
              e || (e = [o.TEXTURE0, o.TEXTURE1, o.TEXTURE2]),
                o.activeTexture(e[t]),
                o.bindTexture(o.TEXTURE_2D, this.texture),
                o.uniform1i(o.getUniformLocation(r.program, n), t);
            },
          }),
          t
        );
      })());
    t.Queue = (function () {
      return (0, i.default)(
        function e() {
          (0, o.default)(this, e), (this.first = null), (this.size = 0);
        },
        [
          {
            key: "enqueue",
            value: function (e) {
              if (null === this.first) this.first = e;
              else {
                for (var t = this.first; null !== t.next; ) t = t.next;
                t.next = e;
              }
              this.size += 1;
            },
          },
          {
            key: "dequeue",
            value: function () {
              var e = null;
              return (
                null !== this.first &&
                  ((e = this.first),
                  (this.first = this.first.next),
                  (this.size -= 1)),
                e
              );
            },
          },
          {
            key: "clear",
            value: function () {
              (this.size = 0), (this.first = null);
            },
          },
        ]
      );
    })();
    var u = {},
      s = -1;
    t.pubsub = {
      publish: function (e, t) {
        if (!u[e]) return !1;
        for (var r = u[e], n = r ? r.length : 0; n--; ) r[n].func(t);
        return this;
      },
      subscribe: function (e, t) {
        u[e] || (u[e] = []);
        var r = (++s).toString();
        return u[e].push({ token: r, func: t }), r;
      },
      unsubscribe: function (e) {
        for (var t in u)
          if (u[t])
            for (var r = 0, n = u[t].length; r < n; r++)
              if (u[t][r].token === e) return u[t].splice(r, 1), e;
      },
      getTopicFunc: function (e) {
        return u[e] ? u[e] : [];
      },
    };
  },
  function (e, t) {
    (e.exports = function (e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }),
      (e.exports.__esModule = !0),
      (e.exports.default = e.exports);
  },
  function (e, t, r) {
    var n = r(8);
    function o(e, t) {
      for (var r = 0; r < t.length; r++) {
        var o = t[r];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          "value" in o && (o.writable = !0),
          Object.defineProperty(e, n(o.key), o);
      }
    }
    (e.exports = function (e, t, r) {
      return (
        t && o(e.prototype, t),
        r && o(e, r),
        Object.defineProperty(e, "prototype", { writable: !1 }),
        e
      );
    }),
      (e.exports.__esModule = !0),
      (e.exports.default = e.exports);
  },
  function (e, t, r) {
    var n = r(1).default,
      o = r(9);
    (e.exports = function (e) {
      var t = o(e, "string");
      return "symbol" == n(t) ? t : t + "";
    }),
      (e.exports.__esModule = !0),
      (e.exports.default = e.exports);
  },
  function (e, t, r) {
    var n = r(1).default;
    (e.exports = function (e, t) {
      if ("object" != n(e) || !e) return e;
      var r = e[Symbol.toPrimitive];
      if (void 0 !== r) {
        var o = r.call(e, t || "default");
        if ("object" != n(o)) return o;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t ? String : Number)(e);
    }),
      (e.exports.__esModule = !0),
      (e.exports.default = e.exports);
  },
  function (e, t, r) {
    "use strict";
    var n = r(0);
    Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
    var o = n(r(1));
    if ("undefined" == typeof i) var i = {};
    i.MD5 = function (e) {
      function t(e) {
        var t = (e >>> 0).toString(16);
        return "00000000".substr(0, 8 - t.length) + t;
      }
      function r(e, t, r) {
        return (e & t) | (~e & r);
      }
      function n(e, t, r) {
        return (r & e) | (~r & t);
      }
      function i(e, t, r) {
        return e ^ t ^ r;
      }
      function a(e, t, r) {
        return t ^ (e | ~r);
      }
      function u(e, t) {
        return (e[t + 3] << 24) | (e[t + 2] << 16) | (e[t + 1] << 8) | e[t];
      }
      function s(e) {
        for (var t = [], r = 0; r < e.length; r++)
          if (e.charCodeAt(r) <= 127) t.push(e.charCodeAt(r));
          else
            for (
              var n = encodeURIComponent(e.charAt(r)).substr(1).split("%"),
                o = 0;
              o < n.length;
              o++
            )
              t.push(parseInt(n[o], 16));
        return t;
      }
      function f(e) {
        for (var t = new Array(e.length), r = 0; r < e.length; r++) t[r] = e[r];
        return t;
      }
      var l = null,
        p = null;
      function c(e, t) {
        return 4294967295 & (e + t);
      }
      return (
        "string" == typeof e
          ? (l = s(e))
          : e.constructor == Array
            ? 0 === e.length
              ? (l = e)
              : "string" == typeof e[0]
                ? (l = (function (e) {
                    for (var t = [], r = 0; r < e.length; r++)
                      t = t.concat(s(e[r]));
                    return t;
                  })(e))
                : "number" == typeof e[0]
                  ? (l = e)
                  : (p = (0, o.default)(e[0]))
            : "undefined" != typeof ArrayBuffer
              ? e instanceof ArrayBuffer
                ? (l = f(new Uint8Array(e)))
                : e instanceof Uint8Array || e instanceof Int8Array
                  ? (l = f(e))
                  : e instanceof Uint32Array ||
                      e instanceof Int32Array ||
                      e instanceof Uint16Array ||
                      e instanceof Int16Array ||
                      e instanceof Float32Array ||
                      e instanceof Float64Array
                    ? (l = f(new Uint8Array(e.buffer)))
                    : (p = (0, o.default)(e))
              : (p = (0, o.default)(e)),
        p && alert("MD5 type mismatch, cannot process " + p),
        (function () {
          function e(e, t, r, n) {
            var o,
              i,
              a = y;
            (y = E),
              (E = m),
              (m = c(
                m,
                (((o = c(v, c(e, c(t, r)))) << (i = n)) & 4294967295) |
                  (o >>> (32 - i))
              )),
              (v = a);
          }
          var o = l.length;
          l.push(128);
          var s = l.length % 64;
          if (s > 56) {
            for (var f = 0; f < 64 - s; f++) l.push(0);
            s = l.length % 64;
          }
          for (f = 0; f < 56 - s; f++) l.push(0);
          l = l.concat(
            (function (e) {
              for (var t = [], r = 0; r < 8; r++) t.push(255 & e), (e >>>= 8);
              return t;
            })(8 * o)
          );
          var p = 1732584193,
            h = 4023233417,
            d = 2562383102,
            g = 271733878,
            v = 0,
            m = 0,
            E = 0,
            y = 0;
          for (f = 0; f < l.length / 64; f++) {
            v = p;
            var _ = 64 * f;
            e(r((m = h), (E = d), (y = g)), 3614090360, u(l, _), 7),
              e(r(m, E, y), 3905402710, u(l, _ + 4), 12),
              e(r(m, E, y), 606105819, u(l, _ + 8), 17),
              e(r(m, E, y), 3250441966, u(l, _ + 12), 22),
              e(r(m, E, y), 4118548399, u(l, _ + 16), 7),
              e(r(m, E, y), 1200080426, u(l, _ + 20), 12),
              e(r(m, E, y), 2821735955, u(l, _ + 24), 17),
              e(r(m, E, y), 4249261313, u(l, _ + 28), 22),
              e(r(m, E, y), 1770035416, u(l, _ + 32), 7),
              e(r(m, E, y), 2336552879, u(l, _ + 36), 12),
              e(r(m, E, y), 4294925233, u(l, _ + 40), 17),
              e(r(m, E, y), 2304563134, u(l, _ + 44), 22),
              e(r(m, E, y), 1804603682, u(l, _ + 48), 7),
              e(r(m, E, y), 4254626195, u(l, _ + 52), 12),
              e(r(m, E, y), 2792965006, u(l, _ + 56), 17),
              e(r(m, E, y), 1236535329, u(l, _ + 60), 22),
              e(n(m, E, y), 4129170786, u(l, _ + 4), 5),
              e(n(m, E, y), 3225465664, u(l, _ + 24), 9),
              e(n(m, E, y), 643717713, u(l, _ + 44), 14),
              e(n(m, E, y), 3921069994, u(l, _), 20),
              e(n(m, E, y), 3593408605, u(l, _ + 20), 5),
              e(n(m, E, y), 38016083, u(l, _ + 40), 9),
              e(n(m, E, y), 3634488961, u(l, _ + 60), 14),
              e(n(m, E, y), 3889429448, u(l, _ + 16), 20),
              e(n(m, E, y), 568446438, u(l, _ + 36), 5),
              e(n(m, E, y), 3275163606, u(l, _ + 56), 9),
              e(n(m, E, y), 4107603335, u(l, _ + 12), 14),
              e(n(m, E, y), 1163531501, u(l, _ + 32), 20),
              e(n(m, E, y), 2850285829, u(l, _ + 52), 5),
              e(n(m, E, y), 4243563512, u(l, _ + 8), 9),
              e(n(m, E, y), 1735328473, u(l, _ + 28), 14),
              e(n(m, E, y), 2368359562, u(l, _ + 48), 20),
              e(i(m, E, y), 4294588738, u(l, _ + 20), 4),
              e(i(m, E, y), 2272392833, u(l, _ + 32), 11),
              e(i(m, E, y), 1839030562, u(l, _ + 44), 16),
              e(i(m, E, y), 4259657740, u(l, _ + 56), 23),
              e(i(m, E, y), 2763975236, u(l, _ + 4), 4),
              e(i(m, E, y), 1272893353, u(l, _ + 16), 11),
              e(i(m, E, y), 4139469664, u(l, _ + 28), 16),
              e(i(m, E, y), 3200236656, u(l, _ + 40), 23),
              e(i(m, E, y), 681279174, u(l, _ + 52), 4),
              e(i(m, E, y), 3936430074, u(l, _), 11),
              e(i(m, E, y), 3572445317, u(l, _ + 12), 16),
              e(i(m, E, y), 76029189, u(l, _ + 24), 23),
              e(i(m, E, y), 3654602809, u(l, _ + 36), 4),
              e(i(m, E, y), 3873151461, u(l, _ + 48), 11),
              e(i(m, E, y), 530742520, u(l, _ + 60), 16),
              e(i(m, E, y), 3299628645, u(l, _ + 8), 23),
              e(a(m, E, y), 4096336452, u(l, _), 6),
              e(a(m, E, y), 1126891415, u(l, _ + 28), 10),
              e(a(m, E, y), 2878612391, u(l, _ + 56), 15),
              e(a(m, E, y), 4237533241, u(l, _ + 20), 21),
              e(a(m, E, y), 1700485571, u(l, _ + 48), 6),
              e(a(m, E, y), 2399980690, u(l, _ + 12), 10),
              e(a(m, E, y), 4293915773, u(l, _ + 40), 15),
              e(a(m, E, y), 2240044497, u(l, _ + 4), 21),
              e(a(m, E, y), 1873313359, u(l, _ + 32), 6),
              e(a(m, E, y), 4264355552, u(l, _ + 60), 10),
              e(a(m, E, y), 2734768916, u(l, _ + 24), 15),
              e(a(m, E, y), 1309151649, u(l, _ + 52), 21),
              e(a(m, E, y), 4149444226, u(l, _ + 16), 6),
              e(a(m, E, y), 3174756917, u(l, _ + 44), 10),
              e(a(m, E, y), 718787259, u(l, _ + 8), 15),
              e(a(m, E, y), 3951481745, u(l, _ + 36), 21),
              (p = c(p, v)),
              (h = c(h, m)),
              (d = c(d, E)),
              (g = c(g, y));
          }
          return (function (e, r, n, o) {
            for (var i = "", a = 0, u = 0, s = 3; s >= 0; s--)
              (a = 255 & (u = arguments[s])),
                (a <<= 8),
                (a |= 255 & (u >>>= 8)),
                (a <<= 8),
                (a |= 255 & (u >>>= 8)),
                (a <<= 8),
                (i += t((a |= u >>>= 8)));
            return i;
          })(g, d, h, p).toUpperCase();
        })()
      );
    };
    t.default = function (e) {
      return i.MD5(e);
    };
  },
]);
