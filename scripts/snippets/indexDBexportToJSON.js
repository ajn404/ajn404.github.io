const request = indexedDB.open('RecordDB', 30);

request.onerror = function(event) {
    console.error('Database error:', event.target.error);
};

request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(['wordRecords'], 'readonly');
    const store = transaction.objectStore('wordRecords');
    const getAllRequest = store.getAll();
    getAllRequest.onsuccess = function(event) {
        const data = event.target.result; // 这里得到了所有数据
        console.log(data);
        exportToJson(data); // 调用导出函数
    };
};

function exportToJson(data) {
    const jsonData = JSON.stringify(data); // 将数据转换为 JSON 字符串
    const blob = new Blob([jsonData], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'wordRecords.json'); // 设置文件名
    document.body.appendChild(link);
    link.click(); // 触发下载
    document.body.removeChild(link);
}