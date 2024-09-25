---
sidebar_position: 1
---

# Get Contracts
Fetches all the deployed smart contracts along with their chain Ids and types. 

### Request URL

```bash
 https://testnet.api.euclidprotocol.com/api/v1/contracts
```
### Curl
```bash
curl -X 'GET' \
  'https://testnet.api.euclidprotocol.com/api/v1/contracts' \
  -H 'accept: application/json'
```

### Example Response
```JSON
{
  "data": [
    {
      "CreatedAt":"0001-01-01T00:00:00Z",
      "UpdatedAt":"0001-01-01T00:00:00Z",
      "contractAddress":"nibi1td7dskcr0hu0l06gjckhkd4yeggqugwgg4wghjwsu7yvga7m9tus4wg2px",
      "chainUId":"vsl",
      "type":"vcoin"
   },
   {
      "CreatedAt":"0001-01-01T00:00:00Z",
      "UpdatedAt":"0001-01-01T00:00:00Z",
      "contractAddress":"nibi1rwrwsyny3ew703ru0k2tgscwktrqsw9kyg5ykaydrxy0fq7gz6ksuyqfnm",
      "chainUId":"nibiru",
      "type":"factory"
   },
   {
      "CreatedAt":"0001-01-01T00:00:00Z",
      "UpdatedAt":"0001-01-01T00:00:00Z",
      "contractAddress":"nibi1vndyr364cmexy3qq8zx4x2v757purq4flt9mj4qe3z2s2wn29v5sdfc830",
      "chainUId":"vsl",
      "type":"router"
   },
   {
      "CreatedAt":"0001-01-01T00:00:00Z",
      "UpdatedAt":"0001-01-01T00:00:00Z",
      "contractAddress":"nibi1sn48gjhawxfdw0uakz2quwmw8j6wh0c87eun830xu994t8nfknssgcja86",
      "chainUId":"vsl",
      "type":"vlp"
   },
   {
      "CreatedAt":"0001-01-01T00:00:00Z",
      "UpdatedAt":"0001-01-01T00:00:00Z",
      "contractAddress":"nibi139l6ve5q5vqhs6e2tv54jnmmksxjh3ln7k9ys7txfd97swmltnfsvh0ycl",
      "chainUId":"vsl",
      "type":"vlp"
   },
   {
      "CreatedAt":"0001-01-01T00:00:00Z",
      "UpdatedAt":"0001-01-01T00:00:00Z",
      "contractAddress":"osmo18gghjrgcp8gh0m2r796rku50385usc65euf3lqv8hs57mkx7guhqlrcx6d",
      "chainUId":"osmosis",
      "type":"factory"
   },
   {
      "CreatedAt":"0001-01-01T00:00:00Z",
      "UpdatedAt":"0001-01-01T00:00:00Z",
      "contractAddress":"testcore18x9pxj50r39hsakzaanq2vq8xmdgxmwg5qr4ku34elwuqvexhv6s7l873c",
      "chainUId":"coreum",
      "type":"factory"
   },
   {
      "CreatedAt":"0001-01-01T00:00:00Z",
      "UpdatedAt":"0001-01-01T00:00:00Z",
      "contractAddress":"neutron1cpwa5pagnych4a42wj80k06wv7p3n39kzffdc8vczta3g0g0ee2spj5n3j",
      "chainUId":"neutron",
      "type":"factory"
   },
   {
      "CreatedAt":"0001-01-01T00:00:00Z",
      "UpdatedAt":"0001-01-01T00:00:00Z",
      "contractAddress":"stars193jxyq40le6dpzs49ejfjh4my4yuule502fzmwycfn8ls30rlkjq9z6mxk",
      "chainUId":"stargaze",
      "type":"factory"
   },
   {
      "CreatedAt":"0001-01-01T00:00:00Z",
      "UpdatedAt":"0001-01-01T00:00:00Z",
      "contractAddress":"nibi1hevc4apgvjwrvmxud483nmd4ayfffear8hpjd9arm0mzr9rsa9sq40j2rl",
      "chainUId":"vsl",
      "type":"vlp"
   },
   {
      "CreatedAt":"0001-01-01T00:00:00Z",
      "UpdatedAt":"0001-01-01T00:00:00Z",
      "contractAddress":"nibi13ud6tcse8c2danhlqjzsm2dh6tsnzhmmpkpszqt9rx4hgdw4vtzscssyya",
      "chainUId":"vsl",
      "type":"vlp"
   },
   {
      "CreatedAt":"0001-01-01T00:00:00Z",
      "UpdatedAt":"0001-01-01T00:00:00Z",
      "contractAddress":"nibi1x86aev6amqdr2nlumjluzzchjwjzxwy0wdsp64k4k0u4frljsdesnlg7qu",
      "chainUId":"vsl",
      "type":"vlp"
   }
  ]
}
```