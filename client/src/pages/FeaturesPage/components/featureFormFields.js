import { userField } from "../../../shared/GlowLEDsComponents/GLForm/glFormHelpers";

export const featureFormFields = ({ users }) => {
  return {
    user: userField({ users, permissions: ["admin"] }),
    artist_name: { type: "text", label: "Artist Name" },
    email: {
      type: "text",
      label: "Email",
      required: true,
    },
    first_name: {
      type: "text",
      label: "First Name",
      required: true,
    },
    last_name: {
      type: "text",
      label: "Last Name",
      required: true,
    },
    instagram_handle: { type: "text", label: "Artist Name" },
    facebook_name: { type: "text", label: "Artist Name" },
    product: { type: "text", label: "Artist Name" },
    song_id: { type: "text", label: "Artist Name" },
    quote: { type: "text", label: "Artist Name" },
    video: { type: "text", label: "Artist Name" },
    images: { type: "text", label: "Artist Name" },
    link: { type: "text", label: "Artist Name" },
    logo: { type: "text", label: "Artist Name" },
    category: { type: "text", label: "Artist Name" },
    pathname: { type: "text", label: "Artist Name" },
    description: { type: "text", label: "Artist Name" },
    release_date: { type: "text", label: "Artist Name" },
  };
};
