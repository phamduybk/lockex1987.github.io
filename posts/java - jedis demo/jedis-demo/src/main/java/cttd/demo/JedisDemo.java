package cttd.demo;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

public class JedisDemo {

    public JedisPool jedisPool;

    private JedisDemo() {
        String host = "localhost";
        int port = 6379;
        jedisPool = new JedisPool(host, port);
    }

    public String getByKey(String key) {
        String value;
        try (Jedis jedis = jedisPool.getResource()) {
            value = jedis.get(key);
        }
        return value;
    }

    public void finish() {
        if (jedisPool != null) {
            jedisPool.destroy();
        }
    }
    
    public static void main(String[] args) {
        JedisDemo obj = new JedisDemo();
        //String key = "admin:log:bydate:[2018-03-04]";
        String key = "foo";
        String value = obj.getByKey(key);
        System.out.println(value);
        obj.finish();
    }
}
