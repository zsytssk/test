/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "b4b51f8ea99247305960"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			{
/******/ 				// eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/main.ts")(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* eslint no-console:0 consistent-return:0 */\r\n\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst test_1 = __webpack_require__(/*! ./test/test */ \"./src/test/test.ts\");\r\nconst utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\r\n(() => {\r\n    const gl = utils_1.initWebGl();\r\n    test_1.testDraw(gl);\r\n})();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cz9jZDQ5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDZDQUE2QztBQUNoQzs7QUFFYiw0RUFBdUM7QUFDdkMscUVBQW9DO0FBRXBDLENBQUMsR0FBRyxFQUFFO0lBQ0YsTUFBTSxFQUFFLEdBQUcsaUJBQVMsRUFBRSxDQUFDO0lBQ3ZCLGVBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNqQixDQUFDLENBQUMsRUFBRSxDQUFDIiwiZmlsZSI6Ii4vc3JjL21haW4udHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQgbm8tY29uc29sZTowIGNvbnNpc3RlbnQtcmV0dXJuOjAgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgdGVzdERyYXcgfSBmcm9tICcuL3Rlc3QvdGVzdCc7XHJcbmltcG9ydCB7IGluaXRXZWJHbCB9IGZyb20gJy4vdXRpbHMnO1xyXG5cclxuKCgpID0+IHtcclxuICAgIGNvbnN0IGdsID0gaW5pdFdlYkdsKCk7XHJcbiAgICB0ZXN0RHJhdyhnbCk7XHJcbn0pKCk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/main.ts\n");

/***/ }),

/***/ "./src/test/fragment.glsl":
/*!********************************!*\
  !*** ./src/test/fragment.glsl ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"precision mediump float;\\n#define GLSLIFY 1\\n\\nuniform vec4 u_color;\\n\\nvoid main() {\\n   gl_FragColor = u_color;\\n}\"//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdGVzdC9mcmFnbWVudC5nbHNsP2VjOGIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMENBQTBDLDRDQUE0QyxpQkFBaUIsNEJBQTRCLEdBQUciLCJmaWxlIjoiLi9zcmMvdGVzdC9mcmFnbWVudC5nbHNsLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBcInByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xcbiNkZWZpbmUgR0xTTElGWSAxXFxuXFxudW5pZm9ybSB2ZWM0IHVfY29sb3I7XFxuXFxudm9pZCBtYWluKCkge1xcbiAgIGdsX0ZyYWdDb2xvciA9IHVfY29sb3I7XFxufVwiIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/test/fragment.glsl\n");

/***/ }),

