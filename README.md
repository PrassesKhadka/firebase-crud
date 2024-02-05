# Firebase CRUD

## Learnings:

- !! : coerce a value to its boolean equivalent

```c
var a = 0 / "false";
var b = !!a; // b will be false, since 0 is falsy
```

-- ?? : nullish coalescing operator

```c
const value = null(or undefined);
const result = value ?? "default";
console.log(result); // Outputs: "default"
```

-- ?. : optional chaining operator
short-circuits the evaluation if any intermediate property in the chain is nullish (null or undefined), and returns undefined instead of throwing an error.
