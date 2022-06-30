# Aswers

## 1. What is the difference between `Component` and `PureComponent`?

Technically speaking, a `PureComponent` implements the method `shouldComponentUpdate` wich do a shallow comparison with
props and states to update (or not) the component.

For the same `props` and `states` it will have always the same result. It shall not have site-effects.

A `PureComponent` can prevent update of its whole component subtree.

Care must be taken with `PureComponents` that has a "render" property.

### Give an example where it might break my app

If a pure component be a parent of a React Router `Switch` in your app component tree, it might break the page
navigation. Unless its state change in response to `context` change in Router.

If its props or state doesn't change it will prevent the update of its component subtree.

## 2. Context + `shouldComponentUpdate` might be dangerous. Can you think of why is that?

As exemplified previously. A `PureComponent` can block children updates of its component's subtree wich respond
to `context` changes.

Components that be updated by context change are not `PureComponent`.

A good practice is to respect a rule that a `PureComponent` child must be always a `PureComponent`.

## 3. Describe 3 ways to pass _information_ from a component to its parent

### Throught a callback property

A callback property that is executed within the component, transmitting information as callback arguments.

### Throught the context

Providing a callback (Using React Provider).

Other possible combinations could be:
- Using Redux; - If it is using hooks, provide a useReducer;

This would be indicated to send information to a parent far away in the tree.

### Throught "render" property

A "render" property means a property that is a function that return a React component.

Consider the component below.

```jsx

/***
 * Wraps the child in a `div` and provides its size and offset from the viewport.
 *
 * The child must be a callback that takes a `DOMRect` as argument and return
 * a React Node.
 * @constructor
 */
const OffsetAndSize = (props) => {
    const rootRef = useRef < HTMLDivElement > (null);
    const [positionAndSize, setPositionAndSize] = useState(0);

    useEffect(() => {
        if (!rootRef.current) return;

        setPositionAndSize(
            rootRef.current.getBoundingClientRect().top
        );
    }, []);

    return (
        <div ref={rootRef}>
            {props.children(positionAndSize)}
        </div>
    )
}

const Component = () => {

    return (
        <OffsetAndSize>
            {positionAndSize =>
                <Component2 positionAndSize={positionAndSize}/>
            }
        </OffsetAndSize>
    )
}

```

## 4. Give 2 ways to prevent components to re-rendering.

1. Use `PureComponent` if it is possible. Preferable near the component tree leafs.
2. Implement `shouldComponentUpdate`.
3. Use `React.memo` HOC. It is different from `PureComponent` as it
allow children rendering on context or state changes.

## 5. What is a fragment and why do we need it?

To prevent adding extra node to the DOM when a component returns a list of children.

There are situations where inserting a `div` might generate an invalid HTML. For example a component that renders rows
or columns in a table. A `div` as a `<table>` child results in an invalid HTML.

### Give an example where it might break my app.

A `Fragment` might break the app if the parent component rely on a specific
child type at first level on tree. It might work properly to a HTML tag as a
`<table>` or `<li>`, but if a React component demands
a specific type as a first level child it migth break the app.

## 6. Give 3 examples of HOC pattern.

1. A redux `connect`;
2. A MaterialUi v4.x `withStyles`;
3. A ReactRouter `withRouter`;

## 7. What is the difference handling exceptions in promises, callbacks and  `async ... await`

To handle exception in promises there are two options. Using an `errorHandler`
as a second argument of a `.then(successHandler, errorHandler)` or using a `.catch(errorHandler)`. A `try...catch` block
will not work, as a promise is executed asynchronously.

Handling errors in sync code as a `callback` is done using `try...catch`
block.

Using `async...await` syntax sugar the exception handling is done using
`try...catch` block.

## 8. How many arguments does `setState` takes and why it is async?

It takes two arguments `setState(updater [,callback])`.

The `updater` can be an object(more common in class components) or a value. It also can be a callback with a
signature `(state,props) => {}` where the
`state` and `props` has the current values.

The `callback` argument can be used to do something with the updated state after the componente has been rendered due
to `setState` call.

`setState` is async to allow React to "wait" the event handlers to update component's states before it render the
component. Otherwise, in every the component could be updates more than once on every state update within an event
handler.

## 9. List the steps needed to migrate a Class to Function Component

Migrating a statefull Class component to a functional component using hooks can follow this steps:

1. simplify the component `this.state` splitting using multiple `useState` hooks, when needed.
2. organize the side effects in its own `useEffect` or `useLayoutEffect` with its proper cleanup (
   from `componentWillUnmount`).
3. following the DRY creating reusable hooks.
4. whenever needed to make events handler memoized with `useCallback`.
5. make use of `useRef` to static variables,
6. make use of `useMemo` to class variables wich needs to be updated by a property or state.

> I am a big fan of react hooks! :)

## 10. List a few ways styles can be used with components

1. using `className` property with css stylesheet imported in the app entry point;
2. inline styling using `style` property;
3. using css modules;
4. using css style librarys like `styled-components` and `emotion`.

## 11. How to render an HTML string from the server

An unescaped string can be rendered using `dangerouslySetInnerHTML` like:

```jsx
<div dangerouslySetInnerHTML={{ __html: unescapedHTML }}/> 
```

If the string has an escaped HTML code it is recommended to use
`DOMParser` to decode the string.

```jsx

parser = new DOMParser()
document_ = parser.parseFromString(escaptedHtmlString, "text/html");

htmlString = document_.documentElement.textContent;

//...
<div dangerouslySetInnerHTML={{ _html: htmlString }}/>

```

As I am very concerned about security I try to avoid this, whenever it is possible.
