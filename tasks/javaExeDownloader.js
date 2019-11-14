"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var download = require("download");
var url = require("url");
var downloadJavaExe = function (javaDownloadUrl, downloadFinishedCallback) {
    try {
        var downloadUrl = url.parse(javaDownloadUrl);
        var javaCLIFilename_1 = "java.exe";
        //const javaCLIFilename = "cflint/java.exe";
        //!fs.existsSync('cflint') && fs.mkdirSync('cflint');
        if (fs.existsSync(javaCLIFilename_1)) {
            console.log("java exe already exists");
            downloadFinishedCallback();
        }
        else {
            console.log("Downloading java exe from:");
            console.log(downloadUrl);
            switch (downloadUrl.protocol) {
                case "file:":
                    var downloadPath = url.fileURLToPath ? url.fileURLToPath(downloadUrl.href) : downloadUrl.href.slice(5);
                    console.log("Copying file from '" + downloadPath + "'");
                    fs.copyFile(downloadPath, javaCLIFilename_1, function (err) { return downloadFinishedCallback(err); });
                    break;
                case "http:":
                case "https:":
                    download(downloadUrl.href).then(function (data) { return fs.writeFile(javaCLIFilename_1, data, function (err) { return downloadFinishedCallback(err); }); });
                    break;
                default:
                    console.log("Copying file from '" + downloadUrl.href + "'");
                    fs.copyFile(downloadUrl.href, javaCLIFilename_1, function (err) { return downloadFinishedCallback(err); });
                    break;
            }
        }
    }
    catch (err) {
        downloadFinishedCallback(err);
    }
};
exports.default = downloadJavaExe;
