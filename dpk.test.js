const {deterministicPartitionKey, createKeyHash, getKey} = require("./dpk");
const crypto = require("crypto");


describe('createKeyHash', () => {
    it('Return a sha3-512 hash', () => {
        const key = 'oladiran'
        const expectedKey = createKeyHash(key)
        const actualKey = crypto.createHash("sha3-512").update(key).digest("hex")
        expect(actualKey).toStrictEqual(expectedKey)
        expect(expectedKey).toHaveLength(128)
    })
})

describe('getKey', () => {
    it("Returns the original supplied key if it doesn't exceed the MAX_PARTITION_KEY_LENGTH", () => {
        const partitionKey = 'oladiran'
        const trivialKey = getKey({partitionKey});
        expect(trivialKey).toStrictEqual(partitionKey);
    })

    it("Returns a sha3-512 key if partitionKey is missing in event", () => {
        const actualkey = createKeyHash(JSON.stringify({}))
        const expectedKey = getKey({});
        expect(actualkey).toStrictEqual(expectedKey);
    })

    it("Returns a sha3-512 key that is 128 in length if partitionKey exceeds ", () => {
        const partitionKey = 'vpkjfemcszkefgsgehhpwomwnykamqwlunqhpeiifghqxkvnvnztoemevrwbbejnqfxvtyrxtnlxgtmozwayplqlotpdcpjrbpcteqybutnyxowuourfqvdicabecbmjzilrsazpivcxkmfnesloalohozgyqfjmfmpsoqmjufeefxxfmebfhvlcufdaozsmnodrmlahdahosnhcusnfaxgoxtzofmnrqzufmszcobmyogatvgcjebvydvoktubkonowsqehkfogrmmvbajjtvmtvheyndigkpwfsvzzzhfw'
        const expectedKey = getKey({partitionKey})
        const actualKey = createKeyHash(partitionKey)
        expect(actualKey).toStrictEqual(expectedKey)
        expect(expectedKey).toHaveLength(128)
    })
})

describe("deterministicPartitionKey", () => {
    it("Returns the literal '0' when given no input", () => {
        const trivialKey = deterministicPartitionKey();
        expect(trivialKey).toBe("0");
    });


    it("Returns the TRIVIAL_PARTITION_KEY (0) when the given event is not an object", () => {
        const trivialKey = deterministicPartitionKey("asdgasgds");
        expect(trivialKey).toBe("0");
    })

    it("Returns the original supplied key if it doesn't exceed the MAX_PARTITION_KEY_LENGTH", () => {
        const partitionKey = 'oladiran'
        const trivialKey = deterministicPartitionKey({partitionKey});
        expect(trivialKey).toStrictEqual(partitionKey);
    })

    it("Returns a sha3-512 key if partitionKey is missing in event", () => {
        const actualkey = createKeyHash(JSON.stringify({}))
        const expectedKey = deterministicPartitionKey({});
        expect(actualkey).toStrictEqual(expectedKey);
    })

    it("Returns a sha3-512 key that is 128 in length if partitionKey exceeds ", () => {
        const partitionKey = 'vpkjfemcszkefgsgehhpwomwnykamqwlunqhpeiifghqxkvnvnztoemevrwbbejnqfxvtyrxtnlxgtmozwayplqlotpdcpjrbpcteqybutnyxowuourfqvdicabecbmjzilrsazpivcxkmfnesloalohozgyqfjmfmpsoqmjufeefxxfmebfhvlcufdaozsmnodrmlahdahosnhcusnfaxgoxtzofmnrqzufmszcobmyogatvgcjebvydvoktubkonowsqehkfogrmmvbajjtvmtvheyndigkpwfsvzzzhfw'
        const expectedKey = deterministicPartitionKey({partitionKey})
        const actualKey = createKeyHash(partitionKey)
        expect(actualKey).toStrictEqual(expectedKey)
        expect(expectedKey).toHaveLength(128)
    })

});
