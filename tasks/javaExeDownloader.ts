import * as fs from "fs";
import * as download from "download";
import * as url from "url";

const downloadJavaExe = (javaDownloadUrl: string, downloadFinishedCallback: (error?: Error) => void) => {
    try {
        const downloadUrl = url.parse(javaDownloadUrl);
        const javaCLIFilename = "java.exe";
        //const javaCLIFilename = "cflint/java.exe";
        //!fs.existsSync('cflint') && fs.mkdirSync('cflint');

        if (fs.existsSync(javaCLIFilename)) {
            console.log(`java exe already exists`);
            downloadFinishedCallback();
        } else {
            console.log(`Downloading java exe from:`);
            console.log(downloadUrl);

            switch (downloadUrl.protocol) {
                case "file:":
                    const downloadPath = url.fileURLToPath ? url.fileURLToPath(downloadUrl.href) : downloadUrl.href.slice(5);

                    console.log(`Copying file from '${downloadPath}'`);
                    fs.copyFile(downloadPath, javaCLIFilename, (err) => downloadFinishedCallback(err));
                    break;
                case "http:":
                case "https:":
                    download(downloadUrl.href).then((data) => fs.writeFile(javaCLIFilename, data, (err) => downloadFinishedCallback(err)));
                    break;
                default:
                    console.log(`Copying file from '${downloadUrl.href}'`);
                    fs.copyFile(downloadUrl.href, javaCLIFilename, (err) => downloadFinishedCallback(err));
                    break;
            }
        }

    } catch (err) {
        downloadFinishedCallback(err);
    }
};

export default downloadJavaExe;