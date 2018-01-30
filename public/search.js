var Search = (function () {
    var query = function (address, string) {
        return new Promise(function (res, rej) {
            var xhr = new XMLHttpRequest();
            xhr.open('post', address, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.addEventListener("load", function (data) {
                var json = JSON.parse(data.target.responseText);
                res(json);
            })
            xhr.send(JSON.stringify({
                key: string
            }));
        })
    };

    function Search(address) {
        this.address = address;
    }

    Search.prototype.ask = function (string) {
        return query(this.address, string);
    }

    return Search;
}());