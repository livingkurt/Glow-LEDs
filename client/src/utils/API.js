import axios from 'axios';

export default {

  get_images: (images_folder) => {
    console.log({ 'API.js': images_folder })
    return axios.post('/api/product/images', images_folder);
  },


}


