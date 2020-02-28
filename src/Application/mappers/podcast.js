// @ts-check
export const fromRss = ({ title }) => ({
  identifier: title.replace(/\s/g, "_"),
  title
});

export const fromStorage = ({ identifier, title }) => ({
  identifier,
  title
});
