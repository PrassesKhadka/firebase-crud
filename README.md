# Firebase CRUD

## Learnings:

- !! : coerce a value to its boolean equivalent

```c
var a = 0 ;
var b = !!a; // b will be false, since 0 is falsy
```

- ?? : nullish coalescing operator

```c
const value = null(or undefined);
const result = value ?? "default";
console.log(result); // Outputs: "default"
```

- ?. : optional chaining operator
  short-circuits the evaluation if any intermediate property in the chain is nullish (null or undefined), and returns undefined instead of throwing an error.

- JSON.parse

```c
const value="false"
JSON.parse(value)  // Output: false in boolean
```

- [Creating a props that depends on other props in TypeScript](https://www.youtube.com/watch?v=vXh4PFwZFGI)

```c

```

## Some useful github repos to check out:

- [TypeScript CheatSheet](https://github.com/Sue-52/TypeScript/tree/main)
- [TypeScript:Scratching the surface -> dependent props](https://dev.to/danielbellmas/dependent-props-in-react-typescript-2mne)
- [33 JavaScript Concepts Github](https://github.com/leonardomso/33-js-concepts)
- [React Firebase hooks](https://github.com/CSFrequency/react-firebase-hooks/tree/master)
- [Server side pagination in React table blog](https://karthikraja555.medium.com/server-side-pagination-in-react-table-a4311b730d19#:~:text=The%20logic%20for%20achieving%20server,So%2C%20let's%20consider%20it%20done.) and [github link](https://github.com/karthik-raja-g/react-table-server-side-pagination/blob/master/src/components/pagination/index.jsx)
- [pagination](https://github.com/safak/nextadmin/blob/completed/app/ui/dashboard/pagination/pagination.jsx)
