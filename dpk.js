const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

// exports.deterministicPartitionKey = (event) => {
//     let candidate;
//
//     if (event) {
//         if (event.partitionKey) {
//             candidate = event.partitionKey;
//         } else {
//             const data = JSON.stringify(event);
//             candidate = crypto.createHash("sha3-512").update(data).digest("hex");
//         }
//     }
//
//     if (candidate) {
//         if (typeof candidate !== "string") {
//             candidate = JSON.stringify(candidate);
//         }
//     } else {
//         candidate = TRIVIAL_PARTITION_KEY;
//     }
//     if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
//         candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
//     }
//     return candidate;
// };

/*
    Using 'let' makes code inconsistent and difficult to follow, you have to keep up with the changing value of the variable which makes it difficult to follow.
    When writing if statements I like to use the exit first approach it makes the code easier to follow and understand
    Abstracting your code into smaller functions make it's cleaner and easier to test, you can test those functions independently.
 */
const deterministicPartitionKey = (event) => {
    if (!event || typeof event !== 'object') {
        return TRIVIAL_PARTITION_KEY;
    }

    return getKey(event);
}

const getKey = (event) => {
    const {partitionKey} = event
    if (partitionKey) {
        if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
            return createKeyHash(partitionKey);
        }
        return partitionKey;
    }

    return createKeyHash(JSON.stringify(event));
}

const createKeyHash = (key) => {
    return crypto.createHash("sha3-512").update(key).digest("hex")
}

module.exports = {
    createKeyHash,
    deterministicPartitionKey,
    getKey
}
