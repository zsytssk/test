import * as jest from "jest";
import * as assert from "assert";
export const CONFIG = 6;
export function test() {
  console.log(jest);
  describe("Array", function() {
    describe("#indexOf()", function() {
      it("should return -1 when not present", function() {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
  });
}
