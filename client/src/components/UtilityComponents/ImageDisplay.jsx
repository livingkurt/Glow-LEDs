import React from "react";

const ImageDisplay = ({ images, set_images, image, set_image, name }) => {
  const remove_image = (image_index, e) => {
    e.preventDefault();
    set_images(images =>
      images.filter((image, index) => {
        return image_index !== index;
      })
    );
  };

  const add_image = e => {
    e.preventDefault();
    console.log(image);
    if (image.indexOf(" ") >= 0) {
      console.log("indexOf");
      image.split(" ").map(image => {
        set_images(images => [ ...images, image ]);
      });
    } else if (images) {
      console.log("images.length > 0");
      set_images(images => [ ...images, image ]);
    } else {
      console.log("images.length === 0");
      set_images([ image ]);
    }
    set_image("");
  };

  const move_image_up = (image_index, e) => {
    e.preventDefault();
    const new_array = move(images, image_index, image_index - 1);
    set_images(new_array);
    // set_new_array(new_array);
    // image_display(new_array);
  };
  const move_image_down = (image_index, e) => {
    e.preventDefault();
    const new_array = move(images, image_index, image_index + 1);
    set_images(new_array);
    // set_new_array(new_array);
    // image_display(new_array);
  };

  // const move = (arr, old_index, new_index) => {
  // 	console.log({ arr, old_index, new_index });
  // 	while (old_index < 0) {
  // 		old_index += arr.length;
  // 	}
  // 	while (new_index < 0) {
  // 		new_index += arr.length;
  // 	}
  // 	if (new_index >= arr.length) {
  // 		const k = new_index - arr.length;
  // 		while (k-- + 1) {
  // 			arr.push(undefined);
  // 		}
  // 	}
  // 	arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  // 	console.log({ arr });
  // 	return arr;
  // };

  const move = (from, to, arr) => {
    const newArr = [ ...arr ];

    const item = newArr.splice(from, 1)[0];
    newArr.splice(to, 0, item);
    set_images(newArr);
  };

  return (
    <div>
      <li>
        <label htmlFor="image">{name ? name : "Image"}</label>
        <input
          type="text"
          name="image"
          value={image}
          id="image"
          onChange={e => set_image(e.target.value)}
        />
        <button className="btn primary" onClick={e => add_image(e)}>
          Add Image
        </button>
      </li>
      <div className="wrap jc-b">
        {images &&
          images.map((picture, index) => {
            return (
              <div
                className="promo_code mv-1rem jc-b max-w-17rem w-100per"
                key={index}
              >
                <div className="w-100per">
                  <div className="row ai-fs jc-b w-100per">
                    <img
                      alt="product"
                      style={{
                        width: "100%",
                        package_height: "auto",
                        maxWidth: "100px",
                        maxHeight: "100px",
                        borderRadius: "15px",
                      }}
                      className="mv-10px ml-10px"
                      src={picture}
                    />
                    {/* <div className="ml-10px" style={{ overFlowX: "scroll" }}>
                    {picture}
                  </div> */}
                    <div className="jc-fe column">
                      <button
                        className="btn icon "
                        onClick={e => remove_image(index, e)}
                      >
                        <i className="fas fa-times" aria-label="Delete" />
                      </button>
                      {index > 0 && (
                        <button
                          className="btn icon"
                          onClick={() => move(index, index - 1, images)}
                          aria-label="Move Up"
                        >
                          <i className=" fas fa-sort-up" />
                        </button>
                      )}

                      {index < images.length - 1 && (
                        <button
                          className="btn icon"
                          onClick={() => move(index, index + 1, images)}
                          aria-label="Move Down"
                        >
                          <i
                            style={{ WebkitTransform: "rotate(-180deg)" }}
                            className=" fas fa-sort-up"
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="promo_code mv-1rem jc-b max-w-46rem w-100per fs-14px">
        <div className="row">
          <p>
            {images &&
              images.map((picture, index) => {
                return `${index + 1}\n`;
              })}
          </p>
          <p>
            {images &&
              images.map((picture, index) => {
                return `${picture}\n`;
              })}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ImageDisplay;
