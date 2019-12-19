
const express = require('express')
const app = express()



let watcher;
let myList = new Array();


app.route('/status/').get((req, res) => {
    res.json(myList);
});

app.route('/start').post((req, res) => {


    let chokidar = require('chokidar');
    let folder = req.body.folderName;

    watcher = chokidar.watch(folder, { ignored: /^\./, persistent: true });


    watcher.on('change', function (path) {

        myList.push({ id: getFileName(path), event: getFileName(path) + ' is changed' })
    })
        .on('add', function (path) {
            myList.push({ id: getFileName(path), event: getFileName(path) + ' is added' })
        })
        .on('unlink', function (path) {
            myList.push({ id: getFileName(path), event: getFileName(path) + ' is removed' })
        })
        .on('error', function (error) { })
});

function getFileName(path) {
    let res = path.split("\\");
    return res[res.length - 1]
}

app.route('/logout').post((req, res) => {
    req.logout();
    res.redirect('/');
});

app.route('/stop').post((req, res) => {

    while (myList.length > 0) {
        myList.pop();
    }
    watcher.close();


});

module.exports = app;
