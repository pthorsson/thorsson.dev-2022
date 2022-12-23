---
createdAt: 2022-01-02 00:00
meta:
  title: Sample page
  description: A sample page demostrating how a page with content would look
---

# Here's a cool project

Lorem ipsum dolor sit amet, _consectetur_ adipiscing ~elit~, sed do eiusmod tempor incididunt ut labore et dolore [magna aliqua](https://www.google.com/). Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in **voluptate** velit esse cillum dolore eu fugiat `nulla pariatur`. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

```ts
export const get: RequestHandler = async ({ params }) => {
  try {
    const data = await loadMarkdownFile(params.slug);

    return {
      status: 200,
      body: data
    };
  } catch (error) {
    return {
      status: 404,
      body: { message: 'Not found' }
    };
  }
};
```

## Here's a list

- First [list item](#)
- Second `list` item
- Third list item

## Here's another list

1. This
2. is an
3. ordered list
