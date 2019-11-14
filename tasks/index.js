"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tl = require("azure-pipelines-task-lib/task");
var cflintDownloader_1 = require("./cflintDownloader");
var javaExeDownloader_1 = require("./javaExeDownloader");
var cflint_1 = require("./cflint");
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var taskDisplayName, workingFolder, javaDownloadUrl, cflintJarDownloadUrl, cflintArguments;
        return __generator(this, function (_a) {
            taskDisplayName = tl.getVariable("task.displayname");
            if (!taskDisplayName) {
                taskDisplayName = "cflint";
            }
            console.log("task display name: " + taskDisplayName);
            workingFolder = tl.getPathInput("workingFolder", false);
            if (!workingFolder) {
                workingFolder = __dirname;
            }
            console.log("working folder: " + workingFolder);
            tl.cd(workingFolder);
            process.chdir(workingFolder);
            javaDownloadUrl = tl.getInput("javaDownloadUrl", true);
            if (javaDownloadUrl === undefined || javaDownloadUrl === '') {
                javaDownloadUrl = "https://github.com/joshknutson/devops-extension-cflint/raw/master/resources/java.exe";
            }
            console.log("java-exe download url: " + javaDownloadUrl);
            cflintJarDownloadUrl = tl.getInput("cflintJarDownloadUrl", true);
            console.log("cflint-jar download url: " + cflintJarDownloadUrl);
            cflintArguments = tl.getInput("cflintArguments");
            if (cflintArguments === undefined || cflintArguments === '') {
                cflintArguments = "";
            }
            console.log("arguments: " + cflintArguments);
            try {
                javaExeDownloader_1.default(javaDownloadUrl, function (error) {
                    if (error) {
                        throw error;
                    }
                    cflintDownloader_1.default(cflintJarDownloadUrl, function (error) {
                        if (error) {
                            throw error;
                        }
                        cflint_1.default(taskDisplayName, cflintArguments);
                    });
                });
            }
            catch (err) {
                tl.setResult(tl.TaskResult.Failed, taskDisplayName + " failed");
                tl.error(err);
                console.log(err);
            }
            return [2 /*return*/];
        });
    });
}
run();
