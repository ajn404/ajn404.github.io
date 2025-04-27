


new Promise(resolve => {
    resolve()
}).then(() => {
    new Promise(function (resolve) {
        resolve();
    }).then(function () {
        console.log(8);
    });
    process.nextTick(function () {
        console.log(6);
    });
})

new Promise(function (resolve) {
    resolve();
}).then(function () {
    console.log(8);
});
process.nextTick(function () {
    console.log(6);
});