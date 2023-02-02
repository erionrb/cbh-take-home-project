const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Should return valid candidate when event is string", () => {
    const data = "512";
    const expectedTrivialKey = crypto
      .createHash("sha3-512")
      .update(data)
      .digest("hex");
    const trivialKey = deterministicPartitionKey(data);
    expect(trivialKey).toBe(expectedTrivialKey);
  });

  it("Should return valid candidate when event not string", () => {
    const data = 256;
    const expectedTrivialKey = crypto
      .createHash("sha3-512")
      .update("" + data)
      .digest("hex");
    const trivialKey = deterministicPartitionKey(data);
    expect(trivialKey).toBe(expectedTrivialKey);
  });

  it("Should return valid candidate when event is JSON type with partitionKey entry", () => {
    const partition =
      "111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111";
    const event = { partitionKey: partition };
    const expectedTrivialKey = crypto
      .createHash("sha3-512")
      .update(event.partitionKey)
      .digest("hex");
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(expectedTrivialKey);
  });
});
