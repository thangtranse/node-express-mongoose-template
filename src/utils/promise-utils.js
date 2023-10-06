/**
 * Converts the result of a promise into an array containing an error and data.
 *
 * @param promise - The promise you want to process.
 * @returns A promise that returns an array with two elements: [err, data].
 *          - If the promise succeeds, the array will have 'undefined' as the error and the data value returned by the promise.
 *          - If the promise fails, the array will have the error value from the promise and 'undefined'.
 */
const promiseResultToArray = async (promise) =>
  promise.then((data) => [undefined, data]).catch((err) => [err, undefined]);

module.exports = { promiseResultToArray };
