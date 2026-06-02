(self.webpackChunk = self.webpackChunk || []).push([
  ["606"],
  {
    5897: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        cleanupElement: function () {
          return T;
        },
        createInstance: function () {
          return g;
        },
        destroy: function () {
          return y;
        },
        init: function () {
          return E;
        },
        ready: function () {
          return m;
        },
      };
      for (var i in a)
        Object.defineProperty(t, i, { enumerable: !0, get: a[i] });
      let o = n(7933),
        r = (e, t) => e.Webflow.require("lottie")?.lottie.loadAnimation(t),
        l = (e) => !!(e.Webflow.env("design") || e.Webflow.env("preview")),
        c = { Playing: "playing", Stopped: "stopped" },
        d = new (class {
          _cache = [];
          set(e, t) {
            let n = this._cache.findIndex(({ wrapper: t }) => t === e);
            (-1 !== n && this._cache.splice(n, 1),
              this._cache.push({ wrapper: e, instance: t }));
          }
          delete(e) {
            let t = this._cache.findIndex(({ wrapper: t }) => t === e);
            -1 !== t && this._cache.splice(t, 1);
          }
          get(e) {
            let t = this._cache.findIndex(({ wrapper: t }) => t === e);
            return -1 === t ? null : (this._cache[t]?.instance ?? null);
          }
        })(),
        s = {},
        f = (e) => {
          if ("string" != typeof e) return NaN;
          let t = parseFloat(e);
          return Number.isNaN(t) ? NaN : t;
        };
      class u {
        config = null;
        currentState = c.Stopped;
        animationItem = null;
        _gsapFrame = null;
        handlers = {
          enterFrame: [],
          complete: [],
          loop: [],
          dataReady: [],
          destroy: [],
          error: [],
        };
        load(e) {
          let t = (e.dataset || s).src || "";
          (t.endsWith(".lottie")
            ? (0, o.fetchLottie)(t).then((t) => {
                this._loadAnimation(e, t);
              })
            : this._loadAnimation(e, void 0),
            d.set(e, this),
            (this.container = e));
        }
        _loadAnimation(e, t) {
          let n = e.dataset || s,
            a = n.src || "",
            i = n.preserveAspectRatio || "xMidYMid meet",
            o = n.renderer || "svg",
            d = 1 === f(n.loop),
            u = -1 === f(n.direction) ? -1 : 1,
            p = !!n.wfTarget,
            I = !p && 1 === f(n.autoplay),
            g = f(n.duration),
            T = Number.isNaN(g) ? 0 : g,
            E = p || 1 === f(n.isIx2Target),
            y = f(n.ix2InitialState),
            m = Number.isNaN(y) ? null : y,
            b = {
              src: a,
              loop: d,
              autoplay: I,
              renderer: o,
              direction: u,
              duration: T,
              hasIx2: E,
              ix2InitialValue: m,
              preserveAspectRatio: i,
            };
          if (
            this.animationItem &&
            this.config &&
            this.config.src === a &&
            o === this.config.renderer &&
            i === this.config.preserveAspectRatio
          ) {
            if (
              (d !== this.config.loop && this.setLooping(d),
              !E &&
                (u !== this.config.direction && this.setDirection(u),
                T !== this.config.duration))
            ) {
              let e = this.duration;
              T > 0 && T !== e ? this.setSpeed(e / T) : this.setSpeed(1);
            }
            (I && this.play(),
              null != m &&
                m !== this.config.ix2InitialValue &&
                this.goToFrame(this.frames * (m / 100)),
              (this.config = b));
            return;
          }
          let O = e.ownerDocument.defaultView;
          try {
            (this.animationItem && this.destroy(),
              (this.animationItem = r(O, {
                container: e,
                loop: d,
                autoplay: I,
                renderer: o,
                rendererSettings: {
                  preserveAspectRatio: i,
                  progressiveLoad: !0,
                  hideOnTransparent: !0,
                },
                ...(t ? { animationData: t } : { path: a }),
              })));
          } catch (e) {
            this.handlers.error.forEach((e) => e());
            return;
          }
          this.animationItem &&
            (l(O) &&
              (this.animationItem.addEventListener("enterFrame", () => {
                if (!this.animationItem || !this.isPlaying) return;
                let {
                    currentFrame: e,
                    totalFrames: t,
                    playDirection: n,
                  } = this.animationItem,
                  a = (e / t) * 100,
                  i = Math.round(1 === n ? a : 100 - a);
                this.handlers.enterFrame.forEach((t) => t(i, e));
              }),
              this.animationItem.addEventListener("complete", () => {
                if (this.animationItem) {
                  if (
                    this.currentState !== c.Playing ||
                    !this.animationItem.loop
                  )
                    return void this.handlers.complete.forEach((e) => e());
                  this.currentState = c.Stopped;
                }
              }),
              this.animationItem.addEventListener("loopComplete", (e) => {
                this.handlers.loop.forEach((t) => t(e));
              }),
              this.animationItem.addEventListener("data_failed", () => {
                this.handlers.error.forEach((e) => e());
              }),
              this.animationItem.addEventListener("error", () => {
                this.handlers.error.forEach((e) => e());
              })),
            this.isLoaded
              ? (this.handlers.dataReady.forEach((e) => e()), I && this.play())
              : this.animationItem.addEventListener("data_ready", () => {
                  if ((this.handlers.dataReady.forEach((e) => e()), !E)) {
                    this.setDirection(u);
                    let e = this.duration;
                    (T > 0 && T !== e && this.setSpeed(e / T),
                      I && this.play());
                  }
                  null != m && this.goToFrame(this.frames * (m / 100));
                }),
            (this.config = b));
        }
        onFrameChange(e) {
          -1 === this.handlers.enterFrame.indexOf(e) &&
            this.handlers.enterFrame.push(e);
        }
        onPlaybackComplete(e) {
          -1 === this.handlers.complete.indexOf(e) &&
            this.handlers.complete.push(e);
        }
        onLoopComplete(e) {
          -1 === this.handlers.loop.indexOf(e) && this.handlers.loop.push(e);
        }
        onDestroy(e) {
          -1 === this.handlers.destroy.indexOf(e) &&
            this.handlers.destroy.push(e);
        }
        onDataReady(e) {
          -1 === this.handlers.dataReady.indexOf(e) &&
            this.handlers.dataReady.push(e);
        }
        onError(e) {
          -1 === this.handlers.error.indexOf(e) && this.handlers.error.push(e);
        }
        play() {
          if (!this.animationItem) return;
          let e = 1 === this.animationItem.playDirection ? 0 : this.frames;
          (this.animationItem.goToAndPlay(e, !0),
            (this.currentState = c.Playing));
        }
        stop() {
          if (this.animationItem) {
            if (this.isPlaying) {
              let { playDirection: e } = this.animationItem,
                t = 1 === e ? 0 : this.frames;
              this.animationItem.goToAndStop(t, !0);
            }
            this.currentState = c.Stopped;
          }
        }
        destroy() {
          this.animationItem &&
            (this.isPlaying && this.stop(),
            this.handlers.destroy.forEach((e) => e()),
            this.container && d.delete(this.container),
            this.animationItem.destroy(),
            Object.values(this.handlers).forEach((e) => {
              e.length = 0;
            }),
            (this.animationItem = null),
            (this.container = null),
            (this.config = null));
        }
        get gsapFrame() {
          return this._gsapFrame;
        }
        set gsapFrame(e) {
          ((this._gsapFrame = e), null != e && this.goToFrameAndStop(e));
        }
        get isPlaying() {
          return !!this.animationItem && !this.animationItem.isPaused;
        }
        get isPaused() {
          return !!this.animationItem && this.animationItem.isPaused;
        }
        get duration() {
          return this.animationItem ? this.animationItem.getDuration() : 0;
        }
        get frames() {
          return this.animationItem ? this.animationItem.totalFrames : 0;
        }
        get direction() {
          return this.animationItem
            ? 1 === this.animationItem.playDirection
              ? 1
              : -1
            : 1;
        }
        get isLoaded() {
          return !!this.animationItem && this.animationItem.isLoaded;
        }
        get ix2InitialValue() {
          return this.config ? this.config.ix2InitialValue : null;
        }
        goToFrame(e) {
          this.animationItem && this.animationItem.setCurrentRawFrameValue(e);
        }
        goToFrameAndStop(e) {
          this.animationItem && this.animationItem.goToAndStop(e, !0);
        }
        setSubframe(e) {
          this.animationItem && this.animationItem.setSubframe(e);
        }
        setSpeed(e = 1) {
          this.animationItem &&
            (this.isPlaying && this.stop(), this.animationItem.setSpeed(e));
        }
        setLooping(e) {
          this.animationItem &&
            (this.isPlaying && this.stop(), (this.animationItem.loop = e));
        }
        setDirection(e) {
          this.animationItem &&
            (this.isPlaying && this.stop(),
            this.animationItem.setDirection(e),
            this.goToFrame(1 === e ? 0 : this.frames));
        }
      }
      let p = () =>
          Array.from(
            document.querySelectorAll('[data-animation-type="lottie"]'),
          ),
        I = (e) => {
          let t = e.dataset,
            n = !!t.wfTarget,
            a = 1 === f(t.isIx2Target);
          return n || a;
        },
        g = (e) => {
          let t = d.get(e);
          return (null == t && (t = new u()), t.load(e), t);
        },
        T = (e) => {
          let t = d.get(e);
          t && t.destroy();
        },
        E = () => {
          p().forEach((e) => {
            (I(e) || T(e), g(e));
          });
        },
        y = () => {
          p().forEach(T);
        },
        m = E;
    },
    2444: function (e, t, n) {
      "use strict";
      var a = n(3949),
        i = n(5897),
        o = n(8724);
      a.define(
        "lottie",
        (e.exports = function () {
          return {
            lottie: o,
            createInstance: i.createInstance,
            cleanupElement: i.cleanupElement,
            init: i.init,
            destroy: i.destroy,
            ready: i.ready,
          };
        }),
      );
    },
    5487: function () {
      "use strict";
      window.tram = (function (e) {
        function t(e, t) {
          return new U.Bare().init(e, t);
        }
        function n(e) {
          var t = parseInt(e.slice(1), 16);
          return [(t >> 16) & 255, (t >> 8) & 255, 255 & t];
        }
        function a(e, t, n) {
          return (
            "#" + (0x1000000 | (e << 16) | (t << 8) | n).toString(16).slice(1)
          );
        }
        function i() {}
        function o(e, t, n) {
          if ((void 0 !== t && (n = t), void 0 === e)) return n;
          var a = n;
          return (
            $.test(e) || !q.test(e)
              ? (a = parseInt(e, 10))
              : q.test(e) && (a = 1e3 * parseFloat(e)),
            0 > a && (a = 0),
            a == a ? a : n
          );
        }
        function r(e) {
          W.debug && window && window.console.warn(e);
        }
        var l,
          c,
          d,
          s = (function (e, t, n) {
            function a(e) {
              return "object" == typeof e;
            }
            function i(e) {
              return "function" == typeof e;
            }
            function o() {}
            return function r(l, c) {
              function d() {
                var e = new s();
                return (i(e.init) && e.init.apply(e, arguments), e);
              }
              function s() {}
              (c === n && ((c = l), (l = Object)), (d.Bare = s));
              var f,
                u = (o[e] = l[e]),
                p = (s[e] = d[e] = new o());
              return (
                (p.constructor = d),
                (d.mixin = function (t) {
                  return ((s[e] = d[e] = r(d, t)[e]), d);
                }),
                (d.open = function (e) {
                  if (
                    ((f = {}),
                    i(e) ? (f = e.call(d, p, u, d, l)) : a(e) && (f = e),
                    a(f))
                  )
                    for (var n in f) t.call(f, n) && (p[n] = f[n]);
                  return (i(p.init) || (p.init = l), d);
                }),
                d.open(c)
              );
            };
          })("prototype", {}.hasOwnProperty),
          f = {
            ease: [
              "ease",
              function (e, t, n, a) {
                var i = (e /= a) * e,
                  o = i * e;
                return (
                  t +
                  n *
                    (-2.75 * o * i + 11 * i * i + -15.5 * o + 8 * i + 0.25 * e)
                );
              },
            ],
            "ease-in": [
              "ease-in",
              function (e, t, n, a) {
                var i = (e /= a) * e,
                  o = i * e;
                return t + n * (-1 * o * i + 3 * i * i + -3 * o + 2 * i);
              },
            ],
            "ease-out": [
              "ease-out",
              function (e, t, n, a) {
                var i = (e /= a) * e,
                  o = i * e;
                return (
                  t +
                  n *
                    (0.3 * o * i + -1.6 * i * i + 2.2 * o + -1.8 * i + 1.9 * e)
                );
              },
            ],
            "ease-in-out": [
              "ease-in-out",
              function (e, t, n, a) {
                var i = (e /= a) * e,
                  o = i * e;
                return t + n * (2 * o * i + -5 * i * i + 2 * o + 2 * i);
              },
            ],
            linear: [
              "linear",
              function (e, t, n, a) {
                return (n * e) / a + t;
              },
            ],
            "ease-in-quad": [
              "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
              function (e, t, n, a) {
                return n * (e /= a) * e + t;
              },
            ],
            "ease-out-quad": [
              "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
              function (e, t, n, a) {
                return -n * (e /= a) * (e - 2) + t;
              },
            ],
            "ease-in-out-quad": [
              "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
              function (e, t, n, a) {
                return (e /= a / 2) < 1
                  ? (n / 2) * e * e + t
                  : (-n / 2) * (--e * (e - 2) - 1) + t;
              },
            ],
            "ease-in-cubic": [
              "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
              function (e, t, n, a) {
                return n * (e /= a) * e * e + t;
              },
            ],
            "ease-out-cubic": [
              "cubic-bezier(0.215, 0.610, 0.355, 1)",
              function (e, t, n, a) {
                return n * ((e = e / a - 1) * e * e + 1) + t;
              },
            ],
            "ease-in-out-cubic": [
              "cubic-bezier(0.645, 0.045, 0.355, 1)",
              function (e, t, n, a) {
                return (e /= a / 2) < 1
                  ? (n / 2) * e * e * e + t
                  : (n / 2) * ((e -= 2) * e * e + 2) + t;
              },
            ],
            "ease-in-quart": [
              "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
              function (e, t, n, a) {
                return n * (e /= a) * e * e * e + t;
              },
            ],
            "ease-out-quart": [
              "cubic-bezier(0.165, 0.840, 0.440, 1)",
              function (e, t, n, a) {
                return -n * ((e = e / a - 1) * e * e * e - 1) + t;
              },
            ],
            "ease-in-out-quart": [
              "cubic-bezier(0.770, 0, 0.175, 1)",
              function (e, t, n, a) {
                return (e /= a / 2) < 1
                  ? (n / 2) * e * e * e * e + t
                  : (-n / 2) * ((e -= 2) * e * e * e - 2) + t;
              },
            ],
            "ease-in-quint": [
              "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
              function (e, t, n, a) {
                return n * (e /= a) * e * e * e * e + t;
              },
            ],
            "ease-out-quint": [
              "cubic-bezier(0.230, 1, 0.320, 1)",
              function (e, t, n, a) {
                return n * ((e = e / a - 1) * e * e * e * e + 1) + t;
              },
            ],
            "ease-in-out-quint": [
              "cubic-bezier(0.860, 0, 0.070, 1)",
              function (e, t, n, a) {
                return (e /= a / 2) < 1
                  ? (n / 2) * e * e * e * e * e + t
                  : (n / 2) * ((e -= 2) * e * e * e * e + 2) + t;
              },
            ],
            "ease-in-sine": [
              "cubic-bezier(0.470, 0, 0.745, 0.715)",
              function (e, t, n, a) {
                return -n * Math.cos((e / a) * (Math.PI / 2)) + n + t;
              },
            ],
            "ease-out-sine": [
              "cubic-bezier(0.390, 0.575, 0.565, 1)",
              function (e, t, n, a) {
                return n * Math.sin((e / a) * (Math.PI / 2)) + t;
              },
            ],
            "ease-in-out-sine": [
              "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
              function (e, t, n, a) {
                return (-n / 2) * (Math.cos((Math.PI * e) / a) - 1) + t;
              },
            ],
            "ease-in-expo": [
              "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
              function (e, t, n, a) {
                return 0 === e ? t : n * Math.pow(2, 10 * (e / a - 1)) + t;
              },
            ],
            "ease-out-expo": [
              "cubic-bezier(0.190, 1, 0.220, 1)",
              function (e, t, n, a) {
                return e === a
                  ? t + n
                  : n * (-Math.pow(2, (-10 * e) / a) + 1) + t;
              },
            ],
            "ease-in-out-expo": [
              "cubic-bezier(1, 0, 0, 1)",
              function (e, t, n, a) {
                return 0 === e
                  ? t
                  : e === a
                    ? t + n
                    : (e /= a / 2) < 1
                      ? (n / 2) * Math.pow(2, 10 * (e - 1)) + t
                      : (n / 2) * (-Math.pow(2, -10 * --e) + 2) + t;
              },
            ],
            "ease-in-circ": [
              "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
              function (e, t, n, a) {
                return -n * (Math.sqrt(1 - (e /= a) * e) - 1) + t;
              },
            ],
            "ease-out-circ": [
              "cubic-bezier(0.075, 0.820, 0.165, 1)",
              function (e, t, n, a) {
                return n * Math.sqrt(1 - (e = e / a - 1) * e) + t;
              },
            ],
            "ease-in-out-circ": [
              "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
              function (e, t, n, a) {
                return (e /= a / 2) < 1
                  ? (-n / 2) * (Math.sqrt(1 - e * e) - 1) + t
                  : (n / 2) * (Math.sqrt(1 - (e -= 2) * e) + 1) + t;
              },
            ],
            "ease-in-back": [
              "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
              function (e, t, n, a, i) {
                return (
                  void 0 === i && (i = 1.70158),
                  n * (e /= a) * e * ((i + 1) * e - i) + t
                );
              },
            ],
            "ease-out-back": [
              "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
              function (e, t, n, a, i) {
                return (
                  void 0 === i && (i = 1.70158),
                  n * ((e = e / a - 1) * e * ((i + 1) * e + i) + 1) + t
                );
              },
            ],
            "ease-in-out-back": [
              "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
              function (e, t, n, a, i) {
                return (
                  void 0 === i && (i = 1.70158),
                  (e /= a / 2) < 1
                    ? (n / 2) * e * e * (((i *= 1.525) + 1) * e - i) + t
                    : (n / 2) *
                        ((e -= 2) * e * (((i *= 1.525) + 1) * e + i) + 2) +
                      t
                );
              },
            ],
          },
          u = {
            "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
            "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
            "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
          },
          p = window,
          I = "bkwld-tram",
          g = /[\-\.0-9]/g,
          T = /[A-Z]/,
          E = "number",
          y = /^(rgb|#)/,
          m = /(em|cm|mm|in|pt|pc|px)$/,
          b = /(em|cm|mm|in|pt|pc|px|%)$/,
          O = /(deg|rad|turn)$/,
          v = "unitless",
          L = /(all|none) 0s ease 0s/,
          R = /^(width|height)$/,
          _ = document.createElement("a"),
          S = ["Webkit", "Moz", "O", "ms"],
          h = ["-webkit-", "-moz-", "-o-", "-ms-"],
          A = function (e) {
            if (e in _.style) return { dom: e, css: e };
            var t,
              n,
              a = "",
              i = e.split("-");
            for (t = 0; t < i.length; t++)
              a += i[t].charAt(0).toUpperCase() + i[t].slice(1);
            for (t = 0; t < S.length; t++)
              if ((n = S[t] + a) in _.style) return { dom: n, css: h[t] + e };
          },
          N = (t.support = {
            bind: Function.prototype.bind,
            transform: A("transform"),
            transition: A("transition"),
            backface: A("backface-visibility"),
            timing: A("transition-timing-function"),
          });
        if (N.transition) {
          var C = N.timing.dom;
          if (((_.style[C] = f["ease-in-back"][0]), !_.style[C]))
            for (var w in u) f[w][0] = u[w];
        }
        var M = (t.frame =
            (l =
              p.requestAnimationFrame ||
              p.webkitRequestAnimationFrame ||
              p.mozRequestAnimationFrame ||
              p.oRequestAnimationFrame ||
              p.msRequestAnimationFrame) && N.bind
              ? l.bind(p)
              : function (e) {
                  p.setTimeout(e, 16);
                }),
          V = (t.now =
            (d =
              (c = p.performance) &&
              (c.now || c.webkitNow || c.msNow || c.mozNow)) && N.bind
              ? d.bind(c)
              : Date.now ||
                function () {
                  return +new Date();
                }),
          x = s(function (t) {
            function n(e, t) {
              var n = (function (e) {
                  for (var t = -1, n = e ? e.length : 0, a = []; ++t < n; ) {
                    var i = e[t];
                    i && a.push(i);
                  }
                  return a;
                })(("" + e).split(" ")),
                a = n[0];
              t = t || {};
              var i = j[a];
              if (!i) return r("Unsupported property: " + a);
              if (!t.weak || !this.props[a]) {
                var o = i[0],
                  l = this.props[a];
                return (
                  l || (l = this.props[a] = new o.Bare()),
                  l.init(this.$el, n, i, t),
                  l
                );
              }
            }
            function a(e, t, a) {
              if (e) {
                var r = typeof e;
                if (
                  (t ||
                    (this.timer && this.timer.destroy(),
                    (this.queue = []),
                    (this.active = !1)),
                  "number" == r && t)
                )
                  return (
                    (this.timer = new B({
                      duration: e,
                      context: this,
                      complete: i,
                    })),
                    void (this.active = !0)
                  );
                if ("string" == r && t) {
                  switch (e) {
                    case "hide":
                      c.call(this);
                      break;
                    case "stop":
                      l.call(this);
                      break;
                    case "redraw":
                      d.call(this);
                      break;
                    default:
                      n.call(this, e, a && a[1]);
                  }
                  return i.call(this);
                }
                if ("function" == r) return void e.call(this, this);
                if ("object" == r) {
                  var u = 0;
                  (f.call(
                    this,
                    e,
                    function (e, t) {
                      (e.span > u && (u = e.span), e.stop(), e.animate(t));
                    },
                    function (e) {
                      "wait" in e && (u = o(e.wait, 0));
                    },
                  ),
                    s.call(this),
                    u > 0 &&
                      ((this.timer = new B({ duration: u, context: this })),
                      (this.active = !0),
                      t && (this.timer.complete = i)));
                  var p = this,
                    I = !1,
                    g = {};
                  M(function () {
                    (f.call(p, e, function (e) {
                      e.active && ((I = !0), (g[e.name] = e.nextStyle));
                    }),
                      I && p.$el.css(g));
                  });
                }
              }
            }
            function i() {
              if (
                (this.timer && this.timer.destroy(),
                (this.active = !1),
                this.queue.length)
              ) {
                var e = this.queue.shift();
                a.call(this, e.options, !0, e.args);
              }
            }
            function l(e) {
              var t;
              (this.timer && this.timer.destroy(),
                (this.queue = []),
                (this.active = !1),
                "string" == typeof e
                  ? ((t = {})[e] = 1)
                  : (t = "object" == typeof e && null != e ? e : this.props),
                f.call(this, t, u),
                s.call(this));
            }
            function c() {
              (l.call(this), (this.el.style.display = "none"));
            }
            function d() {
              this.el.offsetHeight;
            }
            function s() {
              var e,
                t,
                n = [];
              for (e in (this.upstream && n.push(this.upstream), this.props))
                (t = this.props[e]).active && n.push(t.string);
              ((n = n.join(",")),
                this.style !== n &&
                  ((this.style = n), (this.el.style[N.transition.dom] = n)));
            }
            function f(e, t, a) {
              var i,
                o,
                r,
                l,
                c = t !== u,
                d = {};
              for (i in e)
                ((r = e[i]),
                  i in z
                    ? (d.transform || (d.transform = {}), (d.transform[i] = r))
                    : (T.test(i) &&
                        (i = i.replace(/[A-Z]/g, function (e) {
                          return "-" + e.toLowerCase();
                        })),
                      i in j ? (d[i] = r) : (l || (l = {}), (l[i] = r))));
              for (i in d) {
                if (((r = d[i]), !(o = this.props[i]))) {
                  if (!c) continue;
                  o = n.call(this, i);
                }
                t.call(this, o, r);
              }
              a && l && a.call(this, l);
            }
            function u(e) {
              e.stop();
            }
            function p(e, t) {
              e.set(t);
            }
            function g(e) {
              this.$el.css(e);
            }
            function E(e, n) {
              t[e] = function () {
                return this.children
                  ? y.call(this, n, arguments)
                  : (this.el && n.apply(this, arguments), this);
              };
            }
            function y(e, t) {
              var n,
                a = this.children.length;
              for (n = 0; a > n; n++) e.apply(this.children[n], t);
              return this;
            }
            ((t.init = function (t) {
              if (
                ((this.$el = e(t)),
                (this.el = this.$el[0]),
                (this.props = {}),
                (this.queue = []),
                (this.style = ""),
                (this.active = !1),
                W.keepInherited && !W.fallback)
              ) {
                var n = Y(this.el, "transition");
                n && !L.test(n) && (this.upstream = n);
              }
              N.backface &&
                W.hideBackface &&
                H(this.el, N.backface.css, "hidden");
            }),
              E("add", n),
              E("start", a),
              E("wait", function (e) {
                ((e = o(e, 0)),
                  this.active
                    ? this.queue.push({ options: e })
                    : ((this.timer = new B({
                        duration: e,
                        context: this,
                        complete: i,
                      })),
                      (this.active = !0)));
              }),
              E("then", function (e) {
                return this.active
                  ? (this.queue.push({ options: e, args: arguments }),
                    void (this.timer.complete = i))
                  : r(
                      "No active transition timer. Use start() or wait() before then().",
                    );
              }),
              E("next", i),
              E("stop", l),
              E("set", function (e) {
                (l.call(this, e), f.call(this, e, p, g));
              }),
              E("show", function (e) {
                ("string" != typeof e && (e = "block"),
                  (this.el.style.display = e));
              }),
              E("hide", c),
              E("redraw", d),
              E("destroy", function () {
                (l.call(this),
                  e.removeData(this.el, I),
                  (this.$el = this.el = null));
              }));
          }),
          U = s(x, function (t) {
            function n(t, n) {
              var a = e.data(t, I) || e.data(t, I, new x.Bare());
              return (a.el || a.init(t), n ? a.start(n) : a);
            }
            t.init = function (t, a) {
              var i = e(t);
              if (!i.length) return this;
              if (1 === i.length) return n(i[0], a);
              var o = [];
              return (
                i.each(function (e, t) {
                  o.push(n(t, a));
                }),
                (this.children = o),
                this
              );
            };
          }),
          P = s(function (e) {
            function t() {
              var e = this.get();
              this.update("auto");
              var t = this.get();
              return (this.update(e), t);
            }
            ((e.init = function (e, t, n, a) {
              ((this.$el = e), (this.el = e[0]));
              var i,
                r,
                l,
                c = t[0];
              (n[2] && (c = n[2]),
                Q[c] && (c = Q[c]),
                (this.name = c),
                (this.type = n[1]),
                (this.duration = o(t[1], this.duration, 500)),
                (this.ease =
                  ((i = t[2]),
                  (r = this.ease),
                  (l = "ease"),
                  void 0 !== r && (l = r),
                  i in f ? i : l)),
                (this.delay = o(t[3], this.delay, 0)),
                (this.span = this.duration + this.delay),
                (this.active = !1),
                (this.nextStyle = null),
                (this.auto = R.test(this.name)),
                (this.unit = a.unit || this.unit || W.defaultUnit),
                (this.angle = a.angle || this.angle || W.defaultAngle),
                W.fallback || a.fallback
                  ? (this.animate = this.fallback)
                  : ((this.animate = this.transition),
                    (this.string =
                      this.name +
                      " " +
                      this.duration +
                      "ms" +
                      ("ease" != this.ease ? " " + f[this.ease][0] : "") +
                      (this.delay ? " " + this.delay + "ms" : ""))));
            }),
              (e.set = function (e) {
                ((e = this.convert(e, this.type)),
                  this.update(e),
                  this.redraw());
              }),
              (e.transition = function (e) {
                ((this.active = !0),
                  (e = this.convert(e, this.type)),
                  this.auto &&
                    ("auto" == this.el.style[this.name] &&
                      (this.update(this.get()), this.redraw()),
                    "auto" == e && (e = t.call(this))),
                  (this.nextStyle = e));
              }),
              (e.fallback = function (e) {
                var n =
                  this.el.style[this.name] ||
                  this.convert(this.get(), this.type);
                ((e = this.convert(e, this.type)),
                  this.auto &&
                    ("auto" == n && (n = this.convert(this.get(), this.type)),
                    "auto" == e && (e = t.call(this))),
                  (this.tween = new D({
                    from: n,
                    to: e,
                    duration: this.duration,
                    delay: this.delay,
                    ease: this.ease,
                    update: this.update,
                    context: this,
                  })));
              }),
              (e.get = function () {
                return Y(this.el, this.name);
              }),
              (e.update = function (e) {
                H(this.el, this.name, e);
              }),
              (e.stop = function () {
                (this.active || this.nextStyle) &&
                  ((this.active = !1),
                  (this.nextStyle = null),
                  H(this.el, this.name, this.get()));
                var e = this.tween;
                e && e.context && e.destroy();
              }),
              (e.convert = function (e, t) {
                if ("auto" == e && this.auto) return e;
                var n,
                  i,
                  o = "number" == typeof e,
                  l = "string" == typeof e;
                switch (t) {
                  case E:
                    if (o) return e;
                    if (l && "" === e.replace(g, "")) return +e;
                    i = "number(unitless)";
                    break;
                  case y:
                    if (l) {
                      if ("" === e && this.original) return this.original;
                      if (t.test(e))
                        return "#" == e.charAt(0) && 7 == e.length
                          ? e
                          : ((n = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(e))
                              ? a(n[1], n[2], n[3])
                              : e
                            ).replace(/#(\w)(\w)(\w)$/, "#$1$1$2$2$3$3");
                    }
                    i = "hex or rgb string";
                    break;
                  case m:
                    if (o) return e + this.unit;
                    if (l && t.test(e)) return e;
                    i = "number(px) or string(unit)";
                    break;
                  case b:
                    if (o) return e + this.unit;
                    if (l && t.test(e)) return e;
                    i = "number(px) or string(unit or %)";
                    break;
                  case O:
                    if (o) return e + this.angle;
                    if (l && t.test(e)) return e;
                    i = "number(deg) or string(angle)";
                    break;
                  case v:
                    if (o || (l && b.test(e))) return e;
                    i = "number(unitless) or string(unit or %)";
                }
                return (
                  r(
                    "Type warning: Expected: [" +
                      i +
                      "] Got: [" +
                      typeof e +
                      "] " +
                      e,
                  ),
                  e
                );
              }),
              (e.redraw = function () {
                this.el.offsetHeight;
              }));
          }),
          G = s(P, function (e, t) {
            e.init = function () {
              (t.init.apply(this, arguments),
                this.original || (this.original = this.convert(this.get(), y)));
            };
          }),
          F = s(P, function (e, t) {
            ((e.init = function () {
              (t.init.apply(this, arguments), (this.animate = this.fallback));
            }),
              (e.get = function () {
                return this.$el[this.name]();
              }),
              (e.update = function (e) {
                this.$el[this.name](e);
              }));
          }),
          k = s(P, function (e, t) {
            function n(e, t) {
              var n, a, i, o, r;
              for (n in e)
                ((i = (o = z[n])[0]),
                  (a = o[1] || n),
                  (r = this.convert(e[n], i)),
                  t.call(this, a, r, i));
            }
            ((e.init = function () {
              (t.init.apply(this, arguments),
                this.current ||
                  ((this.current = {}),
                  z.perspective &&
                    W.perspective &&
                    ((this.current.perspective = W.perspective),
                    H(this.el, this.name, this.style(this.current)),
                    this.redraw())));
            }),
              (e.set = function (e) {
                (n.call(this, e, function (e, t) {
                  this.current[e] = t;
                }),
                  H(this.el, this.name, this.style(this.current)),
                  this.redraw());
              }),
              (e.transition = function (e) {
                var t = this.values(e);
                this.tween = new X({
                  current: this.current,
                  values: t,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                });
                var n,
                  a = {};
                for (n in this.current) a[n] = n in t ? t[n] : this.current[n];
                ((this.active = !0), (this.nextStyle = this.style(a)));
              }),
              (e.fallback = function (e) {
                var t = this.values(e);
                this.tween = new X({
                  current: this.current,
                  values: t,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                });
              }),
              (e.update = function () {
                H(this.el, this.name, this.style(this.current));
              }),
              (e.style = function (e) {
                var t,
                  n = "";
                for (t in e) n += t + "(" + e[t] + ") ";
                return n;
              }),
              (e.values = function (e) {
                var t,
                  a = {};
                return (
                  n.call(this, e, function (e, n, i) {
                    ((a[e] = n),
                      void 0 === this.current[e] &&
                        ((t = 0),
                        ~e.indexOf("scale") && (t = 1),
                        (this.current[e] = this.convert(t, i))));
                  }),
                  a
                );
              }));
          }),
          D = s(function (t) {
            function o() {
              var e,
                t,
                n,
                a = c.length;
              if (a)
                for (M(o), t = V(), e = a; e--; ) (n = c[e]) && n.render(t);
            }
            var l = { ease: f.ease[1], from: 0, to: 1 };
            ((t.init = function (e) {
              ((this.duration = e.duration || 0), (this.delay = e.delay || 0));
              var t = e.ease || l.ease;
              (f[t] && (t = f[t][1]),
                "function" != typeof t && (t = l.ease),
                (this.ease = t),
                (this.update = e.update || i),
                (this.complete = e.complete || i),
                (this.context = e.context || this),
                (this.name = e.name));
              var n = e.from,
                a = e.to;
              (void 0 === n && (n = l.from),
                void 0 === a && (a = l.to),
                (this.unit = e.unit || ""),
                "number" == typeof n && "number" == typeof a
                  ? ((this.begin = n), (this.change = a - n))
                  : this.format(a, n),
                (this.value = this.begin + this.unit),
                (this.start = V()),
                !1 !== e.autoplay && this.play());
            }),
              (t.play = function () {
                this.active ||
                  (this.start || (this.start = V()),
                  (this.active = !0),
                  1 === c.push(this) && M(o));
              }),
              (t.stop = function () {
                var t, n;
                this.active &&
                  ((this.active = !1),
                  (n = e.inArray(this, c)) >= 0 &&
                    ((t = c.slice(n + 1)),
                    (c.length = n),
                    t.length && (c = c.concat(t))));
              }),
              (t.render = function (e) {
                var t,
                  n = e - this.start;
                if (this.delay) {
                  if (n <= this.delay) return;
                  n -= this.delay;
                }
                if (n < this.duration) {
                  var i,
                    o,
                    r = this.ease(n, 0, 1, this.duration);
                  return (
                    (t = this.startRGB
                      ? ((i = this.startRGB),
                        (o = this.endRGB),
                        a(
                          i[0] + r * (o[0] - i[0]),
                          i[1] + r * (o[1] - i[1]),
                          i[2] + r * (o[2] - i[2]),
                        ))
                      : Math.round((this.begin + r * this.change) * d) / d),
                    (this.value = t + this.unit),
                    void this.update.call(this.context, this.value)
                  );
                }
                ((t = this.endHex || this.begin + this.change),
                  (this.value = t + this.unit),
                  this.update.call(this.context, this.value),
                  this.complete.call(this.context),
                  this.destroy());
              }),
              (t.format = function (e, t) {
                if (((t += ""), "#" == (e += "").charAt(0)))
                  return (
                    (this.startRGB = n(t)),
                    (this.endRGB = n(e)),
                    (this.endHex = e),
                    (this.begin = 0),
                    void (this.change = 1)
                  );
                if (!this.unit) {
                  var a = t.replace(g, "");
                  (a !== e.replace(g, "") &&
                    r("Units do not match [tween]: " + t + ", " + e),
                    (this.unit = a));
                }
                ((t = parseFloat(t)),
                  (e = parseFloat(e)),
                  (this.begin = this.value = t),
                  (this.change = e - t));
              }),
              (t.destroy = function () {
                (this.stop(),
                  (this.context = null),
                  (this.ease = this.update = this.complete = i));
              }));
            var c = [],
              d = 1e3;
          }),
          B = s(D, function (e) {
            ((e.init = function (e) {
              ((this.duration = e.duration || 0),
                (this.complete = e.complete || i),
                (this.context = e.context),
                this.play());
            }),
              (e.render = function (e) {
                e - this.start < this.duration ||
                  (this.complete.call(this.context), this.destroy());
              }));
          }),
          X = s(D, function (e, t) {
            ((e.init = function (e) {
              var t, n;
              for (t in ((this.context = e.context),
              (this.update = e.update),
              (this.tweens = []),
              (this.current = e.current),
              e.values))
                ((n = e.values[t]),
                  this.current[t] !== n &&
                    this.tweens.push(
                      new D({
                        name: t,
                        from: this.current[t],
                        to: n,
                        duration: e.duration,
                        delay: e.delay,
                        ease: e.ease,
                        autoplay: !1,
                      }),
                    ));
              this.play();
            }),
              (e.render = function (e) {
                var t,
                  n,
                  a = this.tweens.length,
                  i = !1;
                for (t = a; t--; )
                  (n = this.tweens[t]).context &&
                    (n.render(e), (this.current[n.name] = n.value), (i = !0));
                return i
                  ? void (this.update && this.update.call(this.context))
                  : this.destroy();
              }),
              (e.destroy = function () {
                if ((t.destroy.call(this), this.tweens)) {
                  var e;
                  for (e = this.tweens.length; e--; ) this.tweens[e].destroy();
                  ((this.tweens = null), (this.current = null));
                }
              }));
          }),
          W = (t.config = {
            debug: !1,
            defaultUnit: "px",
            defaultAngle: "deg",
            keepInherited: !1,
            hideBackface: !1,
            perspective: "",
            fallback: !N.transition,
            agentTests: [],
          });
        ((t.fallback = function (e) {
          if (!N.transition) return (W.fallback = !0);
          W.agentTests.push("(" + e + ")");
          var t = RegExp(W.agentTests.join("|"), "i");
          W.fallback = t.test(navigator.userAgent);
        }),
          t.fallback("6.0.[2-5] Safari"),
          (t.tween = function (e) {
            return new D(e);
          }),
          (t.delay = function (e, t, n) {
            return new B({ complete: t, duration: e, context: n });
          }),
          (e.fn.tram = function (e) {
            return t.call(null, this, e);
          }));
        var H = e.style,
          Y = e.css,
          Q = { transform: N.transform && N.transform.css },
          j = {
            color: [G, y],
            background: [G, y, "background-color"],
            "outline-color": [G, y],
            "border-color": [G, y],
            "border-top-color": [G, y],
            "border-right-color": [G, y],
            "border-bottom-color": [G, y],
            "border-left-color": [G, y],
            "border-width": [P, m],
            "border-top-width": [P, m],
            "border-right-width": [P, m],
            "border-bottom-width": [P, m],
            "border-left-width": [P, m],
            "border-spacing": [P, m],
            "letter-spacing": [P, m],
            margin: [P, m],
            "margin-top": [P, m],
            "margin-right": [P, m],
            "margin-bottom": [P, m],
            "margin-left": [P, m],
            padding: [P, m],
            "padding-top": [P, m],
            "padding-right": [P, m],
            "padding-bottom": [P, m],
            "padding-left": [P, m],
            "outline-width": [P, m],
            opacity: [P, E],
            top: [P, b],
            right: [P, b],
            bottom: [P, b],
            left: [P, b],
            "font-size": [P, b],
            "text-indent": [P, b],
            "word-spacing": [P, b],
            width: [P, b],
            "min-width": [P, b],
            "max-width": [P, b],
            height: [P, b],
            "min-height": [P, b],
            "max-height": [P, b],
            "line-height": [P, v],
            "scroll-top": [F, E, "scrollTop"],
            "scroll-left": [F, E, "scrollLeft"],
          },
          z = {};
        (N.transform &&
          ((j.transform = [k]),
          (z = {
            x: [b, "translateX"],
            y: [b, "translateY"],
            rotate: [O],
            rotateX: [O],
            rotateY: [O],
            scale: [E],
            scaleX: [E],
            scaleY: [E],
            skew: [O],
            skewX: [O],
            skewY: [O],
          })),
          N.transform &&
            N.backface &&
            ((z.z = [b, "translateZ"]),
            (z.rotateZ = [O]),
            (z.scaleZ = [E]),
            (z.perspective = [m])));
        var $ = /ms/,
          q = /s|\./;
        return (e.tram = t);
      })(window.jQuery);
    },
    5756: function (e, t, n) {
      "use strict";
      var a,
        i,
        o,
        r,
        l,
        c,
        d,
        s,
        f,
        u,
        p,
        I,
        g,
        T,
        E,
        y,
        m,
        b,
        O,
        v,
        L = window.$,
        R = n(5487) && L.tram;
      (((a = {}).VERSION = "1.6.0-Webflow"),
        (i = {}),
        (o = Array.prototype),
        (r = Object.prototype),
        (l = Function.prototype),
        o.push,
        (c = o.slice),
        o.concat,
        r.toString,
        (d = r.hasOwnProperty),
        (s = o.forEach),
        (f = o.map),
        o.reduce,
        o.reduceRight,
        (u = o.filter),
        o.every,
        (p = o.some),
        (I = o.indexOf),
        o.lastIndexOf,
        (g = Object.keys),
        l.bind,
        (T =
          a.each =
          a.forEach =
            function (e, t, n) {
              if (null == e) return e;
              if (s && e.forEach === s) e.forEach(t, n);
              else if (e.length === +e.length) {
                for (var o = 0, r = e.length; o < r; o++)
                  if (t.call(n, e[o], o, e) === i) return;
              } else
                for (var l = a.keys(e), o = 0, r = l.length; o < r; o++)
                  if (t.call(n, e[l[o]], l[o], e) === i) return;
              return e;
            }),
        (a.map = a.collect =
          function (e, t, n) {
            var a = [];
            return null == e
              ? a
              : f && e.map === f
                ? e.map(t, n)
                : (T(e, function (e, i, o) {
                    a.push(t.call(n, e, i, o));
                  }),
                  a);
          }),
        (a.find = a.detect =
          function (e, t, n) {
            var a;
            return (
              E(e, function (e, i, o) {
                if (t.call(n, e, i, o)) return ((a = e), !0);
              }),
              a
            );
          }),
        (a.filter = a.select =
          function (e, t, n) {
            var a = [];
            return null == e
              ? a
              : u && e.filter === u
                ? e.filter(t, n)
                : (T(e, function (e, i, o) {
                    t.call(n, e, i, o) && a.push(e);
                  }),
                  a);
          }),
        (E =
          a.some =
          a.any =
            function (e, t, n) {
              t || (t = a.identity);
              var o = !1;
              return null == e
                ? o
                : p && e.some === p
                  ? e.some(t, n)
                  : (T(e, function (e, a, r) {
                      if (o || (o = t.call(n, e, a, r))) return i;
                    }),
                    !!o);
            }),
        (a.contains = a.include =
          function (e, t) {
            return (
              null != e &&
              (I && e.indexOf === I
                ? -1 != e.indexOf(t)
                : E(e, function (e) {
                    return e === t;
                  }))
            );
          }),
        (a.delay = function (e, t) {
          var n = c.call(arguments, 2);
          return setTimeout(function () {
            return e.apply(null, n);
          }, t);
        }),
        (a.defer = function (e) {
          return a.delay.apply(a, [e, 1].concat(c.call(arguments, 1)));
        }),
        (a.throttle = function (e) {
          var t, n, a;
          return function () {
            t ||
              ((t = !0),
              (n = arguments),
              (a = this),
              R.frame(function () {
                ((t = !1), e.apply(a, n));
              }));
          };
        }),
        (a.debounce = function (e, t, n) {
          var i,
            o,
            r,
            l,
            c,
            d = function () {
              var s = a.now() - l;
              s < t
                ? (i = setTimeout(d, t - s))
                : ((i = null), n || ((c = e.apply(r, o)), (r = o = null)));
            };
          return function () {
            ((r = this), (o = arguments), (l = a.now()));
            var s = n && !i;
            return (
              i || (i = setTimeout(d, t)),
              s && ((c = e.apply(r, o)), (r = o = null)),
              c
            );
          };
        }),
        (a.defaults = function (e) {
          if (!a.isObject(e)) return e;
          for (var t = 1, n = arguments.length; t < n; t++) {
            var i = arguments[t];
            for (var o in i) void 0 === e[o] && (e[o] = i[o]);
          }
          return e;
        }),
        (a.keys = function (e) {
          if (!a.isObject(e)) return [];
          if (g) return g(e);
          var t = [];
          for (var n in e) a.has(e, n) && t.push(n);
          return t;
        }),
        (a.has = function (e, t) {
          return d.call(e, t);
        }),
        (a.isObject = function (e) {
          return e === Object(e);
        }),
        (a.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (a.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        }),
        (y = /(.)^/),
        (m = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        }),
        (b = /\\|'|\r|\n|\u2028|\u2029/g),
        (O = function (e) {
          return "\\" + m[e];
        }),
        (v = /^\s*(\w|\$)+\s*$/),
        (a.template = function (e, t, n) {
          !t && n && (t = n);
          var i,
            o = RegExp(
              [
                ((t = a.defaults({}, t, a.templateSettings)).escape || y)
                  .source,
                (t.interpolate || y).source,
                (t.evaluate || y).source,
              ].join("|") + "|$",
              "g",
            ),
            r = 0,
            l = "__p+='";
          (e.replace(o, function (t, n, a, i, o) {
            return (
              (l += e.slice(r, o).replace(b, O)),
              (r = o + t.length),
              n
                ? (l += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'")
                : a
                  ? (l += "'+\n((__t=(" + a + "))==null?'':__t)+\n'")
                  : i && (l += "';\n" + i + "\n__p+='"),
              t
            );
          }),
            (l += "';\n"));
          var c = t.variable;
          if (c) {
            if (!v.test(c))
              throw Error("variable is not a bare identifier: " + c);
          } else ((l = "with(obj||{}){\n" + l + "}\n"), (c = "obj"));
          l =
            "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" +
            l +
            "return __p;\n";
          try {
            i = Function(t.variable || "obj", "_", l);
          } catch (e) {
            throw ((e.source = l), e);
          }
          var d = function (e) {
            return i.call(this, e, a);
          };
          return ((d.source = "function(" + c + "){\n" + l + "}"), d);
        }),
        (e.exports = a));
    },
    9461: function (e, t, n) {
      "use strict";
      var a = n(3949);
      a.define(
        "brand",
        (e.exports = function (e) {
          var t,
            n = {},
            i = document,
            o = e("html"),
            r = e("body"),
            l = window.location,
            c = /PhantomJS/i.test(navigator.userAgent),
            d =
              "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange";
          function s() {
            var n =
              i.fullScreen ||
              i.mozFullScreen ||
              i.webkitIsFullScreen ||
              i.msFullscreenElement ||
              !!i.webkitFullscreenElement;
            e(t).attr("style", n ? "display: none !important;" : "");
          }
        //   function f() {
        //     var e = r.children(".w-webflow-badge"),
        //       n = e.length && e.get(0) === t,
        //       i = a.env("editor");
        //     if (n) {
        //       i && e.remove();
        //       return;
        //     }
        //     (e.length && e.remove(), i || r.append(t));
        //   }
          return (
            // (n.ready = function () {
            //   var n,
            //     a,
            //     r,
            //     u = o.attr("data-wf-status"),
            //     p = o.attr("data-wf-domain") || "";
            //   (/\.webflow\.io$/i.test(p) && l.hostname !== p && (u = !0),
            //     u &&
            //       !c &&
            //       ((t =
            //         t ||
            //         ((n = e('<a class="w-webflow-badge"></a>').attr(
            //           "href",
            //           "https://webflow.com?utm_campaign=brandjs",
            //         )),
            //         (a = e("<img>")
            //           .attr(
            //             "src",
            //             "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-icon-d2.89e12c322e.svg",
            //           )
            //           .attr("alt", "")
            //           .css({ marginRight: "4px", width: "26px" })),
            //         (r = e("<img>")
            //           .attr(
            //             "src",
            //             "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-text-d2.c82cec3b78.svg",
            //           )
            //           .attr("alt", "Made in Webflow")),
            //         n.append(a, r),
            //         n[0])),
            //       f(),
            //       setTimeout(f, 500),
            //       e(i).off(d, s).on(d, s)));
            // }),
            n
          );
        }),
      );
    },
    322: function (e, t, n) {
      "use strict";
      var a = n(3949);
      a.define(
        "edit",
        (e.exports = function (e, t, n) {
          if (
            ((n = n || {}),
            (a.env("test") || a.env("frame")) &&
              !n.fixture &&
              !(function () {
                try {
                  return !!(window.top.__Cypress__ || window.PLAYWRIGHT_TEST);
                } catch (e) {
                  return !1;
                }
              })())
          )
            return { exit: 1 };
          var i,
            o = e(window),
            r = e(document.documentElement),
            l = document.location,
            c = "hashchange",
            d =
              n.load ||
              function () {
                var t, n, a;
                ((i = !0),
                  (window.WebflowEditor = !0),
                  o.off(c, f),
                  (t = function (t) {
                    var n;
                    e.ajax({
                      url: p("https://editor-api.webflow.com/api/editor/view"),
                      data: { siteId: r.attr("data-wf-site") },
                      xhrFields: { withCredentials: !0 },
                      dataType: "json",
                      crossDomain: !0,
                      success:
                        ((n = t),
                        function (t) {
                          var a, i, o;
                          if (!t)
                            return void console.error(
                              "Could not load editor data",
                            );
                          ((t.thirdPartyCookiesSupported = n),
                            (i =
                              (a = t.scriptPath).indexOf("//") >= 0
                                ? a
                                : p("https://editor-api.webflow.com" + a)),
                            (o = function () {
                              window.WebflowEditor(t);
                            }),
                            e
                              .ajax({
                                type: "GET",
                                url: i,
                                dataType: "script",
                                cache: !0,
                              })
                              .then(o, u));
                        }),
                    });
                  }),
                  ((n = window.document.createElement("iframe")).src =
                    "https://webflow.com/site/third-party-cookie-check.html"),
                  (n.style.display = "none"),
                  (n.sandbox = "allow-scripts allow-same-origin"),
                  (a = function (e) {
                    "WF_third_party_cookies_unsupported" === e.data
                      ? (I(n, a), t(!1))
                      : "WF_third_party_cookies_supported" === e.data &&
                        (I(n, a), t(!0));
                  }),
                  (n.onerror = function () {
                    (I(n, a), t(!1));
                  }),
                  window.addEventListener("message", a, !1),
                  window.document.body.appendChild(n));
              },
            s = !1;
          try {
            s =
              localStorage &&
              localStorage.getItem &&
              localStorage.getItem("WebflowEditor");
          } catch (e) {}
          function f() {
            !i && /\?edit/.test(l.hash) && d();
          }
          function u(e, t, n) {
            throw (console.error("Could not load editor script: " + t), n);
          }
          function p(e) {
            return e.replace(/([^:])\/\//g, "$1/");
          }
          function I(e, t) {
            (window.removeEventListener("message", t, !1), e.remove());
          }
          return (
            /[?&](update)(?:[=&?]|$)/.test(l.search) || /\?update$/.test(l.href)
              ? (function () {
                  var e = document.documentElement,
                    t = e.getAttribute("data-wf-site"),
                    n = e.getAttribute("data-wf-page"),
                    a = e.getAttribute("data-wf-item-slug"),
                    i = e.getAttribute("data-wf-collection"),
                    o = e.getAttribute("data-wf-domain");
                  if (t && n) {
                    var r = "pageId=" + n + "&mode=edit";
                    ((r += "&simulateRole=editor&utm_source=legacy_editor"),
                      a &&
                        i &&
                        o &&
                        (r +=
                          "&domain=" +
                          encodeURIComponent(o) +
                          "&itemSlug=" +
                          encodeURIComponent(a) +
                          "&collectionId=" +
                          i),
                      (window.location.href =
                        "https://webflow.com/external/designer/" +
                        t +
                        "?" +
                        r));
                  }
                })()
              : s
                ? d()
                : l.search
                  ? (/[?&](edit)(?:[=&?]|$)/.test(l.search) ||
                      /\?edit$/.test(l.href)) &&
                    d()
                  : o.on(c, f).triggerHandler(c),
            {}
          );
        }),
      );
    },
    2338: function (e, t, n) {
      "use strict";
      n(3949).define(
        "focus-visible",
        (e.exports = function () {
          return {
            ready: function () {
              if ("undefined" != typeof document)
                try {
                  document.querySelector(":focus-visible");
                } catch (e) {
                  !(function (e) {
                    var t = !0,
                      n = !1,
                      a = null,
                      i = {
                        text: !0,
                        search: !0,
                        url: !0,
                        tel: !0,
                        email: !0,
                        password: !0,
                        number: !0,
                        date: !0,
                        month: !0,
                        week: !0,
                        time: !0,
                        datetime: !0,
                        "datetime-local": !0,
                      };
                    function o(e) {
                      return (
                        !!e &&
                        e !== document &&
                        "HTML" !== e.nodeName &&
                        "BODY" !== e.nodeName &&
                        "classList" in e &&
                        "contains" in e.classList
                      );
                    }
                    function r(e) {
                      e.getAttribute("data-wf-focus-visible") ||
                        e.setAttribute("data-wf-focus-visible", "true");
                    }
                    function l() {
                      t = !1;
                    }
                    function c() {
                      (document.addEventListener("mousemove", d),
                        document.addEventListener("mousedown", d),
                        document.addEventListener("mouseup", d),
                        document.addEventListener("pointermove", d),
                        document.addEventListener("pointerdown", d),
                        document.addEventListener("pointerup", d),
                        document.addEventListener("touchmove", d),
                        document.addEventListener("touchstart", d),
                        document.addEventListener("touchend", d));
                    }
                    function d(e) {
                      (e.target.nodeName &&
                        "html" === e.target.nodeName.toLowerCase()) ||
                        ((t = !1),
                        document.removeEventListener("mousemove", d),
                        document.removeEventListener("mousedown", d),
                        document.removeEventListener("mouseup", d),
                        document.removeEventListener("pointermove", d),
                        document.removeEventListener("pointerdown", d),
                        document.removeEventListener("pointerup", d),
                        document.removeEventListener("touchmove", d),
                        document.removeEventListener("touchstart", d),
                        document.removeEventListener("touchend", d));
                    }
                    (document.addEventListener(
                      "keydown",
                      function (n) {
                        n.metaKey ||
                          n.altKey ||
                          n.ctrlKey ||
                          (o(e.activeElement) && r(e.activeElement), (t = !0));
                      },
                      !0,
                    ),
                      document.addEventListener("mousedown", l, !0),
                      document.addEventListener("pointerdown", l, !0),
                      document.addEventListener("touchstart", l, !0),
                      document.addEventListener(
                        "visibilitychange",
                        function () {
                          "hidden" === document.visibilityState &&
                            (n && (t = !0), c());
                        },
                        !0,
                      ),
                      c(),
                      e.addEventListener(
                        "focus",
                        function (e) {
                          if (o(e.target)) {
                            var n, a, l;
                            (t ||
                              ((a = (n = e.target).type),
                              ("INPUT" === (l = n.tagName) &&
                                i[a] &&
                                !n.readOnly) ||
                                ("TEXTAREA" === l && !n.readOnly) ||
                                n.isContentEditable ||
                                0)) &&
                              r(e.target);
                          }
                        },
                        !0,
                      ),
                      e.addEventListener(
                        "blur",
                        function (e) {
                          if (
                            o(e.target) &&
                            e.target.hasAttribute("data-wf-focus-visible")
                          ) {
                            var t;
                            ((n = !0),
                              window.clearTimeout(a),
                              (a = window.setTimeout(function () {
                                n = !1;
                              }, 100)),
                              (t = e.target).getAttribute(
                                "data-wf-focus-visible",
                              ) && t.removeAttribute("data-wf-focus-visible"));
                          }
                        },
                        !0,
                      ));
                  })(document);
                }
            },
          };
        }),
      );
    },
    8334: function (e, t, n) {
      "use strict";
      var a = n(3949);
      a.define(
        "focus",
        (e.exports = function () {
          var e = [],
            t = !1;
          function n(n) {
            t &&
              (n.preventDefault(),
              n.stopPropagation(),
              n.stopImmediatePropagation(),
              e.unshift(n));
          }
          function i(n) {
            var a, i;
            ((i = (a = n.target).tagName),
              ((/^a$/i.test(i) && null != a.href) ||
                (/^(button|textarea)$/i.test(i) && !0 !== a.disabled) ||
                (/^input$/i.test(i) &&
                  /^(button|reset|submit|radio|checkbox)$/i.test(a.type) &&
                  !a.disabled) ||
                (!/^(button|input|textarea|select|a)$/i.test(i) &&
                  !Number.isNaN(Number.parseFloat(a.tabIndex))) ||
                /^audio$/i.test(i) ||
                (/^video$/i.test(i) && !0 === a.controls)) &&
                ((t = !0),
                setTimeout(() => {
                  for (t = !1, n.target.focus(); e.length > 0; ) {
                    var a = e.pop();
                    a.target.dispatchEvent(new MouseEvent(a.type, a));
                  }
                }, 0)));
          }
          return {
            ready: function () {
              "undefined" != typeof document &&
                document.body.hasAttribute("data-wf-focus-within") &&
                a.env.safari &&
                (document.addEventListener("mousedown", i, !0),
                document.addEventListener("mouseup", n, !0),
                document.addEventListener("click", n, !0));
            },
          };
        }),
      );
    },
    7199: function (e) {
      "use strict";
      var t = window.jQuery,
        n = {},
        a = [],
        i = ".w-ix",
        o = {
          reset: function (e, t) {
            t.__wf_intro = null;
          },
          intro: function (e, a) {
            a.__wf_intro ||
              ((a.__wf_intro = !0), t(a).triggerHandler(n.types.INTRO));
          },
          outro: function (e, a) {
            a.__wf_intro &&
              ((a.__wf_intro = null), t(a).triggerHandler(n.types.OUTRO));
          },
        };
      ((n.triggers = {}),
        (n.types = { INTRO: "w-ix-intro" + i, OUTRO: "w-ix-outro" + i }),
        (n.init = function () {
          for (var e = a.length, i = 0; i < e; i++) {
            var r = a[i];
            r[0](0, r[1]);
          }
          ((a = []), t.extend(n.triggers, o));
        }),
        (n.async = function () {
          for (var e in o) {
            var t = o[e];
            o.hasOwnProperty(e) &&
              (n.triggers[e] = function (e, n) {
                a.push([t, n]);
              });
          }
        }),
        n.async(),
        (e.exports = n));
    },
    5134: function (e, t, n) {
      "use strict";
      var a = n(7199);
      function i(e, t, n) {
        var a = document.createEvent("CustomEvent");
        (a.initCustomEvent(t, !0, !0, n || null), e.dispatchEvent(a));
      }
      var o = window.jQuery,
        r = {},
        l = ".w-ix";
      ((r.triggers = {}),
        (r.types = { INTRO: "w-ix-intro" + l, OUTRO: "w-ix-outro" + l }),
        o.extend(r.triggers, {
          reset: function (e, t) {
            a.triggers.reset(e, t);
          },
          intro: function (e, t) {
            (a.triggers.intro(e, t), i(t, "COMPONENT_ACTIVE"));
          },
          outro: function (e, t) {
            (a.triggers.outro(e, t), i(t, "COMPONENT_INACTIVE"));
          },
        }),
        (r.dispatchCustomEvent = i),
        (e.exports = r));
    },
    941: function (e, t, n) {
      "use strict";
      var a = n(3949),
        i = n(6011);
      (i.setEnv(a.env),
        a.define(
          "ix2",
          (e.exports = function () {
            return i;
          }),
        ));
    },
    3949: function (e, t, n) {
      "use strict";
      var a,
        i,
        o = {},
        r = {},
        l = [],
        c = window.Webflow || [],
        d = window.jQuery,
        s = d(window),
        f = d(document),
        u = d.isFunction,
        p = (o._ = n(5756)),
        I = (o.tram = n(5487) && d.tram),
        g = !1,
        T = !1;
      function E(e) {
        (o.env() &&
          (u(e.design) && s.on("__wf_design", e.design),
          u(e.preview) && s.on("__wf_preview", e.preview)),
          u(e.destroy) && s.on("__wf_destroy", e.destroy),
          e.ready &&
            u(e.ready) &&
            (function (e) {
              if (g) return e.ready();
              p.contains(l, e.ready) || l.push(e.ready);
            })(e));
      }
      function y(e) {
        var t;
        (u(e.design) && s.off("__wf_design", e.design),
          u(e.preview) && s.off("__wf_preview", e.preview),
          u(e.destroy) && s.off("__wf_destroy", e.destroy),
          e.ready &&
            u(e.ready) &&
            ((t = e),
            (l = p.filter(l, function (e) {
              return e !== t.ready;
            }))));
      }
      ((I.config.hideBackface = !1),
        (I.config.keepInherited = !0),
        (o.define = function (e, t, n) {
          r[e] && y(r[e]);
          var a = (r[e] = t(d, p, n) || {});
          return (E(a), a);
        }),
        (o.require = function (e) {
          return r[e];
        }),
        (o.push = function (e) {
          if (g) {
            u(e) && e();
            return;
          }
          c.push(e);
        }),
        (o.env = function (e) {
          var t = window.__wf_design,
            n = void 0 !== t;
          return e
            ? "design" === e
              ? n && t
              : "preview" === e
                ? n && !t
                : "slug" === e
                  ? n && window.__wf_slug
                  : "editor" === e
                    ? window.WebflowEditor
                    : "test" === e
                      ? window.__wf_test
                      : "frame" === e
                        ? window !== window.top
                        : void 0
            : n;
        }));
      var m = navigator.userAgent.toLowerCase(),
        b = (o.env.touch =
          "ontouchstart" in window ||
          (window.DocumentTouch && document instanceof window.DocumentTouch)),
        O = (o.env.chrome =
          /chrome/.test(m) &&
          /Google/.test(navigator.vendor) &&
          parseInt(m.match(/chrome\/(\d+)\./)[1], 10)),
        v = (o.env.ios = /(ipod|iphone|ipad)/.test(m));
      ((o.env.safari = /safari/.test(m) && !O && !v),
        b &&
          f.on("touchstart mousedown", function (e) {
            a = e.target;
          }),
        (o.validClick = b
          ? function (e) {
              return e === a || d.contains(e, a);
            }
          : function () {
              return !0;
            }));
      var L = "resize.webflow orientationchange.webflow load.webflow",
        R = "scroll.webflow " + L;
      function _(e, t) {
        var n = [],
          a = {};
        return (
          (a.up = p.throttle(function (e) {
            p.each(n, function (t) {
              t(e);
            });
          })),
          e && t && e.on(t, a.up),
          (a.on = function (e) {
            "function" == typeof e && (p.contains(n, e) || n.push(e));
          }),
          (a.off = function (e) {
            if (!arguments.length) {
              n = [];
              return;
            }
            n = p.filter(n, function (t) {
              return t !== e;
            });
          }),
          a
        );
      }
      function S(e) {
        u(e) && e();
      }
      function h() {
        (i && (i.reject(), s.off("load", i.resolve)),
          (i = new d.Deferred()),
          s.on("load", i.resolve));
      }
      ((o.resize = _(s, L)),
        (o.scroll = _(s, R)),
        (o.redraw = _()),
        (o.location = function (e) {
          window.location = e;
        }),
        o.env() && (o.location = function () {}),
        (o.ready = function () {
          ((g = !0),
            T ? ((T = !1), p.each(r, E)) : p.each(l, S),
            p.each(c, S),
            o.resize.up());
        }),
        (o.load = function (e) {
          i.then(e);
        }),
        (o.destroy = function (e) {
          ((e = e || {}),
            (T = !0),
            s.triggerHandler("__wf_destroy"),
            null != e.domready && (g = e.domready),
            p.each(r, y),
            o.resize.off(),
            o.scroll.off(),
            o.redraw.off(),
            (l = []),
            (c = []),
            "pending" === i.state() && h());
        }),
        d(o.ready),
        h(),
        (e.exports = window.Webflow = o));
    },
    7624: function (e, t, n) {
      "use strict";
      var a = n(3949);
      a.define(
        "links",
        (e.exports = function (e, t) {
          var n,
            i,
            o,
            r = {},
            l = e(window),
            c = a.env(),
            d = window.location,
            s = document.createElement("a"),
            f = "w--current",
            u = /index\.(html|php)$/,
            p = /\/$/;
          function I() {
            var e = l.scrollTop(),
              n = l.height();
            t.each(i, function (t) {
              if (!t.link.attr("hreflang")) {
                var a = t.link,
                  i = t.sec,
                  o = i.offset().top,
                  r = i.outerHeight(),
                  l = 0.5 * n,
                  c = i.is(":visible") && o + r - l >= e && o + l <= e + n;
                t.active !== c && ((t.active = c), g(a, f, c));
              }
            });
          }
          function g(e, t, n) {
            var a = e.hasClass(t);
            (!n || !a) && (n || a) && (n ? e.addClass(t) : e.removeClass(t));
          }
          return (
            (r.ready =
              r.design =
              r.preview =
                function () {
                  ((n = c && a.env("design")),
                    (o = a.env("slug") || d.pathname || ""),
                    a.scroll.off(I),
                    (i = []));
                  for (var t = document.links, r = 0; r < t.length; ++r)
                    !(function (t) {
                      if (!t.getAttribute("hreflang")) {
                        var a =
                          (n && t.getAttribute("href-disabled")) ||
                          t.getAttribute("href");
                        if (((s.href = a), !(a.indexOf(":") >= 0))) {
                          var r = e(t);
                          if (
                            s.hash.length > 1 &&
                            s.host + s.pathname === d.host + d.pathname
                          ) {
                            if (!/^#[a-zA-Z0-9\-\_]+$/.test(s.hash)) return;
                            var l = e(s.hash);
                            l.length && i.push({ link: r, sec: l, active: !1 });
                            return;
                          }
                          "#" !== a &&
                            "" !== a &&
                            g(
                              r,
                              f,
                              (!c && s.href === d.href) ||
                                a === o ||
                                (u.test(a) && p.test(o)),
                            );
                        }
                      }
                    })(t[r]);
                  i.length && (a.scroll.on(I), I());
                }),
            r
          );
        }),
      );
    },
    286: function (e, t, n) {
      "use strict";
      var a = n(3949);
      a.define(
        "scroll",
        (e.exports = function (e) {
          var t = {
              WF_CLICK_EMPTY: "click.wf-empty-link",
              WF_CLICK_SCROLL: "click.wf-scroll",
            },
            n = window.location,
            i = !(function () {
              try {
                return !!window.frameElement;
              } catch (e) {
                return !0;
              }
            })()
              ? window.history
              : null,
            o = e(window),
            r = e(document),
            l = e(document.body),
            c =
              window.requestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              function (e) {
                window.setTimeout(e, 15);
              },
            d = a.env("editor") ? ".w-editor-body" : "body",
            s =
              "header, " +
              d +
              " > .header, " +
              d +
              " > .w-nav:not([data-no-scroll])",
            f = 'a[href="#"]',
            u = 'a[href*="#"]:not(.w-tab-link):not(' + f + ")",
            p = document.createElement("style");
          p.appendChild(
            document.createTextNode(
              '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
            ),
          );
          var I = /^#[a-zA-Z0-9][\w:.-]*$/;
          let g =
            "function" == typeof window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)");
          function T(e, t) {
            var n;
            switch (t) {
              case "add":
                (n = e.attr("tabindex"))
                  ? e.attr("data-wf-tabindex-swap", n)
                  : e.attr("tabindex", "-1");
                break;
              case "remove":
                (n = e.attr("data-wf-tabindex-swap"))
                  ? (e.attr("tabindex", n),
                    e.removeAttr("data-wf-tabindex-swap"))
                  : e.removeAttr("tabindex");
            }
            e.toggleClass("wf-force-outline-none", "add" === t);
          }
          function E(t) {
            var r = t.currentTarget;
            if (
              !(
                a.env("design") ||
                (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(r.className))
              )
            ) {
              var d =
                I.test(r.hash) && r.host + r.pathname === n.host + n.pathname
                  ? r.hash
                  : "";
              if ("" !== d) {
                var f,
                  u = e(d);
                u.length &&
                  (t && (t.preventDefault(), t.stopPropagation()),
                  (f = d),
                  n.hash !== f &&
                    i &&
                    i.pushState &&
                    !(a.env.chrome && "file:" === n.protocol) &&
                    (i.state && i.state.hash) !== f &&
                    i.pushState({ hash: f }, "", f),
                  window.setTimeout(function () {
                    !(function (t, n) {
                      var a = o.scrollTop(),
                        i = (function (t) {
                          var n = e(s),
                            a =
                              "fixed" === n.css("position")
                                ? n.outerHeight()
                                : 0,
                            i = t.offset().top - a;
                          if ("mid" === t.data("scroll")) {
                            var r = o.height() - a,
                              l = t.outerHeight();
                            l < r && (i -= Math.round((r - l) / 2));
                          }
                          return i;
                        })(t);
                      if (a !== i) {
                        var r = (function (e, t, n) {
                            if (
                              "none" ===
                                document.body.getAttribute(
                                  "data-wf-scroll-motion",
                                ) ||
                              g.matches
                            )
                              return 0;
                            var a = 1;
                            return (
                              l.add(e).each(function (e, t) {
                                var n = parseFloat(
                                  t.getAttribute("data-scroll-time"),
                                );
                                !isNaN(n) && n >= 0 && (a = n);
                              }),
                              (472.143 * Math.log(Math.abs(t - n) + 125) -
                                2e3) *
                                a
                            );
                          })(t, a, i),
                          d = Date.now(),
                          f = function () {
                            var e,
                              t,
                              o,
                              l,
                              s,
                              u = Date.now() - d;
                            (window.scroll(
                              0,
                              ((e = a),
                              (t = i),
                              (o = u) > (l = r)
                                ? t
                                : e +
                                  (t - e) *
                                    ((s = o / l) < 0.5
                                      ? 4 * s * s * s
                                      : (s - 1) * (2 * s - 2) * (2 * s - 2) +
                                        1)),
                            ),
                              u <= r ? c(f) : "function" == typeof n && n());
                          };
                        c(f);
                      }
                    })(u, function () {
                      (T(u, "add"),
                        u.get(0).focus({ preventScroll: !0 }),
                        T(u, "remove"));
                    });
                  }, 300 * !t));
              }
            }
          }
          return {
            ready: function () {
              var { WF_CLICK_EMPTY: e, WF_CLICK_SCROLL: n } = t;
              (r.on(n, u, E),
                r.on(e, f, function (e) {
                  e.preventDefault();
                }),
                document.head.insertBefore(p, document.head.firstChild));
            },
          };
        }),
      );
    },
    3695: function (e, t, n) {
      "use strict";
      n(3949).define(
        "touch",
        (e.exports = function (e) {
          var t = {},
            n = window.getSelection;
          function a(t) {
            var a,
              i,
              o = !1,
              r = !1,
              l = Math.min(Math.round(0.04 * window.innerWidth), 40);
            function c(e) {
              var t = e.touches;
              (t && t.length > 1) ||
                ((o = !0),
                t ? ((r = !0), (a = t[0].clientX)) : (a = e.clientX),
                (i = a));
            }
            function d(t) {
              if (o) {
                if (r && "mousemove" === t.type) {
                  (t.preventDefault(), t.stopPropagation());
                  return;
                }
                var a,
                  c,
                  d,
                  s,
                  u = t.touches,
                  p = u ? u[0].clientX : t.clientX,
                  I = p - i;
                ((i = p),
                  Math.abs(I) > l &&
                    n &&
                    "" === String(n()) &&
                    ((a = "swipe"),
                    (c = t),
                    (d = { direction: I > 0 ? "right" : "left" }),
                    (s = e.Event(a, { originalEvent: c })),
                    e(c.target).trigger(s, d),
                    f()));
              }
            }
            function s(e) {
              if (o && ((o = !1), r && "mouseup" === e.type)) {
                (e.preventDefault(), e.stopPropagation(), (r = !1));
                return;
              }
            }
            function f() {
              o = !1;
            }
            (t.addEventListener("touchstart", c, !1),
              t.addEventListener("touchmove", d, !1),
              t.addEventListener("touchend", s, !1),
              t.addEventListener("touchcancel", f, !1),
              t.addEventListener("mousedown", c, !1),
              t.addEventListener("mousemove", d, !1),
              t.addEventListener("mouseup", s, !1),
              t.addEventListener("mouseout", f, !1),
              (this.destroy = function () {
                (t.removeEventListener("touchstart", c, !1),
                  t.removeEventListener("touchmove", d, !1),
                  t.removeEventListener("touchend", s, !1),
                  t.removeEventListener("touchcancel", f, !1),
                  t.removeEventListener("mousedown", c, !1),
                  t.removeEventListener("mousemove", d, !1),
                  t.removeEventListener("mouseup", s, !1),
                  t.removeEventListener("mouseout", f, !1),
                  (t = null));
              }));
          }
          return (
            (e.event.special.tap = {
              bindType: "click",
              delegateType: "click",
            }),
            (t.init = function (t) {
              return (t = "string" == typeof t ? e(t).get(0) : t)
                ? new a(t)
                : null;
            }),
            (t.instance = t.init(document)),
            t
          );
        }),
      );
    },
    9858: function (e, t, n) {
      "use strict";
      var a = n(3949),
        i = n(5134);
      let o = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      };
      function r(e, t) {
        i.dispatchCustomEvent(e, "IX3_COMPONENT_STATE_CHANGE", {
          component: "dropdown",
          state: t,
        });
      }
      let l = /^#[a-zA-Z0-9\-_]+$/;
      a.define(
        "dropdown",
        (e.exports = function (e, t) {
          var n,
            c,
            d = t.debounce,
            s = {},
            f = a.env(),
            u = !1,
            p = a.env.touch,
            I = ".w-dropdown",
            g = "w--open",
            T = i.triggers,
            E = "focusout" + I,
            y = "keydown" + I,
            m = "mouseenter" + I,
            b = "mousemove" + I,
            O = "mouseleave" + I,
            v = (p ? "click" : "mouseup") + I,
            L = "w-close" + I,
            R = "setting" + I,
            _ = e(document);
          function S() {
            ((n = f && a.env("design")), (c = _.find(I)).each(h));
          }
          function h(t, i) {
            var r,
              c,
              s,
              u,
              p,
              T,
              b,
              O,
              S,
              h,
              V = e(i),
              x = e.data(i, I);
            (x ||
              (x = e.data(i, I, {
                open: !1,
                el: V,
                config: {},
                selectedIdx: -1,
              })),
              (x.toggle = x.el.children(".w-dropdown-toggle")),
              (x.list = x.el.children(".w-dropdown-list")),
              (x.links = x.list.find("a:not(.w-dropdown .w-dropdown a)")),
              (x.complete =
                ((r = x),
                function () {
                  (r.list.removeClass(g),
                    r.toggle.removeClass(g),
                    r.manageZ && r.el.css("z-index", ""));
                })),
              (x.mouseLeave =
                ((c = x),
                function () {
                  ((c.hovering = !1), c.links.is(":focus") || w(c));
                })),
              (x.mouseUpOutside =
                ((s = x).mouseUpOutside && _.off(v, s.mouseUpOutside),
                d(function (t) {
                  if (s.open) {
                    var n = e(t.target);
                    if (!n.closest(".w-dropdown-toggle").length) {
                      var i = -1 === e.inArray(s.el[0], n.parents(I)),
                        o = a.env("editor");
                      if (i) {
                        if (o) {
                          var r =
                              1 === n.parents().length &&
                              1 === n.parents("svg").length,
                            l = n.parents(
                              ".w-editor-bem-EditorHoverControls",
                            ).length;
                          if (r || l) return;
                        }
                        w(s);
                      }
                    }
                  }
                }))),
              (x.mouseMoveOutside =
                ((u = x),
                d(function (t) {
                  if (u.open) {
                    var n = e(t.target);
                    if (-1 === e.inArray(u.el[0], n.parents(I))) {
                      var a = n.parents(
                          ".w-editor-bem-EditorHoverControls",
                        ).length,
                        i = n.parents(".w-editor-bem-RTToolbar").length,
                        o = e(".w-editor-bem-EditorOverlay"),
                        r =
                          o.find(".w-editor-edit-outline").length ||
                          o.find(".w-editor-bem-RTToolbar").length;
                      if (a || i || r) return;
                      ((u.hovering = !1), w(u));
                    }
                  }
                }))),
              A(x));
            var U = x.toggle.attr("id"),
              P = x.list.attr("id");
            (U || (U = "w-dropdown-toggle-" + t),
              P || (P = "w-dropdown-list-" + t),
              x.toggle.attr("id", U),
              x.toggle.attr("aria-controls", P),
              x.toggle.attr("aria-haspopup", "menu"),
              x.toggle.attr("aria-expanded", "false"),
              x.toggle
                .find(".w-icon-dropdown-toggle")
                .attr("aria-hidden", "true"),
              "BUTTON" !== x.toggle.prop("tagName") &&
                (x.toggle.attr("role", "button"),
                x.toggle.attr("tabindex") || x.toggle.attr("tabindex", "0")),
              x.list.attr("id", P),
              x.list.attr("aria-labelledby", U),
              x.links.each(function (e, t) {
                (t.hasAttribute("tabindex") || t.setAttribute("tabindex", "0"),
                  l.test(t.hash) &&
                    t.addEventListener("click", w.bind(null, x)));
              }),
              x.el.off(I),
              x.toggle.off(I),
              x.nav && x.nav.off(I));
            var G = N(x, !0);
            (n &&
              x.el.on(
                R,
                ((p = x),
                function (e, t) {
                  ((t = t || {}),
                    A(p),
                    !0 === t.open && C(p),
                    !1 === t.open && w(p, { immediate: !0 }));
                }),
              ),
              n ||
                (f && ((x.hovering = !1), w(x)),
                x.config.hover &&
                  x.toggle.on(
                    m,
                    ((T = x),
                    function () {
                      ((T.hovering = !0), C(T));
                    }),
                  ),
                x.el.on(L, G),
                x.el.on(
                  y,
                  ((b = x),
                  function (e) {
                    if (!n && b.open)
                      switch (
                        ((b.selectedIdx = b.links.index(
                          document.activeElement,
                        )),
                        e.keyCode)
                      ) {
                        case o.HOME:
                          if (!b.open) return;
                          return (
                            (b.selectedIdx = 0),
                            M(b),
                            e.preventDefault()
                          );
                        case o.END:
                          if (!b.open) return;
                          return (
                            (b.selectedIdx = b.links.length - 1),
                            M(b),
                            e.preventDefault()
                          );
                        case o.ESCAPE:
                          return (w(b), b.toggle.focus(), e.stopPropagation());
                        case o.ARROW_RIGHT:
                        case o.ARROW_DOWN:
                          return (
                            (b.selectedIdx = Math.min(
                              b.links.length - 1,
                              b.selectedIdx + 1,
                            )),
                            M(b),
                            e.preventDefault()
                          );
                        case o.ARROW_LEFT:
                        case o.ARROW_UP:
                          return (
                            (b.selectedIdx = Math.max(-1, b.selectedIdx - 1)),
                            M(b),
                            e.preventDefault()
                          );
                      }
                  }),
                ),
                x.el.on(
                  E,
                  ((O = x),
                  d(function (e) {
                    var { relatedTarget: t, target: n } = e,
                      a = O.el[0];
                    return (
                      a.contains(t) || a.contains(n) || w(O),
                      e.stopPropagation()
                    );
                  })),
                ),
                x.toggle.on(v, G),
                x.toggle.on(
                  y,
                  ((h = N((S = x), !0)),
                  function (e) {
                    if (!n) {
                      if (!S.open)
                        switch (e.keyCode) {
                          case o.ARROW_UP:
                          case o.ARROW_DOWN:
                            return e.stopPropagation();
                        }
                      switch (e.keyCode) {
                        case o.SPACE:
                        case o.ENTER:
                          return (h(), e.stopPropagation(), e.preventDefault());
                      }
                    }
                  }),
                ),
                (x.nav = x.el.closest(".w-nav")),
                x.nav.on(L, G)));
          }
          function A(e) {
            var t = Number(e.el.css("z-index"));
            ((e.manageZ = 900 === t || 901 === t),
              (e.config = {
                hover: "true" === e.el.attr("data-hover") && !p,
                delay: e.el.attr("data-delay"),
              }));
          }
          function N(e, t) {
            return d(function (n) {
              if (e.open || (n && "w-close" === n.type))
                return w(e, { forceClose: t });
              C(e);
            });
          }
          function C(t) {
            if (!t.open) {
              ((i = t.el[0]),
                c.each(function (t, n) {
                  var a = e(n);
                  a.is(i) || a.has(i).length || a.triggerHandler(L);
                }),
                (t.open = !0),
                t.list.addClass(g),
                t.toggle.addClass(g),
                t.toggle.attr("aria-expanded", "true"),
                T.intro(0, t.el[0]),
                r(t.el[0], "open"),
                a.redraw.up(),
                t.manageZ && t.el.css("z-index", 901));
              var i,
                o = a.env("editor");
              (n || _.on(v, t.mouseUpOutside),
                t.hovering && !o && t.el.on(O, t.mouseLeave),
                t.hovering && o && _.on(b, t.mouseMoveOutside),
                window.clearTimeout(t.delayId));
            }
          }
          function w(e, { immediate: t, forceClose: n } = {}) {
            if (e.open && (!e.config.hover || !e.hovering || n)) {
              (e.toggle.attr("aria-expanded", "false"), (e.open = !1));
              var a = e.config;
              if (
                (T.outro(0, e.el[0]),
                r(e.el[0], "close"),
                _.off(v, e.mouseUpOutside),
                _.off(b, e.mouseMoveOutside),
                e.el.off(O, e.mouseLeave),
                window.clearTimeout(e.delayId),
                !a.delay || t)
              )
                return e.complete();
              e.delayId = window.setTimeout(e.complete, a.delay);
            }
          }
          function M(e) {
            e.links[e.selectedIdx] && e.links[e.selectedIdx].focus();
          }
          return (
            (s.ready = S),
            (s.design = function () {
              (u &&
                _.find(I).each(function (t, n) {
                  e(n).triggerHandler(L);
                }),
                (u = !1),
                S());
            }),
            (s.preview = function () {
              ((u = !0), S());
            }),
            s
          );
        }),
      );
    },
    6524: function (e, t) {
      "use strict";
      function n(e, t, n, a, i, o, r, l, c, d, s, f, u) {
        return function (p) {
          e(p);
          var I = p.form,
            g = {
              name: I.attr("data-name") || I.attr("name") || "Untitled Form",
              pageId: I.attr("data-wf-page-id") || "",
              elementId: I.attr("data-wf-element-id") || "",
              domain: f("html").attr("data-wf-domain") || null,
              collectionId: f("html").attr("data-wf-collection") || null,
              itemSlug: f("html").attr("data-wf-item-slug") || null,
              source: t.href,
              test: n.env(),
              fields: {},
              fileUploads: {},
              dolphin: /pass[\s-_]?(word|code)|secret|login|credentials/i.test(
                I.html(),
              ),
              trackingCookies: a(),
            };
          let T = I.attr("data-wf-flow");
          T && (g.wfFlow = T);
          let E = I.attr("data-wf-locale-id");
          (E && (g.localeId = E), i(p));
          var y = o(I, g.fields);
          return y
            ? r(y)
            : ((g.fileUploads = l(I)), c(p), d)
              ? void f
                  .ajax({
                    url: u,
                    type: "POST",
                    data: g,
                    dataType: "json",
                    crossDomain: !0,
                  })
                  .done(function (e) {
                    (e && 200 === e.code && (p.success = !0), s(p));
                  })
                  .fail(function () {
                    s(p);
                  })
              : void s(p);
        };
      }
      Object.defineProperty(t, "default", {
        enumerable: !0,
        get: function () {
          return n;
        },
      });
    },
    7527: function (e, t, n) {
      "use strict";
      var a = n(3949);
      let i = (e, t, n, a) => {
        let i = document.createElement("div");
        (t.appendChild(i),
          turnstile.render(i, {
            sitekey: e,
            callback: function (e) {
              n(e);
            },
            "error-callback": function () {
              a();
            },
          }));
      };
      a.define(
        "forms",
        (e.exports = function (e, t) {
          let o,
            r = "TURNSTILE_LOADED";
          var l,
            c,
            d,
            s,
            f,
            u = {},
            p = e(document),
            I = window.location,
            g = window.XDomainRequest && !window.atob,
            T = ".w-form",
            E = /e(-)?mail/i,
            y = /^\S+@\S+$/,
            m = window.alert,
            b = a.env();
          let O = p.find("[data-turnstile-sitekey]").data("turnstile-sitekey");
          var v = /list-manage[1-9]?.com/i,
            L = t.debounce(function () {
              console.warn(
                "Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue.",
              );
            }, 100);
          function R(t, o) {
            var l = e(o),
              d = e.data(o, T);
            (d || (d = e.data(o, T, { form: l })), _(d));
            var u = l.closest("div.w-form");
            ((d.done = u.find("> .w-form-done")),
              (d.fail = u.find("> .w-form-fail")),
              (d.fileUploads = u.find(".w-file-upload")),
              d.fileUploads.each(function (t) {
                !(function (t, n) {
                  if (n.fileUploads && n.fileUploads[t]) {
                    var a,
                      i = e(n.fileUploads[t]),
                      o = i.find("> .w-file-upload-default"),
                      r = i.find("> .w-file-upload-uploading"),
                      l = i.find("> .w-file-upload-success"),
                      c = i.find("> .w-file-upload-error"),
                      d = o.find(".w-file-upload-input"),
                      s = o.find(".w-file-upload-label"),
                      u = s.children(),
                      p = c.find(".w-file-upload-error-msg"),
                      I = l.find(".w-file-upload-file"),
                      g = l.find(".w-file-remove-link"),
                      T = I.find(".w-file-upload-file-name"),
                      E = p.attr("data-w-size-error"),
                      y = p.attr("data-w-type-error"),
                      m = p.attr("data-w-generic-error");
                    if (
                      (b ||
                        s.on("click keydown", function (e) {
                          ("keydown" !== e.type ||
                            13 === e.which ||
                            32 === e.which) &&
                            (e.preventDefault(), d.click());
                        }),
                      s
                        .find(".w-icon-file-upload-icon")
                        .attr("aria-hidden", "true"),
                      g
                        .find(".w-icon-file-upload-remove")
                        .attr("aria-hidden", "true"),
                      b)
                    )
                      (d.on("click", function (e) {
                        e.preventDefault();
                      }),
                        s.on("click", function (e) {
                          e.preventDefault();
                        }),
                        u.on("click", function (e) {
                          e.preventDefault();
                        }));
                    else {
                      (g.on("click keydown", function (e) {
                        if ("keydown" === e.type) {
                          if (13 !== e.which && 32 !== e.which) return;
                          e.preventDefault();
                        }
                        (d.removeAttr("data-value"),
                          d.val(""),
                          T.html(""),
                          o.toggle(!0),
                          l.toggle(!1),
                          s.focus());
                      }),
                        d.on("change", function (i) {
                          var l, d, s;
                          (a =
                            i.target && i.target.files && i.target.files[0]) &&
                            (o.toggle(!1),
                            c.toggle(!1),
                            r.toggle(!0),
                            r.focus(),
                            T.text(a.name),
                            h() || S(n),
                            (n.fileUploads[t].uploading = !0),
                            (l = a),
                            (d = L),
                            (s = new URLSearchParams({
                              name: l.name,
                              size: l.size,
                            })),
                            e
                              .ajax({
                                type: "GET",
                                url: `${f}?${s}`,
                                crossDomain: !0,
                              })
                              .done(function (e) {
                                d(null, e);
                              })
                              .fail(function (e) {
                                d(e);
                              }));
                        }));
                      var O = s.outerHeight();
                      (d.height(O), d.width(1));
                    }
                  }
                  function v(e) {
                    var a = e.responseJSON && e.responseJSON.msg,
                      i = m;
                    ("string" == typeof a &&
                    0 === a.indexOf("InvalidFileTypeError")
                      ? (i = y)
                      : "string" == typeof a &&
                        0 === a.indexOf("MaxFileSizeError") &&
                        (i = E),
                      p.text(i),
                      d.removeAttr("data-value"),
                      d.val(""),
                      r.toggle(!1),
                      o.toggle(!0),
                      c.toggle(!0),
                      c.focus(),
                      (n.fileUploads[t].uploading = !1),
                      h() || _(n));
                  }
                  function L(t, n) {
                    if (t) return v(t);
                    var i = n.fileName,
                      o = n.postData,
                      r = n.fileId,
                      l = n.s3Url;
                    (d.attr("data-value", r),
                      (function (t, n, a, i, o) {
                        var r = new FormData();
                        for (var l in n) r.append(l, n[l]);
                        (r.append("file", a, i),
                          e
                            .ajax({
                              type: "POST",
                              url: t,
                              data: r,
                              processData: !1,
                              contentType: !1,
                            })
                            .done(function () {
                              o(null);
                            })
                            .fail(function (e) {
                              o(e);
                            }));
                      })(l, o, a, i, R));
                  }
                  function R(e) {
                    if (e) return v(e);
                    (r.toggle(!1),
                      l.css("display", "inline-block"),
                      l.focus(),
                      (n.fileUploads[t].uploading = !1),
                      h() || _(n));
                  }
                  function h() {
                    return (
                      (n.fileUploads && n.fileUploads.toArray()) ||
                      []
                    ).some(function (e) {
                      return e.uploading;
                    });
                  }
                })(t, d);
              }),
              O &&
                ((function (e) {
                  let t = e.btn || e.form.find(':input[type="submit"]');
                  (e.btn || (e.btn = t),
                    t.prop("disabled", !0),
                    t.addClass("w-form-loading"));
                })(d),
                h(l, !0),
                p.on(
                  "undefined" != typeof turnstile ? "ready" : r,
                  function () {
                    i(
                      O,
                      o,
                      (e) => {
                        ((d.turnstileToken = e), _(d), h(l, !1));
                      },
                      () => {
                        (_(d), d.btn && d.btn.prop("disabled", !0), h(l, !1));
                      },
                    );
                  },
                )));
            var g =
              d.form.attr("aria-label") || d.form.attr("data-name") || "Form";
            (d.done.attr("aria-label") || d.form.attr("aria-label", g),
              d.done.attr("tabindex", "-1"),
              d.done.attr("role", "region"),
              d.done.attr("aria-label") ||
                d.done.attr("aria-label", g + " success"),
              d.fail.attr("tabindex", "-1"),
              d.fail.attr("role", "region"),
              d.fail.attr("aria-label") ||
                d.fail.attr("aria-label", g + " failure"));
            var E = (d.action = l.attr("action"));
            if (
              ((d.handler = null),
              (d.redirect = l.attr("data-redirect")),
              v.test(E))
            ) {
              d.handler = M;
              return;
            }
            if (!E) {
              if (c) {
                d.handler = (0, n(6524).default)(
                  _,
                  I,
                  a,
                  w,
                  x,
                  A,
                  m,
                  N,
                  S,
                  c,
                  V,
                  e,
                  s,
                );
                return;
              }
              L();
            }
          }
          function _(e) {
            var t = (e.btn = e.form.find(':input[type="submit"]'));
            ((e.wait = e.btn.attr("data-wait") || null), (e.success = !1));
            let n = !!(O && !e.turnstileToken);
            (t.prop("disabled", n),
              t.removeClass("w-form-loading"),
              e.label && t.val(e.label));
          }
          function S(e) {
            var t = e.btn,
              n = e.wait;
            (t.prop("disabled", !0), n && ((e.label = t.val()), t.val(n)));
          }
          function h(e, t) {
            let n = e.closest(".w-form");
            t ? n.addClass("w-form-loading") : n.removeClass("w-form-loading");
          }
          function A(t, n) {
            var a = null;
            return (
              (n = n || {}),
              t
                .find(
                  ':input:not([type="submit"]):not([type="file"]):not([type="button"])',
                )
                .each(function (i, o) {
                  var r,
                    l,
                    c,
                    d,
                    s,
                    f = e(o),
                    u = f.attr("type"),
                    p =
                      f.attr("data-name") ||
                      f.attr("name") ||
                      "Field " + (i + 1);
                  p = encodeURIComponent(p);
                  var I = f.val();
                  if ("checkbox" === u) I = f.is(":checked");
                  else if ("radio" === u) {
                    if (null === n[p] || "string" == typeof n[p]) return;
                    I =
                      t
                        .find('input[name="' + f.attr("name") + '"]:checked')
                        .val() || null;
                  }
                  ("string" == typeof I && (I = e.trim(I)),
                    (n[p] = I),
                    (a =
                      a ||
                      ((r = f),
                      (l = u),
                      (c = p),
                      (d = I),
                      (s = null),
                      "password" === l
                        ? (s = "Passwords cannot be submitted.")
                        : r.attr("required")
                          ? d
                            ? E.test(r.attr("type")) &&
                              !y.test(d) &&
                              (s =
                                "Please enter a valid email address for: " + c)
                            : (s = "Please fill out the required field: " + c)
                          : "g-recaptcha-response" !== c ||
                            d ||
                            (s = "Please confirm you're not a robot."),
                      s)));
                }),
              a
            );
          }
          function N(t) {
            var n = {};
            return (
              t.find(':input[type="file"]').each(function (t, a) {
                var i = e(a),
                  o =
                    i.attr("data-name") || i.attr("name") || "File " + (t + 1),
                  r = i.attr("data-value");
                ("string" == typeof r && (r = e.trim(r)), (n[o] = r));
              }),
              n
            );
          }
          u.ready =
            u.design =
            u.preview =
              function () {
                ((function () {
                  if (O) {
                    let e = () => {
                      (((o = document.createElement("script")).src =
                        "https://challenges.cloudflare.com/turnstile/v0/api.js"),
                        document.head.appendChild(o),
                        (o.onload = () => {
                          p.trigger(r);
                        }));
                    };
                    "function" == typeof requestIdleCallback
                      ? window.requestIdleCallback(e)
                      : setTimeout(e, 200);
                  }
                })(),
                  (s =
                    "https://webflow.com/api/v1/form/" +
                    (c = e("html").attr("data-wf-site"))),
                  g &&
                    s.indexOf("https://webflow.com") >= 0 &&
                    (s = s.replace(
                      "https://webflow.com",
                      "https://formdata.webflow.com",
                    )),
                  (f = `${s}/signFile`),
                  (l = e(T + " form")).length && l.each(R),
                  (!b || a.env("preview")) &&
                    !d &&
                    (function () {
                      ((d = !0),
                        p.on("submit", T + " form", function (t) {
                          var n = e.data(this, T);
                          n.handler && ((n.evt = t), n.handler(n));
                        }));
                      let t = ".w-checkbox-input",
                        n = ".w-radio-input",
                        a = "w--redirected-checked",
                        i = "w--redirected-focus",
                        o = "w--redirected-focus-visible",
                        r = [
                          ["checkbox", t],
                          ["radio", n],
                        ];
                      (p.on(
                        "change",
                        T + ' form input[type="checkbox"]:not(' + t + ")",
                        (n) => {
                          e(n.target).siblings(t).toggleClass(a);
                        },
                      ),
                        p.on("change", T + ' form input[type="radio"]', (i) => {
                          e(`input[name="${i.target.name}"]:not(${t})`).map(
                            (t, i) => e(i).siblings(n).removeClass(a),
                          );
                          let o = e(i.target);
                          o.hasClass("w-radio-input") ||
                            o.siblings(n).addClass(a);
                        }),
                        r.forEach(([t, n]) => {
                          (p.on(
                            "focus",
                            T + ` form input[type="${t}"]:not(` + n + ")",
                            (t) => {
                              (e(t.target).siblings(n).addClass(i),
                                e(t.target)
                                  .filter(
                                    ":focus-visible, [data-wf-focus-visible]",
                                  )
                                  .siblings(n)
                                  .addClass(o));
                            },
                          ),
                            p.on(
                              "blur",
                              T + ` form input[type="${t}"]:not(` + n + ")",
                              (t) => {
                                e(t.target)
                                  .siblings(n)
                                  .removeClass(`${i} ${o}`);
                              },
                            ));
                        }));
                    })());
              };
          let C = { _mkto_trk: "marketo" };
          function w() {
            return document.cookie.split("; ").reduce(function (e, t) {
              let n = t.split("="),
                a = n[0];
              if (a in C) {
                let t = C[a],
                  i = n.slice(1).join("=");
                e[t] = i;
              }
              return e;
            }, {});
          }
          function M(n) {
            _(n);
            var a,
              i = n.form,
              o = {};
            if (/^https/.test(I.href) && !/^https/.test(n.action))
              return void i.attr("method", "post");
            x(n);
            var r = A(i, o);
            if (r) return m(r);
            (S(n),
              t.each(o, function (e, t) {
                (E.test(t) && (o.EMAIL = e),
                  /^((full[ _-]?)?name)$/i.test(t) && (a = e),
                  /^(first[ _-]?name)$/i.test(t) && (o.FNAME = e),
                  /^(last[ _-]?name)$/i.test(t) && (o.LNAME = e));
              }),
              a &&
                !o.FNAME &&
                ((o.FNAME = (a = a.split(" "))[0]),
                (o.LNAME = o.LNAME || a[1])));
            var l = n.action.replace("/post?", "/post-json?") + "&c=?",
              c = l.indexOf("u=") + 2;
            c = l.substring(c, l.indexOf("&", c));
            var d = l.indexOf("id=") + 3;
            ((o["b_" + c + "_" + (d = l.substring(d, l.indexOf("&", d)))] = ""),
              e
                .ajax({ url: l, data: o, dataType: "jsonp" })
                .done(function (e) {
                  ((n.success =
                    "success" === e.result || /already/.test(e.msg)),
                    n.success || console.info("MailChimp error: " + e.msg),
                    V(n));
                })
                .fail(function () {
                  V(n);
                }));
          }
          function V(e) {
            var t = e.form,
              n = e.redirect,
              i = e.success;
            if (i && n) return void a.location(n);
            (e.done.toggle(i),
              e.fail.toggle(!i),
              i ? e.done.focus() : e.fail.focus(),
              t.toggle(!i),
              _(e));
          }
          function x(e) {
            (e.evt && e.evt.preventDefault(), (e.evt = null));
          }
          return u;
        }),
      );
    },
    1655: function (e, t, n) {
      "use strict";
      var a = n(3949),
        i = n(5134);
      let o = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      };
      function r(e, t) {
        i.dispatchCustomEvent(e, "IX3_COMPONENT_STATE_CHANGE", {
          component: "navbar",
          state: t,
        });
      }
      a.define(
        "navbar",
        (e.exports = function (e, t) {
          var n,
            l,
            c,
            d,
            s = {},
            f = e.tram,
            u = e(window),
            p = e(document),
            I = t.debounce,
            g = a.env(),
            T = ".w-nav",
            E = "w--open",
            y = "w--nav-dropdown-open",
            m = "w--nav-dropdown-toggle-open",
            b = "w--nav-dropdown-list-open",
            O = "w--nav-link-open",
            v = i.triggers,
            L = e();
          function R() {
            a.resize.off(_);
          }
          function _() {
            l.each(U);
          }
          function S(n, a) {
            var i,
              r,
              l,
              s,
              f,
              I = e(a),
              g = e.data(a, T);
            (g ||
              (g = e.data(a, T, {
                open: !1,
                el: I,
                config: {},
                selectedIdx: -1,
              })),
              (g.menu = I.find(".w-nav-menu")),
              (g.links = g.menu.find(".w-nav-link")),
              (g.dropdowns = g.menu.find(".w-dropdown")),
              (g.dropdownToggle = g.menu.find(".w-dropdown-toggle")),
              (g.dropdownList = g.menu.find(".w-dropdown-list")),
              (g.button = I.find(".w-nav-button")),
              (g.container = I.find(".w-container")),
              (g.overlayContainerId = "w-nav-overlay-" + n),
              (g.outside =
                ((i = g).outside && p.off("click" + T, i.outside),
                function (t) {
                  var n = e(t.target);
                  (d && n.closest(".w-editor-bem-EditorOverlay").length) ||
                    x(i, n);
                })));
            var E = I.find(".w-nav-brand");
            (E &&
              "/" === E.attr("href") &&
              null == E.attr("aria-label") &&
              E.attr("aria-label", "home"),
              g.button.attr("style", "-webkit-user-select: text;"),
              null == g.button.attr("aria-label") &&
                g.button.attr("aria-label", "menu"),
              g.button.attr("role", "button"),
              g.button.attr("tabindex", "0"),
              g.button.attr("aria-controls", g.overlayContainerId),
              g.button.attr("aria-haspopup", "menu"),
              g.button.attr("aria-expanded", "false"),
              g.el.off(T),
              g.button.off(T),
              g.menu.off(T),
              N(g),
              c
                ? (A(g),
                  g.el.on(
                    "setting" + T,
                    ((r = g),
                    function (e, n) {
                      n = n || {};
                      var a = u.width();
                      (N(r),
                        !0 === n.open && k(r, !0),
                        !1 === n.open && B(r, !0),
                        r.open &&
                          t.defer(function () {
                            a !== u.width() && w(r);
                          }));
                    }),
                  ))
                : ((l = g).overlay ||
                    ((l.overlay = e(
                      '<div class="w-nav-overlay" data-wf-ignore />',
                    ).appendTo(l.el)),
                    l.overlay.attr("id", l.overlayContainerId),
                    (l.parent = l.menu.parent()),
                    B(l, !0)),
                  g.button.on("click" + T, M(g)),
                  g.menu.on("click" + T, "a", V(g)),
                  g.button.on(
                    "keydown" + T,
                    ((s = g),
                    function (e) {
                      switch (e.keyCode) {
                        case o.SPACE:
                        case o.ENTER:
                          return (
                            M(s)(),
                            e.preventDefault(),
                            e.stopPropagation()
                          );
                        case o.ESCAPE:
                          return (
                            B(s),
                            e.preventDefault(),
                            e.stopPropagation()
                          );
                        case o.ARROW_RIGHT:
                        case o.ARROW_DOWN:
                        case o.HOME:
                        case o.END:
                          if (!s.open)
                            return (e.preventDefault(), e.stopPropagation());
                          return (
                            e.keyCode === o.END
                              ? (s.selectedIdx = s.links.length - 1)
                              : (s.selectedIdx = 0),
                            C(s),
                            e.preventDefault(),
                            e.stopPropagation()
                          );
                      }
                    }),
                  ),
                  g.el.on(
                    "keydown" + T,
                    ((f = g),
                    function (e) {
                      if (f.open)
                        switch (
                          ((f.selectedIdx = f.links.index(
                            document.activeElement,
                          )),
                          e.keyCode)
                        ) {
                          case o.HOME:
                          case o.END:
                            return (
                              e.keyCode === o.END
                                ? (f.selectedIdx = f.links.length - 1)
                                : (f.selectedIdx = 0),
                              C(f),
                              e.preventDefault(),
                              e.stopPropagation()
                            );
                          case o.ESCAPE:
                            return (
                              B(f),
                              f.button.focus(),
                              e.preventDefault(),
                              e.stopPropagation()
                            );
                          case o.ARROW_LEFT:
                          case o.ARROW_UP:
                            return (
                              (f.selectedIdx = Math.max(-1, f.selectedIdx - 1)),
                              C(f),
                              e.preventDefault(),
                              e.stopPropagation()
                            );
                          case o.ARROW_RIGHT:
                          case o.ARROW_DOWN:
                            return (
                              (f.selectedIdx = Math.min(
                                f.links.length - 1,
                                f.selectedIdx + 1,
                              )),
                              C(f),
                              e.preventDefault(),
                              e.stopPropagation()
                            );
                        }
                    }),
                  )),
              U(n, a));
          }
          function h(t, n) {
            var a = e.data(n, T);
            a && (A(a), e.removeData(n, T));
          }
          function A(e) {
            e.overlay && (B(e, !0), e.overlay.remove(), (e.overlay = null));
          }
          function N(e) {
            var n = {},
              a = e.config || {},
              i = (n.animation = e.el.attr("data-animation") || "default");
            ((n.animOver = /^over/.test(i)),
              (n.animDirect = /left$/.test(i) ? -1 : 1),
              a.animation !== i && e.open && t.defer(w, e),
              (n.easing = e.el.attr("data-easing") || "ease"),
              (n.easing2 = e.el.attr("data-easing2") || "ease"));
            var o = e.el.attr("data-duration");
            ((n.duration = null != o ? Number(o) : 400),
              (n.docHeight = e.el.attr("data-doc-height")),
              (e.config = n));
          }
          function C(e) {
            if (e.links[e.selectedIdx]) {
              var t = e.links[e.selectedIdx];
              (t.focus(), V(t));
            }
          }
          function w(e) {
            e.open && (B(e, !0), k(e, !0));
          }
          function M(e) {
            return I(function () {
              e.open ? B(e) : k(e);
            });
          }
          function V(t) {
            return function (n) {
              var i = e(this).attr("href");
              if (!a.validClick(n.currentTarget))
                return void n.preventDefault();
              i && 0 === i.indexOf("#") && t.open && B(t);
            };
          }
          ((s.ready =
            s.design =
            s.preview =
              function () {
                ((c = g && a.env("design")),
                  (d = a.env("editor")),
                  (n = e(document.body)),
                  (l = p.find(T)).length && (l.each(S), R(), a.resize.on(_)));
              }),
            (s.destroy = function () {
              ((L = e()), R(), l && l.length && l.each(h));
            }));
          var x = I(function (e, t) {
            if (e.open) {
              var n = t.closest(".w-nav-menu");
              e.menu.is(n) || B(e);
            }
          });
          function U(t, n) {
            var a = e.data(n, T),
              i = (a.collapsed = "none" !== a.button.css("display"));
            if ((!a.open || i || c || B(a, !0), a.container.length)) {
              var o,
                r =
                  ("none" === (o = a.container.css(P)) && (o = ""),
                  function (t, n) {
                    ((n = e(n)).css(P, ""), "none" === n.css(P) && n.css(P, o));
                  });
              (a.links.each(r), a.dropdowns.each(r));
            }
            a.open && D(a);
          }
          var P = "max-width";
          function G(e, t) {
            t.setAttribute("data-nav-menu-open", "");
          }
          function F(e, t) {
            t.removeAttribute("data-nav-menu-open");
          }
          function k(e, t) {
            if (!e.open) {
              ((e.open = !0),
                e.menu.each(G),
                e.links.addClass(O),
                e.dropdowns.addClass(y),
                e.dropdownToggle.addClass(m),
                e.dropdownList.addClass(b),
                e.button.addClass(E));
              var n = e.config;
              ("none" === n.animation ||
                !f.support.transform ||
                n.duration <= 0) &&
                (t = !0);
              var i = D(e),
                o = e.menu.outerHeight(!0),
                l = e.menu.outerWidth(!0),
                d = e.el.height(),
                s = e.el[0];
              if (
                (U(0, s),
                v.intro(0, s),
                r(s, "open"),
                a.redraw.up(),
                c || p.on("click" + T, e.outside),
                t)
              )
                return void I();
              var u = "transform " + n.duration + "ms " + n.easing;
              if (
                (e.overlay &&
                  ((L = e.menu.prev()), e.overlay.show().append(e.menu)),
                n.animOver)
              ) {
                (f(e.menu)
                  .add(u)
                  .set({ x: n.animDirect * l, height: i })
                  .start({ x: 0 })
                  .then(I),
                  e.overlay && e.overlay.width(l));
                return;
              }
              f(e.menu)
                .add(u)
                .set({ y: -(d + o) })
                .start({ y: 0 })
                .then(I);
            }
            function I() {
              e.button.attr("aria-expanded", "true");
            }
          }
          function D(e) {
            var t = e.config,
              a = t.docHeight ? p.height() : n.height();
            return (
              t.animOver
                ? e.menu.height(a)
                : "fixed" !== e.el.css("position") &&
                  (a -= e.el.outerHeight(!0)),
              e.overlay && e.overlay.height(a),
              a
            );
          }
          function B(e, t) {
            if (e.open) {
              ((e.open = !1), e.button.removeClass(E));
              var n = e.config;
              if (
                (("none" === n.animation ||
                  !f.support.transform ||
                  n.duration <= 0) &&
                  (t = !0),
                v.outro(0, e.el[0]),
                r(e.el[0], "close"),
                p.off("click" + T, e.outside),
                t)
              ) {
                (f(e.menu).stop(), c());
                return;
              }
              var a = "transform " + n.duration + "ms " + n.easing2,
                i = e.menu.outerHeight(!0),
                o = e.menu.outerWidth(!0),
                l = e.el.height();
              if (n.animOver)
                return void f(e.menu)
                  .add(a)
                  .start({ x: o * n.animDirect })
                  .then(c);
              f(e.menu)
                .add(a)
                .start({ y: -(l + i) })
                .then(c);
            }
            function c() {
              (e.menu.height(""),
                f(e.menu).set({ x: 0, y: 0 }),
                e.menu.each(F),
                e.links.removeClass(O),
                e.dropdowns.removeClass(y),
                e.dropdownToggle.removeClass(m),
                e.dropdownList.removeClass(b),
                e.overlay &&
                  e.overlay.children().length &&
                  (L.length
                    ? e.menu.insertAfter(L)
                    : e.menu.prependTo(e.parent),
                  e.overlay.attr("style", "").hide()),
                e.el.triggerHandler("w-close"),
                e.button.attr("aria-expanded", "false"));
            }
          }
          return s;
        }),
      );
    },
    9078: function (e, t, n) {
      "use strict";
      var a = n(3949),
        i = n(5134);
      a.define(
        "tabs",
        (e.exports = function (e) {
          var t,
            n,
            o = {},
            r = e.tram,
            l = e(document),
            c = a.env,
            d = c.safari,
            s = c(),
            f = "data-w-tab",
            u = ".w-tabs",
            p = "w--current",
            I = "w--tab-active",
            g = i.triggers,
            T = !1;
          function E() {
            ((n = s && a.env("design")),
              (t = l.find(u)).length &&
                (t.each(b),
                a.env("preview") && !T && t.each(m),
                y(),
                a.redraw.on(o.redraw)));
          }
          function y() {
            a.redraw.off(o.redraw);
          }
          function m(t, n) {
            var a = e.data(n, u);
            a &&
              (a.links && a.links.each(g.reset),
              a.panes && a.panes.each(g.reset));
          }
          function b(t, a) {
            var i = u.substr(1) + "-" + t,
              o = e(a),
              r = e.data(a, u);
            if (
              (r || (r = e.data(a, u, { el: o, config: {} })),
              (r.current = null),
              (r.tabIdentifier = i + "-" + f),
              (r.paneIdentifier = i + "-data-w-pane"),
              (r.menu = o.children(".w-tab-menu")),
              (r.links = r.menu.children(".w-tab-link")),
              (r.content = o.children(".w-tab-content")),
              (r.panes = r.content.children(".w-tab-pane")),
              r.el.off(u),
              r.links.off(u),
              r.menu.attr("role", "tablist"),
              r.links.attr("tabindex", "-1"),
              ((c = {}).easing = (l = r).el.attr("data-easing") || "ease"),
              (d = c.intro =
                (d = parseInt(l.el.attr("data-duration-in"), 10)) == d ? d : 0),
              (s = c.outro =
                (s = parseInt(l.el.attr("data-duration-out"), 10)) == s
                  ? s
                  : 0),
              (c.immediate = !d && !s),
              (l.config = c),
              !n)
            ) {
              (r.links.on(
                "click" + u,
                ((I = r),
                function (e) {
                  e.preventDefault();
                  var t = e.currentTarget.getAttribute(f);
                  t && O(I, { tab: t });
                }),
              ),
                r.links.on(
                  "keydown" + u,
                  ((g = r),
                  function (e) {
                    var t,
                      n =
                        ((t = g.current),
                        Array.prototype.findIndex.call(
                          g.links,
                          (e) => e.getAttribute(f) === t,
                          null,
                        )),
                      a = e.key,
                      i = {
                        ArrowLeft: n - 1,
                        ArrowUp: n - 1,
                        ArrowRight: n + 1,
                        ArrowDown: n + 1,
                        End: g.links.length - 1,
                        Home: 0,
                      };
                    if (a in i) {
                      e.preventDefault();
                      var o = i[a];
                      (-1 === o && (o = g.links.length - 1),
                        o === g.links.length && (o = 0));
                      var r = g.links[o].getAttribute(f);
                      r && O(g, { tab: r });
                    }
                  }),
                ));
              var l,
                c,
                d,
                s,
                I,
                g,
                T = r.links.filter("." + p).attr(f);
              T && O(r, { tab: T, immediate: !0 });
            }
          }
          function O(t, n) {
            n = n || {};
            var i,
              o = t.config,
              l = o.easing,
              c = n.tab;
            if (c !== t.current) {
              ((t.current = c),
                t.links.each(function (a, r) {
                  var l = e(r);
                  if (n.immediate || o.immediate) {
                    var d = t.panes[a];
                    (r.id || (r.id = t.tabIdentifier + "-" + a),
                      d.id || (d.id = t.paneIdentifier + "-" + a),
                      (r.href = "#" + d.id),
                      r.setAttribute("role", "tab"),
                      r.setAttribute("aria-controls", d.id),
                      r.setAttribute("aria-selected", "false"),
                      d.setAttribute("role", "tabpanel"),
                      d.setAttribute("aria-labelledby", r.id));
                  }
                  r.getAttribute(f) === c
                    ? ((i = r),
                      l
                        .addClass(p)
                        .removeAttr("tabindex")
                        .attr({ "aria-selected": "true" })
                        .each(g.intro))
                    : l.hasClass(p) &&
                      l
                        .removeClass(p)
                        .attr({ tabindex: "-1", "aria-selected": "false" })
                        .each(g.outro);
                }));
              var s = [],
                u = [];
              t.panes.each(function (t, n) {
                var a = e(n);
                n.getAttribute(f) === c
                  ? s.push(n)
                  : a.hasClass(I) && u.push(n);
              });
              var E = e(s),
                y = e(u);
              if (n.immediate || o.immediate) {
                (E.addClass(I).each(g.intro),
                  y.removeClass(I),
                  T || a.redraw.up());
                return;
              }
              var m = window.scrollX,
                b = window.scrollY;
              (i.focus(),
                window.scrollTo(m, b),
                y.length && o.outro
                  ? (y.each(g.outro),
                    r(y)
                      .add("opacity " + o.outro + "ms " + l, { fallback: d })
                      .start({ opacity: 0 })
                      .then(() => v(o, y, E)))
                  : v(o, y, E));
            }
          }
          function v(e, t, n) {
            if (
              (t
                .removeClass(I)
                .css({
                  opacity: "",
                  transition: "",
                  transform: "",
                  width: "",
                  height: "",
                }),
              n.addClass(I).each(g.intro),
              a.redraw.up(),
              !e.intro)
            )
              return r(n).set({ opacity: 1 });
            r(n)
              .set({ opacity: 0 })
              .redraw()
              .add("opacity " + e.intro + "ms " + e.easing, { fallback: d })
              .start({ opacity: 1 });
          }
          return (
            (o.ready = o.design = o.preview = E),
            (o.redraw = function () {
              ((T = !0), E(), (T = !1));
            }),
            (o.destroy = function () {
              (t = l.find(u)).length && (t.each(m), y());
            }),
            o
          );
        }),
      );
    },
    3487: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        strFromU8: function () {
          return Q;
        },
        unzip: function () {
          return $;
        },
      };
      for (var a in n)
        Object.defineProperty(t, a, { enumerable: !0, get: n[a] });
      let i = {},
        o = function (e, t, n, a, o) {
          let r = new Worker(
            i[t] ||
              (i[t] = URL.createObjectURL(
                new Blob(
                  [
                    e +
                      ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})',
                  ],
                  { type: "text/javascript" },
                ),
              )),
          );
          return (
            (r.onmessage = function (e) {
              let t = e.data,
                n = t.$e$;
              if (n) {
                let e = Error(n[0]);
                ((e.code = n[1]), (e.stack = n[2]), o(e, null));
              } else o(null, t);
            }),
            r.postMessage(n, a),
            r
          );
        },
        r = Uint8Array,
        l = Uint16Array,
        c = Uint32Array,
        d = new r([
          0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4,
          4, 5, 5, 5, 5, 0, 0, 0, 0,
        ]),
        s = new r([
          0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10,
          10, 11, 11, 12, 12, 13, 13, 0, 0,
        ]),
        f = new r([
          16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
        ]),
        u = function (e, t) {
          let n = new l(31);
          for (var a = 0; a < 31; ++a) n[a] = t += 1 << e[a - 1];
          let i = new c(n[30]);
          for (a = 1; a < 30; ++a)
            for (let e = n[a]; e < n[a + 1]; ++e) i[e] = ((e - n[a]) << 5) | a;
          return [n, i];
        },
        p = u(d, 2),
        I = p[0],
        g = p[1];
      ((I[28] = 258), (g[258] = 28));
      let T = u(s, 0)[0],
        E = new l(32768);
      for (var y = 0; y < 32768; ++y) {
        let e = ((43690 & y) >>> 1) | ((21845 & y) << 1);
        ((e =
          ((61680 & (e = ((52428 & e) >>> 2) | ((13107 & e) << 2))) >>> 4) |
          ((3855 & e) << 4)),
          (E[y] = (((65280 & e) >>> 8) | ((255 & e) << 8)) >>> 1));
      }
      let m = function (e, t, n) {
          let a,
            i = e.length,
            o = 0,
            r = new l(t);
          for (; o < i; ++o) e[o] && ++r[e[o] - 1];
          let c = new l(t);
          for (o = 0; o < t; ++o) c[o] = (c[o - 1] + r[o - 1]) << 1;
          if (n) {
            a = new l(1 << t);
            let n = 15 - t;
            for (o = 0; o < i; ++o)
              if (e[o]) {
                let i = (o << 4) | e[o],
                  r = t - e[o],
                  l = c[e[o] - 1]++ << r;
                for (let e = l | ((1 << r) - 1); l <= e; ++l) a[E[l] >>> n] = i;
              }
          } else
            for (a = new l(i), o = 0; o < i; ++o)
              e[o] && (a[o] = E[c[e[o] - 1]++] >>> (15 - e[o]));
          return a;
        },
        b = new r(288);
      for (y = 0; y < 144; ++y) b[y] = 8;
      for (y = 144; y < 256; ++y) b[y] = 9;
      for (y = 256; y < 280; ++y) b[y] = 7;
      for (y = 280; y < 288; ++y) b[y] = 8;
      let O = new r(32);
      for (y = 0; y < 32; ++y) O[y] = 5;
      let v = m(b, 9, 1),
        L = m(O, 5, 1),
        R = function (e) {
          let t = e[0];
          for (let n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
          return t;
        },
        _ = function (e, t, n) {
          let a = (t / 8) | 0;
          return ((e[a] | (e[a + 1] << 8)) >> (7 & t)) & n;
        },
        S = function (e, t) {
          let n = (t / 8) | 0;
          return (e[n] | (e[n + 1] << 8) | (e[n + 2] << 16)) >> (7 & t);
        },
        h = function (e) {
          return ((e + 7) / 8) | 0;
        },
        A = function (e, t, n) {
          ((null == t || t < 0) && (t = 0),
            (null == n || n > e.length) && (n = e.length));
          let a = new (
            2 === e.BYTES_PER_ELEMENT ? l : 4 === e.BYTES_PER_ELEMENT ? c : r
          )(n - t);
          return (a.set(e.subarray(t, n)), a);
        },
        N = [
          "unexpected EOF",
          "invalid block type",
          "invalid length/literal",
          "invalid distance",
          "stream finished",
          "no stream handler",
          ,
          "no callback",
          "invalid UTF-8 data",
          "extra field too long",
          "date not in range 1980-2099",
          "filename too long",
          "stream finishing",
          "invalid zip data",
        ];
      var C = function (e, t, n) {
        let a = Error(t || N[e]);
        if (
          ((a.code = e),
          Error.captureStackTrace && Error.captureStackTrace(a, C),
          !n)
        )
          throw a;
        return a;
      };
      let w = function (e, t, n) {
          let a = e.length;
          if (!a || (n && n.f && !n.l)) return t || new r(0);
          let i = !t || n,
            o = !n || n.i;
          (n || (n = {}), t || (t = new r(3 * a)));
          let l = function (e) {
              let n = t.length;
              if (e > n) {
                let a = new r(Math.max(2 * n, e));
                (a.set(t), (t = a));
              }
            },
            c = n.f || 0,
            u = n.p || 0,
            p = n.b || 0,
            g = n.l,
            E = n.d,
            y = n.m,
            b = n.n,
            O = 8 * a;
          do {
            if (!g) {
              c = _(e, u, 1);
              let d = _(e, u + 1, 3);
              if (((u += 3), !d)) {
                let r = e[(w = h(u) + 4) - 4] | (e[w - 3] << 8),
                  d = w + r;
                if (d > a) {
                  o && C(0);
                  break;
                }
                (i && l(p + r),
                  t.set(e.subarray(w, d), p),
                  (n.b = p += r),
                  (n.p = u = 8 * d),
                  (n.f = c));
                continue;
              }
              if (1 === d) ((g = v), (E = L), (y = 9), (b = 5));
              else if (2 === d) {
                let t = _(e, u, 31) + 257,
                  n = _(e, u + 10, 15) + 4,
                  a = t + _(e, u + 5, 31) + 1;
                u += 14;
                let i = new r(a),
                  o = new r(19);
                for (var N = 0; N < n; ++N) o[f[N]] = _(e, u + 3 * N, 7);
                u += 3 * n;
                let l = R(o),
                  c = (1 << l) - 1,
                  d = m(o, l, 1);
                for (N = 0; N < a; ) {
                  let t = d[_(e, u, c)];
                  if (((u += 15 & t), (w = t >>> 4) < 16)) i[N++] = w;
                  else {
                    var w,
                      M = 0;
                    let t = 0;
                    for (
                      16 === w
                        ? ((t = 3 + _(e, u, 3)), (u += 2), (M = i[N - 1]))
                        : 17 === w
                          ? ((t = 3 + _(e, u, 7)), (u += 3))
                          : 18 === w && ((t = 11 + _(e, u, 127)), (u += 7));
                      t--;
                    )
                      i[N++] = M;
                  }
                }
                let s = i.subarray(0, t);
                var V = i.subarray(t);
                ((y = R(s)), (b = R(V)), (g = m(s, y, 1)), (E = m(V, b, 1)));
              } else C(1);
              if (u > O) {
                o && C(0);
                break;
              }
            }
            i && l(p + 131072);
            let A = (1 << y) - 1,
              U = (1 << b) - 1,
              P = u;
            for (; ; P = u) {
              let n = (M = g[S(e, u) & A]) >>> 4;
              if ((u += 15 & M) > O) {
                o && C(0);
                break;
              }
              if ((M || C(2), n < 256)) t[p++] = n;
              else {
                if (256 === n) {
                  ((P = u), (g = null));
                  break;
                }
                {
                  let a = n - 254;
                  if (n > 264) {
                    var x = d[(N = n - 257)];
                    ((a = _(e, u, (1 << x) - 1) + I[N]), (u += x));
                  }
                  let r = E[S(e, u) & U],
                    c = r >>> 4;
                  if (
                    (r || C(3),
                    (u += 15 & r),
                    (V = T[c]),
                    c > 3 &&
                      ((x = s[c]), (V += S(e, u) & ((1 << x) - 1)), (u += x)),
                    u > O)
                  ) {
                    o && C(0);
                    break;
                  }
                  i && l(p + 131072);
                  let f = p + a;
                  for (; p < f; p += 4)
                    ((t[p] = t[p - V]),
                      (t[p + 1] = t[p + 1 - V]),
                      (t[p + 2] = t[p + 2 - V]),
                      (t[p + 3] = t[p + 3 - V]));
                  p = f;
                }
              }
            }
            ((n.l = g),
              (n.p = P),
              (n.b = p),
              (n.f = c),
              g && ((c = 1), (n.m = y), (n.d = E), (n.n = b)));
          } while (!c);
          return p === t.length ? t : A(t, 0, p);
        },
        M = function (e, t) {
          let n = {};
          for (var a in e) n[a] = e[a];
          for (var a in t) n[a] = t[a];
          return n;
        },
        V = function (e, t, n) {
          let a = e(),
            i = e.toString(),
            o = i
              .slice(i.indexOf("[") + 1, i.lastIndexOf("]"))
              .replace(/\s+/g, "")
              .split(",");
          for (let e = 0; e < a.length; ++e) {
            let i = a[e],
              r = o[e];
            if ("function" == typeof i) {
              t += ";" + r + "=";
              let e = i.toString();
              if (i.prototype)
                if (-1 !== e.indexOf("[native code]")) {
                  let n = e.indexOf(" ", 8) + 1;
                  t += e.slice(n, e.indexOf("(", n));
                } else
                  for (let n in ((t += e), i.prototype))
                    t +=
                      ";" +
                      r +
                      ".prototype." +
                      n +
                      "=" +
                      i.prototype[n].toString();
              else t += e;
            } else n[r] = i;
          }
          return [t, n];
        },
        x = [],
        U = function (e) {
          let t = [];
          for (let n in e)
            e[n].buffer && t.push((e[n] = new e[n].constructor(e[n])).buffer);
          return t;
        },
        P = function (e, t, n, a) {
          let i;
          if (!x[n]) {
            let t = "",
              a = {},
              o = e.length - 1;
            for (let n = 0; n < o; ++n)
              ((t = (i = V(e[n], t, a))[0]), (a = i[1]));
            x[n] = V(e[o], t, a);
          }
          let r = M({}, x[n][1]);
          return o(
            x[n][0] +
              ";onmessage=function(e){for(var kz in e.data)self[kz]=e.data[kz];onmessage=" +
              t.toString() +
              "}",
            n,
            r,
            U(r),
            a,
          );
        },
        G = function () {
          return [
            r,
            l,
            c,
            d,
            s,
            f,
            I,
            T,
            v,
            L,
            E,
            N,
            m,
            R,
            _,
            S,
            h,
            A,
            C,
            w,
            W,
            F,
            k,
          ];
        };
      var F = function (e) {
          return postMessage(e, [e.buffer]);
        },
        k = function (e) {
          return e && e.size && new r(e.size);
        };
      let D = function (e, t, n, a, i, o) {
          var r = P(n, a, i, function (e, t) {
            (r.terminate(), o(e, t));
          });
          return (
            r.postMessage([e, t], t.consume ? [e.buffer] : []),
            function () {
              r.terminate();
            }
          );
        },
        B = function (e, t) {
          return e[t] | (e[t + 1] << 8);
        },
        X = function (e, t) {
          return (
            (e[t] | (e[t + 1] << 8) | (e[t + 2] << 16) | (e[t + 3] << 24)) >>> 0
          );
        };
      function W(e, t) {
        return w(e, t);
      }
      let H = "undefined" != typeof TextDecoder && new TextDecoder(),
        Y = function (e) {
          for (let t = "", n = 0; ; ) {
            let a = e[n++],
              i = (a > 127) + (a > 223) + (a > 239);
            if (n + i > e.length) return [t, A(e, n - 1)];
            i
              ? 3 === i
                ? (t += String.fromCharCode(
                    55296 |
                      ((a =
                        (((15 & a) << 18) |
                          ((63 & e[n++]) << 12) |
                          ((63 & e[n++]) << 6) |
                          (63 & e[n++])) -
                        65536) >>
                        10),
                    56320 | (1023 & a),
                  ))
                : (t +=
                    1 & i
                      ? String.fromCharCode(((31 & a) << 6) | (63 & e[n++]))
                      : String.fromCharCode(
                          ((15 & a) << 12) |
                            ((63 & e[n++]) << 6) |
                            (63 & e[n++]),
                        ))
              : (t += String.fromCharCode(a));
          }
        };
      function Q(e, t) {
        if (t) {
          let t = "";
          for (let n = 0; n < e.length; n += 16384)
            t += String.fromCharCode.apply(null, e.subarray(n, n + 16384));
          return t;
        }
        if (H) return H.decode(e);
        {
          let t = Y(e),
            n = t[0];
          return (t[1].length && C(8), n);
        }
      }
      let j = function (e, t, n) {
          let a = B(e, t + 28),
            i = Q(e.subarray(t + 46, t + 46 + a), !(2048 & B(e, t + 8))),
            o = t + 46 + a,
            r = X(e, t + 20),
            l =
              n && 0xffffffff === r
                ? z64e(e, o)
                : [r, X(e, t + 24), X(e, t + 42)],
            c = l[0],
            d = l[1],
            s = l[2];
          return [B(e, t + 10), c, d, i, o + B(e, t + 30) + B(e, t + 32), s];
        },
        z =
          "function" == typeof queueMicrotask
            ? queueMicrotask
            : "function" == typeof setTimeout
              ? setTimeout
              : function (e) {
                  e();
                };
      function $(e, t, n) {
        (n || ((n = t), (t = {})), "function" != typeof n && C(7));
        let a = [],
          i = function () {
            for (let e = 0; e < a.length; ++e) a[e]();
          },
          o = {},
          l = function (e, t) {
            z(function () {
              n(e, t);
            });
          };
        z(function () {
          l = n;
        });
        let c = e.length - 22;
        for (; 0x6054b50 !== X(e, c); --c)
          if (!c || e.length - c > 65558) return (l(C(13, 0, 1), null), i);
        let d = B(e, c + 8);
        if (d) {
          let n = d,
            s = X(e, c + 16),
            f = 0xffffffff === s || 65535 === n;
          if (f) {
            let t = X(e, c - 12);
            (f = 0x6064b50 === X(e, t)) &&
              ((n = d = X(e, t + 32)), (s = X(e, t + 48)));
          }
          let u = t && t.filter;
          for (let t = 0; t < n; ++t)
            !(function () {
              var t, n, c;
              let p = j(e, s, f),
                I = p[0],
                g = p[1],
                T = p[2],
                E = p[3],
                y = p[4],
                m = p[5],
                b = m + 30 + B(e, m + 26) + B(e, m + 28);
              s = y;
              let O = function (e, t) {
                e ? (i(), l(e, null)) : (t && (o[E] = t), --d || l(null, o));
              };
              if (
                !u ||
                u({ name: E, size: g, originalSize: T, compression: I })
              )
                if (I)
                  if (8 === I) {
                    let i = e.subarray(b, b + g);
                    if (g < 32e4)
                      try {
                        O(null, ((t = new r(T)), w(i, t)));
                      } catch (e) {
                        O(e, null);
                      }
                    else
                      a.push(
                        ((n = { size: T }),
                        (c = O) || ((c = n), (n = {})),
                        "function" != typeof c && C(7),
                        D(
                          i,
                          n,
                          [G],
                          function (e) {
                            var t;
                            return F(((t = e.data[0]), w(t, k(e.data[1]))));
                          },
                          1,
                          c,
                        )),
                      );
                  } else O(C(14, "unknown compression type " + I, 1), null);
                else O(null, A(e, b, b + g));
              else O(null, null);
            })(t);
        } else l(null, {});
        return i;
      }
    },
    7933: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        fetchLottie: function () {
          return f;
        },
        unZipDotLottie: function () {
          return s;
        },
      };
      for (var i in a)
        Object.defineProperty(t, i, { enumerable: !0, get: a[i] });
      let o = n(3487);
      async function r(e) {
        return await fetch(new URL(e, window?.location?.href).href).then((e) =>
          e.arrayBuffer(),
        );
      }
      async function l(e) {
        return (
          await new Promise((t) => {
            let n = new FileReader();
            (n.readAsDataURL(new Blob([e])), (n.onload = () => t(n.result)));
          })
        ).split(",", 2)[1];
      }
      async function c(e) {
        let t = new Uint8Array(e),
          n = await new Promise((e, n) => {
            (0, o.unzip)(t, (t, a) => (t ? n(t) : e(a)));
          });
        return {
          read: (e) => (0, o.strFromU8)(n[e]),
          readB64: async (e) => await l(n[e]),
        };
      }
      async function d(e, t) {
        if (!("assets" in e)) return e;
        async function n(e) {
          let { p: n } = e;
          if (null == n || null == t.read(`images/${n}`)) return e;
          let a = n.split(".").pop(),
            i = await t.readB64(`images/${n}`);
          if (a?.startsWith("data:")) return ((e.p = a), (e.e = 1), e);
          switch (a) {
            case "svg":
            case "svg+xml":
              e.p = `data:image/svg+xml;base64,${i}`;
              break;
            case "png":
            case "jpg":
            case "jpeg":
            case "gif":
            case "webp":
              e.p = `data:image/${a};base64,${i}`;
              break;
            default:
              e.p = `data:;base64,${i}`;
          }
          return ((e.e = 1), e);
        }
        return (
          (await Promise.all(e.assets.map(n))).map((t, n) => {
            e.assets[n] = t;
          }),
          e
        );
      }
      async function s(e) {
        let t = await c(e),
          n = (function (e) {
            let t = JSON.parse(e);
            if (!("animations" in t)) throw Error("Manifest not found");
            if (0 === t.animations.length)
              throw Error("No animations listed in the manifest");
            return t;
          })(t.read("manifest.json"));
        return (
          await Promise.all(
            n.animations.map((e) =>
              d(JSON.parse(t.read(`animations/${e.id}.json`)), t),
            ),
          )
        )[0];
      }
      async function f(e) {
        let t = await r(e);
        return !(function (e) {
          let t = new Uint8Array(e, 0, 32);
          return 80 === t[0] && 75 === t[1] && 3 === t[2] && 4 === t[3];
        })(t)
          ? JSON.parse(new TextDecoder().decode(t))
          : await s(t);
      }
    },
    3946: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        actionListPlaybackChanged: function () {
          return Y;
        },
        animationFrameChanged: function () {
          return k;
        },
        clearRequested: function () {
          return U;
        },
        elementStateChanged: function () {
          return H;
        },
        eventListenerAdded: function () {
          return P;
        },
        eventStateChanged: function () {
          return F;
        },
        instanceAdded: function () {
          return B;
        },
        instanceRemoved: function () {
          return W;
        },
        instanceStarted: function () {
          return X;
        },
        mediaQueriesDefined: function () {
          return j;
        },
        parameterChanged: function () {
          return D;
        },
        playbackRequested: function () {
          return V;
        },
        previewRequested: function () {
          return M;
        },
        rawDataImported: function () {
          return A;
        },
        sessionInitialized: function () {
          return N;
        },
        sessionStarted: function () {
          return C;
        },
        sessionStopped: function () {
          return w;
        },
        stopRequested: function () {
          return x;
        },
        testFrameRendered: function () {
          return G;
        },
        viewportWidthChanged: function () {
          return Q;
        },
      };
      for (var i in a)
        Object.defineProperty(t, i, { enumerable: !0, get: a[i] });
      let o = n(7087),
        r = n(9468),
        {
          IX2_RAW_DATA_IMPORTED: l,
          IX2_SESSION_INITIALIZED: c,
          IX2_SESSION_STARTED: d,
          IX2_SESSION_STOPPED: s,
          IX2_PREVIEW_REQUESTED: f,
          IX2_PLAYBACK_REQUESTED: u,
          IX2_STOP_REQUESTED: p,
          IX2_CLEAR_REQUESTED: I,
          IX2_EVENT_LISTENER_ADDED: g,
          IX2_TEST_FRAME_RENDERED: T,
          IX2_EVENT_STATE_CHANGED: E,
          IX2_ANIMATION_FRAME_CHANGED: y,
          IX2_PARAMETER_CHANGED: m,
          IX2_INSTANCE_ADDED: b,
          IX2_INSTANCE_STARTED: O,
          IX2_INSTANCE_REMOVED: v,
          IX2_ELEMENT_STATE_CHANGED: L,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: R,
          IX2_VIEWPORT_WIDTH_CHANGED: _,
          IX2_MEDIA_QUERIES_DEFINED: S,
        } = o.IX2EngineActionTypes,
        { reifyState: h } = r.IX2VanillaUtils,
        A = (e) => ({ type: l, payload: { ...h(e) } }),
        N = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
          type: c,
          payload: { hasBoundaryNodes: e, reducedMotion: t },
        }),
        C = () => ({ type: d }),
        w = () => ({ type: s }),
        M = ({ rawData: e, defer: t }) => ({
          type: f,
          payload: { defer: t, rawData: e },
        }),
        V = ({
          actionTypeId: e = o.ActionTypeConsts.GENERAL_START_ACTION,
          actionListId: t,
          actionItemId: n,
          eventId: a,
          allowEvents: i,
          immediate: r,
          testManual: l,
          verbose: c,
          rawData: d,
        }) => ({
          type: u,
          payload: {
            actionTypeId: e,
            actionListId: t,
            actionItemId: n,
            testManual: l,
            eventId: a,
            allowEvents: i,
            immediate: r,
            verbose: c,
            rawData: d,
          },
        }),
        x = (e) => ({ type: p, payload: { actionListId: e } }),
        U = () => ({ type: I }),
        P = (e, t) => ({ type: g, payload: { target: e, listenerParams: t } }),
        G = (e = 1) => ({ type: T, payload: { step: e } }),
        F = (e, t) => ({ type: E, payload: { stateKey: e, newState: t } }),
        k = (e, t) => ({ type: y, payload: { now: e, parameters: t } }),
        D = (e, t) => ({ type: m, payload: { key: e, value: t } }),
        B = (e) => ({ type: b, payload: { ...e } }),
        X = (e, t) => ({ type: O, payload: { instanceId: e, time: t } }),
        W = (e) => ({ type: v, payload: { instanceId: e } }),
        H = (e, t, n, a) => ({
          type: L,
          payload: { elementId: e, actionTypeId: t, current: n, actionItem: a },
        }),
        Y = ({ actionListId: e, isPlaying: t }) => ({
          type: R,
          payload: { actionListId: e, isPlaying: t },
        }),
        Q = ({ width: e, mediaQueries: t }) => ({
          type: _,
          payload: { width: e, mediaQueries: t },
        }),
        j = () => ({ type: S });
    },
    6011: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a,
        i = {
          actions: function () {
            return d;
          },
          destroy: function () {
            return I;
          },
          init: function () {
            return p;
          },
          setEnv: function () {
            return u;
          },
          store: function () {
            return f;
          },
        };
      for (var o in i)
        Object.defineProperty(t, o, { enumerable: !0, get: i[o] });
      let r = n(9516),
        l = (a = n(7243)) && a.__esModule ? a : { default: a },
        c = n(1970),
        d = (function (e, t) {
          if (e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var n = s(t);
          if (n && n.has(e)) return n.get(e);
          var a = { __proto__: null },
            i = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var o in e)
            if ("default" !== o && Object.prototype.hasOwnProperty.call(e, o)) {
              var r = i ? Object.getOwnPropertyDescriptor(e, o) : null;
              r && (r.get || r.set)
                ? Object.defineProperty(a, o, r)
                : (a[o] = e[o]);
            }
          return ((a.default = e), n && n.set(e, a), a);
        })(n(3946));
      function s(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap(),
          n = new WeakMap();
        return (s = function (e) {
          return e ? n : t;
        })(e);
      }
      let f = (0, r.createStore)(l.default);
      function u(e) {
        e() && (0, c.observeRequests)(f);
      }
      function p(e) {
        (I(), (0, c.startEngine)({ store: f, rawData: e, allowEvents: !0 }));
      }
      function I() {
        (0, c.stopEngine)(f);
      }
    },
    5012: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        elementContains: function () {
          return m;
        },
        getChildElements: function () {
          return O;
        },
        getClosestElement: function () {
          return L;
        },
        getProperty: function () {
          return I;
        },
        getQuerySelector: function () {
          return T;
        },
        getRefType: function () {
          return R;
        },
        getSiblingElements: function () {
          return v;
        },
        getStyle: function () {
          return p;
        },
        getValidDocument: function () {
          return E;
        },
        isSiblingNode: function () {
          return b;
        },
        matchSelector: function () {
          return g;
        },
        queryDocument: function () {
          return y;
        },
        setStyle: function () {
          return u;
        },
      };
      for (var i in a)
        Object.defineProperty(t, i, { enumerable: !0, get: a[i] });
      let o = n(9468),
        r = n(7087),
        { ELEMENT_MATCHES: l } = o.IX2BrowserSupport,
        {
          IX2_ID_DELIMITER: c,
          HTML_ELEMENT: d,
          PLAIN_OBJECT: s,
          WF_PAGE: f,
        } = r.IX2EngineConstants;
      function u(e, t, n) {
        e.style[t] = n;
      }
      function p(e, t) {
        return t.startsWith("--")
          ? window
              .getComputedStyle(document.documentElement)
              .getPropertyValue(t)
          : e.style instanceof CSSStyleDeclaration
            ? e.style[t]
            : void 0;
      }
      function I(e, t) {
        return e[t];
      }
      function g(e) {
        return (t) => t[l](e);
      }
      function T({ id: e, selector: t }) {
        if (e) {
          let t = e;
          if (-1 !== e.indexOf(c)) {
            let n = e.split(c),
              a = n[0];
            if (((t = n[1]), a !== document.documentElement.getAttribute(f)))
              return null;
          }
          return `[data-w-id="${t}"], [data-w-id^="${t}_instance"]`;
        }
        return t;
      }
      function E(e) {
        return null == e || e === document.documentElement.getAttribute(f)
          ? document
          : null;
      }
      function y(e, t) {
        return Array.prototype.slice.call(
          document.querySelectorAll(t ? e + " " + t : e),
        );
      }
      function m(e, t) {
        return e.contains(t);
      }
      function b(e, t) {
        return e !== t && e.parentNode === t.parentNode;
      }
      function O(e) {
        let t = [];
        for (let n = 0, { length: a } = e || []; n < a; n++) {
          let { children: a } = e[n],
            { length: i } = a;
          if (i) for (let e = 0; e < i; e++) t.push(a[e]);
        }
        return t;
      }
      function v(e = []) {
        let t = [],
          n = [];
        for (let a = 0, { length: i } = e; a < i; a++) {
          let { parentNode: i } = e[a];
          if (!i || !i.children || !i.children.length || -1 !== n.indexOf(i))
            continue;
          n.push(i);
          let o = i.firstElementChild;
          for (; null != o; )
            (-1 === e.indexOf(o) && t.push(o), (o = o.nextElementSibling));
        }
        return t;
      }
      let L = Element.prototype.closest
        ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
        : (e, t) => {
            if (!document.documentElement.contains(e)) return null;
            let n = e;
            do {
              if (n[l] && n[l](t)) return n;
              n = n.parentNode;
            } while (null != n);
            return null;
          };
      function R(e) {
        return null != e && "object" == typeof e
          ? e instanceof Element
            ? d
            : s
          : null;
      }
    },
    1970: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        observeRequests: function () {
          return K;
        },
        startActionGroup: function () {
          return eI;
        },
        startEngine: function () {
          return ea;
        },
        stopActionGroup: function () {
          return ep;
        },
        stopAllActionGroups: function () {
          return eu;
        },
        stopEngine: function () {
          return ei;
        },
      };
      for (var i in a)
        Object.defineProperty(t, i, { enumerable: !0, get: a[i] });
      let o = y(n(9777)),
        r = y(n(4738)),
        l = y(n(4659)),
        c = y(n(3452)),
        d = y(n(6633)),
        s = y(n(3729)),
        f = y(n(2397)),
        u = y(n(5082)),
        p = n(7087),
        I = n(9468),
        g = n(3946),
        T = (function (e, t) {
          if (e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var n = m(t);
          if (n && n.has(e)) return n.get(e);
          var a = { __proto__: null },
            i = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var o in e)
            if ("default" !== o && Object.prototype.hasOwnProperty.call(e, o)) {
              var r = i ? Object.getOwnPropertyDescriptor(e, o) : null;
              r && (r.get || r.set)
                ? Object.defineProperty(a, o, r)
                : (a[o] = e[o]);
            }
          return ((a.default = e), n && n.set(e, a), a);
        })(n(5012)),
        E = y(n(8955));
      function y(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function m(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap(),
          n = new WeakMap();
        return (m = function (e) {
          return e ? n : t;
        })(e);
      }
      let b = Object.keys(p.QuickEffectIds),
        O = (e) => b.includes(e),
        {
          COLON_DELIMITER: v,
          BOUNDARY_SELECTOR: L,
          HTML_ELEMENT: R,
          RENDER_GENERAL: _,
          W_MOD_IX: S,
        } = p.IX2EngineConstants,
        {
          getAffectedElements: h,
          getElementId: A,
          getDestinationValues: N,
          observeStore: C,
          getInstanceId: w,
          renderHTMLElement: M,
          clearAllStyles: V,
          getMaxDurationItemIndex: x,
          getComputedStyle: U,
          getInstanceOrigin: P,
          reduceListToGroup: G,
          shouldNamespaceEventParameter: F,
          getNamespacedParameterId: k,
          shouldAllowMediaQuery: D,
          cleanupHTMLElement: B,
          clearObjectCache: X,
          stringifyTarget: W,
          mediaQueriesEqual: H,
          shallowEqual: Y,
        } = I.IX2VanillaUtils,
        {
          isPluginType: Q,
          createPluginInstance: j,
          getPluginDuration: z,
        } = I.IX2VanillaPlugins,
        $ = navigator.userAgent,
        q = $.match(/iPad/i) || $.match(/iPhone/);
      function K(e) {
        (C({ store: e, select: ({ ixRequest: e }) => e.preview, onChange: Z }),
          C({
            store: e,
            select: ({ ixRequest: e }) => e.playback,
            onChange: ee,
          }),
          C({ store: e, select: ({ ixRequest: e }) => e.stop, onChange: et }),
          C({ store: e, select: ({ ixRequest: e }) => e.clear, onChange: en }));
      }
      function Z({ rawData: e, defer: t }, n) {
        let a = () => {
          (ea({ store: n, rawData: e, allowEvents: !0 }), J());
        };
        t ? setTimeout(a, 0) : a();
      }
      function J() {
        document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
      }
      function ee(e, t) {
        let {
            actionTypeId: n,
            actionListId: a,
            actionItemId: i,
            eventId: o,
            allowEvents: r,
            immediate: l,
            testManual: c,
            verbose: d = !0,
          } = e,
          { rawData: s } = e;
        if (a && i && s && l) {
          let e = s.actionLists[a];
          e && (s = G({ actionList: e, actionItemId: i, rawData: s }));
        }
        if (
          (ea({ store: t, rawData: s, allowEvents: r, testManual: c }),
          (a && n === p.ActionTypeConsts.GENERAL_START_ACTION) || O(n))
        ) {
          (ep({ store: t, actionListId: a }),
            ef({ store: t, actionListId: a, eventId: o }));
          let e = eI({
            store: t,
            eventId: o,
            actionListId: a,
            immediate: l,
            verbose: d,
          });
          d &&
            e &&
            t.dispatch(
              (0, g.actionListPlaybackChanged)({
                actionListId: a,
                isPlaying: !l,
              }),
            );
        }
      }
      function et({ actionListId: e }, t) {
        (e ? ep({ store: t, actionListId: e }) : eu({ store: t }), ei(t));
      }
      function en(e, t) {
        (ei(t), V({ store: t, elementApi: T }));
      }
      function ea({ store: e, rawData: t, allowEvents: n, testManual: a }) {
        let { ixSession: i } = e.getState();
        if ((t && e.dispatch((0, g.rawDataImported)(t)), !i.active)) {
          (e.dispatch(
            (0, g.sessionInitialized)({
              hasBoundaryNodes: !!document.querySelector(L),
              reducedMotion:
                document.body.hasAttribute("data-wf-ix-vacation") &&
                window.matchMedia("(prefers-reduced-motion)").matches,
            }),
          ),
          n) &&
            ((function (e) {
              let { ixData: t } = e.getState(),
                { eventTypeMap: n } = t;
              (el(e),
                (0, f.default)(n, (t, n) => {
                  let a = E.default[n];
                  if (!a)
                    return void console.warn(
                      `IX2 event type not configured: ${n}`,
                    );
                  !(function ({ logic: e, store: t, events: n }) {
                    !(function (e) {
                      if (!q) return;
                      let t = {},
                        n = "";
                      for (let a in e) {
                        let { eventTypeId: i, target: o } = e[a],
                          r = T.getQuerySelector(o);
                        t[r] ||
                          ((i === p.EventTypeConsts.MOUSE_CLICK ||
                            i === p.EventTypeConsts.MOUSE_SECOND_CLICK) &&
                            ((t[r] = !0),
                            (n +=
                              r +
                              "{cursor: pointer;touch-action: manipulation;}")));
                      }
                      if (n) {
                        let e = document.createElement("style");
                        ((e.textContent = n), document.body.appendChild(e));
                      }
                    })(n);
                    let { types: a, handler: i } = e,
                      { ixData: c } = t.getState(),
                      { actionLists: d } = c,
                      s = ec(n, es);
                    if (!(0, l.default)(s)) return;
                    (0, f.default)(s, (e, a) => {
                      let i = n[a],
                        {
                          action: l,
                          id: s,
                          mediaQueries: f = c.mediaQueryKeys,
                        } = i,
                        { actionListId: u } = l.config;
                      (H(f, c.mediaQueryKeys) ||
                        t.dispatch((0, g.mediaQueriesDefined)()),
                        l.actionTypeId ===
                          p.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION &&
                          (Array.isArray(i.config)
                            ? i.config
                            : [i.config]
                          ).forEach((n) => {
                            let { continuousParameterGroupId: a } = n,
                              i = (0, r.default)(
                                d,
                                `${u}.continuousParameterGroups`,
                                [],
                              ),
                              l = (0, o.default)(i, ({ id: e }) => e === a),
                              c = (n.smoothing || 0) / 100,
                              f = (n.restingState || 0) / 100;
                            l &&
                              e.forEach((e, a) => {
                                !(function ({
                                  store: e,
                                  eventStateKey: t,
                                  eventTarget: n,
                                  eventId: a,
                                  eventConfig: i,
                                  actionListId: o,
                                  parameterGroup: l,
                                  smoothing: c,
                                  restingValue: d,
                                }) {
                                  let { ixData: s, ixSession: f } =
                                      e.getState(),
                                    { events: u } = s,
                                    I = u[a],
                                    { eventTypeId: g } = I,
                                    E = {},
                                    y = {},
                                    m = [],
                                    { continuousActionGroups: b } = l,
                                    { id: O } = l;
                                  F(g, i) && (O = k(t, O));
                                  let R =
                                    f.hasBoundaryNodes && n
                                      ? T.getClosestElement(n, L)
                                      : null;
                                  (b.forEach((e) => {
                                    let { keyframe: t, actionItems: a } = e;
                                    a.forEach((e) => {
                                      let { actionTypeId: a } = e,
                                        { target: i } = e.config;
                                      if (!i) return;
                                      let o = i.boundaryMode ? R : null,
                                        r = W(i) + v + a;
                                      if (
                                        ((y[r] = (function (e = [], t, n) {
                                          let a,
                                            i = [...e];
                                          return (
                                            i.some(
                                              (e, n) =>
                                                e.keyframe === t &&
                                                ((a = n), !0),
                                            ),
                                            null == a &&
                                              ((a = i.length),
                                              i.push({
                                                keyframe: t,
                                                actionItems: [],
                                              })),
                                            i[a].actionItems.push(n),
                                            i
                                          );
                                        })(y[r], t, e)),
                                        !E[r])
                                      ) {
                                        E[r] = !0;
                                        let { config: t } = e;
                                        h({
                                          config: t,
                                          event: I,
                                          eventTarget: n,
                                          elementRoot: o,
                                          elementApi: T,
                                        }).forEach((e) => {
                                          m.push({ element: e, key: r });
                                        });
                                      }
                                    });
                                  }),
                                    m.forEach(({ element: t, key: n }) => {
                                      let i = y[n],
                                        l = (0, r.default)(
                                          i,
                                          "[0].actionItems[0]",
                                          {},
                                        ),
                                        { actionTypeId: s } = l,
                                        f = (
                                          s === p.ActionTypeConsts.PLUGIN_RIVE
                                            ? 0 ===
                                              (
                                                l.config?.target
                                                  ?.selectorGuids || []
                                              ).length
                                            : Q(s)
                                        )
                                          ? j(s)?.(t, l)
                                          : null,
                                        u = N(
                                          {
                                            element: t,
                                            actionItem: l,
                                            elementApi: T,
                                          },
                                          f,
                                        );
                                      eg({
                                        store: e,
                                        element: t,
                                        eventId: a,
                                        actionListId: o,
                                        actionItem: l,
                                        destination: u,
                                        continuous: !0,
                                        parameterId: O,
                                        actionGroups: i,
                                        smoothing: c,
                                        restingValue: d,
                                        pluginInstance: f,
                                      });
                                    }));
                                })({
                                  store: t,
                                  eventStateKey: s + v + a,
                                  eventTarget: e,
                                  eventId: s,
                                  eventConfig: n,
                                  actionListId: u,
                                  parameterGroup: l,
                                  smoothing: c,
                                  restingValue: f,
                                });
                              });
                          }),
                        (l.actionTypeId ===
                          p.ActionTypeConsts.GENERAL_START_ACTION ||
                          O(l.actionTypeId)) &&
                          ef({ store: t, actionListId: u, eventId: s }));
                    });
                    let I = (e) => {
                        let { ixSession: a } = t.getState();
                        ed(s, (o, r, l) => {
                          let d = n[r],
                            s = a.eventState[l],
                            { action: f, mediaQueries: u = c.mediaQueryKeys } =
                              d;
                          if (!D(u, a.mediaQueryKey)) return;
                          let I = (n = {}) => {
                            let a = i(
                              {
                                store: t,
                                element: o,
                                event: d,
                                eventConfig: n,
                                nativeEvent: e,
                                eventStateKey: l,
                              },
                              s,
                            );
                            Y(a, s) ||
                              t.dispatch((0, g.eventStateChanged)(l, a));
                          };
                          f.actionTypeId ===
                          p.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION
                            ? (Array.isArray(d.config)
                                ? d.config
                                : [d.config]
                              ).forEach(I)
                            : I();
                        });
                      },
                      E = (0, u.default)(I, 12),
                      y = ({ target: e = document, types: n, throttle: a }) => {
                        n.split(" ")
                          .filter(Boolean)
                          .forEach((n) => {
                            let i = a ? E : I;
                            (e.addEventListener(n, i),
                              t.dispatch((0, g.eventListenerAdded)(e, [n, i])));
                          });
                      };
                    Array.isArray(a)
                      ? a.forEach(y)
                      : "string" == typeof a && y(e);
                  })({ logic: a, store: e, events: t });
                }));
              let { ixSession: a } = e.getState();
              a.eventListeners.length &&
                (function (e) {
                  let t = () => {
                    el(e);
                  };
                  (er.forEach((n) => {
                    (window.addEventListener(n, t),
                      e.dispatch((0, g.eventListenerAdded)(window, [n, t])));
                  }),
                    t());
                })(e);
            })(e),
            (function () {
              let { documentElement: e } = document;
              -1 === e.className.indexOf(S) && (e.className += ` ${S}`);
            })(),
            e.getState().ixSession.hasDefinedMediaQueries &&
              C({
                store: e,
                select: ({ ixSession: e }) => e.mediaQueryKey,
                onChange: () => {
                  (ei(e),
                    V({ store: e, elementApi: T }),
                    ea({ store: e, allowEvents: !0 }),
                    J());
                },
              }));
          (e.dispatch((0, g.sessionStarted)()),
            (function (e, t) {
              let n = (a) => {
                let { ixSession: i, ixParameters: o } = e.getState();
                if (i.active)
                  if ((e.dispatch((0, g.animationFrameChanged)(a, o)), t)) {
                    let t = C({
                      store: e,
                      select: ({ ixSession: e }) => e.tick,
                      onChange: (e) => {
                        (n(e), t());
                      },
                    });
                  } else requestAnimationFrame(n);
              };
              n(window.performance.now());
            })(e, a));
        }
      }
      function ei(e) {
        let { ixSession: t } = e.getState();
        if (t.active) {
          let { eventListeners: n } = t;
          (n.forEach(eo), X(), e.dispatch((0, g.sessionStopped)()));
        }
      }
      function eo({ target: e, listenerParams: t }) {
        e.removeEventListener.apply(e, t);
      }
      let er = ["resize", "orientationchange"];
      function el(e) {
        let { ixSession: t, ixData: n } = e.getState(),
          a = window.innerWidth;
        if (a !== t.viewportWidth) {
          let { mediaQueries: t } = n;
          e.dispatch(
            (0, g.viewportWidthChanged)({ width: a, mediaQueries: t }),
          );
        }
      }
      let ec = (e, t) => (0, c.default)((0, s.default)(e, t), d.default),
        ed = (e, t) => {
          (0, f.default)(e, (e, n) => {
            e.forEach((e, a) => {
              t(e, n, n + v + a);
            });
          });
        },
        es = (e) =>
          h({
            config: { target: e.target, targets: e.targets },
            elementApi: T,
          });
      function ef({ store: e, actionListId: t, eventId: n }) {
        let { ixData: a, ixSession: i } = e.getState(),
          { actionLists: o, events: l } = a,
          c = l[n],
          d = o[t];
        if (d && d.useFirstGroupAsInitialState) {
          let o = (0, r.default)(d, "actionItemGroups[0].actionItems", []);
          if (
            !D(
              (0, r.default)(c, "mediaQueries", a.mediaQueryKeys),
              i.mediaQueryKey,
            )
          )
            return;
          o.forEach((a) => {
            let { config: i, actionTypeId: o } = a,
              r = h({
                config:
                  i?.target?.useEventTarget === !0 &&
                  i?.target?.objectId == null
                    ? { target: c.target, targets: c.targets }
                    : i,
                event: c,
                elementApi: T,
              }),
              l = Q(o);
            r.forEach((i) => {
              let r = l ? j(o)?.(i, a) : null;
              eg({
                destination: N({ element: i, actionItem: a, elementApi: T }, r),
                immediate: !0,
                store: e,
                element: i,
                eventId: n,
                actionItem: a,
                actionListId: t,
                pluginInstance: r,
              });
            });
          });
        }
      }
      function eu({ store: e }) {
        let { ixInstances: t } = e.getState();
        (0, f.default)(t, (t) => {
          if (!t.continuous) {
            let { actionListId: n, verbose: a } = t;
            (eT(t, e),
              a &&
                e.dispatch(
                  (0, g.actionListPlaybackChanged)({
                    actionListId: n,
                    isPlaying: !1,
                  }),
                ));
          }
        });
      }
      function ep({
        store: e,
        eventId: t,
        eventTarget: n,
        eventStateKey: a,
        actionListId: i,
      }) {
        let { ixInstances: o, ixSession: l } = e.getState(),
          c = l.hasBoundaryNodes && n ? T.getClosestElement(n, L) : null;
        (0, f.default)(o, (n) => {
          let o = (0, r.default)(n, "actionItem.config.target.boundaryMode"),
            l = !a || n.eventStateKey === a;
          if (n.actionListId === i && n.eventId === t && l) {
            if (c && o && !T.elementContains(c, n.element)) return;
            (eT(n, e),
              n.verbose &&
                e.dispatch(
                  (0, g.actionListPlaybackChanged)({
                    actionListId: i,
                    isPlaying: !1,
                  }),
                ));
          }
        });
      }
      function eI({
        store: e,
        eventId: t,
        eventTarget: n,
        eventStateKey: a,
        actionListId: i,
        groupIndex: o = 0,
        immediate: l,
        verbose: c,
      }) {
        let { ixData: d, ixSession: s } = e.getState(),
          { events: f } = d,
          u = f[t] || {},
          { mediaQueries: p = d.mediaQueryKeys } = u,
          { actionItemGroups: I, useFirstGroupAsInitialState: g } = (0,
          r.default)(d, `actionLists.${i}`, {});
        if (!I || !I.length) return !1;
        (o >= I.length && (0, r.default)(u, "config.loop") && (o = 0),
          0 === o && g && o++);
        let E =
            (0 === o || (1 === o && g)) && O(u.action?.actionTypeId)
              ? u.config.delay
              : void 0,
          y = (0, r.default)(I, [o, "actionItems"], []);
        if (!y.length || !D(p, s.mediaQueryKey)) return !1;
        let m = s.hasBoundaryNodes && n ? T.getClosestElement(n, L) : null,
          b = x(y),
          v = !1;
        return (
          y.forEach((r, d) => {
            let { config: s, actionTypeId: f } = r,
              p = Q(f),
              { target: I } = s;
            I &&
              h({
                config: s,
                event: u,
                eventTarget: n,
                elementRoot: I.boundaryMode ? m : null,
                elementApi: T,
              }).forEach((s, u) => {
                let I = p ? j(f)?.(s, r) : null,
                  g = p ? z(f)(s, r) : null;
                v = !0;
                let y = U({ element: s, actionItem: r }),
                  m = N({ element: s, actionItem: r, elementApi: T }, I);
                eg({
                  store: e,
                  element: s,
                  actionItem: r,
                  eventId: t,
                  eventTarget: n,
                  eventStateKey: a,
                  actionListId: i,
                  groupIndex: o,
                  isCarrier: b === d && 0 === u,
                  computedStyle: y,
                  destination: m,
                  immediate: l,
                  verbose: c,
                  pluginInstance: I,
                  pluginDuration: g,
                  instanceDelay: E,
                });
              });
          }),
          v
        );
      }
      function eg(e) {
        let t,
          { store: n, computedStyle: a, ...i } = e,
          {
            element: o,
            actionItem: r,
            immediate: l,
            pluginInstance: c,
            continuous: d,
            restingValue: s,
            eventId: f,
          } = i,
          u = w(),
          { ixElements: I, ixSession: E, ixData: y } = n.getState(),
          m = A(I, o),
          { refState: b } = I[m] || {},
          O = T.getRefType(o),
          v = E.reducedMotion && p.ReducedMotionTypes[r.actionTypeId];
        if (v && d)
          switch (y.events[f]?.eventTypeId) {
            case p.EventTypeConsts.MOUSE_MOVE:
            case p.EventTypeConsts.MOUSE_MOVE_IN_VIEWPORT:
              t = s;
              break;
            default:
              t = 0.5;
          }
        let L = P(o, b, a, r, T, c);
        if (
          (n.dispatch(
            (0, g.instanceAdded)({
              instanceId: u,
              elementId: m,
              origin: L,
              refType: O,
              skipMotion: v,
              skipToValue: t,
              ...i,
            }),
          ),
          eE(document.body, "ix2-animation-started", u),
          l)
        )
          return void (function (e, t) {
            let { ixParameters: n } = e.getState();
            (e.dispatch((0, g.instanceStarted)(t, 0)),
              e.dispatch((0, g.animationFrameChanged)(performance.now(), n)));
            let { ixInstances: a } = e.getState();
            ey(a[t], e);
          })(n, u);
        (C({ store: n, select: ({ ixInstances: e }) => e[u], onChange: ey }),
          d || n.dispatch((0, g.instanceStarted)(u, E.tick)));
      }
      function eT(e, t) {
        eE(document.body, "ix2-animation-stopping", {
          instanceId: e.id,
          state: t.getState(),
        });
        let { elementId: n, actionItem: a } = e,
          { ixElements: i } = t.getState(),
          { ref: o, refType: r } = i[n] || {};
        (r === R && B(o, a, T), t.dispatch((0, g.instanceRemoved)(e.id)));
      }
      function eE(e, t, n) {
        let a = document.createEvent("CustomEvent");
        (a.initCustomEvent(t, !0, !0, n), e.dispatchEvent(a));
      }
      function ey(e, t) {
        let {
            active: n,
            continuous: a,
            complete: i,
            elementId: o,
            actionItem: r,
            actionTypeId: l,
            renderType: c,
            current: d,
            groupIndex: s,
            eventId: f,
            eventTarget: u,
            eventStateKey: p,
            actionListId: I,
            isCarrier: E,
            styleProp: y,
            verbose: m,
            pluginInstance: b,
          } = e,
          { ixData: O, ixSession: v } = t.getState(),
          { events: L } = O,
          { mediaQueries: S = O.mediaQueryKeys } = L && L[f] ? L[f] : {};
        if (D(S, v.mediaQueryKey) && (a || n || i)) {
          if (d || (c === _ && i)) {
            t.dispatch((0, g.elementStateChanged)(o, l, d, r));
            let { ixElements: e } = t.getState(),
              { ref: n, refType: a, refState: i } = e[o] || {},
              s = i && i[l];
            (a === R || Q(l)) && M(n, i, s, f, r, y, T, c, b);
          }
          if (i) {
            if (E) {
              let e = eI({
                store: t,
                eventId: f,
                eventTarget: u,
                eventStateKey: p,
                actionListId: I,
                groupIndex: s + 1,
                verbose: m,
              });
              m &&
                !e &&
                t.dispatch(
                  (0, g.actionListPlaybackChanged)({
                    actionListId: I,
                    isPlaying: !1,
                  }),
                );
            }
            eT(e, t);
          }
        }
      }
    },
    8955: function (e, t, n) {
      "use strict";
      let a;
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "default", {
          enumerable: !0,
          get: function () {
            return ep;
          },
        }));
      let i = f(n(5801)),
        o = f(n(4738)),
        r = f(n(3789)),
        l = n(7087),
        c = n(1970),
        d = n(3946),
        s = n(9468);
      function f(e) {
        return e && e.__esModule ? e : { default: e };
      }
      let {
          MOUSE_CLICK: u,
          MOUSE_SECOND_CLICK: p,
          MOUSE_DOWN: I,
          MOUSE_UP: g,
          MOUSE_OVER: T,
          MOUSE_OUT: E,
          DROPDOWN_CLOSE: y,
          DROPDOWN_OPEN: m,
          SLIDER_ACTIVE: b,
          SLIDER_INACTIVE: O,
          TAB_ACTIVE: v,
          TAB_INACTIVE: L,
          NAVBAR_CLOSE: R,
          NAVBAR_OPEN: _,
          MOUSE_MOVE: S,
          PAGE_SCROLL_DOWN: h,
          SCROLL_INTO_VIEW: A,
          SCROLL_OUT_OF_VIEW: N,
          PAGE_SCROLL_UP: C,
          SCROLLING_IN_VIEW: w,
          PAGE_FINISH: M,
          ECOMMERCE_CART_CLOSE: V,
          ECOMMERCE_CART_OPEN: x,
          PAGE_START: U,
          PAGE_SCROLL: P,
        } = l.EventTypeConsts,
        G = "COMPONENT_ACTIVE",
        F = "COMPONENT_INACTIVE",
        { COLON_DELIMITER: k } = l.IX2EngineConstants,
        { getNamespacedParameterId: D } = s.IX2VanillaUtils,
        B = (e) => (t) => !!("object" == typeof t && e(t)) || t,
        X = B(({ element: e, nativeEvent: t }) => e === t.target),
        W = B(({ element: e, nativeEvent: t }) => e.contains(t.target)),
        H = (0, i.default)([X, W]),
        Y = (e, t) => {
          if (t) {
            let { ixData: n } = e.getState(),
              { events: a } = n,
              i = a[t];
            if (i && !ee[i.eventTypeId]) return i;
          }
          return null;
        },
        Q = ({ store: e, event: t }) => {
          let { action: n } = t,
            { autoStopEventId: a } = n.config;
          return !!Y(e, a);
        },
        j = ({ store: e, event: t, element: n, eventStateKey: a }, i) => {
          let { action: r, id: l } = t,
            { actionListId: d, autoStopEventId: s } = r.config,
            f = Y(e, s);
          return (
            f &&
              (0, c.stopActionGroup)({
                store: e,
                eventId: s,
                eventTarget: n,
                eventStateKey: s + k + a.split(k)[1],
                actionListId: (0, o.default)(f, "action.config.actionListId"),
              }),
            (0, c.stopActionGroup)({
              store: e,
              eventId: l,
              eventTarget: n,
              eventStateKey: a,
              actionListId: d,
            }),
            (0, c.startActionGroup)({
              store: e,
              eventId: l,
              eventTarget: n,
              eventStateKey: a,
              actionListId: d,
            }),
            i
          );
        },
        z = (e, t) => (n, a) => (!0 === e(n, a) ? t(n, a) : a),
        $ = { handler: z(H, j) },
        q = { ...$, types: [G, F].join(" ") },
        K = [
          { target: window, types: "resize orientationchange", throttle: !0 },
          {
            target: document,
            types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
            throttle: !0,
          },
        ],
        Z = "mouseover mouseout",
        J = { types: K },
        ee = { PAGE_START: U, PAGE_FINISH: M },
        et = (() => {
          let e = void 0 !== window.pageXOffset,
            t =
              "CSS1Compat" === document.compatMode
                ? document.documentElement
                : document.body;
          return () => ({
            scrollLeft: e ? window.pageXOffset : t.scrollLeft,
            scrollTop: e ? window.pageYOffset : t.scrollTop,
            stiffScrollTop: (0, r.default)(
              e ? window.pageYOffset : t.scrollTop,
              0,
              t.scrollHeight - window.innerHeight,
            ),
            scrollWidth: t.scrollWidth,
            scrollHeight: t.scrollHeight,
            clientWidth: t.clientWidth,
            clientHeight: t.clientHeight,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
          });
        })(),
        en = (e, t) =>
          !(
            e.left > t.right ||
            e.right < t.left ||
            e.top > t.bottom ||
            e.bottom < t.top
          ),
        ea = ({ element: e, nativeEvent: t }) => {
          let { type: n, target: a, relatedTarget: i } = t,
            o = e.contains(a);
          if ("mouseover" === n && o) return !0;
          let r = e.contains(i);
          return "mouseout" === n && !!o && !!r;
        },
        ei = (e) => {
          let {
              element: t,
              event: { config: n },
            } = e,
            { clientWidth: a, clientHeight: i } = et(),
            o = n.scrollOffsetValue,
            r = "PX" === n.scrollOffsetUnit ? o : (i * (o || 0)) / 100;
          return en(t.getBoundingClientRect(), {
            left: 0,
            top: r,
            right: a,
            bottom: i - r,
          });
        },
        eo = (e) => (t, n) => {
          let { type: a } = t.nativeEvent,
            i = -1 !== [G, F].indexOf(a) ? a === G : n.isActive,
            o = { ...n, isActive: i };
          return ((!n || o.isActive !== n.isActive) && e(t, o)) || o;
        },
        er = (e) => (t, n) => {
          let a = { elementHovered: ea(t) };
          return (
            ((n ? a.elementHovered !== n.elementHovered : a.elementHovered) &&
              e(t, a)) ||
            a
          );
        },
        el =
          (e) =>
          (t, n = {}) => {
            let a,
              i,
              { stiffScrollTop: o, scrollHeight: r, innerHeight: l } = et(),
              {
                event: { config: c, eventTypeId: d },
              } = t,
              { scrollOffsetValue: s, scrollOffsetUnit: f } = c,
              u = r - l,
              p = Number((o / u).toFixed(2));
            if (n && n.percentTop === p) return n;
            let I = ("PX" === f ? s : (l * (s || 0)) / 100) / u,
              g = 0;
            n &&
              ((a = p > n.percentTop),
              (g = (i = n.scrollingDown !== a) ? p : n.anchorTop));
            let T = d === h ? p >= g + I : p <= g - I,
              E = {
                ...n,
                percentTop: p,
                inBounds: T,
                anchorTop: g,
                scrollingDown: a,
              };
            return (n && T && (i || E.inBounds !== n.inBounds) && e(t, E)) || E;
          },
        ec = (e, t) =>
          e.left > t.left &&
          e.left < t.right &&
          e.top > t.top &&
          e.top < t.bottom,
        ed =
          (e) =>
          (t, n = { clickCount: 0 }) => {
            let a = { clickCount: (n.clickCount % 2) + 1 };
            return (a.clickCount !== n.clickCount && e(t, a)) || a;
          },
        es = (e = !0) => ({
          ...q,
          handler: z(
            e ? H : X,
            eo((e, t) => (t.isActive ? $.handler(e, t) : t)),
          ),
        }),
        ef = (e = !0) => ({
          ...q,
          handler: z(
            e ? H : X,
            eo((e, t) => (t.isActive ? t : $.handler(e, t))),
          ),
        }),
        eu = {
          ...J,
          handler:
            ((a = (e, t) => {
              let { elementVisible: n } = t,
                { event: a, store: i } = e,
                { ixData: o } = i.getState(),
                { events: r } = o;
              return !r[a.action.config.autoStopEventId] && t.triggered
                ? t
                : (a.eventTypeId === A) === n
                  ? (j(e), { ...t, triggered: !0 })
                  : t;
            }),
            (e, t) => {
              let n = { ...t, elementVisible: ei(e) };
              return (
                ((t
                  ? n.elementVisible !== t.elementVisible
                  : n.elementVisible) &&
                  a(e, n)) ||
                n
              );
            }),
        },
        ep = {
          [b]: es(),
          [O]: ef(),
          [m]: es(),
          [y]: ef(),
          [_]: es(!1),
          [R]: ef(!1),
          [v]: es(),
          [L]: ef(),
          [x]: { types: "ecommerce-cart-open", handler: z(H, j) },
          [V]: { types: "ecommerce-cart-close", handler: z(H, j) },
          [u]: {
            types: "click",
            handler: z(
              H,
              ed((e, { clickCount: t }) => {
                Q(e) ? 1 === t && j(e) : j(e);
              }),
            ),
          },
          [p]: {
            types: "click",
            handler: z(
              H,
              ed((e, { clickCount: t }) => {
                2 === t && j(e);
              }),
            ),
          },
          [I]: { ...$, types: "mousedown" },
          [g]: { ...$, types: "mouseup" },
          [T]: {
            types: Z,
            handler: z(
              H,
              er((e, t) => {
                t.elementHovered && j(e);
              }),
            ),
          },
          [E]: {
            types: Z,
            handler: z(
              H,
              er((e, t) => {
                t.elementHovered || j(e);
              }),
            ),
          },
          [S]: {
            types: "mousemove mouseout scroll",
            handler: (
              {
                store: e,
                element: t,
                eventConfig: n,
                nativeEvent: a,
                eventStateKey: i,
              },
              o = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 },
            ) => {
              let {
                  basedOn: r,
                  selectedAxis: c,
                  continuousParameterGroupId: s,
                  reverse: f,
                  restingState: u = 0,
                } = n,
                {
                  clientX: p = o.clientX,
                  clientY: I = o.clientY,
                  pageX: g = o.pageX,
                  pageY: T = o.pageY,
                } = a,
                E = "X_AXIS" === c,
                y = "mouseout" === a.type,
                m = u / 100,
                b = s,
                O = !1;
              switch (r) {
                case l.EventBasedOn.VIEWPORT:
                  m = E
                    ? Math.min(p, window.innerWidth) / window.innerWidth
                    : Math.min(I, window.innerHeight) / window.innerHeight;
                  break;
                case l.EventBasedOn.PAGE: {
                  let {
                    scrollLeft: e,
                    scrollTop: t,
                    scrollWidth: n,
                    scrollHeight: a,
                  } = et();
                  m = E ? Math.min(e + g, n) / n : Math.min(t + T, a) / a;
                  break;
                }
                case l.EventBasedOn.ELEMENT:
                default: {
                  b = D(i, s);
                  let e = 0 === a.type.indexOf("mouse");
                  if (e && !0 !== H({ element: t, nativeEvent: a })) break;
                  let n = t.getBoundingClientRect(),
                    { left: o, top: r, width: l, height: c } = n;
                  if (!e && !ec({ left: p, top: I }, n)) break;
                  ((O = !0), (m = E ? (p - o) / l : (I - r) / c));
                }
              }
              return (
                y && (m > 0.95 || m < 0.05) && (m = Math.round(m)),
                (r !== l.EventBasedOn.ELEMENT || O || O !== o.elementHovered) &&
                  ((m = f ? 1 - m : m),
                  e.dispatch((0, d.parameterChanged)(b, m))),
                {
                  elementHovered: O,
                  clientX: p,
                  clientY: I,
                  pageX: g,
                  pageY: T,
                }
              );
            },
          },
          [P]: {
            types: K,
            handler: ({ store: e, eventConfig: t }) => {
              let { continuousParameterGroupId: n, reverse: a } = t,
                { scrollTop: i, scrollHeight: o, clientHeight: r } = et(),
                l = i / (o - r);
              ((l = a ? 1 - l : l), e.dispatch((0, d.parameterChanged)(n, l)));
            },
          },
          [w]: {
            types: K,
            handler: (
              { element: e, store: t, eventConfig: n, eventStateKey: a },
              i = { scrollPercent: 0 },
            ) => {
              let {
                  scrollLeft: o,
                  scrollTop: r,
                  scrollWidth: c,
                  scrollHeight: s,
                  clientHeight: f,
                } = et(),
                {
                  basedOn: u,
                  selectedAxis: p,
                  continuousParameterGroupId: I,
                  startsEntering: g,
                  startsExiting: T,
                  addEndOffset: E,
                  addStartOffset: y,
                  addOffsetValue: m = 0,
                  endOffsetValue: b = 0,
                } = n;
              if (u === l.EventBasedOn.VIEWPORT) {
                let e = "X_AXIS" === p ? o / c : r / s;
                return (
                  e !== i.scrollPercent &&
                    t.dispatch((0, d.parameterChanged)(I, e)),
                  { scrollPercent: e }
                );
              }
              {
                let n = D(a, I),
                  o = e.getBoundingClientRect(),
                  r = (y ? m : 0) / 100,
                  l = (E ? b : 0) / 100;
                ((r = g ? r : 1 - r), (l = T ? l : 1 - l));
                let c = o.top + Math.min(o.height * r, f),
                  u = Math.min(f + (o.top + o.height * l - c), s),
                  p = Math.min(Math.max(0, f - c), u) / u;
                return (
                  p !== i.scrollPercent &&
                    t.dispatch((0, d.parameterChanged)(n, p)),
                  { scrollPercent: p }
                );
              }
            },
          },
          [A]: eu,
          [N]: eu,
          [h]: {
            ...J,
            handler: el((e, t) => {
              t.scrollingDown && j(e);
            }),
          },
          [C]: {
            ...J,
            handler: el((e, t) => {
              t.scrollingDown || j(e);
            }),
          },
          [M]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: z(X, (e, t) => {
              let n = { finished: "complete" === document.readyState };
              return (n.finished && !(t && t.finshed) && j(e), n);
            }),
          },
          [U]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: z(X, (e, t) => (t || j(e), { started: !0 })),
          },
        };
    },
    4609: function (e, t, n) {
      "use strict";
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ixData", {
          enumerable: !0,
          get: function () {
            return i;
          },
        }));
      let { IX2_RAW_DATA_IMPORTED: a } = n(7087).IX2EngineActionTypes,
        i = (e = Object.freeze({}), t) =>
          t.type === a ? t.payload.ixData || Object.freeze({}) : e;
    },
    7718: function (e, t, n) {
      "use strict";
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ixInstances", {
          enumerable: !0,
          get: function () {
            return O;
          },
        }));
      let a = n(7087),
        i = n(9468),
        o = n(1185),
        {
          IX2_RAW_DATA_IMPORTED: r,
          IX2_SESSION_STOPPED: l,
          IX2_INSTANCE_ADDED: c,
          IX2_INSTANCE_STARTED: d,
          IX2_INSTANCE_REMOVED: s,
          IX2_ANIMATION_FRAME_CHANGED: f,
        } = a.IX2EngineActionTypes,
        {
          optimizeFloat: u,
          applyEasing: p,
          createBezierEasing: I,
        } = i.IX2EasingUtils,
        { RENDER_GENERAL: g } = a.IX2EngineConstants,
        {
          getItemConfigByKey: T,
          getRenderType: E,
          getStyleProp: y,
        } = i.IX2VanillaUtils,
        m = (e, t) => {
          let n,
            a,
            i,
            r,
            {
              position: l,
              parameterId: c,
              actionGroups: d,
              destinationKeys: s,
              smoothing: f,
              restingValue: I,
              actionTypeId: g,
              customEasingFn: E,
              skipMotion: y,
              skipToValue: m,
            } = e,
            { parameters: b } = t.payload,
            O = Math.max(1 - f, 0.01),
            v = b[c];
          null == v && ((O = 1), (v = I));
          let L = u((Math.max(v, 0) || 0) - l),
            R = y ? m : u(l + L * O),
            _ = 100 * R;
          if (R === l && e.current) return e;
          for (let e = 0, { length: t } = d; e < t; e++) {
            let { keyframe: t, actionItems: o } = d[e];
            if ((0 === e && (n = o[0]), _ >= t)) {
              n = o[0];
              let l = d[e + 1],
                c = l && _ !== t;
              ((a = c ? l.actionItems[0] : null),
                c && ((i = t / 100), (r = (l.keyframe - t) / 100)));
            }
          }
          let S = {};
          if (n && !a)
            for (let e = 0, { length: t } = s; e < t; e++) {
              let t = s[e];
              S[t] = T(g, t, n.config);
            }
          else if (n && a && void 0 !== i && void 0 !== r) {
            let e = (R - i) / r,
              t = p(n.config.easing, e, E);
            for (let e = 0, { length: i } = s; e < i; e++) {
              let i = s[e],
                o = T(g, i, n.config),
                r = (T(g, i, a.config) - o) * t + o;
              S[i] = r;
            }
          }
          return (0, o.merge)(e, { position: R, current: S });
        },
        b = (e, t) => {
          let {
              active: n,
              origin: a,
              start: i,
              immediate: r,
              renderType: l,
              verbose: c,
              actionItem: d,
              destination: s,
              destinationKeys: f,
              pluginDuration: I,
              instanceDelay: T,
              customEasingFn: E,
              skipMotion: y,
            } = e,
            m = d.config.easing,
            { duration: b, delay: O } = d.config;
          (null != I && (b = I),
            (O = null != T ? T : O),
            l === g ? (b = 0) : (r || y) && (b = O = 0));
          let { now: v } = t.payload;
          if (n && a) {
            let t = v - (i + O);
            if (c) {
              let t = b + O,
                n = u(Math.min(Math.max(0, (v - i) / t), 1));
              e = (0, o.set)(e, "verboseTimeElapsed", t * n);
            }
            if (t < 0) return e;
            let n = u(Math.min(Math.max(0, t / b), 1)),
              r = p(m, n, E),
              l = {},
              d = null;
            return (
              f.length &&
                (d = f.reduce((e, t) => {
                  let n = s[t],
                    i = parseFloat(a[t]) || 0,
                    o = parseFloat(n) - i;
                  return ((e[t] = o * r + i), e);
                }, {})),
              (l.current = d),
              (l.position = n),
              1 === n && ((l.active = !1), (l.complete = !0)),
              (0, o.merge)(e, l)
            );
          }
          return e;
        },
        O = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case r:
              return t.payload.ixInstances || Object.freeze({});
            case l:
              return Object.freeze({});
            case c: {
              let {
                  instanceId: n,
                  elementId: a,
                  actionItem: i,
                  eventId: r,
                  eventTarget: l,
                  eventStateKey: c,
                  actionListId: d,
                  groupIndex: s,
                  isCarrier: f,
                  origin: u,
                  destination: p,
                  immediate: g,
                  verbose: T,
                  continuous: m,
                  parameterId: b,
                  actionGroups: O,
                  smoothing: v,
                  restingValue: L,
                  pluginInstance: R,
                  pluginDuration: _,
                  instanceDelay: S,
                  skipMotion: h,
                  skipToValue: A,
                } = t.payload,
                { actionTypeId: N } = i,
                C = E(N),
                w = y(C, N),
                M = Object.keys(p).filter(
                  (e) => null != p[e] && "string" != typeof p[e],
                ),
                { easing: V } = i.config;
              return (0, o.set)(e, n, {
                id: n,
                elementId: a,
                active: !1,
                position: 0,
                start: 0,
                origin: u,
                destination: p,
                destinationKeys: M,
                immediate: g,
                verbose: T,
                current: null,
                actionItem: i,
                actionTypeId: N,
                eventId: r,
                eventTarget: l,
                eventStateKey: c,
                actionListId: d,
                groupIndex: s,
                renderType: C,
                isCarrier: f,
                styleProp: w,
                continuous: m,
                parameterId: b,
                actionGroups: O,
                smoothing: v,
                restingValue: L,
                pluginInstance: R,
                pluginDuration: _,
                instanceDelay: S,
                skipMotion: h,
                skipToValue: A,
                customEasingFn:
                  Array.isArray(V) && 4 === V.length ? I(V) : void 0,
              });
            }
            case d: {
              let { instanceId: n, time: a } = t.payload;
              return (0, o.mergeIn)(e, [n], {
                active: !0,
                complete: !1,
                start: a,
              });
            }
            case s: {
              let { instanceId: n } = t.payload;
              if (!e[n]) return e;
              let a = {},
                i = Object.keys(e),
                { length: o } = i;
              for (let t = 0; t < o; t++) {
                let o = i[t];
                o !== n && (a[o] = e[o]);
              }
              return a;
            }
            case f: {
              let n = e,
                a = Object.keys(e),
                { length: i } = a;
              for (let r = 0; r < i; r++) {
                let i = a[r],
                  l = e[i],
                  c = l.continuous ? m : b;
                n = (0, o.set)(n, i, c(l, t));
              }
              return n;
            }
            default:
              return e;
          }
        };
    },
    1540: function (e, t, n) {
      "use strict";
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ixParameters", {
          enumerable: !0,
          get: function () {
            return r;
          },
        }));
      let {
          IX2_RAW_DATA_IMPORTED: a,
          IX2_SESSION_STOPPED: i,
          IX2_PARAMETER_CHANGED: o,
        } = n(7087).IX2EngineActionTypes,
        r = (e = {}, t) => {
          switch (t.type) {
            case a:
              return t.payload.ixParameters || {};
            case i:
              return {};
            case o: {
              let { key: n, value: a } = t.payload;
              return ((e[n] = a), e);
            }
            default:
              return e;
          }
        };
    },
    7243: function (e, t, n) {
      "use strict";
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "default", {
          enumerable: !0,
          get: function () {
            return f;
          },
        }));
      let a = n(9516),
        i = n(4609),
        o = n(628),
        r = n(5862),
        l = n(9468),
        c = n(7718),
        d = n(1540),
        { ixElements: s } = l.IX2ElementsReducer,
        f = (0, a.combineReducers)({
          ixData: i.ixData,
          ixRequest: o.ixRequest,
          ixSession: r.ixSession,
          ixElements: s,
          ixInstances: c.ixInstances,
          ixParameters: d.ixParameters,
        });
    },
    628: function (e, t, n) {
      "use strict";
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ixRequest", {
          enumerable: !0,
          get: function () {
            return f;
          },
        }));
      let a = n(7087),
        i = n(1185),
        {
          IX2_PREVIEW_REQUESTED: o,
          IX2_PLAYBACK_REQUESTED: r,
          IX2_STOP_REQUESTED: l,
          IX2_CLEAR_REQUESTED: c,
        } = a.IX2EngineActionTypes,
        d = { preview: {}, playback: {}, stop: {}, clear: {} },
        s = Object.create(null, {
          [o]: { value: "preview" },
          [r]: { value: "playback" },
          [l]: { value: "stop" },
          [c]: { value: "clear" },
        }),
        f = (e = d, t) => {
          if (t.type in s) {
            let n = [s[t.type]];
            return (0, i.setIn)(e, [n], { ...t.payload });
          }
          return e;
        };
    },
    5862: function (e, t, n) {
      "use strict";
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ixSession", {
          enumerable: !0,
          get: function () {
            return T;
          },
        }));
      let a = n(7087),
        i = n(1185),
        {
          IX2_SESSION_INITIALIZED: o,
          IX2_SESSION_STARTED: r,
          IX2_TEST_FRAME_RENDERED: l,
          IX2_SESSION_STOPPED: c,
          IX2_EVENT_LISTENER_ADDED: d,
          IX2_EVENT_STATE_CHANGED: s,
          IX2_ANIMATION_FRAME_CHANGED: f,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: u,
          IX2_VIEWPORT_WIDTH_CHANGED: p,
          IX2_MEDIA_QUERIES_DEFINED: I,
        } = a.IX2EngineActionTypes,
        g = {
          active: !1,
          tick: 0,
          eventListeners: [],
          eventState: {},
          playbackState: {},
          viewportWidth: 0,
          mediaQueryKey: null,
          hasBoundaryNodes: !1,
          hasDefinedMediaQueries: !1,
          reducedMotion: !1,
        },
        T = (e = g, t) => {
          switch (t.type) {
            case o: {
              let { hasBoundaryNodes: n, reducedMotion: a } = t.payload;
              return (0, i.merge)(e, { hasBoundaryNodes: n, reducedMotion: a });
            }
            case r:
              return (0, i.set)(e, "active", !0);
            case l: {
              let {
                payload: { step: n = 20 },
              } = t;
              return (0, i.set)(e, "tick", e.tick + n);
            }
            case c:
              return g;
            case f: {
              let {
                payload: { now: n },
              } = t;
              return (0, i.set)(e, "tick", n);
            }
            case d: {
              let n = (0, i.addLast)(e.eventListeners, t.payload);
              return (0, i.set)(e, "eventListeners", n);
            }
            case s: {
              let { stateKey: n, newState: a } = t.payload;
              return (0, i.setIn)(e, ["eventState", n], a);
            }
            case u: {
              let { actionListId: n, isPlaying: a } = t.payload;
              return (0, i.setIn)(e, ["playbackState", n], a);
            }
            case p: {
              let { width: n, mediaQueries: a } = t.payload,
                o = a.length,
                r = null;
              for (let e = 0; e < o; e++) {
                let { key: t, min: i, max: o } = a[e];
                if (n >= i && n <= o) {
                  r = t;
                  break;
                }
              }
              return (0, i.merge)(e, { viewportWidth: n, mediaQueryKey: r });
            }
            case I:
              return (0, i.set)(e, "hasDefinedMediaQueries", !0);
            default:
              return e;
          }
        };
    },
    7377: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        clearPlugin: function () {
          return s;
        },
        createPluginInstance: function () {
          return c;
        },
        getPluginConfig: function () {
          return i;
        },
        getPluginDestination: function () {
          return l;
        },
        getPluginDuration: function () {
          return o;
        },
        getPluginOrigin: function () {
          return r;
        },
        renderPlugin: function () {
          return d;
        },
      };
      for (var a in n)
        Object.defineProperty(t, a, { enumerable: !0, get: n[a] });
      let i = (e) => e.value,
        o = (e, t) => {
          if ("auto" !== t.config.duration) return null;
          let n = parseFloat(e.getAttribute("data-duration"));
          return n > 0
            ? 1e3 * n
            : 1e3 * parseFloat(e.getAttribute("data-default-duration"));
        },
        r = (e) => e || { value: 0 },
        l = (e) => ({ value: e.value }),
        c = (e) => {
          let t = window.Webflow.require("lottie");
          if (!t) return null;
          let n = t.createInstance(e);
          return (n.stop(), n.setSubframe(!0), n);
        },
        d = (e, t, n) => {
          if (!e) return;
          let a = t[n.actionTypeId].value / 100;
          e.goToFrame(e.frames * a);
        },
        s = (e) => {
          let t = window.Webflow.require("lottie");
          t && t.createInstance(e).stop();
        };
    },
    2570: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        clearPlugin: function () {
          return I;
        },
        createPluginInstance: function () {
          return u;
        },
        getPluginConfig: function () {
          return c;
        },
        getPluginDestination: function () {
          return f;
        },
        getPluginDuration: function () {
          return d;
        },
        getPluginOrigin: function () {
          return s;
        },
        renderPlugin: function () {
          return p;
        },
      };
      for (var a in n)
        Object.defineProperty(t, a, { enumerable: !0, get: n[a] });
      let i = "--wf-rive-fit",
        o = "--wf-rive-alignment",
        r = (e) => document.querySelector(`[data-w-id="${e}"]`),
        l = () => window.Webflow.require("rive"),
        c = (e, t) => e.value.inputs[t],
        d = () => null,
        s = (e, t) => {
          if (e) return e;
          let n = {},
            { inputs: a = {} } = t.config.value;
          for (let e in a) null == a[e] && (n[e] = 0);
          return n;
        },
        f = (e) => e.value.inputs ?? {},
        u = (e, t) => {
          if ((t.config?.target?.selectorGuids || []).length > 0) return e;
          let n = t?.config?.target?.pluginElement;
          return n ? r(n) : null;
        },
        p = (e, { PLUGIN_RIVE: t }, n) => {
          let a = l();
          if (!a) return;
          let r = a.getInstance(e),
            c = a.rive.StateMachineInputType,
            { name: d, inputs: s = {} } = n.config.value || {};
          function f(e) {
            if (e.loaded) n();
            else {
              let t = () => {
                (n(), e?.off("load", t));
              };
              e?.on("load", t);
            }
            function n() {
              let n = e.stateMachineInputs(d);
              if (null != n) {
                if ((e.isPlaying || e.play(d, !1), i in s || o in s)) {
                  let t = e.layout,
                    n = s[i] ?? t.fit,
                    a = s[o] ?? t.alignment;
                  (n !== t.fit || a !== t.alignment) &&
                    (e.layout = t.copyWith({ fit: n, alignment: a }));
                }
                for (let e in s) {
                  if (e === i || e === o) continue;
                  let a = n.find((t) => t.name === e);
                  if (null != a)
                    switch (a.type) {
                      case c.Boolean:
                        null != s[e] && (a.value = !!s[e]);
                        break;
                      case c.Number: {
                        let n = t[e];
                        null != n && (a.value = n);
                        break;
                      }
                      case c.Trigger:
                        s[e] && a.fire();
                    }
                }
              }
            }
          }
          r?.rive ? f(r.rive) : a.setLoadHandler(e, f);
        },
        I = (e, t) => null;
    },
    2866: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        clearPlugin: function () {
          return I;
        },
        createPluginInstance: function () {
          return u;
        },
        getPluginConfig: function () {
          return l;
        },
        getPluginDestination: function () {
          return f;
        },
        getPluginDuration: function () {
          return c;
        },
        getPluginOrigin: function () {
          return s;
        },
        renderPlugin: function () {
          return p;
        },
      };
      for (var a in n)
        Object.defineProperty(t, a, { enumerable: !0, get: n[a] });
      let i = (e) => document.querySelector(`[data-w-id="${e}"]`),
        o = () => window.Webflow.require("spline"),
        r = (e, t) => e.filter((e) => !t.includes(e)),
        l = (e, t) => e.value[t],
        c = () => null,
        d = Object.freeze({
          positionX: 0,
          positionY: 0,
          positionZ: 0,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          scaleX: 1,
          scaleY: 1,
          scaleZ: 1,
        }),
        s = (e, t) => {
          let n = Object.keys(t.config.value);
          if (e) {
            let t = r(n, Object.keys(e));
            return t.length ? t.reduce((e, t) => ((e[t] = d[t]), e), e) : e;
          }
          return n.reduce((e, t) => ((e[t] = d[t]), e), {});
        },
        f = (e) => e.value,
        u = (e, t) => {
          let n = t?.config?.target?.pluginElement;
          return n ? i(n) : null;
        },
        p = (e, t, n) => {
          let a = o();
          if (!a) return;
          let i = a.getInstance(e),
            r = n.config.target.objectId,
            l = (e) => {
              if (!e) throw Error("Invalid spline app passed to renderSpline");
              let n = r && e.findObjectById(r);
              if (!n) return;
              let { PLUGIN_SPLINE: a } = t;
              (null != a.positionX && (n.position.x = a.positionX),
                null != a.positionY && (n.position.y = a.positionY),
                null != a.positionZ && (n.position.z = a.positionZ),
                null != a.rotationX && (n.rotation.x = a.rotationX),
                null != a.rotationY && (n.rotation.y = a.rotationY),
                null != a.rotationZ && (n.rotation.z = a.rotationZ),
                null != a.scaleX && (n.scale.x = a.scaleX),
                null != a.scaleY && (n.scale.y = a.scaleY),
                null != a.scaleZ && (n.scale.z = a.scaleZ));
            };
          i ? l(i.spline) : a.setLoadHandler(e, l);
        },
        I = () => null;
    },
    1407: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        clearPlugin: function () {
          return p;
        },
        createPluginInstance: function () {
          return s;
        },
        getPluginConfig: function () {
          return r;
        },
        getPluginDestination: function () {
          return d;
        },
        getPluginDuration: function () {
          return l;
        },
        getPluginOrigin: function () {
          return c;
        },
        renderPlugin: function () {
          return u;
        },
      };
      for (var i in a)
        Object.defineProperty(t, i, { enumerable: !0, get: a[i] });
      let o = n(380),
        r = (e, t) => e.value[t],
        l = () => null,
        c = (e, t) => {
          if (e) return e;
          let n = t.config.value,
            a = t.config.target.objectId,
            i = getComputedStyle(document.documentElement).getPropertyValue(a);
          return null != n.size
            ? { size: parseInt(i, 10) }
            : "%" === n.unit || "-" === n.unit
              ? { size: parseFloat(i) }
              : null != n.red && null != n.green && null != n.blue
                ? (0, o.normalizeColor)(i)
                : void 0;
        },
        d = (e) => e.value,
        s = () => null,
        f = {
          color: {
            match: ({ red: e, green: t, blue: n, alpha: a }) =>
              [e, t, n, a].every((e) => null != e),
            getValue: ({ red: e, green: t, blue: n, alpha: a }) =>
              `rgba(${e}, ${t}, ${n}, ${a})`,
          },
          size: {
            match: ({ size: e }) => null != e,
            getValue: ({ size: e }, t) => ("-" === t ? e : `${e}${t}`),
          },
        },
        u = (e, t, n) => {
          let {
              target: { objectId: a },
              value: { unit: i },
            } = n.config,
            o = t.PLUGIN_VARIABLE,
            r = Object.values(f).find((e) => e.match(o, i));
          r && document.documentElement.style.setProperty(a, r.getValue(o, i));
        },
        p = (e, t) => {
          let n = t.config.target.objectId;
          document.documentElement.style.removeProperty(n);
        };
    },
    3690: function (e, t, n) {
      "use strict";
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "pluginMethodMap", {
          enumerable: !0,
          get: function () {
            return s;
          },
        }));
      let a = n(7087),
        i = d(n(7377)),
        o = d(n(2866)),
        r = d(n(2570)),
        l = d(n(1407));
      function c(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap(),
          n = new WeakMap();
        return (c = function (e) {
          return e ? n : t;
        })(e);
      }
      function d(e, t) {
        if (!t && e && e.__esModule) return e;
        if (null === e || ("object" != typeof e && "function" != typeof e))
          return { default: e };
        var n = c(t);
        if (n && n.has(e)) return n.get(e);
        var a = { __proto__: null },
          i = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var o in e)
          if ("default" !== o && Object.prototype.hasOwnProperty.call(e, o)) {
            var r = i ? Object.getOwnPropertyDescriptor(e, o) : null;
            r && (r.get || r.set)
              ? Object.defineProperty(a, o, r)
              : (a[o] = e[o]);
          }
        return ((a.default = e), n && n.set(e, a), a);
      }
      let s = new Map([
        [a.ActionTypeConsts.PLUGIN_LOTTIE, { ...i }],
        [a.ActionTypeConsts.PLUGIN_SPLINE, { ...o }],
        [a.ActionTypeConsts.PLUGIN_RIVE, { ...r }],
        [a.ActionTypeConsts.PLUGIN_VARIABLE, { ...l }],
      ]);
    },
    8023: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        IX2_ACTION_LIST_PLAYBACK_CHANGED: function () {
          return b;
        },
        IX2_ANIMATION_FRAME_CHANGED: function () {
          return I;
        },
        IX2_CLEAR_REQUESTED: function () {
          return f;
        },
        IX2_ELEMENT_STATE_CHANGED: function () {
          return m;
        },
        IX2_EVENT_LISTENER_ADDED: function () {
          return u;
        },
        IX2_EVENT_STATE_CHANGED: function () {
          return p;
        },
        IX2_INSTANCE_ADDED: function () {
          return T;
        },
        IX2_INSTANCE_REMOVED: function () {
          return y;
        },
        IX2_INSTANCE_STARTED: function () {
          return E;
        },
        IX2_MEDIA_QUERIES_DEFINED: function () {
          return v;
        },
        IX2_PARAMETER_CHANGED: function () {
          return g;
        },
        IX2_PLAYBACK_REQUESTED: function () {
          return d;
        },
        IX2_PREVIEW_REQUESTED: function () {
          return c;
        },
        IX2_RAW_DATA_IMPORTED: function () {
          return i;
        },
        IX2_SESSION_INITIALIZED: function () {
          return o;
        },
        IX2_SESSION_STARTED: function () {
          return r;
        },
        IX2_SESSION_STOPPED: function () {
          return l;
        },
        IX2_STOP_REQUESTED: function () {
          return s;
        },
        IX2_TEST_FRAME_RENDERED: function () {
          return L;
        },
        IX2_VIEWPORT_WIDTH_CHANGED: function () {
          return O;
        },
      };
      for (var a in n)
        Object.defineProperty(t, a, { enumerable: !0, get: n[a] });
      let i = "IX2_RAW_DATA_IMPORTED",
        o = "IX2_SESSION_INITIALIZED",
        r = "IX2_SESSION_STARTED",
        l = "IX2_SESSION_STOPPED",
        c = "IX2_PREVIEW_REQUESTED",
        d = "IX2_PLAYBACK_REQUESTED",
        s = "IX2_STOP_REQUESTED",
        f = "IX2_CLEAR_REQUESTED",
        u = "IX2_EVENT_LISTENER_ADDED",
        p = "IX2_EVENT_STATE_CHANGED",
        I = "IX2_ANIMATION_FRAME_CHANGED",
        g = "IX2_PARAMETER_CHANGED",
        T = "IX2_INSTANCE_ADDED",
        E = "IX2_INSTANCE_STARTED",
        y = "IX2_INSTANCE_REMOVED",
        m = "IX2_ELEMENT_STATE_CHANGED",
        b = "IX2_ACTION_LIST_PLAYBACK_CHANGED",
        O = "IX2_VIEWPORT_WIDTH_CHANGED",
        v = "IX2_MEDIA_QUERIES_DEFINED",
        L = "IX2_TEST_FRAME_RENDERED";
    },
    2686: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        ABSTRACT_NODE: function () {
          return et;
        },
        AUTO: function () {
          return H;
        },
        BACKGROUND: function () {
          return F;
        },
        BACKGROUND_COLOR: function () {
          return G;
        },
        BAR_DELIMITER: function () {
          return j;
        },
        BORDER_COLOR: function () {
          return k;
        },
        BOUNDARY_SELECTOR: function () {
          return c;
        },
        CHILDREN: function () {
          return z;
        },
        COLON_DELIMITER: function () {
          return Q;
        },
        COLOR: function () {
          return D;
        },
        COMMA_DELIMITER: function () {
          return Y;
        },
        CONFIG_UNIT: function () {
          return T;
        },
        CONFIG_VALUE: function () {
          return u;
        },
        CONFIG_X_UNIT: function () {
          return p;
        },
        CONFIG_X_VALUE: function () {
          return d;
        },
        CONFIG_Y_UNIT: function () {
          return I;
        },
        CONFIG_Y_VALUE: function () {
          return s;
        },
        CONFIG_Z_UNIT: function () {
          return g;
        },
        CONFIG_Z_VALUE: function () {
          return f;
        },
        DISPLAY: function () {
          return B;
        },
        FILTER: function () {
          return V;
        },
        FLEX: function () {
          return X;
        },
        FONT_VARIATION_SETTINGS: function () {
          return x;
        },
        HEIGHT: function () {
          return P;
        },
        HTML_ELEMENT: function () {
          return J;
        },
        IMMEDIATE_CHILDREN: function () {
          return $;
        },
        IX2_ID_DELIMITER: function () {
          return i;
        },
        OPACITY: function () {
          return M;
        },
        PARENT: function () {
          return K;
        },
        PLAIN_OBJECT: function () {
          return ee;
        },
        PRESERVE_3D: function () {
          return Z;
        },
        RENDER_GENERAL: function () {
          return ea;
        },
        RENDER_PLUGIN: function () {
          return eo;
        },
        RENDER_STYLE: function () {
          return ei;
        },
        RENDER_TRANSFORM: function () {
          return en;
        },
        ROTATE_X: function () {
          return S;
        },
        ROTATE_Y: function () {
          return h;
        },
        ROTATE_Z: function () {
          return A;
        },
        SCALE_3D: function () {
          return _;
        },
        SCALE_X: function () {
          return v;
        },
        SCALE_Y: function () {
          return L;
        },
        SCALE_Z: function () {
          return R;
        },
        SIBLINGS: function () {
          return q;
        },
        SKEW: function () {
          return N;
        },
        SKEW_X: function () {
          return C;
        },
        SKEW_Y: function () {
          return w;
        },
        TRANSFORM: function () {
          return E;
        },
        TRANSLATE_3D: function () {
          return O;
        },
        TRANSLATE_X: function () {
          return y;
        },
        TRANSLATE_Y: function () {
          return m;
        },
        TRANSLATE_Z: function () {
          return b;
        },
        WF_PAGE: function () {
          return o;
        },
        WIDTH: function () {
          return U;
        },
        WILL_CHANGE: function () {
          return W;
        },
        W_MOD_IX: function () {
          return l;
        },
        W_MOD_JS: function () {
          return r;
        },
      };
      for (var a in n)
        Object.defineProperty(t, a, { enumerable: !0, get: n[a] });
      let i = "|",
        o = "data-wf-page",
        r = "w-mod-js",
        l = "w-mod-ix",
        c = ".w-dyn-item",
        d = "xValue",
        s = "yValue",
        f = "zValue",
        u = "value",
        p = "xUnit",
        I = "yUnit",
        g = "zUnit",
        T = "unit",
        E = "transform",
        y = "translateX",
        m = "translateY",
        b = "translateZ",
        O = "translate3d",
        v = "scaleX",
        L = "scaleY",
        R = "scaleZ",
        _ = "scale3d",
        S = "rotateX",
        h = "rotateY",
        A = "rotateZ",
        N = "skew",
        C = "skewX",
        w = "skewY",
        M = "opacity",
        V = "filter",
        x = "font-variation-settings",
        U = "width",
        P = "height",
        G = "backgroundColor",
        F = "background",
        k = "borderColor",
        D = "color",
        B = "display",
        X = "flex",
        W = "willChange",
        H = "AUTO",
        Y = ",",
        Q = ":",
        j = "|",
        z = "CHILDREN",
        $ = "IMMEDIATE_CHILDREN",
        q = "SIBLINGS",
        K = "PARENT",
        Z = "preserve-3d",
        J = "HTML_ELEMENT",
        ee = "PLAIN_OBJECT",
        et = "ABSTRACT_NODE",
        en = "RENDER_TRANSFORM",
        ea = "RENDER_GENERAL",
        ei = "RENDER_STYLE",
        eo = "RENDER_PLUGIN";
    },
    262: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        ActionAppliesTo: function () {
          return o;
        },
        ActionTypeConsts: function () {
          return i;
        },
      };
      for (var a in n)
        Object.defineProperty(t, a, { enumerable: !0, get: n[a] });
      let i = {
          TRANSFORM_MOVE: "TRANSFORM_MOVE",
          TRANSFORM_SCALE: "TRANSFORM_SCALE",
          TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
          TRANSFORM_SKEW: "TRANSFORM_SKEW",
          STYLE_OPACITY: "STYLE_OPACITY",
          STYLE_SIZE: "STYLE_SIZE",
          STYLE_FILTER: "STYLE_FILTER",
          STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
          STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
          STYLE_BORDER: "STYLE_BORDER",
          STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
          OBJECT_VALUE: "OBJECT_VALUE",
          PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
          PLUGIN_SPLINE: "PLUGIN_SPLINE",
          PLUGIN_RIVE: "PLUGIN_RIVE",
          PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
          GENERAL_DISPLAY: "GENERAL_DISPLAY",
          GENERAL_START_ACTION: "GENERAL_START_ACTION",
          GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
          GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
          GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
          GENERAL_LOOP: "GENERAL_LOOP",
          STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
        },
        o = {
          ELEMENT: "ELEMENT",
          ELEMENT_CLASS: "ELEMENT_CLASS",
          TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
        };
    },
    7087: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        ActionTypeConsts: function () {
          return r.ActionTypeConsts;
        },
        IX2EngineActionTypes: function () {
          return l;
        },
        IX2EngineConstants: function () {
          return c;
        },
        QuickEffectIds: function () {
          return o.QuickEffectIds;
        },
      };
      for (var i in a)
        Object.defineProperty(t, i, { enumerable: !0, get: a[i] });
      let o = d(n(1833), t),
        r = d(n(262), t);
      (d(n(8704), t), d(n(3213), t));
      let l = f(n(8023)),
        c = f(n(2686));
      function d(e, t) {
        return (
          Object.keys(e).forEach(function (n) {
            "default" === n ||
              Object.prototype.hasOwnProperty.call(t, n) ||
              Object.defineProperty(t, n, {
                enumerable: !0,
                get: function () {
                  return e[n];
                },
              });
          }),
          e
        );
      }
      function s(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap(),
          n = new WeakMap();
        return (s = function (e) {
          return e ? n : t;
        })(e);
      }
      function f(e, t) {
        if (!t && e && e.__esModule) return e;
        if (null === e || ("object" != typeof e && "function" != typeof e))
          return { default: e };
        var n = s(t);
        if (n && n.has(e)) return n.get(e);
        var a = { __proto__: null },
          i = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var o in e)
          if ("default" !== o && Object.prototype.hasOwnProperty.call(e, o)) {
            var r = i ? Object.getOwnPropertyDescriptor(e, o) : null;
            r && (r.get || r.set)
              ? Object.defineProperty(a, o, r)
              : (a[o] = e[o]);
          }
        return ((a.default = e), n && n.set(e, a), a);
      }
    },
    3213: function (e, t, n) {
      "use strict";
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "ReducedMotionTypes", {
          enumerable: !0,
          get: function () {
            return s;
          },
        }));
      let {
          TRANSFORM_MOVE: a,
          TRANSFORM_SCALE: i,
          TRANSFORM_ROTATE: o,
          TRANSFORM_SKEW: r,
          STYLE_SIZE: l,
          STYLE_FILTER: c,
          STYLE_FONT_VARIATION: d,
        } = n(262).ActionTypeConsts,
        s = { [a]: !0, [i]: !0, [o]: !0, [r]: !0, [l]: !0, [c]: !0, [d]: !0 };
    },
    1833: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = {
        EventAppliesTo: function () {
          return o;
        },
        EventBasedOn: function () {
          return r;
        },
        EventContinuousMouseAxes: function () {
          return l;
        },
        EventLimitAffectedElements: function () {
          return c;
        },
        EventTypeConsts: function () {
          return i;
        },
        QuickEffectDirectionConsts: function () {
          return s;
        },
        QuickEffectIds: function () {
          return d;
        },
      };
      for (var a in n)
        Object.defineProperty(t, a, { enumerable: !0, get: n[a] });
      let i = {
          NAVBAR_OPEN: "NAVBAR_OPEN",
          NAVBAR_CLOSE: "NAVBAR_CLOSE",
          TAB_ACTIVE: "TAB_ACTIVE",
          TAB_INACTIVE: "TAB_INACTIVE",
          SLIDER_ACTIVE: "SLIDER_ACTIVE",
          SLIDER_INACTIVE: "SLIDER_INACTIVE",
          DROPDOWN_OPEN: "DROPDOWN_OPEN",
          DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
          MOUSE_CLICK: "MOUSE_CLICK",
          MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
          MOUSE_DOWN: "MOUSE_DOWN",
          MOUSE_UP: "MOUSE_UP",
          MOUSE_OVER: "MOUSE_OVER",
          MOUSE_OUT: "MOUSE_OUT",
          MOUSE_MOVE: "MOUSE_MOVE",
          MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
          SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
          SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
          SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
          ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
          ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
          PAGE_START: "PAGE_START",
          PAGE_FINISH: "PAGE_FINISH",
          PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
          PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
          PAGE_SCROLL: "PAGE_SCROLL",
        },
        o = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" },
        r = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" },
        l = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" },
        c = {
          CHILDREN: "CHILDREN",
          SIBLINGS: "SIBLINGS",
          IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
        },
        d = {
          FADE_EFFECT: "FADE_EFFECT",
          SLIDE_EFFECT: "SLIDE_EFFECT",
          GROW_EFFECT: "GROW_EFFECT",
          SHRINK_EFFECT: "SHRINK_EFFECT",
          SPIN_EFFECT: "SPIN_EFFECT",
          FLY_EFFECT: "FLY_EFFECT",
          POP_EFFECT: "POP_EFFECT",
          FLIP_EFFECT: "FLIP_EFFECT",
          JIGGLE_EFFECT: "JIGGLE_EFFECT",
          PULSE_EFFECT: "PULSE_EFFECT",
          DROP_EFFECT: "DROP_EFFECT",
          BLINK_EFFECT: "BLINK_EFFECT",
          BOUNCE_EFFECT: "BOUNCE_EFFECT",
          FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
          FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
          RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
          JELLO_EFFECT: "JELLO_EFFECT",
          GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
          SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
          PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
        },
        s = {
          LEFT: "LEFT",
          RIGHT: "RIGHT",
          BOTTOM: "BOTTOM",
          TOP: "TOP",
          BOTTOM_LEFT: "BOTTOM_LEFT",
          BOTTOM_RIGHT: "BOTTOM_RIGHT",
          TOP_RIGHT: "TOP_RIGHT",
          TOP_LEFT: "TOP_LEFT",
          CLOCKWISE: "CLOCKWISE",
          COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
        };
    },
    8704: function (e, t) {
      "use strict";
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "InteractionTypeConsts", {
          enumerable: !0,
          get: function () {
            return n;
          },
        }));
      let n = {
        MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
        MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
        MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
        SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
        SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
        MOUSE_MOVE_IN_VIEWPORT_INTERACTION:
          "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
        PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
        PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
        PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
        NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
        DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
        ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
        TAB_INTERACTION: "TAB_INTERACTION",
        SLIDER_INTERACTION: "SLIDER_INTERACTION",
      };
    },
    380: function (e, t) {
      "use strict";
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "normalizeColor", {
          enumerable: !0,
          get: function () {
            return a;
          },
        }));
      let n = {
        aliceblue: "#F0F8FF",
        antiquewhite: "#FAEBD7",
        aqua: "#00FFFF",
        aquamarine: "#7FFFD4",
        azure: "#F0FFFF",
        beige: "#F5F5DC",
        bisque: "#FFE4C4",
        black: "#000000",
        blanchedalmond: "#FFEBCD",
        blue: "#0000FF",
        blueviolet: "#8A2BE2",
        brown: "#A52A2A",
        burlywood: "#DEB887",
        cadetblue: "#5F9EA0",
        chartreuse: "#7FFF00",
        chocolate: "#D2691E",
        coral: "#FF7F50",
        cornflowerblue: "#6495ED",
        cornsilk: "#FFF8DC",
        crimson: "#DC143C",
        cyan: "#00FFFF",
        darkblue: "#00008B",
        darkcyan: "#008B8B",
        darkgoldenrod: "#B8860B",
        darkgray: "#A9A9A9",
        darkgreen: "#006400",
        darkgrey: "#A9A9A9",
        darkkhaki: "#BDB76B",
        darkmagenta: "#8B008B",
        darkolivegreen: "#556B2F",
        darkorange: "#FF8C00",
        darkorchid: "#9932CC",
        darkred: "#8B0000",
        darksalmon: "#E9967A",
        darkseagreen: "#8FBC8F",
        darkslateblue: "#483D8B",
        darkslategray: "#2F4F4F",
        darkslategrey: "#2F4F4F",
        darkturquoise: "#00CED1",
        darkviolet: "#9400D3",
        deeppink: "#FF1493",
        deepskyblue: "#00BFFF",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1E90FF",
        firebrick: "#B22222",
        floralwhite: "#FFFAF0",
        forestgreen: "#228B22",
        fuchsia: "#FF00FF",
        gainsboro: "#DCDCDC",
        ghostwhite: "#F8F8FF",
        gold: "#FFD700",
        goldenrod: "#DAA520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#ADFF2F",
        grey: "#808080",
        honeydew: "#F0FFF0",
        hotpink: "#FF69B4",
        indianred: "#CD5C5C",
        indigo: "#4B0082",
        ivory: "#FFFFF0",
        khaki: "#F0E68C",
        lavender: "#E6E6FA",
        lavenderblush: "#FFF0F5",
        lawngreen: "#7CFC00",
        lemonchiffon: "#FFFACD",
        lightblue: "#ADD8E6",
        lightcoral: "#F08080",
        lightcyan: "#E0FFFF",
        lightgoldenrodyellow: "#FAFAD2",
        lightgray: "#D3D3D3",
        lightgreen: "#90EE90",
        lightgrey: "#D3D3D3",
        lightpink: "#FFB6C1",
        lightsalmon: "#FFA07A",
        lightseagreen: "#20B2AA",
        lightskyblue: "#87CEFA",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#B0C4DE",
        lightyellow: "#FFFFE0",
        lime: "#00FF00",
        limegreen: "#32CD32",
        linen: "#FAF0E6",
        magenta: "#FF00FF",
        maroon: "#800000",
        mediumaquamarine: "#66CDAA",
        mediumblue: "#0000CD",
        mediumorchid: "#BA55D3",
        mediumpurple: "#9370DB",
        mediumseagreen: "#3CB371",
        mediumslateblue: "#7B68EE",
        mediumspringgreen: "#00FA9A",
        mediumturquoise: "#48D1CC",
        mediumvioletred: "#C71585",
        midnightblue: "#191970",
        mintcream: "#F5FFFA",
        mistyrose: "#FFE4E1",
        moccasin: "#FFE4B5",
        navajowhite: "#FFDEAD",
        navy: "#000080",
        oldlace: "#FDF5E6",
        olive: "#808000",
        olivedrab: "#6B8E23",
        orange: "#FFA500",
        orangered: "#FF4500",
        orchid: "#DA70D6",
        palegoldenrod: "#EEE8AA",
        palegreen: "#98FB98",
        paleturquoise: "#AFEEEE",
        palevioletred: "#DB7093",
        papayawhip: "#FFEFD5",
        peachpuff: "#FFDAB9",
        peru: "#CD853F",
        pink: "#FFC0CB",
        plum: "#DDA0DD",
        powderblue: "#B0E0E6",
        purple: "#800080",
        rebeccapurple: "#663399",
        red: "#FF0000",
        rosybrown: "#BC8F8F",
        royalblue: "#4169E1",
        saddlebrown: "#8B4513",
        salmon: "#FA8072",
        sandybrown: "#F4A460",
        seagreen: "#2E8B57",
        seashell: "#FFF5EE",
        sienna: "#A0522D",
        silver: "#C0C0C0",
        skyblue: "#87CEEB",
        slateblue: "#6A5ACD",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#FFFAFA",
        springgreen: "#00FF7F",
        steelblue: "#4682B4",
        tan: "#D2B48C",
        teal: "#008080",
        thistle: "#D8BFD8",
        tomato: "#FF6347",
        turquoise: "#40E0D0",
        violet: "#EE82EE",
        wheat: "#F5DEB3",
        white: "#FFFFFF",
        whitesmoke: "#F5F5F5",
        yellow: "#FFFF00",
        yellowgreen: "#9ACD32",
      };
      function a(e) {
        let t,
          a,
          i,
          o = 1,
          r = e.replace(/\s/g, "").toLowerCase(),
          l = ("string" == typeof n[r] ? n[r].toLowerCase() : null) || r;
        if (l.startsWith("#")) {
          let e = l.substring(1);
          3 === e.length || 4 === e.length
            ? ((t = parseInt(e[0] + e[0], 16)),
              (a = parseInt(e[1] + e[1], 16)),
              (i = parseInt(e[2] + e[2], 16)),
              4 === e.length && (o = parseInt(e[3] + e[3], 16) / 255))
            : (6 === e.length || 8 === e.length) &&
              ((t = parseInt(e.substring(0, 2), 16)),
              (a = parseInt(e.substring(2, 4), 16)),
              (i = parseInt(e.substring(4, 6), 16)),
              8 === e.length && (o = parseInt(e.substring(6, 8), 16) / 255));
        } else if (l.startsWith("rgba")) {
          let e = l.match(/rgba\(([^)]+)\)/)[1].split(",");
          ((t = parseInt(e[0], 10)),
            (a = parseInt(e[1], 10)),
            (i = parseInt(e[2], 10)),
            (o = parseFloat(e[3])));
        } else if (l.startsWith("rgb")) {
          let e = l.match(/rgb\(([^)]+)\)/)[1].split(",");
          ((t = parseInt(e[0], 10)),
            (a = parseInt(e[1], 10)),
            (i = parseInt(e[2], 10)));
        } else if (l.startsWith("hsla")) {
          let e,
            n,
            r,
            c = l.match(/hsla\(([^)]+)\)/)[1].split(","),
            d = parseFloat(c[0]),
            s = parseFloat(c[1].replace("%", "")) / 100,
            f = parseFloat(c[2].replace("%", "")) / 100;
          o = parseFloat(c[3]);
          let u = (1 - Math.abs(2 * f - 1)) * s,
            p = u * (1 - Math.abs(((d / 60) % 2) - 1)),
            I = f - u / 2;
          (d >= 0 && d < 60
            ? ((e = u), (n = p), (r = 0))
            : d >= 60 && d < 120
              ? ((e = p), (n = u), (r = 0))
              : d >= 120 && d < 180
                ? ((e = 0), (n = u), (r = p))
                : d >= 180 && d < 240
                  ? ((e = 0), (n = p), (r = u))
                  : d >= 240 && d < 300
                    ? ((e = p), (n = 0), (r = u))
                    : ((e = u), (n = 0), (r = p)),
            (t = Math.round((e + I) * 255)),
            (a = Math.round((n + I) * 255)),
            (i = Math.round((r + I) * 255)));
        } else if (l.startsWith("hsl")) {
          let e,
            n,
            o,
            r = l.match(/hsl\(([^)]+)\)/)[1].split(","),
            c = parseFloat(r[0]),
            d = parseFloat(r[1].replace("%", "")) / 100,
            s = parseFloat(r[2].replace("%", "")) / 100,
            f = (1 - Math.abs(2 * s - 1)) * d,
            u = f * (1 - Math.abs(((c / 60) % 2) - 1)),
            p = s - f / 2;
          (c >= 0 && c < 60
            ? ((e = f), (n = u), (o = 0))
            : c >= 60 && c < 120
              ? ((e = u), (n = f), (o = 0))
              : c >= 120 && c < 180
                ? ((e = 0), (n = f), (o = u))
                : c >= 180 && c < 240
                  ? ((e = 0), (n = u), (o = f))
                  : c >= 240 && c < 300
                    ? ((e = u), (n = 0), (o = f))
                    : ((e = f), (n = 0), (o = u)),
            (t = Math.round((e + p) * 255)),
            (a = Math.round((n + p) * 255)),
            (i = Math.round((o + p) * 255)));
        }
        if (Number.isNaN(t) || Number.isNaN(a) || Number.isNaN(i))
          throw Error(
            `Invalid color in [ix2/shared/utils/normalizeColor.js] '${e}'`,
          );
        return { red: t, green: a, blue: i, alpha: o };
      }
    },
    9468: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        IX2BrowserSupport: function () {
          return o;
        },
        IX2EasingUtils: function () {
          return l;
        },
        IX2Easings: function () {
          return r;
        },
        IX2ElementsReducer: function () {
          return c;
        },
        IX2VanillaPlugins: function () {
          return d;
        },
        IX2VanillaUtils: function () {
          return s;
        },
      };
      for (var i in a)
        Object.defineProperty(t, i, { enumerable: !0, get: a[i] });
      let o = u(n(2662)),
        r = u(n(8686)),
        l = u(n(3767)),
        c = u(n(5861)),
        d = u(n(1799)),
        s = u(n(4124));
      function f(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap(),
          n = new WeakMap();
        return (f = function (e) {
          return e ? n : t;
        })(e);
      }
      function u(e, t) {
        if (!t && e && e.__esModule) return e;
        if (null === e || ("object" != typeof e && "function" != typeof e))
          return { default: e };
        var n = f(t);
        if (n && n.has(e)) return n.get(e);
        var a = { __proto__: null },
          i = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var o in e)
          if ("default" !== o && Object.prototype.hasOwnProperty.call(e, o)) {
            var r = i ? Object.getOwnPropertyDescriptor(e, o) : null;
            r && (r.get || r.set)
              ? Object.defineProperty(a, o, r)
              : (a[o] = e[o]);
          }
        return ((a.default = e), n && n.set(e, a), a);
      }
    },
    2662: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a,
        i = {
          ELEMENT_MATCHES: function () {
            return d;
          },
          FLEX_PREFIXED: function () {
            return s;
          },
          IS_BROWSER_ENV: function () {
            return l;
          },
          TRANSFORM_PREFIXED: function () {
            return f;
          },
          TRANSFORM_STYLE_PREFIXED: function () {
            return p;
          },
          withBrowser: function () {
            return c;
          },
        };
      for (var o in i)
        Object.defineProperty(t, o, { enumerable: !0, get: i[o] });
      let r = (a = n(9777)) && a.__esModule ? a : { default: a },
        l = "undefined" != typeof window,
        c = (e, t) => (l ? e() : t),
        d = c(() =>
          (0, r.default)(
            [
              "matches",
              "matchesSelector",
              "mozMatchesSelector",
              "msMatchesSelector",
              "oMatchesSelector",
              "webkitMatchesSelector",
            ],
            (e) => e in Element.prototype,
          ),
        ),
        s = c(() => {
          let e = document.createElement("i"),
            t = [
              "flex",
              "-webkit-flex",
              "-ms-flexbox",
              "-moz-box",
              "-webkit-box",
            ];
          try {
            let { length: n } = t;
            for (let a = 0; a < n; a++) {
              let n = t[a];
              if (((e.style.display = n), e.style.display === n)) return n;
            }
            return "";
          } catch (e) {
            return "";
          }
        }, "flex"),
        f = c(() => {
          let e = document.createElement("i");
          if (null == e.style.transform) {
            let t = ["Webkit", "Moz", "ms"],
              { length: n } = t;
            for (let a = 0; a < n; a++) {
              let n = t[a] + "Transform";
              if (void 0 !== e.style[n]) return n;
            }
          }
          return "transform";
        }, "transform"),
        u = f.split("transform")[0],
        p = u ? u + "TransformStyle" : "transformStyle";
    },
    3767: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a,
        i = {
          applyEasing: function () {
            return f;
          },
          createBezierEasing: function () {
            return s;
          },
          optimizeFloat: function () {
            return d;
          },
        };
      for (var o in i)
        Object.defineProperty(t, o, { enumerable: !0, get: i[o] });
      let r = (function (e, t) {
          if (e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var n = c(t);
          if (n && n.has(e)) return n.get(e);
          var a = { __proto__: null },
            i = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var o in e)
            if ("default" !== o && Object.prototype.hasOwnProperty.call(e, o)) {
              var r = i ? Object.getOwnPropertyDescriptor(e, o) : null;
              r && (r.get || r.set)
                ? Object.defineProperty(a, o, r)
                : (a[o] = e[o]);
            }
          return ((a.default = e), n && n.set(e, a), a);
        })(n(8686)),
        l = (a = n(1361)) && a.__esModule ? a : { default: a };
      function c(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap(),
          n = new WeakMap();
        return (c = function (e) {
          return e ? n : t;
        })(e);
      }
      function d(e, t = 5, n = 10) {
        let a = Math.pow(n, t),
          i = Number(Math.round(e * a) / a);
        return Math.abs(i) > 1e-4 ? i : 0;
      }
      function s(e) {
        return (0, l.default)(...e);
      }
      function f(e, t, n) {
        return 0 === t
          ? 0
          : 1 === t
            ? 1
            : n
              ? d(t > 0 ? n(t) : t)
              : d(t > 0 && e && r[e] ? r[e](t) : t);
      }
    },
    8686: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a,
        i = {
          bounce: function () {
            return X;
          },
          bouncePast: function () {
            return W;
          },
          ease: function () {
            return l;
          },
          easeIn: function () {
            return c;
          },
          easeInOut: function () {
            return s;
          },
          easeOut: function () {
            return d;
          },
          inBack: function () {
            return V;
          },
          inCirc: function () {
            return N;
          },
          inCubic: function () {
            return I;
          },
          inElastic: function () {
            return P;
          },
          inExpo: function () {
            return S;
          },
          inOutBack: function () {
            return U;
          },
          inOutCirc: function () {
            return w;
          },
          inOutCubic: function () {
            return T;
          },
          inOutElastic: function () {
            return F;
          },
          inOutExpo: function () {
            return A;
          },
          inOutQuad: function () {
            return p;
          },
          inOutQuart: function () {
            return m;
          },
          inOutQuint: function () {
            return v;
          },
          inOutSine: function () {
            return _;
          },
          inQuad: function () {
            return f;
          },
          inQuart: function () {
            return E;
          },
          inQuint: function () {
            return b;
          },
          inSine: function () {
            return L;
          },
          outBack: function () {
            return x;
          },
          outBounce: function () {
            return M;
          },
          outCirc: function () {
            return C;
          },
          outCubic: function () {
            return g;
          },
          outElastic: function () {
            return G;
          },
          outExpo: function () {
            return h;
          },
          outQuad: function () {
            return u;
          },
          outQuart: function () {
            return y;
          },
          outQuint: function () {
            return O;
          },
          outSine: function () {
            return R;
          },
          swingFrom: function () {
            return D;
          },
          swingFromTo: function () {
            return k;
          },
          swingTo: function () {
            return B;
          },
        };
      for (var o in i)
        Object.defineProperty(t, o, { enumerable: !0, get: i[o] });
      let r = (a = n(1361)) && a.__esModule ? a : { default: a },
        l = (0, r.default)(0.25, 0.1, 0.25, 1),
        c = (0, r.default)(0.42, 0, 1, 1),
        d = (0, r.default)(0, 0, 0.58, 1),
        s = (0, r.default)(0.42, 0, 0.58, 1);
      function f(e) {
        return Math.pow(e, 2);
      }
      function u(e) {
        return -(Math.pow(e - 1, 2) - 1);
      }
      function p(e) {
        return (e /= 0.5) < 1
          ? 0.5 * Math.pow(e, 2)
          : -0.5 * ((e -= 2) * e - 2);
      }
      function I(e) {
        return Math.pow(e, 3);
      }
      function g(e) {
        return Math.pow(e - 1, 3) + 1;
      }
      function T(e) {
        return (e /= 0.5) < 1
          ? 0.5 * Math.pow(e, 3)
          : 0.5 * (Math.pow(e - 2, 3) + 2);
      }
      function E(e) {
        return Math.pow(e, 4);
      }
      function y(e) {
        return -(Math.pow(e - 1, 4) - 1);
      }
      function m(e) {
        return (e /= 0.5) < 1
          ? 0.5 * Math.pow(e, 4)
          : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
      }
      function b(e) {
        return Math.pow(e, 5);
      }
      function O(e) {
        return Math.pow(e - 1, 5) + 1;
      }
      function v(e) {
        return (e /= 0.5) < 1
          ? 0.5 * Math.pow(e, 5)
          : 0.5 * (Math.pow(e - 2, 5) + 2);
      }
      function L(e) {
        return -Math.cos((Math.PI / 2) * e) + 1;
      }
      function R(e) {
        return Math.sin((Math.PI / 2) * e);
      }
      function _(e) {
        return -0.5 * (Math.cos(Math.PI * e) - 1);
      }
      function S(e) {
        return 0 === e ? 0 : Math.pow(2, 10 * (e - 1));
      }
      function h(e) {
        return 1 === e ? 1 : -Math.pow(2, -10 * e) + 1;
      }
      function A(e) {
        return 0 === e
          ? 0
          : 1 === e
            ? 1
            : (e /= 0.5) < 1
              ? 0.5 * Math.pow(2, 10 * (e - 1))
              : 0.5 * (-Math.pow(2, -10 * --e) + 2);
      }
      function N(e) {
        return -(Math.sqrt(1 - e * e) - 1);
      }
      function C(e) {
        return Math.sqrt(1 - Math.pow(e - 1, 2));
      }
      function w(e) {
        return (e /= 0.5) < 1
          ? -0.5 * (Math.sqrt(1 - e * e) - 1)
          : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
      }
      function M(e) {
        return e < 1 / 2.75
          ? 7.5625 * e * e
          : e < 2 / 2.75
            ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
            : e < 2.5 / 2.75
              ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
              : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
      }
      function V(e) {
        return e * e * (2.70158 * e - 1.70158);
      }
      function x(e) {
        return (e -= 1) * e * (2.70158 * e + 1.70158) + 1;
      }
      function U(e) {
        let t = 1.70158;
        return (e /= 0.5) < 1
          ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
          : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
      }
      function P(e) {
        let t = 1.70158,
          n = 0,
          a = 1;
        return 0 === e
          ? 0
          : 1 === e
            ? 1
            : (n || (n = 0.3),
              a < 1
                ? ((a = 1), (t = n / 4))
                : (t = (n / (2 * Math.PI)) * Math.asin(1 / a)),
              -(
                a *
                Math.pow(2, 10 * (e -= 1)) *
                Math.sin((2 * Math.PI * (e - t)) / n)
              ));
      }
      function G(e) {
        let t = 1.70158,
          n = 0,
          a = 1;
        return 0 === e
          ? 0
          : 1 === e
            ? 1
            : (n || (n = 0.3),
              a < 1
                ? ((a = 1), (t = n / 4))
                : (t = (n / (2 * Math.PI)) * Math.asin(1 / a)),
              a * Math.pow(2, -10 * e) * Math.sin((2 * Math.PI * (e - t)) / n) +
                1);
      }
      function F(e) {
        let t = 1.70158,
          n = 0,
          a = 1;
        return 0 === e
          ? 0
          : 2 == (e /= 0.5)
            ? 1
            : (n || (n = 0.3 * 1.5),
                a < 1
                  ? ((a = 1), (t = n / 4))
                  : (t = (n / (2 * Math.PI)) * Math.asin(1 / a)),
                e < 1)
              ? -0.5 *
                (a *
                  Math.pow(2, 10 * (e -= 1)) *
                  Math.sin((2 * Math.PI * (e - t)) / n))
              : a *
                  Math.pow(2, -10 * (e -= 1)) *
                  Math.sin((2 * Math.PI * (e - t)) / n) *
                  0.5 +
                1;
      }
      function k(e) {
        let t = 1.70158;
        return (e /= 0.5) < 1
          ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
          : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
      }
      function D(e) {
        return e * e * (2.70158 * e - 1.70158);
      }
      function B(e) {
        return (e -= 1) * e * (2.70158 * e + 1.70158) + 1;
      }
      function X(e) {
        return e < 1 / 2.75
          ? 7.5625 * e * e
          : e < 2 / 2.75
            ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
            : e < 2.5 / 2.75
              ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
              : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
      }
      function W(e) {
        return e < 1 / 2.75
          ? 7.5625 * e * e
          : e < 2 / 2.75
            ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
            : e < 2.5 / 2.75
              ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
              : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
      }
    },
    1799: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        clearPlugin: function () {
          return g;
        },
        createPluginInstance: function () {
          return p;
        },
        getPluginConfig: function () {
          return d;
        },
        getPluginDestination: function () {
          return u;
        },
        getPluginDuration: function () {
          return f;
        },
        getPluginOrigin: function () {
          return s;
        },
        isPluginType: function () {
          return l;
        },
        renderPlugin: function () {
          return I;
        },
      };
      for (var i in a)
        Object.defineProperty(t, i, { enumerable: !0, get: a[i] });
      let o = n(2662),
        r = n(3690);
      function l(e) {
        return r.pluginMethodMap.has(e);
      }
      let c = (e) => (t) => {
          if (!o.IS_BROWSER_ENV) return () => null;
          let n = r.pluginMethodMap.get(t);
          if (!n) throw Error(`IX2 no plugin configured for: ${t}`);
          let a = n[e];
          if (!a) throw Error(`IX2 invalid plugin method: ${e}`);
          return a;
        },
        d = c("getPluginConfig"),
        s = c("getPluginOrigin"),
        f = c("getPluginDuration"),
        u = c("getPluginDestination"),
        p = c("createPluginInstance"),
        I = c("renderPlugin"),
        g = c("clearPlugin");
    },
    4124: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        cleanupHTMLElement: function () {
          return eY;
        },
        clearAllStyles: function () {
          return eX;
        },
        clearObjectCache: function () {
          return ef;
        },
        getActionListProgress: function () {
          return e$;
        },
        getAffectedElements: function () {
          return eb;
        },
        getComputedStyle: function () {
          return eO;
        },
        getDestinationValues: function () {
          return eN;
        },
        getElementId: function () {
          return eg;
        },
        getInstanceId: function () {
          return ep;
        },
        getInstanceOrigin: function () {
          return e_;
        },
        getItemConfigByKey: function () {
          return eA;
        },
        getMaxDurationItemIndex: function () {
          return ez;
        },
        getNamespacedParameterId: function () {
          return eZ;
        },
        getRenderType: function () {
          return eC;
        },
        getStyleProp: function () {
          return ew;
        },
        mediaQueriesEqual: function () {
          return e0;
        },
        observeStore: function () {
          return ey;
        },
        reduceListToGroup: function () {
          return eq;
        },
        reifyState: function () {
          return eT;
        },
        renderHTMLElement: function () {
          return eM;
        },
        shallowEqual: function () {
          return s.default;
        },
        shouldAllowMediaQuery: function () {
          return eJ;
        },
        shouldNamespaceEventParameter: function () {
          return eK;
        },
        stringifyTarget: function () {
          return e1;
        },
      };
      for (var i in a)
        Object.defineProperty(t, i, { enumerable: !0, get: a[i] });
      let o = g(n(4075)),
        r = g(n(1455)),
        l = g(n(5720)),
        c = n(1185),
        d = n(7087),
        s = g(n(7164)),
        f = n(3767),
        u = n(380),
        p = n(1799),
        I = n(2662);
      function g(e) {
        return e && e.__esModule ? e : { default: e };
      }
      let {
          BACKGROUND: T,
          TRANSFORM: E,
          TRANSLATE_3D: y,
          SCALE_3D: m,
          ROTATE_X: b,
          ROTATE_Y: O,
          ROTATE_Z: v,
          SKEW: L,
          PRESERVE_3D: R,
          FLEX: _,
          OPACITY: S,
          FILTER: h,
          FONT_VARIATION_SETTINGS: A,
          WIDTH: N,
          HEIGHT: C,
          BACKGROUND_COLOR: w,
          BORDER_COLOR: M,
          COLOR: V,
          CHILDREN: x,
          IMMEDIATE_CHILDREN: U,
          SIBLINGS: P,
          PARENT: G,
          DISPLAY: F,
          WILL_CHANGE: k,
          AUTO: D,
          COMMA_DELIMITER: B,
          COLON_DELIMITER: X,
          BAR_DELIMITER: W,
          RENDER_TRANSFORM: H,
          RENDER_GENERAL: Y,
          RENDER_STYLE: Q,
          RENDER_PLUGIN: j,
        } = d.IX2EngineConstants,
        {
          TRANSFORM_MOVE: z,
          TRANSFORM_SCALE: $,
          TRANSFORM_ROTATE: q,
          TRANSFORM_SKEW: K,
          STYLE_OPACITY: Z,
          STYLE_FILTER: J,
          STYLE_FONT_VARIATION: ee,
          STYLE_SIZE: et,
          STYLE_BACKGROUND_COLOR: en,
          STYLE_BORDER: ea,
          STYLE_TEXT_COLOR: ei,
          GENERAL_DISPLAY: eo,
          OBJECT_VALUE: er,
        } = d.ActionTypeConsts,
        el = (e) => e.trim(),
        ec = Object.freeze({ [en]: w, [ea]: M, [ei]: V }),
        ed = Object.freeze({
          [I.TRANSFORM_PREFIXED]: E,
          [w]: T,
          [S]: S,
          [h]: h,
          [N]: N,
          [C]: C,
          [A]: A,
        }),
        es = new Map();
      function ef() {
        es.clear();
      }
      let eu = 1;
      function ep() {
        return "i" + eu++;
      }
      let eI = 1;
      function eg(e, t) {
        for (let n in e) {
          let a = e[n];
          if (a && a.ref === t) return a.id;
        }
        return "e" + eI++;
      }
      function eT({ events: e, actionLists: t, site: n } = {}) {
        let a = (0, r.default)(
            e,
            (e, t) => {
              let { eventTypeId: n } = t;
              return (e[n] || (e[n] = {}), (e[n][t.id] = t), e);
            },
            {},
          ),
          i = n && n.mediaQueries,
          o = [];
        return (
          i
            ? (o = i.map((e) => e.key))
            : ((i = []), console.warn("IX2 missing mediaQueries in site data")),
          {
            ixData: {
              events: e,
              actionLists: t,
              eventTypeMap: a,
              mediaQueries: i,
              mediaQueryKeys: o,
            },
          }
        );
      }
      let eE = (e, t) => e === t;
      function ey({ store: e, select: t, onChange: n, comparator: a = eE }) {
        let { getState: i, subscribe: o } = e,
          r = o(function () {
            let o = t(i());
            if (null == o) return void r();
            a(o, l) || n((l = o), e);
          }),
          l = t(i());
        return r;
      }
      function em(e) {
        let t = typeof e;
        if ("string" === t) return { id: e };
        if (null != e && "object" === t) {
          let {
            id: t,
            objectId: n,
            selector: a,
            selectorGuids: i,
            appliesTo: o,
            useEventTarget: r,
          } = e;
          return {
            id: t,
            objectId: n,
            selector: a,
            selectorGuids: i,
            appliesTo: o,
            useEventTarget: r,
          };
        }
        return {};
      }
      function eb({
        config: e,
        event: t,
        eventTarget: n,
        elementRoot: a,
        elementApi: i,
      }) {
        let o, r, l;
        if (!i) throw Error("IX2 missing elementApi");
        let { targets: c } = e;
        if (Array.isArray(c) && c.length > 0)
          return c.reduce(
            (e, o) =>
              e.concat(
                eb({
                  config: { target: o },
                  event: t,
                  eventTarget: n,
                  elementRoot: a,
                  elementApi: i,
                }),
              ),
            [],
          );
        let {
            getValidDocument: s,
            getQuerySelector: f,
            queryDocument: u,
            getChildElements: p,
            getSiblingElements: g,
            matchSelector: T,
            elementContains: E,
            isSiblingNode: y,
          } = i,
          { target: m } = e;
        if (!m) return [];
        let {
          id: b,
          objectId: O,
          selector: v,
          selectorGuids: L,
          appliesTo: R,
          useEventTarget: _,
        } = em(m);
        if (O) return [es.has(O) ? es.get(O) : es.set(O, {}).get(O)];
        if (R === d.EventAppliesTo.PAGE) {
          let e = s(b);
          return e ? [e] : [];
        }
        let S = (t?.action?.config?.affectedElements ?? {})[b || v] || {},
          h = !!(S.id || S.selector),
          A = t && f(em(t.target));
        if (
          (h
            ? ((o = S.limitAffectedElements), (r = A), (l = f(S)))
            : (r = l = f({ id: b, selector: v, selectorGuids: L })),
          t && _)
        ) {
          let e = n && (l || !0 === _) ? [n] : u(A);
          if (l) {
            if (_ === G) return u(l).filter((t) => e.some((e) => E(t, e)));
            if (_ === x) return u(l).filter((t) => e.some((e) => E(e, t)));
            if (_ === P) return u(l).filter((t) => e.some((e) => y(e, t)));
          }
          return e;
        }
        return null == r || null == l
          ? []
          : I.IS_BROWSER_ENV && a
            ? u(l).filter((e) => a.contains(e))
            : o === x
              ? u(r, l)
              : o === U
                ? p(u(r)).filter(T(l))
                : o === P
                  ? g(u(r)).filter(T(l))
                  : u(l);
      }
      function eO({ element: e, actionItem: t }) {
        if (!I.IS_BROWSER_ENV) return {};
        let { actionTypeId: n } = t;
        switch (n) {
          case et:
          case en:
          case ea:
          case ei:
          case eo:
            return window.getComputedStyle(e);
          default:
            return {};
        }
      }
      let ev = /px/,
        eL = (e, t) =>
          t.reduce(
            (e, t) => (null == e[t.type] && (e[t.type] = ex[t.type]), e),
            e || {},
          ),
        eR = (e, t) =>
          t.reduce(
            (e, t) => (
              null == e[t.type] &&
                (e[t.type] = eU[t.type] || t.defaultValue || 0),
              e
            ),
            e || {},
          );
      function e_(e, t = {}, n = {}, a, i) {
        let { getStyle: r } = i,
          { actionTypeId: l } = a;
        if ((0, p.isPluginType)(l)) return (0, p.getPluginOrigin)(l)(t[l], a);
        switch (a.actionTypeId) {
          case z:
          case $:
          case q:
          case K:
            return t[a.actionTypeId] || eV[a.actionTypeId];
          case J:
            return eL(t[a.actionTypeId], a.config.filters);
          case ee:
            return eR(t[a.actionTypeId], a.config.fontVariations);
          case Z:
            return { value: (0, o.default)(parseFloat(r(e, S)), 1) };
          case et: {
            let t,
              i = r(e, N),
              l = r(e, C);
            return {
              widthValue:
                a.config.widthUnit === D
                  ? ev.test(i)
                    ? parseFloat(i)
                    : parseFloat(n.width)
                  : (0, o.default)(parseFloat(i), parseFloat(n.width)),
              heightValue:
                a.config.heightUnit === D
                  ? ev.test(l)
                    ? parseFloat(l)
                    : parseFloat(n.height)
                  : (0, o.default)(parseFloat(l), parseFloat(n.height)),
            };
          }
          case en:
          case ea:
          case ei:
            return (function ({
              element: e,
              actionTypeId: t,
              computedStyle: n,
              getStyle: a,
            }) {
              let i = ec[t],
                r = a(e, i),
                l = (function (e, t) {
                  let n = e.exec(t);
                  return n ? n[1] : "";
                })(ek, eF.test(r) ? r : n[i]).split(B);
              return {
                rValue: (0, o.default)(parseInt(l[0], 10), 255),
                gValue: (0, o.default)(parseInt(l[1], 10), 255),
                bValue: (0, o.default)(parseInt(l[2], 10), 255),
                aValue: (0, o.default)(parseFloat(l[3]), 1),
              };
            })({
              element: e,
              actionTypeId: a.actionTypeId,
              computedStyle: n,
              getStyle: r,
            });
          case eo:
            return { value: (0, o.default)(r(e, F), n.display) };
          case er:
            return t[a.actionTypeId] || { value: 0 };
          default:
            return;
        }
      }
      let eS = (e, t) => (t && (e[t.type] = t.value || 0), e),
        eh = (e, t) => (t && (e[t.type] = t.value || 0), e),
        eA = (e, t, n) => {
          if ((0, p.isPluginType)(e)) return (0, p.getPluginConfig)(e)(n, t);
          switch (e) {
            case J: {
              let e = (0, l.default)(n.filters, ({ type: e }) => e === t);
              return e ? e.value : 0;
            }
            case ee: {
              let e = (0, l.default)(
                n.fontVariations,
                ({ type: e }) => e === t,
              );
              return e ? e.value : 0;
            }
            default:
              return n[t];
          }
        };
      function eN({ element: e, actionItem: t, elementApi: n }) {
        if ((0, p.isPluginType)(t.actionTypeId))
          return (0, p.getPluginDestination)(t.actionTypeId)(t.config);
        switch (t.actionTypeId) {
          case z:
          case $:
          case q:
          case K: {
            let { xValue: e, yValue: n, zValue: a } = t.config;
            return { xValue: e, yValue: n, zValue: a };
          }
          case et: {
            let { getStyle: a, setStyle: i, getProperty: o } = n,
              { widthUnit: r, heightUnit: l } = t.config,
              { widthValue: c, heightValue: d } = t.config;
            if (!I.IS_BROWSER_ENV) return { widthValue: c, heightValue: d };
            if (r === D) {
              let t = a(e, N);
              (i(e, N, ""), (c = o(e, "offsetWidth")), i(e, N, t));
            }
            if (l === D) {
              let t = a(e, C);
              (i(e, C, ""), (d = o(e, "offsetHeight")), i(e, C, t));
            }
            return { widthValue: c, heightValue: d };
          }
          case en:
          case ea:
          case ei: {
            let {
              rValue: a,
              gValue: i,
              bValue: o,
              aValue: r,
              globalSwatchId: l,
            } = t.config;
            if (l && l.startsWith("--")) {
              let { getStyle: t } = n,
                a = t(e, l),
                i = (0, u.normalizeColor)(a);
              return {
                rValue: i.red,
                gValue: i.green,
                bValue: i.blue,
                aValue: i.alpha,
              };
            }
            return { rValue: a, gValue: i, bValue: o, aValue: r };
          }
          case J:
            return t.config.filters.reduce(eS, {});
          case ee:
            return t.config.fontVariations.reduce(eh, {});
          default: {
            let { value: e } = t.config;
            return { value: e };
          }
        }
      }
      function eC(e) {
        return /^TRANSFORM_/.test(e)
          ? H
          : /^STYLE_/.test(e)
            ? Q
            : /^GENERAL_/.test(e)
              ? Y
              : /^PLUGIN_/.test(e)
                ? j
                : void 0;
      }
      function ew(e, t) {
        return e === Q ? t.replace("STYLE_", "").toLowerCase() : null;
      }
      function eM(e, t, n, a, i, o, l, c, d) {
        switch (c) {
          case H:
            var s = e,
              f = t,
              u = n,
              g = i,
              T = l;
            let E = eG
                .map((e) => {
                  let t = eV[e],
                    {
                      xValue: n = t.xValue,
                      yValue: a = t.yValue,
                      zValue: i = t.zValue,
                      xUnit: o = "",
                      yUnit: r = "",
                      zUnit: l = "",
                    } = f[e] || {};
                  switch (e) {
                    case z:
                      return `${y}(${n}${o}, ${a}${r}, ${i}${l})`;
                    case $:
                      return `${m}(${n}${o}, ${a}${r}, ${i}${l})`;
                    case q:
                      return `${b}(${n}${o}) ${O}(${a}${r}) ${v}(${i}${l})`;
                    case K:
                      return `${L}(${n}${o}, ${a}${r})`;
                    default:
                      return "";
                  }
                })
                .join(" "),
              { setStyle: S } = T;
            (eD(s, I.TRANSFORM_PREFIXED, T),
              S(s, I.TRANSFORM_PREFIXED, E),
              (function (
                { actionTypeId: e },
                { xValue: t, yValue: n, zValue: a },
              ) {
                return (
                  (e === z && void 0 !== a) ||
                  (e === $ && void 0 !== a) ||
                  (e === q && (void 0 !== t || void 0 !== n))
                );
              })(g, u) && S(s, I.TRANSFORM_STYLE_PREFIXED, R));
            return;
          case Q:
            return (function (e, t, n, a, i, o) {
              let { setStyle: l } = o;
              switch (a.actionTypeId) {
                case et: {
                  let { widthUnit: t = "", heightUnit: i = "" } = a.config,
                    { widthValue: r, heightValue: c } = n;
                  (void 0 !== r &&
                    (t === D && (t = "px"), eD(e, N, o), l(e, N, r + t)),
                    void 0 !== c &&
                      (i === D && (i = "px"), eD(e, C, o), l(e, C, c + i)));
                  break;
                }
                case J:
                  var c = a.config;
                  let d = (0, r.default)(
                      n,
                      (e, t, n) => `${e} ${n}(${t}${eP(n, c)})`,
                      "",
                    ),
                    { setStyle: s } = o;
                  (eD(e, h, o), s(e, h, d));
                  break;
                case ee:
                  a.config;
                  let f = (0, r.default)(
                      n,
                      (e, t, n) => (e.push(`"${n}" ${t}`), e),
                      [],
                    ).join(", "),
                    { setStyle: u } = o;
                  (eD(e, A, o), u(e, A, f));
                  break;
                case en:
                case ea:
                case ei: {
                  let t = ec[a.actionTypeId],
                    i = Math.round(n.rValue),
                    r = Math.round(n.gValue),
                    c = Math.round(n.bValue),
                    d = n.aValue;
                  (eD(e, t, o),
                    l(
                      e,
                      t,
                      d >= 1
                        ? `rgb(${i},${r},${c})`
                        : `rgba(${i},${r},${c},${d})`,
                    ));
                  break;
                }
                default: {
                  let { unit: t = "" } = a.config;
                  (eD(e, i, o), l(e, i, n.value + t));
                }
              }
            })(e, 0, n, i, o, l);
          case Y:
            var w = e,
              M = i,
              V = l;
            let { setStyle: x } = V;
            if (M.actionTypeId === eo) {
              let { value: e } = M.config;
              x(w, F, e === _ && I.IS_BROWSER_ENV ? I.FLEX_PREFIXED : e);
            }
            return;
          case j: {
            let { actionTypeId: e } = i;
            if ((0, p.isPluginType)(e)) return (0, p.renderPlugin)(e)(d, t, i);
          }
        }
      }
      let eV = {
          [z]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
          [$]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
          [q]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
          [K]: Object.freeze({ xValue: 0, yValue: 0 }),
        },
        ex = Object.freeze({
          blur: 0,
          "hue-rotate": 0,
          invert: 0,
          grayscale: 0,
          saturate: 100,
          sepia: 0,
          contrast: 100,
          brightness: 100,
        }),
        eU = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 }),
        eP = (e, t) => {
          let n = (0, l.default)(t.filters, ({ type: t }) => t === e);
          if (n && n.unit) return n.unit;
          switch (e) {
            case "blur":
              return "px";
            case "hue-rotate":
              return "deg";
            default:
              return "%";
          }
        },
        eG = Object.keys(eV),
        eF = /^rgb/,
        ek = RegExp("rgba?\\(([^)]+)\\)");
      function eD(e, t, n) {
        if (!I.IS_BROWSER_ENV) return;
        let a = ed[t];
        if (!a) return;
        let { getStyle: i, setStyle: o } = n,
          r = i(e, k);
        if (!r) return void o(e, k, a);
        let l = r.split(B).map(el);
        -1 === l.indexOf(a) && o(e, k, l.concat(a).join(B));
      }
      function eB(e, t, n) {
        if (!I.IS_BROWSER_ENV) return;
        let a = ed[t];
        if (!a) return;
        let { getStyle: i, setStyle: o } = n,
          r = i(e, k);
        r &&
          -1 !== r.indexOf(a) &&
          o(
            e,
            k,
            r
              .split(B)
              .map(el)
              .filter((e) => e !== a)
              .join(B),
          );
      }
      function eX({ store: e, elementApi: t }) {
        let { ixData: n } = e.getState(),
          { events: a = {}, actionLists: i = {} } = n;
        (Object.keys(a).forEach((e) => {
          let n = a[e],
            { config: o } = n.action,
            { actionListId: r } = o,
            l = i[r];
          l && eW({ actionList: l, event: n, elementApi: t });
        }),
          Object.keys(i).forEach((e) => {
            eW({ actionList: i[e], elementApi: t });
          }));
      }
      function eW({ actionList: e = {}, event: t, elementApi: n }) {
        let { actionItemGroups: a, continuousParameterGroups: i } = e;
        (a &&
          a.forEach((e) => {
            eH({ actionGroup: e, event: t, elementApi: n });
          }),
          i &&
            i.forEach((e) => {
              let { continuousActionGroups: a } = e;
              a.forEach((e) => {
                eH({ actionGroup: e, event: t, elementApi: n });
              });
            }));
      }
      function eH({ actionGroup: e, event: t, elementApi: n }) {
        let { actionItems: a } = e;
        a.forEach((e) => {
          let a,
            { actionTypeId: i, config: o } = e;
          ((a = (0, p.isPluginType)(i)
            ? (t) => (0, p.clearPlugin)(i)(t, e)
            : eQ({ effect: ej, actionTypeId: i, elementApi: n })),
            eb({ config: o, event: t, elementApi: n }).forEach(a));
        });
      }
      function eY(e, t, n) {
        let { setStyle: a, getStyle: i } = n,
          { actionTypeId: o } = t;
        if (o === et) {
          let { config: n } = t;
          (n.widthUnit === D && a(e, N, ""), n.heightUnit === D && a(e, C, ""));
        }
        i(e, k) && eQ({ effect: eB, actionTypeId: o, elementApi: n })(e);
      }
      let eQ =
        ({ effect: e, actionTypeId: t, elementApi: n }) =>
        (a) => {
          switch (t) {
            case z:
            case $:
            case q:
            case K:
              e(a, I.TRANSFORM_PREFIXED, n);
              break;
            case J:
              e(a, h, n);
              break;
            case ee:
              e(a, A, n);
              break;
            case Z:
              e(a, S, n);
              break;
            case et:
              (e(a, N, n), e(a, C, n));
              break;
            case en:
            case ea:
            case ei:
              e(a, ec[t], n);
              break;
            case eo:
              e(a, F, n);
          }
        };
      function ej(e, t, n) {
        let { setStyle: a } = n;
        (eB(e, t, n),
          a(e, t, ""),
          t === I.TRANSFORM_PREFIXED && a(e, I.TRANSFORM_STYLE_PREFIXED, ""));
      }
      function ez(e) {
        let t = 0,
          n = 0;
        return (
          e.forEach((e, a) => {
            let { config: i } = e,
              o = i.delay + i.duration;
            o >= t && ((t = o), (n = a));
          }),
          n
        );
      }
      function e$(e, t) {
        let { actionItemGroups: n, useFirstGroupAsInitialState: a } = e,
          { actionItem: i, verboseTimeElapsed: o = 0 } = t,
          r = 0,
          l = 0;
        return (
          n.forEach((e, t) => {
            if (a && 0 === t) return;
            let { actionItems: n } = e,
              c = n[ez(n)],
              { config: d, actionTypeId: s } = c;
            i.id === c.id && (l = r + o);
            let f = eC(s) === Y ? 0 : d.duration;
            r += d.delay + f;
          }),
          r > 0 ? (0, f.optimizeFloat)(l / r) : 0
        );
      }
      function eq({ actionList: e, actionItemId: t, rawData: n }) {
        let { actionItemGroups: a, continuousParameterGroups: i } = e,
          o = [],
          r = (e) => (
            o.push((0, c.mergeIn)(e, ["config"], { delay: 0, duration: 0 })),
            e.id === t
          );
        return (
          a && a.some(({ actionItems: e }) => e.some(r)),
          i &&
            i.some((e) => {
              let { continuousActionGroups: t } = e;
              return t.some(({ actionItems: e }) => e.some(r));
            }),
          (0, c.setIn)(n, ["actionLists"], {
            [e.id]: { id: e.id, actionItemGroups: [{ actionItems: o }] },
          })
        );
      }
      function eK(e, { basedOn: t }) {
        return (
          (e === d.EventTypeConsts.SCROLLING_IN_VIEW &&
            (t === d.EventBasedOn.ELEMENT || null == t)) ||
          (e === d.EventTypeConsts.MOUSE_MOVE && t === d.EventBasedOn.ELEMENT)
        );
      }
      function eZ(e, t) {
        return e + X + t;
      }
      function eJ(e, t) {
        return null == t || -1 !== e.indexOf(t);
      }
      function e0(e, t) {
        return (0, s.default)(e && e.sort(), t && t.sort());
      }
      function e1(e) {
        if ("string" == typeof e) return e;
        if (e.pluginElement && e.objectId)
          return e.pluginElement + W + e.objectId;
        if (e.objectId) return e.objectId;
        let { id: t = "", selector: n = "", useEventTarget: a = "" } = e;
        return t + W + n + W + a;
      }
    },
    7164: function (e, t) {
      "use strict";
      function n(e, t) {
        return e === t
          ? 0 !== e || 0 !== t || 1 / e == 1 / t
          : e != e && t != t;
      }
      (Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "default", {
          enumerable: !0,
          get: function () {
            return a;
          },
        }));
      let a = function (e, t) {
        if (n(e, t)) return !0;
        if (
          "object" != typeof e ||
          null === e ||
          "object" != typeof t ||
          null === t
        )
          return !1;
        let a = Object.keys(e),
          i = Object.keys(t);
        if (a.length !== i.length) return !1;
        for (let i = 0; i < a.length; i++)
          if (!Object.hasOwn(t, a[i]) || !n(e[a[i]], t[a[i]])) return !1;
        return !0;
      };
    },
    5861: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var a = {
        createElementState: function () {
          return L;
        },
        ixElements: function () {
          return v;
        },
        mergeActionState: function () {
          return R;
        },
      };
      for (var i in a)
        Object.defineProperty(t, i, { enumerable: !0, get: a[i] });
      let o = n(1185),
        r = n(7087),
        {
          HTML_ELEMENT: l,
          PLAIN_OBJECT: c,
          ABSTRACT_NODE: d,
          CONFIG_X_VALUE: s,
          CONFIG_Y_VALUE: f,
          CONFIG_Z_VALUE: u,
          CONFIG_VALUE: p,
          CONFIG_X_UNIT: I,
          CONFIG_Y_UNIT: g,
          CONFIG_Z_UNIT: T,
          CONFIG_UNIT: E,
        } = r.IX2EngineConstants,
        {
          IX2_SESSION_STOPPED: y,
          IX2_INSTANCE_ADDED: m,
          IX2_ELEMENT_STATE_CHANGED: b,
        } = r.IX2EngineActionTypes,
        O = {},
        v = (e = O, t = {}) => {
          switch (t.type) {
            case y:
              return O;
            case m: {
              let {
                  elementId: n,
                  element: a,
                  origin: i,
                  actionItem: r,
                  refType: l,
                } = t.payload,
                { actionTypeId: c } = r,
                d = e;
              return (
                (0, o.getIn)(d, [n, a]) !== a && (d = L(d, a, l, n, r)),
                R(d, n, c, i, r)
              );
            }
            case b: {
              let {
                elementId: n,
                actionTypeId: a,
                current: i,
                actionItem: o,
              } = t.payload;
              return R(e, n, a, i, o);
            }
            default:
              return e;
          }
        };
      function L(e, t, n, a, i) {
        let r =
          n === c ? (0, o.getIn)(i, ["config", "target", "objectId"]) : null;
        return (0, o.mergeIn)(e, [a], { id: a, ref: t, refId: r, refType: n });
      }
      function R(e, t, n, a, i) {
        let r = (function (e) {
          let { config: t } = e;
          return _.reduce((e, n) => {
            let a = n[0],
              i = n[1],
              o = t[a],
              r = t[i];
            return (null != o && null != r && (e[i] = r), e);
          }, {});
        })(i);
        return (0, o.mergeIn)(e, [t, "refState", n], a, r);
      }
      let _ = [
        [s, I],
        [f, g],
        [u, T],
        [p, E],
      ];
    },
    9947: function () {
      Webflow.require("ix2").init({
        events: {
          e: {
            id: "e",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-2",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".learn-more-link",
              originalId:
                "6988c7b559f02cbdf41804db|3a116d1c-59db-f79b-389b-29bad02e6c1a",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".learn-more-link",
                originalId:
                  "6988c7b559f02cbdf41804db|3a116d1c-59db-f79b-389b-29bad02e6c1a",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c52f36d47,
          },
          "e-2": {
            id: "e-2",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-2",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".learn-more-link",
              originalId:
                "6988c7b559f02cbdf41804db|3a116d1c-59db-f79b-389b-29bad02e6c1a",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".learn-more-link",
                originalId:
                  "6988c7b559f02cbdf41804db|3a116d1c-59db-f79b-389b-29bad02e6c1a",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c52f36d56,
          },
          "e-3": {
            id: "e-3",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-3",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-4",
              },
            },
            mediaQueries: ["main", "medium"],
            target: {
              selector: ".integration-card",
              originalId:
                "6988c7b559f02cbdf41804db|d69e3745-bb4f-e109-4ebc-e9283177e3a3",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".integration-card",
                originalId:
                  "6988c7b559f02cbdf41804db|d69e3745-bb4f-e109-4ebc-e9283177e3a3",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c52fd8ee5,
          },
          "e-4": {
            id: "e-4",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-4",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-3",
              },
            },
            mediaQueries: ["main", "medium"],
            target: {
              selector: ".integration-card",
              originalId:
                "6988c7b559f02cbdf41804db|d69e3745-bb4f-e109-4ebc-e9283177e3a3",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".integration-card",
                originalId:
                  "6988c7b559f02cbdf41804db|d69e3745-bb4f-e109-4ebc-e9283177e3a3",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c52fd8ee6,
          },
          "e-7": {
            id: "e-7",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-7",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-8",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".button-01",
              originalId: "708a7636-0ce3-365a-56c3-a0569608f879",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".button-01",
                originalId: "708a7636-0ce3-365a-56c3-a0569608f879",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c65afc496,
          },
          "e-8": {
            id: "e-8",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-8",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-7",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".button-01",
              originalId: "708a7636-0ce3-365a-56c3-a0569608f879",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".button-01",
                originalId: "708a7636-0ce3-365a-56c3-a0569608f879",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c65afc496,
          },
          "e-9": {
            id: "e-9",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-9",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-10",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".button-02",
              originalId: "fb940ba0-655f-15b3-f5ed-74f65a8105b6",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".button-02",
                originalId: "fb940ba0-655f-15b3-f5ed-74f65a8105b6",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c6cb28614,
          },
          "e-10": {
            id: "e-10",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-10",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-9",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".button-02",
              originalId: "fb940ba0-655f-15b3-f5ed-74f65a8105b6",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".button-02",
                originalId: "fb940ba0-655f-15b3-f5ed-74f65a8105b6",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c6cb28614,
          },
          "e-11": {
            id: "e-11",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-11",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-12",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d9|02670818-33f9-63b8-6a98-036fe44cc74d",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d9|02670818-33f9-63b8-6a98-036fe44cc74d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c6cb60a4c,
          },
          "e-12": {
            id: "e-12",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-12",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-11",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d9|02670818-33f9-63b8-6a98-036fe44cc74d",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d9|02670818-33f9-63b8-6a98-036fe44cc74d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c6cb60a4c,
          },
          "e-13": {
            id: "e-13",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-13",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-14",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d9|78ff06f0-b889-9fc3-fc25-2379217051c6",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d9|78ff06f0-b889-9fc3-fc25-2379217051c6",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c6cbc8f31,
          },
          "e-14": {
            id: "e-14",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-14",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-13",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d9|78ff06f0-b889-9fc3-fc25-2379217051c6",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d9|78ff06f0-b889-9fc3-fc25-2379217051c6",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c6cbc8f32,
          },
          "e-15": {
            id: "e-15",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-15",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-16",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".button-03",
              originalId: "e537a4e2-180c-469c-f516-44a50adb5d6f",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".button-03",
                originalId: "e537a4e2-180c-469c-f516-44a50adb5d6f",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c6d2a5e54,
          },
          "e-16": {
            id: "e-16",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-16",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-15",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".button-03",
              originalId: "e537a4e2-180c-469c-f516-44a50adb5d6f",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".button-03",
                originalId: "e537a4e2-180c-469c-f516-44a50adb5d6f",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c6d2a5e55,
          },
          "e-17": {
            id: "e-17",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-17",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-18",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".core-marquee",
              originalId:
                "6988c7b559f02cbdf41804d8|b886863d-f924-53e4-40ec-851283c77450",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".core-marquee",
                originalId:
                  "6988c7b559f02cbdf41804d8|b886863d-f924-53e4-40ec-851283c77450",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !0,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c71713442,
          },
          "e-19": {
            id: "e-19",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-18",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-20",
              },
            },
            mediaQueries: ["main", "medium"],
            target: {
              selector: ".offer-card",
              originalId: "ace37249-2cf1-7e3b-517a-a5059ad372f8",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".offer-card",
                originalId: "ace37249-2cf1-7e3b-517a-a5059ad372f8",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c7188a925,
          },
          "e-20": {
            id: "e-20",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-19",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-19",
              },
            },
            mediaQueries: ["main", "medium"],
            target: {
              selector: ".offer-card",
              originalId: "ace37249-2cf1-7e3b-517a-a5059ad372f8",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".offer-card",
                originalId: "ace37249-2cf1-7e3b-517a-a5059ad372f8",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c7188a925,
          },
          "e-21": {
            id: "e-21",
            name: "",
            animationType: "custom",
            eventTypeId: "TAB_ACTIVE",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-20",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-22",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".partner-tab-link",
              originalId:
                "6988c7b559f02cbdf41804d7|3d543b88-900b-1ee1-0f0a-f3f26cb2e19d",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".partner-tab-link",
                originalId:
                  "6988c7b559f02cbdf41804d7|3d543b88-900b-1ee1-0f0a-f3f26cb2e19d",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c8b2f4506,
          },
          "e-22": {
            id: "e-22",
            name: "",
            animationType: "custom",
            eventTypeId: "TAB_INACTIVE",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-21",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-21",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".partner-tab-link",
              originalId:
                "6988c7b559f02cbdf41804d7|3d543b88-900b-1ee1-0f0a-f3f26cb2e19d",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".partner-tab-link",
                originalId:
                  "6988c7b559f02cbdf41804d7|3d543b88-900b-1ee1-0f0a-f3f26cb2e19d",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c8b2f450a,
          },
          "e-23": {
            id: "e-23",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-22",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-24",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".trust-marquee",
              originalId:
                "6988c7b559f02cbdf41804d7|19a4ba3c-6c80-f0b6-dd3e-f70e502bb270",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".trust-marquee",
                originalId:
                  "6988c7b559f02cbdf41804d7|19a4ba3c-6c80-f0b6-dd3e-f70e502bb270",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !0,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c8bc3d591,
          },
          "e-27": {
            id: "e-27",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-25",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-28",
              },
            },
            mediaQueries: ["main", "medium"],
            target: {
              selector: ".team-list",
              originalId: "77633963-af0b-60d0-1c9d-03f61246df0b",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".team-list",
                originalId: "77633963-af0b-60d0-1c9d-03f61246df0b",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c8bdea0a6,
          },
          "e-28": {
            id: "e-28",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-26",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-27",
              },
            },
            mediaQueries: ["main", "medium"],
            target: {
              selector: ".team-list",
              originalId: "77633963-af0b-60d0-1c9d-03f61246df0b",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".team-list",
                originalId: "77633963-af0b-60d0-1c9d-03f61246df0b",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c8bdea0a6,
          },
          "e-29": {
            id: "e-29",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-27",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".journey-list",
              originalId:
                "6988c7b559f02cbdf41804d7|268b016e-3a0a-0276-021c-05bee2817a37",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".journey-list",
                originalId:
                  "6988c7b559f02cbdf41804d7|268b016e-3a0a-0276-021c-05bee2817a37",
                appliesTo: "CLASS",
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-27-p",
                smoothing: 80,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x19c8c0d7800,
          },
          "e-30": {
            id: "e-30",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-28",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-31",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".brands-marquee",
              originalId: "9679a656-81cf-e306-90ad-a9b4e3ab6263",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".brands-marquee",
                originalId: "9679a656-81cf-e306-90ad-a9b4e3ab6263",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !0,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c8e8038a8,
          },
          "e-32": {
            id: "e-32",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-29",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-33",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".integration-marquee",
              originalId:
                "6988c7b559f02cbdf41804d6|c803faef-78c3-b4eb-6598-da0063be04d2",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".integration-marquee",
                originalId:
                  "6988c7b559f02cbdf41804d6|c803faef-78c3-b4eb-6598-da0063be04d2",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !0,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c8f1adc5d,
          },
          "e-34": {
            id: "e-34",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-11",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-35",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d6|16e3611e-8e77-8a2d-7202-b024a6c1dc90",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d6|16e3611e-8e77-8a2d-7202-b024a6c1dc90",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c8f272b98,
          },
          "e-35": {
            id: "e-35",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-12",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-34",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d6|16e3611e-8e77-8a2d-7202-b024a6c1dc90",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d6|16e3611e-8e77-8a2d-7202-b024a6c1dc90",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c8f272b98,
          },
          "e-36": {
            id: "e-36",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-13",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-37",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d6|16e3611e-8e77-8a2d-7202-b024a6c1dd76",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d6|16e3611e-8e77-8a2d-7202-b024a6c1dd76",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c8f272b98,
          },
          "e-37": {
            id: "e-37",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-14",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-36",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d6|16e3611e-8e77-8a2d-7202-b024a6c1dd76",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d6|16e3611e-8e77-8a2d-7202-b024a6c1dd76",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c8f272b98,
          },
          "e-38": {
            id: "e-38",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-30",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-39",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".testimonial-marquee",
              originalId:
                "6988c7b559f02cbdf41804d6|33fa2c8d-e424-f535-6d4e-273ae757bc24",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".testimonial-marquee",
                originalId:
                  "6988c7b559f02cbdf41804d6|33fa2c8d-e424-f535-6d4e-273ae757bc24",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !0,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c8f58a51a,
          },
          "e-40": {
            id: "e-40",
            name: "",
            animationType: "custom",
            eventTypeId: "TAB_ACTIVE",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-31",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-41",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".faq-item",
              originalId: "2b70aa79-3716-719a-7f9e-1e1c24f917cd",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".faq-item",
                originalId: "2b70aa79-3716-719a-7f9e-1e1c24f917cd",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c8f77285f,
          },
          "e-41": {
            id: "e-41",
            name: "",
            animationType: "custom",
            eventTypeId: "TAB_INACTIVE",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-32",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-40",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".faq-item",
              originalId: "2b70aa79-3716-719a-7f9e-1e1c24f917cd",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".faq-item",
                originalId: "2b70aa79-3716-719a-7f9e-1e1c24f917cd",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c8f772860,
          },
          "e-42": {
            id: "e-42",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-5",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-43",
              },
            },
            mediaQueries: ["main", "medium"],
            target: {
              selector: ".blog-link",
              originalId:
                "6988c7b559f02cbdf41804d6|0e5960c1-ed43-c606-a07f-3cf0b1d2f822",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".blog-link",
                originalId:
                  "6988c7b559f02cbdf41804d6|0e5960c1-ed43-c606-a07f-3cf0b1d2f822",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c8f8d0fed,
          },
          "e-43": {
            id: "e-43",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-6",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-42",
              },
            },
            mediaQueries: ["main", "medium"],
            target: {
              selector: ".blog-link",
              originalId:
                "6988c7b559f02cbdf41804d6|0e5960c1-ed43-c606-a07f-3cf0b1d2f822",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".blog-link",
                originalId:
                  "6988c7b559f02cbdf41804d6|0e5960c1-ed43-c606-a07f-3cf0b1d2f822",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19c8f8d0fed,
          },
          "e-44": {
            id: "e-44",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-33",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-45",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".credibility-card",
              originalId:
                "6988c7b559f02cbdf41804d8|378fce67-cc60-311c-2be8-9ffd87e6c8c1",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".credibility-card",
                originalId:
                  "6988c7b559f02cbdf41804d8|378fce67-cc60-311c-2be8-9ffd87e6c8c1",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cb4dfd223,
          },
          "e-45": {
            id: "e-45",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-34",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-44",
              },
            },
            mediaQueries: ["main"],
            target: {
              selector: ".credibility-card",
              originalId:
                "6988c7b559f02cbdf41804d8|378fce67-cc60-311c-2be8-9ffd87e6c8c1",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".credibility-card",
                originalId:
                  "6988c7b559f02cbdf41804d8|378fce67-cc60-311c-2be8-9ffd87e6c8c1",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cb4dfd223,
          },
          "e-46": {
            id: "e-46",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-295",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".heading-wrap",
              originalId: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".heading-wrap",
                originalId: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbef6f030,
          },
          "e-48": {
            id: "e-48",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-297",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".brands-main-wrap",
              originalId: "9679a656-81cf-e306-90ad-a9b4e3ab6262",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".brands-main-wrap",
                originalId: "9679a656-81cf-e306-90ad-a9b4e3ab6262",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbef88cfd,
          },
          "e-50": {
            id: "e-50",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-51",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".section-badge-wrap",
              originalId:
                "6988c7b559f02cbdf41804d6|19b82d4a-b955-c9c8-738e-dc30b97fefae",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".section-badge-wrap",
                originalId:
                  "6988c7b559f02cbdf41804d6|19b82d4a-b955-c9c8-738e-dc30b97fefae",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: 0,
              direction: null,
              effectIn: !0,
            },
            createdOn: 0x19cbef8f1bd,
          },
          "e-52": {
            id: "e-52",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-299",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".subtitle-wrap",
              originalId:
                "6988c7b559f02cbdf41804d6|19b82d4a-b955-c9c8-738e-dc30b97fefb4",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".subtitle-wrap",
                originalId:
                  "6988c7b559f02cbdf41804d6|19b82d4a-b955-c9c8-738e-dc30b97fefb4",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbef91c4e,
          },
          "e-54": {
            id: "e-54",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-55",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".purpose-column",
              originalId:
                "6988c7b559f02cbdf41804d6|5543dd09-c395-8481-a890-eea1823b8911",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".purpose-column",
                originalId:
                  "6988c7b559f02cbdf41804d6|5543dd09-c395-8481-a890-eea1823b8911",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbef9485f,
          },
          "e-56": {
            id: "e-56",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-57",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".purpose-list",
              originalId:
                "6988c7b559f02cbdf41804d6|cc647368-e777-9ed3-f91d-44db67adcb22",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".purpose-list",
                originalId:
                  "6988c7b559f02cbdf41804d6|cc647368-e777-9ed3-f91d-44db67adcb22",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbef97eb9,
          },
          "e-58": {
            id: "e-58",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-59",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d6|d3257376-35e5-edb3-5d5c-4eb476737964",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d6|d3257376-35e5-edb3-5d5c-4eb476737964",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbefa3260,
          },
          "e-60": {
            id: "e-60",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-61",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d6|01340bc3-a4c6-20dc-77ed-211e7fe453d2",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d6|01340bc3-a4c6-20dc-77ed-211e7fe453d2",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbefa5955,
          },
          "e-62": {
            id: "e-62",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-63",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".value-card",
              originalId: "33320ddc-b2c9-e89f-207e-dd53517116ba",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".value-card",
                originalId: "33320ddc-b2c9-e89f-207e-dd53517116ba",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 2,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf0bba9e,
          },
          "e-64": {
            id: "e-64",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-65",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d6|22ed9de6-7619-8a40-a3c6-8bc45b212eb8",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d6|22ed9de6-7619-8a40-a3c6-8bc45b212eb8",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf0cb9cc,
          },
          "e-66": {
            id: "e-66",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-67",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".process-image-wrap",
              originalId:
                "6988c7b559f02cbdf41804d6|4f97c5f4-8d95-8894-a0df-d54e60fe2614",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".process-image-wrap",
                originalId:
                  "6988c7b559f02cbdf41804d6|4f97c5f4-8d95-8894-a0df-d54e60fe2614",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 2,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf0d3c4f,
          },
          "e-68": {
            id: "e-68",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-69",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d6|84168aaf-c13c-df96-8e02-4d9d8659efcb",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d6|84168aaf-c13c-df96-8e02-4d9d8659efcb",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 8,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf109591,
          },
          "e-70": {
            id: "e-70",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-71",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".pricing-card",
              originalId:
                "6988c7b559f02cbdf41804d6|16e3611e-8e77-8a2d-7202-b024a6c1dc80",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".pricing-card",
                originalId:
                  "6988c7b559f02cbdf41804d6|16e3611e-8e77-8a2d-7202-b024a6c1dc80",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf1119b7,
          },
          "e-72": {
            id: "e-72",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-73",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".testimonial-row",
              originalId:
                "6988c7b559f02cbdf41804d6|aa619aa6-c433-f32b-856c-38a57c8a7a05",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".testimonial-row",
                originalId:
                  "6988c7b559f02cbdf41804d6|aa619aa6-c433-f32b-856c-38a57c8a7a05",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf115f26,
          },
          "e-74": {
            id: "e-74",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-75",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".faq-item",
              originalId: "2b70aa79-3716-719a-7f9e-1e1c24f917e1",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".faq-item",
                originalId: "2b70aa79-3716-719a-7f9e-1e1c24f917e1",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf118cf7,
          },
          "e-76": {
            id: "e-76",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-77",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d6|87de11f8-cb46-cbd6-2a8a-9ffedf45aaa5",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d6|87de11f8-cb46-cbd6-2a8a-9ffedf45aaa5",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf11b967,
          },
          "e-78": {
            id: "e-78",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-79",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".blog-v3-card",
              originalId:
                "6988c7b559f02cbdf41804d6|2419d78e-69f6-66b0-d729-476da14f09a9",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".blog-v3-card",
                originalId:
                  "6988c7b559f02cbdf41804d6|2419d78e-69f6-66b0-d729-476da14f09a9",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf11dd00,
          },
          "e-80": {
            id: "e-80",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-81",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "db697a21-09a1-ed48-2cd7-c1db2cdae4c7",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "db697a21-09a1-ed48-2cd7-c1db2cdae4c7",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf145e57,
          },
          "e-82": {
            id: "e-82",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-83",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "db697a21-09a1-ed48-2cd7-c1db2cdae4cb",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "db697a21-09a1-ed48-2cd7-c1db2cdae4cb",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 10,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf148a0a,
          },
          "e-84": {
            id: "e-84",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-85",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "69fd39d6-f624-60b2-a080-8a263f83cd28",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "69fd39d6-f624-60b2-a080-8a263f83cd28",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf15dd87,
          },
          "e-86": {
            id: "e-86",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-87",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "69fd39d6-f624-60b2-a080-8a263f83cd35",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "69fd39d6-f624-60b2-a080-8a263f83cd35",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf1605b8,
          },
          "e-88": {
            id: "e-88",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-89",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".footer-column",
              originalId: "69fd39d6-f624-60b2-a080-8a263f83cd47",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".footer-column",
                originalId: "69fd39d6-f624-60b2-a080-8a263f83cd47",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf16203f,
          },
          "e-90": {
            id: "e-90",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "FADE_EFFECT",
              instant: !1,
              config: { actionListId: "fadeIn", autoStopEventId: "e-91" },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "69fd39d6-f624-60b2-a080-8a263f83cd75",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "69fd39d6-f624-60b2-a080-8a263f83cd75",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: 100,
              direction: null,
              effectIn: !0,
            },
            createdOn: 0x19cbf163b39,
          },
          "e-92": {
            id: "e-92",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-93",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d7|2a9820da-492b-77e1-8e8f-14f27afdc75d",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d7|2a9820da-492b-77e1-8e8f-14f27afdc75d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf188530,
          },
          "e-94": {
            id: "e-94",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-36",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-95",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d7|2a9820da-492b-77e1-8e8f-14f27afdc760",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d7|2a9820da-492b-77e1-8e8f-14f27afdc760",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf18a093,
          },
          "e-96": {
            id: "e-96",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-37",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-97",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d7|caeba4d9-3b5a-88f8-6561-89bc9a4738c3",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d7|caeba4d9-3b5a-88f8-6561-89bc9a4738c3",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf18c051,
          },
          "e-98": {
            id: "e-98",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-99",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".about-card",
              originalId:
                "6988c7b559f02cbdf41804d7|cab4d58c-9e52-c8bb-cbd9-56a84bed8907",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".about-card",
                originalId:
                  "6988c7b559f02cbdf41804d7|cab4d58c-9e52-c8bb-cbd9-56a84bed8907",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf1a80a3,
          },
          "e-100": {
            id: "e-100",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-101",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".about-icon-wrap",
              originalId:
                "6988c7b559f02cbdf41804d7|4720575e-6660-c26e-bb53-4763a111bbca",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".about-icon-wrap",
                originalId:
                  "6988c7b559f02cbdf41804d7|4720575e-6660-c26e-bb53-4763a111bbca",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf1aa4f0,
          },
          "e-102": {
            id: "e-102",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-103",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d7|9074f472-f1bb-1b12-5c16-220fe08a764a",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d7|9074f472-f1bb-1b12-5c16-220fe08a764a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf1b95b1,
          },
          "e-104": {
            id: "e-104",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-105",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".statistics-number-wrap",
              originalId:
                "6988c7b559f02cbdf41804d7|0a5529bf-5493-b5a2-06cc-cf4bffedd5d2",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".statistics-number-wrap",
                originalId:
                  "6988c7b559f02cbdf41804d7|0a5529bf-5493-b5a2-06cc-cf4bffedd5d2",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf1bcf12,
          },
          "e-106": {
            id: "e-106",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-107",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".statistics-divider",
              originalId:
                "6988c7b559f02cbdf41804d7|74b6ef07-5a54-5226-ecaa-b3f0e4603318",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".statistics-divider",
                originalId:
                  "6988c7b559f02cbdf41804d7|74b6ef07-5a54-5226-ecaa-b3f0e4603318",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: 0,
              direction: null,
              effectIn: !0,
            },
            createdOn: 0x19cbf1beb52,
          },
          "e-108": {
            id: "e-108",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-109",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".partner-left",
              originalId:
                "6988c7b559f02cbdf41804d7|4dfe7127-6383-e513-0762-738eda7c9488",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".partner-left",
                originalId:
                  "6988c7b559f02cbdf41804d7|4dfe7127-6383-e513-0762-738eda7c9488",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 2,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf1dd7b6,
          },
          "e-110": {
            id: "e-110",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-111",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".partner-card",
              originalId:
                "6988c7b559f02cbdf41804d7|054cb68e-0339-9fa6-62d9-623f4888213b",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".partner-card",
                originalId:
                  "6988c7b559f02cbdf41804d7|054cb68e-0339-9fa6-62d9-623f4888213b",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 2,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf1e073c,
          },
          "e-112": {
            id: "e-112",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-113",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d7|43e14539-417f-cb5f-b783-bbeae5e3e94c",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d7|43e14539-417f-cb5f-b783-bbeae5e3e94c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 5,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf1f7b8b,
          },
          "e-114": {
            id: "e-114",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-115",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d7|b78a08d3-3d9f-0c59-35a6-46d60b72bb9b",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d7|b78a08d3-3d9f-0c59-35a6-46d60b72bb9b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf201743,
          },
          "e-116": {
            id: "e-116",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-117",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".trust-card",
              originalId:
                "6988c7b559f02cbdf41804d7|a48efe53-8d76-a96c-9b7b-1a31617be69e",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".trust-card",
                originalId:
                  "6988c7b559f02cbdf41804d7|a48efe53-8d76-a96c-9b7b-1a31617be69e",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 2,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf217f8a,
          },
          "e-118": {
            id: "e-118",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-119",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d7|19a4ba3c-6c80-f0b6-dd3e-f70e502bb270",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d7|19a4ba3c-6c80-f0b6-dd3e-f70e502bb270",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf21b826,
          },
          "e-120": {
            id: "e-120",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-121",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".team-image-wrap",
              originalId: "77633963-af0b-60d0-1c9d-03f61246df0d",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".team-image-wrap",
                originalId: "77633963-af0b-60d0-1c9d-03f61246df0d",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf21eda6,
          },
          "e-122": {
            id: "e-122",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-123",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".team-bottom-wrap",
              originalId: "77633963-af0b-60d0-1c9d-03f61246df10",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".team-bottom-wrap",
                originalId: "77633963-af0b-60d0-1c9d-03f61246df10",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf22166e,
          },
          "e-124": {
            id: "e-124",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-125",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d8|f56fb82c-c1d4-3448-02c5-2106e43d9c52",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d8|f56fb82c-c1d4-3448-02c5-2106e43d9c52",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf250b82,
          },
          "e-126": {
            id: "e-126",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-36",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-127",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d8|f56fb82c-c1d4-3448-02c5-2106e43d9c55",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d8|f56fb82c-c1d4-3448-02c5-2106e43d9c55",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf252629,
          },
          "e-128": {
            id: "e-128",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-37",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-129",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d8|46652269-19fc-43f8-f477-6aef007fb685",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d8|46652269-19fc-43f8-f477-6aef007fb685",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf25449c,
          },
          "e-130": {
            id: "e-130",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-131",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".core-card",
              originalId:
                "6988c7b559f02cbdf41804d8|82b06543-c945-36ca-aefd-2d931675bd42",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".core-card",
                originalId:
                  "6988c7b559f02cbdf41804d8|82b06543-c945-36ca-aefd-2d931675bd42",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 5,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf25e8f5,
          },
          "e-132": {
            id: "e-132",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-133",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".core-details-wrap",
              originalId:
                "6988c7b559f02cbdf41804d8|36aa3a77-1c08-cade-615f-66049c76110f",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".core-details-wrap",
                originalId:
                  "6988c7b559f02cbdf41804d8|36aa3a77-1c08-cade-615f-66049c76110f",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf268c95,
          },
          "e-134": {
            id: "e-134",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-135",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d8|6624ae6e-ec7f-8b2c-ccd1-15747c65b17d",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d8|6624ae6e-ec7f-8b2c-ccd1-15747c65b17d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf26fac8,
          },
          "e-136": {
            id: "e-136",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "SLIDE_EFFECT",
              instant: !1,
              config: { actionListId: "slideInLeft", autoStopEventId: "e-137" },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d8|833000c2-8e9a-1e06-0d63-24d4d3be3eb9",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d8|833000c2-8e9a-1e06-0d63-24d4d3be3eb9",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 2,
              scrollOffsetUnit: "%",
              delay: 100,
              direction: "LEFT",
              effectIn: !0,
            },
            createdOn: 0x19cbf272196,
          },
          "e-138": {
            id: "e-138",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "SLIDE_EFFECT",
              instant: !1,
              config: {
                actionListId: "slideInRight",
                autoStopEventId: "e-139",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d8|68488784-fcc1-7101-82c3-4040277ed675",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d8|68488784-fcc1-7101-82c3-4040277ed675",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 5,
              scrollOffsetUnit: "%",
              delay: 100,
              direction: "RIGHT",
              effectIn: !0,
            },
            createdOn: 0x19cbf276777,
          },
          "e-140": {
            id: "e-140",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-141",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".core-bottom-wrap",
              originalId:
                "6988c7b559f02cbdf41804d8|456ecffe-f51f-fbca-03f4-e83a27f50069",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".core-bottom-wrap",
                originalId:
                  "6988c7b559f02cbdf41804d8|456ecffe-f51f-fbca-03f4-e83a27f50069",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf280086,
          },
          "e-142": {
            id: "e-142",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-143",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d8|c2091eec-7609-f367-c835-5f7b9c16e7be",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d8|c2091eec-7609-f367-c835-5f7b9c16e7be",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf2a2330,
          },
          "e-144": {
            id: "e-144",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-145",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d8|07aef674-81de-5192-254c-35dbc99ceb0e",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d8|07aef674-81de-5192-254c-35dbc99ceb0e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf2a59a7,
          },
          "e-146": {
            id: "e-146",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-147",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".offer-card",
              originalId: "ace37249-2cf1-7e3b-517a-a5059ad372f8",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".offer-card",
                originalId: "ace37249-2cf1-7e3b-517a-a5059ad372f8",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 5,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf2b1ef0,
          },
          "e-148": {
            id: "e-148",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-149",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".credibility-card",
              originalId:
                "6988c7b559f02cbdf41804d8|378fce67-cc60-311c-2be8-9ffd87e6c8c1",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".credibility-card",
                originalId:
                  "6988c7b559f02cbdf41804d8|378fce67-cc60-311c-2be8-9ffd87e6c8c1",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf2d7b77,
          },
          "e-150": {
            id: "e-150",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-151",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".credibility-icon-wrap",
              originalId:
                "6988c7b559f02cbdf41804d8|7a025c03-d16d-f94a-2193-8cd595f32e9c",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".credibility-icon-wrap",
                originalId:
                  "6988c7b559f02cbdf41804d8|7a025c03-d16d-f94a-2193-8cd595f32e9c",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf2db03f,
          },
          "e-152": {
            id: "e-152",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-153",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".credibility-text-wrap",
              originalId:
                "6988c7b559f02cbdf41804d8|550ce499-6205-c50a-910c-fe30523d72a4",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".credibility-text-wrap",
                originalId:
                  "6988c7b559f02cbdf41804d8|550ce499-6205-c50a-910c-fe30523d72a4",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf2de607,
          },
          "e-154": {
            id: "e-154",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-155",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d8|f4f30540-2de7-dd3e-137f-59ba10a239b1",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d8|f4f30540-2de7-dd3e-137f-59ba10a239b1",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf2e2599,
          },
          "e-156": {
            id: "e-156",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-157",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d8|b041f0a8-a4d3-0bc4-fe01-f7f70fb21a9d",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d8|b041f0a8-a4d3-0bc4-fe01-f7f70fb21a9d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf2e8b79,
          },
          "e-158": {
            id: "e-158",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-159",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d8|eebdd0ef-73d1-7f0f-9e4a-d350bf8daca8",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d8|eebdd0ef-73d1-7f0f-9e4a-d350bf8daca8",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf2ebaca,
          },
          "e-160": {
            id: "e-160",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-161",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d8|539a2397-a26b-4bec-419a-e7e5369e5a43",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d8|539a2397-a26b-4bec-419a-e7e5369e5a43",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf2ef5ca,
          },
          "e-162": {
            id: "e-162",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-163",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d8|5b9bc2b5-2909-50ed-3527-cd4de39152db",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d8|5b9bc2b5-2909-50ed-3527-cd4de39152db",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf302e42,
          },
          "e-164": {
            id: "e-164",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-165",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".insight-title-wrap",
              originalId:
                "6988c7b559f02cbdf41804d8|66084031-e5a4-396c-51fc-a640f8afd27c",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".insight-title-wrap",
                originalId:
                  "6988c7b559f02cbdf41804d8|66084031-e5a4-396c-51fc-a640f8afd27c",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf3076d9,
          },
          "e-166": {
            id: "e-166",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-167",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".insight-features-list",
              originalId:
                "6988c7b559f02cbdf41804d8|87e83dd7-c5a4-1188-6a1f-d7f16285bd8a",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".insight-features-list",
                originalId:
                  "6988c7b559f02cbdf41804d8|87e83dd7-c5a4-1188-6a1f-d7f16285bd8a",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf30c02b,
          },
          "e-168": {
            id: "e-168",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-169",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d8|9de75891-406f-3769-59ee-05c6ac6c2f0d",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d8|9de75891-406f-3769-59ee-05c6ac6c2f0d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 5,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf31689d,
          },
          "e-170": {
            id: "e-170",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-171",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d8|98f2a204-f03c-8d83-1d17-030a2d15fb43",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d8|98f2a204-f03c-8d83-1d17-030a2d15fb43",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf31c673,
          },
          "e-172": {
            id: "e-172",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-173",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".numbers-list",
              originalId:
                "6988c7b559f02cbdf41804d8|b35c591b-a928-24dd-0b85-50573e922996",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".numbers-list",
                originalId:
                  "6988c7b559f02cbdf41804d8|b35c591b-a928-24dd-0b85-50573e922996",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf33d172,
          },
          "e-174": {
            id: "e-174",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-175",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".number-divider",
              originalId:
                "6988c7b559f02cbdf41804d8|b594a295-fa51-351e-40dd-6fafe462e1a4",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".number-divider",
                originalId:
                  "6988c7b559f02cbdf41804d8|b594a295-fa51-351e-40dd-6fafe462e1a4",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf3416a2,
          },
          "e-176": {
            id: "e-176",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-177",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d9|8a5857e7-6fd1-3d8e-4a9a-6832cea03938",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d9|8a5857e7-6fd1-3d8e-4a9a-6832cea03938",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf3c8280,
          },
          "e-178": {
            id: "e-178",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-36",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-179",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d9|8a5857e7-6fd1-3d8e-4a9a-6832cea0393b",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d9|8a5857e7-6fd1-3d8e-4a9a-6832cea0393b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf3ca59e,
          },
          "e-180": {
            id: "e-180",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-37",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-181",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d9|f70e0687-cb32-b441-e9e3-fb6c05941cd8",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d9|f70e0687-cb32-b441-e9e3-fb6c05941cd8",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf3ccf6d,
          },
          "e-182": {
            id: "e-182",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-183",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d9|701e7c5e-de68-b482-3841-6fb52a7979ba",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d9|701e7c5e-de68-b482-3841-6fb52a7979ba",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf566e60,
          },
          "e-184": {
            id: "e-184",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-185",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".compare-row",
              originalId:
                "6988c7b559f02cbdf41804d9|65af6522-ef63-59bb-b5ba-36ca565cfc96",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".compare-row",
                originalId:
                  "6988c7b559f02cbdf41804d9|65af6522-ef63-59bb-b5ba-36ca565cfc96",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf56a08f,
          },
          "e-186": {
            id: "e-186",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-187",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804da|9b952a74-9e8c-c044-dd2f-becdeae025af",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804da|9b952a74-9e8c-c044-dd2f-becdeae025af",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf56fad0,
          },
          "e-188": {
            id: "e-188",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-36",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-189",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804da|9b952a74-9e8c-c044-dd2f-becdeae025b2",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804da|9b952a74-9e8c-c044-dd2f-becdeae025b2",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf571135,
          },
          "e-190": {
            id: "e-190",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-37",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-191",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804da|8cd2f50e-762c-6204-9da9-a308fe420ec8",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804da|8cd2f50e-762c-6204-9da9-a308fe420ec8",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf572d38,
          },
          "e-192": {
            id: "e-192",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-38",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-193",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804da|c7a862b6-ef33-9829-ed8c-a8eb3b0a509d",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804da|c7a862b6-ef33-9829-ed8c-a8eb3b0a509d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf585dc8,
          },
          "e-194": {
            id: "e-194",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-195",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".blog-v2-card",
              originalId:
                "6988c7b559f02cbdf41804da|63bbc17a-6aef-5972-88e9-443c5c6e7c01",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".blog-v2-card",
                originalId:
                  "6988c7b559f02cbdf41804da|63bbc17a-6aef-5972-88e9-443c5c6e7c01",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf58b0a7,
          },
          "e-196": {
            id: "e-196",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-197",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804db|2f29a74b-40bc-c45e-f1a5-0373154d3af6",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804db|2f29a74b-40bc-c45e-f1a5-0373154d3af6",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf590fdf,
          },
          "e-198": {
            id: "e-198",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-36",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-199",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804db|82e92ca4-bd29-4247-37ca-1aacb4c4ba72",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804db|82e92ca4-bd29-4247-37ca-1aacb4c4ba72",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf593251,
          },
          "e-200": {
            id: "e-200",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-37",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-201",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804db|5cad5aa2-9e92-8a87-7d9b-7a8f8b4c28e0",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804db|5cad5aa2-9e92-8a87-7d9b-7a8f8b4c28e0",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf594e6e,
          },
          "e-202": {
            id: "e-202",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-38",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-203",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804db|c29018bd-575f-2106-e878-bc64656f0375",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804db|c29018bd-575f-2106-e878-bc64656f0375",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf598129,
          },
          "e-204": {
            id: "e-204",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-205",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804db|f8b48c64-872b-685e-9ead-4e55fff78061",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804db|f8b48c64-872b-685e-9ead-4e55fff78061",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 2,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf59a107,
          },
          "e-206": {
            id: "e-206",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-207",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804dc|55eb02d9-f4c1-5fc8-3c96-f3fd60e5deec",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804dc|55eb02d9-f4c1-5fc8-3c96-f3fd60e5deec",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf5bbdea,
          },
          "e-208": {
            id: "e-208",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-36",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-209",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804dc|55eb02d9-f4c1-5fc8-3c96-f3fd60e5deef",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804dc|55eb02d9-f4c1-5fc8-3c96-f3fd60e5deef",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf5be056,
          },
          "e-210": {
            id: "e-210",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-37",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-211",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804dc|d2dadd2d-10f0-3a59-83f3-b66852ec78fc",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804dc|d2dadd2d-10f0-3a59-83f3-b66852ec78fc",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf5c0627,
          },
          "e-212": {
            id: "e-212",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-213",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".contact-v1-list",
              originalId:
                "6988c7b559f02cbdf41804dc|cc6910e2-d543-aa0b-fc71-c48e795a1989",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".contact-v1-list",
                originalId:
                  "6988c7b559f02cbdf41804dc|cc6910e2-d543-aa0b-fc71-c48e795a1989",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf5cb652,
          },
          "e-214": {
            id: "e-214",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-215",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804dc|5f1a069a-b7cd-9ff6-c627-c686b84f6185",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804dc|5f1a069a-b7cd-9ff6-c627-c686b84f6185",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf5db93f,
          },
          "e-216": {
            id: "e-216",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-37",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-217",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804dd|6f48d36a-8b96-d36f-01bc-80f145c3964c",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804dd|6f48d36a-8b96-d36f-01bc-80f145c3964c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf5f5c33,
          },
          "e-218": {
            id: "e-218",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-219",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804dd|a46a042c-7171-3677-c9da-a3ae1f31daed",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804dd|a46a042c-7171-3677-c9da-a3ae1f31daed",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf5f8972,
          },
          "e-220": {
            id: "e-220",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-36",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-221",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804dd|1d422544-591e-3fa6-9811-5d15d67e829c",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804dd|1d422544-591e-3fa6-9811-5d15d67e829c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf5facd3,
          },
          "e-222": {
            id: "e-222",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-223",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".login-left",
              originalId:
                "6988c7b559f02cbdf41804df|35778a71-df56-a8a2-8771-611f7ff1a277",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".login-left",
                originalId:
                  "6988c7b559f02cbdf41804df|35778a71-df56-a8a2-8771-611f7ff1a277",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf6007fb,
          },
          "e-224": {
            id: "e-224",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-225",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".login-right",
              originalId:
                "6988c7b559f02cbdf41804df|c14333a6-0e73-b6c9-fc82-5736c9b177ac",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".login-right",
                originalId:
                  "6988c7b559f02cbdf41804df|c14333a6-0e73-b6c9-fc82-5736c9b177ac",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf6032fb,
          },
          "e-226": {
            id: "e-226",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-227",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804e2|480c13bc-87f8-1ce1-656d-c19ddf2d3e67",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804e2|480c13bc-87f8-1ce1-656d-c19ddf2d3e67",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf616c43,
          },
          "e-228": {
            id: "e-228",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-36",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-229",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804e2|480c13bc-87f8-1ce1-656d-c19ddf2d3e6a",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804e2|480c13bc-87f8-1ce1-656d-c19ddf2d3e6a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf618549,
          },
          "e-230": {
            id: "e-230",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-37",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-231",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804e2|a549675c-2035-645b-6a1f-b2d206e40272",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804e2|a549675c-2035-645b-6a1f-b2d206e40272",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf61a7d1,
          },
          "e-232": {
            id: "e-232",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-233",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804e2|7d71a498-42ca-dc91-e41c-b95a1ee8356d",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804e2|7d71a498-42ca-dc91-e41c-b95a1ee8356d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf61f2f3,
          },
          "e-234": {
            id: "e-234",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-235",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".typography-list",
              originalId:
                "6988c7b559f02cbdf41804e2|799ef01a-b79c-4ed2-cca9-eacf97f83606",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".typography-list",
                originalId:
                  "6988c7b559f02cbdf41804e2|799ef01a-b79c-4ed2-cca9-eacf97f83606",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf621cec,
          },
          "e-236": {
            id: "e-236",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-237",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".color-list",
              originalId:
                "6988c7b559f02cbdf41804e2|59502d17-25ac-056c-bc63-69cec0c5bde4",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".color-list",
                originalId:
                  "6988c7b559f02cbdf41804e2|59502d17-25ac-056c-bc63-69cec0c5bde4",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf624439,
          },
          "e-238": {
            id: "e-238",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-239",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804e2|d216d835-3a96-851f-781a-4205cb0a1f0e",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804e2|d216d835-3a96-851f-781a-4205cb0a1f0e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf6440d5,
          },
          "e-240": {
            id: "e-240",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-241",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804e3|7bc5b38b-cc20-0379-160b-d2bafd21775c",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804e3|7bc5b38b-cc20-0379-160b-d2bafd21775c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf6532f5,
          },
          "e-242": {
            id: "e-242",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-36",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-243",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804e3|7bc5b38b-cc20-0379-160b-d2bafd21775f",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804e3|7bc5b38b-cc20-0379-160b-d2bafd21775f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf655012,
          },
          "e-244": {
            id: "e-244",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-37",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-245",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804e3|7bc5b38b-cc20-0379-160b-d2bafd217769",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804e3|7bc5b38b-cc20-0379-160b-d2bafd217769",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf658cad,
          },
          "e-246": {
            id: "e-246",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-247",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".style-guide-link",
              originalId:
                "6988c7b559f02cbdf41804e3|7bc5b38b-cc20-0379-160b-d2bafd21776e",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".style-guide-link",
                originalId:
                  "6988c7b559f02cbdf41804e3|7bc5b38b-cc20-0379-160b-d2bafd21776e",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf65d384,
          },
          "e-248": {
            id: "e-248",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-249",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".license-list",
              originalId:
                "6988c7b559f02cbdf41804e3|eb4f8c9a-4365-41b0-9031-8db2a29b6eb7",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".license-list",
                originalId:
                  "6988c7b559f02cbdf41804e3|eb4f8c9a-4365-41b0-9031-8db2a29b6eb7",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 2,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf65fa1c,
          },
          "e-250": {
            id: "e-250",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-251",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804e4|7b547b46-ada1-6838-ff43-78cc403a1380",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804e4|7b547b46-ada1-6838-ff43-78cc403a1380",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf667954,
          },
          "e-252": {
            id: "e-252",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-36",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-253",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804e4|7b547b46-ada1-6838-ff43-78cc403a1383",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804e4|7b547b46-ada1-6838-ff43-78cc403a1383",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf66966f,
          },
          "e-254": {
            id: "e-254",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-255",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804e4|7b547b46-ada1-6838-ff43-78cc403a138d",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804e4|7b547b46-ada1-6838-ff43-78cc403a138d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf66c76b,
          },
          "e-256": {
            id: "e-256",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-257",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "698e22a127065e99122b5e0a|c1f84a21-8055-51fb-65be-f4aab7e38a82",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "698e22a127065e99122b5e0a|c1f84a21-8055-51fb-65be-f4aab7e38a82",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf673104,
          },
          "e-258": {
            id: "e-258",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-36",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-259",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "698e22a127065e99122b5e0a|e5b1c213-e36b-7198-414a-712c4dda08d8",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "698e22a127065e99122b5e0a|e5b1c213-e36b-7198-414a-712c4dda08d8",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf676c8b,
          },
          "e-260": {
            id: "e-260",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-37",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-261",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "698e22a127065e99122b5e0a|5107c303-c01e-7d1e-19a6-2906649b82c9",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "698e22a127065e99122b5e0a|5107c303-c01e-7d1e-19a6-2906649b82c9",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf67832e,
          },
          "e-262": {
            id: "e-262",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-38",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-263",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "698e22a127065e99122b5e0a|024d6594-7c4b-9e0e-73d4-7854d1563d44",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "698e22a127065e99122b5e0a|024d6594-7c4b-9e0e-73d4-7854d1563d44",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf67bcff,
          },
          "e-264": {
            id: "e-264",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-265",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".blog-single-details",
              originalId:
                "698e22a127065e99122b5e0a|bf1fc4ca-d3fe-5be0-ea6f-146baf80f3b6",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".blog-single-details",
                originalId:
                  "698e22a127065e99122b5e0a|bf1fc4ca-d3fe-5be0-ea6f-146baf80f3b6",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 2,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf67fd54,
          },
          "e-266": {
            id: "e-266",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-267",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "698e22a127065e99122b5e0a|db8481db-d809-9b29-5031-bf678660d613",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "698e22a127065e99122b5e0a|db8481db-d809-9b29-5031-bf678660d613",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 2,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf683566,
          },
          "e-268": {
            id: "e-268",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-269",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "698e22a127065e99122b5e0a|2f87b180-f0ea-b4ab-f46a-545f68380531",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "698e22a127065e99122b5e0a|2f87b180-f0ea-b4ab-f46a-545f68380531",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf68bb34,
          },
          "e-270": {
            id: "e-270",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-271",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "698e021df79a24dbf4f4a4b5|b8a0bee5-7b6f-21db-ff17-dfd48fb9b487",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "698e021df79a24dbf4f4a4b5|b8a0bee5-7b6f-21db-ff17-dfd48fb9b487",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf6a9728,
          },
          "e-272": {
            id: "e-272",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-36",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-273",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "698e021df79a24dbf4f4a4b5|04ef30d0-9bd3-bf5c-43f2-886c1a726a23",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "698e021df79a24dbf4f4a4b5|04ef30d0-9bd3-bf5c-43f2-886c1a726a23",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf6af1af,
          },
          "e-274": {
            id: "e-274",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-37",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-275",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "698e021df79a24dbf4f4a4b5|17d2dacc-eecd-fb9c-0a9b-eac3c23e4667",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "698e021df79a24dbf4f4a4b5|17d2dacc-eecd-fb9c-0a9b-eac3c23e4667",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf6b1734,
          },
          "e-276": {
            id: "e-276",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-38",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-277",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "698e021df79a24dbf4f4a4b5|f8568aef-db4e-c1b7-4ce0-b89d31a70e77",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "698e021df79a24dbf4f4a4b5|f8568aef-db4e-c1b7-4ce0-b89d31a70e77",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf6bd447,
          },
          "e-278": {
            id: "e-278",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-279",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "698e021df79a24dbf4f4a4b5|d1cd75c8-e438-e7bf-c9c9-aa291aec23d5",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "698e021df79a24dbf4f4a4b5|d1cd75c8-e438-e7bf-c9c9-aa291aec23d5",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf6c1948,
          },
          "e-280": {
            id: "e-280",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-281",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "698e021df79a24dbf4f4a4b5|32f37e70-362e-ebb0-e4de-1ba450e3e3f2",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "698e021df79a24dbf4f4a4b5|32f37e70-362e-ebb0-e4de-1ba450e3e3f2",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf6c3adf,
          },
          "e-282": {
            id: "e-282",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-283",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804ef|73a24e52-2233-92c6-ef6e-6cbd8b633ecb",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804ef|73a24e52-2233-92c6-ef6e-6cbd8b633ecb",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf6de355,
          },
          "e-284": {
            id: "e-284",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-37",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-285",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804ef|bf126718-a9af-0981-f9df-68635afd2f86",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804ef|bf126718-a9af-0981-f9df-68635afd2f86",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf6e18ae,
          },
          "e-286": {
            id: "e-286",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-287",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804f0|e1521063-d279-c21d-6744-6630e6a2c9af",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804f0|e1521063-d279-c21d-6744-6630e6a2c9af",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf6f53e0,
          },
          "e-288": {
            id: "e-288",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-36",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-289",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804f0|1ca1ab61-a01d-7f0f-56d6-68e20ab5f9f8",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804f0|1ca1ab61-a01d-7f0f-56d6-68e20ab5f9f8",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf6f6e08,
          },
          "e-290": {
            id: "e-290",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-37",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-291",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804f0|d01cc9b5-e789-2472-0a00-f2dc3e15ec9b",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804f0|d01cc9b5-e789-2472-0a00-f2dc3e15ec9b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf6f870e,
          },
          "e-292": {
            id: "e-292",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-36",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-293",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804ef|17cfb504-1394-1354-fd5d-c70b28ff8eaa",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804ef|17cfb504-1394-1354-fd5d-c70b28ff8eaa",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cbf702137,
          },
          "e-294": {
            id: "e-294",
            name: "",
            animationType: "custom",
            eventTypeId: "NAVBAR_OPEN",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-39",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-295",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".navbar-container",
              originalId:
                "683e98d0f471f1a56a0ed1b4|f5da96a1-13a6-0087-bf96-6d7b010bd179",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".navbar-container",
                originalId:
                  "683e98d0f471f1a56a0ed1b4|f5da96a1-13a6-0087-bf96-6d7b010bd179",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x197ba7a8c25,
          },
          "e-295": {
            id: "e-295",
            name: "",
            animationType: "custom",
            eventTypeId: "NAVBAR_CLOSE",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-40",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-294",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".navbar-container",
              originalId:
                "683e98d0f471f1a56a0ed1b4|f5da96a1-13a6-0087-bf96-6d7b010bd179",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".navbar-container",
                originalId:
                  "683e98d0f471f1a56a0ed1b4|f5da96a1-13a6-0087-bf96-6d7b010bd179",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x197ba7a8c27,
          },
          "e-296": {
            id: "e-296",
            name: "",
            animationType: "custom",
            eventTypeId: "DROPDOWN_OPEN",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-41",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-297",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".nav-dropdown",
              originalId: "131b31a1-52ad-218b-6559-7a3ec07c391e",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".nav-dropdown",
                originalId: "131b31a1-52ad-218b-6559-7a3ec07c391e",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x199aa94c9e9,
          },
          "e-297": {
            id: "e-297",
            name: "",
            animationType: "custom",
            eventTypeId: "DROPDOWN_CLOSE",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-45",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-296",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".nav-dropdown",
              originalId: "131b31a1-52ad-218b-6559-7a3ec07c391e",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".nav-dropdown",
                originalId: "131b31a1-52ad-218b-6559-7a3ec07c391e",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x199aa94c9e9,
          },
          "e-298": {
            id: "e-298",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-43",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-299",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".contact-link",
              originalId: "a010d49a-cc64-679d-af7b-b6c40d3f5eb7",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".contact-link",
                originalId: "a010d49a-cc64-679d-af7b-b6c40d3f5eb7",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19a9233698d,
          },
          "e-299": {
            id: "e-299",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-44",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-298",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".contact-link",
              originalId: "a010d49a-cc64-679d-af7b-b6c40d3f5eb7",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".contact-link",
                originalId: "a010d49a-cc64-679d-af7b-b6c40d3f5eb7",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19a9233698e,
          },
          "e-300": {
            id: "e-300",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-301",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d6|6a8c7092-c49a-7906-79e1-f3ae288f31c5",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d6|6a8c7092-c49a-7906-79e1-f3ae288f31c5",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cc940a58c,
          },
          "e-302": {
            id: "e-302",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-36",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-303",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d6|5a7eef23-ec4c-4fb0-ecdf-50ef521ba19c",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d6|5a7eef23-ec4c-4fb0-ecdf-50ef521ba19c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cc940c55a,
          },
          "e-304": {
            id: "e-304",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-37",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-305",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d6|f4754ac9-2d2b-1738-f75f-aa17c0891fca",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d6|f4754ac9-2d2b-1738-f75f-aa17c0891fca",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cc940d984,
          },
          "e-306": {
            id: "e-306",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-38",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-307",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d6|2fc9f270-6c37-6b72-3a1e-e4470ae011ba",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d6|2fc9f270-6c37-6b72-3a1e-e4470ae011ba",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cc940f19d,
          },
          "e-308": {
            id: "e-308",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-46",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-309",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d6|1576d07c-e512-1ef8-874d-86e9c6adb39c",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d6|1576d07c-e512-1ef8-874d-86e9c6adb39c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cc94112e8,
          },
          "e-310": {
            id: "e-310",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-47",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-311",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d6|523429fa-3e56-90a2-b925-48a2c2b62d62",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d6|523429fa-3e56-90a2-b925-48a2c2b62d62",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cc941ae06,
          },
          "e-312": {
            id: "e-312",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-47",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-313",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d6|b554b4ee-e19b-e5e3-6ec2-feabd7ce9a9e",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d6|b554b4ee-e19b-e5e3-6ec2-feabd7ce9a9e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19cc94220a0,
          },
          "e-314": {
            id: "e-314",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_CONTINUOUS_ACTION",
              config: {
                actionListId: "a-48",
                affectedElements: {},
                duration: 0,
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d6|4ab03100-2f07-bc3b-4442-28bf4d523ab7",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d6|4ab03100-2f07-bc3b-4442-28bf4d523ab7",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: [
              {
                continuousParameterGroupId: "a-48-p",
                smoothing: 90,
                startsEntering: !0,
                addStartOffset: !1,
                addOffsetValue: 50,
                startsExiting: !1,
                addEndOffset: !1,
                endOffsetValue: 50,
              },
            ],
            createdOn: 0x19cc945ddf9,
          },
          "e-315": {
            id: "e-315",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-316",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d6|7ba6926c-bfb2-b0a6-67bb-9bcb8c2411a5",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d6|7ba6926c-bfb2-b0a6-67bb-9bcb8c2411a5",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19d0bf94136,
          },
          "e-317": {
            id: "e-317",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-318",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              id: "6988c7b559f02cbdf41804d6|7ba6926c-bfb2-b0a6-67bb-9bcb8c2411a6",
              appliesTo: "ELEMENT",
              styleBlockIds: [],
            },
            targets: [
              {
                id: "6988c7b559f02cbdf41804d6|7ba6926c-bfb2-b0a6-67bb-9bcb8c2411a6",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19d0bf94136,
          },
          "e-319": {
            id: "e-319",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-320",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".features-v2-large-card",
              originalId:
                "6988c7b559f02cbdf41804d6|763fcfcf-2a61-e415-0072-80039438329f",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".features-v2-large-card",
                originalId:
                  "6988c7b559f02cbdf41804d6|763fcfcf-2a61-e415-0072-80039438329f",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19d0c130a67,
          },
          "e-321": {
            id: "e-321",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-322",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".features-v2-text-wrap",
              originalId:
                "6988c7b559f02cbdf41804d6|12218a2b-6d8a-7ce3-751c-ddf6b536c190",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".features-v2-text-wrap",
                originalId:
                  "6988c7b559f02cbdf41804d6|12218a2b-6d8a-7ce3-751c-ddf6b536c190",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 2,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19d0c132acc,
          },
          "e-323": {
            id: "e-323",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-324",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".features-v2-image-wrap",
              originalId:
                "6988c7b559f02cbdf41804d6|199c4d98-3099-3845-4343-11124f914ce4",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".features-v2-image-wrap",
                originalId:
                  "6988c7b559f02cbdf41804d6|199c4d98-3099-3845-4343-11124f914ce4",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19d0c135102,
          },
          "e-325": {
            id: "e-325",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-35",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-326",
              },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
              selector: ".features-v2-small-card",
              originalId:
                "6988c7b559f02cbdf41804d6|884dcaf7-b947-ddaa-9450-31ed2ad78337",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".features-v2-small-card",
                originalId:
                  "6988c7b559f02cbdf41804d6|884dcaf7-b947-ddaa-9450-31ed2ad78337",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: 0,
              scrollOffsetUnit: "%",
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19d0c13c4b8,
          },
          "e-327": {
            id: "e-327",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-49",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-328",
              },
            },
            mediaQueries: ["main", "medium"],
            target: {
              selector: ".value-card",
              originalId: "33320ddc-b2c9-e89f-207e-dd53517116ba",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".value-card",
                originalId: "33320ddc-b2c9-e89f-207e-dd53517116ba",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19d0c2c0328,
          },
          "e-328": {
            id: "e-328",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-50",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-327",
              },
            },
            mediaQueries: ["main", "medium"],
            target: {
              selector: ".value-card",
              originalId: "33320ddc-b2c9-e89f-207e-dd53517116ba",
              appliesTo: "CLASS",
            },
            targets: [
              {
                selector: ".value-card",
                originalId: "33320ddc-b2c9-e89f-207e-dd53517116ba",
                appliesTo: "CLASS",
              },
            ],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19d0c2c032a,
          },
          "e-329": {
            id: "e-329",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-51",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-330",
              },
            },
            mediaQueries: ["main", "medium"],
            target: {
              selector: ".about-card",
              originalId:
                "6988c7b559f02cbdf41804d7|cab4d58c-9e52-c8bb-cbd9-56a84bed8907",
              appliesTo: "CLASS",
            },
            targets: [],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19d23df7825,
          },
          "e-330": {
            id: "e-330",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
              id: "",
              actionTypeId: "GENERAL_START_ACTION",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                actionListId: "a-52",
                affectedElements: {},
                playInReverse: !1,
                autoStopEventId: "e-329",
              },
            },
            mediaQueries: ["main", "medium"],
            target: {
              selector: ".about-card",
              originalId:
                "6988c7b559f02cbdf41804d7|cab4d58c-9e52-c8bb-cbd9-56a84bed8907",
              appliesTo: "CLASS",
            },
            targets: [],
            config: {
              loop: !1,
              playInReverse: !1,
              scrollOffsetValue: null,
              scrollOffsetUnit: null,
              delay: null,
              direction: null,
              effectIn: null,
            },
            createdOn: 0x19d23df782b,
          },
        },
        actionLists: {
          a: {
            id: "a",
            title: "Learn More Hover - IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".learn-more-text",
                        selectorGuids: ["9530fc9a-ace5-bc62-ef6c-96cd171fd1b5"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-n-3",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".learn-more-arrow",
                        selectorGuids: ["85f33a20-8387-e76e-45f6-b14766f174ff"],
                      },
                      zValue: 45,
                      xUnit: "DEG",
                      yUnit: "DEG",
                      zUnit: "deg",
                    },
                  },
                  {
                    id: "a-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".learn-more-arrow",
                        selectorGuids: ["85f33a20-8387-e76e-45f6-b14766f174ff"],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".learn-more-text",
                        selectorGuids: ["9530fc9a-ace5-bc62-ef6c-96cd171fd1b5"],
                      },
                      yValue: -50,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".learn-more-arrow",
                        selectorGuids: ["85f33a20-8387-e76e-45f6-b14766f174ff"],
                      },
                      xValue: 100,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19c52f373f0,
          },
          "a-2": {
            id: "a-2",
            title: "Learn More Hover - OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-2-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".learn-more-text",
                        selectorGuids: ["9530fc9a-ace5-bc62-ef6c-96cd171fd1b5"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-2-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".learn-more-arrow",
                        selectorGuids: ["85f33a20-8387-e76e-45f6-b14766f174ff"],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x19c52f373f0,
          },
          "a-3": {
            id: "a-3",
            title: "Integration Hover - IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-3-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".integration-stroke",
                        selectorGuids: ["4b64d0ac-c40e-fa51-18de-17097cc2faa2"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-3-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".integration-inner-bg._01",
                        selectorGuids: [
                          "f6a19f0e-fe86-ab58-1c39-5f6383b64685",
                          "50254b75-56cb-d9b7-6746-0bbb07aff75e",
                        ],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-3-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".integration-inner-bg._02",
                        selectorGuids: [
                          "f6a19f0e-fe86-ab58-1c39-5f6383b64685",
                          "b7984d5a-cdb2-cca5-cf4b-5ea4b1f1f73a",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-3-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".integration-icon.initial-state",
                        selectorGuids: [
                          "737aa4a1-8f52-bf19-3554-8fcaf204f6b1",
                          "289d26a0-384f-b7ad-f4ef-24189c95d465",
                        ],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-3-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".integration-icon.hover-state",
                        selectorGuids: [
                          "737aa4a1-8f52-bf19-3554-8fcaf204f6b1",
                          "2c3fe7a3-4ca4-7c9f-10ae-b7c8d18ff54d",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-3-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".integration-stroke",
                        selectorGuids: ["4b64d0ac-c40e-fa51-18de-17097cc2faa2"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-3-n-10",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".integration-icon.hover-state",
                        selectorGuids: [
                          "737aa4a1-8f52-bf19-3554-8fcaf204f6b1",
                          "2c3fe7a3-4ca4-7c9f-10ae-b7c8d18ff54d",
                        ],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-3-n-9",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".integration-icon.initial-state",
                        selectorGuids: [
                          "737aa4a1-8f52-bf19-3554-8fcaf204f6b1",
                          "289d26a0-384f-b7ad-f4ef-24189c95d465",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-3-n-8",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".integration-inner-bg._02",
                        selectorGuids: [
                          "f6a19f0e-fe86-ab58-1c39-5f6383b64685",
                          "b7984d5a-cdb2-cca5-cf4b-5ea4b1f1f73a",
                        ],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-3-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".integration-inner-bg._01",
                        selectorGuids: [
                          "f6a19f0e-fe86-ab58-1c39-5f6383b64685",
                          "50254b75-56cb-d9b7-6746-0bbb07aff75e",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19c52fd958e,
          },
          "a-4": {
            id: "a-4",
            title: "Integration Hover - OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-4-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".integration-stroke",
                        selectorGuids: ["4b64d0ac-c40e-fa51-18de-17097cc2faa2"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-4-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".integration-inner-bg._01",
                        selectorGuids: [
                          "f6a19f0e-fe86-ab58-1c39-5f6383b64685",
                          "50254b75-56cb-d9b7-6746-0bbb07aff75e",
                        ],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-4-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".integration-inner-bg._02",
                        selectorGuids: [
                          "f6a19f0e-fe86-ab58-1c39-5f6383b64685",
                          "b7984d5a-cdb2-cca5-cf4b-5ea4b1f1f73a",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-4-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".integration-icon.initial-state",
                        selectorGuids: [
                          "737aa4a1-8f52-bf19-3554-8fcaf204f6b1",
                          "289d26a0-384f-b7ad-f4ef-24189c95d465",
                        ],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-4-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".integration-icon.hover-state",
                        selectorGuids: [
                          "737aa4a1-8f52-bf19-3554-8fcaf204f6b1",
                          "2c3fe7a3-4ca4-7c9f-10ae-b7c8d18ff54d",
                        ],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x19c52fd958e,
          },
          "a-7": {
            id: "a-7",
            title: "Button 01 Hover - IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-7-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-01-bg",
                        selectorGuids: ["168f409e-0f09-c3de-78e6-b87ceacdc73b"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-7-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-01-text-wrap",
                        selectorGuids: ["f4e227ec-74af-390e-d6aa-e77a1c469aed"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-7-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-01-bg",
                        selectorGuids: ["168f409e-0f09-c3de-78e6-b87ceacdc73b"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-7-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-01-text-wrap",
                        selectorGuids: ["f4e227ec-74af-390e-d6aa-e77a1c469aed"],
                      },
                      yValue: -50,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19c65afcbfc,
          },
          "a-8": {
            id: "a-8",
            title: "Button 01 Hover - OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-8-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-01-bg",
                        selectorGuids: ["168f409e-0f09-c3de-78e6-b87ceacdc73b"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-8-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-01-text-wrap",
                        selectorGuids: ["f4e227ec-74af-390e-d6aa-e77a1c469aed"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x19c65afcbfc,
          },
          "a-9": {
            id: "a-9",
            title: "Button 02 Hover - IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-9-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-02-text-wrap",
                        selectorGuids: ["c7b2648e-123b-5b6c-b2f1-f338fd600b09"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-9-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-02-text-wrap",
                        selectorGuids: ["c7b2648e-123b-5b6c-b2f1-f338fd600b09"],
                      },
                      yValue: -50,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19c65afcbfc,
          },
          "a-10": {
            id: "a-10",
            title: "Button 02 Hover - OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-10-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-02-text-wrap",
                        selectorGuids: ["c7b2648e-123b-5b6c-b2f1-f338fd600b09"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x19c65afcbfc,
          },
          "a-11": {
            id: "a-11",
            title: "Price Card One Open",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-11-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".pricing-arrow",
                        selectorGuids: ["660e6155-cc85-94ab-b189-cf15566c08ba"],
                      },
                      value: 0.6,
                      unit: "",
                    },
                  },
                  {
                    id: "a-11-n-2",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".pricing-arrow",
                        selectorGuids: ["660e6155-cc85-94ab-b189-cf15566c08ba"],
                      },
                      zValue: 0,
                      xUnit: "DEG",
                      yUnit: "DEG",
                      zUnit: "deg",
                    },
                  },
                  {
                    id: "a-11-n-3",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".pricing-bottom-wrap._01",
                        selectorGuids: [
                          "c5947e95-7e6a-ee33-c098-f907db16db59",
                          "43c58b3b-ee0a-f5b7-283b-040836ca4f48",
                        ],
                      },
                      heightValue: 0,
                      widthUnit: "PX",
                      heightUnit: "px",
                      locked: !1,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-11-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".pricing-arrow",
                        selectorGuids: ["660e6155-cc85-94ab-b189-cf15566c08ba"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-11-n-6",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 500,
                      target: {
                        selector: ".pricing-bottom-wrap._01",
                        selectorGuids: [
                          "c5947e95-7e6a-ee33-c098-f907db16db59",
                          "43c58b3b-ee0a-f5b7-283b-040836ca4f48",
                        ],
                      },
                      widthUnit: "PX",
                      heightUnit: "AUTO",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-11-n-5",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".pricing-arrow",
                        selectorGuids: ["660e6155-cc85-94ab-b189-cf15566c08ba"],
                      },
                      zValue: 90,
                      xUnit: "DEG",
                      yUnit: "DEG",
                      zUnit: "deg",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19c6cb613a9,
          },
          "a-12": {
            id: "a-12",
            title: "Price Card One Close",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-12-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".pricing-arrow",
                        selectorGuids: ["660e6155-cc85-94ab-b189-cf15566c08ba"],
                      },
                      value: 0.6,
                      unit: "",
                    },
                  },
                  {
                    id: "a-12-n-2",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".pricing-arrow",
                        selectorGuids: ["660e6155-cc85-94ab-b189-cf15566c08ba"],
                      },
                      zValue: 0,
                      xUnit: "DEG",
                      yUnit: "DEG",
                      zUnit: "deg",
                    },
                  },
                  {
                    id: "a-12-n-3",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 500,
                      target: {
                        selector: ".pricing-bottom-wrap._01",
                        selectorGuids: [
                          "c5947e95-7e6a-ee33-c098-f907db16db59",
                          "43c58b3b-ee0a-f5b7-283b-040836ca4f48",
                        ],
                      },
                      heightValue: 0,
                      widthUnit: "PX",
                      heightUnit: "px",
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x19c6cb613a9,
          },
          "a-13": {
            id: "a-13",
            title: "Price Card Two Open",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-13-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".pricing-arrow",
                        selectorGuids: ["660e6155-cc85-94ab-b189-cf15566c08ba"],
                      },
                      value: 0.6,
                      unit: "",
                    },
                  },
                  {
                    id: "a-13-n-2",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".pricing-arrow",
                        selectorGuids: ["660e6155-cc85-94ab-b189-cf15566c08ba"],
                      },
                      zValue: 0,
                      xUnit: "DEG",
                      yUnit: "DEG",
                      zUnit: "deg",
                    },
                  },
                  {
                    id: "a-13-n-3",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".pricing-bottom-wrap._02",
                        selectorGuids: [
                          "c5947e95-7e6a-ee33-c098-f907db16db59",
                          "6bdcba68-8857-f08a-e436-0e29404b1deb",
                        ],
                      },
                      heightValue: 0,
                      widthUnit: "PX",
                      heightUnit: "px",
                      locked: !1,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-13-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".pricing-arrow",
                        selectorGuids: ["660e6155-cc85-94ab-b189-cf15566c08ba"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-13-n-5",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 500,
                      target: {
                        selector: ".pricing-bottom-wrap._02",
                        selectorGuids: [
                          "c5947e95-7e6a-ee33-c098-f907db16db59",
                          "6bdcba68-8857-f08a-e436-0e29404b1deb",
                        ],
                      },
                      widthUnit: "PX",
                      heightUnit: "AUTO",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-13-n-6",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".pricing-arrow",
                        selectorGuids: ["660e6155-cc85-94ab-b189-cf15566c08ba"],
                      },
                      zValue: 90,
                      xUnit: "DEG",
                      yUnit: "DEG",
                      zUnit: "deg",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19c6cb613a9,
          },
          "a-14": {
            id: "a-14",
            title: "Price Card Two Close",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-14-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".pricing-arrow",
                        selectorGuids: ["660e6155-cc85-94ab-b189-cf15566c08ba"],
                      },
                      value: 0.6,
                      unit: "",
                    },
                  },
                  {
                    id: "a-14-n-2",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".pricing-arrow",
                        selectorGuids: ["660e6155-cc85-94ab-b189-cf15566c08ba"],
                      },
                      zValue: 0,
                      xUnit: "DEG",
                      yUnit: "DEG",
                      zUnit: "deg",
                    },
                  },
                  {
                    id: "a-14-n-3",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 500,
                      target: {
                        selector: ".pricing-bottom-wrap._02",
                        selectorGuids: [
                          "c5947e95-7e6a-ee33-c098-f907db16db59",
                          "6bdcba68-8857-f08a-e436-0e29404b1deb",
                        ],
                      },
                      heightValue: 0,
                      widthUnit: "PX",
                      heightUnit: "px",
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x19c6cb613a9,
          },
          "a-15": {
            id: "a-15",
            title: "Button 03 Hover - IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-15-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-03-test-wrap",
                        selectorGuids: ["eed0d688-69c7-cfa9-4356-d8bf73d96868"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-15-n-2",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-03-arrow",
                        selectorGuids: ["506f0224-0779-c6af-4c09-bef5c4c54d5d"],
                      },
                      zValue: 45,
                      xUnit: "DEG",
                      yUnit: "DEG",
                      zUnit: "deg",
                    },
                  },
                  {
                    id: "a-15-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-03-arrow",
                        selectorGuids: ["506f0224-0779-c6af-4c09-bef5c4c54d5d"],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-15-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-03-test-wrap",
                        selectorGuids: ["eed0d688-69c7-cfa9-4356-d8bf73d96868"],
                      },
                      yValue: -50,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-15-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-03-arrow",
                        selectorGuids: ["506f0224-0779-c6af-4c09-bef5c4c54d5d"],
                      },
                      xValue: 100,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19c6d2a64e2,
          },
          "a-16": {
            id: "a-16",
            title: "Button 03 Hover - OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-16-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-03-test-wrap",
                        selectorGuids: ["eed0d688-69c7-cfa9-4356-d8bf73d96868"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-16-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".button-03-arrow",
                        selectorGuids: ["506f0224-0779-c6af-4c09-bef5c4c54d5d"],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x19c6d2a64e2,
          },
          "a-17": {
            id: "a-17",
            title: "Core Marquee",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-17-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".core-icon-list",
                        selectorGuids: ["21fa4029-916d-6dbd-b305-85ca6aef5496"],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-17-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".core-icon-list-02",
                        selectorGuids: ["3a5eca01-8835-3cf8-e3ef-85b8f48e6867"],
                      },
                      xValue: -100,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-17-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 15e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".core-icon-list",
                        selectorGuids: ["21fa4029-916d-6dbd-b305-85ca6aef5496"],
                      },
                      xValue: -100,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-17-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 15e3,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".core-icon-list-02",
                        selectorGuids: ["3a5eca01-8835-3cf8-e3ef-85b8f48e6867"],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-17-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".core-icon-list",
                        selectorGuids: ["21fa4029-916d-6dbd-b305-85ca6aef5496"],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-17-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".core-icon-list-02",
                        selectorGuids: ["3a5eca01-8835-3cf8-e3ef-85b8f48e6867"],
                      },
                      xValue: -100,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19c71713aaa,
          },
          "a-18": {
            id: "a-18",
            title: "Offer Hover - IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-18-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".offer-bg",
                        selectorGuids: ["f1f29e5d-8c9b-ea6d-c10d-b96cd872d35b"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-18-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".offer-divider",
                        selectorGuids: ["d2f1d85d-cb2e-213b-12c5-c1656ac3cf8c"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-18-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".offer-bg",
                        selectorGuids: ["f1f29e5d-8c9b-ea6d-c10d-b96cd872d35b"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-18-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".offer-divider",
                        selectorGuids: ["d2f1d85d-cb2e-213b-12c5-c1656ac3cf8c"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19c7188cd7c,
          },
          "a-19": {
            id: "a-19",
            title: "Offer Hover - OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-19-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".offer-bg",
                        selectorGuids: ["f1f29e5d-8c9b-ea6d-c10d-b96cd872d35b"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-19-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".offer-divider",
                        selectorGuids: ["d2f1d85d-cb2e-213b-12c5-c1656ac3cf8c"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x19c7188cd7c,
          },
          "a-20": {
            id: "a-20",
            title: "Partner Active",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-20-n-2",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".fit-cover.partner-link-image",
                        selectorGuids: [
                          "4bf5d30b-8053-f1d9-b3b1-be23b982f3dd",
                          "8f97f56c-23e5-477f-b99f-6c5666bc2c20",
                        ],
                      },
                      filters: [
                        {
                          type: "saturate",
                          filterId: "b9f9",
                          value: 0,
                          unit: "%",
                        },
                      ],
                    },
                  },
                  {
                    id: "a-20-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".partner-link-image-cover",
                        selectorGuids: ["19a09ecc-9a50-062d-2b30-f3576c935f35"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-20-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 300,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".partner-link-image-cover",
                        selectorGuids: ["19a09ecc-9a50-062d-2b30-f3576c935f35"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-20-n-5",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 300,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".fit-cover.partner-link-image",
                        selectorGuids: [
                          "4bf5d30b-8053-f1d9-b3b1-be23b982f3dd",
                          "8f97f56c-23e5-477f-b99f-6c5666bc2c20",
                        ],
                      },
                      filters: [
                        {
                          type: "saturate",
                          filterId: "b9f9",
                          value: 100,
                          unit: "%",
                        },
                      ],
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19c8b2f4cb9,
          },
          "a-21": {
            id: "a-21",
            title: "Partner Inactive",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-21-n",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 300,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".fit-cover.partner-link-image",
                        selectorGuids: [
                          "4bf5d30b-8053-f1d9-b3b1-be23b982f3dd",
                          "8f97f56c-23e5-477f-b99f-6c5666bc2c20",
                        ],
                      },
                      filters: [
                        {
                          type: "saturate",
                          filterId: "b9f9",
                          value: 0,
                          unit: "%",
                        },
                      ],
                    },
                  },
                  {
                    id: "a-21-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 300,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".partner-link-image-cover",
                        selectorGuids: ["19a09ecc-9a50-062d-2b30-f3576c935f35"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x19c8b2f4cb9,
          },
          "a-22": {
            id: "a-22",
            title: "Trust Marquee",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-22-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".trust-list",
                        selectorGuids: ["6b10ff8d-0a5a-7469-50b3-110713a08fb0"],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-22-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 3e4,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".trust-list",
                        selectorGuids: ["6b10ff8d-0a5a-7469-50b3-110713a08fb0"],
                      },
                      xValue: -100,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-22-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".trust-list",
                        selectorGuids: ["6b10ff8d-0a5a-7469-50b3-110713a08fb0"],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19c8bc3dd26,
          },
          "a-25": {
            id: "a-25",
            title: "Team Hover - IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-25-n-3",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team-top-wrap",
                        selectorGuids: ["1e37c699-b83e-23d9-cc80-e83f8e46b486"],
                      },
                      globalSwatchId: "--colors--black",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-25-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team-image-cover",
                        selectorGuids: ["a57b0ce0-9a30-9e25-c418-9359b86bf571"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-25-n-5",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".fit-cover.team-image",
                        selectorGuids: [
                          "4bf5d30b-8053-f1d9-b3b1-be23b982f3dd",
                          "867f56ec-7e7b-6603-42bf-f5b33ba9be58",
                        ],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-25-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team-link-bg",
                        selectorGuids: ["bf1ac4b9-d9fd-3e0f-b9c5-ee92db9e8700"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-25-n-8",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team-icon",
                        selectorGuids: ["339144fa-15d9-0579-e878-45bdbd2257d9"],
                      },
                      filters: [
                        {
                          type: "invert",
                          filterId: "6ebc",
                          value: 0,
                          unit: "%",
                        },
                      ],
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-25-n",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team-top-wrap",
                        selectorGuids: ["1e37c699-b83e-23d9-cc80-e83f8e46b486"],
                      },
                      globalSwatchId: "--colors--light-grey",
                      rValue: 255,
                      bValue: 255,
                      gValue: 255,
                      aValue: 0.6,
                    },
                  },
                  {
                    id: "a-25-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team-image-cover",
                        selectorGuids: ["a57b0ce0-9a30-9e25-c418-9359b86bf571"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-25-n-6",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".fit-cover.team-image",
                        selectorGuids: [
                          "4bf5d30b-8053-f1d9-b3b1-be23b982f3dd",
                          "867f56ec-7e7b-6603-42bf-f5b33ba9be58",
                        ],
                      },
                      xValue: 1.12,
                      yValue: 1.12,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-25-n-9",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team-link-bg",
                        selectorGuids: ["bf1ac4b9-d9fd-3e0f-b9c5-ee92db9e8700"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-25-n-10",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team-icon",
                        selectorGuids: ["339144fa-15d9-0579-e878-45bdbd2257d9"],
                      },
                      filters: [
                        {
                          type: "invert",
                          filterId: "6ebc",
                          value: 100,
                          unit: "%",
                        },
                      ],
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19c8bdea8e5,
          },
          "a-26": {
            id: "a-26",
            title: "Team Hover - OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-26-n",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team-top-wrap",
                        selectorGuids: ["1e37c699-b83e-23d9-cc80-e83f8e46b486"],
                      },
                      globalSwatchId: "--colors--black",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-26-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team-image-cover",
                        selectorGuids: ["a57b0ce0-9a30-9e25-c418-9359b86bf571"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-26-n-3",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".fit-cover.team-image",
                        selectorGuids: [
                          "4bf5d30b-8053-f1d9-b3b1-be23b982f3dd",
                          "867f56ec-7e7b-6603-42bf-f5b33ba9be58",
                        ],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                  {
                    id: "a-26-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team-link-bg",
                        selectorGuids: ["bf1ac4b9-d9fd-3e0f-b9c5-ee92db9e8700"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-26-n-5",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".team-icon",
                        selectorGuids: ["339144fa-15d9-0579-e878-45bdbd2257d9"],
                      },
                      filters: [
                        {
                          type: "invert",
                          filterId: "ab64",
                          value: 0,
                          unit: "%",
                        },
                      ],
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x19c8bdea8e5,
          },
          "a-27": {
            id: "a-27",
            title: "Journey Timeline",
            continuousParameterGroups: [
              {
                id: "a-27-p",
                type: "SCROLL_PROGRESS",
                parameterLabel: "Scroll",
                continuousActionGroups: [
                  {
                    keyframe: 13,
                    actionItems: [
                      {
                        id: "a-27-n",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".year-bg",
                            selectorGuids: [
                              "cddeb140-1482-92a4-4b8b-d4a113477e74",
                            ],
                          },
                          value: 1,
                          unit: "",
                        },
                      },
                      {
                        id: "a-27-n-3",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".journey-line",
                            selectorGuids: [
                              "973cec4c-0443-f09d-d401-628f1c63e77c",
                            ],
                          },
                          yValue: -100,
                          xUnit: "PX",
                          yUnit: "%",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-27-n-4",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".year-linear",
                            selectorGuids: [
                              "6bd212e1-1abf-2a81-ae79-6475cb6a8daa",
                            ],
                          },
                          value: 0,
                          unit: "",
                        },
                      },
                      {
                        id: "a-27-n-8",
                        actionTypeId: "STYLE_TEXT_COLOR",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".h4.year",
                            selectorGuids: [
                              "a9411fca-41e0-f365-b278-5e5a65024325",
                              "7a101090-7e0f-258a-e670-bdb24a095703",
                            ],
                          },
                          globalSwatchId: "--colors--white",
                          rValue: 255,
                          bValue: 255,
                          gValue: 255,
                          aValue: 1,
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 15,
                    actionItems: [
                      {
                        id: "a-27-n-5",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".year-bg",
                            selectorGuids: [
                              "cddeb140-1482-92a4-4b8b-d4a113477e74",
                            ],
                          },
                          value: 0,
                          unit: "",
                        },
                      },
                      {
                        id: "a-27-n-6",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".journey-line",
                            selectorGuids: [
                              "973cec4c-0443-f09d-d401-628f1c63e77c",
                            ],
                          },
                          yValue: -100,
                          xUnit: "PX",
                          yUnit: "%",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-27-n-7",
                        actionTypeId: "STYLE_OPACITY",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".year-linear",
                            selectorGuids: [
                              "6bd212e1-1abf-2a81-ae79-6475cb6a8daa",
                            ],
                          },
                          value: 1,
                          unit: "",
                        },
                      },
                      {
                        id: "a-27-n-9",
                        actionTypeId: "STYLE_TEXT_COLOR",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".h4.year",
                            selectorGuids: [
                              "a9411fca-41e0-f365-b278-5e5a65024325",
                              "7a101090-7e0f-258a-e670-bdb24a095703",
                            ],
                          },
                          globalSwatchId: "--colors--black",
                          rValue: 0,
                          bValue: 0,
                          gValue: 0,
                          aValue: 1,
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 25,
                    actionItems: [
                      {
                        id: "a-27-n-10",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".journey-line",
                            selectorGuids: [
                              "973cec4c-0443-f09d-d401-628f1c63e77c",
                            ],
                          },
                          yValue: 0,
                          xUnit: "PX",
                          yUnit: "%",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x19c8c0d86e0,
          },
          "a-28": {
            id: "a-28",
            title: "Brands Marquee",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-28-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".brand-list",
                        selectorGuids: ["c43d53e0-f0a2-5f81-2a61-665b2557f92c"],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-28-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 4e4,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".brand-list",
                        selectorGuids: ["c43d53e0-f0a2-5f81-2a61-665b2557f92c"],
                      },
                      xValue: -100,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-28-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".brand-list",
                        selectorGuids: ["c43d53e0-f0a2-5f81-2a61-665b2557f92c"],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19c8e803fa2,
          },
          "a-29": {
            id: "a-29",
            title: "Integration Marquee",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-29-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".integration-v3-list",
                        selectorGuids: ["b6c31081-2405-9ee9-8a22-9363dbaaf33a"],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-29-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".integration-v3-list._02",
                        selectorGuids: [
                          "b6c31081-2405-9ee9-8a22-9363dbaaf33a",
                          "fcb554d8-ba45-bdc2-f601-550079ed1dd1",
                        ],
                      },
                      xValue: -100,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-29-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 3e4,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".integration-v3-list",
                        selectorGuids: ["b6c31081-2405-9ee9-8a22-9363dbaaf33a"],
                      },
                      xValue: -100,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-29-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 3e4,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".integration-v3-list._02",
                        selectorGuids: [
                          "b6c31081-2405-9ee9-8a22-9363dbaaf33a",
                          "fcb554d8-ba45-bdc2-f601-550079ed1dd1",
                        ],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-29-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".integration-v3-list",
                        selectorGuids: ["b6c31081-2405-9ee9-8a22-9363dbaaf33a"],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-29-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".integration-v3-list._02",
                        selectorGuids: [
                          "b6c31081-2405-9ee9-8a22-9363dbaaf33a",
                          "fcb554d8-ba45-bdc2-f601-550079ed1dd1",
                        ],
                      },
                      xValue: -100,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19c8f1ae353,
          },
          "a-30": {
            id: "a-30",
            title: "Testimonial Marquee",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-30-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".testimonial-list",
                        selectorGuids: ["0e85b52f-4d07-f797-8760-959f3d6eaf82"],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-30-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".testimonial-list._02",
                        selectorGuids: [
                          "0e85b52f-4d07-f797-8760-959f3d6eaf82",
                          "b2ab6aa3-f211-af36-d01d-f78e551c5da4",
                        ],
                      },
                      xValue: -100,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-30-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 5e4,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".testimonial-list",
                        selectorGuids: ["0e85b52f-4d07-f797-8760-959f3d6eaf82"],
                      },
                      xValue: -100,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-30-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 5e4,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".testimonial-list._02",
                        selectorGuids: [
                          "0e85b52f-4d07-f797-8760-959f3d6eaf82",
                          "b2ab6aa3-f211-af36-d01d-f78e551c5da4",
                        ],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-30-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".testimonial-list",
                        selectorGuids: ["0e85b52f-4d07-f797-8760-959f3d6eaf82"],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-30-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 0,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".testimonial-list._02",
                        selectorGuids: [
                          "0e85b52f-4d07-f797-8760-959f3d6eaf82",
                          "b2ab6aa3-f211-af36-d01d-f78e551c5da4",
                        ],
                      },
                      xValue: -100,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19c8f58e3de,
          },
          "a-31": {
            id: "a-31",
            title: "Faq Active",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-31-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".faq-bg",
                        selectorGuids: ["0c44043c-ff4f-d837-e5fb-cf7d887d7bf9"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-31-n-9",
                    actionTypeId: "STYLE_TEXT_COLOR",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".h4.faq-question",
                        selectorGuids: [
                          "a9411fca-41e0-f365-b278-5e5a65024325",
                          "6ea59db0-7c03-3372-caba-275712624fa3",
                        ],
                      },
                      globalSwatchId: "--colors--white",
                      rValue: 255,
                      bValue: 255,
                      gValue: 255,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-31-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".faq-answer-wrap",
                        selectorGuids: ["06df7a57-7c52-5694-1988-4156895558f1"],
                      },
                      heightValue: 0,
                      widthUnit: "PX",
                      heightUnit: "px",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-31-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".plus",
                        selectorGuids: ["9172212f-e446-76db-a248-492164be0c06"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-31-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".minus",
                        selectorGuids: ["043817e1-c0ac-d6e7-d5a8-640feecc4a7b"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-31-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".faq-bg",
                        selectorGuids: ["0c44043c-ff4f-d837-e5fb-cf7d887d7bf9"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-31-n-8",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".minus",
                        selectorGuids: ["043817e1-c0ac-d6e7-d5a8-640feecc4a7b"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-31-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".plus",
                        selectorGuids: ["9172212f-e446-76db-a248-492164be0c06"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-31-n-6",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".faq-answer-wrap",
                        selectorGuids: ["06df7a57-7c52-5694-1988-4156895558f1"],
                      },
                      widthUnit: "PX",
                      heightUnit: "AUTO",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-31-n-10",
                    actionTypeId: "STYLE_TEXT_COLOR",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".h4.faq-question",
                        selectorGuids: [
                          "a9411fca-41e0-f365-b278-5e5a65024325",
                          "6ea59db0-7c03-3372-caba-275712624fa3",
                        ],
                      },
                      globalSwatchId: "--colors--golden",
                      rValue: 245,
                      bValue: 9,
                      gValue: 190,
                      aValue: 1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19c8f7405f4,
          },
          "a-32": {
            id: "a-32",
            title: "Faq Inactive",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-32-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".faq-bg",
                        selectorGuids: ["0c44043c-ff4f-d837-e5fb-cf7d887d7bf9"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-32-n-5",
                    actionTypeId: "STYLE_TEXT_COLOR",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".h4.faq-question",
                        selectorGuids: [
                          "a9411fca-41e0-f365-b278-5e5a65024325",
                          "6ea59db0-7c03-3372-caba-275712624fa3",
                        ],
                      },
                      globalSwatchId: "--colors--white",
                      rValue: 255,
                      bValue: 255,
                      gValue: 255,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-32-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".faq-answer-wrap",
                        selectorGuids: ["06df7a57-7c52-5694-1988-4156895558f1"],
                      },
                      heightValue: 0,
                      widthUnit: "PX",
                      heightUnit: "px",
                      locked: !1,
                    },
                  },
                  {
                    id: "a-32-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".plus",
                        selectorGuids: ["9172212f-e446-76db-a248-492164be0c06"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-32-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".minus",
                        selectorGuids: ["043817e1-c0ac-d6e7-d5a8-640feecc4a7b"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x19c8f7405f4,
          },
          "a-5": {
            id: "a-5",
            title: "Blog Hover - IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-5-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".blog-stroke",
                        selectorGuids: ["bdb31f79-e3e6-6330-17de-42190a525958"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-5-n-2",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".fit-cover",
                        selectorGuids: ["4bf5d30b-8053-f1d9-b3b1-be23b982f3dd"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-5-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".blog-stroke",
                        selectorGuids: ["bdb31f79-e3e6-6330-17de-42190a525958"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-5-n-4",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".fit-cover",
                        selectorGuids: ["4bf5d30b-8053-f1d9-b3b1-be23b982f3dd"],
                      },
                      xValue: 1.15,
                      yValue: 1.15,
                      locked: !0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19c535979be,
          },
          "a-6": {
            id: "a-6",
            title: "Blog Hover - OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-6-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".blog-stroke",
                        selectorGuids: ["bdb31f79-e3e6-6330-17de-42190a525958"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-6-n-2",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 400,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".fit-cover",
                        selectorGuids: ["4bf5d30b-8053-f1d9-b3b1-be23b982f3dd"],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: !0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x19c535979be,
          },
          "a-33": {
            id: "a-33",
            title: "Credibility Hover - IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-33-n",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".credibility-details-wrap",
                        selectorGuids: ["d513b008-fcd1-9f03-bc0c-e34d305b6edc"],
                      },
                      heightValue: 0,
                      widthUnit: "PX",
                      heightUnit: "px",
                      locked: !1,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-33-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".credibility-details-wrap",
                        selectorGuids: ["d513b008-fcd1-9f03-bc0c-e34d305b6edc"],
                      },
                      widthUnit: "PX",
                      heightUnit: "AUTO",
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19cb4dfd930,
          },
          "a-34": {
            id: "a-34",
            title: "Credibility Hover - OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-34-n-2",
                    actionTypeId: "STYLE_SIZE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".credibility-details-wrap",
                        selectorGuids: ["d513b008-fcd1-9f03-bc0c-e34d305b6edc"],
                      },
                      heightValue: 0,
                      widthUnit: "PX",
                      heightUnit: "px",
                      locked: !1,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x19cb4dfd930,
          },
          "a-35": {
            id: "a-35",
            title: "Slide Up 0.1s",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-35-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      yValue: 45,
                      xUnit: "PX",
                      yUnit: "px",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-35-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-35-n-3",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      filters: [
                        {
                          type: "blur",
                          filterId: "db4f",
                          value: 5,
                          unit: "px",
                        },
                      ],
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-35-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 100,
                      easing: "ease",
                      duration: 700,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-35-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 100,
                      easing: "ease",
                      duration: 700,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "px",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-35-n-6",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 100,
                      easing: "ease",
                      duration: 700,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      filters: [
                        {
                          type: "blur",
                          filterId: "db4f",
                          value: 0,
                          unit: "px",
                        },
                      ],
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19cbef6f74f,
          },
          "a-36": {
            id: "a-36",
            title: "Slide Up 0.2s",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-36-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      yValue: 45,
                      xUnit: "PX",
                      yUnit: "px",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-36-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-36-n-3",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      filters: [
                        {
                          type: "blur",
                          filterId: "db4f",
                          value: 5,
                          unit: "px",
                        },
                      ],
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-36-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 200,
                      easing: "ease",
                      duration: 700,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-36-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 200,
                      easing: "ease",
                      duration: 700,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "px",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-36-n-6",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 200,
                      easing: "ease",
                      duration: 700,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      filters: [
                        {
                          type: "blur",
                          filterId: "db4f",
                          value: 0,
                          unit: "px",
                        },
                      ],
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19cbef6f74f,
          },
          "a-37": {
            id: "a-37",
            title: "Slide Up 0.3s",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-37-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      yValue: 45,
                      xUnit: "PX",
                      yUnit: "px",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-37-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-37-n-3",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      filters: [
                        {
                          type: "blur",
                          filterId: "db4f",
                          value: 5,
                          unit: "px",
                        },
                      ],
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-37-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 300,
                      easing: "ease",
                      duration: 700,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-37-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 300,
                      easing: "ease",
                      duration: 700,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "px",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-37-n-6",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 300,
                      easing: "ease",
                      duration: 700,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      filters: [
                        {
                          type: "blur",
                          filterId: "db4f",
                          value: 0,
                          unit: "px",
                        },
                      ],
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19cbef6f74f,
          },
          "a-38": {
            id: "a-38",
            title: "Slide Up 0.4s",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-38-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      yValue: 45,
                      xUnit: "PX",
                      yUnit: "px",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-38-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-38-n-3",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      filters: [
                        {
                          type: "blur",
                          filterId: "db4f",
                          value: 5,
                          unit: "px",
                        },
                      ],
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-38-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 400,
                      easing: "ease",
                      duration: 700,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-38-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 400,
                      easing: "ease",
                      duration: 700,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "px",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-38-n-6",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 400,
                      easing: "ease",
                      duration: 700,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      filters: [
                        {
                          type: "blur",
                          filterId: "db4f",
                          value: 0,
                          unit: "px",
                        },
                      ],
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19cbef6f74f,
          },
          "a-39": {
            id: "a-39",
            title: "Menu Open",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-39-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".menu-lottie",
                        selectorGuids: ["c926f46c-a66e-d166-af31-5fb0b00030d5"],
                      },
                      value: 45,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x197a7b431b6,
          },
          "a-40": {
            id: "a-40",
            title: "Menu Close",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-40-n",
                    actionTypeId: "PLUGIN_LOTTIE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".menu-lottie",
                        selectorGuids: ["c926f46c-a66e-d166-af31-5fb0b00030d5"],
                      },
                      value: 0,
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x197a7b431b6,
          },
          "a-41": {
            id: "a-41",
            title: "Dropdown Open",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-41-n-3",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".dropdown-arrow",
                        selectorGuids: ["c926f46c-a66e-d166-af31-5fb0b00030d2"],
                      },
                      zValue: 0,
                      xUnit: "DEG",
                      yUnit: "DEG",
                      zUnit: "deg",
                    },
                  },
                  {
                    id: "a-41-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-dropdown-list-wrap",
                        selectorGuids: ["c926f46c-a66e-d166-af31-5fb0b00030d4"],
                      },
                      yValue: 10,
                      xUnit: "PX",
                      yUnit: "px",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-41-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-dropdown-list-wrap",
                        selectorGuids: ["c926f46c-a66e-d166-af31-5fb0b00030d4"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-41-n-10",
                    actionTypeId: "STYLE_TEXT_COLOR",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".nav-dropdown-toggle",
                        selectorGuids: ["c926f46c-a66e-d166-af31-5fb0b00030c8"],
                      },
                      globalSwatchId: "--colors--light-grey",
                      rValue: 255,
                      bValue: 255,
                      gValue: 255,
                      aValue: 0.6,
                    },
                  },
                  {
                    id: "a-41-n-11",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".dropdown-arrow",
                        selectorGuids: ["c926f46c-a66e-d166-af31-5fb0b00030d2"],
                      },
                      value: 0.5,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-41-n-7",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 300,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".dropdown-arrow",
                        selectorGuids: ["c926f46c-a66e-d166-af31-5fb0b00030d2"],
                      },
                      zValue: 180,
                      xUnit: "DEG",
                      yUnit: "DEG",
                      zUnit: "deg",
                    },
                  },
                  {
                    id: "a-41-n-8",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 300,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-dropdown-list-wrap",
                        selectorGuids: ["c926f46c-a66e-d166-af31-5fb0b00030d4"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "px",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-41-n-9",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 300,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-dropdown-list-wrap",
                        selectorGuids: ["c926f46c-a66e-d166-af31-5fb0b00030d4"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-41-n-12",
                    actionTypeId: "STYLE_TEXT_COLOR",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 300,
                      target: {
                        selector: ".nav-dropdown-toggle",
                        selectorGuids: ["c926f46c-a66e-d166-af31-5fb0b00030c8"],
                      },
                      globalSwatchId: "--colors--white",
                      rValue: 255,
                      bValue: 255,
                      gValue: 255,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-41-n-13",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 300,
                      target: {
                        selector: ".dropdown-arrow",
                        selectorGuids: ["c926f46c-a66e-d166-af31-5fb0b00030d2"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x199aa94d24f,
          },
          "a-45": {
            id: "a-45",
            title: "Dropdown Close",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-45-n",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 300,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".dropdown-arrow",
                        selectorGuids: ["c926f46c-a66e-d166-af31-5fb0b00030d2"],
                      },
                      zValue: 0,
                      xUnit: "DEG",
                      yUnit: "DEG",
                      zUnit: "deg",
                    },
                  },
                  {
                    id: "a-45-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 300,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-dropdown-list-wrap",
                        selectorGuids: ["c926f46c-a66e-d166-af31-5fb0b00030d4"],
                      },
                      yValue: 10,
                      xUnit: "PX",
                      yUnit: "px",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-45-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 300,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".nav-dropdown-list-wrap",
                        selectorGuids: ["c926f46c-a66e-d166-af31-5fb0b00030d4"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-45-n-4",
                    actionTypeId: "STYLE_TEXT_COLOR",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 300,
                      target: {
                        selector: ".nav-dropdown-toggle",
                        selectorGuids: ["c926f46c-a66e-d166-af31-5fb0b00030c8"],
                      },
                      globalSwatchId: "--colors--light-grey",
                      rValue: 255,
                      bValue: 255,
                      gValue: 255,
                      aValue: 0.6,
                    },
                  },
                  {
                    id: "a-45-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 300,
                      target: {
                        selector: ".dropdown-arrow",
                        selectorGuids: ["c926f46c-a66e-d166-af31-5fb0b00030d2"],
                      },
                      value: 0.5,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x199aa94d24f,
          },
          "a-43": {
            id: "a-43",
            title: "Contact Hover - In",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-43-n",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "PARENT",
                        selector: ".contact-link",
                        selectorGuids: ["c926f46c-a66e-d166-af31-5fb0b00030cd"],
                      },
                      globalSwatchId: "--colors--white",
                      rValue: 255,
                      bValue: 255,
                      gValue: 255,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-43-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".contact-link-text-group",
                        selectorGuids: ["c926f46c-a66e-d166-af31-5fb0b00030df"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-43-n-3",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 300,
                      target: {
                        useEventTarget: "PARENT",
                        selector: ".contact-link",
                        selectorGuids: ["c926f46c-a66e-d166-af31-5fb0b00030cd"],
                      },
                      globalSwatchId: "--colors--golden",
                      rValue: 245,
                      bValue: 9,
                      gValue: 190,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-43-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 300,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".contact-link-text-group",
                        selectorGuids: ["c926f46c-a66e-d166-af31-5fb0b00030df"],
                      },
                      yValue: -50,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19a9233719d,
          },
          "a-44": {
            id: "a-44",
            title: "Contact Hover - Out",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-44-n",
                    actionTypeId: "STYLE_BACKGROUND_COLOR",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 300,
                      target: {
                        useEventTarget: "PARENT",
                        selector: ".contact-link",
                        selectorGuids: ["c926f46c-a66e-d166-af31-5fb0b00030cd"],
                      },
                      globalSwatchId: "--colors--white",
                      rValue: 255,
                      bValue: 255,
                      gValue: 255,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-44-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 300,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".contact-link-text-group",
                        selectorGuids: ["c926f46c-a66e-d166-af31-5fb0b00030df"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x19a9233719d,
          },
          "a-46": {
            id: "a-46",
            title: "Slide Up 0.5s",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-46-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      yValue: 45,
                      xUnit: "PX",
                      yUnit: "px",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-46-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-46-n-3",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      filters: [
                        {
                          type: "blur",
                          filterId: "db4f",
                          value: 5,
                          unit: "px",
                        },
                      ],
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-46-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 500,
                      easing: "ease",
                      duration: 700,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-46-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 500,
                      easing: "ease",
                      duration: 700,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "px",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-46-n-6",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 500,
                      easing: "ease",
                      duration: 700,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      filters: [
                        {
                          type: "blur",
                          filterId: "db4f",
                          value: 0,
                          unit: "px",
                        },
                      ],
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19cbef6f74f,
          },
          "a-47": {
            id: "a-47",
            title: "Slide Up 0.6s",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-47-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      yValue: 45,
                      xUnit: "PX",
                      yUnit: "px",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-47-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-47-n-3",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      filters: [
                        {
                          type: "blur",
                          filterId: "db4f",
                          value: 5,
                          unit: "px",
                        },
                      ],
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-47-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 600,
                      easing: "ease",
                      duration: 700,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-47-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 600,
                      easing: "ease",
                      duration: 700,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "px",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-47-n-6",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 600,
                      easing: "ease",
                      duration: 700,
                      target: {
                        useEventTarget: !0,
                        id: "9679a656-81cf-e306-90ad-a9b4e3ab625f",
                      },
                      filters: [
                        {
                          type: "blur",
                          filterId: "db4f",
                          value: 0,
                          unit: "px",
                        },
                      ],
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19cbef6f74f,
          },
          "a-48": {
            id: "a-48",
            title: "Dollar Movement",
            continuousParameterGroups: [
              {
                id: "a-48-p",
                type: "SCROLL_PROGRESS",
                parameterLabel: "Scroll",
                continuousActionGroups: [
                  {
                    keyframe: 20,
                    actionItems: [
                      {
                        id: "a-48-n",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".dollar-01",
                            selectorGuids: [
                              "7caee7b6-2756-b446-90fb-e54fe2dfc43f",
                            ],
                          },
                          yValue: 0,
                          xUnit: "PX",
                          yUnit: "px",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-48-n-3",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".dollar-02",
                            selectorGuids: [
                              "ee33e2cc-1769-4c13-3d73-61b67e899780",
                            ],
                          },
                          yValue: 0,
                          xUnit: "PX",
                          yUnit: "px",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                  {
                    keyframe: 60,
                    actionItems: [
                      {
                        id: "a-48-n-4",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".dollar-01",
                            selectorGuids: [
                              "7caee7b6-2756-b446-90fb-e54fe2dfc43f",
                            ],
                          },
                          yValue: 100,
                          xUnit: "PX",
                          yUnit: "px",
                          zUnit: "PX",
                        },
                      },
                      {
                        id: "a-48-n-5",
                        actionTypeId: "TRANSFORM_MOVE",
                        config: {
                          delay: 0,
                          easing: "",
                          duration: 500,
                          target: {
                            useEventTarget: "CHILDREN",
                            selector: ".dollar-02",
                            selectorGuids: [
                              "ee33e2cc-1769-4c13-3d73-61b67e899780",
                            ],
                          },
                          yValue: -100,
                          xUnit: "PX",
                          yUnit: "px",
                          zUnit: "PX",
                        },
                      },
                    ],
                  },
                ],
              },
            ],
            createdOn: 0x19cc9432517,
          },
          "a-49": {
            id: "a-49",
            title: "Value Hover - IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-49-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".value-bg",
                        selectorGuids: ["07dcb48f-2c36-2e7a-2d55-e345d2f94a88"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-49-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".value-bg",
                        selectorGuids: ["07dcb48f-2c36-2e7a-2d55-e345d2f94a88"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !0,
            createdOn: 0x19d0c2c0b33,
          },
          "a-50": {
            id: "a-50",
            title: "Value Hover - OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-50-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".value-bg",
                        selectorGuids: ["07dcb48f-2c36-2e7a-2d55-e345d2f94a88"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            useFirstGroupAsInitialState: !1,
            createdOn: 0x19d0c2c0b33,
          },
          "a-51": {
            id: "a-51",
            title: "About Card Hover - IN",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-51-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".about-card-bg",
                        selectorGuids: ["01019a81-3f9d-16d4-2e92-1e24c280583a"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    id: "a-51-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".about-card-bg",
                        selectorGuids: ["01019a81-3f9d-16d4-2e92-1e24c280583a"],
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            createdOn: 0x19d23df82cb,
            useFirstGroupAsInitialState: !0,
          },
          "a-52": {
            id: "a-52",
            title: "About Card Hover - OUT",
            actionItemGroups: [
              {
                actionItems: [
                  {
                    id: "a-52-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "ease",
                      duration: 350,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".about-card-bg",
                        selectorGuids: ["01019a81-3f9d-16d4-2e92-1e24c280583a"],
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
            ],
            createdOn: 0x19d23df82cb,
            useFirstGroupAsInitialState: !1,
          },
          fadeIn: {
            id: "fadeIn",
            useFirstGroupAsInitialState: !0,
            actionItemGroups: [
              {
                actionItems: [
                  {
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      duration: 0,
                      target: {
                        id: "N/A",
                        appliesTo: "TRIGGER_ELEMENT",
                        useEventTarget: !0,
                      },
                      value: 0,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 1e3,
                      target: {
                        id: "N/A",
                        appliesTo: "TRIGGER_ELEMENT",
                        useEventTarget: !0,
                      },
                      value: 1,
                    },
                  },
                ],
              },
            ],
          },
          slideInLeft: {
            id: "slideInLeft",
            useFirstGroupAsInitialState: !0,
            actionItemGroups: [
              {
                actionItems: [
                  {
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      duration: 0,
                      target: {
                        id: "N/A",
                        appliesTo: "TRIGGER_ELEMENT",
                        useEventTarget: !0,
                      },
                      value: 0,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      duration: 0,
                      target: {
                        id: "N/A",
                        appliesTo: "TRIGGER_ELEMENT",
                        useEventTarget: !0,
                      },
                      xValue: -100,
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 1e3,
                      target: {
                        id: "N/A",
                        appliesTo: "TRIGGER_ELEMENT",
                        useEventTarget: !0,
                      },
                      value: 1,
                    },
                  },
                  {
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 1e3,
                      target: {
                        id: "N/A",
                        appliesTo: "TRIGGER_ELEMENT",
                        useEventTarget: !0,
                      },
                      xValue: 0,
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
          },
          slideInRight: {
            id: "slideInRight",
            useFirstGroupAsInitialState: !0,
            actionItemGroups: [
              {
                actionItems: [
                  {
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      duration: 0,
                      target: {
                        id: "N/A",
                        appliesTo: "TRIGGER_ELEMENT",
                        useEventTarget: !0,
                      },
                      value: 0,
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      duration: 0,
                      target: {
                        id: "N/A",
                        appliesTo: "TRIGGER_ELEMENT",
                        useEventTarget: !0,
                      },
                      xValue: 100,
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                actionItems: [
                  {
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 1e3,
                      target: {
                        id: "N/A",
                        appliesTo: "TRIGGER_ELEMENT",
                        useEventTarget: !0,
                      },
                      value: 1,
                    },
                  },
                  {
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "outQuart",
                      duration: 1e3,
                      target: {
                        id: "N/A",
                        appliesTo: "TRIGGER_ELEMENT",
                        useEventTarget: !0,
                      },
                      xValue: 0,
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
          },
        },
        site: {
          mediaQueries: [
            { key: "main", min: 992, max: 1e4 },
            { key: "medium", min: 768, max: 991 },
            { key: "small", min: 480, max: 767 },
            { key: "tiny", min: 0, max: 479 },
          ],
        },
      });
    },
  },
]);
