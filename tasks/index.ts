import tl = require("azure-pipelines-task-lib/task");
import downloadCflint from "./cflintDownloader";
import downloadJavaExe from "./javaExeDownloader";
import executeCflint from "./cflint";

async function run (): Promise<void> {
    let taskDisplayName = tl.getVariable("task.displayname");

    if (!taskDisplayName) {
        taskDisplayName = "cflint";
    }

    console.log(`task display name: ${taskDisplayName}`);

    let workingFolder = tl.getPathInput("workingFolder", false);

    if (!workingFolder) {
        workingFolder = __dirname;
    }

    console.log(`working folder: ${workingFolder}`);

    tl.cd(workingFolder);
    process.chdir(workingFolder);

    var javaDownloadUrl = tl.getInput("javaDownloadUrl", true);
    if(javaDownloadUrl === undefined || javaDownloadUrl === '') {
        javaDownloadUrl = "https://github.com/joshknutson/devops-extension-cflint/raw/master/resources/java.exe";
    }
    console.log(`java-exe download url: ${javaDownloadUrl}`);

    const cflintJarDownloadUrl = tl.getInput("cflintJarDownloadUrl", true);
    console.log(`cflint-jar download url: ${cflintJarDownloadUrl}`);

    var cflintArguments = tl.getInput("cflintArguments");
    if(cflintArguments === undefined || cflintArguments === '') {
        cflintArguments = "";
    }
    console.log(`arguments: ${cflintArguments}`);

    try {
        downloadJavaExe(
            javaDownloadUrl,
            (error) => {
                if (error) {
                    throw error;
                }

                downloadCflint(
                    cflintJarDownloadUrl,
                    (error) => {
                        if (error) {
                            throw error;
                        }

                        executeCflint(taskDisplayName, cflintArguments);
                    });
            });
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, `${taskDisplayName} failed`);
        tl.error(err);

        console.log(err);
    }
}

run();