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
/******/ 	var hotCurrentHash = "4bda8b2549f08fc4c10d"; // eslint-disable-line no-unused-vars
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

eval("module.exports = \"precision mediump float;\\n#define GLSLIFY 1\\n\\n// Passed in from the vertex shader.\\nvarying vec4 v_color;\\n\\nuniform vec4 u_colorMult;\\n\\nvoid main() {\\n   gl_FragColor = v_color * u_colorMult;\\n}\"//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdGVzdC9mcmFnbWVudC5nbHNsP2VjOGIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMENBQTBDLGtGQUFrRiw2QkFBNkIsaUJBQWlCLDBDQUEwQyxHQUFHIiwiZmlsZSI6Ii4vc3JjL3Rlc3QvZnJhZ21lbnQuZ2xzbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcXG4jZGVmaW5lIEdMU0xJRlkgMVxcblxcbi8vIFBhc3NlZCBpbiBmcm9tIHRoZSB2ZXJ0ZXggc2hhZGVyLlxcbnZhcnlpbmcgdmVjNCB2X2NvbG9yO1xcblxcbnVuaWZvcm0gdmVjNCB1X2NvbG9yTXVsdDtcXG5cXG52b2lkIG1haW4oKSB7XFxuICAgZ2xfRnJhZ0NvbG9yID0gdl9jb2xvciAqIHVfY29sb3JNdWx0O1xcbn1cIiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/test/fragment.glsl\n");

/***/ }),

