const removeTag = (content: string) => {
  return content.replace(/<\/?[^>]+(>|$)/g, '');
};

export default removeTag;