/***/ "./src/test/test.ts":
/*!**************************!*\
  !*** ./src/test/test.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./src/utils.ts\");\r\nconst fragmentShaderSource = __webpack_require__(/*! ./fragment.glsl */ \"./src/test/fragment.glsl\");\r\nconst vertexShaderSource = __webpack_require__(/*! ./vertex.glsl */ \"./src/test/vertex.glsl\");\r\nfunction testDraw(gl) {\r\n    // Link the two shaders into a program\r\n    const program = utils_1.createProgram(gl, vertexShaderSource, fragmentShaderSource);\r\n    // look up where the vertex data needs to go.\r\n    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');\r\n    // look up uniform locations\r\n    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');\r\n    const transitionUniformLocation = gl.getUniformLocation(program, 'u_translation');\r\n    const rotationUniformLocation = gl.getUniformLocation(program, 'u_rotation');\r\n    const colorLocation = gl.getUniformLocation(program, 'u_color');\r\n    // Create a buffer and put three 2d clip space points in it\r\n    const positionBuffer = gl.createBuffer();\r\n    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)\r\n    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);\r\n    const transition = [200, 200];\r\n    const angle = 0;\r\n    const degree = (angle * Math.PI) / 180;\r\n    const rotation = [Math.sin(degree), Math.cos(degree)];\r\n    const color = [0, 0, 1, 1];\r\n    setCharacterF(gl);\r\n    drawScene();\r\n    function drawScene() {\r\n        // Tell WebGL how to convert from clip space to pixels\r\n        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);\r\n        // Clear the canvas\r\n        gl.clearColor(0, 0, 0, 0);\r\n        gl.clear(gl.COLOR_BUFFER_BIT);\r\n        // Tell it to use our program (pair of shaders)\r\n        gl.useProgram(program);\r\n        // Turn on the attribute\r\n        gl.enableVertexAttribArray(positionAttributeLocation);\r\n        // Bind the position buffer.\r\n        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);\r\n        // setRectAngle(gl, 0, 0, width, height);\r\n        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)\r\n        const size = 2; // 2 components per iteration\r\n        const type = gl.FLOAT; // the data is 32bit floats\r\n        const normalize = false; // don't normalize the data\r\n        const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position\r\n        let offset = 0; // start at the beginning of the buffer\r\n        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);\r\n        gl.uniform2fv(transitionUniformLocation, transition);\r\n        gl.uniform2fv(rotationUniformLocation, rotation);\r\n        // set the resolution\r\n        gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);\r\n        gl.uniform4fv(colorLocation, color);\r\n        // draw\r\n        const primitiveType = gl.TRIANGLES;\r\n        offset = 0;\r\n        const count = 18;\r\n        gl.drawArrays(primitiveType, offset, count);\r\n    }\r\n}\r\nexports.testDraw = testDraw;\r\nfunction setRectAngle(gl, x, y, width, height) {\r\n    const x1 = x;\r\n    const x2 = x + width;\r\n    const y1 = y;\r\n    const y2 = y + height;\r\n    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]), gl.STATIC_DRAW);\r\n}\r\n// Fill the buffer with the values that define a letter 'F'.\r\nfunction setCharacterF(gl) {\r\n    gl.bufferData(gl.ARRAY_BUFFER, \r\n    // prettier-ignore\r\n    new Float32Array([\r\n        // left column\r\n        0, 0, 30, 0, 0, 150, 0, 150, 30, 0, 30, 150,\r\n        // top rung\r\n        30, 0, 100, 0, 30, 30, 30, 30, 100, 0, 100, 30,\r\n        // middle rung\r\n        30, 60, 67, 60, 30, 90, 30, 90, 67, 60, 67, 90,\r\n    ]), gl.STATIC_DRAW);\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdGVzdC90ZXN0LnRzPzEzMzkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzRUFBeUM7QUFFekMsb0dBQXdEO0FBQ3hELDhGQUFvRDtBQUVwRCxTQUFnQixRQUFRLENBQUMsRUFBeUI7SUFDOUMsc0NBQXNDO0lBQ3RDLE1BQU0sT0FBTyxHQUFHLHFCQUFhLENBQUMsRUFBRSxFQUFFLGtCQUFrQixFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFFNUUsNkNBQTZDO0lBQzdDLE1BQU0seUJBQXlCLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUNsRCxPQUFPLEVBQ1AsWUFBWSxDQUNmLENBQUM7SUFFRiw0QkFBNEI7SUFDNUIsTUFBTSx5QkFBeUIsR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQ25ELE9BQU8sRUFDUCxjQUFjLENBQ2pCLENBQUM7SUFDRixNQUFNLHlCQUF5QixHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FDbkQsT0FBTyxFQUNQLGVBQWUsQ0FDbEIsQ0FBQztJQUNGLE1BQU0sdUJBQXVCLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUNqRCxPQUFPLEVBQ1AsWUFBWSxDQUNmLENBQUM7SUFDRixNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBRWhFLDJEQUEyRDtJQUMzRCxNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7SUFFekMseUVBQXlFO0lBQ3pFLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxjQUFjLENBQUMsQ0FBQztJQUUvQyxNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM5QixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDaEIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJ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RUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFDbEUsRUFBRSxDQUFDLFdBQVcsQ0FDakIsQ0FBQztBQUNOLENBQUM7QUFFRCw0REFBNEQ7QUFDNUQsU0FBUyxhQUFhLENBQUMsRUFBRTtJQUNyQixFQUFFLENBQUMsVUFBVSxDQUNULEVBQUUsQ0FBQyxZQUFZO0lBQ2Ysa0JBQWtCO0lBQ2xCLElBQUksWUFBWSxDQUFDO1FBQ2IsY0FBYztRQUNkLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRztRQUMzQyxXQUFXO1FBQ1gsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQzlDLGNBQWM7UUFDZCxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7S0FDakQsQ0FBQyxFQUNGLEVBQUUsQ0FBQyxXQUFXLENBQ2pCLENBQUM7QUFDTixDQUFDIiwiZmlsZSI6Ii4vc3JjL3Rlc3QvdGVzdC50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVByb2dyYW0gfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5pbXBvcnQgKiBhcyBmcmFnbWVudFNoYWRlclNvdXJjZSBmcm9tICcuL2ZyYWdtZW50Lmdsc2wnO1xyXG5pbXBvcnQgKiBhcyB2ZXJ0ZXhTaGFkZXJTb3VyY2UgZnJvbSAnLi92ZXJ0ZXguZ2xzbCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGVzdERyYXcoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xyXG4gICAgLy8gTGluayB0aGUgdHdvIHNoYWRlcnMgaW50byBhIHByb2dyYW1cclxuICAgIGNvbnN0IHByb2dyYW0gPSBjcmVhdGVQcm9ncmFtKGdsLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UsIGZyYWdtZW50U2hhZGVyU291cmNlKTtcclxuXHJcbiAgICAvLyBsb29rIHVwIHdoZXJlIHRoZSB2ZXJ0ZXggZGF0YSBuZWVkcyB0byBnby5cclxuICAgIGNvbnN0IHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihcclxuICAgICAgICBwcm9ncmFtLFxyXG4gICAgICAgICdhX3Bvc2l0aW9uJyxcclxuICAgICk7XHJcblxyXG4gICAgLy8gbG9vayB1cCB1bmlmb3JtIGxvY2F0aW9uc1xyXG4gICAgY29uc3QgcmVzb2x1dGlvblVuaWZvcm1Mb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihcclxuICAgICAgICBwcm9ncmFtLFxyXG4gICAgICAgICd1X3Jlc29sdXRpb24nLFxyXG4gICAgKTtcclxuICAgIGNvbnN0IHRyYW5zaXRpb25Vbmlmb3JtTG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oXHJcbiAgICAgICAgcHJvZ3JhbSxcclxuICAgICAgICAndV90cmFuc2xhdGlvbicsXHJcbiAgICApO1xyXG4gICAgY29uc3Qgcm90YXRpb25Vbmlmb3JtTG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oXHJcbiAgICAgICAgcHJvZ3JhbSxcclxuICAgICAgICAndV9yb3RhdGlvbicsXHJcbiAgICApO1xyXG4gICAgY29uc3QgY29sb3JMb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAndV9jb2xvcicpO1xyXG5cclxuICAgIC8vIENyZWF0ZSBhIGJ1ZmZlciBhbmQgcHV0IHRocmVlIDJkIGNsaXAgc3BhY2UgcG9pbnRzIGluIGl0XHJcbiAgICBjb25zdCBwb3NpdGlvbkJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG5cclxuICAgIC8vIEJpbmQgaXQgdG8gQVJSQVlfQlVGRkVSICh0aGluayBvZiBpdCBhcyBBUlJBWV9CVUZGRVIgPSBwb3NpdGlvbkJ1ZmZlcilcclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBwb3NpdGlvbkJ1ZmZlcik7XHJcblxyXG4gICAgY29uc3QgdHJhbnNpdGlvbiA9IFsyMDAsIDIwMF07XHJcbiAgICBjb25zdCBhbmdsZSA9IDA7XHJcbiAgICBjb25zdCBkZWdyZWUgPSAoYW5nbGUgKiBNYXRoLlBJKSAvIDE4MDtcclxuICAgIGNvbnN0IHJvdGF0aW9uID0gW01hdGguc2luKGRlZ3JlZSksIE1hdGguY29zKGRlZ3JlZSldO1xyXG4gICAgY29uc3QgY29sb3IgPSBbMCwgMCwgMSwgMV07XHJcbiAgICBzZXRDaGFyYWN0ZXJGKGdsKTtcclxuICAgIGRyYXdTY2VuZSgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGRyYXdTY2VuZSgpIHtcclxuICAgICAgICAvLyBUZWxsIFdlYkdMIGhvdyB0byBjb252ZXJ0IGZyb20gY2xpcCBzcGFjZSB0byBwaXhlbHNcclxuICAgICAgICBnbC52aWV3cG9ydCgwLCAwLCBnbC5jYW52YXMud2lkdGgsIGdsLmNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICAvLyBDbGVhciB0aGUgY2FudmFzXHJcbiAgICAgICAgZ2wuY2xlYXJDb2xvcigwLCAwLCAwLCAwKTtcclxuICAgICAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKTtcclxuXHJcbiAgICAgICAgLy8gVGVsbCBpdCB0byB1c2Ugb3VyIHByb2dyYW0gKHBhaXIgb2Ygc2hhZGVycylcclxuICAgICAgICBnbC51c2VQcm9ncmFtKHByb2dyYW0pO1xyXG5cclxuICAgICAgICAvLyBUdXJuIG9uIHRoZSBhdHRyaWJ1dGVcclxuICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uKTtcclxuXHJcbiAgICAgICAgLy8gQmluZCB0aGUgcG9zaXRpb24gYnVmZmVyLlxyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBwb3NpdGlvbkJ1ZmZlcik7XHJcblxyXG4gICAgICAgIC8vIHNldFJlY3RBbmdsZShnbCwgMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgICAgIC8vIFRlbGwgdGhlIGF0dHJpYnV0ZSBob3cgdG8gZ2V0IGRhdGEgb3V0IG9mIHBvc2l0aW9uQnVmZmVyIChBUlJBWV9CVUZGRVIpXHJcbiAgICAgICAgY29uc3Qgc2l6ZSA9IDI7IC8vIDIgY29tcG9uZW50cyBwZXIgaXRlcmF0aW9uXHJcbiAgICAgICAgY29uc3QgdHlwZSA9IGdsLkZMT0FUOyAvLyB0aGUgZGF0YSBpcyAzMmJpdCBmbG9hdHNcclxuICAgICAgICBjb25zdCBub3JtYWxpemUgPSBmYWxzZTsgLy8gZG9uJ3Qgbm9ybWFsaXplIHRoZSBkYXRhXHJcbiAgICAgICAgY29uc3Qgc3RyaWRlID0gMDsgLy8gMCA9IG1vdmUgZm9yd2FyZCBzaXplICogc2l6ZW9mKHR5cGUpIGVhY2ggaXRlcmF0aW9uIHRvIGdldCB0aGUgbmV4dCBwb3NpdGlvblxyXG4gICAgICAgIGxldCBvZmZzZXQgPSAwOyAvLyBzdGFydCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBidWZmZXJcclxuICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKFxyXG4gICAgICAgICAgICBwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uLFxyXG4gICAgICAgICAgICBzaXplLFxyXG4gICAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgICBub3JtYWxpemUsXHJcbiAgICAgICAgICAgIHN0cmlkZSxcclxuICAgICAgICAgICAgb2Zmc2V0LFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGdsLnVuaWZvcm0yZnYodHJhbnNpdGlvblVuaWZvcm1Mb2NhdGlvbiwgdHJhbnNpdGlvbik7XHJcbiAgICAgICAgZ2wudW5pZm9ybTJmdihyb3RhdGlvblVuaWZvcm1Mb2NhdGlvbiwgcm90YXRpb24pO1xyXG4gICAgICAgIC8vIHNldCB0aGUgcmVzb2x1dGlvblxyXG4gICAgICAgIGdsLnVuaWZvcm0yZihcclxuICAgICAgICAgICAgcmVzb2x1dGlvblVuaWZvcm1Mb2NhdGlvbixcclxuICAgICAgICAgICAgZ2wuY2FudmFzLndpZHRoLFxyXG4gICAgICAgICAgICBnbC5jYW52YXMuaGVpZ2h0LFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgZ2wudW5pZm9ybTRmdihjb2xvckxvY2F0aW9uLCBjb2xvcik7XHJcblxyXG4gICAgICAgIC8vIGRyYXdcclxuICAgICAgICBjb25zdCBwcmltaXRpdmVUeXBlID0gZ2wuVFJJQU5HTEVTO1xyXG4gICAgICAgIG9mZnNldCA9IDA7XHJcbiAgICAgICAgY29uc3QgY291bnQgPSAxODtcclxuICAgICAgICBnbC5kcmF3QXJyYXlzKHByaW1pdGl2ZVR5cGUsIG9mZnNldCwgY291bnQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRSZWN0QW5nbGUoZ2wsIHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIGNvbnN0IHgxID0geDtcclxuICAgIGNvbnN0IHgyID0geCArIHdpZHRoO1xyXG4gICAgY29uc3QgeTEgPSB5O1xyXG4gICAgY29uc3QgeTIgPSB5ICsgaGVpZ2h0O1xyXG4gICAgZ2wuYnVmZmVyRGF0YShcclxuICAgICAgICBnbC5BUlJBWV9CVUZGRVIsXHJcbiAgICAgICAgbmV3IEZsb2F0MzJBcnJheShbeDEsIHkxLCB4MiwgeTEsIHgxLCB5MiwgeDEsIHkyLCB4MiwgeTEsIHgyLCB5Ml0pLFxyXG4gICAgICAgIGdsLlNUQVRJQ19EUkFXLFxyXG4gICAgKTtcclxufVxyXG5cclxuLy8gRmlsbCB0aGUgYnVmZmVyIHdpdGggdGhlIHZhbHVlcyB0aGF0IGRlZmluZSBhIGxldHRlciAnRicuXHJcbmZ1bmN0aW9uIHNldENoYXJhY3RlckYoZ2wpIHtcclxuICAgIGdsLmJ1ZmZlckRhdGEoXHJcbiAgICAgICAgZ2wuQVJSQVlfQlVGRkVSLFxyXG4gICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgICAgIG5ldyBGbG9hdDMyQXJyYXkoW1xyXG4gICAgICAgICAgICAvLyBsZWZ0IGNvbHVtblxyXG4gICAgICAgICAgICAwLCAwLCAzMCwgMCwgMCwgMTUwLCAwLCAxNTAsIDMwLCAwLCAzMCwgMTUwLFxyXG4gICAgICAgICAgICAvLyB0b3AgcnVuZ1xyXG4gICAgICAgICAgICAzMCwgMCwgMTAwLCAwLCAzMCwgMzAsIDMwLCAzMCwgMTAwLCAwLCAxMDAsIDMwLFxyXG4gICAgICAgICAgICAvLyBtaWRkbGUgcnVuZ1xyXG4gICAgICAgICAgICAzMCwgNjAsIDY3LCA2MCwgMzAsIDkwLCAzMCwgOTAsIDY3LCA2MCwgNjcsIDkwLFxyXG4gICAgICAgIF0pLFxyXG4gICAgICAgIGdsLlNUQVRJQ19EUkFXLFxyXG4gICAgKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/test/test.ts\n");