/***/ "./src/test/test.ts":
/*!**************************!*\
  !*** ./src/test/test.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst fragmentShaderSource = __webpack_require__(/*! ./fragment.glsl */ \"./src/test/fragment.glsl\");\r\nconst vertexShaderSource = __webpack_require__(/*! ./vertex.glsl */ \"./src/test/vertex.glsl\");\r\nfunction testDraw(gl) {\r\n    const createFlattenedVertices = (gl, vertices) => {\r\n        return webglUtils.createBufferInfoFromArrays(gl, primitives.makeRandomVertexColors(primitives.deindexVertices(vertices), {\r\n            vertsPerColor: 6,\r\n            rand: (ndx, channel) => {\r\n                return channel < 3\r\n                    ? (128 + Math.random() * 128) | 0\r\n                    : 255;\r\n            },\r\n        }));\r\n    };\r\n    const sphereBufferInfo = createFlattenedVertices(gl, primitives.createSphereVertices(10, 12, 6));\r\n    const cubeBufferInfo = createFlattenedVertices(gl, primitives.createCubeVertices(20));\r\n    const coneBufferInfo = createFlattenedVertices(gl, primitives.createTruncatedConeVertices(10, 0, 20, 12, 1, true, false));\r\n    const programInfo = webglUtils.createProgramInfo(gl, [\r\n        vertexShaderSource,\r\n        fragmentShaderSource,\r\n    ]);\r\n    function degToRad(d) {\r\n        return (d * Math.PI) / 180;\r\n    }\r\n    const cameraAngleRadians = degToRad(0);\r\n    const fieldOfViewRadians = degToRad(60);\r\n    const cameraHeight = 50;\r\n    // Uniforms for each object.\r\n    const sphereUniforms = {\r\n        u_colorMult: [0.5, 1, 0.5, 1],\r\n        u_matrix: m4.identity(),\r\n    };\r\n    const cubeUniforms = {\r\n        u_colorMult: [1, 0.5, 0.5, 1],\r\n        u_matrix: m4.identity(),\r\n    };\r\n    const coneUniforms = {\r\n        u_colorMult: [0.5, 0.5, 1, 1],\r\n        u_matrix: m4.identity(),\r\n    };\r\n    const sphereTranslation = [0, 0, 0];\r\n    const cubeTranslation = [-40, 0, 0];\r\n    const coneTranslation = [40, 0, 0];\r\n    function computeMatrix(viewProjectionMatrix, translation, xRotation, yRotation) {\r\n        let matrix = m4.translate(viewProjectionMatrix, translation[0], translation[1], translation[2]);\r\n        matrix = m4.xRotate(matrix, xRotation);\r\n        return m4.yRotate(matrix, yRotation);\r\n    }\r\n    requestAnimationFrame(drawScene);\r\n    // Draw the scene.\r\n    function drawScene(time) {\r\n        time *= 0.0005;\r\n        webglUtils.resizeCanvasToDisplaySize(gl.canvas);\r\n        // Tell WebGL how to convert from clip space to pixels\r\n        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);\r\n        gl.enable(gl.CULL_FACE);\r\n        gl.enable(gl.DEPTH_TEST);\r\n        // Clear the canvas AND the depth buffer.\r\n        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);\r\n        // Compute the projection matrix\r\n        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;\r\n        const projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);\r\n        // Compute the camera's matrix using look at.\r\n        const cameraPosition = [0, 0, 100];\r\n        const target = [0, 0, 0];\r\n        const up = [0, 1, 0];\r\n        const cameraMatrix = m4.lookAt(cameraPosition, target, up);\r\n        // Make a view matrix from the camera matrix.\r\n        const viewMatrix = m4.inverse(cameraMatrix);\r\n        const viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);\r\n        const sphereXRotation = time;\r\n        const sphereYRotation = time;\r\n        const cubeXRotation = -time;\r\n        const cubeYRotation = time;\r\n        const coneXRotation = time;\r\n        const coneYRotation = -time;\r\n        // ------ Draw the sphere --------\r\n        gl.useProgram(programInfo.program);\r\n        // Setup all the needed attributes.\r\n        webglUtils.setBuffersAndAttributes(gl, programInfo, sphereBufferInfo);\r\n        sphereUniforms.u_matrix = computeMatrix(viewProjectionMatrix, sphereTranslation, sphereXRotation, sphereYRotation);\r\n        // Set the uniforms we just computed\r\n        webglUtils.setUniforms(programInfo, sphereUniforms);\r\n        gl.drawArrays(gl.TRIANGLES, 0, sphereBufferInfo.numElements);\r\n        // ------ Draw the cube --------\r\n        // Setup all the needed attributes.\r\n        webglUtils.setBuffersAndAttributes(gl, programInfo, cubeBufferInfo);\r\n        cubeUniforms.u_matrix = computeMatrix(viewProjectionMatrix, cubeTranslation, cubeXRotation, cubeYRotation);\r\n        // Set the uniforms we just computed\r\n        webglUtils.setUniforms(programInfo, cubeUniforms);\r\n        gl.drawArrays(gl.TRIANGLES, 0, cubeBufferInfo.numElements);\r\n        // ------ Draw the cone --------\r\n        // Setup all the needed attributes.\r\n        webglUtils.setBuffersAndAttributes(gl, programInfo, coneBufferInfo);\r\n        coneUniforms.u_matrix = computeMatrix(viewProjectionMatrix, coneTranslation, coneXRotation, coneYRotation);\r\n        // Set the uniforms we just computed\r\n        webglUtils.setUniforms(programInfo, coneUniforms);\r\n        gl.drawArrays(gl.TRIANGLES, 0, coneBufferInfo.numElements);\r\n        requestAnimationFrame(drawScene);\r\n    }\r\n}\r\nexports.testDraw = testDraw;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdGVzdC90ZXN0LnRzPzEzMzkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvR0FBd0Q7QUFDeEQsOEZBQW9EO0FBRXBELFNBQWdCLFFBQVEsQ0FBQyxFQUF5QjtJQUM5QyxNQUFNLHVCQUF1QixHQUFHLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFO1FBQzdDLE9BQU8sVUFBVSxDQUFDLDBCQUEwQixDQUN4QyxFQUFFLEVBQ0YsVUFBVSxDQUFDLHNCQUFzQixDQUM3QixVQUFVLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxFQUNwQztZQUNJLGFBQWEsRUFBRSxDQUFDO1lBQ2hCLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRTtnQkFDbkIsT0FBTyxPQUFPLEdBQUcsQ0FBQztvQkFDZCxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7b0JBQ2pDLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDZCxDQUFDO1NBQ0osQ0FDSixDQUNKLENBQUM7SUFDTixDQUFDLENBQUM7SUFFRixNQUFNLGdCQUFnQixHQUFHLHVCQUF1QixDQUM1QyxFQUFFLEVBQ0YsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQzdDLENBQUM7SUFDRixNQUFNLGNBQWMsR0FBRyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FDcEMsQ0FBQztJQUNGLE1BQU0sY0FBYyxHQUFHLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0YsVUFBVSxDQUFDLDJCQUEyQixDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUN4RSxDQUFDO0lBRUYsTUFBTSxXQUFXLEdBQUcsVUFB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cyBmcmFnbWVudFNoYWRlclNvdXJjZSBmcm9tICcuL2ZyYWdtZW50Lmdsc2wnO1xyXG5pbXBvcnQgKiBhcyB2ZXJ0ZXhTaGFkZXJTb3VyY2UgZnJvbSAnLi92ZXJ0ZXguZ2xzbCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGVzdERyYXcoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xyXG4gICAgY29uc3QgY3JlYXRlRmxhdHRlbmVkVmVydGljZXMgPSAoZ2wsIHZlcnRpY2VzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHdlYmdsVXRpbHMuY3JlYXRlQnVmZmVySW5mb0Zyb21BcnJheXMoXHJcbiAgICAgICAgICAgIGdsLFxyXG4gICAgICAgICAgICBwcmltaXRpdmVzLm1ha2VSYW5kb21WZXJ0ZXhDb2xvcnMoXHJcbiAgICAgICAgICAgICAgICBwcmltaXRpdmVzLmRlaW5kZXhWZXJ0aWNlcyh2ZXJ0aWNlcyksXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVydHNQZXJDb2xvcjogNixcclxuICAgICAgICAgICAgICAgICAgICByYW5kOiAobmR4LCBjaGFubmVsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGFubmVsIDwgM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoMTI4ICsgTWF0aC5yYW5kb20oKSAqIDEyOCkgfCAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDI1NTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzcGhlcmVCdWZmZXJJbmZvID0gY3JlYXRlRmxhdHRlbmVkVmVydGljZXMoXHJcbiAgICAgICAgZ2wsXHJcbiAgICAgICAgcHJpbWl0aXZlcy5jcmVhdGVTcGhlcmVWZXJ0aWNlcygxMCwgMTIsIDYpLFxyXG4gICAgKTtcclxuICAgIGNvbnN0IGN1YmVCdWZmZXJJbmZvID0gY3JlYXRlRmxhdHRlbmVkVmVydGljZXMoXHJcbiAgICAgICAgZ2wsXHJcbiAgICAgICAgcHJpbWl0aXZlcy5jcmVhdGVDdWJlVmVydGljZXMoMjApLFxyXG4gICAgKTtcclxuICAgIGNvbnN0IGNvbmVCdWZmZXJJbmZvID0gY3JlYXRlRmxhdHRlbmVkVmVydGljZXMoXHJcbiAgICAgICAgZ2wsXHJcbiAgICAgICAgcHJpbWl0aXZlcy5jcmVhdGVUcnVuY2F0ZWRDb25lVmVydGljZXMoMTAsIDAsIDIwLCAxMiwgMSwgdHJ1ZSwgZmFsc2UpLFxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBwcm9ncmFtSW5mbyA9IHdlYmdsVXRpbHMuY3JlYXRlUHJvZ3JhbUluZm8oZ2wsIFtcclxuICAgICAgICB2ZXJ0ZXhTaGFkZXJTb3VyY2UsXHJcbiAgICAgICAgZnJhZ21lbnRTaGFkZXJTb3VyY2UsXHJcbiAgICBdKTtcclxuXHJcbiAgICBmdW5jdGlvbiBkZWdUb1JhZChkKSB7XHJcbiAgICAgICAgcmV0dXJuIChkICogTWF0aC5QSSkgLyAxODA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2FtZXJhQW5nbGVSYWRpYW5zID0gZGVnVG9SYWQoMCk7XHJcbiAgICBjb25zdCBmaWVsZE9mVmlld1JhZGlhbnMgPSBkZWdUb1JhZCg2MCk7XHJcbiAgICBjb25zdCBjYW1lcmFIZWlnaHQgPSA1MDtcclxuXHJcbiAgICAvLyBVbmlmb3JtcyBmb3IgZWFjaCBvYmplY3QuXHJcbiAgICBjb25zdCBzcGhlcmVVbmlmb3JtcyA9IHtcclxuICAgICAgICB1X2NvbG9yTXVsdDogWzAuNSwgMSwgMC41LCAxXSxcclxuICAgICAgICB1X21hdHJpeDogbTQuaWRlbnRpdHkoKSxcclxuICAgIH07XHJcbiAgICBjb25zdCBjdWJlVW5pZm9ybXMgPSB7XHJcbiAgICAgICAgdV9jb2xvck11bHQ6IFsxLCAwLjUsIDAuNSwgMV0sXHJcbiAgICAgICAgdV9tYXRyaXg6IG00LmlkZW50aXR5KCksXHJcbiAgICB9O1xyXG4gICAgY29uc3QgY29uZVVuaWZvcm1zID0ge1xyXG4gICAgICAgIHVfY29sb3JNdWx0OiBbMC41LCAwLjUsIDEsIDFdLFxyXG4gICAgICAgIHVfbWF0cml4OiBtNC5pZGVudGl0eSgpLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHNwaGVyZVRyYW5zbGF0aW9uID0gWzAsIDAsIDBdO1xyXG4gICAgY29uc3QgY3ViZVRyYW5zbGF0aW9uID0gWy00MCwgMCwgMF07XHJcbiAgICBjb25zdCBjb25lVHJhbnNsYXRpb24gPSBbNDAsIDAsIDBdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbXB1dGVNYXRyaXgoXHJcbiAgICAgICAgdmlld1Byb2plY3Rpb25NYXRyaXgsXHJcbiAgICAgICAgdHJhbnNsYXRpb24sXHJcbiAgICAgICAgeFJvdGF0aW9uLFxyXG4gICAgICAgIHlSb3RhdGlvbixcclxuICAgICkge1xyXG4gICAgICAgIGxldCBtYXRyaXggPSBtNC50cmFuc2xhdGUoXHJcbiAgICAgICAgICAgIHZpZXdQcm9qZWN0aW9uTWF0cml4LFxyXG4gICAgICAgICAgICB0cmFuc2xhdGlvblswXSxcclxuICAgICAgICAgICAgdHJhbnNsYXRpb25bMV0sXHJcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uWzJdLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgbWF0cml4ID0gbTQueFJvdGF0ZShtYXRyaXgsIHhSb3RhdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIG00LnlSb3RhdGUobWF0cml4LCB5Um90YXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3U2NlbmUpO1xyXG5cclxuICAgIC8vIERyYXcgdGhlIHNjZW5lLlxyXG4gICAgZnVuY3Rpb24gZHJhd1NjZW5lKHRpbWUpIHtcclxuICAgICAgICB0aW1lICo9IDAuMDAwNTtcclxuXHJcbiAgICAgICAgd2ViZ2xVdGlscy5yZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplKGdsLmNhbnZhcyk7XHJcblxyXG4gICAgICAgIC8vIFRlbGwgV2ViR0wgaG93IHRvIGNvbnZlcnQgZnJvbSBjbGlwIHNwYWNlIHRvIHBpeGVsc1xyXG4gICAgICAgIGdsLnZpZXdwb3J0KDAsIDAsIGdsLmNhbnZhcy53aWR0aCwgZ2wuY2FudmFzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIGdsLmVuYWJsZShnbC5DVUxMX0ZBQ0UpO1xyXG4gICAgICAgIGdsLmVuYWJsZShnbC5ERVBUSF9URVNUKTtcclxuXHJcbiAgICAgICAgLy8gQ2xlYXIgdGhlIGNhbnZhcyBBTkQgdGhlIGRlcHRoIGJ1ZmZlci5cclxuICAgICAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCk7XHJcblxyXG4gICAgICAgIC8vIENvbXB1dGUgdGhlIHByb2plY3Rpb24gbWF0cml4XHJcbiAgICAgICAgY29uc3QgYXNwZWN0ID0gZ2wuY2FudmFzLmNsaWVudFdpZHRoIC8gZ2wuY2FudmFzLmNsaWVudEhlaWdodDtcclxuICAgICAgICBjb25zdCBwcm9qZWN0aW9uTWF0cml4ID0gbTQucGVyc3BlY3RpdmUoXHJcbiAgICAgICAgICAgIGZpZWxkT2ZWaWV3UmFkaWFucyxcclxuICAgICAgICAgICAgYXNwZWN0LFxyXG4gICAgICAgICAgICAxLFxyXG4gICAgICAgICAgICAyMDAwLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIENvbXB1dGUgdGhlIGNhbWVyYSdzIG1hdHJpeCB1c2luZyBsb29rIGF0LlxyXG4gICAgICAgIGNvbnN0IGNhbWVyYVBvc2l0aW9uID0gWzAsIDAsIDEwMF07XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gWzAsIDAsIDBdO1xyXG4gICAgICAgIGNvbnN0IHVwID0gWzAsIDEsIDBdO1xyXG4gICAgICAgIGNvbnN0IGNhbWVyYU1hdHJpeCA9IG00Lmxvb2tBdChjYW1lcmFQb3NpdGlvbiwgdGFyZ2V0LCB1cCk7XHJcblxyXG4gICAgICAgIC8vIE1ha2UgYSB2aWV3IG1hdHJpeCBmcm9tIHRoZSBjYW1lcmEgbWF0cml4LlxyXG4gICAgICAgIGNvbnN0IHZpZXdNYXRyaXggPSBtNC5pbnZlcnNlKGNhbWVyYU1hdHJpeCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHZpZXdQcm9qZWN0aW9uTWF0cml4ID0gbTQubXVsdGlwbHkocHJvamVjdGlvbk1hdHJpeCwgdmlld01hdHJpeCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHNwaGVyZVhSb3RhdGlvbiA9IHRpbWU7XHJcbiAgICAgICAgY29uc3Qgc3BoZXJlWVJvdGF0aW9uID0gdGltZTtcclxuICAgICAgICBjb25zdCBjdWJlWFJvdGF0aW9uID0gLXRpbWU7XHJcbiAgICAgICAgY29uc3QgY3ViZVlSb3RhdGlvbiA9IHRpbWU7XHJcbiAgICAgICAgY29uc3QgY29uZVhSb3RhdGlvbiA9IHRpbWU7XHJcbiAgICAgICAgY29uc3QgY29uZVlSb3RhdGlvbiA9IC10aW1lO1xyXG5cclxuICAgICAgICAvLyAtLS0tLS0gRHJhdyB0aGUgc3BoZXJlIC0tLS0tLS0tXHJcblxyXG4gICAgICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbUluZm8ucHJvZ3JhbSk7XHJcblxyXG4gICAgICAgIC8vIFNldHVwIGFsbCB0aGUgbmVlZGVkIGF0dHJpYnV0ZXMuXHJcbiAgICAgICAgd2ViZ2xVdGlscy5zZXRCdWZmZXJzQW5kQXR0cmlidXRlcyhnbCwgcHJvZ3JhbUluZm8sIHNwaGVyZUJ1ZmZlckluZm8pO1xyXG5cclxuICAgICAgICBzcGhlcmVVbmlmb3Jtcy51X21hdHJpeCA9IGNvbXB1dGVNYXRyaXgoXHJcbiAgICAgICAgICAgIHZpZXdQcm9qZWN0aW9uTWF0cml4LFxyXG4gICAgICAgICAgICBzcGhlcmVUcmFuc2xhdGlvbixcclxuICAgICAgICAgICAgc3BoZXJlWFJvdGF0aW9uLFxyXG4gICAgICAgICAgICBzcGhlcmVZUm90YXRpb24sXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IHRoZSB1bmlmb3JtcyB3ZSBqdXN0IGNvbXB1dGVkXHJcbiAgICAgICAgd2ViZ2xVdGlscy5zZXRVbmlmb3Jtcyhwcm9ncmFtSW5mbywgc3BoZXJlVW5pZm9ybXMpO1xyXG5cclxuICAgICAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFUywgMCwgc3BoZXJlQnVmZmVySW5mby5udW1FbGVtZW50cyk7XHJcblxyXG4gICAgICAgIC8vIC0tLS0tLSBEcmF3IHRoZSBjdWJlIC0tLS0tLS0tXHJcblxyXG4gICAgICAgIC8vIFNldHVwIGFsbCB0aGUgbmVlZGVkIGF0dHJpYnV0ZXMuXHJcbiAgICAgICAgd2ViZ2xVdGlscy5zZXRCdWZmZXJzQW5kQXR0cmlidXRlcyhnbCwgcHJvZ3JhbUluZm8sIGN1YmVCdWZmZXJJbmZvKTtcclxuXHJcbiAgICAgICAgY3ViZVVuaWZvcm1zLnVfbWF0cml4ID0gY29tcHV0ZU1hdHJpeChcclxuICAgICAgICAgICAgdmlld1Byb2plY3Rpb25NYXRyaXgsXHJcbiAgICAgICAgICAgIGN1YmVUcmFuc2xhdGlvbixcclxuICAgICAgICAgICAgY3ViZVhSb3RhdGlvbixcclxuICAgICAgICAgICAgY3ViZVlSb3RhdGlvbixcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBTZXQgdGhlIHVuaWZvcm1zIHdlIGp1c3QgY29tcHV0ZWRcclxuICAgICAgICB3ZWJnbFV0aWxzLnNldFVuaWZvcm1zKHByb2dyYW1JbmZvLCBjdWJlVW5pZm9ybXMpO1xyXG5cclxuICAgICAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFUywgMCwgY3ViZUJ1ZmZlckluZm8ubnVtRWxlbWVudHMpO1xyXG5cclxuICAgICAgICAvLyAtLS0tLS0gRHJhdyB0aGUgY29uZSAtLS0tLS0tLVxyXG5cclxuICAgICAgICAvLyBTZXR1cCBhbGwgdGhlIG5lZWRlZCBhdHRyaWJ1dGVzLlxyXG4gICAgICAgIHdlYmdsVXRpbHMuc2V0QnVmZmVyc0FuZEF0dHJpYnV0ZXMoZ2wsIHByb2dyYW1JbmZvLCBjb25lQnVmZmVySW5mbyk7XHJcblxyXG4gICAgICAgIGNvbmVVbmlmb3Jtcy51X21hdHJpeCA9IGNvbXB1dGVNYXRyaXgoXHJcbiAgICAgICAgICAgIHZpZXdQcm9qZWN0aW9uTWF0cml4LFxyXG4gICAgICAgICAgICBjb25lVHJhbnNsYXRpb24sXHJcbiAgICAgICAgICAgIGNvbmVYUm90YXRpb24sXHJcbiAgICAgICAgICAgIGNvbmVZUm90YXRpb24sXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gU2V0IHRoZSB1bmlmb3JtcyB3ZSBqdXN0IGNvbXB1dGVkXHJcbiAgICAgICAgd2ViZ2xVdGlscy5zZXRVbmlmb3Jtcyhwcm9ncmFtSW5mbywgY29uZVVuaWZvcm1zKTtcclxuXHJcbiAgICAgICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIDAsIGNvbmVCdWZmZXJJbmZvLm51bUVsZW1lbnRzKTtcclxuXHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXdTY2VuZSk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/test/test.ts\n");

