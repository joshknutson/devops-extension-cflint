"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process = require("child_process");
var process = require("process");
var path = require("path");
var fs = require("fs");
var executeCflintJar = function (taskDisplayName, cflintJarArguments) {
    var workingFolder = process.cwd();
    var outputDirectory = workingFolder;
    //const outputDirectory = path.resolve(workingFolder, "cflint/output");
    //!fs.existsSync(outputDirectory) && fs.mkdirSync(outputDirectory);
    //const outputHTMLFileName = ${path.resolve(outputDirectory, outputFileName+'.html')};
    if (cflintJarArguments === undefined) {
        cflintJarArguments = "";
    }
    var commandToExecute = "java -Xmx512m -jar " + path.resolve(workingFolder, "cflint.jar") + " " + cflintJarArguments + " -folder " + workingFolder + "  -html -htmlfile " + path.resolve(outputDirectory, "coverage.html") + " -text -textfile " + path.resolve(outputDirectory, "coverage.txt") + " -json -jsonfile " + path.resolve(outputDirectory, "coverage.json");
    console.log('Run Code Analysis');
    console.log("Executing command: " + commandToExecute);
    child_process.exec(commandToExecute, function (error, stdout) {
        if (error) {
            throw error;
        }
        console.log(stdout);
        console.log('Attach Code Summary');
        var keyword = "Total files";
        var contents = fs.readFileSync(path.resolve(outputDirectory, "coverage.txt")).toString().split(keyword);
        /* get the content after the keyword */
        var content = contents[1];
        //var content = ${contents}.Where({$_ -match $keyword}, 'SkipUntil')
        var el = "`````` \r\n";
        var markdownFile = path.resolve(outputDirectory, "coverage.md");
        fs.writeFile(markdownFile, el, function (err) { return function n() { }; });
        fs.appendFile(markdownFile, keyword, function (err) { return function n() { }; });
        fs.appendFile(markdownFile, content, function (err) { return function n() { }; });
        // fs.appendFile(markdownFile, "Code analysis is in 'Artifacts' \r\n", (err) => function n () { });
        fs.appendFile(markdownFile, el, function (err) { return function n() { }; });
        console.log("##vso[task.addattachment type=Distributedtask.Core.Summary;name=Code Analysis;]" + markdownFile);
        console.log('Attach Code Analysis Errors');
        var jsonFile = path.resolve(outputDirectory, "coverage.json");
        var jc = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
        var ia = jc.issues;
        for (var i = 0; i < ia.length; i++) {
            var s = ia[i].severity;
            if (s !== "INFO") {
                var idCode = ia[i].id;
                var la = ia[i].locations;
                for (var l = 0; l < la.length; l++) {
                    var sp = la[l].file;
                    var line = la[l].line;
                    var column = la[l].column;
                    var message = la[l].message;
                    console.log("##vso[task.logissue type=" + s + ";sourcepath=" + sp + ";linenumber=" + line + ";columnnumber=" + column + ";code=" + idCode + "]" + message);
                }
            }
        }
        //console.log('Attach Code Analysis');
        //console.log(`Uploading result file from ${outputDirectory}`);
        //console.log(`##vso[task.addattachment type=Distributedtask.Core.Summary;name=${taskDisplayName};]${path.resolve(workingFolder, clocCliResultFilename)}`);
        //console.log(`##vso[artifact.upload containerfolder=testresult;artifactname=Code Analysis;]${outputDirectory}`);
    });
};
exports.default = executeCflintJar;
