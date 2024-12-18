!(function (e) {
  var t = {};
  function r(a) {
    if (t[a]) return t[a].exports;
    var i = (t[a] = { i: a, l: !1, exports: {} });
    return e[a].call(i.exports, i, i.exports, r), (i.l = !0), i.exports;
  }
  (r.m = e),
    (r.c = t),
    (r.d = function (e, t, a) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: a });
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
      var a = Object.create(null);
      if (
        (r.r(a),
        Object.defineProperty(a, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var i in e)
          r.d(
            a,
            i,
            function (t) {
              return e[t];
            }.bind(null, i)
          );
      return a;
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
    r((r.s = 5));
})([
  function (e, t, r) {
    "use strict";
    var a = r(1);
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
          a = ("ie" == r[1] || "trident" == r[1]) && document.documentMode,
          i = {
            name: "version" == r[1] ? r[3] : "trident" == r[1] ? "ie" : r[1],
            version:
              a ||
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
        (i[i.name] = !0),
          (i[i.name + parseInt(i.version, 10)] = !0),
          (i.Platform[i.Platform.name] = !0),
          i.Platform.ios && (i.Platform.ipod = !0);
        i.Engine = {};
        var n = function (e, t) {
          (i.Engine.name = e), (i.Engine[e + t] = !0), (i.Engine.version = t);
        };
        if (i.ie)
          switch (((i.Engine.trident = !0), i.version)) {
            case 6:
              n("trident", 4);
              break;
            case 7:
              n("trident", 5);
              break;
            case 8:
              n("trident", 6);
          }
        i.firefox &&
          ((i.Engine.gecko = !0),
          i.version >= 3 ? n("gecko", 19) : n("gecko", 18));
        if (i.safari || i.chrome)
          switch (((i.Engine.webkit = !0), i.version)) {
            case 2:
              n("webkit", 419);
              break;
            case 3:
              n("webkit", 420);
              break;
            case 4:
              n("webkit", 525);
          }
        i.opera &&
          ((i.Engine.presto = !0),
          i.version >= 9.6
            ? n("presto", 960)
            : i.version >= 9.5
              ? n("presto", 950)
              : n("presto", 925));
        if ("unknown" == i.name)
          switch ((e.match(/(?:webkit|khtml|gecko)/) || [])[0]) {
            case "webkit":
            case "khtml":
              i.Engine.webkit = !0;
              break;
            case "gecko":
              i.Engine.gecko = !0;
          }
        return i;
      }),
      (t.CommonAudioUtil = function () {
        var e = [
            1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192,
            16384,
          ],
          t = function (e, t, r) {
            var a = 0,
              i = 0;
            for (a = 0; a < r && !(e < t[i]); a++) i++;
            return a;
          },
          r = function (r, a) {
            var i = 0,
              n = 0,
              o = 0,
              s = 0,
              u = 0;
            return (
              (n = t((i = r > 0 ? r : 8191 & -r), e, 15) - 6),
              (o = n + ((a >> 6) & 15) - 13),
              (s =
                ((0 === i ? 32 : n >= 0 ? i >> n : i << -n) *
                  (a & parseInt("077", 8)) +
                  48) >>
                4),
              (u = o >= 0 ? (s << o) & 32767 : s >> -o),
              (r ^ a) < 0 ? -u : u
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
              a = 0;
            for (a = r(e.zp[0] >> 2, e.dq[0]), t = 1; t < 6; t++)
              a += r(e.zp[t] >> 2, e.dq[t]);
            return a;
          }),
          (this.predictorPole = function (e) {
            return r(e.pp[1] >> 2, e.sr[1]) + r(e.pp[0] >> 2, e.sr[0]);
          }),
          (this.stepSize = function (e) {
            var t = 0,
              r = 0,
              a = 0;
            return e.ppp >= 256
              ? e.yu
              : ((t = e.yl >> 6),
                (r = e.yu - t),
                (a = e.ppp >> 2),
                r > 0 ? (t += (r * a) >> 6) : r < 0 && (t += (r * a + 63) >> 6),
                t);
          }),
          (this.quantize = function (r, a, i, n) {
            var o = 0,
              s = 0,
              u = 0;
            return (
              (o = Math.abs(r)),
              (s = t(o >> 1, e, 15)),
              (u = t((s << 7) + (((o << 7) >> s) & 127) - (a >> 2), i, n)),
              r < 0 ? 1 + (n << 1) - u : 0 === u ? 1 + (n << 1) : u
            );
          }),
          (this.reconstruct = function (e, t, r) {
            var a = 0,
              i = 0;
            return (a = t + (r >> 2)) < 0
              ? e
                ? -32768
                : 0
              : ((i = ((128 + (127 & a)) << 7) >> (14 - ((a >> 7) & 15))),
                e ? i - 32768 : i);
          }),
          (this.update = function (r, a, i, n, o, s, u, f) {
            var l = 0,
              c = 0,
              p = 0,
              d = 0,
              m = 0,
              _ = 0,
              h = 0,
              g = 0,
              v = 0,
              y = 0,
              b = 0,
              S = 0,
              D = 0,
              T = 0;
            if (
              ((T = u < 0 ? 1 : 0),
              (c = 32767 & o),
              (v = f.yl >> 15),
              (S = (f.yl >> 10) & 31),
              (D = (32 + S) << v),
              (b = ((y = v > 9 ? 31744 : D) + (y >> 1)) >> 1),
              (g = 0 === f.td ? 0 : c <= b ? 0 : 1),
              (f.yu = a + ((i - a) >> 5)),
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
                (d = 0);
            else
              for (
                _ = T ^ f.pk[0],
                  d = f.pp[1] - (f.pp[1] >> 7),
                  0 !== u &&
                    ((h = _ ? f.pp[0] : -f.pp[0]) < -8191
                      ? (d -= 256)
                      : (d += h > 8191 ? 255 : h >> 5),
                    T ^ f.pk[1]
                      ? d <= -12160
                        ? (d = -12288)
                        : d >= 12416
                          ? (d = 12288)
                          : (d -= 128)
                      : d <= -12416
                        ? (d = -12288)
                        : d >= 12160
                          ? (d = 12288)
                          : (d += 128)),
                  f.pp[1] = d,
                  f.pp[0] -= f.pp[0] >> 8,
                  0 !== u && (0 === _ ? (f.pp[0] += 192) : (f.pp[0] -= 192)),
                  m = 15360 - d,
                  f.pp[0] < -m ? (f.pp[0] = -m) : f.pp[0] > m && (f.pp[0] = m),
                  l = 0;
                l < 6;
                l++
              )
                (f.zp[l] -= 5 === r ? f.zp[l] >> 9 : f.zp[l] >> 8),
                  32767 & o &&
                    ((o ^ f.dq[l]) >= 0 ? (f.zp[l] += 128) : (f.zp[l] -= 128));
            for (l = 5; l > 0; l--) f.dq[l] = f.dq[l - 1];
            return (
              0 === c
                ? (f.dq[0] = o >= 0 ? 32 : 64544)
                : ((p = t(c, e, 15)),
                  (f.dq[0] =
                    o >= 0
                      ? (p << 6) + ((c << 6) >> p)
                      : (p << 6) + ((c << 6) >> p) - 1024)),
              (f.sr[1] = f.sr[0]),
              0 === s
                ? (f.sr[0] = 32)
                : s > 0
                  ? ((p = t(s, e, 15)), (f.sr[0] = (p << 6) + ((s << 6) >> p)))
                  : s > -32768
                    ? ((p = t((c = -s), e, 15)),
                      (f.sr[0] = (p << 6) + ((c << 6) >> p) - 1024))
                    : (f.sr[0] = 64544),
              (f.pk[1] = f.pk[0]),
              (f.pk[0] = T),
              (f.td = 1 === g ? 0 : d < -11776 ? 1 : 0),
              (f.dms += (n - f.dms) >> 5),
              (f.dml += ((n << 2) - f.dml) >> 7),
              1 === g
                ? (f.ppp = 256)
                : a < 1536
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
        function a() {
          (e = 360),
            (t = 240),
            (r = null),
            (this._length = 0),
            (this.head = null),
            (this.tail = null),
            (this.curIdx = 0);
        }
        return (
          (a.prototype = {
            push: function (e, a, i, n, o, s) {
              var u = new VideoBufferNode(e, a, i, n, o, s);
              return (
                this._length > 0
                  ? ((this.tail.next = u),
                    (u.previous = this.tail),
                    (this.tail = u))
                  : ((this.head = u), (this.tail = u)),
                (this._length += 1),
                null !== r && this._length >= t && r(),
                u
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
                a = 1;
              if (0 === r || e <= 0 || null === t)
                throw new Error("Failure: non-existent node in this list.");
              for (
                ;
                null !== t &&
                (t.timeStamp.timestamp !== e.timestamp ||
                  t.timeStamp.timestamp_usec !== e.timestamp_usec);

              )
                (t = t.next), a++;
              return r < a ? (t = null) : (this.curIdx = a), t;
            },
            findIFrame: function (e) {
              var t = this.head,
                r = this._length,
                a = 1;
              if (0 === r)
                throw new Error("Failure: non-existent node in this list.");
              for (; a < this.curIdx; ) (t = t.next), a++;
              if (!0 === e) for (; "I" !== t.frameType; ) (t = t.next), a++;
              else for (; "I" !== t.frameType; ) (t = t.previous), a--;
              return r < a ? (t = null) : (this.curIdx = a), t;
            },
          }),
          new a()
        );
      }),
      (t.debug = t.commonOption = void 0),
      (t.formAuthorizationResponse = function (e, t, r, a, i, n) {
        var s = null,
          u = null;
        return (
          (s = (0, o.default)(e + ":" + a + ":" + t).toLowerCase()),
          (u = (0, o.default)(n + ":" + r).toLowerCase()),
          (0, o.default)(s + ":" + i + ":" + u).toLowerCase()
        );
      }),
      (t.pubsub = void 0),
      (t.stringToUint8Array = function (e) {
        for (
          var t = e.length, r = new Uint8Array(new ArrayBuffer(t)), a = 0;
          a < t;
          a++
        )
          r[a] = e.charCodeAt(a);
        return r;
      });
    var i = a(r(7)),
      n = a(r(8)),
      o = a(r(11));
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
            var r = document.getElementById(t), a = "", i = r.firstChild;
            i;

          )
            3 === i.nodeType && (a += i.textContent), (i = i.nextSibling);
          var n = new e();
          return (n.type = r.type), (n.source = a), n;
        }),
        (e.createFromSource = function (t, r) {
          var a = new e();
          return (a.type = t), (a.source = r), a;
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
            bind: function (t, r, a) {
              var i = this.gl;
              e || (e = [i.TEXTURE0, i.TEXTURE1, i.TEXTURE2]),
                i.activeTexture(e[t]),
                i.bindTexture(i.TEXTURE_2D, this.texture),
                i.uniform1i(i.getUniformLocation(r.program, a), t);
            },
          }),
          t
        );
      })());
    t.Queue = (function () {
      return (0, n.default)(
        function e() {
          (0, i.default)(this, e), (this.first = null), (this.size = 0);
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
    var s = {},
      u = -1;
    t.pubsub = {
      publish: function (e, t) {
        if (!s[e]) return !1;
        for (var r = s[e], a = r ? r.length : 0; a--; ) r[a].func(t);
        return this;
      },
      subscribe: function (e, t) {
        s[e] || (s[e] = []);
        var r = (++u).toString();
        return s[e].push({ token: r, func: t }), r;
      },
      unsubscribe: function (e) {
        for (var t in s)
          if (s[t])
            for (var r = 0, a = s[t].length; r < a; r++)
              if (s[t][r].token === e) return s[t].splice(r, 1), e;
      },
      getTopicFunc: function (e) {
        return s[e] ? s[e] : [];
      },
    };
  },
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
    Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
    var a = r(0);
    t.default = function (e) {
      var t = [],
        r = {},
        i = e || a.commonOption.VIDEOENCODETYPE.H264;
      function n() {
        for (var e in t)
          t[e] = [
            e.charCodeAt(0),
            e.charCodeAt(1),
            e.charCodeAt(2),
            e.charCodeAt(3),
          ];
        a.commonOption.VIDEOENCODETYPE.H264 === i
          ? (r.FTYP = new Uint8Array([
              105, 115, 111, 109, 0, 0, 0, 1, 105, 115, 111, 109, 97, 118, 99,
              49,
            ]))
          : a.commonOption.VIDEOENCODETYPE.H265 === i &&
            (r.FTYP = new Uint8Array([
              105, 115, 111, 109, 0, 0, 2, 0, 105, 115, 111, 109, 105, 115, 111,
              50, 97, 118, 99, 49, 109, 112, 52, 49,
            ])),
          (r.STSD_PREFIX = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1])),
          (r.STTS = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0])),
          (r.STSC = r.STCO = r.STTS),
          (r.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])),
          (r.HDLR_VIDEO = new Uint8Array([
            0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114,
            0,
          ])),
          (r.HDLR_AUDIO = new Uint8Array([
            0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114,
            0,
          ])),
          (r.DREF = new Uint8Array([
            0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1,
          ])),
          (r.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0])),
          (r.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]));
      }
      t = {
        avc1: [],
        avcC: [],
        btrt: [],
        dinf: [],
        dref: [],
        esds: [],
        ftyp: [],
        hdlr: [],
        mdat: [],
        mdhd: [],
        mdia: [],
        mfhd: [],
        minf: [],
        moof: [],
        moov: [],
        mp4a: [],
        mvex: [],
        mvhd: [],
        sdtp: [],
        stbl: [],
        stco: [],
        stsc: [],
        stsd: [],
        stsz: [],
        stts: [],
        tfdt: [],
        tfhd: [],
        traf: [],
        trak: [],
        trun: [],
        trex: [],
        tkhd: [],
        vmhd: [],
        smhd: [],
        hev1: [],
        hvcC: [],
      };
      var o = function (e) {
          for (
            var t = 8, r = Array.prototype.slice.call(arguments, 1), a = 0;
            a < r.length;
            a++
          )
            t += r[a].byteLength;
          var i = new Uint8Array(t),
            n = 0;
          for (
            i[n++] = (t >>> 24) & 255,
              i[n++] = (t >>> 16) & 255,
              i[n++] = (t >>> 8) & 255,
              i[n++] = 255 & t,
              i.set(e, n),
              n += 4,
              a = 0;
            a < r.length;
            a++
          )
            i.set(r[a], n), (n += r[a].byteLength);
          return i;
        },
        s = function (e) {
          return o(
            t.mp4a,
            new Uint8Array([
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              (65280 & e.channelcount) >> 8,
              255 & e.channelcount,
              (65280 & e.samplesize) >> 8,
              255 & e.samplesize,
              0,
              0,
              0,
              0,
              (65280 & e.samplerate) >> 8,
              255 & e.samplerate,
              0,
              0,
            ]),
            (function (e) {
              var r = e.config,
                a = r.length,
                i = new Uint8Array(
                  [
                    0,
                    0,
                    0,
                    0,
                    3,
                    23 + a,
                    0,
                    1,
                    0,
                    4,
                    15 + a,
                    64,
                    21,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    5,
                  ]
                    .concat([a])
                    .concat(r)
                    .concat([6, 1, 2])
                );
              return o(t.esds, i);
            })(e)
          );
        },
        u = function (e) {
          return "audio" === e.type
            ? o(t.stsd, r.STSD_PREFIX, s(e))
            : o(
                t.stsd,
                r.STSD_PREFIX,
                (function (e) {
                  var r = e.sps || [],
                    n = e.pps || [],
                    s = [],
                    u = [],
                    f = [],
                    l = e.vps || [],
                    c = 0;
                  for (c = 0; c < l.length; c++)
                    f.push((65280 & l[c].byteLength) >>> 8),
                      f.push(255 & l[c].byteLength),
                      (f = f.concat(Array.prototype.slice.call(l[c])));
                  for (c = 0; c < r.length; c++)
                    s.push((65280 & r[c].byteLength) >>> 8),
                      s.push(255 & r[c].byteLength),
                      (s = s.concat(Array.prototype.slice.call(r[c])));
                  for (c = 0; c < n.length; c++)
                    u.push((65280 & n[c].byteLength) >>> 8),
                      u.push(255 & n[c].byteLength),
                      (u = u.concat(Array.prototype.slice.call(n[c])));
                  return a.commonOption.VIDEOENCODETYPE.H264 === i
                    ? o(
                        t.avc1,
                        new Uint8Array([
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          1,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          (65280 & e.width) >> 8,
                          255 & e.width,
                          (65280 & e.height) >> 8,
                          255 & e.height,
                          0,
                          72,
                          0,
                          0,
                          0,
                          72,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          1,
                          19,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          24,
                          17,
                          17,
                        ]),
                        o(
                          t.avcC,
                          new Uint8Array(
                            [
                              1,
                              e.profileIdc,
                              e.profileCompatibility,
                              e.levelIdc,
                              255,
                            ]
                              .concat([r.length])
                              .concat(s)
                              .concat([n.length])
                              .concat(u)
                          )
                        )
                      )
                    : a.commonOption.VIDEOENCODETYPE.H265 === i
                      ? o(
                          t.hev1,
                          new Uint8Array([
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            1,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            (65280 & e.width) >> 8,
                            255 & e.width,
                            (65280 & e.height) >> 8,
                            255 & e.height,
                            0,
                            72,
                            0,
                            0,
                            0,
                            72,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            1,
                            19,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            24,
                            17,
                            17,
                          ]),
                          o(
                            t.hvcC,
                            new Uint8Array(
                              [
                                1,
                                e.general_profile_flag,
                                (4278190080 &
                                  e.general_profile_compatibility_flags) >>>
                                  24,
                                (16711680 &
                                  e.general_profile_compatibility_flags) >>>
                                  16,
                                (65280 &
                                  e.general_profile_compatibility_flags) >>>
                                  8,
                                255 & e.general_profile_compatibility_flags,
                                (0xff0000000000 &
                                  e.general_constraint_indicator_flags) >>>
                                  40,
                                (0xff00000000 &
                                  e.general_constraint_indicator_flags) >>>
                                  32,
                                (4278190080 &
                                  e.general_constraint_indicator_flags) >>>
                                  24,
                                (16711680 &
                                  e.general_constraint_indicator_flags) >>>
                                  16,
                                (65280 &
                                  e.general_constraint_indicator_flags) >>>
                                  8,
                                255 & e.general_constraint_indicator_flags,
                                e.general_level_idc,
                                240,
                                0,
                                252,
                                252 | e.chroma_format_idc,
                                248 | e.bitDepthLumaMinus8,
                                248 | e.bitDepthChromaMinus8,
                                0,
                                0,
                                e.rate_layers_nested_length,
                                3,
                              ]
                                .concat([32, 0, 1])
                                .concat(f)
                                .concat([33, 0, 1])
                                .concat(s)
                                .concat([34, 0, 1])
                                .concat(u)
                            )
                          )
                        )
                      : void 0;
                })(e)
              );
        },
        f = function (e) {
          var a = null;
          return (
            (a = "audio" === e.type ? o(t.smhd, r.SMHD) : o(t.vmhd, r.VMHD)),
            o(
              t.minf,
              a,
              o(t.dinf, o(t.dref, r.DREF)),
              (function (e) {
                return o(
                  t.stbl,
                  u(e),
                  o(t.stts, r.STTS),
                  o(t.stsc, r.STSC),
                  o(t.stsz, r.STSZ),
                  o(t.stco, r.STCO)
                );
              })(e)
            )
          );
        },
        l = function (e) {
          return o(
            t.mdia,
            (function (e) {
              var r = e.timescale,
                a = e.duration;
              return o(
                t.mdhd,
                new Uint8Array([
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  (r >>> 24) & 255,
                  (r >>> 16) & 255,
                  (r >>> 8) & 255,
                  255 & r,
                  (a >>> 24) & 255,
                  (a >>> 16) & 255,
                  (a >>> 8) & 255,
                  255 & a,
                  85,
                  196,
                  0,
                  0,
                ])
              );
            })(e),
            (function (e) {
              var a = null;
              return (
                (a = "audio" === e.type ? r.HDLR_AUDIO : r.HDLR_VIDEO),
                o(t.hdlr, a)
              );
            })(e),
            f(e)
          );
        },
        c = function (e) {
          return o(
            t.trak,
            (function (e) {
              var r = e.id,
                a = e.duration,
                i = e.width,
                n = e.height;
              return o(
                t.tkhd,
                new Uint8Array([
                  0,
                  0,
                  0,
                  7,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  (r >>> 24) & 255,
                  (r >>> 16) & 255,
                  (r >>> 8) & 255,
                  255 & r,
                  0,
                  0,
                  0,
                  0,
                  (a >>> 24) & 255,
                  (a >>> 16) & 255,
                  (a >>> 8) & 255,
                  255 & a,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  64,
                  0,
                  0,
                  0,
                  (i >>> 8) & 255,
                  255 & i,
                  0,
                  0,
                  (n >>> 8) & 255,
                  255 & n,
                  0,
                  0,
                ])
              );
            })(e),
            l(e)
          );
        },
        p = function (e) {
          return o(
            t.mvex,
            (function (e) {
              var r = e.id,
                a = new Uint8Array([
                  0,
                  0,
                  0,
                  0,
                  (r >>> 24) & 255,
                  (r >>> 16) & 255,
                  (r >>> 8) & 255,
                  255 & r,
                  0,
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0,
                  1,
                ]);
              return o(t.trex, a);
            })(e)
          );
        },
        d = function (e) {
          var r,
            i,
            n =
              ((r = e.timescale),
              (i = e.duration),
              a.debug.log("mvhd:  timescale: " + r + "  duration: " + i),
              o(
                t.mvhd,
                new Uint8Array([
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  (r >>> 24) & 255,
                  (r >>> 16) & 255,
                  (r >>> 8) & 255,
                  255 & r,
                  (i >>> 24) & 255,
                  (i >>> 16) & 255,
                  (i >>> 8) & 255,
                  255 & i,
                  0,
                  1,
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  64,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  255,
                  255,
                  255,
                  255,
                ])
              )),
            s = c(e),
            u = p(e);
          return o(t.moov, n, s, u);
        },
        m = function (e, r) {
          return "audio" === e.type
            ? audioTrun(e, r)
            : (function (e, r) {
                var a,
                  i = null,
                  n = null,
                  s = 0,
                  u = r;
                if (null === (a = e.samples || [])[0].frameDuration)
                  for (
                    u += 24 + 4 * a.length, i = trunHeader(a, u), s = 0;
                    s < a.length;
                    s++
                  )
                    (n = a[s]),
                      (i = i.concat([
                        (4278190080 & n.size) >>> 24,
                        (16711680 & n.size) >>> 16,
                        (65280 & n.size) >>> 8,
                        255 & n.size,
                      ]));
                else
                  for (
                    i = (function (e, t) {
                      return [
                        0,
                        0,
                        3,
                        5,
                        (4278190080 & e.length) >>> 24,
                        (16711680 & e.length) >>> 16,
                        (65280 & e.length) >>> 8,
                        255 & e.length,
                        (4278190080 & t) >>> 24,
                        (16711680 & t) >>> 16,
                        (65280 & t) >>> 8,
                        255 & t,
                        0,
                        0,
                        0,
                        0,
                      ];
                    })(a, (u += 24 + 4 * a.length + 4 * a.length)),
                      s = 0;
                    s < a.length;
                    s++
                  )
                    (n = a[s]),
                      (i = i.concat([
                        (4278190080 & n.frameDuration) >>> 24,
                        (16711680 & n.frameDuration) >>> 16,
                        (65280 & n.frameDuration) >>> 8,
                        255 & n.frameDuration,
                        (4278190080 & n.size) >>> 24,
                        (16711680 & n.size) >>> 16,
                        (65280 & n.size) >>> 8,
                        255 & n.size,
                      ]));
                return o(t.trun, new Uint8Array(i));
              })(e, r);
        },
        _ = function (e, r) {
          return o(
            t.moof,
            (function (e) {
              var r = new Uint8Array([
                0,
                0,
                0,
                0,
                (e >>> 24) & 255,
                (e >>> 16) & 255,
                (e >>> 8) & 255,
                255 & e,
              ]);
              return o(t.mfhd, r);
            })(e),
            (function (e) {
              var r, a, i;
              return (
                (r = o(t.tfhd, new Uint8Array([0, 2, 0, 0, 0, 0, 0, 1]))),
                (a = o(
                  t.tfdt,
                  new Uint8Array([
                    0,
                    0,
                    0,
                    0,
                    (e.baseMediaDecodeTime >>> 24) & 255,
                    (e.baseMediaDecodeTime >>> 16) & 255,
                    (e.baseMediaDecodeTime >>> 8) & 255,
                    255 & e.baseMediaDecodeTime,
                  ])
                )),
                (i = m(e, 72)),
                o(t.traf, r, a, i)
              );
            })(r)
          );
        };
      return (
        (n.prototype = {
          initSegment: function (e) {
            var i = o(t.ftyp, r.FTYP);
            a.debug.log(e);
            var n = d(e),
              s = new Uint8Array(i.byteLength + n.byteLength);
            return s.set(i, 0), s.set(n, i.byteLength), s;
          },
          mediaSegment: function (e, r, a, i) {
            var n = _(e, r),
              s = (function (e) {
                return o(t.mdat, e);
              })(a),
              u = null;
            return (
              (u = new Uint8Array(n.byteLength + s.byteLength)).set(n),
              u.set(s, n.byteLength),
              u
            );
          },
        }),
        new n()
      );
    };
  },
  function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
    var a = function () {
      this.map = {};
    };
    a.prototype = {
      put: function (e, t) {
        this.map[e] = t;
      },
      get: function (e) {
        return this.map[e];
      },
      containsKey: function (e) {
        return e in this.map;
      },
      containsValue: function (e) {
        for (var t in this.map) if (this.map[t] === e) return !0;
        return !1;
      },
      isEmpty: function (e) {
        return 0 === this.size();
      },
      clear: function () {
        for (var e in this.map) delete this.map[e];
      },
      remove: function (e) {
        delete this.map[e];
      },
      keys: function () {
        var e = new Array();
        for (var t in this.map) e.push(t);
        return e;
      },
      values: function () {
        var e = new Array();
        for (var t in this.map) e.push(this.map[t]);
        return e;
      },
      size: function () {
        var e = 0;
        for (var t in this.map) e++;
        return e;
      },
    };
    t.default = a;
  },
  function (e, t, r) {
    "use strict";
    var a = r(1),
      i = a(r(6)),
      n = a(r(13)),
      o = a(r(15)),
      s = a(r(17)),
      u = r(0);
    importScripts("/module/libDecodeSDK.js"),
      addEventListener(
        "message",
        function (e) {
          var t = e.data;
          switch (((b = e.data.channelId), t.type)) {
            case "sdpInfo":
              (l = t.data),
                0,
                (function (e) {
                  (f = []), (m = !1);
                  for (var t = 0; t < e.sdpInfo.length; t++) {
                    if (
                      ((c = null),
                      (p = e.decodeMode),
                      "SVAC2" === e.sdpInfo[t].codecName ||
                        "H264" === e.sdpInfo[t].codecName ||
                        ("RAW" === e.sdpInfo[t].codecName &&
                          e.mp4Codec &&
                          "H264" === e.mp4Codec.VideoCodec))
                    )
                      null === h && (h = (0, i.default)()),
                        (c = h).init(e.decodeMode),
                        c.setFramerate(e.sdpInfo[t].Framerate),
                        c.setGovLength(e.govLength),
                        c.setCheckDelay(e.checkDelay),
                        c.setLessRate(e.lessRateCanvas);
                    else if (
                      "H265" === e.sdpInfo[t].codecName ||
                      ("RAW" === e.sdpInfo[t].codecName &&
                        e.mp4Codec &&
                        "H265" === e.mp4Codec.VideoCodec)
                    ) {
                      null === g && (g = (0, n.default)()), (c = g);
                      var r = {};
                      (r.h265AccelerationEnabled = e.h265AccelerationEnabled),
                        c.init(r),
                        c.setFramerate(e.sdpInfo[t].Framerate),
                        c.setGovLength(e.govLength),
                        c.setCheckDelay(e.checkDelay);
                    } else
                      "JPEG" === e.sdpInfo[t].codecName
                        ? (null === v && (v = (0, o.default)()),
                          (c = v).init(),
                          c.setFramerate(e.sdpInfo[t].Framerate))
                        : "stream-assist-frame" === e.sdpInfo[t].codecName &&
                          (u.debug.log(e.sdpInfo[t]),
                          null === y && (y = (0, s.default)()),
                          (c = y).init());
                    "undefined" !== typeof e.sdpInfo[t].Framerate &&
                      e.sdpInfo[t].Framerate,
                      null !== c &&
                        (c.setBufferfullCallback(D),
                        c.setReturnCallback(T),
                        (_ = e.sdpInfo[t].RtpInterlevedID),
                        (f[_] = c));
                  }
                })(l);
              break;
            case "MediaData":
              if (!0 === m) {
                !(function (e) {
                  (_ = e.data.rtspInterleave[1]),
                    "undefined" !== typeof f[_] &&
                      f[_].bufferingRtpData(
                        e.data.rtspInterleave,
                        e.data.header,
                        e.data.payload
                      );
                })(t);
                break;
              }
              (_ = t.data.rtspInterleave[1]),
                "undefined" !== typeof f[_] &&
                  f[_].parseRTPData(
                    t.data.rtspInterleave,
                    t.data.payload,
                    d,
                    S,
                    t.info,
                    t.channel
                  );
              break;
            case "initStartTime":
              f[_].initStartTime();
              break;
            case "end":
              w("end");
          }
        },
        !1
      ),
      (Module.onRuntimeInitialized = function () {
        Module._DECODE_Init(), w("WorkerReady");
      });
    var f = [],
      l = null,
      c = null,
      p = "",
      d = !1,
      m = !1,
      _ = -1,
      h = null,
      g = null,
      v = null,
      y = null,
      b = null,
      S = 1;
    function D() {
      f[_].findCurrent(), w("stepPlay", "BufferFull");
    }
    function T(e) {
      var t = null;
      if (null === e || "undefined" === typeof e) return (t = null), void null;
      if (
        ("undefined" !== typeof e.error
          ? (w("error", e.error), (t = e.decodedData))
          : ((t = e.decodedData),
            null !== e.decodeMode &&
              "undefined" !== typeof e.decodeMode &&
              ((p = e.decodeMode), w("setVideoTagMode", e.decodeMode))),
        null != e.decodeStart &&
          (w("DecodeStart", e.decodeStart), (p = e.decodeStart.decodeMode)),
        null !== t && "undefined" !== typeof t)
      )
        if (void 0 !== t.frameData && null !== t.frameData && "canvas" === p) {
          !0 === t.frameData.firstFrame &&
            w("firstFrame", t.frameData.firstFrame);
          var r = {
            bufferIdx: t.frameData.bufferIdx,
            width: t.frameData.width,
            height: t.frameData.height,
            codecType: t.frameData.codecType,
            frameType: t.frameData.frameType,
            timeStamp: null,
            frameIndex: t.frameData.frameIndex,
          };
          null !== t.timeStamp &&
            "undefined" !== typeof t.timeStamp &&
            (r.timeStamp = t.timeStamp),
            w("videoInfo", r),
            "undefined" !== typeof t.frameData.data &&
              null !== t.frameData.data &&
              w("canvasRender", t.frameData.data, t.frameData.option);
        } else if (null !== t.frameData && "video" === p) {
          null !== t.initSegmentData &&
            (w("codecInfo", t.codecInfo), w("initSegment", t.initSegmentData));
          r = {
            codecType: t.frameData.codecType,
            frameIndex: t.frameData.frameIndex,
          };
          "undefined" !== typeof t.frameData.width &&
            ((r.width = t.frameData.width), (r.height = t.frameData.height)),
            w("videoInfo", r),
            w("videoTimeStamp", t.timeStamp),
            t.frameData.length > 0 &&
              (w("mediaSample", t.mediaSample), w("videoRender", t.frameData));
        } else w("drop", e.decodedData);
      null != e.resolution && w("MSEResolutionChanged", e.resolution),
        null != e.ivsDraw && w("ivsDraw", e);
    }
    function w(e, t, r) {
      var a = { type: e, data: t, channelId: b, option: r };
      "canvasRender" === e ? postMessage(a, [t.buffer]) : postMessage(a);
    }
  },
  function (e, t, r) {
    "use strict";
    var a = r(1);
    Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
    var i = r(0),
      n = a(r(12)),
      o = a(r(3)),
      s = a(r(4));
    function u() {
      var e = 7,
        t = 7,
        r = 2,
        a = 3,
        i = 4,
        n = 5,
        o = 8,
        u = 16,
        f = 32,
        l = 255,
        c = 0,
        p = null;
      function d() {
        (c = 0), (p = new s.default());
      }
      function m(r, i) {
        var n = i,
          o = (c + n) >> a;
        return (n = (c + i) & e), (r[o] >> (t - (n & t))) & 1;
      }
      function _(e, t) {
        var r = c >> a,
          i = 8 * (r + 1) - c;
        if (i < 8)
          for (var n = 0; n < 3; n++) {
            var o = e[r + n];
            (o =
              0 == n
                ? (o >> i) << i
                : 2 == n
                  ? (o & (255 >> (8 - i))) | (1 << i)
                  : 0),
              e.set([o], r + n);
          }
        else e.set([0], r), e.set([1], r + 1);
      }
      function h(e, t) {
        var r = 0;
        if (1 === t) r = m(e, 0);
        else for (var a = 0; a < t; a++) r = (r << 1) + m(e, a);
        return (c += t), r;
      }
      function g(e, t) {
        for (var a = 0, i = 0, n = t; c + n < 8 * e.length && !m(e, n++); ) a++;
        if (0 === a) return (c += 1), 0;
        i = 1 << a;
        for (var o = a - 1; o >= 0; o--, n++) i |= m(e, n) << o;
        return (c += a * r + 1), i - 1;
      }
      function v(e, t) {
        var a = g(e, t);
        return 1 & a ? (a + 1) / r : -a / r;
      }
      function y(e) {
        p.put("cpb_cnt_minus1", g(e, 0)),
          p.put("bit_rate_scale", h(e, i)),
          p.put("cpb_size_scale", h(e, i));
        for (
          var t = p.get("cpb_cnt_minus1"),
            r = new Array(t),
            a = new Array(t),
            o = new Array(t),
            s = 0;
          s <= t;
          s++
        )
          (r[s] = g(e, 0)), (a[s] = g(e, 0)), (o[s] = h(e, 1));
        p.put("bit_rate_value_minus1", r),
          p.put("cpb_size_value_minus1", a),
          p.put("cbr_flag", o),
          p.put("initial_cpb_removal_delay_length_minus1", h(e, n)),
          p.put("cpb_removal_delay_length_minus1", h(e, n)),
          p.put("dpb_output_delay_length_minus1", h(e, n)),
          p.put("time_offset_length", h(e, n));
      }
      return (
        (d.prototype = {
          parse: function (e) {
            (c = 0),
              p.clear(),
              p.put("forbidden_zero_bit", h(e, 1)),
              p.put("nal_ref_idc", h(e, r)),
              p.put("nal_unit_type", h(e, n)),
              p.put("profile_idc", h(e, o)),
              p.put("profile_compatibility", h(e, o)),
              p.put("level_idc", h(e, o)),
              p.put("seq_parameter_set_id", g(e, 0));
            var t = p.get("profile_idc");
            if (
              (100 === t ||
                110 === t ||
                122 === t ||
                244 === t ||
                44 === t ||
                83 === t ||
                86 === t ||
                118 === t ||
                128 === t ||
                138 === t ||
                139 === t ||
                134 === t) &&
              (p.put("chroma_format_idc", g(e, 0)),
              p.get("chroma_format_idc") === a &&
                p.put("separate_colour_plane_flag", h(e, 1)),
              p.put("bit_depth_luma_minus8", g(e, 0)),
              p.put("bit_depth_chroma_minus8", g(e, 0)),
              p.put("qpprime_y_zero_transform_bypass_flag", h(e, 1)),
              p.put("seq_scaling_matrix_present_flag", h(e, 1)),
              p.get("seq_scaling_matrix_present_flag"))
            ) {
              for (
                var i = p.get("chroma_format_idc") !== a ? o : 12,
                  s = new Array(i),
                  d = 0;
                d < i;
                d++
              )
                if (((s[d] = h(e, 1)), s[d]))
                  for (var m = d < 6 ? u : 64, b = 8, S = 8, D = 0; D < m; D++)
                    S && (S = (b + v(e, 0) + 256) % 256), (b = 0 === S ? b : S);
              p.put("seq_scaling_list_present_flag", s);
            }
            if (
              (p.put("log2_max_frame_num_minus4", g(e, 0)),
              p.put("pic_order_cnt_type", g(e, 0)),
              0 === p.get("pic_order_cnt_type"))
            )
              p.put("log2_max_pic_order_cnt_lsb_minus4", g(e, 0));
            else if (1 === p.get("pic_order_cnt_type")) {
              p.put("delta_pic_order_always_zero_flag", h(e, 1)),
                p.put("offset_for_non_ref_pic", v(e, 0)),
                p.put("offset_for_top_to_bottom_field", v(e, 0)),
                p.put("num_ref_frames_in_pic_order_cnt_cycle", g(e, 0));
              for (
                var T = 0;
                T < p.get("num_ref_frames_in_pic_order_cnt_cycle");
                T++
              )
                p.put("num_ref_frames_in_pic_order_cnt_cycle", v(e, 0));
            }
            return (
              p.put("num_ref_frames", g(e, 0)),
              p.put("gaps_in_frame_num_value_allowed_flag", h(e, 1)),
              p.put("pic_width_in_mbs_minus1", g(e, 0)),
              p.put("pic_height_in_map_units_minus1", g(e, 0)),
              p.put("frame_mbs_only_flag", h(e, 1)),
              0 === p.get("frame_mbs_only_flag") &&
                p.put("mb_adaptive_frame_field_flag", h(e, 1)),
              p.put("direct_8x8_interence_flag", h(e, 1)),
              p.put("frame_cropping_flag", h(e, 1)),
              1 === p.get("frame_cropping_flag") &&
                (p.put("frame_cropping_rect_left_offset", g(e, 0)),
                p.put("frame_cropping_rect_right_offset", g(e, 0)),
                p.put("frame_cropping_rect_top_offset", g(e, 0)),
                p.put("frame_cropping_rect_bottom_offset", g(e, 0))),
              p.put("vui_parameters_present_flag", h(e, 1)),
              p.get("vui_parameters_present_flag") &&
                (function (e) {
                  p.put("aspect_ratio_info_present_flag", h(e, 1)),
                    p.get("aspect_ratio_info_present_flag") &&
                      (p.put("aspect_ratio_idc", h(e, o)),
                      p.get("aspect_ratio_idc") === l &&
                        (_(e),
                        p.put("sar_width", h(e, u)),
                        _(e),
                        p.put("sar_height", h(e, u)))),
                    p.put("overscan_info_present_flag", h(e, 1)),
                    p.get("overscan_info_present_flag") &&
                      p.put("overscan_appropriate_flag", h(e, 1)),
                    p.put("video_signal_type_present_flag", h(e, 1)),
                    p.get("video_signal_type_present_flag") &&
                      (p.put("video_format", h(e, a)),
                      p.put("video_full_range_flag", h(e, 1)),
                      p.put("colour_description_present_flag", h(e, 1)),
                      p.get("colour_description_present_flag") &&
                        (p.put("colour_primaries", h(e, o)),
                        p.put("transfer_characteristics", h(e, o)),
                        p.put("matrix_coefficients", h(e, o)))),
                    p.put("chroma_loc_info_present_flag", h(e, 1)),
                    p.get("chroma_loc_info_present_flag") &&
                      (p.put("chroma_sample_loc_type_top_field", g(e, 0)),
                      p.put("chroma_sample_loc_type_bottom_field", g(e, 0))),
                    p.put("timing_info_present_flag", h(e, 1)),
                    p.get("timing_info_present_flag") &&
                      (p.put("num_units_in_tick", h(e, f)),
                      p.put("time_scale", h(e, f)),
                      p.put("fixed_frame_rate_flag", h(e, 1))),
                    p.put("nal_hrd_parameters_present_flag", h(e, 1)),
                    p.get("nal_hrd_parameters_present_flag") && y(e),
                    p.put("vcl_hrd_parameters_present_flag", h(e, 1)),
                    p.get("vcl_hrd_parameters_present_flag") && y(e),
                    (p.get("nal_hrd_parameters_present_flag") ||
                      p.get("vcl_hrd_parameters_present_flag")) &&
                      p.put("low_delay_hrd_flag", h(e, 1)),
                    p.put("pic_struct_present_flag", h(e, 1)),
                    p.put("bitstream_restriction_flag", h(e, 1)),
                    p.get("bitstream_restriction_flag") &&
                      (p.put(
                        "motion_vectors_over_pic_boundaries_flag",
                        h(e, 1)
                      ),
                      p.put("max_bytes_per_pic_denom", g(e, 0)),
                      p.put("max_bits_per_mb_denom", g(e, 0)));
                })(e),
              !0
            );
          },
          getSizeInfo: function () {
            var e = 0,
              t = 0;
            0 === p.get("chroma_format_idc")
              ? (e = t = 0)
              : 1 === p.get("chroma_format_idc")
                ? (e = t = r)
                : p.get("chroma_format_idc") === r
                  ? ((e = r), (t = 1))
                  : p.get("chroma_format_idc") === a &&
                    (0 === p.get("separate_colour_plane_flag")
                      ? (e = t = 1)
                      : 1 === p.get("separate_colour_plane_flag") &&
                        (e = t = 0));
            var i = p.get("pic_width_in_mbs_minus1") + 1,
              n = p.get("pic_height_in_map_units_minus1") + 1,
              o = (r - p.get("frame_mbs_only_flag")) * n,
              s = 0,
              f = 0,
              l = 0,
              c = 0;
            1 === p.get("frame_cropping_flag") &&
              ((s = p.get("frame_cropping_rect_left_offset")),
              (f = p.get("frame_cropping_rect_right_offset")),
              (l = p.get("frame_cropping_rect_top_offset")),
              (c = p.get("frame_cropping_rect_bottom_offset")));
            var d = i * u * (o * u);
            return {
              width: i * u - e * (s + f),
              height: o * u - t * (r - p.get("frame_mbs_only_flag")) * (l + c),
              decodeSize: d,
            };
          },
          getSpsValue: function (e) {
            return p.get(e);
          },
          getCodecInfo: function () {
            var e = 'video/mp4;codecs="avc1.';
            return (e =
              e +
              p.get("profile_idc").toString(u) +
              (p.get("profile_compatibility") < 15
                ? "0" + p.get("profile_compatibility").toString(u)
                : p.get("profile_compatibility").toString(u)) +
              p.get("level_idc").toString(u) +
              '"');
          },
        }),
        new d()
      );
    }
    t.default = function () {
      var e = 0,
        t = 0,
        r = !1,
        a =
          (new Uint8Array(1048576),
          new Uint8Array(["0x00", "0x00", "0x00", "0x01"]),
          new u()),
        s = 0,
        f = null,
        l = null,
        c = 0,
        p = !1,
        d = {
          frameData: null,
          timeStamp: null,
          initSegmentData: null,
          mediaSample: null,
          dropPercent: 0,
          dropCount: 0,
          codecInfo: "",
          playback: !1,
        },
        m = { timestamp: null, timezone: null },
        _ = {},
        h = null,
        g = null,
        v = !1,
        y = !1,
        b = 0,
        S = 0,
        D = 0,
        T = !0,
        w = 0,
        E = !1,
        C = 0,
        M = null,
        I = null,
        A = "",
        x = null,
        k = 0,
        O = 0,
        F = { width: 0, height: 0 },
        P = null,
        L = !1,
        U = null,
        R = { SVAC2: 15 };
      function B(e) {
        e !== A &&
          ("video" === e
            ? (A = "video")
            : ((A = "canvas"), (p = !0), (d.frameData.firstFrame = !0)));
      }
      function z(e, t, r, a) {
        var i = "";
        return (
          e * t > 921600 && !1 === r && a.encode_type !== R.SVAC2
            ? ((i = "video"), L && k > 0 && k <= 3 && (i = "canvas"))
            : (i = "canvas"),
          i
        );
      }
      function N() {
        (this.decoder = new n.default()),
          (this.firstDiffTime = 0),
          (this.firstTime = 0),
          (this.lastMSW = 0);
      }
      return (
        (N.prototype = {
          setReturnCallback: function (e) {
            this.rtpReturnCallback = e;
          },
          setBufferfullCallback: function (e) {
            null !== this.videoBufferList &&
              this.videoBufferList.setBufferFullCallback(e);
          },
          getVideoBuffer: function (e) {
            if (null !== this.videoBufferList)
              return this.videoBufferList.searchNodeAt(e);
          },
          clearBuffer: function () {
            null !== this.videoBufferList && this.videoBufferList.clear();
          },
          findCurrent: function () {
            null !== this.videoBufferList &&
              this.videoBufferList.searchTimestamp(this.getTimeStamp());
          },
          setTimeStamp: function (e) {
            this.timeData = e;
          },
          getTimeStamp: function () {
            return this.timeData;
          },
          ntohl: function (e) {
            return ((e[0] << 24) + (e[1] << 16) + (e[2] << 8) + e[3]) >>> 0;
          },
          appendBuffer: function (e, t, r) {
            if (r + t.length >= e.length) {
              var a = new Uint8Array(e.length + 1048576);
              a.set(e, 0), (e = a);
            }
            return e.set(t, r), e;
          },
          getFramerate: function () {
            return k;
          },
          setGovLength: function (e) {
            x = e;
          },
          getGovLength: function () {
            return x;
          },
          setDecodingTime: function (e) {
            this.decodingTime = e;
          },
          getDropPercent: function () {
            return 0;
          },
          getDropCount: function () {
            return 0;
          },
          initStartTime: function () {
            (this.firstDiffTime = 0), (this.calcGov = 0);
          },
          setCheckDelay: function (e) {
            this.checkDelay = e;
          },
          init: function (e) {
            (v = !1),
              (r = !1),
              (A = e),
              this.decoder.setIsFirstFrame(!1),
              (this.videoBufferList = new i.VideoBufferList()),
              (this.firstDiffTime = 0),
              (this.checkDelay = !0),
              (this.timeData = null);
          },
          setFramerate: function (e) {
            0 < e &&
              "undefined" !== typeof e &&
              ((k = e),
              null !== this.videoBufferList &&
                (this.videoBufferList.setMaxLength(6 * k),
                this.videoBufferList.setBUFFERING(4 * k)));
          },
          parseRTPData: function (n, u, x, k, L) {
            var N,
              V = null,
              j = {},
              H = ((u[19] << 24) + (u[18] << 16) + (u[17] << 8) + u[16]) >>> 0;
            N = H >> 26 === 0 ? "2000" : "20" + (H >> 26);
            var W =
              Date.UTC(
                N,
                ((H >> 22) & 15) - 1,
                (H >> 17) & 31,
                (H >> 12) & 31,
                (H >> 6) & 63,
                63 & H
              ) / 1e3;
            if (
              (L.timeStampmsw,
              (W += (new Date().getTimezoneOffset() / 60) * 3600),
              A ||
                253 !== u[4] ||
                ((P = 0 !== u[5]), (A = z(L.width, L.height, P, L))),
              "" !== A)
            ) {
              if (0 == this.firstTime)
                (this.firstTime = W),
                  (this.lastMSW = 0),
                  (I = (u[21] << 8) + u[20]),
                  (m = { timestamp: this.firstTime, timestamp_usec: 0 });
              else {
                var G,
                  X = (u[21] << 8) + u[20];
                (G = X > I ? X - I : X + 65535 - I),
                  (this.lastMSW += G),
                  W > this.firstTime && (this.lastMSW -= 1e3),
                  (this.firstTime = W),
                  (m = { timestamp: W, timestamp_usec: this.lastMSW }),
                  (I = X);
              }
              (0 !== this.getFramerate() &&
                "undefined" !== typeof this.getFramerate()) ||
                "undefined" === typeof this.getTimeStamp() ||
                (this.setFramerate(
                  Math.round(
                    1e3 /
                      ((m.timestamp - this.getTimeStamp().timestamp === 0
                        ? 0
                        : 1e3) +
                        (m.timestamp_usec - this.getTimeStamp().timestamp_usec))
                  )
                ),
                i.debug.log(
                  "setFramerate" +
                    Math.round(
                      1e3 /
                        ((m.timestamp - this.getTimeStamp().timestamp === 0
                          ? 0
                          : 1e3) +
                          (m.timestamp_usec -
                            this.getTimeStamp().timestamp_usec))
                    )
                )),
                this.setTimeStamp(m);
              for (
                var q = u[22],
                  Y = u.subarray(24 + q, u.length - 8),
                  J = u.subarray(u.length - 8, u.length),
                  K = (J[7], J[6], J[5], J[4], []),
                  Z = 0;
                Z <= Y.length;

              )
                if (0 == Y[Z])
                  if (0 == Y[Z + 1])
                    if (1 == Y[Z + 2]) {
                      if (
                        (K.push(Z), 5 == (31 & Y[(Z += 3)]) || 1 == (31 & Y[Z]))
                      )
                        break;
                    } else 0 == Y[Z + 2] ? Z++ : (Z += 3);
                  else Z += 2;
                else Z += 1;
              var Q = "P";
              e = (u[21] << 8) + u[20];
              var $ = 0;
              if (L.encode_type === R.SVAC2) {
                var ee = {};
                (ee.width = L.width),
                  (ee.height = L.height),
                  (D = L.width),
                  (w = L.height),
                  (s = ee.width * L.height),
                  (Q = L.IPFrame),
                  !0 === T &&
                    ((j.decodeStart = ee),
                    (j.decodeStart.decodeMode = "canvas"),
                    (j.decodeStart.encodeMode = "h264")),
                  (T = !1);
              } else
                for (Z = 0; Z < K.length; Z++)
                  switch (
                    ((V = Y.subarray(K[Z] + 3, K[Z + 1])), 31 & Y[K[Z] + 3])
                  ) {
                    default:
                      break;
                    case 1:
                      (Q = "P"), ($ = K[Z] - 1);
                      break;
                    case 5:
                      (Q = "I"), ($ = K[Z] - 1);
                      break;
                    case 28:
                      break;
                    case 7:
                      a.parse(V);
                      var te = L;
                      (s = a.getSizeInfo().decodeSize),
                        (null !== f &&
                          null !== l &&
                          f.width === te.width &&
                          f.height === te.height &&
                          l === a.getCodecInfo()) ||
                          ((v = !1),
                          (f = te),
                          (l = a.getCodecInfo()),
                          this.decoder.setIsFirstFrame(!1)),
                        (D = b = te.width),
                        (w = S = te.height),
                        (h = V),
                        (F.width == te.width && F.height == te.height) ||
                          (0 != F.width
                            ? ((F.width = te.width),
                              (F.height = te.height),
                              (j.resolution = F),
                              (j.resolution.decodeMode = z(
                                F.width,
                                F.height,
                                P
                              )),
                              (j.resolution.encodeMode = "h264"))
                            : ((F.width = te.width),
                              (F.height = te.height),
                              (j.decodeStart = F),
                              (j.decodeStart.decodeMode = A),
                              (j.decodeStart.encodeMode = "h264")));
                      break;
                    case 8:
                      g = V;
                      break;
                    case 6:
                    case 9:
                  }
              if (
                (x &&
                  !1 === p &&
                  ((j.backupData = {
                    stream: new Uint8Array(Y),
                    frameType: Q,
                    width: D,
                    height: w,
                    codecType: "h264",
                  }),
                  null !== m.timestamp && "undefined" !== typeof m.timestamp
                    ? (j.backupData.timestamp_usec = m.timestamp_usec)
                    : (j.backupData.timestamp = (e / 90).toFixed(0))),
                "canvas" === A)
              ) {
                var re = 1e3 * m.timestamp + m.timestamp_usec;
                if (
                  (0 == this.firstDiffTime
                    ? ((c = 0),
                      (this.firstDiffTime = Date.now() - re),
                      i.debug.log("firstDiff: " + O))
                    : (re - M < 0 &&
                        (this.firstDiffTime = c + (Date.now() - re).toFixed(0)),
                      (c = Date.now() - re - this.firstDiffTime) < 0 &&
                        ((this.firstDiffTime = 0), (c = 0)),
                      c > 8e3 &&
                        ((j.error = { errorCode: i.PLAYER_STATE_CODE.TIMEOUT }),
                        this.rtpReturnCallback(j))),
                  (M = re),
                  t !== s &&
                    (this.decoder.free(),
                    (t = s),
                    this.decoder.setOutputSize(t)),
                  L.encode_type !== R.SVAC2)
                ) {
                  if (!0 === p && "P" === Q) return;
                  !0 === p && (p = !1);
                }
                (d.frameData = null),
                  (!0 === x && !0 === r) ||
                    (d.frameData = this.decoder.decode(u)),
                  (d.timeStamp = null),
                  (m = null === m.timestamp ? this.getTimeStamp() : m),
                  (d.timeStamp = m);
              } else {
                var ae = null;
                if (
                  (v
                    ? (d.initSegmentData = null)
                    : ((v = !0),
                      (L = {
                        id: 1,
                        width: b,
                        height: S,
                        type: "video",
                        profileIdc: a.getSpsValue("profile_idc"),
                        profileCompatibility: 0,
                        levelIdc: a.getSpsValue("level_idc"),
                        sps: [h],
                        pps: [g],
                        timescale: 1e3,
                        fps: this.getFramerate(),
                      }),
                      i.debug.log(JSON.stringify(L)),
                      null == U &&
                        (U = new o.default(
                          i.commonOption.VIDEOENCODETYPE.H264
                        )),
                      (d.initSegmentData = U.initSegment(L)),
                      (d.codecInfo = a.getCodecInfo())),
                  $ || i.debug.log("11111111111111111111111111111111111111111"),
                  "I" === Q)
                ) {
                  var ie = $;
                  ae = Y.subarray(ie, Y.length);
                } else ae = Y.subarray($, Y.length);
                var ne = ae.length - 4;
                (ae[0] = (4278190080 & ne) >>> 24),
                  (ae[1] = (16711680 & ne) >>> 16),
                  (ae[2] = (65280 & ne) >>> 8),
                  (ae[3] = 255 & ne);
                var oe = this.getFramerate(),
                  se = {
                    duration: Math.round((1 / oe) * 1e3),
                    size: ae.length,
                    frame_time_stamp: null,
                    frameDuration: null,
                  };
                if (r)
                  (se.frame_time_stamp = e),
                    (d.frameData = new Uint8Array(ae)),
                    (d.mediaSample = se);
                else {
                  if (!1 === x) {
                    if (
                      ((se.frame_time_stamp =
                        1e3 * m.timestamp + m.timestamp_usec - O),
                      !1 === y)
                    )
                      (se.frame_time_stamp = 0),
                        (O = 1e3 * m.timestamp + m.timestamp_usec),
                        (se.frameDuration = 0),
                        (_ = se),
                        (y = !0);
                    else {
                      var ue = _.frame_time_stamp,
                        fe = se.frame_time_stamp;
                      (se.frameDuration = Math.abs(fe - ue)),
                        se.frameDuration > 3e3 && (se.frameDuration = 0),
                        (_ = se);
                    }
                    (d.frameData = new Uint8Array(ae)), (d.mediaSample = se);
                  }
                  (m = null === m.timestamp ? this.getTimeStamp() : m),
                    (d.timeStamp = m);
                }
              }
              var le = D * w;
              if (
                (!0 === r &&
                  (NaN.toFixed(0),
                  le > 786432
                    ? (B("video"), (j.decodeMode = "video"))
                    : (B("canvas"), (j.decodeMode = "canvas"))),
                (d.playback = r),
                (d.frameData.frameIndex = L.frameIndex),
                (j.decodedData = d),
                !0 === E)
              )
                return (
                  "I" === Q && C++,
                  2 === C && ((C = 0), (E = !1)),
                  void i.debug.info("H264Session::stop")
                );
              this.rtpReturnCallback(j);
            }
          },
          findIFrame: function () {
            if (null !== this.videoBufferList) {
              var e = this.videoBufferList.findIFrame();
              if (null === e || "undefined" === typeof e) return !1;
              var t = {};
              return (
                this.setTimeStamp(e.timeStamp),
                (t.frameData = this.decoder.decode(e.buffer)),
                (t.timeStamp = e.timeStamp),
                t
              );
            }
          },
          setInitSegment: function () {
            (v = !1), (f = null), (l = null);
          },
          setLessRate: function (e) {
            L = e;
          },
        }),
        new N()
      );
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
    var a = r(9);
    function i(e, t) {
      for (var r = 0; r < t.length; r++) {
        var i = t[r];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          "value" in i && (i.writable = !0),
          Object.defineProperty(e, a(i.key), i);
      }
    }
    (e.exports = function (e, t, r) {
      return (
        t && i(e.prototype, t),
        r && i(e, r),
        Object.defineProperty(e, "prototype", { writable: !1 }),
        e
      );
    }),
      (e.exports.__esModule = !0),
      (e.exports.default = e.exports);
  },
  function (e, t, r) {
    var a = r(2).default,
      i = r(10);
    (e.exports = function (e) {
      var t = i(e, "string");
      return "symbol" == a(t) ? t : t + "";
    }),
      (e.exports.__esModule = !0),
      (e.exports.default = e.exports);
  },
  function (e, t, r) {
    var a = r(2).default;
    (e.exports = function (e, t) {
      if ("object" != a(e) || !e) return e;
      var r = e[Symbol.toPrimitive];
      if (void 0 !== r) {
        var i = r.call(e, t || "default");
        if ("object" != a(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t ? String : Number)(e);
    }),
      (e.exports.__esModule = !0),
      (e.exports.default = e.exports);
  },
  function (e, t, r) {
    "use strict";
    var a = r(1);
    Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
    var i = a(r(2));
    if ("undefined" == typeof n) var n = {};
    n.MD5 = function (e) {
      function t(e) {
        var t = (e >>> 0).toString(16);
        return "00000000".substr(0, 8 - t.length) + t;
      }
      function r(e, t, r) {
        return (e & t) | (~e & r);
      }
      function a(e, t, r) {
        return (r & e) | (~r & t);
      }
      function n(e, t, r) {
        return e ^ t ^ r;
      }
      function o(e, t, r) {
        return t ^ (e | ~r);
      }
      function s(e, t) {
        return (e[t + 3] << 24) | (e[t + 2] << 16) | (e[t + 1] << 8) | e[t];
      }
      function u(e) {
        for (var t = [], r = 0; r < e.length; r++)
          if (e.charCodeAt(r) <= 127) t.push(e.charCodeAt(r));
          else
            for (
              var a = encodeURIComponent(e.charAt(r)).substr(1).split("%"),
                i = 0;
              i < a.length;
              i++
            )
              t.push(parseInt(a[i], 16));
        return t;
      }
      function f(e) {
        for (var t = new Array(e.length), r = 0; r < e.length; r++) t[r] = e[r];
        return t;
      }
      var l = null,
        c = null;
      function p(e, t) {
        return 4294967295 & (e + t);
      }
      return (
        "string" == typeof e
          ? (l = u(e))
          : e.constructor == Array
            ? 0 === e.length
              ? (l = e)
              : "string" == typeof e[0]
                ? (l = (function (e) {
                    for (var t = [], r = 0; r < e.length; r++)
                      t = t.concat(u(e[r]));
                    return t;
                  })(e))
                : "number" == typeof e[0]
                  ? (l = e)
                  : (c = (0, i.default)(e[0]))
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
                    : (c = (0, i.default)(e))
              : (c = (0, i.default)(e)),
        c && alert("MD5 type mismatch, cannot process " + c),
        (function () {
          function e(e, t, r, a) {
            var i,
              n,
              o = y;
            (y = v),
              (v = g),
              (g = p(
                g,
                (((i = p(h, p(e, p(t, r)))) << (n = a)) & 4294967295) |
                  (i >>> (32 - n))
              )),
              (h = o);
          }
          var i = l.length;
          l.push(128);
          var u = l.length % 64;
          if (u > 56) {
            for (var f = 0; f < 64 - u; f++) l.push(0);
            u = l.length % 64;
          }
          for (f = 0; f < 56 - u; f++) l.push(0);
          l = l.concat(
            (function (e) {
              for (var t = [], r = 0; r < 8; r++) t.push(255 & e), (e >>>= 8);
              return t;
            })(8 * i)
          );
          var c = 1732584193,
            d = 4023233417,
            m = 2562383102,
            _ = 271733878,
            h = 0,
            g = 0,
            v = 0,
            y = 0;
          for (f = 0; f < l.length / 64; f++) {
            h = c;
            var b = 64 * f;
            e(r((g = d), (v = m), (y = _)), 3614090360, s(l, b), 7),
              e(r(g, v, y), 3905402710, s(l, b + 4), 12),
              e(r(g, v, y), 606105819, s(l, b + 8), 17),
              e(r(g, v, y), 3250441966, s(l, b + 12), 22),
              e(r(g, v, y), 4118548399, s(l, b + 16), 7),
              e(r(g, v, y), 1200080426, s(l, b + 20), 12),
              e(r(g, v, y), 2821735955, s(l, b + 24), 17),
              e(r(g, v, y), 4249261313, s(l, b + 28), 22),
              e(r(g, v, y), 1770035416, s(l, b + 32), 7),
              e(r(g, v, y), 2336552879, s(l, b + 36), 12),
              e(r(g, v, y), 4294925233, s(l, b + 40), 17),
              e(r(g, v, y), 2304563134, s(l, b + 44), 22),
              e(r(g, v, y), 1804603682, s(l, b + 48), 7),
              e(r(g, v, y), 4254626195, s(l, b + 52), 12),
              e(r(g, v, y), 2792965006, s(l, b + 56), 17),
              e(r(g, v, y), 1236535329, s(l, b + 60), 22),
              e(a(g, v, y), 4129170786, s(l, b + 4), 5),
              e(a(g, v, y), 3225465664, s(l, b + 24), 9),
              e(a(g, v, y), 643717713, s(l, b + 44), 14),
              e(a(g, v, y), 3921069994, s(l, b), 20),
              e(a(g, v, y), 3593408605, s(l, b + 20), 5),
              e(a(g, v, y), 38016083, s(l, b + 40), 9),
              e(a(g, v, y), 3634488961, s(l, b + 60), 14),
              e(a(g, v, y), 3889429448, s(l, b + 16), 20),
              e(a(g, v, y), 568446438, s(l, b + 36), 5),
              e(a(g, v, y), 3275163606, s(l, b + 56), 9),
              e(a(g, v, y), 4107603335, s(l, b + 12), 14),
              e(a(g, v, y), 1163531501, s(l, b + 32), 20),
              e(a(g, v, y), 2850285829, s(l, b + 52), 5),
              e(a(g, v, y), 4243563512, s(l, b + 8), 9),
              e(a(g, v, y), 1735328473, s(l, b + 28), 14),
              e(a(g, v, y), 2368359562, s(l, b + 48), 20),
              e(n(g, v, y), 4294588738, s(l, b + 20), 4),
              e(n(g, v, y), 2272392833, s(l, b + 32), 11),
              e(n(g, v, y), 1839030562, s(l, b + 44), 16),
              e(n(g, v, y), 4259657740, s(l, b + 56), 23),
              e(n(g, v, y), 2763975236, s(l, b + 4), 4),
              e(n(g, v, y), 1272893353, s(l, b + 16), 11),
              e(n(g, v, y), 4139469664, s(l, b + 28), 16),
              e(n(g, v, y), 3200236656, s(l, b + 40), 23),
              e(n(g, v, y), 681279174, s(l, b + 52), 4),
              e(n(g, v, y), 3936430074, s(l, b), 11),
              e(n(g, v, y), 3572445317, s(l, b + 12), 16),
              e(n(g, v, y), 76029189, s(l, b + 24), 23),
              e(n(g, v, y), 3654602809, s(l, b + 36), 4),
              e(n(g, v, y), 3873151461, s(l, b + 48), 11),
              e(n(g, v, y), 530742520, s(l, b + 60), 16),
              e(n(g, v, y), 3299628645, s(l, b + 8), 23),
              e(o(g, v, y), 4096336452, s(l, b), 6),
              e(o(g, v, y), 1126891415, s(l, b + 28), 10),
              e(o(g, v, y), 2878612391, s(l, b + 56), 15),
              e(o(g, v, y), 4237533241, s(l, b + 20), 21),
              e(o(g, v, y), 1700485571, s(l, b + 48), 6),
              e(o(g, v, y), 2399980690, s(l, b + 12), 10),
              e(o(g, v, y), 4293915773, s(l, b + 40), 15),
              e(o(g, v, y), 2240044497, s(l, b + 4), 21),
              e(o(g, v, y), 1873313359, s(l, b + 32), 6),
              e(o(g, v, y), 4264355552, s(l, b + 60), 10),
              e(o(g, v, y), 2734768916, s(l, b + 24), 15),
              e(o(g, v, y), 1309151649, s(l, b + 52), 21),
              e(o(g, v, y), 4149444226, s(l, b + 16), 6),
              e(o(g, v, y), 3174756917, s(l, b + 44), 10),
              e(o(g, v, y), 718787259, s(l, b + 8), 15),
              e(o(g, v, y), 3951481745, s(l, b + 36), 21),
              (c = p(c, h)),
              (d = p(d, g)),
              (m = p(m, v)),
              (_ = p(_, y));
          }
          return (function (e, r, a, i) {
            for (var n = "", o = 0, s = 0, u = 3; u >= 0; u--)
              (o = 255 & (s = arguments[u])),
                (o <<= 8),
                (o |= 255 & (s >>>= 8)),
                (o <<= 8),
                (o |= 255 & (s >>>= 8)),
                (o <<= 8),
                (n += t((o |= s >>>= 8)));
            return n;
          })(_, m, d, c).toUpperCase();
        })()
      );
    };
    t.default = function (e) {
      return n.MD5(e);
    };
  },
  function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
    var a = r(0);
    t.default = function () {
      var e,
        t,
        r,
        i,
        n,
        o,
        s,
        u,
        f,
        l,
        c,
        p,
        d,
        m,
        _,
        h = !1,
        g = 0;
      function v() {
        v.prototype.setIsFirstFrame(!1);
      }
      return (
        (v.prototype = {
          init: function () {
            a.debug.log("H264 Decoder init");
          },
          setOutputSize: function (e) {
            if (n !== 2 * e) {
              n = 2 * e;
              var t = Module._malloc(1),
                r = new Uint8Array(Module.HEAPU8.buffer, t, 1);
              Module._DECODE_GetFreePort(r.byteOffset),
                (g = r[0]),
                (r = null),
                Module._free(t),
                Module._DECODE_Init(g),
                (o = Module._malloc(5242880)),
                (s = new Uint8Array(Module.HEAPU8.buffer, o, 5242880));
              var a = 2 * e;
              (u = Module._malloc(a)),
                (f = new Uint8Array(Module.HEAPU8.buffer, u, a)),
                (l = Module._malloc(4)),
                (c = new Uint8Array(Module.HEAPU8.buffer, l, 4)),
                (p = Module._malloc(40)),
                (d = new Uint8Array(Module.HEAPU8.buffer, p, 40));
            }
          },
          decode: function (a, n) {
            var o = a[4],
              u = a[5];
            (e = Date.now()),
              s.set(a),
              Module._DECODE_InputOneFrame(
                g,
                s.byteOffset,
                a.length,
                f.byteOffset,
                c.byteOffset,
                d.byteOffset
              ),
              (i = d[16] + (d[17] << 8)),
              (r = d[18] + (d[19] << 8));
            var l = (i * r * 3) / 2;
            return (
              (_ = null),
              (m = null),
              (_ = new ArrayBuffer(l)),
              (m = new Uint8Array(_)).set(
                Module.HEAPU8.subarray(f.byteOffset, f.byteOffset + l)
              ),
              (t = Date.now() - e),
              v.prototype.isFirstFrame()
                ? i > 0 && r > 0
                  ? ((e = Date.now()),
                    {
                      data: m,
                      option: {
                        ylen: i,
                        height: r,
                        mediaType: o,
                        subMediaType: u,
                        beforeDecoding: e,
                      },
                      width: i,
                      height: r,
                      codecType: "h264",
                      decodingTime: t,
                      frameType: n,
                    })
                  : void 0
                : (v.prototype.setIsFirstFrame(!0), { firstFrame: !0 })
            );
          },
          setIsFirstFrame: function (e) {
            h = e;
          },
          isFirstFrame: function () {
            return h;
          },
          free: function () {
            Module._DECODE_Stop(g),
              (s = null),
              Module._free(o),
              (f = null),
              Module._free(u),
              (c = null),
              Module._free(l),
              (d = null),
              Module._free(p),
              (_ = null),
              (m = null);
          },
        }),
        new v()
      );
    };
  },
  function (e, t, r) {
    "use strict";
    var a = r(1);
    Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
    var i = r(0),
      n = a(r(14)),
      o = a(r(3)),
      s = a(r(4));
    function u() {
      var e = null,
        t = null,
        r = 0,
        a = 0,
        i = 0,
        n = 0,
        o = 0;
      function u() {
        0, (e = new s.default());
      }
      function f() {
        return (
          0 == i &&
            ((n = (function () {
              if (a >= r) return 0;
              var e = t[a++];
              return (
                0 == e
                  ? (o++, a < r && 2 == o && 3 == t[a] && (a++, (o = 0)))
                  : (o = 0),
                e
              );
            })()),
            (i = 8)),
          (n >> --i) & 1
        );
      }
      function l(e, t) {
        for (var r = 0; t > 0; ) (r <<= 1), (r |= f()), t--;
        return r;
      }
      function c(e, t) {
        for (var i = 0; a < r && 0 == f(); ) i++;
        return l(0, i) + ((1 << i) - 1);
      }
      return (
        (u.prototype = {
          parse: function (t) {
            t,
              0,
              e.clear(),
              e.put("forbidden_zero_bit", l(0, 1)),
              e.put("nal_unit_type", l(0, 6)),
              e.put("nuh_layer_id", l(0, 6)),
              e.put("nuh_temporal_id_plus1", l(0, 3)),
              e.put("sps_video_parameter_set_id", l(0, 4)),
              0 === e.get("nuh_layer_id")
                ? e.put("sps_max_sub_layers_minus1", l(0, 3))
                : e.put("sps_ext_or_max_sub_layers_minus1", l(0, 3));
            var r =
              0 !== e.get("nuh_layer_id") &&
              7 === e.get("sps_ext_or_max_sub_layers_minus1");
            return (
              r ||
                (e.put("sps_max_sub_layers_minus1", l(0, 1)),
                (function (t, r) {
                  if (t) {
                    e.put("general_profile_space", l(0, 2)),
                      e.put("general_tier_flag", l(0, 1)),
                      e.put("general_profile_idc", l(0, 5));
                    for (var a = new Array(32), i = 0; i < 32; i++)
                      a[i] = l(0, 1);
                    e.put("general_progressive_source_flag", l(0, 1)),
                      e.put("general_interlaced_source_flag", l(0, 1)),
                      e.put("general_non_packed_constraint_flag", l(0, 1)),
                      e.put("general_frame_only_constraint_flag", l(0, 1));
                    var n = e.get("general_profile_idc");
                    4 === n ||
                    a[4] ||
                    5 === n ||
                    a[5] ||
                    6 === n ||
                    a[6] ||
                    7 === n ||
                    a[7] ||
                    8 === n ||
                    a[8] ||
                    9 === n ||
                    a[9] ||
                    10 === n ||
                    a[10]
                      ? (e.put("general_max_12bit_constraint_flag", l(0, 1)),
                        e.put("general_max_10bit_constraint_flag", l(0, 1)),
                        e.put("general_max_8bit_constraint_flag", l(0, 1)),
                        e.put("general_max_422chroma_constraint_flag", l(0, 1)),
                        e.put("general_max_420chroma_constraint_flag", l(0, 1)),
                        e.put(
                          "general_max_monochrome_constraint_flag",
                          l(0, 1)
                        ),
                        e.put("general_intra_constraint_flag", l(0, 1)),
                        e.put(
                          "general_one_picture_only_constraint_flag",
                          l(0, 1)
                        ),
                        e.put(
                          "general_lower_bit_rate_constraint_flag",
                          l(0, 1)
                        ),
                        5 === n || a[5] || 9 === n || a[9] || 10 === n || a[10]
                          ? (e.put(
                              "general_max_14bit_constraint_flag",
                              l(0, 1)
                            ),
                            e.put("general_reserved_zero_33bits", l(0, 33)))
                          : e.put("general_reserved_zero_34bits", l(0, 34)))
                      : e.put("general_reserved_zero_43bits", l(0, 43)),
                      (n >= 1 && n <= 5) ||
                      a[1] ||
                      a[2] ||
                      a[3] ||
                      a[4] ||
                      a[5] ||
                      a[9]
                        ? e.put("general_inbld_flag", l(0, 1))
                        : e.put("general_reserved_zero_bit", l(0, 1));
                  }
                  e.put("general_level_idc", l(0, 8));
                  var o = new Array(r),
                    s = new Array(r);
                  for (_ = 0; _ < r; _++) (o[_] = l(0, 1)), (s[_] = l(0, 1));
                  var u = new Array(8),
                    f = new Array(r),
                    c = new Array(r),
                    p = new Array(r),
                    d = [],
                    m = new Array(r);
                  if (r > 0) for (var _ = r; _ < 8; _++) u[_] = l(0, 2);
                  for (_ = 0; _ < r; _++) {
                    if (o[_]) {
                      for (
                        c[_] = l(0, 2), p[_] = l(0, 1), f[_] = l(0, 5), i = 0;
                        i < 32;
                        i++
                      )
                        d[_][i] = l(0, 1);
                      e.put("sub_layer_progressive_source_flag", l(0, 1)),
                        e.put("sub_layer_interlaced_source_flag", l(0, 1)),
                        e.put("sub_layer_non_packed_constraint_flag", l(0, 1)),
                        e.put("sub_layer_frame_only_constraint_flag", l(0, 1)),
                        4 === f[_] ||
                        d[_][4] ||
                        5 === f[_] ||
                        d[_][5] ||
                        6 === f[_] ||
                        d[_][6] ||
                        7 === f[_] ||
                        d[_][7] ||
                        8 === f[_] ||
                        d[_][8] ||
                        9 === f[_] ||
                        d[_][9] ||
                        10 === f[_] ||
                        d[_][10]
                          ? (e.put(
                              "sub_layer_max_12bit_constraint_flag",
                              l(0, 1)
                            ),
                            e.put(
                              "sub_layer_max_10bit_constraint_flag",
                              l(0, 1)
                            ),
                            e.put(
                              "sub_layer_max_8bit_constraint_flag",
                              l(0, 1)
                            ),
                            e.put(
                              "sub_layer_max_422chroma_constraint_flag",
                              l(0, 1)
                            ),
                            e.put(
                              "sub_layer_max_420chroma_constraint_flag",
                              l(0, 1)
                            ),
                            e.put(
                              "sub_layer_max_monochrome_constraint_flag",
                              l(0, 1)
                            ),
                            e.put("sub_layer_intra_constraint_flag", l(0, 1)),
                            e.put(
                              "sub_layer_one_picture_only_constraint_flag",
                              l(0, 1)
                            ),
                            e.put(
                              "sub_layer_lower_bit_rate_constraint_flag",
                              l(0, 1)
                            ),
                            5 === f[_] || d[_][5]
                              ? (e.put(
                                  "sub_layer_max_14bit_constraint_flag",
                                  l(0, 1)
                                ),
                                e.put(
                                  "sub_layer_lower_bit_rate_constraint_flag",
                                  l(0, 1)
                                ),
                                (m[_] = l(0, 33)))
                              : (m[_] = l(0, 34)))
                          : e.put("sub_layer_reserved_zero_43bits", l(0, 43)),
                        (f[_] >= 1 && f[_] <= 5) ||
                        9 == f[_] ||
                        d[1] ||
                        d[2] ||
                        d[3] ||
                        d[4] ||
                        d[5] ||
                        d[9]
                          ? e.put("sub_layer_inbld_flag", l(0, 1))
                          : e.put("sub_layer_reserved_zero_bit", l(0, 1));
                    }
                    s[_] && e.put("sub_layer_level_idc", l(0, 8));
                  }
                })(1, e.get("sps_max_sub_layers_minus1"))),
              l(0, 84),
              e.put("sps_seq_parameter_set_id", c()),
              r
                ? (e.put("update_rep_format_flag", l(0, 1)),
                  e.get("update_rep_format_flag") &&
                    e.put("sps_rep_format_idx", l(0, 8)))
                : (e.put("chroma_format_idc", c()),
                  3 === e.get("chroma_format_idc") &&
                    e.put("separate_colour_plane_flag", l(0, 1)),
                  e.put("pic_width_in_luma_samples", c()),
                  e.put("pic_height_in_luma_samples", c()),
                  e.put("conformance_window_flag", l(0, 1)),
                  e.get("conformance_window_flag") &&
                    (e.put("conf_win_left_offset", c()),
                    e.put("conf_win_right_offset", c()),
                    e.put("conf_win_top_offset", c()),
                    e.put("conf_win_bottom_offset", c()))),
              !0
            );
          },
          parse2: function (s) {
            var u = s.length;
            if (
              (s,
              (t = s),
              (r = s.length),
              (a = 0),
              (i = 0),
              (n = 0),
              (o = 0),
              0,
              e.clear(),
              u < 20)
            )
              return !1;
            l(0, 16), l(0, 4);
            var f = l(0, 3);
            if ((e.put("sps_max_sub_layers_minus1", f), f > 6)) return !1;
            l(0, 1), l(0, 2), l(0, 1);
            l(0, 5);
            l(0, 32),
              l(0, 1),
              l(0, 1),
              l(0, 1),
              l(0, 1),
              l(0, 43),
              l(0, 1),
              e.put("general_level_idc", l(0, 8));
            for (var p = [], d = [], m = 0; m < f; m++)
              (p[m] = l(0, 1)), (d[m] = l(0, 1));
            if (f > 0) for (m = f; m < 8; m++) l(0, 2);
            for (m = 0; m < f; m++)
              p[m] &&
                (l(0, 2),
                l(0, 1),
                l(0, 5),
                l(0, 32),
                l(0, 1),
                l(0, 1),
                l(0, 1),
                l(0, 1),
                l(0, 44)),
                d[m] && l(0, 8);
            var _ = c();
            if ((e.put("sps_seq_parameter_set_id", _), _ > 15)) return !1;
            var h = c();
            return (
              e.put("chroma_format_idc", h),
              !(_ > 3) &&
                (3 == h && l(0, 1),
                e.put("pic_width_in_luma_samples", c()),
                e.put("pic_height_in_luma_samples", c()),
                l(0, 1) && (c(), c(), c(), c()),
                c() == c())
            );
          },
          getSizeInfo: function () {
            var t = e.get("pic_width_in_luma_samples"),
              r = e.get("pic_height_in_luma_samples");
            if (e.get("conformance_window_flag")) {
              var a = e.get("chroma_format_idc"),
                i = e.get("separate_colour_plane_flag");
              "undefined" === typeof i && (i = 0);
              var n = (1 !== a && 2 !== a) || 0 !== i ? 1 : 2,
                o = 1 === a && 0 === i ? 2 : 1;
              (t -=
                n * e.get("conf_win_right_offset") +
                n * e.get("conf_win_left_offset")),
                (r -=
                  o * e.get("conf_win_bottom_offset") +
                  o * e.get("conf_win_top_offset"));
            }
            return { width: t, height: r, decodeSize: t * r };
          },
          getSpsValue: function (t) {
            return e.get(t);
          },
        }),
        new u()
      );
    }
    function f() {
      var e = 7,
        t = 7,
        r = 2,
        a = 3,
        i = 0,
        n = null;
      function o() {
        (i = 0), (n = new s.default());
      }
      function u(r, n) {
        var o = n,
          s = (i + o) >> a;
        return (o = (i + n) & e), (r[s] >> (t - (o & t))) & 1;
      }
      function f(e, t) {
        return t <= 25 ? l(e, t) : (l(e, 16) << (t - 16)) | l(e, t - 16);
      }
      function l(e, t) {
        var r = 0;
        if (1 === t) r = u(e, 0);
        else for (var a = 0; a < t; a++) r = (r << 1) + u(e, a);
        return (i += t), r;
      }
      function c(e, t) {
        for (var a = 0, n = 0, o = t; i + o < 8 * e.length && !u(e, o++); ) a++;
        if (0 === a) return (i += 1), 0;
        n = 1 << a;
        for (var s = a - 1; s >= 0; s--, o++) n |= u(e, o) << s;
        return (i += a * r + 1), n - 1;
      }
      return (
        (o.prototype = {
          parse: function (e) {
            (i = 0), n.clear();
            var t = new ArrayBuffer(256),
              r = new Uint8Array(t);
            !(function (e, t, r, a) {
              for (var i = 0, n = 0; i + 2 < t && n + 2 < a; ++i)
                0 == e[i] && 0 == e[i + 1] && 3 == e[i + 2]
                  ? ((r[n++] = e[i++]), (r[n++] = e[i++]))
                  : (r[n++] = e[i]);
              for (; i < t && n < a; ) r[n++] = e[i++];
            })(e, e.length, r, 256);
            var a = [],
              o = [];
            l(r, 4);
            var s,
              u,
              p = l(r, 3);
            n.put("temporalIdNested", l(r, 1)),
              n.put("general_profile_space", l(r, 2)),
              n.put("general_tier_flag", l(r, 1)),
              n.put("general_profile_idc", l(r, 5)),
              n.put("general_profile_compatibility", l(e, 8)),
              n.put("general_profile_compatibility_flags", f(r, 32)),
              n.put(
                "general_constraint_indicator_flags",
                ((s = r),
                (u = 48) <= 32 ? f(s, u) : (f(s, u - 32) << 32) | f(s, 32))
              ),
              n.put("general_level_idc", l(r, 8));
            var d = 0;
            for (d = 0; d < p && d < 6; d++) (a[d] = l(r, 1)), (o[d] = l(r, 1));
            if (p > 0) for (d = p; d < 8; d++) l(r, 2);
            for (d = 0; d < p && d < 6; d++) o[d] && l(r, 8);
            c(r, 0);
            n.put("chroma_format_idc", c(r, 0));
            c(r, 0), c(r, 0);
            return (
              l(r, 1),
              c(r, 0),
              c(r, 0),
              c(r, 0),
              c(r, 0),
              n.put("bitDepthLumaMinus8", c(r, 0) + 8),
              n.put("bitDepthChromaMinus8", c(r, 0) + 8),
              (t = null),
              (r = null),
              !0
            );
          },
          parse2: function (e) {
            var t = e.length,
              r = e;
            e.length;
            if ((n.clear(), t < 20)) return !1;
            l(r, 16), l(r, 4);
            var a = l(r, 3);
            if ((n.put("sps_max_sub_layers_minus1", a), a > 6)) return !1;
            l(r, 1), l(r, 2), l(r, 1);
            l(r, 5);
            l(r, 32),
              l(r, 1),
              l(r, 1),
              l(r, 1),
              l(r, 1),
              l(r, 43),
              l(r, 1),
              n.put("general_level_idc", l(r, 8));
            for (var i = [], o = [], s = 0; s < a; s++)
              (i[s] = l(r, 1)), (o[s] = l(r, 1));
            if (a > 0) for (s = a; s < 8; s++) l(r, 2);
            for (s = 0; s < a; s++)
              i[s] &&
                (l(r, 2),
                l(r, 1),
                l(r, 5),
                l(r, 32),
                l(r, 1),
                l(r, 1),
                l(r, 1),
                l(r, 1),
                l(r, 44)),
                o[s] && l(r, 8);
            var u = c(r, 0);
            if ((n.put("sps_seq_parameter_set_id", u), u > 15)) return !1;
            var f = c(r, 0);
            return (
              n.put("chroma_format_idc", f),
              !(u > 3) &&
                (3 == f && l(r, 1),
                n.put("pic_width_in_luma_samples", c(r, 0)),
                n.put("pic_height_in_luma_samples", c(r, 0)),
                l(r, 1) && (c(r, 0), c(r, 0), c(r, 0), c(r, 0)),
                c(r, 0) == c(r, 0))
            );
          },
          getSizeInfo: function () {
            var e = n.get("pic_width_in_luma_samples"),
              t = n.get("pic_height_in_luma_samples");
            if (n.get("conformance_window_flag")) {
              var r = n.get("chroma_format_idc"),
                a = n.get("separate_colour_plane_flag");
              "undefined" === typeof a && (a = 0);
              var i = (1 !== r && 2 !== r) || 0 !== a ? 1 : 2,
                o = 1 === r && 0 === a ? 2 : 1;
              (e -=
                i * n.get("conf_win_right_offset") +
                i * n.get("conf_win_left_offset")),
                (t -=
                  o * n.get("conf_win_bottom_offset") +
                  o * n.get("conf_win_top_offset"));
            }
            return { width: e, height: t, decodeSize: e * t };
          },
          getSpsValue: function (e) {
            return n.get(e);
          },
          getCodecInfo: function () {
            return 'video/mp4; codecs="hvc1.1.6.L30.B0"';
          },
        }),
        new o()
      );
    }
    t.default = function () {
      var e,
        t,
        r,
        a = 0,
        s = 0,
        l = !1,
        c = 0,
        p = 0,
        d = new f(),
        m = new u(),
        _ = {
          frameData: null,
          timeStamp: null,
          initSegmentData: null,
          mediaSample: null,
          dropPercent: 0,
          dropCount: 0,
          codecInfo: "",
          playback: !1,
        },
        h = { timestamp: null, timezone: null },
        g = 0,
        v = 0,
        y = null,
        b = 0,
        S = 0,
        D = { width: 0, height: 0 },
        T = 0,
        w = 0,
        E = null,
        C = null,
        M = null,
        I = !1,
        A = !1,
        x = !1,
        k = {},
        O = !1,
        F = null;
      function P() {
        (this.decoder = (0, n.default)()),
          (this.firstTime = 0),
          (this.lastMSW = 0);
      }
      return (
        (P.prototype = {
          setReturnCallback: function (e) {
            this.rtpReturnCallback = e;
          },
          setBufferfullCallback: function (e) {
            null !== this.videoBufferList &&
              this.videoBufferList.setBufferFullCallback(e);
          },
          getVideoBuffer: function (e) {
            if (null !== this.videoBufferList)
              return this.videoBufferList.searchNodeAt(e);
          },
          clearBuffer: function () {
            null !== this.videoBufferList && this.videoBufferList.clear();
          },
          findCurrent: function () {
            null !== this.videoBufferList &&
              this.videoBufferList.searchTimestamp(this.getTimeStamp());
          },
          ntohl: function (e) {
            return ((e[0] << 24) + (e[1] << 16) + (e[2] << 8) + e[3]) >>> 0;
          },
          appendBuffer: function (e, t, r) {
            if (r + t.length >= e.length) {
              var a = new Uint8Array(e.length + 1048576);
              a.set(e, 0), (e = a);
            }
            return e.set(t, r), e;
          },
          setGovLength: function (e) {
            y = e;
          },
          getGovLength: function () {
            return y;
          },
          setDecodingTime: function (e) {
            this.decodingTime = e;
          },
          getDropPercent: function () {
            return 0;
          },
          getDropCount: function () {
            return 0;
          },
          initStartTime: function () {
            (this.firstDiffTime = 0), (this.calcGov = 0);
          },
          setCheckDelay: function (e) {
            this.checkDelay = e;
          },
          init: function (e) {
            (A = !1),
              (l = !1),
              this.decoder.setIsFirstFrame(!1),
              (this.videoBufferList = new i.VideoBufferList()),
              (this.firstDiffTime = 0),
              (this.checkDelay = !0),
              (this.timeData = null),
              (x = e.h265AccelerationEnabled);
          },
          setInitSegment: function () {
            A = !1;
          },
          parseRTPDataH265Acceleration: function (n, u, f, c, p) {
            var m = null,
              y = {},
              b = ((u[19] << 24) + (u[18] << 16) + (u[17] << 8) + u[16]) >>> 0,
              T =
                Date.UTC(
                  "20" + (b >> 26),
                  ((b >> 22) & 15) - 1,
                  (b >> 17) & 31,
                  (b >> 12) & 31,
                  (b >> 6) & 63,
                  63 & b
                ) / 1e3;
            if ((p.timeStampmsw, (T -= 28800), 0 == this.firstTime))
              (this.firstTime = T),
                (this.lastMSW = 0),
                (s = (u[21] << 8) + u[20]),
                (h = { timestamp: this.firstTime, timestamp_usec: 0 });
            else {
              var w,
                x = (u[21] << 8) + u[20];
              (w = x > s ? x - s : x + 65535 - s),
                (this.lastMSW += w),
                T > this.firstTime && (this.lastMSW -= 1e3),
                (this.firstTime = T),
                (h = { timestamp: T, timestamp_usec: this.lastMSW }),
                (s = x);
            }
            (0 !== this.getFramerate() &&
              "undefined" !== typeof this.getFramerate()) ||
              "undefined" === typeof this.getTimeStamp() ||
              (this.setFramerate(
                Math.round(
                  1e3 /
                    ((h.timestamp - this.getTimeStamp().timestamp === 0
                      ? 0
                      : 1e3) +
                      (h.timestamp_usec - this.getTimeStamp().timestamp_usec))
                )
              ),
              i.debug.log(
                "setFramerate" +
                  Math.round(
                    1e3 /
                      ((h.timestamp - this.getTimeStamp().timestamp === 0
                        ? 0
                        : 1e3) +
                        (h.timestamp_usec - this.getTimeStamp().timestamp_usec))
                  )
              )),
              this.setTimeStamp(h);
            for (
              var P = u[22],
                L = u.subarray(24 + P, u.length - 8),
                U = u.subarray(u.length - 8, u.length),
                R = (U[7], U[6], U[5], U[4], []),
                B = 0;
              B <= L.length;

            )
              if (0 == L[B])
                if (0 == L[B + 1])
                  if (1 == L[B + 2]) {
                    if (
                      (R.push(B),
                      38 == (255 & L[(B += 3)]) || 2 == (255 & L[B]))
                    )
                      break;
                  } else 0 == L[B + 2] ? B++ : (B += 3);
                else B += 2;
              else B += 1;
            a = (u[21] << 8) + u[20];
            var z = 0;
            for (B = 0; B < R.length; B++)
              switch (
                ((m = L.subarray(R[B] + 3, R[B + 1] - 1)), 255 & L[R[B] + 3])
              ) {
                case 2:
                  (z = R[B] - 1), (e = L.subarray(z, L.length));
                  break;
                case 38:
                  (z = R[B] - 1), (e = L.subarray(z, L.length));
                  var N = p;
                  (g = t = N.width),
                    (v = r = N.height),
                    0 === D.width && 0 === D.height
                      ? ((D.width = g),
                        (D.height = v),
                        (y.decodeStart = D),
                        (y.decodeStart.decodeMode = "video"),
                        (y.decodeStart.encodeMode = "h265"))
                      : (D.width === g && D.height === v) ||
                        ((A = !1),
                        (D.width = g),
                        (D.height = v),
                        (y.resolution = D));
                  break;
                case 64:
                  E = m;
                  break;
                case 66:
                  var V = L.subarray(R[B] + 5, R[B + 1] - 1);
                  d.parse(V), (M = m);
                  break;
                case 68:
                  C = m;
              }
            if (A) _.initSegmentData = null;
            else {
              A = !0;
              var j = d.getSpsValue("general_profile_space"),
                H = d.getSpsValue("general_tier_flag"),
                W = d.getSpsValue("general_profile_idc"),
                G = d.getSpsValue("temporalIdNested");
              d.getSpsValue("general_profile_compatibility_flags"),
                d.getSpsValue("general_constraint_indicator_flags"),
                (p = {
                  id: 1,
                  width: t,
                  height: r,
                  type: "video",
                  general_profile_flag: (j << 6) | (H << 5) | W,
                  general_profile_compatibility_flags: d.getSpsValue(
                    "general_profile_compatibility_flags"
                  ),
                  general_constraint_indicator_flags: d.getSpsValue(
                    "general_constraint_indicator_flags"
                  ),
                  general_level_idc: d.getSpsValue("general_level_idc"),
                  chroma_format_idc: d.getSpsValue("chroma_format_idc"),
                  bitDepthLumaMinus8: d.getSpsValue("bitDepthLumaMinus8"),
                  bitDepthChromaMinus8: d.getSpsValue("bitDepthChromaMinus8"),
                  rate_layers_nested_length: 11 | ((1 & G) << 2),
                  vps: [E],
                  sps: [M],
                  pps: [C],
                  timescale: 1e3,
                  fps: this.getFramerate(),
                }),
                null == F &&
                  (F = new o.default(i.commonOption.VIDEOENCODETYPE.H265)),
                (_.initSegmentData = F.initSegment(p)),
                (_.codecInfo = d.getCodecInfo());
            }
            z || i.debug.log("11111111111111111111111111111111111111111");
            var X = e.length - 4;
            (e[0] = (4278190080 & X) >>> 24),
              (e[1] = (16711680 & X) >>> 16),
              (e[2] = (65280 & X) >>> 8),
              (e[3] = 255 & X);
            var q = this.getFramerate(),
              Y = {
                duration: Math.round((1 / q) * 1e3),
                size: e.length,
                frame_time_stamp: null,
                frameDuration: null,
              };
            if (
              ((Y.frame_time_stamp = 1e3 * h.timestamp + h.timestamp_usec - S),
              !1 === I)
            )
              (Y.frame_time_stamp = 0),
                (S = 1e3 * h.timestamp + h.timestamp_usec),
                (Y.frameDuration = 0),
                (k = Y),
                (I = !0);
            else {
              var J = k.frame_time_stamp,
                K = Y.frame_time_stamp;
              (Y.frameDuration = Math.abs(K - J)),
                Y.frameDuration > 3e3 && (Y.frameDuration = 0),
                (k = Y);
            }
            (_.frameData = new Uint8Array(e)),
              (_.mediaSample = Y),
              (h = null === h.timestamp ? this.getTimeStamp() : h),
              (_.timeStamp = h);
            var Z = g * v;
            if (!0 === l) {
              var Q = ((rtpDuration / frameDuration) * 100).toFixed(0) < 60;
              Z > videoTagLimitSize
                ? frameDuration < 5e3
                  ? (changeMode("video"), (y.decodeMode = "video"))
                  : !0 === Q
                    ? (changeMode("video"), (y.decodeMode = "video"))
                    : (changeMode("canvas"), (y.decodeMode = "canvas"))
                : (changeMode("canvas"), (y.decodeMode = "canvas"));
            }
            if (((_.playback = l), (y.decodedData = _), !0 === O))
              return (
                2 === errorIFrameNum && ((errorIFrameNum = 0), (O = !1)),
                void i.debug.info("H264Session::stop")
              );
            this.rtpReturnCallback(y);
          },
          parseRTPData: function (t, r, n, o, u) {
            if (!0 !== x) {
              var f,
                d = null,
                y = {},
                b =
                  ((r[19] << 24) + (r[18] << 16) + (r[17] << 8) + r[16]) >>> 0;
              f = b >>> 26 === 0 ? "2000" : "20" + (b >>> 26);
              var E =
                Date.UTC(
                  f,
                  ((b >>> 22) & 15) - 1,
                  (b >>> 17) & 31,
                  (b >>> 12) & 31,
                  (b >>> 6) & 63,
                  63 & b
                ) / 1e3;
              if (
                ((E += (new Date().getTimezoneOffset() / 60) * 3600),
                0 === this.firstTime)
              )
                (this.firstTime = E),
                  (this.lastMSW = 0),
                  (s = (r[21] << 8) + r[20]),
                  (h = { timestamp: this.firstTime, timestamp_usec: 0 });
              else {
                var C,
                  M = (r[21] << 8) + r[20];
                (C = M > s ? M - s : M + 65535 - s),
                  (this.lastMSW += C),
                  E > this.firstTime && (this.lastMSW -= 1e3),
                  (this.firstTime = E),
                  (h = { timestamp: E, timestamp_usec: this.lastMSW }),
                  (s = M);
              }
              (0 !== this.getFramerate() &&
                "undefined" !== typeof this.getFramerate()) ||
                "undefined" === typeof this.getTimeStamp() ||
                (this.setFramerate(
                  Math.round(
                    1e3 /
                      ((h.timestamp - this.getTimeStamp().timestamp === 0
                        ? 0
                        : 1e3) +
                        (h.timestamp_usec - this.getTimeStamp().timestamp_usec))
                  )
                ),
                i.debug.log(
                  "setFramerate" +
                    Math.round(
                      1e3 /
                        ((h.timestamp - this.getTimeStamp().timestamp === 0
                          ? 0
                          : 1e3) +
                          (h.timestamp_usec -
                            this.getTimeStamp().timestamp_usec))
                    )
                )),
                this.setTimeStamp(h);
              var I = r[22];
              (e = r.subarray(24 + I, r.length - 8)),
                (a = (r[21] << 8) + r[20]);
              for (var A = [], k = 0; k <= e.length; )
                if (0 == e[k])
                  if (0 == e[k + 1])
                    if (1 == e[k + 2]) {
                      if (
                        (A.push(k), 5 == (31 & e[(k += 3)]) || 1 == (31 & e[k]))
                      )
                        break;
                    } else 0 == e[k + 2] ? k++ : (k += 3);
                  else k += 2;
                else k += 1;
              var O = "P";
              for (k = 0; k < A.length; k++)
                switch (
                  ((d = e.subarray(A[k] + 3, A[k + 1])),
                  (e[A[k] + 3] >> 1) & 63)
                ) {
                  default:
                    break;
                  case 33:
                    (O = "I"), m.parse2(d);
                    var F = u;
                    (p = m.getSizeInfo().decodeSize),
                      (g = F.width),
                      (v = F.height),
                      (D.width == F.width && D.height == F.height) ||
                        (0 != D.width
                          ? ((D.width = F.width),
                            (D.height = F.height),
                            (y.resolution = D),
                            (y.resolution.decodeMode = "canvas"),
                            (y.resolution.encodeMode = "h265"))
                          : ((D.width = F.width),
                            (D.height = F.height),
                            (y.decodeStart = D),
                            (y.decodeStart.decodeMode = "canvas"),
                            (y.decodeStart.encodeMode = "h265")));
                }
              var P = 1e3 * h.timestamp + h.timestamp_usec;
              0 == this.firstDiffTime
                ? ((T = 0),
                  (this.firstDiffTime = Date.now() - P),
                  i.debug.log("firstDiff: " + S))
                : (P - w < 0 &&
                    (this.firstDiffTime = T + (Date.now() - P).toFixed(0)),
                  (T = Date.now() - P - this.firstDiffTime) < 0 &&
                    ((this.firstDiffTime = 0), (T = 0)),
                  T > 8e3 &&
                    ((y.error = { errorCode: i.PLAYER_STATE_CODE.TIMEOUT }),
                    this.rtpReturnCallback(y))),
                (w = P),
                (_.frameData = null),
                c !== p &&
                  (this.decoder.free(), (c = p), this.decoder.setOutputSize(c)),
                (!0 === n && !0 === l) ||
                  ((_.frameData = this.decoder.decode(r)),
                  (_.frameData.frameType = O),
                  (_.frameData.frameIndex = u.frameIndex)),
                (_.timeStamp = null),
                (h = null === h.timestamp ? this.getTimeStamp() : h),
                (_.timeStamp = h),
                n &&
                  ((y.backupData = {
                    stream: e,
                    frameType: O,
                    width: g,
                    height: v,
                    codecType: "h265",
                  }),
                  null !== h.timestamp && "undefined" !== typeof h.timestamp
                    ? (y.backupData.timestamp_usec = h.timestamp_usec)
                    : (y.backupData.timestamp = (a / 90).toFixed(0))),
                (y.decodedData = _),
                this.rtpReturnCallback(y);
            } else this.parseRTPDataH265Acceleration(t, r, n, o, u);
          },
          findIFrame: function () {
            if (null !== this.videoBufferList) {
              var e = this.videoBufferList.findIFrame();
              if (null === e || "undefined" === typeof e) return !1;
              var t = {};
              return (
                this.setTimeStamp(e.timeStamp),
                (t.frameData = this.decoder.decode(e.buffer)),
                (t.timeStamp = e.timeStamp),
                t
              );
            }
          },
          getFramerate: function () {
            return b;
          },
          setFramerate: function (e) {
            0 < e &&
              "undefined" !== typeof e &&
              ((b = e),
              null !== this.videoBufferList &&
                (this.videoBufferList.setMaxLength(6 * b),
                this.videoBufferList.setBUFFERING(4 * b)));
          },
          getTimeStamp: function () {
            return this.timeData;
          },
          setTimeStamp: function (e) {
            this.timeData = e;
          },
        }),
        new P()
      );
    };
  },
  function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
    var a = r(0);
    t.default = function () {
      var e,
        t,
        r,
        i,
        n,
        o,
        s,
        u,
        f,
        l,
        c,
        p,
        d,
        m,
        _,
        h = !1,
        g = 0;
      function v() {
        v.prototype.setIsFirstFrame(!1);
      }
      return (
        (v.prototype = {
          init: function () {
            a.debug.log("H265 Decoder init");
          },
          setOutputSize: function (e) {
            if (n !== 2 * e) {
              n = 2 * e;
              var t = Module._malloc(1),
                r = new Uint8Array(Module.HEAPU8.buffer, t, 1);
              Module._DECODE_GetFreePort(r.byteOffset),
                (g = r[0]),
                (r = null),
                Module._free(t),
                Module._DECODE_Init(g),
                (o = Module._malloc(5242880)),
                (s = new Uint8Array(Module.HEAPU8.buffer, o, 5242880));
              var a = 2 * e;
              (u = Module._malloc(a)),
                (f = new Uint8Array(Module.HEAPU8.buffer, u, a)),
                (l = Module._malloc(4)),
                (c = new Uint8Array(Module.HEAPU8.buffer, l, 4)),
                (p = Module._malloc(40)),
                (d = new Uint8Array(Module.HEAPU8.buffer, p, 40));
            }
          },
          decode: function (a, n) {
            var o = a[4],
              u = a[5];
            (e = Date.now()),
              s.set(a),
              Module._DECODE_InputOneFrame(
                g,
                s.byteOffset,
                a.length,
                f.byteOffset,
                c.byteOffset,
                d.byteOffset
              ),
              (i = d[16] + (d[17] << 8)),
              (r = d[18] + (d[19] << 8));
            var l = (i * r * 3) / 2;
            return (
              (_ = null),
              (m = null),
              (_ = new ArrayBuffer(l)),
              (m = new Uint8Array(_)).set(
                Module.HEAPU8.subarray(f.byteOffset, f.byteOffset + l)
              ),
              (t = Date.now() - e),
              v.prototype.isFirstFrame()
                ? i > 0 && r > 0
                  ? ((e = Date.now()),
                    {
                      data: m,
                      option: {
                        ylen: i,
                        height: r,
                        mediaType: o,
                        subMediaType: u,
                        beforeDecoding: e,
                      },
                      width: i,
                      height: r,
                      codecType: "h265",
                      decodingTime: t,
                      frameType: n,
                    })
                  : void 0
                : (v.prototype.setIsFirstFrame(!0), { firstFrame: !0 })
            );
          },
          setIsFirstFrame: function (e) {
            h = e;
          },
          isFirstFrame: function () {
            return h;
          },
          free: function () {
            Module._DECODE_Stop(g),
              (s = null),
              Module._free(o),
              (f = null),
              Module._free(u),
              (c = null),
              Module._free(l),
              (d = null),
              Module._free(p),
              (_ = null),
              (m = null);
          },
        }),
        new v()
      );
    };
  },
  function (e, t, r) {
    "use strict";
    var a = r(1);
    Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
    var i = r(0),
      n = a(r(16));
    t.default = function () {
      var e = 0,
        t = 0,
        r = { frameData: null, timeStamp: null },
        a = { timestamp: null, timezone: null };
      var o = 0,
        s = 0,
        u = 0,
        f = 0,
        l = null,
        c = null,
        p = null,
        d = 0,
        m = 0,
        _ = 0,
        h = { width: 0, height: 0 };
      function g() {
        (this.decoder = new n.default()),
          (this.firstTime = 0),
          (this.lastMSW = 0);
      }
      return (
        (g.prototype = {
          init: function () {
            this.decoder.setIsFirstFrame(!1),
              (this.videoBufferList = new i.VideoBufferList()),
              (this.timeData = null);
          },
          parseRTPData: function (n, p, d, g, v) {
            var y,
              b = new Uint8Array(1048576);
            (e = v.width), (t = v.height), (l = {});
            var S = p[22],
              D = p.subarray(24 + S, p.length - 8);
            c = D.length;
            var T =
              ((p[19] << 24) + (p[18] << 16) + (p[17] << 8) + p[16]) >>> 0;
            y = T >> 26 === 0 ? "2000" : "20" + (T >> 26);
            var w =
              Date.UTC(
                y,
                ((T >> 22) & 15) - 1,
                (T >> 17) & 31,
                (T >> 12) & 31,
                (T >> 6) & 63,
                63 & T
              ) / 1e3;
            if (((w -= 28800), 0 === this.firstTime))
              (this.firstTime = w),
                (this.lastMSW = 0),
                (f = (p[21] << 8) + p[20]),
                (a = { timestamp: this.firstTime, timestamp_usec: 0 });
            else {
              var E,
                C = (p[21] << 8) + p[20];
              (E = C > f ? C - f : C + 65535 - f),
                (this.lastMSW += E),
                w > this.firstTime && (this.lastMSW -= 1e3),
                (this.firstTime = w),
                (a = { timestamp: w, timestamp_usec: this.lastMSW }),
                (f = C);
            }
            (0 !== this.getFramerate() &&
              "undefined" !== typeof this.getFramerate()) ||
              "undefined" === typeof this.getTimeStamp() ||
              this.setFramerate(
                Math.round(
                  1e3 /
                    ((a.timestamp - this.getTimeStamp().timestamp === 0
                      ? 0
                      : 1e3) +
                      (a.timestamp_usec - this.getTimeStamp().timestamp_usec))
                )
              ),
              this.setTimeStamp(a),
              (u = (p[21] << 8) + p[20]),
              (s = c),
              ((b = this.appendBuffer(b, D, o))[(o += c) + s - 2] = 255),
              (b[o + s - 1] = 217),
              (h.width == e && h.height == t) ||
                (0 != h.width
                  ? ((h.width = e),
                    (h.height = t),
                    (l.resolution = h),
                    (l.resolution.decodeMode = "canvas"),
                    (l.resolution.encodeMode = "mjpeg"))
                  : ((h.width = e),
                    (h.height = t),
                    (l.decodeStart = h),
                    (l.decodeStart.decodeMode = "canvas"),
                    (l.decodeStart.encodeMode = "mjpeg")));
            var M = 1e3 * a.timestamp + a.timestamp_usec;
            0 == this.firstDiffTime
              ? ((m = 0),
                (this.firstDiffTime = Date.now() - M),
                i.debug.log("firstDiff: " + this.firstTime))
              : (M - _ < 0 &&
                  (this.firstDiffTime = m + (Date.now() - M).toFixed(0)),
                (m = Date.now() - M - this.firstDiffTime) < 0 &&
                  ((this.firstDiffTime = 0), (m = 0)),
                m > 8e3 &&
                  ((l.error = { errorCode: i.PLAYER_STATE_CODE.TIMEOUT }),
                  this.rtpReturnCallback(l))),
              (_ = M),
              (r.frameData = null),
              this.decoder.setResolution(e, t),
              (r.frameData = this.decoder.decode(b.subarray(0, o))),
              (r.timeStamp = null),
              (a = null === a.timestamp ? this.getTimeStamp() : a),
              (r.timeStamp = a),
              !0 === d &&
                ((l.backupData = {
                  stream: b.subarray(0, o),
                  width: e,
                  height: t,
                  codecType: "mjpeg",
                }),
                null !== a.timestamp && "undefined" !== typeof a.timestamp
                  ? (l.backupData.timestamp_usec = a.timestamp_usec)
                  : (l.backupData.timestamp = (u / 90).toFixed(0))),
              (o = 0),
              (r.playback = !1),
              (l.decodedData = r),
              this.rtpReturnCallback(l);
          },
          getVideoBuffer: function (e) {
            if (null !== this.videoBufferList)
              return this.videoBufferList.searchNodeAt(e);
          },
          clearBuffer: function () {
            null !== this.videoBufferList && this.videoBufferList.clear();
          },
          findCurrent: function () {
            null !== this.videoBufferList &&
              this.videoBufferList.searchTimestamp(this.getTimeStamp());
          },
          findIFrame: function () {
            null !== this.videoBufferList && this.videoBufferList.findIFrame();
          },
          SetRtpInterlevedID: function (e) {
            this.interleavedID = e;
          },
          setTimeStamp: function (e) {
            this.timeData = e;
          },
          getTimeStamp: function () {
            return this.timeData;
          },
          getRTPPacket: function (e, t) {},
          calculatePacketTime: function (e) {},
          ntohl: function (e) {
            return ((e[0] << 24) + (e[1] << 16) + (e[2] << 8) + e[3]) >>> 0;
          },
          appendBuffer: function (e, t, r) {
            if (r + t.length >= e.length) {
              var a = new Uint8Array(e.length + 1048576);
              a.set(e, 0), (e = a);
            }
            return e.set(t, r), e;
          },
          setFramerate: function (e) {
            0 < e &&
              "undefined" !== typeof e &&
              ((d = e),
              null !== this.videoBufferList &&
                (this.videoBufferList.setMaxLength(6 * d),
                this.videoBufferList.setBUFFERING(4 * d)));
          },
          getFramerate: function () {
            return d;
          },
          setReturnCallback: function (e) {
            this.rtpReturnCallback = e;
          },
          setBufferfullCallback: function (e) {
            null !== this.videoBufferList &&
              this.videoBufferList.setBufferFullCallback(e);
          },
          setGovLength: function (e) {
            p = e;
          },
          getGovLength: function () {
            return p;
          },
          setDecodingTime: function (e) {
            this.decodingTime = e;
          },
          getDropPercent: function () {
            return 0;
          },
          getDropCount: function () {
            return 0;
          },
          initStartTime: function () {
            (this.firstDiffTime = 0), (this.calcGov = 0);
          },
          setCheckDelay: function (e) {
            this.checkDelay = e;
          },
        }),
        new g()
      );
    };
  },
  function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
    var a = r(0);
    t.default = function () {
      var e,
        t,
        r = !1;
      function i() {
        a.debug.log("MJPEG Decoder");
      }
      return (
        (i.prototype = {
          setIsFirstFrame: function (e) {
            r = e;
          },
          isFirstFrame: function () {
            return r;
          },
          setResolution: function (r, a) {
            (e = r), (t = a);
          },
          decode: function (r, a) {
            return i.prototype.isFirstFrame()
              ? { data: r, width: e, height: t, codecType: "mjpeg" }
              : (i.prototype.setIsFirstFrame(!0), { firstFrame: !0 });
          },
        }),
        new i()
      );
    };
  },
  function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
    var a = r(0);
    t.default = function () {
      var e,
        t = null,
        r = {
          0: "",
          1: "VideoSynopsis",
          2: "TrafficGate",
          3: "ElectronicPolice",
          4: "SinglePtzParking",
          5: "PtzParking",
          6: "Traffic",
          7: "Normal",
          8: "none",
          9: "ATM",
          10: "MetroIVS",
          11: "FaceDetection",
          12: "FaceRecognition",
          13: "NumberStat",
          14: "HeatMap",
          15: "VideoDiagnosis",
          16: "VideoEnhance",
          17: "SmokeFireDetect",
          18: "VehicleAnalyse",
          19: "PersonFeature",
          20: "SDFaceDetect",
          21: "HeatMapPlan",
          22: "ATMFD",
          23: "SCR",
          24: "NumberStatPlan",
          25: "CourseRecord",
          26: "Highway",
          27: "City",
          28: "LeTrack",
          29: "ObjectStruct",
          30: "Stereo",
          31: "StereoPc",
          32: "HumanDetect",
          33: "SDPedestrain",
          34: "FaceAnalysis",
          35: "FaceAttribute",
          36: "FacePicAnalyse",
          37: "SDEP",
          38: "XRayDetect",
          39: "ObjectDetect",
          40: "CrowdDistriMap",
          41: "StereoBehavior",
        };
      function i() {
        (this.firstTime = 0), (this.lastMSW = 0);
      }
      function n(e) {
        for (var t = [].slice.call(e), r = "", a = 0; a < t.length; a++)
          r += String.fromCharCode(t[a]);
        return decodeURIComponent(escape(r));
      }
      function o(e) {
        var t = { result: !0, type: 0 };
        return (t.params = JSON.parse(n(e))), t;
      }
      function s(e) {
        var t = { result: !1 },
          a = 0,
          i = (e[a + 1] << 8) + e[a];
        if (1 !== i && 2 !== i) return t;
        (t.result = !0), (t.type = 5), (t.params = null);
        var n = e[(a += 2)];
        if (0 === n) return t;
        var o = e[(a += 1)];
        (a += 1),
          (t.params = {}),
          (t.params.coordinate = 128 & o ? 8192 : 1024),
          (t.params.isTrack = !!(127 & o)),
          (t.params.object = []);
        for (var s = 0; s < n; s++) {
          var u = {};
          (u.objectId =
            (e[a + 3] << 24) + (e[a + 2] << 16) + (e[a + 1] << 8) + e[a]),
            (a += 4),
            (u.operateType = e[a]);
          var f = e[(a += 1)];
          (a += 1), (u.objectType = e[a]);
          var l = e[(a += 1)];
          (a += 1),
            (a += 1),
            (a += 1),
            (u.classID = r[e[a]]),
            (a += 1),
            (u.subType = e[a]),
            (a += 1),
            l > 0 && (u.fatherId = []);
          for (var c = 0; c < l; c++)
            u.fatherId.push(
              (e[a + 3] << 24) + (e[a + 2] << 16) + (e[a + 1] << 8) + e[a]
            ),
              (a += 4);
          f > 0 && (u.track = []);
          for (var p = 0; p < f; p++) {
            var d = (e[a + 1] << 8) + e[a],
              m = (e[(a += 2) + 1] << 8) + e[a],
              _ = (e[(a += 2) + 1] << 8) + e[a],
              h = (e[(a += 2) + 1] << 8) + e[a];
            (a += 2), u.track.push([d - _, m - h, d + _, m + h]);
          }
          t.params.object.push(u);
        }
        return t;
      }
      function u(e) {
        for (
          var t = { result: !1, type: 20, params: [] },
            r = (e[0], e.length),
            a = 0,
            i = e.slice(4),
            o = function () {
              var e = {};
              (e.objectId =
                (i[a + 3] << 24) +
                (i[a + 2] << 16) +
                (i[a + 1] << 8) +
                (i[a + 0] << 0)),
                (a += 4),
                (e.result = !0),
                (e.params = {}),
                (e.custom = (i[a + 1] << 8) + i[a]),
                (a += 2),
                (e.objectStatus = i[a]);
              var t = i[(a += 1)];
              (a += 1), (e.params.object = []);
              for (var r = null, o = 0; o < t; o++) {
                switch (i[a]) {
                  case 1:
                    r = c(i.slice(a));
                    break;
                  case 2:
                    r = l(i.slice(a));
                    break;
                  case 3:
                    r = f(i.slice(a));
                    break;
                  case 4:
                    r = p(i.slice(a));
                }
                e.params.object.push(r.info), (a += r.offset);
              }
              (1 != e.objectStatus && 3 != e.objectStatus) || (e.params = null),
                0 == t && (e.params = null);
              var s = (i[a + 1] << 8) + i[a];
              a += 2;
              var u = n(i.slice(a, a + s));
              return (
                (e.appendInfo = String.fromCharCode.apply(
                  null,
                  i.slice(a, a + s)
                )),
                (a += s),
                (e.appendInfo = u),
                e
              );
            };
          a < r - 4;

        )
          t.params.push(o());
        return t;
      }
      function f(e) {
        var t = 0,
          r = { type: e[0] };
        (t += 1),
          (r.pointCount = e[t]),
          (t += 1),
          (r.lineWidth = e[t]),
          (t += 1),
          (r.strokeStyle = e[t]),
          (t += 1),
          (r.borderColor = [e[t + 1], e[t + 2], e[t + 3], e[t]]),
          (r.borderColorType = "RGBA"),
          (t += 4),
          (r.fillColor = [e[t + 1], e[t + 2], e[t + 3], e[t]]),
          (r.fillColorType = "RGBA"),
          (t += 4),
          (r.coordinate = []);
        for (var a = 0; a < r.pointCount; a++) {
          var i = (e[t + 1] << 8) + e[t],
            n = (e[(t += 2) + 1] << 8) + e[t];
          (t += 2), r.coordinate.push([i, n]);
        }
        return { info: r, offset: t };
      }
      function l(e) {
        var t = 0,
          r = { type: e[0] };
        (t += 1),
          (r.pointCount = e[t]),
          (t += 1),
          (r.lineWidth = e[t]),
          (t += 1),
          (r.strokeStyle = e[t]),
          (t += 1),
          (r.lineColor = [e[t + 1], e[t + 2], e[t + 3], e[t]]),
          (r.lineColorType = "RGBA"),
          (t += 4),
          (r.coordinate = []);
        for (var a = 0; a < r.pointCount; a++) {
          var i = (e[t + 1] << 8) + e[t],
            n = (e[(t += 2) + 1] << 8) + e[t];
          (t += 2), r.coordinate.push([i, n]);
        }
        return { info: r, offset: t };
      }
      function c(e) {
        var t = 0,
          r = { type: e[0] };
        (t += 1),
          (r.lineWidth = e[t]),
          (t += 1),
          (r.strokeStyle = e[t]),
          (t += 1),
          (t += 1),
          (r.radius = (e[t + 1] << 8) + e[t]),
          (t += 2);
        var a = (e[(t += 2) + 1] << 8) + e[t],
          i = (e[(t += 2) + 1] << 8) + e[t];
        return (
          (t += 2),
          (r.coordinate = [a, i]),
          (r.borderColor = [e[t + 1], e[t + 2], e[t + 3], e[t]]),
          (r.borderColorType = "RGBA"),
          (t += 4),
          (r.fillColor = [e[t + 1], e[t + 2], e[t + 3], e[t]]),
          (r.fillColorType = "RGBA"),
          { info: r, offset: (t += 4) }
        );
      }
      function p(e) {
        var t = 0,
          r = { type: e[0] };
        (t += 1), (r.encodeType = e[t]), (t += 1);
        var a = (e[(t += 2) + 1] << 8) + e[t],
          i = (e[(t += 2) + 1] << 8) + e[t];
        (t += 2),
          (r.coordinate = [a, i]),
          (r.fontColor = [e[t + 1], e[t + 2], e[t + 3], e[t]]),
          (t += 4),
          (r.colorType = "RGBA"),
          (r.fontSize = e[t]),
          (t += 1),
          (r.textAlign = e[t]),
          (t += 1),
          (r.textBaseline = "top"),
          (r.textLength = (e[t + 1] << 8) + e[t]),
          (t += 2);
        for (var o = e.slice(t, t + r.textLength), s = 0; s < r.textLength; s++)
          if (0 === o[s]) {
            o = o.slice(0, s);
            break;
          }
        try {
          r.content = n(o);
        } catch (e) {
          r.content = "";
        }
        return { info: r, offset: (t += r.textLength) };
      }
      function d(e, t) {
        t.hasOwnProperty("attribute80") || (t.attribute80 = []);
        var r = 1,
          a = e[r];
        r += 1;
        var i = { color: {} };
        (i.color.valid = e[r]),
          (r += 1),
          (i.carModel = e[r]),
          (r += 1),
          (i.color.red = e[r]),
          (r += 1),
          (i.color.green = e[r]),
          (r += 1),
          (i.color.blue = e[r]),
          (r += 1),
          (i.color.alpha = e[r]),
          (r += 1),
          (i.brand = (e[r + 1] << 8) + e[r]),
          (r += 2),
          (i.subBrand = (e[r + 1] << 8) + e[r]),
          (r += 2),
          (i.year = (e[r + 1] << 8) + e[r]),
          (r += 2),
          (i.reliability = e[r]),
          (r += 1);
        var n = (e[(r += 1) + 1] << 8) + e[r],
          o = (e[(r += 2) + 1] << 8) + e[r],
          s = (e[(r += 2) + 1] << 8) + e[r],
          u = (e[(r += 2) + 1] << 8) + e[r];
        return (
          (r += 2),
          (i.windowPosition = [n - s, o - u, n + s, o + u]),
          t.attribute80.push(i),
          a
        );
      }
      function m(e, t) {
        t.hasOwnProperty("attribute81") || (t.attribute81 = []);
        var r = {},
          a = 1,
          i = e[a],
          n = (e[(a += 1) + 1] << 8) + e[a],
          o = (e[(a += 2) + 1] << 8) + e[a],
          s = (e[(a += 2) + 1] << 8) + e[a],
          u = (e[(a += 2) + 1] << 8) + e[a];
        return (
          (a += 2),
          (r.mainPosition = [n - s, o - u, n + s, o + u]),
          (n = (e[a + 1] << 8) + e[a]),
          (o = (e[(a += 2) + 1] << 8) + e[a]),
          (s = (e[(a += 2) + 1] << 8) + e[a]),
          (u = (e[(a += 2) + 1] << 8) + e[a]),
          (a += 2),
          (r.coPosition = [n - s, o - u, n + s, o + u]),
          (r.mainSafetyBelt = (e[a] >> 2) & 3),
          (r.coSafetyBelt = 3 & e[a]),
          (a += 1),
          (r.mainSunvisor = (e[a] >> 2) & 3),
          (r.coSunvisor = 3 & e[a]),
          (a += 1),
          t.attribute81.push(r),
          i
        );
      }
      function _(e, t) {
        t.hasOwnProperty("attribute82") || (t.attribute82 = []);
        var r = {},
          a = 1,
          i = e[a];
        return (
          (a += 1),
          (r.plateEncode = e[a]),
          (a += 1),
          (r.plateInfoLen = e[a]),
          (a += 1),
          (r.plateInfo = e.subarray(a, a + r.plateInfoLen)),
          t.attribute82.push(r),
          i
        );
      }
      function h(e, t) {
        t.hasOwnProperty("attribute83") || (t.attribute83 = []);
        var r = {},
          a = 1,
          i = e[a];
        return (
          (a += 1),
          (r.color = {}),
          (r.color.valid = e[a]),
          (a += 1),
          (r.color.red = e[a]),
          (a += 1),
          (r.color.green = e[a]),
          (a += 1),
          (r.color.blue = e[a]),
          (a += 1),
          (r.color.alpha = e[a]),
          (a += 1),
          (r.country = String.fromCharCode.apply(null, e.subarray(a, a + 4))),
          (a += 4),
          (r.plateType = (e[a + 1] << 8) + e[a]),
          (a += 2),
          (a += 1),
          (r.plateWidth = (e[a + 1] << 8) + e[a]),
          t.attribute83.push(r),
          i
        );
      }
      function g(e, t) {
        t.hasOwnProperty("attribute84") || (t.attribute84 = []);
        var r = {},
          a = 1,
          i = e[a];
        (a += 1),
          (r.fatherCount = e[a]),
          (a += 1),
          (r.trackCount = e[a]),
          (a += 1),
          (r.trackType = e[a]),
          (a += 1),
          (a += 3),
          r.fatherCount > 0 && (r.fatherID = []);
        for (var n = 0; n < r.fatherCount; n++)
          r.fatherID.push(
            (e[a + 3] << 24) + (e[a + 2] << 16) + (e[a + 1] << 8) + e[a]
          ),
            (a += 4);
        r.trackCount > 0 && (r.track = []);
        for (var o = 0; o < r.trackCount; o++) {
          var s = (e[a + 1] << 8) + e[a],
            u = (e[(a += 2) + 1] << 8) + e[a],
            f = (e[(a += 2) + 1] << 8) + e[a],
            l = (e[(a += 2) + 1] << 8) + e[a];
          (a += 2), r.track.push([s - f, u - l, s + f, u + l]);
        }
        return t.attribute84.push(r), i;
      }
      function v(e, t) {
        t.hasOwnProperty("attribute85") || (t.attribute85 = []);
        var r = {},
          a = 1,
          i = e[a];
        (a += 1),
          (r.colorSpace = e[a]),
          (a += 1),
          (r.mainColorCount = e[a]),
          (a += 1),
          r.mainColorCount > 0 && (r.mainColorInfo = []);
        for (var n = 0; n < r.mainColorCount; n++) {
          var o = {},
            s = (e[a + 1] << 8) + e[a],
            u = (e[(a += 2) + 1] << 8) + e[a],
            f = (e[(a += 2) + 1] << 8) + e[a],
            l = (e[(a += 2) + 1] << 8) + e[a];
          (a += 2),
            (o.rect = [s - f, u - l, s + f, u + l]),
            (o.color =
              (e[a + 3] << 24) + (e[a + 2] << 16) + (e[a + 1] << 8) + e[a]),
            (a += 4),
            r.mainColorInfo.push(o);
        }
        return t.attribute85.push(r), i;
      }
      function y(e, t) {
        t.hasOwnProperty("attribute86") || (t.attribute86 = []);
        var r = {},
          a = 1,
          i = e[a];
        return (
          (a += 1),
          (a += 1),
          (r.speedType = e[a]),
          (a += 1),
          (r.speed = e[a + 1] << (8 + e[a])),
          (a += 2),
          (r.speedX = e[a + 1] << (8 + e[a])),
          (a += 2),
          (r.speedY = (e[a + 1] << 8) + e[a]),
          t.attribute86.push(r),
          i
        );
      }
      function b(e, t) {
        t.hasOwnProperty("attribute87") || (t.attribute87 = []);
        var r = {},
          a = 1,
          i = e[a];
        a += 1;
        var n = (e[(a += 2) + 1] << 8) + e[a],
          o = (e[(a += 2) + 1] << 8) + e[a],
          s = (e[(a += 2) + 1] << 8) + e[a],
          u = (e[(a += 2) + 1] << 8) + e[a];
        return (
          (r.track = [[n - s, o - u, n + s, o + u]]), t.attribute87.push(r), i
        );
      }
      function S(e, t) {
        t.hasOwnProperty("attribute88") || (t.attribute88 = []);
        var r = {},
          a = 1,
          i = e[a];
        return (
          (a += 1),
          (r.age = e[a]),
          (a += 1),
          (r.sex = e[a]),
          (a += 1),
          (r.face = e[a]),
          (a += 1),
          (r.glass = e[a]),
          (a += 1),
          (r.hat = e[a]),
          (a += 1),
          (r.call = e[a]),
          (a += 1),
          (r.backpack = e[a]),
          (a += 1),
          (r.umbrella = e[a]),
          (a += 1),
          (r.height = e[a]),
          (a += 1),
          (r.mask = (e[a] >> 2) & 3),
          (r.beard = 3 & e[a]),
          t.attribute88.push(r),
          i
        );
      }
      function D(e, t) {
        t.hasOwnProperty("attribute89") || (t.attribute89 = []);
        var r = {},
          a = 1,
          i = e[a];
        (a += 1),
          (r.yawAngle = parseInt((e[a + 1] << 8) + e[a])),
          (a += 2),
          (r.rollAngle = parseInt((e[a + 1] << 8) + e[a])),
          (a += 2),
          (r.pitchAngle = parseInt((e[a + 1] << 8) + e[a]));
        var n = (e[(a += 2) + 1] << 8) + e[a],
          o = (e[(a += 2) + 1] << 8) + e[a];
        (a += 2),
          (r.lEyePos = [n, o]),
          (n = (e[a + 1] << 8) + e[a]),
          (o = (e[(a += 2) + 1] << 8) + e[a]),
          (a += 2),
          (r.rEyePos = [n, o]),
          (n = (e[a + 1] << 8) + e[a]),
          (o = (e[(a += 2) + 1] << 8) + e[a]),
          (a += 2),
          (r.nosePos = [n, o]),
          (n = (e[a + 1] << 8) + e[a]),
          (o = (e[(a += 2) + 1] << 8) + e[a]),
          (a += 2),
          (r.lMouthPos = [n, o]),
          (n = (e[a + 1] << 8) + e[a]),
          (o = (e[(a += 2) + 1] << 8) + e[a]),
          (a += 2),
          (r.rMouthPos = [n, o]);
        var s = e[a];
        (a += 3), s > 0 && (r.featurePos = []);
        for (var u = 0; u < s; u++)
          (n = (e[a + 1] << 8) + e[a]),
            (o = (e[(a += 2) + 1] << 8) + e[a]),
            (a += 2),
            r.featurePos.push([n, o]);
        return t.attribute89.push(r), i;
      }
      function T(e, t) {
        t.hasOwnProperty("attribute8C") || (t.attribute8C = []);
        var r = {},
          a = 1,
          i = e[a];
        (a += 1),
          (r.hangingCount = e[a]),
          (a += 1),
          (r.tissueCount = e[a]),
          (a += 1),
          (r.sunVisorCount = e[a]),
          (a += 1),
          (r.annualInspectionCount = e[a]),
          (a += 1),
          (a += 6),
          r.hangingCount > 0 && (r.hangingCount = []);
        for (var n = 0; n < r.hangingCount; n++) {
          var o = (e[a + 1] << 8) + e[a],
            s = (e[(a += 2) + 1] << 8) + e[a],
            u = (e[(a += 2) + 1] << 8) + e[a],
            f = (e[(a += 2) + 1] << 8) + e[a];
          (a += 2), r.hangingPos.push([o - u, s - f, o + u, s + f]);
        }
        for (
          r.tissueCount > 0 && (r.tissueCount = []), n = 0;
          n < r.tissueCount;
          n++
        )
          (o = (e[a + 1] << 8) + e[a]),
            (s = (e[(a += 2) + 1] << 8) + e[a]),
            (u = (e[(a += 2) + 1] << 8) + e[a]),
            (f = (e[(a += 2) + 1] << 8) + e[a]),
            (a += 2),
            r.tissueCount.push([o - u, s - f, o + u, s + f]);
        for (
          r.sunVisorCount > 0 && (r.sunVisorCount = []), n = 0;
          n < r.tissueCount;
          n++
        )
          (o = (e[a + 1] << 8) + e[a]),
            (s = (e[(a += 2) + 1] << 8) + e[a]),
            (u = (e[(a += 2) + 1] << 8) + e[a]),
            (f = (e[(a += 2) + 1] << 8) + e[a]),
            (a += 2),
            r.sunVisorCount.push([o - u, s - f, o + u, s + f]);
        for (
          r.annualInspectionCount > 0 && (r.annualInspectionCount = []), n = 0;
          n < r.tissueCount;
          n++
        )
          (o = (e[a + 1] << 8) + e[a]),
            (s = (e[(a += 2) + 1] << 8) + e[a]),
            (u = (e[(a += 2) + 1] << 8) + e[a]),
            (f = (e[(a += 2) + 1] << 8) + e[a]),
            (a += 2),
            r.annualInspectionCount.push([o - u, s - f, o + u, s + f]);
        return t.attribute8C.push(r), i;
      }
      function w(e, t) {
        t.hasOwnProperty("attribute8E") || (t.attribute8E = []);
        var r = {},
          a = 1,
          i = e[a];
        (a += 1), (r.nameCodecFormat = e[a]);
        var n = e[(a += 1)];
        return (
          (a += 1),
          (r.name = String.fromCharCode.apply(null, e.subarray(a, n))),
          t.attribute8E.push(r),
          i
        );
      }
      function E(e, t) {
        for (
          var r = {
              128: d,
              129: m,
              130: _,
              131: h,
              132: g,
              133: v,
              134: y,
              135: b,
              136: S,
              137: D,
              140: T,
              142: w,
            },
            a = 0,
            i = e[a];
          a < e.length;

        ) {
          var n = e.subarray(a, e.length);
          a += r[i].call(null, n, t);
        }
      }
      function C(e, t) {
        t.hasOwnProperty("vehicleObject") || (t.vehicleObject = []);
        var r = {},
          a = 0;
        (r.type = e[a]), (a += 1);
        var i = (e[(a += 1) + 1] << 8) + e[a];
        (a += 2),
          (r.objectId =
            (e[a + 3] << 24) + (e[a + 2] << 16) + (e[a + 1] << 8) + e[a]);
        var n = (e[(a += 4) + 1] << 8) + e[a],
          o = (e[(a += 2) + 1] << 8) + e[a],
          s = (e[(a += 2) + 1] << 8) + e[a],
          u = (e[(a += 2) + 1] << 8) + e[a];
        return (
          (a += 2),
          (r.track = [[n - s, o - u, n + s, o + u]]),
          (r.valid = e[a]),
          (a += 1),
          (r.operateType = e[a]),
          (a += 1),
          (a += 2),
          E(e.subarray(a, i), r),
          t.vehicleObject.push(r),
          i
        );
      }
      function M(e, t) {
        t.hasOwnProperty("faceObject") || (t.faceObject = []);
        var r = {},
          a = 0;
        (r.type = e[a]), (a += 1);
        var i = (e[(a += 1) + 1] << 8) + e[a];
        return i < 12
          ? 0
          : ((a += 2),
            (r.objectId =
              (e[a + 3] << 24) + (e[a + 2] << 16) + (e[a + 1] << 8) + e[a]),
            (a += 4),
            (r.version = e[a]),
            (a += 1),
            (a += 3),
            (r.faceData = e.subarray(a, i)),
            t.faceObject.push(r),
            i);
      }
      function I(e, t) {
        t.hasOwnProperty("commonObject") || (t.commonObject = []);
        var r = {},
          a = 0;
        (r.type = e[a]), (a += 1);
        var i = (e[(a += 1) + 1] << 8) + e[a];
        return (
          (a += 2),
          (r.objectId =
            (e[a + 3] << 24) + (e[a + 2] << 16) + (e[a + 1] << 8) + e[a]),
          (a += 4),
          (r.operateType = e[a]),
          (a += 1),
          (a += 3),
          E(e.subarray(a, i), r),
          t.commonObject.push(r),
          i
        );
      }
      function A(e, t, r) {
        var a = 0,
          i = (e[a + 3] << 24) + (e[a + 2] << 16) + (e[a + 1] << 8) + e[a],
          n = e[(a += 4)];
        if (((a += 1), (a += 3), 0 == n)) return a;
        (t.groupId = i), (t.object = {});
        for (var o = 0; o < n; o++) {
          var s = e[a],
            u = e.subarray(a, e.length),
            f = 0;
          switch (s) {
            case 2:
            case 5:
              f = C(u, t.object);
              break;
            case 15:
              f = M(u, t.object);
              break;
            default:
              f = I(u, t.object);
          }
          if (0 == f) return 0;
          a += f;
        }
        return r(t), a;
      }
      function x(e, t, r) {
        var a = { coordinate: 8192 };
        if (t.length < 32) return !1;
        var i = 4;
        a.classID = e;
        var n = t[i];
        if (0 == n) return !0;
        (a.groupCount = n), (i += 1), (i += 7), (a.cameral = []);
        for (var o = 0; o < 20; o++) a.cameral.push(t[i + o]);
        i += 20;
        for (var s = 0; s < a.groupCount; s++) {
          var u = A(t.subarray(i, t.length), JSON.parse(JSON.stringify(a)), r);
          if (u <= 0) break;
          i += u;
        }
      }
      return (
        (i.prototype = {
          init: function () {
            a.debug.log("init");
          },
          parseRTPData: function (a, i, n, f, l, c) {
            var p,
              d = ((i[19] << 24) + (i[18] << 16) + (i[17] << 8) + i[16]) >>> 0;
            p = d >> 26 === 0 ? "2000" : "20" + (d >> 26);
            var m =
              Date.UTC(
                p,
                ((d >> 22) & 15) - 1,
                (d >> 17) & 31,
                (d >> 12) & 31,
                (d >> 6) & 63,
                63 & d
              ) / 1e3;
            if (((m -= 28800), 0 === this.firstTime))
              (this.firstTime = m),
                (this.lastMSW = 0),
                (t = (i[21] << 8) + i[20]),
                (e = { timestamp: this.firstTime, timestamp_usec: 0 });
            else {
              var _,
                h = (i[21] << 8) + i[20];
              (_ = h >= t ? h - t : h + 65535 - t),
                (this.lastMSW += _),
                m > this.firstTime && (this.lastMSW -= 1e3),
                (this.firstTime = m),
                (e = { timestamp: m, timestamp_usec: this.lastMSW }),
                (t = h);
            }
            !(function (t, a, i, n) {
              var f = a[22],
                l = a.subarray(24 + f, a.length - 8);
              switch (t) {
                case 0:
                  i({ ivsDraw: o(l), timeStamp: e, channel: n });
                  break;
                case 5:
                  i({ ivsDraw: s(l), timeStamp: e, channel: n });
                  break;
                case 6:
                  break;
                case 14:
                  var c = [];
                  if (
                    ((function (e, t) {
                      for (var a = e.length, i = 0; i + 4 < a; ) {
                        var n = e[i],
                          o = (e[i + 1], (e[i + 3] << 8) + e[i + 2]),
                          s = e.subarray(i, o);
                        if (((i += o), 161 !== n && !x(r[n - 64], s, t))) break;
                      }
                    })(l, function (e) {
                      c.push(e);
                    }),
                    c.length)
                  ) {
                    var p = { result: !1, type: 14, params: c };
                    i({ ivsDraw: p, timeStamp: e, channel: n });
                  }
                  break;
                case 20:
                  i({ ivsDraw: u(l), timeStamp: e, channel: n });
              }
            })(i[5], i, this.rtpReturnCallback, c);
          },
          setBufferfullCallback: function () {},
          setReturnCallback: function (e) {
            this.rtpReturnCallback = e;
          },
        }),
        new i()
      );
    };
  },
]);
