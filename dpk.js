const crypto = require("crypto");

function deterministicPartitionKey_old(event) {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate; // candidate can be initialized with TRIVIAL_PARTITION_KEY

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (candidate) {
    // candidate never going to be null
    if (typeof candidate !== "string") {
      // this check could be removed because candidate always goint to be string by line ??
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) return TRIVIAL_PARTITION_KEY;

  let candidate = buildEventCandidate(event);

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
};

/**
 * 
 * @param {any} event A event entry that could be:
 *  - JSON entry { partitionKey: string or any }
 *  - any
 *  If event is not JSON or string will be stringfied
 * @returns A candidate as hash
 */
function buildEventCandidate(event) {
  let candidate;
  if (event.partitionKey) {
    candidate = stringify(event.partitionKey);
  } else {
    const data = stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }

  return candidate;
}

/**
 * Uses JSON.stringify to turn data into string when not already
 * @param {any} data Data to be stringfied
 * @returns string Returns a string
 */
function stringify(data) {
  return typeof data !== "string" ? JSON.stringify(data) : data;
}