/***/ }),

/***/ "./src/test/vertex.glsl":
/*!******************************!*\
  !*** ./src/test/vertex.glsl ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"#define GLSLIFY 1\\nattribute vec4 a_position;\\nattribute vec4 a_color;\\n\\nuniform mat4 u_matrix;\\n\\nvarying vec4 v_color;\\n\\nvoid main() {\\n  // Multiply the position by the matrix.\\n  gl_Position = u_matrix * a_position;\\n\\n  // Pass the color to the fragment shader.\\n  v_color = a_color;\\n}\"//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdGVzdC92ZXJ0ZXguZ2xzbD81Yjk3Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtEQUErRCx5QkFBeUIsMEJBQTBCLHlCQUF5QixpQkFBaUIsbUZBQW1GLHFFQUFxRSxHQUFHIiwiZmlsZSI6Ii4vc3JjL3Rlc3QvdmVydGV4Lmdsc2wuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFwiI2RlZmluZSBHTFNMSUZZIDFcXG5hdHRyaWJ1dGUgdmVjNCBhX3Bvc2l0aW9uO1xcbmF0dHJpYnV0ZSB2ZWM0IGFfY29sb3I7XFxuXFxudW5pZm9ybSBtYXQ0IHVfbWF0cml4O1xcblxcbnZhcnlpbmcgdmVjNCB2X2NvbG9yO1xcblxcbnZvaWQgbWFpbigpIHtcXG4gIC8vIE11bHRpcGx5IHRoZSBwb3NpdGlvbiBieSB0aGUgbWF0cml4LlxcbiAgZ2xfUG9zaXRpb24gPSB1X21hdHJpeCAqIGFfcG9zaXRpb247XFxuXFxuICAvLyBQYXNzIHRoZSBjb2xvciB0byB0aGUgZnJhZ21lbnQgc2hhZGVyLlxcbiAgdl9jb2xvciA9IGFfY29sb3I7XFxufVwiIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/test/vertex.glsl\n");

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