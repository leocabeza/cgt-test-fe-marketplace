export default function description(pageContext) {
  return (
    pageContext.data?.description ||
    'Step into our radical marketplace where the future meets the past!'
  );
}
