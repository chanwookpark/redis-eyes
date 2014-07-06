/**
 * Created by chanwook on 2014. 7. 5..
 */

var redis = require("redis");
var client = redis.createClient();

var HashKey = function () {
    var key;
    var count = 0;
}

/*
 검색 필드를 받아서 redis keys 조회 : key list
 */
function keys(_criteria, res) {

    client.keys(_criteria, function (err, keys) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(">> keys(" + _criteria + "): " + keys);

        var hashArr = [];
        keys.forEach(function (key, index) {
            var hashKey = new HashKey();
            hashKey.key = key;
            hashArr.push(hashKey);

            /* async 문제로 동작 안함. 고쳐야해. */
            //hlen(key, _hashArr, index);

            console.log(">> key value: " + hashArr[index].key + ", " + hashArr[index].count);
        });
        res.json(hashArr);
    });
}

/*
 Key의 Field 카운트 조회
 */
function hlen(key, res) {
    client.hlen(key, function (err, count) {
        if (err) {
            console.log(">>Error: " + err);
            return;
        }
        console.log(">> " + key + " count is " + count);
        res.json(count);
    });
}

/*
 Key에 해당하는 Hash field:value 조회
 */
function hget(_key, res) {
    client.hgetall(_key, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(">> hget(" + _key + "): " + result);
        res.json(result);
    });
}

/*
 Key에 해당하는 Hash 삭제
 */
function cacheClear(_key) {
    client.del(_key);
    console.log(">> Cache delete(" + _key + ")");
}

exports.keys = keys;
exports.hget = hget;
exports.cacheClear = cacheClear;
exports.hlen = hlen;