/***/ }),

/***/ "./src/test/vertex.glsl":
/*!******************************!*\
  !*** ./src/test/vertex.glsl ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"#define GLSLIFY 1\\nattribute vec2 a_position;\\n\\nuniform vec2 u_resolution;\\nuniform mat3 u_matrix;\\n\\nvoid main() {\\n  // Multiply the position by the matrix.\\n  vec2 position = (u_matrix * vec3(a_position, 1)).xy;\\n\\n  // convert the position from pixels to 0.0 to 1.0\\n  vec2 zeroToOne = position / u_resolution;\\n\\n  // convert from 0->1 to 0->2\\n  vec2 zeroToTwo = zeroToOne * 2.0;\\n\\n  // convert from 0->2 to -1->+1 (clipspace)\\n  vec2 clipSpace = zeroToTwo - 1.0;\\n\\n  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);\\n}\"//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdGVzdC92ZXJ0ZXguZ2xzbD81Yjk3Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtEQUErRCw4QkFBOEIsd0JBQXdCLGlCQUFpQixtR0FBbUcsb0dBQW9HLHVFQUF1RSxxRkFBcUYsd0RBQXdELEdBQUciLCJmaWxlIjoiLi9zcmMvdGVzdC92ZXJ0ZXguZ2xzbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gXCIjZGVmaW5lIEdMU0xJRlkgMVxcbmF0dHJpYnV0ZSB2ZWMyIGFfcG9zaXRpb247XFxuXFxudW5pZm9ybSB2ZWMyIHVfcmVzb2x1dGlvbjtcXG51bmlmb3JtIG1hdDMgdV9tYXRyaXg7XFxuXFxudm9pZCBtYWluKCkge1xcbiAgLy8gTXVsdGlwbHkgdGhlIHBvc2l0aW9uIGJ5IHRoZSBtYXRyaXguXFxuICB2ZWMyIHBvc2l0aW9uID0gKHVfbWF0cml4ICogdmVjMyhhX3Bvc2l0aW9uLCAxKSkueHk7XFxuXFxuICAvLyBjb252ZXJ0IHRoZSBwb3NpdGlvbiBmcm9tIHBpeGVscyB0byAwLjAgdG8gMS4wXFxuICB2ZWMyIHplcm9Ub09uZSA9IHBvc2l0aW9uIC8gdV9yZXNvbHV0aW9uO1xcblxcbiAgLy8gY29udmVydCBmcm9tIDAtPjEgdG8gMC0+MlxcbiAgdmVjMiB6ZXJvVG9Ud28gPSB6ZXJvVG9PbmUgKiAyLjA7XFxuXFxuICAvLyBjb252ZXJ0IGZyb20gMC0+MiB0byAtMS0+KzEgKGNsaXBzcGFjZSlcXG4gIHZlYzIgY2xpcFNwYWNlID0gemVyb1RvVHdvIC0gMS4wO1xcblxcbiAgZ2xfUG9zaXRpb24gPSB2ZWM0KGNsaXBTcGFjZSAqIHZlYzIoMSwgLTEpLCAwLCAxKTtcXG59XCIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/test/vertex.glsl\n");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nfunction createShader(gl, type, source) {\r\n    const shader = gl.createShader(type);\r\n    gl.shaderSource(shader, source);\r\n    gl.compileShader(shader);\r\n    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);\r\n    if (success) {\r\n        return shader;\r\n    }\r\n    // tslint:disable-next-line: no-console\r\n    console.log(gl.getShaderInfoLog(shader));\r\n    gl.deleteShader(shader);\r\n}\r\nexports.createShader = createShader;\r\nfunction createProgram(gl, vertexShaderSource, fragmentShaderSource) {\r\n    const program = gl.createProgram();\r\n    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);\r\n    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);\r\n    gl.attachShader(program, vertexShader);\r\n    gl.attachShader(program, fragmentShader);\r\n    gl.linkProgram(program);\r\n    const success = gl.getProgramParameter(program, gl.LINK_STATUS);\r\n    if (success) {\r\n        return program;\r\n    }\r\n    // tslint:disable-next-line: no-console\r\n    console.log(gl.getProgramInfoLog(program));\r\n    gl.deleteProgram(program);\r\n}\r\nexports.createProgram = createProgram;\r\nfunction initWebGl() {\r\n    // Get A WebGL context\r\n    const canvas = document.getElementById('canvas');\r\n    const gl = canvas.getContext('webgl');\r\n    if (!gl) {\r\n        return;\r\n    }\r\n    fixCanvas(canvas);\r\n    return gl;\r\n}\r\nexports.initWebGl = initWebGl;\r\nfunction fixCanvas(canvas, listener) {\r\n    setStyle(canvas, {\r\n        position: 'absolute',\r\n        left: 0,\r\n        top: 0,\r\n    });\r\n    window.addEventListener('resize', canvasFullScreen);\r\n    canvasFullScreen();\r\n    function canvasFullScreen() {\r\n        const { clientWidth, clientHeight } = document.documentElement;\r\n        canvas.width = clientWidth;\r\n        canvas.height = clientHeight;\r\n        if (listener) {\r\n            listener(clientWidth, clientHeight);\r\n        }\r\n    }\r\n}\r\nexports.fixCanvas = fixCanvas;\r\nfunction setStyle(node, style) {\r\n    for (const key in style) {\r\n        if (!style.hasOwnProperty(key)) {\r\n            continue;\r\n        }\r\n        node.style[key] = style[key];\r\n    }\r\n}\r\nexports.setStyle = setStyle;\r\nfunction loadImage(url) {\r\n    return new Promise((resolve, reject) => {\r\n        const image = new Image();\r\n        image.src = url; // MUST BE SAME DOMAIN!!!\r\n        image.onload = () => {\r\n            resolve(image);\r\n        };\r\n        image.onerror = () => {\r\n            resolve(image);\r\n        };\r\n    });\r\n}\r\nexports.loadImage = loadImage;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMudHM/N2RkYSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLFNBQWdCLFlBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU07SUFDekMsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNoQyxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2pFLElBQUksT0FBTyxFQUFFO1FBQ1QsT0FBTyxNQUFNLENBQUM7S0FDakI7SUFFRCx1Q0FBdUM7SUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN6QyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFaRCxvQ0FZQztBQUVELFNBQWdCLGFBQWEsQ0FDekIsRUFBeUIsRUFDekIsa0JBQTBCLEVBQzFCLG9CQUE0QjtJQUU1QixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDbkMsTUFBTSxZQUFZLEdBQUcsWUFBWSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsYUFBYSxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDNUUsTUFBTSxjQUFjLEdBQUcsWUFBWSxDQUMvQixFQUFFLEVBQ0YsRUFBRSxDQUFDLGVBQWUsRUFDbEIsb0JBQW9CLENBQ3ZCLENBQUM7SUFFRixFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztJQUN2QyxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztJQUN6QyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2hFLElBQUksT0FBTyxFQUFFO1FBQ1QsT0FBTyxPQUFPLENBQUM7S0FDbEI7SUFFRCx1Q0FBdUM7SUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMzQyxFQUFFLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzlCLENBQUM7QUF4QkQsc0NBd0JDO0FBRUQsU0FBZ0IsU0FBUztJQUNyQixzQkFBc0I7SUFDdEIsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQXNCLENBQUM7SUFDdEUsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxJQUFJLENBQUMsRUFBRSxFQUFFO1FBQ0wsT0FBTztLQUNWO0lBQ0QsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xCLE9BQU8sRUFBRSxDQUFDO0FBQ2QsQ0FBQztBQVRELDhCQVNDO0FBRUQsU0FBZ0IsU0FBUyxDQUFDLE1BQXlCLEVBQUUsUUFBbUI7SUFDcEUsUUFBUSxDQUFDLE1BQU0sRUFBRTtRQUNiLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLElBQUksRUFBRSxDQUFDO1FBQ1AsR0FBRyxFQUFFLENBQUM7S0FDVCxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDcEQsZ0JBQWdCLEVBQUUsQ0FBQztJQUVuQixTQUFTLGdCQUFnQjtRQUNyQixNQUFNLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7UUFDL0QsTUFBTSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7UUFDM0IsTUFBTSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7UUFDN0IsSUFBSSxRQUFRLEVBQUU7WUFDVixRQUFRLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQztBQUNMLENBQUM7QUFsQkQsOEJBa0JDO0FBRUQsU0FBZ0IsUUFBUSxDQUFDLElBQWlCLEVBQUUsS0FBUztJQUNqRCxLQUFLLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBRTtRQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM1QixTQUFTO1NBQ1o7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNoQztBQUNMLENBQUM7QUFQRCw0QkFPQztBQUVELFNBQWdCLFNBQVMsQ0FBQyxHQUFHO0lBQ3pCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUMxQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLHlCQUF5QjtRQUMxQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtZQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDO1FBQ0YsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUU7WUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVhELDhCQVdDIiwiZmlsZSI6Ii4vc3JjL3V0aWxzLnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNoYWRlcihnbCwgdHlwZSwgc291cmNlKSB7XHJcbiAgICBjb25zdCBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIodHlwZSk7XHJcbiAgICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzb3VyY2UpO1xyXG4gICAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xyXG4gICAgY29uc3Qgc3VjY2VzcyA9IGdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKTtcclxuICAgIGlmIChzdWNjZXNzKSB7XHJcbiAgICAgICAgcmV0dXJuIHNoYWRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWNvbnNvbGVcclxuICAgIGNvbnNvbGUubG9nKGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSk7XHJcbiAgICBnbC5kZWxldGVTaGFkZXIoc2hhZGVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb2dyYW0oXHJcbiAgICBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LFxyXG4gICAgdmVydGV4U2hhZGVyU291cmNlOiBzdHJpbmcsXHJcbiAgICBmcmFnbWVudFNoYWRlclNvdXJjZTogc3RyaW5nLFxyXG4pIHtcclxuICAgIGNvbnN0IHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XHJcbiAgICBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSBjcmVhdGVTaGFkZXIoZ2wsIGdsLlZFUlRFWF9TSEFERVIsIHZlcnRleFNoYWRlclNvdXJjZSk7XHJcbiAgICBjb25zdCBmcmFnbWVudFNoYWRlciA9IGNyZWF0ZVNoYWRlcihcclxuICAgICAgICBnbCxcclxuICAgICAgICBnbC5GUkFHTUVOVF9TSEFERVIsXHJcbiAgICAgICAgZnJhZ21lbnRTaGFkZXJTb3VyY2UsXHJcbiAgICApO1xyXG5cclxuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xyXG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcclxuICAgIGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pO1xyXG4gICAgY29uc3Qgc3VjY2VzcyA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpO1xyXG4gICAgaWYgKHN1Y2Nlc3MpIHtcclxuICAgICAgICByZXR1cm4gcHJvZ3JhbTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWNvbnNvbGVcclxuICAgIGNvbnNvbGUubG9nKGdsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pKTtcclxuICAgIGdsLmRlbGV0ZVByb2dyYW0ocHJvZ3JhbSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0V2ViR2woKTogV2ViR0xSZW5kZXJpbmdDb250ZXh0IHtcclxuICAgIC8vIEdldCBBIFdlYkdMIGNvbnRleHRcclxuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIGNvbnN0IGdsID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJyk7XHJcbiAgICBpZiAoIWdsKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZml4Q2FudmFzKGNhbnZhcyk7XHJcbiAgICByZXR1cm4gZ2w7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaXhDYW52YXMoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCwgbGlzdGVuZXI/OiBGdW5jdGlvbikge1xyXG4gICAgc2V0U3R5bGUoY2FudmFzLCB7XHJcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgbGVmdDogMCxcclxuICAgICAgICB0b3A6IDAsXHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgY2FudmFzRnVsbFNjcmVlbik7XHJcbiAgICBjYW52YXNGdWxsU2NyZWVuKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2FudmFzRnVsbFNjcmVlbigpIHtcclxuICAgICAgICBjb25zdCB7IGNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQgfSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuICAgICAgICBjYW52YXMud2lkdGggPSBjbGllbnRXaWR0aDtcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgIGlmIChsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICBsaXN0ZW5lcihjbGllbnRXaWR0aCwgY2xpZW50SGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRTdHlsZShub2RlOiBIVE1MRWxlbWVudCwgc3R5bGU6IHt9KSB7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzdHlsZSkge1xyXG4gICAgICAgIGlmICghc3R5bGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbm9kZS5zdHlsZVtrZXldID0gc3R5bGVba2V5XTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRJbWFnZSh1cmwpOiBQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWFnZS5zcmMgPSB1cmw7IC8vIE1VU1QgQkUgU0FNRSBET01BSU4hISFcclxuICAgICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoaW1hZ2UpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaW1hZ2Uub25lcnJvciA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZShpbWFnZSk7XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/utils.ts\n");

/***/ })

/******/ });