```js
// a=0, b=1, c=2, d=3, e=4, f=5

// declare an array that will hold our transform math
// this is the identity matrix (where no transforms exist)
var matrix = [1, 0, 0, 1, 0, 0];

// for example,

// rotate 30 degrees clockwise from 0 degrees
// note: 0 degrees extends rightward horizontally from the origin
rotate((30 * Math.PI) / 180);

// scale by 1.5 in X and 2.0 in Y scales
scale(1.5, 2, 0);

// plug our transform array into the context
context.transform(
    matrix[0],
    matrix[1],
    matrix[2],
    matrix[3],
    matrix[4],
    matrix[5]
);

// do the translate to the array
function translate(x, y) {
    matrix[4] += matrix[0] * x + matrix[2] * y;
    matrix[5] += matrix[1] * x + matrix[3] * y;
}

// do the scale to the array
function scale(x, y) {
    matrix[0] *= x;
    matrix[1] *= x;
    matrix[2] *= y;
    matrix[3] *= y;
}

// do the rotate to the array
function rotate(radians) {
    var cos = Math.cos(radians);
    var sin = Math.sin(radians);
    var m11 = matrix[0] * cos + matrix[2] * sin;
    var m12 = matrix[1] * cos + matrix[3] * sin;
    var m21 = -matrix[0] * sin + matrix[2] * cos;
    var m22 = -matrix[1] * sin + matrix[3] * cos;
    matrix[0] = m11;
    matrix[1] = m12;
    matrix[2] = m21;
    matrix[3] = m22;
}
```

```js
const rad = degreeToAngle(rotation);
const s = Math.cos(rad);
const c = Math.sin(rad);
m[0] = c * scaleX;
m[1] = s * scaleX;
m[2] = -s * scaleY;
m[3] = c * scaleY;
m[4] = x - pivotX * m[0] + pivotY * m[2];
m[5] = y - pivotX * m[2] + pivotY * m[3];
```
