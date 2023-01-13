import { useState, useCallback } from "react";
import axios from "axios";

// const { loading, error, response, uploadImage } = useImgboxUpload();

export const useImgboxUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const uploadImage = useCallback(async image => {
    setLoading(true);
    setError(null);
    setResponse(null);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const { data } = await axios.post("/upload", formData);
      setResponse(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, response, uploadImage };
};
