export const articleFormFields = ({ usersQuery, tagsQuery }) => {
  return {
    author: {
      type: "autocomplete_single",
      label: "Author",
      options: !usersQuery?.isLoading ? usersQuery?.data.filter(user => user.first_name && user.last_name) : [],
      labelProp: "user",
      getOptionLabel: option => `${option.first_name} ${option.last_name}`,
    },
    title: { type: "text", label: "Title" },
    short_description: { type: "text", label: "Short Description" },
    image: {
      type: "image_upload",
      label: "Thumbnail",
      labelProp: "_id",
      album: "Learn Articles Images",
    },
    content: { type: "text_multiline", label: "Content" },
    images: {
      type: "image_upload",
      label: "Images",
      labelProp: "_id",
      album: "Learn Articles Images",
    },

    tags: {
      type: "autocomplete_multiple",
      label: "Tags",
      options: !tagsQuery?.isLoading ? tagsQuery?.data : [],
      labelProp: "name",
    },
    pathname: { type: "text", label: "Pathname" },
    active: {
      type: "checkbox",
      label: "Active",
    },
  };
};
