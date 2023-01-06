const {deterministicPartitionKey, createKeyHash} = require("./dpk");
const crypto = require("crypto");


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

    it("Make sure a sha3-512 key is returned if partitionKey is missing in event", () => {
        const partitionKey = createKeyHash(JSON.stringify({}))
        const trivialKey = deterministicPartitionKey({});
        expect(trivialKey).toStrictEqual(partitionKey);
    })
});

describe('createKeyHash', () => {
    it('Return a sha3-512 hash', () => {
        const key = 'oladiran'
        const expectedKey = createKeyHash(key)
        const actualKey = crypto.createHash("sha3-512").update(key).digest("hex")
        expect(actualKey).toStrictEqual(expectedKey)
    })
})
