import { Image } from "../images";
import { deleteTempFile, downloadFile, sanitizeExpenseName, uploadToImgur } from "./expense_helpers";

// Interactors
export const processInvoice = async (doc: any, record: any) => {
  try {
    const url = doc.url;
    const sanitizedExpenseName = sanitizeExpenseName(record.Expense); // function to sanitize expense name
    const path = `temp/${sanitizedExpenseName}`;

    // Download the image and save it to a temporary file
    await downloadFile(url, path, sanitizedExpenseName);

    // Upload the image to Imgur
    // const imgurLink = await uploadToImgur(sanitizedExpenseName, `${path}.1.png`);

    // if (imgurLink) {
    //   // Create a new Ima  ge document with the Imgur URL
    //   const newImage = new Image({
    //     link: imgurLink,
    //     album: sanitizedExpenseName,
    //     deleted: false // set other fields as necessary
    //   });

    //   // Save the Image
    //   await newImage.save();

    //   // Delete the temporary file
    //   deleteTempFile(`${path}.1.png`);
    //   deleteTempFile(`${path}.pdf`);

    //   // Return the new Image's ID
    //   return newImage._id;
    // }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
