import * as fs from "fs";
import * as download from "download";
import * as url from "url";

const downloadCflint = (cflintDownloadUrl: string, downloadFinishedCallback: (error?: Error) => void) => {
    try {
        const downloadUrl = url.parse(cflintDownloadUrl);
        const cflintJarFilename = "cflint.jar";
        //const cflintJarFilename = "cflint/cflint.jar";
        //!fs.existsSync('cflint') && fs.mkdirSync('cflint');

        if (fs.existsSync(cflintJarFilename)) {
            console.log(`cflint.jar already exists`);
            downloadFinishedCallback();
        } else {
            console.log(`Downloading cflint.jar from:`);
            console.log(downloadUrl);

            switch (downloadUrl.protocol) {
                case "file:":
                    const downloadPath = url.fileURLToPath ? url.fileURLToPath(downloadUrl.href) : downloadUrl.href.slice(5);

                    console.log(`Copying file from '${downloadPath}'`);
                    fs.copyFile(downloadPath, cflintJarFilename, (err) => downloadFinishedCallback(err));
                    break;
                case "http:":
                case "https:":
                    download(downloadUrl.href).then((data) => fs.writeFile(cflintJarFilename, data, (err) => downloadFinishedCallback(err)));
                    break;
                default:
                    console.log(`Copying file from '${downloadUrl.href}'`);
                    fs.copyFile(downloadUrl.href, cflintJarFilename, (err) => downloadFinishedCallback(err));
                    break;
            }
        }
    } catch (err) {
        downloadFinishedCallback(err);
    }
};

export default downloadCflint;