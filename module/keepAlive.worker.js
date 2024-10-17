!(function (t) {
  var e = {};
  function r(n) {
    if (e[n]) return e[n].exports;
    var i = (e[n] = { i: n, l: !1, exports: {} });
    return t[n].call(i.exports, i, i.exports, r), (i.l = !0), i.exports;
  }
  (r.m = t),
    (r.c = e),
    (r.d = function (t, e, n) {
      r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
    }),
    (r.r = function (t) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (r.t = function (t, e) {
      if ((1 & e && (t = r(t)), 8 & e)) return t;
      if (4 & e && "object" === typeof t && t && t.__esModule) return t;
      var n = Object.create(null);
      if (
        (r.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var i in t)
          r.d(
            n,
            i,
            function (e) {
              return t[e];
            }.bind(null, i)
          );
      return n;
    }),
    (r.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return r.d(e, "a", e), e;
    }),
    (r.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (r.p = ""),
    r((r.s = 2));
})([
  function (t, e) {
    function r(e) {
      return (
        (t.exports = r =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports),
        r(e)
      );
    }
    (t.exports = r),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e) {
    (t.exports = function (t) {
      return t && t.__esModule ? t : { default: t };
    }),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e, r) {
    "use strict";
    var n = r(3),
      i = null;
    clearTimeout(i),
      (function t() {
        i = setTimeout(function () {
          postMessage(1), t();
        }, 4e4);
      })();
    var o = n.pubsub.subscribe("_clearTime_", function () {
      clearTimeout(i), (i = null), n.pubsub.unsubscribe(o), self.close();
    });
    self.onmessage = function (t) {
      0 === t.data && (clearTimeout(i), (i = null), self.close());
    };
  },
  function (t, e, r) {
    "use strict";
    var n = r(1);
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.BrowserDetect = function () {
        var t = navigator.userAgent.toLowerCase(),
          e = navigator.appName,
          r = null;
        "Microsoft Internet Explorer" === e ||
        t.indexOf("trident") > -1 ||
        t.indexOf("edge/") > -1
          ? ((r = "ie"),
            "Microsoft Internet Explorer" === e
              ? ((t = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(t)),
                (r += parseInt(t[1])))
              : t.indexOf("trident") > -1
                ? (r += 11)
                : t.indexOf("edge/") > -1 && (r = "edge"))
          : t.indexOf("safari") > -1
            ? (r = t.indexOf("chrome") > -1 ? "chrome" : "safari")
            : t.indexOf("firefox") > -1 && (r = "firefox");
        return r;
      }),
      (e.BrowserDetectDetail = function () {
        var t = navigator.userAgent.toLowerCase(),
          e = navigator.platform.toLowerCase(),
          r = t.match(
            /(opera|ie|trident|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|rv:(\d.?)|$)/
          ) || [null, "unknown", 0],
          n = ("ie" == r[1] || "trident" == r[1]) && document.documentMode,
          i = {
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
              name: t.match(/ip(?:ad|od|hone)/)
                ? "ios"
                : (t.match(/(?:webos|android)/) ||
                    e.match(/mac|win|linux/) || ["other"])[0],
            },
          };
        (i[i.name] = !0),
          (i[i.name + parseInt(i.version, 10)] = !0),
          (i.Platform[i.Platform.name] = !0),
          i.Platform.ios && (i.Platform.ipod = !0);
        i.Engine = {};
        var o = function (t, e) {
          (i.Engine.name = t), (i.Engine[t + e] = !0), (i.Engine.version = e);
        };
        if (i.ie)
          switch (((i.Engine.trident = !0), i.version)) {
            case 6:
              o("trident", 4);
              break;
            case 7:
              o("trident", 5);
              break;
            case 8:
              o("trident", 6);
          }
        i.firefox &&
          ((i.Engine.gecko = !0),
          i.version >= 3 ? o("gecko", 19) : o("gecko", 18));
        if (i.safari || i.chrome)
          switch (((i.Engine.webkit = !0), i.version)) {
            case 2:
              o("webkit", 419);
              break;
            case 3:
              o("webkit", 420);
              break;
            case 4:
              o("webkit", 525);
          }
        i.opera &&
          ((i.Engine.presto = !0),
          i.version >= 9.6
            ? o("presto", 960)
            : i.version >= 9.5
              ? o("presto", 950)
              : o("presto", 925));
        if ("unknown" == i.name)
          switch ((t.match(/(?:webkit|khtml|gecko)/) || [])[0]) {
            case "webkit":
            case "khtml":
              i.Engine.webkit = !0;
              break;
            case "gecko":
              i.Engine.gecko = !0;
          }
        return i;
      }),
      (e.CommonAudioUtil = function () {
        var t = [
            1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192,
            16384,
          ],
          e = function (t, e, r) {
            var n = 0,
              i = 0;
            for (n = 0; n < r && !(t < e[i]); n++) i++;
            return n;
          },
          r = function (r, n) {
            var i = 0,
              o = 0,
              u = 0,
              a = 0,
              s = 0;
            return (
              (o = e((i = r > 0 ? r : 8191 & -r), t, 15) - 6),
              (u = o + ((n >> 6) & 15) - 13),
              (a =
                ((0 === i ? 32 : o >= 0 ? i >> o : i << -o) *
                  (n & parseInt("077", 8)) +
                  48) >>
                4),
              (s = u >= 0 ? (a << u) & 32767 : a >> -u),
              (r ^ n) < 0 ? -s : s
            );
          };
        (this.g726InitState = function () {
          var t = {},
            e = 0;
          for (
            t.pp = new Array(2),
              t.zp = new Array(6),
              t.pk = new Array(2),
              t.dq = new Array(6),
              t.sr = new Array(2),
              t.yl = 34816,
              t.yu = 544,
              t.dms = 0,
              t.dml = 0,
              t.ppp = 0,
              e = 0;
            e < 2;
            e++
          )
            (t.pp[e] = 0), (t.pk[e] = 0), (t.sr[e] = 32);
          for (e = 0; e < 6; e++) (t.zp[e] = 0), (t.dq[e] = 32);
          return (t.td = 0), t;
        }),
          (this.predictorZero = function (t) {
            var e = 0,
              n = 0;
            for (n = r(t.zp[0] >> 2, t.dq[0]), e = 1; e < 6; e++)
              n += r(t.zp[e] >> 2, t.dq[e]);
            return n;
          }),
          (this.predictorPole = function (t) {
            return r(t.pp[1] >> 2, t.sr[1]) + r(t.pp[0] >> 2, t.sr[0]);
          }),
          (this.stepSize = function (t) {
            var e = 0,
              r = 0,
              n = 0;
            return t.ppp >= 256
              ? t.yu
              : ((e = t.yl >> 6),
                (r = t.yu - e),
                (n = t.ppp >> 2),
                r > 0 ? (e += (r * n) >> 6) : r < 0 && (e += (r * n + 63) >> 6),
                e);
          }),
          (this.quantize = function (r, n, i, o) {
            var u = 0,
              a = 0,
              s = 0;
            return (
              (u = Math.abs(r)),
              (a = e(u >> 1, t, 15)),
              (s = e((a << 7) + (((u << 7) >> a) & 127) - (n >> 2), i, o)),
              r < 0 ? 1 + (o << 1) - s : 0 === s ? 1 + (o << 1) : s
            );
          }),
          (this.reconstruct = function (t, e, r) {
            var n = 0,
              i = 0;
            return (n = e + (r >> 2)) < 0
              ? t
                ? -32768
                : 0
              : ((i = ((128 + (127 & n)) << 7) >> (14 - ((n >> 7) & 15))),
                t ? i - 32768 : i);
          }),
          (this.update = function (r, n, i, o, u, a, s, f) {
            var p = 0,
              l = 0,
              c = 0,
              h = 0,
              d = 0,
              m = 0,
              E = 0,
              g = 0,
              v = 0,
              _ = 0,
              y = 0,
              T = 0,
              x = 0,
              b = 0;
            if (
              ((b = s < 0 ? 1 : 0),
              (l = 32767 & u),
              (v = f.yl >> 15),
              (T = (f.yl >> 10) & 31),
              (x = (32 + T) << v),
              (y = ((_ = v > 9 ? 31744 : x) + (_ >> 1)) >> 1),
              (g = 0 === f.td ? 0 : l <= y ? 0 : 1),
              (f.yu = n + ((i - n) >> 5)),
              f.yu < 544 ? (f.yu = 544) : f.yu > 5120 && (f.yu = 5120),
              (f.yl += f.yu + (-f.yl >> 6)),
              1 === g)
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
                m = b ^ f.pk[0],
                  h = f.pp[1] - (f.pp[1] >> 7),
                  0 !== s &&
                    ((E = m ? f.pp[0] : -f.pp[0]) < -8191
                      ? (h -= 256)
                      : (h += E > 8191 ? 255 : E >> 5),
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
                  0 !== s && (0 === m ? (f.pp[0] += 192) : (f.pp[0] -= 192)),
                  d = 15360 - h,
                  f.pp[0] < -d ? (f.pp[0] = -d) : f.pp[0] > d && (f.pp[0] = d),
                  p = 0;
                p < 6;
                p++
              )
                (f.zp[p] -= 5 === r ? f.zp[p] >> 9 : f.zp[p] >> 8),
                  32767 & u &&
                    ((u ^ f.dq[p]) >= 0 ? (f.zp[p] += 128) : (f.zp[p] -= 128));
            for (p = 5; p > 0; p--) f.dq[p] = f.dq[p - 1];
            return (
              0 === l
                ? (f.dq[0] = u >= 0 ? 32 : 64544)
                : ((c = e(l, t, 15)),
                  (f.dq[0] =
                    u >= 0
                      ? (c << 6) + ((l << 6) >> c)
                      : (c << 6) + ((l << 6) >> c) - 1024)),
              (f.sr[1] = f.sr[0]),
              0 === a
                ? (f.sr[0] = 32)
                : a > 0
                  ? ((c = e(a, t, 15)), (f.sr[0] = (c << 6) + ((a << 6) >> c)))
                  : a > -32768
                    ? ((c = e((l = -a), t, 15)),
                      (f.sr[0] = (c << 6) + ((l << 6) >> c) - 1024))
                    : (f.sr[0] = 64544),
              (f.pk[1] = f.pk[0]),
              (f.pk[0] = b),
              (f.td = 1 === g ? 0 : h < -11776 ? 1 : 0),
              (f.dms += (o - f.dms) >> 5),
              (f.dml += ((o << 2) - f.dml) >> 7),
              1 === g
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
      (e.Texture =
        e.Shader =
        e.Script =
        e.Queue =
        e.Program =
        e.PLAYER_STATE_CODE =
          void 0),
      (e.VideoBufferList = function () {
        var t = 0,
          e = 0,
          r = null;
        function n() {
          (t = 360),
            (e = 240),
            (r = null),
            (this._length = 0),
            (this.head = null),
            (this.tail = null),
            (this.curIdx = 0);
        }
        return (
          (n.prototype = {
            push: function (t, n, i, o, u, a) {
              var s = new VideoBufferNode(t, n, i, o, u, a);
              return (
                this._length > 0
                  ? ((this.tail.next = s),
                    (s.previous = this.tail),
                    (this.tail = s))
                  : ((this.head = s), (this.tail = s)),
                (this._length += 1),
                null !== r && this._length >= e && r(),
                s
              );
            },
            pop: function () {
              var t = null;
              return (
                this._length > 1 &&
                  ((t = this.head),
                  (this.head = this.head.next),
                  null !== this.head
                    ? (this.head.previous = null)
                    : (this.tail = null),
                  (this._length -= 1)),
                t
              );
            },
            setMaxLength: function (e) {
              (t = e) > 360 ? (t = 360) : t < 30 && (t = 30);
            },
            setBUFFERING: function (t) {
              (e = t) > 240 ? (e = 240) : e < 6 && (e = 6);
            },
            setBufferFullCallback: function (t) {
              r = t;
            },
            searchTimestamp: function (t) {
              var e = this.head,
                r = this._length,
                n = 1;
              if (0 === r || t <= 0 || null === e)
                throw new Error("Failure: non-existent node in this list.");
              for (
                ;
                null !== e &&
                (e.timeStamp.timestamp !== t.timestamp ||
                  e.timeStamp.timestamp_usec !== t.timestamp_usec);

              )
                (e = e.next), n++;
              return r < n ? (e = null) : (this.curIdx = n), e;
            },
            findIFrame: function (t) {
              var e = this.head,
                r = this._length,
                n = 1;
              if (0 === r)
                throw new Error("Failure: non-existent node in this list.");
              for (; n < this.curIdx; ) (e = e.next), n++;
              if (!0 === t) for (; "I" !== e.frameType; ) (e = e.next), n++;
              else for (; "I" !== e.frameType; ) (e = e.previous), n--;
              return r < n ? (e = null) : (this.curIdx = n), e;
            },
          }),
          new n()
        );
      }),
      (e.debug = e.commonOption = void 0),
      (e.formAuthorizationResponse = function (t, e, r, n, i, o) {
        var a = null,
          s = null;
        return (
          (a = (0, u.default)(t + ":" + n + ":" + e).toLowerCase()),
          (s = (0, u.default)(o + ":" + r).toLowerCase()),
          (0, u.default)(a + ":" + i + ":" + s).toLowerCase()
        );
      }),
      (e.pubsub = void 0),
      (e.stringToUint8Array = function (t) {
        for (
          var e = t.length, r = new Uint8Array(new ArrayBuffer(e)), n = 0;
          n < e;
          n++
        )
          r[n] = t.charCodeAt(n);
        return r;
      });
    var i = n(r(4)),
      o = n(r(5)),
      u = n(r(8));
    e.debug = {
      log: function () {},
      error: function () {},
      count: function () {},
      info: function () {},
    };
    (e.commonOption = {}).VIDEOENCODETYPE = { H264: 1, H265: 2 };
    e.PLAYER_STATE_CODE = {
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
    (e.Script = (function () {
      function t() {}
      return (
        (t.createFromElementId = function (e) {
          for (
            var r = document.getElementById(e), n = "", i = r.firstChild;
            i;

          )
            3 === i.nodeType && (n += i.textContent), (i = i.nextSibling);
          var o = new t();
          return (o.type = r.type), (o.source = n), o;
        }),
        (t.createFromSource = function (e, r) {
          var n = new t();
          return (n.type = e), (n.source = r), n;
        }),
        t
      );
    })()),
      (e.Shader = (function () {
        return function (t, e) {
          if ("x-shader/x-fragment" === e.type)
            this.shader = t.createShader(t.FRAGMENT_SHADER);
          else {
            if ("x-shader/x-vertex" !== e.type)
              return void error("Unknown shader type: " + e.type);
            this.shader = t.createShader(t.VERTEX_SHADER);
          }
          t.shaderSource(this.shader, e.source),
            t.compileShader(this.shader),
            t.getShaderParameter(this.shader, t.COMPILE_STATUS) ||
              error(
                "An error occurred compiling the shaders: " +
                  t.getShaderInfoLog(this.shader)
              );
        };
      })()),
      (e.Program = (function () {
        function t(t) {
          (this.gl = t), (this.program = this.gl.createProgram());
        }
        return (
          (t.prototype = {
            attach: function (t) {
              this.gl.attachShader(this.program, t.shader);
            },
            link: function () {
              this.gl.linkProgram(this.program);
            },
            use: function () {
              this.gl.useProgram(this.program);
            },
            getAttributeLocation: function (t) {
              return this.gl.getAttribLocation(this.program, t);
            },
            setMatrixUniform: function (t, e) {
              var r = this.gl.getUniformLocation(this.program, t);
              this.gl.uniformMatrix4fv(r, !1, e);
            },
          }),
          t
        );
      })()),
      (e.Texture = (function () {
        var t = null;
        function e(t, e, r) {
          (this.gl = t),
            (this.size = e),
            (this.texture = t.createTexture()),
            t.bindTexture(t.TEXTURE_2D, this.texture),
            (this.format = r || t.LUMINANCE),
            t.texImage2D(
              t.TEXTURE_2D,
              0,
              this.format,
              e.w,
              e.h,
              0,
              this.format,
              t.UNSIGNED_BYTE,
              null
            ),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
            t.pixelStorei(t.UNPACK_ALIGNMENT, 1);
        }
        return (
          (e.prototype = {
            fill: function (t, e) {
              var r = this.gl;
              r.bindTexture(r.TEXTURE_2D, this.texture),
                e
                  ? r.texSubImage2D(
                      r.TEXTURE_2D,
                      0,
                      0,
                      0,
                      this.size.w,
                      this.size.h,
                      this.format,
                      r.UNSIGNED_BYTE,
                      t
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
                      t
                    );
            },
            bind: function (e, r, n) {
              var i = this.gl;
              t || (t = [i.TEXTURE0, i.TEXTURE1, i.TEXTURE2]),
                i.activeTexture(t[e]),
                i.bindTexture(i.TEXTURE_2D, this.texture),
                i.uniform1i(i.getUniformLocation(r.program, n), e);
            },
          }),
          e
        );
      })());
    e.Queue = (function () {
      return (0, o.default)(
        function t() {
          (0, i.default)(this, t), (this.first = null), (this.size = 0);
        },
        [
          {
            key: "enqueue",
            value: function (t) {
              if (null === this.first) this.first = t;
              else {
                for (var e = this.first; null !== e.next; ) e = e.next;
                e.next = t;
              }
              this.size += 1;
            },
          },
          {
            key: "dequeue",
            value: function () {
              var t = null;
              return (
                null !== this.first &&
                  ((t = this.first),
                  (this.first = this.first.next),
                  (this.size -= 1)),
                t
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
    var a = {},
      s = -1;
    e.pubsub = {
      publish: function (t, e) {
        if (!a[t]) return !1;
        for (var r = a[t], n = r ? r.length : 0; n--; ) r[n].func(e);
        return this;
      },
      subscribe: function (t, e) {
        a[t] || (a[t] = []);
        var r = (++s).toString();
        return a[t].push({ token: r, func: e }), r;
      },
      unsubscribe: function (t) {
        for (var e in a)
          if (a[e])
            for (var r = 0, n = a[e].length; r < n; r++)
              if (a[e][r].token === t) return a[e].splice(r, 1), t;
      },
      getTopicFunc: function (t) {
        return a[t] ? a[t] : [];
      },
    };
  },
  function (t, e) {
    (t.exports = function (t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e, r) {
    var n = r(6);
    function i(t, e) {
      for (var r = 0; r < e.length; r++) {
        var i = e[r];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          "value" in i && (i.writable = !0),
          Object.defineProperty(t, n(i.key), i);
      }
    }
    (t.exports = function (t, e, r) {
      return (
        e && i(t.prototype, e),
        r && i(t, r),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        t
      );
    }),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e, r) {
    var n = r(0).default,
      i = r(7);
    (t.exports = function (t) {
      var e = i(t, "string");
      return "symbol" == n(e) ? e : e + "";
    }),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e, r) {
    var n = r(0).default;
    (t.exports = function (t, e) {
      if ("object" != n(t) || !t) return t;
      var r = t[Symbol.toPrimitive];
      if (void 0 !== r) {
        var i = r.call(t, e || "default");
        if ("object" != n(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === e ? String : Number)(t);
    }),
      (t.exports.__esModule = !0),
      (t.exports.default = t.exports);
  },
  function (t, e, r) {
    "use strict";
    var n = r(1);
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var i = n(r(0));
    if ("undefined" == typeof o) var o = {};
    o.MD5 = function (t) {
      function e(t) {
        var e = (t >>> 0).toString(16);
        return "00000000".substr(0, 8 - e.length) + e;
      }
      function r(t, e, r) {
        return (t & e) | (~t & r);
      }
      function n(t, e, r) {
        return (r & t) | (~r & e);
      }
      function o(t, e, r) {
        return t ^ e ^ r;
      }
      function u(t, e, r) {
        return e ^ (t | ~r);
      }
      function a(t, e) {
        return (t[e + 3] << 24) | (t[e + 2] << 16) | (t[e + 1] << 8) | t[e];
      }
      function s(t) {
        for (var e = [], r = 0; r < t.length; r++)
          if (t.charCodeAt(r) <= 127) e.push(t.charCodeAt(r));
          else
            for (
              var n = encodeURIComponent(t.charAt(r)).substr(1).split("%"),
                i = 0;
              i < n.length;
              i++
            )
              e.push(parseInt(n[i], 16));
        return e;
      }
      function f(t) {
        for (var e = new Array(t.length), r = 0; r < t.length; r++) e[r] = t[r];
        return e;
      }
      var p = null,
        l = null;
      function c(t, e) {
        return 4294967295 & (t + e);
      }
      return (
        "string" == typeof t
          ? (p = s(t))
          : t.constructor == Array
            ? 0 === t.length
              ? (p = t)
              : "string" == typeof t[0]
                ? (p = (function (t) {
                    for (var e = [], r = 0; r < t.length; r++)
                      e = e.concat(s(t[r]));
                    return e;
                  })(t))
                : "number" == typeof t[0]
                  ? (p = t)
                  : (l = (0, i.default)(t[0]))
            : "undefined" != typeof ArrayBuffer
              ? t instanceof ArrayBuffer
                ? (p = f(new Uint8Array(t)))
                : t instanceof Uint8Array || t instanceof Int8Array
                  ? (p = f(t))
                  : t instanceof Uint32Array ||
                      t instanceof Int32Array ||
                      t instanceof Uint16Array ||
                      t instanceof Int16Array ||
                      t instanceof Float32Array ||
                      t instanceof Float64Array
                    ? (p = f(new Uint8Array(t.buffer)))
                    : (l = (0, i.default)(t))
              : (l = (0, i.default)(t)),
        l && alert("MD5 type mismatch, cannot process " + l),
        (function () {
          function t(t, e, r, n) {
            var i,
              o,
              u = _;
            (_ = v),
              (v = g),
              (g = c(
                g,
                (((i = c(E, c(t, c(e, r)))) << (o = n)) & 4294967295) |
                  (i >>> (32 - o))
              )),
              (E = u);
          }
          var i = p.length;
          p.push(128);
          var s = p.length % 64;
          if (s > 56) {
            for (var f = 0; f < 64 - s; f++) p.push(0);
            s = p.length % 64;
          }
          for (f = 0; f < 56 - s; f++) p.push(0);
          p = p.concat(
            (function (t) {
              for (var e = [], r = 0; r < 8; r++) e.push(255 & t), (t >>>= 8);
              return e;
            })(8 * i)
          );
          var l = 1732584193,
            h = 4023233417,
            d = 2562383102,
            m = 271733878,
            E = 0,
            g = 0,
            v = 0,
            _ = 0;
          for (f = 0; f < p.length / 64; f++) {
            E = l;
            var y = 64 * f;
            t(r((g = h), (v = d), (_ = m)), 3614090360, a(p, y), 7),
              t(r(g, v, _), 3905402710, a(p, y + 4), 12),
              t(r(g, v, _), 606105819, a(p, y + 8), 17),
              t(r(g, v, _), 3250441966, a(p, y + 12), 22),
              t(r(g, v, _), 4118548399, a(p, y + 16), 7),
              t(r(g, v, _), 1200080426, a(p, y + 20), 12),
              t(r(g, v, _), 2821735955, a(p, y + 24), 17),
              t(r(g, v, _), 4249261313, a(p, y + 28), 22),
              t(r(g, v, _), 1770035416, a(p, y + 32), 7),
              t(r(g, v, _), 2336552879, a(p, y + 36), 12),
              t(r(g, v, _), 4294925233, a(p, y + 40), 17),
              t(r(g, v, _), 2304563134, a(p, y + 44), 22),
              t(r(g, v, _), 1804603682, a(p, y + 48), 7),
              t(r(g, v, _), 4254626195, a(p, y + 52), 12),
              t(r(g, v, _), 2792965006, a(p, y + 56), 17),
              t(r(g, v, _), 1236535329, a(p, y + 60), 22),
              t(n(g, v, _), 4129170786, a(p, y + 4), 5),
              t(n(g, v, _), 3225465664, a(p, y + 24), 9),
              t(n(g, v, _), 643717713, a(p, y + 44), 14),
              t(n(g, v, _), 3921069994, a(p, y), 20),
              t(n(g, v, _), 3593408605, a(p, y + 20), 5),
              t(n(g, v, _), 38016083, a(p, y + 40), 9),
              t(n(g, v, _), 3634488961, a(p, y + 60), 14),
              t(n(g, v, _), 3889429448, a(p, y + 16), 20),
              t(n(g, v, _), 568446438, a(p, y + 36), 5),
              t(n(g, v, _), 3275163606, a(p, y + 56), 9),
              t(n(g, v, _), 4107603335, a(p, y + 12), 14),
              t(n(g, v, _), 1163531501, a(p, y + 32), 20),
              t(n(g, v, _), 2850285829, a(p, y + 52), 5),
              t(n(g, v, _), 4243563512, a(p, y + 8), 9),
              t(n(g, v, _), 1735328473, a(p, y + 28), 14),
              t(n(g, v, _), 2368359562, a(p, y + 48), 20),
              t(o(g, v, _), 4294588738, a(p, y + 20), 4),
              t(o(g, v, _), 2272392833, a(p, y + 32), 11),
              t(o(g, v, _), 1839030562, a(p, y + 44), 16),
              t(o(g, v, _), 4259657740, a(p, y + 56), 23),
              t(o(g, v, _), 2763975236, a(p, y + 4), 4),
              t(o(g, v, _), 1272893353, a(p, y + 16), 11),
              t(o(g, v, _), 4139469664, a(p, y + 28), 16),
              t(o(g, v, _), 3200236656, a(p, y + 40), 23),
              t(o(g, v, _), 681279174, a(p, y + 52), 4),
              t(o(g, v, _), 3936430074, a(p, y), 11),
              t(o(g, v, _), 3572445317, a(p, y + 12), 16),
              t(o(g, v, _), 76029189, a(p, y + 24), 23),
              t(o(g, v, _), 3654602809, a(p, y + 36), 4),
              t(o(g, v, _), 3873151461, a(p, y + 48), 11),
              t(o(g, v, _), 530742520, a(p, y + 60), 16),
              t(o(g, v, _), 3299628645, a(p, y + 8), 23),
              t(u(g, v, _), 4096336452, a(p, y), 6),
              t(u(g, v, _), 1126891415, a(p, y + 28), 10),
              t(u(g, v, _), 2878612391, a(p, y + 56), 15),
              t(u(g, v, _), 4237533241, a(p, y + 20), 21),
              t(u(g, v, _), 1700485571, a(p, y + 48), 6),
              t(u(g, v, _), 2399980690, a(p, y + 12), 10),
              t(u(g, v, _), 4293915773, a(p, y + 40), 15),
              t(u(g, v, _), 2240044497, a(p, y + 4), 21),
              t(u(g, v, _), 1873313359, a(p, y + 32), 6),
              t(u(g, v, _), 4264355552, a(p, y + 60), 10),
              t(u(g, v, _), 2734768916, a(p, y + 24), 15),
              t(u(g, v, _), 1309151649, a(p, y + 52), 21),
              t(u(g, v, _), 4149444226, a(p, y + 16), 6),
              t(u(g, v, _), 3174756917, a(p, y + 44), 10),
              t(u(g, v, _), 718787259, a(p, y + 8), 15),
              t(u(g, v, _), 3951481745, a(p, y + 36), 21),
              (l = c(l, E)),
              (h = c(h, g)),
              (d = c(d, v)),
              (m = c(m, _));
          }
          return (function (t, r, n, i) {
            for (var o = "", u = 0, a = 0, s = 3; s >= 0; s--)
              (u = 255 & (a = arguments[s])),
                (u <<= 8),
                (u |= 255 & (a >>>= 8)),
                (u <<= 8),
                (u |= 255 & (a >>>= 8)),
                (u <<= 8),
                (o += e((u |= a >>>= 8)));
            return o;
          })(m, d, h, l).toUpperCase();
        })()
      );
    };
    e.default = function (t) {
      return o.MD5(t);
    };
  },
]);
