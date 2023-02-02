# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

We cam simple prevent unecessary processing by returning the TRIVIAL_PARTITION_KEY when no paramater has been sent:

<pre>
if (!event) return TRIVIAL_PARTITION_KEY;
</pree>

Candidate can them receive directly the value corresponding to the event logic, that is separeted into appropriated function:

<pre>
let candidate = buildEventCandidate(event);
</pre>

Is better to have a separated logic to do not break existent features when new changes has comming:

<pre>
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
</pre>

The stringify function will take care of do not convert values that already are string. Also a common function will help to use in more than one place without repeated logic, and reduce complexity.

<pre>
function stringify(data) {
  return typeof data !== "string" ? JSON.stringify(data) : data;
}
</pre>

Once we garantee that candidate always will be a string and TRIVIAL_PARTITION_KEY being returned at the beginning of the execution. We can simplify the function and remove this uncessary snippet:

<pre>
if (candidate) {
    if (typeof candidate !== "string") {
        candidate = JSON.stringify(candidate);
    }
    } else {
    candidate = TRIVIAL_PARTITION_KEY;
    }
}
</pre>