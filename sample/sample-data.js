/**
 * Created by chanwook on 2014. 7. 6..
 */
var redis = require("redis");
var client = redis.createClient();

client.on("error", function(err) {
    console.log(">> Error: " + err);
});

// insert test value
client.hset("testcache1", "rowkey1", "value1", redis.print);
client.hset("testcache1", "rowkey2", "value2", redis.print);
client.hset("testcache1", "rowkey3", "value3", redis.print);

client.hset("testcache2", "rowkey1", "value1", redis.print);
client.hset("testcache2", "rowkey2", "value2", redis.print);
client.hset("testcache2", "rowkey3", "value3", redis.print);
client.hset("testcache2", "rowkey4", "value4", redis.print);
client.hset("testcache2", "rowkey5", "value5", redis.print);


client.hset("testcache3", "rowkey1", "value1", redis.print);
client.hset("testcache3", "rowkey2", "value2", redis.print);
client.hset("testcache3", "rowkey3", "value3", redis.print);