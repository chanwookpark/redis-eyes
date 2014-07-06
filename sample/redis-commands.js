/**
 * Created by chanwook on 2014. 7. 5..
 */

var redis = require("redis");
var client = redis.createClient();

client.on("error", function(err) {
   console.log(">> Error: " + err);
});

// insert test value
client.hset("testcache1", "rowkey1", "value...", redis.print);
client.hset("testcache1", "rowkey2", "value...", redis.print);
client.hset("testcache1", "rowkey3", "value...", redis.print);

// single get
client.hget("testcache1", "rowkey1", function (err, res) {
    console.dir(res);
})

client.del("testcache1", redis.print);

// all key
var list;
client.keys('*', function (err, keys) {
    if (err) return console.log(err);

    for(var i = 0, len = keys.length; i < len; i++) {
        console.log(keys[i]);
    }
    list = keys;
});
console.log("?" + list);

