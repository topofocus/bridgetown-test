(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a3, b2) => {
    for (var prop in b2 || (b2 = {}))
      if (__hasOwnProp.call(b2, prop))
        __defNormalProp(a3, prop, b2[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b2)) {
        if (__propIsEnum.call(b2, prop))
          __defNormalProp(a3, prop, b2[prop]);
      }
    return a3;
  };
  var __spreadProps = (a3, b2) => __defProps(a3, __getOwnPropDescs(b2));
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e8) {
          reject(e8);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e8) {
          reject(e8);
        }
      };
      var step = (x2) => x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/lunr/lunr.js
  var require_lunr = __commonJS({
    "node_modules/lunr/lunr.js"(exports, module) {
      (function() {
        var lunr2 = function(config) {
          var builder = new lunr2.Builder();
          builder.pipeline.add(lunr2.trimmer, lunr2.stopWordFilter, lunr2.stemmer);
          builder.searchPipeline.add(lunr2.stemmer);
          config.call(builder, builder);
          return builder.build();
        };
        lunr2.version = "2.3.9";
        lunr2.utils = {};
        lunr2.utils.warn = function(global) {
          return function(message) {
            if (global.console && console.warn) {
              console.warn(message);
            }
          };
        }(this);
        lunr2.utils.asString = function(obj) {
          if (obj === void 0 || obj === null) {
            return "";
          } else {
            return obj.toString();
          }
        };
        lunr2.utils.clone = function(obj) {
          if (obj === null || obj === void 0) {
            return obj;
          }
          var clone = /* @__PURE__ */ Object.create(null), keys = Object.keys(obj);
          for (var i5 = 0; i5 < keys.length; i5++) {
            var key = keys[i5], val = obj[key];
            if (Array.isArray(val)) {
              clone[key] = val.slice();
              continue;
            }
            if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") {
              clone[key] = val;
              continue;
            }
            throw new TypeError("clone is not deep and does not support nested objects");
          }
          return clone;
        };
        lunr2.FieldRef = function(docRef, fieldName, stringValue) {
          this.docRef = docRef;
          this.fieldName = fieldName;
          this._stringValue = stringValue;
        };
        lunr2.FieldRef.joiner = "/";
        lunr2.FieldRef.fromString = function(s5) {
          var n7 = s5.indexOf(lunr2.FieldRef.joiner);
          if (n7 === -1) {
            throw "malformed field ref string";
          }
          var fieldRef = s5.slice(0, n7), docRef = s5.slice(n7 + 1);
          return new lunr2.FieldRef(docRef, fieldRef, s5);
        };
        lunr2.FieldRef.prototype.toString = function() {
          if (this._stringValue == void 0) {
            this._stringValue = this.fieldName + lunr2.FieldRef.joiner + this.docRef;
          }
          return this._stringValue;
        };
        lunr2.Set = function(elements) {
          this.elements = /* @__PURE__ */ Object.create(null);
          if (elements) {
            this.length = elements.length;
            for (var i5 = 0; i5 < this.length; i5++) {
              this.elements[elements[i5]] = true;
            }
          } else {
            this.length = 0;
          }
        };
        lunr2.Set.complete = {
          intersect: function(other) {
            return other;
          },
          union: function() {
            return this;
          },
          contains: function() {
            return true;
          }
        };
        lunr2.Set.empty = {
          intersect: function() {
            return this;
          },
          union: function(other) {
            return other;
          },
          contains: function() {
            return false;
          }
        };
        lunr2.Set.prototype.contains = function(object) {
          return !!this.elements[object];
        };
        lunr2.Set.prototype.intersect = function(other) {
          var a3, b2, elements, intersection = [];
          if (other === lunr2.Set.complete) {
            return this;
          }
          if (other === lunr2.Set.empty) {
            return other;
          }
          if (this.length < other.length) {
            a3 = this;
            b2 = other;
          } else {
            a3 = other;
            b2 = this;
          }
          elements = Object.keys(a3.elements);
          for (var i5 = 0; i5 < elements.length; i5++) {
            var element = elements[i5];
            if (element in b2.elements) {
              intersection.push(element);
            }
          }
          return new lunr2.Set(intersection);
        };
        lunr2.Set.prototype.union = function(other) {
          if (other === lunr2.Set.complete) {
            return lunr2.Set.complete;
          }
          if (other === lunr2.Set.empty) {
            return this;
          }
          return new lunr2.Set(Object.keys(this.elements).concat(Object.keys(other.elements)));
        };
        lunr2.idf = function(posting, documentCount) {
          var documentsWithTerm = 0;
          for (var fieldName in posting) {
            if (fieldName == "_index")
              continue;
            documentsWithTerm += Object.keys(posting[fieldName]).length;
          }
          var x2 = (documentCount - documentsWithTerm + 0.5) / (documentsWithTerm + 0.5);
          return Math.log(1 + Math.abs(x2));
        };
        lunr2.Token = function(str, metadata) {
          this.str = str || "";
          this.metadata = metadata || {};
        };
        lunr2.Token.prototype.toString = function() {
          return this.str;
        };
        lunr2.Token.prototype.update = function(fn) {
          this.str = fn(this.str, this.metadata);
          return this;
        };
        lunr2.Token.prototype.clone = function(fn) {
          fn = fn || function(s5) {
            return s5;
          };
          return new lunr2.Token(fn(this.str, this.metadata), this.metadata);
        };
        lunr2.tokenizer = function(obj, metadata) {
          if (obj == null || obj == void 0) {
            return [];
          }
          if (Array.isArray(obj)) {
            return obj.map(function(t4) {
              return new lunr2.Token(lunr2.utils.asString(t4).toLowerCase(), lunr2.utils.clone(metadata));
            });
          }
          var str = obj.toString().toLowerCase(), len = str.length, tokens = [];
          for (var sliceEnd = 0, sliceStart = 0; sliceEnd <= len; sliceEnd++) {
            var char = str.charAt(sliceEnd), sliceLength = sliceEnd - sliceStart;
            if (char.match(lunr2.tokenizer.separator) || sliceEnd == len) {
              if (sliceLength > 0) {
                var tokenMetadata = lunr2.utils.clone(metadata) || {};
                tokenMetadata["position"] = [sliceStart, sliceLength];
                tokenMetadata["index"] = tokens.length;
                tokens.push(new lunr2.Token(str.slice(sliceStart, sliceEnd), tokenMetadata));
              }
              sliceStart = sliceEnd + 1;
            }
          }
          return tokens;
        };
        lunr2.tokenizer.separator = /[\s\-]+/;
        lunr2.Pipeline = function() {
          this._stack = [];
        };
        lunr2.Pipeline.registeredFunctions = /* @__PURE__ */ Object.create(null);
        lunr2.Pipeline.registerFunction = function(fn, label) {
          if (label in this.registeredFunctions) {
            lunr2.utils.warn("Overwriting existing registered function: " + label);
          }
          fn.label = label;
          lunr2.Pipeline.registeredFunctions[fn.label] = fn;
        };
        lunr2.Pipeline.warnIfFunctionNotRegistered = function(fn) {
          var isRegistered = fn.label && fn.label in this.registeredFunctions;
          if (!isRegistered) {
            lunr2.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n", fn);
          }
        };
        lunr2.Pipeline.load = function(serialised) {
          var pipeline = new lunr2.Pipeline();
          serialised.forEach(function(fnName) {
            var fn = lunr2.Pipeline.registeredFunctions[fnName];
            if (fn) {
              pipeline.add(fn);
            } else {
              throw new Error("Cannot load unregistered function: " + fnName);
            }
          });
          return pipeline;
        };
        lunr2.Pipeline.prototype.add = function() {
          var fns = Array.prototype.slice.call(arguments);
          fns.forEach(function(fn) {
            lunr2.Pipeline.warnIfFunctionNotRegistered(fn);
            this._stack.push(fn);
          }, this);
        };
        lunr2.Pipeline.prototype.after = function(existingFn, newFn) {
          lunr2.Pipeline.warnIfFunctionNotRegistered(newFn);
          var pos = this._stack.indexOf(existingFn);
          if (pos == -1) {
            throw new Error("Cannot find existingFn");
          }
          pos = pos + 1;
          this._stack.splice(pos, 0, newFn);
        };
        lunr2.Pipeline.prototype.before = function(existingFn, newFn) {
          lunr2.Pipeline.warnIfFunctionNotRegistered(newFn);
          var pos = this._stack.indexOf(existingFn);
          if (pos == -1) {
            throw new Error("Cannot find existingFn");
          }
          this._stack.splice(pos, 0, newFn);
        };
        lunr2.Pipeline.prototype.remove = function(fn) {
          var pos = this._stack.indexOf(fn);
          if (pos == -1) {
            return;
          }
          this._stack.splice(pos, 1);
        };
        lunr2.Pipeline.prototype.run = function(tokens) {
          var stackLength = this._stack.length;
          for (var i5 = 0; i5 < stackLength; i5++) {
            var fn = this._stack[i5];
            var memo = [];
            for (var j = 0; j < tokens.length; j++) {
              var result = fn(tokens[j], j, tokens);
              if (result === null || result === void 0 || result === "")
                continue;
              if (Array.isArray(result)) {
                for (var k2 = 0; k2 < result.length; k2++) {
                  memo.push(result[k2]);
                }
              } else {
                memo.push(result);
              }
            }
            tokens = memo;
          }
          return tokens;
        };
        lunr2.Pipeline.prototype.runString = function(str, metadata) {
          var token = new lunr2.Token(str, metadata);
          return this.run([token]).map(function(t4) {
            return t4.toString();
          });
        };
        lunr2.Pipeline.prototype.reset = function() {
          this._stack = [];
        };
        lunr2.Pipeline.prototype.toJSON = function() {
          return this._stack.map(function(fn) {
            lunr2.Pipeline.warnIfFunctionNotRegistered(fn);
            return fn.label;
          });
        };
        lunr2.Vector = function(elements) {
          this._magnitude = 0;
          this.elements = elements || [];
        };
        lunr2.Vector.prototype.positionForIndex = function(index) {
          if (this.elements.length == 0) {
            return 0;
          }
          var start = 0, end = this.elements.length / 2, sliceLength = end - start, pivotPoint = Math.floor(sliceLength / 2), pivotIndex = this.elements[pivotPoint * 2];
          while (sliceLength > 1) {
            if (pivotIndex < index) {
              start = pivotPoint;
            }
            if (pivotIndex > index) {
              end = pivotPoint;
            }
            if (pivotIndex == index) {
              break;
            }
            sliceLength = end - start;
            pivotPoint = start + Math.floor(sliceLength / 2);
            pivotIndex = this.elements[pivotPoint * 2];
          }
          if (pivotIndex == index) {
            return pivotPoint * 2;
          }
          if (pivotIndex > index) {
            return pivotPoint * 2;
          }
          if (pivotIndex < index) {
            return (pivotPoint + 1) * 2;
          }
        };
        lunr2.Vector.prototype.insert = function(insertIdx, val) {
          this.upsert(insertIdx, val, function() {
            throw "duplicate index";
          });
        };
        lunr2.Vector.prototype.upsert = function(insertIdx, val, fn) {
          this._magnitude = 0;
          var position = this.positionForIndex(insertIdx);
          if (this.elements[position] == insertIdx) {
            this.elements[position + 1] = fn(this.elements[position + 1], val);
          } else {
            this.elements.splice(position, 0, insertIdx, val);
          }
        };
        lunr2.Vector.prototype.magnitude = function() {
          if (this._magnitude)
            return this._magnitude;
          var sumOfSquares = 0, elementsLength = this.elements.length;
          for (var i5 = 1; i5 < elementsLength; i5 += 2) {
            var val = this.elements[i5];
            sumOfSquares += val * val;
          }
          return this._magnitude = Math.sqrt(sumOfSquares);
        };
        lunr2.Vector.prototype.dot = function(otherVector) {
          var dotProduct = 0, a3 = this.elements, b2 = otherVector.elements, aLen = a3.length, bLen = b2.length, aVal = 0, bVal = 0, i5 = 0, j = 0;
          while (i5 < aLen && j < bLen) {
            aVal = a3[i5], bVal = b2[j];
            if (aVal < bVal) {
              i5 += 2;
            } else if (aVal > bVal) {
              j += 2;
            } else if (aVal == bVal) {
              dotProduct += a3[i5 + 1] * b2[j + 1];
              i5 += 2;
              j += 2;
            }
          }
          return dotProduct;
        };
        lunr2.Vector.prototype.similarity = function(otherVector) {
          return this.dot(otherVector) / this.magnitude() || 0;
        };
        lunr2.Vector.prototype.toArray = function() {
          var output = new Array(this.elements.length / 2);
          for (var i5 = 1, j = 0; i5 < this.elements.length; i5 += 2, j++) {
            output[j] = this.elements[i5];
          }
          return output;
        };
        lunr2.Vector.prototype.toJSON = function() {
          return this.elements;
        };
        lunr2.stemmer = function() {
          var step2list = {
            "ational": "ate",
            "tional": "tion",
            "enci": "ence",
            "anci": "ance",
            "izer": "ize",
            "bli": "ble",
            "alli": "al",
            "entli": "ent",
            "eli": "e",
            "ousli": "ous",
            "ization": "ize",
            "ation": "ate",
            "ator": "ate",
            "alism": "al",
            "iveness": "ive",
            "fulness": "ful",
            "ousness": "ous",
            "aliti": "al",
            "iviti": "ive",
            "biliti": "ble",
            "logi": "log"
          }, step3list = {
            "icate": "ic",
            "ative": "",
            "alize": "al",
            "iciti": "ic",
            "ical": "ic",
            "ful": "",
            "ness": ""
          }, c2 = "[^aeiou]", v2 = "[aeiouy]", C2 = c2 + "[^aeiouy]*", V2 = v2 + "[aeiou]*", mgr0 = "^(" + C2 + ")?" + V2 + C2, meq1 = "^(" + C2 + ")?" + V2 + C2 + "(" + V2 + ")?$", mgr1 = "^(" + C2 + ")?" + V2 + C2 + V2 + C2, s_v = "^(" + C2 + ")?" + v2;
          var re_mgr0 = new RegExp(mgr0);
          var re_mgr1 = new RegExp(mgr1);
          var re_meq1 = new RegExp(meq1);
          var re_s_v = new RegExp(s_v);
          var re_1a = /^(.+?)(ss|i)es$/;
          var re2_1a = /^(.+?)([^s])s$/;
          var re_1b = /^(.+?)eed$/;
          var re2_1b = /^(.+?)(ed|ing)$/;
          var re_1b_2 = /.$/;
          var re2_1b_2 = /(at|bl|iz)$/;
          var re3_1b_2 = new RegExp("([^aeiouylsz])\\1$");
          var re4_1b_2 = new RegExp("^" + C2 + v2 + "[^aeiouwxy]$");
          var re_1c = /^(.+?[^aeiou])y$/;
          var re_2 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
          var re_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
          var re_4 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
          var re2_4 = /^(.+?)(s|t)(ion)$/;
          var re_5 = /^(.+?)e$/;
          var re_5_1 = /ll$/;
          var re3_5 = new RegExp("^" + C2 + v2 + "[^aeiouwxy]$");
          var porterStemmer = function porterStemmer2(w2) {
            var stem, suffix, firstch, re, re2, re3, re4;
            if (w2.length < 3) {
              return w2;
            }
            firstch = w2.substr(0, 1);
            if (firstch == "y") {
              w2 = firstch.toUpperCase() + w2.substr(1);
            }
            re = re_1a;
            re2 = re2_1a;
            if (re.test(w2)) {
              w2 = w2.replace(re, "$1$2");
            } else if (re2.test(w2)) {
              w2 = w2.replace(re2, "$1$2");
            }
            re = re_1b;
            re2 = re2_1b;
            if (re.test(w2)) {
              var fp = re.exec(w2);
              re = re_mgr0;
              if (re.test(fp[1])) {
                re = re_1b_2;
                w2 = w2.replace(re, "");
              }
            } else if (re2.test(w2)) {
              var fp = re2.exec(w2);
              stem = fp[1];
              re2 = re_s_v;
              if (re2.test(stem)) {
                w2 = stem;
                re2 = re2_1b_2;
                re3 = re3_1b_2;
                re4 = re4_1b_2;
                if (re2.test(w2)) {
                  w2 = w2 + "e";
                } else if (re3.test(w2)) {
                  re = re_1b_2;
                  w2 = w2.replace(re, "");
                } else if (re4.test(w2)) {
                  w2 = w2 + "e";
                }
              }
            }
            re = re_1c;
            if (re.test(w2)) {
              var fp = re.exec(w2);
              stem = fp[1];
              w2 = stem + "i";
            }
            re = re_2;
            if (re.test(w2)) {
              var fp = re.exec(w2);
              stem = fp[1];
              suffix = fp[2];
              re = re_mgr0;
              if (re.test(stem)) {
                w2 = stem + step2list[suffix];
              }
            }
            re = re_3;
            if (re.test(w2)) {
              var fp = re.exec(w2);
              stem = fp[1];
              suffix = fp[2];
              re = re_mgr0;
              if (re.test(stem)) {
                w2 = stem + step3list[suffix];
              }
            }
            re = re_4;
            re2 = re2_4;
            if (re.test(w2)) {
              var fp = re.exec(w2);
              stem = fp[1];
              re = re_mgr1;
              if (re.test(stem)) {
                w2 = stem;
              }
            } else if (re2.test(w2)) {
              var fp = re2.exec(w2);
              stem = fp[1] + fp[2];
              re2 = re_mgr1;
              if (re2.test(stem)) {
                w2 = stem;
              }
            }
            re = re_5;
            if (re.test(w2)) {
              var fp = re.exec(w2);
              stem = fp[1];
              re = re_mgr1;
              re2 = re_meq1;
              re3 = re3_5;
              if (re.test(stem) || re2.test(stem) && !re3.test(stem)) {
                w2 = stem;
              }
            }
            re = re_5_1;
            re2 = re_mgr1;
            if (re.test(w2) && re2.test(w2)) {
              re = re_1b_2;
              w2 = w2.replace(re, "");
            }
            if (firstch == "y") {
              w2 = firstch.toLowerCase() + w2.substr(1);
            }
            return w2;
          };
          return function(token) {
            return token.update(porterStemmer);
          };
        }();
        lunr2.Pipeline.registerFunction(lunr2.stemmer, "stemmer");
        lunr2.generateStopWordFilter = function(stopWords) {
          var words = stopWords.reduce(function(memo, stopWord) {
            memo[stopWord] = stopWord;
            return memo;
          }, {});
          return function(token) {
            if (token && words[token.toString()] !== token.toString())
              return token;
          };
        };
        lunr2.stopWordFilter = lunr2.generateStopWordFilter([
          "a",
          "able",
          "about",
          "across",
          "after",
          "all",
          "almost",
          "also",
          "am",
          "among",
          "an",
          "and",
          "any",
          "are",
          "as",
          "at",
          "be",
          "because",
          "been",
          "but",
          "by",
          "can",
          "cannot",
          "could",
          "dear",
          "did",
          "do",
          "does",
          "either",
          "else",
          "ever",
          "every",
          "for",
          "from",
          "get",
          "got",
          "had",
          "has",
          "have",
          "he",
          "her",
          "hers",
          "him",
          "his",
          "how",
          "however",
          "i",
          "if",
          "in",
          "into",
          "is",
          "it",
          "its",
          "just",
          "least",
          "let",
          "like",
          "likely",
          "may",
          "me",
          "might",
          "most",
          "must",
          "my",
          "neither",
          "no",
          "nor",
          "not",
          "of",
          "off",
          "often",
          "on",
          "only",
          "or",
          "other",
          "our",
          "own",
          "rather",
          "said",
          "say",
          "says",
          "she",
          "should",
          "since",
          "so",
          "some",
          "than",
          "that",
          "the",
          "their",
          "them",
          "then",
          "there",
          "these",
          "they",
          "this",
          "tis",
          "to",
          "too",
          "twas",
          "us",
          "wants",
          "was",
          "we",
          "were",
          "what",
          "when",
          "where",
          "which",
          "while",
          "who",
          "whom",
          "why",
          "will",
          "with",
          "would",
          "yet",
          "you",
          "your"
        ]);
        lunr2.Pipeline.registerFunction(lunr2.stopWordFilter, "stopWordFilter");
        lunr2.trimmer = function(token) {
          return token.update(function(s5) {
            return s5.replace(/^\W+/, "").replace(/\W+$/, "");
          });
        };
        lunr2.Pipeline.registerFunction(lunr2.trimmer, "trimmer");
        lunr2.TokenSet = function() {
          this.final = false;
          this.edges = {};
          this.id = lunr2.TokenSet._nextId;
          lunr2.TokenSet._nextId += 1;
        };
        lunr2.TokenSet._nextId = 1;
        lunr2.TokenSet.fromArray = function(arr) {
          var builder = new lunr2.TokenSet.Builder();
          for (var i5 = 0, len = arr.length; i5 < len; i5++) {
            builder.insert(arr[i5]);
          }
          builder.finish();
          return builder.root;
        };
        lunr2.TokenSet.fromClause = function(clause) {
          if ("editDistance" in clause) {
            return lunr2.TokenSet.fromFuzzyString(clause.term, clause.editDistance);
          } else {
            return lunr2.TokenSet.fromString(clause.term);
          }
        };
        lunr2.TokenSet.fromFuzzyString = function(str, editDistance) {
          var root = new lunr2.TokenSet();
          var stack = [{
            node: root,
            editsRemaining: editDistance,
            str
          }];
          while (stack.length) {
            var frame = stack.pop();
            if (frame.str.length > 0) {
              var char = frame.str.charAt(0), noEditNode;
              if (char in frame.node.edges) {
                noEditNode = frame.node.edges[char];
              } else {
                noEditNode = new lunr2.TokenSet();
                frame.node.edges[char] = noEditNode;
              }
              if (frame.str.length == 1) {
                noEditNode.final = true;
              }
              stack.push({
                node: noEditNode,
                editsRemaining: frame.editsRemaining,
                str: frame.str.slice(1)
              });
            }
            if (frame.editsRemaining == 0) {
              continue;
            }
            if ("*" in frame.node.edges) {
              var insertionNode = frame.node.edges["*"];
            } else {
              var insertionNode = new lunr2.TokenSet();
              frame.node.edges["*"] = insertionNode;
            }
            if (frame.str.length == 0) {
              insertionNode.final = true;
            }
            stack.push({
              node: insertionNode,
              editsRemaining: frame.editsRemaining - 1,
              str: frame.str
            });
            if (frame.str.length > 1) {
              stack.push({
                node: frame.node,
                editsRemaining: frame.editsRemaining - 1,
                str: frame.str.slice(1)
              });
            }
            if (frame.str.length == 1) {
              frame.node.final = true;
            }
            if (frame.str.length >= 1) {
              if ("*" in frame.node.edges) {
                var substitutionNode = frame.node.edges["*"];
              } else {
                var substitutionNode = new lunr2.TokenSet();
                frame.node.edges["*"] = substitutionNode;
              }
              if (frame.str.length == 1) {
                substitutionNode.final = true;
              }
              stack.push({
                node: substitutionNode,
                editsRemaining: frame.editsRemaining - 1,
                str: frame.str.slice(1)
              });
            }
            if (frame.str.length > 1) {
              var charA = frame.str.charAt(0), charB = frame.str.charAt(1), transposeNode;
              if (charB in frame.node.edges) {
                transposeNode = frame.node.edges[charB];
              } else {
                transposeNode = new lunr2.TokenSet();
                frame.node.edges[charB] = transposeNode;
              }
              if (frame.str.length == 1) {
                transposeNode.final = true;
              }
              stack.push({
                node: transposeNode,
                editsRemaining: frame.editsRemaining - 1,
                str: charA + frame.str.slice(2)
              });
            }
          }
          return root;
        };
        lunr2.TokenSet.fromString = function(str) {
          var node = new lunr2.TokenSet(), root = node;
          for (var i5 = 0, len = str.length; i5 < len; i5++) {
            var char = str[i5], final = i5 == len - 1;
            if (char == "*") {
              node.edges[char] = node;
              node.final = final;
            } else {
              var next = new lunr2.TokenSet();
              next.final = final;
              node.edges[char] = next;
              node = next;
            }
          }
          return root;
        };
        lunr2.TokenSet.prototype.toArray = function() {
          var words = [];
          var stack = [{
            prefix: "",
            node: this
          }];
          while (stack.length) {
            var frame = stack.pop(), edges = Object.keys(frame.node.edges), len = edges.length;
            if (frame.node.final) {
              frame.prefix.charAt(0);
              words.push(frame.prefix);
            }
            for (var i5 = 0; i5 < len; i5++) {
              var edge = edges[i5];
              stack.push({
                prefix: frame.prefix.concat(edge),
                node: frame.node.edges[edge]
              });
            }
          }
          return words;
        };
        lunr2.TokenSet.prototype.toString = function() {
          if (this._str) {
            return this._str;
          }
          var str = this.final ? "1" : "0", labels = Object.keys(this.edges).sort(), len = labels.length;
          for (var i5 = 0; i5 < len; i5++) {
            var label = labels[i5], node = this.edges[label];
            str = str + label + node.id;
          }
          return str;
        };
        lunr2.TokenSet.prototype.intersect = function(b2) {
          var output = new lunr2.TokenSet(), frame = void 0;
          var stack = [{
            qNode: b2,
            output,
            node: this
          }];
          while (stack.length) {
            frame = stack.pop();
            var qEdges = Object.keys(frame.qNode.edges), qLen = qEdges.length, nEdges = Object.keys(frame.node.edges), nLen = nEdges.length;
            for (var q = 0; q < qLen; q++) {
              var qEdge = qEdges[q];
              for (var n7 = 0; n7 < nLen; n7++) {
                var nEdge = nEdges[n7];
                if (nEdge == qEdge || qEdge == "*") {
                  var node = frame.node.edges[nEdge], qNode = frame.qNode.edges[qEdge], final = node.final && qNode.final, next = void 0;
                  if (nEdge in frame.output.edges) {
                    next = frame.output.edges[nEdge];
                    next.final = next.final || final;
                  } else {
                    next = new lunr2.TokenSet();
                    next.final = final;
                    frame.output.edges[nEdge] = next;
                  }
                  stack.push({
                    qNode,
                    output: next,
                    node
                  });
                }
              }
            }
          }
          return output;
        };
        lunr2.TokenSet.Builder = function() {
          this.previousWord = "";
          this.root = new lunr2.TokenSet();
          this.uncheckedNodes = [];
          this.minimizedNodes = {};
        };
        lunr2.TokenSet.Builder.prototype.insert = function(word) {
          var node, commonPrefix = 0;
          if (word < this.previousWord) {
            throw new Error("Out of order word insertion");
          }
          for (var i5 = 0; i5 < word.length && i5 < this.previousWord.length; i5++) {
            if (word[i5] != this.previousWord[i5])
              break;
            commonPrefix++;
          }
          this.minimize(commonPrefix);
          if (this.uncheckedNodes.length == 0) {
            node = this.root;
          } else {
            node = this.uncheckedNodes[this.uncheckedNodes.length - 1].child;
          }
          for (var i5 = commonPrefix; i5 < word.length; i5++) {
            var nextNode = new lunr2.TokenSet(), char = word[i5];
            node.edges[char] = nextNode;
            this.uncheckedNodes.push({
              parent: node,
              char,
              child: nextNode
            });
            node = nextNode;
          }
          node.final = true;
          this.previousWord = word;
        };
        lunr2.TokenSet.Builder.prototype.finish = function() {
          this.minimize(0);
        };
        lunr2.TokenSet.Builder.prototype.minimize = function(downTo) {
          for (var i5 = this.uncheckedNodes.length - 1; i5 >= downTo; i5--) {
            var node = this.uncheckedNodes[i5], childKey = node.child.toString();
            if (childKey in this.minimizedNodes) {
              node.parent.edges[node.char] = this.minimizedNodes[childKey];
            } else {
              node.child._str = childKey;
              this.minimizedNodes[childKey] = node.child;
            }
            this.uncheckedNodes.pop();
          }
        };
        lunr2.Index = function(attrs) {
          this.invertedIndex = attrs.invertedIndex;
          this.fieldVectors = attrs.fieldVectors;
          this.tokenSet = attrs.tokenSet;
          this.fields = attrs.fields;
          this.pipeline = attrs.pipeline;
        };
        lunr2.Index.prototype.search = function(queryString) {
          return this.query(function(query) {
            var parser = new lunr2.QueryParser(queryString, query);
            parser.parse();
          });
        };
        lunr2.Index.prototype.query = function(fn) {
          var query = new lunr2.Query(this.fields), matchingFields = /* @__PURE__ */ Object.create(null), queryVectors = /* @__PURE__ */ Object.create(null), termFieldCache = /* @__PURE__ */ Object.create(null), requiredMatches = /* @__PURE__ */ Object.create(null), prohibitedMatches = /* @__PURE__ */ Object.create(null);
          for (var i5 = 0; i5 < this.fields.length; i5++) {
            queryVectors[this.fields[i5]] = new lunr2.Vector();
          }
          fn.call(query, query);
          for (var i5 = 0; i5 < query.clauses.length; i5++) {
            var clause = query.clauses[i5], terms = null, clauseMatches = lunr2.Set.empty;
            if (clause.usePipeline) {
              terms = this.pipeline.runString(clause.term, {
                fields: clause.fields
              });
            } else {
              terms = [clause.term];
            }
            for (var m2 = 0; m2 < terms.length; m2++) {
              var term = terms[m2];
              clause.term = term;
              var termTokenSet = lunr2.TokenSet.fromClause(clause), expandedTerms = this.tokenSet.intersect(termTokenSet).toArray();
              if (expandedTerms.length === 0 && clause.presence === lunr2.Query.presence.REQUIRED) {
                for (var k2 = 0; k2 < clause.fields.length; k2++) {
                  var field = clause.fields[k2];
                  requiredMatches[field] = lunr2.Set.empty;
                }
                break;
              }
              for (var j = 0; j < expandedTerms.length; j++) {
                var expandedTerm = expandedTerms[j], posting = this.invertedIndex[expandedTerm], termIndex = posting._index;
                for (var k2 = 0; k2 < clause.fields.length; k2++) {
                  var field = clause.fields[k2], fieldPosting = posting[field], matchingDocumentRefs = Object.keys(fieldPosting), termField = expandedTerm + "/" + field, matchingDocumentsSet = new lunr2.Set(matchingDocumentRefs);
                  if (clause.presence == lunr2.Query.presence.REQUIRED) {
                    clauseMatches = clauseMatches.union(matchingDocumentsSet);
                    if (requiredMatches[field] === void 0) {
                      requiredMatches[field] = lunr2.Set.complete;
                    }
                  }
                  if (clause.presence == lunr2.Query.presence.PROHIBITED) {
                    if (prohibitedMatches[field] === void 0) {
                      prohibitedMatches[field] = lunr2.Set.empty;
                    }
                    prohibitedMatches[field] = prohibitedMatches[field].union(matchingDocumentsSet);
                    continue;
                  }
                  queryVectors[field].upsert(termIndex, clause.boost, function(a3, b2) {
                    return a3 + b2;
                  });
                  if (termFieldCache[termField]) {
                    continue;
                  }
                  for (var l5 = 0; l5 < matchingDocumentRefs.length; l5++) {
                    var matchingDocumentRef = matchingDocumentRefs[l5], matchingFieldRef = new lunr2.FieldRef(matchingDocumentRef, field), metadata = fieldPosting[matchingDocumentRef], fieldMatch;
                    if ((fieldMatch = matchingFields[matchingFieldRef]) === void 0) {
                      matchingFields[matchingFieldRef] = new lunr2.MatchData(expandedTerm, field, metadata);
                    } else {
                      fieldMatch.add(expandedTerm, field, metadata);
                    }
                  }
                  termFieldCache[termField] = true;
                }
              }
            }
            if (clause.presence === lunr2.Query.presence.REQUIRED) {
              for (var k2 = 0; k2 < clause.fields.length; k2++) {
                var field = clause.fields[k2];
                requiredMatches[field] = requiredMatches[field].intersect(clauseMatches);
              }
            }
          }
          var allRequiredMatches = lunr2.Set.complete, allProhibitedMatches = lunr2.Set.empty;
          for (var i5 = 0; i5 < this.fields.length; i5++) {
            var field = this.fields[i5];
            if (requiredMatches[field]) {
              allRequiredMatches = allRequiredMatches.intersect(requiredMatches[field]);
            }
            if (prohibitedMatches[field]) {
              allProhibitedMatches = allProhibitedMatches.union(prohibitedMatches[field]);
            }
          }
          var matchingFieldRefs = Object.keys(matchingFields), results = [], matches = /* @__PURE__ */ Object.create(null);
          if (query.isNegated()) {
            matchingFieldRefs = Object.keys(this.fieldVectors);
            for (var i5 = 0; i5 < matchingFieldRefs.length; i5++) {
              var matchingFieldRef = matchingFieldRefs[i5];
              var fieldRef = lunr2.FieldRef.fromString(matchingFieldRef);
              matchingFields[matchingFieldRef] = new lunr2.MatchData();
            }
          }
          for (var i5 = 0; i5 < matchingFieldRefs.length; i5++) {
            var fieldRef = lunr2.FieldRef.fromString(matchingFieldRefs[i5]), docRef = fieldRef.docRef;
            if (!allRequiredMatches.contains(docRef)) {
              continue;
            }
            if (allProhibitedMatches.contains(docRef)) {
              continue;
            }
            var fieldVector = this.fieldVectors[fieldRef], score = queryVectors[fieldRef.fieldName].similarity(fieldVector), docMatch;
            if ((docMatch = matches[docRef]) !== void 0) {
              docMatch.score += score;
              docMatch.matchData.combine(matchingFields[fieldRef]);
            } else {
              var match = {
                ref: docRef,
                score,
                matchData: matchingFields[fieldRef]
              };
              matches[docRef] = match;
              results.push(match);
            }
          }
          return results.sort(function(a3, b2) {
            return b2.score - a3.score;
          });
        };
        lunr2.Index.prototype.toJSON = function() {
          var invertedIndex = Object.keys(this.invertedIndex).sort().map(function(term) {
            return [term, this.invertedIndex[term]];
          }, this);
          var fieldVectors = Object.keys(this.fieldVectors).map(function(ref) {
            return [ref, this.fieldVectors[ref].toJSON()];
          }, this);
          return {
            version: lunr2.version,
            fields: this.fields,
            fieldVectors,
            invertedIndex,
            pipeline: this.pipeline.toJSON()
          };
        };
        lunr2.Index.load = function(serializedIndex) {
          var attrs = {}, fieldVectors = {}, serializedVectors = serializedIndex.fieldVectors, invertedIndex = /* @__PURE__ */ Object.create(null), serializedInvertedIndex = serializedIndex.invertedIndex, tokenSetBuilder = new lunr2.TokenSet.Builder(), pipeline = lunr2.Pipeline.load(serializedIndex.pipeline);
          if (serializedIndex.version != lunr2.version) {
            lunr2.utils.warn("Version mismatch when loading serialised index. Current version of lunr '" + lunr2.version + "' does not match serialized index '" + serializedIndex.version + "'");
          }
          for (var i5 = 0; i5 < serializedVectors.length; i5++) {
            var tuple = serializedVectors[i5], ref = tuple[0], elements = tuple[1];
            fieldVectors[ref] = new lunr2.Vector(elements);
          }
          for (var i5 = 0; i5 < serializedInvertedIndex.length; i5++) {
            var tuple = serializedInvertedIndex[i5], term = tuple[0], posting = tuple[1];
            tokenSetBuilder.insert(term);
            invertedIndex[term] = posting;
          }
          tokenSetBuilder.finish();
          attrs.fields = serializedIndex.fields;
          attrs.fieldVectors = fieldVectors;
          attrs.invertedIndex = invertedIndex;
          attrs.tokenSet = tokenSetBuilder.root;
          attrs.pipeline = pipeline;
          return new lunr2.Index(attrs);
        };
        lunr2.Builder = function() {
          this._ref = "id";
          this._fields = /* @__PURE__ */ Object.create(null);
          this._documents = /* @__PURE__ */ Object.create(null);
          this.invertedIndex = /* @__PURE__ */ Object.create(null);
          this.fieldTermFrequencies = {};
          this.fieldLengths = {};
          this.tokenizer = lunr2.tokenizer;
          this.pipeline = new lunr2.Pipeline();
          this.searchPipeline = new lunr2.Pipeline();
          this.documentCount = 0;
          this._b = 0.75;
          this._k1 = 1.2;
          this.termIndex = 0;
          this.metadataWhitelist = [];
        };
        lunr2.Builder.prototype.ref = function(ref) {
          this._ref = ref;
        };
        lunr2.Builder.prototype.field = function(fieldName, attributes) {
          if (/\//.test(fieldName)) {
            throw new RangeError("Field '" + fieldName + "' contains illegal character '/'");
          }
          this._fields[fieldName] = attributes || {};
        };
        lunr2.Builder.prototype.b = function(number) {
          if (number < 0) {
            this._b = 0;
          } else if (number > 1) {
            this._b = 1;
          } else {
            this._b = number;
          }
        };
        lunr2.Builder.prototype.k1 = function(number) {
          this._k1 = number;
        };
        lunr2.Builder.prototype.add = function(doc, attributes) {
          var docRef = doc[this._ref], fields = Object.keys(this._fields);
          this._documents[docRef] = attributes || {};
          this.documentCount += 1;
          for (var i5 = 0; i5 < fields.length; i5++) {
            var fieldName = fields[i5], extractor = this._fields[fieldName].extractor, field = extractor ? extractor(doc) : doc[fieldName], tokens = this.tokenizer(field, {
              fields: [fieldName]
            }), terms = this.pipeline.run(tokens), fieldRef = new lunr2.FieldRef(docRef, fieldName), fieldTerms = /* @__PURE__ */ Object.create(null);
            this.fieldTermFrequencies[fieldRef] = fieldTerms;
            this.fieldLengths[fieldRef] = 0;
            this.fieldLengths[fieldRef] += terms.length;
            for (var j = 0; j < terms.length; j++) {
              var term = terms[j];
              if (fieldTerms[term] == void 0) {
                fieldTerms[term] = 0;
              }
              fieldTerms[term] += 1;
              if (this.invertedIndex[term] == void 0) {
                var posting = /* @__PURE__ */ Object.create(null);
                posting["_index"] = this.termIndex;
                this.termIndex += 1;
                for (var k2 = 0; k2 < fields.length; k2++) {
                  posting[fields[k2]] = /* @__PURE__ */ Object.create(null);
                }
                this.invertedIndex[term] = posting;
              }
              if (this.invertedIndex[term][fieldName][docRef] == void 0) {
                this.invertedIndex[term][fieldName][docRef] = /* @__PURE__ */ Object.create(null);
              }
              for (var l5 = 0; l5 < this.metadataWhitelist.length; l5++) {
                var metadataKey = this.metadataWhitelist[l5], metadata = term.metadata[metadataKey];
                if (this.invertedIndex[term][fieldName][docRef][metadataKey] == void 0) {
                  this.invertedIndex[term][fieldName][docRef][metadataKey] = [];
                }
                this.invertedIndex[term][fieldName][docRef][metadataKey].push(metadata);
              }
            }
          }
        };
        lunr2.Builder.prototype.calculateAverageFieldLengths = function() {
          var fieldRefs = Object.keys(this.fieldLengths), numberOfFields = fieldRefs.length, accumulator = {}, documentsWithField = {};
          for (var i5 = 0; i5 < numberOfFields; i5++) {
            var fieldRef = lunr2.FieldRef.fromString(fieldRefs[i5]), field = fieldRef.fieldName;
            documentsWithField[field] || (documentsWithField[field] = 0);
            documentsWithField[field] += 1;
            accumulator[field] || (accumulator[field] = 0);
            accumulator[field] += this.fieldLengths[fieldRef];
          }
          var fields = Object.keys(this._fields);
          for (var i5 = 0; i5 < fields.length; i5++) {
            var fieldName = fields[i5];
            accumulator[fieldName] = accumulator[fieldName] / documentsWithField[fieldName];
          }
          this.averageFieldLength = accumulator;
        };
        lunr2.Builder.prototype.createFieldVectors = function() {
          var fieldVectors = {}, fieldRefs = Object.keys(this.fieldTermFrequencies), fieldRefsLength = fieldRefs.length, termIdfCache = /* @__PURE__ */ Object.create(null);
          for (var i5 = 0; i5 < fieldRefsLength; i5++) {
            var fieldRef = lunr2.FieldRef.fromString(fieldRefs[i5]), fieldName = fieldRef.fieldName, fieldLength = this.fieldLengths[fieldRef], fieldVector = new lunr2.Vector(), termFrequencies = this.fieldTermFrequencies[fieldRef], terms = Object.keys(termFrequencies), termsLength = terms.length;
            var fieldBoost = this._fields[fieldName].boost || 1, docBoost = this._documents[fieldRef.docRef].boost || 1;
            for (var j = 0; j < termsLength; j++) {
              var term = terms[j], tf = termFrequencies[term], termIndex = this.invertedIndex[term]._index, idf, score, scoreWithPrecision;
              if (termIdfCache[term] === void 0) {
                idf = lunr2.idf(this.invertedIndex[term], this.documentCount);
                termIdfCache[term] = idf;
              } else {
                idf = termIdfCache[term];
              }
              score = idf * ((this._k1 + 1) * tf) / (this._k1 * (1 - this._b + this._b * (fieldLength / this.averageFieldLength[fieldName])) + tf);
              score *= fieldBoost;
              score *= docBoost;
              scoreWithPrecision = Math.round(score * 1e3) / 1e3;
              fieldVector.insert(termIndex, scoreWithPrecision);
            }
            fieldVectors[fieldRef] = fieldVector;
          }
          this.fieldVectors = fieldVectors;
        };
        lunr2.Builder.prototype.createTokenSet = function() {
          this.tokenSet = lunr2.TokenSet.fromArray(Object.keys(this.invertedIndex).sort());
        };
        lunr2.Builder.prototype.build = function() {
          this.calculateAverageFieldLengths();
          this.createFieldVectors();
          this.createTokenSet();
          return new lunr2.Index({
            invertedIndex: this.invertedIndex,
            fieldVectors: this.fieldVectors,
            tokenSet: this.tokenSet,
            fields: Object.keys(this._fields),
            pipeline: this.searchPipeline
          });
        };
        lunr2.Builder.prototype.use = function(fn) {
          var args = Array.prototype.slice.call(arguments, 1);
          args.unshift(this);
          fn.apply(this, args);
        };
        lunr2.MatchData = function(term, field, metadata) {
          var clonedMetadata = /* @__PURE__ */ Object.create(null), metadataKeys = Object.keys(metadata || {});
          for (var i5 = 0; i5 < metadataKeys.length; i5++) {
            var key = metadataKeys[i5];
            clonedMetadata[key] = metadata[key].slice();
          }
          this.metadata = /* @__PURE__ */ Object.create(null);
          if (term !== void 0) {
            this.metadata[term] = /* @__PURE__ */ Object.create(null);
            this.metadata[term][field] = clonedMetadata;
          }
        };
        lunr2.MatchData.prototype.combine = function(otherMatchData) {
          var terms = Object.keys(otherMatchData.metadata);
          for (var i5 = 0; i5 < terms.length; i5++) {
            var term = terms[i5], fields = Object.keys(otherMatchData.metadata[term]);
            if (this.metadata[term] == void 0) {
              this.metadata[term] = /* @__PURE__ */ Object.create(null);
            }
            for (var j = 0; j < fields.length; j++) {
              var field = fields[j], keys = Object.keys(otherMatchData.metadata[term][field]);
              if (this.metadata[term][field] == void 0) {
                this.metadata[term][field] = /* @__PURE__ */ Object.create(null);
              }
              for (var k2 = 0; k2 < keys.length; k2++) {
                var key = keys[k2];
                if (this.metadata[term][field][key] == void 0) {
                  this.metadata[term][field][key] = otherMatchData.metadata[term][field][key];
                } else {
                  this.metadata[term][field][key] = this.metadata[term][field][key].concat(otherMatchData.metadata[term][field][key]);
                }
              }
            }
          }
        };
        lunr2.MatchData.prototype.add = function(term, field, metadata) {
          if (!(term in this.metadata)) {
            this.metadata[term] = /* @__PURE__ */ Object.create(null);
            this.metadata[term][field] = metadata;
            return;
          }
          if (!(field in this.metadata[term])) {
            this.metadata[term][field] = metadata;
            return;
          }
          var metadataKeys = Object.keys(metadata);
          for (var i5 = 0; i5 < metadataKeys.length; i5++) {
            var key = metadataKeys[i5];
            if (key in this.metadata[term][field]) {
              this.metadata[term][field][key] = this.metadata[term][field][key].concat(metadata[key]);
            } else {
              this.metadata[term][field][key] = metadata[key];
            }
          }
        };
        lunr2.Query = function(allFields) {
          this.clauses = [];
          this.allFields = allFields;
        };
        lunr2.Query.wildcard = new String("*");
        lunr2.Query.wildcard.NONE = 0;
        lunr2.Query.wildcard.LEADING = 1;
        lunr2.Query.wildcard.TRAILING = 2;
        lunr2.Query.presence = {
          OPTIONAL: 1,
          REQUIRED: 2,
          PROHIBITED: 3
        };
        lunr2.Query.prototype.clause = function(clause) {
          if (!("fields" in clause)) {
            clause.fields = this.allFields;
          }
          if (!("boost" in clause)) {
            clause.boost = 1;
          }
          if (!("usePipeline" in clause)) {
            clause.usePipeline = true;
          }
          if (!("wildcard" in clause)) {
            clause.wildcard = lunr2.Query.wildcard.NONE;
          }
          if (clause.wildcard & lunr2.Query.wildcard.LEADING && clause.term.charAt(0) != lunr2.Query.wildcard) {
            clause.term = "*" + clause.term;
          }
          if (clause.wildcard & lunr2.Query.wildcard.TRAILING && clause.term.slice(-1) != lunr2.Query.wildcard) {
            clause.term = "" + clause.term + "*";
          }
          if (!("presence" in clause)) {
            clause.presence = lunr2.Query.presence.OPTIONAL;
          }
          this.clauses.push(clause);
          return this;
        };
        lunr2.Query.prototype.isNegated = function() {
          for (var i5 = 0; i5 < this.clauses.length; i5++) {
            if (this.clauses[i5].presence != lunr2.Query.presence.PROHIBITED) {
              return false;
            }
          }
          return true;
        };
        lunr2.Query.prototype.term = function(term, options) {
          if (Array.isArray(term)) {
            term.forEach(function(t4) {
              this.term(t4, lunr2.utils.clone(options));
            }, this);
            return this;
          }
          var clause = options || {};
          clause.term = term.toString();
          this.clause(clause);
          return this;
        };
        lunr2.QueryParseError = function(message, start, end) {
          this.name = "QueryParseError";
          this.message = message;
          this.start = start;
          this.end = end;
        };
        lunr2.QueryParseError.prototype = new Error();
        lunr2.QueryLexer = function(str) {
          this.lexemes = [];
          this.str = str;
          this.length = str.length;
          this.pos = 0;
          this.start = 0;
          this.escapeCharPositions = [];
        };
        lunr2.QueryLexer.prototype.run = function() {
          var state = lunr2.QueryLexer.lexText;
          while (state) {
            state = state(this);
          }
        };
        lunr2.QueryLexer.prototype.sliceString = function() {
          var subSlices = [], sliceStart = this.start, sliceEnd = this.pos;
          for (var i5 = 0; i5 < this.escapeCharPositions.length; i5++) {
            sliceEnd = this.escapeCharPositions[i5];
            subSlices.push(this.str.slice(sliceStart, sliceEnd));
            sliceStart = sliceEnd + 1;
          }
          subSlices.push(this.str.slice(sliceStart, this.pos));
          this.escapeCharPositions.length = 0;
          return subSlices.join("");
        };
        lunr2.QueryLexer.prototype.emit = function(type) {
          this.lexemes.push({
            type,
            str: this.sliceString(),
            start: this.start,
            end: this.pos
          });
          this.start = this.pos;
        };
        lunr2.QueryLexer.prototype.escapeCharacter = function() {
          this.escapeCharPositions.push(this.pos - 1);
          this.pos += 1;
        };
        lunr2.QueryLexer.prototype.next = function() {
          if (this.pos >= this.length) {
            return lunr2.QueryLexer.EOS;
          }
          var char = this.str.charAt(this.pos);
          this.pos += 1;
          return char;
        };
        lunr2.QueryLexer.prototype.width = function() {
          return this.pos - this.start;
        };
        lunr2.QueryLexer.prototype.ignore = function() {
          if (this.start == this.pos) {
            this.pos += 1;
          }
          this.start = this.pos;
        };
        lunr2.QueryLexer.prototype.backup = function() {
          this.pos -= 1;
        };
        lunr2.QueryLexer.prototype.acceptDigitRun = function() {
          var char, charCode;
          do {
            char = this.next();
            charCode = char.charCodeAt(0);
          } while (charCode > 47 && charCode < 58);
          if (char != lunr2.QueryLexer.EOS) {
            this.backup();
          }
        };
        lunr2.QueryLexer.prototype.more = function() {
          return this.pos < this.length;
        };
        lunr2.QueryLexer.EOS = "EOS";
        lunr2.QueryLexer.FIELD = "FIELD";
        lunr2.QueryLexer.TERM = "TERM";
        lunr2.QueryLexer.EDIT_DISTANCE = "EDIT_DISTANCE";
        lunr2.QueryLexer.BOOST = "BOOST";
        lunr2.QueryLexer.PRESENCE = "PRESENCE";
        lunr2.QueryLexer.lexField = function(lexer) {
          lexer.backup();
          lexer.emit(lunr2.QueryLexer.FIELD);
          lexer.ignore();
          return lunr2.QueryLexer.lexText;
        };
        lunr2.QueryLexer.lexTerm = function(lexer) {
          if (lexer.width() > 1) {
            lexer.backup();
            lexer.emit(lunr2.QueryLexer.TERM);
          }
          lexer.ignore();
          if (lexer.more()) {
            return lunr2.QueryLexer.lexText;
          }
        };
        lunr2.QueryLexer.lexEditDistance = function(lexer) {
          lexer.ignore();
          lexer.acceptDigitRun();
          lexer.emit(lunr2.QueryLexer.EDIT_DISTANCE);
          return lunr2.QueryLexer.lexText;
        };
        lunr2.QueryLexer.lexBoost = function(lexer) {
          lexer.ignore();
          lexer.acceptDigitRun();
          lexer.emit(lunr2.QueryLexer.BOOST);
          return lunr2.QueryLexer.lexText;
        };
        lunr2.QueryLexer.lexEOS = function(lexer) {
          if (lexer.width() > 0) {
            lexer.emit(lunr2.QueryLexer.TERM);
          }
        };
        lunr2.QueryLexer.termSeparator = lunr2.tokenizer.separator;
        lunr2.QueryLexer.lexText = function(lexer) {
          while (true) {
            var char = lexer.next();
            if (char == lunr2.QueryLexer.EOS) {
              return lunr2.QueryLexer.lexEOS;
            }
            if (char.charCodeAt(0) == 92) {
              lexer.escapeCharacter();
              continue;
            }
            if (char == ":") {
              return lunr2.QueryLexer.lexField;
            }
            if (char == "~") {
              lexer.backup();
              if (lexer.width() > 0) {
                lexer.emit(lunr2.QueryLexer.TERM);
              }
              return lunr2.QueryLexer.lexEditDistance;
            }
            if (char == "^") {
              lexer.backup();
              if (lexer.width() > 0) {
                lexer.emit(lunr2.QueryLexer.TERM);
              }
              return lunr2.QueryLexer.lexBoost;
            }
            if (char == "+" && lexer.width() === 1) {
              lexer.emit(lunr2.QueryLexer.PRESENCE);
              return lunr2.QueryLexer.lexText;
            }
            if (char == "-" && lexer.width() === 1) {
              lexer.emit(lunr2.QueryLexer.PRESENCE);
              return lunr2.QueryLexer.lexText;
            }
            if (char.match(lunr2.QueryLexer.termSeparator)) {
              return lunr2.QueryLexer.lexTerm;
            }
          }
        };
        lunr2.QueryParser = function(str, query) {
          this.lexer = new lunr2.QueryLexer(str);
          this.query = query;
          this.currentClause = {};
          this.lexemeIdx = 0;
        };
        lunr2.QueryParser.prototype.parse = function() {
          this.lexer.run();
          this.lexemes = this.lexer.lexemes;
          var state = lunr2.QueryParser.parseClause;
          while (state) {
            state = state(this);
          }
          return this.query;
        };
        lunr2.QueryParser.prototype.peekLexeme = function() {
          return this.lexemes[this.lexemeIdx];
        };
        lunr2.QueryParser.prototype.consumeLexeme = function() {
          var lexeme = this.peekLexeme();
          this.lexemeIdx += 1;
          return lexeme;
        };
        lunr2.QueryParser.prototype.nextClause = function() {
          var completedClause = this.currentClause;
          this.query.clause(completedClause);
          this.currentClause = {};
        };
        lunr2.QueryParser.parseClause = function(parser) {
          var lexeme = parser.peekLexeme();
          if (lexeme == void 0) {
            return;
          }
          switch (lexeme.type) {
            case lunr2.QueryLexer.PRESENCE:
              return lunr2.QueryParser.parsePresence;
            case lunr2.QueryLexer.FIELD:
              return lunr2.QueryParser.parseField;
            case lunr2.QueryLexer.TERM:
              return lunr2.QueryParser.parseTerm;
            default:
              var errorMessage = "expected either a field or a term, found " + lexeme.type;
              if (lexeme.str.length >= 1) {
                errorMessage += " with value '" + lexeme.str + "'";
              }
              throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
        };
        lunr2.QueryParser.parsePresence = function(parser) {
          var lexeme = parser.consumeLexeme();
          if (lexeme == void 0) {
            return;
          }
          switch (lexeme.str) {
            case "-":
              parser.currentClause.presence = lunr2.Query.presence.PROHIBITED;
              break;
            case "+":
              parser.currentClause.presence = lunr2.Query.presence.REQUIRED;
              break;
            default:
              var errorMessage = "unrecognised presence operator'" + lexeme.str + "'";
              throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          var nextLexeme = parser.peekLexeme();
          if (nextLexeme == void 0) {
            var errorMessage = "expecting term or field, found nothing";
            throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          switch (nextLexeme.type) {
            case lunr2.QueryLexer.FIELD:
              return lunr2.QueryParser.parseField;
            case lunr2.QueryLexer.TERM:
              return lunr2.QueryParser.parseTerm;
            default:
              var errorMessage = "expecting term or field, found '" + nextLexeme.type + "'";
              throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
          }
        };
        lunr2.QueryParser.parseField = function(parser) {
          var lexeme = parser.consumeLexeme();
          if (lexeme == void 0) {
            return;
          }
          if (parser.query.allFields.indexOf(lexeme.str) == -1) {
            var possibleFields = parser.query.allFields.map(function(f2) {
              return "'" + f2 + "'";
            }).join(", "), errorMessage = "unrecognised field '" + lexeme.str + "', possible fields: " + possibleFields;
            throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          parser.currentClause.fields = [lexeme.str];
          var nextLexeme = parser.peekLexeme();
          if (nextLexeme == void 0) {
            var errorMessage = "expecting term, found nothing";
            throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          switch (nextLexeme.type) {
            case lunr2.QueryLexer.TERM:
              return lunr2.QueryParser.parseTerm;
            default:
              var errorMessage = "expecting term, found '" + nextLexeme.type + "'";
              throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
          }
        };
        lunr2.QueryParser.parseTerm = function(parser) {
          var lexeme = parser.consumeLexeme();
          if (lexeme == void 0) {
            return;
          }
          parser.currentClause.term = lexeme.str.toLowerCase();
          if (lexeme.str.indexOf("*") != -1) {
            parser.currentClause.usePipeline = false;
          }
          var nextLexeme = parser.peekLexeme();
          if (nextLexeme == void 0) {
            parser.nextClause();
            return;
          }
          switch (nextLexeme.type) {
            case lunr2.QueryLexer.TERM:
              parser.nextClause();
              return lunr2.QueryParser.parseTerm;
            case lunr2.QueryLexer.FIELD:
              parser.nextClause();
              return lunr2.QueryParser.parseField;
            case lunr2.QueryLexer.EDIT_DISTANCE:
              return lunr2.QueryParser.parseEditDistance;
            case lunr2.QueryLexer.BOOST:
              return lunr2.QueryParser.parseBoost;
            case lunr2.QueryLexer.PRESENCE:
              parser.nextClause();
              return lunr2.QueryParser.parsePresence;
            default:
              var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
              throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
          }
        };
        lunr2.QueryParser.parseEditDistance = function(parser) {
          var lexeme = parser.consumeLexeme();
          if (lexeme == void 0) {
            return;
          }
          var editDistance = parseInt(lexeme.str, 10);
          if (isNaN(editDistance)) {
            var errorMessage = "edit distance must be numeric";
            throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          parser.currentClause.editDistance = editDistance;
          var nextLexeme = parser.peekLexeme();
          if (nextLexeme == void 0) {
            parser.nextClause();
            return;
          }
          switch (nextLexeme.type) {
            case lunr2.QueryLexer.TERM:
              parser.nextClause();
              return lunr2.QueryParser.parseTerm;
            case lunr2.QueryLexer.FIELD:
              parser.nextClause();
              return lunr2.QueryParser.parseField;
            case lunr2.QueryLexer.EDIT_DISTANCE:
              return lunr2.QueryParser.parseEditDistance;
            case lunr2.QueryLexer.BOOST:
              return lunr2.QueryParser.parseBoost;
            case lunr2.QueryLexer.PRESENCE:
              parser.nextClause();
              return lunr2.QueryParser.parsePresence;
            default:
              var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
              throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
          }
        };
        lunr2.QueryParser.parseBoost = function(parser) {
          var lexeme = parser.consumeLexeme();
          if (lexeme == void 0) {
            return;
          }
          var boost = parseInt(lexeme.str, 10);
          if (isNaN(boost)) {
            var errorMessage = "boost must be numeric";
            throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          parser.currentClause.boost = boost;
          var nextLexeme = parser.peekLexeme();
          if (nextLexeme == void 0) {
            parser.nextClause();
            return;
          }
          switch (nextLexeme.type) {
            case lunr2.QueryLexer.TERM:
              parser.nextClause();
              return lunr2.QueryParser.parseTerm;
            case lunr2.QueryLexer.FIELD:
              parser.nextClause();
              return lunr2.QueryParser.parseField;
            case lunr2.QueryLexer.EDIT_DISTANCE:
              return lunr2.QueryParser.parseEditDistance;
            case lunr2.QueryLexer.BOOST:
              return lunr2.QueryParser.parseBoost;
            case lunr2.QueryLexer.PRESENCE:
              parser.nextClause();
              return lunr2.QueryParser.parsePresence;
            default:
              var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
              throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
          }
        };
        (function(root, factory) {
          if (typeof define === "function" && define.amd) {
            define(factory);
          } else if (typeof exports === "object") {
            module.exports = factory();
          } else {
            root.lunr = factory();
          }
        })(this, function() {
          return lunr2;
        });
      })();
    }
  });

  // node_modules/@lit/reactive-element/css-tag.js
  var t = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var e = Symbol();
  var n = /* @__PURE__ */ new Map();
  var s = class {
    constructor(t4, n7) {
      if (this._$cssResult$ = true, n7 !== e)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t4;
    }
    get styleSheet() {
      let e8 = n.get(this.cssText);
      return t && e8 === void 0 && (n.set(this.cssText, e8 = new CSSStyleSheet()), e8.replaceSync(this.cssText)), e8;
    }
    toString() {
      return this.cssText;
    }
  };
  var o = (t4) => new s(typeof t4 == "string" ? t4 : t4 + "", e);
  var r = (t4, ...n7) => {
    const o7 = t4.length === 1 ? t4[0] : n7.reduce((e8, n8, s5) => e8 + ((t5) => {
      if (t5._$cssResult$ === true)
        return t5.cssText;
      if (typeof t5 == "number")
        return t5;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t5 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(n8) + t4[s5 + 1], t4[0]);
    return new s(o7, e);
  };
  var i = (e8, n7) => {
    t ? e8.adoptedStyleSheets = n7.map((t4) => t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet) : n7.forEach((t4) => {
      const n8 = document.createElement("style"), s5 = window.litNonce;
      s5 !== void 0 && n8.setAttribute("nonce", s5), n8.textContent = t4.cssText, e8.appendChild(n8);
    });
  };
  var S = t ? (t4) => t4 : (t4) => t4 instanceof CSSStyleSheet ? ((t5) => {
    let e8 = "";
    for (const n7 of t5.cssRules)
      e8 += n7.cssText;
    return o(e8);
  })(t4) : t4;

  // node_modules/@lit/reactive-element/reactive-element.js
  var s2;
  var e2 = window.trustedTypes;
  var r2 = e2 ? e2.emptyScript : "";
  var h = window.reactiveElementPolyfillSupport;
  var o2 = { toAttribute(t4, i5) {
    switch (i5) {
      case Boolean:
        t4 = t4 ? r2 : null;
        break;
      case Object:
      case Array:
        t4 = t4 == null ? t4 : JSON.stringify(t4);
    }
    return t4;
  }, fromAttribute(t4, i5) {
    let s5 = t4;
    switch (i5) {
      case Boolean:
        s5 = t4 !== null;
        break;
      case Number:
        s5 = t4 === null ? null : Number(t4);
        break;
      case Object:
      case Array:
        try {
          s5 = JSON.parse(t4);
        } catch (t5) {
          s5 = null;
        }
    }
    return s5;
  } };
  var n2 = (t4, i5) => i5 !== t4 && (i5 == i5 || t4 == t4);
  var l = { attribute: true, type: String, converter: o2, reflect: false, hasChanged: n2 };
  var a = class extends HTMLElement {
    constructor() {
      super(), this._$Et = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$Ei = null, this.o();
    }
    static addInitializer(t4) {
      var i5;
      (i5 = this.l) !== null && i5 !== void 0 || (this.l = []), this.l.push(t4);
    }
    static get observedAttributes() {
      this.finalize();
      const t4 = [];
      return this.elementProperties.forEach((i5, s5) => {
        const e8 = this._$Eh(s5, i5);
        e8 !== void 0 && (this._$Eu.set(e8, s5), t4.push(e8));
      }), t4;
    }
    static createProperty(t4, i5 = l) {
      if (i5.state && (i5.attribute = false), this.finalize(), this.elementProperties.set(t4, i5), !i5.noAccessor && !this.prototype.hasOwnProperty(t4)) {
        const s5 = typeof t4 == "symbol" ? Symbol() : "__" + t4, e8 = this.getPropertyDescriptor(t4, s5, i5);
        e8 !== void 0 && Object.defineProperty(this.prototype, t4, e8);
      }
    }
    static getPropertyDescriptor(t4, i5, s5) {
      return { get() {
        return this[i5];
      }, set(e8) {
        const r4 = this[t4];
        this[i5] = e8, this.requestUpdate(t4, r4, s5);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t4) {
      return this.elementProperties.get(t4) || l;
    }
    static finalize() {
      if (this.hasOwnProperty("finalized"))
        return false;
      this.finalized = true;
      const t4 = Object.getPrototypeOf(this);
      if (t4.finalize(), this.elementProperties = new Map(t4.elementProperties), this._$Eu = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
        const t5 = this.properties, i5 = [...Object.getOwnPropertyNames(t5), ...Object.getOwnPropertySymbols(t5)];
        for (const s5 of i5)
          this.createProperty(s5, t5[s5]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i5) {
      const s5 = [];
      if (Array.isArray(i5)) {
        const e8 = new Set(i5.flat(1 / 0).reverse());
        for (const i6 of e8)
          s5.unshift(S(i6));
      } else
        i5 !== void 0 && s5.push(S(i5));
      return s5;
    }
    static _$Eh(t4, i5) {
      const s5 = i5.attribute;
      return s5 === false ? void 0 : typeof s5 == "string" ? s5 : typeof t4 == "string" ? t4.toLowerCase() : void 0;
    }
    o() {
      var t4;
      this._$Ep = new Promise((t5) => this.enableUpdating = t5), this._$AL = /* @__PURE__ */ new Map(), this._$Em(), this.requestUpdate(), (t4 = this.constructor.l) === null || t4 === void 0 || t4.forEach((t5) => t5(this));
    }
    addController(t4) {
      var i5, s5;
      ((i5 = this._$Eg) !== null && i5 !== void 0 ? i5 : this._$Eg = []).push(t4), this.renderRoot !== void 0 && this.isConnected && ((s5 = t4.hostConnected) === null || s5 === void 0 || s5.call(t4));
    }
    removeController(t4) {
      var i5;
      (i5 = this._$Eg) === null || i5 === void 0 || i5.splice(this._$Eg.indexOf(t4) >>> 0, 1);
    }
    _$Em() {
      this.constructor.elementProperties.forEach((t4, i5) => {
        this.hasOwnProperty(i5) && (this._$Et.set(i5, this[i5]), delete this[i5]);
      });
    }
    createRenderRoot() {
      var t4;
      const s5 = (t4 = this.shadowRoot) !== null && t4 !== void 0 ? t4 : this.attachShadow(this.constructor.shadowRootOptions);
      return i(s5, this.constructor.elementStyles), s5;
    }
    connectedCallback() {
      var t4;
      this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t4 = this._$Eg) === null || t4 === void 0 || t4.forEach((t5) => {
        var i5;
        return (i5 = t5.hostConnected) === null || i5 === void 0 ? void 0 : i5.call(t5);
      });
    }
    enableUpdating(t4) {
    }
    disconnectedCallback() {
      var t4;
      (t4 = this._$Eg) === null || t4 === void 0 || t4.forEach((t5) => {
        var i5;
        return (i5 = t5.hostDisconnected) === null || i5 === void 0 ? void 0 : i5.call(t5);
      });
    }
    attributeChangedCallback(t4, i5, s5) {
      this._$AK(t4, s5);
    }
    _$ES(t4, i5, s5 = l) {
      var e8, r4;
      const h3 = this.constructor._$Eh(t4, s5);
      if (h3 !== void 0 && s5.reflect === true) {
        const n7 = ((r4 = (e8 = s5.converter) === null || e8 === void 0 ? void 0 : e8.toAttribute) !== null && r4 !== void 0 ? r4 : o2.toAttribute)(i5, s5.type);
        this._$Ei = t4, n7 == null ? this.removeAttribute(h3) : this.setAttribute(h3, n7), this._$Ei = null;
      }
    }
    _$AK(t4, i5) {
      var s5, e8, r4;
      const h3 = this.constructor, n7 = h3._$Eu.get(t4);
      if (n7 !== void 0 && this._$Ei !== n7) {
        const t5 = h3.getPropertyOptions(n7), l5 = t5.converter, a3 = (r4 = (e8 = (s5 = l5) === null || s5 === void 0 ? void 0 : s5.fromAttribute) !== null && e8 !== void 0 ? e8 : typeof l5 == "function" ? l5 : null) !== null && r4 !== void 0 ? r4 : o2.fromAttribute;
        this._$Ei = n7, this[n7] = a3(i5, t5.type), this._$Ei = null;
      }
    }
    requestUpdate(t4, i5, s5) {
      let e8 = true;
      t4 !== void 0 && (((s5 = s5 || this.constructor.getPropertyOptions(t4)).hasChanged || n2)(this[t4], i5) ? (this._$AL.has(t4) || this._$AL.set(t4, i5), s5.reflect === true && this._$Ei !== t4 && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t4, s5))) : e8 = false), !this.isUpdatePending && e8 && (this._$Ep = this._$E_());
    }
    _$E_() {
      return __async(this, null, function* () {
        this.isUpdatePending = true;
        try {
          yield this._$Ep;
        } catch (t5) {
          Promise.reject(t5);
        }
        const t4 = this.scheduleUpdate();
        return t4 != null && (yield t4), !this.isUpdatePending;
      });
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var t4;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this._$Et && (this._$Et.forEach((t5, i6) => this[i6] = t5), this._$Et = void 0);
      let i5 = false;
      const s5 = this._$AL;
      try {
        i5 = this.shouldUpdate(s5), i5 ? (this.willUpdate(s5), (t4 = this._$Eg) === null || t4 === void 0 || t4.forEach((t5) => {
          var i6;
          return (i6 = t5.hostUpdate) === null || i6 === void 0 ? void 0 : i6.call(t5);
        }), this.update(s5)) : this._$EU();
      } catch (t5) {
        throw i5 = false, this._$EU(), t5;
      }
      i5 && this._$AE(s5);
    }
    willUpdate(t4) {
    }
    _$AE(t4) {
      var i5;
      (i5 = this._$Eg) === null || i5 === void 0 || i5.forEach((t5) => {
        var i6;
        return (i6 = t5.hostUpdated) === null || i6 === void 0 ? void 0 : i6.call(t5);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t4)), this.updated(t4);
    }
    _$EU() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$Ep;
    }
    shouldUpdate(t4) {
      return true;
    }
    update(t4) {
      this._$EC !== void 0 && (this._$EC.forEach((t5, i5) => this._$ES(i5, this[i5], t5)), this._$EC = void 0), this._$EU();
    }
    updated(t4) {
    }
    firstUpdated(t4) {
    }
  };
  a.finalized = true, a.elementProperties = /* @__PURE__ */ new Map(), a.elementStyles = [], a.shadowRootOptions = { mode: "open" }, h == null || h({ ReactiveElement: a }), ((s2 = globalThis.reactiveElementVersions) !== null && s2 !== void 0 ? s2 : globalThis.reactiveElementVersions = []).push("1.3.2");

  // node_modules/lit-html/lit-html.js
  var t2;
  var i2 = globalThis.trustedTypes;
  var s3 = i2 ? i2.createPolicy("lit-html", { createHTML: (t4) => t4 }) : void 0;
  var e3 = `lit$${(Math.random() + "").slice(9)}$`;
  var o3 = "?" + e3;
  var n3 = `<${o3}>`;
  var l2 = document;
  var h2 = (t4 = "") => l2.createComment(t4);
  var r3 = (t4) => t4 === null || typeof t4 != "object" && typeof t4 != "function";
  var d = Array.isArray;
  var u = (t4) => {
    var i5;
    return d(t4) || typeof ((i5 = t4) === null || i5 === void 0 ? void 0 : i5[Symbol.iterator]) == "function";
  };
  var c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v = /-->/g;
  var a2 = />/g;
  var f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g;
  var _ = /'/g;
  var m = /"/g;
  var g = /^(?:script|style|textarea|title)$/i;
  var p = (t4) => (i5, ...s5) => ({ _$litType$: t4, strings: i5, values: s5 });
  var $ = p(1);
  var y = p(2);
  var b = Symbol.for("lit-noChange");
  var w = Symbol.for("lit-nothing");
  var T = /* @__PURE__ */ new WeakMap();
  var x = (t4, i5, s5) => {
    var e8, o7;
    const n7 = (e8 = s5 == null ? void 0 : s5.renderBefore) !== null && e8 !== void 0 ? e8 : i5;
    let l5 = n7._$litPart$;
    if (l5 === void 0) {
      const t5 = (o7 = s5 == null ? void 0 : s5.renderBefore) !== null && o7 !== void 0 ? o7 : null;
      n7._$litPart$ = l5 = new N(i5.insertBefore(h2(), t5), t5, void 0, s5 != null ? s5 : {});
    }
    return l5._$AI(t4), l5;
  };
  var A = l2.createTreeWalker(l2, 129, null, false);
  var C = (t4, i5) => {
    const o7 = t4.length - 1, l5 = [];
    let h3, r4 = i5 === 2 ? "<svg>" : "", d2 = c;
    for (let i6 = 0; i6 < o7; i6++) {
      const s5 = t4[i6];
      let o8, u3, p2 = -1, $2 = 0;
      for (; $2 < s5.length && (d2.lastIndex = $2, u3 = d2.exec(s5), u3 !== null); )
        $2 = d2.lastIndex, d2 === c ? u3[1] === "!--" ? d2 = v : u3[1] !== void 0 ? d2 = a2 : u3[2] !== void 0 ? (g.test(u3[2]) && (h3 = RegExp("</" + u3[2], "g")), d2 = f) : u3[3] !== void 0 && (d2 = f) : d2 === f ? u3[0] === ">" ? (d2 = h3 != null ? h3 : c, p2 = -1) : u3[1] === void 0 ? p2 = -2 : (p2 = d2.lastIndex - u3[2].length, o8 = u3[1], d2 = u3[3] === void 0 ? f : u3[3] === '"' ? m : _) : d2 === m || d2 === _ ? d2 = f : d2 === v || d2 === a2 ? d2 = c : (d2 = f, h3 = void 0);
      const y2 = d2 === f && t4[i6 + 1].startsWith("/>") ? " " : "";
      r4 += d2 === c ? s5 + n3 : p2 >= 0 ? (l5.push(o8), s5.slice(0, p2) + "$lit$" + s5.slice(p2) + e3 + y2) : s5 + e3 + (p2 === -2 ? (l5.push(void 0), i6) : y2);
    }
    const u2 = r4 + (t4[o7] || "<?>") + (i5 === 2 ? "</svg>" : "");
    if (!Array.isArray(t4) || !t4.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return [s3 !== void 0 ? s3.createHTML(u2) : u2, l5];
  };
  var E = class {
    constructor({ strings: t4, _$litType$: s5 }, n7) {
      let l5;
      this.parts = [];
      let r4 = 0, d2 = 0;
      const u2 = t4.length - 1, c2 = this.parts, [v2, a3] = C(t4, s5);
      if (this.el = E.createElement(v2, n7), A.currentNode = this.el.content, s5 === 2) {
        const t5 = this.el.content, i5 = t5.firstChild;
        i5.remove(), t5.append(...i5.childNodes);
      }
      for (; (l5 = A.nextNode()) !== null && c2.length < u2; ) {
        if (l5.nodeType === 1) {
          if (l5.hasAttributes()) {
            const t5 = [];
            for (const i5 of l5.getAttributeNames())
              if (i5.endsWith("$lit$") || i5.startsWith(e3)) {
                const s6 = a3[d2++];
                if (t5.push(i5), s6 !== void 0) {
                  const t6 = l5.getAttribute(s6.toLowerCase() + "$lit$").split(e3), i6 = /([.?@])?(.*)/.exec(s6);
                  c2.push({ type: 1, index: r4, name: i6[2], strings: t6, ctor: i6[1] === "." ? M : i6[1] === "?" ? H : i6[1] === "@" ? I : S2 });
                } else
                  c2.push({ type: 6, index: r4 });
              }
            for (const i5 of t5)
              l5.removeAttribute(i5);
          }
          if (g.test(l5.tagName)) {
            const t5 = l5.textContent.split(e3), s6 = t5.length - 1;
            if (s6 > 0) {
              l5.textContent = i2 ? i2.emptyScript : "";
              for (let i5 = 0; i5 < s6; i5++)
                l5.append(t5[i5], h2()), A.nextNode(), c2.push({ type: 2, index: ++r4 });
              l5.append(t5[s6], h2());
            }
          }
        } else if (l5.nodeType === 8)
          if (l5.data === o3)
            c2.push({ type: 2, index: r4 });
          else {
            let t5 = -1;
            for (; (t5 = l5.data.indexOf(e3, t5 + 1)) !== -1; )
              c2.push({ type: 7, index: r4 }), t5 += e3.length - 1;
          }
        r4++;
      }
    }
    static createElement(t4, i5) {
      const s5 = l2.createElement("template");
      return s5.innerHTML = t4, s5;
    }
  };
  function P(t4, i5, s5 = t4, e8) {
    var o7, n7, l5, h3;
    if (i5 === b)
      return i5;
    let d2 = e8 !== void 0 ? (o7 = s5._$Cl) === null || o7 === void 0 ? void 0 : o7[e8] : s5._$Cu;
    const u2 = r3(i5) ? void 0 : i5._$litDirective$;
    return (d2 == null ? void 0 : d2.constructor) !== u2 && ((n7 = d2 == null ? void 0 : d2._$AO) === null || n7 === void 0 || n7.call(d2, false), u2 === void 0 ? d2 = void 0 : (d2 = new u2(t4), d2._$AT(t4, s5, e8)), e8 !== void 0 ? ((l5 = (h3 = s5)._$Cl) !== null && l5 !== void 0 ? l5 : h3._$Cl = [])[e8] = d2 : s5._$Cu = d2), d2 !== void 0 && (i5 = P(t4, d2._$AS(t4, i5.values), d2, e8)), i5;
  }
  var V = class {
    constructor(t4, i5) {
      this.v = [], this._$AN = void 0, this._$AD = t4, this._$AM = i5;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    p(t4) {
      var i5;
      const { el: { content: s5 }, parts: e8 } = this._$AD, o7 = ((i5 = t4 == null ? void 0 : t4.creationScope) !== null && i5 !== void 0 ? i5 : l2).importNode(s5, true);
      A.currentNode = o7;
      let n7 = A.nextNode(), h3 = 0, r4 = 0, d2 = e8[0];
      for (; d2 !== void 0; ) {
        if (h3 === d2.index) {
          let i6;
          d2.type === 2 ? i6 = new N(n7, n7.nextSibling, this, t4) : d2.type === 1 ? i6 = new d2.ctor(n7, d2.name, d2.strings, this, t4) : d2.type === 6 && (i6 = new L(n7, this, t4)), this.v.push(i6), d2 = e8[++r4];
        }
        h3 !== (d2 == null ? void 0 : d2.index) && (n7 = A.nextNode(), h3++);
      }
      return o7;
    }
    m(t4) {
      let i5 = 0;
      for (const s5 of this.v)
        s5 !== void 0 && (s5.strings !== void 0 ? (s5._$AI(t4, s5, i5), i5 += s5.strings.length - 2) : s5._$AI(t4[i5])), i5++;
    }
  };
  var N = class {
    constructor(t4, i5, s5, e8) {
      var o7;
      this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t4, this._$AB = i5, this._$AM = s5, this.options = e8, this._$Cg = (o7 = e8 == null ? void 0 : e8.isConnected) === null || o7 === void 0 || o7;
    }
    get _$AU() {
      var t4, i5;
      return (i5 = (t4 = this._$AM) === null || t4 === void 0 ? void 0 : t4._$AU) !== null && i5 !== void 0 ? i5 : this._$Cg;
    }
    get parentNode() {
      let t4 = this._$AA.parentNode;
      const i5 = this._$AM;
      return i5 !== void 0 && t4.nodeType === 11 && (t4 = i5.parentNode), t4;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t4, i5 = this) {
      t4 = P(this, t4, i5), r3(t4) ? t4 === w || t4 == null || t4 === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t4 !== this._$AH && t4 !== b && this.$(t4) : t4._$litType$ !== void 0 ? this.T(t4) : t4.nodeType !== void 0 ? this.k(t4) : u(t4) ? this.S(t4) : this.$(t4);
    }
    M(t4, i5 = this._$AB) {
      return this._$AA.parentNode.insertBefore(t4, i5);
    }
    k(t4) {
      this._$AH !== t4 && (this._$AR(), this._$AH = this.M(t4));
    }
    $(t4) {
      this._$AH !== w && r3(this._$AH) ? this._$AA.nextSibling.data = t4 : this.k(l2.createTextNode(t4)), this._$AH = t4;
    }
    T(t4) {
      var i5;
      const { values: s5, _$litType$: e8 } = t4, o7 = typeof e8 == "number" ? this._$AC(t4) : (e8.el === void 0 && (e8.el = E.createElement(e8.h, this.options)), e8);
      if (((i5 = this._$AH) === null || i5 === void 0 ? void 0 : i5._$AD) === o7)
        this._$AH.m(s5);
      else {
        const t5 = new V(o7, this), i6 = t5.p(this.options);
        t5.m(s5), this.k(i6), this._$AH = t5;
      }
    }
    _$AC(t4) {
      let i5 = T.get(t4.strings);
      return i5 === void 0 && T.set(t4.strings, i5 = new E(t4)), i5;
    }
    S(t4) {
      d(this._$AH) || (this._$AH = [], this._$AR());
      const i5 = this._$AH;
      let s5, e8 = 0;
      for (const o7 of t4)
        e8 === i5.length ? i5.push(s5 = new N(this.M(h2()), this.M(h2()), this, this.options)) : s5 = i5[e8], s5._$AI(o7), e8++;
      e8 < i5.length && (this._$AR(s5 && s5._$AB.nextSibling, e8), i5.length = e8);
    }
    _$AR(t4 = this._$AA.nextSibling, i5) {
      var s5;
      for ((s5 = this._$AP) === null || s5 === void 0 || s5.call(this, false, true, i5); t4 && t4 !== this._$AB; ) {
        const i6 = t4.nextSibling;
        t4.remove(), t4 = i6;
      }
    }
    setConnected(t4) {
      var i5;
      this._$AM === void 0 && (this._$Cg = t4, (i5 = this._$AP) === null || i5 === void 0 || i5.call(this, t4));
    }
  };
  var S2 = class {
    constructor(t4, i5, s5, e8, o7) {
      this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t4, this.name = i5, this._$AM = e8, this.options = o7, s5.length > 2 || s5[0] !== "" || s5[1] !== "" ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = w;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t4, i5 = this, s5, e8) {
      const o7 = this.strings;
      let n7 = false;
      if (o7 === void 0)
        t4 = P(this, t4, i5, 0), n7 = !r3(t4) || t4 !== this._$AH && t4 !== b, n7 && (this._$AH = t4);
      else {
        const e9 = t4;
        let l5, h3;
        for (t4 = o7[0], l5 = 0; l5 < o7.length - 1; l5++)
          h3 = P(this, e9[s5 + l5], i5, l5), h3 === b && (h3 = this._$AH[l5]), n7 || (n7 = !r3(h3) || h3 !== this._$AH[l5]), h3 === w ? t4 = w : t4 !== w && (t4 += (h3 != null ? h3 : "") + o7[l5 + 1]), this._$AH[l5] = h3;
      }
      n7 && !e8 && this.C(t4);
    }
    C(t4) {
      t4 === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t4 != null ? t4 : "");
    }
  };
  var M = class extends S2 {
    constructor() {
      super(...arguments), this.type = 3;
    }
    C(t4) {
      this.element[this.name] = t4 === w ? void 0 : t4;
    }
  };
  var k = i2 ? i2.emptyScript : "";
  var H = class extends S2 {
    constructor() {
      super(...arguments), this.type = 4;
    }
    C(t4) {
      t4 && t4 !== w ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
    }
  };
  var I = class extends S2 {
    constructor(t4, i5, s5, e8, o7) {
      super(t4, i5, s5, e8, o7), this.type = 5;
    }
    _$AI(t4, i5 = this) {
      var s5;
      if ((t4 = (s5 = P(this, t4, i5, 0)) !== null && s5 !== void 0 ? s5 : w) === b)
        return;
      const e8 = this._$AH, o7 = t4 === w && e8 !== w || t4.capture !== e8.capture || t4.once !== e8.once || t4.passive !== e8.passive, n7 = t4 !== w && (e8 === w || o7);
      o7 && this.element.removeEventListener(this.name, this, e8), n7 && this.element.addEventListener(this.name, this, t4), this._$AH = t4;
    }
    handleEvent(t4) {
      var i5, s5;
      typeof this._$AH == "function" ? this._$AH.call((s5 = (i5 = this.options) === null || i5 === void 0 ? void 0 : i5.host) !== null && s5 !== void 0 ? s5 : this.element, t4) : this._$AH.handleEvent(t4);
    }
  };
  var L = class {
    constructor(t4, i5, s5) {
      this.element = t4, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s5;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t4) {
      P(this, t4);
    }
  };
  var z = window.litHtmlPolyfillSupport;
  z == null || z(E, N), ((t2 = globalThis.litHtmlVersions) !== null && t2 !== void 0 ? t2 : globalThis.litHtmlVersions = []).push("2.2.5");

  // node_modules/lit-element/lit-element.js
  var l3;
  var o4;
  var s4 = class extends a {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Dt = void 0;
    }
    createRenderRoot() {
      var t4, e8;
      const i5 = super.createRenderRoot();
      return (t4 = (e8 = this.renderOptions).renderBefore) !== null && t4 !== void 0 || (e8.renderBefore = i5.firstChild), i5;
    }
    update(t4) {
      const i5 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t4), this._$Dt = x(i5, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var t4;
      super.connectedCallback(), (t4 = this._$Dt) === null || t4 === void 0 || t4.setConnected(true);
    }
    disconnectedCallback() {
      var t4;
      super.disconnectedCallback(), (t4 = this._$Dt) === null || t4 === void 0 || t4.setConnected(false);
    }
    render() {
      return b;
    }
  };
  s4.finalized = true, s4._$litElement$ = true, (l3 = globalThis.litElementHydrateSupport) === null || l3 === void 0 || l3.call(globalThis, { LitElement: s4 });
  var n4 = globalThis.litElementPolyfillSupport;
  n4 == null || n4({ LitElement: s4 });
  ((o4 = globalThis.litElementVersions) !== null && o4 !== void 0 ? o4 : globalThis.litElementVersions = []).push("3.2.0");

  // node_modules/@lit/reactive-element/decorators/custom-element.js
  var n5 = (n7) => (e8) => typeof e8 == "function" ? ((n8, e9) => (window.customElements.define(n8, e9), e9))(n7, e8) : ((n8, e9) => {
    const { kind: t4, elements: i5 } = e9;
    return { kind: t4, elements: i5, finisher(e10) {
      window.customElements.define(n8, e10);
    } };
  })(n7, e8);

  // node_modules/@lit/reactive-element/decorators/property.js
  var i3 = (i5, e8) => e8.kind === "method" && e8.descriptor && !("value" in e8.descriptor) ? __spreadProps(__spreadValues({}, e8), { finisher(n7) {
    n7.createProperty(e8.key, i5);
  } }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e8.key, initializer() {
    typeof e8.initializer == "function" && (this[e8.key] = e8.initializer.call(this));
  }, finisher(n7) {
    n7.createProperty(e8.key, i5);
  } };
  function e4(e8) {
    return (n7, t4) => t4 !== void 0 ? ((i5, e9, n8) => {
      e9.constructor.createProperty(n8, i5);
    })(e8, n7, t4) : i3(e8, n7);
  }

  // node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
  var n6;
  var e5 = ((n6 = window.HTMLSlotElement) === null || n6 === void 0 ? void 0 : n6.prototype.assignedElements) != null ? (o7, n7) => o7.assignedElements(n7) : (o7, n7) => o7.assignedNodes(n7).filter((o8) => o8.nodeType === Node.ELEMENT_NODE);

  // node_modules/lit-html/directive.js
  var t3 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e6 = (t4) => (...e8) => ({ _$litDirective$: t4, values: e8 });
  var i4 = class {
    constructor(t4) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t4, e8, i5) {
      this._$Ct = t4, this._$AM = e8, this._$Ci = i5;
    }
    _$AS(t4, e8) {
      return this.update(t4, e8);
    }
    update(t4, e8) {
      return this.render(...e8);
    }
  };

  // node_modules/lit-html/directives/unsafe-html.js
  var e7 = class extends i4 {
    constructor(i5) {
      if (super(i5), this.it = w, i5.type !== t3.CHILD)
        throw Error(this.constructor.directiveName + "() can only be used in child bindings");
    }
    render(r4) {
      if (r4 === w || r4 == null)
        return this.ft = void 0, this.it = r4;
      if (r4 === b)
        return r4;
      if (typeof r4 != "string")
        throw Error(this.constructor.directiveName + "() called with a non-string value");
      if (r4 === this.it)
        return this.ft;
      this.it = r4;
      const s5 = [r4];
      return s5.raw = s5, this.ft = { _$litType$: this.constructor.resultType, strings: s5, values: [] };
    }
  };
  e7.directiveName = "unsafeHTML", e7.resultType = 1;
  var o6 = e6(e7);

  // node_modules/bridgetown-quick-search/frontend/dist/search_engine.js
  var import_lunr = __toESM(require_lunr());
  var SearchEngine = class {
    generateIndex(indexData) {
      return __async(this, null, function* () {
        this.index = (0, import_lunr.default)(function() {
          this.ref("id");
          this.field("id");
          this.field("title", {
            boost: 10
          });
          this.field("categories");
          this.field("tags");
          this.field("url");
          this.field("content");
          indexData.forEach((item) => {
            if (item.content) {
              this.add(item);
            }
          });
        });
        this.indexData = indexData;
      });
    }
    performSearch(query, snippetLength = null) {
      if (this.index) {
        this.query = query;
        const results = this.index.search(this.query);
        if (results.length) {
          return results.map((result) => {
            const item = this.indexData.find((item2) => item2.id == result.ref);
            const contentPreview = this.previewTemplate(item.content, snippetLength);
            const titlePreview = this.previewTemplate(item.title) + `<!--(${result.score})-->`;
            return {
              url: item.url.trim(),
              heading: titlePreview,
              preview: contentPreview
            };
          });
        } else {
          return [];
        }
      } else {
        throw new Error("Search index hasn't yet loaded. Run the generateIndex function");
      }
    }
    previewTemplate(text, length) {
      if (length == null)
        length = 300;
      const padding = length / 2;
      let output;
      if (length) {
        const textToSearch = text.toLowerCase();
        const wordLocations = this.query.toLowerCase().split(" ").map((word) => {
          return textToSearch.indexOf(word);
        }).filter((location) => location != -1).sort((a3, b2) => {
          return a3 - b2;
        });
        if (wordLocations[1]) {
          length = Math.min(wordLocations[1] - wordLocations[0], length);
        }
        output = text.substr(Math.max(0, wordLocations[0] - padding), length + padding);
      } else {
        output = text;
      }
      if (!text.startsWith(output)) {
        output = "\u2026" + output;
      }
      if (!text.endsWith(output)) {
        output = output + "\u2026";
      }
      this.query.toLowerCase().split(" ").forEach((word) => {
        if (word != "") {
          output = output.replace(new RegExp(`(${word.replace(/[\.\*\+\(\)]/g, "")})`, "ig"), `<strong>$1</strong>`);
        }
      });
      return output;
    }
  };
  var search_engine_default = SearchEngine;

  // node_modules/bridgetown-quick-search/frontend/dist/index.js
  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get2(target2, property2, receiver2) {
        var base = _superPropBase(target2, property2);
        if (!base)
          return;
        var desc = Object.getOwnPropertyDescriptor(base, property2);
        if (desc.get) {
          return desc.get.call(receiver2);
        }
        return desc.value;
      };
    }
    return _get(target, property, receiver || target);
  }
  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null)
        break;
    }
    return object;
  }
  function _getPrototypeOf(o7) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o8) {
      return o8.__proto__ || Object.getPrototypeOf(o8);
    };
    return _getPrototypeOf(o7);
  }
  function _decorate(decorators, factory, superClass, mixins) {
    var api = _getDecoratorsApi();
    if (mixins) {
      for (var i5 = 0; i5 < mixins.length; i5++) {
        api = mixins[i5](api);
      }
    }
    var r4 = factory(function initialize(O) {
      api.initializeInstanceElements(O, decorated.elements);
    }, superClass);
    var decorated = api.decorateClass(_coalesceClassElements(r4.d.map(_createElementDescriptor)), decorators);
    api.initializeClassElements(r4.F, decorated.elements);
    return api.runClassFinishers(r4.F, decorated.finishers);
  }
  function _getDecoratorsApi() {
    _getDecoratorsApi = function() {
      return api;
    };
    var api = { elementsDefinitionOrder: [["method"], ["field"]], initializeInstanceElements: function(O, elements) {
      ["method", "field"].forEach(function(kind) {
        elements.forEach(function(element) {
          if (element.kind === kind && element.placement === "own") {
            this.defineClassElement(O, element);
          }
        }, this);
      }, this);
    }, initializeClassElements: function(F, elements) {
      var proto = F.prototype;
      ["method", "field"].forEach(function(kind) {
        elements.forEach(function(element) {
          var placement = element.placement;
          if (element.kind === kind && (placement === "static" || placement === "prototype")) {
            var receiver = placement === "static" ? F : proto;
            this.defineClassElement(receiver, element);
          }
        }, this);
      }, this);
    }, defineClassElement: function(receiver, element) {
      var descriptor = element.descriptor;
      if (element.kind === "field") {
        var initializer = element.initializer;
        descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) };
      }
      Object.defineProperty(receiver, element.key, descriptor);
    }, decorateClass: function(elements, decorators) {
      var newElements = [];
      var finishers = [];
      var placements = { static: [], prototype: [], own: [] };
      elements.forEach(function(element) {
        this.addElementPlacement(element, placements);
      }, this);
      elements.forEach(function(element) {
        if (!_hasDecorators(element))
          return newElements.push(element);
        var elementFinishersExtras = this.decorateElement(element, placements);
        newElements.push(elementFinishersExtras.element);
        newElements.push.apply(newElements, elementFinishersExtras.extras);
        finishers.push.apply(finishers, elementFinishersExtras.finishers);
      }, this);
      if (!decorators) {
        return { elements: newElements, finishers };
      }
      var result = this.decorateConstructor(newElements, decorators);
      finishers.push.apply(finishers, result.finishers);
      result.finishers = finishers;
      return result;
    }, addElementPlacement: function(element, placements, silent) {
      var keys = placements[element.placement];
      if (!silent && keys.indexOf(element.key) !== -1) {
        throw new TypeError("Duplicated element (" + element.key + ")");
      }
      keys.push(element.key);
    }, decorateElement: function(element, placements) {
      var extras = [];
      var finishers = [];
      for (var decorators = element.decorators, i5 = decorators.length - 1; i5 >= 0; i5--) {
        var keys = placements[element.placement];
        keys.splice(keys.indexOf(element.key), 1);
        var elementObject = this.fromElementDescriptor(element);
        var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i5])(elementObject) || elementObject);
        element = elementFinisherExtras.element;
        this.addElementPlacement(element, placements);
        if (elementFinisherExtras.finisher) {
          finishers.push(elementFinisherExtras.finisher);
        }
        var newExtras = elementFinisherExtras.extras;
        if (newExtras) {
          for (var j = 0; j < newExtras.length; j++) {
            this.addElementPlacement(newExtras[j], placements);
          }
          extras.push.apply(extras, newExtras);
        }
      }
      return { element, finishers, extras };
    }, decorateConstructor: function(elements, decorators) {
      var finishers = [];
      for (var i5 = decorators.length - 1; i5 >= 0; i5--) {
        var obj = this.fromClassDescriptor(elements);
        var elementsAndFinisher = this.toClassDescriptor((0, decorators[i5])(obj) || obj);
        if (elementsAndFinisher.finisher !== void 0) {
          finishers.push(elementsAndFinisher.finisher);
        }
        if (elementsAndFinisher.elements !== void 0) {
          elements = elementsAndFinisher.elements;
          for (var j = 0; j < elements.length - 1; j++) {
            for (var k2 = j + 1; k2 < elements.length; k2++) {
              if (elements[j].key === elements[k2].key && elements[j].placement === elements[k2].placement) {
                throw new TypeError("Duplicated element (" + elements[j].key + ")");
              }
            }
          }
        }
      }
      return { elements, finishers };
    }, fromElementDescriptor: function(element) {
      var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor };
      var desc = { value: "Descriptor", configurable: true };
      Object.defineProperty(obj, Symbol.toStringTag, desc);
      if (element.kind === "field")
        obj.initializer = element.initializer;
      return obj;
    }, toElementDescriptors: function(elementObjects) {
      if (elementObjects === void 0)
        return;
      return _toArray(elementObjects).map(function(elementObject) {
        var element = this.toElementDescriptor(elementObject);
        this.disallowProperty(elementObject, "finisher", "An element descriptor");
        this.disallowProperty(elementObject, "extras", "An element descriptor");
        return element;
      }, this);
    }, toElementDescriptor: function(elementObject) {
      var kind = String(elementObject.kind);
      if (kind !== "method" && kind !== "field") {
        throw new TypeError(`An element descriptor's .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "` + kind + '"');
      }
      var key = _toPropertyKey(elementObject.key);
      var placement = String(elementObject.placement);
      if (placement !== "static" && placement !== "prototype" && placement !== "own") {
        throw new TypeError(`An element descriptor's .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "` + placement + '"');
      }
      var descriptor = elementObject.descriptor;
      this.disallowProperty(elementObject, "elements", "An element descriptor");
      var element = { kind, key, placement, descriptor: Object.assign({}, descriptor) };
      if (kind !== "field") {
        this.disallowProperty(elementObject, "initializer", "A method descriptor");
      } else {
        this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor");
        this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor");
        this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor");
        element.initializer = elementObject.initializer;
      }
      return element;
    }, toElementFinisherExtras: function(elementObject) {
      var element = this.toElementDescriptor(elementObject);
      var finisher = _optionalCallableProperty(elementObject, "finisher");
      var extras = this.toElementDescriptors(elementObject.extras);
      return { element, finisher, extras };
    }, fromClassDescriptor: function(elements) {
      var obj = { kind: "class", elements: elements.map(this.fromElementDescriptor, this) };
      var desc = { value: "Descriptor", configurable: true };
      Object.defineProperty(obj, Symbol.toStringTag, desc);
      return obj;
    }, toClassDescriptor: function(obj) {
      var kind = String(obj.kind);
      if (kind !== "class") {
        throw new TypeError(`A class descriptor's .kind property must be "class", but a decorator created a class descriptor with .kind "` + kind + '"');
      }
      this.disallowProperty(obj, "key", "A class descriptor");
      this.disallowProperty(obj, "placement", "A class descriptor");
      this.disallowProperty(obj, "descriptor", "A class descriptor");
      this.disallowProperty(obj, "initializer", "A class descriptor");
      this.disallowProperty(obj, "extras", "A class descriptor");
      var finisher = _optionalCallableProperty(obj, "finisher");
      var elements = this.toElementDescriptors(obj.elements);
      return { elements, finisher };
    }, runClassFinishers: function(constructor, finishers) {
      for (var i5 = 0; i5 < finishers.length; i5++) {
        var newConstructor = (0, finishers[i5])(constructor);
        if (newConstructor !== void 0) {
          if (typeof newConstructor !== "function") {
            throw new TypeError("Finishers must return a constructor.");
          }
          constructor = newConstructor;
        }
      }
      return constructor;
    }, disallowProperty: function(obj, name, objectType) {
      if (obj[name] !== void 0) {
        throw new TypeError(objectType + " can't have a ." + name + " property.");
      }
    } };
    return api;
  }
  function _createElementDescriptor(def) {
    var key = _toPropertyKey(def.key);
    var descriptor;
    if (def.kind === "method") {
      descriptor = { value: def.value, writable: true, configurable: true, enumerable: false };
    } else if (def.kind === "get") {
      descriptor = { get: def.value, configurable: true, enumerable: false };
    } else if (def.kind === "set") {
      descriptor = { set: def.value, configurable: true, enumerable: false };
    } else if (def.kind === "field") {
      descriptor = { configurable: true, writable: true, enumerable: true };
    }
    var element = { kind: def.kind === "field" ? "field" : "method", key, placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype", descriptor };
    if (def.decorators)
      element.decorators = def.decorators;
    if (def.kind === "field")
      element.initializer = def.value;
    return element;
  }
  function _coalesceGetterSetter(element, other) {
    if (element.descriptor.get !== void 0) {
      other.descriptor.get = element.descriptor.get;
    } else {
      other.descriptor.set = element.descriptor.set;
    }
  }
  function _coalesceClassElements(elements) {
    var newElements = [];
    var isSameElement = function(other2) {
      return other2.kind === "method" && other2.key === element.key && other2.placement === element.placement;
    };
    for (var i5 = 0; i5 < elements.length; i5++) {
      var element = elements[i5];
      var other;
      if (element.kind === "method" && (other = newElements.find(isSameElement))) {
        if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) {
          if (_hasDecorators(element) || _hasDecorators(other)) {
            throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated.");
          }
          other.descriptor = element.descriptor;
        } else {
          if (_hasDecorators(element)) {
            if (_hasDecorators(other)) {
              throw new ReferenceError("Decorators can't be placed on different accessors with for the same property (" + element.key + ").");
            }
            other.decorators = element.decorators;
          }
          _coalesceGetterSetter(element, other);
        }
      } else {
        newElements.push(element);
      }
    }
    return newElements;
  }
  function _hasDecorators(element) {
    return element.decorators && element.decorators.length;
  }
  function _isDataDescriptor(desc) {
    return desc !== void 0 && !(desc.value === void 0 && desc.writable === void 0);
  }
  function _optionalCallableProperty(obj, name) {
    var value = obj[name];
    if (value !== void 0 && typeof value !== "function") {
      throw new TypeError("Expected '" + name + "' to be a function");
    }
    return value;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null)
      return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object")
        return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o7, minLen) {
    if (!o7)
      return;
    if (typeof o7 === "string")
      return _arrayLikeToArray(o7, minLen);
    var n7 = Object.prototype.toString.call(o7).slice(8, -1);
    if (n7 === "Object" && o7.constructor)
      n7 = o7.constructor.name;
    if (n7 === "Map" || n7 === "Set")
      return Array.from(o7);
    if (n7 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n7))
      return _arrayLikeToArray(o7, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i5 = 0, arr2 = new Array(len); i5 < len; i5++)
      arr2[i5] = arr[i5];
    return arr2;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
      return Array.from(iter);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  var BridgetownSearchForm = _decorate([n5("bridgetown-search-form")], function(_initialize, _LitElement) {
    class BridgetownSearchForm2 extends _LitElement {
      constructor(...args) {
        super(...args);
        _initialize(this);
      }
    }
    return {
      F: BridgetownSearchForm2,
      d: [{
        kind: "method",
        key: "render",
        value: function render() {
          return $`<form><slot name="input"></slot></form><slot></slot>`;
        }
      }, {
        kind: "method",
        key: "firstUpdated",
        value: function firstUpdated() {
          this.querySelector("input").addEventListener("input", this.handleChange.bind(this));
        }
      }, {
        kind: "method",
        key: "handleChange",
        value: function handleChange(e8) {
          const target = e8.currentTarget;
          clearTimeout(this.debounce);
          this.debounce = setTimeout(() => {
            this.querySelector("bridgetown-search-results").showResultsForQuery(target.value);
          }, 250);
        }
      }]
    };
  }, s4);
  var BridgetownSearchResults = _decorate([n5("bridgetown-search-results")], function(_initialize2, _LitElement2) {
    class BridgetownSearchResults2 extends _LitElement2 {
      constructor(...args) {
        super(...args);
        _initialize2(this);
      }
    }
    return {
      F: BridgetownSearchResults2,
      d: [{
        kind: "field",
        decorators: [e4({
          type: String
        })],
        key: "theme",
        value: void 0
      }, {
        kind: "field",
        decorators: [e4({
          type: Array
        })],
        key: "results",
        value() {
          return [];
        }
      }, {
        kind: "field",
        decorators: [e4({
          type: Number
        })],
        key: "snippetLength",
        value() {
          return 142;
        }
      }, {
        kind: "field",
        static: true,
        key: "styles",
        value() {
          return r`
    :host {
      display: block;
      position: absolute;
      margin: 0;
      margin-top: 1px;
      padding: 0;
      width: 94vw;
      max-width: 550px;
      font-weight: 400;
      font-size: 1rem;
      font-style: normal;
      text-transform: initial;
      z-index: 9999;
      background: transparent;
    }
    [part=inner] {
      margin: 0;
      list-style-type: none;
      padding: 0.8em 1.2em;
      background: var(--background, #ffffff);
      color: var(--text-color, #333333);
      display: none;
      border-radius: var(--border-radius, 10px);
      border-top-left-radius: var(--border-corner-radius, 4px);
      max-height: 50vh;
      overflow: auto;
      overflow-x: hidden;
      box-shadow: 0px 15px 15px rgba(0,0,0,0.1);
    }
    [part=inner].show {
      display: block;
    }
    [part=inner].dark-theme {
      background: var(--background-dark, #222222);
      color: var(--text-color-dark, #dddddd);
    }

    ul > a {
      margin-top: 1.5em;
      margin-bottom: 0;
    }
    ul > a:first-of-type {
      margin-top: 0;
    }
    li {
      margin: 0;
      padding: 0;
    }

    h1 {
      font-size: 1em;
      font-weight: 400;
      font-style: normal;
      margin-top: 0;
      margin-bottom: 0.5em;
      padding-bottom: 3px;
      border-bottom: 1px solid var(--divider-color, #cccccc);
      color: var(--link-color, #000000);
    }
    h1 a {
      display: block;
    }
    [part=inner].dark-theme h1 {
      color: var(--link-color-dark, #ffffff);
      border-bottom: 1px solid var(--divider-color-dark, #444444);
    }
    a {
      color: inherit;
      text-decoration: none;
      display: block;
    }
    p {
      margin-top: 0;
      margin-bottom: 1em;
      word-wrap: break-word;
    }
    li p {
      font-size: 0.8em;
    }
    p strong {
      color: var(--link-color, #000000);
    }
    [part=inner].dark-theme p strong {
      color: var(--link-color-dark, #ffffff);
    }
    p#no-results {
      margin-top: 0.5em;
    }
  `;
        }
      }, {
        kind: "method",
        key: "connectedCallback",
        value: function connectedCallback() {
          _get(_getPrototypeOf(BridgetownSearchResults2.prototype), "connectedCallback", this).call(this);
          this.fetchSearchIndex();
          window.addEventListener("resize", () => {
            window.requestAnimationFrame(this.repositionIfNecessary.bind(this));
          });
        }
      }, {
        kind: "method",
        key: "fetchSearchIndex",
        value: function fetchSearchIndex() {
          return __async(this, null, function* () {
            const response = yield fetch(`/bridgetown_quick_search/index.json`);
            this.searchIndex = yield response.json();
            this.searchEngine = new search_engine_default();
            this.searchEngine.generateIndex(this.searchIndex);
          });
        }
      }, {
        kind: "method",
        key: "showResultsForQuery",
        value: function showResultsForQuery(query) {
          this.latestQuery = query;
          if (query && query.length > 1) {
            this.showResults = true;
            this.results = this.searchEngine.performSearch(query, this.snippetLength).slice(0, 10);
          } else {
            this.showResults = false;
          }
          this.requestUpdate();
        }
      }, {
        kind: "method",
        key: "render",
        value: function render() {
          this.repositionIfNecessary();
          let resultsStatus = "";
          if (this.results.length == 0) {
            resultsStatus = $`<p id="no-results">No results found for "<strong>${this.latestQuery}</strong>"</p>`;
          }
          const theme = this.theme == "dark" ? "dark" : "light";
          return $`<ul part="inner" class="${theme}-theme ${this.showResults ? "show" : ""}">
      ${resultsStatus}
      ${this.results.map((result) => {
            return $`
          <a part="inner-link" href="${result.url}">
            <li><h1>${o6(result.heading)}</h1>
            <p>${o6(result.preview)}</p></li>
          </a>
        `;
          })}
    </ul>`;
        }
      }, {
        kind: "method",
        key: "repositionIfNecessary",
        value: function repositionIfNecessary() {
          this.style.transform = `translateX(0px)`;
          const rect = this.getBoundingClientRect();
          const fullWidth = window.innerWidth - rect.width;
          const offsetWidth = fullWidth - rect.x;
          if (rect.x + rect.width > window.innerWidth) {
            this.style.transform = `translateX(${offsetWidth}px)`;
          }
        }
      }]
    };
  }, s4);

  // frontend/javascript/index.js
  console.info("Bridgetown is loaded!");
})();
/*!
 * lunr.Builder
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.Index
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.Pipeline
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.Set
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.TokenSet
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.Vector
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.stemmer
 * Copyright (C) 2020 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */
/*!
 * lunr.stopWordFilter
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.tokenizer
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.trimmer
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.utils
 * Copyright (C) 2020 Oliver Nightingale
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 2.3.9
 * Copyright (C) 2020 Oliver Nightingale
 * @license MIT
 */
//# sourceMappingURL=/_bridgetown/static/index.NJPNCXFI.js.map
