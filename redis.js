/**
 * Created by chanwook on 2014. 7. 5..
 */

var redis = require("redis");
var client = redis.createClient();

/*
 검색 필드를 받아서 redis keys 조회 : key list
 */
function keys(_criteria, res) {
    client.keys(_criteria, function(err, keys){
        if (err) {
            console.log(err);
            return;
        }
        console.log(">> keys(" + _criteria + "): " + keys);

        res.json(keys);
    });
}

/*
    Key에 해당하는 Hash field:value 조회
 */
function hget(_key, res) {
    client.hgetall(_key, function(err, result){
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
    console.log(">> Cache delete(" + _key+")");
}

exports.keys = keys;
exports.hget = hget;
exports.cacheClear = cacheClear;